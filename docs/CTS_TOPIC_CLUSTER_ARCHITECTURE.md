# CTS Tours NZ — Topic Cluster Architecture

**Last updated:** June 2026
**Owner:** Magic Engine (Ray) · CTS Tours NZ
**Purpose:** Build sustained organic authority for "China tours from NZ" + adjacent queries

---

## Strategy

Topic Cluster SEO = build **pillar pages** (broad hub topics) surrounded by **cluster pages** (deep specific topics) that all link back to the pillar AND to each other. Google rewards depth and interconnection. The whole cluster lifts together — a strong cluster page lifts the pillar, and vice versa.

**Why this works for CTS NZ specifically:**
- Wendy Wu Tours dominates `china tours` (organic #1 NZ). We won't beat them head-on with one page.
- We CAN beat them on **specialised long-tail clusters** (Chongqing/Sichuan, Yangtze, Silk Road, Senior travel) by going deeper than they ever bothered to.
- Each deep cluster lifts the central pillar `/china-tours-from-new-zealand` and `/china-tours`.

---

## Pillar Map (4 pillars, currently in progress)

```
                          🏛️ Pillar A
                  /china-tours-from-new-zealand
                  (NZ-targeted hub — Top 3 target)
                          ║
            ┌─────────────┼─────────────┐
            │             │             │
        ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
        │       │     │       │     │       │
   PILLAR B  PILLAR C  PILLAR D    Blogs cluster
   /china-   /yangtze  /chongqing-  4 NZ-focused
   tours     -river-   chengdu-    posts ⭐
             cruise    discovery
             ⭐ NEW    -guide
```

Legend: ⭐ = NEW or to-build  ║ = primary internal-link bond  ┌──┐ = pillar-to-cluster bond

---

## Pillar A · /china-tours-from-new-zealand

**Status:** ✅ Rescued (PR #87 merged 2026-06-26)
**Current GSC pos:** ~5 → target Top 3 in 4-6 weeks
**Role:** Geo-targeted central hub for NZ market

**Contains:**
- 4-tour quick-compare table
- Discovery vs Signature decision table
- Month-by-month best-time table
- CTS vs generic NZ operators table
- 14 FAQs
- 18 internal links (to all cluster pages + 4 blogs)
- Article + Person Baker Gu + ItemList + WebPage + BreadcrumbList + FAQPage schemas
- Author byline (E-E-A-T signal)

**Outbound links to clusters:**
- → /china-tours (Pillar B sibling)
- → /campaigns/best-of-china (paid LP互链)
- → /campaigns/october-2026/tale-of-two-cities
- → /campaigns/october-2026/shanghai-surroundings
- → /campaigns/fire-fuzz
- → /great-wall-travel-guide
- → /terracotta-warriors-travel-guide
- → /best-time-to-visit-china
- → /china-visa-guide-for-new-zealanders
- → /tailor-made
- → /chongqing-chengdu-discovery-guide
- → /blog/chongqing-vs-chengdu
- → /blog/how-many-days-in-chongqing
- → /blog/yangtze-river-cruise-from-chongqing
- → /blog/liziba-monorail-chongqing-guide

---

## Pillar B · /china-tours

**Status:** ✅ Phase 5 rescued (pos 38 → 2 for "best of china tour")
**Role:** Generic tour hub
**Next iteration:** Sync cluster links with Pillar A

---

## Pillar C · /yangtze-river-cruise ⭐ NEW (this PR)

**Status:** 🆕 Being built (PR pending)
**Target GSC query:** "yangtze river cruise" / "yangtze cruise from chongqing" / "three gorges cruise" / "best yangtze river cruise"
**Competitive context:** Luxury Escapes currently dominates "Best of China with Yangtze Cruise" — we need to counter-attack
**Role:** Product-level pillar for Yangtze/Three Gorges theme

**Will contain:**
- Quick Answer block (LLM-friendly)
- Ship comparison (Century / Victoria / President)
- 4-day downstream itinerary
- Best time to cruise
- What's included / not
- NZ traveller logistics
- 7+ FAQs
- Article + Person + WebPage + BreadcrumbList + FAQPage schemas
- 10+ internal links to cluster

**Inbound from:**
- /china-tours-from-new-zealand (Pillar A) ✅
- /blog/yangtze-river-cruise-from-chongqing (cluster blog, already published) ✅
- /blog/how-many-days-in-chongqing ✅
- /blog/chongqing-vs-chengdu ✅
- /chongqing-tours
- /chongqing-chengdu-discovery-guide

**Outbound to:**
- /blog/yangtze-river-cruise-from-chongqing (blog deep-dive)
- /blog/how-many-days-in-chongqing
- /chongqing-tours
- /campaigns/best-of-china
- /china-tours-from-new-zealand (back to Pillar A)
- /china-visa-guide-for-new-zealanders

---

## Pillar D · /chongqing-chengdu-discovery-guide

**Status:** ✅ Already exists (older asset)
**Role:** Sichuan region discovery guide
**Next iteration:** Link to new Chongqing cluster blogs (chongqing-vs-chengdu, how-many-days, liziba, yangtze)

---

## Cluster Blogs (4-post Chongqing/Sichuan cluster, all published)

| Slug | Target query | GSC pos | Internal links from cluster |
|---|---|---|---|
| `/blog/chongqing-vs-chengdu` | "chongqing vs chengdu" | new | 5+ |
| `/blog/how-many-days-in-chongqing` | "how many days in chongqing" pos 7.8 | new | 5+ |
| `/blog/yangtze-river-cruise-from-chongqing` | "yangtze river cruise" | new | 10+ |
| `/blog/liziba-monorail-chongqing-guide` | "liziba station chongqing" pos 10.7 | new | 8+ |

All 4 share consistent schema (Article + Person Baker Gu + BreadcrumbList + FAQPage) committed in PR #86.

---

## Future Pillars (backlog)

| Pillar | Target query | When to build |
|---|---|---|
| `/silk-road-tours` | "silk road tours" | When CTS has 2+ Silk Road blogs published |
| `/china-tours-for-seniors` | "china tours for seniors" (already triggering as Google search term, 21.43% CTR) | Q3 2026 |
| `/beijing-tours` ⭐ refresh | "beijing tours" / "beijing tour packages" | Q3 2026 |
| `/shanghai-tours` ⭐ refresh | "shanghai tours" | Q3 2026 |

---

## Linking Rules (so the cluster compounds, not stagnates)

1. **Every pillar links to every cluster blog** in its theme
2. **Every cluster blog links back to its pillar** AND to 2-3 sibling cluster blogs
3. **Every blog page emits Article + Person + Breadcrumb + FAQ schemas** (already done PR #86)
4. **Every pillar page emits Article + Person + ItemList + WebPage + Breadcrumb + FAQ** (Pillar A done PR #87, Pillar C coming this PR)
5. **No orphan pages** — if a page has < 3 inbound internal links, audit and fix
6. **Author Baker Gu signal** consistent across all blogs + pillars (E-E-A-T)

---

## Tracking & Review

- GSC URL Inspection → Request Indexing every new page within 24h of deploy
- Track GSC pos / impr / CTR for each cluster page after 14 days
- Track cluster-level avg pos in monthly review
- Update this doc when pillars added / archived
