# Ceepii 翻新评估文档（Phase 0 · PR #1）

> 状态：草案 v1 · 待 Ray 审
> 分支：`claude/cts-ceepii-redesign-96cbba`
> 上游 main HEAD：`8d53aba feat(brochure): replace 2026-27 brochure with 14-page catalogue v2 (#145)`
> 编写者：Claude Code FDE · 2026-08-29
> 范围：仅评估 + Phase 0 隔离环境搭建方案，不含任何生产代码改动。

---

## 0. 摘要（TL;DR）

| 维度 | 结论 |
|---|---|
| **客户** | CTS Tours NZ（`c0000000-0000-0000-0000-000000000000`） |
| **仓库** | `github.com/bigbigraydeng-maker/chinatravel` · 分支 `claude/cts-ceepii-redesign-96cbba` |
| **风险等级** | **A 级**（触碰 SEO URL / 埋点 / lead-conversion） |
| **总工期** | **6 周**（Phase A 外壳统一 3 周 + Phase B 4 大页深度重构 3 周） |
| **实际路由数** | **114 个 `page.tsx`**（不是简报中的 89），其中面向公众约 **93 个**，需 Phase A 换壳的 **81 个** |
| **品牌叙事** | 保留现有 · Auckland since 2000 (25 年) · CTS Group founded 1928 · Baker Gu 作为 China specialist / content author，**不切美食游** |
| **技术策略** | Ceepii 组件降级到 CTS 现有栈（Next 14 + React 18 + Tailwind 3），**不升 CTS** |
| **不做** | 30+ SEO LP 深度重构、admin/marketing 内部工具页、`/api/*`、print 路由 |
| **成果物 · PR #1** | 本文件 + Phase 0 环境搭建 patch（下述） |

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

> ⚠️ **重要**：Ceepii 用 Tailwind 4 CSS-config（`@theme` / `@custom-variant`）· CTS 是 Tailwind 3 · **必须港 token 到 v3 语法**（详见 §3.5，1 人日）· 这个之前没料到，加进 Phase 0 patch。

```
primary   #B61E2E   中国红 · CTA/强调
secondary #D6A756   暖金 · 品质感
accent    #1F2937   墨黑 · 标题
warm      #FFF9F5..#D6A756  奶油/沙色梯度
ink       #23201C / #5A554F     editorial 系（已存在，服务于 /preview-home）
surface   #FBF7F0 / #FFF / #1A1815   editorial 系
字体      Inter (sans) + Playfair Display (serif) · via next/font CSS var
```
Phase A 保留全套 token，Ceepii 的调色板作为**候选新增 token**（如 `neutral` 层级、`accent-2`），不覆盖既有色板。**任何品牌色最终值由 Ray 拍板**，草案先用占位。

### 1.3 已存在的 redesign 起手
仓库里已经有前人试过的 redesign 脚手架（对我们是**种子**，不是空手起步）：

| 位置 | 用途 | 建议 |
|---|---|---|
| `src/app/page-redesign.tsx` | 首页重设计 v0（含 Baker Gu specialist 区块） | Phase B 首页从此增强 |
| `src/app/preview-home/page.tsx` | 内部预览路由 · `robots: noindex` | Phase B 用作 A/B 观察点 |
| `src/app/preview-hero/page.tsx` | Hero 变体测试台 | 保留 |
| `src/app/preview-wendy-wu/page.tsx` | 竞品 Wendy Wu 视觉参考页 | Phase A/B 保留作对标 |
| `src/components/HeroSearchEditorial.tsx` `HeroSearchGlass.tsx` `HeroCinematic.tsx` | 3 个 hero 变体已存在 | Phase B 首页从中选/融合 |
| `src/components/ImmersivePageHero.tsx` | 通用 immersive header | Phase A 可选替换其他页 hero |

### 1.4 埋点 & lead-conversion 拓扑
```
埋点入口（env-driven，已好）
├─ NEXT_PUBLIC_GA_ID   → components/GoogleAnalytics.tsx  → root layout.tsx
└─ NEXT_PUBLIC_GTM_ID  → components/GoogleTagManager.tsx → root layout.tsx
   ├─ dataLayer push 事件封装（页面/组件层广泛使用 window.gtag）
   └─ 若 ID 未配置：静默 no-op（生产/staging 都安全）

lead 提交路径（3 处入口 · 共用同一 fireLeadConversion）
├─ /contact                     → ContactFormClient        → fireLeadConversion('contact_form')
├─ /thank-you                   → ThankYouClient           → fireLeadConversion(source from URL)
└─ 通用 <HeroWithLeadForm>       → SEO LP hero form         → fireLeadConversion(leadConversionSource prop)
     └─ 被 /china-visa-guide-for-new-zealanders 等 SEO LP 复用
     └─ 已有单测 src/components/seo/__tests__/HeroWithLeadForm.test.tsx

Hero / SearchBar / CTA 埋点事件（散布，需 Phase A 保留）
- hero_cta_primary_click / secondary_click
- hero_search_submit
- hero_film_click
```
**关键**：`src/lib/analytics/lead-conversion.ts` 是**单一收敛点**。Phase A/B 全程不动此文件；换壳只替换 UI 组件，事件 fire 契约保留。已有单测保护，回归有信号。

### 1.5 SEO 基线（**这是本次翻新的最大约束**）
- `next.config.js` 定义 **40+ 条 permanent redirect**：wpcom 历史 URL、apex/host 归一、旧 `/tour/*` 结构、`/campaigns/october-2026` → `/campaigns/spotlight`、`/wp-content` `/wp-json` `/category` `/tag` `/author` `/feed` 全归 `/china-tours`、query-string 匹配（`?p=` `?cat=` 等）。**Phase A/B 全程不能改这些。**
- `src/app/sitemap.ts` + `src/app/robots.ts` 生成 sitemap · Phase 0 需扫描线上 sitemap 与本地对齐存档
- 全站带 schema.org markup（Article + Person Baker Gu + ItemList + WebPage + BreadcrumbList + FAQPage 等，见 `components/SchemaMarkup.tsx`）· Phase A 换壳不能碰 schema 输出
- 语言：主站 `en-NZ` · GEO 定向仅 NZ（PR #131-133 已收紧，不含 AU）

