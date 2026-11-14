'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import RevealNumber from '@/components/admin/passports/RevealNumber';
import { passportFetch } from '@/components/admin/passports/usePassportApi';
import { passportStatus, parseIsoDate } from '@/lib/traveller-form';

interface Traveller {
  id: string;
  surname: string;
  givenNames: string;
  chineseName: string | null;
  dateOfBirth: string;
  maskedNumber: string;
  expiryDate: string;
  orderRef: string | null;
}
interface LinkView {
  id: string;
  travellerLabel: string;
  email: string | null;
  orderRef: string | null;
  expiresAt: string;
  status: 'waiting' | 'submitted' | 'expired' | 'revoked';
  reminderCount: number;
  lastRemindedAt: string | null;
}
interface Detail {
  departure: { id: string; tour_name: string; departure_date: string; return_date: string };
  travellers: Traveller[];
  links: LinkView[];
}

const STATUS_LABEL: Record<LinkView['status'], string> = { waiting: '⏳ 还没交', submitted: '✅ 已交', expired: '⌛ 链接过期', revoked: '已作废' };
const CHECK_LABEL = { ok: '✅', short: '🟡 不足 6 个月', expired: '🔴 出发前过期', unknown: '—' } as const;

export default function DepartureDetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState<{ text: string; url?: string } | null>(null);
  const [form, setForm] = useState({ travellerLabel: '', email: '', orderRef: '' });

  const load = useCallback(async () => {
    try {
      setDetail(await passportFetch<Detail>(`/api/admin/passports/departures/${params.id}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    }
  }, [params.id]);
  useEffect(() => void load(), [load]);

  if (!detail) return <p className="text-sm text-gray-500">{error || '加载中…'}</p>;
  const departure = parseIsoDate(detail.departure.departure_date);

  async function createLink(send: boolean) {
    setError('');
    try {
      const r = await passportFetch<{ url: string; emailed: boolean; emailError: string | null }>(`/api/admin/passports/departures/${params.id}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, send }),
      });
      setNotice({ text: r.emailed ? `已发邮件给 ${form.email}。` : r.emailError ?? '链接已生成，请复制发给客人（只显示这一次）。', url: r.url });
      setForm({ travellerLabel: '', email: '', orderRef: '' });
      void load();
    } catch (e) {
      setError(e instanceof Error ? e.message : '失败');
    }
  }

  async function remind(id: string) {
    try {
      const r = await passportFetch<{ url: string; emailed: boolean; emailError: string | null }>(`/api/admin/passports/links/${id}/remind`, { method: 'POST' });
      setNotice({ text: r.emailed ? '提醒邮件已发出（旧链接已失效，邮件里是新链接）。' : r.emailError ?? '', url: r.url });
      void load();
    } catch (e) {
      setError(e instanceof Error ? e.message : '失败');
    }
  }

  async function revoke(id: string) {
    if (!window.confirm('作废后客人就不能再用这个链接上传了，确定吗？')) return;
    try {
      await passportFetch(`/api/admin/passports/links/${id}/revoke`, { method: 'POST' });
      void load();
    } catch (e) {
      setError(e instanceof Error ? e.message : '失败');
    }
  }

  const waiting = detail.links.filter((l) => l.status === 'waiting' || l.status === 'expired');

  return (
    <div className="space-y-6">
      <Link href="/admin/passports/departures" className="text-sm text-primary underline">
        ← 全部团期
      </Link>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold">{detail.departure.tour_name}</h2>
          <p className="text-sm text-gray-600">
            {detail.departure.departure_date} 出发 · {detail.departure.return_date} 回程
          </p>
        </div>
        <a href={`/api/admin/passports/departures/${params.id}/export`} className="rounded bg-accent px-4 py-2 text-sm text-white">
          导出本团名单（Excel 可打开，含完整护照号，会记录）
        </a>
      </header>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {notice ? (
        <div className="rounded border border-blue-300 bg-blue-50 p-3 text-sm">
          <p>{notice.text}</p>
          {notice.url ? (
            <p className="mt-1 break-all font-mono text-xs">
              {notice.url}{' '}
              <button type="button" className="text-primary underline" onClick={() => void navigator.clipboard.writeText(notice.url ?? '')}>
                复制
              </button>
            </p>
          ) : null}
        </div>
      ) : null}

      <section className="rounded-lg border border-warm-200 bg-white p-6">
        <h3 className="font-semibold">已入档旅客（{detail.travellers.length}）</h3>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1">姓名</th>
              <th>出生日期</th>
              <th>护照号</th>
              <th>有效期</th>
              <th>6 个月检查</th>
              <th>订单号</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {detail.travellers.map((t) => (
              <tr key={t.id}>
                <td className="py-2">
                  {t.surname} {t.givenNames} {t.chineseName ? `（${t.chineseName}）` : ''}
                </td>
                <td>{t.dateOfBirth}</td>
                <td>
                  <RevealNumber travellerId={t.id} masked={t.maskedNumber} />
                </td>
                <td>{t.expiryDate}</td>
                <td>{CHECK_LABEL[passportStatus(t.expiryDate, departure, new Date())]}</td>
                <td>{t.orderRef ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border border-warm-200 bg-white p-6">
        <h3 className="font-semibold">
          客人自助上传 · 还差 {waiting.length} 人
        </h3>
        <p className="text-sm text-gray-600">每位客人一个专属链接，14 天有效，交过一次就失效。点「提醒」会发一个新链接（旧的同时作废）。</p>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1">客人（订单上的名字）</th>
              <th>邮箱</th>
              <th>状态</th>
              <th>提醒次数</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y">
            {detail.links.map((l) => (
              <tr key={l.id}>
                <td className="py-2">
                  {l.travellerLabel}
                  {l.orderRef ? <span className="text-gray-500"> · {l.orderRef}</span> : null}
                </td>
                <td>{l.email ?? '—'}</td>
                <td>{STATUS_LABEL[l.status]}</td>
                <td>{l.reminderCount}</td>
                <td className="space-x-3">
                  {l.status === 'waiting' || l.status === 'expired' ? (
                    <>
                      <button type="button" className="text-primary underline" onClick={() => void remind(l.id)}>
                        提醒
                      </button>
                      <button type="button" className="text-red-700 underline" onClick={() => void revoke(l.id)}>
                        作废
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 grid gap-3 rounded border bg-warm-50 p-4 sm:grid-cols-3">
          <label className="text-sm">
            客人姓名（和订单一致）
            <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.travellerLabel} onChange={(e) => setForm({ ...form, travellerLabel: e.target.value })} />
          </label>
          <label className="text-sm">
            邮箱（可空）
            <input type="email" className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="text-sm">
            订单号（可空）
            <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.orderRef} onChange={(e) => setForm({ ...form, orderRef: e.target.value })} />
          </label>
          <div className="flex gap-2 sm:col-span-3">
            <button type="button" disabled={!form.travellerLabel || !form.email} onClick={() => void createLink(true)} className="rounded bg-primary px-4 py-2 text-white disabled:opacity-50">
              生成链接并发邮件
            </button>
            <button type="button" disabled={!form.travellerLabel} onClick={() => void createLink(false)} className="rounded border px-4 py-2 disabled:opacity-50">
              只生成链接（我自己发）
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
