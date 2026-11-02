import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';

export type SpotlightTourCard = {
  slug: string;
  destination: 'china';
  tier: 'discovery';
  href: string;
  departureLabel: string;
  departureSortDate: string;
  routeCities: string[];
  badgeText?: string;
};

// Retain the export name for existing consumers. Golden China was taken down on
// 2026-11-02, so nothing is featured on the hub until a new spotlight tour is added.
export const OCTOBER_2026_SPOTLIGHT_TOURS: SpotlightTourCard[] = [
  ...HOME_SPOTLIGHT_TOURS.map(ref => ({
    slug: ref.slug,
    destination: ref.destination,
    tier: ref.tier,
    href: ref.campaignHref,
    departureLabel: ref.departureLabel,
    departureSortDate: ref.departureSortDate,
    routeCities: ref.route,
    badgeText: ref.badgeText,
  })),
];
