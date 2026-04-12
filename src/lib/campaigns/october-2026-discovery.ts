/**
 * October 2026 Discovery campaign landing pages.
 * URLs: /campaigns/october-2026/shanghai-surroundings | tale-of-two-cities
 */
export const OCTOBER_2026_DISCOVERY_SLUGS = ['shanghai-surroundings', 'tale-of-two-cities'] as const;

export type October2026DiscoverySlug = (typeof OCTOBER_2026_DISCOVERY_SLUGS)[number];

export type October2026DiscoveryConfig = {
  tourSlug: 'shanghai-surroundings' | 'beijing-xian';
  /** First date = hero “next departure” for this campaign */
  heroDepartureOrder: string[];
  enquirySource: string;
  otherCampaignSlug: October2026DiscoverySlug;
  metaTitleSuffix: string;
  metaDescription: string;
};

export const OCTOBER_2026_DISCOVERY_BY_SLUG: Record<
  October2026DiscoverySlug,
  October2026DiscoveryConfig
> = {
  'shanghai-surroundings': {
    tourSlug: 'shanghai-surroundings',
    heroDepartureOrder: ['14 October', '3 August'],
    enquirySource: 'Campaign LP: Oct 2026 — Shanghai & Surroundings',
    otherCampaignSlug: 'tale-of-two-cities',
    metaTitleSuffix: 'October 2026 departure | Shanghai & Surroundings | CTS NZ',
    metaDescription:
      'Yangtze Delta Discovery from NZ: Suzhou, Wuxi, Xinshi, Hangzhou & Shanghai. 10 days from NZD $2,999. Featured departure 14 October 2026 — enquire with CTS Auckland.',
  },
  'tale-of-two-cities': {
    tourSlug: 'beijing-xian',
    heroDepartureOrder: ['15 October', '13 August', '2 November'],
    enquirySource: 'Campaign LP: Oct 2026 — A Tale of Two Cities',
    otherCampaignSlug: 'shanghai-surroundings',
    metaTitleSuffix: 'October 2026 departure | Beijing & Xi’an | CTS NZ',
    metaDescription:
      'Beijing & Xi’an by high-speed train: Forbidden City, Great Wall, hutongs, Terracotta Warriors & more. 10 days from NZD $3,480. Featured departure 15 October 2026 — CTS NZ.',
  },
};

export function isOctober2026DiscoverySlug(s: string): s is October2026DiscoverySlug {
  return (OCTOBER_2026_DISCOVERY_SLUGS as readonly string[]).includes(s);
}

/** Path only — no origin, no UTM. Matches `<link rel="canonical">` on campaign pages. */
export function getOctober2026CampaignPath(slug: October2026DiscoverySlug): string {
  return `/campaigns/october-2026/${slug}`;
}

/**
 * Full URL for Google Ads / Meta final URLs, including UTM query string.
 * Canonical HTML must stay on the path **without** UTM; only ad links carry UTM.
 *
 * @param siteOrigin e.g. `https://www.ctstours.co.nz` (no trailing slash)
 */
export function buildOctober2026CampaignAdUrl(
  siteOrigin: string,
  slug: October2026DiscoverySlug,
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
    term?: string;
  }
): string {
  const origin = siteOrigin.replace(/\/$/, '');
  const path = getOctober2026CampaignPath(slug);
  const q = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });
  if (utm.content) q.set('utm_content', utm.content);
  if (utm.term) q.set('utm_term', utm.term);
  return `${origin}${path}?${q.toString()}`;
}
