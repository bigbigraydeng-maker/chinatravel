import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminApi } from '@/lib/auth/admin';
import { getContact, getOrCreateConversation, saveMessage } from '@/lib/crm';
import { sendWhatsAppMessage } from '@/lib/messaging/whatsapp';
import { sendMessengerMessage } from '@/lib/messaging/messenger';

export const dynamic = 'force-dynamic';

// Manual message send from admin CRM panel
export async function POST(req: NextRequest) {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { contact_id, channel, message } = await req.json();

    if (!contact_id || !channel || !message?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const contact = await getContact(contact_id);
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    const conversation = await getOrCreateConversation(contact_id, channel);
    let platformMsgId: string | undefined;

    if (channel === 'whatsapp') {
      const token = process.env.WHATSAPP_ACCESS_TOKEN;
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      if (!token || !phoneNumberId || !contact.whatsapp_id) {
        return NextResponse.json({ error: 'WhatsApp not configured or contact has no WA ID' }, { status: 422 });
      }
      const sent = await sendWhatsAppMessage(phoneNumberId, contact.whatsapp_id, message, token);
      platformMsgId = sent?.message_id;
    } else if (channel === 'messenger') {
      const token = process.env.MESSENGER_PAGE_ACCESS_TOKEN;
      if (!token || !contact.messenger_id) {
        return NextResponse.json({ error: 'Messenger not configured or contact has no PSID' }, { status: 422 });
      }
      const sent = await sendMessengerMessage(contact.messenger_id, message, token);
      platformMsgId = sent?.message_id;
    } else {
      return NextResponse.json({ error: 'Unsupported channel' }, { status: 400 });
    }

    const saved = await saveMessage({
      conversation_id: conversation.id,
      contact_id,
      direction: 'outbound',
      content: message,
      channel_message_id: platformMsgId,
      is_automated: false,
    });

    return NextResponse.json({ ok: true, message_id: saved.id });
  } catch (err) {
    console.error('[CRM send-message]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
