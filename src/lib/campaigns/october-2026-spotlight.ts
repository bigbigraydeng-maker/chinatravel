import { getOctober2026CampaignPath } from './october-2026-discovery';
import { FIRE_FUZZ_CAMPAIGN_PATH } from './fire-fuzz';

/**
 * October 2026 Hub — three featured spotlight tours rendered on
 * `/campaigns/october-2026`.
 *
 * `slug` matches the entry in `tours.ts` so we can pull title, image, price
 * via `getTourBySlug('china', 'discovery', slug)`. `href` points at the
 * existing campaign LP (UTM-free path; canonical).
 */
export type SpotlightTourCard = {
  slug: 'shanghai-surroundings' | 'beijing-xian' | 'chongqing-chengdu';
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
    slug: 'shanghai-surroundings',
    destination: 'china',
    tier: 'discovery',
    href: getOctober2026CampaignPath('shanghai-surroundings'),
    departureLabel: '14 Oct 2026',
    departureSortDate: '2026-10-14',
    routeCities: ['Shanghai', 'Suzhou', 'Wuxi', 'Hangzhou'],
    badgeText: 'Featured Departure',
  },
  {
    slug: 'beijing-xian',
    destination: 'china',
    tier: 'discovery',
    href: getOctober2026CampaignPath('tale-of-two-cities'),
    departureLabel: '15 Oct 2026',
    departureSortDate: '2026-10-15',
    routeCities: ['Beijing', "Xi'an"],
    badgeText: 'Featured Departure',
  },
  {
    slug: 'chongqing-chengdu',
    destination: 'china',
    tier: 'discovery',
    href: FIRE_FUZZ_CAMPAIGN_PATH,
    departureLabel: '1 Nov 2026',
    departureSortDate: '2026-11-01',
    routeCities: ['Chongqing', 'Chengdu'],
    badgeText: 'November Departure',
  },
];
