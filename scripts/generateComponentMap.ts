import fs from 'node:fs';
import path from 'node:path';

interface VariantMeta {
  type: string;
  variantId: string;
  name: string;
  description?: string;
  tags?: string[];
  goals?: string[];
  density?: string[];
  requires?: string[];
  supports?: Record<string, unknown>;
  weight?: number;
}

interface ComponentMapItem {
  type: string;
  variantId: string;
  name: string;
  componentPath: string;
  metaPath: string;
  schemaPath: string | null;
  previewPath: string | null;
  meta: VariantMeta;
}

const ROOT = process.cwd();
const SECTIONS_DIR = path.join(ROOT, 'sections');
const OUTPUT_PATH = path.join(ROOT, 'componentMap.json');

function toPosix(p: string): string {
  return p.split(path.sep).join('/');
}

function rel(p: string): string {
  return toPosix(path.relative(ROOT, p));
}

function hasFile(p: string): boolean {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function listVariantDirs(): Array<{ type: string; slug: string; dir: string }> {
  if (!fs.existsSync(SECTIONS_DIR)) {
    throw new Error('sections directory not found');
  }

  const out: Array<{ type: string; slug: string; dir: string }> = [];
  const sectionTypes = fs
    .readdirSync(SECTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => !d.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const sectionType of sectionTypes) {
    const typeDir = path.join(SECTIONS_DIR, sectionType.name);
    const variants = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .filter((d) => !d.name.startsWith('.') && !d.name.startsWith('_'))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const variant of variants) {
      const variantDir = path.join(typeDir, variant.name);
      const metaPath = path.join(variantDir, 'meta.json');
      if (!hasFile(metaPath)) continue;

      out.push({ type: sectionType.name, slug: variant.name, dir: variantDir });
    }
  }

  return out;
}

function ensureMeta(meta: unknown, context: string): VariantMeta {
  if (!meta || typeof meta !== 'object') {
    throw new Error(`${context}: meta.json must be an object`);
  }

  const obj = meta as Record<string, unknown>;
  const requiredStrings = ['type', 'variantId', 'name'];
  for (const key of requiredStrings) {
    if (typeof obj[key] !== 'string' || !(obj[key] as string).trim()) {
      throw new Error(`${context}: meta.${key} is required and must be a non-empty string`);
    }
  }

  if (obj.weight !== undefined && typeof obj.weight !== 'number') {
    throw new Error(`${context}: meta.weight must be a number`);
  }

  const arrayKeys = ['tags', 'goals', 'density', 'requires'];
  for (const key of arrayKeys) {
    const value = obj[key];
    if (value !== undefined) {
      if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
        throw new Error(`${context}: meta.${key} must be an array of strings`);
      }
    }
  }

  if (obj.supports !== undefined && (typeof obj.supports !== 'object' || obj.supports === null || Array.isArray(obj.supports))) {
    throw new Error(`${context}: meta.supports must be an object if provided`);
  }

  return obj as unknown as VariantMeta;
}

function getPreviewPath(variantDir: string): string | null {
  const png = path.join(variantDir, 'preview.png');
  const jpg = path.join(variantDir, 'preview.jpg');
  const jpeg = path.join(variantDir, 'preview.jpeg');
  if (hasFile(png)) return rel(png);
  if (hasFile(jpg)) return rel(jpg);
  if (hasFile(jpeg)) return rel(jpeg);
  return null;
}

function main(): void {
  const errors: string[] = [];
  const entries: ComponentMapItem[] = [];
  const seenVariantIds = new Set<string>();

  for (const variant of listVariantDirs()) {
    const expectedVariantId = `${variant.type}.${variant.slug}`;
    const metaPathAbs = path.join(variant.dir, 'meta.json');
    const indexPathAbs = path.join(variant.dir, 'index.tsx');

    let meta: VariantMeta;
    try {
      const raw = JSON.parse(fs.readFileSync(metaPathAbs, 'utf8'));
      meta = ensureMeta(raw, rel(metaPathAbs));
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
      continue;
    }

    if (meta.type !== variant.type) {
      errors.push(`${rel(metaPathAbs)}: meta.type (${meta.type}) does not match folder type (${variant.type})`);
      continue;
    }

    if (meta.variantId !== expectedVariantId) {
      errors.push(`${rel(metaPathAbs)}: meta.variantId (${meta.variantId}) does not match expected (${expectedVariantId})`);
      continue;
    }

    if (seenVariantIds.has(meta.variantId)) {
      errors.push(`${rel(metaPathAbs)}: duplicate variantId (${meta.variantId})`);
      continue;
    }
    seenVariantIds.add(meta.variantId);

    if (!hasFile(indexPathAbs)) {
      errors.push(`${rel(variant.dir)}: missing required index.tsx`);
      continue;
    }

    const schemaPathAbs = path.join(variant.dir, 'schema.json');
    entries.push({
      type: meta.type,
      variantId: meta.variantId,
      name: meta.name,
      componentPath: rel(indexPathAbs),
      metaPath: rel(metaPathAbs),
      schemaPath: hasFile(schemaPathAbs) ? rel(schemaPathAbs) : null,
      previewPath: getPreviewPath(variant.dir),
      meta,
    });
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`ERROR: ${error}`);
    }
    process.exit(1);
  }

  entries.sort((a, b) => a.variantId.localeCompare(b.variantId));

  const map = {
    version: 'component_map_v1',
    generatedAt: new Date().toISOString(),
    components: entries,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(map, null, 2)}\n`);
  console.log(`Generated ${rel(OUTPUT_PATH)} with ${entries.length} components.`);
}

main();
