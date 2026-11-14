import { NextResponse } from 'next/server';
import { isPassportCryptoConfigured } from '@/lib/passport/crypto';
import { customerConfirmScan, findOpenLink, PassportInputError } from '@/lib/passport/store';
import { parseFields } from '@/lib/passport/parse-fields';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: { token: string } }) {
  if (!isPassportCryptoConfigured()) return NextResponse.json({ error: 'Uploads are not available right now.' }, { status: 503 });
  try {
    const link = await findOpenLink(params.token);
    if (!link) return NextResponse.json({ error: 'This link has expired or has already been used.' }, { status: 410 });
    const body = (await request.json().catch(() => null)) as { scanId?: unknown; fields?: unknown } | null;
    const fields = parseFields(body?.fields);
    if (!fields || typeof body?.scanId !== 'string') return NextResponse.json({ error: 'Please check the form.' }, { status: 400 });
    await customerConfirmScan(link.id, body.scanId, fields);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof PassportInputError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error('[passport] customer confirm:', e instanceof Error ? e.message : 'unknown');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
