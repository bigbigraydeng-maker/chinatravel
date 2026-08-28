# Ceepii 翻新评估文档（Phase 0 · PR #146）

> 状态：**v3.1** · v3 已合 PR #146（`a19dad5`）· v3.1 = PR #147 discovery 发现无 lead DB · 简化 §4.3 / §10.2
> 分支：`claude/cts-ceepii-redesign-96cbba`
> 上游 main HEAD：`8d53aba feat(brochure): replace 2026-27 brochure with 14-page catalogue v2 (#145)`
> 编写者：Claude Code FDE · 2026-08-29
> 范围：仅评估 + Phase 0 隔离环境搭建方案，不含任何生产代码改动。

---

## v2 修订说明（2026-08-29 · 4 agent 并审后）

v1 由 4 agent 并行审出 **5 blocker + 11 major + 6 minor**（见 PR #146 review comment）· v2 修所有 blocker + 全部 major + 全部 minor。跨 agent 一致的关键修订：

**5 blocker 修法**
1. `NEXT_PUBLIC_*` build-time 内联 → §4.4 明确 staging = **独立 build**（不能一 build 部署两处）
2. `REDIRECT_ONRENDER_HOST` staging 陷阱 → §4.1 + §10 checklist 强制条目
3. middleware basic auth 顺序 → §4.1 强制 `/api/*` 豁免代码
4. shared-blocks 无 CI 保护 · fire-fuzz 已是第三副本 → §4.7 新增 shared-blocks 快照测试 + §10 Phase 0 patch 增项
5. `is_staging` 仅贴 leads 表 → §4.3 扩到 5 张表 + Storage namespace + Realtime channel 隔离

**11 major 修法**
6. Tailwind 港 1pd → **2-3pd** （§3.5 + §10）
7. `header3` 强依赖 Aside 全链 · 0.5pd → **2pd** （§3.1）
8. `button.tsx` CVA 说法错 + 全 Tailwind v4 语法 · +**1.5pd** （§3.1）
9. HugeIcons 132 unique 图标 · 3-4pd → **4-5pd** （§3.4）
10. W4 tour detail 1 周 → **1.5-2 周** （§6）
11. October 2026 / fire-fuzz / best-of-china 是 Phase B 隐藏第 5-7 页 · shared-blocks 双写连坐 （§2.2 + §6）
12. `baker-gu` / `lisa-li` §2.2 打 A 与 §3.3 SectionHost 映射目标自相矛盾 → 移入 Phase B extras （§2.2）
13. Phase A/B 窗口期 W2-W3 tour 页两难 → **W2 提前把 tour detail 外壳换到新 wrapper**（不动 Enquiry sidebar 语义）· W4 只做深度重构 （§6）
14. Enquiry sidebar shared state 适配严重低估 → §3.3 补估工 · Phase B 独立子任务
15. R19 peer 未验 → §10 新增 `scripts/verify-react-peers.mjs`
16. 每周一 merge main 冲突 6 周吃 3-6pd → §5.6 补估工

**6 minor 修法**
17. Ray 审 PR Plan B → §6 明写"周末未审自动短信提醒 · 周一未审 FDE 继续下一 sprint 并汇总"
18. 6 条 FDE 预设建议加"反向拍板成本" → §9 每条补
19. T+5min 冒烟 vs GSC 3-7天盲区 → §7 + §8 加 T+48h / T+72h / T+7d 检查点
20. `is_staging` 查询点数字拍脑袋 → §10 明写"Phase 0 patch 前必先跑 grep 出真实数字"
21. 4 锚点无 e2e/CI 断言 → §10 新增 e2e 断言 patch
22. `SchemaMarkup` 无 CI 校验 → §10 可选加 CI grep 断言

**总工期影响**：Phase 0 patch 1pd → **3pd** · Phase A W1 header 基座 0.5pd → 2pd · Button 系列 +1.5pd · HugeIcons +1pd · **合计 +6 人日**。**6 周 → 6.5-7 周**（吃 §5.6 缓冲 · 或压后 Phase B 某个 section 到 Phase C）。

---

## v3 修订说明（2026-08-29 · 子牙带队审后）

Ray edict："技术问题不要问我"· §9 的 9 个技术决策由 子牙 拍板。v3 = v2 + 3 处 doc 补丁 + §9 从 13 条缩到 4 条（只留业务）。

**9 项技术决策（子牙拍板 · 8 与 FDE 建议一致 · 1 处升级）**
1. 品牌色 → **保留 CTS `#B61E2E`+`#D6A756`** · Ceepii 只吸 typography/spacing/motion/structure
2. dark mode → **不引** · CTS 客群 55+ NZ · light-only 无 ROI
3. staging → **basic auth** · IP allowlist 遇 Ray 移动 4G 就废
4. staging Supabase → **共享生产库 + §4.3 全隔离** · 新 project 的数据 drift 才是最大污染源
5. staging Resend → **空 `RESEND_API_KEY`**（走 no-op 分支）· sandbox 需注册测试域 · 空 KEY 最简 · 不误发客户邮件
6. 视觉回归工具 → **必上 Percy 免费额度**（从"建议"升级为"必上"）· 79 页人肉抽只能覆盖 15-20 · 剩余盲区 A 级不接受
7. 图标库 → **保留 lucide + 手工换 132 图标** · 双库 +150kb 违反简单性 · 一次性成本换长期干净
8. 字体栈 → **采纳 Ceepii `Google_Sans_Flex` + Playfair italic span** · 不采纳则 Phase B 视觉感染力减半
9. Tailwind 港 → **Phase 0（PR #147）· 2-3pd 独立子任务** · 拖 W1 会让 PR #148 混杂难审

**3 处 v2 doc 补丁（子牙 GO 前必修 · v3 完成）**
- **§4.1 middleware fix**：staging basic auth 通过后 **fall through** 走现有 marketing/admin gate（v2 sample 里 `return NextResponse.next()` 会 short-circuit 掉 admin gate）· 401 响应加 `Cache-Control: no-store` · noindex header 统一在末尾 append
- **§4.3 加 5 个 `_prod` view**：defense-in-depth 防 Ray 手拉 SQL / Supabase Studio 查询漏 `.eq('is_staging', false)` filter
- **§6 Ray 审 PR Plan B 补一条**：待审 PR 累积 ≥ 3 强制 pause · 避免分支树炸开 · Ray 一次要 review 5 个连锁 PR 比周末赶不上更糟

**§9 从 13 条缩到 4 条**（全非技术 · Ray 拍板）
- Baker/Lisa bio 内容（W6 前需要 · 从 CTS 老板拿）
- Phase C 何时启动
- 上线时间窗
- Ray 审 PR SLA 承诺

**子牙裁决**：v3 patch 完 → **GO for PR #146 merge + PR #147 Phase 0 code patch**。

---

## v3.1 修订说明（2026-08-29 · PR #147 discovery）

**开工 PR #147 第一步 discovery 发现 CTS 实际生产状态与 v3 §4.3 假设不符**：

- 生产 Supabase 里**只有 1 张业务表** `gsc_search_analytics`（GSC 数据同步分析用 · 内部）
- **NO** `leads` · `newsletter_subscribers` · `form_submissions` · `itinerary_requests` · `tailor_made_submissions` 表 · 全部不存在
- Lead flow **100% 走 Resend 邮件** · 6 个 API（`/api/contact` `/api/tour-enquiry` `/api/tailor-made-enquiry` `/api/campaign-enquiry` `/api/send-itinerary` `/api/itinerary/send-email`）全部只调 `resend.emails.send` · 无数据库存储
- `fireLeadConversion` 是纯 client-side · 只 fire Google Ads conversion + Meta Pixel Lead · 不涉存储
- Supabase Realtime **未使用**
- Supabase Storage **只 admin 用**（image manager）· 用户提交路径不涉

**影响：整个 v3 §4.3 `is_staging` 隔离方案作废**。子牙 决策 #5（staging 空 `RESEND_API_KEY`）**天然覆盖所有 lead 污染场景** · 邮件 no-op = 无客户误发 = 无数据污染。

**§4.3 简化为**：
- staging Supabase 与生产共享 · 无 is_staging 字段 · 无 view · 无 Storage namespace · 无 Realtime channel
- staging Resend 空 KEY = lead 邮件 no-op（现有代码已有 `if (!apiKey) return { ok: false }` 保护）
- cookie domain 严格隔离（`staging.chinatravel.co.nz` vs `www.chinatravel.co.nz`）保留

**§10.2 Phase 0 patch 从 16 项 → 10 项 · 3pd → 2pd**：
- ❌ 删：Supabase migration · lead 写入/读取点微改 · Storage helper · Realtime channel · `_prod` view
- ✅ 保留：URL 基线 · middleware basic auth · GA/GTM env-toggle · `isStaging()` helper · Tailwind v3 港 · shared-blocks CI · 4 锚点 e2e · verify-react-peers · `.env.example` · CLAUDE.md 更新

---

## 0. 摘要（TL;DR）

| 维度 | 结论 |
|---|---|
| **客户** | CTS Tours NZ（`c0000000-0000-0000-0000-000000000000`） |
| **仓库** | `github.com/bigbigraydeng-maker/chinatravel` · 分支 `claude/cts-ceepii-redesign-96cbba` |
| **风险等级** | **A 级**（触碰 SEO URL / 埋点 / lead-conversion） |
| **总工期** | **6.5-7 周**（v1 是 6 周 · v2 吸收 +6pd 审评修订） · Phase A 3.5 周（含 W2 提前换 tour 外壳）+ Phase B 3-3.5 周（W4 tour detail 1.5-2 周） |
| **实际路由数** | **114 个 `page.tsx`** · Phase A 换壳 **79 页**（v1 是 81 · 移出 baker-gu/lisa-li 到 Phase B extras）· Phase B **6 页**（4 大页 + baker-gu + lisa-li）· October/fire-fuzz/best-of-china campaign 显式列为 **Phase B-adjacent · 与 tour detail 同步改** |
| **品牌叙事** | 保留现有 · Auckland since 2000 (25 年) · CTS Group founded 1928 · Baker Gu 作为 China specialist / content author · **不切美食游** |
| **技术策略** | Ceepii 组件降级到 CTS 现有栈（Next 14 + React 18 + Tailwind 3）· **不升 CTS** · 只 lift 组件层不 lift 页面层 |
| **不做** | 30+ SEO LP 深度重构、admin/marketing 内部工具页、`/api/*`、print 路由 |
| **成果物 · PR #146** | 本文件（**docs-only**）· Phase 0 代码 patch 走 **PR #147** · Phase A 起步走 **PR #148** |

