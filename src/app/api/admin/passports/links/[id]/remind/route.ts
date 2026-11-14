import { NextResponse } from 'next/server';
import { guardStaff, errorResponse, NO_STORE } from '@/lib/passport/api';
import { reissueLink, audit } from '@/lib/passport/store';
import { sendUploadLink, uploadUrl, EmailNotConfiguredError } from '@/lib/passport/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Issues a fresh link (old one stops working) and emails it if we have an address. */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const g = guardStaff();
  if (!g.ok) return g.response;
  try {
    const { token, link, departure } = await reissueLink(params.id, g.staff);
    let emailed = false;
    let emailError: string | null = null;
    if (link.email) {
      try {
        await sendUploadLink(link.email, link.traveller_label, departure.tour_name, departure.departure_date, token, true);
        emailed = true;
        await audit({ actor: g.staff, actorType: 'staff', action: 'link_email', departureId: departure.id, linkId: link.id, detail: { reminder: true } });
      } catch (e) {
        emailError = e instanceof EmailNotConfiguredError ? '邮件服务没配置，请复制新链接手动发给客人。' : '邮件没发出去，请复制新链接手动发给客人。';
      }
    } else {
      emailError = '这位客人没有留邮箱，请复制新链接手动发（旧链接已失效）。';
    }
    return NextResponse.json({ url: uploadUrl(token), emailed, emailError }, { headers: NO_STORE });
  } catch (e) {
    return errorResponse(e, 'remind');
  }
}
