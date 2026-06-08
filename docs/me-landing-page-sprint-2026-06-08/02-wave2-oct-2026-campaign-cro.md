# Wave 2 — Best of China 主推 + Oct 两团 LP CRO + Tour 模板同步

> **2026-06-08 PM 修正**：
> - Wave 2 主推：**Best of China (Essentials) 11/3 出发** #1 优先级
> - Oct 两团辅助：Tale of Two Cities + Shanghai & Surroundings
> - **Fire & Fuzz 已从本轮推广移除**（PM 2026-06-08 决定）
> - 共 **3 个落地页**
>
> **目标**：C1 FB Ads + C2 Google Ads 启动后流向的 3 个落地页 CRO 化，转化率 baseline 估 1.5-2% → target 3.5%+
> **预计耗时**：3-4 小时
> **风险等级**：中（CLAUDE.md 强约束：campaign LP 改了 tour 模板要同步）

---

## 🌟 2026 主力推广团（PM 2026-06-09 修正）

**主力 (Primary)**：China Discovery — **Best of China (Essentials)**
- URL: `/tours/china/discovery/essentials`
- 出发: **2026-11-03**（距今 ~5 个月，Meta paid 预热黄金窗口）⚠️ 2026-06-09 修正：原 spec 写 9/3 是错的，FB Sprint grep tours.ts 校正
- 价格: **NZD $3,880 per person / 15 天**（singleSupplement +$720）⚠️ 2026-06-09 修正：原 spec 写 $4,539 是错的
- 行程: Beijing + Xi'an Terracotta + Puyuan 水乡 + Hangzhou 西湖 + Shanghai
- 数据来源: `src/lib/data/tours.ts` line 767-846 (slug='essentials')
- **Hero USP 三连**（master_brief 已列，竞品 hero 都用）：Small group · Fully inclusive · Award-winning since 1928