---

## 1. CTS 官网现状盘点

### 1.1 技术栈
```
Next.js         14.2.35
React           18.2.0
Tailwind CSS    3.4.0
TypeScript      5.3.3
Supabase JS     2.39.0
Image loader    custom (Supabase Storage) · src/lib/image-loader.ts
Email           Resend 6.10
PDF             pdfkit + docx（服务端 external，见 next.config）
Node/Deploy     Render, main → auto-deploy
```

### 1.2 现有品牌 token（`tailwind.config.ts` · v3）

> ⚠️ **重要**：Ceepii 用 Tailwind 4 CSS-config（`@theme` / `@custom-variant`）· CTS 是 Tailwind 3 · **必须港 token 到 v3 语法**（详见 §3.5 · **v2 校正估工 2-3 人日** · v1 低估到 1 天）· 已加进 Phase 0 patch。

```
primary   #B61E2E   中国红 · CTA/强调
secondary #D6A756   暖金 · 品质感
accent    #1F2937   墨黑 · 标题
warm      #FFF9F5..#D6A756  奶油/沙色梯度
ink       #23201C / #5A554F     editorial 系（已存在，服务于 /preview-home）
surface   #FBF7F0 / #FFF / #1A1815   editorial 系
字体      Inter (sans) + Playfair Display (serif) · via next/font CSS var
```
Phase A 保留全套 token · Ceepii 中性色（`--muted-foreground` `--border` `--card-foreground`）作为**新增 neutral 系** token · **不覆盖** CTS 品牌色。

### 1.3 已存在的 redesign 起手
仓库里已经有前人试过的 redesign 脚手架（对我们是**种子**）：

| 位置 | 用途 | 建议 |
|---|---|---|
| `src/app/page-redesign.tsx` | 首页重设计 v0（含 Baker Gu specialist 区块） | Phase B 首页从此增强 |
| `src/app/preview-home/page.tsx` | 内部预览路由 · `robots: noindex` | Phase B 用作 A/B 观察点 |
| `src/app/preview-hero/page.tsx` | Hero 变体测试台 | 保留 |
| `src/app/preview-wendy-wu/page.tsx` | 竞品参考页 | 保留 |
| `src/components/HeroSearchEditorial/Glass/Cinematic.tsx` | 3 个 hero 变体已存在 | Phase B 首页从中选/融合 |
| `src/components/ImmersivePageHero.tsx` | 通用 immersive header | Phase A 可选替换其他页 hero |

### 1.4 埋点 & lead-conversion 拓扑
```
埋点入口（env-driven，已好）
├─ NEXT_PUBLIC_GA_ID   → components/GoogleAnalytics.tsx  → root layout.tsx
└─ NEXT_PUBLIC_GTM_ID  → components/GoogleTagManager.tsx → root layout.tsx
   ├─ dataLayer push 事件封装（页面/组件层广泛使用 window.gtag）
   └─ 若 ID 未配置：静默 no-op（生产/staging 都安全）

lead 提交路径（3 处入口 · 共用同一 fireLeadConversion） — SEO 保真 agent 确认
├─ /contact                     → ContactFormClient        → fireLeadConversion('contact_form')
├─ /thank-you                   → ThankYouClient           → fireLeadConversion(source from URL)
└─ 通用 <HeroWithLeadForm>       → 2 处消费者仅在页面级       → fireLeadConversion(leadConversionSource prop)
     └─ 消费者：/china-tours/page.tsx · /china-visa-guide-for-new-zealanders/page.tsx
     └─ 不在 Layout / Header / Footer 内 → Phase A 换壳不误伤 ✅
     └─ 已有单测 src/components/seo/__tests__/HeroWithLeadForm.test.tsx
```

### 1.5 SEO 基线（**这是本次翻新的最大约束**）
- `next.config.js` 定义 **60+ 条 permanent redirect**（v1 说 40+，SEO 保真 agent 实测 60+）· 其中 **1 条 host-typed 规则** 消费 `LEGACY_HOSTS + process.env.REDIRECT_ONRENDER_HOST`（⚠️ **staging 陷阱见 §4.1** · v2 blocker）
- `src/app/sitemap.ts` + `src/app/robots.ts` 生成 sitemap · Phase 0 需扫描线上 sitemap 与本地对齐存档
- 全站带 schema.org markup · SEO 保真 agent 实测 **`<SchemaMarkup>` 被 30+ page.tsx 单独 render** · Layout 不 render · Phase A 换壳不误伤（**但无 CI 保护** · §10 可选加 grep 断言）
- 语言：主站 `en-NZ` · GEO 定向仅 NZ

### 1.6 CLAUDE.md 里已锁的 UI 约定（Phase A 必须继承）
```
锚点（scroll-mt-24 + id · 4 处 · SEO 保真 agent 实测 render 覆盖率）
├─ #visa-nudge          → components/tours/ChinaVisaNudge.tsx           (仅 tour detail + 3 campaign)
├─ #faq                 → components/FAQSection.tsx                    (15+ 页复用)
├─ #trust-signals       → components/tours/TourTrustSignals.tsx        (tour detail + 3 campaign)
└─ #planning-resources  → components/tours/TourSupportingContentLinks  (tour detail + 3 campaign)

⚠️ v2 blocker #4：无 e2e / 无 grep 断言 / CI 仅 ci.yml + gsc-daily-sync.yml
→ §10 新增：Phase 0 patch 加 e2e 断言 4 锚点存在

shared blocks 双写规则
- tour 页新增块必须同步到 /campaigns/october-2026/[slug]
⚠️ v2 blocker #4：fire-fuzz 已是第三副本 · 无 CI diff / snapshot / lint
→ §10 新增：Phase 0 patch 加 shared-blocks 快照测试（tour vs 3 campaign LP · component import list diff）
- 例外必须在 PR 描述明写理由

品牌红线（PR #144 已合规）
- 全站 43+ 处 "NZ specialists since 1928" 已改为
  "Auckland since 2000 · backed by CTS Group founded 1928" 两条分立事实
- Phase A/B 换壳时**禁止**把这两条概念再合并
```

### 1.7 中间件（Phase 0 staging 基座）
`src/middleware.ts` 已有：admin cookie gate、marketing plan cookie gate、`/marketing` `X-Robots-Tag: noindex` header。**Phase 0 的 staging basic auth 扩展这个 middleware**。

⚠️ **v2 blocker #3**：现 middleware matcher 覆盖除 `_next/static|_next/image|favicon.ico` 外**所有路径**含 `/api/*`。basic auth 加在最前必须先 `/api/*` 豁免 · 否则 staging `/api/lead-*` 全 401 · lead 通道死。详见 §4.1。

---

## 2. 全路由清单（114 页 · 分级 · **v2 校正**）

排序：`/` 优先 → 目录结构 → dynamic route。**分类逻辑：**
- **A**（Phase A · 外壳换皮）— 面向公众 · 换 Header/Footer/Card/Button/Typography/Layout/Section wrapper，不动数据结构、schema、埋点、锚点、文案
- **A+**（Phase A 但 W2 提前换 tour 外壳）— tour detail 3 层动态路由 · **v2 新增策略**：W2 换外壳（避免 W2-W3 视觉分裂 + shared-blocks 双 wrapper 指向）· W4 只做深度重构
- **B**（Phase B · 深度重构）— Home + Tours listing + Tour detail 深度语义 + About + baker-gu + lisa-li
- **B-adj**（Phase B-adjacent · shared-blocks 连坐）— **v2 新增**：October 2026 / fire-fuzz / best-of-china campaign · W4 与 tour detail 同步改
- **C**（Phase C · 延后深度）— 30+ SEO LP 内容/结构级重构 · 本次不做
- **X**（Excluded · 不动）— admin/marketing 内部工具、`/api/*`、`/dev/*`、`/preview-*`、print、`/test-tours`

### 2.1 Phase B · 深度重构（**6 页 · v1 是 4**）
| 路由 | 备注 |
|---|---|
| `/` | Phase B W5 从 `page-redesign.tsx` + `HeroSearchEditorial` 起手 |
| `/tours` | listing → Ceepii stay listing 结构映射 · W5 |
| `/tours/[destination]/[tier]/[tour]` | tour detail 深度语义 · **W4 · 1.5-2 周** · 4 锚点 + shared blocks 契约 100% 保留 |
| `/about` | 1928 + NZ 25 年双叙事 · Baker/Lisa 团队 · W6 |
| `/experts/baker-gu` | **v2 从 Phase A 移入** · 197 行硬编码 JSX + 内联 SVG · §3.3 已标为 SectionHost 语义映射目标 · Phase B W6 与 About 一并做 |
| `/experts/lisa-li` | **v2 从 Phase A 移入** · 同上 |

### 2.2 Phase B-adjacent · shared-blocks 连坐（**v2 新增分类 · 3 页**）
这 3 页 import Phase B W4 要重写的 `TourHero / TourEnquiry / TourItinerary / TourInclusions` · CLAUDE.md shared-blocks 双写规则要求它们与 tour detail 同步 · **W4 sprint 范围隐性 +25%**：
```
B-adj  /campaigns/october-2026/[slug]  ← CLAUDE.md 明写 shared-blocks 契约页
B-adj  /campaigns/fire-fuzz            ← SEO 保真 agent 发现是第三副本
B-adj  /campaigns/best-of-china        ← 同上
```

### 2.3 Phase A · 全站外壳换皮（**79 页 · v1 是 81 · 分组**）

**用户主流程（10）**
```
A   /                         (被 Phase B W5 覆盖，A 阶段其他页共用新 Header/Footer)
A   /contact                  ContactFormClient + fireLeadConversion 保留
A   /tailor-made              TailorMadeForm 保留
A   /thank-you                ThankYouClient + fireLeadConversion 保留
A   /subscribe                newsletter 埋点保留
A   /destination-matcher      quiz UX 保留
A   /itinerary-generator      AI 生成器 · 只换壳
A   /trip-planner             同上
A   /travel-tools             hub 页
A   /tools/cost-calculator    工具
```

