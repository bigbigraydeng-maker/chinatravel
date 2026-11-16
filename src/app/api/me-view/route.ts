/**
 * POST /api/me-view — the page tells this site's server "this page rendered"; if this device came in through a Magic
 * Engine mail link (cookie `cts_me`), the server reports the tour page view to Magic Engine. Always answers 204 and
 * never waits long: reporting must never slow or break the page. See lib/me-click-beacon.ts.
 */
import { NextRequest, NextResponse } from 'next/server';
import { VIEW_COOKIE, planPageView, sendBeacon } from '@/lib/me-click-beacon';

export const dynamic = 'force-dynamic';

const MAX_BODY = 512;
const done = () => new NextResponse(null, { status: 204 });

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(VIEW_COOKIE)?.value ?? null;
  if (token === null) return done();
  const text = await request.text().catch(() => '');
  if (text.length === 0 || text.length > MAX_BODY) return done();
  let path: unknown = null;
  try {
    path = (JSON.parse(text) as { path?: unknown }).path;
  } catch {
    return done();
  }
  const report = planPageView({ host: request.headers.get('host'), token, path, ua: request.headers.get('user-agent') });
  if (report !== null) await sendBeacon(report);
  return done();
}
