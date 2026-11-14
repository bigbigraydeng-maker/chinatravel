import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { listAudit } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    return NextResponse.json({ items: await listAudit(300) }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'audit');
  }
}