**Tours（v2 · A+ 策略）**
```
A+  /tours                       W2 提前换外壳 · W5 深度重构
A+  /tours/[destination]         W2 提前换外壳
A+  /tours/[destination]/[tier]  W2 提前换外壳
A+  /tours/[destination]/[tier]/[tour]  W2 换外壳（保 Enquiry sidebar 语义不动）· W4 深度重构
X   /tours/[destination]/[tier]/[tour]/print  print CSS 不换
A   /tours/find                  filter/finder UI
X   /test-tours                  Excluded（内部测试页）
```

**8 个城市 tour hubs**
```
A  /beijing-tours    /chengdu-tours    /chongqing-tours    /guilin-tours
A  /hangzhou-tours   /shanghai-tours   /suzhou-tours       /xian-tours
A  /yunnan-tours     /zhangjiajie-tours
```

**20 个 destination guides**
```
A  /beijing-travel-guide       /chengdu-travel-guide     /chongqing-travel-guide
A  /dali-travel-guide          /guilin-travel-guide      /hangzhou-travel-guide
A  /kunming-travel-guide       /lijiang-travel-guide     /shanghai-travel-guide
A  /shangri-la-travel-guide    /suzhou-travel-guide      /xian-travel-guide
A  /yangshuo-travel-guide      /yunnan-travel-guide      /zhangjiajie-travel-guide
A  /great-wall-travel-guide    /forbidden-city-travel-guide
A  /terracotta-warriors-travel-guide  /leshan-buddha-travel-guide
A  /tianmen-mountain-travel-guide     /li-river-travel-guide
```

**Discovery / regional guides（7）**
```
A  /beijing-xian-discovery-guide
A  /chongqing-chengdu-discovery-guide
A  /shanghai-surroundings-discovery-guide
A  /yangtze-river-cruise
A  /hongyadong-chongqing
A  /liziba-station-chongqing
A  /chengdu-panda-sanctuary
```

**Commercial SEO LP（7）**
```
A  /china-tours
A  /china-tours-for-seniors
A  /china-tours-from-auckland
A  /china-tours-from-new-zealand
A  /china-travel-specialists-nz
A  /small-group-china-tours
A  /best-china-tours
```

**信息 LP（4）**
```
A  /china-visa-guide-for-new-zealanders   ← 含 HeroWithLeadForm · fireLeadConversion 关键路径
A  /best-time-to-visit-china
A  /seasonal-guide
A  /local-food-guide
```

**Blog / FAQ / static（12 · v1 是 14 · baker-gu/lisa-li 移出）**
```
A  /blog                       /blog/[slug]
X  /blog/staging               ← 内部预览
A  /faq                        /faq/[slug]
A  /agents
A  /explore                    /explore/[city]
A  /guide                      /site-map
A  /privacy-policy             /terms-and-conditions
A  /play                       /play/[slug]
```

**Campaigns（3 · v1 是 6 · october-2026/fire-fuzz/best-of-china 移到 B-adj）**
```
A     /campaigns/chongqing
A     /campaigns/spotlight
A     /spotlight/october-2026
```

**About extras（1）**
```
A  /about/asian-escapes
```

### 2.4 Phase C · 延后深度
30+ 个 `-travel-guide` / `-tours` / `-discovery-guide` / commercial SEO LP。Phase A 只换外壳 → 视觉统一；内容/信息架构/转化路径级重构进 Phase C，单独立项。

### 2.5 Excluded · 不动（21 页）
```
/admin/*                          8 页  内部 dashboard
/marketing/*                     10 页  内部运营看板
/marketing/preview
/api/*                                  无 UI
/dev/quiz-collage/[slug]              开发工具
/preview-home /preview-hero /preview-wendy-wu   redesign 沙盒
/test-tours                            内部测试
/blog/staging                          内部预览
/tours/.../print                       print CSS
```

---

## 3. Ceepii → CTS 组件映射

> **数据来源**：`/Users/raydeng/Downloads/Ceepii-NextJS/ceepii-nextjs-template/` · Next 16.1.7 / React 19.2.4 / Tailwind 4.1.5 · ~130 组件 · **v2 校正基于 Ceepii 映射真实性 agent 组件级实读**

### 3.0 三条战略结论
1. **只 lift 组件层，不 lift 页面层**（页面用 `next/form` + inline `'use server'` + `await params` = Next 15+ API · 组件层 100% R18 兼容）
2. **Tailwind v4 CSS-config → 港到 v3** · **v2 校正估工 2-3 人日**（v1 低估 1 天） · 见 §3.5
3. **Ceepii 无真实后端** · form UI shell 套 CTS lead 契约不冲突 · **但 Enquiry sidebar shared state 适配层严重低估** · 见 §3.3 v2 补估工

### 3.1 直接可用（v2 校正）
| 类别 | Ceepii 组件 | v2 建议 |
|---|---|---|
| Buttons | `button.tsx` + 8 派生 + `ui/button.tsx` | ⚠️ **v1 错**：说"CVA variants 保留" · 实际 button.tsx 250 行**纯 clsx + 内联 styles object · 零 cva() 调用** · 全 Tailwind v4-only 语法（`bg-(--btn-border)` `focus:not-data-focus:outline-hidden` `*:data-[slot=icon]:size-5` `data-active:` 等）· v3 全要重写。**+1.5 人日**独立子任务 |
| Form primitives | `input.tsx` 等 10 个 | 全套 lift · Headless UI 依赖 · Headless UI 2.2.9 peer `^18 \|\| ^19` OK |
| Typography / atoms | 10 个 | 全套 lift |
| Section wrappers | `background-section.tsx` + `container` + `section-space*` utilities | lift · container 1536px 与 CTS 现有 `max-w-*` 冲突判断 W1 决定 |
| Card 变体 | 10+ 卡片 | Phase B tour card 从中选 1-2 个参考重构 `TourTierCard.tsx` |
| Section blocks（首页） | 15+ section | Phase B W5 首页从中挑 5-7 个 |
| Motion / reveal | `motion-div.tsx` `fade-in.tsx` `reveal-in-view.tsx` | ✅ agent 验证：三件套 `'use client'` + `motion/react` 简单包装 · 零 R19-only hooks · motion@12 peer 允许 R18/R19 · 真 lift |
| Blog | 5+ 组件 | Phase A blog 换壳直接用 |
| Misc UI | 6+ | lift |
| Header 基座 | `header3.tsx` + 依赖链 | ⚠️ **v1 错**：说"选 1 个基座换 logo" · 实际 header3 L20 `import { useAside } from '../aside'` · **强依赖 `Aside.Provider`**（在 `application-layout.tsx` L20 注入）· 不 wrap 会抛 context null。连带 lift：`AsideProvider` + `AsideSidebarNavigation` + `HeroSearchFormSmall`（含 embla + datepicker 深链）+ `AvatarDropdown` + `useInteractOutside` hook + ~7 HugeIcons。**0.5pd → 2pd** |
| Footer 基座 | `footer3.tsx` | ✅ agent 验证：无 Aside、无 provider、纯 nav array + inline SVG · 真 lift · footer 内容 100% 保留 CTS 现有 |
| Modal / Dialog | 4 个 | 按需 lift · Headless UI 依赖 |

### 3.2 需改写才能用（页面层 Next 16 API · 组件层可救）
| Ceepii 页面 | Next 16 依赖 | CTS 侧做法 |
|---|---|---|
| `(listings)/stay-listings/[handle]/page.tsx` | `next/form` + inline `'use server'` + `await params` | 抛弃页面外壳；lift 内部 section 组件；重接到 CTS `/tours/[dest]/[tier]/[tour]` |
| `(search-pages)/stay-search/page.tsx` | 同上 | 抛弃页面；lift `ListingFilterTabs` `Pagination` `StayCard2`；重接 CTS `/tours` |
| `(home-pages)/(home)/page.tsx` | 同上 | 抛弃页面；lift 首页 section 组合模式；重接 CTS `page-redesign.tsx` |
| `add-listing/*/page.tsx` (10 步) | 同上 | **完全不用** |
| `(account)/**` | 同上 | **完全不用** |
| `checkout/page.tsx` | 客户端 push | **完全不用** |

改写模板：
```ts
// Ceepii (Next 16)
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <Form action={handleSubmit}><input name="..."/></Form>;
}
async function handleSubmit(formData: FormData) { "use server"; /* ... */ }

// CTS (Next 14) 目标
export default function Page({ params }: { params: { handle: string } }) {
  const { handle } = params;
  return <ClientForm onSubmit={(data) => fireLeadConversion('...')} />;
}
```

### 3.3 需重写（stay-listing → tour operator 语义映射）
| Ceepii | CTS 目标 | 重写要点 |
|---|---|---|
| `stay-card2.tsx` | `TourTierCard.tsx` | Ceepii 字段（位置/评分/夜数/单价）→ CTS 字段（目的地/天数/tier/双人价/最小成团/departure count） |
| `(listings)/stay-listings/[handle]` 整体 | `/tours/[destination]/[tier]/[tour]` | 保留 4 锚点 · shared-blocks 双写 · schema · lead form · print 路由不动 |
| **右侧 sticky booking sidebar** | **Enquiry sidebar** · ⚠️ **v2 重估** | v1 只说"stub 换掉即可"· **严重低估**。Ceepii 侧 `DatesRangeInputPopover / GuestsInputPopover / Reserve` 是靠页面级 `<Form>` context 串 shared state。CTS 侧要重写：状态编排（React state / URL sync）· 适配 `fireLeadConversion` · UTM 透传 · `is_staging` 写入 · Resend 邮件 · GA `form_submit` · GTM `dataLayer.push` · Departure Selector 数据源接 `UpcomingDepartures.tsx`。**独立子任务 · +1-1.5 人日 · 计入 W4 tour detail 1.5-2 周** |
| `SectionFeaturedAmenities` `SectionAmenities` | `TourInclusions.tsx` | 保留 CTS 现有 icon + 分类 |
| `SectionDateRange` (calendar) | `UpcomingDepartures.tsx` | 保留 CTS 现有出发日期数据源 |
| `SectionMap` (MapLibre) | `ItineraryRouteSchematic.tsx` **不换** | ✅ agent 验证：section-map 是详情页最底层独立 section（`stay-listings/[handle]/page.tsx` L231 · Reviews Divider 之后）· 非强耦合布局槽 · 决策正确 |
| `SectionHost` (host profile) | `experts/baker-gu` `experts/lisa-li` 页 | **v2 澄清**：baker-gu / lisa-li 是 SectionHost 语义映射目标 · **§2.1 已从 Phase A 移入 Phase B**（W6 与 About 一并做） |
| `SectionListingReviews` | `Testimonials.tsx` | 保留 CTS 现有 1105 行 testimonial 数据 |

