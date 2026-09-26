import { NextRequest, NextResponse } from 'next/server';
import {
  parseMessengerWebhook,
  sendMessengerMessage,
  getMessengerUserName,
} from '@/lib/messaging/messenger';
import {
  upsertContactByMessenger,
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

  const verifyToken = process.env.MESSENGER_WEBHOOK_VERIFY_TOKEN;
  if (!verifyToken) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Messenger] Webhook verified');
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

  const pageToken = process.env.MESSENGER_PAGE_ACCESS_TOKEN;
  if (!pageToken) {
    console.error('[Messenger] MESSENGER_PAGE_ACCESS_TOKEN not set');
    return NextResponse.json({ ok: true }); // always 200 to Meta
  }

  const messages = parseMessengerWebhook(body);

  for (const msg of messages) {
    try {
      // 1. Look up display name from Graph API
      const name = await getMessengerUserName(msg.psid, pageToken);

      // 2. Upsert contact
      const contact = await upsertContactByMessenger(msg.psid, name);

      // 3. Mark as contacted if new
      if (contact.status === 'new') {
        await updateContact(contact.id, { status: 'contacted' });
      }

      // 4. Get/create conversation
      const conversation = await getOrCreateConversation(contact.id, 'messenger');

      // 5. Save inbound message
      await saveMessage({
        conversation_id: conversation.id,
        contact_id: contact.id,
        direction: 'inbound',
        content: msg.text,
        channel_message_id: msg.messageId,
      });

      // 6. Find matching auto-reply
      const replies = await getAutoReplies('messenger');
      const reply = matchAutoReply(msg.text, replies);

      if (reply) {
        if (reply.delay_seconds > 0) {
          await new Promise((r) => setTimeout(r, reply.delay_seconds * 1000));
        }

        const sent = await sendMessengerMessage(msg.psid, reply.content, pageToken);

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
      console.error('[Messenger] Error processing message:', msg.psid, err);
    }
  }

  return NextResponse.json({ ok: true });
}
