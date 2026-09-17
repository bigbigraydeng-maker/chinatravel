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

// Retain the export name for existing consumers; the roster is December 2026.
export const OCTOBER_2026_SPOTLIGHT_TOURS: SpotlightTourCard[] = HOME_SPOTLIGHT_TOURS.map(ref => ({
  slug: ref.slug, destination: ref.destination, tier: ref.tier,
  href: ref.campaignHref, departureLabel: ref.departureLabel,
  departureSortDate: '2026-12-22', routeCities: ref.route,
  badgeText: ref.slug.endsWith('christchurch') ? 'From Christchurch' : 'From Auckland',
}));
