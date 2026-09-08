import { NextRequest, NextResponse } from 'next/server';
import {
  parseWhatsAppWebhook,
  sendWhatsAppMessage,
} from '@/lib/messaging/whatsapp';
import {
  upsertContactByWhatsApp,
  getOrCreateConversation,
  saveMessage,
  getAutoReplies,
  matchAutoReply,
  updateContact,
} from '@/lib/crm';

export const dynamic = 'force-dynamic';

// GET: Meta webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (!verifyToken) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp] Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// POST: Receive inbound messages
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('[WhatsApp] WHATSAPP_ACCESS_TOKEN not set');
    return NextResponse.json({ ok: true }); // always 200 to Meta
  }

  const messages = parseWhatsAppWebhook(body);

  for (const msg of messages) {
    try {
      // 1. Upsert contact
      const contact = await upsertContactByWhatsApp(msg.waId, msg.name);

      // 2. Mark as contacted if new
      if (contact.status === 'new') {
        await updateContact(contact.id, { status: 'contacted' });
      }

      // 3. Get/create conversation
      const conversation = await getOrCreateConversation(contact.id, 'whatsapp');

      // 4. Save inbound message
      await saveMessage({
        conversation_id: conversation.id,
        contact_id: contact.id,
        direction: 'inbound',
        content: msg.text,
        channel_message_id: msg.messageId,
      });

      // 5. Find matching auto-reply
      const replies = await getAutoReplies('whatsapp');
      const reply = matchAutoReply(msg.text, replies);

      if (reply) {
        // Optional delay
        if (reply.delay_seconds > 0) {
          await new Promise((r) => setTimeout(r, reply.delay_seconds * 1000));
        }

        // Send reply
        const sent = await sendWhatsAppMessage(
          msg.phoneNumberId,
          msg.waId,
          reply.content,
          accessToken,
        );

        // Save outbound message
        if (sent) {
          await saveMessage({
            conversation_id: conversation.id,
            contact_id: contact.id,
            direction: 'outbound',
            content: reply.content,
            channel_message_id: sent.message_id,
            is_automated: true,
          });
        }
      }
    } catch (err) {
      console.error('[WhatsApp] Error processing message:', msg.waId, err);
    }
  }

  // Always return 200 — Meta will retry if we return non-200
  return NextResponse.json({ ok: true });
}
