'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { CrmContact, ContactStatus } from '@/lib/crm';

const STATUS_LABELS: Record<string, string> = {
  new: '🆕 New',
  contacted: '💬 Contacted',
  qualified: '⭐ Qualified',
  proposal: '📋 Proposal',
  booked: '✅ Booked',
  closed: '🎉 Closed',
  lost: '❌ Lost',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-orange-100 text-orange-800',
  proposal: 'bg-purple-100 text-purple-800',
  booked: 'bg-green-100 text-green-800',
  closed: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-gray-100 text-gray-500',
};

const SOURCE_ICONS: Record<string, string> = {
  whatsapp: '📱',
  messenger: '💬',
  instagram: '📸',
  website: '🌐',
  email: '📧',
};

interface Stats {
  total: number;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
  new_today: number;
  new_this_week: number;
}

export default function CrmDashboard() {
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [searchText, setSearchText] = useState('');
  const [activeView, setActiveView] = useState<'table' | 'pipeline'>('table');
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  const headers = useCallback(
    () => ({ 'x-admin-key': adminKey, 'Content-Type': 'application/json' }),
    [adminKey],
  );

  const fetchData = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (filterSource) params.set('source', filterSource);
      params.set('limit', '200');

      const [contactsRes, statsRes] = await Promise.all([
        fetch(`/api/crm/contacts?${params}`, { headers: headers() }),
        fetch('/api/crm/stats', { headers: headers() }),
      ]);

      if (contactsRes.status === 401 || statsRes.status === 401) {
        setAuthed(false);
        setAdminKey('');
        return;
      }

      const contactsData = await contactsRes.json();
      const statsData = await statsRes.json();
      setContacts(contactsData.contacts || []);
      setStats(statsData);
      setAuthed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [adminKey, filterStatus, filterSource, headers]);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminKey(keyInput);
    setAuthed(true);
  };

  const handleStatusChange = async (contactId: string, newStatus: ContactStatus) => {
    await fetch(`/api/crm/contacts/${contactId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ status: newStatus }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c)),
    );
  };

  const filtered = contacts.filter((c) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.tour_interest?.toLowerCase().includes(q)
    );
  });

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-md p-8 w-80">
          <h1 className="text-xl font-bold mb-1 text-accent">CRM — Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your ADMIN_SECRET_KEY</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Secret key"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2 text-sm font-semibold hover:bg-primary/90"
          >
            Enter CRM
          </button>
        </form>
      </div>
    );
  }

  const pipelineStatuses: ContactStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'booked'];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-white border-b border-warm-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 text-sm">← Admin</Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-lg font-bold text-accent">CTS CRM</h1>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            WhatsApp + Messenger
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Leads', value: stats.total, color: 'text-accent' },
              { label: 'New Today', value: stats.new_today, color: 'text-blue-600' },
              { label: 'This Week', value: stats.new_this_week, color: 'text-primary' },
              { label: 'Booked', value: (stats.by_status?.booked || 0) + (stats.by_status?.closed || 0), color: 'text-emerald-600' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 border border-warm-100">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Source breakdown */}
        {stats && (
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Leads by Channel</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.by_source).map(([src, count]) => (
                <div key={src} className="flex items-center gap-2 bg-warm-50 rounded-lg px-3 py-2">
                  <span>{SOURCE_ICONS[src] || '📊'}</span>
                  <span className="text-sm font-medium capitalize">{src}</span>
                  <span className="text-sm text-gray-500 font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters + View toggle */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="search"
            placeholder="Search name, email, phone..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Channels</option>
            <option value="whatsapp">📱 WhatsApp</option>
            <option value="messenger">💬 Messenger</option>
            <option value="website">🌐 Website Form</option>
            <option value="email">📧 Email</option>
          </select>
          <div className="ml-auto flex rounded-lg border border-gray-200 overflow-hidden">
            {(['table', 'pipeline'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-3 py-2 text-sm capitalize transition-colors ${
                  activeView === v ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {v === 'table' ? '☰ List' : '▦ Pipeline'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading leads...</div>
        ) : activeView === 'table' ? (
          /* ── TABLE VIEW ── */
          <div className="bg-white rounded-xl shadow-sm border border-warm-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warm-100 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Channel</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Interest</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Contact</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-warm-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{c.name || <em className="text-gray-400">Unknown</em>}</p>
                        <p className="text-xs text-gray-400">
                          {c.email || c.phone || c.whatsapp_id || c.messenger_id || '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-lg" title={c.source}>{SOURCE_ICONS[c.source] || '📊'}</span>
                        <span className="text-xs text-gray-500 ml-1 capitalize">{c.source}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">
                        {c.tour_interest || <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value as ContactStatus)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[c.status]}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(c.last_contact_at).toLocaleDateString('en-NZ', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/crm/${c.id}?key=${encodeURIComponent(adminKey)}`}
                          className="text-primary text-xs hover:underline font-medium"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-warm-100 text-xs text-gray-400">
              {filtered.length} of {contacts.length} leads
            </div>
          </div>
        ) : (
          /* ── PIPELINE VIEW ── */
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {pipelineStatuses.map((status) => {
              const cols = filtered.filter((c) => c.status === status);
              return (
                <div key={status} className="bg-white rounded-xl shadow-sm border border-warm-100 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-600">{STATUS_LABELS[status]}</span>
                    <span className="text-xs bg-warm-100 text-gray-600 px-1.5 py-0.5 rounded-full font-bold">
                      {cols.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {cols.slice(0, 10).map((c) => (
                      <Link
                        key={c.id}
                        href={`/admin/crm/${c.id}?key=${encodeURIComponent(adminKey)}`}
                        className="block bg-warm-50 rounded-lg p-2.5 hover:bg-warm-100 transition-colors"
                      >
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {SOURCE_ICONS[c.source]} {c.name || 'Unknown'}
                        </p>
                        {c.tour_interest && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">{c.tour_interest}</p>
                        )}
                        <p className="text-xs text-gray-300 mt-1">
                          {new Date(c.last_contact_at).toLocaleDateString('en-NZ', {
                            day: 'numeric', month: 'short',
                          })}
                        </p>
                      </Link>
                    ))}
                    {cols.length > 10 && (
                      <p className="text-xs text-center text-gray-400 pt-1">+{cols.length - 10} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
