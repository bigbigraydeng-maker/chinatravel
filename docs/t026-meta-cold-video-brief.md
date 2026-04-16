# T026 - Meta Ads Cold Traffic Video Brief (Discovery x2)

## Scope

- Campaign scope: Meta cold traffic preparation for two October 2026 Discovery products.
- Product A: `A Tale of Two Cities` (`beijing-xian`)
- Product B: `Shanghai & Surroundings` (`shanghai-surroundings`)
- Current stage: Preparation and creative validation (Phase 1b), not full scale.

## Objective

- Build a minimum viable cold-traffic creative pack that can be launched quickly once Pixel/events are ready.
- Validate first 7-day baseline for:
  - Link CTR
  - Landing Page Views (LPV)
  - Cost per LPV
  - Thumb-stop quality (first 3-second hold rate from platform insights)

## Campaign Structure (Recommended)

- Campaign: `TOF_Cold_Traffic_Discovery_Oct2026`
- Ad set split:
  - `AS_BeijingXian_Cold`
  - `AS_ShanghaiSurroundings_Cold`
- Each ad set runs 3 creative angles (3 videos minimum).
- Placements: Advantage+ placements (keep Reels/Stories priority in creative design).

## Creative Angles (Both Products Use Same Framework)

### Angle 1 - Outcome-led (Trip Result)

- Message: "What you will experience in 8-10 days, with less planning stress."
- Use case: First touch for users with broad travel interest.
- Primary CTA: `Learn More`

### Angle 2 - Pain-point-led (First-time China Anxiety)

- Message: "Worried about visa, transport, language? We simplify the whole flow."
- Use case: Mid-funnel cold users who need confidence.
- Primary CTA: `Learn More` or `Send Message`

### Angle 3 - Trust-led (Local Specialist Confidence)

- Message: "NZ-facing China specialist support + clear itinerary structure."
- Use case: Users comparing operators and looking for credibility signals.
- Primary CTA: `Learn More`

## Video Script Framework (15-30s)

- 0-3s Hook:
  - Ask a sharp question or promise a clear result.
- 3-12s Route highlight:
  - Show destination sequence and signature moments.
- 12-22s Confidence layer:
  - Add practical reassurance (planning support, trip flow, service clarity).
- 22-30s CTA:
  - Drive to October campaign landing page.

## Product-Specific Hook Bank

### A Tale of Two Cities (Beijing + Xi'an)

- Hook options:
  - "First China trip? Start with Beijing + Xi'an."
  - "History-rich China in one smooth route."
  - "Iconic China without planning overload."
- Visual priorities:
  - Great Wall / Forbidden City / Terracotta Warriors / city rhythm transition.

### Shanghai & Surroundings

- Hook options:
  - "Want modern China plus classic water-town charm?"
  - "Shanghai energy, Jiangnan elegance, one route."
  - "A softer-paced first China trip from Shanghai outward."
- Visual priorities:
  - Shanghai skyline / Suzhou-Hangzhou water-town texture / food and lifestyle scenes.

## Asset Specs (Minimum)

- Per product:
  - 3 short videos (one per angle), 15-30s
  - Cover text variants x2
- Ratio pack:
  - 9:16 (primary)
  - 4:5
  - 1:1
- Caption style:
  - On-screen text safe area for Reels/Stories
  - English-first copy, concise lines

## Copy Pack Skeleton (Per Ad)

- Primary text:
  - 1 short hook line
  - 1 value line (route + benefit)
  - 1 CTA line
- Headline:
  - Keep <= 40 chars when possible
- Description:
  - Optional, one trust/value line

## Naming Convention

- Campaign:
  - `TOF_Cold_Traffic_Discovery_Oct2026`
- Ad set:
  - `AS_BeijingXian_Cold_A18-55`
  - `AS_ShanghaiSurroundings_Cold_A18-55`
- Ad:
  - `AD_BX_Angle1_HookA_V1`
  - `AD_BX_Angle2_HookB_V1`
  - `AD_SH_Angle1_HookA_V1`

## UTM Standard (Aligned with repo conventions)

- Base:
  - `utm_source=facebook`
  - `utm_medium=paid_social`
  - `utm_campaign=tour_discovery_oct2026`
