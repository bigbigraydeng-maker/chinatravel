# R1 Audit Result (2026-06-08)

> **Owner**: FB Sprint Window (Claude Code)
> **Audit window**: 2026-06-08 evening
> **Methodology**: grep src/ for tour data → 跟 spec / R1-baseline 对比 → 列出冲突给 PM 拍板
> **PM 拍板时间**: 2026-06-08 (本次 audit 当晚)

---

## ✅ 1. 业务真实性验证清单

| # | 业务点 | 验证方法 | 验证结果 | 本轮使用判定 |
|---|---|---|---|---|
| 1 | **Margaret & John 50th anniversary in Beijing courtyard** | 不查 FB Page（反爬高，PM Q1 选 B 直接当 pending） | ⚠️ pending — 没真实数据源 | ❌ 不引用具体客户名 |
| 2 | **"1,200+ Kiwi travellers since 1928" 具体数字** | R1 baseline 第 33 行 PM 已拍板"估算/不准/别强调" | ❌ 不可用 | ✅ 用 "thousands of Kiwi travellers" / "generations of Kiwi families" 模糊化 |
| 3 | **Sarah captured Zhangjiajie sunrise** | 不查 FB Page（同 #1） | ⚠️ pending | ❌ 不引用具体客户名 + 不引用 Zhangjiajie（不在本轮推广团） |
| 4 | **Fire & Fuzz "Only 4 seats left"** | R1 baseline 第 12 行 PM 已拍板已退场 | ❌ 已退场 | ❌ 任何 post / ad / Lookalike 不出现 Chongqing / Chengdu / Fire & Fuzz |
| 5 | **2027 Yunnan Discovery** | grep `tours.ts` + `departure-schedule.ts` 找 yunnan-discovery | ❌ 不存在 | ❌ 不写（但 `yunnan-explorer` 是真团，2026-09-10 出发，本轮不主推但**不在禁用名单**） |
| 6 | **Silk Road 2027** | grep `tours.ts` line 232 / `departure-schedule.ts` line 17 | ✅ **真实** — slug `silk-road`, 18 天 NZD $7,999, Xi'an → Urumqi, 出发 13 May 2027 + 21 Oct 2027 | ✅ **本轮独立 Goal 蓄水**（PM 2026-06-08 拍板）|
| 7 | "since 1928" / 98 years 单独使用 | R1 baseline 第 62 行 | ✅ 真实 | ✅ 可用 |
| 8 | Baker Gu "20+ years specialist" | R1 baseline 第 67 行 | ✅ 真实 | ✅ 可用 |
| 9 | Direct on-ground China operations | R1 baseline 第 72 行 | ✅ 真实差异化 | ✅ 可用，反 mass-market 立场 |

---

## ✅ 2. 推广团真实数据 cross-check（spec vs 代码）

### 2.1 Best of China (Essentials) — **PM 2026-06-08 拍板以代码为真**

| 字段 | spec / R1 baseline 原拍板 | `src/lib/data/tours.ts` line 767-846 实际 | **本轮采用** |
|---|---|---|---|
| slug | `essentials` | `essentials` | ✅ `essentials` |
| name | "Best of China (Essentials)" | "China Discovery — Best of China" | ✅ 文案口语"Best of China" |
| URL | `/tours/china/discovery/essentials` | `/tours/china/discovery/essentials`（动态路由 `[destination]/[tier]/[tour]`）| ✅ |
| 出发日 | **9/3 (3 Sep 2026)** | **`['3 November']`**（即 11/3）| ✅ **11/3 (3 Nov 2026)** ← PM 拍板 |
| 价格 | NZD $4,539 | **NZD $3,880 per person** | ✅ **NZD $3,880 per person** ← PM 拍板 |
| 时长 | 15 天 | 15 Days | ✅ 15 天 |
| 行程节点 | Beijing + Xi'an + Puyuan + Hangzhou + Shanghai | 一致（含 Puyuan 水乡 + 西湖 + Bund + Nanjing Rd + Lujiazui） | ✅ |
| singleSupplement | 未明示 | NZD $720 | ✅ 文案不强调，落地页有 |
| reviewRating | 未明示 | 未存（updated 2026-04-02） | ⚠️ 不引用具体 rating |

