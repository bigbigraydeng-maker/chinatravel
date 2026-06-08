# Wave 1 — Keyword Strategy + Gap Analysis (v0.1)

> **Owner**: FB Sprint Window (Claude Code)
> **建表时间**: 2026-06-08 evening
> **状态**: 待 PM review
> **数据源**:
> - ME Supabase `master_briefs` (CTS, is_active=true) — content_pillars / keyword_seeds / competitor_domains / competitive_notes_md / core_proposition / primary_audience
> - ME Supabase `keyword_snapshots` (DataForSEO, 35 词, snapshot_date 2026-06-04)
> - ME Supabase `gsc_performance_snapshots` (Google Search Console, 28 天 / 622 clicks / 49,191 imp / period 2026-05-11 → 2026-06-08)
> - Live WebFetch 4 个竞品 LP (Wendy Wu / Intrepid / Trafalgar / Inspiring Vacations) — 价位 / hero 文案 / USP / 行程 gap 实时数据
> - ChinaTravel repo `src/lib/data/tours.ts` + `departure-schedule.ts` + `october-2026-discovery.ts`

---

## 📊 1. CTS Keyword Baseline (真实数据，非估算)

### 1.1 CTS 35 个 DataForSEO 排名词 (2026-06-04 snapshot)

按搜索量 / 排名分 3 档：

#### **强势词** (top 20，距首页 < 10 位)

| keyword | position | search volume / 月 | 备注 |
|---|---|---|---|
| `china travel` | **#1** | 110 | 品牌词 — 已锁定 |
| `china travel service` | **#2** | 110 | 品牌词 — 已锁定 |
| `cts christchurch` | #2 | 320 | 品牌 + 地域，已锁定 |
| `china travel packages` | #8 | 170 | ⭐ 商业意图，距首页 1 位 |
| `china tours from nz` | #9 | 170 | ⭐ 核心商业词，距首页 1 位 |
| `china trip` | #9 | 110 | 距首页 1 位 |
| `travel package china` | #9 | 170 | 距首页 1 位 |
| `great wall tours` | **#10** | **590** | ⭐⭐ 大词，差临门一脚到 #1-9 |
| `china tour packages` | #14 | 170 | 差 5 位到首页 |
| `terracotta warriors` | **#14** | **1,600** | ⭐⭐⭐ 大词，CTS GSC 第一战略机会 |
| `china tours` | #15 | 260 | 距首页 5 位 |
| `china tour` | #17 | 260 | 距首页 7 位 |
| `chinese visa` | #18 | 110 | 关联 visa-free 选题 |
| `china new zealand travel visa` | #18 | **590** | ⭐⭐ 大词 + NZ-specific |
| `best time to visit china` | #19 | 260 | ⭐ master_brief educational 主轴 |
| `china tours from new zealand` | #20 | 170 | 跟 master_brief keyword_seeds #1 完全一致 |

#### **中等词** (#20-50，有进攻空间)

| keyword | position | volume | 备注 |
|---|---|---|---|
| `nz china visa` | #24 | 140 | |
| `china visa-free nz` | #24 | 90 | 关联 master_brief keyword_seeds |
| `china trip package` | #29 | 170 | |
| `china holiday package` | #35 | 170 | |
| `dali yunnan` | #35 | 260 | 本轮不主推 yunnan |
| `yunnan` | #43 | 880 | 本轮不主推 |
| `yangtze river cruise` | #46 | 170 | 本轮 4 团都不含 Yangtze cruise |
| `traditional chinese food` | #47 | 210 | |
| **`holidays to china`** | **#49** | **390** | ⭐ 大词 + 弱排名，**重大机会** |

#### **弱势词** (50+，需要内容补强或暂缓)

| keyword | position | volume | 备注 |
|---|---|---|---|
| `japan package tours` | #67 | 320 | 不相关，跳过 |
| `china tours packages` | #75 | 170 | |
| `china holiday packages` | #79 | **170** | ⭐ 弱排名但商业词 |
| `chengdu panda tours` | 未上榜 | 280 | Fire & Fuzz 退场后正常 |

### 1.2 CTS 28 天 GSC 真实搜索词 (period 2026-05-11 → 2026-06-08)

**总览**: 622 clicks / 49,191 impressions / 平均 CTR 1.26% / 平均位置 #14.3

**Top organic queries** (按 clicks 降序，过滤品牌词后)：

