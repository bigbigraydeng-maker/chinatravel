/**
 * Shared-blocks contract test — Phase 0 v3.1 §4.7
 *
 * CLAUDE.md requires the tour detail page and the three campaign LPs
 * (October 2026, Fire & Fuzz, Best of China) to render the same "tour block"
 * component set — TourHero / TourEnquiry / ChinaVisaNudge / FAQSection / …
 * so shared UX and shared UTM/lead behaviour stays consistent.
 *
 * v1 review found `fire-fuzz` was already a third fork of the pattern, drifting
 * from the rule that lived only in CLAUDE.md prose. This test freezes the
 * canonical list in code: adding a shared block to `tours/[…]/[tour]/page.tsx`
 * without adding it to all three campaign LPs (or vice versa) turns the CI
 * red immediately.
 *
 * The check is a static source scan — it looks for `import … from
 * '@/components/…'` lines, so it's cheap and doesn't need to run the pages.
 * That means it can catch "someone dropped the import" but not "someone
 * imported it and forgot to actually render it". Rendering coverage stays a
 * PR-review responsibility (Phase A PR checklist, appendix C).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..');

const TOUR_DETAIL_PATH = 'src/app/tours/[destination]/[tier]/[tour]/page.tsx';
const CAMPAIGN_PATHS = [
  'src/app/campaigns/october-2026/[slug]/page.tsx',
  'src/app/campaigns/fire-fuzz/page.tsx',
  'src/app/campaigns/best-of-china/page.tsx',
] as const;

/**
 * Canonical shared blocks. Every entry must appear as an import in the tour
 * detail page and in every campaign LP listed above. If a design decision
 * removes one, delete it here first — the test will then start failing on
 * pages that still import it, which flags the cleanup work.
 */
const SHARED_BLOCKS = [
  'TourHero',
  'TourHighlights',
  'TourItinerary',
  'TourInclusions',
  'TourGallery',
  'TourEnquiry',
  'Testimonials',
  'RelatedTours',
  'TrustBar',
  'TourTrustSignals',
  'TourSupportingContentLinks',
  'ChinaVisaNudge',
  'BakerTourFirstPerson',
  'FloatingCta',
  'FAQSection',
  'FacebookFollowStrip',
  'CtsDepartureScheduleBlock',
  'SchemaMarkup',
] as const;

function extractImportedIdentifiers(relPath: string): Set<string> {
  const src = readFileSync(join(REPO_ROOT, relPath), 'utf8');
  const ids = new Set<string>();

  // Default imports:  import Foo from '@/components/…'
  const defaultRe = /import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]@\/components\//g;
  let m: RegExpExecArray | null;
  while ((m = defaultRe.exec(src))) ids.add(m[1]);

  // Named imports:  import { A, B as C } from '@/components/…'
  const namedRe = /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\//g;
  while ((m = namedRe.exec(src))) {
    m[1]
      .split(',')
      .map((s) => s.trim().split(/\s+as\s+/)[0].trim())
      .filter(Boolean)
      .forEach((id) => ids.add(id));
  }

  return ids;
}

describe('shared-blocks contract (CLAUDE.md)', () => {
  const tourImports = extractImportedIdentifiers(TOUR_DETAIL_PATH);

  it('tour detail imports every canonical shared block', () => {
    const missing = SHARED_BLOCKS.filter((b) => !tourImports.has(b));
    expect(missing).toEqual([]);
  });

  it.each(CAMPAIGN_PATHS)(
    'campaign LP %s imports every canonical shared block',
    (path) => {
      const imports = extractImportedIdentifiers(path);
      const missing = SHARED_BLOCKS.filter((b) => !imports.has(b));
      expect(missing).toEqual([]);
    }
  );

  it('every canonical shared block appears in all four pages (double-check)', () => {
    const pageImports = [
      tourImports,
      ...CAMPAIGN_PATHS.map(extractImportedIdentifiers),
    ];
    for (const block of SHARED_BLOCKS) {
      for (const [i, imports] of pageImports.entries()) {
        expect({ block, page: i === 0 ? TOUR_DETAIL_PATH : CAMPAIGN_PATHS[i - 1], hasIt: imports.has(block) })
          .toEqual({ block, page: i === 0 ? TOUR_DETAIL_PATH : CAMPAIGN_PATHS[i - 1], hasIt: true });
      }
    }
  });
});