**影响 Wave 1 节奏的关键点**：
- 出发日 11/3 距 W1 启动日 6/15 = **约 5 个月**（141 天）
- 标准 Meta paid acquisition 预热窗口 60-90 天 → W1-W4 (6/15-7/12) 全部用 **awareness + educational 中前段预热**，不打 urgency
- promotional_urgency 1 篇放到 **W4 末**或**留给后续 Wave 5**（PM 决定，此次先按 W4 写一篇"booking window now open"非紧迫钩子）

### 2.2 Tale of Two Cities (beijing-xian)

| 字段 | spec | tours.ts:594 + october-2026-discovery.ts:32 | **本轮采用** |
|---|---|---|---|
| slug | `beijing-xian` | `beijing-xian` | ✅ |
| name | "Tale of Two Cities" | "China Discovery — A Tale of Two Cities" | ✅ 口语"Tale of Two Cities" |
| URL | `/campaigns/october-2026/tale-of-two-cities` | `/campaigns/october-2026/tale-of-two-cities`（campaign LP） | ✅ |
| 出发日 | 10/15 | `heroDepartureOrder: ['15 October']` | ✅ 10/15 (15 Oct 2026) |
| 价格 | NZD $3,480 | "From NZD $3,480" | ✅ "from NZD $3,480" |
| 时长 | 10 天 | 10 Days | ✅ |
| singleSupplement | 未明示 | NZD $395 | ⚠️ 文案不强调 |

距 W1 启动日 6/15 = **约 4 个月**（122 天）→ 跟 Best of China 同步预热节奏。

### 2.3 Shanghai & Surroundings

| 字段 | spec | tours.ts:849 + october-2026-discovery.ts:23 | **本轮采用** |
|---|---|---|---|
| slug | `shanghai-surroundings` | `shanghai-surroundings` | ✅ |
| name | "Shanghai & Surroundings" | "China Discovery — Shanghai & Surroundings" | ✅ |
| URL | `/campaigns/october-2026/shanghai-surroundings` | 同 spec | ✅ |
| 出发日 | 10/14 | `heroDepartureOrder: ['14 October']` | ✅ 10/14 (14 Oct 2026) |
| 价格 | NZD $3,399 | "NZD $3,399 per person" | ✅ |
| 时长 | 10 天 | 10 Days | ✅ |

距 W1 启动日 6/15 = **约 4 个月**（121 天）→ 跟 Best of China + Tale of Two Cities 同步预热。

### 2.4 Silk Road Discovery（PM 2026-06-08 拍板进本轮，**独立 Goal**）

| 字段 | 来源 | 数据 |
|---|---|---|
| slug | tours.ts:232 | `silk-road` |
| name | tours.ts:235 | "China Signature — Silk Road Discovery" |
| URL | 动态路由 | `/tours/china/signature/silk-road` |
| 出发日 | departure-schedule.ts:21 | **13 May 2027** + **21 October 2027** |
| 价格 | tours.ts:239 | NZD $7,999 |
| 时长 | tours.ts:238 | 18 Days |
| 行程 | tours.ts:256-275 | Auckland → Shanghai → Xi'an (Terracotta + Big Wild Goose Pagoda) → Lanzhou (hand-pulled noodles) → Bingling Temple grottoes → Danxia 七彩丹霞 → Mogao 莫高窟 → Flaming Mountains → Heavenly Lake 天池 → Urumqi (Xinjiang Regional Museum + Grand Bazaar) → 返程 |
| singleSupplement | tours.ts:308 | NZD $1,488 |
| reviewRating | tours.ts:309 | 4.8 (127 reviews) — **不引用具体数字，按"thousands trusted us since 1928"模糊化** |

**距 W1 启动日 6/15 = ~10 个月（13 May 2027 → 339 天）/ ~16 个月（21 Oct 2027 → 500 天）**。
→ **纯蓄水**：destination_inspiration + educational_planning，**不打 promotional urgency**（距太远）

---

## ✅ 3. 推广团池总览（本轮）

