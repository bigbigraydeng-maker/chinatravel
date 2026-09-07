# ChinaTravel — Claude Code Guidelines

## Project Context

**ChinaTravel** is a luxury China tour operator website for New Zealand travellers. It's built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase. Deployed on Render.

**Repository:** `https://github.com/bigbigraydeng-maker/chinatravel.git`
**Live Site:** `https://www.ctstours.co.nz/`
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase + Resend (email)

---

## Behavioral Rules (12-rule framework)

These rules apply to every task unless explicitly overridden.
**Bias: caution over speed on non-trivial work.**

**Rule 1 — Think Before Coding**
State assumptions explicitly. If uncertain, ask rather than guess.
Present multiple interpretations when ambiguity exists.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

**Rule 2 — Simplicity First**
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
Test: would a senior engineer say this is overcomplicated? If yes, simplify.

**Rule 3 — Surgical Changes**
Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

**Rule 4 — Goal-Driven Execution**
Define success criteria. Loop until verified.
Don't follow steps mechanically. Define success and iterate.
Strong success criteria let you loop independently.

**Rule 5 — Use the model only for judgment calls**
Use AI for: classification, drafting, summarization, extraction.
Do NOT use AI for: routing, retries, deterministic transforms.
If code can answer, code answers.

**Rule 6 — Token budgets are not advisory**
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.
Surface the breach. Do not silently overrun.

**Rule 7 — Surface conflicts, don't average them**
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup.
Don't blend conflicting patterns.

**Rule 8 — Read before you write**
Before adding code, read exports, immediate callers, shared utilities.
"Looks orthogonal" is dangerous. If unsure why code is structured a way, ask.

**Rule 9 — Tests verify intent, not just behavior**
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

**Rule 10 — Checkpoint after every significant step**
Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back.
If you lose track, stop and restate.

**Rule 11 — Match the codebase's conventions, even if you disagree**
Conformance > taste inside the codebase.
If you genuinely think a convention is harmful, surface it. Don't fork silently.

**Rule 12 — Fail loud**
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.

---

## Key Rules

### 1. Confirm Project Context
Before making any changes, always confirm you are working on **ChinaTravel** and not another project (StockQueen, YellowBook, Car Scout, etc.).

### 2. Routes & Data Structure
- **Dynamic routes:** `src/app/tours/[destination]/[tier]/[tour]/page.tsx`
- **Data accessor:** `getTourBySlug(destination, tier, slug)` from `src/lib/data/tours.ts`
- **Tour interface:** See tours.ts for `Tour` and `DayItinerary` structure
- **Destinations:** beijing, xian, shanghai, chengdu, guilin, zhangjiajie, yunnan
- **Tiers:** signature, discovery, stopover
- **October campaign Discovery slugs (canonical paths):** `beijing-xian` = *A Tale of Two Cities* (Beijing + Xi’an only — **no Shanghai**). `shanghai-surroundings` = *Shanghai & Surroundings* (not “Beyond”). Legacy URLs `/tours/china/discovery/beijing-shanghai` and `.../shanghai-beyond` **308** to these paths (`next.config.js`).
- **Tour page vs October campaign LP — keep public UI in sync:** The standard product template is `src/app/tours/[destination]/[tier]/[tour]/page.tsx`. The ad/landing URLs are `src/app/campaigns/october-2026/[slug]/page.tsx` (data wired via `src/lib/campaigns/october-2026-discovery.ts`). **Whenever you add or change shared blocks on the tour page** — e.g. `ChinaVisaNudge` (`#visa-nudge`), `TrustBar`, `TourTrustSignals` (`#trust-signals`), `TourSupportingContentLinks` (“Plan your trip”, `#planning-resources`), or October-specific `TourHero` CTA copy — **apply the same to the October campaign page** in the same order after the hero, unless there is a short explicit note in the PR/commit explaining a deliberate exception. Campaign-only content (`OctoberDiscoveryCampaignContent`, breadcrumb note, canonical/UTM copy, `enquirySource`) stays on the LP only.

