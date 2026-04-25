import type { Metadata } from 'next';
import Link from 'next/link';
import { getTopKeywords, getKeywordTrend } from '@/lib/data/gsc-dashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SEO 数据看板 | CTS Tours',
  robots: { index: false, follow: false },
};

const TARGET_KEYWORDS = [
  // Phase 2 核心目标词（KD 4-9）
  'china tours from new zealand',
  'china tour packages',
  'china holiday packages',
  'china travel packages',
  // Phase 3 攻坚词
  'china tours',
  'great wall of china tour',
  'beijing holiday packages',
  // 现有排名词（监控）
  'china travel',
  'china travel service',
  // 长期目标
  'luxury china tours',
  'chengdu panda sanctuary',
  // Semrush NZ 新发现（2026-04-25）
  'chinese visa nz',
  'do new zealanders need a visa for china',
  'auckland to china',
  'flights to china from nz',
  'traveling to china',
];

type TrendPoint = { date: string; clicks: number; impressions: number; position: number };

function positionColor(pos: number): string {
  if (pos <= 10) return 'text-green-400 font-semibold';
  if (pos <= 20) return 'text-yellow-400 font-semibold';
  return 'text-red-400';
}

function ctrFormat(ctr: number): string {
  return (ctr * 100).toFixed(1) + '%';
}

