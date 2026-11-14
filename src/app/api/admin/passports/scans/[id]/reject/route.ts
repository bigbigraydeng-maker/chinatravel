import { NextResponse } from 'next/server';
import { guardStaff, errorResponse } from '@/lib/passport/api';
import { rejectScan } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const body = (await request.json().catch(() => null)) as { reason?: unknown } | null;
    await rejectScan(params.id, typeof body?.reason === 'string' ? body.reason : '', g.staff);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e, 'reject');
  }
}
