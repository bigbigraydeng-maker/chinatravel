import { getSupabaseAdmin } from './supabase-admin';

export type ContactStatus =
  | 'new' | 'contacted' | 'qualified' | 'proposal' | 'booked' | 'closed' | 'lost';

export type ContactSource = 'whatsapp' | 'messenger' | 'instagram' | 'website' | 'email';

export interface CrmContact {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  whatsapp_id: string | null;
  messenger_id: string | null;
  source: ContactSource;
  status: ContactStatus;
  tour_interest: string | null;
  travel_date: string | null;
  party_size: number | null;
  budget: string | null;
  tags: string[];
  notes: string | null;
  assigned_to: string | null;
  first_contact_at: string;
  last_contact_at: string;
  created_at: string;
  updated_at: string;
}

export interface CrmConversation {
  id: string;
  contact_id: string;
  channel: string;
  channel_conversation_id: string | null;
  status: 'open' | 'pending' | 'closed';
  last_message_at: string;
  created_at: string;
}

export interface CrmMessage {
  id: string;
  conversation_id: string;
  contact_id: string;
  direction: 'inbound' | 'outbound';
  content: string;
  message_type: string;
  channel_message_id: string | null;
  is_automated: boolean;
  sent_at: string;
}

export interface CrmAutoReply {
  id: string;
  name: string;
  trigger_keywords: string[];
  channel: string;
  content: string;
  priority: number;
  delay_seconds: number;
  is_active: boolean;
}

// ─── Contacts ───────────────────────────────────────────────────────────────

export async function upsertContactByWhatsApp(
  waId: string,
  name?: string,
): Promise<CrmContact> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_contacts')
    .upsert(
      { whatsapp_id: waId, name: name || null, source: 'whatsapp', last_contact_at: new Date().toISOString() },
      { onConflict: 'whatsapp_id', ignoreDuplicates: false },
    )
    .select()
    .single();
  if (error) throw error;
  return data as CrmContact;
}

export async function upsertContactByMessenger(
  psid: string,
  name?: string,
): Promise<CrmContact> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_contacts')
    .upsert(
      { messenger_id: psid, name: name || null, source: 'messenger', last_contact_at: new Date().toISOString() },
      { onConflict: 'messenger_id', ignoreDuplicates: false },
    )
    .select()
    .single();
  if (error) throw error;
  return data as CrmContact;
}

export async function createContactFromForm(data: {
  name: string;
  email?: string;
  phone?: string;
  source?: ContactSource;
  tour_interest?: string;
}): Promise<CrmContact> {
  const db = getSupabaseAdmin();
  const { data: row, error } = await db
    .from('crm_contacts')
    .insert({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      source: data.source || 'website',
      tour_interest: data.tour_interest || null,
      status: 'new',
    })
    .select()
    .single();
  if (error) throw error;
  return row as CrmContact;
}

export async function updateContact(
  id: string,
  updates: Partial<CrmContact>,
): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db
    .from('crm_contacts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function listContacts(opts?: {
  status?: ContactStatus;
  source?: ContactSource;
  limit?: number;
  offset?: number;
}): Promise<{ contacts: CrmContact[]; total: number }> {
  const db = getSupabaseAdmin();
  let q = db
    .from('crm_contacts')
    .select('*', { count: 'exact' })
    .order('last_contact_at', { ascending: false });

  if (opts?.status) q = q.eq('status', opts.status);
  if (opts?.source) q = q.eq('source', opts.source);
  if (opts?.limit) q = q.limit(opts.limit);
  if (opts?.offset) q = q.range(opts.offset, (opts.offset + (opts.limit || 50)) - 1);

  const { data, error, count } = await q;
  if (error) throw error;
  return { contacts: (data || []) as CrmContact[], total: count || 0 };
}

export async function getContact(id: string): Promise<CrmContact | null> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_contacts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as CrmContact | null;
}

// ─── Conversations ───────────────────────────────────────────────────────────

export async function getOrCreateConversation(
  contactId: string,
  channel: string,
): Promise<CrmConversation> {
  const db = getSupabaseAdmin();
  const { data: existing } = await db
    .from('crm_conversations')
    .select('*')
    .eq('contact_id', contactId)
    .eq('channel', channel)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    await db
      .from('crm_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', existing.id);
    return existing as CrmConversation;
  }

  const { data, error } = await db
    .from('crm_conversations')
    .insert({ contact_id: contactId, channel, status: 'open' })
    .select()
    .single();
  if (error) throw error;
  return data as CrmConversation;
}

export async function listConversationsForContact(
  contactId: string,
): Promise<CrmConversation[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_conversations')
    .select('*')
    .eq('contact_id', contactId)
    .order('last_message_at', { ascending: false });
  if (error) throw error;
  return (data || []) as CrmConversation[];
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function saveMessage(msg: {
  conversation_id: string;
  contact_id: string;
  direction: 'inbound' | 'outbound';
  content: string;
  message_type?: string;
  channel_message_id?: string;
  is_automated?: boolean;
}): Promise<CrmMessage> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_messages')
    .insert({
      conversation_id: msg.conversation_id,
      contact_id: msg.contact_id,
      direction: msg.direction,
      content: msg.content,
      message_type: msg.message_type || 'text',
      channel_message_id: msg.channel_message_id || null,
      is_automated: msg.is_automated || false,
    })
    .select()
    .single();
  if (error) throw error;
  return data as CrmMessage;
}

export async function listMessages(conversationId: string): Promise<CrmMessage[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('crm_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('sent_at', { ascending: true });
  if (error) throw error;
  return (data || []) as CrmMessage[];
}

// ─── Auto-Replies ────────────────────────────────────────────────────────────

export async function getAutoReplies(channel?: string): Promise<CrmAutoReply[]> {
  const db = getSupabaseAdmin();
  let q = db
    .from('crm_auto_replies')
    .select('*')
    .eq('is_active', true)
    .order('priority', { ascending: false });

  if (channel) {
    q = q.or(`channel.eq.all,channel.eq.${channel}`);
  }

  const { data, error } = await q;
  if (error) throw error;
  return (data || []) as CrmAutoReply[];
}

export function matchAutoReply(
  message: string,
  replies: CrmAutoReply[],
): CrmAutoReply | null {
  const lower = message.toLowerCase().trim();

  // Check keyword matches (sorted by priority, highest first)
  for (const reply of replies) {
    if (reply.trigger_keywords.length === 0) continue;
    for (const kw of reply.trigger_keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return reply;
      }
    }
  }

  // Fall back to default (priority 0, empty keywords)
  return replies.find(r => r.trigger_keywords.length === 0) || null;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function getCrmStats(): Promise<{
  total: number;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
  new_today: number;
  new_this_week: number;
}> {
  const db = getSupabaseAdmin();
  const [all, today, week] = await Promise.all([
    db.from('crm_contacts').select('status, source'),
    db
      .from('crm_contacts')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 86400000).toISOString()),
    db
      .from('crm_contacts')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
  ]);

  if (all.error) throw all.error;

  const rows = all.data || [];
  const by_status: Record<string, number> = {};
  const by_source: Record<string, number> = {};

  for (const r of rows) {
    by_status[r.status] = (by_status[r.status] || 0) + 1;
    by_source[r.source] = (by_source[r.source] || 0) + 1;
  }

  return {
    total: rows.length,
    by_status,
    by_source,
    new_today: today.count || 0,
    new_this_week: week.count || 0,
  };
}
