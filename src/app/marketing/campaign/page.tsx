import type { Metadata } from 'next';
import Link from 'next/link';
import { marketingPlanAccessKey } from '@/lib/auth/marketing-plan-session';
import TodayW1Panel from './TodayW1Panel';
import {
  CAMPAIGN_W1_MONDAY_ISO,
  CONTENT_PIVOT,
  EXECUTION_AUDIT,
  KPI_GROUPS,
  MARKETING_PLAN_META,
  MARKETING_TASKS,
  MILESTONES,
  OBJECTIVES,
  PHASES,
  WEEKLY_CHECKLIST,
  milestoneWeekLabel,
  marketingTasksStartingInWeek,
  priorityClass,
  statusBadgeClass,
  taskStatusLabel,
  weekTokenRangeLabel,
  type MarketingTask,
  type Milestone,
  type TaskStatus,
} from '@/lib/data/marketing-plan-2026';

export const metadata: Metadata = {
  title: 'October 2026 dual-product campaign plan | CTS Tours',
  description:
    'Password-protected board: Beijing & Xi’an (A Tale of Two Cities) and Shanghai & Surroundings — OKRs, milestones, tasks.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'CTS Tours — October 2026 campaign dashboard',
    description:
      'Internal OKR and task board for October 2026: Beijing & Xi’an (A Tale of Two Cities) and Shanghai & Surroundings.',
    type: 'website',
  },
};

const MODULE_ORDER = [
  '策略与项目管理',
  '网站优化',
  '追踪与数据',
  'Google Ads',
  'Meta Ads',
  'SEO / GEO',
  'AI 内容系统',
  /** T051–T053：图库 Unsplash + 裁切 + 署名；放在表末便于在 T050 后连续查看 */
  '图库与社媒素材',
];

/** Stable fragment IDs for the task table (scroll / deep-link). */
function moduleTasksAnchorId(module: string): string {
  const map: Record<string, string> = {
    策略与项目管理: 'strategy',
    网站优化: 'site',
    追踪与数据: 'tracking',
    'Google Ads': 'google-ads',
    'Meta Ads': 'meta',
    'SEO / GEO': 'seo',
    'AI 内容系统': 'ai',
    图库与社媒素材: 'gallery-social',
  };
  return `tasks-mod-${map[module] ?? 'other'}`;
}

type CampaignNavItem =
  | { kind: 'hash'; href: string; label: string }
  | { kind: 'route'; href: string; label: string };

const campaignNavItems: CampaignNavItem[] = [
  { kind: 'hash', href: '#today', label: '今日 W1' },
  { kind: 'hash', href: '#overview', label: '总览' },
  { kind: 'hash', href: '#pivot', label: '内容支点' },
  { kind: 'hash', href: '#audit', label: '对照检查' },
  { kind: 'hash', href: '#okr', label: 'OKR' },
  { kind: 'hash', href: '#milestones', label: '里程碑' },
  { kind: 'route', href: '/campaign/social', label: '社媒发帖' },
  { kind: 'hash', href: '#tasks', label: '任务表' },
  { kind: 'hash', href: '#phases', label: '阶段' },
  { kind: 'hash', href: '#kpi', label: 'KPI' },
  { kind: 'hash', href: '#weekly', label: '周节奏' },
];

function groupTasksByModule(tasks: MarketingTask[]): Map<string, MarketingTask[]> {
  const map = new Map<string, MarketingTask[]>();
  for (const t of tasks) {
    const list = map.get(t.module) ?? [];
    list.push(t);
    map.set(t.module, list);
  }
  return map;
}

function krStatusClass(status: TaskStatus): string {
  return statusBadgeClass(status);
}

function MilestoneCardsMobile({ items }: { items: Milestone[] }) {
  return (
    <ul className="space-y-3 md:hidden" role="list">
      {items.map(m => (
        <li key={m.id} className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-accent">
              {m.id} {m.name}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600">{milestoneWeekLabel(m.week)}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{m.description}</p>
          <p className="mt-3 border-t border-warm-100 pt-2 text-sm text-gray-800">
            <span className="font-medium text-gray-500">输出：</span>
            {m.output}
          </p>
        </li>
      ))}
    </ul>
  );
}

