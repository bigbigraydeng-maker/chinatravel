import { NextRequest, NextResponse } from 'next/server';
import { syncGa4Data } from '@/lib/ga4/sync';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Reuse the same secret pattern as /api/gsc/sync. If unset, route is open in dev only.
const SYNC_SECRET = process.env.GA4_SYNC_SECRET ?? process.env.GSC_SYNC_SECRET;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (SYNC_SECRET && authHeader !== `Bearer ${SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const daysBack = typeof body.daysBack === 'number' ? body.daysBack : 7;

    const result = await syncGa4Data(daysBack);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[GA4 Sync Error]', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