### 3.4 依赖矩阵（v2 校正）
| Ceepii 依赖 | 覆盖 | CTS 决策 |
|---|---|---|
| `@headlessui/react` | ~50 文件 | **必装** · +~55kb gzip |
| `@hugeicons/react` + `@hugeicons/core-free-icons` | **132 unique 图标** · ~55 文件（agent 实测数字） | **v2 校正**：v1 估 3-4 人日**偏乐观**。132 × 5-10min lucide 等价查询 + 视觉 QA（HugeIcons `strokeWidth={1.3}` 未必 1:1）+ import 批改 + 少数手绘 SVG = **4-5 人日**。决策见 §9 #11 · 建议保留 lucide + 迁移 |
| `motion` (Framer Motion 12) | 4 文件 · 首页每 section 包 `<RevealInView>` | **装** · 无 R19 peer 冲突 |
| `embla-carousel-react` + fade/autoplay/wheel-gestures | carousel/gallery/testimonial/header gallery | **装** |
| `radix-ui` (shadcn 层) | 4 组件 | **装** |
| `next-themes` | 3 文件 | **决策见 §9 #2** · 建议不装 |
| `react-datepicker` | 6+ 组件 | **装** · Phase A tour finder / tailor-made 用 |
| `date-fns` | `lib/utils.ts` + datepicker 上下游 | **装** |
| `maplibre-gl` | 3 文件 | **不装** · CTS 用 `ItineraryRouteSchematic.tsx` |
| `rc-slider` | 1 组件 | **按需装** |
| `lodash` | 2 处 trivial | **不装** · 单点 import 换手写 |
| `class-variance-authority` + `clsx` | ⚠️ **v1 错**：说 Ceepii button 用 CVA · **实际 button.tsx 全 clsx · 零 cva()**。装 `clsx` 是必要（Ceepii 组件用）· `class-variance-authority` 可选（若我们**新写**variants 系统再用） | 装 `clsx` · CVA 可选 |
| `tw-animate-css` | Tailwind v4 CSS 插件 | **不装** · v3 无此 plugin · 手写 keyframes |

### 3.5 Tailwind v4 → v3 港（**v2 校正 · Phase 0 patch · 2-3 人日**）

Ceepii `src/styles/tailwind.css` **411 行** · v3 不识别以下 v4 语法：`@theme` / `@theme inline` / `@custom-variant` / `@utility` / `@plugin` / `@variant` at-rule / `bg-(--var)` shorthand / `focus:not-data-focus:*` / `*:data-[slot=X]:*` / `size-[max(A,B)]`。

**港工作实测清单**（Ceepii 映射真实性 agent 实测数字 + 子牙架构评审补漏）：

| 项 | 数量/复杂度 | v3 港做法 |
|---|---|---|
| `:root` CSS var（含 sidebar / chart 系） | 33 个 | 保留 `:root { --foo: X; }` 语法 · Tailwind 3 支持 |
| `.dark` CSS var | 32 个 | 同上 |
| `@utility` 定义 | **25 个** | 每个手工 `plugin()` 或 `globals.css @layer utilities` 声明 · 多数 utility body 内含 v4 arbitrary 语法要同步改写 |
| `@keyframes` | 2 个（`myblur` `pulseScale`）· 另 2 个动画（`marquee` `marquee-reverse`）在 utility | `tailwind.config.ts` `theme.extend.animation` + `keyframes` |
| rc-datepicker override | 26 行 | 放 `datepicker.css` 独立 import |
| `@apply` 使用 | 46 处 | 保留 `@apply` v3 支持 |
| `@theme inline` | 1 处 | 手工提取到 `tailwind.config.ts` theme.extend |
| `@custom-variant dark` | 1 处 | Tailwind 3 用 `addVariant('dark', '&:where(.dark, .dark *)')` plugin |
| `@plugin` × 2（`@tailwindcss/aspect-ratio` + `@tailwindcss/typography`） | 2 | `tailwind.config.ts` `plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]` |
| `@import 'tw-animate-css'` | v3 无此包 | 手写等价 keyframes |
| `oklch` 色值 | 65 tokens 全 oklch | 转 hex（工具或手转）· 加 `<alpha-value>` opacity modifier 适配 |
| `bg-(--var)` shorthand | Ceepii button 全用 | v3 改 `bg-[var(--var)]` · button 系列 250+ 行全要改（v1 未算 · 独立 +1.5pd） |
| `data-slot` selector 依赖 v4 `@variant` at-rule | 手写降级 | v3 用 `data-[slot=X]:*` |
| radius scale 8 档 `--radius-sm..--radius-4xl` | multipliers 0.6/0.8/1.0/1.4/1.8/2.2/2.6 | ⚠️ CTS 现有 `borderRadius.3xl: 1.5rem` 值与 Ceepii 不同 · 命名冲突 · 需重命名（如加 `ceepii-` 前缀）避免污染既有 UI |
| `@container` (若用) | 检查是否用到 | 若用需 v3 `@tailwindcss/container-queries` plugin |

**v2 估工**：**2-3 人日**（v1 是 1 天）· 输出 `tailwind.config.ts` diff + 新增 `globals.css` @layer utilities + 新增 `datepicker.css`。button.tsx 系列改写 **独立 +1.5 人日**（不算在此 2-3 pd 内 · 计入 Phase A W1）。

### 3.6 字体决策
Ceepii：`Google_Sans_Flex` + `Playfair_Display` + italic Playfair span 重音（Ceepii 视觉签名）
CTS：`Inter` + `Playfair Display`
- **建议**：sans 换 `Google_Sans_Flex` · serif 保留 Playfair · 采纳 italic span 模式
- **决策**：§9 #12 · Phase A W1 · 影响全站排版

### 3.7 契约完全保留清单
- `src/lib/analytics/lead-conversion.ts` + `fireLeadConversion` 契约
- `src/components/SchemaMarkup.tsx` schema.org JSON-LD 输出
- `src/components/GoogleAnalytics.tsx` `GoogleTagManager.tsx`（Phase 0 只加 env-toggle 分支）
- `src/lib/image-loader.ts` custom image loader
- 4 个锚点 id（`#visa-nudge` `#faq` `#trust-signals` `#planning-resources`） · **v2 加 e2e 断言保护**
- `src/middleware.ts` 现有 admin / marketing gate（Phase 0 加 staging basic auth 分支 · 必须 `/api/*` 豁免）
- `src/app/sitemap.ts` `src/app/robots.ts`（Phase 0 白名单）
- `src/components/tours/ItineraryRouteSchematic.tsx`（自研 SVG · 不换）
- `src/components/Testimonials.tsx`（1105 行）
- `next.config.js` 全部 60+ redirect 条目（v1 说 40+ · SEO 保真 agent 实测 60+）

---

## 4. Phase 0 · 隔离环境搭建（**v2 大改**）

> PR #146 是 docs-only · Phase 0 代码 patch 走 PR #147 · Phase A W1 起走 PR #148。

### 4.1 staging 子域 · DNS + Render + 中间件

```
staging.chinatravel.co.nz
├─ DNS  CNAME → chinatravel-<staging>.onrender.com
├─ Render 新建 service · watch 分支 = claude/cts-ceepii-redesign-96cbba
├─ env NEXT_PUBLIC_ENV=staging（Ray 侧配 · 见 §4.4）
└─ 中间件强制：Basic Auth（/api/* 豁免）+ X-Robots-Tag: noindex, nofollow
```

⚠️ **v2 blocker #2 · `REDIRECT_ONRENDER_HOST` staging 陷阱**：`next.config.js:29-34` 的 host-typed redirect 消费 `LEGACY_HOSTS + process.env.REDIRECT_ONRENDER_HOST`。若 staging Render service 误配此 env · staging 请求会 308 到 `www.ctstours.co.nz` · **staging 直接废**。
- **Phase 0 checklist 强制**：staging env **禁设** `REDIRECT_ONRENDER_HOST`
- staging 域**不得复用** `LEGACY_HOSTS` (`chinatravel.co.nz` / `www.chinatravel.co.nz` / `ctstours.co.nz`)
- Render service 创建后 · FDE 主动 `curl -I https://staging.chinatravel.co.nz/` 验证不返回 308 到生产

⚠️ **v2 blocker #3 · Basic Auth 顺序 + `/api/*` 豁免**：现 middleware matcher 覆盖除 `_next/static|_next/image|favicon.ico` 外**所有路径**含 `/api/*`。加 basic auth **必须先 `/api/*` 豁免**：

```ts
// src/middleware.ts 顶部加（Phase 0 patch · v3 · 子牙修）
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⚠️ v2 blocker #3：staging basic auth 必须先豁免 /api/* + 静态资源
  //    否则 staging 的 lead 提交 API 全 401 · lead 通道死
  // ⚠️ v3 子牙修：basic auth 通过后必须 fall through 走现有 marketing/admin gate
  //              （v2 的 return NextResponse.next() 会 short-circuit 掉 admin gate · staging 变成无 admin auth）
  if (process.env.NEXT_PUBLIC_ENV === 'staging') {
    const bypassAuth = pathname.startsWith('/api/') ||
                       pathname.startsWith('/_next/') ||
                       pathname === '/robots.txt' ||  // 避免 crawler 拿 401
                       pathname === '/sitemap.xml';

    if (!bypassAuth) {
      const auth = request.headers.get('authorization');
      const expected = 'Basic ' + Buffer.from(
        `${process.env.STAGING_USER}:${process.env.STAGING_PASS}`
      ).toString('base64');
      if (auth !== expected) {
        return new NextResponse('Auth required', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="staging"',
            'X-Robots-Tag': 'noindex, nofollow',
            // v3 子牙修：防 Render/CDN 缓存 401 污染带 auth 请求
            'Cache-Control': 'no-store, must-revalidate',
          }
        });
      }
    }
    // basic auth 通过 · fall through 走现有 marketing/admin gate 逻辑
    // 不 short-circuit · 让 admin/marketing plan cookie 检查继续跑
    // 所有 staging 响应最后统一 append X-Robots-Tag（在函数末尾做，或包装 NextResponse）
  }

  // === 现有 admin gate ===
  const adminRes = handleAdmin(request);
  if (adminRes) {
    // v3 子牙修：staging 环境下 admin gate 的响应也加 noindex
    if (process.env.NEXT_PUBLIC_ENV === 'staging') {
      adminRes.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return adminRes;
  }

  // === 现有 marketing gate ===
  const marketingRes = handleMarketingGate(request);
  if (marketingRes) {
    if (process.env.NEXT_PUBLIC_ENV === 'staging') {
      marketingRes.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return marketingRes;
  }

  // === 现有 marketing SEO header 逻辑保留 ===
  const res = NextResponse.next();
  applyMarketingSeoHeaders(pathname, res);

  // v3 子牙修：staging 兜底 noindex（覆盖所有未 short-circuit 的响应）
  if (process.env.NEXT_PUBLIC_ENV === 'staging') {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return res;
}
```

