import { getTourBySlug } from '@/lib/data/tours';

/**
 * China Signature & Discovery group departures — schedule UI.
 * Every row reads its dates straight from each tour's `departureDates` in
 * tours.ts (the same source the product-page/campaign hero uses), so the schedule
 * block and the hero can never drift apart.
 */
export type DepartureScheduleRow = {
  label: string;
  slug: string;
  destination: 'china';
  tier: 'signature' | 'discovery';
  dates: string[];
};

/** Departure dates for a China tour, sourced from tours.ts (empty if none published). */
function departuresForTour(tier: 'signature' | 'discovery', slug: string): string[] {
  return getTourBySlug('china', tier, slug)?.departureDates ?? [];
}

export const CHINA_SIGNATURE_DEPARTURES: DepartureScheduleRow[] = [
  {
    label: 'Silk Road',
    slug: 'silk-road',
    destination: 'china',
    tier: 'signature',
    dates: departuresForTour('signature', 'silk-road'),
  },
  {
    label: 'Legacy of China',
    slug: 'imperial-heritage',
    destination: 'china',
    tier: 'signature',
    dates: departuresForTour('signature', 'imperial-heritage'),
  },
  {
    label: 'China Panorama',
    slug: 'grand-tour',
    destination: 'china',
    tier: 'signature',
    dates: departuresForTour('signature', 'grand-tour'),
  },
  {
    label: 'Natural China',
    slug: 'landscapes',
    destination: 'china',
    tier: 'signature',
    dates: departuresForTour('signature', 'landscapes'),
  },
];

export const CHINA_DISCOVERY_DEPARTURES: DepartureScheduleRow[] = [
  {
    label: 'A Tale of Two Cities',
    slug: 'beijing-xian',
    destination: 'china',
    tier: 'discovery',
    dates: departuresForTour('discovery', 'beijing-xian'),
  },
  {
    label: 'Best of China',
    slug: 'essentials',
    destination: 'china',
    tier: 'discovery',
    dates: departuresForTour('discovery', 'essentials'),
  },
  {
    label: 'Shanghai & Surroundings',
    slug: 'shanghai-surroundings',
    destination: 'china',
    tier: 'discovery',
    dates: departuresForTour('discovery', 'shanghai-surroundings'),
  },
  {
    label: 'Colourful Yunnan',
    slug: 'yunnan-explorer',
    destination: 'china',
    tier: 'discovery',
    dates: departuresForTour('discovery', 'yunnan-explorer'),
  },
];

export function tourPath(row: Pick<DepartureScheduleRow, 'destination' | 'tier' | 'slug'>): string {
  return `/tours/${row.destination}/${row.tier}/${row.slug}`;
}
