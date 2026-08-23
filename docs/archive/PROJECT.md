# ChinaTravel Project Overview

## Mission
Provide luxury, authentic China travel experiences for New Zealand travellers through a beautiful, conversion-optimised website.

## Key Features
1. **Tour Catalogue** — 50+ curated tours across 7 destinations
2. **Tour Detail Pages** — Comprehensive itineraries with print/email functionality
3. **SEO Hub Pages** — 54 SEO-optimised pages for organic search
4. **Smart Recommendations** — Geo-based and interest-based tour suggestions
5. **Testimonials & Trust Signals** — Social proof from past clients

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, React 18 |
| **Styling** | Tailwind CSS 3 with custom tokens |
| **Database** | Supabase (PostgreSQL) |
| **Email** | Resend |
| **Deployment** | Render (auto-deploy from GitHub) |
| **Version Control** | GitHub (`bigbigraydeng-maker/chinatravel`) |

---

## Project Structure

```
chinatravel/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── page.tsx                      # Homepage
│   │   ├── tours/
│   │   │   ├── page.tsx                  # All tours listing
│   │   │   ├── [destination]/
│   │   │   │   ├── page.tsx              # Destination hub
│   │   │   │   ├── [tier]/
│   │   │   │   │   ├── page.tsx          # Tier listing
│   │   │   │   │   └── [tour]/
│   │   │   │   │       ├── page.tsx      # Tour detail
│   │   │   │   │       └── print/
│   │   │   │   │           └── page.tsx  # Print-optimised itinerary
│   │   ├── api/
│   │   │   └── send-itinerary/
│   │   │       └── route.ts              # Email itinerary API
│   │   ├── about/                        # About page
│   │   ├── tailor-made/                  # Tailor-made tours form
│   │   ├── contact/                      # Contact page
│   │   └── ...                           # SEO hub pages (in progress)
│   ├── components/
│   │   ├── tours/                        # Tour-specific components
│   │   ├── Hero.tsx, Footer.tsx, etc.    # Shared components
│   │   └── ...
│   ├── lib/
│   │   ├── data/
│   │   │   └── tours.ts                  # Tour data + accessors
│   │   ├── schema-tour.ts                # JSON-LD schema helpers
│   │   └── site.ts                       # Site utilities
│   └── styles/
│       └── globals.css                   # Global Tailwind config
├── public/
│   ├── images/
│   │   ├── tours/                        # Tour hero/gallery images
│   │   └── ...
│   └── ...
├── .env.local                            # Local environment variables
├── tailwind.config.ts                    # Tailwind customisation
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
└── CLAUDE.md, PROJECT.md, etc.           # Documentation
```

---

## Tour Data Structure

**File:** `src/lib/data/tours.ts`

```typescript
interface Tour {
  id: string;                    // Unique ID (e.g., 'tour-cn-sig-1')
  slug: string;                  // URL slug (e.g., 'imperial-heritage')
  destination: string;           // 'beijing', 'xian', 'shanghai', etc.
  tier: 'signature' | 'discovery' | 'stopover';

  name: string;                  // Display name
  title: string;                 // SEO title
  shortDescription: string;      // 1–2 sentence summary
  metaDescription: string;       // SEO meta description

  duration: string;              // e.g., '10 days'
  price: string;                 // e.g., 'NZD $4,850'

  heroImage: string;             // Hero image URL
  gallery: string[];             // Gallery image URLs

  highlights: string[];          // 4–6 key highlights
  tags: string[];                // e.g., ['Great Wall', 'Terracotta']

  itinerary: DayItinerary[];     // Day-by-day breakdown
  inclusions: string[];          // What's included
  exclusions: string[];          // What's not included

  departureDates?: string[];     // Optional departure dates
  updatedAt: string;             // ISO date (e.g., '2026-04-02')
}

interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals: string;                 // e.g., 'B,L,D' (breakfast, lunch, dinner)
  accommodation?: {
    name: string;
    location: string;
    rating?: string;             // e.g., '5-star'
  };
}
```

**Helper Functions:**
- `getTourBySlug(destination, tier, slug)` — Returns single tour or null
- `getToursByDestination(destination)` — Returns all tours for destination
- `getToursByDestinationAndTier(destination, tier)` — Returns tours for tier
- `getDestinationBySlug(slug)` — Returns destination metadata

---

## Current Tours

