/**
 * WHY — the tier pages (/tours/china/discovery and its siblings) are the category pages every
 * tour page breadcrumbs to, and /tours/china/discovery is where the retired Christmas tours 301
 * to. A redirect target missing from the sitemap is hard for search engines to find, so the
 * sitemap must list every China tier page that currently has an active tour, derived from the
 * tour data, and must not list an empty tier.
 */
import sitemap from '@/app/sitemap';
import { destinations, getToursByDestinationAndTier } from '@/lib/data/tours';
import { DELISTED_TOURS, isDelistedUrl } from '@/lib/data/delisted-tours';
import { getSiteUrl } from '@/lib/site';

const SITE = getSiteUrl();
const urls = () => sitemap().map((entry) => entry.url);

describe('sitemap tier pages', () => {
  it('lists the three China tier pages', () => {
    expect(urls()).toEqual(
      expect.arrayContaining([
        `${SITE}/tours/china/signature`,
        `${SITE}/tours/china/discovery`,
        `${SITE}/tours/china/stopover`,
      ]),
    );
  });

  it('lists every China tier that has an active tour, and only those', () => {
    const expected = destinations
      .filter((d) => d.slug === 'china')
      .flatMap((d) => d.tiers.map((t) => t.slug))
      .filter((tier) => getToursByDestinationAndTier('china', tier).length > 0)
      .map((tier) => `${SITE}/tours/china/${tier}`);
    const tierUrls = urls().filter((u) => /\/tours\/china\/[^/]+$/.test(u));
    expect(tierUrls.slice().sort()).toEqual(expected.slice().sort());
  });

  it('lists the replacement page of every retired tour, so the 301 target is discoverable', () => {
    expect(DELISTED_TOURS.length).toBeGreaterThan(0);
    for (const entry of DELISTED_TOURS) {
      if (!entry.redirectTo.startsWith('/')) continue;
      expect(urls()).toContain(`${SITE}${entry.redirectTo}`);
    }
  });

  it('stays China-only, like the tour pages: no tier page of any other destination', () => {
    const others = destinations.filter((d) => d.slug !== 'china');
    expect(others.length).toBeGreaterThan(0);
    for (const destination of others) {
      expect(urls().filter((u) => u.includes(`/tours/${destination.slug}/`))).toEqual([]);
    }
  });

  it('never lists the same URL twice', () => {
    expect(new Set(urls()).size).toBe(urls().length);
  });

  it('keeps retired tour pages out while listing their replacement tier page', () => {
    expect(urls().filter((u) => isDelistedUrl(u))).toEqual([]);
    expect(isDelistedUrl(`${SITE}/tours/china/discovery`)).toBe(false);
  });

  it('tier page entries carry a valid priority and change frequency', () => {
    const tierEntries = sitemap().filter((e) => /\/tours\/china\/[^/]+$/.test(e.url));
    expect(tierEntries.length).toBeGreaterThan(0);
    for (const entry of tierEntries) {
      expect(typeof entry.priority).toBe('number');
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
      expect(entry.changeFrequency).toBeDefined();
    }
  });
});
