# Wave 3 — SEO 内容地基（C5 90 天长线）

> **目标**：5 个 SEO 落地页，覆盖 master_brief 主要关键词，建立 90 天 verdict 可验证的内容地基
> **预计耗时**：4-6 小时
> **风险等级**：低 - 中（新建页面较多，但都是 SEO-only，不涉及 enquiry 流程）

---

## 🎯 5 个目标页面对照表

| ME 数据库 plan_data 里的 slug | 真实现状 | 行动 |
|---|---|---|
| `/china-tours-from-new-zealand` | ✅ 已存在 `src/app/china-tours-from-new-zealand/page.tsx` | **内容深化 + schema 强化** |
| `/china-travel-specialists-nz` | ❌ 不存在 | **新建** |
| `/beijing-tours-kiwi` | ⚠️ 实际 slug 是 `/beijing-tours/`（已存在）| 在现有页强化 + 加 "from-kiwi-travellers" 角度内容 |
| `/china-visa-free-entry-nz` | ⚠️ 实际 slug 是 `/china-visa-guide-for-new-zealanders/`（已存在）| 在现有页强化 + 改 metadata 让 visa-free 关键词覆盖 |
| `/small-group-china-tours` | ❌ 不存在 | **新建** |

**真实工作量**：2 个新建 + 3 个强化 = 5 个页面。

---

## 🎯 任务 3.1 — `/china-tours-from-new-zealand/page.tsx` 内容深化

### 现状

- SEO #9, 月搜 170
- 已存在 page.tsx
- 距 P1 临门一脚（提升到 #5+ ROI 显著）

### 工作

```
Read src/app/china-tours-from-new-zealand/page.tsx
```

诊断 3 个维度：
1. **content depth** — 是否覆盖 master_brief 5 个 content_pillars 中的关键内容？
2. **schema** — 是否有 Article + TouristTrip + FAQPage 全套？
3. **internal links** — 是否链到 /campaigns/october-2026/* + /china-visa-guide-for-new-zealanders + /great-wall-travel-guide + /terracotta-warriors-travel-guide？

### 改造方向

- 补 master_brief 没覆盖到的 pillar 内容
- 加 TouristTrip schema（AggregateOffer 指向 NZD $3,399 / $3,480 两团）
- 加 4 个内部链接（visa / great-wall / terracotta / spotlight campaigns）

---

## 🎯 任务 3.2 — `/china-travel-specialists-nz/page.tsx` 新建

### 目的

打 "china travel specialists nz" + "china travel agency new zealand" + "china travel agency auckland" 一系列高商业意图词。

### 内容结构（参考 master_brief content_pillars）

```
H1: New Zealand's China Travel Specialists Since 1928
Subtitle: 98 years. 1,200+ Kiwi travellers. Direct operations across China.

Section 1: Why Specialists Beat Generalists
- 直接对比 mass-market operators (Wendy Wu 等)
- "我们直营 vs 二手转售"
- "98 年扎根 vs 几年加盟"

Section 2: How We're Different
- Direct China operations
- ATAS accredited
- Auckland-based team (Baker Gu 等)
- Hand-crafted itineraries (not packaged tours)

Section 3: 1,200+ Kiwi Travellers Trust Us
- 简短 testimonial 摘选（master_brief social_proof_celebration pillar）
- "Margaret & John 50th anniversary" 等真实案例（如 master_brief 有）

Section 4: Our Most-Booked Tours
- Tale of Two Cities (Beijing + Xi'an) — NZD $3,480
- Shanghai & Surroundings — NZD $3,399
- + 链到 destinations

Section 5: FAQ
- "How are you different from online booking platforms?"
- "Do you arrange visas?"
- "What's included in your tours?"
- "Why is NZD pricing important?"

Section 6: CTA
- "Speak with our specialists" → enquiry page
```

### 文件骨架

```tsx
// src/app/china-travel-specialists-nz/page.tsx
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'China Travel Specialists NZ | CTS Tours Auckland — Since 1928',
    description: 'New Zealand\'s longest-running China travel specialists. 98 years of expertise, 1,200+ Kiwi travellers, direct on-ground China operations. Auckland-based team.',
    path: '/china-travel-specialists-nz',
    keywords: ['china travel specialists nz', 'china travel agency new zealand', 'china travel agency auckland', 'china specialists nz', 'best china tour operator nz'],
    ogType: 'website',
  });
}

export default function ChinaTravelSpecialistsNzPage() {
  const siteUrl = getSiteUrl();
  
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CTS Tours',
      url: siteUrl,
      foundingDate: '1928',
      description: '...',
      address: { '@type': 'PostalAddress', addressCountry: 'NZ', addressLocality: 'Auckland' },
      hasOfferCatalog: { /* ... */ },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How are you different from...', acceptedAnswer: {...} },
        // 4-6 FAQ
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup data={schema} />
      <main>
        {/* Section 1-6 */}
      </main>
    </>
  );
}
```

⚠️ 内容部分**必须真实**，不能编：
- 96 年历史 / 1,200+ Kiwi 客户 / Baker Gu 20+ years / Auckland-based → master_brief 有
- 任何具体客户名 / 具体团友数 / 具体年份数据 → 必须能在 master_brief 或现有内容找到来源
- 找不到的，**用通用表述**，不编

---

## 🎯 任务 3.3 — `/beijing-tours/page.tsx` 强化

### 现状

- 已存在 `src/app/beijing-tours/page.tsx`
- 目标词 "beijing tours kiwi" / "beijing tours from new zealand"

### 改造

- 强化 metadata 关键词
- 加 internal link 到 great-wall guide + terracotta guide + Tale of Two Cities campaign
- 检查 schema 是否完整

---

## 🎯 任务 3.4 — `/china-visa-guide-for-new-zealanders/page.tsx` 强化

### 现状

- 已存在
- master_brief 提到 "China's 15-day Visa-free Entry for NZ Passport Holders (2026 update)"

### 改造

- metadata 加 "china visa free entry nz" 关键词（这是核心 trending 词）
- 内容加 visa-free 政策 update section
- 加 FAQ schema 覆盖 "Do NZ passport holders need a visa for China?" / "How long can NZ passport stay visa-free?"

---

## 🎯 任务 3.5 — `/small-group-china-tours/page.tsx` 新建

### 目的

打 "small group china tours" / "small group china tours new zealand" / "guided china tour nz"

### 内容结构

```
H1: Small-Group China Tours from New Zealand
Subtitle: Why Kiwi travellers choose CTS small-group tours over mass-market operators

