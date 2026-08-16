'use client';

import { useState } from 'react';
import type { PromotionPlan } from '@/lib/tour-parser/promotion-schema';
import type { CampaignNaming, ProductFact } from '@/lib/tour-parser/utm';
import type { CampaignMath } from '@/lib/tour-parser/campaign-brief';

export type PromotionResponse = {
  naming: CampaignNaming;
  facts: ProductFact[];
  math: CampaignMath;
  plan: PromotionPlan;
  incompleteSections: string[];
  usage: { inputTokens: number; outputTokens: number };
  elapsedMs: number;
};

const CHANNEL_LABELS: Record<string, string> = {
  blog: '博客',
  'google-ads': 'Google Ads',
  'google-search': 'Google 搜索',
  youtube: 'YouTube',
  'facebook-reels': 'FB Reels',
  'facebook-feed': 'FB 信息流',
  'seo-organic': 'SEO 自然流量',
  email: '邮件',
  'landing-page': '落地页',
};

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-warm-200 bg-white p-4">
      <h3 className="font-serif text-lg font-semibold text-accent">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-warm-600">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function PromotionPlanPanel({ data }: { data: PromotionResponse }) {
  const { naming, facts, plan } = data;
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {data.incompleteSections?.length > 0 && (
        <div className="rounded-lg border border-amber-400 bg-amber-50 p-4">
          <h3 className="font-serif text-lg font-semibold text-accent">这份方案不完整</h3>
          <p className="mt-1 text-sm text-warm-700">
            以下板块返回为空,页面上会显示成空白 —— 不是「没有内容可写」,是这次没生成出来:
          </p>
          <p className="mt-2 text-sm font-medium text-accent">{data.incompleteSections.join('、')}</p>
          <p className="mt-2 text-sm text-warm-700">点「重新生成」再试一次。多次仍然为空的话告诉我。</p>
        </div>
      )}

      <div className="rounded-lg border border-warm-200 bg-white p-4 text-sm text-warm-700">
        耗时 {(data.elapsedMs / 1000).toFixed(1)}s · 输入 {data.usage.inputTokens.toLocaleString()} / 输出{' '}
        {data.usage.outputTokens.toLocaleString()} tokens
      </div>

      {data.math.warnings.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <h3 className="font-serif text-lg font-semibold text-accent">投放前提有问题</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-warm-800">
            {data.math.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <Section
        title="投放前提"
        subtitle="这几个数字由代码计算,不是模型估的 —— 方案里的排期和预算判断都建立在它们上面。"
      >
        <dl className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">今天</dt>
            <dd className="text-accent">{data.math.todayIso}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">首个团期</dt>
            <dd className="text-accent">{data.math.firstDepartureIso ?? '未定'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">剩余窗口</dt>
            <dd className={data.math.weeksToDeparture !== null && data.math.weeksToDeparture < 20 ? 'font-medium text-red-700' : 'text-accent'}>
              {data.math.weeksToDeparture !== null ? `${data.math.weeksToDeparture} 周` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">周均预算</dt>
            <dd className="text-accent">
              {data.math.weeklyBudgetNzd !== null ? `NZD $${data.math.weeklyBudgetNzd.toLocaleString()}` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">预计可得 lead</dt>
            <dd className="text-accent">{data.math.projectedLeads ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">所需成交率</dt>
            <dd className="text-accent">
              {data.math.requiredCloseRatePct !== null ? `${data.math.requiredCloseRatePct}%` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-warm-600">预计成交</dt>
            <dd className="text-accent">{data.math.projectedPax !== null ? `${data.math.projectedPax} 人` : '—'}</dd>
          </div>
        </dl>
        {data.math.unknowns.length > 0 && (
          <p className="mt-3 text-sm text-warm-600">
            未填写:<span className="font-medium text-accent">{data.math.unknowns.join('、')}</span>
            —— 方案里相关部分按估算处理。
          </p>
        )}
      </Section>

      <Section title="产品事实速查" subtitle="对外口径以此为准 —— 广告和文案不得超出这张表。">
        <dl className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs uppercase tracking-wide text-warm-600">{f.label}</dt>
              <dd className={f.value.includes('未定') ? 'font-medium text-red-700' : 'text-accent'}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="定位">
        <p className="text-sm">
          <span className="text-xs uppercase tracking-wide text-warm-600">一句话差异</span>
          <br />
          <span className="font-medium italic text-accent">{plan.positioning.oneLineDifferentiator}</span>
        </p>
        <p className="mt-3 text-sm text-warm-700">
          <span className="font-medium text-accent">目标人群:</span> {plan.positioning.targetAudience}
        </p>
        <p className="mt-2 text-sm text-warm-700">
          <span className="font-medium text-accent">竞争参照:</span> {plan.positioning.competingAlternative}
        </p>
      </Section>

      {plan.complianceNotes.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <h3 className="font-serif text-lg font-semibold text-accent">投放前必须处理</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-warm-800">
            {plan.complianceNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <Section title="关键词簇" subtitle="核心与长尾映射到页面 H2,澄清型直接做成 FAQ。">
        <div className="grid gap-3 text-sm md:grid-cols-3">
          {(['core', 'longTail', 'local'] as const).map((key) => (
            <div key={key}>
              <p className="text-xs uppercase tracking-wide text-warm-600">
                {key === 'core' ? '核心' : key === 'longTail' ? '长尾' : '本地 / 品牌防御'}
              </p>
              <ul className="mt-1 space-y-0.5 text-accent">
                {plan.keywordClusters[key].map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {plan.keywordClusters.clarifying.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-warm-600">澄清型 → 直接做成 FAQ</p>
            <ul className="mt-1 space-y-2 text-sm">
              {plan.keywordClusters.clarifying.map((c, i) => (
                <li key={i} className="border-l-2 border-warm-200 pl-3">
                  <p className="font-medium text-accent">{c.query}</p>
                  <p className="text-warm-700">{c.faqAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section title="站内 SEO 动作">
        <ul className="space-y-2 text-sm">
          {plan.onSiteSeoActions.map((a, i) => (
            <li key={i} className="border-l-2 border-warm-200 pl-3">
              <p className="font-medium text-accent">{a.action}</p>
              <p className="text-warm-700">
                {a.where} —— {a.why}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="渠道预算分配" subtitle="面向 55+ 客群的主力:Google 搜索、YouTube、FB Reels。">
        <ul className="space-y-2 text-sm">
          {plan.channelPlan.map((c, i) => (
            <li key={i} className="border-l-2 border-warm-200 pl-3">
              <p className="font-medium text-accent">
                {CHANNEL_LABELS[c.channel] ?? c.channel} —— {c.budgetSharePct}%
              </p>
              <p className="text-warm-700">{c.role}</p>
              <p className="text-warm-600">创意重点:{c.creativeFocus}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="内容排期" subtitle="每条带真实日期,从今天排到出发。">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-warm-600">
              <tr>
                <th className="py-1 pr-3">日期</th>
                <th className="py-1 pr-3">距出发</th>
                <th className="py-1 pr-3">渠道</th>
                <th className="py-1 pr-3">形式</th>
                <th className="py-1 pr-3">标题</th>
                <th className="py-1">作用</th>
              </tr>
            </thead>
            <tbody className="text-warm-700">
              {plan.contentCalendar.map((c, i) => (
                <tr key={i} className="border-t border-warm-100 align-top">
                  <td className="py-1.5 pr-3 whitespace-nowrap font-medium text-accent">{c.date}</td>
                  <td className="py-1.5 pr-3 whitespace-nowrap">{c.timing}</td>
                  <td className="py-1.5 pr-3 whitespace-nowrap">{CHANNEL_LABELS[c.channel] ?? c.channel}</td>
                  <td className="py-1.5 pr-3">{c.format}</td>
                  <td className="py-1.5 pr-3 font-medium text-accent">{c.title}</td>
                  <td className="py-1.5">{c.angle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Google Ads">
        <p className="text-xs uppercase tracking-wide text-warm-600">广告组</p>
        <ul className="mt-1 space-y-1 text-sm">
          {plan.googleAds.adGroups.map((g, i) => (
            <li key={i}>
              <span className="font-medium text-accent">{g.name}</span>
              <span className="text-warm-700">
                {' '}
                —— {g.intent}({g.matchType})
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-warm-600">RSA 标题(≤30 字符)</p>
            <ul className="mt-1 space-y-0.5 text-sm text-accent">
              {plan.googleAds.rsaHeadlines.map((h, i) => (
                <li key={i}>
                  {h} <span className="text-xs text-warm-500">({h.length})</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-warm-600">RSA 描述(≤90 字符)</p>
            <ul className="mt-1 space-y-1 text-sm text-accent">
              {plan.googleAds.rsaDescriptions.map((d, i) => (
                <li key={i}>
                  {d} <span className="text-xs text-warm-500">({d.length})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Meta">
        <dl className="space-y-2 text-sm text-warm-700">
          <div>
            <dt className="inline font-medium text-accent">目标:</dt> <dd className="inline">{plan.metaAds.objective}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-accent">冷启动受众:</dt> <dd className="inline">{plan.metaAds.audience}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-accent">再营销:</dt> <dd className="inline">{plan.metaAds.retargeting}</dd>
          </div>
        </dl>
        <div className="mt-3 space-y-2 text-sm">
          {plan.metaAds.creativeDirections.map((c, i) => (
            <div key={i} className="border-l-2 border-warm-200 pl-3">
              <p className="font-medium text-accent">
                {c.format} —— 「{c.hook}」
              </p>
              <p className="text-warm-700">{c.outline}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="UTM 矩阵" subtitle={`utm_campaign:${naming.campaign} —— 按 docs/utm-conventions.md 用代码生成,不是模型编的。`}>
        {naming.notes.map((n, i) => (
          <p key={i} className={`text-sm ${n.includes('占位') ? 'font-medium text-red-700' : 'text-warm-600'}`}>
            {n}
          </p>
        ))}
        <ul className="mt-3 space-y-2">
          {naming.links.map((l) => (
            <li key={l.label} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-accent">{l.label}</span>
                <button
                  type="button"
                  onClick={() => copy(l.label, l.url)}
                  className="rounded bg-warm-100 px-2 py-0.5 text-xs text-accent transition hover:bg-warm-200"
                >
                  {copied === l.label ? '已复制' : '复制'}
                </button>
              </div>
              <code className="block break-all text-xs text-warm-700">{l.url}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="衡量指标">
        <ul className="space-y-1 text-sm">
          {plan.kpis.map((k, i) => (
            <li key={i}>
              <span className="font-medium text-accent">{k.metric}</span>
              <span className="text-warm-700">
                {' '}
                —— {k.target}(看 {k.source})
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
