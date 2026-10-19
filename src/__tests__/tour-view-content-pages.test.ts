/**
 * Tour pages must actually render <TourViewContent> — the Meta "viewed tour X" signal.
 *
 * shared-blocks.test.ts only proves the component is imported. A static scan cannot see "imported
 * but never rendered", and the tour detail page has two returns (the upgraded layout returns
 * early), so this test counts the rendered usages: dropping one silently stops Meta from learning
 * which tour a visitor looked at, and retargeting audiences ("viewed tour X, did not enquire")
 * would quietly stop filling.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..');
const read = (rel: string) => readFileSync(join(REPO_ROOT, rel), 'utf8');

const TOUR_DETAIL_PATH = 'src/app/tours/[destination]/[tier]/[tour]/page.tsx';
const CAMPAIGN_PATHS = [
  'src/app/campaigns/october-2026/[slug]/page.tsx',
  'src/app/campaigns/fire-fuzz/page.tsx',
  'src/app/campaigns/best-of-china/page.tsx',
  'src/app/campaigns/chongqing/page.tsx',
] as const;

const renderedCount = (src: string) => (src.match(/<TourViewContent\b/g) ?? []).length;

describe('tour pages render the Meta ViewContent block', () => {
  it('the tour detail page renders it on both returns (upgraded layout and standard layout)', () => {
    expect(renderedCount(read(TOUR_DETAIL_PATH))).toBe(2);
  });

  it.each(CAMPAIGN_PATHS)('campaign landing page %s renders it once', (path) => {
    expect(renderedCount(read(path))).toBe(1);
  });
});
