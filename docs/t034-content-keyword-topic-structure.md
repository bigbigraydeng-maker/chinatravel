# T034 — Content keyword & topic structure (site)

Last updated: 2026-04-14  
Owner: CTS / ChinaTravel  
Scope: Organic SEO + editorial briefs; aligns with `CONTENT_PIVOT` in `src/lib/data/marketing-plan-2026.ts`, Google Ads keyword structure (`docs/t018-keyword-structure-v1.md`), and published blogs T036–T040.

## 1) Site-wide theme clusters (canonical URL each)

| Theme cluster | Primary URL | Intent | Supporting / avoid cannibalisation |
|---------------|-------------|--------|-------------------------------------|
| NZ / China visa-free (policy + what to carry) | `/china-visa-guide-for-new-zealanders` | Informational → action | Product `ChinaVisaNudge` → guide; do not duplicate full policy on every tour hero. |
| China specialist / NZ China tours (trust + commercial) | `/china-tours` | Commercial + brand | `About` (credentials + proof); NZ geo pages `/china-tours-from-new-zealand`, `/china-tours-from-auckland`; Discovery product pages; **not** a second “home page” for the same head terms on `/about`. |

## 2) Hero products (October Discovery + standard URLs)

| Product | Standard product URL | October campaign LP | Core head terms (EN) |
|---------|----------------------|---------------------|----------------------|
| Beijing & Xi’an — A Tale of Two Cities | `/tours/china/discovery/beijing-xian` | `/campaigns/october-2026/tale-of-two-cities` | beijing xian tour, great wall terracotta warriors, first time china, NZ departure |
| Shanghai & Surroundings (Jiangnan loop) | `/tours/china/discovery/shanghai-surroundings` | `/campaigns/october-2026/shanghai-surroundings` | shanghai surroundings tour, west lake, jiangnan, NZ departure |

## 3) Supporting blog ↔ URL map (T036–T040)

| Task | Topic | Slug | Primary internal links (minimum) |
|------|-------|------|----------------------------------|
| T036 | Beijing or Shanghai first trip | `/blog/first-trip-china-beijing-or-shanghai` | Visa guide, both October LPs, `china-tours`, contact |
| T037 | October timing | `/blog/is-october-good-time-to-visit-china` | `best-time-to-visit-china`, October LPs, Discovery products |
| T038 | Guided tour inclusions | `/blog/what-is-included-guided-china-tour-nz` | Discovery products, visa guide, October LPs |
| T039 | Shanghai & Jiangnan | `/blog/shanghai-surroundings-jiangnan-guide-nz` | Shanghai guides, Shanghai Discovery product, October Shanghai LP |
| T040 | Beijing / Xi’an first-timer | `/blog/beijing-xian-first-visit-guide-nz` | Beijing/Xi’an guides, beijing-xian product, October Tale LP, visa |

## 4) Ads → organic alignment (see T018)

- **Brand / visa / generic**: `Search_Brand_CTS`, `Search_VisaFree_NZ_CN`, `Search_Generic_ChinaTours_NZ` map to `About`, visa guide, and `china-tours` — not to duplicate money pages with the same `<title>` intent.
- **Product**: `Search_Product_BJXA_Oct26` and `Search_Product_SH_Oct26` landing parity: standard product URL = canonical; campaign LP = UTM + October narrative; meta titles/descriptions differentiated in `tours.ts` + `generateMetadata` using `metaTitle` / `metaDescription`.

## 5) Obsidian / long brief

Long tables, evidence lists, and client-facing copy variants live under `MARKETING_PLAN_META.obsidianProjectPath` (`01-Magiclab/Projects/China Travel`). This file is the **repository** source of truth for URL mapping and cluster rules.