### Signature (Premium)
- **Imperial Heritage** (`beijing-shanghai`) — 8 days, Beijing → Xi'an → Guilin → Shanghai
- **Grand Tour** (`grand-tour`) — 10 days, Beijing → Xi'an → Chengdu → Guilin → Shanghai

### Discovery (Mid-Range)
- **Beijing & Shanghai** (`beijing-shanghai`) — 5 days, Beijing ↔ Shanghai
- **Essentials** (`essentials`) — 7 days, Beijing → Xi'an → Shanghai
- **Yunnan Explorer** (`yunnan-explorer`) — 8 days

### Stopover (Quick)
- (To be determined)

---

## SEO Strategy

**Goal:** 54 optimised pages across 6 categories:

| Category | Count | Example | Priority |
|----------|-------|---------|----------|
| A. Commercial | 1 | `/china-tours` | ⭐ P1 |
| B. Destination Hubs | 7 | `/beijing-tours`, `/xian-tours`, etc. | ⭐ P1 |
| C. Guides | 15 | `/china-visa-guide`, `/best-time-to-visit`, etc. | ⭐ P2 |
| D. Destination Guides | 21 | `/beijing-guide`, `/xian-travel-guide`, etc. | ⭐ P2 |
| E. FAQ | 8 | `/china-tours-faq`, `/visa-faq`, etc. | P3 |
| F. Tools | 2 | `/tour-calculator`, `/itinerary-builder`, etc. | P4 |

**Phase 1 (Immediate):** 12 pages
- `/china-tours` (commercial hub)
- 7 destination hubs (Beijing, Xi'an, Shanghai, Chengdu, Guilin, Zhangjiajie, Yunnan)
- `/china-tours-from-new-zealand` (NZ-specific)
- `/china-tours-from-auckland` (Auckland-specific)
- 2 highest-priority guides (TBD)

**Phase 2–4:** Remaining 42 pages

---

## Features

### ✅ Completed
- Homepage with hero, stats, why CTS, expert highlight
- Tour listing by destination & tier
- Tour detail pages with full itinerary
- Print itinerary (separate `/print` route, browser-native)
- Email itinerary (Resend SDK, awaits API key)
- Testimonials & trust signals
- Breadcrumb navigation
- JSON-LD schema (product, tour, breadcrumb, FAQ)
- Responsive design (mobile, tablet, desktop)
- **Phase 1 SEO Pages (12 pages):** All published and audited ✅
  - Commercial hub + 8 destination hubs
  - NZ & Auckland landing pages
  - Best time to visit + Visa guides
  - All passing SEO audit (Lighthouse > 90, Schema valid, mobile-responsive)

### 🚧 In Progress
- Phase 2 SEO pages (21 destination guides)
- Tours data verification & completion

### ⏳ Planned
- Email itinerary testing (requires Resend API key)
- Phase 2–4 SEO pages (42 remaining)
- User testimonials form
- Tailor-made tour enquiry form

---

## Performance Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Lighthouse Score** | 90+ | 90+ on all Phase 1 pages | ✅ |
| **Core Web Vitals** | All green | All green on Phase 1 | ✅ |
| **SEO Pages** | 54 | 12 (Phase 1 complete) | 🚧 |
| **Page Load (Hero)** | <3s | <2s (Phase 1) | ✅ |
| **Mobile Responsiveness** | 100% | ✅ (all pages) | ✅ |
| **Schema.org Valid** | 100% | 100% (all Phase 1) | ✅ |
| **Meta Tags Unique** | 100% | 100% (all Phase 1) | ✅ |

---

## Deployment

**Platform:** Render
**Trigger:** Auto-deploy on push to GitHub main
**Build Command:** `npm run build`
**Start Command:** `npm start`

**Environment Variables (Render):**
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=... (to be configured)
```

---

## Team & Contacts

| Role | Name | Notes |
|------|------|-------|
| Designer/Owner | Zhong | Project lead |
| Client | CTS | China Travel Service |

---

## Success Criteria

1. ✅ Live website with tours, imagery, and booking flow
2. 🚧 54 SEO pages ranking on first page of Google (phase 1–4)
3. ⏳ Email/print itinerary feature fully tested
4. ⏳ Organic traffic > 500 users/month (6 months)
5. ⏳ 5+ conversions (enquiries/bookings) from organic search

---

## Notes

- Tours data is **static** (in `tours.ts`), not dynamic from Supabase (yet)
- Email feature requires Resend API key (will be provided by client later)
- All tour images must be high-quality and SEO-optimised
- Copy tone: Premium, authentic, warm (not corporate/salesy)
