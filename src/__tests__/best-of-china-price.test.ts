/**
 * Machine gate that keeps ONE published price for the tour "Best of China" across the whole site.
 *
 * Best of China is sold at the headline price in the tour data (NZD $4,080 today). The figure 3,880
 * was published by mistake on several pages; it is also the planned early-bird figure, so a customer
 * who meets it anywhere takes it as the price and then finds a different one at booking. This gate
 * fails when 3,880 appears next to the tour name in site text, and when a structured Best of China
 * price (table row object or JSON-LD offer) differs from the tour data. It scans src/, public/ and
 * content/ (the delisting gate also scans scripts/, which holds one-off tools and archived records
 * that never reach visitors) and, when a production build exists, the built pages. When the early
 * bird launches this gate must be changed on purpose, e.g. to allow 3,880 only next to the words
 * "early bird".
 */
import fs from 'fs';
import path from 'path';
import { normalizeForScan } from '@/lib/data/delisted-tours';
import { getTourBySlug } from '@/lib/data/tours';
import { priceNumber } from '@/lib/tour-discovery';

const ROOT = process.cwd();
const SCAN_ROOTS = ['src', 'public', 'content'];
const NAME = 'best of china';
const WINDOW = 250;
const STALE_FIGURES = [3880];
const tour = getTourBySlug('china', 'discovery', 'essentials');
const PRICE = tour ? priceNumber(tour.price) : null;

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

function figureRegex(figure: number): RegExp {
  const digits = String(figure);
  const head = digits.slice(0, -3);
  const tail = digits.slice(-3);
  return new RegExp(`(?<![\\d,.])${head}[,. ]?${tail}(?!\\d)`, 'g');
}

function squashed(raw: string): string {
  return raw.toLowerCase().replace(/\s+/g, ' ');
}

/** Stale figures within WINDOW characters of the tour name, looked at in two forms of the text: the delisting gate's normalised form (tags, entities and escapes removed) and the plainly squashed text. */
function staleFigureProblems(raw: string): string[] {
  const problems = new Set<string>();
  for (const text of [normalizeForScan(raw), squashed(raw)]) {
    for (const figure of STALE_FIGURES) {
      for (const match of text.matchAll(figureRegex(figure))) {
        const at = match.index ?? 0;
        const around = text.slice(Math.max(0, at - WINDOW), at + match[0].length + WINDOW);
        if (around.includes(NAME)) {
          problems.add(`${match[0]} next to "Best of China": ...${text.slice(Math.max(0, at - 50), at + 50)}...`);
        }
      }
    }
  }
  return [...problems];
}

const STRUCTURED_NAME = String.raw`["']?name["']?\s*:\s*["']Best of China(?:\s+[—–-]\s+\d[^"']*)?["']`;
const STRUCTURED_PRICE = String.raw`["']?(?:priceNZD|priceFrom|price)["']?\s*:\s*["']?(?:From\s+)?(?:NZD\s*)?\$?\s*(\d[\d,]*)`;

/** Prices written in the same object as the exact name "Best of China" (or "Best of China - <date>"), as table rows or JSON-LD offers. */
function structuredPriceProblems(raw: string, expected: number): string[] {
  const problems: string[] = [];
  const regex = new RegExp(`${STRUCTURED_NAME}[^{}]{0,400}?${STRUCTURED_PRICE}`, 'gi');
  for (const match of raw.matchAll(regex)) {
    const amount = Number(match[1].replace(/,/g, ''));
    if (amount !== expected) problems.push(`Best of China priced ${amount}, expected ${expected}`);
  }
  return problems;
}

function findProblems(files: string[], extensions: Set<string>, skip: Set<string>): string[] {
  const problems: string[] = [];
  for (const file of files) {
    const relativePath = toRelative(file);
    if (skip.has(relativePath)) continue;
    if (!extensions.has(path.extname(file).toLowerCase())) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const problem of staleFigureProblems(text)) {
      problems.push(`${relativePath}: ${problem}`);
    }
    if (PRICE !== null) {
      for (const problem of structuredPriceProblems(text, PRICE)) {
        problems.push(`${relativePath}: ${problem}`);
      }
    }
  }
  return problems;
}

const skipSet = new Set<string>([toRelative(__filename)]);

