import { extractRouteFromItinerary, canRenderItineraryMap } from '@/lib/itinerary-map/extractRouteFromItinerary';
import { getTourBySlug } from '@/lib/data/tours';

describe('extractRouteFromItinerary', () => {
  it('builds a multi-stop China route for Beijing & Xi’an discovery tour', () => {
    const tour = getTourBySlug('china', 'discovery', 'beijing-xian');
    expect(tour).toBeTruthy();
    const route = extractRouteFromItinerary(tour!.itinerary);
    expect(route).not.toBeNull();
    expect(canRenderItineraryMap(route)).toBe(true);
    const ids = route!.stops.map(s => s.cityId);
    expect(ids).toContain('beijing');
    expect(ids).toContain('xian');
    expect(route!.segments).toHaveLength(route!.stops.length - 1);
  });

  it('builds a route for Shanghai & Surroundings delta tour', () => {
    const tour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');
    expect(tour).toBeTruthy();
    const route = extractRouteFromItinerary(tour!.itinerary);
    expect(route).not.toBeNull();
    expect(canRenderItineraryMap(route)).toBe(true);
    expect(route!.stops.length).toBeGreaterThanOrEqual(2);
  });
});
