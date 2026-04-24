# T043 — Beijing / Xi’an Master Brief (A Tale of Two Cities)

Single source of truth for **organic social**, **paid creative**, **blog**, and **AI-generated copy** for this Discovery product. When site copy changes, update this file in the same PR or immediately after deploy.

## Canonical product identity

| Field | Value |
|--------|--------|
| Marketing name | **A Tale of Two Cities** (China Discovery) |
| `tours.ts` slug | `beijing-xian` |
| Route | **Beijing + Xi’an only** — no Shanghai, no Yangtze Delta cities |
| Duration | 10 days |
| Lead-in price (site) | From **NZD $3,480** |
| NZ departure framing | October-ready from Auckland (see published dates on site) |
| Cities (`tourCities`) | `beijing`, `xian` |

## URLs (production)

| Surface | Path |
|---------|------|
| Standard product page | `https://www.ctstours.co.nz/tours/china/discovery/beijing-xian` |
| October 2026 campaign LP | `https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities` |
| Campaign slug (code) | `tale-of-two-cities` → underlying tour `beijing-xian` |

**October hero departure (campaign config):** first date in `OCTOBER_2026_DISCOVERY_BY_SLUG['tale-of-two-cities'].heroDepartureOrder` — **15 October** (confirm live on LP).

**Enquiry source string (forms on campaign LP):** `Campaign LP: Oct 2026 — A Tale of Two Cities`

Canonical HTML has **no UTM**; ads and social tracked links append UTM per `october-2026-discovery.ts` / marketing board.

## Positioning

- **Who it’s for:** First-time China travellers from NZ who want **iconic northern China** — imperial Beijing and ancient-capital Xi’an — in a **clear, escorted loop** without a multi-region mega-tour.
- **Core promise:** Forbidden City, Great Wall, hutongs, high-speed train to Xi’an, Terracotta Warriors and Tang-era layers — **history-rich, route-simple**.
- **Differentiator vs Shanghai product:** This tour does **not** include Shanghai or Jiangnan water towns. Say so plainly when comparing products (matches on-page FAQ).

## Messages to repeat (must stay aligned with `tours.ts`)

- Short description axis: Beijing’s highlights → **high-speed rail** to Xi’an → Terracotta Warriors; October-ready from Auckland; **visa-free may apply** for many NZ leisure trips — **confirm before booking** (see visa guide).
- **Train:** Beijing → Xi’an by high-speed train (e.g. G89 class of service as per itinerary — site lists 2nd class in FAQ).
- **Not included messaging:** No Shanghai; no Terracotta on the other Discovery product — avoid cross-contamination in captions.

## Hero & proof anchors (site sections)

Use these IDs when linking from the marketing board or briefs:

- `#visa-nudge` — China visa / visa-free nudge  
- `#trust-signals` — trust strip  
- `#faq` — product-specific FAQs  
- `#planning-resources` — Plan your trip / supporting links  
- `#gallery` — gallery  

## FAQ truths (do not contradict)

Summarised from live `faqs` on the tour:

1. **Scope:** Beijing + Xi’an only; fly back via Beijing to NZ — not a Shanghai loop.  
2. **Visa:** Many NZ passport holders may use visa-free entry for leisure — **confirm for your dates**; link visa guide.  
3. **Price includes:** International from Auckland, domestic as per itinerary, 4-star hotels, guides, listed meals/fees, land transfers, Beijing–Xi’an HSR in **2nd class** (unless otherwise advised).  
4. **Train journey:** Comfortable ~4h evening arrival in Xi’an; guide meets at station.  

## Related long content (blog)

- Supporting blog slug: `beijing-xian-first-visit-guide-nz` — cross-link for SEO / nurture; tone must match this brief.

## Creative angles (align with T026 Meta cold brief)

Shared framework: **Outcome** / **Pain-point (first China anxiety)** / **Trust (NZ-facing specialist)**.

**Hook bank (English):**

- “First China trip? Start with Beijing + Xi’an.”  
- “History-rich China in one smooth route.”  
- “Iconic China without planning overload.”  

**Visual priorities:** Great Wall, Forbidden City, Terracotta Warriors, hutongs, city rhythm / train journey (not Shanghai skyline).

## Voice

- **NZ English**, warm and clear; **CTS** as China specialist for NZ travellers.  
- Avoid superlatives that aren’t on the page; avoid claiming visa-free for everyone.  
- **§** — do not use in customer-facing UI (project rule).

## Change log

| Date | Change |
|------|--------|
| 2026-04-18 | Initial master brief for T043; aligned with `tours.ts` + `october-2026-discovery.ts`. |
