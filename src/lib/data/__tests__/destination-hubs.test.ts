import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getBlogPostBySlug } from '@/lib/data/blogs';
import { getTourBySlug } from '@/lib/data/tours';
import {
  buildDepartureRows,
  buildSampleItinerary,
  cheapestPrice,
  cityDayRange,
  guilinHub,
  resolveHubTours,
  chengduHub,
  xianHub,
  type DestinationHubConfig,
  type RichPart,
} from '@/lib/data/destination-hubs';
import { chengduToursMeta, guilinToursMeta, xianToursMeta } from '@/lib/data/seo-pages';
import { priceNumber } from '@/lib/tour-discovery';

const HUBS: Array<{ name: string; hub: DestinationHubConfig; meta: typeof chengduToursMeta }> = [
  { name: 'chengdu', hub: chengduHub, meta: chengduToursMeta },
  { name: "xi'an", hub: xianHub, meta: xianToursMeta },
  { name: 'guilin', hub: guilinHub, meta: guilinToursMeta },
];

const APP_DIR = join(__dirname, '..', '..', '..', 'app');

function proseLinks(hub: DestinationHubConfig): string[] {
  return hub.prose
    .flatMap((s) => s.paragraphs.flat())
    .filter((p: RichPart): p is { text: string; href: string } => typeof p !== 'string')
    .map((p) => p.href);
}

function hrefResolves(href: string): boolean {
  const parts = href.split('/').filter(Boolean);
  if (parts[0] === 'tours') return !!getTourBySlug(parts[1], parts[2], parts[3]);
  if (parts[0] === 'blog') return !!getBlogPostBySlug(parts[1]);
  return existsSync(join(APP_DIR, parts[0], 'page.tsx'));
}

describe.each(HUBS)('$name destination hub', ({ hub, meta }) => {
  it('lists only active tours that actually pass through the city (a text match in tours.ts is not enough)', () => {
    const tours = resolveHubTours(hub.tourRefs);
    expect(tours).toHaveLength(hub.tourRefs.length);
    for (const tour of tours) {
      expect({ slug: tour.slug, days: cityDayRange(tour, hub.cityPattern) }).toEqual({
        slug: tour.slug,
        days: expect.stringMatching(/^Days? \d+/),
      });
    }
  });

  it('reports the cheapest listed tour as the starting price, whatever the display order', () => {
    const tours = resolveHubTours(hub.tourRefs);
    const cheapest = Math.min(...tours.map((t) => priceNumber(t.price) ?? Infinity));
    expect(priceNumber(cheapestPrice(tours) ?? '')).toBe(cheapest);
  });

  it('never promises flights in the quick answer for land-only stopovers', () => {
    expect(hub.offerSummary).toMatch(/land-only/);
    expect(hub.offerSummary).not.toMatch(/return flights/);
  });

  it('has at least 6 distinct in-prose links, and every one resolves to a real page', () => {
    const links = proseLinks(hub);
    expect(new Set(links).size).toBeGreaterThanOrEqual(6);
    expect(links.filter((href) => !hrefResolves(href))).toEqual([]);
  });

  it('shows only upcoming group departures, each with the days spent in the city', () => {
    const rows = buildDepartureRows(resolveHubTours(hub.tourRefs), hub.cityPattern);
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(row.cityDays).not.toBeNull();
      expect(row.dates.length).toBeGreaterThan(0);
    }
  });

  it('builds the sample itinerary from a tour that is in the list', () => {
    const sample = buildSampleItinerary(hub);
    expect(sample?.days.length).toBeGreaterThan(0);
    expect(hub.tourRefs).toContainEqual(hub.sampleRef);
  });

  it('keeps the meta description within 160 characters and its prices equal to tours.ts', () => {
    expect(meta.description.length).toBeLessThanOrEqual(160);
    const known = new Set(resolveHubTours(hub.tourRefs).map((t) => priceNumber(t.price)));
    const quoted = [...meta.description.matchAll(/NZD \$([\d,]+)/g)].map((m) => Number(m[1].replace(/,/g, '')));
    expect(quoted.length).toBeGreaterThan(0);
    for (const n of quoted) expect(known.has(n)).toBe(true);
  });

  it('keeps the page title within 60 characters and leading with the head word', () => {
    expect(meta.title.length).toBeLessThanOrEqual(62);
    expect(meta.title.toLowerCase().startsWith(meta.cityName.toLowerCase())).toBe(true);
  });
});

describe('guilin hub', () => {
  it('does not claim a group tour other than China Panorama passes through Guilin', () => {
    const groupTours = resolveHubTours(guilinHub.tourRefs).filter((t) => t.tier !== 'stopover');
    expect(groupTours.map((t) => t.slug)).toEqual(['grand-tour']);
  });
});
