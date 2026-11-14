import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { searchTravellers } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const q = new URL(request.url).searchParams.get('q') ?? '';
    return NextResponse.json({ items: await searchTravellers(q, g.staff) }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'travellers');
  }
}
