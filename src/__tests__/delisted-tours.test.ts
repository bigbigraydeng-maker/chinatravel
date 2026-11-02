/**
 * Machine gate against a retired ("delisted") tour coming back.
 *
 * A tour is taken off sale by adding it to src/lib/data/delisted-tours.json. From then on it must
 * not reappear through a hard-coded page, a blog sentence, a lead-form option, the sitemap or the
 * built HTML. This test scans the site source (src/, public/, content/, scripts/) and, when a build
 * exists, the prerendered pages for every slug, name keyword and retired path in the registry —
 * in text files, SVG maps and file names (images, PDFs and fonts are checked by name only).
 *
 * The only files allowed to contain the registry's words are the registry itself
 * (delisted-tours.json / delisted-tours.ts), the shared scanner (delisted-scan.cjs), this test and
 * its scanner test, plus the files listed under `knownResidue` in the registry.
 */
import fs from 'fs';
import path from 'path';
import sitemap from '@/app/sitemap';
import {
  DELISTED_TOURS,
  delistedPaths,
  delistedTourPath,
  findDelistedInPath,
  findDelistedInText,
  isDelistedSlug,
  isDelistedUrl,
  knownResidueEntries,
} from '@/lib/data/delisted-tours';
import { tours, getAllActiveTours, getAllChinaTours } from '@/lib/data/tours';

const ROOT = process.cwd();
const SCAN_ROOTS = ['src', 'public', 'content', 'scripts'];
const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.mdx',
  '.html',
  '.htm',
  '.css',
  '.txt',
  '.xml',
  '.yml',
  '.yaml',
  '.csv',
  '.svg',
  '.py',
]);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git']);
const ALWAYS_ALLOWED = new Set([
  'src/lib/data/delisted-tours.json',
  'src/lib/data/delisted-tours.ts',
  'src/lib/data/delisted-scan.cjs',
  'src/__tests__/delisted-tours.test.ts',
  'src/__tests__/delisted-scan.test.ts',
]);
const KNOWN = new Set(knownResidueEntries().map((entry) => entry.path));
const ALLOWED = new Set([...ALWAYS_ALLOWED, ...KNOWN]);

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function toRelative(absolute: string): string {
  return path.relative(ROOT, absolute).split(path.sep).join('/');
}

function findResidue(files: string[], extensions: Set<string>, allowed: Set<string>): string[] {
  const residue: string[] = [];
  for (const file of files) {
    const relativePath = toRelative(file);
    if (allowed.has(relativePath)) continue;
    if (extensions.has(path.extname(file).toLowerCase())) {
      const text = fs.readFileSync(file, 'utf8');
      for (const label of findDelistedInText(text)) {
        residue.push(`${relativePath}: ${label}`);
      }
    }
    for (const label of findDelistedInPath(relativePath)) {
      residue.push(`${relativePath} (file name): ${label}`);
    }
  }
  return residue;
}

interface NextConfigShape {
  redirects: () => Promise<
    Array<{ source: string; destination: string; statusCode?: number; permanent?: boolean }>
  >;
}

