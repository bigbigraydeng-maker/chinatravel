const GRAPH_API = 'https://graph.facebook.com/v20.0';

export async function sendMessengerMessage(
  recipientPsid: string,
  text: string,
  pageAccessToken: string,
): Promise<{ message_id: string } | null> {
  try {
    const res = await fetch(`${GRAPH_API}/me/messages?access_token=${pageAccessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientPsid },
        message: { text },
        messaging_type: 'RESPONSE',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Messenger] send failed:', res.status, err);
      return null;
    }

    const data = await res.json();
    return { message_id: data.message_id };
  } catch (err) {
    console.error('[Messenger] send error:', err);
    return null;
  }
}

export async function getMessengerUserName(
  psid: string,
  pageAccessToken: string,
): Promise<string> {
  try {
    const res = await fetch(
      `${GRAPH_API}/${psid}?fields=first_name,last_name&access_token=${pageAccessToken}`,
    );
    if (!res.ok) return psid;
    const data = await res.json();
    return [data.first_name, data.last_name].filter(Boolean).join(' ') || psid;
  } catch {
    return psid;
  }
}

export interface MessengerInboundMessage {
  psid: string;        // sender's Page-Scoped ID
  pageId: string;      // our Facebook page ID
  messageId: string;
  text: string;
  timestamp: number;
}

export function parseMessengerWebhook(body: unknown): MessengerInboundMessage[] {
  const payload = body as Record<string, unknown>;
  if (payload.object !== 'page') return [];

  const messages: MessengerInboundMessage[] = [];
  const entries = (payload.entry as unknown[]) || [];

  for (const entry of entries) {
    const e = entry as Record<string, unknown>;
    const pageId = String(e.id);
    const messaging = (e.messaging as unknown[]) || [];

    for (const event of messaging) {
      const ev = event as Record<string, unknown>;
      // Skip delivery/read receipts
      if (!ev.message) continue;
      const msg = ev.message as Record<string, unknown>;
      // Skip echo (messages we sent)
      if (msg.is_echo) continue;
      if (!msg.text) continue;

      messages.push({
        psid: (ev.sender as Record<string, string>)?.id,
        pageId,
        messageId: String(msg.mid),
        text: String(msg.text),
        timestamp: Number(ev.timestamp),
      });
    }
  }

  return messages;
}
