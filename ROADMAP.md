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

## Phase 1: SEO Hub Pages (P1 Priority) ✅ Complete
**Completed:** Apr 6 – Apr 8, 2026

### 1.1 Foundation Pages (4 pages)
- [x] `/china-tours` — Commercial hub (all tours, filters, comparison) ✅
  - **File:** `src/app/china-tours/page.tsx`
  - **Schema:** CollectionPage + multiple Tour schemas
  - **Content:** All signature/discovery/stopover tours, destination map, FAQs, comparison table

- [x] `/beijing-tours` — Destination hub ✅
  - **File:** `src/app/beijing-tours/page.tsx`
  - **Schema:** CollectionPage + 3 Beijing tours
  - **Content:** Beijing overview, 3–5 tours, highlights, best time to visit, visa info

- [x] `/xian-tours` — Destination hub ✅
  - **File:** `src/app/xian-tours/page.tsx`
  - **Schema:** CollectionPage + 2–3 Xi'an tours

- [x] `/shanghai-tours` — Destination hub ✅
  - **File:** `src/app/shanghai-tours/page.tsx`
  - **Schema:** CollectionPage

### 1.2 Additional Destination Hubs (4 pages)
- [x] `/chengdu-tours` — Chengdu destination hub ✅
- [x] `/guilin-tours` — Guilin destination hub ✅
- [x] `/zhangjiajie-tours` — Zhangjiajie destination hub ✅
- [x] `/yunnan-tours` — Yunnan destination hub (covers Kunming, Lijiang, etc.) ✅

### 1.3 New Commercial Pages (2 pages)
- [x] `/china-tours-from-new-zealand` — NZ-specific landing page ✅
  - **File:** `src/app/china-tours-from-new-zealand/page.tsx`
  - **Schema:** WebPage + LocalBusiness
  - **Content:** Why NZ travellers choose CTS, visa process, flight info, testimonials from NZ clients

- [x] `/china-tours-from-auckland` — Auckland-specific variant ✅
  - **File:** `src/app/china-tours-from-auckland/page.tsx`
  - **Schema:** WebPage + LocalBusiness

### 1.4 High-Priority Guides (2 pages)
- [x] `/best-time-to-visit-china` — Seasonal guide ✅
  - **File:** `src/app/best-time-to-visit-china/page.tsx`
  - **Schema:** Article
  - **Content:** Month-by-month breakdown, destination-specific seasons, weather, crowds, prices

- [x] `/china-visa-guide-for-new-zealanders` — Visa guide ✅
  - **File:** `src/app/china-visa-guide-for-new-zealanders/page.tsx`
  - **Schema:** Article
  - **Content:** Visa types, requirements, processing time, costs, document checklist

**Deliverables:** ✅ All Complete
- [x] 12 new pages with unique, original content
- [x] JSON-LD schema for each (CollectionPage, Article, WebPage)
- [x] Real tour data from `tours.ts`
- [x] Internal linking between hub pages
- [x] Responsive design (mobile-first)
- [x] All pages deployed and indexed

**Success Metrics:** ✅ All Achieved
- [x] All 12 pages published
- [x] Indexed by Google (search console)
- [x] Average Lighthouse > 90 (100/100 achieved)

---

## Phase 2: Destination Guides & Content Expansion 📅 Apr 9 – Apr 29, 2026
**Target:** 21 comprehensive destination guide pages (major destinations + sub-destinations)

### 2.1 Major Destination Guides (7 pages)
- [ ] `/beijing-travel-guide` — Comprehensive Beijing guide (Things to do, where to stay, getting around)
  - **Content:** Great Wall, Forbidden City, Summer Palace, Temple of Heaven, local cuisine
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Beijing travel guide", "things to do in Beijing", "Beijing attractions"

- [ ] `/xian-travel-guide` — Xi'an guide (Terracotta Warriors, City Walls, Tang Dynasty)
  - **Content:** Terracotta Army, Ancient City Wall, Big Wild Goose Pagoda, local tours
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Xi'an travel guide", "Terracotta Warriors", "ancient Xi'an"

- [ ] `/shanghai-travel-guide` — Shanghai guide (Modern metropolis, The Bund, cuisine)
  - **Content:** The Bund, Yu Garden, French Concession, Jing'an Temple, shopping districts
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Shanghai travel guide", "The Bund", "Shanghai attractions"

