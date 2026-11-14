import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { getScanForReview } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const scan = await getScanForReview(params.id, g.staff);
    if (!scan) return NextResponse.json({ error: '找不到这条记录' }, { status: 404 });
    return NextResponse.json(scan, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'scan');
  }
}