| 团 | URL | 出发日 | 价格 | 距 W1 | 本轮角色 |
|---|---|---|---|---|---|
| **Best of China** | `/tours/china/discovery/essentials` | 2026-11-03 | NZD $3,880 pp | ~5 月 | **主推**（60-65%，~16-18 篇） |
| **Tale of Two Cities** | `/campaigns/october-2026/tale-of-two-cities` | 2026-10-15 | NZD $3,480 | ~4 月 | 辅助（~10%，3 篇） |
| **Shanghai & Surroundings** | `/campaigns/october-2026/shanghai-surroundings` | 2026-10-14 | NZD $3,399 | ~4 月 | 辅助（~10%，3 篇） |
| **Silk Road 2027** ⭐ 独立 Goal | `/tours/china/signature/silk-road` | 2027-05-13 / 2027-10-21 | NZD $7,999 | ~10-16 月 | **蓄水**（~10%，2-3 篇） |
| **通用品牌** | `/about` / `/experts` | — | — | — | 故事（~10-15%，3-4 篇） |

**已退场 / 禁用**：
- ❌ Fire & Fuzz (Chongqing × Chengdu) — `src/lib/campaigns/fire-fuzz.ts` 我未读
- ❌ 2027 Yunnan Discovery（占位，不存在）
- ⚠️ `yunnan-explorer` 真团 (2026-09-10)，但**本轮不主推**

---

## ✅ 4. 文案红线（28 篇 + 18 ad creative 全程遵守）

### 必背 7 条

1. **数字红线** — 不写具体客户数（"1,200+" / "1,500+" 等）。用 "thousands of Kiwi travellers" / "generations of Kiwi families"
2. **客户名红线** — Margaret&John / Sarah / 任何 audit pending 的具体客户名一律不引用
3. **出发日红线** — 只用 4 个真实日期：
   - Best of China: **3 November 2026**
   - Tale of Two Cities: **15 October 2026**
   - Shanghai & Surroundings: **14 October 2026**
   - Silk Road: **13 May 2027** + **21 October 2027**
4. **价格红线** — 只用 4 个真实价格：$3,880 pp / $3,480 / $3,399 / $7,999
5. **团名红线** — 只用 4 个本轮推广团（不写 Fire & Fuzz / Yunnan Discovery）
6. **rating 红线** — 不引用 tours.ts 里的 4.8 star / 127 reviews / X review summary（数字太具体，audit pending）
7. **客户图像红线** — AI 生成"客户"面孔不允许；风景 / 文物 / 建筑 / 街景 / 远景 traveler silhouette 允许

### 通用可用素材

- ✅ "since 1928" 单独使用
- ✅ "98 years of China specialists"
- ✅ "NZ's longest-running China travel specialist"
- ✅ "Baker Gu, 20+ years specialist"
- ✅ "Direct on-ground China operations"（反 mass-market）
- ✅ "thousands of Kiwi travellers" / "generations of Kiwi families"
- ✅ 行程节点（Beijing / Xi'an / Puyuan / Hangzhou / Shanghai / Silk Road 节点）— 用 tours.ts 真实描述
- ✅ visa-free policy（master_brief keyword_seeds 包含）

---

## ✅ 5. FB Page 风格观察 — **未做**

按 PM Q1 选 B（Margaret&John / Sarah 直接当 pending）+ FB Page 反爬高，本次 audit **不浏览 https://www.facebook.com/CTSTOURS/**。

风格定调直接按 R1 baseline + master_brief 5 pillar 走，不参考 FB Page 现有 post 连贯性。

---

## ✅ 6. PM 待 review

- [ ] 本 audit 结果是否准确反映 R1 baseline 心法
- [ ] 是否同意 Silk Road 2-3 篇蓄水配额（让出通用品牌 2-3 篇空间）
- [ ] 是否同意 promotional_urgency 1 篇放 W4 末，用"booking window now open"非紧迫钩子
- [ ] 是否同意 Margaret&John / Sarah 完全不引用（social_proof 4 篇全用通用主题）

PM review 通过后开 W1 7 篇文案写作。
