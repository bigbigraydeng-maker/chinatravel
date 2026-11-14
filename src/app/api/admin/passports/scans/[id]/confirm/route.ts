import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { confirmScan } from '@/lib/passport/store';
import { parseFields } from '@/lib/passport/parse-fields';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const fields = parseFields(body?.fields);
    if (!fields) return NextResponse.json({ error: '字段格式不对' }, { status: 400 });
    const s = (v: unknown) => (typeof v === 'string' ? v : null);
    const result = await confirmScan(
      params.id,
      {
        fields,
        departureId: s(body?.departureId),
        orderRef: s(body?.orderRef),
        agentName: s(body?.agentName),
        contactEmail: s(body?.contactEmail),
        contactPhone: s(body?.contactPhone),
      },
      g.staff
    );
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'confirm');
  }
}
