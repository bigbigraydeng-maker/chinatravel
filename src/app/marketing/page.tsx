import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketing hub | CTS Tours',
  description: 'Internal marketing: site-wide operations (planned) and October 2026 campaign dashboard.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function MarketingHubPage() {
  return (
    <main className="min-h-screen bg-warm-50 px-4 py-16 text-accent">
      <div className="mx-auto max-w-2xl rounded-2xl border border-warm-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · Marketing</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">全站营销入口</h1>
        <p className="mt-4 leading-relaxed text-gray-700">
          此路径预留为<strong>站点级</strong>运营与 SEO 看板（与单条战役分开权限与指标）。当前为占位页；战役级执行表请使用下方链接。
        </p>
        <ul className="mt-8 space-y-4">
          <li>
            <Link
              href="/marketing/campaign"
              className="inline-flex rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 font-medium text-primary hover:bg-primary/10"
            >
              2026 年 10 月双产品战役看板 →
            </Link>
            <p className="mt-2 text-sm text-gray-600">OKR、里程碑、任务表；可选密码保护（MARKETING_PLAN_ACCESS_KEY）。</p>
          </li>
          <li>
            <Link
              href="/marketing/campaign/client-meeting"
              className="inline-flex rounded-xl border border-warm-200 bg-white px-4 py-3 font-medium text-accent hover:border-primary/30 hover:text-primary"
            >
              甲方会议看板（待办 / 开发事项）→
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              内容由 <code className="rounded bg-warm-100 px-1 text-xs">docs/client-meeting-board.md</code> 驱动，与战役看板同一密码门。
            </p>
          </li>
          <li>
            <Link
              href="/campaign/social"
              className="inline-flex rounded-xl border border-warm-200 bg-white px-4 py-3 font-medium text-accent hover:border-primary/30 hover:text-primary"
            >
              十月战役 · 社媒发帖计划 →
            </Link>
            <p className="mt-2 text-sm text-gray-600">短链 /campaign/social；FB / IG 四周发帖表（与战役同密码门）。</p>
          </li>
        </ul>
        <p className="mt-10 text-center text-sm text-gray-500">
          <Link href="/" className="text-primary underline-offset-2 hover:underline">
            返回网站首页
          </Link>
        </p>
      </div>
    </main>
  );
}
