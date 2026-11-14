import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { revealPassportNumber } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** 「查看完整」— POST so it is never prefetched or cached; always logged. */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const number = await revealPassportNumber(params.id, g.staff);
    if (!number) return NextResponse.json({ error: '找不到' }, { status: 404 });
    return NextResponse.json({ passportNumber: number }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'reveal');
  }
}
