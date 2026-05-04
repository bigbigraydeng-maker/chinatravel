'use client';

import { useScrollDepthTracking } from '@/hooks/useScrollDepthTracking';

/**
 * Client-side component to track scroll depth on October campaign pages.
 * This allows the server component page to use scroll tracking without needing 'use client'.
 */
export function OctoberCampaignScrollTracker({ pageName = 'october_2026_campaign' }: { pageName?: string }) {
  useScrollDepthTracking(pageName);
  return null;
}