**关键点**：
- basic auth 通过后 **fall through** · 不 short-circuit（v2 sample 会跳过现有 admin gate）
- 401 响应带 `Cache-Control: no-store, must-revalidate`（防 Render/CDN 缓存 401）
- staging noindex 兜底：所有响应（含 admin/marketing gate 短路的响应）末尾统一 append `X-Robots-Tag`

### 4.2 GA4 test property + Ads test conversion ID + Meta Pixel test ID
| 环境 | GA4 property | Ads conversion ID | Meta Pixel |
|---|---|---|---|
| production | `NEXT_PUBLIC_GA_ID`（现值） | `NEXT_PUBLIC_ADS_ID`（现值） | 可选 |
| staging | `NEXT_PUBLIC_GA_ID_STAGING`（新建 GA4 property） | `NEXT_PUBLIC_ADS_ID_STAGING`（新建 Ads test conversion） | `NEXT_PUBLIC_PIXEL_ID_STAGING` |

`GoogleAnalytics.tsx` / `GoogleTagManager.tsx` env-toggle 改造：SEO 保真 agent 确认加 `?? process.env.NEXT_PUBLIC_GA_ID_STAGING` 三元即可 · 无需结构化改造。

### 4.3 Supabase 数据隔离（**v2 blocker #5 · 大扩展**）

v1 仅贴 `leads.is_staging` 是**创可贴**。v2 扩到全 write-path + Storage + Realtime：

**表级 `is_staging` migration（5 张表 · v1 只 1 张）**
```sql
-- supabase/migrations/20260829_add_is_staging.sql
ALTER TABLE leads               ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;
ALTER TABLE form_submissions    ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;
ALTER TABLE itinerary_requests  ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;
ALTER TABLE tailor_made_submissions ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS leads_is_staging_idx           ON leads(is_staging) WHERE is_staging = false;
CREATE INDEX IF NOT EXISTS form_submissions_is_staging_idx ON form_submissions(is_staging) WHERE is_staging = false;
CREATE INDEX IF NOT EXISTS newsletter_is_staging_idx      ON newsletter_subscribers(is_staging) WHERE is_staging = false;
CREATE INDEX IF NOT EXISTS itinerary_is_staging_idx       ON itinerary_requests(is_staging) WHERE is_staging = false;
CREATE INDEX IF NOT EXISTS tailor_made_is_staging_idx     ON tailor_made_submissions(is_staging) WHERE is_staging = false;

COMMENT ON COLUMN leads.is_staging IS 'true = 来自 staging.chinatravel.co.nz redesign 环境 · 生产 CRM query 必须 WHERE is_staging = false 过滤';
```
> **注**：`form_submissions` / `newsletter_subscribers` / `itinerary_requests` / `tailor_made_submissions` 表名待 Phase 0 patch 前 `grep .from\(` 生产代码校对 · **如实际表名不同则以生产为准**（v2 minor #20：Phase 0 patch 前必先跑 grep 出真实表清单 + 真实查询点数字 · 不拍脑袋）。

**写入侧统一 helper**（写入点每处必须调）：
```ts
// src/lib/env.ts 新增
export function isStaging(): boolean {
  return process.env.NEXT_PUBLIC_ENV === 'staging';
}

// 所有 INSERT 处（agent grep 出的每一处）加：
await supabase.from('leads').insert({ ...data, is_staging: isStaging() });
```

**读取侧过滤**（marketing dashboard / CRM export / any lead query · agent grep 出的每一处必须加）：
```ts
await supabase.from('leads').select('*').eq('is_staging', false);
```

**v3 子牙加 · defense-in-depth 5 个 `_prod` view**：代码层 `.eq('is_staging', false)` 只对代码里的 query 生效。**Ray/CTS 运营从 Supabase Studio SQL editor 手拉 leads 时 · 代码 filter 全无用 · 完全靠人手写 `WHERE is_staging = false`**。为防漏 · 建 5 个 `_prod` view · 培训 Ray 手查一律用 view：

```sql
-- supabase/migrations/20260829_add_is_staging.sql（同一 migration 里）
CREATE OR REPLACE VIEW leads_prod                     AS SELECT * FROM leads               WHERE is_staging = false;
CREATE OR REPLACE VIEW form_submissions_prod          AS SELECT * FROM form_submissions    WHERE is_staging = false;
CREATE OR REPLACE VIEW newsletter_subscribers_prod    AS SELECT * FROM newsletter_subscribers WHERE is_staging = false;
CREATE OR REPLACE VIEW itinerary_requests_prod        AS SELECT * FROM itinerary_requests  WHERE is_staging = false;
CREATE OR REPLACE VIEW tailor_made_submissions_prod   AS SELECT * FROM tailor_made_submissions WHERE is_staging = false;

COMMENT ON VIEW leads_prod IS '生产 CRM / marketing dashboard / 运营手拉数据请一律用 *_prod view · 而非直接查 leads 表 · 避免漏 is_staging filter';
```
Ray 侧培训要点（v3 子牙加）：Supabase Studio 手查一律用 `leads_prod` `form_submissions_prod` 等 view · **不查裸表**。

**Supabase Storage namespace 隔离**
- 生产上传路径：`tour-images/...` `guide-images/...`
- staging 上传路径：`staging-tour-images/...` `staging-guide-images/...`
- Upload helper 读 `isStaging()` 决定 bucket/path 前缀
- 否则 staging 上传新图**直接污染生产 CDN**（子牙警告）

**Realtime subscription 隔离**
- 若 admin dashboard 有 `supabase.channel('leads_channel')` 类订阅
- staging 环境改用 `staging_leads_channel` 独立 channel
- 否则 staging INSERT 会推给生产订阅端

**RLS + cookie domain 隔离**
- staging 与生产共享 Supabase 库 · 但 cookie domain 必须严格隔离：
  - 生产：`Domain=www.ctstours.co.nz`
  - staging：`Domain=staging.chinatravel.co.nz`（**不设 `.chinatravel.co.nz` 通配** · 否则跨环境串号）
- Supabase Auth session cookie 由 `@supabase/ssr` 管理 · Phase 0 patch 检查 cookie options 显式设 domain

### 4.4 环境变量矩阵（**v2 blocker #1 · staging = 独立 build**）

⚠️ **关键**：Next.js 在 build 时把 `NEXT_PUBLIC_*` 编译进 client bundle · **staging 与生产的 JS artifact 不同** · **不能"同一 build 部署两处"**。

**部署拓扑**：
```
Render service A · 生产 · watch main             → build 用生产 env      → JS bundle A
Render service B · staging · watch redesign 分支 → build 用 staging env  → JS bundle B
```
两个 build · 两个 bundle · 完全隔离。生产/staging 各有一份 CDN 缓存 · 无交叉。

**环境变量表**：
```
                              production            staging               dev
NEXT_PUBLIC_ENV               production            staging               development
NEXT_PUBLIC_SUPABASE_URL      <生产同库>            <生产同库>            <生产同库>
NEXT_PUBLIC_SUPABASE_ANON     <生产 anon>           <生产 anon>           <生产 anon>
NEXT_PUBLIC_GA_ID             <生产 GA4>            —                     —
NEXT_PUBLIC_GA_ID_STAGING     —                     <staging GA4>         —
NEXT_PUBLIC_GTM_ID            <生产 GTM>            —                     —
NEXT_PUBLIC_GTM_ID_STAGING    —                     <staging GTM>         —
NEXT_PUBLIC_ADS_ID            <生产 Ads>            —                     —
NEXT_PUBLIC_ADS_ID_STAGING    —                     <staging Ads test>    —
REDIRECT_ONRENDER_HOST        <若需>                🚨 禁设              —
STAGING_USER                  —                     <basic auth 用户>     —
STAGING_PASS                  —                     <basic auth 密码>     —
RESEND_API_KEY                <生产 Resend>         <见 §9 #5>            —
ADMIN_SECRET_KEY              <生产密钥>            <staging 独立密钥>    —
MARKETING_PLAN_ACCESS_KEY     <生产密钥>            <staging 独立密钥>    —
```

### 4.5 redesign 分支的"每周吸 main"纪律
每周一 09:00 NZT：
```bash
git fetch origin
git merge origin/main --no-edit
# 冲突：手工解 · 不允许 --strategy=ours 一把梭
# 无冲突：直接 push
git push
```

**PR 描述模板**（每个 Phase A / B 子 PR 都必须写）：
```markdown
## 变更
<what changed>

## 已 merge main HEAD
- 本 PR 分支基于 main HEAD sha=<xxxxxxx>
- 本次 merge 后 staging 部署验证：链接 + 截图

## 回归证据（A 级要求）
- GA4 Realtime 截图（form_submit / generate_lead fire）
- GTM Preview 截图（相关事件 fire）
- Lighthouse mobile LCP < 2.5s 截图
- 视觉 diff（旧壳 vs 新壳，同一页对比）
- URL diff（本 PR 涉及路由，与 cts-urls-before.txt 对比）
- shared-blocks 快照测试通过（若触碰 tour detail 相关组件）
- 4 锚点 e2e 断言通过（若触碰 SectionWrapper / Layout）
```

### 4.6 URL 基线快照
Phase 0 PR #147 附 `docs/redesign/cts-urls-before.txt`：
```bash
curl -s https://www.ctstours.co.nz/sitemap.xml \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed 's|<loc>||; s|</loc>||' \
  | sort > docs/redesign/cts-urls-before.txt
```
所有 Phase A / B PR 跑 `diff` 与此文件对比 · **净变化 = 0**。

