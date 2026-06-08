# 📍 START HERE — ME Landing Page Sprint (2026-06-08)

> 这是 PM 在 ME（Magic Engine）后台的子牙 agent 下达给 ChinaTravel 项目的落地页冲刺任务
> 总计 **11 个页面**，分 3 个 Wave 按 ROI 优先级
>
> **新 Claude Code 窗口开工方式**：把下面的"启动提示词"粘贴给新窗口的 Claude，剩下的它会自己读 spec 文档干活。

---

## 🚀 启动提示词（粘贴到新 Claude Code 窗口）

```
我在 ChinaTravel 项目里要做 ME (Magic Engine) 下达的落地页冲刺任务。完整 spec 在
docs/me-landing-page-sprint-2026-06-08/ 目录下。

任务规模：3 个 Wave，共 11 个页面改造 / 新建。

**第一步**：读 docs/me-landing-page-sprint-2026-06-08/00-README-START-HERE.md
完整理解任务范围、Wave 优先级、技术约束、ME 数据对照表。

**第二步**：跟我确认从哪个 Wave 开始。我倾向 **Wave 1**（机会词 2 页 CRO + schema 强化），
因为这是当前 SEO 排名 #10 / #14 接近首页的 ROI 最高战场。

**约束清单**（必读，违反一条 = 整个改动作废）：
1. **Read before write** — 任何要改的页面，先用 Read 完整读现有 page.tsx + 涉及到的
   组件 + 涉及到的 schema 注入函数，理解现状 → 再下手。CLAUDE.md Rule 8。
2. **Surgical changes** — 只改 spec 里点名的部分，不要顺手"优化"相邻代码 / 格式 / 注释。
   CLAUDE.md Rule 3。
3. **同步双页** — 改 `/great-wall-travel-guide/page.tsx` 时，如果改了 hero / CTA /
   trust signals，看 README 第 4 节 "同步双页约束"。
4. **不允许凭空编业务数据** — 团价 / 出发日期 / 客户数 / 团友姓名都必须来自现有 tour
   data（`getTourBySlug`）或 master_brief。不知道就停下问我，不要瞎填。
5. **schema 标准化** — 所有新 schema 注入用 `SchemaMarkup` 组件，不要写 `<script>` 标签。
6. **测试**：每改完一页跑 `npm run lint` 看 TS error，跑 `npm run build` 看 build 通过。
   跑不通先修自己造的，再继续下一页。

我的角色：PM。我在跑别的并行任务（CTS Google Ads + Meta Ads 配置）。你跑 Wave 1 时
独立干，2-3 小时找我汇报一次。遇到 spec 里没写清楚的、或者跟现有代码冲突的，停下来
列出选项问我，不要自己拍板。
```

---

## 📋 任务全景（11 页）

### Wave 1 — 机会词 CRO + Schema 强化（最高 ROI，2-3 小时）

| 页面 | 现状 | 目标 |
|---|---|---|
| `/great-wall-travel-guide/page.tsx` | SEO #10, 月搜 590 | 冲 P1：强化 CTA + 加 TouristTrip schema + 嵌入 inline form + 强化 Mutianyu/Badaling/Jinshanling 对比内容 |
| `/terracotta-warriors-travel-guide/page.tsx` | SEO #14, 月搜 1600（**最高 ROI**） | 冲 P5+：同上 + 加 Xi'an Tale of Two Cities campaign 链接 + Baker Gu 专家叙事 |

📄 详细 spec：`01-wave1-opportunity-keywords.md`

### Wave 2 ⭐ — Best of China 主推 + Oct 两团 LP CRO（C1/C2 广告启动配套，3-4 小时）

> **2026-06-08 PM 修正**：
> - **Best of China (Essentials)** 是 #1 主推
> - **Oct 两团**（Tale of Two Cities + Shanghai & Surroundings）是辅助焦点
> - **Fire & Fuzz 已从本轮推广移除** — `/campaigns/fire-fuzz` + `chongqing-chengdu` tour 模板不在范围

| 页面 | 现状 | 角色 | 目标 |
|---|---|---|---|
| ⭐ `/tours/china/discovery/essentials` | 现有，9/3 出发 NZD $4,539 / 15 天 | **#1 主推** | Hero trust + 紧迫性 + "Why 15 Days" 价值 stack + TouristTrip schema |
| `/campaigns/october-2026/tale-of-two-cities` | 现有，10/15 NZD $3,480 / 10 天 | Oct 两团 #1 | hero trust + 社会证明 + urgency widget |
| `/campaigns/october-2026/shanghai-surroundings` | 现有，10/14 NZD $3,399 / 10 天 | Oct 两团 #2 | 同上 |
| `/tours/china/discovery/{beijing-xian,shanghai-surroundings}` | Tour 模板 | 同步 | CLAUDE.md 强约束：campaign LP 改了共享区块，tour 模板要同步 |

📄 详细 spec：`02-wave2-oct-2026-campaign-cro.md`

### Wave 3 — SEO 内容地基（90 天长线，4-6 小时）

