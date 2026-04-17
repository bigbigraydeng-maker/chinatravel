import Link from 'next/link';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function readDoc(relativePath: string): Promise<string> {
  const abs = path.join(process.cwd(), relativePath);
  return readFile(abs, 'utf8');
}

function sliceBrandRsaBlock(v2: string): string {
  const start = v2.indexOf('### A) Brand');
  if (start === -1) return '';
  const from = v2.slice(start);
  const end = from.indexOf('\n### B)');
  return end === -1 ? from.trim() : from.slice(0, end).trim();
}

const LAUNCH_STEPS: {
  id: string;
  code: string;
  title: string;
  detail: string;
  campaignInCsv?: string;
  links: { href: string; label: string }[];
}[] = [
  {
    id: 'step-t018',
    code: 'T018',
    title: '梳理关键词结构',
    detail: '以 V2 为单源：匹配类型配比、Final URL、UTM；用 Editor 导入 docs/t018-keyword-import-v2.csv 并过一遍映射。',
    links: [{ href: '/marketing/campaign/t018', label: 'T018 执行台（V2 + CSV）' }],
  },
  {
    id: 'step-t019',
    code: 'T019',
    title: '搭建 Brand campaign',
    campaignInCsv: 'Search_Brand_CTS',
    detail: 'Search-only；品牌词 Exact + Phrase；Final URL /about；RSA 见下方摘录（完整在 V2 §4A）。',
    links: [
      { href: '/about', label: 'Final URL：About' },
      { href: '/marketing/campaign/t018', label: 'CSV 中的 Brand 行' },
    ],
  },
  {
    id: 'step-t020',
    code: 'T020',
    title: '搭建 China tours generic',
    campaignInCsv: 'Search_Generic_ChinaTours_NZ',
    detail: '泛词承接 /china-tours；与 Brand 分预算，避免内部竞价。',
    links: [{ href: '/china-tours', label: '落地：China tours' }],
  },
  {
    id: 'step-t021',
    code: 'T021',
    title: '搭建 Beijing / Xi’an（产品）',
    campaignInCsv: 'Search_Product_BJXA_Oct26',
    detail: '十月 Discovery：Tale of Two Cities 落地页与 RSA §4C。',
    links: [{ href: '/campaigns/october-2026/tale-of-two-cities', label: '落地：Tale of Two Cities' }],
  },
  {
    id: 'step-t022',
    code: 'T022',
    title: '搭建 Shanghai（产品）',
    campaignInCsv: 'Search_Product_SH_Oct26',
    detail: '十月 Discovery：Shanghai & Surroundings；RSA §4D。',
    links: [{ href: '/campaigns/october-2026/shanghai-surroundings', label: '落地：Shanghai & Surroundings' }],
  },
  {
    id: 'step-t023',
    code: 'T023',
    title: '编写 ads copy（3 套角度）',
    detail: '按 V2 §4 各 campaign 补齐 RSA；每组至少 8–10 标题、3–4 描述后再点发布。',
    links: [{ href: '/marketing/campaign/t018', label: 'V2 全文（执行台）' }],
  },
  {
    id: 'step-t024',
    code: 'T024',
    title: '广告上线',
    detail: '先小预算 smoke：展示/点击、Final URL、utm_content、GA4 实时；确认转化标记（T013）后再放量。',
    links: [{ href: '/', label: '站点首页（冒烟）' }],
  },
  {
    id: 'step-t025',
    code: 'T025',
    title: '首轮优化',
    detail: '约第 7 天起：搜索词报告、补否定（V2 §5）、收紧低质 Phrase；CSV 另含 Search_VisaFree_NZ_CN，可与上列同日导入但单独看转化。',
    links: [{ href: '/china-visa-guide-for-new-zealanders', label: 'Visa Free 落地' }],
  },
];

export default async function T019WorkbenchPage() {
  const v2 = await readDoc('docs/t018-keyword-structure-v2.md');
  const brandBlock = sliceBrandRsaBlock(v2);

  return (
    <main className="min-h-screen bg-warm-50 py-10 text-accent">
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Marketing Campaign Workspace</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold">T019 · Google Search 投放工作台</h1>
          <p className="mt-2 text-sm text-gray-700">
            Brand 快速参照 + <span className="font-medium text-accent">T018–T025</span> 同日测试清单。详细关键词与全量 RSA 仍以 T018 V2 / CSV 为准。
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/marketing/campaign" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              返回战役看板
            </Link>
            <a href="#google-search-launch" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              T018–T025 清单
            </a>
            <a href="#brand-rsa" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              Brand RSA 摘录
            </a>
          </div>
        </section>

        <section
          id="google-search-launch"
          className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft scroll-mt-24"
        >
          <h2 className="font-serif text-xl font-semibold">Google Search：T018 → T025 测试顺序</h2>
          <p className="mt-1 text-sm text-gray-600">
            今日可从 T018 导入开始，按行顺序搭好各 Search campaign，再统一做 RSA 与上线开关。锚点便于在战役看板从各任务条直达本步骤。
          </p>
          <ol className="mt-4 space-y-4 border-l-2 border-primary/30 pl-4 text-sm">
            {LAUNCH_STEPS.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <p className="font-medium text-accent">
                  {s.code} · {s.title}
                </p>
                {s.campaignInCsv ? (
                  <p className="mt-0.5 text-xs text-gray-500">
                    CSV campaign 名：<code className="rounded bg-warm-100 px-1 py-0.5">{s.campaignInCsv}</code>
                  </p>
                ) : null}
                <p className="mt-1 text-gray-700">{s.detail}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-full border border-warm-200 bg-warm-50 px-2.5 py-0.5 text-xs hover:bg-warm-100"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="brand-params" className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft scroll-mt-24">
          <h2 className="font-serif text-xl font-semibold">Brand（T019）参数速查</h2>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-warm-50 p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">建议 Campaign 名</dt>
              <dd className="mt-1 font-mono text-gray-900">Search_Brand_CTS</dd>
            </div>
            <div className="rounded-xl bg-warm-50 p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Final URL</dt>
              <dd className="mt-1">
                <Link href="/about" className="text-primary underline-offset-2 hover:underline">
                  /about
                </Link>
              </dd>
            </div>
            <div className="rounded-xl bg-warm-50 p-3 sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">UTM（与 CSV 一致）</dt>
              <dd className="mt-1 break-all font-mono text-xs text-gray-800">
                utm_source=google&utm_medium=cpc&utm_campaign=oct26_discovery&utm_content=&lt;ad_group&gt;
              </dd>
            </div>
          </dl>
        </section>

        <section id="brand-rsa" className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft scroll-mt-24">
          <h2 className="font-serif text-xl font-semibold">Brand RSA（摘自 V2）</h2>
          <p className="mt-1 text-xs text-gray-500">自动从 `docs/t018-keyword-structure-v2.md` 截取 §4(A)；若文档改版请以 T018 执行台全文为准。</p>
          {brandBlock ? (
            <pre className="mt-3 max-h-[380px] overflow-auto rounded-xl bg-warm-50 p-4 text-xs leading-relaxed text-gray-800">
              {brandBlock}
            </pre>
          ) : (
            <p className="mt-3 text-sm text-amber-800">未找到 Brand 段落，请打开 T018 执行台核对 V2 文档。</p>
          )}
        </section>
      </div>
    </main>
  );
}
