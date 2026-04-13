import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '上线预览 · 验收链接 | CTS Tours',
  description:
    'Internal checklist of canonical URLs for pre-launch QA: Discovery tours, October campaign LPs, thank-you, visa hub.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

type Row = { label: string; path: string; note?: string };

function LinkTable({ title, rows, base }: { title: string; rows: Row[]; base: string }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-accent">{title}</h2>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => {
          const path = row.path.startsWith('/') ? row.path : `/${row.path}`;
          const absolute = `${base}${path}`;
          return (
            <li
              key={row.path + row.label}
              className="rounded-xl border border-warm-100 bg-warm-50/50 px-4 py-3 text-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="font-medium text-gray-900">{row.label}</span>
                  <Link
                    href={path}
                    className="inline-flex w-fit shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/15"
                  >
                    本机打开（相对路径）
                  </Link>
                </div>
                <p className="break-all text-xs text-gray-500">
                  <span className="text-gray-400">生产完整 URL（复制发给客户）：</span>
                  {absolute}
                </p>
              </div>
              {row.note ? <p className="mt-2 text-xs text-gray-600">{row.note}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function MarketingPreviewPage() {
  const base = getSiteUrl();

  const core: Row[] = [
    { label: '首页', path: '/' },
    { label: 'China tours 枢纽', path: '/china-tours' },
    { label: '新西兰出发专题', path: '/china-tours-from-new-zealand' },
    { label: '中国免签指南（NZ）', path: '/china-visa-guide-for-new-zealanders' },
  ];

  const discovery: Row[] = [
    {
      label: 'Discovery · A Tale of Two Cities（北京 + 西安）',
      path: '/tours/china/discovery/beijing-xian',
    },
    {
      label: 'Discovery · Shanghai & Surroundings',
      path: '/tours/china/discovery/shanghai-surroundings',
    },
  ];

  const campaign: Row[] = [
    {
      label: '十月战役 · Tale of Two Cities LP',
      path: '/campaigns/october-2026/tale-of-two-cities',
    },
    {
      label: '十月战役 · Shanghai & Surroundings LP',
      path: '/campaigns/october-2026/shanghai-surroundings',
    },
    { label: '十月战役索引', path: '/campaigns/october-2026' },
  ];

  const conversion: Row[] = [
    {
      label: '询盘成功 Thank-you（示例带产品参数）',
      path:
        '/thank-you?tour=China+Discovery+%E2%80%94+A+Tale+of+Two+Cities&slug=beijing-xian&destination=china&tier=discovery',
      note: '完整转化需从产品页提交真实询盘；此为样式与 GTM 验收用示例 URL。',
    },
    { label: 'Thank-you（无参数，通用文案）', path: '/thank-you' },
  ];

  const ops: Row[] = [
    { label: '战役统筹看板（密码）', path: '/marketing/campaign' },
    { label: '甲方会议看板（密码）', path: '/marketing/campaign/client-meeting' },
    { label: '社媒发帖计划（密码）', path: '/campaign/social' },
  ];

  return (
    <main className="min-h-screen bg-warm-50 px-4 py-12 text-accent md:py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-warm-200 bg-white p-6 shadow-soft md:p-10">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · Marketing</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">上线预览 · 验收链接</h1>
        <p className="mt-4 leading-relaxed text-gray-700">
          <strong className="text-accent">本地验收：</strong>先运行 <code className="rounded bg-warm-100 px-1.5 py-0.5 text-xs">npm run dev</code>
          ，在浏览器打开{' '}
          <Link href="/marketing/preview" className="font-medium text-primary underline-offset-2 hover:underline">
            本页
          </Link>
          时请使用 <strong>http://127.0.0.1:3010</strong>（若 <code className="text-xs">localhost</code>{' '}
          打不开或异常，优先改用 127.0.0.1；端口被占用可用 <code className="text-xs">npm run dev:alt</code> 的 3055）。
        </p>
        <p className="mt-3 leading-relaxed text-gray-700">
          每条下方有 <strong>「本机打开」</strong>：使用<strong>相对路径</strong>，在当前域名下跳转（本地即留在 localhost，不会跳到生产）。
          灰色小字为根据 <code className="rounded bg-warm-100 px-1 text-xs">NEXT_PUBLIC_SITE_URL</code> 拼出的<strong>生产完整 URL</strong>，可复制发给甲方。
        </p>
        <p className="mt-3 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-accent">
          <strong className="text-primary">当前基准（用于拼生产链接）：</strong>
          <span className="break-all font-mono text-sm">{base}</span>
        </p>

        <LinkTable title="核心与 SEO 枢纽" rows={core} base={base} />
        <LinkTable title="十月主推 · Discovery 产品页" rows={discovery} base={base} />
        <LinkTable title="十月战役落地页" rows={campaign} base={base} />
        <LinkTable title="转化与 Thank-you" rows={conversion} base={base} />
        <LinkTable title="内部运营（同战役密码门）" rows={ops} base={base} />

        <p className="mt-12 text-center text-sm text-gray-500">
          <Link href="/marketing" className="text-primary underline-offset-2 hover:underline">
            ← 返回营销入口
          </Link>
          {' · '}
          <Link href="/" className="text-primary underline-offset-2 hover:underline">
            网站首页
          </Link>
        </p>
      </div>
    </main>
  );
}
