/**
 * Magic Engine mail click beacon.
 *
 * Mails sent from Magic Engine CRM add `?me=<12 letters/digits>` to links to this site. When someone opens such a link:
 *  1. tell Magic Engine in the background (never waited on, 2-second timeout, errors ignored), and
 *  2. redirect to the same address without `me`, so the token does not stay in the address bar, reach page analytics,
 *     or travel with a shared link.
 * Only on the production host. Partial-content requests (a phone PDF viewer fetching a later chunk) are not reported.
 * Design: magic-engine docs/specs/2026-11-10-crm-email-click-tracking-b2-design-v0.md §5.
 */

export const ME_CLICK_ENDPOINT = 'https://app.magicengine.com.au/api/public/crm/email-link-click';
export const PRODUCTION_HOST = 'www.ctstours.co.nz';
const TOKEN_RE = /^[A-Za-z0-9]{12}$/;
const TIMEOUT_MS = 2000;

export interface BeaconInput {
  host: string | null;
  url: URL;
  method: string;
  headers: { get(name: string): string | null };
}

export interface BeaconPlan {
  /** Where to send the browser: the same address without `me`. */
  cleanUrl: URL;
  /** The report for Magic Engine, or null when this request should not be reported. */
  report: Record<string, string | null> | null;
}

/** Pure: does this request carry a click token, and what to do with it. Null = not ours, carry on as normal. */
export function planBeacon(input: BeaconInput): BeaconPlan | null {
  const token = input.url.searchParams.get('me');
  if (token === null) return null;
  if ((input.host ?? '').toLowerCase() !== PRODUCTION_HOST) return null;
  const cleanUrl = new URL(`https://${PRODUCTION_HOST}${input.url.pathname}${input.url.search}`);
  cleanUrl.searchParams.delete('me');
  const method = input.method.toUpperCase();
  const range = input.headers.get('range');
  const firstChunk = range === null || /^bytes=0-/.test(range.trim());
  const reportable = TOKEN_RE.test(token) && (method === 'GET' || method === 'HEAD') && firstChunk;
  return {
    cleanUrl,
    report: reportable
      ? {
          token,
          path: `${cleanUrl.pathname}${cleanUrl.search}`.slice(0, 1000),
          method,
          ua: (input.headers.get('user-agent') ?? '').slice(0, 400),
          fetchSite: input.headers.get('sec-fetch-site'),
          fetchMode: input.headers.get('sec-fetch-mode'),
          fetchDest: input.headers.get('sec-fetch-dest'),
        }
      : null,
  };
}

/** Fire-and-forget: resolves either way, never throws. */
export function sendBeacon(report: Record<string, string | null>, fetcher: typeof fetch = fetch): Promise<void> {
  try {
    const signal = typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(TIMEOUT_MS) : undefined;
    return fetcher(ME_CLICK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
      signal,
    }).then(
      () => undefined,
      () => undefined,
    );
  } catch {
    return Promise.resolve();
  }
}