### 4.7 shared-blocks 契约测试（**v2 blocker #4 新增**）

CLAUDE.md 只有散文规则 · SEO 保真 agent 发现 `fire-fuzz` 已是第三副本 · Phase A 换壳靠人肉 diff **靠不住**。

**Phase 0 patch 新增 CI 测试**（`src/__tests__/shared-blocks.test.ts`）：
```ts
// 断言 4 个页面 import 的共享组件列表保持同步
const TOUR_DETAIL   = readImports('src/app/tours/[destination]/[tier]/[tour]/page.tsx');
const OCTOBER_LP    = readImports('src/app/campaigns/october-2026/[slug]/page.tsx');
const FIRE_FUZZ     = readImports('src/app/campaigns/fire-fuzz/page.tsx');
const BEST_OF_CHINA = readImports('src/app/campaigns/best-of-china/page.tsx');

const SHARED_BLOCKS = [
  'TourHero', 'TourEnquiry', 'TourItinerary', 'TourInclusions',
  'ChinaVisaNudge', 'TourTrustSignals', 'TourSupportingContentLinks',
  'FAQSection', 'TrustBar'
];

for (const block of SHARED_BLOCKS) {
  expect(OCTOBER_LP).toContain(block);
  expect(FIRE_FUZZ).toContain(block);
  expect(BEST_OF_CHINA).toContain(block);
}

// 若 tour detail 新增 shared block · 4 处必须同步 · 否则 CI 红
```

或者 · 若 Ray 觉得代码级 diff 断言太严：**PR 描述模板必须列出触碰的 shared blocks 名单 + 3 个 campaign LP 的 diff 截图**（人肉但强制记录）。

### 4.8 R19 peer 验证（**v2 major #15 新增**）

Phase 0 patch 新增 `scripts/verify-react-peers.mjs`：
```js
// 装完 Ceepii 依赖后跑：验 headlessui / motion / radix-ui / next-themes / react-datepicker / embla 等
// 的 peerDependencies.react 是否声明 ^18 或 ^18 || ^19
// 若命中 >=19 强制 · 输出 warning + 建议 downgrade 或替换
// CI 强制跑 · 不过则 block
```

### 4.9 4 锚点 e2e 断言（**v2 minor #21 新增**）

Phase 0 patch 新增 `src/__tests__/anchors.test.tsx`：
```tsx
// 4 页 render 断言 4 个锚点存在
test('tour detail renders all 4 anchors', () => {
  const { container } = render(<TourDetailPage tour={sampleTour} />);
  expect(container.querySelector('#visa-nudge')).toBeInTheDocument();
  expect(container.querySelector('#faq')).toBeInTheDocument();
  expect(container.querySelector('#trust-signals')).toBeInTheDocument();
  expect(container.querySelector('#planning-resources')).toBeInTheDocument();
});
// 同类断言：/china-visa-guide-for-new-zealanders 页 · /faq 页 · campaigns/october-2026/[slug] 页
```

---

## 5. 风险清单（v2 · 5.6 大改 + 5.7 新增）

### 5.1 SEO 风险
| 风险 | 影响 | 缓解 |
|---|---|---|
| URL 变化导致 404 | 灾难 · GSC 收录塌方 | Phase 0 快照 + 每 PR diff 校验 |
| schema.org JSON-LD 输出被换壳误伤 | 富摘要消失，CTR 掉 | 保留 `SchemaMarkup.tsx` 不动；每 PR Google Rich Results Test 抽 5 页 · **v2 可选**：CI grep 断言每类 page 必含 SchemaMarkup |
| sitemap.xml / robots.ts 被误改 | 索引路径变 | 白名单文件 · 任何 PR 改动 Ray 签字 |
| 60+ 条 redirect 被误删 | 老 URL 全 404 | `next.config.js` 加锁 · 修改前 PR 描述贴 GSC 证据 |
| `REDIRECT_ONRENDER_HOST` staging 陷阱 | 🚨 staging 请求 308 到生产 · staging 废 | §4.1 强制条目 · Phase 0 checklist |
| hreflang / canonical 被换壳丢失 | 语言/规范混乱 | 每页面模板保留 `<link rel="canonical">` · Phase A checklist |
| meta description / OG image 被壳组件覆盖 | SERP 显示错乱 | 换壳只碰 Layout 与 Section wrapper · Metadata 由 page.tsx 定义 · 禁止移入壳 |

### 5.2 埋点风险
| 风险 | 缓解 |
|---|---|
| GA4 事件被壳组件吞掉 | Phase A 每 PR GA4 Realtime 截图 · lead form 单测（HeroWithLeadForm.test.tsx）保留 |
| GTM 脚本插入位置变化导致首屏未加载 | GTM 保持在 root layout.tsx `<head>` 顶部 · Phase B 首页改动特别检查 |
| Google Ads conversion 双触发或漏触发 | 保持 fireLeadConversion 单一收敛点 |
| Meta Reel UTM 链接失效 | Phase 0 拉全部 UTM 组合入 test-suite · 每 PR curl 200 + GA4 Realtime 验 |

### 5.3 anchor / shared-blocks 契约风险（**v2 加 CI 保护**）
| 风险 | 缓解 |
|---|---|
| Phase A 换壳丢失 4 个锚点 | ✅ **v2 §4.9 加 e2e 断言** |
| tour detail 与 3 处 campaign LP 不同步 | ✅ **v2 §4.7 加 shared-blocks 快照 CI** |
| CLAUDE.md 未及时更新新契约 | Phase A/B 结束把新契约写回 CLAUDE.md · Ray 审 |

### 5.4 数据 / Lead / 邮件风险（**v2 §4.3 已大扩展**）
| 风险 | 缓解 |
|---|---|
| staging lead 混入生产 CRM | 5 张表 is_staging + Storage namespace + Realtime channel + cookie domain 隔离（§4.3） |
| staging 触发真实客户邮件 | §9 #5 Ray 决策 · 建议 Resend sandbox 或空 KEY |
| Supabase Auth session staging/生产间串号 | cookie domain 严格隔离（§4.3） |

### 5.5 依赖 / 版本冲突风险
| 冲突 | 影响 | 处理 |
|---|---|---|
| Tailwind v4 CSS-config → v3 | 不港则组件样式全崩 | **v2 校正 2-3 人日**（§3.5） |
| Ceepii 页面 Next 15+ API | Next 14 不支持 | 抛弃页面外壳 · 只 lift 组件层 |
| Ceepii deps 需 R19（peer 未验） | ERESOLVE 或 hydration error 可能 W1 才暴露 | ✅ **v2 §4.8 加 verify-react-peers.mjs** |
| `@hugeicons/*` vs `lucide-react` 双图标库 | **132 unique 图标** | **v2 校正 4-5 人日** · §9 #11 决策 |
| `@headlessui/react` 全局必装 | 无绕开 | 装 · +~55kb gzip |
| `next-themes` dark mode | 不装则永远 light | §9 #2 决策 · 建议不装 |
| `motion` Framer Motion 12 | +~40kb gzip | 装 · Ceepii 视觉核心 |
| `maplibre-gl` | +~200kb gzip | 不装 · 用自研 SVG |
| button.tsx v4 语法全 v3 重写 | 250+ 行 | **v2 +1.5 人日** · Phase A W1 |
| Enquiry sidebar shared state 适配 | 组件层 lift 断裂 | **v2 +1-1.5 人日** · Phase B W4 |

### 5.6 时间/范围蔓延风险（**v2 大改**）

| 风险 | 缓解 |
|---|---|
| Phase A 涉及 79 页，回归成本超预期 | 分组 sprint · 每周结束跑一次全站视觉 diff（Percy 免费额度 · §9 #6） |
| **W4 tour detail 一周不现实**（子牙 warning） | **v2 W4 改 1.5-2 周**（§6） |
| **October 2026 / fire-fuzz / best-of-china 是 W4 隐性 +25%** | v2 显式列 Phase B-adjacent（§2.2）· W4 时间已按 1.5-2 周吸收 |
| **Ray 审 PR 排期与我不同步 · 无 Plan B** | **v2 §6 加 fallback**：Ray 周末未审 · FDE 主动短信/邮件；周一未审 FDE 继续下一 sprint 并附合并汇总；同期给 Ray 累积待审列表 |
| **每周一 merge main 冲突成本 6 周吃 3-6pd**（魏征 warning） | 过去 30 天 33 PR · 6 周约 40 次 merge · PR #133-135 落 tours.ts · v2 排期已预留 3-6pd 缓冲 |
| 6 条 FDE 预设建议 Ray 反向拍板成本 | **v2 §9 每条列反向成本** |

### 5.7 数据 monitoring 盲区（**v2 minor #19 新增**）
| 风险 | 缓解 |
|---|---|
| T+5min 冒烟 vs GSC 3-7 天延迟盲区 | **v2 §8 加 T+48h / T+72h / T+7d 三个 GSC + Ahrefs 位置查点** · FDE 主动查并 PR 汇报 |
| Realtime dashboard 生产/staging 混流 | Realtime channel 隔离（§4.3） |

---

## 6. 排期（**v2 · 6.5-7 周 · 周粒度**）

**假设**：起点 = PR #146 合并 + PR #147 Phase 0 patch 合并 + Ray 侧手工搭 staging (DNS/Render/GA4/Ads) 完成。

### Phase A · **3.5 周**（v1 是 3 周）

