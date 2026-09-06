import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-demand revalidation endpoint for Next.js Full Route Cache.
 *
 * Trigger via POST with either a specific path or `all` to blow away
 * the whole route cache:
 *   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" \
 *        "https://www.ctstours.co.nz/api/revalidate?path=/blog/beijing-xian-itinerary-10-days"
 *   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" \
 *        "https://www.ctstours.co.nz/api/revalidate?tag=all"
 *
 * The secret must match REVALIDATE_SECRET in Render env. Without it,
 * requests are rejected with 401 — this is a mutation endpoint.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const providedSecret = authHeader?.replace(/^Bearer\s+/i, '');
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'REVALIDATE_SECRET not configured' },
      { status: 500 },
    );
  }
  if (providedSecret !== expected) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const tag = searchParams.get('tag');

  if (!path && !tag) {
    return NextResponse.json(
      { ok: false, error: 'provide ?path=/some/path or ?tag=name' },
      { status: 400 },
    );
  }

  const revalidated: string[] = [];
  if (path) {
    revalidatePath(path);
    revalidated.push(`path:${path}`);
  }
  if (tag) {
    revalidateTag(tag);
    revalidated.push(`tag:${tag}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated,
    now: new Date().toISOString(),
  });
}
