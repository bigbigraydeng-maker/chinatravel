import type { DayItinerary, Tour, TourRouteVariant } from '@/lib/data/tours';

export interface ResolvedRoute {
  itinerary: DayItinerary[];
  /** The alternative route in use, or null for the tour's own (default) route. */
  variant: TourRouteVariant | null;
}

/**
 * Which itinerary a printed page or an itinerary email should carry. An unknown or missing
 * route id means the default route, so a stale link never produces an empty or wrong page.
 */
export function resolveTourRoute(tour: Pick<Tour, 'itinerary' | 'routeVariants'>, route: unknown): ResolvedRoute {
  const variant = typeof route === 'string' ? (tour.routeVariants ?? []).find((v) => v.id === route) : undefined;
  return variant ? { itinerary: variant.itinerary, variant } : { itinerary: tour.itinerary, variant: null };
}
