import {
  getOctober2026CampaignPath,
  OCTOBER_2026_DISCOVERY_BY_SLUG,
  type October2026DiscoverySlug,
} from '@/lib/campaigns/october-2026-discovery';

/**
 * Homepage Spotlight — tours receiving primary ad + content focus for the current season.
 * Reorder or replace entries when marketing priorities change; keep campaign paths in sync with october-2026 LPs when applicable.
 */
export type HomeSpotlightTourRef = {
  destination: 'china';
  tier: 'discovery';
  slug: 'beijing-xian' | 'shanghai-surroundings';
  campaignSlug: October2026DiscoverySlug;
  route: string[];
};

export const HOME_SPOTLIGHT_TOURS: HomeSpotlightTourRef[] = [
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'beijing-xian',
    campaignSlug: 'tale-of-two-cities',
    route: ['Beijing', "Xi'an"],
  },
  {
    destination: 'china',
    tier: 'discovery',
    slug: 'shanghai-surroundings',
    campaignSlug: 'shanghai-surroundings',
    route: ['Shanghai', 'Suzhou', 'Wuxi', 'Hangzhou'],
  },
];

/** Compact label for the hero departure badge (matches previous homepage copy). */
export function getSpotlightDepartureLabel(campaignSlug: October2026DiscoverySlug): string {
  const raw = OCTOBER_2026_DISCOVERY_BY_SLUG[campaignSlug].heroDepartureOrder[0] ?? '';
  const short = raw.replace('October', 'Oct');
  return short ? `${short} 2026` : '';
}

/** Public homepage cards link to October 2026 campaign LPs (poster LP is print/QR-only). */
export function getSpotlightCampaignHref(campaignSlug: October2026DiscoverySlug): string {
  return getOctober2026CampaignPath(campaignSlug);
}