| query | clicks | impressions | avg position | 备注 |
|---|---|---|---|---|
| `china tours from nz` | 14 | 263 | #8.5 | ⭐ |
| `china tour packages including airfare from nz` | **4** | 76 | #8.4 | ⭐⭐⭐ **极强商业意图，本轮 W4-25 必攻** |
| `best china tours from nz` | 3 | 66 | #10.2 | ⭐ |
| `china tours from new zealand` | 2 | 143 | #12.6 | |
| `tours to china from nz` | 2 | 52 | #12.1 | |
| `shanghai itinerary 10 days` | 2 | **616** | #8.6 | ⭐⭐ 大流量 / 低 CTR，本轮 Shanghai 选题机会 |
| `china tour from nz` | 1 | 8 | #5.7 | |
| `china tours from auckland` | 1 | 42 | #9.5 | NZ 北岛 commercial intent |
| `china holiday packages from nz` | 1 | 71 | #10.6 | ⭐ |
| `chengdu itinerary` | 1 | 7 | #4.4 | 本轮不推 Chengdu |
| `china travel checklist` | 1 | 3 | #5.7 | 关联 educational pillar |
| `china private tour` | 1 | 5 | #26.8 | |
| `china visa for nz citizens 2026` | 1 | 32 | #5.3 | ⭐ visa pillar |
| `china tour packages including airfare` | 1 | 13 | #7.2 | |

**Top organic pages** (按 clicks 降序，过滤首页/品牌页)：

| page | clicks | impressions | avg position | 备注 |
|---|---|---|---|---|
| `/` (首页) | 346 | 6,188 | #7.7 | 流量主入口，不归 FB Sprint 优化 |
| `/china-tours` | 37 | 1,815 | #19.1 | 团池入口，本轮提及但不主链 |
| `/blog/china-visa-free-nz-2026` | 21 | 5,139 | #8.8 | ⭐⭐ **大流量 / 低 CTR**，关联 visa pillar |
| `/china-tours-from-new-zealand` | 21 | 720 | #26.4 | 落 NZ 长尾 |
| `/blog/liziba-station-chongqing-guide` | 14 | 2,639 | #8.9 | ⚠️ **Chongqing**，本轮**禁用** |
| `/china-visa-guide-for-new-zealanders` | 12 | 1,647 | #9.2 | visa pillar，关联 W2-10 |
| `/blog/chongqing-chengdu-itinerary-10-days` | 11 | 336 | #10.5 | ⚠️ Chongqing 禁用 |
| `/blog/what-to-pack-china-complete-packing-list-by-season` | 11 | 1,143 | #11.4 | 通用 |
| `/blog/beijing-to-xian-high-speed-train` | 10 | **3,549** | #11.2 | ⭐⭐⭐ **W3-19 G89 高铁正好打这里**，可大幅提 CTR |
| `/blog/how-many-days-in-chongqing` | 10 | 841 | #8.4 | ⚠️ Chongqing 禁用 |
| `/blog/chongqing-vs-chengdu` | 9 | 1,847 | #8.9 | ⚠️ Chongqing 禁用 |
| `/about` | 8 | 760 | #7.9 | W1-03 since 1928 链接此页 |
| `/tours` | 8 | 386 | #6.0 | |
| `/blog/shanghai-10-days-itinerary` | 7 | 697 | #9.2 | ⭐ W3-18 / W4-25 关联 |
| `/blog/terracotta-warriors-guide-nz` | 5 | 353 | #10.7 | ⭐ W2-08 关联 |
| `/great-wall-travel-guide` | 4 | 309 | #13.8 | W1-04 关联 |
| `/blog/is-october-good-time-to-visit-china` | 3 | 183 | #9.4 | ⭐ W3-17 主题，11 月对齐机会 |
| `/blog/china-water-towns-jiangnan-guide` | 2 | 900 | #8.7 | ⭐⭐ **W2-11 Puyuan 必内链此页** |
| **`/tours/china/discovery/essentials`** | **3** | **240** | **#36.4** | ⚠️ **主推团 LP 几乎没排名**，Wave 1 必反复曝光此 URL |
| `/campaigns/october-2026/tale-of-two-cities` | 2 | 58 | #12.6 | |

### 1.3 关键洞察

**洞察 1**: CTS 主推团 LP `/tours/china/discovery/essentials` 在 GSC 平均位置 **#36.4**，几乎没 organic 流量 — **Wave 1 organic FB post 必须反复曝光此 URL** (61% 主推团权重 = 17 篇 × 主 URL 链接)，提供 social signal 帮助 LP 长期上升。

