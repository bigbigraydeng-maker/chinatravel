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

// Retain the export name for existing consumers. The campaign hub includes the
// reopened November departure while the homepage keeps its December-first focus.
export const OCTOBER_2026_SPOTLIGHT_TOURS: SpotlightTourCard[] = [
  {
    slug: 'golden-china',
    destination: 'china',
    tier: 'discovery',
    href: '/tours/china/discovery/golden-china',
    departureLabel: '16 Nov 2026 · Auckland',
    departureSortDate: '2026-11-16',
    routeCities: ['Beijing', "Xi'an", 'Shanghai'],
    badgeText: 'Now available',
  },
  ...HOME_SPOTLIGHT_TOURS.map(ref => ({
    slug: ref.slug,
    destination: ref.destination,
    tier: ref.tier,
    href: ref.campaignHref,
    departureLabel: ref.departureLabel,
    departureSortDate: '2026-12-22',
    routeCities: ref.route,
    badgeText: ref.slug.endsWith('christchurch') ? 'From Christchurch' : 'From Auckland',
  })),
];
