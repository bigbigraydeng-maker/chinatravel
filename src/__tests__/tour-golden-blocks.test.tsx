/**
 * Contract for the 2027 March flagship pages that opt in to the departure table
 * and plain-words booking terms (`goldenBlocks`).
 *
 * Why these checks exist, not just what they do:
 *  - Dates and return dates must match CTS's internal 2027 schedule. A page that
 *    drifts from it sends customers to dates that do not exist.
 *  - The front end only shows departures that already have a published price on
 *    the site. There is no "planned" or "coming soon" state: a date with no price
 *    stays off the page until the back office puts it live.
 *  - The company's Google rating must not be stamped on a single product, and
 *    invented per-tour ratings must stay off these pages.
 *  - PM rule (2026-10-08): the company-age claims are not used in page copy.
 */

import { render, screen } from '@testing-library/react';
import { tours, type Tour } from '@/lib/data/tours';
import { departures } from '@/lib/tour-discovery';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  generateEssentialsTouristTripSchema,
  generateProductSchema,
  generateTourSchema,
} from '@/lib/schema-tour';
import {
  TourBookingTerms,
  TourDepartureTable,
  getDepartureRows,
  hasDepartureRows,
} from '@/components/tours/TourGoldenBlocks';

// slug -> [departure, return] pairs from CTS's 2027 schedule (docs: 2027-departures-master-table)
const SCHEDULE: Record<string, Array<[string, string]>> = {
  essentials: [
    ['11 March 2027', '25 March 2027'],
    ['13 May 2027', '27 May 2027'],
    ['9 September 2027', '23 September 2027'],
    ['28 October 2027', '11 November 2027'],
  ],
  'beijing-xian': [
    ['18 March 2027', '27 March 2027'],
    ['10 June 2027', '19 June 2027'],
    ['21 August 2027', '30 August 2027'],
    ['2 September 2027', '11 September 2027'],
    ['21 October 2027', '30 October 2027'],
    ['14 November 2027', '23 November 2027'],
  ],
  'shanghai-surroundings': [
    ['25 March 2027', '3 April 2027'],
    ['5 November 2027', '14 November 2027'],
  ],
  landscapes: [
    ['26 March 2027', '10 April 2027'],
    ['28 May 2027', '12 June 2027'],
    ['14 June 2027', '29 June 2027'],
    ['8 August 2027', '23 August 2027'],
    ['8 October 2027', '23 October 2027'],
    ['1 November 2027', '16 November 2027'],
  ],
};

// Dates held back from the page until CTS confirms them. 25 May 2027 Shanghai & Surroundings:
// the internal schedule returns on 2 June (9 days) but the product is a 10-day itinerary, so the
// real return date is unknown. Showing a computed 3 June would be a guess.
const HELD_BACK: Record<string, string[]> = { 'shanghai-surroundings': ['25 May 2027'] };

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-10-13T00:00:00Z').getTime());
});
afterAll(() => jest.useRealTimers());

const flagships: Tour[] = tours.filter((t) => t.goldenBlocks);
const destination = { id: 'china', name: 'China', slug: 'china' } as never;

describe('goldenBlocks flagship pages', () => {
  it('only the four reviewed March flagships have opted in', () => {
    for (const t of flagships) expect(Object.keys(SCHEDULE)).toContain(t.slug);
  });

  describe.each(flagships.map((t) => [t.slug, t] as const))('%s', (slug, tour) => {
    it('shows only dates from the 2027 schedule, with matching return dates', () => {
      const known = SCHEDULE[slug].map(([d]) => d);
      expect(tour.departureDates?.length).toBeGreaterThan(0);
      for (const d of tour.departureDates ?? []) expect(known).toContain(d);
      for (const [dep, ret] of SCHEDULE[slug]) {
        expect(computeReturnDate(dep, tour.duration)).toBe(ret);
      }
    });

    it('has no planned / pending departure state', () => {
      expect(tour).not.toHaveProperty('pendingDepartures');
    });

    it('does not show dates that are held back pending CTS confirmation', () => {
      const listed = tour.departureDates ?? [];
      for (const held of HELD_BACK[slug] ?? []) expect(listed).not.toContain(held);
    });

    it('puts one priced offer per listed departure into the markup', () => {
      const offers = ([] as Array<unknown>).concat(generateTourSchema(tour, destination).offers as never);
      expect(offers).toHaveLength(tour.departureDates?.length ?? 1);
      expect(departures(tour, '2026-10-13')).toHaveLength(tour.departureDates?.length ?? 0);
    });

    it('does not put a rating on the product markup', () => {
      expect(tour.suppressAggregateRating).toBe(true);
      expect(generateTourSchema(tour, destination)).not.toHaveProperty('aggregateRating');
      expect(generateProductSchema(tour)).not.toHaveProperty('aggregateRating');
      expect(tour.rating).toBeUndefined();
      expect(tour.reviewCount).toBeUndefined();
      expect(tour.reviewSummary).toBeUndefined();
    });

    it('keeps company-age claims out of every JSON-LD block it emits', () => {
      const ld = JSON.stringify([
        generateTourSchema(tour, destination),
        generateEssentialsTouristTripSchema(tour, destination),
        generateProductSchema(tour),
      ]);
      expect(ld).not.toMatch(/1928|25 years|since 2000|100\+? years/i);
      expect(generateEssentialsTouristTripSchema(tour, destination)).not.toHaveProperty('aggregateRating');
    });

    it('offers carry no start-date fields and drop out once the date has passed', () => {
      const now = ([] as Array<Record<string, unknown>>).concat(
        generateTourSchema(tour, destination).offers as never,
      );
      for (const o of now) {
        expect(o).not.toHaveProperty('availabilityStarts');
        expect(o).not.toHaveProperty('validFrom');
      }
      jest.setSystemTime(new Date('2028-01-01T00:00:00Z').getTime());
      expect(generateTourSchema(tour, destination).offers).toEqual([]);
      expect(hasDepartureRows(tour)).toBe(false);
      jest.setSystemTime(new Date('2026-10-13T00:00:00Z').getTime());
      expect(hasDepartureRows(tour)).toBe(true);
    });

    it('keeps the company-age claims and competitor names out of the page copy', () => {
      const copy = JSON.stringify({
        q: tour.quickAnswer,
        f: tour.faqs,
        s: tour.shortDescription,
        l: tour.planLinks,
      });
      expect(copy).not.toMatch(/1928|25 years|since 2000|100\+? years/i);
      expect(copy).not.toMatch(/wendy wu|intrepid|house of travel|flight centre|trailfinders/i);
    });

    it('answers in the page itself: quick answer and at least five questions', () => {
      expect(tour.quickAnswer).toBeTruthy();
      expect((tour.quickAnswer ?? '').split(/\s+/).length).toBeLessThanOrEqual(90);
      expect((tour.faqs ?? []).length).toBeGreaterThanOrEqual(5);
    });
  });
});

