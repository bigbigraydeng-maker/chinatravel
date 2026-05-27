'use client';

import { useState } from 'react';
import type { Ga4Summary } from '@/lib/data/ga4-dashboard';

// ── Types ────────────────────────────────────────────────────────────────────

export type GscRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Tab = 'gsc' | 'ga4' | 'flag';

type Props = {
  topQueries: GscRow[];
  flagOpportunities: GscRow[];
  ga4Id?: string;
  ga4Summary?: Ga4Summary | null;
  ga4Error?: string;
  fetchError?: string;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function positionBadge(pos: number): string {
  if (pos <= 3)  return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (pos <= 10) return 'bg-green-50 text-green-800 border-green-200';
  if (pos <= 20) return 'bg-amber-50 text-amber-800 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function ctrFmt(ctr: number) {
  return (ctr * 100).toFixed(1) + '%';
}

function flagTier(pos: number): { label: string; icon: string; badgeCls: string } {
  if (pos <= 15) return { label: '即将破圈', icon: '🔥', badgeCls: 'bg-orange-50 text-orange-800 border-orange-200' };
  if (pos <= 25) return { label: '追赶中',   icon: '⚡', badgeCls: 'bg-yellow-50 text-yellow-800 border-yellow-200' };
  return         { label: '培育期',   icon: '🌱', badgeCls: 'bg-sky-50 text-sky-800 border-sky-200' };
}

// ── GSC Tab ──────────────────────────────────────────────────────────────────

function GscPanel({ rows, error }: { rows: GscRow[]; error?: string }) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
        ⚠️ 数据加载失败：{error}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-warm-200 bg-warm-50 px-6 py-8 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700">暂无 GSC 数据</p>
        <p className="mt-1">
          请先运行一次同步：
          <code className="ml-1 rounded bg-warm-100 px-1.5 py-0.5 text-xs">POST /api/gsc/sync</code>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-500">近 7 天 · 按曝光量排序 · 共 {rows.length} 条</p>
      <div className="overflow-x-auto rounded-xl border border-warm-200 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-warm-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="w-8 px-3 py-3">#</th>
              <th className="px-3 py-3">搜索词</th>
              <th className="px-3 py-3 text-right">曝光</th>
              <th className="px-3 py-3 text-right">点击</th>
              <th className="px-3 py-3 text-right">CTR</th>
              <th className="px-3 py-3 text-right">均位</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100">
            {rows.map((row, i) => (
              <tr key={row.query} className="hover:bg-warm-50/60">
                <td className="px-3 py-2.5 text-xs text-gray-400">{i + 1}</td>
                <td className="max-w-[18rem] truncate px-3 py-2.5 font-mono text-xs text-gray-800">{row.query}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.impressions.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.clicks.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{ctrFmt(row.ctr)}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${positionBadge(row.position)}`}>
                    #{row.position.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        均位颜色：<span className="font-semibold text-emerald-700">#1–3 顶部</span>
        {' · '}<span className="font-semibold text-green-700">#4–10 首页</span>
        {' · '}<span className="font-semibold text-amber-700">#11–20 第二页</span>
        {' · '}<span className="font-semibold text-red-600">#21+ 待提升</span>
      </p>
    </div>
  );
}

// ── GA4 Tab ──────────────────────────────────────────────────────────────────

function fmtPct(n: number) { return (n * 100).toFixed(1) + '%'; }
function fmtDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}分${s}秒` : `${s}秒`;
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-accent">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function Ga4NotConfigured({ ga4Id, error }: { ga4Id?: string; error?: string }) {
  return (
    <div className="space-y-6">
      <div className={`rounded-xl border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
        {error ? (
          <>
            <p className="font-semibold">GA4 数据读取失败</p>
            <p className="mt-1 break-all font-mono text-xs">{error}</p>
          </>
        ) : (
          <>
            <p className="font-semibold">GA4 Data API 尚未接入或暂无数据</p>
            <p className="mt-1">
              {ga4Id
                ? `前端 beacon 已配置（${ga4Id}），但服务端报告 API 尚未同步任何数据。`
                : '前端 beacon 与服务端 Data API 均未配置。'}
            </p>
          </>
        )}
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm">
        <h3 className="font-semibold text-accent">接入 GA4 Data API（步骤）</h3>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-gray-700">
          <li>在 Google Cloud Console 开启 <em>Google Analytics Data API</em></li>
          <li>创建服务账号 → 下载 JSON 密钥</li>
          <li>在 GA4「属性访问管理」添加服务账号（Viewer 权限）</li>
          <li>
            将下列环境变量配置到 Render：
            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-xs">
              <li><code className="rounded bg-white/80 px-1">GA4_PROPERTY_ID</code>（9 位数字，非 G-XXX）</li>
              <li><code className="rounded bg-white/80 px-1">GOOGLE_SERVICE_ACCOUNT_EMAIL</code></li>
              <li><code className="rounded bg-white/80 px-1">GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code></li>
            </ul>
          </li>
          <li>
            首次同步：<code className="rounded bg-white/80 px-1 text-xs">POST /api/ga4/sync</code>
            （后续每日 cron 自动跑）
          </li>
        </ol>
      </div>
    </div>
  );
}

function Ga4Panel({ summary, ga4Id, error }: { summary?: Ga4Summary | null; ga4Id?: string; error?: string }) {
  if (!summary || summary.rowCount === 0) {
    return <Ga4NotConfigured ga4Id={ga4Id} error={error} />;
  }

  const maxDaily = Math.max(...summary.daily.map(d => d.sessions), 1);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <p className="font-semibold">GA4 Data API 已连接 · 近 7 天数据</p>
        <p className="mt-1 text-xs">
          同步源：Supabase <code className="rounded bg-white/80 px-1 font-mono">ga4_traffic</code> · 共 {summary.rowCount.toLocaleString()} 行
        </p>
      </div>

      {/* Top-line metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard
          label="总会话数"
          value={summary.sessions.toLocaleString()}
          sub="近 7 天"
        />
        <MetricCard
          label="互动率"
          value={fmtPct(summary.engagementRate)}
          sub={`${summary.engagedSessions.toLocaleString()} 互动会话`}
        />
        <MetricCard
          label="平均会话时长"
          value={fmtDuration(summary.avgSessionDurationSec)}
          sub="加权平均"
        />
        <MetricCard
          label="转化（key events）"
          value={summary.conversions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          sub="近 7 天合计"
        />
      </div>

      {/* Daily trend */}
      <div className="rounded-xl border border-warm-200 bg-white p-5 shadow-soft">
        <h3 className="font-serif text-base font-semibold text-accent">每日会话趋势</h3>
        <p className="mt-1 text-xs text-gray-500">{summary.daily.length} 天 · 按日期升序</p>
        <div className="mt-4 space-y-1.5">
          {summary.daily.map(d => (
            <div key={d.date} className="flex items-center gap-3 text-sm">
              <span className="w-20 shrink-0 font-mono text-xs text-gray-500">{d.date}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-warm-100">
                <div
                  className="h-2 rounded-full bg-primary/70"
                  style={{ width: `${(d.sessions / maxDaily) * 100}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right tabular-nums text-gray-700">{d.sessions.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages */}
      <div className="rounded-xl border border-warm-200 bg-white p-5 shadow-soft">
        <h3 className="font-serif text-base font-semibold text-accent">高价值落地页（Top 10）</h3>
        <p className="mt-1 text-xs text-gray-500">按会话量排序</p>
        <ol className="mt-4 space-y-2">
          {summary.topPages.map((p, i) => (
            <li key={p.key} className="flex items-center gap-3 rounded-lg border border-warm-100 bg-warm-50/50 px-3 py-2 text-sm">
              <span className="w-5 shrink-0 text-xs font-semibold text-gray-400">{i + 1}</span>
              <a
                href={p.key}
                target="_blank"
                rel="noreferrer"
                className="flex-1 truncate font-mono text-xs text-primary underline-offset-2 hover:underline"
              >
                {p.key}
              </a>
              <span className="shrink-0 tabular-nums text-gray-700">{p.sessions.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Top sources */}
      <div className="rounded-xl border border-warm-200 bg-white p-5 shadow-soft">
        <h3 className="font-serif text-base font-semibold text-accent">流量来源（Top 8）</h3>
        <p className="mt-1 text-xs text-gray-500">GA4 sessionSourceMedium</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {summary.topSources.map(s => (
            <div key={s.key} className="flex items-center justify-between rounded-lg border border-warm-100 bg-warm-50/50 px-3 py-2 text-sm">
              <span className="truncate font-mono text-xs text-gray-700">{s.key}</span>
              <span className="ml-2 shrink-0 tabular-nums text-gray-600">{s.sessions.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Flag Opportunities Tab ────────────────────────────────────────────────────

function FlagPanel({ rows, error }: { rows: GscRow[]; error?: string }) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
        ⚠️ 数据加载失败：{error}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-warm-200 bg-warm-50 px-6 py-8 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700">暂无夺旗数据</p>
        <p className="mt-1">GSC 同步后，排名 11–50 且有曝光的关键词将自动出现于此。</p>
      </div>
    );
  }

  const hot    = rows.filter(r => r.position <= 15);
  const chasing = rows.filter(r => r.position > 15 && r.position <= 25);
  const growing = rows.filter(r => r.position > 25);

  const TierTable = ({ items, tier }: { items: GscRow[]; tier: ReturnType<typeof flagTier> }) => {
    if (items.length === 0) return null;
    return (
      <div className="overflow-x-auto rounded-xl border border-warm-200 bg-white shadow-soft">
        <div className="flex items-center gap-2 border-b border-warm-100 px-4 py-3">
          <span className="text-base">{tier.icon}</span>
          <span className="font-semibold text-accent">{tier.label}</span>
          <span className={`ml-2 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${tier.badgeCls}`}>
            {items.length} 条
          </span>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-warm-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-3 py-2">搜索词</th>
              <th className="px-3 py-2 text-right">曝光</th>
              <th className="px-3 py-2 text-right">点击</th>
              <th className="px-3 py-2 text-right">CTR</th>
              <th className="px-3 py-2 text-right">当前均位</th>
              <th className="px-3 py-2 text-right">差距</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100">
            {items.map(row => (
              <tr key={row.query} className="hover:bg-warm-50/60">
                <td className="max-w-[16rem] truncate px-3 py-2.5 font-mono text-xs text-gray-800">{row.query}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.impressions.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.clicks.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{ctrFmt(row.ctr)}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${positionBadge(row.position)}`}>
                    #{row.position.toFixed(1)}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right text-xs text-gray-500">
                  距首页 {(row.position - 10).toFixed(1)} 位
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-accent">
        <strong>夺旗逻辑：</strong>排名 11–50 且近 7 天有 ≥3 次曝光的搜索词，按曝光量由高到低排序。
        优先优化「即将破圈」词（#11–15）——这些词只需小幅提升即可进首页。
      </div>

      <TierTable items={hot}     tier={flagTier(12)} />
      <TierTable items={chasing} tier={flagTier(20)} />
      <TierTable items={growing} tier={flagTier(30)} />

      <div className="rounded-xl border border-warm-200 bg-white p-5 shadow-soft">
        <h3 className="font-serif text-base font-semibold text-accent">推荐行动</h3>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-3">
            <dt className="font-semibold text-orange-900">🔥 即将破圈（#11–15）</dt>
            <dd className="mt-1 text-gray-700">优化该页 title / H1 / 内链；补充 FAQ Schema；争取相关页互链。一般 4–6 周可见效。</dd>
          </div>
          <div className="rounded-lg border border-yellow-100 bg-yellow-50/60 p-3">
            <dt className="font-semibold text-yellow-900">⚡ 追赶中（#16–25）</dt>
            <dd className="mt-1 text-gray-700">增加 800–1200 字针对性内容；提升 E-E-A-T 信号；可考虑外链建设或内链集中。</dd>
          </div>
          <div className="rounded-lg border border-sky-100 bg-sky-50/60 p-3">
            <dt className="font-semibold text-sky-900">🌱 培育期（#26–50）</dt>
            <dd className="mt-1 text-gray-700">写专项博客或目的地指南；积累内链与主题权威度；3–6 个月为一个周期。</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

// ── Main DataTabs component ──────────────────────────────────────────────────

const TAB_META: { id: Tab; label: string; countKey?: keyof Pick<Props, 'topQueries' | 'flagOpportunities'> }[] = [
  { id: 'gsc',  label: 'GSC 搜索词',   countKey: 'topQueries' },
  { id: 'ga4',  label: 'GA4 流量' },
  { id: 'flag', label: '夺旗机会',      countKey: 'flagOpportunities' },
];

export default function DataTabs({ topQueries, flagOpportunities, ga4Id, ga4Summary, ga4Error, fetchError }: Props) {
  const [active, setActive] = useState<Tab>('gsc');
  const ga4Connected = Boolean(ga4Summary && ga4Summary.rowCount > 0);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-warm-200 bg-warm-100/60 p-1">
        {TAB_META.map(tab => {
          const count =
            tab.countKey
              ? (tab.countKey === 'topQueries' ? topQueries : flagOpportunities).length
              : tab.id === 'ga4' && ga4Connected
                ? ga4Summary!.sessions
                : undefined;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-accent shadow-sm ring-1 ring-warm-200'
                  : 'text-gray-600 hover:bg-white/60 hover:text-accent'
              }`}
            >
              {tab.label}
              {tab.id === 'ga4' && !ga4Connected && (
                <span className="ml-0.5 text-xs text-amber-600" title="尚未接入 GA4 Data API">⚠</span>
              )}
              {count !== undefined && (
                <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${isActive ? 'bg-primary/10 text-primary' : 'bg-warm-200 text-gray-600'}`}>
                  {count.toLocaleString()}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {active === 'gsc'  && <GscPanel  rows={topQueries}         error={fetchError} />}
        {active === 'ga4'  && <Ga4Panel  summary={ga4Summary}      ga4Id={ga4Id} error={ga4Error} />}
        {active === 'flag' && <FlagPanel rows={flagOpportunities}  error={fetchError} />}
      </div>
    </div>
  );
}
