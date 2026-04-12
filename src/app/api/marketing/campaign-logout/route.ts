import { NextResponse } from 'next/server';
import { MARKETING_CAMPAIGN_COOKIE_PATH, MARKETING_PLAN_COOKIE_NAME } from '@/lib/auth/marketing-plan-session';

export async function POST(request: Request) {
  const url = new URL('/marketing/campaign/login', request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(MARKETING_PLAN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: MARKETING_CAMPAIGN_COOKIE_PATH,
    maxAge: 0,
  });
  return res;
}
