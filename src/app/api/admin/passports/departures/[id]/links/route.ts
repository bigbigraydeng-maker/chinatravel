import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { createLink, getDepartureRow, audit } from '@/lib/passport/store';
import { sendUploadLink, uploadUrl, EmailNotConfiguredError } from '@/lib/passport/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Creates one personal upload link; optionally emails it to the customer. */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const departure = await getDepartureRow(params.id);
    if (!departure) return NextResponse.json({ error: '找不到这个团期' }, { status: 404 });
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const s = (v: unknown) => (typeof v === 'string' ? v : '');
    const label = s(body?.travellerLabel);
    const email = s(body?.email);
    const link = await createLink(params.id, { travellerLabel: label, email, orderRef: s(body?.orderRef) }, g.staff);
    let emailed = false;
    let emailError: string | null = null;
    if (body?.send === true && email) {
      try {
        await sendUploadLink(email, label, departure.tour_name, departure.departure_date, link.token, false);
        emailed = true;
        await audit({ actor: g.staff, actorType: 'staff', action: 'link_email', departureId: params.id, linkId: link.linkId });
      } catch (e) {
        emailError = e instanceof EmailNotConfiguredError ? '邮件服务没配置，请复制链接手动发给客人。' : '邮件没发出去，请复制链接手动发给客人。';
      }
    }
    // The raw link is shown to staff once, here; only its hash is stored.
    return NextResponse.json({ linkId: link.linkId, url: uploadUrl(link.token), expiresAt: link.expiresAt, emailed, emailError }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'createLink');
  }
}
