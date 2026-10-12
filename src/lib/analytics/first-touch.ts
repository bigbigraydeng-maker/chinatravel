/**
 * Browser side of enquiry attribution: remember the first page of this browser session and the
 * tour pages seen since, then hand them to a form submit. sessionStorage only (same lifetime
 * and same privacy footprint as the existing UTM first-touch in utm-parser.ts); every function
 * swallows storage errors — attribution is a bonus and must never break a form.
 */
import { getStoredUtmParams } from '@/lib/utils/utm-parser';
import type { Attribution } from './attribution';

const FIRST_TOUCH_KEY = 'cts_first_touch_page';
const LAST_SUBMIT_KEY = 'cts_last_submit_attribution';
const TOUR_PREFIXES = ['/tours/', '/campaigns/'];
const MAX_TOUR_PATHS = 5;

interface FirstTouchState {
  first_landing_path: string;
  referrer_host: string;
  viewed_tour_paths: string[];
}

function readState(): FirstTouchState | null {
  try {
    const raw = sessionStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as FirstTouchState) : null;
  } catch {
    return null;
  }
}

function externalReferrerHost(): string {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).host;
    return host && host !== window.location.host ? host : '';
  } catch {
    return '';
  }
}

/** Call on every route change. First call of the session fixes the landing page; first wins. */
export function recordPageView(pathname: string): void {
  if (typeof window === 'undefined') return;
  try {
    const path = pathname.split('?')[0];
    const state = readState() ?? { first_landing_path: path, referrer_host: externalReferrerHost(), viewed_tour_paths: [] };
    if (TOUR_PREFIXES.some(p => path.startsWith(p)) && !state.viewed_tour_paths.includes(path) && state.viewed_tour_paths.length < MAX_TOUR_PATHS) {
      state.viewed_tour_paths.push(path);
    }
    sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/**
 * Build the attribution for a submit happening now, remember it (the /thank-you page fires its
 * GA4 event in a later page load and needs the SUBMIT page, not "/thank-you"), and return it.
 * Returns undefined when nothing is known — callers then simply send no attribution.
 */
export function captureSubmitAttribution(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const state = readState();
    const utm = getStoredUtmParams();
    const a: Attribution = {
      first_landing_path: state?.first_landing_path ?? window.location.pathname,
      submit_path: window.location.pathname,
      referrer_host: state?.referrer_host ?? '',
      viewed_tour_paths: state?.viewed_tour_paths ?? [],
      ...(utm.utm_source ? { utm_source: utm.utm_source } : {}),
      ...(utm.utm_medium ? { utm_medium: utm.utm_medium } : {}),
      ...(utm.utm_campaign ? { utm_campaign: utm.utm_campaign } : {}),
    };
    try {
      sessionStorage.setItem(LAST_SUBMIT_KEY, JSON.stringify(a));
    } catch {
      /* ignore */
    }
    return a;
  } catch {
    return undefined;
  }
}

export function readSubmitAttribution(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = sessionStorage.getItem(LAST_SUBMIT_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
