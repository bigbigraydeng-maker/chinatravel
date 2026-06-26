import type { BlogPost } from '@/lib/types/blog-post';

/**
 * P1 Week 1 · Dual-signal long-form #5 (Sichuan/Chongqing cluster sibling).
 *
 * Target: GSC query "liziba station chongqing" — pos 10.7, impr 227/mo, CTR 0.9%.
 * Query intent mismatch — current /liziba-station-chongqing ranks but doesn\'t
 * capture clicks because the title doesn\'t signal "guide / how to visit".
 * This blog post fills that intent gap.
 *
 * Topical authority play: completes the Chongqing/Sichuan cluster started with
 * chongqing-vs-chengdu (PR #79), how-many-days-in-chongqing (PR #83), and
 * yangtze-river-cruise-from-chongqing (this PR sister).
 *
 * Dual-signal design:
 *  - SEO: query-matched slug/H1 ("Liziba Monorail Chongqing Guide"), sustained
 *    keyword density, FAQ schema, internal links to chongqing-vs-chengdu,
 *    how-many-days-in-chongqing, hongyadong-chongqing, chongqing-tours,
 *    yangtze-river-cruise-from-chongqing, chongqing-chengdu-discovery-guide,
 *    campaigns/best-of-china, china-tours-from-new-zealand.
 *  - GEO (AI Overview / ChatGPT / Perplexity citation): TL;DR Quick Answer
 *    paragraph up top, named-author "Baker Gu" voice, step-by-step "how to
 *    visit" structure, 7-question FAQ block, NZ-traveller framing.
 *
 * Brand integrity:
 *  - "China Travel Service since 1928, NZ team 25 years" wording.
 *  - No fabricated prices, no fabricated review counts.
 *  - Real station name (Liziba 李子坝), real line (Line 2 / 2号线).
 */
