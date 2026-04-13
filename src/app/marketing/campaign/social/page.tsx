import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SOCIAL_CAMPAIGN_META,
  SOCIAL_CHECKLIST,
  SOCIAL_POST_ROWS,
  type SocialPostRow,
  type SocialPostStatus,
} from '@/lib/data/social-posting-plan-2026';

export const metadata: Metadata = {
  title: 'Social posting plan | October 2026 campaign | CTS Tours',
  description:
    'Password-protected: Facebook and Instagram posting grid for the October 2026 dual-product campaign.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

function socialStatusLabel(s: SocialPostStatus): string {
  switch (s) {
    case 'posted':
      return '已发';
    case 'scheduled':
      return '已排期';
    default:
      return '草稿';
  }
}

function socialStatusClass(s: SocialPostStatus): string {
  switch (s) {
    case 'posted':
      return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    case 'scheduled':
      return 'bg-violet-100 text-violet-900 border-violet-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function pillarClass(pillar: SocialPostRow['pillar']): string {
  switch (pillar) {
    case 'Educate':
      return 'bg-sky-50 text-sky-900 border-sky-200';
    case 'Inspire':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'Convert':
      return 'bg-primary/10 text-primary border-primary/20';
    default:
      return 'bg-warm-100 text-accent border-warm-200';
  }
}

function PostCardsMobile({ rows }: { rows: SocialPostRow[] }) {
  return (
    <ul className="space-y-3 md:hidden" role="list">
      {rows.map(row => (
        <li key={row.id} className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-gray-500">{row.id}</span>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${socialStatusClass(row.status)}`}
            >
              {socialStatusLabel(row.status)}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {row.week} · 槽位 {row.slot} · {row.suggestedDay}
          </p>
          <p className="mt-2 font-medium text-gray-900">{row.topicOneLiner}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-warm-200 px-2 py-0.5 text-gray-700">{row.channel}</span>
            <span className={`rounded-full border px-2 py-0.5 font-medium ${pillarClass(row.pillar)}`}>{row.pillar}</span>
          </div>
          <p className="mt-3 break-all text-xs text-primary">
            <Link href={row.primaryUrl} className="underline-offset-2 hover:underline">
              {row.primaryUrl}
            </Link>
          </p>
          {row.assetFile ? (
            <p className="mt-1 text-xs text-gray-600">
              <span className="font-medium text-gray-500">素材：</span>
              {row.assetFile}
            </p>
          ) : null}
          {row.notes ? <p className="mt-2 text-xs text-gray-500">{row.notes}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function PostTableDesktop({ rows }: { rows: SocialPostRow[] }) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-warm-200 bg-white shadow-soft">
      <table className="min-w-[56rem] w-full text-left text-sm">
        <thead className="bg-warm-100/80 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-3 py-2 font-semibold">ID</th>
            <th className="px-3 py-2 font-semibold">周 / 槽位</th>
            <th className="px-3 py-2 font-semibold">建议日</th>
            <th className="px-3 py-2 font-semibold">渠道</th>
            <th className="px-3 py-2 font-semibold">支柱</th>
            <th className="min-w-[14rem] px-3 py-2 font-semibold">主题（一行）</th>
            <th className="min-w-[12rem] px-3 py-2 font-semibold">主链接</th>
            <th className="px-3 py-2 font-semibold">素材文件</th>
            <th className="px-3 py-2 font-semibold">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-warm-100">
          {rows.map(row => (
            <tr key={row.id} className="hover:bg-warm-50/80">
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-gray-500">{row.id}</td>
              <td className="whitespace-nowrap px-3 py-2 text-gray-800">
                {row.week} · {row.slot}
              </td>
              <td className="px-3 py-2 text-gray-700">{row.suggestedDay}</td>
              <td className="whitespace-nowrap px-3 py-2 text-gray-700">{row.channel}</td>
              <td className="px-3 py-2">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${pillarClass(row.pillar)}`}>
                  {row.pillar}
                </span>
              </td>
              <td className="px-3 py-2 text-gray-800">
                {row.topicOneLiner}
                {row.notes ? <span className="mt-1 block text-xs text-gray-500">{row.notes}</span> : null}
              </td>
              <td className="max-w-[14rem] px-3 py-2 align-top">
                <Link href={row.primaryUrl} className="break-all text-primary underline-offset-2 hover:underline">
                  {row.primaryUrl.replace('https://www.ctstours.co.nz', '')}
                </Link>
              </td>
              <td className="px-3 py-2 align-top text-xs text-gray-600">{row.assetFile || '—'}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${socialStatusClass(row.status)}`}
                >
                  {socialStatusLabel(row.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SocialPostingPlanPage() {
  return (
    <main className="min-h-screen bg-warm-50 text-accent print:bg-white">
      <div className="border-b border-warm-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · 十月战役</p>
            <h1 className="font-serif text-xl font-semibold text-accent sm:text-2xl">{SOCIAL_CAMPAIGN_META.title}</h1>
            <p className="mt-1 text-sm text-gray-600">{SOCIAL_CAMPAIGN_META.subtitle}</p>
            <p className="mt-1 text-sm text-gray-600">
              对外短链：<span className="font-mono text-xs">/campaign/social</span>
              {' · '}
              数据版本：<span className="font-medium">{SOCIAL_CAMPAIGN_META.lastUpdated}</span>
              {' · '}
              <Link href="/marketing/campaign" className="text-primary underline-offset-2 hover:underline">
                返回战役看板
              </Link>
              {' · '}
              <Link href="/" className="text-primary underline-offset-2 hover:underline">
                网站首页
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-lg font-semibold text-accent">说明</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{SOCIAL_CAMPAIGN_META.cadence}</p>
          <p className="mt-3 text-sm text-gray-600">
            编辑发帖排期请改源码{' '}
            <code className="rounded bg-warm-100 px-1 text-xs">src/lib/data/social-posting-plan-2026.ts</code>
            中的 <code className="rounded bg-warm-100 px-1 text-xs">SOCIAL_POST_ROWS</code>（状态：<code className="rounded bg-warm-100 px-1">draft</code> /{' '}
            <code className="rounded bg-warm-100 px-1">scheduled</code> / <code className="rounded bg-warm-100 px-1">posted</code>）。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold text-accent">发帖表（W1–W4）</h2>
          <p className="mt-2 text-sm text-gray-600">共 {SOCIAL_POST_ROWS.length} 条占位行，可按实际上线再增删。</p>
          <div className="mt-4 space-y-3">
            <PostCardsMobile rows={SOCIAL_POST_ROWS} />
            <PostTableDesktop rows={SOCIAL_POST_ROWS} />
          </div>
        </section>

        <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-lg font-semibold text-accent">发帖前检查</h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-gray-800">
            {SOCIAL_CHECKLIST.map((item, i) => (
              <li key={i} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <footer className="border-t border-warm-200 pb-8 pt-6 text-center text-xs text-gray-500">
          CTS Tours · 社媒发帖计划 · {SOCIAL_CAMPAIGN_META.lastUpdated}
        </footer>
      </div>
    </main>
  );
}