### 1.6 CLAUDE.md 里已锁的 UI 约定（Phase A 必须继承）
```
锚点（scroll-mt-24 + id）
├─ #visa-nudge          → components/tours/ChinaVisaNudge.tsx
├─ #faq                 → components/FAQSection.tsx
├─ #trust-signals       → components/tours/TourTrustSignals.tsx
└─ #planning-resources  → components/tours/TourSupportingContentLinks.tsx

shared blocks 双写规则
- 凡是 tour 页新增的公共块（如上 4 者、TrustBar、TourHero CTA），
  必须同步到 /campaigns/october-2026/[slug]/page.tsx 同顺序
- 例外必须在 PR 描述明写理由

品牌红线（PR #144 已合规）
- 全站 43+ 处 "NZ specialists since 1928" 已改为
  "Auckland since 2000 · backed by CTS Group founded 1928" 两条分立事实
- Phase A/B 换壳时**禁止**把这两条概念再合并
```

### 1.7 中间件（Phase 0 staging 基座）
`src/middleware.ts` 已有：admin cookie gate、marketing plan cookie gate、`/marketing` `X-Robots-Tag: noindex` header。**Phase 0 的 staging basic auth 直接扩展这个 middleware**（不新起 middleware），保持单一 middleware 契约。

---

## 2. 全路由清单（114 页 · 分级）

排序：`/` 优先 → 目录结构 → dynamic route。**分类逻辑：**
- **A**（Phase A · 外壳换皮）— 面向公众 · 换 Header/Footer/Card/Button/Typography/Layout/Section wrapper，不动数据结构、schema、埋点、锚点、文案
- **B**（Phase B · 深度重构）— Home + Tours listing + Tour detail 3 层 + About
- **C**（Phase C · 延后深度）— 30+ SEO LP 的内容/结构级重构（本次 6 周**不做**，Phase A 只统一外壳）
- **X**（Excluded · 不动）— admin/marketing 内部工具、`/api/*`、`/dev/*`、`/preview-*`、print、`/test-tours`

### 2.1 Phase B · 深度重构（4 页）
| 路由 | 组件 | 备注 |
|---|---|---|
| `/` | `src/app/page.tsx` | Phase B 从 `page-redesign.tsx` + `HeroSearchEditorial` 起手 |
| `/tours` | `src/app/tours/page.tsx` | listing → Ceepii stay listing 结构映射 |
| `/tours/[destination]/[tier]/[tour]` | 3 层动态路由 | tour detail · **锚点 + shared blocks 契约 100% 保留** |
| `/about` | `src/app/about/page.tsx` | 1928 + NZ 25 年双叙事 · Baker/Lisa 团队 |

### 2.2 Phase A · 全站外壳换皮（约 81 页 · 分组）

**用户主流程（10）**
```
A  /                         (被 Phase B 覆盖，A 阶段其他页共用新 Header/Footer)
A  /contact                  ContactFormClient + fireLeadConversion 保留
A  /tailor-made              TailorMadeForm 保留
A  /thank-you                ThankYouClient + fireLeadConversion 保留
A  /subscribe                newsletter 埋点保留
A  /destination-matcher      quiz UX 保留
A  /itinerary-generator      AI 生成器 · 只换壳
A  /trip-planner             同上
A  /travel-tools             hub 页
A  /tools/cost-calculator    工具
```

**Tours（6 · 3 层动态路由的其余层）**
```
A  /tours                       → Phase B 覆盖
A  /tours/[destination]         listing by destination
A  /tours/[destination]/[tier]  listing by tier
B  /tours/[destination]/[tier]/[tour]     ← Phase B
X  /tours/[destination]/[tier]/[tour]/print  ← print CSS 不换
A  /tours/find                  filter/finder UI
A  /test-tours                  → Excluded（内部测试页）
```

**8 个城市 tour hubs（`-tours` 系）**
```
A  /beijing-tours    /chengdu-tours    /chongqing-tours    /guilin-tours
A  /hangzhou-tours   /shanghai-tours   /suzhou-tours       /xian-tours
A  /yunnan-tours     /zhangjiajie-tours
```

**20 个 destination guides（`-travel-guide` + 专项）**
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

**Discovery / regional guides（4）**
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

**Blog / FAQ / experts / static（14）**
```
A  /blog                       /blog/[slug]
X  /blog/staging               ← 内部预览
A  /faq                        /faq/[slug]
A  /experts/baker-gu           /experts/lisa-li
A  /agents
A  /explore                    /explore/[city]
A  /guide                      /site-map
A  /privacy-policy             /terms-and-conditions
A  /play                       /play/[slug]
```

**Campaigns（6）**
```
A  /campaigns/best-of-china
A  /campaigns/chongqing
A  /campaigns/fire-fuzz
A  /campaigns/october-2026/[slug]   ← **shared-blocks 契约页** · Phase A 与 tour detail 同步
A  /campaigns/spotlight
A  /spotlight/october-2026
```

**About extras（1）**
```
A  /about/asian-escapes
```

### 2.3 Phase C · 延后深度（本次 6 周不做）
30+ 个 `-travel-guide` / `-tours` / `-discovery-guide` / commercial SEO LP。Phase A 只换外壳 → 视觉统一；内容 / 信息架构 / 转化路径级重构进 Phase C，单独立项。

### 2.4 Excluded · 不动（21 页）
```
/admin/*                          8 页  内部 dashboard
/marketing/*                     10 页  内部运营看板
/marketing/preview
/api/*                                  无 UI
/dev/quiz-collage/[slug]              开发工具
/preview-home /preview-hero /preview-wendy-wu   redesign 沙盒（Phase B 用作 A/B 场）
/test-tours                            内部测试
/blog/staging                          内部预览
/tours/.../print                       print CSS
```

**注**：`/marketing/*` 和 `/admin/*` 不换皮的理由：内部运营工具，用户量为 0，投产 ROI 为负。若 Ray 明确要换，进 Phase C。

---

## 3. Ceepii → CTS 组件映射

> **数据来源**：`/Users/raydeng/Downloads/Ceepii-NextJS/ceepii-nextjs-template/` · Next 16.1.7 / React 19.2.4 / Tailwind 4.1.5 · ~130 组件文件

### 3.0 三条战略结论（决定后续所有映射）
1. **只 lift 组件层，不 lift 页面层**。Ceepii 的每个 route（`stay-listings/[handle]/page.tsx` 等）都用了 `next/form` + inline `'use server'` + `await params`（Next 15+ API · Next 14 不支持）。**这些页面本身抛弃**，只 lift 其内部的 section/card/atom 组件（组件层 100% React 18 兼容 · 全部 `forwardRef` · 零 React 19 hooks · 零 async client component）。
2. **Tailwind v4 CSS-config → 港到 CTS `tailwind.config.ts`（v3）**。Ceepii 的 `src/styles/tailwind.css` 用 `@theme` / `@custom-variant` / `@utility` / `@plugin` 全部是 Tailwind 4 语法 · **v3 不识别**。需要手工搬 token（radius scale / section-space utility / keyframes / rc-datepicker overrides），估 1 人日。这条**必须加进 Phase 0 patch**。
3. **Ceepii 无真实后端**。所有 `<Form action={handleSubmitForm}>` 都是 stub（`console.log` + `redirect`）。CTS 侧 lead 提交逻辑 100% 保留 · 只把 Ceepii 的 form UI shell 套上，`fireLeadConversion` 契约完全不受影响。

