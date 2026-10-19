#!/usr/bin/env node
/**
 * Tour footprint report.
 *
 * Usage:
 *   node scripts/tour-footprint.mjs <slug> [--root <dir>] [--keyword "<phrase>"]...
 *
 * Lists every site file that references a tour (by slug, name, retired
 * registry keywords or extra paths, and any --keyword phrases) together with
 * the page routes those files can appear on. Read-only report; exits 0.
 */

import fs from 'node:fs';
import path from 'node:path';

const SITE_DIRS = ['src', 'public', 'content'];
const SITE_FILES = ['next.config.js'];
const NON_SITE_DIRS = ['scripts', 'docs'];
const SKIP_DIRS = new Set(['node_modules', '.next', '.git']);
const READ_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.mdx',
  '.html', '.css', '.txt', '.xml', '.yml', '.yaml', '.csv',
]);
const CODE_EXTS = ['.ts', '.tsx', '.js', '.jsx'];
const MAX_LINES = 3;
const EXCERPT_LEN = 100;
const MAX_ROUTES = 25;

function normalise(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function parseArgs(argv) {
  const args = { slug: null, root: process.cwd(), keywords: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root') {
      args.root = path.resolve(argv[++i] ?? '');
    } else if (arg === '--keyword') {
      const value = argv[++i];
      if (value) args.keywords.push(value);
    } else if (!args.slug) {
      args.slug = arg;
    }
  }
  return args;
}

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
}

function isReadable(file) {
  return READ_EXTS.has(path.extname(file).toLowerCase());
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function rel(root, file) {
  return toPosix(path.relative(root, file));
}

function unescapeName(raw) {
  return raw.replace(/\\'/g, "'");
}

function findTourInToursTs(root, slug) {
  const file = path.join(root, 'src/lib/data/tours.ts');
  const text = readText(file);
  if (text === null) return null;
  const lines = text.split(/\r?\n/);
  const slugLine = `slug: '${slug}',`;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== slugLine) continue;
    const nameRe = /^\s*name:\s*'(.*)',?\s*$/;
    for (let j = i + 1; j <= Math.min(i + 12, lines.length - 1); j++) {
      const m = lines[j].match(nameRe);
      if (m) {
        return { line: i + 1, name: unescapeName(m[1]) };
      }
    }
    return { line: i + 1, name: null };
  }
  return null;
}

function findRetiredEntry(root, slug) {
  const file = path.join(root, 'src/lib/data/delisted-tours.json');
  const text = readText(file);
  if (text === null) return null;
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (!Array.isArray(data)) return null;
  return data.find((entry) => entry && entry.slug === slug) ?? null;
}

function nameVariants(name) {
  const variants = [name];
  const idx = name.lastIndexOf(' — ');
  if (idx !== -1) {
    let tail = name.slice(idx + ' — '.length);
    tail = tail.replace(/\s*\([^()]*\)\s*$/, '').trim();
    if (tail) variants.push(tail);
  }
  return variants;
}

function buildNeedles(root, slug, keywords) {
  const needles = [slug];
  const tour = findTourInToursTs(root, slug);
  let found;
  if (tour) {
    found = { kind: 'tours', line: tour.line };
    if (tour.name) {
      for (const variant of nameVariants(tour.name)) needles.push(variant);
    }
  } else {
    const retired = findRetiredEntry(root, slug);
    if (retired) {
      found = { kind: 'retired', delistedOn: retired.delistedOn };
      for (const kw of retired.nameKeywords ?? []) needles.push(kw);
      for (const p of retired.extraPaths ?? []) needles.push(p);
    } else {
      found = { kind: 'missing' };
    }
  }
  for (const kw of keywords) needles.push(kw);
  const seen = new Set();
  const unique = [];
  for (const n of needles) {
    const key = normalise(n);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(n);
  }
  return { found, needles: unique };
}

