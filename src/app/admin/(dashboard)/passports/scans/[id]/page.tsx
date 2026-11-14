'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import FieldsForm from '@/components/admin/passports/FieldsForm';
import WarningList from '@/components/admin/passports/WarningList';
import { passportFetch } from '@/components/admin/passports/usePassportApi';
import { tryParseTd3 } from '@/lib/passport/mrz';
import { computeWarnings, mergeReading, validateForSave, EMPTY_FIELDS, type AiReading, type PassportFields } from '@/lib/passport/record';

interface ScanDetail {
  id: string;
  source: 'staff' | 'customer';
  status: string;
  uploadedBy: string;
  createdAt: string;
  departureId: string | null;
  orderRef: string | null;
  orderName: string | null;
  hasImage: boolean;
  imageDeleteAfter: string;
  extraction: { reading: AiReading | null; aiError: string | null; fields: PassportFields; customerConfirmed: boolean } | null;
  mrzText: string | null;
}
interface Departure {
  id: string;
  tour_name: string;
  departure_date: string;
}

/** Left: the photo. Right: what was read, editable, with live red/yellow checks. */
export default function ScanReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [scan, setScan] = useState<ScanDetail | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [fields, setFields] = useState<PassportFields>(EMPTY_FIELDS);
  const [mrzText, setMrzText] = useState('');
  const [departureId, setDepartureId] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [agentName, setAgentName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [s, d] = await Promise.all([
          passportFetch<ScanDetail>(`/api/admin/passports/scans/${params.id}`),
          passportFetch<{ items: Departure[] }>('/api/admin/passports/departures'),
        ]);
        setScan(s);
        setDepartures(d.items);
        setFields(s.extraction?.fields ?? EMPTY_FIELDS);
        setMrzText(s.mrzText ?? '');
        setDepartureId(s.departureId ?? '');
        setOrderRef(s.orderRef ?? '');
      } catch (e) {
        setError(e instanceof Error ? e.message : '加载失败');
      }
    })();
  }, [params.id]);

  const mrz = useMemo(() => tryParseTd3(mrzText), [mrzText]);
  const departureDate = departures.find((d) => d.id === departureId)?.departure_date ?? null;
  const warnings = useMemo(
    () => computeWarnings(fields, { mrz, ai: scan?.extraction?.reading ?? null, orderName: scan?.orderName, departureDate, today: new Date() }),
    [fields, mrz, scan, departureDate]
  );
  const saveErrors = validateForSave(fields);
  const done = scan?.status === 'confirmed' || scan?.status === 'rejected';

  async function confirm() {
    setSaving(true);
    setError('');
    try {
      const r = await passportFetch<{ travellerId: string; merged: boolean }>(`/api/admin/passports/scans/${params.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, departureId: departureId || null, orderRef, agentName, contactEmail }),
      });
      router.push(`/admin/passports?saved=${r.merged ? 'merged' : 'new'}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败');
      setSaving(false);
    }
  }

  async function reject() {
    const reason = window.prompt('为什么作废这张？（例如：拍糊了、不是护照）') ?? '';
    if (!reason) return;
    try {
      await passportFetch(`/api/admin/passports/scans/${params.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      router.push('/admin/passports');
    } catch (e) {
      setError(e instanceof Error ? e.message : '操作失败');
    }
  }

  if (!scan) return <p className="text-sm text-gray-500">{error || '加载中…'}</p>;

  return (
    <div className="space-y-4">
      <Link href="/admin/passports" className="text-sm text-primary underline">
        ← 返回待核对
      </Link>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-warm-200 bg-white p-4">
          <h2 className="font-semibold">照片</h2>
          <p className="text-xs text-gray-500">
            {scan.source === 'customer' ? `客人通过链接上传（${scan.uploadedBy}）${scan.extraction?.customerConfirmed ? '，客人已自己核对过' : ''}` : `员工 ${scan.uploadedBy} 上传`} ·{' '}
            {new Date(scan.createdAt).toLocaleString('en-NZ')} · 照片将于 {scan.imageDeleteAfter} 自动删除
          </p>
          {scan.hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- decrypted on request, must not go through the image optimiser
            <img
              src={`/api/admin/passports/scans/${scan.id}/image`}
              alt="护照照片"
              onClick={() => setZoom((z) => !z)}
              className={`mt-3 w-full cursor-zoom-in rounded border ${zoom ? 'max-w-none scale-150 origin-top-left' : ''}`}
            />
          ) : (
            <p className="mt-3 text-sm text-gray-500">照片已按保留期删除。</p>
          )}
        </section>

        <section className="space-y-4 rounded-lg border border-warm-200 bg-white p-4">
          <h2 className="font-semibold">读出来的内容（请对照左边逐项核对）</h2>
          {scan.extraction?.aiError ? <p className="text-sm text-amber-800">{scan.extraction.aiError}</p> : null}
          {scan.extraction?.reading?.notes ? <p className="text-sm text-gray-600">AI 备注：{scan.extraction.reading.notes}</p> : null}
          <WarningList warnings={warnings} />
          <FieldsForm value={fields} onChange={setFields} disabled={done} />

          <details className="rounded border p-3 text-sm" open={!scan.mrzText}>
            <summary className="cursor-pointer font-medium">机器码（护照最下面两行）</summary>
            <textarea
              className="mt-2 w-full rounded border border-gray-300 p-2 font-mono text-xs"
              rows={3}
              value={mrzText}
              disabled={done}
              onChange={(e) => setMrzText(e.target.value)}
              placeholder={'P<NZLSMITH<<JANE<<<<<<<<<<<<<<<<<<<<<<<<<<<<\nLA12345675NZL6005144F3003013<<<<<<<<<<<<<<<6'}
            />
            <button
              type="button"
              disabled={!mrz || done}
              className="mt-2 rounded bg-warm-200 px-3 py-1 disabled:opacity-50"
              onClick={() => mrz && setFields(mergeReading(mrz, { mrzText, fields, unclearFields: [], notes: '' }))}
            >
              用机器码覆盖姓名/号码/日期
            </button>
            {mrzText && !mrz ? <p className="mt-1 text-red-700">这两行格式不对（要两行，每行 44 个字符）。</p> : null}
          </details>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">团期</span>
              <select className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={departureId} disabled={done} onChange={(e) => setDepartureId(e.target.value)}>
                <option value="">暂不归团</option>
                {departures.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.departure_date} · {d.tour_name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium">订单号（外部下单系统里的）</span>
              <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={orderRef} disabled={done} onChange={(e) => setOrderRef(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="font-medium">代理（如有）</span>
              <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={agentName} disabled={done} onChange={(e) => setAgentName(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="font-medium">联系邮箱（如有）</span>
              <input type="email" className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" value={contactEmail} disabled={done} onChange={(e) => setContactEmail(e.target.value)} />
            </label>
          </div>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          {done ? (
            <p className="text-sm text-gray-600">这条已经{scan.status === 'confirmed' ? '确认' : '作废'}了。</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button type="button" disabled={saving || saveErrors.length > 0} onClick={confirm} className="rounded bg-primary px-5 py-2 font-medium text-white disabled:opacity-50">
                {saving ? '保存中…' : '核对无误，保存到旅客档案'}
              </button>
              <button type="button" onClick={reject} className="rounded border border-red-300 px-4 py-2 text-red-700">
                作废这张
              </button>
              {saveErrors.length ? <p className="w-full text-sm text-red-700">{saveErrors.join('；')}</p> : null}
            </div>
          )}
          <p className="text-xs text-gray-500">同一本护照（护照号 + 出生日期相同）再次上传，会自动合并到同一个旅客档案，不会重复建。</p>
        </section>
      </div>
    </div>
  );
}
