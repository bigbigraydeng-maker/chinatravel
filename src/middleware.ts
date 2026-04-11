import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth/admin-cookie';

const ADMIN_LOGIN = '/admin/login';

function adminSecret(): string | undefined {
  return process.env.ADMIN_SECRET_KEY;
}

function isAuthed(request: NextRequest, secret: string): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie === secret) return true;
  if (request.headers.get('x-admin-key') === secret) return true;
  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ') && auth.slice(7).trim() === secret) return true;
  return false;
}

function handleAdmin(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const secret = adminSecret();

  if (!secret) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        { error: 'Admin is not configured (missing ADMIN_SECRET_KEY)' },
        { status: 503 }
      );
    }
    if (pathname.startsWith('/admin/login')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/login?error=config', request.url));
  }

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  const qp = request.nextUrl.searchParams.get('admin_key');
  if (qp === secret && pathname.startsWith('/admin')) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete('admin_key');
    const res = NextResponse.redirect(clean);
    res.cookies.set(ADMIN_COOKIE_NAME, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  if (isAuthed(request, secret)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL(ADMIN_LOGIN, request.url);
  loginUrl.searchParams.set('next', pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (isAdminArea) {
    return handleAdmin(request);
  }

  // Full page loads: avoid long-lived HTML cache pointing at deleted build chunks after deploy
  // (fixes 404 + wrong MIME on /_next/static/chunks/... after a new release).
  if (request.headers.get('sec-fetch-dest') === 'document') {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
