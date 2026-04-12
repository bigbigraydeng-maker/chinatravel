/**
 * CTSTours 2026 Q2–Q3 数字营销统筹（Phase 1）
 * 更新方式：直接改本文件中的 status、备注与日期；部署后客户通过 /marketing/campaign 查看。
 */

export type TaskStatus = 'not_started' | 'in_progress' | 'review' | 'done' | 'blocked';

export type Priority = 'P0' | 'P1' | 'P2';

export interface MarketingTask {
  id: string;
  module: string;
  name: string;
  priority: Priority;
  startWeek: string;
  endWeek: string;
  status: TaskStatus;
  deliverable: string;
  notes?: string;
  /** On-site URLs for QA / client review (shown on campaign board “今日 W1”). */
  reviewLinks?: { label: string; href: string }[];
}

export interface KeyResult {
  id: string;
  title: string;
  metric?: string;
  aprilTarget?: string;
  status: TaskStatus;
}

export interface Objective {
  id: string;
  title: string;
  keyResults: KeyResult[];
}

export interface Milestone {
  id: string;
  week: string;
  name: string;
  description: string;
  output: string;
}

export interface PhaseBlock {
  phase: string;
  weeks: string;
  goal: string;
  keyResults: string[];
  acceptance: string[];
}

export const MARKETING_PLAN_META = {
  title: 'CTSTours 2026年10月双产品专属数字推广统筹（Phase 1）',
  /** 每次改完任务状态可顺手改日期，便于客户知道页面对应版本 */
  lastUpdated: '2026-04-13',
  /** 主推产品 */
  heroProducts: ['Beijing + Shanghai', 'Shanghai & Beyond'],
  /** 北极星时间锚（可按实际调整） */
  sprintNote:
    '本页仅服务于上述两个 10 月出发产品线的推广执行；目标 4 月底前有真实询盘进线（单人执行建议优先 P0：追踪 → 落地页 → Search）。',
};

/** Phase 1 第 1 周 = 该日所在周一（UTC 日历日，用于展示；与 NZ 本地日对齐时请按需要微调锚点）。 */
export const CAMPAIGN_W1_MONDAY_ISO = '2026-04-13';

