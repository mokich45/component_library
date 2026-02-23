import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MAP_PATH = path.join(ROOT, 'componentMap.json');

interface MapEntry {
  variantId: string;
  componentPath: string;
}

interface ImportSpec {
  source: string;
  defaultImport: string | null;
  namedImports: string[];
  namespaceImport: string | null;
}

interface ExportInfo {
  hasDefault: boolean;
  named: Set<string>;
  reExports: Array<{
    source: string;
    hasDefault: boolean;
    names: string[];
  }>;
}

const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

function toPosix(p: string): string {
  return p.split(path.sep).join('/');
}

function rel(p: string): string {
  return toPosix(path.relative(ROOT, p));
}

function hasFile(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function readMapEntries(): MapEntry[] {
  if (!hasFile(MAP_PATH)) {
    throw new Error('componentMap.json not found. Run npm run generate:map first.');
  }

  const raw = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8')) as { components?: unknown };
  if (!Array.isArray(raw.components)) {
    throw new Error('componentMap.json: components must be array');
  }

  return raw.components.map((c) => {
    const obj = c as Record<string, unknown>;
    return {
      variantId: String(obj.variantId || ''),
      componentPath: String(obj.componentPath || ''),
    };
  });
}

function resolveModule(fromFile: string, source: string): string | null {
  if (!source.startsWith('.')) return null;

  const base = path.resolve(path.dirname(fromFile), source);
  const candidates: string[] = [];

  if (path.extname(base)) {
    candidates.push(base);
  } else {
    for (const ext of FILE_EXTENSIONS) {
      candidates.push(`${base}${ext}`);
    }
    for (const ext of FILE_EXTENSIONS) {
      candidates.push(path.join(base, `index${ext}`));
    }
  }

  for (const candidate of candidates) {
    if (hasFile(candidate)) return candidate;
  }

  return null;
}

function parseNamedList(spec: string): string[] {
  const cleaned = spec.replace(/[\n\r]/g, ' ').trim();
  if (!cleaned) return [];

  return cleaned
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const asMatch = s.match(/^(.*?)\s+as\s+(.*?)$/);
      return asMatch ? asMatch[2].trim() : s;
    });
}

function parseImports(content: string): ImportSpec[] {
  const imports: ImportSpec[] = [];

  const importRegex = /import\s+([\s\S]*?)\s+from\s+['\"]([^'\"]+)['\"];?/g;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const clause = match[1].trim();
    const source = match[2];

    let defaultImport: string | null = null;
    let namespaceImport: string | null = null;
    let namedImports: string[] = [];

    if (clause.startsWith('{')) {
      namedImports = parseNamedList(clause.slice(1, -1));
    } else if (clause.startsWith('*')) {
      const nsMatch = clause.match(/^\*\s+as\s+([A-Za-z0-9_$]+)/);
      namespaceImport = nsMatch ? nsMatch[1] : null;
    } else {
      const parts = clause.split(',').map((p) => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        if (!parts[0].startsWith('{') && !parts[0].startsWith('*')) {
          defaultImport = parts[0].replace(/^type\s+/, '').trim();
        }
      }

      const namedPart = parts.find((p) => p.startsWith('{'));
      if (namedPart) {
        namedImports = parseNamedList(namedPart.slice(1, -1));
      }

      const nsPart = parts.find((p) => p.startsWith('*'));
      if (nsPart) {
        const nsMatch = nsPart.match(/^\*\s+as\s+([A-Za-z0-9_$]+)/);
        namespaceImport = nsMatch ? nsMatch[1] : null;
      }
    }

    imports.push({ source, defaultImport, namedImports, namespaceImport });
  }

  return imports;
}

