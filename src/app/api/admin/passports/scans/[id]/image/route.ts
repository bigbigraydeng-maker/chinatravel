import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { getScanImage } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const img = await getScanImage(params.id, { name: g.staff, type: 'staff' });
    if (!img) return new Response('Not found', { status: 404, headers: NO_STORE });
    return new Response(new Uint8Array(img.bytes), {
      headers: { ...NO_STORE, 'Content-Type': img.mime, 'Content-Disposition': 'inline', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch (e) {
    return errorResponse(e, 'image');
  }
}
