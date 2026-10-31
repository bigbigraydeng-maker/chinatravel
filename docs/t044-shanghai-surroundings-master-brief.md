# T044 — Shanghai & Beyond Master Brief (Jiangnan Discovery)

Single source of truth for **organic social**, **paid creative**, **blog**, and **AI-generated copy** for this Discovery product. When site copy changes, update this file in the same PR or immediately after deploy.

## Canonical product identity

| Field | Value |
|--------|--------|
| Marketing name | **Shanghai & Beyond** (China Discovery) |
| `tours.ts` slug | `shanghai-surroundings` |
| Route | **Yangtze Delta loop** — Suzhou, Wuxi, Xinshi, Hangzhou, Shanghai — **no Beijing, no Xi’an, no Terracotta** |
| Duration | 10 days |
| Lead-in price (site) | **NZD $2,999 per person** (twin-share; confirm supplements on enquiry) |
| NZ departure framing | October-ready from Auckland (see published dates on site) |
| Cities (`tourCities`) | `suzhou`, `wuxi`, `xinshi`, `hangzhou`, `shanghai` |

## URLs (production)

| Surface | Path |
|---------|------|
| Standard product page | `https://www.ctstours.co.nz/tours/china/discovery/shanghai-surroundings` |
| October 2026 campaign LP | `https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings` |
| Campaign slug (code) | `shanghai-surroundings` |

**October hero departure (campaign config):** first date in `OCTOBER_2026_DISCOVERY_BY_SLUG['shanghai-surroundings'].heroDepartureOrder` — **14 October** (confirm live on LP).

**Enquiry source string (forms on campaign LP):** `Campaign LP: Oct 2026 — Shanghai & Beyond`

Canonical HTML has **no UTM**; ads and social tracked links append UTM per `october-2026-discovery.ts` / marketing board.

## Positioning

- **Who it’s for:** NZ travellers who want **modern Shanghai plus classical Jiangnan** — gardens, lakes, water-town texture, West Lake — at a **softer multi-city pace** without flying north to Beijing or Xi’an.
- **Core promise:** Suzhou → Wuxi → Xinshi → Hangzhou → Shanghai; **Bund**, West Lake, gardens, local food flexibility (several meals at own expense by design).
- **Differentiator vs Beijing/Xi’an product:** This tour does **not** include Beijing, Great Wall, or Terracotta Warriors. State that clearly in comparisons (matches on-page FAQ).

## Messages to repeat (must stay aligned with `tours.ts`)

- Short description axis: Yangtze Delta loop; **visa-free may apply** for many NZ trips — **confirm dates**; mid-October departure published on site.
- **Pacing:** Short inter-city drives (often ~1–1.5 h); multiple nights in-region — “steady, not rushed” is accurate.
- **Optional extras (paid locally / as advised):** e.g. Shanghai Acrobatics Show (~NZD $80 pp), Maglev (~NZD $30 pp) — only when describing optional blocks, not as core inclusions.

## Hero & proof anchors (site sections)

- `#visa-nudge`  
- `#trust-signals`  
- `#faq`  
- `#planning-resources`  
- `#gallery`  

## FAQ truths (do not contradict)

Summarised from live `faqs` on the tour:

1. **Scope:** Jiangnan loop from Shanghai — **not** Beijing or Terracotta.  
2. **Visa:** Many NZ leisure trips may qualify for visa-free entry — **confirm before booking**.  
3. **Price:** Twin-share lead-in as advertised; includes intl/domestic per itinerary, hotels as named or similar, guides, listed meals/fees, land transport; excludes insurance, tips (~NZD $10 pp/day suggested), many dinners marked own expense, optional extras.  
4. **Meals:** Some lunches/dinners deliberately free for street food and local choice — set expectations in content.  
5. **October:** Autumn is a strong season; light layers + rain gear.  
6. **Departure / single room:** Published departure **14 October** (year as on site); single supplement — ask CTS.  

## Related long content (blog)

- Supporting blog slug: `shanghai-surroundings-jiangnan-guide-nz` — cross-link for SEO / nurture; tone must match this brief.

## Creative angles (align with T026 Meta cold brief)

Shared framework: **Outcome** / **Pain-point (first China anxiety)** / **Trust (NZ-facing specialist)**.

**Hook bank (English):**

- “Want modern China plus classic water-town charm?”  
- “Shanghai energy, Jiangnan elegance, one route.”  
- “A softer-paced first China trip from Shanghai outward.”  

**Visual priorities:** Shanghai skyline / Bund, Suzhou–Hangzhou water and garden texture, West Lake, canal scenes (not Great Wall / Terracotta).

## Voice

- **NZ English**, warm and clear; **CTS** as China specialist for NZ travellers.  
- Avoid implying this tour includes northern China icons.  
- **§** — do not use in customer-facing UI (project rule).

## Change log

| Date | Change |
|------|--------|
| 2026-04-18 | Initial master brief for T044; aligned with `tours.ts` + `october-2026-discovery.ts`. |