Section 1: What's a "Small Group"?
- 12-16 人上限
- 真正的本地导游
- 灵活行程

Section 2: vs Mass-Market Tours
- 体验对比
- 价值对比

Section 3: Our Small-Group Tours
- October 2026 Tale of Two Cities — 10 days, NZD $3,480
- October 2026 Shanghai & Surroundings — 10 days, NZD $3,399
- + 链到 tour pages

Section 4: Testimonials

Section 5: FAQ

Section 6: CTA
```

类似 3.2 的文件骨架。

---

## 📊 Wave 3 完成后给 PM 的汇报模板

```markdown
# Wave 3 完成 — SEO 内容地基（5 落地页）

## 改动文件
- src/app/china-tours-from-new-zealand/page.tsx (强化)
- src/app/china-travel-specialists-nz/page.tsx (新建)
- src/app/beijing-tours/page.tsx (强化)
- src/app/china-visa-guide-for-new-zealanders/page.tsx (强化)
- src/app/small-group-china-tours/page.tsx (新建)

## 内容来源声明（板桥铁律 R1）
- 96 年 / 1928 → master_brief ✅
- 1,200+ Kiwi → master_brief ✅
- Baker Gu 20+ years → master_brief ✅
- Auckland-based → master_brief ✅
- October 2026 团价 NZD $3,399 / $3,480 → src/lib/campaigns/october-2026-discovery.ts ✅
- 任何其他数据 → 注明来源

## 验证
- [x] 5 个 URL 全部跑通
- [x] view-source 看 schema 完整
- [x] npm run build 通过
- [x] sitemap.ts 已加 2 个新页（如需）
- [x] mobile responsive
- [x] 内链交叉检查（每页至少 3 个 internal link 到其他 4 页 + Wave 1/2 页面）

## 内链网络
- /china-tours-from-new-zealand ⇄ /china-travel-specialists-nz ⇄ /small-group-china-tours
- 三个 SEO category 页 → 链 /campaigns/october-2026/* + /great-wall-travel-guide + /terracotta-warriors-travel-guide + /beijing-tours

## 待决策
- <列出拿不准的>
```

---

## ⏭️ 整个 Sprint 完成后

PM 会在 ME 数据库标记对应 execution_items 为 `completed`，启动 90 天 verdict 跟踪：
- C5 SEO Initiative 跑 30 天后看 GSC 排名变化
- 6 周后看 organic_traffic 是否从 158 提升到 250+
- 90 天后判 verdict 是否成立
