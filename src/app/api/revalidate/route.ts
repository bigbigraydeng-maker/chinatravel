import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { PUBLISHED_TOUR_CATALOG_TAG } from '@/lib/data/published-tour-catalog';

export const dynamic = 'force-dynamic';

function matchesSecret(received: string | null, expected: string | undefined): boolean {
  if (!received || !expected) return false;
  const left = createHash('sha256').update(received).digest();
  const right = createHash('sha256').update(expected).digest();
  return timingSafeEqual(left, right);
}

/** ME calls this after an explicit human publish to expire cached catalogue pages. */
export async function POST(request: NextRequest) {
  const expected = process.env.CTS_TOUR_CATALOG_REVALIDATE_SECRET;
  const expectedClientId = process.env.CTS_TOUR_CATALOG_CLIENT_ID;
  const authorization = request.headers.get('authorization');
  const received = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? null;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const clientId = body && typeof body === 'object' && !Array.isArray(body)
    ? (body as { clientId?: unknown }).clientId
    : null;
  if (!matchesSecret(received, expected) || !expectedClientId || clientId !== expectedClientId) {
    return NextResponse.json({ ok: false }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  revalidateTag(PUBLISHED_TOUR_CATALOG_TAG);
  revalidatePath('/', 'page');
  revalidatePath('/tours', 'page');
  revalidatePath('/tours/find', 'page');
  revalidatePath('/tours/[destination]', 'page');
  revalidatePath('/tours/[destination]/[tier]', 'page');
  revalidatePath('/tours/[destination]/[tier]/[tour]', 'page');
  revalidatePath('/tours/[destination]/[tier]/[tour]/print', 'page');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({ ok: true, revalidated: true }, { headers: { 'Cache-Control': 'no-store' } });
}
