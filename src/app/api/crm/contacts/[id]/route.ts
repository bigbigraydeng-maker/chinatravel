import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminApi } from '@/lib/auth/admin';
import {
  getContact,
  updateContact,
  listConversationsForContact,
  listMessages,
} from '@/lib/crm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [contact, conversations] = await Promise.all([
      getContact(params.id),
      listConversationsForContact(params.id),
    ]);

    if (!contact) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Load messages for each conversation
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conv) => ({
        ...conv,
        messages: await listMessages(conv.id),
      })),
    );

    return NextResponse.json({ contact, conversations: conversationsWithMessages });
  } catch (err) {
    console.error('[CRM contact GET]', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminApi()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await updateContact(params.id, body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[CRM contact PATCH]', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
