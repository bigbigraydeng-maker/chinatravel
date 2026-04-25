# Spec: 新建 /china-tours-from-australia 页面

**任务类型：** 新 SEO 页面  
**优先级：** 高  
**预计工时：** 2–3 小时  
**执行人：** Claude Code CLI  
**数据来源：** Semrush AU 数据库 2026-04-25

---

## 背景与数据

| 关键词 | SV (AU) | KD | 当前排名 |
|--------|---------|-----|---------|
| china tours from australia | 720 | 25 | 未排名 |
| china tours from sydney | 260 | 21 | 未排名 |
| trips to china from australia | 210 | 20 | 未排名 |
| china holidays | 1000 | 39 | 未排名 |

CTS 目前有 `/china-tours-from-new-zealand`（NZ专属）和 `/china-tours-from-auckland`（Auckland专属），**没有覆盖 AU 市场**。  
AU 的 china tour 总搜索量约是 NZ 的 4–5 倍。本页面可捕获 AU 有机流量并将其转化为询价。

---

## 架构决策

完全复用 `/china-tours-from-new-zealand` 的页面结构，只替换：
- 地理定位词（New Zealand → Australia / NZ → AU / Kiwi → Australian）
- FAQ 内容（AU 机场、AU 价格、AU 签证规则）
- meta 数据
- seo-pages.ts 中新增 `chinaToursFromAustraliaMeta` 条目

**不需要新建组件**，直接复用：`HubHero`, `TourGrid`, `SectionTitle`, `FAQSection`, `CTASection`, `TrustBar`, `SchemaMarkup`

---

## 需要创建/修改的文件

### 1. `src/lib/data/seo-pages.ts` — 新增 meta 条目

在 `chinaToursFromAucklandMeta` 之后，添加：

```typescript
export const chinaToursFromAustraliaMeta: SeoPageMeta = {
  slug: 'china-tours-from-australia',
  title: 'China Tours from Australia 2025 | Expert-Led China Travel | CTS Tours',
  description: 'China tours from Australia designed by specialists with 90+ years of experience. Departing Sydney, Melbourne & Brisbane. Visa-free for Australian passports. Expert guides, small groups. Book with CTS Tours.',
  h1: 'China Tours from Australia',
  heroSubtitle: 'Departing Sydney · Melbourne · Brisbane. Visa-free for AU passports. Expert-guided small groups.',
  introText:
    'CTS has been running China tours for nearly a century. For Australian travellers, we offer direct departures from Sydney (SYD), Melbourne (MEL), and Brisbane (BNE), with all logistics handled by our China specialists. Australian passport holders can enter mainland China visa-free for up to 30 days for tourism — making now an ideal time to go.\n\n' +
    'Whether you want a first-time China highlights loop covering Beijing, Xi\'an, and Shanghai, a Yangtze cruise with Chongqing and Chengdu, or a deeper journey through Yunnan or the Silk Road, our consultants tailor itineraries to your schedule and budget. All prices are quoted in AUD.',
  faqs: [
    {
      question: 'Do Australian citizens need a visa for China?',
      answer: 'No visa is required for most Australian travellers. Australian ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism. Bring your valid Australian passport, return flight confirmation, and hotel booking details. Check the Australian Department of Foreign Affairs for the latest conditions before travelling.'
    },
    {
      question: 'Which Australian cities have direct flights to China?',
      answer: 'Sydney (SYD) has the most direct flights to Shanghai (PVG) and Beijing (PEK), with flight times of approximately 11–12 hours. Melbourne (MEL) and Brisbane (BNE) also have regular services, sometimes with a short connection. CTS arranges the most convenient routing from your nearest Australian airport.'
    },
    {
      question: 'How long is the flight from Sydney to Beijing or Shanghai?',
      answer: 'Sydney to Shanghai is approximately 11–12 hours direct. Sydney to Beijing is similar, around 11–13 hours depending on routing. From Melbourne and Brisbane, add approximately 1–2 hours for connections if required.'
    },
    {
      question: 'Are CTS China tour prices quoted in Australian dollars?',
      answer: 'Yes. For Australian travellers, all prices are quoted in AUD with no hidden currency markups. Your consultant will provide a full cost breakdown covering international flights, accommodation, guided tours, and included meals before you commit to any booking.'
    },
    {
      question: 'What is the best China tour for first-time Australian visitors?',
      answer: 'The most popular first-time itinerary combines Beijing (Great Wall, Forbidden City, Temple of Heaven), Xi\'an (Terracotta Warriors, city walls), and Shanghai (Bund, Yu Garden, French Concession) — typically 10–14 days. For something more adventurous, our Fire & Fuzz tour combines Chongqing and Chengdu with giant pandas and the famous Liziba monorail-through-a-building.'
    },
    {
      question: 'How far in advance should I book a China tour from Australia?',
      answer: 'We recommend booking at least 8–12 weeks in advance to secure preferred departure dates, group availability, and optimal flight pricing. For peak travel periods (October–November, April–May), book 4–6 months ahead. Contact our team for current availability.'
    },
  ]
};
```

