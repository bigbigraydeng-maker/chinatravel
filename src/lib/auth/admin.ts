/**
 * Admin access for the image management MVP.
 * Uses ADMIN_SECRET_KEY via header, bearer token, cookie, or query (see middleware).
 */

import { cookies, headers } from 'next/headers';
import { timingSafeEqual } from 'crypto';
import { ADMIN_COOKIE_NAME } from '@/lib/auth/admin-cookie';

export const ADMIN_EMAILS = ['zhong@chinatravel.co.nz'];

const ADMIN_KEY_HEADER = 'x-admin-key';

export function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET_KEY;
}

export function verifyAdminKey(key: string | null | undefined): boolean {
  const secret = getAdminSecret();
  if (!secret || !key) return false;

  // Use timing-safe comparison to prevent timing attacks
  try {
    return timingSafeEqual(Buffer.from(key), Buffer.from(secret));
  } catch {
    // Buffers have different lengths, so they're not equal
    return false;
  }
}

/** App Router route handlers: cookies + headers (must run in request context). */
export function verifyAdminApi(): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  if (cookies().get(ADMIN_COOKIE_NAME)?.value === secret) {
    return true;
  }

  const h = headers();
  if (verifyAdminKey(h.get(ADMIN_KEY_HEADER))) return true;

  const auth = h.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7).trim();
    if (verifyAdminKey(token)) return true;
  }

  return false;
}

/** Standard Request (e.g. middleware-less tests) — headers only. */
export function verifyAdminAccess(req: Request): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  const headerKey = req.headers.get(ADMIN_KEY_HEADER);
  if (verifyAdminKey(headerKey)) return true;

  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7).trim();
    if (verifyAdminKey(token)) return true;
  }

  return false;
}

export function adminUnauthorized(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function adminForbidden(): Response {
  return new Response(JSON.stringify({ error: 'Forbidden' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}
