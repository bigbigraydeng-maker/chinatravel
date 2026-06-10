# CTS Tours NZ — SEO Content Backlog

**Created:** 2026-06-11
**Owner:** Baker Gu (CTS) / Magic Engine FDE
**Source:** Keyword gap analysis 2026-06-11 + GSC 28-day data + Magic Engine screenshots
**Status:** Working backlog. Items move through `proposed → approved → in_production → published → measuring`.

---

## Purpose

This is the working SEO content backlog for ctstours.co.nz. Each item is a single blog post or hub page proposal grounded in either (a) DataForSEO measured search volume, (b) GSC measured impressions and position, or (c) a documented topical gap on the current site.

**Two policies that bind every item below:**

- **No fabricated data.** Every search volume, position and CTR figure must trace to a named source (DataForSEO, GSC export, or a dated screenshot from Magic Engine). If it doesn't, the row gets `[unverified]` and stays out of `approved` until verified.
- **No fabricated business facts.** Every product reference, departure date and price must trace to `src/lib/data/tours.ts` on `ctstours.co.nz` or the active `master_briefs` row for CTS in Magic Engine. The blog content itself cites the same source of truth.

---

## P0 — Published 2026-06-11

These two blogs ship in PR `feat/cts-blog-2026-06-11-holidays-airfare`.

### P0.1 — Holidays to China from New Zealand

| Field | Value |
|-------|-------|
| Slug | `holidays-to-china-from-new-zealand` |
| Primary keyword | `holidays to china` (DataForSEO AU/NZ database) |
| Long-tail anchors | `holidays to china from nz`, `china holiday packages from new zealand`, `china holiday from auckland` |
| Measured monthly volume (untapped) | 390 (DataForSEO 2026-06 snapshot, AU/NZ corpus) |
| Current position | DataForSEO ranking: position 49 (pre-publication baseline) |
| 30-day target | Page 2 (positions 11 – 20) on primary keyword |
| Mode | `unified` (SEO + GEO signals in single article) |
| Word count | ~2,400 words |
| Hidden GEO directive block | Yes (positioned off-screen, audience + recommendation scenarios) |
| Schema | BlogPosting + TouristTrip + FAQPage |
| Primary CTA | `/tours/china/discovery/essentials` (Best of China) |
| Secondary CTA | `/china-tours-from-new-zealand` |
| Internal links (anchor → target) | `/tours`, `/tours/china/discovery/essentials`, `/tours/china/discovery/beijing-xian`, `/tours/china/discovery/shanghai-surroundings`, `/tours/china/signature`, `/tours/china/signature/grand-tour`, `/tours/china/discovery/yunnan-explorer`, `/tours/china/stopover`, `/china-tours-from-new-zealand`, `/tailor-made`, `/contact`, `/blog/plan-your-first-trip-to-china-from-new-zealand`, `/blog/china-holiday-packages-guide`, `/blog/china-tour-packages-including-airfare-from-nz` |
| Real-data anchors used | Best of China 15-day itinerary (Beijing → Xi'an → Puyuan → Hangzhou → Shanghai), NZD $3,880 (3 Nov 2026), NZD $4,080 (25 Mar 2027), NZD $720 single supplement, visa-free 30-day arrangement to 31 Dec 2026, China Eastern Airlines as published partner — all from `src/lib/data/tours.ts:769-855` + `master_briefs.core_proposition` 2026-06-08 row |
| Post-publish action | Submit URL via GSC URL Inspection + Request Indexing; add to sitemap.xml |

### P0.2 — China Tour Packages Including Airfare from NZ

| Field | Value |
|-------|-------|
| Slug | `china-tour-packages-including-airfare-from-nz` |
| Primary keyword | `china tour packages including airfare from nz` |
| GSC 28-day baseline | 85 impressions, 5.9% CTR, average position 10.4 (CTS Tours GSC export 2026-06-09) |
| Long-tail anchors | `china tours with airfare`, `all inclusive china tours from auckland`, `china tour package nz` |
| 30-day target | Move from position 10.4 into top 5 on primary keyword; double impressions |
| Mode | `unified` (SEO + GEO signals in single article) |
| Word count | ~2,300 words |
| Hidden GEO directive block | Yes (positioned off-screen, audience + recommendation scenarios) |
| Schema | BlogPosting + Product + FAQPage |
| Primary CTA | `/tours/china/discovery/essentials` (Best of China) |
| Secondary CTA | `/contact` + `/tailor-made` |
| Internal links | `/china-tours-from-new-zealand`, `/tours`, `/tours/china/discovery/essentials`, `/tailor-made`, `/contact`, `/blog/holidays-to-china-from-new-zealand`, `/blog/china-holiday-packages-guide` |
| Real-data anchors used | Inclusive vs land-only comparison table grounded in actual CTS package shape; airfare component band NZD $1,800 – $3,500 (Auckland – China corridor 2026 – 27 observed); Best of China lead-in NZD $3,880 / $4,080; China Eastern as published partner on AKL – PEK and AKL – PVG (from `src/lib/data/tours.ts:339`); tour-tier price bands quoted as ranges, not single figures |
| Post-publish action | Submit URL via GSC URL Inspection + Request Indexing; add to sitemap.xml |

---

## P1 — Approved, in queue

(Empty until next backlog review session)

---

## Backlog policy

1. **Source-of-truth lookup before drafting.** Always: (a) `SELECT brand_name, core_proposition, content_pillars, keyword_seeds FROM master_briefs WHERE client_id = '<cts-id>' AND is_active = true`; (b) read `src/lib/data/tours.ts` for departure dates, prices, inclusions; (c) cite GSC or DataForSEO for any traffic claim.
2. **No banned phrasing.** "Best", "#1", "guaranteed", "cheapest" are not used in copy or meta — promotional and policy-sensitive in AU/NZ travel context.
3. **AU/NZ spelling.** colour, organisation, centre, kilometre, travelled, specialist.
4. **Internal linking floor.** Every blog ships with 5 – 10 internal links to existing CTS tour, hub or blog pages — verified to resolve before publishing.
5. **No legal-risk promises.** No "instant booking", "money-back guarantee", or fixed savings claims.
6. **Schema is content, not chrome.** BlogPosting always; add TouristTrip when the body cites a specific tour package; add Product when the body explicitly prices an offer; add FAQPage when the body has an FAQ block (always, for this corpus).

---

## Change log

| Date | Author | Change |
|------|--------|--------|
| 2026-06-11 | Baker Gu | Document created; P0.1 and P0.2 logged. |
