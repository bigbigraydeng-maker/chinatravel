// Why this exists: the online brochure must show only what the tour record says. A wrong return date, a
// meal count or star rating made up from nothing, or a price that is not the lowest open one would put a
// claim in front of a guest that CTS cannot stand behind.

import type { Tour } from '@/lib/data/tours';
import {
  buildBrochureView,
  departureRows,
  departureSpan,
  hotelStandard,
  mealCount,
  shortTourName,
  stopoverPlace,
  toTourPage,
} from '@/lib/brochure/view';

function tour(over: Partial<Tour>): Tour {
  return {
    id: 'x',
    slug: 'best',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Best of China',
    title: 'Best of China',
    shortDescription: '',
    duration: '15 Days',
    price: 'From NZD $4,080 per person',
    heroImage: '/images/tours/great-wall-cloud-sea.jpg',
    gallery: [],
    highlights: ['Great Wall'],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    metaTitle: '',
    metaDescription: '',
    isActive: true,
    createdAt: '',
    updatedAt: '',
    ...over,
  };
}

const TODAY = '2026-11-18';

test('return date is the last day of the route: 15 days from 11 Mar returns 25 Mar (as the PDF prints it)', () => {
  const rows = departureRows(tour({ departureDates: ['11 March 2027'] }), TODAY);
  expect(rows).toEqual([{ date: '2027-03-11', departs: '11 Mar 2027', returns: '25 Mar 2027', price: 'NZD $4,080' }]);
});

test('a departure on an alternative route uses that route length for its return date', () => {
  const t = tour({
    duration: '16 Days',
    departureDates: ['30 May 2027', '28 May 2027'],
    routeVariants: [{
      id: 'long', label: '30 May', departureDates: ['30 May 2027'],
      itinerary: Array.from({ length: 19 }, (_, i) => ({ day: i + 1, title: '', description: '', meals: [] })),
    }],
  });
  const rows = departureRows(t, TODAY);
  expect(rows.map((r) => [r.departs, r.returns])).toEqual([
    ['28 May 2027', '12 Jun 2027'],
    ['30 May 2027', '17 Jun 2027'],
  ]);
});

test('past departures are not listed and the from price is the lowest open departure', () => {
  const t = tour({
    departureDates: ['3 November 2026', '11 March 2027', '9 September 2027'],
    departurePricing: { '3 November 2026': 'NZD $3,000', '11 March 2027': 'NZD $4,280', '9 September 2027': 'NZD $4,080' },
  });
  const page = toTourPage(t, 1, TODAY);
  expect(page.departures.map((d) => d.departs)).toEqual(['11 Mar 2027', '9 Sep 2027']);
  expect(page.fromPrice).toBe('NZD $4,080');
  expect(page.when).toBe('Mar–Sep 2027');
  expect(page.flag).toBe('2 departures in 2027');
});

test('meals are counted per day from the itinerary; no named meals means no meals box', () => {
  const day = (meals: string[]) => ({ day: 1, title: '', description: '', meals });
  expect(mealCount(tour({ itinerary: [day(['Breakfast', 'Lunch']), day(['Breakfast', 'Dinner (Peking Duck Banquet)']), day(['Meals on board'])] })))
    .toEqual({ total: 4, breakfast: 2, lunch: 1, dinner: 1 });
  expect(mealCount(tour({ itinerary: [day(['Meals on board'])] }))).toBeNull();
});

test('hotel standard comes from the hotel inclusion line, else the nightly hotels, else nothing', () => {
  const night = (accommodation: string) => ({ day: 1, title: '', description: '', meals: [], accommodation });
  expect(hotelStandard(tour({ inclusions: ['4–5 star hotel accommodation'], itinerary: [night('X or similar 5-star')] })))
    .toEqual({ stars: '4–5★', orSimilar: true });
  expect(hotelStandard(tour({ inclusions: ['Hotel accommodation as specified in the itinerary'], itinerary: [night('A (4-star standard)'), night('B (5-star standard)')] })))
    .toEqual({ stars: '4–5★', orSimilar: false });
  expect(hotelStandard(tour({ inclusions: ['Hotel accommodation'], itinerary: [night('Cruise ship')] }))).toBeNull();
});

test('no solo-room price in the record means no solo-room box', () => {
  expect(toTourPage(tour({}), 1, TODAY).solo).toBeNull();
  expect(toTourPage(tour({ singleSupplement: 'NZD $800' }), 1, TODAY).solo).toEqual({ price: '+NZD $800', note: null });
});

test('names and spans read like the PDF', () => {
  expect(shortTourName('China Signature — Silk Road')).toBe('Silk Road');
  expect(stopoverPlace('China Stopover — Beijing Express (3 Days)')).toBe('Beijing Express');
  expect(departureSpan([])).toBeNull();
});

test('overview: Discovery pages before Signature, stopovers cheapest first, Japan and Vietnam apart', () => {
  const view = buildBrochureView([
    tour({ slug: 'sig', tier: 'signature', name: 'China Signature — Silk Road', duration: '18 Days', price: 'NZD $7,999', departureDates: ['13 May 2027'] }),
    tour({ slug: 'disc', departureDates: ['11 March 2027'] }),
    tour({ slug: 'bj', tier: 'stopover', name: 'China Stopover — Beijing (5 Days)', duration: '5 Days', price: 'From NZD $2,120' }),
    tour({ slug: 'sh', tier: 'stopover', name: 'China Stopover — Shanghai Express (2 Days)', duration: '2 Days', price: 'From NZD $875' }),
    tour({ slug: 'jp', destination: 'japan', tier: 'discovery', name: 'Japan Discovery', duration: '10 Days', price: 'NZD $5,000' }),
  ], TODAY);
  expect(view.tourPages.map((t) => [t.index, t.name, t.collection])).toEqual([
    [1, 'Best of China', 'Discovery Collection'],
    [2, 'Silk Road', 'Signature Collection'],
  ]);
  expect(view.guidedFrom).toBe('NZD $4,080');
  expect(view.guidedDepartures).toBe(2);
  expect(view.stopovers.map((s) => s.place)).toEqual(['Shanghai Express', 'Beijing']);
  expect(view.stopoverFrom).toBe('NZD $875');
  expect([view.stopoverMinDays, view.stopoverMaxDays]).toEqual([2, 5]);
  expect(view.asia.map((c) => c.name)).toEqual(['Japan Discovery']);
});
