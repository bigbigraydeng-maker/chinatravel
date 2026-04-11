import Link from 'next/link';
import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { migratedUnsplash } from '@/lib/site-media';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: '2026 AI × 广告与 SEO 工作流（执行节点）',
    description:
      'CTS 内部用：如何把 AI 嵌入 SEO 与付费广告执行——分阶段工作节点、人机分工与产出物。页面不索引。',
    path: '/travel-tools/ai-marketing-2026',
    ogImagePath: migratedUnsplash('photo-1473163928189-364b2c4e1135'),
    ogImageAlt: 'Planning and strategy workspace',
    keywords: ['CTS internal', 'AI marketing workflow', 'SEO planning'],
    robots: { index: false, follow: false },
    openGraphTitle: '2026 AI × 广告与 SEO 工作流 | CTS',
    openGraphDescription:
      '分步骤工作节点：衡量、策略、研究、创意、投放、SEO 协同、合规。供主要执行人配合 AI 使用。',
  });
}

type WorkNode = {
  id: string;
  title: string;
  goal: string;
  aiDoes: string[];
  humanDoes: string[];
  outputs: string[];
  cadence: string;
};

const WORK_NODES: WorkNode[] = [
  {
    id: '0',
    title: '角色与原则（每次开跑前 15 分钟）',
    goal: '明确本轮「你决策 / AI 放大」的边界，避免幻觉进广告或 SEO。',
    aiDoes: [
      '根据你的口述目标，整理成一页「假设—验证—指标」清单',
      '提示遗漏项（例如：余位、签证表述、竞品敏感词）',
    ],
    humanDoes: [
      '确认预算上限、主推产品、禁止承诺清单（价格/日期/医疗等）',
      '选定本轮要用的落地页 URL（含 UTM 规则）',
    ],
    outputs: ['本轮 one-pager（可复制到 Notion / 飞书）'],
    cadence: '每个新 Campaign 或每季度首周',
  },
  {
    id: '1',
    title: '衡量与数据底盘',
    goal: '所有优化都落在可观测指标上，而不是「感觉更好」。',
    aiDoes: [
      '根据现有 GA4 事件，写「周报里应看的 5 个指标」说明段',
      '把 UTM 命名规则翻译成检查表（缺参、重复 campaign 等）',
    ],
    humanDoes: [
      '在 GA4 / Ads / Meta 中落实转化与导入',
      '固定周报导出模板（CSV 或截图存档）',
    ],
    outputs: ['UTM 表', '周报模板', '转化定义截图'],
    cadence: '2026 Q1 完成；之后每月核对一次',
  },
  {
    id: '2',
    title: '战略与季度日历',
    goal: '把「卖什么、对谁、哪几周放量」对齐库存与季节。',
    aiDoes: [
      '读取 tours 数据或表格，生成「产品 × 月份 × 建议主推」草稿矩阵',
      '列出与公共假期、学校假相关的投放窗口假设（需你核对 NZ 校历）',
    ],
    humanDoes: [
      '确认团期、余位、可否加开 private departure',
      '拍板每季度预算与产品线优先级',
    ],
    outputs: ['季度投放日历 v1', '与 `docs/october-2026-discovery-seo-ads-plan.md` 类文档对齐的链接'],
    cadence: '每季度首周更新',
  },
  {
    id: '3',
    title: '关键词与受众研究（英语 NZ）',
    goal: '搜索广告与 SEO 共用同一套「意图词」，减少各写各的。',
    aiDoes: [
      '输出关键词聚类（品牌 / 高意向 / 长尾 / 否定词初稿）',
      '为每条广告组写 3 套「用户会问的问题」FAQ 草稿',
    ],
    humanDoes: [
      '删减、合并、标注「禁用或需法务」词',
      '把最终词表同步到 Ads 与落地页 H2',
    ],
    outputs: ['关键词与否定词表', 'FAQ 草稿 → 人审后上站'],
    cadence: '新品或大促前 2 周；平时每月小迭代',
  },
  {
    id: '4',
    title: '创意与文案流水线',
    goal: '用 AI 拉高 RSA / Meta 文案产量，用人工锁住事实与语气。',
    aiDoes: [
      '一次生成 10–15 条标题、4 条描述、3 个 CTA 变体',
      '把同一卖点改写成「40+ 稳重」「短句移动端」两版',
    ],
    humanDoes: [
      '逐条核对：价格、天数、城市名、是否含机票等',
      '删掉「第一」「保证签证」等高风险表述',
    ],
    outputs: ['已审文案包（按广告组归档）', '可选：口播分镜给短视频'],
    cadence: '每周固定 1–2 次「批处理」时段，比每天零散提问更高效',
  },
  {
    id: '5',
    title: '投放实验与缩放',
    goal: '小预算学习 → 有规则地扩量，不靠直觉。',
    aiDoes: [
      '你把搜索词报告或投放 CSV 贴入后，总结 Top 浪费点与 Top 机会',
      '生成「下周三条实验假设」句式（若…则…因为指标…）',
    ],
    humanDoes: [
      '在平台内执行暂停/加价/拆组',
      '记录每次变更日期与假设，避免无法复盘',
    ],
    outputs: ['实验日志', '每周简短复盘段落'],
    cadence: '学习期 7–14 天每日 10 分钟；稳定后每周两次',
  },
  {
    id: '6',
    title: 'SEO 与着陆页协同',
    goal: '自然流量吃「主 tour 页」；付费吃「活动 LP」时，两者话术不打架。',
    aiDoes: [
      '对比两 URL 的 title/description，标出重复与缺口',
      '生成内链建议：从哪些 hub 页链到哪条 tour',
    ],
    humanDoes: [
      '在 CMS 发布修改；GSC 提交重要 URL',
      '大改后观察 2–4 周再二次调整',
    ],
    outputs: ['On-page 修改清单', '内链清单'],
    cadence: '与节点 2 日历同步；大促前必跑一轮',
  },
  {
    id: '7',
    title: '合规、真实性与素材',
    goal: 'AI 不能替你承担广告法与品牌信任风险。',
    aiDoes: [
      '按你的规则做「上线前检查清单」勾选表',
      '识别文案中可能夸大或需来源的句子',
    ],
    humanDoes: [
      '余位与价格与网站一致后再开广告',
      '客户证言、图片、音乐版权终审',
    ],
    outputs: ['上线前 Checklist 签字版（可自建简单表格）'],
    cadence: '每条新创意包上线前必过',
  },
];