- [ ] `/chengdu-travel-guide` — Chengdu guide (Giant Pandas, Spicy Cuisine, Culture)
  - **Content:** Giant Panda Base, Wenshu Monastery, Kuanzhai Xiangzi, local hotpot
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Chengdu travel guide", "giant pandas", "Chengdu attractions"

- [ ] `/guilin-travel-guide` — Guilin guide (Karst Mountains, Li River, Landscape)
  - **Content:** Li River Cruise, Karst peaks, Reed Flute Cave, Cormorant fishing
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Guilin travel guide", "Li River Cruise", "karst landscape"

- [ ] `/zhangjiajie-travel-guide` — Zhangjiajie guide (Avatar Mountains, Glass Bridge)
  - **Content:** Zhangjiajie National Forest Park, glass bridge, scenic viewpoints
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Zhangjiajie travel guide", "Avatar mountains", "glass bridge"

- [ ] `/yunnan-travel-guide` — Yunnan region guide (Lijiang, Dali, Kunming)
  - **Content:** Overview of Yunnan region, three cities, ethnic minorities, trekking
  - **Schema:** Article + LocalBusiness
  - **Target keywords:** "Yunnan travel guide", "Lijiang Dali Kunming"

### 2.2 Sub-Destination Guides (14 pages)

**Yunnan Sub-Guides (5 pages):**
- [ ] `/lijiang-travel-guide` — Lijiang (Old Town, ethnic culture, Jade Dragon Snow Mountain)
- [ ] `/dali-travel-guide` — Dali (Erhai Lake, local art scene, Buddhist temples)
- [ ] `/kunming-travel-guide` — Kunming (Spring City, Stone Forest, flower markets)
- [ ] `/tiger-leaping-gorge-guide` — Tiger Leaping Gorge (trekking, natural wonders)
- [ ] `/yuanyang-rice-terraces-guide` — Yuanyang Rice Terraces (landscapes, photography)

**National Landmark Guides (4 pages):**
- [ ] `/great-wall-guide` — Comprehensive Great Wall guide (history, sections, how to visit)
- [ ] `/forbidden-city-guide` — Forbidden City guide (palace architecture, history, tours)
- [ ] `/terra-cotta-warriors-guide` — Terracotta Army guide (discovery, museum, tours)
- [ ] `/summer-palace-guide` — Summer Palace guide (imperial gardens, Kunming Lake)

**Regional Guides (5 pages):**
- [ ] `/silk-road-travel-guide` — Silk Road historical route guide
- [ ] `/yangshuo-travel-guide` — Yangshuo guide (cycling, rock climbing, rural life)
- [ ] `/longji-rice-terraces-guide` — Longji Rice Terraces guide (Guilin region)
- [ ] `/hong-kong-day-trip-guide` — Hong Kong connection (from China tours)
- [ ] `/macau-day-trip-guide` — Macau connection (from China tours)

**Deliverables:**
- [ ] 21 destination guides with 2000+ words each
- [ ] Article + LocalBusiness schema for each
- [ ] High-quality destination images (8–10 per guide)
- [ ] Internal links to related tours (cross-linking)
- [ ] Destination-specific FAQs
- [ ] Maps, practical info (hours, entry fees, best time to visit)
- [ ] Videos embedded (YouTube travel content)

**Success Metrics:**
- [ ] All 21 pages published by Apr 29
- [ ] 100+ organic keywords ranking
- [ ] Average session duration > 2 min
- [ ] Organic traffic increase > 50%

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
| Phase 0 Complete (MVP) | Apr 3 | ✅ Complete |
| Phase 1 Complete (12 SEO pages) | Apr 8 | ✅ Complete |
| Phase 1 SEO Audit | Apr 8 | ✅ Complete (100/100 score) |
| Phase 2 Complete (21 guides) | Apr 29 | 🚧 In Progress |
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
| Phase 1 Delivery | ✅ Complete | 12 pages published and audited |
| Resend API Key | ⏳ Pending | Client to configure on Render (for email feature) |
| Tour Data Verification | ✅ Verified | Tours data confirmed in Phase 1 |
| Content (Phase 2 Guides) | 🚧 Ready | 21 guide outlines prepared, writing starting |
| Images (Destination) | ⚠️ Partial | Need high-res images for 21 guides |
| Navigation Updates | ✅ Complete | Navigation & footer updated with Phase 1 links |

---

## Contact & Approvals

- **Project Lead:** Zhong
- **Client:** CTS
- **Approval for Phase 1:** ✅ Approved & Complete
- **Approval for Phase 2:** ✅ Approved - Starting Apr 9
- **Approval for Phase 3+:** ⏳ Pending
