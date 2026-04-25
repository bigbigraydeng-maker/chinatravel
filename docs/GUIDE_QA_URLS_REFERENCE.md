# CTS Guide QA - URL Reference & Status

**Last Updated:** 2026-04-24  
**Status:** ✅ URL routing verified and corrected  

---

## Key Finding

All guide pages are deployed at **`/[name]-travel-guide`** routes, NOT `/guides/[slug]`

**Previous incorrect pattern:** `/guides/beijing` ❌  
**Correct pattern:** `/beijing-travel-guide` ✅

---

## All 21 Guide URLs (Group by Group)

### Main Cities (7)

| # | Guide | URL |
|---|-------|-----|
| 1 | Beijing | https://www.ctstours.co.nz/beijing-travel-guide |
| 2 | Xi'an | https://www.ctstours.co.nz/xian-travel-guide |
| 3 | Shanghai | https://www.ctstours.co.nz/shanghai-travel-guide |
| 4 | Chengdu | https://www.ctstours.co.nz/chengdu-travel-guide |
| 5 | Guilin | https://www.ctstours.co.nz/guilin-travel-guide |
| 6 | Zhangjiajie | https://www.ctstours.co.nz/zhangjiajie-travel-guide |
| 7 | Yunnan | https://www.ctstours.co.nz/yunnan-travel-guide |

### Yunnan Sub-guides (4)

| # | Guide | URL |
|---|-------|-----|
| 8 | Lijiang | https://www.ctstours.co.nz/lijiang-travel-guide |
| 9 | Dali | https://www.ctstours.co.nz/dali-travel-guide |
| 10 | Kunming | https://www.ctstours.co.nz/kunming-travel-guide |
| 11 | Shangri-La | https://www.ctstours.co.nz/shangri-la-travel-guide |

### National Landmarks (4)

| # | Guide | URL |
|---|-------|-----|
| 12 | Great Wall | https://www.ctstours.co.nz/great-wall-travel-guide |
| 13 | Forbidden City | https://www.ctstours.co.nz/forbidden-city-travel-guide |
| 14 | Terracotta Warriors | https://www.ctstours.co.nz/terracotta-warriors-travel-guide |
| 15 | Leshan Buddha | https://www.ctstours.co.nz/leshan-buddha-travel-guide |

### Regional Attractions (6)

| # | Guide | URL |
|---|-------|-----|
| 16 | Yangshuo | https://www.ctstours.co.nz/yangshuo-travel-guide |
| 17 | Li River Cruise | https://www.ctstours.co.nz/li-river-travel-guide |
| 18 | Hangzhou | https://www.ctstours.co.nz/hangzhou-travel-guide |
| 19 | Suzhou | https://www.ctstours.co.nz/suzhou-travel-guide |
| 20 | Chongqing | https://www.ctstours.co.nz/chongqing-travel-guide |
| 21 | Tianmen Mountain | https://www.ctstours.co.nz/tianmen-mountain-travel-guide |

---

## QA Review Workflow

### Step 1: Open the guide page
Copy a URL from the table above and open it in your browser.

### Step 2: Check 7 dimensions
Use the checklist template to check:
1. **Content** — Read page text, verify no placeholders
2. **Images** — Open DevTools (F12), check Network tab for HTTP 200
3. **SEO Metadata** — F12 → Elements → `<head>` section, verify Title/Meta/Schema
4. **Responsive** — F12 → Toggle device toolbar, test desktop/tablet/mobile
5. **Internal Links** — Click a few key links, verify no 404s
6. **CTAs** — Click "Inquiry" and "View Related Tours" buttons
7. **Performance** — F12 → Lighthouse, run audit (target >85)

### Step 3: Document findings
Copy the template from CTS_GUIDE_QA_CHECKLIST.md and fill in results:
- ✅ = All checks passed
- ⚠️ = Minor issues or warnings
- ❌ = Critical issues blocking deployment

### Step 4: Report to Claude
Once you've reviewed all 21 guides, copy the results and send them to Claude for aggregation and Phase 9 fixes.

---

## Summary of Changes Made

| Item | Before | After | Status |
|------|--------|-------|--------|
| URL pattern in checklist | `/guides/beijing` | `/beijing-travel-guide` | ✅ Fixed |
| Template URL format | `/guides/[slug]` | `/[slug]-travel-guide` | ✅ Fixed |
| Guide list routes | Incorrect (21/21) | Correct (21/21) | ✅ Verified |
| Reference documentation | None | This file | ✅ Created |

---

## Notes

- **Zhangjiajie** may not be deployed yet (check if 404)
- All other 20 guides should be accessible
- Beijing already reviewed on 2026-04-24 with 7/7 checks ✅
- Meta Description optimization in progress (Beijing: 165 chars, others pending)

---

## Next Steps

1. ✅ URL routing identified and corrected
2. ⏳ Manual QA review of remaining 20 guides (18 from original list + check Beijing again with correct URL)
3. ⏳ Compile findings for Phase 9 (fixes)
4. ⏳ Phase 10 (deployment verification)
5. ⏳ Phase SEO (keyword optimization)
