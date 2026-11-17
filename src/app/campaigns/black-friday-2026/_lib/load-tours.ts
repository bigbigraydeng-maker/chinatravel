import { getPublishedTourBySlug } from '@/lib/data/published-tour-catalog';
import type { Tour } from '@/lib/data/tours';
import { BF_TOURS, eligibleDepartures, type OfferTier } from '@/lib/campaigns/black-friday-2026';

export interface BlackFridayTour {
  tour: Tour;
  tier: OfferTier;
  /** 2027 departures from 1 May that take part in the offer. */
  departures: string[];
}

/**
 * The tours (and departures) in the Black Friday offer, read from the published tour catalogue.
 * Shared by the landing page and the terms page so both always list exactly the same tours and dates.
 * A tour that is inactive, sold out or has no eligible departure is left out.
 */
export async function loadBlackFridayTours(): Promise<BlackFridayTour[]> {
  const loaded = await Promise.all(
    BF_TOURS.map(async (ref) => {
      const tour = await getPublishedTourBySlug(ref.destination, ref.tier, ref.slug);
      if (!tour?.isActive || tour.soldOut) return null;
      const departures = eligibleDepartures(tour.departureDates);
      if (departures.length === 0) return null;
      return { tour, tier: ref.tier, departures };
    })
  );
  return loaded.filter((t): t is BlackFridayTour => t !== null);
}
