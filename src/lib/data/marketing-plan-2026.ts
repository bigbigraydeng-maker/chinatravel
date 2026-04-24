/**
 * CTSTours 2026 Q2–Q3 数字营销统筹（Phase 1）
 * 更新方式：直接改本文件中的 status、备注与日期；部署后客户通过 /marketing/campaign 查看。
 */

export {
  CTS_SITE_ORIGIN,
  OCTOBER_2026_FACEBOOK_ORGANIC_SURFACE_URLS,
  OCTOBER_2026_META_FACEBOOK_SURFACE_URLS,
} from '@/lib/campaigns/october-2026-discovery';

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
  lastUpdated: '2026-04-19',
  /** 最近一次与本文件同步的网站改动（便于客户对照）；与 git 可略有先后。 */
  lastSiteSyncNote:
    'October 双战役 LP：统筹页「广告链接」#ad-urls 汇总 Google（Search RSA / PMax）与 Meta 付费 FB 分面 UTM；「内容支点」保留 Facebook 双表与有机发帖。NZ Herald 平面：T058–T060。4 月下旬起：FB/INS 有机内容采用 Claude Cowork（图文提示词 + 英文 caption）→ LoveArt 出图 → Buffer 排期；口径以 T043/T044 master brief 与 T026 为准，任务 T061。',
  /** 主推产品 */
  heroProducts: ['Beijing & Xi’an — A Tale of Two Cities', 'Shanghai & Surroundings'],
  /**
   * Obsidian 项目目录（库内相对路径；与仓库本文件双轨）。
   * 长文案、四周柱、素材清单放此目录；验收链接仍以本站为准。
   */
  obsidianProjectPath: '01-Magiclab/Projects/China Travel',
  /** 北极星时间锚（可按实际调整） */
  sprintNote:
    '4 月阶段重心：SEO + 两产品落地 + 数据监控（GA4 / Google Ads 转化）+ 内容支点；全站优先两簇英文意图（NZ China visa free、China specialist）内链到签证指南与 china-tours / About。首波付费 = Google Search 小预算验证；Meta 冷流量与再营销为 Phase 1b，待 Search 与主转化字典跑通后再开，避免并行内耗。目标 4 月底前有真实询盘进线。',
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
      label: 'A Tale of Two Cities（北京 · 西安；无上海）',
      path: '/tours/china/discovery/beijing-xian',
    },
    { label: 'Shanghai & Surroundings', path: '/tours/china/discovery/shanghai-surroundings' },
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
  /** 全站 SEO 优先词簇：各簇 1 个主 URL + 辅链，避免站内多页抢同一意图。 */
  siteWideSeoThemes: [
    {
      theme: 'NZ / China visa-free（政策检索 + 行动）',
      primaryPath: '/china-visa-guide-for-new-zealanders',
      supportingNotes:
        '产品页 ChinaVisaNudge → 指南；T035 已定稿：以 /china-visa-guide-for-new-zealanders 为主承载，含 October 双 CTA 与内链/FAQ 强化。',
    },
    {
      theme: 'China specialist / NZ China tours（信任 + 商业）',
      primaryPath: '/china-tours',
      supportingNotes:
        'About、NZ 出发专题、双 Discovery 产品页互链；标题与首屏证据导向（TAANZ、年限、服务范围），执行见 T054。',
    },
  ],
  /** 与你对齐的议题（下一版任务可拆细颗粒度）。 */
  discussionTopics: [
    'FAQ：十月双 Discovery（beijing-xian、shanghai-surroundings）已用 tours.ts `faqs` 线路问答；其余产品仍默认目的地级 5 问（getTourPageFaqs），可按需补 `faqs`。',
    '地图：产品页已上线「Map view / Detailed view」示意路线图（由标题/住宿文本推断城市；非精确地理底图）。若需真地图或坐标级精度，再排期。',
    'FB / INS + 博客：以支点页定 master brief；有机发帖排期见 /campaign/social（可与 Obsidian 四周模板双轨）。生产栈：Claude Cowork（提示词 + 英文稿统筹）→ LoveArt（版式与视觉）→ Buffer（定时）；见 T061。',
    '社媒英文稿与长文案：先在 Obsidian「01-Magiclab/Projects/China Travel」锁「内容方向 + 四周柱」，再按槽位生成；与本页 tasks 双轨验收。',
    '图片：Unsplash 选图 → 写入 tours.ts `gallery`（产品页 #gallery）；同一批源图导出社媒裁切（9:16 / 4:5 / 1:1）与命名、署名存档（与 T004 / T051–T053 对齐）。',
    '外链与客座、社媒 KOC：少而精；执行顺序与 pitch 角度见仓库 `docs/outreach-guest-posts-and-backlinks.md`；战役任务 **T055–T057**（客座清单 → 首轮 pitch → KOC 试点 brief）。客座/编辑推荐落地用干净 URL；付费或 KOC 合作帖须披露（如 #ad）。',
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
    note: 'layout 挂载 GoogleAnalytics（Measurement ID 在组件内）；Google Ads 转化与主转化字典仍待 T013/T016；Meta Pixel 顺延 Phase 1b（T014）。',
  },
  {
    area: 'Obsidian 与统筹双轨',
    status: 'done',
    note: '项目路径已写入 MARKETING_PLAN_META.obsidianProjectPath；长文案与周柱在库内维护，进度以本页为准。',
  },
  {
    area: '10 月 Discovery 战役着陆页',
    status: 'done',
    note: '/campaigns/october-2026/* 与 tours 数据联动；已与标准产品页同步 Hero 十月 CTA、免签条、TrustBar、TourTrustSignals、Plan your trip；战役长文案取消与下方 TourHighlights 重复的亮点列表。',
  },
  {
    area: '产品页 FAQ 深度',
    status: 'done',
    note:
      '十月双 Discovery 已各 8 条线路向 FAQ（tours.ts `faqs` + #faq；战役页同步）；全站 JSON-LD 含 FAQ 等。其余 tier 仍为目的地默认问答，可按产品补 `faqs`（见 CONTENT_PIVOT.discussionTopics）。',
  },
  {
    area: 'thank-you / 主转化字典',
    status: 'done',
    note: '已上线 /thank-you；询盘成功跳转；GTM tour_enquiry_thank_you；主转化事件与 Ads 字典仍待 T013/T016 定稿。',
  },
  {
    area: '战役产品页首屏 / 免签条 / CTA',
    status: 'done',
    note: '标准产品页与 October 战役 LP：shortDescription + meta；TourHero 十月线 CTA；ChinaVisaNudge → /china-visa-guide-for-new-zealanders；两套路由一致。',
  },
  {
    area: '产品页 Gallery / 社媒图',
    status: 'in_progress',
    note: 'Unsplash 选图与图库扩充排入 T051–T053；代码入口 tours.ts `gallery` + TourGallery。',
  },
  {
    area: '外链 / 客座与 KOC',
    status: 'not_started',
    note: '已纳入任务 T055–T057；执行手册见仓库 docs/outreach-guest-posts-and-backlinks.md。',
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
        status: 'done',
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
        status: 'done',
      },
      {
        id: 'KR4',
        title: '完成产品页广告可投放素材与文案基础包',
        metric: '每产品 ≥3 套角度 + 命名规范',
        aprilTarget: '各 3 套可投',
        status: 'not_started',
      },
      {
        id: 'KR5',
        title: '完成 NZ Herald 平面广告线上下承接（Spotlight 海报页 + 双产品独立 UTM）',
        metric: 'utm_campaign=oct2026_spotlight 可分产品归因；版式与战役 LP 口径一致',
        aprilTarget: '见报日（4/16）前链接与页面就绪；见报后 1 周内复盘',
        status: 'in_progress',
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
        title: 'Meta Ads：冷流量 + 再营销结构（Phase 1b）',
        metric: '两套结构 live',
        aprilTarget: '5 月起或 Google Search + 主转化稳定后上线；4 月仅筹备素材/开户可并行',
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
        title:
          '完成 6 篇围绕 10 月产品的 SEO 文章（含 visa-free NZ、specialist 两簇与双产品支撑）',
        metric: '5 篇 /blog + 签证指南免签簇（T035 定稿）= 6 条内容支柱闭环',
        aprilTarget: 'visa-free / specialist 两簇与双产品支撑已覆盖',
        status: 'done',
      },
      {
        id: 'KR2',
        title: '完成产品页 FAQ 强化与结构化信息增强',
        metric: '十月双 Discovery：线路 FAQ + 页面/战役 JSON-LD；T042 meta/OG',
        aprilTarget: '主推产品页与 October LP 已对齐',
        status: 'done',
      },
      {
        id: 'KR3',
        title: '完成产品页与 supporting content 的内链结构',
        metric: 'T011 TourSupportingContentLinks + T041 hub/博客互链',
        aprilTarget: 'Plan your trip、china-tours、NZ 专题、博客 ↔ 产品/战役',
        status: 'done',
      },
      {
        id: 'KR4',
        title: '让网站形成「产品页 + 内容页 + 再营销页」的增长闭环',
        metric: '博客 → Discovery / October LP → contact；枢纽 china-tours / 签证指南',
        aprilTarget: '首版闭环已跑通；外链/KOC 见 T055–T057 放大',
        status: 'done',
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
        status: 'done',
      },
      {
        id: 'KR2',
        title: '形成 Facebook / Instagram / Google Ads / Email / SEO 的统一内容素材库',
        status: 'in_progress',
      },
      {
        id: 'KR3',
        title: '建立每周固定内容产出机制',
        status: 'in_progress',
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
  {
    id: 'M1b',
    week: 'Week 1',
    name: 'NZ Herald 报纸投放',
    description: '本地报章见报；读者扫码/输入 URL 承接至 October 战役 LP，双产品分链追踪（T058 UTM）',
    output: '印刷与线上下同一战役口径；oct2026_spotlight 可归因',
  },
  { id: 'M2', week: 'Week 2', name: '网站转化底座完成', description: '产品页优化、追踪、CTA/FAQ/thank-you', output: '网站具备投放条件' },
  {
    id: 'M3',
    week: 'Week 3',
    name: '首波付费上线',
    description: 'Google Search 启动（小预算）；Meta 投放 Phase 1b 不阻塞本里程碑',
    output: '付费搜索开始进线，线索可复盘',
  },
  {
    id: 'M4',
    week: 'Week 4',
    name: 'SEO/GEO 内容首批上线',
    description: '5 篇博客 + 签证指南免签簇（T035）已定稿上线；全站内链与 meta 基础完成',
    output: 'SEO/GEO 内容增长基础设施已启用',
  },
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
    keyResults: ['产品定位明确', '页面优化完成', '埋点完成', 'Google Search 广告结构确定', '素材开始准备'],
    acceptance: [
      '两个产品页首轮优化完成',
      '关键转化事件可追踪（GA4 + Google Ads 主转化优先）',
      'Google Search 账户与关键词骨架已搭好',
      '6 篇内容选题已确认；5 篇 /blog + 签证指南 visa-free 簇（T035）已定稿',
      'AI master brief 已完成',
      'NZ Herald 平面：双产品 UTM 链接已定稿；Spotlight 承接页与报纸主视觉对齐（T058；复盘见 T059–T060）',
    ],
  },
  {
    phase: 'Phase 2：上线启动期',
    weeks: 'Week 3–4',
    goal: 'Google Search 正式启动；SEO 首批 supporting 上线；Meta 不列为 4 月必达。',
    keyResults: [
      'Google Search 上线并有花费',
      '首批 supporting content 已上线（T036–T040；visa-free 簇见指南页 + T035）',
      '全站两簇词（visa-free、specialist）内链与 T042 meta 基础已完成',
      '有第一批流量与询盘数据',
    ],
    acceptance: ['Search 正常跑量', '网站有稳定访问', '有初步线索数据', 'GA4 关键路径可看'],
  },
  {
    phase: 'Phase 3：优化验证期',
    weeks: 'Week 5–6',
    goal: '找到更有效的转化组合。',
    keyResults: ['调整广告文案', '调整创意', '优化 CTA 与页面模块', '优化关键词与受众'],
    acceptance: ['CTR 提升', '询盘率提升', 'Search 与（若已开）Meta 再营销逻辑更清晰', '停留与互动改善'],
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
    notes: '可与 Obsidian（MARKETING_PLAN_META.obsidianProjectPath）周记模板同步字段。',
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
  {
    id: 'T004',
    module: '策略与项目管理',
    name: '建立素材命名与文件管理规则',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '文件规范',
    notes: 'docs/asset-naming-and-file-management.md；与 T027 素材库、T052 裁切包、T053 署名表同一命名原则。',
    reviewLinks: [
      {
        label: '素材命名与文件管理（仓库）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/asset-naming-and-file-management.md',
      },
    ],
  },
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
      { label: 'A Tale of Two Cities 产品页', href: '/tours/china/discovery/beijing-xian' },
      { label: 'Shanghai & Surroundings 产品页', href: '/tours/china/discovery/shanghai-surroundings' },
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
    notes: 'ChinaVisaNudge：标准 Discovery 产品页 + October 战役 LP（/campaigns/october-2026/*）；链至签证指南。',
    reviewLinks: [
      { label: 'NZ 中国签证指南（长文）', href: '/china-visa-guide-for-new-zealanders' },
      {
        label: '签证指南 · October Discovery 双 CTA',
        href: '/china-visa-guide-for-new-zealanders#october-discovery-cta',
      },
      { label: '免签条 · Tale of Two Cities', href: '/tours/china/discovery/beijing-xian#visa-nudge' },
      { label: '免签条 · Shanghai & Surroundings', href: '/tours/china/discovery/shanghai-surroundings#visa-nudge' },
      { label: '免签条 · October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities#visa-nudge' },
      { label: '免签条 · October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings#visa-nudge' },
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
    notes: 'TourHero primaryCtaLabel / secondaryCtaLabel 十月线专用文案（标准页 + October 战役 LP）。',
    reviewLinks: [
      { label: '首屏 CTA · Tale of Two Cities', href: '/tours/china/discovery/beijing-xian' },
      { label: '首屏 CTA · Shanghai & Surroundings', href: '/tours/china/discovery/shanghai-surroundings' },
      { label: '首屏 CTA · October · Tale', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: '首屏 CTA · October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  {
    id: 'T008',
    module: '网站优化',
    name: 'FAQ 扩展为完整问答',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'done',
    deliverable: 'FAQ 完整版',
    notes:
      'Tour 可选字段 `faqs` + getTourPageFaqsForTour；十月两条 Discovery 各 8 条线路向问答（产品页与 October 战役页同数据）。',
    reviewLinks: [
      { label: 'FAQ · Tale of Two Cities', href: '/tours/china/discovery/beijing-xian#faq' },
      { label: 'FAQ · Shanghai & Surroundings', href: '/tours/china/discovery/shanghai-surroundings#faq' },
      { label: 'FAQ · October · Tale', href: '/campaigns/october-2026/tale-of-two-cities#faq' },
      { label: 'FAQ · October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings#faq' },
    ],
  },
  {
    id: 'T009',
    module: '网站优化',
    name: '增加 thank-you page',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'done',
    deliverable: 'thank-you page',
    notes:
      '路由 /thank-you + ThankYouClient GTM；TourEnquiry 成功后 router.push；noindex。验收页 /marketing/preview 含本机相对链接与生产 URL 复制。',
    reviewLinks: [
      { label: 'Thank-you 页', href: '/thank-you' },
      { label: '上线预览清单', href: '/marketing/preview' },
    ],
  },
  {
    id: 'T010',
    module: '网站优化',
    name: '增加 trust signals 模块',
    priority: 'P2',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'done',
    deliverable: '信任模块',
    notes: 'Hero 下：TrustBar + TourTrustSignals（TAANZ/IATA/Qualmark/TEC + 链到 /about#credentials）。锚点 #trust-signals。标准产品页与 October 战役 LP 一致。',
    reviewLinks: [
      { label: 'Trust signals（Discovery 例）', href: '/tours/china/discovery/beijing-xian#trust-signals' },
      { label: 'Trust signals · October · Tale', href: '/campaigns/october-2026/tale-of-two-cities#trust-signals' },
      { label: 'Trust signals · October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings#trust-signals' },
      { label: 'Credentials（About）', href: '/about#credentials' },
    ],
  },
  {
    id: 'T011',
    module: '网站优化',
    name: '内链 supporting content 到产品页',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W4',
    status: 'done',
    deliverable: '内链结构',
    notes: 'TourSupportingContentLinks：签证/季节/NZ 出发 + 按 tourCities/行程推断的城市 hub 与指南内链。锚点 #planning-resources。October 战役 LP 已同步。',
    reviewLinks: [
      { label: '内链模块（北京–西安线）', href: '/tours/china/discovery/beijing-xian#planning-resources' },
      { label: '内链模块（长三角线）', href: '/tours/china/discovery/shanghai-surroundings#planning-resources' },
      { label: '内链模块 · October · Tale', href: '/campaigns/october-2026/tale-of-two-cities#planning-resources' },
      { label: '内链模块 · October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings#planning-resources' },
    ],
  },
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
  {
    id: 'T014',
    module: '追踪与数据',
    name: '配置 Meta Pixel',
    priority: 'P1',
    startWeek: 'W3',
    endWeek: 'W3',
    status: 'not_started',
    deliverable: 'Pixel 安装完成',
    notes: 'Phase 1b：不阻塞 4 月 Search；与 T013/T016 错开，避免同一周并行调试。',
  },
  {
    id: 'T015',
    module: '追踪与数据',
    name: '配置 Meta Conversions API',
    priority: 'P2',
    startWeek: 'W4',
    endWeek: 'W4',
    status: 'not_started',
    deliverable: 'CAPI 完成',
    notes: 'Pixel 稳定后再接 CAPI。',
  },
  { id: 'T016', module: '追踪与数据', name: '设定主/辅转化事件', priority: 'P0', startWeek: 'W1', endWeek: 'W2', status: 'not_started', deliverable: '转化字典' },
  { id: 'T017', module: '追踪与数据', name: '建立每周数据看板', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: 'Dashboard' },
  {
    id: 'T018',
    module: 'Google Ads',
    name: '梳理关键词结构',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'in_progress',
    deliverable: '关键词清单 V2（含匹配类型、RSA 文案、CSV 导入）',
    notes:
      '已产出 docs/t018-keyword-structure-v2.md + docs/t018-keyword-import-v2.csv。V2 含 Exact/Phrase 执行规范、核心 RSA 文案包、可直接导入 Google Ads Editor 的 CSV；含 Brand 变体、Visa Free 重点 ad group、双产品分层（含 beijing shanghai 承接词）与 Generic 放量池，并对齐 CONTENT_PIVOT.siteWideSeoThemes。',
    reviewLinks: [
      { label: '统筹页 · 广告链接速取（Google + Meta UTM）', href: '/marketing/campaign#ad-urls' },
      { label: 'T019 Search 投放工作台（T018–T025）', href: '/marketing/campaign/t019#google-search-launch' },
      { label: 'T018 执行台（V1/V2/CSV）', href: '/marketing/campaign/t018' },
      { label: 'China tours 商业枢纽', href: '/china-tours' },
      { label: 'NZ 出发专题', href: '/china-tours-from-new-zealand' },
      { label: 'NZ 中国签证指南', href: '/china-visa-guide-for-new-zealanders' },
      { label: 'About（specialist 信任）', href: '/about' },
    ],
  },
  {
    id: 'T019',
    module: 'Google Ads',
    name: '搭建 Brand campaign',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '品牌词广告（Editor 可导入结构 + 上线开关）',
    notes:
      '依赖 T018：在 Google Ads 新建 Search-only campaign，建议命名 `Search_Brand_CTS`；关键词与匹配类型见 `docs/t018-keyword-import-v2.csv` 中 Brand 相关行。Final URL 与 V2 一致：`/about`。RSA 文案用 `docs/t018-keyword-structure-v2.md` §4(A)。UTM：`utm_campaign=oct26_discovery`、`utm_content=Search_Brand_CTS`（或与 ag 名一致）。首周可低预算跑 Exact+Phrase，观察 impression share 与品牌词漏量。',
    reviewLinks: [
      { label: 'T019 Search 投放工作台', href: '/marketing/campaign/t019' },
      { label: '工作台 · T019 Brand 步骤', href: '/marketing/campaign/t019#step-t019' },
      { label: 'T018 执行台（含 V2 + Brand CSV）', href: '/marketing/campaign/t018' },
      { label: 'Brand Final URL：About', href: '/about' },
      { label: '首页（备选/品牌认知）', href: '/' },
      { label: 'T018 V2 文档（GitHub）', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t018-keyword-structure-v2.md' },
    ],
  },
  {
    id: 'T020',
    module: 'Google Ads',
    name: '搭建 China tours generic campaign',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '泛词搜索广告',
    reviewLinks: [
      { label: '工作台 · T020 步骤', href: '/marketing/campaign/t019#step-t020' },
      { label: '落地：China tours', href: '/china-tours' },
    ],
  },
  {
    id: 'T021',
    module: 'Google Ads',
    name: '搭建 Beijing / Xi’an campaign',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '产品专属 campaign',
    reviewLinks: [
      { label: '统筹页 · 广告链接速取（Google + Meta UTM）', href: '/marketing/campaign#ad-urls' },
      { label: '工作台 · T021 步骤', href: '/marketing/campaign/t019#step-t021' },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
    ],
  },
  {
    id: 'T022',
    module: 'Google Ads',
    name: '搭建 Shanghai campaign',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '产品专属 campaign',
    reviewLinks: [
      { label: '统筹页 · 广告链接速取（Google + Meta UTM）', href: '/marketing/campaign#ad-urls' },
      { label: '工作台 · T022 步骤', href: '/marketing/campaign/t019#step-t022' },
      { label: 'October · Shanghai & Surroundings', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  {
    id: 'T023',
    module: 'Google Ads',
    name: '编写 ads copy 3 套角度',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '文案包',
    reviewLinks: [
      { label: '工作台 · T023 步骤', href: '/marketing/campaign/t019#step-t023' },
      { label: 'T018 执行台（V2 RSA）', href: '/marketing/campaign/t018' },
    ],
  },
  {
    id: 'T024',
    module: 'Google Ads',
    name: '广告上线',
    priority: 'P0',
    startWeek: 'W3',
    endWeek: 'W3',
    status: 'not_started',
    deliverable: '广告正式启动',
    reviewLinks: [{ label: '工作台 · T024 步骤', href: '/marketing/campaign/t019#step-t024' }],
  },
  {
    id: 'T025',
    module: 'Google Ads',
    name: '首轮优化',
    priority: 'P1',
    startWeek: 'W4',
    endWeek: 'W5',
    status: 'not_started',
    deliverable: '优化报告',
    reviewLinks: [
      { label: '工作台 · T025 步骤', href: '/marketing/campaign/t019#step-t025' },
      { label: 'T018 执行台（否定词 §5）', href: '/marketing/campaign/t018' },
    ],
  },
  {
    id: 'T026',
    module: 'Meta Ads',
    name: '明确冷流量视频方向',
    priority: 'P1',
    /** W1：与统筹页「今日 W1」面板一致（仅列出 startWeek=W1）；已提前启动则锚在本周。 */
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'in_progress',
    deliverable: '创意 brief',
    notes:
      'Phase 1b：已启动冷流量视频方向（双 Discovery 各 3 角度）与 Hook/CTA 框架；与 T051 图库并行，不占用 Search 上线周。执行文档：docs/t026-meta-cold-video-brief.md。Facebook Post/Reels/Story 分链：utm_source=facebook，utm_content=tale_fb_* / shanghai_fb_*；投放用 paid_social + oct2026_meta_cold；纯公共主页有机发帖用 social + oct2026_discovery_fb_organic（见统筹页「内容支点」表）。',
    reviewLinks: [
      { label: '统筹页 · 广告链接速取（Google + Meta UTM）', href: '/marketing/campaign#ad-urls' },
      {
        label: 'T026 执行文档（仓库）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t026-meta-cold-video-brief.md',
      },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai & Surroundings', href: '/campaigns/october-2026/shanghai-surroundings' },
      {
        label: 'Meta 冷流量 UTM · Tale · Post',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_post',
      },
      {
        label: 'Meta 冷流量 UTM · Tale · Reels',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_reels',
      },
      {
        label: 'Meta 冷流量 UTM · Tale · Story',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_story',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Post',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_post',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Reels',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_reels',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Story',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_story',
      },
    ],
  },
  {
    id: 'T027',
    module: 'Meta Ads',
    name: '整理图片/短视频素材',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '素材库',
    notes: '与 T051–T052 共用：产品 Gallery 选定图可派生广告/社媒裁切包。',
  },
  {
    id: 'T028',
    module: 'Meta Ads',
    name: '编写 FB/IG 广告文案',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '广告文案包',
    notes: 'Final URL 使用统筹页已给出的 October LP + Facebook 分面 UTM（Post/Reels/Story）；与 T026 同一套 utm_content 命名。',
    reviewLinks: [
      { label: '统筹页 · 广告链接速取（Google + Meta UTM）', href: '/marketing/campaign#ad-urls' },
      {
        label: 'Meta 冷流量 UTM · Tale · Post',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_post',
      },
      {
        label: 'Meta 冷流量 UTM · Tale · Reels',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_reels',
      },
      {
        label: 'Meta 冷流量 UTM · Tale · Story',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=tale_fb_story',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Post',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_post',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Reels',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_reels',
      },
      {
        label: 'Meta 冷流量 UTM · Shanghai · Story',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct2026_meta_cold&utm_content=shanghai_fb_story',
      },
    ],
  },
  {
    id: 'T029',
    module: 'Meta Ads',
    name: '搭建冷流量 campaign',
    priority: 'P1',
    startWeek: 'W4',
    endWeek: 'W4',
    status: 'not_started',
    deliverable: '冷流量广告',
    notes: 'Phase 1b。',
  },
  { id: 'T030', module: 'Meta Ads', name: '搭建 Lead Ads', priority: 'P2', startWeek: 'W4', endWeek: 'W5', status: 'not_started', deliverable: '表单广告' },
  {
    id: 'T031',
    module: 'Meta Ads',
    name: '搭建再营销广告',
    priority: 'P1',
    startWeek: 'W4',
    endWeek: 'W5',
    status: 'not_started',
    deliverable: 'remarketing campaign',
    notes: 'Phase 1b：依赖 Pixel 与站内关键事件。',
  },
  {
    id: 'T032',
    module: 'Meta Ads',
    name: '上线并观察首轮数据',
    priority: 'P1',
    startWeek: 'W5',
    endWeek: 'W5',
    status: 'not_started',
    deliverable: '广告表现数据',
    notes: 'Phase 1b。',
  },
  { id: 'T033', module: 'Meta Ads', name: '创意优化', priority: 'P1', startWeek: 'W5', endWeek: 'W6', status: 'not_started', deliverable: '第二轮素材与文案' },
  {
    id: 'T034',
    module: 'SEO / GEO',
    name: '建立内容关键词与主题结构',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '内容规划表',
    notes:
      '仓库 `docs/t034-content-keyword-topic-structure.md`（与 CONTENT_PIVOT、T018、T036–T040 对齐）；Obsidian 可放扩写版。',
    reviewLinks: [
      {
        label: 'T034 关键词与主题结构（GitHub）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t034-content-keyword-topic-structure.md',
      },
      { label: '内容支点 · china-tours', href: '/china-tours' },
      { label: 'NZ 中国签证指南', href: '/china-visa-guide-for-new-zealanders' },
      { label: 'About', href: '/about' },
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
    status: 'done',
    deliverable: '签证指南免签簇（主落地）',
    notes:
      '已定稿：以 /china-visa-guide-for-new-zealanders 为 visa-free 簇主 URL；含 October 2026 双战役 CTA（#october-discovery-cta）、内链与 FAQ 强化；与产品页 ChinaVisaNudge 分工明确、避免标题意图重复。',
    reviewLinks: [
      { label: '现有签证指南页', href: '/china-visa-guide-for-new-zealanders' },
      {
        label: 'October Discovery 双 CTA（锚点）',
        href: '/china-visa-guide-for-new-zealanders#october-discovery-cta',
      },
    ],
  },
  {
    id: 'T036',
    module: 'SEO / GEO',
    name: '文章 2：Best first trip — Beijing or Shanghai',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'done',
    deliverable: '博客 2',
    notes: '已发布于 /blog；文内含签证指南、双 October 战役 LP、标准产品页、china-tours、contact CTA。',
    reviewLinks: [{ label: '博客 · Beijing or Shanghai', href: '/blog/first-trip-china-beijing-or-shanghai' }],
  },
  {
    id: 'T037',
    module: 'SEO / GEO',
    name: '文章 3：Is October a good time to visit China',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'done',
    deliverable: '博客 3',
    notes: '文内含 Golden Week 提示、best-time 内链、双战役 LP、Discovery 与 contact CTA。',
    reviewLinks: [{ label: '博客 · October timing', href: '/blog/is-october-good-time-to-visit-china' }],
  },
  {
    id: 'T038',
    module: 'SEO / GEO',
    name: '文章 4：What is included in a guided China tour',
    priority: 'P2',
    startWeek: 'W3',
    endWeek: 'W3',
    status: 'done',
    deliverable: '博客 4',
    notes: '文内含 inclusions 说明、签证页、两条 Discovery 产品页、双战役 LP、contact CTA。',
    reviewLinks: [{ label: '博客 · Guided tour inclusions', href: '/blog/what-is-included-guided-china-tour-nz' }],
  },
  {
    id: 'T039',
    module: 'SEO / GEO',
    name: '文章 5：Shanghai & surroundings guide',
    priority: 'P2',
    startWeek: 'W3',
    endWeek: 'W4',
    status: 'done',
    deliverable: '博客 5',
    notes: '文内含 Jiangnan 叙事、shanghai/suzhou/hangzhou guide 内链、October Shanghai 战役、标准产品页、contact CTA。',
    reviewLinks: [{ label: '博客 · Shanghai & Jiangnan', href: '/blog/shanghai-surroundings-jiangnan-guide-nz' }],
  },
  {
    id: 'T040',
    module: 'SEO / GEO',
    name: '文章 6：Beijing / Xi’an first-timer guide',
    priority: 'P2',
    startWeek: 'W3',
    endWeek: 'W4',
    status: 'done',
    deliverable: '博客 6',
    notes: '文内含北京西安动线、签证页、great wall / terracotta 等 guide 内链、October Tale 战役、beijing-xian 产品、contact CTA。',
    reviewLinks: [{ label: '博客 · Beijing & Xi’an first-timer', href: '/blog/beijing-xian-first-visit-guide-nz' }],
  },
  {
    id: 'T041',
    module: 'SEO / GEO',
    name: '完成内链布局',
    priority: 'P1',
    startWeek: 'W4',
    endWeek: 'W4',
    status: 'done',
    deliverable: '内链上线',
    notes:
      '双 Discovery 产品页 Plan your trip 增加 October LP + 对应博客；/china-tours 相关资源块；/china-tours-from-new-zealand「Popular NZ planning links」。',
    reviewLinks: [
      {
        label: '签证指南 · October 双 CTA',
        href: '/china-visa-guide-for-new-zealanders#october-discovery-cta',
      },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai & Surroundings', href: '/campaigns/october-2026/shanghai-surroundings' },
      { label: 'Beijing–Xi’an · Plan your trip', href: '/tours/china/discovery/beijing-xian#planning-resources' },
      { label: 'Shanghai · Plan your trip', href: '/tours/china/discovery/shanghai-surroundings#planning-resources' },
    ],
  },
  {
    id: 'T042',
    module: 'SEO / GEO',
    name: '产品页 meta / title / description 优化',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'done',
    deliverable: '页面 SEO 基础优化',
    notes: 'tours.ts 中两条 Discovery 的 metaTitle / metaDescription 定稿；产品页 generateMetadata 使用 metaTitle 与 Open Graph / Twitter 一致。',
    reviewLinks: [
      { label: 'Tale of Two Cities', href: '/tours/china/discovery/beijing-xian' },
      { label: 'Shanghai & Surroundings', href: '/tours/china/discovery/shanghai-surroundings' },
    ],
  },
  {
    id: 'T043',
    module: 'AI 内容系统',
    name: '建立 Beijing / Xi’an master brief',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'done',
    deliverable: '主档案',
    notes: 'Repo: docs/t043-beijing-xian-master-brief.md。与产品页、tours.ts、October LP、T026 Meta brief 同轴。',
    reviewLinks: [
      { label: '产品页', href: '/tours/china/discovery/beijing-xian' },
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
    status: 'done',
    deliverable: '主档案',
    notes: 'Repo: docs/t044-shanghai-surroundings-master-brief.md。与产品页、tours.ts、October LP、T026 Meta brief 同轴。',
    reviewLinks: [
      { label: '产品页', href: '/tours/china/discovery/shanghai-surroundings' },
      { label: 'October 战役页', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  {
    id: 'T045',
    module: 'AI 内容系统',
    name: '输出 Facebook 内容模板',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'in_progress',
    deliverable: 'FB 发帖模板 + 提示词结构（供 Cowork 批量生成）',
    notes:
      '与 T061 同轨：用 Claude Cowork 按槽位生成「LoveArt 用图提示词 + 英文主贴文案」；有机帖 UTM 见统筹页「内容支点」Facebook 表（utm_medium=social，utm_campaign=oct2026_discovery_fb_organic）。',
    reviewLinks: [
      { label: 'T061 Cowork 任务说明（仓库）', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t061-claude-cowork-fb-ig-orchestration-brief.md' },
      { label: 'T043 Beijing / Xi’an master brief', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t043-beijing-xian-master-brief.md' },
      { label: 'T044 Shanghai master brief', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t044-shanghai-surroundings-master-brief.md' },
      { label: '统筹页 · 广告与有机链接', href: '/marketing/campaign#ad-urls' },
    ],
  },
  {
    id: 'T046',
    module: 'AI 内容系统',
    name: '输出 Instagram caption 模板',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'in_progress',
    deliverable: 'IG Feed / Reels caption 模板 + hashtag 规则',
    notes:
      '与 T061 同轨：Cowork 输出需区分 Feed 长说明 vs Reels 短 hook；视觉由 LoveArt 按 4:5 / 9:16 导出；Buffer 统一排期。',
    reviewLinks: [
      { label: 'T061 Cowork 任务说明（仓库）', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t061-claude-cowork-fb-ig-orchestration-brief.md' },
      { label: 'October · Tale（有机可链）', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai（有机可链）', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  { id: 'T047', module: 'AI 内容系统', name: '输出 Google Ads copy 模板', priority: 'P1', startWeek: 'W2', endWeek: 'W2', status: 'not_started', deliverable: 'Ads 模板' },
  { id: 'T048', module: 'AI 内容系统', name: '输出 remarketing 文案模板', priority: 'P1', startWeek: 'W2', endWeek: 'W3', status: 'not_started', deliverable: 'RMKT 模板' },
  { id: 'T049', module: 'AI 内容系统', name: '输出 EDM 模板', priority: 'P2', startWeek: 'W3', endWeek: 'W3', status: 'not_started', deliverable: '邮件模板' },
  { id: 'T050', module: 'AI 内容系统', name: '输出 AI 内容 SOP', priority: 'P2', startWeek: 'W6', endWeek: 'W7', status: 'not_started', deliverable: 'SOP 文档' },
  {
    id: 'T051',
    module: '图库与社媒素材',
    name: 'Unsplash 选图并扩充两条战役产品 Gallery',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'not_started',
    deliverable: 'tours.ts 中 beijing-xian / shanghai-surroundings 的 gallery 更新',
    notes:
      '在 Unsplash 按目的地关键词筛图；优先横版 1200px+；写入 `gallery: string[]`（必要时同步 hero）。生产可继续用 CDN URL 或按既有流程上传 Supabase tour-images。',
    reviewLinks: [
      { label: 'Beijing–Xi’an · Gallery', href: '/tours/china/discovery/beijing-xian#gallery' },
      { label: 'Shanghai · Gallery', href: '/tours/china/discovery/shanghai-surroundings#gallery' },
    ],
  },
  {
    id: 'T052',
    module: '图库与社媒素材',
    name: '从 Gallery 源图导出社媒/广告裁切包',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'not_started',
    deliverable: '每产品 1:1 / 4:5 / 9:16 各若干张 + 命名清单',
    notes:
      '与 master brief、T027 素材库同一目录或 Obsidian（MARKETING_PLAN_META.obsidianProjectPath）中「Gallery and social assets」交叉引用。',
  },
  {
    id: 'T053',
    module: '图库与社媒素材',
    name: '定稿 Unsplash 使用与署名存档流程',
    priority: 'P1',
    startWeek: 'W2',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '表格或 Obsidian（项目路径见 META）：每图 photographer、Unsplash 链接、用途（站/FB/IG）',
    notes: '与 T004 文件命名规则合并；站内需 alt 文案时一并记入。',
  },
  {
    id: 'T054',
    module: 'SEO / GEO',
    name: 'China specialist 全站最小集（信任文案 + URL 分工）',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'done',
    deliverable: '关键词→URL 表 + About / china-tours 首段定稿',
    notes:
      '关键词→URL 见 T034 文档 §1；About 首段 specialist + TAANZ/IATA + 链至 china-tours / 签证指南；china-tours 枢纽 intro + meta description 强化 specialist。',
    reviewLinks: [
      { label: 'China tours 枢纽', href: '/china-tours' },
      { label: 'About', href: '/about' },
      { label: 'NZ 出发', href: '/china-tours-from-new-zealand' },
    ],
  },
  {
    id: 'T055',
    module: '外链与合作推广',
    name: '建立外链/客座目标清单与跟踪表',
    priority: 'P1',
    startWeek: 'W3',
    endWeek: 'W3',
    status: 'not_started',
    deliverable: '≥5 个目标站点/栏目 + 联系人 + 跟进日期（表格）',
    notes:
      '原则：少而精、相关受众；NAP + GBP 与手册 §1 顺序优先。勿批量提交链接农场。客座/编辑推荐内链用干净 URL（非 UTM）。',
    reviewLinks: [
      {
        label: '执行手册（客座与外链）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/outreach-guest-posts-and-backlinks.md',
      },
      { label: 'Contact（NAP 一致性）', href: '/contact' },
      { label: 'China tours 枢纽', href: '/china-tours' },
    ],
  },
  {
    id: 'T056',
    module: '外链与合作推广',
    name: '发送首轮个性化客座 / outreach pitch（≥3）',
    priority: 'P1',
    startWeek: 'W4',
    endWeek: 'W4',
    status: 'not_started',
    deliverable: '≥3 封已发 pitch + 表格状态更新',
    notes: '与手册 §2 角度表对齐；每人/每站单独写开头与选题，避免群发模板感。',
    reviewLinks: [
      {
        label: '执行手册（pitch 与渠道）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/outreach-guest-posts-and-backlinks.md',
      },
      { label: 'NZ 签证指南（常见落地）', href: '/china-visa-guide-for-new-zealanders' },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  {
    id: 'T057',
    module: '外链与合作推广',
    name: '社媒 KOC 试点：brief + 人选短名单 + 披露口径',
    priority: 'P2',
    startWeek: 'W5',
    endWeek: 'W6',
    status: 'not_started',
    deliverable: '1 页合作 brief + 1–2 人短名单与评估结论',
    notes:
      '建议在 Google Search 与主转化（T013/T016）跑稳后再执行。视觉与叙事与 T043–T044、T045–T046 一致；付费或馈赠合作须在平台标注 #ad / paid partnership（NZ Fair Trading）。',
    reviewLinks: [
      { label: '社媒发帖计划', href: '/campaign/social' },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai', href: '/campaigns/october-2026/shanghai-surroundings' },
    ],
  },
  {
    id: 'T058',
    module: '网站优化',
    name: 'NZ Herald 16号营销：报纸海报同款 landing page + 双产品 UTM',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W1',
    status: 'in_progress',
    deliverable: '上线海报同款落地页并生成两个可分产品追踪的 newspaper UTM 链接',
    notes:
      '目标：网页主视觉尽量与报纸版一致；用于 16 号本地报纸投放后的线上承接与分产品归因。图像优先复用现有图库（tour-images）。',
    reviewLinks: [
      { label: 'Spotlight 海报页', href: '/spotlight/october-2026' },
      {
        label: 'UTM · Shanghai & Surroundings',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_spotlight&utm_content=shanghai_surroundings',
      },
      {
        label: 'UTM · Tale of Two Cities',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_spotlight&utm_content=tale_of_two_cities',
      },
    ],
  },
  {
    id: 'T059',
    module: '渠道与报刊',
    name: 'NZ Herald 见报后：oct2026_spotlight 流量与询盘归因简报',
    priority: 'P0',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '1 页简报：sessions / key events / 双 utm_content 对比 + 结论与下一步',
    notes:
      '投放后 D+1～D+7 在 GA4 中按手动活动名与 utm_content 过滤；与询盘邮件中 enquiry 来源交叉核对（若已标注）。',
    reviewLinks: [
      { label: '统筹看板 · T058 UTM', href: '/marketing/campaign' },
      {
        label: 'UTM · Shanghai（对照）',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_spotlight&utm_content=shanghai_surroundings',
      },
      {
        label: 'UTM · Tale（对照）',
        href: 'https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_spotlight&utm_content=tale_of_two_cities',
      },
    ],
  },
  {
    id: 'T060',
    module: '渠道与报刊',
    name: 'NZ Herald 版面剪报 / 数字版截图归档与素材命名',
    priority: 'P1',
    startWeek: 'W1',
    endWeek: 'W2',
    status: 'not_started',
    deliverable: '归档文件夹 + 命名符合 asset 规范；Obsidian 或共享盘可检索',
    notes: '与 T004 命名规则一致；便于后续社媒二次传播或复盘 deck。',
    reviewLinks: [
      {
        label: '素材命名（仓库）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/asset-naming-and-file-management.md',
      },
      { label: 'Spotlight 海报页', href: '/spotlight/october-2026' },
    ],
  },
  {
    id: 'T061',
    module: 'AI 内容系统',
    name: 'FB/INS 有机内容管线：Claude Cowork 统筹 + LoveArt + Buffer',
    priority: 'P0',
    startWeek: 'W2',
    endWeek: 'W3',
    status: 'in_progress',
    deliverable:
      '（1）Cowork 用任务说明文档 t061；（2）4/21–4/30 槽位级「图提示词 + 英文 caption + 落地链接」表；（3）LoveArt 出图包 + Buffer 排期截图或日历导出',
    notes:
      '双 Discovery 有机占比 ≥60%；关键词优先级 Visa Free（首句/封面字），免责声明见 T043/T044。付费广告 UTM 勿用于纯公共主页有机帖（与 T026 分工）。Zhong 执行：Cowork → LoveArt → Buffer。',
    reviewLinks: [
      {
        label: 'T061 Claude Cowork 任务说明（仓库）',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t061-claude-cowork-fb-ig-orchestration-brief.md',
      },
      { label: 'T043 · Beijing / Xi’an master brief', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t043-beijing-xian-master-brief.md' },
      { label: 'T044 · Shanghai & Surroundings master brief', href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t044-shanghai-surroundings-master-brief.md' },
      {
        label: 'T026 Meta 冷流量视频 brief',
        href: 'https://github.com/bigbigraydeng-maker/chinatravel/blob/main/docs/t026-meta-cold-video-brief.md',
      },
      { label: 'NZ 签证指南（Visa-free 簇）', href: '/china-visa-guide-for-new-zealanders' },
      { label: 'October · Tale of Two Cities', href: '/campaigns/october-2026/tale-of-two-cities' },
      { label: 'October · Shanghai & Surroundings', href: '/campaigns/october-2026/shanghai-surroundings' },
      { label: '统筹页', href: '/marketing/campaign' },
    ],
  },
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
    items: [
      '文章收录数量',
      'impressions',
      'organic clicks',
      '长尾关键词覆盖',
      '产品页 organic landing sessions',
      '高信任引荐外链（客座/精选合作）条数与落地页',
    ],
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
