'use client';

import { useEffect, useState } from 'react';
import { passportFetch } from '@/components/admin/passports/usePassportApi';

interface Entry {
  at: string;
  actor: string;
  actorType: string;
  action: string;
  travellerId: string | null;
  scanId: string | null;
  departureId: string | null;
  detail: Record<string, unknown>;
}

const ACTION_LABEL: Record<string, string> = {
  scan_upload: '上传照片',
  scan_view: '打开核对页（看到完整资料）',
  image_view: '查看照片',
  scan_reject: '作废照片',
  traveller_create: '新建旅客档案',
  traveller_merge: '合并到已有档案',
  traveller_search: '搜索旅客档案',
  number_reveal: '查看完整护照号',
  departure_create: '新建团期',
  departure_view: '查看团期名单',
  departure_export: '导出团期名单',
  link_create: '生成客人上传链接',
  link_email: '发链接邮件',
  link_remind: '提醒客人（换新链接）',
  link_revoke: '作废链接',
  customer_submit: '客人提交',
  expiry_view: '查看到期提醒',
  image_purge: '按保留期删除照片',
};

export default function AuditPage() {
  const [items, setItems] = useState<Entry[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    passportFetch<{ items: Entry[] }>('/api/admin/passports/audit')
      .then((r) => setItems(r.items))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : '加载失败'));
  }, []);
  return (
    <section className="rounded-lg border border-warm-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">操作记录（最近 300 条）</h2>
      <p className="text-sm text-gray-600">每次查看、修改、导出护照资料都记在这里，记录不能删改。</p>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="py-1">时间</th>
            <th>谁</th>
            <th>做了什么</th>
            <th>补充</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((e, i) => (
            <tr key={i}>
              <td className="py-1.5 whitespace-nowrap">{new Date(e.at).toLocaleString('en-NZ')}</td>
              <td>{e.actorType === 'customer' ? `客人 ${e.actor}` : e.actor}</td>
              <td>{ACTION_LABEL[e.action] ?? e.action}</td>
              <td className="text-xs text-gray-500">{Object.keys(e.detail).length ? JSON.stringify(e.detail) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
