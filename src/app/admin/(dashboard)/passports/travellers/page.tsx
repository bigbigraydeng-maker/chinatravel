'use client';

import { useCallback, useEffect, useState } from 'react';
import RevealNumber from '@/components/admin/passports/RevealNumber';
import { passportFetch } from '@/components/admin/passports/usePassportApi';

interface Traveller {
  id: string;
  surname: string;
  givenNames: string;
  chineseName: string | null;
  sex: string | null;
  dateOfBirth: string;
  nationality: string | null;
  maskedNumber: string;
  issueDate: string | null;
  expiryDate: string;
  placeOfIssue: string | null;
  confirmedBy: string;
  confirmedAt: string;
}

export default function TravellersPage() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Traveller[]>([]);
  const [error, setError] = useState('');

  const search = useCallback(async (term: string) => {
    try {
      setItems((await passportFetch<{ items: Traveller[] }>(`/api/admin/passports/travellers?q=${encodeURIComponent(term)}`)).items);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    }
  }, []);
  useEffect(() => void search(''), [search]);

  return (
    <section className="rounded-lg border border-warm-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">旅客档案</h2>
      <p className="text-sm text-gray-600">护照号默认只显示后 4 位；点「查看完整」会记录是谁看的。</p>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void search(q);
        }}
      >
        <input className="w-72 rounded border border-gray-300 px-3 py-2" placeholder="搜姓名、中文名或护照号后 4 位" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
          搜索
        </button>
      </form>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="py-1">姓名</th>
            <th>性别</th>
            <th>出生日期</th>
            <th>国籍</th>
            <th>护照号</th>
            <th>签发</th>
            <th>有效期至</th>
            <th>确认人</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((t) => (
            <tr key={t.id}>
              <td className="py-2">
                {t.surname} {t.givenNames}
                {t.chineseName ? <span className="text-gray-500">（{t.chineseName}）</span> : null}
              </td>
              <td>{t.sex ?? '—'}</td>
              <td>{t.dateOfBirth}</td>
              <td>{t.nationality ?? '—'}</td>
              <td>
                <RevealNumber travellerId={t.id} masked={t.maskedNumber} />
              </td>
              <td>
                {t.issueDate ?? '—'} {t.placeOfIssue ?? ''}
              </td>
              <td>{t.expiryDate}</td>
              <td className="text-gray-500">{t.confirmedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