### 3.1 直接可用（React 18 + Tailwind 3 兼容 · 拿来即用）
| 类别 | Ceepii 组件（示例） | 建议 |
|---|---|---|
| Buttons | `button.tsx` (Headless UI `<Button>` + forwardRef) · `button-primary/secondary/third.tsx` · `button-circle.tsx` · `button-close.tsx` · `ui/button.tsx` (shadcn/radix) | 全套 lift；CVA variants 保留 |
| Form primitives | `input.tsx` `textarea.tsx` `select.tsx` `checkbox.tsx` `radio.tsx` `switch.tsx` `listbox.tsx` `combobox.tsx` `fieldset.tsx` `nc-input-number.tsx` | 全套 lift · Headless UI 依赖 |
| Typography / atoms | `heading.tsx` `text.tsx` `divider.tsx` `link.tsx` `tag.tsx` `badge.tsx` `avatar.tsx` `start-rating.tsx` `sale-off-badge.tsx` `amenities-chips.tsx` | 全套 lift |
| Section wrappers | `background-section.tsx` `bg-glassmorphism.tsx` · `container` + `pl-container` + `section-space*` utilities | lift · 但 `container` 用了 1536px inset，与 CTS 现有 `max-w-*` 抽象不同，需在 Phase A W1 决定统一策略 |
| Card 变体 | `card-author-box.tsx` `card-author-box2.tsx` · `card-category-box1.tsx` · `card-category1/3/4/5/6/7/8.tsx` | Phase B tour card 从中选 1-2 个作参考重构 `TourTierCard.tsx` |
| Section blocks（首页可用） | `section-dream-destination.tsx` `section-explore-properties.tsx` `section-how-it-work-2.tsx` `section-why-us.tsx` `section-client-say.tsx` `section-videos.tsx` `section-logo-cloud.tsx` `section-logo-cloud-2.tsx` `feature-section-2.tsx` `inspiration-future-getaways-section.tsx` `newsletter-section-1.tsx` | Phase B 首页从中挑 5-7 个 section 拼装 |
| Motion / reveal | `motion-div.tsx` `fade-in.tsx` `reveal-in-view.tsx` | 全套 lift · 依赖 `motion` |
| Blog | `blog/post-card1/2/3.tsx` `post-card-meta.tsx` `section-grid-posts.tsx` `section-grid-post-3.tsx` `section-magazine5.tsx` | Phase A blog 换壳直接用 |
| Misc UI | `pagination.tsx` `next-prev-btns.tsx` `like-save-btns.tsx` `socials-list*.tsx` `socials-share.tsx` `google-logo-svg.tsx` | lift |
| Header 变体 | `header/header.tsx` `header2.tsx` `header3.tsx` · `header/navigation/header-navigation.tsx` · `logo.tsx` · `hamburger-btn-menu.tsx` | Phase A W1 选 1 个基座（推荐 `header3` · 与 Ceepii demo 主页一致），改品牌 logo · 保留 CTS 现有 nav 结构（`NavLink.tsx`） |
| Footer 变体 | `footer.tsx` `footer2/3/4.tsx` · `footer-quick-navigation.tsx`（移动端 sticky） | Phase A W1 选 1 个 · footer 内容 100% CTS 现有（保留 `Footer.tsx` 里的品牌行、TAANZ/IATA、CTS 1928 段落）|
| Modal / Dialog | `dialog.tsx` `nc-modal.tsx` `modal-select-date.tsx` `modal-select-guests.tsx` | 按需 lift · Headless UI 依赖 |

### 3.2 需改写才能用（页面层 Next 16 API · 但组件层可救）
| Ceepii 页面 | Next 16 依赖 | CTS 侧做法 |
|---|---|---|
| `(listings)/stay-listings/[handle]/page.tsx` | `next/form` + inline `'use server'` + `await params` | **抛弃页面外壳**；lift 内部 `HeaderGallery` `SectionHeader` `SectionFeaturedAmenities` `SectionAmenities` `SectionDateRange` `SectionHost` `SectionListingReviews` `SectionMap` `DatesRangeInputPopover` `GuestsInputPopover` 组件；重接到 CTS `/tours/[destination]/[tier]/[tour]/page.tsx` |
| `(search-pages)/stay-search/page.tsx` | 同上 | 抛弃页面；lift `ListingFilterTabs` `Pagination` `StayCard2` 结构 → 重接到 CTS `/tours` |
| `(home-pages)/(home)/page.tsx` | 同上 | 抛弃页面；lift 首页 section 组合模式 → 重接到 CTS `page-redesign.tsx` |
| `add-listing/*/page.tsx` (10 步向导) | 同上 | **完全不用** · CTS 无 host add-listing 场景 |
| `(account)/**` | 同上 | **完全不用** · CTS 无客户账户 |
| `checkout/page.tsx` | 客户端 push | **完全不用** · CTS 走 lead → email → CRM |

