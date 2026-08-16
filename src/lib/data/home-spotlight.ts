import {
  getOctober2026CampaignPath,
  OCTOBER_2026_DISCOVERY_BY_SLUG,
  type October2026DiscoverySlug,
} from '@/lib/campaigns/october-2026-discovery';

/**
 * Homepage Spotlight — tours receiving primary ad + content focus for the current season.
 * Generic shape: each entry carries its own campaignHref and departureLabel so it is
 * not tied to any single campaign config type.
 *
 * Reorder or replace entries when marketing priorities change.
 *
 * Roster history: Shanghai & Surroundings (14 Oct 2026) sold out and was pulled —
 * its own product/campaign pages are untouched. Tale of Two Cities stays but now
 * points at its own product page and the 18 March 2027 departure rather than the
 * October-themed campaign LP, since that LP's copy is built entirely around the
 * October date.
 */
export type HomeSpotlightTourRef = {
  destination: 'china';
  tier: 'discovery';
  slug: string;
  /** Direct path to the campaign LP (no origin, no UTM). */
  campaignHref: string;
  /** Short label shown on the tour card departure badge, e.g. "15 Oct 2026". */
  departureLabel: string;
  route: string[];
};

export const HOME_SPOTLIGHT_TOURS: HomeSpotlightTourRef[] = [
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'essentials',
    campaignHref: '/tours/china/discovery/essentials',
    departureLabel: '3 Nov 2026',
    route: ['Beijing', "Xi'an", 'Hangzhou', 'Shanghai'],
  },
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'china-icons-collection',
    campaignHref: '/tours/china/discovery/china-icons-collection',
    departureLabel: '22 Dec 2026',
    route: ['Shanghai', 'Beijing', "Xi'an", 'Chongqing', 'Guangzhou'],
  },
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'beijing-xian',
    campaignHref: '/tours/china/discovery/beijing-xian',
    departureLabel: '18 Mar 2027',
    route: ['Beijing', "Xi'an"],
  },
];

// ---------------------------------------------------------------------------
// Legacy helpers — kept for backward-compat with any code still importing them.
// New code should read campaignHref / departureLabel directly from the ref.
// ---------------------------------------------------------------------------

/** @deprecated Use ref.departureLabel directly. */
export function getSpotlightDepartureLabel(campaignSlug: October2026DiscoverySlug): string {
  const raw = OCTOBER_2026_DISCOVERY_BY_SLUG[campaignSlug].heroDepartureOrder[0] ?? '';
  const short = raw.replace('October', 'Oct');
  return short ? `${short} 2026` : '';
}

/** @deprecated Use ref.campaignHref directly. */
export function getSpotlightCampaignHref(campaignSlug: October2026DiscoverySlug): string {
  return getOctober2026CampaignPath(campaignSlug);
}
