import { resolveTourRoute } from '@/lib/data/tour-route';

const day = (title: string) => [{ day: 1, title, description: 'd', meals: [] }];
const tour = {
  itinerary: day('May day 1'),
  routeVariants: [{ id: 'oct-2027', label: '16 October 2027', departureDates: ['16 October 2027'], itinerary: day('Oct day 1') }],
};

describe('resolveTourRoute', () => {
  it('uses the tour itinerary when no route is asked for', () => {
    expect(resolveTourRoute(tour, undefined)).toEqual({ itinerary: tour.itinerary, variant: null });
  });

  it('uses the variant itinerary for a known route id', () => {
    const r = resolveTourRoute(tour, 'oct-2027');
    expect(r.itinerary[0].title).toBe('Oct day 1');
    expect(r.variant?.label).toBe('16 October 2027');
  });

  it('falls back to the default for an unknown id, "base" or a non-string', () => {
    for (const bad of ['nope', 'base', '', 7, null, ['oct-2027']]) {
      expect(resolveTourRoute(tour, bad).itinerary[0].title).toBe('May day 1');
    }
  });

  it('works for a tour with no variants at all', () => {
    expect(resolveTourRoute({ itinerary: tour.itinerary }, 'oct-2027').variant).toBeNull();
  });
});