改写模板（页面层）：
```ts
// Ceepii (Next 16)
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  // ...
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
| 右侧 sticky booking sidebar（`DatesRangeInputPopover` + `GuestsInputPopover` + `Reserve`） | Enquiry sidebar（`Departure Selector` + `Group size` + `Enquire`） | 房型/日历 → 已开团出发日期；guest → 团型；`Reserve` → 现有 lead form + `fireLeadConversion` |
| `SectionFeaturedAmenities` `SectionAmenities` | `TourInclusions.tsx` | 保留 CTS 现有 icon + 分类 |
| `SectionDateRange` (calendar) | `UpcomingDepartures.tsx` | 保留 CTS 现有出发日期数据源 |
| `SectionMap` (MapLibre) | `ItineraryRouteSchematic.tsx` **不换** | CTS 已有 SVG schematic + 自动路线推导 · 比 Mapbox 更贴合"多城行程"叙事 · 保留 |
| `SectionHost` (host profile) | `experts/baker-gu` 段片 | 保留 Baker Gu / Lisa Li specialist 角色 |
| `SectionListingReviews` (Airbnb 式) | `Testimonials.tsx` | 保留 CTS 现有 1105 行 testimonial 数据 |

### 3.4 依赖矩阵（校正版 · 基于 agent 审计）

| Ceepii 依赖 | 覆盖组件 | CTS 决策 |
|---|---|---|
| `@headlessui/react` | ~50 文件 · 几乎每个 dropdown/popover/dialog/tabs/listbox/combobox/switch | **必装** · 无绕开路径 · 添加约 55kb gzip |
| `@hugeicons/react` + `@hugeicons/core-free-icons` | ~55 文件 · 每个 card/header/filter/section icon | **决策题** · 两条路：(a) **保留 lucide-react** · Phase A 迁入组件时手工换等价 lucide 图标（估 3-4 人日）· 单一图标库；(b) **共存**：装 hugeicons + lucide · bundle +~150kb · 但迁移零成本 · 长期维护双库。**我建议 (a)** |
| `motion` (Framer Motion 12) | `navbar.tsx` `motion-div.tsx` `fade-in.tsx` `gallery-slider.tsx` · Ceepii 首页每 section 都包 `<RevealInView>` | **装** · 用得比预期广 · 强行 CSS 替代会失去 Ceepii 视觉感染力 |
| `embla-carousel-react` + fade/autoplay/wheel-gestures | 首页 carousel · gallery · testimonial · header gallery | **装** |
| `radix-ui` (shadcn 层) | `ui/breadcrumb.tsx` `ui/button.tsx` `ui/navigation-menu.tsx` `ui/direction.tsx` | **装**（不与 headlessui 冲突 · 只用于 breadcrumb + navigation-menu 少数组件） |
| `next-themes` | `theme-provider.tsx` `switch-dark-mode.tsx` `ui/map.tsx` | **决策题** · Ceepii 全组件有 `dark:` 类 · 不装则永远 light mode 也 OK · **我建议不装** · 减少认知负载 · 未来要 dark mode 再加 |
| `react-datepicker` | hero search form 每个日期字段 · `(listings)/components/date-input-popover.tsx` · `add-listing/9` | **装** · Phase A tour finder / tailor-made 用日期选择 · 会替 CTS 现在的手工 date input |
| `date-fns` | `lib/utils.ts` + 所有 datepicker 上下游 | **装** · 顺带把 CTS 现有手写日期处理换掉，减少 bug |
| `maplibre-gl` | `ui/map.tsx` · `section-map.tsx` · `map-with-markers.tsx` | **不装** · CTS 用 `ItineraryRouteSchematic.tsx`（自研 SVG schematic）· 团游语义比 Mapbox POI 更贴 |
| `rc-slider` | `price-range-slider.tsx` | **按需装** · 只有 tours listing filter 需要价格滑块，若 Phase B listing 决定用则装 |
| `lodash` | `location-input-field.tsx` `use-snap-slider.ts` (trivial) | **不装** · 单点 import 换手写等价 |
| `class-variance-authority` + `clsx` | Ceepii button variants | **装** · CTS 现无 CVA · variants 抽象更清晰 |
| `tw-animate-css` | Tailwind v4 CSS 插件 | **不装** · Tailwind 3 无此 plugin · 手写 keyframes（见 §3.5 Tailwind 港） |

### 3.5 Tailwind v4 → v3 港（Phase 0 patch 必须做）
Ceepii 的 `src/styles/tailwind.css` 全部 Tailwind 4 语法，CTS `tailwind.config.ts` (v3) 不识别。港工作清单：
- **Color tokens**（`--primary` `--secondary` `--accent` `--muted` `--card` `--border` `--sidebar-*` `--chart-1..5`）· Ceepii 全 oklch 色 · CTS 现 hex 色 · **不覆盖 CTS 品牌色**（`#B61E2E` `#D6A756` 保留），Ceepii 的中性色（`--muted-foreground` `--border` `--card-foreground`）作为**新增 neutral 系** token
- **Radius scale**（`--radius-sm..--radius-4xl` 8 档，multipliers 0.6/0.8/1.0/1.4/1.8/2.2/2.6）· 在 `tailwind.config.ts` `borderRadius` 加同名 8 档
- **Custom utilities** · 手工在 `tailwind.config.ts` `plugins` 里用 `plugin()` 定义或直接在 `globals.css` `@layer utilities` 声明：
  - `container` (1536px inset) — 与 CTS 现有 `max-w-*` 冲突判断，Phase A W1 决定
  - `section-space` / `section-space-xl` / `section-space-smaller` / `section-space-top` / `section-space-bottom` — 简单 padding，直接 `@apply`
  - `embla*` — carousel 内部，只在装 embla 的页面用
  - `nc-header-bg` `menu-item` / `sub-menu` `hidden-scrollbar` `z-max` `nc-box-has-hover` `listingSection__wrap` `shadow-lg-for-card` `shadow-md-for-card` `custom-shadow-1` `hero-search-form__field-*`
- **Keyframes**（`myblur` `pulseScale` `marquee` `marquee-reverse`）· 现有 CTS `tailwind.config.ts` `theme.extend.animation` + `keyframes` 加
- **`react-datepicker` overrides**（~85 行 CSS）· 放到 `globals.css` 或独立 `datepicker.css` import
- **Dark variant** · Tailwind 3 默认支持 `dark:` class-based · 保留 · 只是不装 next-themes 就永远 light（决策见 3.4）

**估工**：1 人日 · 输出 `tailwind.config.ts` diff + 新增 `datepicker.css`。

### 3.6 字体决策
Ceepii：`Google_Sans_Flex`（sans）+ `Playfair_Display`（serif）· 每个 heading 有 `<span data-slot="italic">` 用 Playfair 斜体做重音。
CTS 现有：`Inter`（sans）+ `Playfair_Display`（serif）· 一致的部分是 Playfair。
- **建议**：sans 换为 `Google_Sans_Flex`（与 Ceepii 视觉一致）· serif 保留 `Playfair Display` · italic span 模式采纳（Ceepii 视觉签名）
- **决策入口**：Phase A W1 · 影响全站排版 · 需 Ray 拍板

