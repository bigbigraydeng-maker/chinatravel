/**
 * Enquiry attribution — which page a visitor first arrived on, and which page they submitted from.
 *
 * Pure and server-safe (no browser APIs): the browser side lives in first-touch.ts, the
 * enquiry API routes use `sanitizeAttribution` + `attributionEmailRows` to add the facts to
 * the notification email. Everything here is additive and optional: a missing or malformed
 * attribution must never stop an enquiry from being sent.
 */

export interface Attribution {
  /** path (no query string) of the first page this browser session landed on */
  first_landing_path: string;
  /** path (no query string) of the page the form was submitted from */
  submit_path: string;
  /** host of the external referrer on the first landing ("" when direct / internal) */
  referrer_host: string;
  /** tour / campaign pages viewed before submitting (distinct, max 5) */
  viewed_tour_paths: string[];
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const MAX_LEN = 120;
const MAX_TOUR_PATHS = 5;

function cleanPath(v: unknown): string {
  if (typeof v !== 'string') return '';
  const p = v.split('?')[0].split('#')[0].trim().slice(0, MAX_LEN);
  // a path never contains whitespace or control characters; anything that does is not a path
  return p.startsWith('/') && !/[\s\u0000-\u001f]/.test(p) ? p : '';
}

function cleanText(v: unknown): string {
  return typeof v === 'string' ? v.replace(/[\r\n\t]/g, ' ').trim().slice(0, MAX_LEN) : '';
}

/** Accepts anything the browser sent; returns a clean Attribution or null. Never throws. */
export function sanitizeAttribution(input: unknown): Attribution | null {
  try {
    if (!input || typeof input !== 'object') return null;
    const o = input as Record<string, unknown>;
    const first = cleanPath(o.first_landing_path);
    const submit = cleanPath(o.submit_path);
    if (!first && !submit) return null;
    const tours = Array.isArray(o.viewed_tour_paths)
      ? Array.from(new Set(o.viewed_tour_paths.map(cleanPath).filter(Boolean))).slice(0, MAX_TOUR_PATHS)
      : [];
    const out: Attribution = {
      first_landing_path: first,
      submit_path: submit,
      referrer_host: cleanText(o.referrer_host),
      viewed_tour_paths: tours,
    };
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign'] as const) {
      const t = cleanText(o[k]);
      if (t) out[k] = t;
    }
    return out;
  } catch {
    return null;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Extra <tr> rows for the notification email, appended AFTER the existing rows so any
 * existing mailbox rule / reading habit keeps working. Empty string when nothing to add.
 */
export function attributionEmailRows(a: Attribution | null): string {
  if (!a) return '';
  const row = (label: string, value: string) =>
    `<tr><td style="font-weight:bold;">${label}</td><td>${value ? esc(value) : '—'}</td></tr>`;
  const channel = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(' / ') || a.referrer_host;
  return [
    row('First landing page', a.first_landing_path),
    row('Submitted from', a.submit_path),
    row('Arrived via', channel),
    row('Tour pages viewed', a.viewed_tour_paths.join(', ')),
  ].join('\n    ');
}

/**
 * Meta's click id (`fbclid`) that the browser kept from the ad click (first-touch UTM store) and sent
 * with the enquiry. Returns null for anything that does not look like one, so odd input can never
 * reach the notification email. Real fbclids are URL-safe tokens of letters, digits, `_`, `-` and `.`.
 */
export function sanitizeFbclid(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const v = input.trim();
  return /^[\w.-]{1,255}$/.test(v) ? v : null;
}

/**
 * One extra <tr> for the notification email, using the same markup as attributionEmailRows. It is
 * appended after every existing row (and before the message), so existing labels and their order
 * are untouched; the CRM mirror reads rows by label and ignores labels it does not know.
 * Empty string when there is no fbclid.
 */
export function fbclidEmailRow(fbclid: string | null): string {
  if (!fbclid) return '';
  return `<tr><td style="font-weight:bold;">Facebook click ID</td><td>${esc(fbclid)}</td></tr>`;
}

/**
 * Google's click id (`gclid`) that the browser kept from the ad click (first-touch UTM store) and sent with the
 * enquiry. The notification email is the only lead record, so without it a Google Ads lead cannot be matched back to
 * its ad click later (offline conversion import). Same rule as `sanitizeFbclid`: anything that does not look like a
 * click id (URL-safe letters, digits, `_`, `-` and `.`) is dropped, so odd input can never reach the email.
 */
export function sanitizeGclid(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const v = input.trim();
  return /^[\w.-]{1,255}$/.test(v) ? v : null;
}

/**
 * One extra <tr> for the notification email, same markup as `fbclidEmailRow` and appended right after it (after every
 * existing row, before the message). Empty string when there is no gclid, so an enquiry without one produces exactly
 * the email it produced before.
 */
export function gclidEmailRow(gclid: string | null): string {
  if (!gclid) return '';
  return `<tr><td style="font-weight:bold;">Google click ID</td><td>${esc(gclid)}</td></tr>`;
}
