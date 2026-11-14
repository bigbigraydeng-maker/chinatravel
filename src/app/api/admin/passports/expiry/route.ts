import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { listExpiryCandidates } from '@/lib/passport/store';
import { buildExpiryReport } from '@/lib/passport/expiry';

export const dynamic = 'force-dynamic';

export async function GET() {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const today = new Date();
    const rows = await listExpiryCandidates(g.staff, today);
    return NextResponse.json({ items: buildExpiryReport(rows, today) }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'expiry');
  }
}