### 3.7 Ceepii → CTS 契约完全保留清单
以下 CTS 组件/文件**必须原样保留**（Phase A 只允许在其外部包一层新壳，不允许改内部结构）：
- `src/lib/analytics/lead-conversion.ts` + `fireLeadConversion` 契约
- `src/components/SchemaMarkup.tsx` schema.org JSON-LD 输出
- `src/components/GoogleAnalytics.tsx` `GoogleTagManager.tsx`（Phase 0 只加 env-toggle 分支 · 不改契约）
- `src/lib/image-loader.ts` custom image loader（Supabase Storage）
- 4 个锚点 id（`#visa-nudge` `#faq` `#trust-signals` `#planning-resources`）
- `src/middleware.ts` 现有 admin / marketing gate（Phase 0 只加 staging basic auth 分支 · 不改现有逻辑）
- `src/app/sitemap.ts` `src/app/robots.ts`（Phase 0 起白名单）
- `src/components/tours/ItineraryRouteSchematic.tsx`（自研 SVG · 不换 MapLibre）
- `src/components/Testimonials.tsx`（1105 行 testimonial 数据）
- `next.config.js` 全部 40+ redirect 条目

---

## 4. Phase 0 · 隔离环境搭建

> Ray 追加要求：评估文档 + Phase 0 环境搭建走**同一个 PR #1**，Ray 审完 merge 后才动 Phase A。

### 4.1 staging 子域 · DNS + Render
```
staging.chinatravel.co.nz
├─ DNS  CNAME → chinatravel-<staging>.onrender.com
├─ Render 新建 service，watch 分支 = claude/cts-ceepii-redesign-96cbba
├─ env NEXT_PUBLIC_ENV=staging（下述）
└─ 中间件强制：Basic Auth + X-Robots-Tag: noindex, nofollow
```
**Basic Auth 实现**：扩展 `src/middleware.ts`，在最上层加：
```ts
if (process.env.NEXT_PUBLIC_ENV === 'staging') {
  const auth = request.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${process.env.STAGING_USER}:${process.env.STAGING_PASS}`).toString('base64');
  if (auth !== expected) {
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="staging"', 'X-Robots-Tag': 'noindex, nofollow' }
    });
  }
  // 通过后继续现有 admin / marketing gate
}
```

### 4.2 GA4 test property + Ads test conversion ID + Meta Pixel test ID
| 环境 | GA4 property | Ads conversion ID | Meta Pixel ID |
|---|---|---|---|
| production | `NEXT_PUBLIC_GA_ID`（现值） | `NEXT_PUBLIC_ADS_ID`（现值） | 可选，见备注 |
| staging | `NEXT_PUBLIC_GA_ID_STAGING`（新建 GA4 property） | `NEXT_PUBLIC_ADS_ID_STAGING`（新建 Ads test conversion） | `NEXT_PUBLIC_PIXEL_ID_STAGING`（可选） |

**GoogleAnalytics.tsx / GoogleTagManager.tsx 改造**：读 `NEXT_PUBLIC_ENV` 二选一 ID（**这个改动属 Phase 0 patch · PR #1 内**）。生产 ID 完全不变，回归零影响。

### 4.3 lead 表 `is_staging` 字段（Supabase migration）
```sql
-- migrations/20260829_add_leads_is_staging.sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS is_staging boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS leads_is_staging_idx ON leads(is_staging) WHERE is_staging = false;
COMMENT ON COLUMN leads.is_staging IS 'true = 来自 staging.chinatravel.co.nz redesign 环境，生产 CRM query 必须 WHERE is_staging = false 过滤';
```
**写入侧**（lead 提交 API route）读 `NEXT_PUBLIC_ENV`，staging 写 `true`，其他写 `false`。
**读取侧**（marketing dashboard / CRM export / any lead query）全部加 `WHERE is_staging = false`。Phase 0 PR #1 里同步改**所有** lead 查询点（预计 3-5 处，本节生产验收前一起做完，避免"上线后 CRM 里冒出测试单"的事故）。

### 4.4 环境变量矩阵
```
                            production            staging               dev
NEXT_PUBLIC_ENV             production            staging               development
NEXT_PUBLIC_SUPABASE_URL    <生产同库>            <生产同库>            <生产同库>
NEXT_PUBLIC_SUPABASE_ANON   <生产 anon>           <生产 anon>           <生产 anon>
NEXT_PUBLIC_GA_ID           <生产 GA4>            —                     —
NEXT_PUBLIC_GA_ID_STAGING   —                     <staging GA4>         —
NEXT_PUBLIC_GTM_ID          <生产 GTM>            —                     —
NEXT_PUBLIC_GTM_ID_STAGING  —                     <staging GTM>         —
NEXT_PUBLIC_ADS_ID          <生产 Ads>            —                     —
NEXT_PUBLIC_ADS_ID_STAGING  —                     <staging Ads test>    —
STAGING_USER                —                     <basic auth 用户>     —
STAGING_PASS                —                     <basic auth 密码>     —
RESEND_API_KEY              <生产 Resend>         <生产 Resend*>        —
ADMIN_SECRET_KEY            <生产密钥>            <staging 独立密钥>    —
MARKETING_PLAN_ACCESS_KEY   <生产密钥>            <staging 独立密钥>    —
```
\* **待 Ray 决策**：staging 环境的 lead 提交要不要真发 Resend 邮件？建议：staging 用 sandbox mode（Resend 有 test domain）或干脆用 `RESEND_API_KEY=""` 让邮件发送静默失败并写 log，避免真给客户发测试邮件。

### 4.5 redesign 分支的"每周吸 main"纪律
每周一 09:00 NZT，在 `claude/cts-ceepii-redesign-96cbba` 分支执行：
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
```

### 4.6 URL 基线快照
Phase 0 PR #1 里附一个 `docs/redesign/cts-urls-before.txt`：
```bash
# 生成方式（本地跑，不需生产权限）
curl -s https://www.ctstours.co.nz/sitemap.xml \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed 's|<loc>||; s|</loc>||' \
  | sort > docs/redesign/cts-urls-before.txt
```
所有 Phase A / B PR 必须跑 `diff` 与此文件对比，**净变化 = 0**（除非明确新增 LP）。

---

## 5. 风险清单（全面）

### 5.1 SEO 风险
| 风险 | 影响 | 缓解 |
|---|---|---|
| URL 变化导致 404 | 灾难 · GSC 收录塌方 | Phase 0 快照 + 每 PR diff 校验 |
| schema.org JSON-LD 输出被换壳误伤 | 富摘要消失，CTR 掉 | 保留 `SchemaMarkup.tsx` 不动；每 PR 用 Google Rich Results Test 抽 5 页验 |
| sitemap.xml / robots.ts 被误改 | 索引路径变 | 白名单文件，任何 PR 改动都要 Ray 签字 |
| 40+ 条 redirect 被误删 | 老 URL 全 404 | `next.config.js` 加锁：修改前必须在 PR 描述贴 GSC "带来点击的旧 URL 未被移除"证据 |
| hreflang / canonical 被换壳丢失 | 语言/规范混乱 | 每个页面模板保留 `<link rel="canonical">`；Phase A checklist 强制项 |
| meta description / OG image 被壳组件覆盖 | SERP 显示错乱 | 换壳只碰 Layout 与 Section wrapper · Metadata 由 `page.tsx` 内定义，禁止移入壳 |

