/**
 * Contract for the 2027 March flagship pages that opt in to the departure table
 * and plain-words booking terms (`goldenBlocks`).
 *
 * Why these checks exist, not just what they do:
 *  - Dates and return dates must match CTS's internal 2027 schedule. A page that
 *    drifts from it sends customers to dates that do not exist.
 *  - Planned dates with no published price must never reach the Offers schema,
 *    the booking selector or the schedule block, because that would publish a
 *    price and availability nobody has confirmed.
 *  - The company's Google rating must not be stamped on a single product, and
 *    invented per-tour ratings must stay off these pages.
 *  - PM rule (2026-10-08): the company-age claims are not used in page copy.
 */

import { render, screen } from '@testing-library/react';
import { tours, type Tour } from '@/lib/data/tours';
import { departures } from '@/lib/tour-discovery';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { generateProductSchema, generateTourSchema } from '@/lib/schema-tour';
import { TourBookingTerms, TourDepartureTable } from '@/components/tours/TourGoldenBlocks';

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
    ['25 May 2027', '2 June 2027'],
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

const flagships: Tour[] = tours.filter((t) => t.goldenBlocks);
const destination = { id: 'china', name: 'China', slug: 'china' } as never;

describe('goldenBlocks flagship pages', () => {
  it('only the four reviewed March flagships have opted in', () => {
    for (const t of flagships) expect(Object.keys(SCHEDULE)).toContain(t.slug);
  });

  describe.each(flagships.map((t) => [t.slug, t] as const))('%s', (slug, tour) => {
    it('lists exactly the scheduled dates, with matching return dates', () => {
      const listed = [...(tour.departureDates ?? []), ...(tour.pendingDepartures ?? [])];
      expect(listed).toEqual(SCHEDULE[slug].map(([d]) => d));
      for (const [dep, ret] of SCHEDULE[slug]) {
        expect(computeReturnDate(dep, tour.duration)).toBe(ret);
      }
    });

    it('keeps planned dates out of the booking selector and the Offers schema', () => {
      const bookable = departures(tour, '2026-10-13').map((d) => d.label);
      for (const pending of tour.pendingDepartures ?? []) {
        expect(bookable).not.toContain(pending);
      }
      const offers = ([] as Array<{ availabilityStarts?: string }>).concat(
        generateTourSchema(tour, destination).offers as never,
      );
      expect(offers).toHaveLength(tour.departureDates?.length ?? 1);
    });

    it('does not put a rating on the product markup', () => {
      expect(tour.suppressAggregateRating).toBe(true);
      expect(generateTourSchema(tour, destination)).not.toHaveProperty('aggregateRating');
      expect(generateProductSchema(tour)).not.toHaveProperty('aggregateRating');
      expect(tour.rating).toBeUndefined();
      expect(tour.reviewCount).toBeUndefined();
      expect(tour.reviewSummary).toBeUndefined();
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

describe('TourDepartureTable', () => {
  const sample = (over: Partial<Tour> = {}): Tour => ({
    ...(tours.find((t) => t.slug === 'landscapes') as Tour),
    goldenBlocks: true,
    departureDates: ['26 March 2027'],
    departurePricing: { '26 March 2027': 'NZD $7,349' },
    pendingDepartures: ['28 May 2027'],
    ...over,
  });

  it('shows a price only for confirmed dates and marks planned ones as to be confirmed', () => {
    render(<TourDepartureTable tour={sample()} />);
    expect(screen.getByText('NZD $7,349')).toBeTruthy();
    expect(screen.getByText('28 May 2027')).toBeTruthy();
    expect(screen.getByText('12 June 2027')).toBeTruthy();
    expect(screen.getAllByText(/Price to be confirmed/).length).toBe(1);
  });

  it('renders nothing when the tour has not opted in or is sold out', () => {
    const off = render(<TourDepartureTable tour={sample({ goldenBlocks: false })} />);
    expect(off.container.innerHTML).toBe('');
    const sold = render(<TourDepartureTable tour={sample({ soldOut: true })} />);
    expect(sold.container.innerHTML).toBe('');
  });
});

describe('TourBookingTerms', () => {
  it('states the published deposit, payment, tipping and cancellation terms', () => {
    const tour = { ...(tours.find((t) => t.slug === 'landscapes') as Tour), goldenBlocks: true };
    const { container } = render(<TourBookingTerms tour={tour} />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/non-refundable deposit of NZD \$1,000 per person/);
    expect(text).toMatch(/90 days before departure for itineraries under 15 days/);
    expect(text).toMatch(/120 days before departure for\s+itineraries of 15 days or longer/);
    expect(text).toMatch(/prepaid in New Zealand/);
    expect(text).toMatch(/75% of the total booking cost/);
    expect(text).toMatch(/no minimum spend/);
  });
});