- **Shared-blocks contract is now CI-enforced** (Phase 0 v3.1 §4.7). The canonical list lives in [src/__tests__/shared-blocks.test.ts](src/__tests__/shared-blocks.test.ts) and is asserted against the tour detail page **plus all three campaign LPs** — `/campaigns/october-2026/[slug]`, `/campaigns/fire-fuzz`, `/campaigns/best-of-china`. Dropping a shared component from any consumer, or forking a fourth copy of the pattern without adding it to the list, turns the tests red. If you deliberately change the canonical set, edit the `SHARED_BLOCKS` array first — the test will then flag every page that needs to catch up.

- **Four anchor ids are now unit-tested** (Phase 0 v3.1 §4.9): `#visa-nudge`, `#faq`, `#trust-signals`, `#planning-resources`. See [src/__tests__/anchors.test.tsx](src/__tests__/anchors.test.tsx). Renaming or removing an anchor without updating the test surfaces the regression on the next `npm test` instead of on staging.

- **Staging isolation (`staging.chinatravel.co.nz`)** — Phase 0 v3.1 §4. When `NEXT_PUBLIC_ENV=staging`, [src/middleware.ts](src/middleware.ts) gates every request behind basic auth (except `/api/*`, `/_next/*`, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`), falls through to the existing marketing / admin gates on success, and stamps `X-Robots-Tag: noindex, nofollow` on every response. Tracking IDs resolve through [src/lib/env.ts](src/lib/env.ts) (`getGaId()`, `getGtmId()`) so staging never writes to the production GA4 / GTM properties. There is no `is_staging` database column — CTS has no lead-storage tables; lead flow is Resend-only, and staging runs with an empty `RESEND_API_KEY` so lead emails silently no-op. Never set `REDIRECT_ONRENDER_HOST` on the staging Render service — it consumes the host-typed redirect in `next.config.js` and 308s staging to production.

- **React 18 peer check:** [scripts/verify-react-peers.mjs](scripts/verify-react-peers.mjs) (`npm run verify:peers`) reads `peerDependencies.react` on installed Ceepii-target deps (`@headlessui/react`, `motion`, `radix-ui`, `next-themes`, `react-datepicker`, `embla-*`, `@hugeicons/*`, etc.) and fails when a range does not include 18. Add new Ceepii deps to the `TARGETS` list when you introduce them in Phase A.

### 3. Component Locations
```
src/components/
  ├── Hero.tsx                          # Homepage hero + search
  ├── StatsCounter.tsx                  # 4 stat cards
  ├── FeatureCard.tsx                   # Why CTS section (4 cards)
  ├── tours/
  │   ├── TourHero.tsx                  # Tour header
  │   ├── TourHighlights.tsx            # 4-6 highlights
  │   ├── TourItinerary.tsx             # Day-by-day itinerary (Map view + Detailed view when route inferable)
  │   ├── ItineraryRouteSchematic.tsx   # SVG schematic China map + route (derived from itinerary text)
  │   ├── ItineraryActions.tsx          # Print/Email buttons
  │   ├── ItineraryEmailModal.tsx       # Email form
  │   ├── TourInclusions.tsx            # Inclusions/Exclusions
  │   ├── TourGallery.tsx               # Image gallery
  │   └── RelatedTours.tsx              # 3 related tours
  ├── Testimonials.tsx                  # Client testimonials
  ├── TourTierCard.tsx                  # Product card with route strip
  ├── FAQSection.tsx                    # Tour FAQs
  ├── FloatingCta.tsx                   # Mobile floating button
  └── ... (other components)
```

### 4. Styling & Design
- **Tailwind CSS** with custom tokens:
  - `primary` (warm orange/amber)
  - `secondary` (accent green/teal)
  - `accent` (dark navy)
  - `warm-50`, `warm-100`, `warm-200` (beige tones)
- **Font:** Serif for headings, sans-serif for body
- **Print-safe CSS:** Inline styles in `/print` routes, avoid Tailwind for print

### 5. API Routes
- **Email API:** `src/app/api/send-itinerary/route.ts`
  - **Critical:** Resend must be instantiated INSIDE the POST handler, never at module level (prevents build-time crash)
  - Example: `const resend = new Resend(process.env.RESEND_API_KEY);` inside handler function
- **Environment variable:** `RESEND_API_KEY` (not yet configured on Render)
- **Marketing hub:** `/marketing` — placeholder for future site-wide ops/SEO board. **October campaign board:** `/marketing/campaign` — optional password via `MARKETING_PLAN_ACCESS_KEY` (min 12 chars); login at `/marketing/campaign/login`; cookie path is campaign-only. Old `/marketing-plan` 308s to `/marketing/campaign`.
- **Marketing tasks — `reviewLinks` (验收链接):** In `src/lib/data/marketing-plan-2026.ts`, any task whose deliverable is visible on the public site (e.g. T006 免签模块、产品页、签证指南) should include optional `reviewLinks: { label, href }[]` so the campaign board「今日 W1」can deep-link to `#visa-nudge`, `#faq`, product URLs, etc. Add anchors on components when needed (`ChinaVisaNudge` → `id="visa-nudge"`, `FAQSection` → `id="faq"`).

### 6. Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=re_... (will be configured later)
# Optional: password-protect /marketing/campaign (Render: set as secret)
# MARKETING_PLAN_ACCESS_KEY=long-random-string-at-least-12-chars
```

### 7. Git Workflow

**Branch strategy: feature branch → PR → merge to main**

- **Never push directly to main.** Always work on a short-lived branch.
- **Branch naming:**
  - `feat/<short-description>` — new features
  - `fix/<short-description>` — bug fixes
  - `refactor/<short-description>` — refactoring / cleanup
  - `chore/<short-description>` — non-code changes (docs, deps)
- **Flow:**
  1. `git checkout -b feat/my-feature` — create branch from latest main
  2. Make commits (conventional format, see below)
  3. `git push -u origin feat/my-feature`
  4. `gh pr create` — open PR targeting main
  5. Merge via GitHub PR (squash merge preferred for clean history)
  6. Delete branch after merge
- **Auto-deploy:** Render watches **main** branch; only merged PRs trigger deploy
- **Commit format:** Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- **Commit message:** English, but user may request Chinese responses in chat

### 8. Feature Flags
- **Print itinerary:** Uses browser-native `window.print()` + separate `/print` route (no third-party PDF library)
- **Email itinerary:** Resend email SDK; modal form collects name + email
- **Schema.org:** All tour pages have JSON-LD schema (product, tour, breadcrumb, FAQ)

### 9. Testing & Build
- **Run tests:** `npm test`
- **Build locally:** `npm run build`
- **Start dev:** `npm run dev`
- **Common issues:**
  - Build fails if Resend instantiated at module level → move inside handler
  - Tours data must exist in `tours.ts` before pages render
  - Missing images cause build errors → use placeholder until assets available

### 10. Chat Language
- **Default:** 中文（所有输出必须用中文，包括分析、报告、说明、代码注释建议等）
- **Exception:** Code itself stays in English (variable names, function names, comments in code files)
- **Instruction:** All Cowork-side responses, specs, plans, QA reports must be written in Chinese

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev on :3010 (bind 0.0.0.0 — use http://127.0.0.1:3010 if localhost fails)
npm run dev:alt          # Alternate port :3055 if 3010 is blocked or in use
npm run build            # Build for production
npm test                 # Run test suite

# Git (feature branch workflow)
git checkout -b feat/my-feature   # Create feature branch
git status                        # Check staged/unstaged files
git diff HEAD                     # See uncommitted changes
git log --oneline -10             # Last 10 commits
git push -u origin feat/my-feature  # Push branch + set upstream
gh pr create                      # Open PR targeting main (triggers deploy on merge)

# Exploration
find src -name "*itinerary*" -type f   # Find itinerary-related files
grep -r "getTourBySlug" src/           # Find usages of data accessor
```

---

## Common Tasks

### Add a new tour
1. Add entry to `tours.ts` with all required fields (name, slug, duration, price, itinerary, etc.)
2. Verify `getTourBySlug()` returns tour on tour detail page
3. Test print and email features end-to-end
4. Commit: `feat: add [tour-name] tour`

### Update tour data
1. Edit `tours.ts` entry (itinerary, inclusions, price, etc.)
2. Set `updatedAt: 'YYYY-MM-DD'`
3. Commit: `feat: update [tour-name] data`

### Create a new SEO page
1. Create `/src/app/[slug]/page.tsx` with metadata + JSON-LD schema
2. Use `getTourBySlug()` or list helpers to fetch real tour data
3. Write original content (no AI-generated placeholder text)
4. Test metadata in browser DevTools
5. Commit: `feat: add [page-name] SEO page`

### Debug build failure
1. Check error message for file path
2. If "Failed to collect page data" → likely Resend or missing data
3. Verify environment variables are set in Render
4. Try `npm run build` locally to reproduce

---

## Current Status

**历史完成记录搬家了。** 这里以前直接堆着每个 Phase 的完成记录（从 2026-04 堆到 2026-08），每次开窗口都要整篇读一遍，大多跟当前任务无关。现在完整历史在 [docs/archive/CLAUDE_STATUS_LOG.md](docs/archive/CLAUDE_STATUS_LOG.md)（按日期从新到旧）——**这里没找到的历史细节，先去那份文件翻，再判断是不是真没记录过。**

新完成的阶段直接写进那份归档文件最上面，不要写回这里；这里只留最新一条摘要。有一个按月跑的自动维护任务（cron routine，见仓库根目录外部配置）会检查这里有没有堆积，堆了就搬过去、开 PR 等人工确认——不会自动合并到 main。

### 最新一条（详见归档文件）

**2026-09-07 · Phase 11: 三个团标 Sold Out（PR #172）** —— CTS 员工反馈客户还在对已卖光的团下单，拉掉 `tours.ts` 里的卖光日期，5 处界面（主产品页/广告落地页/海报页/hero按钮文案/数据本身）同步加 Sold Out 提示。

---

## 图片管理工作流（2026-04-13 建立）

### 图片来源优先级

| 优先级 | 来源 | 用途 | 存储位置 |
|--------|------|------|---------|
| 1 | 自拍 / 专业摄影 | 团队照片、景区独拍 | Supabase `migrated/site/` |
| 2 | Unsplash CDN | 景点、风景、旅行氛围 | Supabase `migrated/unsplash/` |
| 3 | Pexels / Pixabay | Plan B，需检查 license | 迁移到 Supabase 后使用 |

### Zhong 自己更新图片的流程

**步骤 1：在 Unsplash 找图**
- 搜索关键词（英文），如 `chongqing gorge`, `three gorges yangtze`
- 找到满意图片后，从 URL 复制 **Photo ID**
  - 示例：`https://unsplash.com/photos/photo-xyz123abc` → ID 为 `photo-xyz123abc`

**步骤 2：告诉 Claude**
```
更新 [页面名称] hero 图片，用 photo-xyz123abc
```

**步骤 3：Claude 自动执行**
1. 验证 photo ID 在 Supabase 是否存在（HTTP 200）
2. 在 `tours.ts` 或 `guides.ts` 更新 `migratedUnsplash('photo-xyz123abc')`
3. `npm run build` 验证 → git commit → git push → Render 自动部署

### 图片命名规范

```
✅ Unsplash:   photo-1506905925346-21bda4d32df4.jpg   （用原始 Photo ID）
✅ 自拍:       chongqing-three-gorges-landscape.jpg    （地点-主体-类型）
✅ 团队:       lisa-li-portrait.jpg                   （姓名-类型）
❌ 避免:       image1.jpg, photo.jpg, IMG_1234.JPG
```

### 图片规格标准

| 用途 | 最小宽度 | 宽高比 | 最大文件大小 |
|------|---------|--------|------------|
| Hero 图（桌面） | 1200px | 16:9 | 300KB |
| 团队照片 | 432px | 3:4 | 100KB |
| Guide 缩略图 | 400px | 1:1 | 80KB |

### credentials 图片位置

- 其他 credentials（TAANZ、IATA 等）：`Supabase migrated/site/credentials-*.png`
- TIA logo：`src/public/credentials-tia.png`（本地 public，待迁移至 Supabase）
- 来源：https://www.tia.org.nz/assets/Uploads/TIA_Logo_Colour-Full-website-v2.png

---

## 行程路线地图组件（ItineraryRouteSchematic）

**文件位置：** `src/components/tours/ItineraryRouteSchematic.tsx`
**数据来源：** `src/lib/itinerary-map/extractRouteFromItinerary.ts`

### 城市坐标系（viewBox 1000×640）

```typescript
// CITY_SCHEMATIC_POS 中的关键坐标
beijing:    { x: 540, y: 260 }  // 北部
xian:       { x: 470, y: 320 }  // 中北部
shanghai:   { x: 720, y: 380 }  // 东部
guilin:     { x: 560, y: 480 }  // 南部
chengdu:    { x: 410, y: 400 }  // 西南部
kunming:    { x: 340, y: 500 }  // 西南端

// 全部城市范围：X: 340–720, Y: 260–500
// ChinaSilhouette 路径须覆盖此范围
```

### ⚠️ 已知问题 & 注意事项

1. **上海附近路线城市密集**（上海、苏州、无锡、杭州坐标间距 <30px），标签容易重叠
2. **ChinaSilhouette 路径调整历史**：经过多次迭代，目前用直接坐标路径（不用 transform scaling），bbox 约 X:259–804, Y:193–532
3. **修改轮廓路径时**，必须确保路径在 viewBox 坐标中覆盖 X:320–760, Y:190–520
4. **调试方法**（浏览器控制台）：
```javascript
// 测量轮廓和城市的实际 viewBox 坐标
const svg = document.querySelector('svg[role="img"]');
const scale = svg.getBoundingClientRect().width / 1000;
svg.querySelectorAll('circle[r="14"]').forEach(c => {
  const r = c.getBoundingClientRect();
  const svgR = svg.getBoundingClientRect();
  console.log('city:', Math.round((r.x+r.width/2-svgR.x)/scale), Math.round((r.y+r.height/2-svgR.y)/scale));
});
```

---

## Next Steps

1. ✅ Establish project documentation (this file + project.md, roadmap.md, changelog.md)
2. ✅ Audit live website for missing pages
3. ✅ Verify tours.ts data completeness
4. ✅ Implement Phase 1 SEO pages (12 pages: COMPLETE)
5. ✅ Implement Phase 2 SEO pages (21 destination guides: COMPLETE)
6. ✅ Phase 5.1: 图片加载永久修复 (694 images, 100% success)
7. ✅ Phase 5.2: 导航和按钮加载状态改进 (tour card + navbar feedback)
8. ✅ Phase 8 QA: 21 个指南页面全面审核 (2026-04-24, 0 critical issues)
9. ✅ Phase 9: 20 个指南 metaDescription SEO 优化至 160-190 字符 (2026-05-06)
10. ⏳ Set up Google Analytics 4 tracking
11. ⏳ Create Google Ads campaigns (high-intent keywords)
12. ✅ Configure Resend API key on Render (2026-05-12)
13. ✅ Test email itinerary end-to-end (2026-05-12 — Sent + Delivered 验证通过)
14. ⏳ Implement Phase 3 & 4 SEO pages (20 pages: FAQ + tools)

---

## Contact

**Client:** CTS (China Travel Service)
**Designer/Owner:** [Zhong]
**Deploy:** Render (auto from main branch)
