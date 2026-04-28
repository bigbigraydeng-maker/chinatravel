# Spec: 新建 /chengdu-panda-sanctuary SEO 专项页

**任务类型：** 新 SEO 页面  
**优先级：** 最高（SV 320，无旅游商竞争）  
**预计工时：** 2–3 小时  
**执行人：** Claude Code CLI  
**数据来源：** 关键词竞品分析 2026-04-25 + Fire & Fuzz master brief

---

## 背景与数据

| 关键词 | SV | KD | 当前 #1 | CTS排名 |
|--------|----|----|---------|---------|
| chengdu panda sanctuary | 320 | 35 | panda.org.cn（非旅游商） | pos 10（5次展示） |
| chengdu panda tour | 中等 | 低 | 无强竞品 | 未排名 |
| giant panda chengdu tour | 中等 | 低 | 无强竞品 | 未排名 |
| chengdu panda tour new zealand | 低 | 极低 | 无 | 未排名 |

**核心机会：** 搜索量 320 的词，#1 是大熊猫保护区官网（panda.org.cn），不售卖任何旅游产品。整个 SERP 没有真正意义上的旅游商竞品。一个专项页即可进入 Top 3。

**产品背景：** Fire & Fuzz 行程（10天，NZD $2,999）Day 7 包含成都大熊猫繁育研究基地（成都研究基地）晨间参观，是行程最具情感共鸣的体验节点，master brief 明确标注：*"this is the single most emotionally resonant experience of the tour"*。

---

## 页面定位

这个页面是一个 **SEO 引流页**，目标是：
1. 捕获所有搜索 "chengdu panda sanctuary/tour" 的 NZ/AU 用户
2. 提供真实有用的参观信息（建立信任）
3. 自然导向 Fire & Fuzz 产品页（转化）

---

## Meta 数据

### `title`
```
Chengdu Giant Panda Sanctuary Tour 2026 | See Pandas in the Wild | CTS Tours NZ
```

### `description`
```
Visit the Chengdu Research Base of Giant Panda Breeding — home to 200+ giant pandas. Morning feeding time, bamboo forests, red pandas. Part of CTS Tours' Fire & Fuzz 10-day tour from New Zealand. Visa-free for NZ passports.
```

### `h1`
```
Chengdu Giant Panda Sanctuary: A Complete Guide for New Zealand Visitors
```

---

## 页面结构（参照 /china-tours-from-new-zealand 模式）

### 文件路径
```
src/app/chengdu-panda-sanctuary/page.tsx
```

### 1. Hero Section
- Title: `h1` 如上
- Subtitle: `Home to 200+ giant and red pandas · Morning feeding visits · Part of Fire & Fuzz 10-day tour from NZ`
- Hero image: Supabase `tour-images/chengdu-pandas.jpg`（已有）

### 2. Intro 段落（约200词）

内容要点：
- 成都大熊猫繁育研究基地（Chengdu Research Base of Giant Panda Breeding）成立于1987年
- 3,500英亩竹林，200+只大熊猫和小熊猫
- 早晨喂食时间（10点前）是最佳参观时机，熊猫活跃度最高
- 目前野生大熊猫仅约1,800只（IUCN），该基地是全球领先的保育与繁育中心
- CTS 的 Fire & Fuzz 行程包含 Day 7 早晨参观

### 3. 参观实用信息 Section（以卡片或列表形式）

| 项目 | 内容 |
|------|------|
| 最佳参观时间 | 早上8:00–10:00（喂食时间，熊猫最活跃） |
| 地址 | 成都市成华区熊猫大道1375号 |
| 开放时间 | 全年 7:30–18:00 |
| 成人票价 | CNY 58（约 NZD 13） |
| 参观时长 | 建议2.5–3小时 |
| 交通 | 地铁3号线 大熊猫繁育研究基地站 直达 |
| 最佳月份 | 3–5月、9–11月（天气凉爽，熊猫户外活动多） |

### 4. What You'll See Section
- Giant pandas（成年大熊猫）
- Red pandas（小熊猫）
- Panda cubs（幼崽，季节性）
- 竹林步道、繁育区、月亮产房

### 5. CTS Tour CTA Section（重点）

标题：**See Pandas as Part of Our 10-Day Chongqing & Chengdu Tour**

内容：
- Fire & Fuzz 行程包含 Day 7 大熊猫基地晨游
- 10天，包含重庆穿楼地铁、洪崖洞、乐山大佛、Dazu石窟
- 从 NZD $2,999 起
- 按钮：`View Fire & Fuzz Itinerary →` → `/tours/china/discovery/chongqing-chengdu`

### 6. FAQ Section（5–6条）

