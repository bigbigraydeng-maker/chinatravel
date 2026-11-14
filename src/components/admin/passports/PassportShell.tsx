'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useStaffName } from './usePassportApi';

const TABS = [
  { href: '/admin/passports', label: '上传与待核对' },
  { href: '/admin/passports/departures', label: '团期与客人上传' },
  { href: '/admin/passports/travellers', label: '旅客档案' },
  { href: '/admin/passports/expiry', label: '到期提醒' },
  { href: '/admin/passports/audit', label: '操作记录' },
];

/** Sub-navigation + "who is using this browser" bar for the audit log. */
export default function PassportShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { name, save } = useStaffName();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-warm-200 bg-white p-4">
        <nav className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = t.href === '/admin/passports' ? pathname === t.href || pathname?.startsWith('/admin/passports/scans') : pathname?.startsWith(t.href);
            return (
              <Link key={t.href} href={t.href} className={`rounded-md px-3 py-1.5 text-sm ${active ? 'bg-accent text-white' : 'bg-warm-100 hover:bg-warm-200'}`}>
                {t.label}
              </Link>
            );
          })}
        </nav>
        {name ? (
          <p className="text-sm text-gray-600">
            当前操作人：<strong>{name}</strong>
            <button type="button" className="ml-2 text-primary underline" onClick={() => setDraft(name)}>
              换人
            </button>
          </p>
        ) : null}
      </div>

      {name === undefined ? <p className="text-sm text-gray-500">加载中…</p> : null}

      {name === null || (name && draft) ? (
        <form
          className="rounded-lg border border-amber-300 bg-amber-50 p-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            try {
              await save(draft);
              setDraft('');
            } catch (err) {
              setError(err instanceof Error ? err.message : '保存失败');
            }
          }}
        >
          <label htmlFor="staff-name" className="block text-sm font-medium">
            你是谁？护照资料每一次查看、修改、导出都会记下操作人的名字。
          </label>
          <div className="mt-2 flex gap-2">
            <input id="staff-name" className="rounded border border-gray-300 px-3 py-2" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="例如：Lisa Li" />
            <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
              确定
            </button>
          </div>
          {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
        </form>
      ) : null}

      {name ? children : null}
    </div>
  );
}
