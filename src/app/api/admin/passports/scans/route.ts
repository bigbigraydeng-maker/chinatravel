import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { listReviewQueue, processUpload } from '@/lib/passport/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET() {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    return NextResponse.json({ items: await listReviewQueue() }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'queue');
  }
}

/** One photo per request; the page uploads a batch one by one. */
export async function POST(request: Request) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: '没有收到图片' }, { status: 400 });
    const departureId = form.get('departureId')?.toString() || null;
    const orderRef = form.get('orderRef')?.toString() || null;
    const result = await processUpload({
      bytes: Buffer.from(await file.arrayBuffer()),
      mime: file.type,
      source: 'staff',
      uploadedBy: g.staff,
      departureId,
      orderRef,
    });
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'upload');
  }
}
