import type { Metadata } from 'next';
import Link from 'next/link';
import { getTopKeywords, getFlagOpportunities } from '@/lib/data/gsc-dashboard';
import { getGa4Summary, type Ga4Summary } from '@/lib/data/ga4-dashboard';
import DataTabs from './DataTabs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '数据看板 | CTS Tours',
  description: 'GSC 搜索词 + GA4 流量 + 夺旗机会清单 — 内部使用，不索引。',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default async function DataDashboardPage() {
  let topQueries: Awaited<ReturnType<typeof getTopKeywords>> = [];
  let flagOpportunities: Awaited<ReturnType<typeof getFlagOpportunities>> = [];
  let fetchError: string | undefined;

  try {
    [topQueries, flagOpportunities] = await Promise.all([
      getTopKeywords(30),
      getFlagOpportunities(30),
    ]);
  } catch (e) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  // GA4 fetched independently — failure shouldn't blank out GSC.
  let ga4Summary: Ga4Summary | null = null;
  let ga4Error: string | undefined;
  try {
    ga4Summary = await getGa4Summary(7);
  } catch (e) {
    ga4Error = e instanceof Error ? e.message : String(e);
  }

  const ga4Id = process.env.NEXT_PUBLIC_GA_ID;
  const ga4Connected = Boolean(ga4Summary && ga4Summary.rowCount > 0);
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-warm-50 text-accent">
      {/* Header */}
      <div className="border-b border-warm-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · 数据看板</p>
              <h1 className="mt-0.5 font-serif text-2xl font-semibold text-accent sm:text-3xl">
                搜索 & 流量数据
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                GSC 同步：每日 UTC 09:00
                {' · '}
                <span className="text-gray-400">{today}</span>
              </p>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm" aria-label="相关页面">
              <Link
                href="/marketing/campaign/seo"
                className="rounded-lg border border-warm-200 bg-white px-3 py-2 text-gray-700 hover:border-primary/30 hover:text-primary"
              >
                SEO 看板（深色）
              </Link>
              <Link
                href="/marketing/campaign"
                className="rounded-lg border border-warm-200 bg-white px-3 py-2 text-gray-700 hover:border-primary/30 hover:text-primary"
              >
                战役统筹
              </Link>
              <Link
                href="/marketing"
                className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 font-medium text-primary hover:bg-primary/10"
              >
                营销入口
              </Link>
            </nav>
          </div>

          {/* Quick stats */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-warm-200 bg-white px-3 py-2 text-sm shadow-sm">
              <span className="font-medium text-gray-500">GSC 搜索词</span>
              <span className="font-bold text-accent">{fetchError ? '—' : topQueries.length}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-warm-200 bg-white px-3 py-2 text-sm shadow-sm">
              <span className="font-medium text-gray-500">夺旗机会</span>
              <span className={`font-bold ${fetchError ? 'text-gray-400' : 'text-primary'}`}>
                {fetchError ? '—' : flagOpportunities.length}
              </span>
            </div>
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm ${ga4Connected ? 'border-emerald-200 bg-emerald-50' : ga4Id ? 'border-sky-200 bg-sky-50' : 'border-amber-200 bg-amber-50'}`}>
              <span className="font-medium text-gray-500">GA4</span>
              <span className={`font-semibold ${ga4Connected ? 'text-emerald-700' : ga4Id ? 'text-sky-700' : 'text-amber-700'}`}>
                {ga4Connected
                  ? `${ga4Summary!.sessions.toLocaleString()} 会话 · 7d`
                  : ga4Id
                    ? `Beacon 已配置 ${ga4Id}`
                    : '待接入 Data API'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <DataTabs
          topQueries={topQueries}
          flagOpportunities={flagOpportunities}
          ga4Id={ga4Id}
          ga4Summary={ga4Summary}
          ga4Error={ga4Error}
          fetchError={fetchError}
        />
      </div>

      <footer className="border-t border-warm-200 pb-8 pt-6 text-center text-xs text-gray-400">
        数据来源：Google Search Console + Google Analytics 4 Data API（均经 Supabase 缓存）
        {' · '}
        <Link href="/marketing/campaign" className="text-primary underline-offset-2 hover:underline">
          返回战役看板
        </Link>
      </footer>
    </main>
  );
}
