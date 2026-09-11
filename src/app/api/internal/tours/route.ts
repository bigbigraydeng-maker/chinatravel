import { NextResponse } from 'next/server';
import { tours } from '@/lib/data/tours';

export const revalidate = 3600;

/**
 * Read-only, structured feed for approved first-party Tour data.
 * This exposes the same public catalogue used by the customer website;
 * availability/seats are deliberately not inferred here.
 */
export async function GET() {
  const sourceVersion = tours.reduce(
    (latest, tour) => (tour.updatedAt > latest ? tour.updatedAt : latest),
    '',
  );

  return NextResponse.json({
    source: 'chinatravel.tours',
    source_version: sourceVersion,
    products: tours.map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      destination: tour.destination,
      tier: tour.tier,
      name: tour.name,
      title: tour.title,
      duration: tour.duration,
      price: tour.price,
      is_active: tour.isActive,
      updated_at: tour.updatedAt,
      departure_dates: tour.departureDates ?? [],
      departure_pricing: tour.departurePricing ?? {},
      tour_cities: tour.tourCities ?? [],
      itinerary: tour.itinerary,
      inclusions: tour.inclusions,
      exclusions: tour.exclusions,
      single_supplement: tour.singleSupplement ?? null,
      max_group_size: tour.maxGroupSize ?? null,
    })),
  });
}
