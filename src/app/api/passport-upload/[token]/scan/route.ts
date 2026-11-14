import { NextResponse } from 'next/server';
import { isPassportCryptoConfigured } from '@/lib/passport/crypto';
import { findOpenLink, processUpload, recordCustomerAttempt, PassportInputError } from '@/lib/passport/store';
import { NO_STORE } from '@/lib/passport/api';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const LINK_GONE = 'This link has expired or has already been used. Please contact CTS Tours for a new one.';

/** Customer uploads a photo through their personal link; they see what was read before submitting. */
export async function POST(request: Request, { params }: { params: { token: string } }) {
  if (!isPassportCryptoConfigured()) return NextResponse.json({ error: 'Uploads are not available right now. Please call 0800 CTS 888.' }, { status: 503 });
  try {
    const link = await findOpenLink(params.token);
    if (!link) return NextResponse.json({ error: LINK_GONE }, { status: 410 });
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No photo received.' }, { status: 400 });
    if (!(await recordCustomerAttempt(link.id))) {
      return NextResponse.json({ error: 'Too many attempts on this link. Please contact CTS Tours.' }, { status: 429 });
    }
    const result = await processUpload({
      bytes: Buffer.from(await file.arrayBuffer()),
      mime: file.type,
      source: 'customer',
      uploadedBy: link.travellerLabel,
      linkId: link.id,
      departureId: link.departureId,
      orderRef: link.orderRef,
    });
    // Customers see the fields and whether the photo was clear — not staff-only warning detail.
    return NextResponse.json(
      { scanId: result.scanId, fields: result.fields, readable: result.mrzValid, attemptsLeft: link.attemptsLeft - 1 },
      { headers: NO_STORE }
    );
  } catch (e) {
    if (e instanceof PassportInputError) {
      const msg = e.message.includes('JPG') ? 'Please upload a JPG, PNG or WebP photo.' : e.message.includes('8 MB') ? 'That photo is too large (8 MB max).' : 'Please try another photo.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error('[passport] customer upload:', e instanceof Error ? e.message : 'unknown');
    return NextResponse.json({ error: 'Something went wrong. Please try again, or call 0800 CTS 888.' }, { status: 500 });
  }
}
