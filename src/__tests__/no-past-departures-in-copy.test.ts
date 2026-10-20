/** @jest-environment node */
/**
 * WHY
 * A customer must never be told that a departure which has already left is
 * still coming. This test walks the repo's source and fails when
 * customer-facing copy does that.
 *
 * WHAT IT FLAGS
 * A departure word (depart / departs / departing / departure / departures /
 * leaves / leaving) followed directly by a date that is already past on the
 * Auckland calendar, e.g. "Departs 15 October 2026".
 *
 * WHAT PASSES BY ITSELF
 * A sentence that says sold out / fully booked / has passed / has departed /
 * no longer; dates without a year; the date-before-word wording
 * ("the 15 October 2026 departure").
 *
 * HOW TO LET A GENUINE HISTORICAL SENTENCE THROUGH
 * Add an entry to HISTORICAL_OK below with the file, a snippet of the
 * sentence and the reason. An entry that no longer matches anything fails
 * the test, so the list cannot go stale.
 *
 * KNOWN_STALE_FILES
 * Files that still contain stale copy and are being fixed in follow-up
 * changes. Each listed file must still contain a stale mention (otherwise
 * the test tells you to remove it from the list), so the list can only
 * shrink. Every other scanned file must be clean.
 *
 * IT DEPENDS ON TODAY'S DATE
 * On purpose: it turns red the day after a departure mentioned in copy has
 * left.
 *
 * NOT COVERED
 * Copy assembled from data at runtime, dates written without a year, text
 * inside images or PDFs.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { findPastDepartureMentions, type PastDepartureMention } from '@/lib/data/past-departure-scan';
import { aucklandToday } from '@/lib/data/tour-dates';

// Files that still contain stale copy; each must still have a stale mention.
// Found by the site audit of 2026-10-20 (docs: ledger card 2026-10-19-chinatravel-site-stale-data-cleanup).
// Every entry below is removed by the change that fixes the file, never left behind.
const KNOWN_STALE_FILES: readonly string[] = [
  'src/app/small-group-china-tours/page.tsx', // fixed in the "landing pages" change
  'src/app/great-wall-travel-guide/page.tsx', // fixed in the "landing pages" change
  'src/app/terracotta-warriors-travel-guide/page.tsx', // fixed in the "landing pages" change
  'src/lib/data/discovery-guides.ts', // fixed in the "landing pages" change
  'src/lib/data/blogs-longtail-batch1.ts', // fixed in the "blog posts" change
  'public/campaigns/cts-china-2027.html', // static page: update or take down under ledger item 3
];
// Genuine historical sentences that are allowed to mention a past departure.
const HISTORICAL_OK: ReadonlyArray<{ file: string; snippet: string; reason: string }> = [];
// Top-level directories to walk for customer-facing copy.
const SCAN_ROOTS = ['src', 'public/campaigns'];
// File extensions that can carry customer-facing copy.
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.html', '.md', '.mdx'];
// Path fragments that are never customer-facing copy. The Fire & Fuzz and Chongqing campaign pages are
// archived: next.config.js permanently redirects both URLs to /chongqing-tours, so their copy is never shown.
const SKIP_PATH_PARTS = ['/node_modules/', '/__tests__/', '.test.', '/src/app/api/', '/src/app/marketing/', '/src/app/campaigns/fire-fuzz/', '/src/app/campaigns/chongqing/', 'src/lib/campaigns/fire-fuzz.ts', '/src/lib/tour-parser/', 'src/lib/data/past-departure-scan.ts', 'src/lib/data/marketing-plan-2026.ts', 'src/lib/data/social-posting-plan-2026.ts', 'src/lib/data/staged-departure-prices.ts'];

function toRepoPath(absolutePath: string): string {
  return relative(process.cwd(), absolutePath).split(sep).join('/');
}

function shouldSkipPath(repoPath: string): boolean {
  const withLeadingSlash = `/${repoPath}`;
  return SKIP_PATH_PARTS.some((part) => withLeadingSlash.includes(part));
}

function hasScannedExtension(repoPath: string): boolean {
  return SCAN_EXTENSIONS.some((ext) => repoPath.endsWith(ext));
}

function walkDirectory(absoluteDir: string, out: string[]): void {
  let entries: string[];
  try {
    entries = readdirSync(absoluteDir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const absoluteChild = join(absoluteDir, entry);
    let stats;
    try {
      stats = statSync(absoluteChild);
    } catch {
      continue;
    }
    if (stats.isDirectory()) {
      walkDirectory(absoluteChild, out);
    } else if (stats.isFile()) {
      out.push(absoluteChild);
    }
  }
}

function collectScannedFiles(): string[] {
  const absoluteFiles: string[] = [];
  for (const root of SCAN_ROOTS) {
    const absoluteRoot = join(process.cwd(), root);
    if (!existsSync(absoluteRoot)) continue;
    walkDirectory(absoluteRoot, absoluteFiles);
  }
  const repoPaths: string[] = [];
  for (const absoluteFile of absoluteFiles) {
    const repoPath = toRepoPath(absoluteFile);
    if (!hasScannedExtension(repoPath)) continue;
    if (shouldSkipPath(repoPath)) continue;
    repoPaths.push(repoPath);
  }
  return repoPaths;
}

function isAllowed(file: string, mention: PastDepartureMention): boolean {
  return HISTORICAL_OK.some(
    (entry) => entry.file === file && mention.sentence.includes(entry.snippet),
  );
}

function cutSentence(sentence: string): string {
  return sentence.length > 160 ? `${sentence.slice(0, 160)}…` : sentence;
}

describe('no past departures in customer-facing copy', () => {
  const today = aucklandToday();
  const mentionsByFile = new Map<string, PastDepartureMention[]>();

  beforeAll(() => {
    for (const repoPath of collectScannedFiles()) {
      const text = readFileSync(join(process.cwd(), repoPath), 'utf8');
      const mentions = findPastDepartureMentions(text, today);
      if (mentions.length > 0) {
        mentionsByFile.set(repoPath, mentions);
      }
    }
  });

  it('has no stale departure copy outside the known-stale files', () => {
    const lines: string[] = [];
    for (const [file, mentions] of mentionsByFile) {
      if (KNOWN_STALE_FILES.includes(file)) continue;
      for (const mention of mentions) {
        if (isAllowed(file, mention)) continue;
        lines.push(`${file}:${mention.line}  "${mention.date}"  ${cutSentence(mention.sentence)}`);
      }
    }
    const message = lines.length === 0
      ? ''
      : [
          'Stale departure copy found:',
          ...lines,
          '',
          'Fix by updating the copy to the next real departure, or add a HISTORICAL_OK entry with a reason.',
        ].join('\n');
    expect(message).toBe('');
  });

  it('every known-stale file still has a stale mention', () => {
    const problems: string[] = [];
    for (const file of KNOWN_STALE_FILES) {
      const absolutePath = join(process.cwd(), file);
      const mentions = mentionsByFile.get(file) ?? [];
      const hasStale = existsSync(absolutePath)
        && mentions.some((mention) => !isAllowed(file, mention));
      if (!hasStale) {
        problems.push(`${file} no longer has stale departure copy — remove it from KNOWN_STALE_FILES`);
      }
    }
    expect(problems.join('\n')).toBe('');
  });

  it('every HISTORICAL_OK entry still matches a mention', () => {
    const problems: string[] = [];
    for (const entry of HISTORICAL_OK) {
      const mentions = mentionsByFile.get(entry.file) ?? [];
      const matched = mentions.some((mention) => mention.sentence.includes(entry.snippet));
      if (!matched) {
        problems.push(`HISTORICAL_OK entry for ${entry.file} ("${entry.snippet}") matches nothing — delete it`);
      }
    }
    expect(problems.join('\n')).toBe('');
  });
});