describe('rating markup stays on for pages that have not opted in', () => {
  it('a stopover page still carries the company rating', () => {
    const t = tours.find((x) => !x.goldenBlocks && x.tier === 'stopover') as Tour;
    expect(generateTourSchema(t, destination)).toHaveProperty('aggregateRating');
    expect(generateProductSchema(t)).toHaveProperty('aggregateRating');
  });
});

describe('TourDepartureTable', () => {
  const sample = (over: Partial<Tour> = {}): Tour => ({
    ...(tours.find((t) => t.slug === 'landscapes') as Tour),
    goldenBlocks: true,
    departureDates: ['26 March 2027'],
    departurePricing: { '26 March 2027': 'NZD $7,349' },
    ...over,
  });

  it('shows priced departures and nothing that sounds like a planned or coming-soon date', () => {
    const { container } = render(<TourDepartureTable tour={sample()} />);
    const table = container.querySelector('table') as HTMLElement;
    expect(table.textContent).toContain('26 March 2027');
    expect(table.textContent).toContain('10 April 2027');
    expect(table.textContent).toContain('NZD $7,349');
    expect(container.textContent).not.toMatch(/planned|not yet open|to be confirmed|register interest/i);
  });

  it('drops a date once it has passed and hides the block when none are left', () => {
    jest.setSystemTime(new Date('2027-06-01T00:00:00Z').getTime());
    expect(getDepartureRows(sample())).toEqual([]);
    expect(hasDepartureRows(sample())).toBe(false);
    jest.setSystemTime(new Date('2026-10-13T00:00:00Z').getTime());
  });

  it('does not end the single-supplement note with a double full stop', () => {
    const { container } = render(<TourDepartureTable tour={sample()} />);
    expect(container.textContent).not.toMatch(/\.\./);
  });

  it('renders nothing when the tour has not opted in or is sold out', () => {
    const off = render(<TourDepartureTable tour={sample({ goldenBlocks: false })} />);
    expect(off.container.innerHTML).toBe('');
    const sold = render(<TourDepartureTable tour={sample({ soldOut: true })} />);
    expect(sold.container.innerHTML).toBe('');
  });
});

describe('TourBookingTerms', () => {
  const natural = { ...(tours.find((t) => t.slug === 'landscapes') as Tour), goldenBlocks: true };

  it('states the published deposit, payment, tipping and every cancellation step', () => {
    const { container } = render(<TourBookingTerms tour={natural} />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/non-refundable deposit of NZD \$1,000 per person/);
    // The final-payment deadline is not summarised on the page; the terms page is the source.
    expect(text).not.toMatch(/final payment|120 days|90 days before departure for itineraries/i);
    expect(text).toMatch(/prepaid in New Zealand/);
    expect(text).toMatch(/90 days or more before departure/);
    expect(text).toMatch(/89 to 61 days before departure[^.]*50%/);
    expect(text).toMatch(/60 to 31 days before departure[^.]*75%/);
    expect(text).toMatch(/30 days or less before departure[^.]*100%/);
    expect(text).toMatch(/no\s+minimum spend/);
  });

  it('mentions cruise tickets only on tours that include a cruise', () => {
    const withCruise = render(<TourBookingTerms tour={natural} />).container.textContent ?? '';
    expect(withCruise).toMatch(/air and cruise tickets/);
    const noCruise = {
      ...(tours.find((t) => t.slug === 'beijing-xian') as Tour),
      goldenBlocks: true,
    };
    const without = render(<TourBookingTerms tour={noCruise} />).container.textContent ?? '';
    expect(without).toMatch(/air tickets/);
    expect(without).not.toMatch(/air and cruise tickets/);
  });

  it('matches the figures in the published terms page source', () => {
    const src = readFileSync(join(process.cwd(), 'src/app/terms-and-conditions/TermsContent.tsx'), 'utf8');
    for (const fact of ['$1,000', '90 days', '50%', '75%', '100%']) {
      expect(src).toContain(fact);
    }
  });
});
