# ChinaTravel Roadmap

## Overview
This roadmap outlines the development phases for ChinaTravel from now through launch and beyond.

---

## Phase 0: Foundation & Testing ✅ Complete
**Completed:** Mar 28 – Apr 3, 2026

- ✅ Next.js 14 setup (App Router, TypeScript)
- ✅ Homepage design (hero, stats, why CTS, expert, destinations, product tiers)
- ✅ Tour listing pages (all tours, by destination, by tier)
- ✅ Tour detail pages with full itinerary
- ✅ Breadcrumb navigation & JSON-LD schema
- ✅ Travel vibe redesign (TourTierCard route strips, StatsCounter labels, homepage polish)
- ✅ Print itinerary feature (separate `/print` route, browser-native)
- ✅ Email itinerary feature (Resend SDK, API route, modal form)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Testimonials section
- ✅ Trust bar & floating CTA

---

## Phase 1: SEO Hub Pages (P1 Priority) 🚧 In Progress
**Target:** Apr 6 – Apr 13, 2026

### 1.1 Foundation Pages (4 pages)
- [ ] `/china-tours` — Commercial hub (all tours, filters, comparison)
  - **File:** `src/app/china-tours/page.tsx`
  - **Schema:** CollectionPage + multiple Tour schemas
  - **Content:** All signature/discovery/stopover tours, destination map, FAQs, comparison table

- [ ] `/beijing-tours` — Destination hub
  - **File:** `src/app/beijing-tours/page.tsx`
  - **Schema:** CollectionPage + 3 Beijing tours
  - **Content:** Beijing overview, 3–5 tours, highlights, best time to visit, visa info

- [ ] `/xian-tours` — Destination hub
  - **File:** `src/app/xian-tours/page.tsx`
  - **Schema:** CollectionPage + 2–3 Xi'an tours

- [ ] `/shanghai-tours` — Destination hub
  - **File:** `src/app/shanghai-tours/page.tsx`
  - **Schema:** CollectionPage

### 1.2 Additional Destination Hubs (3 pages)
- [ ] `/chengdu-tours` — Chengdu destination hub
- [ ] `/guilin-tours` — Guilin destination hub
- [ ] `/zhangjiajie-tours` — Zhangjiajie destination hub
- [ ] `/yunnan-tours` — Yunnan destination hub (covers Kunming, Lijiang, etc.)

### 1.3 New Commercial Pages (2 pages)
- [ ] `/china-tours-from-new-zealand` — NZ-specific landing page
  - **File:** `src/app/china-tours-from-new-zealand/page.tsx`
  - **Schema:** WebPage + LocalBusiness
  - **Content:** Why NZ travellers choose CTS, visa process, flight info, testimonials from NZ clients

- [ ] `/china-tours-from-auckland` — Auckland-specific variant
  - **File:** `src/app/china-tours-from-auckland/page.tsx`
  - **Schema:** WebPage + LocalBusiness

### 1.4 High-Priority Guides (2 pages)
- [ ] `/best-time-to-visit-china` — Seasonal guide
  - **File:** `src/app/best-time-to-visit-china/page.tsx`
  - **Schema:** Article
  - **Content:** Month-by-month breakdown, destination-specific seasons, weather, crowds, prices

- [ ] `/china-visa-guide-for-new-zealanders` — Visa guide
  - **File:** `src/app/china-visa-guide-for-new-zealanders/page.tsx`
  - **Schema:** Article
  - **Content:** Visa types, requirements, processing time, costs, document checklist

**Deliverables:**
- [ ] 12 new pages with unique, original content
- [ ] JSON-LD schema for each (CollectionPage, Article, WebPage)
- [ ] Real tour data from `tours.ts`
- [ ] Internal linking between hub pages
- [ ] Responsive design (mobile-first)
- [ ] All pages deployed and indexed

**Success Metrics:**
- All 12 pages published
- Indexed by Google (search console)
- Average Lighthouse > 85

---

## Phase 2: Destination Guides & Content Expansion 📅 Apr 14 – May 4, 2026
**Target:** 21 destination guide pages (one per destination + sub-destinations)

### 2.1 Major Destination Guides (7 pages)
- [ ] `/beijing-travel-guide` — Comprehensive Beijing guide
- [ ] `/xian-travel-guide` — Xi'an guide
- [ ] `/shanghai-travel-guide` — Shanghai guide
- [ ] `/chengdu-travel-guide` — Chengdu guide
- [ ] `/guilin-travel-guide` — Guilin guide
- [ ] `/zhangjiajie-travel-guide` — Zhangjiajie guide
- [ ] `/yunnan-travel-guide` — Yunnan guide (covers Kunming, Lijiang, Dali)

### 2.2 Sub-Destination Guides (14 pages)
- [ ] `/lijiang-travel-guide` — Lijiang (Yunnan)
- [ ] `/dali-travel-guide` — Dali (Yunnan)
- [ ] `/kunming-travel-guide` — Kunming (Yunnan)
- [ ] `/great-wall-guide` — Great Wall guide
- [ ] ... (10 more TBD based on priority)

**Deliverables:**
- [ ] 21 destination guides with original content
- [ ] Article schema for each
- [ ] High-quality destination images
- [ ] Internal links to related tours
- [ ] FAQs per destination

