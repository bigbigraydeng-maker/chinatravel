import type { Metadata } from 'next';
import Link from 'next/link';
import { getTopKeywords, getKeywordTrend } from '@/lib/data/gsc-dashboard';

export const metadata: Metadata = {
  title: 'SEO 数据看板 | CTS Tours',
  robots: { index: false, follow: false },
};

const TARGET_KEYWORDS = [
  'china tours from new zealand',
  'china tours',
  'china tour packages',
  'beijing tour',
  'shanghai tour',
  'chengdu panda tour',
  'guilin tour',
  'great wall tour',
  'terracotta warriors tour',
  'china travel guide',
  'china visa new zealand',
];

function positionColor(pos: number): string {
  if (pos <= 10) return 'text-green-600 font-semibold';
  if (pos <= 20) return 'text-yellow-600 font-semibold';
  return 'text-red-500';
}

function ctrFormat(ctr: number): string {
  return (ctr * 100).toFixed(1) + '%';
}

export default async function SeoPage() {
  let topKeywords: Awaited<ReturnType<typeof getTopKeywords>> = [];
  let fetchError: string | null = null;

  try {
    topKeywords = await getTopKeywords(50);
  } catch (e) {
    fetchError = e instanceof Error ? e.message : (typeof e === 'object' ? JSON.stringify(e) : String(e));
  }

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">SEO 数据看板</h1>
            <p className="text-sm text-gray-400 mt-0.5">Google Search Console · 数据更新：每日 UTC 09:00</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{today}</span>
            <Link
              href="/marketing/campaign"
              className="rounded border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              ← 返回看板
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-10">

        {fetchError && (
          <div className="rounded-lg border border-red-800 bg-red-950 p-4 text-red-300 text-sm">
            ⚠️ 数据加载失败：{fetchError}
          </div>
        )}

        {/* 目标关键词追踪 */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-1">目标关键词追踪</h2>
          <p className="text-sm text-gray-500 mb-4">11 个核心关键词近 7 天表现（从 TOP 50 中匹配）</p>
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900 text-left text-gray-400">
                  <th className="px-4 py-3 font-medium">关键词</th>
                  <th className="px-4 py-3 font-medium text-right">曝光</th>
                  <th className="px-4 py-3 font-medium text-right">点击</th>
                  <th className="px-4 py-3 font-medium text-right">CTR</th>
                  <th className="px-4 py-3 font-medium text-right">平均排名</th>
                  <th className="px-4 py-3 font-medium text-right">最新日期</th>
                </tr>
              </thead>
              <tbody>
                {TARGET_KEYWORDS.map((kw) => {
                  const row = topKeywords.find(
                    (r) => r.query?.toLowerCase() === kw.toLowerCase()
                  );
                  return (
                    <tr key={kw} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-gray-200 font-mono text-xs">{kw}</td>
                      {row ? (
                        <>
                          <td className="px-4 py-3 text-right text-gray-300">{row.impressions?.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-gray-300">{row.clicks?.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-gray-300">{ctrFormat(row.ctr ?? 0)}</td>
                          <td className={`px-4 py-3 text-right ${positionColor(row.position ?? 99)}`}>
                            #{(row.position ?? 0).toFixed(1)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500 text-xs">{row.date}</td>
                        </>
                      ) : (
                        <td colSpan={5} className="px-4 py-3 text-right text-gray-600 text-xs">暂无数据</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* TOP 50 关键词 */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-1">近 7 天 TOP 关键词</h2>
          <p className="text-sm text-gray-500 mb-4">按曝光量排序，共 {topKeywords.length} 条</p>

          {topKeywords.length === 0 && !fetchError && (
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center text-gray-500 text-sm">
              暂无数据，请先运行一次同步：<br />
              <code className="mt-2 block text-xs text-gray-600">POST /api/gsc/sync</code>
            </div>
          )}

          {topKeywords.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900 text-left text-gray-400">
                    <th className="px-4 py-3 font-medium w-8">#</th>
                    <th className="px-4 py-3 font-medium">关键词</th>
                    <th className="px-4 py-3 font-medium text-right">曝光</th>
                    <th className="px-4 py-3 font-medium text-right">点击</th>
                    <th className="px-4 py-3 font-medium text-right">CTR</th>
                    <th className="px-4 py-3 font-medium text-right">平均排名</th>
                  </tr>
                </thead>
                <tbody>
                  {topKeywords.map((row, i) => (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{i + 1}</td>
                      <td className="px-4 py-2.5 text-gray-200 font-mono text-xs max-w-xs truncate">{row.query}</td>
                      <td className="px-4 py-2.5 text-right text-gray-300">{row.impressions?.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right text-gray-300">{row.clicks?.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right text-gray-300">{ctrFormat(row.ctr ?? 0)}</td>
                      <td className={`px-4 py-2.5 text-right ${positionColor(row.position ?? 99)}`}>
                        #{(row.position ?? 0).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 排名说明 */}
        <section className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">排名颜色说明</h3>
          <div className="flex gap-6 text-sm">
            <span className="text-green-600 font-semibold">绿色 = 第 1–10 位（首页）</span>
            <span className="text-yellow-600 font-semibold">黄色 = 第 11–20 位（第二页）</span>
            <span className="text-red-500">红色 = 第 21 位以后</span>
          </div>
        </section>

      </main>
    </div>
  );
}