- Content examples:
  - `utm_content=campaign_tale_of_two_cities_video_angle1`
  - `utm_content=campaign_tale_of_two_cities_video_angle2`
  - `utm_content=campaign_shanghai_surroundings_video_angle1`

Example URL:

`https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=tour_discovery_oct2026&utm_content=campaign_tale_of_two_cities_video_angle1`

## 7-Day Read Window (No Over-optimization)

- Keep first 72 hours stable unless severe delivery issue.
- Day 4-7 checks:
  - Link CTR (ad-level)
  - LPV volume and cost
  - Creative retention proxies (3s and 25% views)
- Decision rule:
  - Pause obvious underperformers
  - Keep top 1-2 creative per ad set
  - Produce next variant from winning angle

## Dependencies and Next Tasks

- Depends on:
  - `T014` Meta Pixel setup
  - `T016` conversion dictionary alignment
  - `T027` image/video asset organization
- Feeds into:
  - `T028` FB/IG ad copy package
  - `T029` cold traffic campaign build
  - `T031` remarketing setup

---

## Meta 入口与广告搭建（中文速查）

### 常用入口（URL 可直接收藏）

| 用途 | 入口 |
|------|------|
| **创建/管理广告（主战场）** | [Meta Ads Manager](https://adsmanager.facebook.com/) |
| **商务资产：BM、账户、Pixel、权限** | [Meta Business Suite](https://business.facebook.com/) → 左侧 **设置**（齿轮）或顶部 **商务设置** |
| **Facebook 公共主页** | [facebook.com](https://www.facebook.com/) → 你的主页 → **专业账户控制界面** 或从 BM 进入 |
| **Instagram 专业账户** | 手机 Instagram **设置与活动** → **专业控制界面**；或与 FB 主页关联后在 Ads Manager 里选 IG 投放 |

### 在 Ads Manager 里从零建一条冷流量广告（与本 brief 对齐）

1. 打开 [Ads Manager](https://adsmanager.facebook.com/) → 绿色 **创建**（Create）。
2. **选择目标**：冷流量测创意可用 **流量（Traffic）** 或 **销量（Sales）** 里以 **落地页浏览** 为优化（视你 Pixel/事件是否已就绪；未装 Pixel 前优先 Traffic + 网站点击）。
3. **Campaign 名称**：例如 `TOF_Cold_Traffic_Discovery_Oct2026`。
4. **Ad set（广告组）**：建 2 个——`AS_BeijingXian_Cold`、`AS_ShanghaiSurroundings_Cold`；分别设预算、地区（如 NZ + AU 或仅 NZ）、年龄等。
5. **Ad（广告）**：每个 Ad set 下新建 **3 条广告**，对应 Angle 1/2/3；上传 **9:16** 视频（建议再备 4:5、1:1）。
6. **落地 URL**：使用 October 战役页 + UTM（见上文 **UTM Standard**），例如 Tale：`/campaigns/october-2026/tale-of-two-cities?...`；Shanghai：`/campaigns/october-2026/shanghai-surroundings?...`。
7. **身份**：选择 **Facebook 公共主页**；若投 Reels/Feed 且已绑定，可同时选 **Instagram 账户**。
8. 审核通过后 **发布**；前 72 小时尽量少改，避免学习期反复重置。

### 在 Business Suite 里要确认的 4 件事（避免广告建到一半报错）

在 [business.facebook.com](https://business.facebook.com/) → **商务设置**：

1. **账户** → **广告账户**：你有 **管理员** 或 **广告主** 权限。
2. **数据源** → **Pixel**：已创建并（稍后由网站）安装；域名在 Pixel 设置里允许。
3. **账户** → **公共主页**：主页已加入 BM，且你有权限。
4. **Instagram 账户**：若广告要显示来自 IG，需把 IG 与主页绑定并在 BM 里可见。

### 与网站追踪的关系（上线前必做）

- Pixel 与转化事件由任务 **T014 / T016** 覆盖；未就绪前仍可先用 **Traffic** + UTM 在 GA4 里看落地页会话，但 Meta 侧优化会弱一些。

