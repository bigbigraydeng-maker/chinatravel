const GRAPH_API = 'https://graph.facebook.com/v20.0';

export async function sendWhatsAppMessage(
  phoneNumberId: string,
  toWaId: string,
  text: string,
  accessToken: string,
): Promise<{ message_id: string } | null> {
  try {
    const res = await fetch(`${GRAPH_API}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: toWaId,
        type: 'text',
        text: { preview_url: true, body: text },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[WhatsApp] send failed:', res.status, err);
      return null;
    }

    const data = await res.json();
    return { message_id: data.messages?.[0]?.id };
  } catch (err) {
    console.error('[WhatsApp] send error:', err);
    return null;
  }
}

export interface WhatsAppInboundMessage {
  waId: string;         // sender's WhatsApp ID (phone number)
  name: string;         // sender's display name
  messageId: string;
  text: string;
  timestamp: number;
  phoneNumberId: string; // our phone number ID (to reply from)
}

export function parseWhatsAppWebhook(body: unknown): WhatsAppInboundMessage[] {
  const payload = body as Record<string, unknown>;
  if (payload.object !== 'whatsapp_business_account') return [];

  const messages: WhatsAppInboundMessage[] = [];
  const entries = (payload.entry as unknown[]) || [];

  for (const entry of entries) {
    const e = entry as Record<string, unknown>;
    const changes = (e.changes as unknown[]) || [];

    for (const change of changes) {
      const c = change as Record<string, unknown>;
      const value = c.value as Record<string, unknown>;
      if (c.field !== 'messages' || !value) continue;

      const phoneNumberId = (value.metadata as Record<string, string>)?.phone_number_id;
      const contacts = (value.contacts as unknown[]) || [];
      const msgs = (value.messages as unknown[]) || [];

      for (const msg of msgs) {
        const m = msg as Record<string, unknown>;
        if (m.type !== 'text') continue; // only handle text for now

        const waId = String(m.from);
        const contact = (contacts as Array<Record<string, unknown>>).find(
          (c) => (c as Record<string, string>).wa_id === waId,
        );
        const name =
          (contact?.profile as Record<string, string>)?.name || waId;

        messages.push({
          waId,
          name,
          messageId: String(m.id),
          text: (m.text as Record<string, string>)?.body || '',
          timestamp: Number(m.timestamp),
          phoneNumberId,
        });
      }
    }
  }

  return messages;
}
