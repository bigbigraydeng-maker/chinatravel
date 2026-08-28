import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth/admin-cookie';
import {
  MARKETING_PLAN_COOKIE_NAME,
  isValidMarketingPlanSession,
  marketingPlanAccessKey,
} from '@/lib/auth/marketing-plan-session';

const ADMIN_LOGIN = '/admin/login';

/**
 * v3.1 Phase 0: staging isolation for the Ceepii redesign preview at
 * staging.chinatravel.co.nz. See ceepii-assessment.md §4.1.
 *
 * When NEXT_PUBLIC_ENV=staging:
 *  - Basic auth gates every request except /api/*, /_next/*, /robots.txt,
 *    /sitemap.xml, /favicon.ico (子牙 fix: /api/* must bypass or lead
 *    submission returns 401 and the lead channel dies).
 *  - Basic auth failure returns 401 with WWW-Authenticate, X-Robots-Tag
 *    noindex, and Cache-Control: no-store (so Render / CDN never caches
 *    the 401 for a later authenticated request).
 *  - On success, the request falls through to the existing marketing plan
 *    and admin gates (子牙 fix: v2 sample short-circuited past them).
 *  - Every response emitted in staging gets X-Robots-Tag appended at the
 *    end, no matter which gate returned it.
 */

function isStagingEnv(): boolean {
  return process.env.NEXT_PUBLIC_ENV === 'staging';
}

const STAGING_AUTH_BYPASS_PATHS = ['/robots.txt', '/sitemap.xml', '/favicon.ico'];

function checkStagingBasicAuth(request: NextRequest, pathname: string): NextResponse | null {
  const bypass =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    STAGING_AUTH_BYPASS_PATHS.includes(pathname);
  if (bypass) return null;

  const user = process.env.STAGING_USER;
  const pass = process.env.STAGING_PASS;
  if (!user || !pass) {
    return new NextResponse('Staging auth not configured (missing STAGING_USER / STAGING_PASS)', {
      status: 503,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  }

  const expected = 'Basic ' + btoa(`${user}:${pass}`);
  const got = request.headers.get('authorization');
  if (got === expected) return null;

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="staging"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}

function stampStagingNoindex(res: NextResponse): NextResponse {
  if (isStagingEnv()) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return res;
}

function applyMarketingSeoHeaders(pathname: string, res: NextResponse) {
  if (
    pathname.startsWith('/marketing') ||
    pathname.startsWith('/api/marketing/') ||
    pathname === '/campaign/social'
  ) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
}

function isMarketingGatePublic(pathname: string): boolean {
  if (pathname.startsWith('/marketing/campaign/login')) return true;
  if (pathname === '/api/marketing/campaign-auth' || pathname === '/api/marketing/campaign-logout') return true;
  return false;
}

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // v3.1 Phase 0: staging basic auth runs before every other gate. Bypasses
  // /api/*, /_next/*, and a few well-known paths (see checkStagingBasicAuth).
  // On success it falls through to marketing/admin gates instead of
  // short-circuiting past them (子牙 fix).
  if (isStagingEnv()) {
    const authResp = checkStagingBasicAuth(request, pathname);
    if (authResp) return authResp; // 401 already stamped with noindex + no-store
  }

  const mpKey = marketingPlanAccessKey();

  if (
    mpKey &&
    !isMarketingGatePublic(pathname) &&
    (pathname.startsWith('/marketing') || pathname.startsWith('/api/marketing/campaign-'))
  ) {
    const cookie = request.cookies.get(MARKETING_PLAN_COOKIE_NAME)?.value;
    const ok = await isValidMarketingPlanSession(mpKey, cookie);
    if (!ok) {
      if (pathname.startsWith('/api/marketing/campaign-')) {
        const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        applyMarketingSeoHeaders(pathname, res);
        return stampStagingNoindex(res);
      }
      const login = new URL('/marketing/campaign/login', request.url);
      login.searchParams.set('next', pathname + request.nextUrl.search);
      const res = NextResponse.redirect(login);
      applyMarketingSeoHeaders(pathname, res);
      return stampStagingNoindex(res);
    }
  }

  const isAdminArea = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (isAdminArea) {
    return stampStagingNoindex(handleAdmin(request));
  }

  const res = NextResponse.next();
  // Full page loads: avoid long-lived HTML cache pointing at deleted build chunks after deploy
  if (request.headers.get('sec-fetch-dest') === 'document') {
    res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  applyMarketingSeoHeaders(pathname, res);
  return stampStagingNoindex(res);
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
