# 关键词策略（最终修订版 v3.0）
**日期：** 2026-04-25  
**数据来源：** Semrush NZ 数据库 + Keyword Gap 竞品分析（wendywu / intrepid / worldjourneys / flightcentre）  
**状态：** 取代所有历史版本，作为 Phase 2-4 执行基准

---

## 📌 竞品格局（NZ 市场）

| 竞品 | 定位 | 中国词月流量 | 核心策略 |
|------|------|------------|---------|
| wendywutours.co.nz | 老牌亚洲团体游，NZ 本土品牌 | ~500/月 | 景点详情页 → 目的地 Hub → 产品页，内链金字塔 |
| intrepidtravel.com | 全球小团，以信息内容引流 | ~300/月 | 天气/签证信息页捕获长尾流量 |
| worldjourneys.co.nz | 高端定制，中国非核心 | ~9/月 | 中国不是重点，不构成威胁 |
| flightcentre.co.nz | 综合票务平台 | 分散 | 非直接竞品 |

**结论：** Wendy Wu 是唯一需要正面竞争的对手。  
**他们的成功模式：** 景点详情内容页（Great Wall、Terracotta Warriors）→ 目的地 Hub（/china/）→ 产品 Tour 页（/china/tours/）  
**我们要复制这个内链架构，内容已有，缺的是优化和内链密度。**

---

## ⚠️ 历史版本的错误

| 错误 | 影响 |
|------|------|
| 用 AU 数据库代替 NZ 数据库 | 所有 KD/SV 数字失真 |
| 关键词来自主观猜测 | 遗漏 NZ 惯用的 "holiday" 系列词 |
| 未做竞品 Gap 分析 | 看不到我们排名落后竞品多少 |
| Phase 2 三词 SV 合计仅 70/月 | ROI 极低 |

---

## 🟢 Phase 2：快速赢（Apr 29 — May 12）

**选词标准：** KD ≤ 20 + SV ≥ 100 + 已有页面 + 竞品验证有市场

| 关键词 | SV | KD | 我们排名 | Wendy Wu | 目标页面 |
|--------|----|----|---------|---------|---------|
| **china tour packages** | 170 | 9 | #29 | #5 | `/china-tours` |
| **china holiday packages** | 170 | 9 | #43 | #3 | `/china-tours` |
| **china travel packages** | 170 | 9 | #27 | #5 | `/china-tours` |
| **china tours from new zealand** | 140 | 4 | **#8** ✅ | — | `/china-tours-from-new-zealand` |

**为什么这4个：**
- 前3个是同一搜索意图的变体，一个页面优化可同时覆盖，等于3倍 SV 收益（合计510/月）
- "holiday" 是 NZ/英式英语偏好，历史计划完全缺失
- `china tours from nz` 已 #8，KD=4，是全部词里推进成本最低的

---

## 🔵 Phase 3：攻坚词（May 13 — Jun 9）

| 关键词 | SV | KD | 我们排名 | Wendy Wu | 策略 |
|--------|----|----|---------|---------|------|
| **china tours** | 260 | 16 | #23 | #1 | Hub 页权重积累，是最终商业目标 |
| **great wall of china tour** | 140 | 18 | **未排名** | #5 | 我们有页面却不排名，优化 title/H1 即可 |
| **beijing holiday packages** | 70 | 10 | 未排名 | #5 | `/beijing-travel-guide` 加产品内链 |
| **luxury china tours** | 30 | 16 | #59 | #2 | 建立 luxury 内容板块，契合 CTS 定位 |

**重点：`great wall of china tour`**  
Wendy Wu 排 #5，Intrepid 排 #1，我们有 `/great-wall-travel-guide` 但完全不在排名里。  
根本原因很可能只是 title/H1 没有 "tour" 这个词——页面内容已有，优化成本极低。

---

## 🔴 Phase 4：长期目标（Jun 10+）

| 关键词 | SV | KD | 竞争度 | 备注 |
|--------|----|----|--------|------|
| **china tours** | 260 | 16 | 0.75 | Phase 3 开始积累，Phase 4 冲 Top 5 |
| **chengdu panda sanctuary** | 590 | 44 | **0.08** | 高 SV + 极低商业竞争，专项深度内容页 |
| **china travel guide** | 50 | 38 | 0.54 | KD 偏高，暂不优先 |

---

## 📊 修订前后对比

