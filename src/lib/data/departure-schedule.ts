import type { Tour } from '@/lib/data/tours';

/** A schedule row is projected directly from the published ME tour record. */
export type DepartureScheduleRow = {
  slug: Tour['slug'];
  name: Tour['name'];
  destination: 'china';
  tier: 'signature' | 'discovery';
  dates: string[];
  duration: Tour['duration'];
};

/** Build rows from all currently sellable ME records, so new tours join automatically. */
export function publishedDepartureRows(tours: readonly Tour[], tier: 'signature' | 'discovery'): DepartureScheduleRow[] {
  return tours
    .filter((tour) => tour.destination === 'china' && tour.tier === tier && tour.isActive && !tour.soldOut && Boolean(tour.departureDates?.length))
    .map((tour) => ({
      slug: tour.slug,
      name: tour.name,
      destination: 'china' as const,
      tier,
      dates: tour.departureDates ?? [],
      duration: tour.duration,
    }));
}

export function tourPath(row: Pick<DepartureScheduleRow, 'destination' | 'tier' | 'slug'>): string {
  return `/tours/${row.destination}/${row.tier}/${row.slug}`;
}