```typescript
faqs: [
  {
    question: 'What is the Chengdu Panda Sanctuary?',
    answer: 'The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is the world\'s leading giant panda conservation and breeding facility, established in 1987. Located in Chengdu, Sichuan Province, it is home to more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat. It is the best place in the world to see giant pandas up close in a naturalistic environment.'
  },
  {
    question: 'What time should I visit Chengdu Panda Base?',
    answer: 'Visit as early as possible — ideally by 8:00am. Giant pandas are most active during their morning feeding session, typically between 8:00am and 10:00am. After 10am, pandas often retreat to shade and sleep for much of the day. CTS Tours schedules the panda base visit first thing on Day 7 of the Fire & Fuzz itinerary specifically for this reason.'
  },
  {
    question: 'Can I hold a panda at Chengdu?',
    answer: 'Holding pandas has been discontinued at the Chengdu Research Base as part of their animal welfare policy. However, you can get very close to the pandas — particularly during morning feeding — and photography is permitted from designated viewing areas. The experience of watching pandas eat bamboo at arm\'s length is genuinely remarkable.'
  },
  {
    question: 'How do I get from Chongqing to Chengdu Panda Base?',
    answer: 'From Chongqing city, take a high-speed train to Chengdu (approximately 65–80 minutes). From central Chengdu, the panda base is accessible by Metro Line 3 (Panda Avenue station) in about 40 minutes. CTS Tours handles all transfers and logistics as part of the Fire & Fuzz itinerary — no individual bookings required.'
  },
  {
    question: 'Is a Chengdu panda visit included in CTS tours?',
    answer: 'Yes. The Chengdu Research Base of Giant Panda Breeding is included in CTS Tours\' Fire & Fuzz 10-day tour (Chongqing & Chengdu Discovery). Day 7 begins with a morning visit to the panda base, timed for the morning feeding session. The tour departs from New Zealand and covers all transport, accommodation, and guided visits.'
  },
  {
    question: 'Do New Zealand passport holders need a visa for China?',
    answer: 'No visa is currently required. New Zealand ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism purposes. Bring your valid NZ passport, return flight confirmation, and hotel booking details. CTS Tours can advise on the latest entry requirements when you book.'
  }
]
```

### 7. Schema.org 结构化数据
- `WebPage` schema
- `BreadcrumbList` schema
- `FAQPage` schema（来自上面的 faqs）

Breadcrumbs:
```
Home → Tours → China → Chengdu → Panda Sanctuary
```

---

## 需要创建/修改的文件

### 1. `src/lib/data/seo-pages.ts` — 新增 meta 条目

在文件末尾 `allSeoPages` 之前，添加：

```typescript
export const chengduPandaSanctuaryMeta: SeoPageMeta = {
  slug: 'chengdu-panda-sanctuary',
  title: 'Chengdu Giant Panda Sanctuary Tour 2026 | See Pandas Up Close | CTS Tours NZ',
  description: 'Visit the Chengdu Research Base of Giant Panda Breeding — home to 200+ giant pandas. Morning feeding visits, bamboo forests, red pandas. Part of CTS Tours\' Fire & Fuzz 10-day Chongqing & Chengdu tour from New Zealand. Visa-free entry for NZ passports.',
  h1: 'Chengdu Giant Panda Sanctuary: A Complete Guide for New Zealand Visitors',
  heroSubtitle: 'Home to 200+ giant and red pandas · Morning feeding visits · Included in Fire & Fuzz 10-day tour from NZ',
  introText:
    'The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is the world\'s leading giant panda conservation and breeding facility. Established in 1987 with just six rescued pandas, it has grown to house more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat in northern Chengdu.\n\nFor New Zealand travellers, a morning visit to the panda base is the single most emotionally resonant experience available in any China itinerary. Giant pandas are most active during their morning feeding session — typically between 8:00am and 10:00am — when they can be observed at close range eating bamboo, climbing, and interacting. After 10am, pandas retreat to shade and sleep for much of the day.\n\nCTS Tours includes a Day 7 morning visit to the panda base as part of the Fire & Fuzz 10-day Chongqing and Chengdu tour. All logistics are handled — transfers from central Chengdu, guide commentary, and entry fees are included in the tour price.',
  faqs: [
    {
      question: 'What is the Chengdu Panda Sanctuary?',
      answer: 'The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is the world\'s leading giant panda conservation and breeding facility, established in 1987. Located in Chengdu, Sichuan Province, it is home to more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat. It is the best place in the world to see giant pandas up close in a naturalistic environment.'
    },
    {
      question: 'What time should I visit Chengdu Panda Base?',
      answer: 'Visit as early as possible — ideally by 8:00am. Giant pandas are most active during their morning feeding session, typically between 8:00am and 10:00am. After 10am, pandas often retreat to shade and sleep for much of the day. CTS Tours schedules the panda base visit first thing on Day 7 of the Fire & Fuzz itinerary specifically for this reason.'
    },
    {
      question: 'Can I hold a panda at Chengdu?',
      answer: 'Holding pandas has been discontinued at the Chengdu Research Base as part of their animal welfare policy. However, you can get very close to the pandas during morning feeding, and photography is permitted from designated viewing areas. The experience of watching pandas eat bamboo at arm\'s length is genuinely remarkable.'
    },
    {
      question: 'How do I get from Chongqing to Chengdu Panda Base?',
      answer: 'From Chongqing city, take a high-speed train to Chengdu (approximately 65–80 minutes). From central Chengdu, the panda base is accessible by Metro Line 3 (Panda Avenue station) in about 40 minutes. CTS Tours handles all transfers and logistics as part of the Fire & Fuzz itinerary — no individual bookings required.'
    },
    {
      question: 'Is a Chengdu panda visit included in CTS tours?',
      answer: 'Yes. The Chengdu Research Base of Giant Panda Breeding is included in CTS Tours\' Fire & Fuzz 10-day tour (Chongqing & Chengdu Discovery). Day 7 begins with a morning visit to the panda base, timed for the morning feeding session. The tour departs from New Zealand and covers all transport, accommodation, guided visits, and most meals.'
    },
    {
      question: 'Do New Zealand passport holders need a visa for China?',
      answer: 'No visa is currently required. New Zealand ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism purposes. Bring your valid NZ passport, return flight confirmation, and hotel booking details. CTS Tours can advise on the latest entry requirements when you book.'
    }
  ]
};
```