export default function AiMarketing2026Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      <div className="border-b border-warm-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl px-4 py-10">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/travel-tools" className="text-primary hover:underline">
              Travel tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">AI marketing 2026</span>
          </nav>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Internal playbook · noindex
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            2026 年：结合 AI，把广告与 SEO 做得更好
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            你是<strong>主要执行人</strong>；AI 适合承担「研究、扩写、检查清单、周报解读」等可重复劳动。下面按<strong>工作节点</strong>拆分，便于排期、委派或与代理对齐。
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <section className="mb-12 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 md:p-8">
          <h2 className="mb-3 font-serif text-xl font-bold text-gray-900">怎么用这一页和 AI 讨论</h2>
          <ol className="list-decimal space-y-2 pl-5 text-gray-700 leading-relaxed">
            <li>每次只推进<strong>一个节点</strong>，把该节点的「产出物」列为对话目标。</li>
            <li>先贴<strong>事实约束</strong>（产品 URL、价格、禁词、预算），再让 AI 生成草稿。</li>
            <li>用节点里的 <strong>humanDoes</strong> 作为你的 checklist，避免 AI 越权替你做平台点击。</li>
            <li>与「October Discovery」等具体计划衔接：见{' '}
              <Link href="/campaigns/october-2026" className="font-medium text-primary hover:underline">
                /campaigns/october-2026
              </Link>
              {' '}及仓库{' '}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-sm">docs/october-2026-discovery-seo-ads-plan.md</code>
              。
            </li>
          </ol>
        </section>

        <div className="space-y-10">
          {WORK_NODES.map((node) => (
            <article
              key={node.id}
              className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-baseline gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {node.id}
                </span>
                <h2 className="font-serif text-xl font-bold text-gray-900 md:text-2xl">{node.title}</h2>
              </div>
              <p className="mb-6 text-gray-700 leading-relaxed border-l-4 border-secondary/40 pl-4">
                <span className="font-semibold text-gray-900">目标：</span>
                {node.goal}
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">AI 可做</h3>
                  <ul className="list-disc space-y-1.5 pl-5 text-gray-600 text-sm leading-relaxed">
                    {node.aiDoes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">你必须把关</h3>
                  <ul className="list-disc space-y-1.5 pl-5 text-gray-600 text-sm leading-relaxed">
                    {node.humanDoes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-warm-100 pt-6 text-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold text-gray-800">产出物：</span>
                  <span className="text-gray-600">{node.outputs.join('；')}</span>
                </div>
                <div className="shrink-0 text-gray-500">
                  <span className="font-semibold text-gray-700">节奏：</span>
                  {node.cadence}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-warm-200 bg-warm-50/50 p-6 md:p-8">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">2026 年可加码的 AI 能力（选型方向）</h2>
          <ul className="list-disc space-y-2 pl-5 text-gray-700 leading-relaxed">
            <li><strong>创意：</strong>多尺寸改图、口播稿、字幕稿（仍须版权与事实审）。</li>
            <li><strong>分析：</strong>把多周 CSV 对比写成「三周趋势摘要」（你负责确认数字来源）。</li>
            <li><strong>SEO：</strong>批量 meta / FAQ 草稿 + 内链建议（上线前逐条人审）。</li>
            <li><strong>客服与线索：</strong>询盘首响模板、常见问题分流（与隐私政策一致）。</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            具体工具链（ChatGPT、Claude、Gemini、Ads 内建 AI 等）会随厂商变化；节点分工比绑定单一工具更耐久。
          </p>
        </section>

        <p className="mt-10 text-center text-sm text-gray-400">
          本页已设置 <code className="rounded bg-warm-100 px-1">noindex</code>，不向搜索引擎开放收录；链接可收藏自用或发团队。
        </p>
      </div>
    </div>
  );
}
