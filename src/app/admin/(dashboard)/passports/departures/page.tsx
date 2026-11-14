'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { passportFetch } from '@/components/admin/passports/usePassportApi';

interface Departure {
  id: string;
  tour_name: string;
  departure_date: string;
  return_date: string;
  travellerCount: number;
  linkCount: number;
  submittedCount: number;
}

export default function DeparturesPage() {
  const [items, setItems] = useState<Departure[]>([]);
  const [form, setForm] = useState({ tourName: '', departureDate: '', returnDate: '' });
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setItems((await passportFetch<{ items: Departure[] }>('/api/admin/passports/departures')).items);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    }
  }, []);
  useEffect(() => void load(), [load]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-warm-200 bg-white p-6">
        <h2 className="font-serif text-xl font-semibold">团期</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1">出发</th>
              <th>团名</th>
              <th>回程</th>
              <th>已入档旅客</th>
              <th>客人自助上传</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((d) => (
              <tr key={d.id}>
                <td className="py-2">{d.departure_date}</td>
                <td>
                  <Link href={`/admin/passports/departures/${d.id}`} className="text-primary underline">
                    {d.tour_name}
                  </Link>
                </td>
                <td>{d.return_date}</td>
                <td>{d.travellerCount}</td>
                <td>{d.linkCount ? `${d.submittedCount} / ${d.linkCount} 已交` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? <p className="mt-2 text-sm text-gray-500">还没有团期，在下面新建一个。</p> : null}
      </section>

      <form
        className="rounded-lg border border-warm-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          try {
            await passportFetch('/api/admin/passports/departures', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            setForm({ tourName: '', departureDate: '', returnDate: '' });
            void load();
          } catch (err) {
            setError(err instanceof Error ? err.message : '保存失败');
          }
        }}
      >
        <h2 className="font-semibold">新建团期</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            团名
            <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.tourName} onChange={(e) => setForm({ ...form, tourName: e.target.value })} />
          </label>
          <label className="text-sm">
            出发日
            <input type="date" className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.departureDate} onChange={(e) => setForm({ ...form, departureDate: e.target.value })} />
          </label>
          <label className="text-sm">
            回程日（照片在这天之后 6 个月自动删除）
            <input type="date" className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} />
          </label>
        </div>
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
        <button type="submit" className="mt-4 rounded bg-primary px-4 py-2 text-white">
          新建
        </button>
      </form>
    </div>
  );
}
