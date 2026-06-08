# Wave 1 — Opportunity Keywords CRO + Schema

> **目标**：把 2 个接近首页的机会词页面冲到 P1-P5
> **预计耗时**：2-3 小时
> **风险等级**：低（不动 routing，不动 data，只改 page.tsx + schema + content）

---

## 🎯 任务 1.1 — `/great-wall-travel-guide/page.tsx`

### 现状

- **SEO 排名**：#10
- **月搜量**：590
- **当前文件**：`src/app/great-wall-travel-guide/page.tsx`
- **架构**：`DestinationGuide` 组件 + `getGuideBySlug('great-wall-travel-guide')` data
- **已有 schema**：Article + BreadcrumbList + FAQPage ✅
- **已有 CTA**：底部有 "Book a Great Wall of China Tour" 段落 ✅

### 缺口（要改的）

1. **Hero 上方缺社会证明 trust badge**：当前 hero 没有 "1,200+ Kiwi travellers since 1928" 强信号
2. **缺 TouristTrip schema** — 现在只是 Article schema，没把 Great Wall tour 标成可预订的旅游产品
3. **底部 CTA 单薄** — 缺单页 inline form 直接收 lead，用户要跳页才能 enquire
4. **缺紧迫性 widget** — Oct 2026 三团已经在卖了，但这页完全没提
5. **内容深度不够** — Mutianyu / Badaling / Jinshanling 三段对比可能在 guide data 里但 PM 没空 audit 内容质量

### 工作步骤

#### Step 1: Read 现状（必做）
```
Read src/app/great-wall-travel-guide/page.tsx
Read src/components/seo/DestinationGuide.tsx 
Read src/lib/data/guides/index.ts (找 great-wall-travel-guide data)
Read src/components/SchemaMarkup.tsx
Read src/components/TrustBar.tsx
```

#### Step 2: 加 TouristTrip schema

在 page.tsx 现有 `schema` 数组追加（不是替换）：

```ts
{
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Great Wall of China Tours from New Zealand',
  description: 'Hand-crafted Great Wall experiences featuring Mutianyu, Badaling, and Jinshanling sections, included in CTS Tours\' Beijing and Tale of Two Cities itineraries for Kiwi travellers.',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'TouristAttraction', name: 'Mutianyu Great Wall' },
      { '@type': 'TouristAttraction', name: 'Badaling Great Wall' },
      { '@type': 'TouristAttraction', name: 'Jinshanling Great Wall' },
    ],
  },
  touristType: ['Cultural travellers', 'Heritage tourism', 'Photography enthusiasts'],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'NZD',
    lowPrice: '3480',
    availability: 'https://schema.org/InStock',
    url: `${siteUrl}/campaigns/october-2026/tale-of-two-cities`,
  },
  provider: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
}
```

#### Step 3: Hero 上方加 Trust signal strip

寻找 `DestinationGuide` 渲染的位置，在 hero 之前注入 `<TrustBar />`（如果还没有）或者在 page.tsx 包一层 trust signal section：

参考现有 TrustBar 组件，**先 Read 它确认 props**。如果改 DestinationGuide 影响其他 guide 页面就**不要改**，改用 page.tsx 包裹模式：

```tsx
return (
  <>
    <SchemaMarkup data={schema} />
    {/* New: trust signal strip above hero */}
    <section className="bg-warm-50 border-b border-warm-200 py-3">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <span className="font-semibold text-accent">CTS Tours</span> · 
        Trusted by 1,200+ Kiwi travellers · China specialists since 1928 · 
        ATAS accredited · Auckland-based experts
      </div>
    </section>
    <DestinationGuide guide={guide} />
    {/* Existing CTA section */}
    ...
  </>
);
```

#### Step 4: 底部 CTA 升级 — 加 inline form + October 出发 urgency

当前底部 "Book a Great Wall of China Tour" 段落保留，**追加**：

```tsx
{/* October 2026 urgency widget */}
<section className="bg-accent text-white py-12">
  <div className="container mx-auto px-4 text-center">
    <p className="text-xs uppercase tracking-wider mb-2 opacity-80">Limited Departures</p>
    <h2 className="font-serif text-3xl font-semibold mb-3">
      October 2026 Tale of Two Cities — Includes Mutianyu Great Wall
    </h2>
    <p className="mb-6 max-w-2xl mx-auto opacity-90">
      Beijing & Xi'an by high-speed train. 10 days from <strong>NZD $3,480</strong>. 
      Featured departure 15 October 2026.
    </p>
    <Link 
      href="/campaigns/october-2026/tale-of-two-cities"
      className="inline-block bg-white text-accent px-8 py-3 rounded-full font-semibold hover:bg-warm-50 transition"
    >
      See Tale of Two Cities October Departure →
    </Link>
  </div>
</section>
```

`Link` 来自 `next/link`。

⚠️ **不要嵌入完整 inline form** — 项目已有 `TailorMadeForm` / `TailorMadeQuickPlan` 组件，先 Read 它们再决定。如果嵌入会跟现有 enquiry 流程冲突，**用 CTA Link 跳到 enquiry 页就好**。

#### Step 5: 验证

```bash
npm run lint   # 不能有新 TS error
npm run build  # 必须通过
```