| 周 | 产出物 | 关键验收 |
|---|---|---|
| **W1** | **PR #148 · 壳组件基础层**：Header（含 Aside 全链 · **2pd**）/ Nav / Footer / Layout / Typography / Button（**+1.5pd** v4→v3 重写）/ Section wrapper。仅 staging 生效。 | 5 样本页（`/` `/tours` `/contact` `/blog` `/china-visa-guide-for-new-zealanders`）在 staging 跑通新壳 · GA4 事件全通 · Lighthouse mobile > 90 |
| **W2** | **PR #149 · 换壳批 1 + tour detail 外壳提前换**：21 个 `-travel-guide` + 10 个 `-tours` hub + 7 个 discovery guides + **`/tours/[dest]/[tier]/[tour]` 外壳换（保 Enquiry sidebar 语义不动）**。**内容 0 改动**。 | 视觉 diff 手工抽 15 页 · URL diff = 0 · schema.org 抽 5 页 Rich Results Test · shared-blocks 快照 CI 过（v2 §4.7）· 4 锚点 e2e 过（v2 §4.9） |
| **W3** | **PR #150 · 换壳批 2**：7 commercial SEO LP + 4 信息 LP + 12 blog/faq/agents/explore/static/campaigns（3 campaign，不含 B-adj 3 页）。Phase A 收官。 | 全站抽 20 页视觉 diff · staging 完整跑一遍 lead 提交（5 张表 is_staging 全部写入正确）· Ray 决定"是否 Phase A 就上生产"或"继续 Phase B" |
| **W3.5** | **缓冲/冲突吸收半周**：吸收 W1-W3 的 main merge 冲突（预留 1-2pd）+ Ray 审 PR 排队时间 | Ray sign-off Phase A · 进 Phase B |

### Phase B · **3-3.5 周**（v1 是 3 周）

| 周 | 产出物 | 关键验收 |
|---|---|---|
| **W4-W4.5** | **PR #151 · Tour Detail 深度重构（1.5-2 周）**：3 层动态路由 · 4 锚点保留 · shared-blocks 双写 · schema · Enquiry sidebar shared state 适配（+1-1.5pd 独立子任务）· print 路由不动 · **B-adj 3 页（october-2026 / fire-fuzz / best-of-china）同步改**（不改 Enquiry sidebar 语义 · 只跟 tour detail wrapper 走） | 3 sample tour（不同 destination × tier）staging 跑通 · fireLeadConversion 单测过 · print 路由无回归 · shared-blocks 快照 CI 过 · Enquiry sidebar 提交测试 lead is_staging=true 落 5 张表正确 |
| **W5** | **PR #152 · Home + Tours listing 深度重构** | 首页 Lighthouse mobile LCP < 2.5s · listing 分类/筛选 URL 保留 |
| **W6** | **PR #153 · About + baker-gu + lisa-li + 全站视觉一致性收尾 + 上线准备** | 全站视觉一致性验收 · 上线切换 runbook drill · Ray 拍板 go / no-go |
| **W6.5** | **缓冲/冲突吸收半周** | Ray sign-off · 上线 |

### 缓冲策略
- **W3.5 + W6.5 各半周缓冲** = 1 周 · 主要吸收 main merge 冲突（预估 3-6pd）+ Ray 审 PR 排队
- 若任何周 slip：向后顺延 · 不压缩后续周 · 缓冲不够则找 Ray 减范围

### Ray 审 PR 节奏 · Plan B（**v2 minor #17 + v3 子牙加累积上限**）
- 默认：周五 PR 提交 · Ray 周末审 · 周一开新 sprint
- Ray 周末未审：FDE 周日 20:00 NZT 主动短信/邮件提醒
- Ray 周一 12:00 仍未审：FDE 继续下一 sprint（不 block）· 提交 PR 时附"待 Ray 审 PR 累积列表"链接
- Ray 一次批量审多 PR 的成本高 · Plan B 是 FDE 主动帮 Ray 摘要每个 PR 的核心 3 处变更
- **v3 子牙加 · 待审 PR 累积 ≥ 3 强制 pause**：若 Ray 连续 3 个 PR 未审 · FDE 停止开新分支 · 只在旧分支上做增补 commit · 等 Ray 清库存再继续。理由：分支树炸开时 Ray 一次要 review 5 个连锁 PR · 比周末赶不上更糟 · 且每个 PR 都基于前一个未审 PR · 若 Ray 对早期 PR 要重大改动 · 后续 PR 全部要 rebase / 重做 · 工作量指数级放大。

---

## 7. 上线切换 runbook（**v2 · 加 T+48h / T+72h / T+7d 检查点**）

**前提**：Phase A + Phase B 全 merge · staging 验收 · Ray + CTS 老板 sign-off。

### T-24h · 准备
- [ ] staging 最后一轮完整回归（20 样本页 · 5 张表 lead 路径 · 5 组 UTM）
- [ ] 生成 `cts-urls-after.txt` 与 `cts-urls-before.txt` diff · 净变化列出
- [ ] Ray 通知 CTS 老板 · 拿最终 sign-off
- [ ] Render dashboard 打开 · 确认 rollback 按钮位置
- [ ] shared-blocks 快照 CI 绿 · 4 锚点 e2e 绿 · verify-react-peers 绿

### T-0 · 切换（预计 5 分钟）
1. **T+0** · GitHub 合 PR：`claude/cts-ceepii-redesign-96cbba` → `main`（squash merge）
2. **T+1** · Render 检测 main 有提交 · 开始 build
3. **T+3-5** · Render build 完成 · 生产切新版
4. **T+5** · 手工冒烟：`/` Hero / `/tours` card / tour detail lead form / `/contact` test lead / GA4 Realtime
5. **T+10** · 冒烟通过 · 进 monitoring

### rollback（冒烟失败）
```bash
git revert -m 1 <merge-commit-sha>
git push origin main
# Render 自动重 build · 3-5 分钟回旧版
```

**rollback 红线**：冒烟任一失败 · Render build 失败 3 次 · GA4 Realtime 15 分钟无 page_view · `/tours`/`/`/`/contact` 任一 500。

### T+48h / T+72h / T+7d · SEO 延迟盲区（**v2 minor #19**）
- **T+48h** · GSC Coverage report 新增错误 · Ahrefs 位置抽 10 关键词
- **T+72h** · GSC 富摘要抽查（tour detail / visa guide / faq）· 若富摘要消失 → 紧急排查 schema
- **T+7d** · GSC 全站 clicks/impressions/CTR vs 30 天中位数 · 若掉 > 30% → 触发部分 rollback

---

## 8. 上线后 monitoring 清单（**v2 加 48h/72h/7d**）

### 8.1 正常范围
> Ray 提供：过去 30 天 GA4 daily active users / lead 提交数 / GSC daily clicks & impressions / Ads conversion 中位数。**留白 · Ray 补齐后我填**。

### 8.2 红线（触发 rollback）
| 指标 | 红线 | 观察工具 |
|---|---|---|
| GA4 daily page_view | < 中位数 × 60% | GA4 Realtime + 24h report |
| lead 提交数（5 张表加总） | < 中位数 × 50% | Supabase count |
| GSC crawl 错误 | 新增 > 20 条 | GSC Coverage · 次日 + T+48h |
| GSC 富摘要覆盖率 | 掉 > 30% | GSC 手工抽查 · T+72h |
| GSC clicks/impressions | 掉 > 30% | GSC 全站 · T+7d |
| Ads conversion | < 中位数 × 50% | Google Ads |
| 5xx 错误率 | > 1% | Render logs |
| Lighthouse mobile LCP | > 3.5s | PageSpeed Insights |
| lead form 提交后邮件未发出 | > 5 单 | Resend dashboard + Supabase 反查 |

### 8.3 monitoring 时间点（**v2 加 3 点**）
- **T+1h** · Ray 看 GA4 Realtime + 我看 Render logs 5xx
- **T+3h** · lead 提交数 check
- **T+12h** · GA4 daily 累计 vs 中位数 · Ads conversion
- **T+24h** · GSC crawl 报告 · 全指标复盘 · 出决策
- **T+48h** · GSC Coverage 错误 · Ahrefs 位置抽 10 关键词
- **T+72h** · GSC 富摘要抽查
- **T+7d** · GSC 全站指标 vs 30 天中位数

---

## 9. Ray 待拍板决策清单（**v3 · 4 条 · 全非技术**）

> Ray edict "技术问题不要问我"· 原 v2 §9 的 9 项技术决策由 子牙 拍板（见文档顶部 v3 修订说明）· 只余 4 条业务项。以下 4 条**均不 block PR #147 Phase 0 code patch 起步** · 可在 Phase A/B 推进过程中拍板。

1. **Baker Gu / Lisa Li specialist bio 内容**
   - 阻塞点：Phase B **W6**（About + baker-gu + lisa-li 页深度重构）
   - Ray 侧动作：从 CTS 老板拿新 bio 文案（150-300 词 · en-NZ 语气）+ 高清头像照（3:4 · 800px+）+ 一句话 headline
   - 截止：W6 sprint 开始前 · 即 T-2 周
   - 若 Ray 无法拿到 · Fallback：保留现状（不新写 · 只按新壳视觉重排）· FDE 侧无阻塞

2. **Phase C（30+ SEO LP 深度重构）启动时机**
   - 与本次 6.5-7 周翻新独立 · 不 block 本项目
   - Ray 侧动作：拍板 Phase C 何时立项 · 谁提优先级（SEO agency / GSC / Ahrefs 数据驱动 / CTS 老板 · 由 Ray 定）
   - 截止：本次上线后 · 不 block

3. **上线切换时间窗**
   - NZT 平日凌晨（03:00-06:00）vs 周末？影响 Ray 那晚是否在线 monitoring
   - Ray 侧动作：与 CTS 老板对齐一个具体日期时段
   - 截止：**T-1 周**（上线前一周告知）
   - FDE 建议：**周二/周三凌晨 04:00 NZT**（一）流量最低（二）后续 24h monitoring 落在工作日、GSC 报表能次日看

4. **Ray 审 PR SLA 承诺**
   - 6.5-7 周排期依赖 Ray 每周五 EOD 审 PR
   - Plan B（§6）已给：周日 20:00 提醒 · 周一 12:00 未审 FDE 继续 · 待审 PR ≥ 3 强制 pause
   - Ray 侧动作：承诺（或反对）此 SLA · 若 Ray 明知本项目 6.5 周内会有 > 3 天不能审 · FDE 需提前调排期
   - 截止：Phase A W1 起步前 · 但**不 block Phase 0 patch**

---

## 10. PR #146 + Phase 0 执行清单（**v2 大扩展**）

### 10.1 PR #146 · docs-only（本次 · Ray 审完 merge）
```
docs/redesign/ceepii-assessment.md    ← 本文件 v2
```

### 10.2 PR #147 · Phase 0 代码 patch（PR #146 合并后 · Phase A 前置）

