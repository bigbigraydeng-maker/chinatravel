/**
 * Fire & Fuzz campaign config — Chongqing × Chengdu Discovery, departs 1 November.
 * Campaign LP: /campaigns/fire-fuzz
 */

export const FIRE_FUZZ_TOUR_SLUG = 'chongqing-chengdu' as const;
export const FIRE_FUZZ_CAMPAIGN_PATH = '/campaigns/fire-fuzz' as const;

export const FIRE_FUZZ_CONFIG = {
  tourSlug: FIRE_FUZZ_TOUR_SLUG,
  heroDepartureDate: '1 November',
  enquirySource: 'Campaign LP: Fire & Fuzz — Chongqing × Chengdu',
  campaignPath: FIRE_FUZZ_CAMPAIGN_PATH,
  metaTitle: 'Fire & Fuzz — Chongqing & Chengdu | 10 Days from NZ | CTS Tours',
  metaDescription:
    "China's hottest cities in 10 days: Chongqing's neon skyline, Liziba monorail, UNESCO Dazu Rock Carvings & Hongyadong — then Chengdu's giant pandas and teahouse culture. From NZD $2,750. Departs 1 November.",
} as const;

/** Build a UTM-tagged URL for the Fire & Fuzz campaign LP. */
export function buildFireFuzzCampaignAdUrl(
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
  return `${origin}${FIRE_FUZZ_CAMPAIGN_PATH}?${q.toString()}`;
}