### 5.2 埋点风险
| 风险 | 缓解 |
|---|---|
| GA4 事件被壳组件吞掉 | Phase A 每 PR 附 GA4 Realtime 截图；lead form 单测 (`HeroWithLeadForm.test.tsx`) 已在，保留 |
| GTM 脚本插入位置变化导致首屏未加载 | GTM 保持在 root `layout.tsx` `<head>` 顶部；Phase B 首页改动特别检查 |
| Google Ads conversion 双触发或漏触发 | 保持 `fireLeadConversion` 单一收敛点；换壳只替 UI 不改逻辑 |
| Meta Reel UTM 链接失效 | Phase 0 拉全部现有 UTM 组合入 test-suite，Phase A/B 每 PR 跑 curl 200 + GA4 Realtime 验证 |

### 5.3 anchor / shared-blocks 契约风险
| 风险 | 缓解 |
|---|---|
| Phase A 换壳丢失 `#visa-nudge` 等 4 个锚点 | 组件迁入时保留 `id + scroll-mt-24`；PR 描述 checklist 强制 |
| tour detail 与 october campaign LP 不同步 | Phase A PR 每次触碰 tour detail 相关块必须同时改 `campaigns/october-2026/[slug]` |
| CLAUDE.md 未及时更新新契约 | Phase A/B 结束时把新契约（如新的 anchor / 新的 shared block）写回 CLAUDE.md · Ray 审 |

### 5.4 数据 / Lead / 邮件风险
| 风险 | 缓解 |
|---|---|
| staging lead 混入生产 CRM | `is_staging` 字段 + 所有查询点 `WHERE is_staging = false` |
| staging 触发真实客户邮件 | Resend sandbox 或空 KEY |
| Supabase Auth session 在 staging/生产间串号 | staging 使用**同一** Supabase 库（避免数据分裂），但 cookie domain 隔离（`staging.chinatravel.co.nz` vs `www.chinatravel.co.nz`） |

### 5.5 依赖 / 版本冲突风险（**校正版 · 基于 agent 审计**）
| 冲突 | 影响 | 处理 |
|---|---|---|
| **Tailwind v4 CSS-config → v3** | Ceepii `@theme` / `@custom-variant` / `@utility` / `@plugin` 语法 v3 不识别 · **不港则组件样式全崩** | 1 人日港到 `tailwind.config.ts` + `globals.css`（详见 §3.5）· **加进 Phase 0 patch** |
| **Ceepii 页面用 `next/form` + `await params` + inline `'use server'`** (Next 15+ API) | Next 14 不支持 · 页面层无法直接迁 | 抛弃 Ceepii 页面外壳 · 只 lift 组件层（§3.2）· 页面在 CTS 侧重新编排 |
| Ceepii deps 需 React 19 | 组件层全部用 `forwardRef`（agent 验证 17 处）· 零 React 19 hooks · **零** async client component | 组件层 React 18 直接兼容 · 无风险 |
| `@hugeicons/*` vs `lucide-react` 双图标库 | ~55 文件用 hugeicons · CTS 现全 lucide | **决策见 §9 #11** · 建议 (a) 保留 lucide + 迁入时手工换（约 3-4 人日） |
| `@headlessui/react` 全局必装 | ~50 文件依赖 · 无绕开路径 | 装 · +~55kb gzip · 与 CTS 现有栈无冲突 |
| `next-themes` (dark mode) | Ceepii 全组件带 `dark:` 类 · 不装则永远 light | **决策见 §9 #2** · 建议不装 |
| `motion` (Framer Motion 12) 加入 bundle | +~40kb gzip | 装 · Ceepii 视觉感染力核心 |
| `maplibre-gl` | +~200kb gzip | **不装** · CTS 用自研 `ItineraryRouteSchematic.tsx` |
| `radix-ui` + `@headlessui/react` 双弹层库 | +~30kb 重叠 | 保留两个（Ceepii 混用）· 长期看 Phase C 可合并统一到 radix |

### 5.6 时间/范围蔓延风险
| 风险 | 缓解 |
|---|---|
| Phase A 涉及 81 页，回归成本超预期 | 分组 sprint · 每周结束跑一次全站视觉 diff（Percy 或手工抽 20 页） |
| Phase B 4 页因 anchor / lead 契约多改而超时 | Phase B 第 1 周先做 tour detail（契约最重）· 若第 1 周不能完，直接找 Ray 减范围 |
| Ray 审 PR 排期与我不同步 | 每周五出 sprint 报告 · Ray 周末审 · 周一开新 sprint |

---

## 6. 排期（6 周 · 周粒度）

**假设**：起点 = PR #1 合并后（Ray 审完评估文档 + Phase 0 patch）。

### Phase A · 3 周 · 全站外壳统一

| 周 | 产出物（每周一 PR，周五 Ray 审） | 关键验收 |
|---|---|---|
| **W1** | **PR #2 · 壳组件基础层**：Header / Nav / Footer / Layout / Typography / Button / Section wrapper。仅 staging 生效（feature-flag 或路径 gate），生产不受影响。 | 5 个样本页（`/` `/tours` `/contact` `/blog` `/china-visa-guide-for-new-zealanders`）在 staging 上跑通新壳 · GA4 事件全通 · Lighthouse mobile > 90 |
| **W2** | **PR #3 · 换壳批 1**：所有 `-travel-guide` (21 页) + `-tours` hub (10 页) + Discovery guides (7 页)。**内容 0 改动**。 | 视觉 diff 手工抽 15 页 · URL diff = 0 · schema.org 抽 5 页 Rich Results Test 通过 |
| **W3** | **PR #4 · 换壳批 2**：commercial SEO LP (7) + 信息 LP (4) + blog/faq/experts/static/campaigns (~30)。Phase A 收官。 | 全站抽 20 页视觉 diff · staging 完整跑一遍 lead 提交 · Ray 决定"是否 Phase A 就上生产"或"继续 Phase B 后一起上" |

### Phase B · 3 周 · 4 大核心页深度重构

