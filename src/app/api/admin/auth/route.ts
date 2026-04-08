import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers';
import { verifyAdminKey, getAdminSecret } from '@/lib/auth/admin';
import { ADMIN_COOKIE_NAME } from '@/lib/auth/admin-cookie';
import { checkRateLimit, recordSuccessfulLogin } from '@/lib/auth/rate-limit';

export async function POST(request: Request) {
  // Rate limit: max 5 attempts per 15 minutes per IP
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfter) }
      }
    );
  }

  const secret = getAdminSecret();
  if (!secret) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }

  let body: { key?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!verifyAdminKey(body.key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
  }

  // Record successful login to clear rate limit
  recordSuccessfulLogin(request);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function GET() {
  const secret = getAdminSecret();
  if (!secret) {
    return NextResponse.json({ ok: false, configured: false });
  }
  const cookie = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return NextResponse.json({ ok: cookie === secret, configured: true });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return res;
}
