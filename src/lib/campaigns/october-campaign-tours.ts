/** Discovery tours featured in October 2026 campaign — hero/CTA/visa nudge enhancements. */
export const OCTOBER_CAMPAIGN_TOUR_SLUGS = ['beijing-xian', 'shanghai-surroundings'] as const;

export type OctoberCampaignTourSlug = (typeof OCTOBER_CAMPAIGN_TOUR_SLUGS)[number];

export function isOctoberCampaignTourSlug(slug: string): slug is OctoberCampaignTourSlug {
  return (OCTOBER_CAMPAIGN_TOUR_SLUGS as readonly string[]).includes(slug);
}
