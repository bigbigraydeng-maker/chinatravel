import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { exportDepartureRows } from '@/lib/passport/store';
import { buildDepartureCsv } from '@/lib/passport/export-csv';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Full passport numbers — every download is logged. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const result = await exportDepartureRows(params.id, g.staff);
    if (!result) return new Response('Not found', { status: 404 });
    const csv = buildDepartureCsv(result.rows, result.departure.departure_date, new Date());
    const safeName = result.departure.tour_name.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'departure';
    return new Response(csv, {
      headers: {
        ...NO_STORE,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="passports-${safeName}-${result.departure.departure_date}.csv"`,
      },
    });
  } catch (e) {
    return errorResponse(e, 'export');
  }
}
