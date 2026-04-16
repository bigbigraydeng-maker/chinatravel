# Google Analytics 4 (GA4) Setup Guide

## Overview

This project now has Google Analytics 4 integration ready. You need to:
1. Create a GA4 property in Google Analytics
2. Get your Measurement ID
3. Add it to Render environment variables
4. Verify tracking is working

---

## Step 1: Create GA4 Property (if you don't have one)

### 1.1 Go to Google Analytics
- Visit: https://analytics.google.com/
- Sign in with your Google account (or create one)

### 1.2 Create a New Property
- Click **"Create" → "Property"**
- Fill in details:
  - **Property name:** ChinaTravel (or your preference)
  - **Time zone:** New Zealand (UTC+12)
  - **Currency:** NZD
  - **Data stream type:** Web
  - **Website URL:** https://www.ctstours.co.nz

### 1.3 Get Your Measurement ID
After creating the property:
1. Go to **Admin** (gear icon)
2. Under **Data collection and modification**, select **Data Streams**
3. Click on your web stream
4. You'll see **Measurement ID** at the top
   - Format: `G-XXXXXXXXXX`
   - **Copy this ID** — you'll need it next

---

## Step 2: Configure Environment Variables on Render

### 2.1 Add to Render Dashboard
1. Go to **Render Dashboard** → **Your Project** → **Environment**
2. Click **"Add Environment Variable"**
3. Add:
   ```
   Key:   NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX  (paste your Measurement ID)
   ```
4. Click **"Add Variable"** → **"Save Changes"**
5. Render will auto-redeploy your app

### 2.2 Local Development (Optional)
If you want to test locally:
1. Create/edit `.env.local` in project root:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
2. Restart your dev server:
   ```bash
   npm run dev
   ```

---

## Step 3: Verify GA4 is Working

