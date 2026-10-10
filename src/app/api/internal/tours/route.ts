import { NextResponse } from 'next/server';
import { tours } from '@/lib/data/tours';
import { tourToFeed } from '@/lib/tour-feed';

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
    products: tours.map(tourToFeed),
  });
}
