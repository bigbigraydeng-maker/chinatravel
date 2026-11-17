/**
 * POST /api/me-callback — "Ask Baker to call me" on /brochure. Only for a device that came in through a Magic Engine
 * mail link (cookie `cts_me`). Adds the remembered token and forwards the request to Magic Engine, which re-checks it.
 * 204 only when Magic Engine accepted it; the page then shows a thank-you, otherwise the phone number.
 */
import { NextRequest, NextResponse } from 'next/server';
import { ME_CALLBACK_ENDPOINT, VIEW_COOKIE, planCallback } from '@/lib/me-click-beacon';

export const dynamic = 'force-dynamic';

const MAX_BODY = 1024;
const reply = (status: number) => new NextResponse(null, { status });

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(VIEW_COOKIE)?.value ?? null;
  if (token === null) return reply(400);

  const text = await request.text().catch(() => '');
  if (text.length > MAX_BODY) return reply(413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return reply(400);
  }

  const plan = planCallback({
    host: request.headers.get('host'),
    token,
    body,
    ua: request.headers.get('user-agent'),
  });
  if (plan === null) return reply(400);

  try {
    const res = await fetch(ME_CALLBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(plan),
      signal: AbortSignal.timeout(5000),
    });
    return reply(res.status === 204 ? 204 : 502);
  } catch {
    return reply(502);
  }
}