function roleOf(root, file) {
  const r = rel(root, file);
  const ext = path.extname(file).toLowerCase();
  if (/^src\/app\/.*\/page\.tsx$/.test(r) || r === 'src/app/page.tsx') return 'page';
  if (/^src\/app\/.*\/route\.ts$/.test(r) || r === 'src/app/route.ts') return 'route';
  if (r === 'src/app/sitemap.ts') return 'sitemap';
  if (/(^|\/)layout\.tsx$/.test(r)) return 'layout';
  if (r.startsWith('src/lib/data/') || ext === '.json') return 'data';
  if (r.startsWith('src/components/') || /(^|\/)_components\//.test(r)) return 'component';
  if (/(^|\/)__tests__\//.test(r) || /\.test\.[^/]+$/.test(r)) return 'test';
  if (r === 'next.config.js') return 'config';
  if (r.startsWith('content/') || r.startsWith('public/')) return 'content';
  return 'other';
}

function routeForAppFile(root, file) {
  const r = rel(root, file);
  if (r === 'src/app/sitemap.ts') return '/sitemap.xml';
  const m = r.match(/^src\/app\/(.*)\/(page\.tsx|route\.ts)$/);
  if (!m) {
    if (r === 'src/app/page.tsx' || r === 'src/app/route.ts') return '/';
    return null;
  }
  const segments = m[1].split('/').filter((s) => s && !/^\(.*\)$/.test(s));
  return '/' + segments.join('/');
}

function layoutRoute(root, file) {
  const r = rel(root, file);
  const m = r.match(/^src\/app\/(.*)\/layout\.tsx$/);
  if (!m) return '/';
  const segments = m[1].split('/').filter((s) => s && !/^\(.*\)$/.test(s));
  return '/' + segments.join('/');
}

function resolveSpecifier(root, fromFile, spec) {
  let base;
  if (spec.startsWith('@/')) {
    base = path.join(root, 'src', spec.slice(2));
  } else if (spec.startsWith('.')) {
    base = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }
  const srcRoot = path.join(root, 'src');
  const candidates = [base];
  for (const ext of CODE_EXTS) candidates.push(base + ext);
  for (const ext of CODE_EXTS) candidates.push(path.join(base, 'index' + ext));
  for (const candidate of candidates) {
    if (!candidate.startsWith(srcRoot + path.sep) && candidate !== srcRoot) continue;
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch {
      // not a file
    }
  }
  return null;
}

const IMPORT_RES = [
  /import\s+[^'"]*?from\s+['"]([^'"]+)['"]/g,
  /export\s+[^'"]*?from\s+['"]([^'"]+)['"]/g,
  /import\s+['"]([^'"]+)['"]/g,
  /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
];

function extractSpecifiers(text) {
  const specs = new Set();
  for (const re of IMPORT_RES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) specs.add(m[1]);
  }
  return [...specs];
}

function buildImportGraph(root) {
  const srcRoot = path.join(root, 'src');
  const files = [];
  walk(srcRoot, files);
  const codeFiles = files.filter((f) => CODE_EXTS.includes(path.extname(f).toLowerCase()));
  const reverse = new Map();
  for (const file of codeFiles) {
    const text = readText(file);
    if (text === null) continue;
    for (const spec of extractSpecifiers(text)) {
      const target = resolveSpecifier(root, file, spec);
      if (!target) continue;
      if (!reverse.has(target)) reverse.set(target, new Set());
      reverse.get(target).add(file);
    }
  }
  return reverse;
}

function entryPointsFor(root, file) {
  const r = rel(root, file);
  if (/^src\/app\/.*\/page\.tsx$/.test(r) || r === 'src/app/page.tsx') {
    return [routeForAppFile(root, file)];
  }
  if (/^src\/app\/.*\/route\.ts$/.test(r) || r === 'src/app/route.ts') {
    return [routeForAppFile(root, file)];
  }
  if (r === 'src/app/sitemap.ts') return ['/sitemap.xml'];
  if (/(^|\/)layout\.tsx$/.test(r)) {
    return [`layout: every page under ${layoutRoute(root, file)}`];
  }
  return null;
}

function collectRoutes(root, reverse, file) {
  const own = entryPointsFor(root, file);
  if (own) return own;
  const routes = new Set();
  const visited = new Set([file]);
  const queue = [file];
  while (queue.length) {
    const current = queue.shift();
    const importers = reverse.get(current);
    if (!importers) continue;
    for (const importer of importers) {
      if (visited.has(importer)) continue;
      visited.add(importer);
      const entries = entryPointsFor(root, importer);
      if (entries) {
        for (const e of entries) routes.add(e);
      } else {
        queue.push(importer);
      }
    }
  }
  return [...routes].sort();
}

function findMatches(file, needles) {
  const text = readText(file);
  if (text === null) return null;
  const lines = text.split(/\r?\n/);
  const matches = [];
  for (let i = 0; i < lines.length; i++) {
    const norm = normalise(lines[i]);
    if (!norm) continue;
    if (needles.some((n) => norm.includes(normalise(n)))) {
      matches.push({ line: i + 1, text: lines[i].trim() });
    }
  }
  return matches.length ? matches : null;
}

function excerpt(text) {
  return text.length > EXCERPT_LEN ? text.slice(0, EXCERPT_LEN) + '…' : text;
}

function definesTour(matches, slug) {
  const needle = normalise(`slug: '${slug}'`);
  return matches.some((m) => normalise(m.text).includes(needle));
}

function nearbyField(file, slug, field) {
  const text = readText(file);
  if (text === null) return null;
  const lines = text.split(/\r?\n/);
  const slugLine = `slug: '${slug}',`;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== slugLine) continue;
    const re = new RegExp(`^\\s*${field}:\\s*'([^']*)'`);
    for (let j = Math.max(0, i - 12); j <= Math.min(i + 12, lines.length - 1); j++) {
      const m = lines[j].match(re);
      if (m) return m[1];
    }
  }
  return null;
}

