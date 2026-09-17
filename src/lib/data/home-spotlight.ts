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
 * Current focus: December 2026 departures from Auckland and Christchurch.
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

// September 2026: all primary promotion moves to the December departures.
export const HOME_SPOTLIGHT_TOURS: HomeSpotlightTourRef[] = [
  {
    destination: 'china', tier: 'discovery', slug: 'china-icons-collection',
    campaignHref: '/tours/china/discovery/china-icons-collection',
    departureLabel: '22 Dec 2026 · Auckland',
    route: ['Shanghai', 'Beijing', "Xi'an", 'Chongqing', 'Guangzhou'],
  },
  {
    destination: 'china', tier: 'discovery', slug: 'china-icons-collection-christchurch',
    campaignHref: '/tours/china/discovery/china-icons-collection-christchurch',
    departureLabel: '22 Dec 2026 · Christchurch',
    route: ['Shanghai', 'Beijing', "Xi'an", 'Chongqing', 'Guangzhou'],
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