export const lizibaMonorailGuidePost: BlogPost = {
  id: 'lt-lzb-1',
  slug: 'liziba-monorail-chongqing-guide',
  title: 'Liziba Monorail Through-the-Building: How to Visit Chongqing\'s Most Photographed Station',
  excerpt:
    'How to find, ride, and photograph Liziba Monorail Station — the famous Chongqing metro line that runs straight through a residential apartment building. NZ traveller guide with timing, exits, photo spots, and how it fits into a Chongqing itinerary.',
  author: 'Baker Gu',
  authorRole: 'China Travel Specialist, CTS Tours NZ',
  category: 'destination',
  tags: [
    'Chongqing',
    'Liziba',
    'Liziba Monorail',
    'China Travel',
    'New Zealand',
    'Photography',
    'Public Transport',
    '2026',
  ],
  heroImage:
    'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
  publishedAt: '2026-06-26',
  readTime: '7 min read',
  faqs: [
    {
      question: 'Where exactly is Liziba Monorail Station?',
      answer:
        'Liziba Station (李子坝站) is on Chongqing Rail Transit Line 2, located between Fotuguan Station and Niujiaotuo Station in central Chongqing. The station is unusual because the metro line passes through the 6th-8th floors of a 19-storey residential apartment building. The actual platform is INSIDE the building. Take Line 2 from any central Chongqing station (Linjiangmen, Jiaochangkou) and exit at Liziba — about 5-10 minutes from central Jiefangbei district.',
    },
    {
      question: 'How do I get the famous photo of the monorail going through the building?',
      answer:
        'The classic shot is taken from across the street at the **Liziba Light Rail Viewing Platform** — a small dedicated terrace built specifically for this purpose. Exit Liziba Station, cross to the opposite side of the road, and walk about 100 metres to the viewing platform. There are train timetables posted so you can wait for a passing monorail. Best photo light is between 9-11am (morning sun on the building face) and 4-6pm (golden hour). The viewing platform is free and open daily.',
    },
    {
      question: 'Can I ride through the building, not just photograph it?',
      answer:
        'Yes — that\'s the best experience. Take Line 2 from any central station and ride through Liziba. The train slows and you\'ll briefly see daylight from windows on both sides as the train passes through the building. One ticket on Chongqing Rail Transit costs the equivalent of NZD $0.50-1.00 depending on distance. To get the full sensation, sit at the front carriage (driver\'s side) — though all carriages experience the through-building moment.',
    },
    {
      question: 'How long do I need at Liziba?',
      answer:
        'For just the photo and one ride through, 30-45 minutes is enough. To experience it properly — ride through, exit, walk to the viewing platform, watch a few trains pass, photograph from multiple angles, and grab a coffee at one of the nearby cafés — allow 60-90 minutes. You can easily combine Liziba with nearby sights like Hongyadong (a 10-minute taxi or 20-minute walk) or the central business district at Jiefangbei.',
    },
    {
      question: 'Is Liziba safe for NZ tourists travelling solo?',
      answer:
        'Yes, very safe. Chongqing Rail Transit is one of the cleanest, safest, and most reliable metro systems in China — comparable to Auckland\'s public transport in terms of safety, but far more extensive. Liziba Station is fully staffed, well-lit, and busy throughout the day. The viewing platform across the road is in a public residential area with normal foot traffic. Standard precautions for any urban tourist destination apply, but there\'s no specific safety concern at Liziba.',
    },
    {
      question: 'When is the best time of day to visit Liziba?',
      answer:
        'Mornings (9-11am) give the best photo light — sun is on the apartment building face, fewer tourists, and clearest view of the gorges if you\'re combining with other sights. Late afternoon (4-6pm) gives golden-hour light but slightly more crowds. Avoid midday (11am-2pm) in summer when the sun is directly overhead and the photo loses its dramatic shadow contrast. Evenings the building lights up but the trains stop running around 11pm.',
    },
    {
      question: 'How does Liziba fit into a Chongqing or China tour itinerary?',
      answer:
        'Liziba is a 30-90 minute stop, not a half-day destination. We typically slot it into the morning of Day 1 in Chongqing — combining Liziba (photo and ride) → Hongyadong (lunch and afternoon riverside views) → Jiefangbei pedestrian area (evening shopping and hotpot dinner). For NZ travellers on our [China tour packages from New Zealand](/china-tours-from-new-zealand), Liziba is one of the visual highlights guides build into the Chongqing day specifically because it photographs beautifully and travels well in family group videos.',
    },
  ],
  content: `
**Quick answer:** Liziba Monorail Station (李子坝站) is on Chongqing Rail Transit Line 2 and is famous for one reason — the train line passes straight through the 6th-8th floors of a 19-storey residential apartment building. The best way to experience it is to **(1) ride through it on Line 2** (any direction), then **(2) exit the station, cross the road, and walk to the dedicated Light Rail Viewing Platform** to watch the trains pass through the building from the outside. Allow 60-90 minutes for the full experience. Free to visit, NZD $0.50-1.00 per train ride, open daily, and an easy 10-minute taxi from central Jiefangbei. NZ travellers can enter China visa-free for up to 30 days through 31 December 2026.

---

I\'m **Baker Gu**, CTS Tours NZ\'s China travel specialist. The Liziba monorail-through-a-building is the #1 photo request I get from Kiwi travellers heading to Chongqing — usually after they\'ve seen the viral videos and want to know "is this real, and can I actually see it?" Short answer: yes, it\'s real, it\'s a working metro station, and you can visit any day of the week. Here\'s exactly how.

If you\'re still deciding whether Chongqing is for you, my earlier post [Chongqing vs Chengdu](/blog/chongqing-vs-chengdu) helps you decide between the two Sichuan-region anchor cities. And [How Many Days in Chongqing](/blog/how-many-days-in-chongqing) covers the broader Chongqing itinerary. This post focuses just on Liziba.

## What Liziba actually is (not a tourist attraction — a real metro station)

The first thing to understand is that Liziba is **not a tourist attraction**. It\'s a working commuter station on Chongqing Rail Transit Line 2 — built in 2004 — used by thousands of locals every day to get to work. The "through-the-building" design wasn\'t built for tourism. It was an engineering necessity because the residential apartment building was already there when the line was planned, and Chongqing\'s mountainous terrain meant the line had to pass through that specific elevation to connect adjacent stations.

The building is **19 storeys** tall. The metro line passes through floors **6, 7, and 8**. Above the metro: 11 storeys of normal residential apartments where people genuinely live. Below the metro: 5 storeys also residential. The platform itself is INSIDE the building — when you arrive at Liziba on Line 2, you\'re standing inside a partially soundproofed concrete shell embedded in someone\'s apartment block.

Once you understand that, the surreal photo opportunities make more sense — and frankly, it\'s more impressive in person than in the viral videos.

## How to get to Liziba from central Chongqing

**Option 1 — Metro (recommended)**: Take Line 2 from any central station (Linjiangmen, Jiaochangkou). Liziba is between Fotuguan and Niujiaotuo stations. Travel time from Jiefangbei (central business district) is about 8-12 minutes. Fare: equivalent of NZD $0.50-1.00. Use Alipay or WeChat Pay at the gate, or buy a single-ride ticket at the vending machine (cash or QR).

**Option 2 — Taxi or DiDi (faster, only marginally more expensive)**: 10-15 minutes from Jiefangbei, NZD $4-6. Useful if you\'re carrying luggage or it\'s very hot. Show the driver "李子坝轻轨站" or just say "Liziba" — every Chongqing driver knows the spot.

**Option 3 — Walk + metro combo**: If you\'re already at Hongyadong, you can walk 15-20 minutes through the riverside park and central streets to nearby Linjiangmen Station, then Line 2 one stop to Liziba.

## The two-step Liziba experience

### Step 1: Ride through the building

Get on Line 2 in either direction. Sit in the **first or last carriage** for the best view — you can see the daylight at both ends of the through-building section. The train enters the building, the windows briefly show daylight on both sides as you pass through the apartment block, and you exit on the other side. The whole sequence takes about 8-10 seconds. Have your phone ready in video mode if you want to capture it from inside.

### Step 2: Watch from the outside (the famous photo)

Exit at Liziba Station. Cross the main road to the opposite side. Walk about 100 metres to the **Liziba Light Rail Viewing Platform** (轻轨观景平台) — a small dedicated terrace built by the city specifically for the photo crowd. There are bench seats and posted train timetables.

Best photo angles:
- **From the viewing platform directly**: the classic "side-on" shot showing the train emerging from the building
- **From 30 metres to the left of the platform**: gives a tighter framing with the apartment balconies visible
- **From the small alley to the right**: gives a "looking up" angle with the train appearing higher in the frame

Best light:
- **9-11am**: morning sun on the building face, lowest crowds
- **4-6pm**: golden hour, slightly more people but cinematic light
- **Avoid midday in summer**: harsh overhead sun flattens the depth

Trains run every 4-8 minutes depending on time of day — you won\'t wait long.

## How long do you need at Liziba?

| Goal | Time needed |
|---|---|
| Just ride through once | 15-20 min including travel |
| Ride through + photo from viewing platform | 45-60 min |
| Full experience: ride, multiple photo angles, café break | 90 min |
| Combine with Hongyadong | Half day |
| Combine with Hongyadong + Jiefangbei | Full day |

Most CTS Tours NZ Chongqing itineraries slot Liziba into a half-day morning circuit: **Liziba (60 min) → Hongyadong (90 min) → Jiefangbei lunch + afternoon (3 hours) → hotpot dinner (2 hours)**.

## Photography tips (for Kiwi travellers who want the shot)

- **Phone is fine**: modern smartphones (iPhone 13+, Pixel 7+, Samsung S22+) handle the contrast easily. No need for a DSLR.
- **Use video mode for the train passing through**: a single still photo doesn\'t capture the "wait, what?" reaction the way video does.
- **Bring a wide-angle lens or use 0.5x on iPhone**: to fit the whole building plus the train in one frame.
- **The drone shot doesn\'t add much**: drones are technically allowed but the building is so dense that aerial doesn\'t reveal what ground-level can\'t already show.
- **Family photos**: ask a local — Chinese tourists routinely help foreign visitors photograph each other and are very friendly about it.

## Combining Liziba with other Chongqing sights

Liziba is in the same central district as several of Chongqing\'s headline sights. A logical morning circuit:

1. **Start at Liziba** (8-9am) — early light, no crowds
2. **Walk or short taxi to [Hongyadong](/hongyadong-chongqing)** (10am) — explore the multi-level cliff complex
3. **Lunch in Jiefangbei pedestrian area** (12pm) — any of the small noodle shops on the side lanes
4. **Afternoon at Three Gorges Museum** (1:30pm) — free entry, good context for the next day\'s Yangtze cruise
5. **Sunset at Eling Park** (5pm) — panoramic city view, mountains meeting river

This 6-7 hour circuit covers most of central Chongqing\'s "must see in one day" list. If you only have 2 days in Chongqing, this is Day 1.

## How Liziba fits into a longer China trip from NZ

Most Kiwi travellers visit Liziba as part of a multi-city China holiday. The typical CTS Tours NZ structure:

- **Days 1-4: Beijing** — Great Wall, Forbidden City, Temple of Heaven
- **Days 5-7: Xi\'an** — Terracotta Warriors, ancient city walls
- **Days 8-9: Chongqing** — **Liziba (morning) + Hongyadong + hotpot dinner** (Day 8), then day trip or Yangtze cruise embarkation (Day 9)
- **Days 10-12: Yangtze River cruise** to Yichang (if cruise included)
- **Days 13-14: Shanghai** — Bund, Yu Garden, fly Auckland

Total flying time from Auckland (return): approximately 26-28 hours including one stop each way. CTS Tours\' [Best of China](/campaigns/best-of-china) and [China tour packages from New Zealand](/china-tours-from-new-zealand) include variants of this route. The [Yangtze River cruise from Chongqing](/blog/yangtze-river-cruise-from-chongqing) post covers the cruise component in detail.

## A note on NZ visa-free entry

NZ ordinary passport holders can enter mainland China visa-free for up to **30 days per visit**, valid through 31 December 2026. Chongqing Jiangbei International Airport (CKG) accepts visa-free arrivals. You need:

- An NZ ordinary (blue) passport with at least 6 months remaining
- A return or onward ticket
- Accommodation confirmation (CTS tour documentation covers this)

If you\'re travelling on a non-NZ passport, the [China visa guide for New Zealand residents](/china-visa-guide-for-new-zealanders) covers other passport scenarios.

## Closing thoughts

Liziba is one of those rare tourist sights that genuinely lives up to its viral video reputation. It\'s free, it\'s easy to find, it photographs beautifully, and it gives you a real taste of how Chongqing solves the "mountain city + dense urban planning" puzzle. Most Kiwi travellers come away with not just the famous photo but a better appreciation of what makes Chongqing fundamentally different from any other Chinese city they\'ve seen.

If you want to talk through how to slot Liziba into a wider Chongqing or full China itinerary, the [CTS Tours team](/contact) is in Auckland and happy to help. China Travel Service has been arranging China tours globally since 1928 — our NZ team has been running Kiwi-focused trips through Chongqing for 25 years.

Pack a phone with charged battery, head to Line 2, and enjoy one of the few "must see" sights in China that\'s actually a working piece of public infrastructure.
`,
};
