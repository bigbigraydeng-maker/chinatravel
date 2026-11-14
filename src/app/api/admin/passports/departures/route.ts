import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { createDeparture, listDepartures } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    return NextResponse.json({ items: await listDepartures() }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'departures');
  }
}

export async function POST(request: Request) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const s = (v: unknown) => (typeof v === 'string' ? v : '');
    const row = await createDeparture(
      { tourName: s(body?.tourName), departureDate: s(body?.departureDate), returnDate: s(body?.returnDate), notes: s(body?.notes) },
      g.staff
    );
    return NextResponse.json(row);
  } catch (e) {
    return errorResponse(e, 'createDeparture');
  }
}