启动 dev server 看效果：
```bash
npm run dev
# 打开 http://localhost:3010/great-wall-travel-guide
```

### 验收标准

- [ ] page.tsx 加了 TouristTrip schema（不是替换 Article schema）
- [ ] 页面顶部 hero 上方有 trust signal strip
- [ ] 页面底部加了 October 2026 urgency CTA section
- [ ] `npm run build` 通过
- [ ] 浏览器 view-source 能看到 4 个 schema（Article + BreadcrumbList + FAQPage + TouristTrip）
- [ ] Mobile responsive（resize 到 375px 看排版不破）

---

## 🎯 任务 1.2 — `/terracotta-warriors-travel-guide/page.tsx`

### 现状

- **SEO 排名**：#14
- **月搜量**：**1600** ← CTS 最高 ROI 机会词
- **架构**：同上 `DestinationGuide` 组件
- **CTA 目标**：Tale of Two Cities (Beijing + Xi'an) campaign，Xi'an 行程包含兵马俑

### 缺口

跟任务 1.1 几乎一样，加 4 件事：

1. **TouristTrip schema** — 把兵马俑标成可预订旅游产品
2. **Hero trust signal** — 1,200+ Kiwi + 1928
3. **Tale of Two Cities campaign CTA** — 直接链到 `/campaigns/october-2026/tale-of-two-cities`
4. **Baker Gu 专家叙事** — master_brief 里 Baker Gu 是 CTS 20+ 年 China 专家，Terracotta 文化深度叙事天然适合带专家身份信号

### 工作步骤

类似任务 1.1，区别：

#### TouristTrip schema 数据

```ts
{
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Terracotta Warriors Tour from New Zealand',
  description: 'Xi\'an\'s Terracotta Warriors are the centrepiece of CTS Tours\' Tale of Two Cities itinerary — Beijing + Xi\'an by high-speed train, hand-crafted for Kiwi travellers since 1928.',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'TouristAttraction', name: 'Terracotta Warriors Museum (Pits 1, 2, 3)' },
      { '@type': 'TouristAttraction', name: 'Emperor Qin Shi Huang\'s Mausoleum' },
      { '@type': 'TouristAttraction', name: 'Xi\'an City Wall' },
      { '@type': 'TouristAttraction', name: 'Muslim Quarter' },
    ],
  },
  touristType: ['Cultural travellers', 'Heritage tourism', 'History enthusiasts'],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'NZD',
    lowPrice: '3480',
    availability: 'https://schema.org/InStock',
    url: `${siteUrl}/campaigns/october-2026/tale-of-two-cities`,
  },
  provider: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
}
```

#### Baker Gu 叙事段（在 CTA 上方插入）

```tsx
<section className="bg-warm-50 py-10 border-t border-warm-200">
  <div className="container mx-auto px-4 max-w-3xl">
    <div className="flex items-center gap-4 mb-4">
      {/* 如果有 Baker Gu 头像图，用 OptimizedImage；如果没有，跳过 */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500">CTS Tours Specialist</p>
        <h3 className="font-serif text-xl font-semibold text-accent">
          Baker Gu — 20+ years crafting China tours for Kiwis
        </h3>
      </div>
    </div>
    <p className="text-gray-700 leading-relaxed">
      "The Terracotta Warriors aren't just a photo stop. Standing in front of Pit 1, 
      knowing each soldier was crafted individually two millennia ago — that's the 
      kind of moment that defines a China trip. Our Tale of Two Cities itinerary 
      gives our Kiwi travellers private access slots before the crowds arrive."
    </p>
  </div>
</section>
```

⚠️ **如果 master_brief 没有 Baker Gu 的真实 quote**，**不要编**。用第三人称叙事：

```tsx
<p className="text-gray-700 leading-relaxed">
  Our Tale of Two Cities itinerary is led by CTS specialists with 20+ years 
  on the ground in China, ensuring our Kiwi travellers experience the Terracotta 
  Warriors with the depth and access that mass-market operators simply cannot offer.
</p>
```

### 验收标准

同任务 1.1。

---

## 📊 Wave 1 完成后给 PM 的汇报模板

```markdown
# Wave 1 完成 — Great Wall + Terracotta CRO

## 改动文件
- src/app/great-wall-travel-guide/page.tsx (+X 行)
- src/app/terracotta-warriors-travel-guide/page.tsx (+X 行)
- src/components/TrustBar.tsx (如改)

## 验证
- [x] npm run lint 通过
- [x] npm run build 通过
- [x] dev server :3010 验证 2 页正常渲染
- [x] view-source 4 schemas 全部出现

## 提交
- Branch: feat/me-landing-sprint-wave1-2026-06-08
- Commit: feat(landing): Wave 1 — Great Wall + Terracotta CRO + TouristTrip schema [ME-Sprint-2026-06-08]
- PR URL: <gh pr create 后返回的 URL>

## 待决策
- <列出我遇到拿不准的事，比如 Baker Gu 头像图找不到 / inline form 选哪个组件 / etc>
```

---

## ⏭️ 下一步

Wave 1 跑完 → 找 PM check → 推进 Wave 2 (`02-wave2-oct-2026-campaign-cro.md`)