| 页面 | 现状 | 目标 |
|---|---|---|
| `/china-tours-from-new-zealand/page.tsx` | 已存在，SEO #9, 月搜 170 | 内容深化 + schema + 内链 |
| `/china-travel-specialists-nz/` | **不存在，新建** | category page, 内容覆盖 master_brief content_pillars |
| `/beijing-tours/page.tsx` | 已存在 | SEO 优化 + 加机会词内链 |
| `/china-visa-guide-for-new-zealanders/` | 已存在（注意 slug 是 -for-new-zealanders 不是 -nz） | metadata + schema 强化 |
| `/small-group-china-tours/` | **不存在，新建** | category page |

📄 详细 spec：`03-wave3-seo-foundation.md`

---

## 🔍 关键背景信息

### ME 数据库的相关战线（PM 视角不直接看，FYI）

- **Initiative**: `CTS SEO 内容地基 — 中国旅游专家阵地` (id `ea930444-3f50-4552-885e-9c19c3305244`)
- **Marketing Plan**: `CTS SEO 内容地基 90 天（6/15-9/2）` (id `b9bf3657-eb0e-4eea-bc12-b7d50e7e1dc5`)
- **Goal**: G2 CTS 自然流增长（baseline 525 sessions → target 1000，已 A1 修复算法成 organic-only 158）

### Initiative C3（4 落地页 CRO Sprint）的真实情况

子牙原本在 ME 数据库里登记的 C3 战线是 "4 个 tour 落地页 CRO"，但摸到代码后真相是：
- **真正活的 Oct 2026 Campaign LP 只有 2 个**（tale-of-two-cities + shanghai-surroundings）
- 第三个原本计划的 "Yunnan-Dali" **不在 Oct 2026 campaign 列表里** — Initiative hypothesis 已在 ME 数据库改过
- Wave 2 涉及的 tour 模板页面共享区块需要同步（CLAUDE.md 第 2 节强约束）

### CTS 网站当前真实 SEO 数据（2026-06-08 GSC + DataForSEO）

- `china travel`: P1 (月搜 110)
- `cts christchurch`: P2 (320)
- `china travel service`: P2 (110)
- `cts chch`: P7 (320)
- `china travel packages`: P8 (170)
- `china tours from nz`: P9 (170)
- **`great wall tours`: P10 (590) — Wave 1 主战场**
- **`terracotta warriors`: P14 (1600) — Wave 1 ROI 最高**

GSC 28 天 rolling: 622 clicks / 49,191 impressions / avg position 14.3（向好趋势 5/29 → 6/8）

GA4 28 天 organic-only sessions: **158** (CTS), 全站 total 259（其余是 direct + paid_social FB 残留 + bing organic 等）

---

## 🛑 必读约束（违反即返工）

### 1. 不允许凭空编业务数据

**禁止编**：团价 / 出发日期 / 客户数 / 团友姓名 / 团数。
**允许引用**：
- 团数据 → `src/lib/data/tours.ts` `getTourBySlug()` 
- October 2026 campaign 信息 → `src/lib/campaigns/october-2026-discovery.ts`
- 客户数量 "1,200+ Kiwi" → master_brief 已确认是真实数据，可用
- "98 years since 1928" → master_brief 已确认，可用
- "Baker Gu 20+ years specialist" → master_brief 已确认，可用

**不知道就停下问 PM**。

### 2. 同步双页约束（CLAUDE.md Rule）

如果改了 Tour 模板的共享区块（`ChinaVisaNudge`, `TrustBar`, `TourTrustSignals`, `TourSupportingContentLinks`），Campaign LP 也要同步。反之亦然。

### 3. Schema 注入用现有组件

```tsx
import SchemaMarkup from '@/components/SchemaMarkup';
<SchemaMarkup data={schema} />
```

**禁止**手写 `<script type="application/ld+json">`。

### 4. metadata 用现有 helper

```tsx
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
```

**禁止**自己拼 metadata object。

### 5. dev server 跑在 :3010

```bash
npm run dev  # port 3010
```

如果端口冲突用 `npm run dev:alt` (3055)。

### 6. 跑测试

```bash
npm run lint       # TS error check
npm run build      # 生产构建必须通过才能 commit
```

### 7. Git workflow

- 不要直接 push 到 main
- 用 feature branch: `feat/me-landing-sprint-wave1-2026-06-08`
- PR title: `feat(landing): Wave 1 — Great Wall + Terracotta Warriors CRO + schema [ME-Sprint-2026-06-08]`

---

## 📞 跟 PM 协作模式

- PM 在并行跑 CTS Google Ads + Meta Ads 配置
- 新窗口 Claude 独立干 Wave 1 → 跑通 → 找 PM check → 推进 Wave 2
- 遇到拿不准的，停下来列选项问，不要自己拍板
- 每完成一个 Wave，写一份**simple summary**：改了哪些文件、跑了哪些测试、build 是否通过、screenshot 对比（before/after）

---

## 📂 文件清单

```
docs/me-landing-page-sprint-2026-06-08/
├── 00-README-START-HERE.md              ← 你正在读这个
├── 01-wave1-opportunity-keywords.md     ← Wave 1: Great Wall + Terracotta CRO + Schema
├── 02-wave2-oct-2026-campaign-cro.md    ← Wave 2: October 2026 campaign LP + tour 模板同步
└── 03-wave3-seo-foundation.md           ← Wave 3: SEO 长线内容地基
```

下一步：读 `01-wave1-opportunity-keywords.md` 开始 Wave 1。