**Success Metrics:**
- 21 pages published
- 100+ organic keywords ranking
- Average session duration > 2 min

---

## Phase 3: FAQ & Utility Pages 📅 May 5 – May 18, 2026
**Target:** 8 FAQ pages + 2 utility tools

### 3.1 FAQ Pages (8 pages)
- [ ] `/china-tours-faq` — General tour FAQs
- [ ] `/visa-faq` — Visa-related FAQs
- [ ] `/packing-faq` — Packing & preparation FAQs
- [ ] `/travel-insurance-faq` — Travel insurance FAQs
- [ ] ... (4 more TBD)

### 3.2 Utility Tools (2 pages)
- [ ] `/tour-cost-calculator` — Calculate tour cost by options
- [ ] `/best-tour-for-me` — Quiz to recommend tours based on preferences

**Deliverables:**
- [ ] 10 new pages
- [ ] FAQ schema for FAQ pages
- [ ] Interactive tools (quiz, calculator)
- [ ] High engagement UX

**Success Metrics:**
- 8 FAQ pages with 500+ organic impressions
- Calculator tool used 50+ times/month

---

## Phase 4: Optimisation & Beyond 📅 May 19+, 2026

### 4.1 Ongoing Optimisation
- [ ] A/B test CTA buttons (email vs phone vs form)
- [ ] Optimise tour images for Core Web Vitals
- [ ] Expand testimonials section
- [ ] Create seasonal tour promotions
- [ ] Monthly content updates (new guides, tour updates)

### 4.2 Community & Content
- [ ] Blog section (travel tips, client stories)
- [ ] User-generated content (client photos, testimonials)
- [ ] Email newsletter (tours, guides, news)

### 4.3 Advanced Features (if budget permits)
- [ ] User accounts & saved tours
- [ ] Dynamic tour customisation (dates, activities, accommodations)
- [ ] Live chat support
- [ ] Video tours (YouTube integration)
- [ ] Virtual reality previews

---

## Data & Content Checklist

### Tours Data Status
**File:** `src/lib/data/tours.ts`

- [ ] **Imperial Heritage** (`beijing-shanghai`) — ✅ Updated (Apr 3)
- [ ] **Grand Tour** (`grand-tour`) — ⚠️ Needs verification
- [ ] **Beijing & Shanghai** (`beijing-shanghai`) — ⚠️ Needs verification
- [ ] **Essentials** (`essentials`) — ⚠️ Needs verification
- [ ] **Yunnan Explorer** (`yunnan-explorer`) — ⚠️ Needs verification
- [ ] Add/verify additional tours as needed

**To Do:**
- [ ] Verify all tour itineraries against client documents
- [ ] Update prices for 2026
- [ ] Add missing accommodation details
- [ ] Verify departure dates

### Images & Assets Status
- [ ] Hero images for all tours (current: some placeholder)
- [ ] Gallery images (5–8 per tour)
- [ ] Destination header images
- [ ] Guide page banner images

---

## Technical Debt & Improvements

### High Priority
- [ ] Configure Resend API key on Render (requires client action)
- [ ] Test email itinerary end-to-end
- [ ] Audit tours.ts for completeness (missing fields, outdated data)
- [ ] Lighthouse audit (target 90+)

### Medium Priority
- [ ] Consider moving tours data to Supabase (currently static)
- [ ] Add analytics (Google Analytics 4)
- [ ] Add Google Search Console integration
- [ ] Performance monitoring (Sentry)

### Low Priority
- [ ] Refactor large components (Hero, TourItinerary)
- [ ] Extract reusable schema-building utilities
- [ ] Create component storybook

---

## Milestones

| Milestone | Target Date | Status |
|-----------|------------|--------|
| Phase 0 Complete (MVP) | Apr 3 | ✅ Done |
| Phase 1 Complete (12 SEO pages) | Apr 13 | 🚧 In Progress |
| Phase 2 Complete (21 guides) | May 4 | ⏳ Planned |
| Phase 3 Complete (10 FAQ/tools) | May 18 | ⏳ Planned |
| First 100 organic keywords ranking | May 31 | ⏳ Planned |
| 500+ monthly organic users | Jun 30 | ⏳ Target |

---

## Success Criteria (Overall)

1. **SEO:** 54 pages published, 100+ keywords ranking on page 1 of Google
2. **Traffic:** 500+ organic users/month
3. **Conversions:** 5+ qualified enquiries/bookings from organic
4. **Performance:** Lighthouse > 85, Core Web Vitals green
5. **User Experience:** <3s page load, mobile-first, high engagement

---

## Dependencies & Blockers

| Item | Status | Notes |
|------|--------|-------|
| Resend API Key | ⏳ Pending | Client to configure on Render |
| Tour Data Verification | ⏳ Pending | Client to provide/verify all tours |
| Content (Guides) | ⏳ Ready | Outline provided, writing in progress |
| Images | ⚠️ Partial | Some tours missing high-res images |

---

## Contact & Approvals

- **Project Lead:** Zhong
- **Client:** CTS
- **Approval for Phase 1:** ✅ Approved
- **Approval for Phase 2+:** ⏳ Pending