describe('Best of China has one published price', () => {
  it('the tour data publishes a readable headline price (the single source of truth)', () => {
    expect(tour).toBeTruthy();
    expect(PRICE).not.toBeNull();
    expect(PRICE as number).toBeGreaterThan(0);
  });

  it('the site source has no stale Best of China figure and every structured price equals the tour price', () => {
    const files = SCAN_ROOTS.flatMap((dir) => walk(path.join(ROOT, dir)));
    expect(findProblems(files, TEXT_EXTENSIONS, skipSet)).toEqual([]);
  });

  // Skipped when no production build exists (the CI jest job has none).
  // DELISTED_SCAN_BUILD_DIR can point this at another build output.
  const BUILD_DIR = process.env.DELISTED_SCAN_BUILD_DIR ?? path.join(ROOT, '.next', 'server', 'app');
  const BUILT_EXTENSIONS = new Set(['.html', '.body', '.xml', '.txt']);
  const builtFiles = walk(BUILD_DIR).filter((f) => BUILT_EXTENSIONS.has(path.extname(f).toLowerCase()));
  const hasBuild = builtFiles.some((f) => f.toLowerCase().endsWith('.html'));

  (hasBuild ? it : it.skip)(
    'the built pages have no stale Best of China figure and every structured price equals the tour price',
    () => {
      expect(findProblems(builtFiles, BUILT_EXTENSIONS, new Set<string>())).toEqual([]);
    },
  );
});

describe('the detector itself', () => {
  it('flags 3,880 written next to the tour name in prose, with any spelling of the figure', () => {
    const samples = [
      'Best of China ($3,880)',
      'Best of China from NZ$3,880 per person',
      'Best of China · 15 days from NZD $3,880',
      'from NZD $3880 — Best of China',
      'Best of China costs NZD 3 880',
      'best of china &#36;3,880',
    ];
    for (const sample of samples) {
      expect(staleFigureProblems(sample).length).toBeGreaterThan(0);
    }
  });

  it('flags the old price in JSON-LD and in table objects', () => {
    const jsonLd =
      '{ "@type": "Offer", "name": "Best of China — 3 November 2026", "price": "3880", "priceCurrency": "NZD" }';
    const tableRow = "{ name: 'Best of China', slug: 'x', days: 15, priceNZD: 3880, cities: 'y' }";
    expect(staleFigureProblems(jsonLd).length).toBeGreaterThan(0);
    expect(staleFigureProblems(tableRow).length).toBeGreaterThan(0);
    expect(structuredPriceProblems(jsonLd, 4080)).toHaveLength(1);
    expect(structuredPriceProblems(tableRow, 4080)).toHaveLength(1);
  });

  it('accepts the correct price in every written form', () => {
    const jsonLd =
      '{ "@type": "Offer", "name": "Best of China — 3 November 2026", "price": "4080", "priceCurrency": "NZD" }';
    const tableRow = "{ name: 'Best of China', slug: 'x', days: 15, priceNZD: 4080, cities: 'y' }";
    const samples = [
      'Best of China ($4,080)',
      'Best of China · 15 days from NZD $4,080',
      jsonLd,
      tableRow,
      "{ name: 'Best of China', price: 'From NZD $4,080 per person' }",
      "{ name: 'Best of China', priceFrom: 'NZD $4,080' }",
    ];
    for (const sample of samples) {
      expect(staleFigureProblems(sample)).toEqual([]);
      expect(structuredPriceProblems(sample, 4080)).toEqual([]);
    }
  });

  it('does not confuse other numbers and other products with the stale figure', () => {
    const samples = [
      'Shanghai & Surroundings from NZD $3,880',
      'Best of China from NZD $13,880',
      'Best of China from NZD $4,080 ' + 'x'.repeat(400) + ' NZD $3,880',
    ];
    for (const sample of samples) {
      expect(staleFigureProblems(sample)).toEqual([]);
    }
    expect(structuredPriceProblems("{ name: 'Best of China + Yangtze Cruise', priceFrom: 'NZD $5,999' }", 4080)).toEqual([]);
    expect(structuredPriceProblems("{ name: 'Shanghai & Surroundings', price: 'NZD $2,699' }", 4080)).toEqual([]);
  });
});