### 2. `src/app/chengdu-panda-sanctuary/page.tsx` — 新建页面

**模板：直接基于 `/china-tours-from-new-zealand/page.tsx`**

关键差异点：

| 改动点 | 值 |
|--------|-----|
| import meta | `chengduPandaSanctuaryMeta` |
| path | `/chengdu-panda-sanctuary` |
| breadcrumb | Home → Tours → China → Chengdu → Panda Sanctuary |
| ogImagePath | `tour-images/chengdu-pandas.jpg`（Supabase，已有） |
| ogImageAlt | `Chengdu Giant Panda Sanctuary — CTS Tours NZ` |
| keywords | `['Chengdu panda sanctuary', 'giant panda tour Chengdu', 'Chengdu panda base', 'chengdu panda tour New Zealand', 'China panda tour NZ']` |
| featuredTours | `allTours.filter(t => t.slug === 'chongqing-chengdu').slice(0, 1)` — 只展示 Fire & Fuzz |
| tour grid heading | `'See Giant Pandas on Our Chongqing & Chengdu Tour'` |
| CTA section colour | 使用 Chengdu 绿色系（与其他页面一致即可） |

> ⚠️ 重要：页面中间加一个"实用参观信息"section（在 intro 和 tour grid 之间），展示参观时间、票价、交通信息，以 grid 卡片形式呈现。参考 `/best-time-to-visit-china` 的 season cards 样式。

### 3. `src/app/sitemap.ts` — 加入新页面

在 `hubPages` 数组中加入：
```typescript
'chengdu-panda-sanctuary',
```

### 4. `src/lib/data/guides.ts` — 成都 Guide 页加内链

在 `chengdu-travel-guide` 的 guide 数据中，在 relatedLinks 或 spotlight 部分加一条内链：
```
{ label: 'Chengdu Giant Panda Sanctuary Guide', href: '/chengdu-panda-sanctuary' }
```

同样在 `chengdu-tours` hub 页的导航链接中加入。

---

## 验证步骤

```bash
npm run build
# 确认无 TypeScript 错误

curl -s http://localhost:3010/chengdu-panda-sanctuary | grep -i "panda"
# 应在 <title>、<h1>、<meta description> 中出现

curl -s http://localhost:3010/chengdu-panda-sanctuary | grep "schema"
# 应有 FAQPage + WebPage + BreadcrumbList schema
```

---

## Git Commit

```bash
git add src/lib/data/seo-pages.ts
git add src/app/chengdu-panda-sanctuary/page.tsx
git add src/app/sitemap.ts
git add src/lib/data/guides.ts
git commit -m "feat: add /chengdu-panda-sanctuary SEO page (SV 320, no tour operator competition, Fire & Fuzz CTA)"
git push origin main
```

---

## 预期效果

- 上线后 4–8 周内 GSC 出现 `chengdu panda sanctuary` 展示量
- 目标：3个月内进入 Top 5（竞品均为非旅游商）
- 直接驱动 Fire & Fuzz 产品页点击，与社媒熊猫内容形成完整种草→搜索→转化链路
- `chengdu panda tour new zealand` 等长尾词同步捕获
