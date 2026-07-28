import Link from 'next/link';
import type { Metadata } from 'next';
import TailorMadeNewButton from '@/components/admin/TailorMadeNewButton';
import { listItineraries } from '@/lib/tailor-made/store';
import { TAILOR_MADE_STATUS_LABEL, type TailorMadeSummary } from '@/lib/tailor-made/types';

export const metadata: Metadata = {
  title: 'Tailor-made 行程单 | CTS Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function TailorMadeListPage() {
  let items: TailorMadeSummary[] = [];
  let error: string | null = null;

  try {
    items = await listItineraries();
  } catch (err) {
    error = err instanceof Error ? err.message : '读取失败';
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Tailor-made 行程单</h1>
          <p className="mt-1 text-sm text-gray-600">定制行程报价单：填表 → 预览 → 导出 PDF 发客户</p>
        </div>
        <TailorMadeNewButton />
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">读取行程单列表失败</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-xs">
            如果提示表不存在，请先在 Supabase 执行{' '}
            <code>supabase/migrations/20260728_create_tailor_made_itineraries.sql</code>。
          </p>
        </div>
      )}

      {!error && items.length === 0 && (
        <div className="rounded-lg border border-dashed border-warm-200 bg-warm-50 p-10 text-center">
          <p className="text-gray-600">还没有行程单。</p>
          <p className="mt-1 text-sm text-gray-500">点右上角「新建行程单」开始第一份。</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-warm-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-warm-200 bg-warm-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">报价编号</th>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">行程</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">最近修改</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-warm-100 last:border-0 hover:bg-warm-50/60">
                  <td className="px-4 py-3 font-mono text-xs">{item.quote_ref}</td>
                  <td className="px-4 py-3">{item.client_name || <span className="text-gray-400">—</span>}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/tailor-made/${item.id}`} className="font-medium text-primary hover:underline">
                      {item.trip_title || '未命名行程'}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{formatWhen(item.updated_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <TailorMadeNewButton sourceId={item.id} label="复制新建" variant="ghost" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusChip({ status }: { status: TailorMadeSummary['status'] }) {
  const tone: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-50 text-blue-700',
    confirmed: 'bg-green-50 text-green-700',
    archived: 'bg-gray-50 text-gray-400',
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${tone[status] ?? tone.draft}`}>
      {TAILOR_MADE_STATUS_LABEL[status]}
    </span>
  );
}

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}
