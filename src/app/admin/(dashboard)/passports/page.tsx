'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { passportFetch } from '@/components/admin/passports/usePassportApi';
import { resizeForUpload } from '@/lib/passport/resize-image';
import type { Warning } from '@/lib/passport/record';

interface QueueItem {
  id: string;
  source: 'staff' | 'customer';
  uploadedBy: string;
  displayName: string | null;
  mrzValid: boolean;
  warningCodes: string[];
  createdAt: string;
}
interface Departure {
  id: string;
  tour_name: string;
  departure_date: string;
}
interface UploadRow {
  name: string;
  state: 'waiting' | 'uploading' | 'done' | 'error';
  scanId?: string;
  message?: string;
  warnings?: Warning[];
}

export default function PassportHomePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [departureId, setDepartureId] = useState('');
  const [uploads, setUploads] = useState<UploadRow[]>([]);
  const [error, setError] = useState('');
  const [purged, setPurged] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const [q, d] = await Promise.all([
        passportFetch<{ items: QueueItem[] }>('/api/admin/passports/scans'),
        passportFetch<{ items: Departure[] }>('/api/admin/passports/departures'),
      ]);
      setQueue(q.items);
      setDepartures(d.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    }
  }, []);

  useEffect(() => {
    void load();
    // Photos past their 6-months-after-return date are deleted whenever staff open this page.
    passportFetch<{ deleted: number }>('/api/admin/passports/purge', { method: 'POST' })
      .then((r) => setPurged(r.deleted))
      .catch(() => setPurged(null));
  }, [load]);

  async function uploadFiles(files: File[]) {
    const images = files.filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
    if (images.length === 0) return;
    const start = uploads.length;
    setUploads((u) => [...u, ...images.map((f) => ({ name: f.name, state: 'waiting' as const }))]);
    // One at a time: keeps each request small and the AI calls predictable.
    for (let i = 0; i < images.length; i += 1) {
      const idx = start + i;
      setUploads((u) => u.map((r, j) => (j === idx ? { ...r, state: 'uploading' } : r)));
      try {
        const file = await resizeForUpload(images[i]);
        const form = new FormData();
        form.append('file', file);
        if (departureId) form.append('departureId', departureId);
        const res = await passportFetch<{ scanId: string; warnings: Warning[] }>('/api/admin/passports/scans', { method: 'POST', body: form });
        setUploads((u) => u.map((r, j) => (j === idx ? { ...r, state: 'done', scanId: res.scanId, warnings: res.warnings } : r)));
      } catch (e) {
        setUploads((u) => u.map((r, j) => (j === idx ? { ...r, state: 'error', message: e instanceof Error ? e.message : '失败' } : r)));
      }
    }
    void load();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-warm-200 bg-white p-6">
        <h2 className="font-serif text-xl font-semibold">上传护照照片</h2>
        <p className="mt-1 text-sm text-gray-600">可以一次拖进多张。每张会自动读底部机器码并校验，AI 补读签发日期和签发地点，然后进入下面的「待核对」。</p>
        <label className="mt-4 block text-sm">
          <span className="font-medium">归到哪个团期（可不选，核对时再选）</span>
          <select className="mt-1 block w-full max-w-md rounded border border-gray-300 px-2 py-1.5" value={departureId} onChange={(e) => setDepartureId(e.target.value)}>
            <option value="">暂不选</option>
            {departures.map((d) => (
              <option key={d.id} value={d.id}>
                {d.departure_date} · {d.tour_name}
              </option>
            ))}
          </select>
        </label>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void uploadFiles(Array.from(e.dataTransfer.files));
          }}
          className={`mt-4 flex h-36 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-sm ${dragging ? 'border-primary bg-primary/5' : 'border-gray-300 bg-warm-50'}`}
        >
          把护照照片拖到这里，或点一下选择文件（JPG / PNG / WebP / iPhone 照片）
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            void uploadFiles(Array.from(e.target.files ?? []));
            e.target.value = '';
          }}
        />
        {uploads.length ? (
          <ul className="mt-4 divide-y rounded border">
            {uploads.map((u, i) => (
              <li key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                <span>{u.name}</span>
                <span>
                  {u.state === 'waiting' && '排队中'}
                  {u.state === 'uploading' && '读取中…'}
                  {u.state === 'error' && <span className="text-red-700">{u.message}</span>}
                  {u.state === 'done' && u.scanId ? (
                    <Link href={`/admin/passports/scans/${u.scanId}`} className="text-primary underline">
                      {u.warnings?.some((w) => w.level === 'red') ? '🔴 需要仔细核对' : u.warnings?.length ? '🟡 去核对' : '✅ 去确认'}
                    </Link>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="rounded-lg border border-warm-200 bg-white p-6">
        <h2 className="font-serif text-xl font-semibold">待核对（{queue.length}）</h2>
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
        {queue.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">没有待核对的护照。</p>
        ) : (
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="py-1">姓名</th>
                <th>来源</th>
                <th>校验</th>
                <th>上传时间</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y">
              {queue.map((q) => (
                <tr key={q.id}>
                  <td className="py-2">{q.displayName || '（没读出名字）'}</td>
                  <td>{q.source === 'customer' ? `客人自己传（${q.uploadedBy}）` : `员工 ${q.uploadedBy}`}</td>
                  <td>{q.mrzValid ? '✅ 机器码通过' : '🔴 未通过'}{q.warningCodes.length ? ` · ${q.warningCodes.length} 个提示` : ''}</td>
                  <td>{new Date(q.createdAt).toLocaleString('en-NZ')}</td>
                  <td>
                    <Link href={`/admin/passports/scans/${q.id}`} className="text-primary underline">
                      核对
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {purged ? <p className="mt-4 text-xs text-gray-500">刚刚自动删除了 {purged} 张已过保留期（回团满 6 个月）的护照照片，文字资料保留。</p> : null}
      </section>
    </div>
  );
}