function parseUtcDateOnly(isoDate: string): Date {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDaysUtc(d: Date, days: number): Date {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

function formatZhMd(d: Date): string {
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
}

/** 第 n 个战役周的周一（n 从 1 起）。 */
export function campaignWeekMonday(weekIndex1Based: number): Date {
  const anchor = parseUtcDateOnly(CAMPAIGN_W1_MONDAY_ISO);
  return addDaysUtc(anchor, (weekIndex1Based - 1) * 7);
}

/** W1 / W2 → 「4月13日–4月19日（周一至周日）」 */
export function weekTokenRangeLabel(weekToken: string): string {
  const m = /^W(\d+)$/i.exec(weekToken.trim());
  if (!m) return weekToken;
  const idx = parseInt(m[1], 10);
  if (idx < 1 || !Number.isFinite(idx)) return weekToken;
  const mon = campaignWeekMonday(idx);
  const sun = addDaysUtc(mon, 6);
  return `${formatZhMd(mon)}–${formatZhMd(sun)}（周一至周日）`;
}

/** Milestone / Phase 文案里的「Week 1」「Week 1–2」附加公历区间。 */
export function milestoneWeekLabel(weekLabel: string): string {
  const single = /^Week\s*(\d+)\s*$/i.exec(weekLabel.trim());
  if (single) {
    const idx = parseInt(single[1], 10);
    const mon = campaignWeekMonday(idx);
    const sun = addDaysUtc(mon, 6);
    return `${weekLabel}（${formatZhMd(mon)}–${formatZhMd(sun)}）`;
  }
  const range = /^Week\s*(\d+)\s*[–-]\s*(\d+)\s*$/i.exec(weekLabel.trim());
  if (range) {
    const a = parseInt(range[1], 10);
    const b = parseInt(range[2], 10);
    const monA = campaignWeekMonday(a);
    const sunB = addDaysUtc(campaignWeekMonday(b), 6);
    return `${weekLabel}（${formatZhMd(monA)}–${formatZhMd(sunB)}）`;
  }
  return weekLabel;
}

/** 内容「支点」：AI / 社媒 / 博客扩展前优先锁定的 canonical 页面。 */
export const CONTENT_PIVOT = {
  discoveryTours: [
    {
      label: 'A Tale of Two Cities（北京 · 西安 · 上海）',
      path: '/tours/china/discovery/beijing-shanghai',
    },
    { label: 'Shanghai & Beyond', path: '/tours/china/discovery/shanghai-beyond' },
  ],
  octoberCampaigns: [
    {
      label: 'October 2026 · Beijing & Xi’an spotlight',
      path: '/campaigns/october-2026/tale-of-two-cities',
    },
    {
      label: 'October 2026 · Shanghai & Surroundings',
      path: '/campaigns/october-2026/shanghai-surroundings',
    },
  ],
  /** 与你对齐的议题（下一版任务可拆细颗粒度）。 */
  discussionTopics: [
    'FAQ：当前产品页使用目的地级通用 5 问（getTourPageFaqs）；需按线路加厚、可接 tour 级字段或独立 FAQ 数据。',
    '地图：行程按日地图（坐标/城市点）；代码侧 Tour 页曾预留 ItineraryMap，需数据与交互方案。',
    'FB / INS + 博客：以支点页定 master brief，再拆每周/每日发帖与长文节奏（当前计划表颗粒度偏大，另表维护亦可）。',
    '图片：tours 图库 + 社媒裁切规格（9:16 / 1:1 等）与命名规范一并定稿。',
  ],
} as const;

/** 对照仓库现状的简要检查（非自动化，需随开发更新）。 */
export const EXECUTION_AUDIT: { area: string; status: TaskStatus; note: string }[] = [
  {
    area: '战役统筹页',
    status: 'done',
    note: '已部署 /marketing/campaign；全站入口 /marketing 预留。',
  },
  {
    area: 'GA4 基础收集',
    status: 'done',
    note: 'layout 挂载 GoogleAnalytics（Measurement ID 在组件内）；Ads/Meta 转化与自定义事件仍待 T013–T016。',
  },
  {
    area: '10 月 Discovery 战役着陆页',
    status: 'done',
    note: '/campaigns/october-2026/* 与上述 Discovery 产品页已联动。',
  },
  {
    area: '产品页 FAQ 深度',
    status: 'in_progress',
    note: '仍为通用 FAQ；加厚与结构化需单独排期（见讨论议题）。',
  },
  {
    area: 'thank-you / 主转化字典',
    status: 'not_started',
    note: '询盘 API 已有；独立 thank-you 与 Ads 转化字典未在仓库验收。',
  },
  {
    area: '战役产品页首屏 / 免签条 / CTA',
    status: 'done',
    note: 'beijing-shanghai、shanghai-beyond：shortDescription + meta；TourHero 十月线 CTA；ChinaVisaNudge 链至 /china-visa-guide-for-new-zealanders。',
  },
];

export const OBJECTIVES: Objective[] = [
  {
    id: 'O1',
    title: '完成两个主推产品的营销底座搭建',
    keyResults: [
      {
        id: 'KR1',
        title: '完成两个产品页的转化优化升级',
        metric: '询盘率、CTA 点击率、表单完成率',
        aprilTarget: '两页首轮优化上线',
        status: 'review',
      },
      {
        id: 'KR2',
        title: '完成 GA4、Google Ads、Meta Pixel、核心转化事件埋点',
        metric: 'DebugView / 测试转化通过',
        aprilTarget: '主转化可统计',
        status: 'in_progress',
      },
      {
        id: 'KR3',
        title: '完成 thank-you page、FAQ、CTA、信任模块优化',
        metric: '模块上线 + 可追踪互动',
        aprilTarget: 'thank-you + CTA + FAQ 最小集',
        status: 'not_started',
      },
      {
        id: 'KR4',
        title: '完成产品页广告可投放素材与文案基础包',
        metric: '每产品 ≥3 套角度 + 命名规范',
        aprilTarget: '各 3 套可投',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'O2',
    title: '建立可启动的广告获客系统',
    keyResults: [
      {
        id: 'KR1',
        title: 'Google Ads 完成 Search campaign 搭建并上线',
        metric: 'Campaign live + 有展示',
        aprilTarget: 'Search 上线并花出预算',
        status: 'not_started',
      },
      {
        id: 'KR2',
        title: 'Meta Ads 完成冷流量 + 再营销广告搭建并上线',
        metric: '两套结构 live',
        aprilTarget: '冷流量 + 简单再营销',
        status: 'not_started',
      },
      {
        id: 'KR3',
        title: '形成首批有效询盘数据',
        metric: '每周 enquiry / 有效定义先写死',
        aprilTarget: '4/30 前 ≥1–3 条可跟进',
        status: 'not_started',
      },
      {
        id: 'KR4',
        title: '完成广告数据复盘与第一轮优化',
        metric: '周报 1 页：浪费 / 机会',
        aprilTarget: '4/24–4/30 做 1 次',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'O3',
    title: '建立 SEO / GEO 内容增长基础设施',
    keyResults: [
      {
        id: 'KR1',
        title: '完成 6 篇围绕 10 月产品的 SEO 文章',
        metric: '上线 + 内链',
        aprilTarget: '至少 2 篇高意向（其余可顺延）',
        status: 'not_started',
      },
      {
        id: 'KR2',
        title: '完成产品页 FAQ 强化与结构化信息增强',
        status: 'not_started',
      },
      {
        id: 'KR3',
        title: '完成产品页与 supporting content 的内链结构',
        status: 'not_started',
      },
      {
        id: 'KR4',
        title: '让网站形成「产品页 + 内容页 + 再营销页」的增长闭环',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'O4',
    title: '建立 AI 驱动的内容生产与运营节奏',
    keyResults: [
      {
        id: 'KR1',
        title: '建立两个产品的 master brief',
        status: 'not_started',
      },
      {
        id: 'KR2',
        title: '形成 Facebook / Instagram / Google Ads / Email / SEO 的统一内容素材库',
        status: 'not_started',
      },
      {
        id: 'KR3',
        title: '建立每周固定内容产出机制',
        status: 'not_started',
      },
      {
        id: 'KR4',
        title: '完成第一版 AI 内容 SOP',
        aprilTarget: '可延后至 5 月',
        status: 'not_started',
      },
    ],
  },
];

export const MILESTONES: Milestone[] = [
  { id: 'M1', week: 'Week 1', name: '项目启动', description: '目标、产品定位、分工确认', output: '项目框架确认' },
  { id: 'M2', week: 'Week 2', name: '网站转化底座完成', description: '产品页优化、追踪、CTA/FAQ/thank-you', output: '网站具备投放条件' },
  { id: 'M3', week: 'Week 3', name: '广告系统上线', description: 'Google Search + Meta 冷流量 + 再营销', output: '开始获取流量与线索' },
  { id: 'M4', week: 'Week 4', name: 'SEO/GEO 内容首批上线', description: '6 篇 supporting content 并内链', output: '内容增长系统启动' },
  { id: 'M5', week: 'Week 5', name: '第一轮数据复盘', description: '汇总广告、页面、转化数据', output: '找到有效方向' },
  { id: 'M6', week: 'Week 6', name: '第二轮优化执行', description: '广告文案、素材、落地页', output: '提升询盘效率' },
  { id: 'M7', week: 'Week 7', name: '可复制 SOP 完成', description: 'AI 内容 SOP + 广告结构模板', output: '形成复制能力' },
  { id: 'M8', week: 'Week 8', name: 'Phase 1 总结', description: '阶段复盘与下一阶段建议', output: '进入扩张阶段' },
];

export const PHASES: PhaseBlock[] = [
  {
    phase: 'Phase 1：基础搭建期',
    weeks: 'Week 1–2',
    goal: '网站、追踪、信息结构、广告前置条件搭好。',
    keyResults: ['产品定位明确', '页面优化完成', '埋点完成', '广告结构确定', '素材开始准备'],
    acceptance: [
      '两个产品页首轮优化完成',
      '关键转化事件可追踪',
      'Google / Meta 账户结构已搭好',
      '6 篇内容选题已确认',
      'AI master brief 已完成',
    ],
  },
  {
    phase: 'Phase 2：上线启动期',
    weeks: 'Week 3–4',
    goal: '广告正式启动，内容正式上线。',
    keyResults: ['Google Search 上线', 'Meta 冷流量与再营销上线', '首批 supporting content 上线', '有第一批流量与询盘数据'],
    acceptance: ['广告正常跑量', '网站有稳定访问', '有初步线索数据', '数据看板可用'],
  },
  {
    phase: 'Phase 3：优化验证期',
    weeks: 'Week 5–6',
    goal: '找到更有效的转化组合。',
    keyResults: ['调整广告文案', '调整创意', '优化 CTA 与页面模块', '优化关键词与受众'],
    acceptance: ['CTR 提升', '询盘率提升', '冷流量与再营销逻辑更清晰', '停留与互动改善'],
  },
  {
    phase: 'Phase 4：放大复制期',
    weeks: 'Week 7–8',
    goal: '形成可复制 SOP，准备扩大更多产品。',
    keyResults: ['优胜广告结构', '优胜页面结构', '内容生产 SOP', '下一阶段模板'],
    acceptance: ['营销模板清晰', 'AI 内容模板', '页面优化模板', '每周运营节奏'],
  },
];

export const MARKETING_TASKS: MarketingTask[] = [
  {
    id: 'T001',
    module: '策略与项目管理',
    name: '明确两个产品定位与受众划分',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'in_progress',
    deliverable: '产品定位说明',
    notes: '口径需与你对齐后定稿。',
  },
  {
    id: 'T002',
    module: '策略与项目管理',
    name: '确定项目 KPI 与每周复盘机制',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'in_progress',
    deliverable: 'KPI 表 + 周报模板',
    notes: '可与 Obsidian 周记模板同步字段。',
  },
  {
    id: 'T003',
    module: '策略与项目管理',
    name: '建立项目总表与任务排期',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '项目管理表（本页）',
    notes: '/marketing/campaign',
    reviewLinks: [{ label: '本统筹页', href: '/marketing/campaign' }],
  },
  { id: 'T004', module: '策略与项目管理', name: '建立素材命名与文件管理规则', priority: 'P1', startWeek: 'W1', endWeek: 'W1', status: 'not_started', deliverable: '文件规范' },
  {
    id: 'T005',
    module: '网站优化',
    name: '两个产品页首屏文案增强',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '新 Hero 文案',
    notes: 'tours.ts shortDescription + metaDescription（十月/NZ/免签提示）。',
    reviewLinks: [
      { label: 'A Tale of Two Cities 产品页', href: '/tours/china/discovery/beijing-shanghai' },
      { label: 'Shanghai & Beyond 产品页', href: '/tours/china/discovery/shanghai-beyond' },
    ],
  },
  {
    id: 'T006',
    module: '网站优化',
    name: '增加免签信息模块',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '页面模块上线',
    notes: 'ChinaVisaNudge 组件，仅两条战役产品页；链至签证指南。',
    reviewLinks: [
      { label: 'NZ 中国签证指南（长文）', href: '/china-visa-guide-for-new-zealanders' },
      { label: '免签条 · Tale of Two Cities', href: '/tours/china/discovery/beijing-shanghai#visa-nudge' },
      { label: '免签条 · Shanghai & Beyond', href: '/tours/china/discovery/shanghai-beyond#visa-nudge' },
    ],
  },
  {
    id: 'T007',
    module: '网站优化',
    name: '优化 enquiry CTA 按钮',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: 'CTA 优化版',
    notes: 'TourHero primaryCtaLabel / secondaryCtaLabel 十月线专用文案。',
    reviewLinks: [
      { label: '首屏 CTA · Tale of Two Cities', href: '/tours/china/discovery/beijing-shanghai' },
      { label: '首屏 CTA · Shanghai & Beyond', href: '/tours/china/discovery/shanghai-beyond' },
    ],
  },
  {
    id: 'T008',
    module: '网站优化',
    name: 'FAQ 扩展为完整问答',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: 'FAQ 完整版',
    reviewLinks: [
      { label: 'FAQ · Tale of Two Cities', href: '/tours/china/discovery/beijing-shanghai#faq' },
      { label: 'FAQ · Shanghai & Beyond', href: '/tours/china/discovery/shanghai-beyond#faq' },
    ],
  },
  { id: 'T009', module: '网站优化', name: '增加 thank-you page', priority: 'P1', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: 'thank-you page' },
  { id: 'T010', module: '网站优化', name: '增加 trust signals 模块', priority: 'P2', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '信任模块' },
  { id: 'T011', module: '网站优化', name: '内链 supporting content 到产品页', priority: 'P1', startWeek: 'W2', endWeek: 'W4', status: 'not_started', deliverable: '内链结构' },
  {
    id: 'T012',
    module: '追踪与数据',
    name: '配置 GA4',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: 'GA4 正常采集',
    notes: '全站 gtag 已随 layout 加载；自定义事件与 Ads 转化见 T013/T016。',
    reviewLinks: [{ label: '首页（验证 gtag）', href: '/' }],
  },
  { id: 'T013', module: '追踪与数据', name: '配置 Google Ads conversion', priority: 'P0', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: '主转化事件' },
  { id: 'T014', module: '追踪与数据', name: '配置 Meta Pixel', priority: 'P0', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: 'Pixel 安装完成' },
  { id: 'T015', module: '追踪与数据', name: '配置 Meta Conversions API', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: 'CAPI 完成' },
  { id: 'T016', module: '追踪与数据', name: '设定主/辅转化事件', priority: 'P0', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: '转化字典' },
  { id: 'T017', module: '追踪与数据', name: '建立每周数据看板', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: 'Dashboard' },
  {
    id: 'T018',
    module: 'Google Ads',
    name: '梳理关键词结构',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '关键词清单',
    reviewLinks: [
      { label: 'China tours 商业枢纽', href: '/china-tours' },
      { label: 'NZ 出发专题', href: '/china-tours-from-new-zealand' },
    ],
  },
  { id: 'T019', module: 'Google Ads', name: '搭建 Brand campaign', priority: 'P0', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '品牌词广告' },
  { id: 'T020', module: 'Google Ads', name: '搭建 China tours generic campaign', priority: 'P0', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '泛词搜索广告' },
  { id: 'T021', module: 'Google Ads', name: '搭建 Beijing / Xi’an campaign', priority: 'P0', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '产品专属 campaign' },
  { id: 'T022', module: 'Google Ads', name: '搭建 Shanghai campaign', priority: 'P0', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '产品专属 campaign' },
  { id: 'T023', module: 'Google Ads', name: '编写 ads copy 3 套角度', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '文案包' },
  { id: 'T024', module: 'Google Ads', name: '广告上线', priority: 'P0', startWeek: 'W3', endWeek: 'W3', status: 'not_started', deliverable: '广告正式启动' },
  { id: 'T025', module: 'Google Ads', name: '首轮优化', priority: 'P1', startWeek: 'W4', endWeek: 'W5', status: 'not_started', deliverable: '优化报告' },
  { id: 'T026', module: 'Meta Ads', name: '明确冷流量视频方向', priority: 'P0', startWeek: 'W1', endWeek: 'W1', status: 'not_started', deliverable: '创意 brief' },
  { id: 'T027', module: 'Meta Ads', name: '整理图片/短视频素材', priority: 'P0', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: '素材库' },
  { id: 'T028', module: 'Meta Ads', name: '编写 FB/IG 广告文案', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '广告文案包' },
  { id: 'T029', module: 'Meta Ads', name: '搭建冷流量 campaign', priority: 'P0', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: '冷流量广告' },
  { id: 'T030', module: 'Meta Ads', name: '搭建 Lead Ads', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: '表单广告' },
  { id: 'T031', module: 'Meta Ads', name: '搭建再营销广告', priority: 'P0', startWeek: 'W3', endWeek: 'W3', status: 'not_started', deliverable: 'remarketing campaign' },
  { id: 'T032', module: 'Meta Ads', name: '上线并观察首轮数据', priority: 'P0', startWeek: 'W3', endWeek: 'W4', status: 'not_started', deliverable: '广告表现数据' },
  { id: 'T033', module: 'Meta Ads', name: '创意优化', priority: 'P1', startWeek: 'W5', endWeek: 'W6', status: 'not_started', deliverable: '第二轮素材与文案' },
  {
    id: 'T034',
    module: 'SEO / GEO',
    name: '建立内容关键词与主题结构',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'not_started',
    deliverable: '内容规划表',
    reviewLinks: [
      { label: '内容支点 · china-tours', href: '/china-tours' },
      { label: '最佳旅行时间', href: '/best-time-to-visit-china' },
    ],
  },
  {
    id: 'T035',
    module: 'SEO / GEO',
    name: '文章 1：China visa-free for NZ in 2026',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'review',
    deliverable: '博客 1',
    notes: '站内已有 /china-visa-guide-for-new-zealanders；需定：新文合并、内链或差异化角度。',
    reviewLinks: [{ label: '现有签证指南页', href: '/china-visa-guide-for-new-zealanders' }],
  },
  { id: 'T036', module: 'SEO / GEO', name: '文章 2：Best first trip — Beijing or Shanghai', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: '博客 2' },
  { id: 'T037', module: 'SEO / GEO', name: '文章 3：Is October a good time to visit China', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: '博客 3' },
  { id: 'T038', module: 'SEO / GEO', name: '文章 4：What is included in a guided China tour', priority: 'P2', startWeek: 'W3', endWeek: 'W3', status: 'not_started', deliverable: '博客 4' },
  { id: 'T039', module: 'SEO / GEO', name: '文章 5：Shanghai & surroundings guide', priority: 'P2', startWeek: 'W3', endWeek: 'W4', status: 'not_started', deliverable: '博客 5' },
  { id: 'T040', module: 'SEO / GEO', name: '文章 6：Beijing / Xi’an first-timer guide', priority: 'P2', startWeek: 'W3', endWeek: 'W4', status: 'not_started', deliverable: '博客 6' },
  { id: 'T041', module: 'SEO / GEO', name: '完成内链布局', priority: 'P1', startWeek: 'W4', endWeek: 'W4', status: 'not_started', deliverable: '内链上线' },
  {
    id: 'T042',
    module: 'SEO / GEO',
    name: '产品页 meta / title / description 优化',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '页面 SEO 基础优化',
    reviewLinks: [
      { label: 'Tale of Two Cities', href: '/tours/china/discovery/beijing-shanghai' },
      { label: 'Shanghai & Beyond', href: '/tours/china/discovery/shanghai-beyond' },
    ],
  },
  {
    id: 'T043',
    module: 'AI 内容系统',
    name: '建立 Beijing / Xi’an master brief',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'not_started',
    deliverable: '主档案',
    reviewLinks: [
      { label: '产品页', href: '/tours/china/discovery/beijing-shanghai' },
      { label: 'October 战役页', href: '/campaigns/october-2026/tale-of-two-cities' },
    ],
  },
  {
    id: 'T044',
    module: 'AI 内容系统',
    name: '建立 Shanghai master brief',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'not_started',
    deliverable: '主档案',
    reviewLinks: [
      { label: '产品页', href: '/tours/china/discovery/shanghai-beyond' },
      { label: 'October 战役页', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  { id: 'T045', module: 'AI 内容系统', name: '输出 Facebook 内容模板', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: 'FB 模板' },
  { id: 'T046', module: 'AI 内容系统', name: '输出 Instagram caption 模板', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: 'IG 模板' },
  { id: 'T047', module: 'AI 内容系统', name: '输出 Google Ads copy 模板', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: 'Ads 模板' },
  { id: 'T048', module: 'AI 内容系统', name: '输出 remarketing 文案模板', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: 'RMKT 模板' },
  { id: 'T049', module: 'AI 内容系统', name: '输出 EDM 模板', priority: 'P2', startWeek: 'W3', endWeek: 'W3', status: 'not_started', deliverable: '邮件模板' },
  { id: 'T050', module: 'AI 内容系统', name: '输出 AI 内容 SOP', priority: 'P2', startWeek: 'W6', endWeek: 'W7', status: 'not_started', deliverable: 'SOP 文档' },
];

const PRIORITY_SORT: Record<Priority, number> = { P0: 0, P1: 1, P2: 2 };

/** Tasks whose `startWeek` equals the token (e.g. W1), sorted P0 → P2 then by id — for “today’s backlog” on the campaign board. */
export function marketingTasksStartingInWeek(weekToken: string): MarketingTask[] {
  return [...MARKETING_TASKS]
    .filter(t => t.startWeek === weekToken)
    .sort((a, b) => {
      const d = PRIORITY_SORT[a.priority] - PRIORITY_SORT[b.priority];
      if (d !== 0) return d;
      return a.id.localeCompare(b.id);
    });
}

export const KPI_GROUPS: { title: string; items: string[] }[] = [
  {
    title: '核心业务 KPI',
    items: ['enquiry 数量', 'qualified lead 数量', '每周询盘增长率', '每条线索成本', '每个产品页转化率'],
  },
  {
    title: '广告 KPI',
    items: ['CTR', 'CPC', 'CPM', 'Landing page view', 'Lead cost', '再营销转化率'],
  },
  {
    title: '网站 KPI',
    items: ['页面访问量', '停留时长', 'scroll depth', 'FAQ interaction', 'CTA click rate', 'form completion rate'],
  },
  {
    title: 'SEO / GEO KPI',
    items: ['文章收录数量', 'impressions', 'organic clicks', '长尾关键词覆盖', '产品页 organic landing sessions'],
  },
];

export const WEEKLY_CHECKLIST: string[] = [
  '哪个产品页流量最多',
  '哪个广告素材点击率最高',
  '哪个关键词带来最有效流量',
  '哪个页面模块影响转化',
  '本周 AI 内容产出是否达标',
];

const STATUS_LABEL: Record<TaskStatus, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  review: '复核',
  done: '完成',
  blocked: '阻塞',
};

export function taskStatusLabel(status: TaskStatus): string {
  return STATUS_LABEL[status];
}

export function statusBadgeClass(status: TaskStatus): string {
  switch (status) {
    case 'done':
      return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    case 'in_progress':
      return 'bg-amber-100 text-amber-900 border-amber-200';
    case 'review':
      return 'bg-violet-100 text-violet-900 border-violet-200';
    case 'blocked':
      return 'bg-red-100 text-red-900 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function priorityClass(p: Priority): string {
  if (p === 'P0') return 'bg-primary/10 text-primary border-primary/20';
  if (p === 'P1') return 'bg-warm-100 text-accent border-warm-200';
  return 'bg-warm-50 text-gray-600 border-warm-200';
}
