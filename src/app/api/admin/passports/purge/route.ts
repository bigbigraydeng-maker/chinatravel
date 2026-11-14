import { NextResponse } from 'next/server';
import { guardStaff, errorResponse } from '@/lib/passport/api';
import { purgeExpiredImages } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Deletes passport photos whose 6-months-after-return date has passed.
 * Also runs automatically each time staff open the passport home page.
 */
export async function POST() {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const deleted = await purgeExpiredImages(new Date(), g.staff);
    return NextResponse.json({ deleted });
  } catch (e) {
    return errorResponse(e, 'purge');
  }
}