| 周 | 产出物 | 关键验收 |
|---|---|---|
| **W4** | **PR #5 · Tour Detail 深度重构**（3 层动态路由 · 契约最重的一页先做）。保留 4 锚点 + shared blocks 双写 + schema + lead form + print 路由不动。 | 3 个采样 tour（不同 destination × tier）staging 跑通 · fireLeadConversion 单测过 · print 路由无回归 |
| **W5** | **PR #6 · Home + Tours listing 深度重构**。首页从 `page-redesign.tsx` 起手 · listing 从 Ceepii stay listing 映射。 | 首页 Lighthouse mobile LCP < 2.5s · listing 分类/筛选 URL 保留（`/tours/[destination]` etc.） |
| **W6** | **PR #7 · About 深度重构 + 全站视觉一致性收尾 + 上线准备**。Baker Gu / Lisa Li specialist bio 保留 · 1928 vs NZ 25 年双叙事保留。 | 全站视觉一致性验收 · 上线切换 runbook drill · Ray 拍板 go / no-go |

### 缓冲
不预留缓冲周 = 高风险。**建议 Ray 认知：如果任何周 slip，向后顺延，不压缩后续周**。翻新是 A 级任务，不要为了 deadline 牺牲验证。

---

## 7. 上线切换 runbook（分钟级）

**前提**：Phase A + Phase B 全部 merge 到 `claude/cts-ceepii-redesign-96cbba` 分支 · staging 上验收通过 · Ray + CTS 老板 sign-off。

### T-24h · 准备
- [ ] staging 最后一轮完整回归（21 个采样页 · 3 条 lead 路径 · 5 组 UTM）
- [ ] 生成 `cts-urls-after.txt` 与 `cts-urls-before.txt` diff · 净变化列出
- [ ] Ray 通知 CTS 老板"明日 T-0 切换" · 拿到最终 sign-off
- [ ] Render dashboard 打开 · 确认 rollback 按钮位置

### T-0 · 切换（预计 5 分钟）
1. **T+0 min** · GitHub 合 PR：`claude/cts-ceepii-redesign-96cbba` → `main`（squash merge）
2. **T+1 min** · Render 自动检测 main 有新提交 · 开始 build
3. **T+3~5 min** · Render build 完成 · 生产切到新版
4. **T+5 min** · 手工冒烟测试（Ray 或我）：
   - `/` 打开 · Hero 加载 · CTA 点击有响应
   - `/tours` 加载 · 至少 3 个 tour card 可见
   - 任一 `/tours/[dest]/[tier]/[tour]` 打开 · lead form 显示
   - `/contact` 提交一次 test lead（is_staging=false 但用 test email · Ray 明知）
   - GA4 Realtime 有页面 view · 有 form_submit 事件
5. **T+10 min** · 冒烟测试通过 · 进入 24h monitoring

### rollback（若任何冒烟测试失败）
```bash
# GitHub UI: Revert PR 一键
# 或 CLI:
git revert -m 1 <merge-commit-sha>
git push origin main
# Render 自动重 build · 3-5 分钟回到旧版
```

**触发 rollback 的红线**：
- 冒烟测试任一步失败
- Render build 失败 3 次
- GA4 Realtime 15 分钟无 page_view 事件
- `/tours` 或 `/` 或 `/contact` 任一页 500

---

## 8. 上线后 24h monitoring 清单

### 8.1 正常范围（基于过去 30 天中位数）
> Ray 提供：过去 30 天 GA4 daily active users / lead 提交数 / GSC daily clicks & impressions / Ads conversion count 的中位数。**本节留白，Ray 补齐数据后我填。**

### 8.2 红线（触发即 rollback）
| 指标 | 红线 | 观察工具 |
|---|---|---|
| GA4 daily page_view | < 中位数 × 60% | GA4 Realtime + 24h report |
| lead 提交数 | < 中位数 × 50% | Supabase leads 表 count |
| GSC crawl 错误 | 新增 > 20 条 | GSC Coverage report（次日看） |
| Ads conversion | < 中位数 × 50% | Google Ads 后台 |
| 5xx 错误率 | > 1% | Render logs |
| Lighthouse mobile LCP | > 3.5s | PageSpeed Insights |
| lead form 提交后邮件未发出 | > 5 单 | Resend dashboard + Supabase 反查 |

### 8.3 monitoring 时间点
- **T+1h** · Ray 看 GA4 Realtime + 我看 Render logs 5xx
- **T+3h** · lead 提交数 check
- **T+12h** · GA4 daily 累计 vs 中位数 · Ads conversion check
- **T+24h** · GSC crawl 报告（次日更新）· 全指标复盘 · 出决策：继续、部分回滚、全回滚

---

## 9. Ray 待拍板决策清单

1. **Ceepii 品牌色**是否覆盖现有 `#B61E2E`（中国红）+ `#D6A756`（暖金）？还是保留 CTS 现有色板，Ceepii 视觉风格只吸组件结构？
   - 我的建议：**保留现有色板**（中国红是 CTS 视觉资产），Ceepii 只吸 typography / spacing / motion / component structure
2. **dark mode** 是否引入？Ceepii 有 next-themes，CTS 现为 light-only
   - 我的建议：**不引入** · 加复杂度无 SEO/转化收益
3. **staging 是否 basic auth**（我建议）还是 IP allowlist？
   - basic auth 快 · IP allowlist 更安全但要维护 IP 表
4. **staging 环境是否共享生产 Supabase 库**（用 `is_staging` 字段隔离）还是**新建 staging Supabase project**？
   - 我的建议：**共享生产库**（避免数据分裂 · 更贴近生产行为） · 用 `is_staging` 字段 + 查询点全部过滤
5. **staging 的 Resend 邮件行为**：sandbox mode / 空 KEY / 真发（发到 Ray 邮箱）？
6. **视觉回归工具**是否引入 Percy 或 Chromatic？
   - 收费 · 但 Phase A 换 81 页壳的回归成本没有工具很高。建议至少试用 Percy 免费额度覆盖 Phase A 3 周
7. **Baker Gu / Lisa Li specialist bio** 是否在 Phase B About 页新增内容/照片？还是保留现状？
   - 需要 Ray 从 CTS 老板拿：新 bio 文案 · 新头像照 · 语气统一
8. **Phase C 30+ SEO LP 深度重构**：本次不做（我建议），但需要 Ray 明确"Phase C 何时启动 · 由谁提优先级"
9. **6 周排期节点是否与 Ray 审 PR 节奏一致**？如果 Ray 周末无法审 · 需要调整 W1-W6 周五出 PR 的节奏
10. **上线切换时间窗**：NZT 平日凌晨 or 周末？（NZ 用户流量最低时段是 03:00-06:00 NZT）
11. **图标库**：Ceepii 全用 `@hugeicons/*`（~55 文件）· CTS 全用 `lucide-react`。
    - (a) **保留 lucide** · 迁入时手工换等价（约 3-4 人日）· 单一图标库 · 长期干净 — 我的建议
    - (b) **共存**：装 hugeicons + lucide · 迁移零成本 · 但双库长期维护 · bundle +~150kb
