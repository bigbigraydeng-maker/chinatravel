# ChinaTravel — Claude Code Guidelines

## Project Context

**ChinaTravel** is a luxury China tour operator website for New Zealand travellers. It's built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase. Deployed on Render.

**Repository:** `https://github.com/bigbigraydeng-maker/chinatravel.git`
**Live Site:** `https://chinatravel-zloe.onrender.com/`
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

### 3. Component Locations
```
src/components/
  ├── Hero.tsx                          # Homepage hero + search
  ├── StatsCounter.tsx                  # 4 stat cards
  ├── FeatureCard.tsx                   # Why CTS section (4 cards)
  ├── tours/
  │   ├── TourHero.tsx                  # Tour header
  │   ├── TourHighlights.tsx            # 4-6 highlights
  │   ├── TourItinerary.tsx             # Day-by-day itinerary
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

### 6. Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=re_... (will be configured later)
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
npm run dev              # Start dev server on :3000
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
- **Tours data:** ⚠️ Some tours may be incomplete; verify with client before publishing

---

## Next Steps

1. ✅ Establish project documentation (this file + project.md, roadmap.md, changelog.md)
2. ✅ Audit live website for missing pages
3. ✅ Verify tours.ts data completeness
4. ✅ Implement Phase 1 SEO pages (12 pages: COMPLETE)
5. 🚧 Implement Phase 2 SEO pages (21 destination guides)
6. ⏳ Configure Resend API key on Render
7. ⏳ Test email itinerary end-to-end
8. ⏳ Implement Phase 3 & 4 SEO pages (20 pages: FAQ + tools)

---

## Contact

**Client:** CTS (China Travel Service)
**Designer/Owner:** [Zhong]
**Deploy:** Render (auto from main branch)
