/**
 * Password gate for /marketing/campaign (Edge-safe Web Crypto).
 * Cookie value is HMAC-SHA256(accessKey, fixed salt) — not the raw password.
 */

export const MARKETING_PLAN_COOKIE_NAME = 'cts_mp_session';

/** HttpOnly cookie is limited to campaign routes (not the /marketing hub). */
export const MARKETING_CAMPAIGN_COOKIE_PATH = '/marketing/campaign';

const HMAC_MESSAGE = 'cts-marketing-campaign-dashboard-v2';

export async function computeMarketingPlanSessionToken(accessKey: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(accessKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(HMAC_MESSAGE));
  return bufferToHex(new Uint8Array(sig));
}

function bufferToHex(buf: Uint8Array): string {
  return Array.from(buf, b => b.toString(16).padStart(2, '0')).join('');
}

export function timingSafeEqualAscii(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) {
    x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return x === 0;
}

export async function isValidMarketingPlanSession(
  accessKey: string,
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await computeMarketingPlanSessionToken(accessKey);
  return timingSafeEqualAscii(cookieValue, expected);
}

export function marketingPlanAccessKey(): string | undefined {
  const v = process.env.MARKETING_PLAN_ACCESS_KEY?.trim();
  return v && v.length >= 12 ? v : undefined;
}