// Mini sparkline — 80×28px inline SVG
function Sparkline({ data }: { data: TrendPoint[] }) {
  const valid = data.filter(d => d.position > 0);
  if (valid.length < 2) return <span className="text-gray-700 text-xs">—</span>;

  const W = 80, H = 28, pad = 4;
  const positions = valid.map(d => d.position);
  const maxPos = Math.max(...positions);
  const minPos = Math.min(...positions);
  const range = maxPos - minPos || 1;

  const pts = valid.map((d, i) => {
    const x = pad + (i / (valid.length - 1)) * (W - pad * 2);
    // Lower rank number = better = higher on chart (lower y)
    const y = pad + ((d.position - minPos) / range) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const first = valid[0].position;
  const last = valid[valid.length - 1].position;
  const color = last < first ? '#4ade80' : last > first ? '#f87171' : '#6b7280';
  const lastPt = pts[pts.length - 1].split(',');

  return (
    <svg width={W} height={H} className="inline-block">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="2.5" fill={color} />
    </svg>
  );
}

// Rank delta badge
function RankDelta({ data }: { data: TrendPoint[] }) {
  const valid = data.filter(d => d.position > 0);
  if (valid.length < 2) return <span className="text-gray-700 text-xs">—</span>;
  const delta = Math.round((valid[0].position - valid[valid.length - 1].position) * 10) / 10;
  if (delta === 0) return <span className="text-gray-500 text-xs">持平</span>;
  if (delta > 0) return <span className="text-green-400 text-xs font-semibold">↑{delta}</span>;
  return <span className="text-red-400 text-xs font-semibold">↓{Math.abs(delta)}</span>;
}

// Full trend chart — responsive SVG
function TrendChart({ kw, data }: { kw: string; data: TrendPoint[] }) {
  const valid = data.filter(d => d.position > 0);
  if (valid.length < 2) return null;

  const W = 440, H = 90, padX = 12, padY = 10;
  const positions = valid.map(d => d.position);
  const rawMax = Math.max(...positions);
  const rawMin = Math.min(...positions);
  const maxPos = rawMax + Math.max(2, rawMax * 0.1);
  const minPos = Math.max(1, rawMin - Math.max(2, rawMin * 0.1));
  const range = maxPos - minPos;

  const toY = (pos: number) => padY + ((pos - minPos) / range) * (H - padY * 2);
  const toX = (i: number) => padX + (i / (valid.length - 1)) * (W - padX * 2);

  const pts = valid.map((d, i) => ({ x: toX(i), y: toY(d.position), d }));
  const polyline = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `M${pts[0].x.toFixed(1)},${H} ` +
    pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
    ` L${pts[pts.length - 1].x.toFixed(1)},${H} Z`;

  const first = valid[0].position;
  const last = valid[valid.length - 1].position;
  const improved = last < first;
  const stroke = improved ? '#4ade80' : last > first ? '#f87171' : '#6b7280';
  const fill = improved ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)';

  // Nice grid labels: top 10 boundary, top 20 boundary
  const gridLines = [10, 20, 30, 50].filter(g => g >= minPos - 2 && g <= maxPos + 2);

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="font-mono text-xs text-gray-300 truncate">{kw}</span>
        <div className="flex items-center gap-3 shrink-0 text-xs text-gray-500">
          <span>起: <span className="text-gray-400">#{first.toFixed(1)}</span></span>
          <span>现: <span className={improved ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>#{last.toFixed(1)}</span></span>
          <RankDelta data={data} />
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
        {/* Grid lines */}
        {gridLines.map(g => {
          const y = toY(g);
          return (
            <g key={g}>
              <line x1={padX} y1={y.toFixed(1)} x2={W - padX} y2={y.toFixed(1)}
                stroke="#374151" strokeWidth="0.5" strokeDasharray="3,3" />
              <text x={(W - padX + 2).toFixed(0)} y={(y + 3).toFixed(0)}
                fontSize="6" fill="#4b5563" textAnchor="start">#{g}</text>
            </g>
          );
        })}
        {/* Fill */}
        <path d={area} fill={fill} />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke={stroke} strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round" />
        {/* Dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.5" fill={stroke} />
        ))}
      </svg>
      <div className="flex justify-between mt-1 text-xs text-gray-700">
        <span>{valid[0].date}</span>
        <span>{valid[valid.length - 1].date}</span>
      </div>
    </div>
  );
}

export default async function SeoPage() {
  let topKeywords: Awaited<ReturnType<typeof getTopKeywords>> = [];
  let fetchError: string | null = null;
  const trendData: Record<string, TrendPoint[]> = {};

  try {
    topKeywords = await getTopKeywords(50);
  } catch (e) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  // Fetch 30-day trends for all target keywords in parallel
  await Promise.all(
    TARGET_KEYWORDS.map(async (kw) => {
      try {
        trendData[kw] = (await getKeywordTrend(kw, 30)) as TrendPoint[];
      } catch {
        trendData[kw] = [];
      }
    })
  );

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const keywordsWithTrend = TARGET_KEYWORDS.filter(kw => {
    const valid = (trendData[kw] ?? []).filter(d => d.position > 0);
    return valid.length >= 2;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">SEO 数据看板</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Google Search Console · 数据更新：每日 UTC 09:00
            </p>
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

        {/* ── 目标关键词追踪 ── */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-1">目标关键词追踪</h2>
          <p className="text-sm text-gray-500 mb-4">
            {TARGET_KEYWORDS.length} 个核心关键词 · 近 7 天数据 + 30 天趋势
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900 text-left text-gray-400">
                  <th className="px-4 py-3 font-medium">关键词</th>
                  <th className="px-4 py-3 font-medium text-right">曝光</th>
                  <th className="px-4 py-3 font-medium text-right">点击</th>
                  <th className="px-4 py-3 font-medium text-right">CTR</th>
                  <th className="px-4 py-3 font-medium text-right">当前排名</th>
                  <th className="px-4 py-3 font-medium text-center">30天趋势</th>
                  <th className="px-4 py-3 font-medium text-right">变化</th>
                </tr>
              </thead>
              <tbody>
                {TARGET_KEYWORDS.map((kw) => {
                  const row = topKeywords.find(
                    r => r.query?.toLowerCase() === kw.toLowerCase()
                  );
                  const trend = trendData[kw] ?? [];
                  return (
                    <tr
                      key={kw}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-200 font-mono text-xs">{kw}</td>
                      {row ? (
                        <>
                          <td className="px-4 py-3 text-right text-gray-300">
                            {row.impressions?.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-300">
                            {row.clicks?.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-300">
                            {ctrFormat(row.ctr ?? 0)}
                          </td>
                          <td className={`px-4 py-3 text-right ${positionColor(row.position ?? 99)}`}>
                            #{(row.position ?? 0).toFixed(1)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-right text-gray-700">—</td>
                          <td className="px-4 py-3 text-right text-gray-700">—</td>
                          <td className="px-4 py-3 text-right text-gray-700">—</td>
                          <td className="px-4 py-3 text-right text-gray-600 text-xs">
                            暂无数据
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-center">
                        <Sparkline data={trend} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <RankDelta data={trend} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 排名趋势图 ── */}
        {keywordsWithTrend.length > 0 ? (
          <section>
            <h2 className="text-lg font-semibold text-white mb-1">排名趋势</h2>
            <p className="text-sm text-gray-500 mb-4">
              近 30 天排名变化曲线（曲线向上 = 排名越高越好）
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keywordsWithTrend.map(kw => (
                <TrendChart key={kw} kw={kw} data={trendData[kw]} />
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-gray-800 p-6 text-center text-gray-600 text-sm">
            <p className="mb-1">趋势图等待更多数据</p>
            <p className="text-xs">同步 7 天以上历史数据后，排名变化曲线将自动显示</p>
          </section>
        )}

        {/* ── TOP 50 关键词 ── */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-1">近 7 天 TOP 关键词</h2>
          <p className="text-sm text-gray-500 mb-4">
            按曝光量排序，共 {topKeywords.length} 条
          </p>

          {topKeywords.length === 0 && !fetchError && (
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center text-gray-500 text-sm">
              暂无数据，请先运行一次同步：
              <br />
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
                    <tr
                      key={i}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{i + 1}</td>
                      <td className="px-4 py-2.5 text-gray-200 font-mono text-xs max-w-xs truncate">
                        {row.query}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-300">
                        {row.impressions?.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-300">
                        {row.clicks?.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-300">
                        {ctrFormat(row.ctr ?? 0)}
                      </td>
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

        {/* ── 颜色说明 ── */}
        <section className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">排名颜色说明</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="text-green-400 font-semibold">🟢 第 1–10 位（首页）</span>
            <span className="text-yellow-400 font-semibold">🟡 第 11–20 位（第二页）</span>
            <span className="text-red-400">🔴 第 21 位以后</span>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            趋势图：绿色曲线 = 排名上升；红色曲线 = 排名下降。仅显示有 2 个以上历史数据点的关键词。
          </p>
        </section>
      </main>
    </div>
  );
}
