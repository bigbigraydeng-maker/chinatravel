# Spec: CTR 修复 — 4 个排名好但无人点击的页面

**任务类型：** SEO meta 优化  
**优先级：** 最高（高排名低CTR = 最快ROI）  
**预计工时：** 1 小时  
**执行人：** Claude Code CLI  
**数据来源：** GSC 实测数据 2026-04-25（过去90天）

---

## 背景

GSC 显示以下页面排名良好但 CTR 接近 0%，远低于该排名的正常水平。  
问题根因：Title Tag 写成了百科词条风格，没有行动意图、没有 NZ 定位、没有点击诱因。

| 页面 | 触发词 | GSC 排名 | 展示 | 点击 | CTR | 正常应有 |
|------|--------|---------|------|------|-----|---------|
| `/forbidden-city-travel-guide` | forbidden city | 3.1 | 75 | 0 | **0%** | 15-20% |
| `/china-tours` | china holiday packages from nz | 4.5 | 42 | 0 | **0%** | 8-12% |
| `/china-tours-from-new-zealand` | china tours from nz | 7.2 | 196 | 4 | **2%** | 5-8% |
| `/china-tours` | china tour packages incl. airfare from nz | 6.2 | 27 | 0 | **0%** | 5-8% |

修复这 4 条 meta，预计可在现有排名下将月点击量提升 **30–60 次**，无需改排名。

---

## 修改文件 1：`src/lib/data/guides.ts` — forbidden-city 条目

### `metaTitle`

**当前（百科风格，无行动意图）：**
```
'Forbidden City Travel Guide | Imperial Palace | UNESCO Site | CTS Tours'
```

**修改为（旅游意图 + NZ 定位）：**
```
'Forbidden City Tour Guide 2025 | Visit Beijing\'s Imperial Palace | CTS Tours NZ'
```

> 改动：加 "Tour"（搜索意图词）、加 "Visit"（行动词）、加 "NZ"（地理定位）

---

### `metaDescription`

**当前（维基百科口吻，无行动诱因）：**
```
'Forbidden City guide: 980 buildings, 24 emperors, world\'s largest palace complex. Beijing\'s premier attraction.'
```

**修改为：**
```
'Plan your Forbidden City tour: skip the queues with a guided visit, explore 980 buildings across 72 hectares, and learn the stories of 24 emperors. Part of CTS Tours\' Beijing itineraries from NZ — visa-free entry, NZD pricing.'
```

> 改动：加 "Plan your tour"（行动意图）、加实用信息（skip queues）、加 NZ 钩子

---

## 修改文件 2：`src/lib/data/seo-pages.ts` — chinaToursMeta

### `title`

**当前：**
```
'China Tour Packages & Holiday Deals from New Zealand | CTS Tours'
```

**修改为：**
```
'China Holiday Packages from New Zealand 2025 | Flights Included | NZD Pricing | CTS Tours'
```

> 改动：把 "Holiday Packages"（GSC触发词）移到前面；加 "Flights Included"（消除顾虑）；加 "NZD Pricing"（NZ用户关心）；加年份（新鲜感）

---

### `description`

**当前：**
```
'Explore our China tour packages and holiday deals for New Zealand travellers. Signature luxury, Discovery value & Stopover breaks. TAANZ-bonded...'
```

**修改为：**
```
'China holiday packages from New Zealand — flights included, NZD pricing, visa-free entry for Kiwis. Luxury Signature tours, value Discovery tours & short Stopover breaks. TAANZ-bonded. Auckland-based team since 1928.'
```

> 改动：把 NZ 关键词提前；加 "flights included"；加 "visa-free"；保留信任标志

---

## 修改文件 3：`src/lib/data/seo-pages.ts` — chinaToursFromNZMeta

### `title`

**当前：**
```
'China Tours from New Zealand | Expert China Travel Specialists | CTS Tours'
```

**修改为：**
```
'China Tours from New Zealand 2025 | Visa-Free · NZD Pricing · Flights Included | CTS Tours'
```

> 改动：加年份；把三个最有力的 USP（visa-free、NZD、flights）直接放进 title；用 · 分隔提升可读性

---

### `description`

**当前：**
```
'China tours from New Zealand designed by NZ-based China specialists. Departing Auckland, Wellington & Christchurch. Visa-free entry for NZ passports. NZD pricing...'
```

**修改为：**
```
'China tours from New Zealand — visa-free for Kiwi passports, all prices in NZD, flights from Auckland included. Small groups, expert guides, 90+ years running China tours. Depart Auckland, Wellington & Christchurch. Get a quote from our NZ team.'
```

> 改动：最强信息前置；加 "Get a quote"（明确 CTA）；加 "90+ years"（权威感）

---

## 验证步骤

```bash
npm run build
# 确认无错误

# 本地验证 meta 内容
curl -s http://localhost:3010/forbidden-city-travel-guide | grep -A1 "<title>"
curl -s http://localhost:3010/china-tours | grep "description"
curl -s http://localhost:3010/china-tours-from-new-zealand | grep "description"
```

---

## Git Commit

```bash
git add src/lib/data/guides.ts
git add src/lib/data/seo-pages.ts
git commit -m "seo: fix CTR on 3 high-ranking low-CTR pages (forbidden city, china-tours, china-tours-from-nz)"
git push origin main
```

---

## 预期效果

GSC 数据反映 meta 变化通常需要 **2–4 周**（Google 重新抓取并更新展示片段）。

| 页面 | 现在点击/月 | 目标点击/月 |
|------|------------|------------|
| `/forbidden-city-travel-guide` | ~0 | 10–15 |
| `/china-tours` (holiday packages词) | ~0 | 3–5 |
| `/china-tours-from-new-zealand` | ~4 | 15–20 |
| **合计增量** | **~4** | **~30–40** |

---

## 附：`china trips` 排名 60 问题

GSC 显示 `china trips`（151 次展示，排名 60）说明某页面在排名但太靠后。  
**调查方法：** 在 GSC 界面按页面维度过滤 `china trips` 这个词，找出是哪个 URL 在排名，  
然后优化该页面的 H1/内容让 Google 更好地理解页面主题。  
这个不在本次 spec 范围内，作为下一个独立任务处理。