**辅助 — Oct 2026 Spotlight 两团 (Focus campaign)**：
1. **Tale of Two Cities** (Beijing + Xi'an) — 10/15 出发，NZD $3,480 / 10 天
2. **Shanghai & Surroundings** — 10/14 出发，NZD $3,399 / 10 天

**已移除**：Fire & Fuzz (Chongqing × Chengdu) — PM 2026-06-08 决定不在本轮推广。`/campaigns/fire-fuzz` LP **不在本 Wave 2 范围**，跳过。

---

## 🎯 任务 2.0 ⭐ #1 优先级 — `/tours/china/discovery/essentials` (Best of China 主推)

### 现状

- **真实路径**：`src/app/tours/[destination]/[tier]/[tour]/page.tsx`（动态路由）
- **Slug**：`essentials`（在 tier=`discovery`）
- **Tour 数据**：`getTourBySlug('china', 'discovery', 'essentials')`
- **出发日期**：2026-11-03 (PM 2026-06-09 修正：原 9/3 是错的)
- **价格**：NZD $3,880 (PM 2026-06-09 修正：原 $4,539 是错的，tours.ts 真值)
- **持续**：15 天

### Read before write 必读

```
Read src/lib/data/tours.ts (找 slug='essentials' 完整数据 — 大约在 line 768-870 区间)
Read src/app/tours/[destination]/[tier]/[tour]/page.tsx
Read src/components/tours/TourHero.tsx
Read src/components/TourTrustSignals.tsx (#trust-signals 区块)
Read src/components/ChinaVisaNudge.tsx (#visa-nudge 区块)
Read src/components/TourSupportingContentLinks.tsx (#planning-resources)
```

### 缺口（要改的）

主推团 + 11/3 出发距今最近，应该有最强 CRO 信号：

1. **Hero 上方 trust signal strip** — "Since 1928 · ATAS accredited · Auckland-based experts · thousands of Kiwi travellers"（**R1 红线 PM 2026-06-09**：不写 "1,200+" 具体客户数，用 "thousands of Kiwi travellers" 模糊表述）
2. **Above-the-fold 紧迫性 chip** — "Featured departure 3 November 2026 — limited seats"（**真实出发日期，不编"剩 X 座"**）
3. **🆕 Hero USP 三连**（PM 2026-06-09 加 — master_brief 已列 USP，竞品 hero 都用 CTS 没用是失分）：
   - **"Small group"** — 跟 Wendy Wu/Trafalgar hero 词正面对齐
   - **"Fully inclusive"** — CTS 真实是 fully inclusive，但 LP 没强调
   - **"Award-winning since 1928"** — 把 since 1928 跟 award-winning 绑一起反 mass-market
   - 第 4 USP "direct on-ground operations" 留给段落叙事
4. **15 天行程深度 hero** — 强化 5 大节点（Beijing/Xi'an/Puyuan/Hangzhou/Shanghai）— 跟 10 天 Oct 两团差异化
5. **Middle CTA + footer CTA** — enquiry 按钮复用
6. **TouristTrip schema 强化** — AggregateOffer **NZD $3,880**（不是 $4,539）, 15 天，覆盖 5 个城市
7. **价值 stack 区** — 为什么 15 天值 **NZD $3,880**？vs 10 天 Oct 两团（$3,399-$3,480 / 10 天），多 5 天 cover Puyuan 水乡 + West Lake 等 mass-market operator 不去的地方

### 改造步骤

#### Step 1: 验证 tour data 完整

```bash
# 在 Read tours.ts 后，确认 Essentials 的 highlights / inclusions / itinerary 完整
# 不要编任何数据
```

#### Step 2: 加 trust signal strip + 紧迫性 chip

按 Wave 1 任务 1.1 Step 3 同模式。**注意**：因为这是 tour template（不是 campaign LP），改这里如果用 `<CtsTrustStrip />` 独立组件方案，**会同时影响所有 tour 模板渲染** — 子牙建议这是好事（其他 tour 也受益），但要 PM 确认。

#### Step 3: TouristTrip schema 强化

```ts
{
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'China Discovery — Best of China (15 Days from New Zealand)',
  description: 'CTS Tours\' flagship 15-day China tour for Kiwi travellers — Beijing, Xi\'an Terracotta Warriors, Puyuan water town, Hangzhou West Lake, Shanghai. Hand-crafted by NZ\'s longest-running China specialists since 1928.',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'TouristAttraction', name: 'Beijing — Temple of Heaven, Forbidden City, Great Wall, hutongs' },
      { '@type': 'TouristAttraction', name: 'Xi\'an — Terracotta Warriors, City Wall, Muslim Quarter' },
      { '@type': 'TouristAttraction', name: 'Puyuan — Fashion Ancient Town (Song-style waterways)' },
      { '@type': 'TouristAttraction', name: 'Hangzhou — West Lake, Longjing tea, Qinghefang Ancient Street' },
      { '@type': 'TouristAttraction', name: 'Shanghai — Yuyuan Garden, Bund, Nanjing Road, Lujiazui' },
    ],
  },
  touristType: ['Cultural travellers', 'Heritage tourism', 'Photography enthusiasts', 'First-time China travellers'],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'NZD',
    price: '3880',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
    url: `${siteUrl}/tours/china/discovery/essentials`,
  },
  provider: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
}
```

#### Step 4: 价值 stack 段落（15 天 vs 10 天 Oct 两团差异化）

在中间区域加：

```tsx
<section className="bg-warm-50 py-12 border-y border-warm-200">
  <div className="container mx-auto px-4 max-w-3xl">
    <h2 className="font-serif text-2xl font-semibold text-accent mb-4 text-center">
      Why 15 Days, Not 10?
    </h2>
    <p className="text-gray-700 mb-6 leading-relaxed">
      Most operators send Kiwi travellers to China for 10 days — enough for the headliners 
      (Beijing, Xi'an, or Shanghai), but not enough to step beyond the well-trodden tourist trail.
    </p>
    <p className="text-gray-700 mb-6 leading-relaxed">
      The extra 5 days on our Best of China itinerary cover:
    </p>
    <ul className="space-y-2 text-gray-700">
      <li>✓ <strong>Puyuan Fashion Ancient Town</strong> — Song-dynasty waterways most tour groups skip</li>
      <li>✓ <strong>Hangzhou's West Lake</strong> — UNESCO heritage with Su Causeway, Leifeng Pagoda</li>
      <li>✓ <strong>Meijiawu Longjing tea plantation</strong> — actual tea farms, not gift shops</li>
      <li>✓ <strong>Qinghefang Ancient Street</strong> — Hangzhou's living heritage quarter</li>
      <li>✓ Time to <em>actually experience</em> each city instead of just transiting through</li>
    </ul>
  </div>
</section>
```

### 验收标准

- [ ] TouristTrip schema 包含 5 个 TouristAttraction
- [ ] hero 上方 trust signal strip
- [ ] above-the-fold 显示 11/3 出发日期 + NZD $3,880 (PM 2026-06-09 修正：原 $4,539 是错的，tours.ts 真值) 价格
- [ ] 价值 stack "Why 15 Days, Not 10?" 段落上线
- [ ] middle CTA + footer CTA 复用 enquiry 按钮
- [ ] `npm run build` 通过
- [ ] mobile responsive

---

## 🎯 任务 2.1 — `/campaigns/october-2026/tale-of-two-cities/page.tsx`

（原 Wave 2 任务 2.1 内容保持，只把"主推"角色让给 Essentials，这里降为"辅助"）

### 现状

- **真实路径**：`src/app/campaigns/october-2026/[slug]/page.tsx`（动态路由）
- **Slug**：`tale-of-two-cities`
- **Tour 数据**：`getTourBySlug('china', 'discovery', 'beijing-xian')`
- **出发日期**：10/15 October 2026
- **价格**：NZD $3,480

### CRO 改造清单（同原版）

1. Hero 上方 trust signal strip（用 `<CtsTrustStrip />` 独立组件）
2. Above-the-fold 加 social proof（1,200+ Kiwi · since 1928 · ATAS）
3. Limited departures urgency widget — **绝不编"剩 X 座"**，用通用表述
4. 不要随意改 enquiry 流程为 inline form — 多复用 enquiry 按钮位置即可

### 不忘的差异化

**这一团 vs Essentials 的区别**：10 天版本，更聚焦 Beijing + Xi'an 经典路线。文案可以提"如果你想专注 Beijing + Xi'an 两座古都而不旁征博引，10 天版本是你的选择"。

---

## 🎯 任务 2.2 — `/campaigns/october-2026/shanghai-surroundings/page.tsx`

跟任务 2.1 几乎一样：

- **出发日期**：10/14 October 2026
- **价格**：NZD $3,399
- **Tour 数据**：`getTourBySlug('china', 'discovery', 'shanghai-surroundings')`
- **enquirySource**：`Campaign LP: Oct 2026 — Shanghai & Surroundings`

由于这两个 campaign LP 用的是同一个动态路由 `[slug]/page.tsx`，改动是**一次性**：改了 page.tsx 两个 slug 都受益。

### 差异化

**vs Essentials**：10 天版本，聚焦 Yangtze Delta（Shanghai + Suzhou + Wuxi + Xinshi + Hangzhou），不去 Beijing/Xi'an。"如果你想专注江南水乡 + 现代 Shanghai 而不去北方"。

---

## 🎯 任务 2.3 — Tour 模板同步（CLAUDE.md 强约束）

CLAUDE.md 第 2 节明确：**改了 campaign LP 的共享区块，tour template 也要改**。反过来同样：**改了 tour template (Essentials)，campaign LP 也要同步**。

### 涉及文件

- `src/app/tours/[destination]/[tier]/[tour]/page.tsx`（tour template，渲染 `essentials` + `beijing-xian` + `shanghai-surroundings`）
- `src/app/campaigns/october-2026/[slug]/page.tsx`（campaign LP，渲染 `tale-of-two-cities` + `shanghai-surroundings`）

### 同步规则

| 改的区块 | 是否要同步 |
|---|---|
| Hero 上方 trust strip | ✅ 3 个落地页全部同步 |
| Hero 内 above-the-fold 社会证明 | ✅ 3 个落地页全部同步 |
| Limited departures urgency widget | ✅ 3 个落地页全部同步（Essentials 显示 9/3, Oct 两团显示 10/14-15）|
| **Essentials "Why 15 Days, Not 10?" 段落** | ❌ 不同步（Essentials-only）|
| TouristTrip schema | ✅ 3 个落地页各自定制（不同行程 / 价格 / 持续）|

### 测试

```bash
npm run dev
# 验证 5 个 URL：
# /tours/china/discovery/essentials             ⭐ 主推
# /campaigns/october-2026/tale-of-two-cities
# /campaigns/october-2026/shanghai-surroundings
# /tours/china/discovery/beijing-xian           (tour template 同步)
# /tours/china/discovery/shanghai-surroundings  (tour template 同步)
```

### Fire & Fuzz 不在范围

`/campaigns/fire-fuzz/page.tsx` + `/tours/china/discovery/chongqing-chengdu/` 本 Wave 2 **不动**（PM 2026-06-08 决定 Fire & Fuzz 不在本轮推广）。

---

## 📊 Wave 2 完成后给 PM 的汇报模板

```markdown
# Wave 2 完成 — Essentials 主推 + Oct 两团 LP CRO + Tour 模板同步

## 改动文件
- src/app/tours/[destination]/[tier]/[tour]/page.tsx (tour template, +N 行)
  - 影响：essentials / beijing-xian / shanghai-surroundings 共 3 个 tour
- src/app/campaigns/october-2026/[slug]/page.tsx (campaign LP, +N 行)
- src/components/CtsTrustStrip.tsx (新建 trust signal 独立组件)

## CRO 改动清单
- [x] Hero 上方 trust signal strip (3 落地页同步)
- [x] Above-the-fold 社会证明 (3 落地页同步)
- [x] Limited departures urgency widget (3 落地页各自真实出发日期)
- [x] Essentials "Why 15 Days, Not 10?" 价值 stack 段落
- [x] TouristTrip schema 3 落地页各自定制
- [x] middle + footer enquiry CTA 复用
- [x] **不动** /campaigns/fire-fuzz 和 chongqing-chengdu tour 模板（Fire & Fuzz 已移除）

## 数据来源声明（板桥铁律 R1）
- Essentials 行程 5 节点 → tours.ts slug='essentials' itinerary ✅
- Essentials NZD $3,880 (PM 2026-06-09 修正：原 $4,539 是错的，tours.ts 真值) / 15 天 → tours.ts ✅
- Oct 两团出发日 → october-2026-discovery.ts ✅
- 1,200+ Kiwi / 98 年 since 1928 / ATAS → master_brief ✅
- "Limited departures" → 真实出发日期，没编"剩 X 座" ✅

## 验证
- [x] 7 个 URL 全部跑通（4 LP + 3 tour template）
- [x] view-source 4 个 LP 各自 TouristTrip schema 存在
- [x] npm run build 通过
- [x] mobile responsive 验证

## 提交
- Branch: feat/me-landing-sprint-wave2-2026-06-08
- Commit: feat(landing): Wave 2 — Essentials 主推 + Oct 两团 LP CRO + tour 模板同步 [ME-Sprint-2026-06-08]

## 待决策
- <列出拿不准的>
```

---

## ⏭️ 下一步

Wave 2 跑完 → 找 PM check → 推进 Wave 3 (`03-wave3-seo-foundation.md`)
