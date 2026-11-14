import { NextResponse } from 'next/server';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { cleanStaffName, currentStaffName, STAFF_COOKIE } from '@/lib/passport/staff';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!verifyAdminApi()) return adminUnauthorized();
  return NextResponse.json({ name: currentStaffName() });
}

/** Sets who is using this browser, for the audit log. */
export async function POST(request: Request) {
  if (!verifyAdminApi()) return adminUnauthorized();
  const body = (await request.json().catch(() => null)) as { name?: unknown } | null;
  const name = cleanStaffName(body?.name);
  if (!name) return NextResponse.json({ error: '名字至少 2 个字' }, { status: 400 });
  const res = NextResponse.json({ name });
  res.cookies.set(STAFF_COOKIE, encodeURIComponent(name), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
