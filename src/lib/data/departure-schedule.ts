/**
 * China Signature & Discovery group departures — single source for schedule UI.
 * Keep in sync with `departureDates` on each tour in tours.ts.
 */
export type DepartureScheduleRow = {
  label: string;
  slug: string;
  destination: 'china';
  tier: 'signature' | 'discovery';
  dates: string[];
};

export const CHINA_SIGNATURE_DEPARTURES: DepartureScheduleRow[] = [
  {
    label: 'Silk Road',
    slug: 'silk-road',
    destination: 'china',
    tier: 'signature',
    dates: ['25 August', '14 October'],
  },
  {
    label: 'Legacy of China',
    slug: 'imperial-heritage',
    destination: 'china',
    tier: 'signature',
    dates: ['13 August', '15 October'],
  },
  {
    label: 'China Panorama',
    slug: 'grand-tour',
    destination: 'china',
    tier: 'signature',
    dates: ['14 October'],
  },
  {
    label: 'Natural China',
    slug: 'landscapes',
    destination: 'china',
    tier: 'signature',
    dates: ['20 August', '25 October'],
  },
];

export const CHINA_DISCOVERY_DEPARTURES: DepartureScheduleRow[] = [
  {
    label: 'A Tale of Two Cities',
    slug: 'beijing-shanghai',
    destination: 'china',
    tier: 'discovery',
    dates: ['13 August', '15 October', '2 November'],
  },
  {
    label: 'Best of China',
    slug: 'essentials',
    destination: 'china',
    tier: 'discovery',
    dates: ['3 September'],
  },
  {
    label: 'Shanghai & Surroundings',
    slug: 'shanghai-beyond',
    destination: 'china',
    tier: 'discovery',
    dates: ['3 August', '14 October'],
  },
  {
    label: 'Colourful Yunnan',
    slug: 'yunnan-explorer',
    destination: 'china',
    tier: 'discovery',
    dates: ['10 September'],
  },
];

export function tourPath(row: Pick<DepartureScheduleRow, 'destination' | 'tier' | 'slug'>): string {
  return `/tours/${row.destination}/${row.tier}/${row.slug}`;
}
