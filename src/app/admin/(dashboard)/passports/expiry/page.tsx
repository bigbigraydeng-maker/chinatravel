'use client';

import { useEffect, useState } from 'react';
import { passportFetch } from '@/components/admin/passports/usePassportApi';
import type { ExpiryReportRow } from '@/lib/passport/expiry';

const BADGE: Record<ExpiryReportRow['status'], string> = { expired: '🔴 已过期', short: '🟡 不足 6 个月', within_12_months: '🔵 12 个月内到期' };

export default function ExpiryPage() {
  const [items, setItems] = useState<ExpiryReportRow[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    passportFetch<{ items: ExpiryReportRow[] }>('/api/admin/passports/expiry')
      .then((r) => setItems(r.items))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : '加载失败'));
  }, []);

  return (
    <section className="rounded-lg border border-warm-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">护照到期提醒</h2>
      <p className="text-sm text-gray-600">规则和客人填表页一样：出发时护照剩余有效期要满 6 个月。没报团的旅客，护照 12 个月内到期也列出来，方便下次报团前提醒。</p>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      {items && items.length === 0 ? <p className="mt-4 text-sm text-green-700">目前没有需要提醒的护照。</p> : null}
      {items && items.length ? (
        <table className="mt-4 w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1">情况</th>
              <th>姓名</th>
              <th>护照号</th>
              <th>有效期至</th>
              <th>团期</th>
              <th>联系邮箱</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((r) => (
              <tr key={`${r.id}-${r.departureDate ?? ''}`}>
                <td className="py-2">{BADGE[r.status]}</td>
                <td>
                  {r.surname} {r.givenNames}
                </td>
                <td className="font-mono">{r.maskedNumber}</td>
                <td>{r.expiryDate}</td>
                <td>{r.tourName ? `${r.departureDate} ${r.tourName}` : '—'}</td>
                <td>{r.contactEmail ?? '—'}</td>
                <td>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  );
}