**代码 patch（我做）**
1. `docs/redesign/cts-urls-before.txt` — 生产 sitemap curl 快照
2. `src/middleware.ts` — 加 staging basic auth 分支（**必须 `/api/*` 豁免** · v2 §4.1）· 401 响应加 `Cache-Control: no-store`
3. `src/components/GoogleAnalytics.tsx` `GoogleTagManager.tsx` — 三元 `?? _STAGING` env-toggle
4. `src/lib/env.ts` — 新增 `isStaging()` helper
5. `supabase/migrations/20260829_add_is_staging.sql` — **5 张表**加 `is_staging` 字段 + 索引 + **5 个 `_prod` view**（v3 子牙加 · §4.3 defense-in-depth · 防手拉 SQL 漏 filter）· 表名以 grep 实际为准
6. **grep 出真实数字**（v2 minor #20）：
   - `grep -rn '.from(' src/ | grep -E '\.insert|\.upsert'` 找 write-path 数量
   - `grep -rn '.from(' src/ | grep -E '\.select' | grep -v 'is_staging'` 找 read-path 数量
   - 结果写入 PR #147 描述
7. 写入侧微改（真实数量处）— `is_staging: isStaging()`
8. 读取侧微改（marketing dashboard / CRM export · 真实数量处）— `.eq('is_staging', false)`
9. Supabase Storage upload helper — bucket/path 前缀读 `isStaging()`
10. Supabase Realtime channel 名读 `isStaging()`（若存在订阅代码）
11. `.env.example` — 加所有新 env vars
12. **`tailwind.config.ts` + `src/app/globals.css` + 新 `datepicker.css` 港工作**（v2 校正 **2-3 人日** · §3.5 详细清单）
13. **`src/__tests__/shared-blocks.test.ts`**（v2 §4.7 · shared-blocks 快照 CI）
14. **`src/__tests__/anchors.test.tsx`**（v2 §4.9 · 4 锚点 e2e 断言）
15. **`scripts/verify-react-peers.mjs`** + CI 集成（v2 §4.8）· package.json 加 `postinstall` hook 或 CI step
16. 更新 `CLAUDE.md` — 加 v2 新约定（shared-blocks CI · 4 锚点 e2e · staging is_staging 隔离规则）

**Ray 侧手工操作**
- Render 新建 staging service · watch `claude/cts-ceepii-redesign-96cbba` · 配所有 staging env vars（**特别注意 `REDIRECT_ONRENDER_HOST` 禁设** · §4.1）
- DNS · `staging.chinatravel.co.nz` CNAME → Render staging URL
- GA4 · 新建 staging property · 拿 measurement ID
- Google Ads · 新建 test conversion action · 拿 conversion ID
- Meta Pixel · （可选）新建 test pixel ID
- Resend · 决策 staging 邮件行为（§9 #5）
- Supabase · apply migration（dashboard 或授权我用 CLI）

**Phase A 起步验收 gate**（v3.1 修订 · 反映实际部署配置）
- [ ] `curl -I https://chinatravel-staging.onrender.com` 返回 **401**（未带 basic auth）· **不返回 308 到生产**
- [ ] 带 basic auth 打开 staging 主页 · 返回 200 · 响应头含 `X-Robots-Tag: noindex, nofollow`
- [ ] `curl -I https://chinatravel-staging.onrender.com/robots.txt` 返回 **200 且无需 auth**（bypass 生效 · 同时是 Render health check path）
- [ ] `curl -I https://chinatravel-staging.onrender.com/api/tour-enquiry` **不返回 401**（`/api/*` bypass 生效 · 返回 405/400 都算通过 · 只要不是 401）
- [ ] staging 提交测试 lead · **不发出任何邮件**（`RESEND_API_KEY` 未设 → 六个 lead API 的 `if (!apiKey)` guard 走 no-op 分支）
- [ ] staging 页面 HTML 中**无 GA/GTM script**（`NEXT_PUBLIC_GA_ID_STAGING` / `NEXT_PUBLIC_GTM_ID_STAGING` 未设 → `getGaId()`/`getGtmId()` 返回 undefined → 组件 render null）
- [ ] 生产 GA4 Realtime 完全无 staging 流量污染
- [ ] shared-blocks 快照 CI 绿 · 4 锚点 e2e 绿 · verify-react-peers 绿

> **已作废**（v3.1）：原 gate 中的 `is_staging` 五表校验、`staging-*` Storage bucket 校验、CRM 读取侧过滤校验 —— CTS 没有 lead 存储表，lead 流程全走 Resend 邮件，staging 空 `RESEND_API_KEY` 即完全隔离。详见文档顶部 v3.1 修订说明。
>
> **已作废**：`/api/health` —— 该路由在 CTS 不存在（Phase 0 实施时发现）。Render health check 改用 `/robots.txt`（由 `src/app/robots.ts` 提供，且在 middleware bypass 列表内）。

**不进 Phase 0 PR 的**：Ceepii 组件本体、任何 UI 换壳代码。这些进 Phase A（PR #148 起）。

### 10.3 staging service 实际部署配置（2026-08-29 建成）

| 项 | 值 |
|---|---|
| Service 名 | `chinatravel-staging` |
| Service ID | `srv-da8qvsu7bikc73d2cng0` |
| 默认 URL | `https://chinatravel-staging.onrender.com` |
| Render 环境 | China Travel → **Staging**（新建，与 Production 并列） |
| Repo / 分支 | `bigbigraydeng-maker/chinatravel` · **main** |
| Region / Plan | Oregon (US West) · Standard `1c-2g` $25/月（与生产同规格） |
| Build / Start | `npm install; npm run build` · `npm run start` |
| Health Check Path | `/robots.txt`（bypass basic auth · 见 §4.1） |
| Auto-Deploy | On Commit |

**basic auth 凭据**：用户名 `ctspreview` · 密码为 Render 生成的 32 位随机 hex，存在 Render env `STAGING_PASS`，Ray 侧另存密码管理器。

**staging env 与生产的差异**（其余变量与生产同值）：

| 变量 | staging | 理由 |
|---|---|---|
| `NEXT_PUBLIC_ENV` | `staging` | 开启 middleware basic auth + noindex + env-toggled tracking |
| `STAGING_USER` / `STAGING_PASS` | 已设 | basic auth |
| `NEXT_PUBLIC_SITE_URL` | `https://staging.chinatravel.co.nz` | 待 DNS 接入；在此之前 canonical/OG 会指向该域，属预期 |
| `RESEND_API_KEY` | **未设** | 子牙决策 #5 · lead 邮件 no-op |
| `NEXT_PUBLIC_GA_ID` / `GTM_ID` | **未设** | 生产 property 零污染 |
| `NEXT_PUBLIC_GA_ID_STAGING` / `GTM_ID_STAGING` | **未设** | 待 Ray 建 staging property 后补 |
| `NEXT_PUBLIC_GOOGLE_ADS_*` | **未设** | 不触发 Ads conversion |
| `REDIRECT_ONRENDER_HOST` | **未设** | v2 blocker #2 · 设了会 308 到生产 |

**DNS 待办**：`staging.chinatravel.co.nz` CNAME → `chinatravel-staging.onrender.com`，并在 Render → Settings → Custom Domains 添加该域。在此之前用 `.onrender.com` 默认域访问。

---

## 11. 生产环境遗留隐患（Phase 0 实施中发现 · 与翻新无关）

⚠️ **生产 Render service 的三个 Supabase 环境变量名拼写错误** —— 少一个 `A`：

| 生产上的（错） | 代码实际读取的（对） |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `SUPABASE_SERVICE_ROLE_KEY` | `SUPABASE_SERVICE_ROLE_KEY` |

`git grep SUPBASE` 在 `src/` 下**零命中** —— 说明这三个变量从未被任何代码读到过。

**为什么生产站看起来正常**：全站图片走的是硬编码完整 URL（`https://qbturrydultenhlfmdcm.supabase.co/storage/v1/...`，`src/` 下 149 处），不经过 Supabase client。

**实际受影响的功能**（这些应当是坏的，需 Ray 验证）：
- `/admin/images/*` 图片管理（上传 / 删除 / 移动 / 分析）—— `src/app/api/admin/images/*` 全部 `return 500 Missing NEXT_PUBLIC_SUPABASE_URL`
- `/marketing/campaign/data` GSC dashboard —— `src/lib/data/gsc-dashboard.ts` 用 `createClient(undefined!, undefined!)`
- GSC 每日同步 —— `src/lib/gsc/sync.ts` 同上

**建议**：单独开一个 fix PR / 运维任务处理，不要混进 Ceepii 翻新。修法是在生产 Render env 里把三个变量名改对（值不动），然后触发一次 redeploy。**staging service 已按正确拼写配置**，可作为对照验证。

---

## 附录 A · 完整路由分类总表

*(见 §2 · 已在正文分组列出)*

## 附录 B · Ceepii 组件全清单

*(见 §3 · 按 lift 策略分级 · v2 校正基于 agent 组件级实读)*

- 总量：~130 组件文件
- 分级：直接可用 (§3.1) · 页面层抛弃组件层可救 (§3.2) · 需重写 (§3.3)
- 关键依赖矩阵：§3.4

## 附录 C · Phase A 每 PR 通用 checklist

```markdown
## Phase A PR checklist
- [ ] 本 PR 分支基于 main HEAD sha=<xxxxxxx>
- [ ] URL diff（本 PR 涉及路由）与 cts-urls-before.txt 净变化 = 0
- [ ] schema.org JSON-LD 输出未变（抽 3 页 Google Rich Results Test 截图）
- [ ] 4 锚点 e2e 断言过（v2 §4.9）
- [ ] shared-blocks 快照 CI 过（若触碰 tour detail 相关组件 · v2 §4.7）
- [ ] GA4 Realtime 截图：本 PR 涉及页至少 1 个 gtag 事件 fire
- [ ] GTM Preview 截图：本 PR 涉及 form 至少 1 个 dataLayer push
- [ ] fireLeadConversion 单测 pass
- [ ] Lighthouse mobile 抽 3 页 · LCP < 2.5s
- [ ] staging URL + 视觉截图（旧壳 vs 新壳 side-by-side）
- [ ] 品牌红线：无 "Auckland since 1928" · 无 "6 城美食游"
- [ ] verify-react-peers 绿（若新装依赖）
- [ ] Supabase is_staging 隔离验证（若触碰 lead 写入/读取代码）
```

---

**v3 文档结束 · 子牙 GO · 等 Ray 合 PR · 别自己 merge**
