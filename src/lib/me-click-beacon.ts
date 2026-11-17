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
export const ME_CALLBACK_ENDPOINT = 'https://app.magicengine.com.au/api/public/crm/site-callback-request';
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

/**
 * Page views after the first click (magic-engine docs/specs/2026-11-17-cts-online-brochure-tracking-v0.md §4).
 *
 * The first click on a mail link leaves two first-party cookies on www.ctstours.co.nz:
 *  - `cts_me`: the 12-character token, HttpOnly — only this site's server reads it;
 *  - `cts_me_on`: "1", readable by the page — only so the page knows whether reporting a view is worth a request.
 * Afterwards, each tour page the visitor opens on that device is reported to Magic Engine as a page view of that guest.
 * Only tour pages, the all-tours page and the brochure count; visitors who never came in through a mail are not reported.
 */
export const VIEW_COOKIE = 'cts_me';
export const VIEW_FLAG_COOKIE = 'cts_me_on';
export const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24 * 60;

/** The token to remember on this device after a first click, or null (not ours, wrong host, malformed). */
export function tokenToRemember(input: BeaconInput): string | null {
  const token = input.url.searchParams.get('me');
  if (token === null || !TOKEN_RE.test(token)) return null;
  if ((input.host ?? '').toLowerCase() !== PRODUCTION_HOST) return null;
  return token;
}

/** Pages whose views are worth telling staff about. */
export function isTrackedPage(path: string): boolean {
  return path.startsWith('/tours/') || path === '/tours' || path === '/china-tours' || path === '/brochure' || path.startsWith('/brochures/');
}

export interface PageViewInput {
  host: string | null;
  token: string | null;
  path: unknown;
  ua: string | null;
}

/** Pure: the page-view report for Magic Engine, or null when this view should not be reported. */
export function planPageView(input: PageViewInput): Record<string, string | null> | null {
  if ((input.host ?? '').toLowerCase() !== PRODUCTION_HOST) return null;
  if (input.token === null || !TOKEN_RE.test(input.token)) return null;
  if (typeof input.path !== 'string' || input.path.length > 300 || !input.path.startsWith('/') || !isTrackedPage(input.path)) return null;
  return {
    token: input.token,
    path: input.path,
    method: 'GET',
    ua: (input.ua ?? '').slice(0, 400),
    fetchSite: null,
    fetchMode: null,
    fetchDest: null,
    kind: 'page_view',
  };
}

/**
 * "Ask Baker to call me" on the brochure page. The guest picks a day and a part of the day; this site's server adds the
 * remembered token and forwards it to Magic Engine. This is only a first filter: Magic Engine re-checks everything.
 */
export type CallbackWindow = 'morning' | 'afternoon' | 'evening';
const CALLBACK_WINDOWS: readonly string[] = ['morning', 'afternoon', 'evening'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface CallbackInput {
  host: string | null;
  token: string | null;
  body: unknown;
  ua: string | null;
}

/** Pure: the callback request for Magic Engine, or null when it should not be sent. */
export function planCallback(input: CallbackInput): Record<string, unknown> | null {
  // Only our own production site, and only for a guest we recognise.
  if ((input.host ?? '').toLowerCase() !== PRODUCTION_HOST) return null;
  if (input.token === null || !TOKEN_RE.test(input.token)) return null;
  // The body must be a plain object.
  if (input.body === null || typeof input.body !== 'object' || Array.isArray(input.body)) return null;
  const body = input.body as Record<string, unknown>;
  // A YYYY-MM-DD day (Magic Engine checks it is a real, near day), and one of the three parts of the day.
  if (typeof body.date !== 'string' || !DATE_RE.test(body.date)) return null;
  if (typeof body.window !== 'string' || !CALLBACK_WINDOWS.includes(body.window)) return null;
  // The tour the guest was reading, or null for "any tour"; a missing value is not allowed.
  const tourPath = body.tourPath;
  if (tourPath !== null && (typeof tourPath !== 'string' || !tourPath.startsWith('/tours/') || tourPath.length > 300)) return null;
  return {
    token: input.token,
    date: body.date,
    window: body.window,
    tourPath,
    quiz: body.quiz ?? null,
    ua: (input.ua ?? '').slice(0, 400),
  };
}