| 指标 | 原 Phase 2（AU数据） | 最终修订版（NZ+竞品） |
|------|-------------------|-------------------|
| 数据库 | AU（错误） | **NZ（正确）** |
| 关键词来源 | 主观猜测 | **竞品 Gap 分析** |
| Phase 2 总 SV | 70/月 | **620/月**（+786%） |
| 遗漏关键意图 | "holiday" 系列 | **已补入** |
| 平均 KD | 18.5（AU，失真） | **9（NZ，真实可信）** |
| 需新建页面 | 0 | **0**（全部已有） |

---

## 📋 Phase 2 执行任务清单（Apr 29 起）

### 任务 A：`/china-tours` Hub 页 — 三词合一优化

**目标关键词：** china tour packages / china holiday packages / china travel packages（SV 各 170，KD 9）

```
优化清单（给 Claude Code）：

1. Title: "China Tour Packages & Holiday Deals | CTS Tours New Zealand"
   （同时包含 "packages" 和 "holiday"，覆盖两类搜索）

2. H1: "China Tour Packages for New Zealanders"

3. Meta description（含关键词 + CTA）:
   "Discover handpicked China holiday packages from New Zealand. Small group tours,
   private itineraries & tailor-made China travel packages. Expert NZ-based team."

4. 正文加入 "holiday" 变体用词（至少5次），平衡 "tour" 和 "holiday" 两类词

5. FAQ Schema（≥4条）：
   - "What's included in your China tour packages?"
   - "Do you offer China holiday packages from New Zealand?"
   - "How long are your China travel packages?"
   - "Can I customise a China trip package?"

6. 内链强化：指向 /beijing-travel-guide、/xian-travel-guide、
   /shanghai-travel-guide、/chengdu-travel-guide

7. 结构化数据：TouristTrip Schema（name, description, offers）
```

---

### 任务 B：`/china-tours-from-new-zealand` — 冲 Top 3

**目标关键词：** china tours from new zealand（SV 140，KD 4，现排 #8）

```
优化清单（给 Claude Code）：

1. Title: "China Tours from New Zealand | CTS Tours – NZ China Travel Specialists"

2. H1 明确包含 "china tours from new zealand"

3. 加强 NZ 本地信号（Google 识别地理相关性）：
   - 提及出发城市（Auckland, Wellington, Christchurch）
   - 提及 NZ 护照持有者免签 / 签证便利
   - 提及 NZ 直飞 / 中转中国飞行时间

4. FAQ Schema（NZ 出发者关心的问题）：
   - "How do I book a China tour from New Zealand?"
   - "What flights go from New Zealand to China?"
   - "Do New Zealanders need a visa for China?"
   - "How long is the flight from Auckland to Beijing?"

5. 内链：/china-visa-guide-for-new-zealanders + /china-tours Hub

6. Schema：LocalBusiness（CTS NZ 地址）+ TouristTrip 双叠加
```

---

### 任务 C（Phase 3 预备，可同步启动）：`/great-wall-travel-guide`

**目标关键词：** great wall of china tour（SV 140，KD 18，我们未排名）

```
优化清单（给 Claude Code）：

1. Title: "Great Wall of China Tour | Beijing Day Trips & Guided Tours | CTS Tours"

2. H1 包含 "great wall of china tour"

3. FAQ Schema（游客最关心的问题）：
   - "What's the best section of the Great Wall to visit?"
   - "How do I get to the Great Wall from Beijing?"
   - "How long does a Great Wall tour take?"
   - "Can I book a guided Great Wall tour from New Zealand?"

4. 内链方向：
   /beijing-travel-guide → /great-wall-travel-guide → /china-tours（产品 Hub）

5. 加 "Book a Great Wall Tour" CTA，链接到 /contact 或相关产品页
```

---

## 🔍 建议扩展探索（Semrush Keyword Magic Tool，NZ 数据库）

| 种子词 | 预期发现 |
|--------|---------|
| `china holiday` | 更多 NZ 英语变体 |
| `beijing tour` | 城市级购买词 |
| `yangtze river cruise` | 高潜力特色产品词 |
| `best time to visit china` | 信息词（已有页面，查排名） |
| `china group tour` | 团体市场细分 |

---

**文档版本：** v3.0（最终版）  
**更新日期：** 2026-04-25  
**数据来源：** Semrush NZ 数据库 + Keyword Gap CSV（wendywu, intrepid, worldjourneys, flightcentre）
