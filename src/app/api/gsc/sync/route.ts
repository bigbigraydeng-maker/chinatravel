import { NextRequest, NextResponse } from 'next/server';
import { syncGscData } from '@/lib/gsc/sync';

const SYNC_SECRET = process.env.GSC_SYNC_SECRET;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (SYNC_SECRET && authHeader !== `Bearer ${SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const targetDate = body.date as string | undefined;

    const result = await syncGscData(targetDate);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[GSC Sync Error]', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
