/**
 * Utility to parse UTM parameters from URL (both query string and hash)
 * Handles cases where UTM params are incorrectly placed in URL hash (#)
 * instead of query string (?)
 */

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
}

/**
 * Parse UTM parameters from URL
 * Checks both query string (?param=value) and hash (#param=value)
 */
export function parseUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const params: UtmParams = {};
  const url = new URL(window.location.href);

  // First, try to get params from query string (standard approach)
  const queryParams = url.searchParams;
  const utmKeys: Array<keyof UtmParams> = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

  utmKeys.forEach((key) => {
    const value = queryParams.get(key);
    if (value) {
      params[key] = value;
    }
  });

  // If no params found in query string, try parsing from hash
  // This handles the case where bit.ly or other tools put params in hash
  if (Object.keys(params).length === 0 && window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    utmKeys.forEach((key) => {
      const value = hashParams.get(key);
      if (value) {
        params[key] = value;
      }
    });
  }

  return params;
}

/**
 * Normalize UTM parameter values (decode, trim spaces, etc.)
 */
export function normalizeUtmParams(params: UtmParams): UtmParams {
  const normalized: UtmParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      // Decode URI component and trim whitespace
      normalized[key as keyof UtmParams] = decodeURIComponent(value).trim();
    }
  });

  return normalized;
}

/**
 * Get UTM parameters and send them to GTM
 * Used in tracking hooks to ensure GA4 receives correct campaign data
 */
export function captureUtmParams() {
  const rawParams = parseUtmParams();
  const params = normalizeUtmParams(rawParams);

  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    // Push UTM parameters to GTM dataLayer
    // These will be captured by GA4 as campaign data
    if (Object.keys(params).length > 0) {
      (window as any).dataLayer.push({
        event: 'utm_params_detected',
        ...params,
        timestamp: Date.now(),
      });

      // Also set them as page-level properties
      (window as any).dataLayer.push({
        utm_source: params.utm_source || '(direct)',
        utm_medium: params.utm_medium || '(none)',
        utm_campaign: params.utm_campaign || '(not set)',
        utm_content: params.utm_content,
        utm_term: params.utm_term,
        fbclid: params.fbclid,
        gclid: params.gclid,
      });
    }
  }

  return params;
}
