/**
 * Environment helpers for the Ceepii redesign staging isolation.
 *
 * `NEXT_PUBLIC_ENV` is inlined into the client bundle at build time, so each
 * environment (production / staging / development) ships its own JS artifact —
 * we cannot toggle these at runtime. See ceepii-assessment.md §4.4.
 *
 * Tracking IDs (GA / GTM / Ads / Meta Pixel) resolve to the staging property
 * when NEXT_PUBLIC_ENV === 'staging', otherwise the production property. If
 * the corresponding staging var isn't set, the helper returns `undefined` and
 * the tracking component renders nothing (safe no-op).
 */

export type SiteEnv = 'production' | 'staging' | 'development';

export function siteEnv(): SiteEnv {
  const raw = process.env.NEXT_PUBLIC_ENV;
  if (raw === 'staging' || raw === 'production' || raw === 'development') return raw;
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

export function isStaging(): boolean {
  return siteEnv() === 'staging';
}

export function isProduction(): boolean {
  return siteEnv() === 'production';
}

export function getGaId(): string | undefined {
  return isStaging()
    ? process.env.NEXT_PUBLIC_GA_ID_STAGING
    : process.env.NEXT_PUBLIC_GA_ID;
}

export function getGtmId(): string | undefined {
  return isStaging()
    ? process.env.NEXT_PUBLIC_GTM_ID_STAGING
    : process.env.NEXT_PUBLIC_GTM_ID;
}
