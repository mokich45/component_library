import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SECTIONS_DIR = path.join(ROOT, 'sections');
const MAP_PATH = path.join(ROOT, 'componentMap.json');

const ALLOWED_SECTION_TYPES = new Set([
  'header',
  'hero',
  'services',
  'process',
  'proof',
  'portfolio',
  'faq',
  'contact',
  'footer',
  'features',
  'trust',
]);

interface VariantMeta {
  type?: unknown;
  variantId?: unknown;
  name?: unknown;
  tags?: unknown;
  goals?: unknown;
  density?: unknown;
  requires?: unknown;
  supports?: unknown;
  weight?: unknown;
}

function toPosix(p: string): string {
  return p.split(path.sep).join('/');
}

function rel(p: string): string {
  return toPosix(path.relative(ROOT, p));
}

function hasFile(p: string): boolean {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function isStringArray(value: unknown): boolean {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

function validateMeta(meta: VariantMeta, metaPath: string, errors: string[]): void {
  if (typeof meta.type !== 'string' || !meta.type) {
    errors.push(`${metaPath}: meta.type is required and must be string`);
  }
  if (typeof meta.variantId !== 'string' || !meta.variantId) {
    errors.push(`${metaPath}: meta.variantId is required and must be string`);
  }
  if (typeof meta.name !== 'string' || !meta.name) {
    errors.push(`${metaPath}: meta.name is required and must be string`);
  }

  if (meta.tags !== undefined && !isStringArray(meta.tags)) {
    errors.push(`${metaPath}: meta.tags must be array of strings`);
  }
  if (meta.goals !== undefined && !isStringArray(meta.goals)) {
    errors.push(`${metaPath}: meta.goals must be array of strings`);
  }
  if (meta.density !== undefined && !isStringArray(meta.density)) {
    errors.push(`${metaPath}: meta.density must be array of strings`);
  }
  if (meta.weight !== undefined && typeof meta.weight !== 'number') {
    errors.push(`${metaPath}: meta.weight must be number`);
  }
}

function validateComponentMap(errors: string[]): void {
  if (!hasFile(MAP_PATH)) return;

  let mapRaw: unknown;
  try {
    mapRaw = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch {
    errors.push(`${rel(MAP_PATH)}: invalid JSON`);
    return;
  }

  if (!mapRaw || typeof mapRaw !== 'object') {
    errors.push(`${rel(MAP_PATH)}: map root must be object`);
    return;
  }

  const components = (mapRaw as Record<string, unknown>).components;
  if (!Array.isArray(components)) {
    errors.push(`${rel(MAP_PATH)}: components must be array`);
    return;
  }

  for (const entry of components) {
    if (!entry || typeof entry !== 'object') {
      errors.push(`${rel(MAP_PATH)}: components entry must be object`);
      continue;
    }

    const e = entry as Record<string, unknown>;
    const pathKeys = ['componentPath', 'metaPath'];
    for (const key of pathKeys) {
      if (typeof e[key] !== 'string' || !e[key]) {
        errors.push(`${rel(MAP_PATH)}: ${key} is required string in every component`);
      } else {
        const abs = path.join(ROOT, e[key] as string);
        if (!hasFile(abs)) {
          errors.push(`${rel(MAP_PATH)}: ${key} points to missing file (${e[key] as string})`);
        }
      }
    }

    if (e.schemaPath !== null && e.schemaPath !== undefined) {
      if (typeof e.schemaPath !== 'string') {
        errors.push(`${rel(MAP_PATH)}: schemaPath must be string or null`);
      } else {
        const abs = path.join(ROOT, e.schemaPath);
        if (!hasFile(abs)) {
          errors.push(`${rel(MAP_PATH)}: schemaPath points to missing file (${e.schemaPath})`);
        }
      }
    }

    if (e.previewPath !== null && e.previewPath !== undefined) {
      if (typeof e.previewPath !== 'string') {
        errors.push(`${rel(MAP_PATH)}: previewPath must be string or null`);
      } else {
        const abs = path.join(ROOT, e.previewPath);
        if (!hasFile(abs)) {
          errors.push(`${rel(MAP_PATH)}: previewPath points to missing file (${e.previewPath})`);
        }
      }
    }
  }
}

function main(): void {
  const errors: string[] = [];
  const seenVariantIds = new Set<string>();

  if (!fs.existsSync(SECTIONS_DIR)) {
    errors.push('sections directory not found');
  } else {
    const sectionTypes = fs.readdirSync(SECTIONS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => !name.startsWith('.'));

    for (const type of sectionTypes) {
      if (!ALLOWED_SECTION_TYPES.has(type)) {
        errors.push(`sections/${type}: unknown section type, add it to whitelist in validateLibrary.ts`);
        continue;
      }

      const typeDir = path.join(SECTIONS_DIR, type);
      const variants = fs.readdirSync(typeDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((name) => !name.startsWith('.') && !name.startsWith('_'));

      for (const variant of variants) {
        const variantDir = path.join(typeDir, variant);
        const indexPath = path.join(variantDir, 'index.tsx');
        const metaPath = path.join(variantDir, 'meta.json');

        if (!hasFile(indexPath)) {
          errors.push(`${rel(variantDir)}: missing index.tsx`);
        }

        if (!hasFile(metaPath)) {
          errors.push(`${rel(variantDir)}: missing meta.json`);
          continue;
        }

        let meta: VariantMeta;
        try {
          meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        } catch {
          errors.push(`${rel(metaPath)}: invalid JSON`);
          continue;
        }

        validateMeta(meta, rel(metaPath), errors);

        if (typeof meta.type === 'string' && meta.type !== type) {
          errors.push(`${rel(metaPath)}: meta.type (${meta.type}) must match folder type (${type})`);
        }

        const expectedVariantId = `${type}.${variant}`;
        if (typeof meta.variantId === 'string' && meta.variantId !== expectedVariantId) {
          errors.push(`${rel(metaPath)}: meta.variantId (${meta.variantId}) must be ${expectedVariantId}`);
        }

        if (typeof meta.variantId === 'string') {
          if (seenVariantIds.has(meta.variantId)) {
            errors.push(`${rel(metaPath)}: duplicate variantId (${meta.variantId})`);
          }
          seenVariantIds.add(meta.variantId);
        }
      }
    }
  }

  validateComponentMap(errors);

  if (errors.length > 0) {
    console.error('Library validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Library validation passed.');
}

main();
