import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getBlogPostBySlug } from '@/lib/data/blogs';
import { getTourBySlug, tours as fallbackTours } from '@/lib/data/tours';
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
import { cityHubMetaForTours } from '@/lib/data/destination-hub-meta';
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
  it('lists active curated tours plus published records whose itinerary or managed city field matches', () => {
    const tours = resolveHubTours(hub.tourRefs, fallbackTours, hub.cityPattern);
    expect(tours.length).toBeGreaterThanOrEqual(hub.tourRefs.length);
    for (const tour of tours) {
      expect(tour.isActive && !tour.soldOut).toBe(true);
      expect((tour.tourCities ?? []).some((city) => hub.cityPattern.test(city)) || cityDayRange(tour, hub.cityPattern)).toBeTruthy();
    }
  });

  it('reports the cheapest listed tour as the starting price, whatever the display order', () => {
    const tours = resolveHubTours(hub.tourRefs, fallbackTours, hub.cityPattern);
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
    const rows = buildDepartureRows(resolveHubTours(hub.tourRefs, fallbackTours, hub.cityPattern), hub.cityPattern);
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(row.dates.length).toBeGreaterThan(0);
    }
  });

  it('builds the sample itinerary from a tour that is in the list', () => {
    const sample = buildSampleItinerary(hub, fallbackTours);
    expect(sample?.days.length).toBeGreaterThan(0);
    expect(hub.tourRefs).toContainEqual(hub.sampleRef);
  });

  it('keeps the meta description within 160 characters and its prices equal to tours.ts', () => {
    const resolvedMeta = cityHubMetaForTours(meta, fallbackTours);
    expect(resolvedMeta.description.length).toBeLessThanOrEqual(180);
    const known = new Set(resolveHubTours(hub.tourRefs, fallbackTours, hub.cityPattern).map((t) => priceNumber(t.price)));
    const quoted = [...resolvedMeta.description.matchAll(/NZD \$([\d,]+)/g)].map((m) => Number(m[1].replace(/,/g, '')));
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
    const groupTours = resolveHubTours(guilinHub.tourRefs, fallbackTours, guilinHub.cityPattern).filter((t) => t.tier !== 'stopover');
    expect(groupTours.map((t) => t.slug)).toEqual(['grand-tour']);
  });

  it('automatically includes newly published tours whose managed city field matches the hub', () => {
    const newTour = {
      ...fallbackTours.find((tour) => tour.slug === 'landscapes')!,
      id: 'new-me-tour',
      slug: 'new-chengdu-route',
      name: 'New Chengdu Route',
      tourCities: ['Chengdu'],
    };
    const tours = resolveHubTours(chengduHub.tourRefs, [...fallbackTours, newTour], chengduHub.cityPattern);
    expect(tours.map((tour) => tour.slug)).toContain('new-chengdu-route');
  });
});
