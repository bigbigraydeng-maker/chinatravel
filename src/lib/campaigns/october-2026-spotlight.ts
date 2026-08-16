/**
 * October 2026 Hub — three featured spotlight tours rendered on
 * `/campaigns/october-2026`.
 *
 * `slug` matches the entry in `tours.ts` so we can pull title, image, price
 * via `getTourBySlug('china', 'discovery', slug)`. `href` points at the
 * existing campaign LP (UTM-free path; canonical).
 *
 * Roster history: originally Shanghai & Surroundings (14 Oct 2026) + Tale of
 * Two Cities (15 Oct 2026) + Best of China (3 Nov 2026). Shanghai &
 * Surroundings sold out — pulled from the roster; its own product/campaign
 * pages are intentionally untouched (CTS may run another October departure).
 * Tale of Two Cities stays but is reframed to its 18 March 2027 departure —
 * its October LP is themed entirely around the October date, so a 2027 push
 * links straight to the product page instead, same as Best of China.
 */
export type SpotlightTourCard = {
  slug: 'beijing-xian' | 'essentials' | 'china-icons-collection';
  destination: 'china';
  tier: 'discovery';
  href: string;
  departureLabel: string;
  /** ISO date used for sorting (earliest departure first). */
  departureSortDate: string;
  routeCities: string[];
  badgeText?: string;
};

export const OCTOBER_2026_SPOTLIGHT_TOURS: SpotlightTourCard[] = [
  {
    slug: 'essentials',
    destination: 'china',
    tier: 'discovery',
    href: '/tours/china/discovery/essentials',
    departureLabel: '3 Nov 2026',
    departureSortDate: '2026-11-03',
    routeCities: ['Beijing', "Xi'an", 'Hangzhou', 'Shanghai'],
    badgeText: 'November Departure',
  },
  {
    slug: 'china-icons-collection',
    destination: 'china',
    tier: 'discovery',
    href: '/tours/china/discovery/china-icons-collection',
    departureLabel: '22 Dec 2026',
    departureSortDate: '2026-12-22',
    routeCities: ['Shanghai', 'Beijing', "Xi'an", 'Chongqing', 'Guangzhou'],
    badgeText: 'Christmas & New Year',
  },
  {
    slug: 'beijing-xian',
    destination: 'china',
    tier: 'discovery',
    href: '/tours/china/discovery/beijing-xian',
    departureLabel: '18 Mar 2027',
    departureSortDate: '2027-03-18',
    routeCities: ['Beijing', "Xi'an"],
    badgeText: '2027 Departure',
  },
];