**洞察 2**: GSC 显示 **`/blog/china-water-towns-jiangnan-guide` 900 imp / 2 clicks** (位置 #8.7) — CTS 已经有"江南水乡"博客在排名！W2-11 Puyuan post 必内链此页面 (FB 文案 "more on water towns: ctstours.co.nz/blog/...")。

**洞察 3**: `/blog/beijing-to-xian-high-speed-train` 3,549 imp / 10 clicks — CTS 已排第 11 位的大流量博客。W3-19 G89 主题正好打这里，可以同时 boost 这页面 CTR (现 0.3%) 和主推团 LP 流量。

**洞察 4**: `china tour packages including airfare from nz` 76 imp / 4 clicks — **极强商业意图词**，是 W4-25 替换 post 的直接靶标。

---

## 🥊 2. 5 个 Tier 1 真竞品 USP / 团池矩阵

> **数据源**: ME `master_briefs.competitor_domains` (20 个 — 子牙今天已同步 18 个到 clients.competitor_domains) + Live WebFetch 2026-06-08 真实价位 / hero 文案

### 2.1 5 个直接对手 vs CTS

| 维度 | **CTS Best of China** | Wendy Wu | Trafalgar | Intrepid | Inspiring Vacations |
|---|---|---|---|---|---|
| **主团时长** | 15 天 | 11-23 天 | 9-10 天 | 8-19 天 | 16-42 天 |
| **主团价位 NZD** | **$3,880** | $5,630-8,730 | $7,623-8,679 | $1,706-6,014 | $5,995-26,295 |
| **每天均价** | **$259** | $396-558 | $762-868 | $213-501 | $375-626 |
| **NZ-specific** | ✅ "from NZ" | ✅ "from NZ" | ❌ global brand | ❌ global | ❌ global |
| **历史 heritage** | ✅ **1928 (98 yrs)** | "26+ yrs" | global brand | global brand | global brand |
| **Beijing+Xi'an** | ✅ | ✅ | ✅ | ⚠️ 部分团 | ✅ |
| **Hangzhou (西湖)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Puyuan (水乡)** | ✅ **独家** | ❌ | ❌ | ❌ | ❌ |
| **5 城线 Beijing+Xi'an+Puyuan+Hangzhou+Shanghai** | ✅ **独家** | ❌ | ❌ | ❌ | ❌ |
| **Yangtze cruise** | ❌ 本团不含 | ✅ 多团含 | ❌ | ❌ | ✅ |
| **Chengdu pandas** | ❌ 本团不含 | ✅ 多团含 | ❌ | ❌ | ❌ |
| **Silk Road** | ✅ 18d $7,999 | ✅ 28d $11,030 | ❌ | ❌ | ✅ 16-42d $5,995-26,295 |
| **"Fully Inclusive" 字眼** | "What's Included" 区块 | ✅ Hero | ✅ "all-inclusive" | — | "fully escorted" |
| **"Small Group" 字眼** | master_brief 列 USP，但 LP 未强调 | ✅ Hero | ✅ "avg 16" | ✅ Hero | ✅ "Premium Small Group" |
| **"Award-winning" 字眼** | ❌ | ✅ Hero | — | — | — |
| **"Direct operations" 字眼** | ✅ **"No Middlemen"** 独家 | ❌ | ❌ | ❌ | ❌ |
| **CTA** | "Enquire Now" / "View Itinerary" | "View Tour" / "Enquire Now" | "Easy Quote" / "Request a Quote" | "Explore" | "Subscribe Now" |

### 2.2 master_brief.competitive_notes_md 摘录 (Discovery AI 已总结)

> **Wendy Wu Tours (NZ)**: Largest volume player in the NZ-China market, strong brand awareness through heavy TV and print advertising. Competes on group size (larger tours, lower per-person cost) and breadth of Asia coverage. **Weakness: less China-specific depth, more transactional/cookie-cutter experiences.**
>
> **Intrepid Travel**: Appeals to younger, more budget-conscious travellers (35–55 skew). Strong on "local experiences" messaging but lacks China operational heritage. Competes on sustainability/responsible travel angle and broader global footprint.
>
> **Adventure World / China Highlights / Inside China Tours**: Online-first platforms offering DIY customisation and lower price points. **Weakness: no NZ-specific presence, generic customer service, no legacy trust factor for older Kiwi travellers.**

### 2.3 CTS 4 大 USP (master_brief.competitive_notes_md "Our Competitive Moat")

1. **98-year heritage** — no competitor can claim this legacy or operational depth in China
2. **Direct operations** — own offices and guides eliminate the middleman markup and service gaps
3. **Kiwi-focused** — every itinerary, departure city, and communication style is NZ-optimised
4. **Small groups + authentic access** — not Wendy Wu's big coaches, not a faceless online booking engine

---

## 🎯 3. Keyword Gap 6 维度 (本次新发现)

### Gap 1: 江南文化深度 (Hangzhou + Puyuan) — **市场最大空白**⭐⭐⭐

- 5 竞品**没有任何一个**提供 Beijing + Xi'an + Puyuan + Hangzhou + Shanghai 这条 15 天 5 城江南线
- Wendy Wu/Trafalgar 主推 Beijing+Xi'an+Shanghai+Chengdu+Yangtze 经典套路
- **Wave 1 策略**: 28 篇里凡是讲 Hangzhou / Puyuan / 西湖 / 龙井 / 水乡都是**独家 angle**
- **关联 GSC 数据**: `/blog/china-water-towns-jiangnan-guide` 900 imp / 2 clicks — CTS 已有内容但 CTR 极低，FB post 内链 boost CTR

### Gap 2: "Direct operations" / "No middlemen" — **CTS 独家立场**⭐⭐

- master_brief.core_proposition: "delivering authentic, seamlessly operated small-group tours through direct on-ground operations"
- 5 竞品**没有一个**用 "no middlemen markup" 角度
- Wendy Wu/Trafalgar 都用 "tour director" / "expert guide" 但承认是中间方
- **Wave 1 策略**: W3-16 / W4-28 / 任何价位 anchor post 用 "no middlemen markup" angle

### Gap 3: 长团 vs 短团 vacation time 决策 — **NZ 退休族痛点**⭐⭐

- Wendy Wu Silk Road **28 天** $11,030 / Inspiring **40-42 天** $25,395
- CTS Silk Road **18 天** $7,999 + Best of China **15 天** $3,880
- NZ 35-70 退休族 vacation 一般 14-21 天为上限
- **Wave 1 策略**: W3-21 "Why we cap at 18 days when others go 28 — the part you don't need" 直击此痛点

### Gap 4: NZ + AU primary_audience 35-70 — **不只老人**

- master_brief.primary_audience: "**New Zealand and Australian travellers aged 35-70**"
- 注意: **35-45 段 mid-career first-timer** 跟 50-70 段 retiree 是不同 angle
- 5 竞品几乎不区分 35-45 / 50-70
- **Wave 1 策略**: 28 篇里 social_proof 4 篇覆盖 mid-career + retiree 两个画像（不指名客户）

### Gap 5: "China tour with airfare from NZ" commercial intent — **CTS 弱势但市场强**⭐⭐⭐

- GSC: `china tour packages including airfare from nz` 76 imp / 4 clicks (位置 #8.4) — 已经在排名 + 商业意图极强
- DataForSEO: `china holiday packages` 390/月 CTS #49 / `holidays to china` 390/月 CTS #49 — **CTS 大词输得很惨**
- 5 竞品几乎不主打"含机票"，是 NZ 市场的 underserved
- **Wave 1 策略**: W4-25 替换 post 直接攻 — "China holiday packages from NZ — what's actually included (with airfare)" + 顺势带 "no middlemen markup" angle

### Gap 6: 11 月秋季 China = 隐藏好时段 — **跟 Best of China 11/3 出发日完美对齐**⭐

- GSC: `/blog/is-october-good-time-to-visit-china` 183 imp / 3 clicks — CTS 已有 October 内容
- 5 竞品都说 "Sep-Oct best time"，**没说 November**
- 但 11 月 Beijing 蓝天 / 西湖落叶 / 不挤 — 跟 Best of China 11/3 出发**完美对齐**
- **Wave 1 策略**: W3-17 "Why November is the secret-best month to see Beijing" 独家角度，Best of China 11/3 出发自然嵌入

---

## 🏷️ 4. 28 篇 Post Keyword Focus Tag (每篇 1 主词 + 2-3 辅助)

> **作用**: ① FB 正文密度（FB Search 占 10-15% organic 流量）② IG hashtag 池前 10 选择 ③ 内链导向（CTS 已有的高 impression 博客）④ Wave 2 paid ad interest targeting 候选

### 修订说明 (vs 00-topic-plan.md v0.1)

- ✅ **W4-25 替换**: 原"Yangtze Delta in mid-October" → 新"China holiday packages from NZ — what's actually included (with airfare)" (落地 `/tours/china/discovery/essentials`，但带 Shanghai & Surroundings cross-link)
- ✅ **Silk Road 3 篇 angle 调整**: W1-06 / W2-14 / W3-21 见下表
- ✅ **W3-19 主推团确认**: Best of China G89 (不是 Tale of Two Cities)
- ⚠️ **Shanghai & Surroundings 配额变化**: W4-25 不再算 Shanghai & Surroundings 主链 → Shanghai & Surroundings 从 3 篇变 2 篇，**Best of China 从 17 变 18 (64%)**
- (新配比合规：Best of China 60-65% ✅)

### W1 (2026-06-15 → 06-21)

| # | 主推团 | 标题 | 主关键词 | 辅助关键词 | CTS 内链候选 |
|---|---|---|---|---|---|
| W1-01 | Best of China | 5 cities, 15 days — what Best of China actually shows you | `china tours from new zealand` | `15 day china tour` / `china holiday packages` / `best of china tour` | `/tours/china/discovery/essentials` |
| W1-02 | Best of China | Why 15 days beats 10 days for your first China trip | `15 day china tour` | `china tour packages` / `china tours from nz` / `first time china` | `/blog/first-time-china-travel-tips` |
| W1-03 | 通用品牌 | Since 1928 — what 98 years of China specialists means | `china travel specialists nz` | `since 1928` / `nz china travel agency` / `direct china operations` | `/about` |
| W1-04 | Best of China | The Great Wall at Mutianyu — why we don't take you to Badaling | `great wall tours` | `mutianyu great wall` / `china tours from new zealand` / `great wall day trip` | `/great-wall-travel-guide` |
| W1-05 | Tale of Two Cities | Beijing + Xi'an in 10 days — the classic starter, decoded | `china tours from nz` | `beijing xian itinerary` / `terracotta warriors xi'an` / `10 day china tour` | `/blog/beijing-xian-itinerary-10-days` |
| W1-06 | Silk Road 2027 | China you haven't seen — Danxia Mountains' seven colours | `china cultural tours` | `silk road china tour` / `danxia mountains` / `2027 china tour` | `/tours/china/signature/silk-road` |
| W1-07 | Best of China | What it feels like to walk Beijing's hutongs with a local guide | `beijing tours kiwi` | `beijing hutong tour` / `authentic china experiences` / `small group china tours` | `/blog/first-time-china-travel-tips` |

### W2 (2026-06-22 → 06-28)

| # | 主推团 | 标题 | 主关键词 | 辅助关键词 | CTS 内链候选 |
|---|---|---|---|---|---|
| W2-08 | Best of China | Xi'an's Terracotta Warriors — 8,000 faces, no two alike | `terracotta warriors` | `terracotta warriors xi'an` / `terracotta soldiers` / `xi'an tours` | `/blog/terracotta-warriors-guide-nz` |
| W2-09 | Best of China | Meet Baker Gu — 20+ years building China itineraries for Kiwis | `china travel specialists nz` | `china tour expert` / `baker gu` / `private china tour` | `/experts` |
| W2-10 | Best of China | China visa-free for NZ — what you can and can't do | `china visa free entry nz` | `china visa for nz citizens 2026` / `china tours from new zealand` / `china travel checklist` | `/blog/china-visa-free-nz-2026` |
| W2-11 | Best of China | Puyuan — the Song-dynasty water town most Kiwis have never heard of | `authentic china experiences` | `china water towns` / `puyuan ancient town` / `jiangnan water town` | `/blog/china-water-towns-jiangnan-guide` ⭐ |
| W2-12 | Tale of Two Cities | Why Kiwi retirees keep choosing Beijing+Xi'an as their first China trip | `china tours from nz` | `beijing xian tour` / `best china tours from nz` / `october 2026 china tour` | `/campaigns/october-2026/tale-of-two-cities` |
| W2-13 | Shanghai & Surroundings | Suzhou's Master of the Nets Garden — China's quietest UNESCO secret | `shanghai tours from auckland` | `suzhou tour` / `october 2026 china tour` / `china cultural tours` | `/campaigns/october-2026/shanghai-surroundings` |
| W2-14 | Silk Road 2027 | Mogao Caves at Dunhuang — only deeper Silk Road tours include this | `china cultural tours` | `silk road china tour` / `mogao caves dunhuang` / `2027 china tour` | `/tours/china/signature/silk-road` |

### W3 (2026-06-29 → 07-05)

| # | 主推团 | 标题 | 主关键词 | 辅助关键词 | CTS 内链候选 |
|---|---|---|---|---|---|
| W3-15 | Best of China | Hangzhou's West Lake at dawn — why Marco Polo called it 'the most beautiful city' | `china cultural tours` | `hangzhou west lake` / `china tours from new zealand` / `15 day china tour` | `/hangzhou-travel-guide` |
| W3-16 | Best of China | What 'direct on-ground operations' means for your China trip | `china travel specialists nz` | `direct china operations` / `no middlemen china tour` / `nz china travel agency` | `/about` |
| W3-17 | Best of China | Why November is the secret-best month to see Beijing | `best time to visit china` | `november china travel` / `beijing tours kiwi` / `china autumn travel` | `/blog/is-october-good-time-to-visit-china` |
| W3-18 | Best of China | Shanghai's Bund at blue hour — the skyline Wong Kar-wai filmed | `shanghai tours from auckland` | `shanghai itinerary 10 days` / `bund shanghai` / `china tours from nz` | `/blog/shanghai-10-days-itinerary` |
| W3-19 | Best of China | Beijing → Xi'an by G89 — why we sequence Best of China this way | `china tours from new zealand` | `beijing to xian train` / `g89 high speed train` / `15 day china tour` | `/blog/beijing-to-xian-high-speed-train` ⭐⭐ |
| W3-20 | Best of China | When a family comes back for their second China trip | `authentic china experiences` | `china tours from new zealand` / `returning china traveller` / `family china tour` | `/tours/china/discovery/essentials` |
| W3-21 | Silk Road 2027 | Why we cap at 18 days when others go 28 — the part you don't need | `silk road china tour` | `china cultural tours` / `2027 china tour` / `china private tour` | `/tours/china/signature/silk-road` |

### W4 (2026-07-06 → 07-12)

| # | 主推团 | 标题 | 主关键词 | 辅助关键词 | CTS 内链候选 |
|---|---|---|---|---|---|
| W4-22 | Tale of Two Cities | Best of China vs Tale of Two Cities — which 10/15-day route fits you? | `china tour packages` | `beijing xian tour` / `15 day china tour` / `china tours from nz` | `/campaigns/october-2026/tale-of-two-cities` |
| W4-23 | Best of China | Xi'an's Muslim Quarter — where the Silk Road still smells like cumin | `terracotta warriors xi'an` | `xi'an muslim quarter` / `china cultural tours` / `china tours from nz` | `/xian-travel-guide` |
| W4-24 | Best of China | Why we cap our China tours small — and what 'fully inclusive' actually covers | `small group china tours` | `fully inclusive china tour` / `china tours from new zealand` / `15 day china tour` | `/tours/china/discovery/essentials` |
| W4-25 | **Best of China** ⭐ NEW | China holiday packages from NZ — what's actually included (with airfare) | **`china holiday packages`** | `china tour packages including airfare from nz` / `holidays to china` / `china tours from auckland` | `/tours/china/discovery/essentials` |
| W4-26 | Shanghai & Surroundings | When the kids buy mum the China trip she's been talking about for 30 years | `shanghai tours from auckland` | `october 2026 china tour` / `china gift travel` / `family china trip` | `/campaigns/october-2026/shanghai-surroundings` |
| W4-27 | Best of China | The water towns Best of China takes you through | `authentic china experiences` | `china water towns` / `puyuan ancient town` / `15 day china tour` | `/blog/china-water-towns-jiangnan-guide` |
| W4-28 | Best of China | Best of China — 3 November booking window now open | `china tours from new zealand` | `15 day china tour` / `best china tours from nz` / `november china travel` | `/tours/china/discovery/essentials` |

### 修订后团权重 (v0.2 — 因 W4-25 替换 + W3-15 S&S 化)

#### 周-团分布矩阵

| 主推团 | W1 | W2 | W3 | W4 | 合计 | 占比 |
|---|---|---|---|---|---|---|
| **Best of China** | 01 / 02 / 04 / 07 = 4 | 08 / 09 / 10 / 11 = 4 | 16 / 17 / 18 / 19 / 20 = 5 | 23 / 24 / 25 / 27 / 28 = 5 | **18** | **64%** ⭐ |
| Tale of Two Cities | 05 = 1 | 12 = 1 | 0 | 22 = 1 | **3** | **11%** |
| Shanghai & Surroundings | 0 | 13 = 1 | **15 (NEW)** = 1 | 26 = 1 | **3** | **11%** |
| Silk Road 2027 | 06 = 1 | 14 = 1 | 21 = 1 | 0 | **3** | **11%** |
| 通用品牌 | 03 = 1 | 0 | 0 | 0 | **1** | **3%** |
| **合计** | **7** | **7** | **7** | **7** | **28** | **100%** ✅ |

#### 跟 v0.1 (00-topic-plan.md) 的 diff

| 变更 | v0.1 | v0.2 final | 原因 |
|---|---|---|---|
| W4-25 主推团 | Shanghai & Surroundings (Yangtze Delta) | **Best of China** (China holiday packages with airfare) | PM 拍板 Q1: commercial intent + GSC 数据驱动 |
| W3-15 主推团 | Best of China (Hangzhou 西湖) | **Shanghai & Surroundings** (该团 Day 7 含西湖) + Best of China cross-link | 补 S&S 配额防止 v0.2 配比失衡 |
| W1-06 angle | "China you haven't seen — Danxia" | 一致（PM 拍板 Q2） | — |
| W2-14 angle | "Why an 18-day Silk Road journey is worth planning a year ahead" | **"Mogao Caves at Dunhuang — only deeper Silk Road tours include this"** | PM 拍板 Q2: 跟 Inspiring 16d 差异化 |
| W3-21 angle | "Mogao Caves at Dunhuang — 1,000 years of Buddhist art" | **"Why we cap at 18 days when others go 28 — the part you don't need"** | PM 拍板 Q2: 跟 Wendy Wu 28d 差异化 |
| W3-19 主推团 | Tale of Two Cities (G89 节奏) | **Best of China** (Best of China Day 6 G89 真实节点) | v0.1 已确认 |

**最终配比 v0.2**: Best of China 18 (64%) ✅ 区间内 / Tale 3 (11%) / S&S 3 (11%) / Silk Road 3 (11%) / 通用 1 (3%) = 28 ✅

---

## 📱 5. IG Hashtag 池策略 (Wave 1 W1-W4 通用)

> **作用**: IG 算法主要按 hashtag + interest graph 推荐。每篇 IG caption 30 hashtag 按 10/10/10 分。

### 5.1 Tier A: SEO 信号词 (10 个，按 keyword volume 选)

按 CTS DataForSEO + GSC 排名 + 月搜索量综合选：

```
#chinatours #chinatourpackages #chinatoursnz #chinatoursfromnewzealand 
#greatwalltours #terracottawarriors #chinatravelspecialists 
#chinaculturaltours #smallgroupchinatours #chinaholidaypackages
```

### 5.2 Tier B: Niche / Destination Tag (10 个)

按 master_brief 5 pillar + tours.ts 真实节点：

```
#beijing #xian #shanghai #hangzhou #westlake #silkroad #danxia 
#mogaocaves #hutongtour #waterTownChina
```

### 5.3 Tier C: NZ + Audience Tag (10 个)

按 primary_audience 35-70 + NZ market：

```
#kiwitravellers #nztravellers #travelnz #australiatravellers 
#aucklandtravel #kiwiretirement #travelgram #travelwithCTS 
#china2026 #china2027
```

### 5.4 按 Pillar 微调

| Pillar | Tier A 偏向 | 增删建议 |
|---|---|---|
| destination_inspiration | 视觉 SEO 词 | 加 #chinaphotography #travelphotography |
| educational_planning | how-to / visa 词 | 加 #chinavisa #chinatravel2026 #chinatravelguide |
| expertise_heritage | brand + expert 词 | 加 #since1928 #chinaspecialist #directops |
| social_proof_celebration | NZ + family 词 | 加 #kiwifamilies #milestonecelebration |
| promotional_urgency | booking + dates 词 | 加 #limitedseats #earlybird #bookwithCTS |

---

## 🔗 6. FB 文案 keyword 密度规则

### 6.1 主关键词使用次数

| 位置 | 主关键词使用 | 辅助关键词使用 |
|---|---|---|
| FB 正文前 50 字 | **1 次**（避免被算法判定 keyword stuffing）| 0 |
| FB 正文中段 | 0-1 次（自然融入）| 1-2 次 |
| FB 正文结尾 (CTA 前) | 1 次（含 URL）| 0 |
| **总计** | **2-3 次** | **1-3 次** |

### 6.2 IG caption keyword 密度

| 位置 | 主关键词 | 辅助关键词 |
|---|---|---|
| 第 1 行 (hook) | **1 次**（重要 — IG 截断显示） | 0 |
| caption 中段 | 0-1 次 | 1-2 次 |
| caption 结尾 (CTA) | 1 次 | 0 |
| 30 个 hashtag | 主关键词去 hyphen 转 hashtag (e.g. `#chinatoursfromnewzealand`) | 辅助同理 |
| **总计** | 2-3 次 + hashtag | 1-3 次 + hashtag |

### 6.3 跨 post 关键词分散原则

- W1-W4 28 篇里**同一主关键词最多用 4 次** (避免 cannibalization)
- 例: `china tours from new zealand` 用在 W1-01 / W1-05 / W3-19 / W4-28 = 4 次，分散在 4 周
- 大词 `terracotta warriors` 用在 W2-08 / W4-23 = 2 次（资源稀缺，珍惜）

---

## 🎯 7. Wave 2 Paid Ads Interest Targeting 候选（FYI）

> **作用**: Wave 2 18 个 paid ad creative 启动时，按以下 interest 词锁定 Meta Ads audience targeting

### 7.1 Tier 1 高意向词 (commercial intent，主推 Campaign A Best of China)

- "china tour packages"
- "china holiday packages"
- "china tours from new zealand"
- "small group china tours"

### 7.2 Tier 2 中意向词 (informational intent，主推 Campaign B/C 预热)

- "best time to visit china"
- "china visa free entry nz"
- "great wall tours"
- "terracotta warriors"

### 7.3 Tier 3 兴趣词 (audience interest，Lookalike 配合)

- "china travel"
- "asia travel"
- "luxury travel new zealand"
- "retirement travel"
- "cultural tourism"

(Wave 2 spec 启动时再展开)

---

## ⚠️ 8. 本轮全程禁用词清单 (R1 红线 + Keyword 视角)

### 8.1 业务禁用 (R1)

- ❌ Margaret&John / Sarah / 任何具体客户名
- ❌ "1,200+ Kiwi" / 任何具体客户数
- ❌ Fire & Fuzz / Chongqing / Chengdu / Liziba (即使 GSC 数据好)
- ❌ 2027 Yunnan Discovery (占位)
- ❌ 4.8 star / 127 reviews 等具体 rating 数字 (audit pending)

### 8.2 Keyword 禁用 (本轮策略)

- ❌ `chongqing tours` (Fire & Fuzz 退场) — 即使 GSC 数据好
- ❌ `chengdu panda tours` (Fire & Fuzz 退场)
- ❌ `liziba station` (Fire & Fuzz 退场)
- ❌ `yangtze river cruise` (本轮 4 团都不含)
- ❌ `zhangjiajie avatar mountains` (Sarah audit pending + 本轮不主推)
- ❌ `yunnan` / `dali` / `lijiang` / `kunming` (本轮不主推)

### 8.3 Master_brief 列出但本轮慎用

- ⚠️ `guilin li river tours` (master_brief 列但本轮 4 团不含 Guilin) — 仅在 destination_inspiration 通用 photo essay 偶用
- ⚠️ `chengdu panda tours` (master_brief 列但 Fire & Fuzz 退场) — 不用

---

## ✅ 9. 待 PM Review

- [ ] CTS keyword baseline (35 词 + GSC 28 天) 解读是否准确
- [ ] 5 竞品矩阵 + 6 Gap 是否符合实际市场认知
- [ ] **W4-25 替换 OK** + "no middlemen markup" angle 嵌入 OK
- [ ] **Silk Road 3 篇新 angle** (Danxia / Mogao 差异化 / 18 vs 28 天) OK
- [ ] **W3-19 主链 Best of China G89** (而非 Tale) OK
- [ ] 团权重 v0.3 final (Best of China 17 / Tale 3 / S&S 4 / Silk Road 3 / 通用 1) 是否同意
- [ ] **W3-15 Hangzhou** 改算 Shanghai & Surroundings 主链 + Best of China cross-link 是否合理 (该团 Day 7 含西湖)
- [ ] IG hashtag 池 10/10/10 分层是否合理
- [ ] FB 正文 keyword 密度规则 (主词 2-3 次) 是否合规
- [ ] Wave 2 interest targeting Tier 1-3 是否方向对

PM 拍板后我**修订 00-topic-plan.md** 同步 v0.3 配比 + W4-25 替换 + Silk Road 新 angle + 加每篇 keyword_focus 列，commit + push 一起。

---

## 📈 10. 子牙同步建议

(不影响 PM 拍板，子牙独立决定)

1. **CTS LP /tours/china/discovery/essentials 主文案应加 "small group" + "fully inclusive" + "award-winning" 字眼** — 这是另一条 SEO 优化战线，不归 FB Sprint 管，但 master_brief.competitive_notes_md 已列 "small groups" 为 CTS USP，LP 没用是失分。建议子牙开 issue 或 spawn task。

2. **W4-25 主题 "China holiday packages from NZ — what's actually included (with airfare)" 应该有对应 SEO landing page** — DataForSEO `holidays to china` 390/月 CTS #49 (弱势)，建议子牙考虑长期建一个 SEO LP `/china-holiday-packages-from-nz` (Phase 14+ SEO 战线)。

3. **marketing_plan.plan_data 落库**: 如果子牙想把 28 篇 keyword_focus 落到 ME `marketing_plans.plan_data` jsonb，可以按 W1-W4 + 主词 + 辅词 + 内链结构序列化。但本 sprint 还没到这个阶段。