function derivedNote(root, file, slug) {
  const destination = nearbyField(file, slug, 'destination') ?? '<destination>';
  const tier = nearbyField(file, slug, 'tier') ?? '<tier>';
  return (
    `defines the tour; derived surfaces: /tours/${destination}/${tier}/${slug}, ` +
    'the tier page, sitemap, /tours, /tours/find, home departures, JSON-LD, tour feed'
  );
}

function printHeader(slug, found, needles) {
  console.log(`Tour footprint: ${slug}`);
  if (found.kind === 'tours') {
    console.log(`  found: defined in tours.ts line ${found.line}`);
  } else if (found.kind === 'retired') {
    console.log(`  found: retired entry (delisted ${found.delistedOn})`);
  } else {
    console.log('  found: not found in tours.ts or the registry');
  }
  console.log('  needles:');
  for (const n of needles) console.log(`    - ${n}`);
  console.log('');
}

function printFile(root, file, role, matches, routes, note) {
  console.log(`${rel(root, file)}  [${role}]  ${matches.length} matching line(s)`);
  for (const m of matches.slice(0, MAX_LINES)) {
    console.log(`  ${m.line}: ${excerpt(m.text)}`);
  }
  if (matches.length > MAX_LINES) {
    console.log(`  … ${matches.length - MAX_LINES} more`);
  }
  if (note) {
    console.log(`  ${note}`);
  } else if (routes.length > MAX_ROUTES) {
    console.log(
      `  imported by ${routes.length} routes, e.g. ${routes.slice(0, 10).join(', ')}`,
    );
  } else if (routes.length) {
    console.log(`  routes: ${routes.join(', ')}`);
  } else {
    console.log('  routes: (none reached)');
  }
  console.log('');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.log(
      'Usage: node scripts/tour-footprint.mjs <slug> [--root <dir>] [--keyword "<phrase>"]...',
    );
    process.exit(2);
  }
  const root = args.root;
  const { found, needles } = buildNeedles(root, args.slug, args.keywords);
  printHeader(args.slug, found, needles);

  const siteFiles = [];
  for (const dir of SITE_DIRS) walk(path.join(root, dir), siteFiles);
  for (const f of SITE_FILES) {
    const full = path.join(root, f);
    try {
      if (fs.statSync(full).isFile()) siteFiles.push(full);
    } catch {
      // missing
    }
  }

  const nonSiteFiles = [];
  for (const dir of NON_SITE_DIRS) walk(path.join(root, dir), nonSiteFiles);

  const reverse = buildImportGraph(root);

  const roleCounts = new Map();
  const allRoutes = new Set();
  let siteMatches = 0;

  for (const file of siteFiles) {
    if (!isReadable(file)) continue;
    const matches = findMatches(file, needles);
    if (!matches) continue;
    siteMatches++;
    const role = roleOf(root, file);
    roleCounts.set(role, (roleCounts.get(role) ?? 0) + 1);
    let routes = [];
    let note = null;
    if (rel(root, file) === 'src/lib/data/tours.ts' && definesTour(matches, args.slug)) {
      note = derivedNote(root, file, args.slug);
    } else {
      routes = collectRoutes(root, reverse, file);
      for (const r of routes) allRoutes.add(r);
    }
    printFile(root, file, role, matches, routes, note);
  }

  if (siteMatches === 0) {
    console.log('No site file references this tour.');
    console.log('');
  }

  const nonSiteResults = [];
  for (const file of nonSiteFiles) {
    if (!isReadable(file)) continue;
    const matches = findMatches(file, needles);
    if (matches) nonSiteResults.push({ file, count: matches.length });
  }

  console.log('Summary');
  console.log(`  matching site files: ${siteMatches}`);
  const roles = [...roleCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [role, count] of roles) console.log(`    ${role}: ${count}`);
  console.log(`  distinct page routes reached: ${allRoutes.size}`);
  console.log('');
  console.log('Not part of the site');
  if (nonSiteResults.length === 0) {
    console.log('  (none)');
  } else {
    for (const { file, count } of nonSiteResults) {
      console.log(`  ${rel(root, file)}  ${count} matching line(s)`);
    }
  }
}

main();
