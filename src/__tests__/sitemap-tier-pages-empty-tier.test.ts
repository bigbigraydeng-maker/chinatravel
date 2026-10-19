/**
 * WHY — a tier with no active tour renders a thin, empty category page. The sitemap derives its
 * tier pages from the tour data, so the day a tier runs out of tours (every departure retired,
 * product paused) it must drop out by itself instead of being submitted to search engines as an
 * empty page. All three China tiers have tours today, so this test empties one on purpose.
 */
import sitemap from '@/app/sitemap';
import { getSiteUrl } from '@/lib/site';

jest.mock('@/lib/data/tours', () => {
  const actual = jest.requireActual('@/lib/data/tours');
  return {
    ...actual,
    getToursByDestinationAndTier: (destination: string, tier: string) =>
      destination === 'china' && tier === 'signature' ? [] : actual.getToursByDestinationAndTier(destination, tier),
  };
});

const SITE = getSiteUrl();

describe('sitemap tier pages — a tier without active tours', () => {
  it('drops the emptied tier but keeps the others', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).not.toContain(`${SITE}/tours/china/signature`);
    expect(urls).toContain(`${SITE}/tours/china/discovery`);
    expect(urls).toContain(`${SITE}/tours/china/stopover`);
  });
});