function parseExportInfo(filePath: string, cache: Map<string, ExportInfo>): ExportInfo {
  const cached = cache.get(filePath);
  if (cached) return cached;

  const content = fs.readFileSync(filePath, 'utf8');

  const named = new Set<string>();
  const reExports: ExportInfo['reExports'] = [];

  const defaultExportRegex = /export\s+default\s+/;
  const hasDefault = defaultExportRegex.test(content);

  const namedDeclarationRegex = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z0-9_$]+)/g;
  let match: RegExpExecArray | null;
  while ((match = namedDeclarationRegex.exec(content)) !== null) {
    named.add(match[1]);
  }

  const exportListRegex = /export\s*\{([^}]+)\}(?:\s*from\s*['\"]([^'\"]+)['\"])?/g;
  while ((match = exportListRegex.exec(content)) !== null) {
    const spec = match[1];
    const source = match[2];
    const names = spec
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((entry) => {
        const asMatch = entry.match(/^(.*?)\s+as\s+(.*?)$/);
        if (asMatch) {
          return { imported: asMatch[1].trim(), exported: asMatch[2].trim() };
        }
        return { imported: entry, exported: entry };
      });

    if (!source) {
      for (const item of names) {
        named.add(item.exported);
      }
      continue;
    }

    const exportedNames = names.filter((n) => n.exported !== 'default').map((n) => n.exported);
    const hasDefaultReExport = names.some((n) => n.exported === 'default' || n.imported === 'default');
    reExports.push({ source, hasDefault: hasDefaultReExport, names: exportedNames });

    for (const item of names) {
      if (item.exported !== 'default') {
        named.add(item.exported);
      }
    }
  }

  const exportAllRegex = /export\s+\*\s+from\s+['\"]([^'\"]+)['\"]/g;
  while ((match = exportAllRegex.exec(content)) !== null) {
    reExports.push({ source: match[1], hasDefault: false, names: [] });
  }

  const info: ExportInfo = { hasDefault, named, reExports };
  cache.set(filePath, info);
  return info;
}

function moduleHasNamedExport(filePath: string, exportName: string, cache: Map<string, ExportInfo>, visiting: Set<string>): boolean {
  const key = `${filePath}::named::${exportName}`;
  if (visiting.has(key)) return false;
  visiting.add(key);

  const info = parseExportInfo(filePath, cache);
  if (info.named.has(exportName)) return true;

  for (const reExp of info.reExports) {
    if (!reExp.source.startsWith('.')) continue;
    const target = resolveModule(filePath, reExp.source);
    if (!target) continue;

    if (reExp.names.includes(exportName)) {
      if (moduleHasNamedExport(target, exportName, cache, visiting)) return true;
    } else if (reExp.names.length === 0) {
      if (moduleHasNamedExport(target, exportName, cache, visiting)) return true;
    }
  }

  return false;
}

function moduleHasDefaultExport(filePath: string, cache: Map<string, ExportInfo>, visiting: Set<string>): boolean {
  const key = `${filePath}::default`;
  if (visiting.has(key)) return false;
  visiting.add(key);

  const info = parseExportInfo(filePath, cache);
  if (info.hasDefault) return true;

  for (const reExp of info.reExports) {
    if (!reExp.source.startsWith('.')) continue;
    if (!reExp.hasDefault) continue;

    const target = resolveModule(filePath, reExp.source);
    if (!target) continue;
    if (moduleHasDefaultExport(target, cache, visiting)) return true;
  }

  return false;
}

function checkIndexDefaultContract(indexFile: string, errors: string[], cache: Map<string, ExportInfo>): void {
  const content = fs.readFileSync(indexFile, 'utf8');

  const reExportDefaultMatch = content.match(/export\s*\{\s*default\s*\}\s*from\s*['\"]([^'\"]+)['\"]/);
  if (reExportDefaultMatch) {
    const target = resolveModule(indexFile, reExportDefaultMatch[1]);
    if (!target) {
      errors.push(`${rel(indexFile)}: cannot resolve re-export target ${reExportDefaultMatch[1]}`);
      return;
    }

    if (!moduleHasDefaultExport(target, cache, new Set())) {
      errors.push(`${rel(indexFile)}: re-export target ${rel(target)} has no default export`);
    }
    return;
  }

  const exportDefaultIdMatch = content.match(/export\s+default\s+([A-Za-z0-9_$]+)\s*;?/);
  if (!exportDefaultIdMatch) {
    if (!/export\s+default\s+/.test(content)) {
      errors.push(`${rel(indexFile)}: missing default export`);
    }
    return;
  }

  const exportedIdentifier = exportDefaultIdMatch[1];
  const imports = parseImports(content);
  const importForDefault = imports.find(
    (imp) => imp.defaultImport === exportedIdentifier || imp.namedImports.includes(exportedIdentifier),
  );

  if (!importForDefault) {
    return;
  }

  if (!importForDefault.source.startsWith('.')) {
    return;
  }

  const target = resolveModule(indexFile, importForDefault.source);
  if (!target) {
    errors.push(`${rel(indexFile)}: cannot resolve import ${importForDefault.source}`);
    return;
  }

  if (importForDefault.defaultImport === exportedIdentifier) {
    if (!moduleHasDefaultExport(target, cache, new Set())) {
      errors.push(`${rel(indexFile)}: imported default ${exportedIdentifier} from ${rel(target)} is missing`);
    }
  }

  if (importForDefault.namedImports.includes(exportedIdentifier)) {
    if (!moduleHasNamedExport(target, exportedIdentifier, cache, new Set())) {
      errors.push(`${rel(indexFile)}: imported named ${exportedIdentifier} from ${rel(target)} is missing`);
    }
  }
}

function checkRelativeImportsRecursively(entryFile: string, errors: string[], cache: Map<string, ExportInfo>): void {
  const queue = [entryFile];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift() as string;
    if (visited.has(current)) continue;
    visited.add(current);

    const content = fs.readFileSync(current, 'utf8');
    const imports = parseImports(content);

    for (const imp of imports) {
      if (!imp.source.startsWith('.')) continue;

      const target = resolveModule(current, imp.source);
      if (!target) {
        errors.push(`${rel(current)}: cannot resolve relative import ${imp.source}`);
        continue;
      }

      if (imp.defaultImport) {
        if (!moduleHasDefaultExport(target, cache, new Set())) {
          errors.push(`${rel(current)}: default import ${imp.defaultImport} missing in ${rel(target)}`);
        }
      }

      for (const name of imp.namedImports) {
        if (!moduleHasNamedExport(target, name, cache, new Set())) {
          errors.push(`${rel(current)}: named import ${name} missing in ${rel(target)}`);
        }
      }

      if (!visited.has(target)) {
        queue.push(target);
      }
    }
  }
}

function main(): void {
  const errors: string[] = [];
  const cache = new Map<string, ExportInfo>();

  let entries: MapEntry[] = [];
  try {
    entries = readMapEntries();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Export validation failed: ${message}`);
    process.exit(1);
  }

  for (const entry of entries) {
    if (!entry.componentPath) {
      errors.push(`componentMap entry ${entry.variantId || '<unknown>'}: missing componentPath`);
      continue;
    }

    const entryAbs = path.join(ROOT, entry.componentPath);
    if (!hasFile(entryAbs)) {
      errors.push(`componentMap entry ${entry.variantId || '<unknown>'}: missing file ${entry.componentPath}`);
      continue;
    }

    checkIndexDefaultContract(entryAbs, errors, cache);
    checkRelativeImportsRecursively(entryAbs, errors, cache);
  }

  if (errors.length > 0) {
    console.error('Export validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Export validation passed for ${entries.length} component entries.`);
}

main();
