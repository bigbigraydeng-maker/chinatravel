import {
  getOctober2026CampaignPath,
  OCTOBER_2026_DISCOVERY_BY_SLUG,
  type October2026DiscoverySlug,
} from '@/lib/campaigns/october-2026-discovery';
import { FIRE_FUZZ_CAMPAIGN_PATH } from '@/lib/campaigns/fire-fuzz';

/**
 * Homepage Spotlight — tours receiving primary ad + content focus for the current season.
 * Generic shape: each entry carries its own campaignHref and departureLabel so it is
 * not tied to any single campaign config type.
 *
 * Reorder or replace entries when marketing priorities change.
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
    slug: 'beijing-xian',
    campaignHref: getOctober2026CampaignPath('tale-of-two-cities'),
    departureLabel: '15 Oct 2026',
    route: ['Beijing', "Xi'an"],
  },
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'shanghai-surroundings',
    campaignHref: getOctober2026CampaignPath('shanghai-surroundings'),
    departureLabel: '14 Oct 2026',
    route: ['Shanghai', 'Suzhou', 'Wuxi', 'Hangzhou'],
  },
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'chongqing-chengdu',
    campaignHref: FIRE_FUZZ_CAMPAIGN_PATH,
    departureLabel: '1 Nov 2026',
    route: ['Chongqing', 'Chengdu'],
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
