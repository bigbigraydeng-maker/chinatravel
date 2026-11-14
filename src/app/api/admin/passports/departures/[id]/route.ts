import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { getDepartureDetail } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const detail = await getDepartureDetail(params.id, g.staff);
    if (!detail) return NextResponse.json({ error: '找不到这个团期' }, { status: 404 });
    return NextResponse.json(detail, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'departure');
  }
}
