/** @jest-environment node */
/**
 * WHY — the October 2026 campaign pages only said "Sold Out" once both departures had left, so
 * they now send every visitor — paid-ad clicks included — to the standard tour pages. Meta and
 * Google attribution depends on the query string (utm_*, fbclid) surviving the redirect, and
 * Next.js passes the visitor's query string through only when the redirect destination has no
 * query of its own; so the destinations must be plain paths. A URL that redirects must also not
 * stay in the sitemap, and ad links built by the marketing board should point straight at the
 * tour pages.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sitemap from '@/app/sitemap';
import { getTourBySlug } from '@/lib/data/tours';
import { buildOctober2026CampaignAdUrl, buildSpotlightPosterAdUrl } from '@/lib/campaigns/october-2026-discovery';

type Redirect = { source: string; destination: string; permanent?: boolean; statusCode?: number };
const nextConfig = require(join(process.cwd(), 'next.config.js')) as { redirects: () => Promise<Redirect[]> };
const loadRedirects = () => nextConfig.redirects();
const ORIGIN = 'https://www.ctstours.co.nz';
const TALE = { source: '/campaigns/october-2026/tale-of-two-cities', destination: '/tours/china/discovery/beijing-xian', tourSlug: 'beijing-xian' };
const SHANGHAI = { source: '/campaigns/october-2026/shanghai-surroundings', destination: '/tours/china/discovery/shanghai-surroundings', tourSlug: 'shanghai-surroundings' };
const POSTER = { source: '/spotlight/october-2026', destination: '/tours/china/discovery' };

describe('October 2026 campaign pages redirect to the live tour pages', () => {
  it('sends the Tale of Two Cities page to its tour page, permanently', async () => {
    const rules = (await loadRedirects()).filter((r) => r.source === TALE.source);
    expect(rules).toHaveLength(1);
    expect(rules[0].destination).toBe(TALE.destination);
    expect(rules[0].permanent).toBe(true);
  });

  it('sends the Shanghai & Surroundings page to its tour page, permanently', async () => {
    const rules = (await loadRedirects()).filter((r) => r.source === SHANGHAI.source);
    expect(rules).toHaveLength(1);
    expect(rules[0].destination).toBe(SHANGHAI.destination);
    expect(rules[0].permanent).toBe(true);
  });

  it('sends the October poster to the Discovery list, permanently', async () => {
    const rules = (await loadRedirects()).filter((r) => r.source === POSTER.source);
    expect(rules).toHaveLength(1);
    expect(rules[0].destination).toBe(POSTER.destination);
    expect(rules[0].permanent).toBe(true);
  });

  it("keeps the visitor's query string: no destination has a query or fragment of its own", async () => {
    const redirects = await loadRedirects();
    for (const source of [TALE.source, SHANGHAI.source, POSTER.source]) {
      const rule = redirects.find((r) => r.source === source);
      expect(rule).toBeDefined();
      expect(rule?.destination).not.toContain('?');
      expect(rule?.destination).not.toContain('#');
    }
  });

  it('every destination is a live page', () => {
    const tale = getTourBySlug('china', 'discovery', TALE.tourSlug);
    expect(tale).toBeDefined();
    expect(tale?.isActive).toBe(true);

    const shanghai = getTourBySlug('china', 'discovery', SHANGHAI.tourSlug);
    expect(shanghai).toBeDefined();
    expect(shanghai?.isActive).toBe(true);

    expect(existsSync(join(process.cwd(), 'src/app/tours/[destination]/[tier]/page.tsx'))).toBe(true);
  });

  it('still sends the exact October hub to the spotlight hub', async () => {
    const rules = (await loadRedirects()).filter((r) => r.source === '/campaigns/october-2026');
    expect(rules).toHaveLength(1);
    expect(rules[0].destination).toBe('/campaigns/spotlight');
  });

  it('the sitemap no longer lists the redirected pages', () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.filter((u) => u.includes('/campaigns/october-2026/'))).toEqual([]);
    expect(urls.filter((u) => u.includes('/spotlight/october-2026'))).toEqual([]);
    expect(urls.some((u) => u.endsWith('/campaigns/spotlight'))).toBe(true);
  });

  it('ad links built for the marketing board point straight at the tour pages and keep their UTM', () => {
    expect(
      buildOctober2026CampaignAdUrl(ORIGIN, 'tale-of-two-cities', {
        source: 'facebook',
        medium: 'paid_social',
        campaign: 'oct2026_meta_cold',
        content: 'tale_fb_post',
      }),
    ).toBe(
      `${ORIGIN}/tours/china/discovery/beijing-xian?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_post`,
    );

    expect(
      buildOctober2026CampaignAdUrl(ORIGIN, 'shanghai-surroundings', {
        source: 'google',
        medium: 'cpc',
        campaign: 'tour_discovery_oct2026',
      }),
    ).toBe(
      `${ORIGIN}/tours/china/discovery/shanghai-surroundings?utm_source=google&utm_medium=cpc&utm_campaign=tour_discovery_oct2026`,
    );

    expect(
      buildSpotlightPosterAdUrl(ORIGIN, {
        source: 'nz_newspaper',
        medium: 'print',
        campaign: 'oct2026_poster',
      }),
    ).toBe(`${ORIGIN}/tours/china/discovery?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_poster`);
  });

  it('no redirect sends visitors to a URL that is itself redirected (no chains or loops)', async () => {
    const redirects = await loadRedirects();
    const isPlainPath = (path: string) => !/[:(*?]/.test(path);
    const plainSources = new Map(redirects.filter((r) => isPlainPath(r.source)).map((r) => [r.source, r.destination]));
    const chained = redirects
      .filter((r) => isPlainPath(r.destination) && plainSources.has(r.destination))
      .map((r) => `${r.source} -> ${r.destination} -> ${plainSources.get(r.destination)}`);

    expect(chained).toEqual([]);
  });
});