### 3.1 Check in GA4 Dashboard
1. Go to **Google Analytics** → **Your Property**
2. Look for **Realtime** report in left sidebar
3. Visit your website (https://www.ctstours.co.nz)
4. You should see **1 active user** in Realtime report
5. Click around pages — counters should update in real-time

### 3.2 Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Type: `window.gtag` and press Enter
4. You should see the gtag function is loaded
5. No GA errors should appear

### 3.3 Check Network Requests
1. Go to **Network** tab in DevTools
2. Filter for "google-analytics" or "gtag"
3. You should see requests to:
   - `www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
4. Status should be 200 (successful)

---

## Step 4: Tracked Events (What We're Measuring)

The following events are automatically tracked:

### Automatic
- ✅ **Pageviews** - Every page visited
- ✅ **Scroll depth** - How far down pages users go (built into GA4)

### Custom Events (via `/src/lib/ga.ts`)
- 🎫 **view_item** - Tour detail pages viewed
- 🎫 **view_item** - Guide pages viewed
- ✏️ **begin_checkout** - Inquiry form started
- 📞 **contact** - Contact form submitted
- ✏️ **view_item_list** - Tailor-made CTA clicked

To trigger custom events in your code:
```typescript
import { trackTourView, trackGuideView, trackContactForm } from '@/lib/ga';

// In a tour detail page
trackTourView('Imperial Heritage Tour', 'China');

// In a guide page
trackGuideView('Beijing Travel Guide', 'Beijing');

// On contact form submit
trackContactForm();
```

---

## Step 5: Useful GA4 Reports to Set Up

### 5.1 Key Reports to Check
After data flows in (24-48 hours):

1. **Realtime** (immediate feedback)
   - Admin > Reports > Realtime
   - Shows active users right now

2. **Users Overview** (daily active users)
   - Reports > User acquisition > Overview
   - See daily/weekly trends

3. **Traffic Sources**
   - Reports > User acquisition > Traffic source
   - See where visitors come from (organic, direct, referral)

4. **Page Views**
   - Reports > Engagement > Pages and screens
   - See which pages are most visited

5. **Events**
   - Reports > Engagement > Events
   - See tour views, guide views, inquiry forms started

6. **Conversions**
   - Admin > Conversions > New conversion event
   - Mark important events as "conversions" to track goal completion

---

## Step 6: Set Up Conversions (Optional but Recommended)

Conversions help you measure business outcomes:

### 6.1 Mark Events as Conversions
1. Go to **Admin** → **Conversions** → **New conversion event**
2. For each key event, create a conversion:
   - **contact** = Contact form submission
   - **begin_checkout** = Inquiry started
   - **view_item[item_category2: tour]** = Tour detail viewed

### 6.2 Set Up Goal Tracking
Example: Track "Inquiry Completion"
1. Create conversion for `begin_checkout` event
2. Check GA4 dashboard in 24-48 hours
3. See how many users completed inquiries

---

## October 2026 Discovery campaigns (UTM + canonical)

**Canonical:** Campaign pages use **self-referencing canonical** on the clean URL (no query string), e.g.  
`https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings`  
So Google treats the campaign page as the primary URL; **UTM parameters belong only on ad / email links**, not in the canonical tag.

**Paths:**

| Tour | Path |
|------|------|
| Shanghai & Surroundings (14 Oct spotlight) | `/campaigns/october-2026/shanghai-surroundings` |
| A Tale of Two Cities — Beijing & Xi’an (15 Oct spotlight) | `/campaigns/october-2026/tale-of-two-cities` |

**UTM (paste after your live origin, e.g. `https://www.ctstours.co.nz`):**

- **Google Ads (example):**  
  `.../shanghai-surroundings?utm_source=google&utm_medium=cpc&utm_campaign=oct26_discovery&utm_content=shanghai_14oct`  
  `.../tale-of-two-cities?utm_source=google&utm_medium=cpc&utm_campaign=oct26_discovery&utm_content=tale_15oct`

- **Meta / Facebook (example):**  
  `.../shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct26_discovery&utm_content=shanghai_feed`  
  `.../tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct26_discovery&utm_content=tale_feed`

Use **`utm_content`** (or **`utm_term`** for search) to distinguish creatives or keywords. Keep **`utm_campaign`** consistent for the October push so GA4 groups traffic in one campaign.

In code, `buildOctober2026CampaignAdUrl()` in `src/lib/campaigns/october-2026-discovery.ts` builds the same shape of URL from a site origin + slug + UTM fields.

### Site-wide UTM naming (tours, guides, blogs)

For **paid and tracked links** across product tours, destination guides, and blog posts, use the shared convention in **[docs/utm-conventions.md](docs/utm-conventions.md)** (`tour_` / `guide_` / `blog_` campaign prefixes, `utm_content` patterns, and how this relates to legacy `oct26_discovery` / social `oct2026_dual` names).

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| GA4 not loading | Check `NEXT_PUBLIC_GA_ID` is set in Render env vars |
| No realtime users | Wait 5-10 seconds, refresh page, check incognito window |
| Events not showing | Verify custom event code is called (check console logs) |
| "gtag not defined" | GA4 component may not be loading — check network tab |

---

## Files Modified

- ✅ `src/components/GoogleAnalytics.tsx` - GA4 Script loader
- ✅ `src/lib/ga.ts` - GA4 event tracking utilities
- ✅ `src/hooks/usePageTracking.ts` - Automatic page tracking hook
- ✅ `src/app/layout.tsx` - Added GoogleAnalytics component

---

## Next Steps

1. **Immediate:**
   - Get Measurement ID from GA4
   - Add `NEXT_PUBLIC_GA_ID` to Render

2. **Within 24 hours:**
   - Check Realtime report
   - Verify pageviews are flowing

3. **Within 48 hours:**
   - Set up conversions for key events
   - Create custom reports for tour/guide views

4. **Optional:**
   - Set up Google Search Console integration
   - Connect Google Ads (if running ads)
   - Create custom alerts for anomalies

---

## References

- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/10089681)
- [Next.js + GA4 Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
