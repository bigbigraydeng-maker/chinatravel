import { NextResponse } from 'next/server';
import {
  MARKETING_CAMPAIGN_COOKIE_PATH,
  MARKETING_PLAN_COOKIE_NAME,
  computeMarketingPlanSessionToken,
  marketingPlanAccessKey,
  timingSafeEqualAscii,
} from '@/lib/auth/marketing-plan-session';

export async function POST(request: Request) {
  const accessKey = marketingPlanAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      { error: 'Marketing campaign gate is not configured (set MARKETING_PLAN_ACCESS_KEY).' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const password =
    typeof body === 'object' && body !== null && 'password' in body && typeof (body as { password: unknown }).password === 'string'
      ? (body as { password: string }).password
      : '';

  if (!timingSafeEqualAscii(password, accessKey)) {
    await new Promise(r => setTimeout(r, 350));
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = await computeMarketingPlanSessionToken(accessKey);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MARKETING_PLAN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: MARKETING_CAMPAIGN_COOKIE_PATH,
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
