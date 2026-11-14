import { NextResponse } from 'next/server';
import { guardStaff, errorResponse } from '@/lib/passport/api';
import { revokeLink } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    await revokeLink(params.id, g.staff);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e, 'revoke');
  }
}