---

### 2. `src/app/china-tours-from-australia/page.tsx` — 新建页面

**模板：直接基于 `/china-tours-from-new-zealand/page.tsx`**，改动清单：

| 改动点 | NZ 页面 | AU 页面 |
|--------|---------|---------|
| import meta | `chinaToursFromNZMeta` | `chinaToursFromAustraliaMeta` |
| `path:` in metadata | `'/china-tours-from-new-zealand'` | `'/china-tours-from-australia'` |
| breadcrumb last item | `'From New Zealand'` | `'From Australia'` |
| breadcrumb url | `'/china-tours-from-new-zealand'` | `'/china-tours-from-australia'` |
| WebPage schema url | `'/china-tours-from-new-zealand'` | `'/china-tours-from-australia'` |
| WebPage schema address | `'Auckland, New Zealand'` | `'Sydney, Australia'` |
| `featuredTours` filter | `.filter(t => t.tier === 'signature').slice(0, 8)` | 同上（不变） |
| tour grid heading | `'China Tours Departing from New Zealand'` | `'China Tours Departing from Australia'` |

完整文件结构（照抄 NZ 页面，只替换上述差异点）：

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getAllChinaTours } from '@/lib/data/tours';
import { generateWebPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chinaToursFromAustraliaMeta } from '@/lib/data/seo-pages';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaToursFromAustraliaMeta.title,
    description: chinaToursFromAustraliaMeta.description,
    path: '/china-tours-from-australia',
    ogImagePath: `${TOUR_IMG}/great-wall-mist.jpg`,
    ogImageAlt: 'China Tours from Australia - Expert-Led Itineraries with CTS Tours',
    keywords: ['China tours from Australia', 'Australia China travel', 'AU China tours', 'CTS Tours Australia'],
    ogType: 'website',
  });
}

export default function ChinaToursFromAustraliaPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.tier === 'signature').slice(0, 8);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'From Australia', url: '/china-tours-from-australia' }
  ];

  const schemas = [
    generateWebPageSchema(
      chinaToursFromAustraliaMeta.title,
      chinaToursFromAustraliaMeta.description,
      '/china-tours-from-australia',
      { name: 'Australia', address: 'Sydney, Australia' }
    ),
    generateBreadcrumbListSchema(breadcrumbs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb — 照抄 NZ 页面结构，替换 breadcrumbs 数据 */}
      {/* Hero — 同 NZ 页面，title/subtitle 来自 chinaToursFromAustraliaMeta */}
      {/* TrustBar — 原样复用 */}
      {/* Intro text — 来自 chinaToursFromAustraliaMeta.introText */}
      {/* Tour Grid — 标题改为 "China Tours Departing from Australia" */}
      {/* FAQ — 来自 chinaToursFromAustraliaMeta.faqs */}
      {/* CTA Section — 原样复用 */}
    </>
  );
}
```

> ⚠️ 注意：实际实现时完整照抄 NZ 页面的 JSX，不要省略任何 section。上面只是结构提示。

---

### 3. Schema.org 结构化数据

页面需要两个 schema，照抄 NZ 页面模式：
- `WebPage` schema（地址改为 Sydney, Australia）
- `BreadcrumbList` schema

---

### 4. sitemap 自动收录

Next.js App Router 会自动将 `/china-tours-from-australia` 收录进 sitemap，无需额外操作。

---

## 验证步骤

```bash
npm run build
# 确认无 TypeScript 错误、无缺失 import

# 本地启动后检查
curl -s http://localhost:3010/china-tours-from-australia | grep -i "australia"
# 应在 <title>、<h1>、<meta description> 中出现

# 检查 Schema
curl -s http://localhost:3010/china-tours-from-australia | grep -i "schema"
```

---

## Git Commit

```bash
git add src/lib/data/seo-pages.ts
git add src/app/china-tours-from-australia/page.tsx
git commit -m "feat: add /china-tours-from-australia SEO page (AU geo-targeted, SV 720 target keyword)"
git push origin main
```

---

## 预期效果

- 上线后 4–8 周内 GSC 应出现 `china tours from australia` 展示量
- 目标：6 个月内进入 Top 20，12 个月内进入 Top 10
- 与 `/china-tours-from-new-zealand` 形成 AU/NZ 双市场覆盖
- 所有 AU 访客通过 Google 直接落地到针对性内容，转化率高于通用首页
