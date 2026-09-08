'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import type { CrmContact, CrmConversation, CrmMessage } from '@/lib/crm';

const STATUS_OPTS = ['new','contacted','qualified','proposal','booked','closed','lost'];
const SOURCE_ICONS: Record<string, string> = {
  whatsapp: '📱', messenger: '💬', instagram: '📸', website: '🌐', email: '📧',
};

interface ConversationWithMessages extends CrmConversation {
  messages: CrmMessage[];
}

interface ContactDetail {
  contact: CrmContact;
  conversations: ConversationWithMessages[];
}

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const adminKey = searchParams.get('key') || '';

  const [data, setData] = useState<ContactDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendText, setSendText] = useState('');
  const [sendChannel, setSendChannel] = useState('whatsapp');
  const [sending, setSending] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const h = { 'x-admin-key': adminKey, 'Content-Type': 'application/json' };

  useEffect(() => {
    fetch(`/api/crm/contacts/${id}`, { headers: h })
      .then((r) => r.json())
      .then((d: ContactDetail) => {
        setData(d);
        setNotes(d.contact.notes || '');
        setStatus(d.contact.status);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const saveContact = async (updates: Partial<CrmContact>) => {
    setSaving(true);
    await fetch(`/api/crm/contacts/${id}`, {
      method: 'PATCH',
      headers: h,
      body: JSON.stringify(updates),
    });
    setSaving(false);
  };

  const handleSaveNotes = () => saveContact({ notes, status: status as any });

  const handleSendMessage = async () => {
    if (!sendText.trim()) return;
    setSending(true);
    try {
      await fetch('/api/crm/send-message', {
        method: 'POST',
        headers: h,
        body: JSON.stringify({ contact_id: id, channel: sendChannel, message: sendText }),
      });
      setSendText('');
      // Reload to show new message
      const r = await fetch(`/api/crm/contacts/${id}`, { headers: h });
      const d: ContactDetail = await r.json();
      setData(d);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Contact not found</p>
          <Link href="/admin/crm" className="text-primary hover:underline">← Back to CRM</Link>
        </div>
      </div>
    );
  }

  const { contact, conversations } = data;
  const allMessages = conversations.flatMap((c) =>
    c.messages.map((m) => ({ ...m, channel: c.channel })),
  ).sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime());

  const availableChannels = [
    contact.whatsapp_id && 'whatsapp',
    contact.messenger_id && 'messenger',
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-white border-b border-warm-200 px-6 py-4 flex items-center gap-4">
        <Link href={`/admin/crm?key=${encodeURIComponent(adminKey)}`} className="text-gray-400 hover:text-gray-600 text-sm">
          ← CRM
        </Link>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <span className="text-xl">{SOURCE_ICONS[contact.source]}</span>
          <h1 className="font-bold text-accent">{contact.name || 'Unknown Contact'}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Contact info + notes */}
        <div className="space-y-4">
          {/* Contact card */}
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 p-4 space-y-3">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Contact Info</h2>
            <div className="space-y-2 text-sm">
              {[
                ['Name', contact.name],
                ['Email', contact.email],
                ['Phone', contact.phone],
                ['WhatsApp ID', contact.whatsapp_id],
                ['Messenger PSID', contact.messenger_id],
                ['Source', contact.source],
                ['Tour Interest', contact.tour_interest],
                ['Travel Date', contact.travel_date],
                ['Party Size', contact.party_size],
                ['Budget', contact.budget],
              ].map(([label, value]) =>
                value ? (
                  <div key={String(label)} className="flex gap-2">
                    <span className="text-gray-400 w-28 shrink-0">{label}</span>
                    <span className="text-gray-800 break-all">{String(value)}</span>
                  </div>
                ) : null,
              )}
              <div className="flex gap-2">
                <span className="text-gray-400 w-28 shrink-0">First contact</span>
                <span className="text-gray-600 text-xs">
                  {new Date(contact.first_contact_at).toLocaleDateString('en-NZ', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Status + Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 p-4 space-y-3">
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Pipeline</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {STATUS_OPTS.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes..."
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="w-full bg-primary text-white rounded-lg py-2 text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Right: Conversation history + send message */}
        <div className="md:col-span-2 space-y-4">
          {/* Chat history */}
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 overflow-hidden flex flex-col" style={{ maxHeight: '520px' }}>
            <div className="px-4 py-3 border-b border-warm-100 flex items-center gap-2">
              <h2 className="font-semibold text-gray-700 text-sm">Conversation History</h2>
              <span className="text-xs text-gray-400">({allMessages.length} messages)</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {allMessages.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-8">No messages yet</p>
              ) : (
                allMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.direction === 'outbound'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-warm-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${
                        msg.direction === 'outbound' ? 'text-white/60 justify-end' : 'text-gray-400'
                      }`}>
                        <span>{SOURCE_ICONS[msg.channel] || '💬'}</span>
                        <span>{new Date(msg.sent_at).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.is_automated && <span className="ml-1 opacity-60">🤖 auto</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Send message panel */}
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 p-4">
            <h2 className="font-semibold text-gray-700 text-sm mb-3">Send Message</h2>
            {availableChannels.length === 0 ? (
              <p className="text-sm text-gray-400">No messaging channel available for this contact (no WhatsApp ID or Messenger PSID).</p>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {availableChannels.map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSendChannel(ch)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        sendChannel === ch
                          ? 'bg-primary text-white'
                          : 'bg-warm-50 text-gray-600 hover:bg-warm-100'
                      }`}
                    >
                      {SOURCE_ICONS[ch]} {ch.charAt(0).toUpperCase() + ch.slice(1)}
                    </button>
                  ))}
                </div>
                <textarea
                  value={sendText}
                  onChange={(e) => setSendText(e.target.value)}
                  placeholder={`Type a message to send via ${sendChannel}...`}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sending || !sendText.trim()}
                  className="bg-primary text-white rounded-lg px-5 py-2 text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
                >
                  {sending ? 'Sending...' : `Send via ${sendChannel.charAt(0).toUpperCase() + sendChannel.slice(1)}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