function MilestoneTableDesktop({ items }: { items: Milestone[] }) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-warm-200 bg-white shadow-soft">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-warm-100/80 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">节点</th>
            <th className="px-4 py-3 font-semibold">时间</th>
            <th className="px-4 py-3 font-semibold">说明</th>
            <th className="px-4 py-3 font-semibold">输出</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-warm-100">
          {items.map(m => (
            <tr key={m.id} className="hover:bg-warm-50/80">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-accent">
                {m.id} {m.name}
              </td>
              <td className="min-w-[10rem] px-4 py-3 text-sm text-gray-700">{milestoneWeekLabel(m.week)}</td>
              <td className="px-4 py-3 text-gray-700">{m.description}</td>
              <td className="px-4 py-3 text-gray-700">{m.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaskCardsMobile({ rows }: { rows: MarketingTask[] }) {
  return (
    <ul className="space-y-3 md:hidden" role="list">
      {rows.map(t => (
        <li key={t.id} className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-gray-500">{t.id}</span>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityClass(t.priority)}`}
              >
                {t.priority}
              </span>
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(t.status)}`}
              >
                {taskStatusLabel(t.status)}
              </span>
            </div>
          </div>
          <p className="mt-2 text-base font-medium leading-snug text-gray-900">{t.name}</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">开始</dt>
              <dd className="mt-0.5 text-accent">
                <span className="font-semibold">{t.startWeek}</span>
                <span className="mt-0.5 block text-xs font-normal leading-snug text-gray-500">
                  {weekTokenRangeLabel(t.startWeek)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">截止</dt>
              <dd className="mt-0.5 text-accent">
                <span className="font-semibold">{t.endWeek}</span>
                <span className="mt-0.5 block text-xs font-normal leading-snug text-gray-500">
                  {weekTokenRangeLabel(t.endWeek)}
                </span>
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">交付物</dt>
              <dd className="mt-0.5 leading-relaxed text-gray-800">
                {t.deliverable}
                {t.notes ? (
                  <span className="mt-1 block text-xs text-gray-500">
                    <span className="font-medium text-gray-600">备注：</span>
                    {t.notes}
                  </span>
                ) : null}
                {t.reviewLinks?.length ? (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {t.reviewLinks.map(link => (
                      <Link
                        key={`${t.id}-${link.href}-${link.label}`}
                        href={link.href}
                        className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function TaskTableDesktop({ rows }: { rows: MarketingTask[] }) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-warm-200 bg-white shadow-soft">
      <table className="min-w-[44rem] w-full text-left text-sm">
        <thead className="bg-warm-100/80 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="whitespace-nowrap px-3 py-2 font-semibold">ID</th>
            <th className="min-w-[12rem] px-3 py-2 font-semibold">任务</th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold">优先级</th>
            <th className="min-w-[7.5rem] px-3 py-2 font-semibold">开始</th>
            <th className="min-w-[7.5rem] px-3 py-2 font-semibold">截止</th>
            <th className="whitespace-nowrap px-3 py-2 font-semibold">状态</th>
            <th className="min-w-[10rem] px-3 py-2 font-semibold">交付物</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-warm-100">
          {rows.map(t => (
            <tr key={t.id} className="hover:bg-warm-50/80">
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-gray-500">{t.id}</td>
              <td className="px-3 py-2 align-top text-gray-800">{t.name}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityClass(t.priority)}`}
                >
                  {t.priority}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-gray-600">
                <span className="font-medium text-accent">{t.startWeek}</span>
                <span className="mt-0.5 block max-w-[11rem] text-xs leading-snug text-gray-500">
                  {weekTokenRangeLabel(t.startWeek)}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-gray-600">
                <span className="font-medium text-accent">{t.endWeek}</span>
                <span className="mt-0.5 block max-w-[11rem] text-xs leading-snug text-gray-500">
                  {weekTokenRangeLabel(t.endWeek)}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-2 align-top">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(t.status)}`}
                >
                  {taskStatusLabel(t.status)}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-gray-700">
                {t.deliverable}
                {t.notes ? (
                  <span className="mt-1 block text-xs text-gray-500">
                    <span className="font-medium text-gray-600">备注：</span>
                    {t.notes}
                  </span>
                ) : null}
                {t.reviewLinks?.length ? (
                  <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                    {t.reviewLinks.map(link => (
                      <Link
                        key={`${t.id}-${link.href}-${link.label}`}
                        href={link.href}
                        className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MarketingPlanPage() {
  const passwordGateEnabled = Boolean(marketingPlanAccessKey());
  const w1StartingTasks = marketingTasksStartingInWeek('W1');
  const byModule = groupTasksByModule(MARKETING_TASKS);
  const counts = MARKETING_TASKS.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<TaskStatus, number>>
  );

  return (
    <main className="min-h-screen bg-warm-50 text-accent print:bg-white">
      <div className="border-b border-warm-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · 十月战役统筹（非全站）</p>
            <h1 className="font-serif text-xl font-semibold text-accent sm:text-2xl">{MARKETING_PLAN_META.title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              数据版本：<span className="font-medium">{MARKETING_PLAN_META.lastUpdated}</span>
              {' · '}
              <Link href="/" className="text-primary underline-offset-2 hover:underline">
                返回网站首页
              </Link>
              {' · '}
              <Link href="/marketing" className="text-primary underline-offset-2 hover:underline">
                全站营销入口
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <div className="flex flex-wrap justify-end gap-2 text-xs">
              <span className="rounded-full border border-warm-200 bg-warm-50 px-3 py-1 text-gray-700">
                主推：{MARKETING_PLAN_META.heroProducts.join(' · ')}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900">
                完成 {counts.done ?? 0} / {MARKETING_TASKS.length}
              </span>
            </div>
            {passwordGateEnabled && (
              <form action="/api/marketing/campaign-logout" method="POST" className="text-right">
                <button
                  type="submit"
                  className="text-xs font-medium text-gray-500 underline-offset-2 hover:text-accent hover:underline"
                >
                  退出登录
                </button>
              </form>
            )}
          </div>
        </div>
        <nav
          className="mx-auto flex max-w-6xl flex-wrap gap-2 border-t border-warm-100 px-4 py-2 text-sm print:hidden"
          aria-label="页面内导航"
        >
          {campaignNavItems.map(item =>
            item.kind === 'route' ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-1 text-gray-600 hover:border-warm-200 hover:bg-warm-50 hover:text-accent"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-1 text-gray-600 hover:border-warm-200 hover:bg-warm-50 hover:text-accent"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
        <TodayW1Panel
          tasks={w1StartingTasks}
          weekRangeLabel={weekTokenRangeLabel('W1')}
          anchorIso={CAMPAIGN_W1_MONDAY_ISO}
        />

        <section id="overview" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl font-semibold text-accent">项目总目标</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            在 2026 年 4–7 月完成针对新西兰市场的第一阶段数字营销系统搭建，围绕{' '}
            <strong>10 月出发</strong> 的两个核心产品（{MARKETING_PLAN_META.heroProducts.join('、')}），建立可持续运转的：网站转化、
            <strong>Google Search</strong> 首波投放与测量、SEO/GEO 内容（含 NZ visa-free / China specialist 两簇）、AI
            内容生产、线索收集与优化；<strong>Meta 付费为 Phase 1b</strong>，不阻塞 4 月 Search 与主转化字典。
          </p>
          <p className="mt-3 font-medium text-primary">{MARKETING_PLAN_META.sprintNote}</p>
          <p className="mt-2 text-sm text-gray-600">
            Obsidian 项目路径：
            <span className="ml-1 rounded bg-warm-100 px-1.5 py-0.5 font-mono text-gray-800">
              {MARKETING_PLAN_META.obsidianProjectPath}
            </span>
            （长文案 / 周柱与本页双轨）
          </p>
          <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-4 text-sm text-accent">
            <p className="font-semibold text-accent">社媒发帖计划（战役内）</p>
            <p className="mt-1 text-gray-700">
              短链收藏：<Link href="/campaign/social" className="font-mono text-primary underline-offset-2 hover:underline">/campaign/social</Link>
              （308 跳转至发帖表，与密码门一致）。
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 print:border-gray-300 print:bg-gray-50">
            <strong>客户查看说明：</strong>
            本页通过固定链接分享即可远程查看；已设置不收录（noindex），适合作为进度同步页面，请勿在公开渠道当广告落地页传播。
            {passwordGateEnabled && (
              <>
                {' '}
                当前已启用<strong>密码访问</strong>：请把链接与访问密码分开发送给对方（例如短信与邮件各一半）。
              </>
            )}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            周次说明：<strong>W1</strong> 对应周一为 <code className="rounded bg-warm-100 px-1">{CAMPAIGN_W1_MONDAY_ISO}</code>
            （可在数据文件中修改 <code className="rounded bg-warm-100 px-1">CAMPAIGN_W1_MONDAY_ISO</code>）；每列为周一至周日。
          </p>
        </section>

        <section id="pivot" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl font-semibold text-accent">内容支点（canonical）</h2>
          <p className="mt-2 text-sm text-gray-600">
            以下页面作为 AI 扩展、社媒与博客的「事实源」。有机发帖排期见{' '}
            <Link href="/campaign/social" className="font-medium text-primary underline-offset-2 hover:underline">
              社媒发帖计划（短链 /campaign/social）
            </Link>
            ；亦可与 Obsidian / Sheet 双轨维护。
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Discovery 产品页</h3>
              <ul className="mt-2 space-y-2">
                {CONTENT_PIVOT.discoveryTours.map(item => (
                  <li key={item.path}>
                    <Link href={item.path} className="font-medium text-primary underline-offset-2 hover:underline">
                      {item.label}
                    </Link>
                    <code className="mt-0.5 block text-xs text-gray-500">{item.path}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">October 2026 战役页</h3>
              <ul className="mt-2 space-y-2">
                {CONTENT_PIVOT.octoberCampaigns.map(item => (
                  <li key={item.path}>
                    <Link href={item.path} className="font-medium text-primary underline-offset-2 hover:underline">
                      {item.label}
                    </Link>
                    <code className="mt-0.5 block text-xs text-gray-500">{item.path}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-warm-100 bg-warm-50/60 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">全站 SEO 词簇（4 月优先）</h3>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              {CONTENT_PIVOT.siteWideSeoThemes.map(item => (
                <li key={item.primaryPath}>
                  <div className="font-medium text-accent">{item.theme}</div>
                  <div className="mt-1">
                    主 URL：
                    <Link href={item.primaryPath} className="ml-1 font-medium text-primary underline-offset-2 hover:underline">
                      {item.primaryPath}
                    </Link>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">{item.supportingNotes}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 border-t border-warm-100 pt-4">
            <h3 className="text-sm font-semibold text-accent">待与你对齐的扩展项</h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-gray-700">
              {CONTENT_PIVOT.discussionTopics.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="audit" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl font-semibold text-accent">对照检查（仓库现状）</h2>
          <p className="mt-2 text-sm text-gray-600">
            人工快照，随开发更新；状态与任务表中的 <code className="rounded bg-warm-100 px-1">status</code> 可交叉核对。
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-warm-100">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-warm-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-3 py-2 font-semibold">领域</th>
                  <th className="px-3 py-2 font-semibold">状态</th>
                  <th className="px-3 py-2 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                {EXECUTION_AUDIT.map((row, i) => (
                  <tr key={i} className="hover:bg-warm-50/60">
                    <td className="px-3 py-2 font-medium text-accent">{row.area}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(row.status)}`}
                      >
                        {taskStatusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="okr" className="scroll-mt-28">
          <h2 className="font-serif text-2xl font-semibold text-accent">OKR 跟进</h2>
          <p className="mt-2 text-sm text-gray-600">
            在 <code className="rounded bg-warm-100 px-1">src/lib/data/marketing-plan-2026.ts</code> 中更新每条 KR 的{' '}
            <code className="rounded bg-warm-100 px-1">status</code> 与说明。
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {OBJECTIVES.map(obj => (
              <article
                key={obj.id}
                className="flex flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-accent">
                    {obj.id}：{obj.title}
                  </h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  {obj.keyResults.map(kr => (
                    <li key={kr.id} className="rounded-xl border border-warm-100 bg-warm-50/60 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {obj.id}-{kr.id} {kr.title}
                        </span>
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${krStatusClass(kr.status)}`}
                        >
                          {taskStatusLabel(kr.status)}
                        </span>
                      </div>
                      {kr.metric && <p className="mt-1 text-gray-600">衡量：{kr.metric}</p>}
                      {kr.aprilTarget && (
                        <p className="mt-1 text-primary/90">
                          <span className="font-medium">4 月冲刺：</span>
                          {kr.aprilTarget}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="milestones" className="scroll-mt-28">
          <h2 className="font-serif text-2xl font-semibold text-accent">Milestone 总表</h2>
          <div className="mt-4 space-y-3">
            <MilestoneCardsMobile items={MILESTONES} />
            <MilestoneTableDesktop items={MILESTONES} />
          </div>
        </section>

        <section id="tasks" className="scroll-mt-28">
          <h2 className="font-serif text-2xl font-semibold text-accent">核心任务表</h2>
          <p className="mt-2 text-sm text-gray-600">
            状态枚举：<strong>未开始</strong> · <strong>进行中</strong> · <strong>复核</strong> · <strong>完成</strong> ·{' '}
            <strong>阻塞</strong> — 与数据文件中的英文 key 对应。
          </p>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <strong>T051–T053 在哪？</strong>已单独放在任务表最末模块「<strong>图库与社媒素材</strong>」（接在「AI 内容系统」T050 之后）。「今日 W1」仍只显示{' '}
            <code className="rounded bg-white/80 px-1">startWeek = W1</code> 的任务，故不含 T051。含 <strong>复核链接</strong> 的行在「交付物」列下方（如 T051 的
            Gallery）。
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-600">跳转模块：</span>
            {MODULE_ORDER.map(module => {
              const rows = byModule.get(module);
              if (!rows?.length) return null;
              return (
                <a
                  key={module}
                  href={`#${moduleTasksAnchorId(module)}`}
                  className="rounded-full border border-warm-200 bg-white px-3 py-1 text-gray-700 hover:border-primary/30 hover:text-primary"
                >
                  {module}
                </a>
              );
            })}
            <Link
              href="/campaign/social"
              className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-medium text-primary hover:bg-primary/10"
            >
              社媒发帖计划 →
            </Link>
          </div>

          <div className="mt-6 space-y-10">
            {MODULE_ORDER.map(module => {
              const rows = byModule.get(module);
              if (!rows?.length) return null;
              return (
                <div key={module}>
                  <h3 id={moduleTasksAnchorId(module)} className="scroll-mt-28 font-serif text-lg font-semibold text-accent">
                    {module}
                  </h3>
                  <div className="mt-3 space-y-3">
                    <TaskCardsMobile rows={rows} />
                    <TaskTableDesktop rows={rows} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="phases" className="scroll-mt-28">
          <h2 className="font-serif text-2xl font-semibold text-accent">阶段划分与验收</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {PHASES.map(p => (
              <article key={p.phase} className="rounded-2xl border border-warm-200 bg-white p-5 shadow-soft">
                <h3 className="font-serif text-lg font-semibold text-primary">{p.phase}</h3>
                <p className="mt-1 text-sm text-gray-500">{milestoneWeekLabel(p.weeks)}</p>
                <p className="mt-3 text-gray-800">{p.goal}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">关键结果</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    {p.keyResults.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">验收标准</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    {p.acceptance.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="kpi" className="scroll-mt-28">
          <h2 className="font-serif text-2xl font-semibold text-accent">KPI 建议（跟踪用）</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {KPI_GROUPS.map(group => (
              <div key={group.title} className="rounded-2xl border border-warm-200 bg-white p-5 shadow-soft">
                <h3 className="font-serif text-base font-semibold text-accent">{group.title}</h3>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">
                  {group.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="weekly" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl font-semibold text-accent">每周固定检查（5 件事）</h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-gray-800">
            {WEEKLY_CHECKLIST.map((item, i) => (
              <li key={i} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <footer className="border-t border-warm-200 pb-8 pt-6 text-center text-xs text-gray-500 print:pt-2">
          CTS Tours · Phase 1 数字营销统筹 · 仅作进度同步 · {MARKETING_PLAN_META.lastUpdated}
        </footer>
      </div>
    </main>
  );
}
