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
 * Currently empty: no tour is featured. Add entries here to feature tours.
 */
export type HomeSpotlightTourRef = {
  destination: 'china';
  tier: 'discovery';
  slug: string;
  /** Direct path to the campaign LP (no origin, no UTM). */
  campaignHref: string;
  /** Short label shown on the tour card departure badge, e.g. "15 Oct 2026". */
  departureLabel: string;
  /** Departure date as YYYY-MM-DD; orders the card on the spotlight hub. */
  departureSortDate: string;
  /** Optional extra badge on the spotlight hub card, e.g. "From Auckland". */
  badgeText?: string;
  route: string[];
};

export const HOME_SPOTLIGHT_TOURS: HomeSpotlightTourRef[] = [];

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
