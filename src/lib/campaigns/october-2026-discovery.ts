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
    heroDepartureOrder: ['14 October'],
    enquirySource: 'Campaign LP: Oct 2026 — Shanghai & Surroundings',
    otherCampaignSlug: 'tale-of-two-cities',
    metaTitleSuffix: 'October 2026 departure | Shanghai & Surroundings | CTS NZ',
    metaDescription:
      'Yangtze Delta Discovery from NZ: Suzhou, Wuxi, Xinshi, Hangzhou & Shanghai. 10 days from NZD $2,999. Featured departure 14 October 2026 — enquire with CTS Auckland.',
  },
  'tale-of-two-cities': {
    tourSlug: 'beijing-xian',
    heroDepartureOrder: ['15 October'],
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

/** Path only — canonical for the newspaper-style dual-product poster (no UTM). */
export const SPOTLIGHT_POSTER_OCT_2026_PATH = '/spotlight/october-2026' as const;

/**
 * Full URL for a **single** print/QR entry to the dual-product October 2026 poster page.
 * Use this when one QR code must land on both tours; product CTAs on the page still carry their own `utm_content`.
 */
export function buildSpotlightPosterAdUrl(
  siteOrigin: string,
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
    term?: string;
  }
): string {
  const origin = siteOrigin.replace(/\/$/, '');
  const q = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });
  if (utm.content) q.set('utm_content', utm.content);
  if (utm.term) q.set('utm_term', utm.term);
  return `${origin}${SPOTLIGHT_POSTER_OCT_2026_PATH}?${q.toString()}`;
}

/** Production origin for UTM final URLs in marketing data (ads / board). */
export const CTS_SITE_ORIGIN = 'https://www.ctstours.co.nz';

/** Facebook surface for Post vs Reels vs Story — maps to `utm_content` tokens. */
export type FacebookSurfacePlacement = 'post' | 'reels' | 'story';

const FB_META_COLD_CONTENT: Record<October2026DiscoverySlug, Record<FacebookSurfacePlacement, string>> = {
  'tale-of-two-cities': {
    post: 'tale_fb_post',
    reels: 'tale_fb_reels',
    story: 'tale_fb_story',
  },
  'shanghai-surroundings': {
    post: 'shanghai_fb_post',
    reels: 'shanghai_fb_reels',
    story: 'shanghai_fb_story',
  },
};

/**
 * Meta cold-traffic / paid social links (T026): Facebook Post, Reels, Story per October LP.
 * Canonical HTML stays path-only; use these on Meta Ads or boosted posts.
 */
export function buildOctober2026MetaFacebookSurfaceUrl(
  siteOrigin: string,
  slug: October2026DiscoverySlug,
  surface: FacebookSurfacePlacement
): string {
  return buildOctober2026CampaignAdUrl(siteOrigin, slug, {
    source: 'facebook',
    medium: 'paid_social',
    campaign: 'oct2026_meta_cold',
    content: FB_META_COLD_CONTENT[slug][surface],
  });
}

/** Organic Page posts (no ad spend): swap to medium=social + campaign=oct2026_discovery_fb_organic. */
export function buildOctober2026FacebookOrganicSurfaceUrl(
  siteOrigin: string,
  slug: October2026DiscoverySlug,
  surface: FacebookSurfacePlacement
): string {
  return buildOctober2026CampaignAdUrl(siteOrigin, slug, {
    source: 'facebook',
    medium: 'social',
    campaign: 'oct2026_discovery_fb_organic',
    content: FB_META_COLD_CONTENT[slug][surface],
  });
}

export type October2026FacebookSurfaceRow = {
  slug: October2026DiscoverySlug;
  productLabel: string;
  postUrl: string;
  reelsUrl: string;
  storyUrl: string;
};

/** Prebuilt Meta cold URLs for the marketing board (paid_social · oct2026_meta_cold). */
export const OCTOBER_2026_META_FACEBOOK_SURFACE_URLS: October2026FacebookSurfaceRow[] = [
  {
    slug: 'tale-of-two-cities',
    productLabel: 'A Tale of Two Cities（北京 · 西安）',
    postUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'post'),
    reelsUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'reels'),
    storyUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'story'),
  },
  {
    slug: 'shanghai-surroundings',
    productLabel: 'Shanghai & Surroundings',
    postUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'post'),
    reelsUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'reels'),
    storyUrl: buildOctober2026MetaFacebookSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'story'),
  },
];

/** Google Ads — `utm_campaign` aligned with `docs/utm-conventions.md` (tour_ prefix). */
export const OCTOBER_2026_GOOGLE_ADS_UTM_CAMPAIGN = 'tour_discovery_oct2026' as const;

/** Search RSA vs Performance Max — separate `utm_content` for GA4 splits. */
export type GoogleAdsOctoberPlacement = 'search_rsa' | 'pmax';

const GOOGLE_ADS_CONTENT: Record<October2026DiscoverySlug, Record<GoogleAdsOctoberPlacement, string>> = {
  'tale-of-two-cities': {
    search_rsa: 'google_rsa_tale',
    pmax: 'google_pmax_tale',
  },
  'shanghai-surroundings': {
    search_rsa: 'google_rsa_shanghai',
    pmax: 'google_pmax_shanghai',
  },
};

/** Final URL for October campaign LP + Google UTM (`utm_source=google`, `utm_medium=cpc`). */
export function buildOctober2026GoogleAdsUrl(
  siteOrigin: string,
  slug: October2026DiscoverySlug,
  placement: GoogleAdsOctoberPlacement
): string {
  return buildOctober2026CampaignAdUrl(siteOrigin, slug, {
    source: 'google',
    medium: 'cpc',
    campaign: OCTOBER_2026_GOOGLE_ADS_UTM_CAMPAIGN,
    content: GOOGLE_ADS_CONTENT[slug][placement],
  });
}

export type October2026GoogleAdsRow = {
  slug: October2026DiscoverySlug;
  productLabel: string;
  searchRsaUrl: string;
  pmaxUrl: string;
};

/** Prebuilt Google Ads URLs for the marketing board (cpc · tour_discovery_oct2026). */
export const OCTOBER_2026_GOOGLE_ADS_URL_ROWS: October2026GoogleAdsRow[] = [
  {
    slug: 'tale-of-two-cities',
    productLabel: 'A Tale of Two Cities（北京 · 西安）',
    searchRsaUrl: buildOctober2026GoogleAdsUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'search_rsa'),
    pmaxUrl: buildOctober2026GoogleAdsUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'pmax'),
  },
  {
    slug: 'shanghai-surroundings',
    productLabel: 'Shanghai & Surroundings',
    searchRsaUrl: buildOctober2026GoogleAdsUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'search_rsa'),
    pmaxUrl: buildOctober2026GoogleAdsUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'pmax'),
  },
];

/** Same `utm_content` as cold links; use for unpaid Page posts / organic only. */
export const OCTOBER_2026_FACEBOOK_ORGANIC_SURFACE_URLS: October2026FacebookSurfaceRow[] = [
  {
    slug: 'tale-of-two-cities',
    productLabel: 'A Tale of Two Cities（北京 · 西安）',
    postUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'post'),
    reelsUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'reels'),
    storyUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'tale-of-two-cities', 'story'),
  },
  {
    slug: 'shanghai-surroundings',
    productLabel: 'Shanghai & Surroundings',
    postUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'post'),
    reelsUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'reels'),
    storyUrl: buildOctober2026FacebookOrganicSurfaceUrl(CTS_SITE_ORIGIN, 'shanghai-surroundings', 'story'),
  },
];
