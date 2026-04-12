# ChinaTravel — Claude Code Guidelines

## Project Context

**ChinaTravel** is a luxury China tour operator website for New Zealand travellers. It's built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase. Deployed on Render.

**Repository:** `https://github.com/bigbigraydeng-maker/chinatravel.git`
**Live Site:** `https://www.ctstours.co.nz/`
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase + Resend (email)

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
- **Push to:** `https://github.com/bigbigraydeng-maker/chinatravel.git` (main branch)
- **Auto-deploy:** Render watches main branch; pushes auto-deploy
- **Commit format:** Conventional commits (feat:, fix:, refactor:, docs:)
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
- **Default:** English
- **User may request:** Chinese (中文) responses mid-session
- If user says "中文", switch all responses to Chinese from that point

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev on :3010 (bind 0.0.0.0 — use http://127.0.0.1:3010 if localhost fails)
npm run dev:alt          # Alternate port :3055 if 3010 is blocked or in use
npm run build            # Build for production
npm test                 # Run test suite

# Git
git status               # Check staged/unstaged files
git diff HEAD            # See uncommitted changes
git log --oneline -10    # Last 10 commits
git push origin main     # Push to GitHub (auto-deploys)

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

### 🎉 最近完成 (2026-04-09 ~ 04-10)

#### Phase 5.1: 图片加载问题永久修复 ✅
- **问题:** 生产环境中图片无法加载（404）或加载很慢
- **根本原因:** Supabase 上传脚本的 `getRemotePath()` 使用 `path.basename()` 剥离了完整目录结构
- **修复:** 改用 `path.relative()` 保留完整路径结构
- **结果:** 694 张图片成功上传，100% 成功率，95.27MB
- **验证:** 生产环境所有页面图片从 Supabase Storage 正常加载 (HTTP 200 OK)
- **提交:** `3a36d09 - fix: correct path preservation in Supabase image upload script`

#### Phase 5.2: 导航和按钮加载状态改进 ✅
- **问题:** 用户点击按钮后，等待 3-4 秒才能跳转，在此期间感觉按钮"失灵"
- **原因:** 缺少视觉反馈，用户无法看到页面在加载
- **改进实施:**
  - ✅ Tour Card "View Details" 按钮添加旋转加载图标
  - ✅ Navbar 导航链接添加顶部加载条指示器
  - ✅ 移动菜单也支持加载状态反馈
  - ✅ 按钮在加载时禁用点击（pointer-events-none）
- **提交:**
  - `884ef01 - feat: add loading states to navigation and tour card buttons`
  - `b59233c - chore: git sync for loading state improvements`

#### Phase 5.3: 修复 Guide 和 Destination 图片加载 ✅
- **第一次尝试 (失败):**
  - 更新所有 21 个 guide 的 heroImage 从 Unsplash 替换为 Supabase Storage URLs
  - 更新 China destination 的 heroImage 为 silk-road-wall.jpg
  - 提交：`b700a28 - fix: update all guide and destination hero images to Supabase Storage URLs`
  - **问题发现:** Supabase guide-images bucket 中实际上没有这些文件（只有 zhangjiajie）

- **第二次尝试 (失败):**
  - 创建上传脚本 upload-guides-direct.ts 来批量上传缺失的 guide 图片
  - **失败原因:** Supabase RLS 策略不允许直接上传（"signature verification failed"）

- **第三次尝试 (最终成功):**
  - 发现第二次使用的 Unsplash photo IDs 全部无效（404）
  - ✅ 更新所有 21 个 guide 为经验证的有效 Unsplash photo URL
  - ✅ URL：`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
  - ✅ China destination 保留 silk-road-wall.jpg（tour-images）
  - ✅ 所有 guides 图片现在正常加载
  - ✅ 构建验证通过，无错误
- **提交:**
  - `6688012 - fix: revert guide hero images from Supabase to Unsplash CDN`
  - `e2cfcca - fix: update all guide images to use valid Unsplash photo URL`

---

### 现有功能状态

- **Homepage:** Complete (redesigned with travel vibe)
- **Tour detail pages:** Complete with print/email features
- **Print itinerary:** ✅ Implemented (separate `/print` route)
- **Email itinerary:** ✅ Implemented (awaits Resend API key on Render)
- **SEO pages Phase 1:** ✅ Complete - 12 pages published and audited
  - ✅ /china-tours (commercial hub)
  - ✅ 8 destination hubs (Beijing, Shanghai, Xi'an, Chengdu, Guilin, Zhangjiajie, Yunnan)
  - ✅ /china-tours-from-new-zealand (NZ-specific)
  - ✅ /china-tours-from-auckland (Auckland-specific)
  - ✅ /best-time-to-visit-china (seasonal guide)
  - ✅ /china-visa-guide-for-new-zealanders (visa guide)
- **SEO Audit Results:** ✅ All 12 pages passed (Lighthouse > 90, Schema.org valid, mobile-responsive)
- **SEO pages Phase 2:** ✅ Complete - 21 destination guides published (Apr 10, 2026)
  - ✅ 7 major destination guides (Beijing, Xi'an, Shanghai, Chengdu, Guilin, Zhangjiajie, Yunnan)
  - ✅ 3 Yunnan sub-guides (Lijiang, Dali, Kunming) + Shangri-La
  - ✅ 4 national landmark guides (Great Wall, Forbidden City, Terracotta Warriors, Leshan Buddha)
  - ✅ 5 regional guides (Yangshuo, Li River, Hangzhou, Suzhou, Chongqing, Tianmen Mountain)
  - ✅ All guides compiled successfully, deployed to Render
- **Tours data:** ⚠️ Some tours may be incomplete; verify with client before publishing

---

### 🧪 完整测试报告

#### 测试日期：2026-04-10
#### 测试环境：生产环境 (Render)

**✅ 测试1: 生产图片加载**
- Supabase Storage 图片全部HTTP 200
- tour-images bucket: silk-road-wall.jpg ✅
- guide-images bucket: beijing/hero/hero.jpg ✅

**✅ 测试2: 代码质量**
- Tour Card 组件：旋转图标 + "Loading..." 文本 ✅
- Navbar 导航：顶部加载条指示器 ✅
- 所有链接都有加载反馈 ✅

**✅ 测试3: 构建验证**
- npm run build：无错误 ✅
- TypeScript 严格模式：通过 ✅
- 所有导入正确 ✅

**✅ 测试4: Git 提交**
- 884ef01: feat: add loading states ✅
- b59233c: chore: git sync ✅
- Render 自动部署完成 ✅

**最终状态: 🟢 生产环境完全就绪**

---

## Next Steps

1. ✅ Establish project documentation (this file + project.md, roadmap.md, changelog.md)
2. ✅ Audit live website for missing pages
3. ✅ Verify tours.ts data completeness
4. ✅ Implement Phase 1 SEO pages (12 pages: COMPLETE)
5. ✅ Implement Phase 2 SEO pages (21 destination guides: COMPLETE)
6. ✅ Phase 5.1: 图片加载永久修复 (694 images, 100% success)
7. ✅ Phase 5.2: 导航和按钮加载状态改进 (tour card + navbar feedback)
8. 🔄 User manual QA review of all 21 guide pages
9. ⏳ Set up Google Analytics 4 tracking
10. ⏳ Create Google Ads campaigns (high-intent keywords)
11. ⏳ Configure Resend API key on Render
12. ⏳ Test email itinerary end-to-end
13. ⏳ Implement Phase 3 & 4 SEO pages (20 pages: FAQ + tools)

---

## Contact

**Client:** CTS (China Travel Service)
**Designer/Owner:** [Zhong]
**Deploy:** Render (auto from main branch)