12. **字体**：Ceepii 用 `Google_Sans_Flex` (sans) + `Playfair_Display` (serif) + italic Playfair span 做重音（Ceepii 视觉签名）· CTS 现用 `Inter` + `Playfair Display`。
    - (a) **采纳 Ceepii 字体栈**（sans 换 Google Sans Flex + italic Playfair span）· 视觉一致度高 — 我的建议
    - (b) 保留 CTS 现有 `Inter` · 只吸 Ceepii 组件结构
13. **Tailwind v4 → v3 港工作** 是纳入 Phase 0 patch（我建议 · Phase A 起步前完成 · 组件才能正确渲染）还是拆到 Phase A W1？

---

## 10. PR #1 内容 + Phase 0 执行清单（PR #1 合并后）

### 10.1 PR #1 · docs-only（本次 · Ray 审完 merge）
按 Ray 原话"评估文档做成 markdown 直接放 `docs/redesign/ceepii-assessment.md` 提 PR #1"，PR #1 **只含评估文档 · 无代码改动**：
```
docs/redesign/ceepii-assessment.md    ← 本文件
```
理由：如果 Ray 审后要调方案（组件映射、staging 隔离方式、排期分组等），改文档就够；不用回滚已铺的 basic auth / migration / lead-query 改动。文档定稿 = 后续所有 PR 的契约锚点。

### 10.2 PR #1 合并后 · Phase 0 执行清单（独立 PR #2 · Phase A 起步的前置条件）

**代码 patch（我做）**
1. `docs/redesign/cts-urls-before.txt` — 从生产 sitemap curl 生成的 URL 基线快照
2. `src/middleware.ts` 微改 — 加 staging basic auth 分支（`NEXT_PUBLIC_ENV === 'staging'` 时生效 · 生产零影响）
3. `src/components/GoogleAnalytics.tsx` `src/components/GoogleTagManager.tsx` 微改 — 读 `NEXT_PUBLIC_ENV` 决定用哪个 ID
4. `supabase/migrations/20260829_add_leads_is_staging.sql` — 新增 migration（需 Ray 在 Supabase dashboard apply 或授权我用 supabase CLI）
5. lead 写入点（预计 3-5 处）微改 — 写入时 `is_staging = env === 'staging'`
6. lead 查询点（marketing dashboard / CRM export · 预计 3-5 处）微改 — 查询加 `.eq('is_staging', false)`
7. `.env.example` 增加 `NEXT_PUBLIC_ENV` `NEXT_PUBLIC_GA_ID_STAGING` `NEXT_PUBLIC_GTM_ID_STAGING` `STAGING_USER` `STAGING_PASS` 说明
8. **`tailwind.config.ts` + `src/app/globals.css` 港工作**（约 1 人日 · 详见 §3.5）— Tailwind v4 → v3 · Ceepii radius scale / section-space utility / keyframes / rc-datepicker overrides · 新增 neutral 色系（**不覆盖** CTS 品牌色）· 依 §9 #13 Ray 决策决定是否分到 Phase A W1

**Ray 侧手工操作**（我做不了 · 需 Ray 或 CTS ops）
- Render 新建 staging service · watch `claude/cts-ceepii-redesign-96cbba` 分支 · 配所有 staging env vars
- DNS · `staging.chinatravel.co.nz` CNAME → Render staging service URL
- GA4 · 新建 staging property 拿 measurement ID
- Google Ads · 新建 test conversion action 拿 conversion ID
- Meta Pixel · （可选）新建 test pixel ID
- Resend · 决策 staging 邮件行为（sandbox / 空 KEY / 转发 Ray 邮箱） — 见 §9 决策 #5

**Phase A 起步验收 gate（PR #2 合并 + Ray 侧操作完成后）**
- [ ] `curl -I https://staging.chinatravel.co.nz` 返回 401（未带 basic auth）
- [ ] 带 basic auth 打开 staging 主页 · 返回 200 · 响应头含 `X-Robots-Tag: noindex, nofollow`
- [ ] staging 提交一次 test lead · Supabase `leads` 表出现一行 `is_staging=true`
- [ ] 生产 marketing dashboard / CRM 查询跑一次 · 结果**不含** `is_staging=true` 记录
- [ ] staging GA4 property Realtime 看到 page_view
- [ ] 生产 GA4 Realtime 完全无 staging 流量污染（新旧 property 完全隔离）

**不进任何 Phase 0 PR 的**：Ceepii 组件本体、任何 UI 换壳代码、任何 tailwind config 改动。这些进 Phase A 的 PR（W1 起）。

---

## 附录 A · 完整路由分类总表

*(见 §2 · 已在正文分组列出，此附录留位以便未来查 diff)*

## 附录 B · Ceepii 组件全清单

*(见 §3 · 已按 lift 策略分级列出；本附录留位以便 Phase A/B 执行时对照原路径 · 完整审计原文见本次 PR 讨论)*

- 总量：~130 组件文件（`src/components/` + `src/app/(app)/(listings)/components/`）
- 分级：直接可用 (§3.1) · 页面层抛弃组件层可救 (§3.2) · 需重写 (§3.3)
- 关键依赖矩阵：§3.4

## 附录 C · Phase A 每 PR 通用 checklist

```markdown
## Phase A PR checklist
- [ ] 本 PR 分支基于 main HEAD sha=<xxxxxxx>
- [ ] URL diff（本 PR 涉及路由）与 cts-urls-before.txt 净变化 = 0
- [ ] schema.org JSON-LD 输出未变（抽 3 页 Google Rich Results Test 截图）
- [ ] 4 锚点 (#visa-nudge / #faq / #trust-signals / #planning-resources) 保留
- [ ] tour detail 相关块同步到 /campaigns/october-2026/[slug]（若适用）
- [ ] GA4 Realtime 截图：本 PR 涉及页至少 1 个 gtag 事件 fire
- [ ] GTM Preview 截图：本 PR 涉及 form 至少 1 个 dataLayer push
- [ ] fireLeadConversion 单测 pass
- [ ] Lighthouse mobile 抽 3 页 · LCP < 2.5s
- [ ] staging URL + 视觉截图（旧壳 vs 新壳 side-by-side）
- [ ] 品牌红线：无 "Auckland since 1928" · 无 "6 城美食游"
```

---

**文档结束 · 等 Ray 审 · 别 merge**
