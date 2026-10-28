/**
 * Guards the Product Owner's 19 October 2026 price table as the source of truth.
 *
 * Every departure that is live on the site must show exactly the table price, and
 * every departure that is not live yet must be parked in STAGED_DEPARTURE_PRICES.
 * A staged price must never sit inside `departurePricing`: that would leak it into
 * the feed and the page markup before the departure is actually on sale.
 */

import { tours } from '@/lib/data/tours';
import { STAGED_DEPARTURE_PRICES } from '@/lib/data/staged-departure-prices';
import { priceNumber } from '@/lib/tour-discovery';
import { generateTourSchema } from '@/lib/schema-tour';
import { getDepartureRows } from '@/components/tours/TourGoldenBlocks';

// slug -> [departure label, NZD per person twin share], from the Product Owner's table.
const PRICE_TABLE_2027: Record<string, Array<[string, number]>> = {
  landscapes: [
    ['28 May 2027', 7349],
    ['14 June 2027', 7849],
    ['8 August 2027', 7849],
    ['8 October 2027', 7849],
    ['1 November 2027', 7849],
  ],
  'silk-road': [
    ['13 May 2027', 7999],
    ['21 October 2027', 8499],
  ],
  'imperial-heritage': [
    ['28 May 2027', 9999],
    ['3 September 2027', 10499],
  ],
  'grand-tour': [
    ['8 May 2027', 10899],
    ['16 October 2027', 11399],
  ],
  'shanghai-surroundings': [
    ['25 March 2027', 2699],
    ['25 May 2027', 2899],
    ['5 November 2027', 2899],
  ],
  essentials: [
    ['11 March 2027', 4080],
    ['13 May 2027', 4080],
    ['9 September 2027', 4380],
    ['28 October 2027', 4380],
  ],
  'beijing-xian': [
    ['18 March 2027', 3480],
    ['10 June 2027', 3680],
    ['21 August 2027', 3680],
    ['2 September 2027', 3680],
    ['21 October 2027', 3680],
    ['14 November 2027', 3680],
  ],
};

const CANCELLED_DEPARTURES: Record<string, string[]> = {
  landscapes: ['26 March 2027'],
};

const tourBySlug = (slug: string) => {
  const t = tours.find((x) => x.slug === slug && x.destination === 'china');
  if (!t) throw new Error(`missing tour ${slug}`);
  return t;
};

const destination = { id: 'china', name: 'China', slug: 'china' } as never;

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-10-19T00:00:00Z').getTime());
});
afterAll(() => jest.useRealTimers());

describe('2027 departure prices follow the Product Owner price table', () => {
  it('cancelled departures stay out of live and staged tour data', () => {
    for (const [slug, dates] of Object.entries(CANCELLED_DEPARTURES)) {
      const tour = tourBySlug(slug);
      for (const date of dates) {
        expect(tour.departureDates ?? []).not.toContain(date);
        expect(tour.departurePricing ?? {}).not.toHaveProperty(date);
        expect(STAGED_DEPARTURE_PRICES[slug] ?? {}).not.toHaveProperty(date);
      }
    }
  });

  it('every live departure shows the table price', () => {
    const mismatches: string[] = [];
    for (const [slug, rows] of Object.entries(PRICE_TABLE_2027)) {
      const tour = tourBySlug(slug);
      const live = tour.departureDates ?? [];
      for (const [label, price] of rows) {
        if (!live.includes(label)) continue;
        const effective = tour.departurePricing?.[label] ?? tour.price;
        const actual = priceNumber(effective);
        if (actual !== price) {
          mismatches.push(`${slug} ${label}: expected ${price}, got ${String(actual)}`);
        }
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('every table departure that is not live is parked at the same price in STAGED_DEPARTURE_PRICES', () => {
    const mismatches: string[] = [];
    for (const [slug, rows] of Object.entries(PRICE_TABLE_2027)) {
      const tour = tourBySlug(slug);
      const live = tour.departureDates ?? [];
      for (const [label, price] of rows) {
        if (live.includes(label)) continue;
        const staged = STAGED_DEPARTURE_PRICES[slug]?.[label];
        if (!staged) {
          mismatches.push(`${slug} ${label}: not parked in STAGED_DEPARTURE_PRICES`);
          continue;
        }
        const actual = priceNumber(staged);
        if (actual !== price) {
          mismatches.push(`${slug} ${label}: expected ${price}, got ${String(actual)}`);
        }
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('parked prices never leak into departurePricing', () => {
    const leaks: string[] = [];
    for (const [slug, staged] of Object.entries(STAGED_DEPARTURE_PRICES)) {
      const tour = tourBySlug(slug);
      const live = tour.departureDates ?? [];
      const priced = Object.keys(tour.departurePricing ?? {});
      for (const label of Object.keys(staged)) {
        if (live.includes(label)) continue;
        if (priced.includes(label)) leaks.push(`${slug} ${label}`);
      }
    }
    expect(leaks).toEqual([]);
  });

  it('staged table never contradicts the Product Owner table', () => {
    const mismatches: string[] = [];
    for (const [slug, staged] of Object.entries(STAGED_DEPARTURE_PRICES)) {
      const table = PRICE_TABLE_2027[slug] ?? [];
      for (const [label, price] of Object.entries(staged)) {
        const row = table.find(([l]) => l === label);
        if (!row) {
          mismatches.push(`${slug} ${label}: not in the Product Owner table`);
          continue;
        }
        const actual = priceNumber(price);
        if (actual !== row[1]) {
          mismatches.push(`${slug} ${label}: expected ${row[1]}, got ${String(actual)}`);
        }
      }
    }
    expect(mismatches).toEqual([]);
  });
});

describe('customer-visible outputs use the new live prices', () => {
  it('Tale of Two Cities departure table shows 3,480 for 18 March and 3,680 for 10 June', () => {
    const rows = getDepartureRows(tourBySlug('beijing-xian'), '2026-10-19').map((r) => [r.label, r.price]);
    expect(rows).toEqual([
      ['18 March 2027', 'NZD $3,480'],
      ['10 June 2027', 'NZD $3,680'],
    ]);
  });

  it('Silk Road and China Panorama mark up each departure at its own price', () => {
    const silkRoad = ([] as Array<{ price: number }>).concat(
      generateTourSchema(tourBySlug('silk-road'), destination).offers as never,
    );
    expect(silkRoad.map((o) => o.price)).toEqual([7999, 8499]);

    const grandTour = ([] as Array<{ price: number }>).concat(
      generateTourSchema(tourBySlug('grand-tour'), destination).offers as never,
    );
    expect(grandTour.map((o) => o.price)).toEqual([10899, 11399]);
  });
});
