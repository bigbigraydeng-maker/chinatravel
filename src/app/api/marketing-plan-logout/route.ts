import { NextResponse } from 'next/server';
import { MARKETING_PLAN_COOKIE_NAME } from '@/lib/auth/marketing-plan-session';

export async function POST(request: Request) {
  const url = new URL('/marketing-plan/login', request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(MARKETING_PLAN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/marketing-plan',
    maxAge: 0,
  });
  return res;
}