describe('delisted tours registry', () => {
  it('every entry is complete and its redirect target is a live page', () => {
    expect(DELISTED_TOURS.length).toBeGreaterThan(0);
    for (const entry of DELISTED_TOURS) {
      expect(typeof entry.slug).toBe('string');
      expect(entry.slug.length).toBeGreaterThan(0);
      expect(entry.nameKeywords.length).toBeGreaterThan(0);
      expect(entry.redirectTo.startsWith('/')).toBe(true);
      expect(entry.delistedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(isDelistedUrl(entry.redirectTo)).toBe(false);
    }
  });

  it('treats the tour page, its sub-pages and extra paths as delisted, with or without origin, query or trailing slash', () => {
    for (const entry of DELISTED_TOURS) {
      for (const p of delistedPaths(entry)) {
        expect(isDelistedUrl(p)).toBe(true);
        expect(isDelistedUrl(`${p}/`)).toBe(true);
        expect(isDelistedUrl(`${p}/print`)).toBe(true);
        expect(isDelistedUrl(`https://www.ctstours.co.nz${p}?utm_source=ad`)).toBe(true);
      }
    }
    expect(isDelistedUrl('/tours/china/discovery')).toBe(false);
    expect(isDelistedUrl('/tours/china/discovery/golden-china')).toBe(false);
    expect(isDelistedUrl('/')).toBe(false);
  });
});

describe('a delisted tour cannot be reached through the tour data', () => {
  it('is absent from tours, getAllActiveTours and getAllChinaTours', () => {
    const slugs = [
      ...tours.map((tour) => tour.slug),
      ...getAllActiveTours().map((tour) => tour.slug),
      ...getAllChinaTours().map((tour) => tour.slug),
    ];
    expect(slugs.filter((slug) => isDelistedSlug(slug))).toEqual([]);
  });

  it('is absent from the sitemap', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls.filter((url) => isDelistedUrl(url))).toEqual([]);
    const slugs = DELISTED_TOURS.map((entry) => entry.slug);
    expect(urls.filter((url) => slugs.some((slug) => url.includes(slug)))).toEqual([]);
  });

  it('has a 301 redirect to its replacement page for every old path', async () => {
    const config: NextConfigShape = require('../../next.config.js');
    const rules = await config.redirects();
    const problems: string[] = [];
    for (const entry of DELISTED_TOURS) {
      const paths = [...delistedPaths(entry), `${delistedTourPath(entry)}/:path*`];
      for (const p of paths) {
        const rule = rules.find((r) => r.source === p);
        if (!rule) {
          problems.push(`missing rule for ${p}`);
        } else if (rule.statusCode !== 301 || rule.destination !== entry.redirectTo) {
          problems.push(`${p} must be a 301 to ${entry.redirectTo}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});

describe('the known-residue list is honest', () => {
  it('every entry names an existing file, a reason and a ledger card', () => {
    const problems: string[] = [];
    for (const entry of knownResidueEntries()) {
      if (!fs.existsSync(path.join(ROOT, entry.path))) {
        problems.push(`${entry.path}: file does not exist`);
      }
      if (entry.reason.length <= 10) {
        problems.push(`${entry.path}: reason is too short`);
      }
      if (!/^\d{4}-\d{2}-\d{2}-chinatravel-[a-z0-9-]+$/.test(entry.card)) {
        problems.push(`${entry.path}: card "${entry.card}" is not a ledger card id`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('a text file on the list still mentions a delisted tour (otherwise remove it from the list)', () => {
    const problems: string[] = [];
    for (const entry of knownResidueEntries()) {
      if (!TEXT_EXTENSIONS.has(path.extname(entry.path).toLowerCase())) continue;
      const text = fs.readFileSync(path.join(ROOT, entry.path), 'utf8');
      if (findDelistedInText(text).length === 0 && findDelistedInPath(entry.path).length === 0) {
        problems.push(`${entry.path}: no longer mentions a delisted tour`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe('the site source has no delisted tour left', () => {
  it('src/, public/, content/ and scripts/ contain no delisted word in text, SVG or file names outside the allowed files', () => {
    const files = SCAN_ROOTS.flatMap((dir) => walk(path.join(ROOT, dir)));
    const residue = findResidue(files, TEXT_EXTENSIONS, ALLOWED);
    expect(residue).toEqual([]);
  });
});

describe('the built pages have no delisted tour left', () => {
  // Skipped when no production build exists (the CI jest job has none).
  // DELISTED_SCAN_BUILD_DIR can point this at another build output.
  const BUILD_DIR = process.env.DELISTED_SCAN_BUILD_DIR ?? path.join(ROOT, '.next', 'server', 'app');
  const BUILT_EXTENSIONS = new Set(['.html', '.body', '.xml', '.txt']);
  const builtFiles = walk(BUILD_DIR).filter((f) => BUILT_EXTENSIONS.has(path.extname(f).toLowerCase()));
  const hasBuild = builtFiles.some((f) => f.toLowerCase().endsWith('.html'));

  it('fails loudly when a build is required but missing', () => {
    if (process.env.DELISTED_REQUIRE_BUILD === '1') expect(hasBuild).toBe(true);
  });

  (hasBuild ? it : it.skip)(
    'prerendered pages and the built sitemap contain no delisted slug, name keyword or retired path',
    () => {
      const residue = findResidue(builtFiles, BUILT_EXTENSIONS, new Set<string>());
      expect(residue).toEqual([]);
    },
  );
});
