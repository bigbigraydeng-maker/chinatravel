import type { BlogPost } from '@/lib/types/blog-post';
import type { StagingContent } from '@/lib/types/staging';
import { migratedUnsplash } from '@/lib/site-media';

/** Phase 1 travel-tips posts — also seeded into /blog/staging */
export const phase1TravelTipPosts: BlogPost[] = [
  {
    id: 'blog-packing-china',
    slug: 'what-to-pack-china-complete-packing-list-by-season',
    title: 'What to Pack for China: Complete Packing List by Season',
    excerpt:
      'I’m Baker Gu — the packing list I give Kiwi clients before they fly: layers, adapters, meds, culture-smart bits, and how I keep bags light for long China legs.',
    content: `
I’m **Baker Gu**, CTS’s China travel specialist. What you pack depends on season, region, and how we stitch cities together. I wrote this so **first-time visitors from New Zealand** can avoid over-packing but stay comfortable — whether you join one of [our small-group tours](/tours/china) or I build a tailor-made route from Auckland.

## Spring (March–May): Layers and rain-ready gear

Spring temperatures swing widely: Beijing can still feel cool in March, while southern cities warm quickly by May. Pack **light base layers**, a **packable waterproof jacket**, and a **mid-layer fleece** you can strip off at midday. Comfortable **walking shoes with grip** matter more than dress shoes — uneven temple steps and wet pavement are common.

Bring a **compact umbrella** or poncho; Yangtze-region drizzle is frequent. If you visit [Yangshuo or Guilin](/guide/yangshuo-travel-guide) karst country, mist and light rain can linger — quick-dry trousers beat denim.

## Summer (June–August): Heat, humidity, and sun protection

Coastal and inland basins become hot and humid. Pack **breathable shirts**, **linen or athletic blends**, **shorts or lightweight trousers** where culturally appropriate (temples and formal venues often expect covered shoulders/knees — carry a **wrap or light trousers** in your day bag).

Essentials: **high-SPF sunscreen**, **polarised sunglasses**, **wide-brim hat**, **reusable water bottle**, and **electrolyte sachets** (especially if you are not used to heat). For air-conditioned buses and hotels, a **light scarf or jumper** prevents chill.

## Autumn (September–November): The sweet spot for most routes

Crisp mornings and warm afternoons are typical in much of eastern China. Pack **layered clothing**, a **wind-resistant shell**, and **comfortable boots** if you walk historical sites all day. Autumn is ideal for photography — see our [seasonal overview](/seasonal-guide) and [best time to visit](/best-time-to-visit-china) for crowd patterns around Golden Week.

## Winter (December–February): North vs south

**Northern China** (Beijing, Xi'an): expect **thermal base layers**, **insulated coat**, **gloves**, **warm hat**, and **non-slip shoes** — icy pavements happen. **Southern** cities like Shanghai or Guangzhou are milder but damp; a **quality rain shell** and **mid-weight insulation** usually suffice.

## Electrical power and adapters

Voltage is **220V**. New Zealand plugs do not fit; pack a **universal adapter** with Type A/C/I support as needed, plus a **small power board** if you charge multiple devices. A **USB-C PD charger** reduces bulk.

## Toiletries and health

Bring **prescription medicines in original packaging** plus a short doctor’s note for customs peace of mind. **Basic first-aid** (plasters, rehydration, mild pain relief, throat lozenges) saves late-night pharmacy hunts. **Hand sanitiser** and **tissues** are practical — some public restrooms have limited paper.

## Culture-sensitive items

Avoid packing *controversial political slogans* on clothing or large quantities of **religious materials** that could attract questions at border control. Keep **valuables** in hotel safes; day bags should zip securely against pickpockets in busy stations (rare but sensible).

## Money-smart packing for NZ travellers

Budget roughly **NZD 40–120 per day** for casual meals and souvenirs on top of prepaid tours — carry **two cards** (Visa/Mastercard plus a backup) and some **CNY cash** for small vendors. I’ll suggest amounts once I see your exact itinerary.

## Final luggage strategy

Use **packing cubes**, **one soft “spare” fold** for shopping, and weigh bags before **Auckland** check-in. If you join a fast-paced route, **carry-on–only** is possible but tight — most guests prefer a **medium checked bag** plus a **20–28L daypack** for water, snacks, and layers.

Want me to match this list to a real route? [Browse China tours](/china-tours) or [contact me and the Auckland team](/contact) for a departure checklist with your name on it.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['packing China', 'what to pack', 'China travel', 'luggage tips', 'seasonal packing'],
    heroImage: migratedUnsplash('photo-1553531384-cc64ac80f931'),
    publishedAt: '2026-04-08',
    readTime: '14 min read',
  },
  {
    id: 'blog-apps-china',
    slug: 'essential-travel-apps-china-navigation-communication-payment',
    title: 'Essential Travel Apps for China: Navigation, Communication & Payment',
    excerpt:
      'I’m Baker Gu — the app stack I install for clients before AKL: VPN, maps, WeChat, payments, translation — so free evenings don’t turn into guesswork.',
    content: `
I’m **Baker Gu**. Mainland China’s digital ecosystem favours **local apps**. From Auckland, set expectations: many Western services are inconsistent without preparation. Here is what I tell people to download **before departure**, what actually works on the ground, and how **the journeys I design** keep friction low — though your free evenings still reward a solid stack.

## VPN: plan before you land

Research **reputable VPN providers** that your airline Wi-Fi and hotel networks tolerate. Install and test on your phone **before** leaving New Zealand; enable **auto-connect** on untrusted networks. VPN legality and reliability change — verify current policies. On my group tours, your guide can help with offline maps for backup.

## Maps: local apps beat Western defaults

**Amap (Gaode)** and **Baidu Maps** dominate. They offer walking/transit routing in Chinese; some listings have English. Learn to **star your hotel** and screenshot key addresses. Apple Maps has improved in major cities but is not universal. Download **offline packs** when the app allows.

## Translation: speech beats typing in a rush

**Pleco** remains strong for characters; **Google Translate** (with offline packs) helps if accessible. Many travellers use device **camera scan** on menus. A paper **hotel card** in Chinese still saves awkward taxi moments.

## WeChat: messaging + mini-programs

**WeChat (Weixin)** is ubiquitous for chat, restaurant ordering, and official account updates. Set up your profile early; some features need **real-name verification** tied to a phone number. Ask me or the team what travellers typically need versus what can wait.

## Payments: Alipay & WeChat Pay for international cards

**Alipay** and **WeChat Pay** increasingly accept **foreign cards** for short-term “Tour Card” style setups — policies evolve. Carry **CNY cash** for backup (street food, small towns). Notify your **NZ bank** of travel to reduce card blocks.

## Ride-hailing: DiDi for foreigners

**DiDi** is China's dominant ride-hailing platform — equivalent to Uber or Ola. Since 2023, DiDi has significantly improved its **international version** for visitors:

- Download **DiDi** (Didi — Car Booking App) from your App Store before departure
- Register with your **New Zealand mobile number** and a **Visa or Mastercard**
- The app has an **English-language interface** and shows fares upfront in CNY
- In major cities (Beijing, Shanghai, Chengdu, Xi'an, Guilin, Hangzhou), DiDi works reliably for airport runs, hotel transfers, and evening outings

**Practical tips for NZ travellers:**
- Type your **destination in English** — the app translates automatically
- **Express** (快车) is the standard affordable option; **Premiere** for airport runs with luggage
- Share your **trip status** with a travel companion for peace of mind
- On my Discovery and Signature tours, your guide handles transfers — DiDi is most useful for **free evenings** and personal excursions
- As a fallback, **Amap** (Gaode Maps) has a built-in ride-calling feature that integrates with multiple providers including DiDi

## Priority install order (simplified)

1. VPN (tested)  
2. Amap or Baidu Maps  
3. WeChat  
4. DiDi (ride-hailing)  
5. Alipay (if using)  
6. Translation + offline packs  
7. Airline / hotel apps  

## On tour vs independent time

My **Discovery** and **Signature** programmes handle core transfers and many meals — you may only need maps for free evenings. **Stopover** packages in single cities are ideal for practising this stack at a smaller scale — see [China stopover tours](/tours/china/stopover).

## Etiquette and batteries

Download content for **long train rides**; carry a **20,000mAh power bank** (check airline limits). Respect **photography rules** in stations and airports — security checks are strict.

Want an itinerary where I handle the logistics? [Explore guided China tours](/tours/china) or [request a quote](/contact).
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['China apps', 'travel apps', 'VPN', 'maps', 'translation'],
    heroImage: migratedUnsplash('photo-1512941937669-90a1b58e7e9c'),
    publishedAt: '2026-04-08',
    readTime: '12 min read',
  },
  {
    id: 'blog-safety-china',
    slug: 'safety-guide-travelling-china-tips-scams-etiquette',
    title: 'Safety Guide for Travelling in China: Tips, Scams & Cultural Etiquette',
    excerpt:
      'I’m Baker Gu — how I brief first-time Kiwis on safety: what’s genuinely low-risk, what annoys people, and the etiquette that keeps days smooth.',
    content: `
I’m **Baker Gu**. China is **generally very safe** for foreign visitors: violent crime in tourist areas is uncommon, and public transport is extensive. Most “problems” are **avoidable misunderstandings**, **traffic**, **food hygiene choices**, or **digital-payment learning curves**. I use this note for cautious first-timers from **Auckland** who want straight talk, not fear.

## Personal safety overview

**Street safety** in major cities compares favourably with many global metros. Use the same habits you would in London or Sydney: **mind belongings on packed metros**, **avoid obvious scams**, and **skip unlicensed taxis** — use app-hailed rides or your hotel desk. Night markets are lively; stick to **busy stalls** with high turnover for food.

## Common tourist pitfalls (not “danger”, but annoyance)

- **Tea house / art student** invitations to overpriced venues — polite decline.  
- **Unofficial “tour guides”** at station exits — meet only **pre-arranged CTS signage** or verified drivers I’ve confirmed for you.  
- **Currency confusion** — always confirm **CNY** totals on Alipay/WeChat screens before paying.

## Cultural etiquette that keeps interactions smooth

- **Gift-giving** with both hands; avoid **white/black wrap** associations some locals dislike.  
- **Pointing**: open hand beats a single finger in crowds.  
- **Queues** form firmly at stations — cutting in is culturally jarring.  
- **Photography**: ask before portraits in rural communities; some **museums ban flash**.

## Health and hospitals

Bring **travel insurance** with medical evacuation clarity. Major cities have **international clinics**; keep **digital copies** of prescriptions. **Air quality** varies — check AQI in winter/spring; pack a **reusable mask** if sensitive.

## Emergency numbers and documents

Save **your embassy/consulate** contact, **hotel address in Chinese**, and **our 24/7 tour handling** details if you are with us. Police **110**, ambulance **120**, fire **119** — write them in your notes app offline.

## Why I still push specialist routing

Structured itineraries reduce **variable risk**: vetted airport meets, **seat-forward planning** on high-speed rail, and **English-speaking local guides** who understand pacing for mixed ages. I’ll walk you through [Signature vs Discovery](/tours/china) on a call — no brochure theatre.

## Insurance checklist (NZ)

- **Medical** limits adequate for private hospitals  
- **Trip delay** for weather diversions  
- **Device** cover for loss  

If you want a calm first China trip with hotels and guides I stand behind, [browse our China collection](/china-tours-from-new-zealand) or [speak to me and the team](/contact).
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['safety China', 'travel safety', 'scams', 'etiquette', 'cultural tips'],
    heroImage: migratedUnsplash('photo-1508804185872-d7badad00f7d'),
    publishedAt: '2026-04-08',
    readTime: '13 min read',
  },
  {
    id: 'blog-best-time-china',
    slug: 'best-time-visit-china-seasonal-weather-crowds-guide',
    title: 'Best Time to Visit China: Complete Seasonal Weather & Crowds Guide',
    excerpt:
      'I’m Baker Gu — how I pick months for Kiwis: north vs south weather, Golden Week reality, and when I’d pay more to avoid a bad week.',
    content: `
I’m **Baker Gu**. There is no single “best month” for all of China — the country spans **subtropical coasts**, **high plateaus**, and **continental interiors**. For **Kiwi travellers** balancing weather, crowds, and airfare, I usually steer **first trips** toward **april–may** or **september–october** windows — with caveats below.

## National patterns: four seasons at a glance

**Spring** brings blooms and warming days but also **Qingming** and labour-related travel pulses — book early. **Summer** is hot and busy in cities; **mountain plateaus** (Yunnan, northern Sichuan access points) attract domestic escape travellers. **Autumn** offers **clear skies** in much of the east and excellent photography light — yet **National Day Golden Week (early October)** demands advance planning. **Winter** is off-peak for many routes; **Harbin ice** festivals and **southern mild** cities split preferences.

## Regional timing cheat sheet

- **Beijing / Xi'an corridor**: Pleasant **Apr–May** and **Sep–Oct**; harsh mid-winter cold; summer storms possible.  
- **Shanghai / Suzhou / Hangzhou**: **Humid summers**; **late autumn foliage** is lovely.  
- **Guilin / Yangshuo / Li River**: Misty spring; busy summer; photographers love **May–Jun** and **Sep**. See [Guilin guide](/guide/guilin-travel-guide).  
- **Zhangjiajie towers**: **Spring–autumn** clearest; summer fog romance vs visibility trade-offs.  
- **Sichuan / Chengdu**: **Year-round** appeal; pandas more active mornings year-round.  

## Holidays and pricing

Domestic **Golden Week** and **Chinese New Year** spike **hotel rates** and train sell-outs. Our pricing reflects market reality — I help you **route around** peaks where possible or **lock inventory** early.

## Weather extremes

Typhoons can affect **east coast** summer flights; **sandstorms** occasionally hit north in **late winter/spring**. Build **buffer days** for international connections if self-connecting via **Auckland**.

## Photography and festivals

**Ethnic festivals** and **lantern dates** vary by lunar calendar — loop me in if you want lantern markets or **minority New Year** experiences. For camera-focused trips, read my [photography hidden gems](/blog/photography-guide-china-best-locations-hidden-gems) companion post.

Ready to pick dates with a human? [Read our month-by-month seasonal tool](/seasonal-guide) then [request an itinerary](/contact).
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['best time China', 'China weather', 'seasons', 'travel seasons', 'crowds'],
    heroImage: migratedUnsplash('photo-1469474968028-56623f02e42e'),
    publishedAt: '2026-04-08',
    readTime: '14 min read',
  },
  {
    id: 'blog-photo-china',
    slug: 'photography-guide-china-best-locations-hidden-gems',
    title: 'Photography Guide to China: Best Locations & Hidden Gems',
    excerpt:
      'I’m Baker Gu — field notes for photographers: light, lenses, drone reality, and the side gates I ask guides to use so you’re not fighting busloads.',
    content: `
I’m **Baker Gu**. China rewards photographers who **wake early** and **stay flexible**. Icons like the **Forbidden City** and **Great Wall** are essential — but **secondary ridges**, **riverside dawn mists**, and **old town lanes** often yield your favourite frames. Here is the **field guide** I give travellers flying from **New Zealand** with limited gear.

## Classic locations that earn their fame

**Great Wall**: Mutianyu and Jinshanling offer **texture and fewer midday crowds** if you time shuttles early. **Zhangjiajie**: mid-morning fog vs harsh noon contrast — revisit viewpoints. **Li River / karst**: **mist after rain** simplifies backgrounds; polarise carefully for water glare. **Yuanyang terraces** (if extending south): seasonal water fill changes reflections.

## Hidden-gem mindset

Swap “secret GPS pins” for **process**: ride the **second cable car**, walk **20 minutes past** the main platform, eat lunch where **local buses** stop — edges of parks quieten first. **The guides I brief** know **side gates** with shorter morning queues.

## Light and timing

**Blue hour** in cities with neon (Shanghai, Chongqing river angles) balances ambient. **Temples**: avoid midday specular highlights on gilt; **overcast** softens stone carvings. Carry a **compact tripod** (check **park rules** — some ban full tripods without permits).

## Drone regulations

China regulates **UAS strictly**. Assume **no-fly** near airports, military zones, and many **heritage parks** without permits. Check **current CAAC/local notices**; penalties are serious. When uncertain, **shoot handheld** from viewpoints — safety first.

## Cultural sensitivity

Do not **stage intrusive portraits** of elders without consent; avoid **flash** on murals. **Monasteries** may prohibit photography in halls — obey instantly.

## Gear discipline for carry-on travellers

A **24–70mm equivalent** covers 80% of city needs; add a **70–200mm** for mountain compression if weight allows. **ND filters** help river long exposures; **lens cloths** fight humidity haze.

## Tie-in tours

Photographers often combine **Guilin + Zhangjiajie** with a **Yangtze segment** — explore [China Signature](/tours/china/signature) pacing or ask for a **Discovery** overview loop on [China tours hub](/china-tours).

Send me your shot list — [tailor-made planning](/tailor-made) lets me allocate **golden-hour windows** without rushing luggage transfers.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['photography China', 'hidden gems', 'photo locations', 'travel photography', 'landscape'],
    heroImage: migratedUnsplash('photo-1493976040374-85c8e12f0c0e'),
    publishedAt: '2026-04-08',
    readTime: '13 min read',
  },
];

function socialFor(postId: string): StagingContent['socialVersions'] {
  const commonCta = 'Full guide on ChinaTravel (CTS Tours).';
  const maps: Record<string, StagingContent['socialVersions']> = {
    'blog-packing-china': {
      linkedin: `What Kiwi travellers should pack for China — by season.\n\n• Layers beat bulky coats in spring/autumn\n• Voltage 220V + adapter essentials\n• Footwear for temples & wet stone\n• Cash + two cards backup\n\n${commonCta}\n#ChinaTravel #PackingList #NZ`,
      xiaohongshu:
        'Packing for China from NZ ✈️\nLayers + rain shell beat one heavy coat. 👟 Comfortable shoes beat dress shoes.\nAdapter + power bank before you fly 🔌\nFull checklist in CTS ChinaTravel 👇\n#ChinaTravel #PackingList #NZ',
        weibo:
        'Pre-trip packing for China: layered clothing, 220V adapter, walking shoes. Kiwis: two cards + a little cash. Full article on CTS Tours. #ChinaTravel #PackingGuide',
    },
    'blog-apps-china': {
      linkedin: `China travel stack for 2026 trips: VPN tested pre-departure, Amap/Baidu for routing, WeChat ecosystem, Alipay/WeChat Pay setups, offline translation packs.\n\nPlan before AKL departure.\n\n${commonCta}\n#TravelTech #China`,
      xiaohongshu:
        'Install these before you fly 📱 Maps, translation, payments — one read-through.\nTest VPN and apps in Auckland ✅\nSaves hassle on free days.\n#ChinaTravel #Apps',
      weibo:
        'Before departure: maps (Gaode/Baidu), offline translation, WeChat/Alipay. Install and test before leaving Auckland. #ChinaTravel #TravelTips',
    },
    'blog-safety-china': {
      linkedin: `Safety realism for China first-timers: low violent crime in tourist cores, watch for tea-house scams, queue culture, hospital/insurance basics, 110/120/119 saves offline.\n\n${commonCta}\n#TravelSafety`,
      xiaohongshu:
        'Is China safe for first-timers? Generally yes ⚠️ Watch tea-house scams, keep an eye on payments, save emergency numbers ❤️ #TravelSafety #China',
      weibo:
        'China travel safety: good public transport and low violent crime; beware overpriced tea-house invites; carry insurance and emergency contacts. #TravelSafety',
    },
    'blog-best-time-china': {
      linkedin: `Seasonality across China is not one curve: compare Apr–May vs Sep–Oct windows, Golden Week pricing, regional humidity & typhoon risk, winter north vs mild south.\n\n${commonCta}\n#TripPlanning`,
      xiaohongshu:
        'When is the best time for China? Spring & autumn feel best 🍂 Book early for Golden Week! North vs south climate differs a lot — match dates to your route. #TripPlanning',
      weibo:
        'Seasons vary north to south; first trips often aim for Apr–May or Sep–Oct; Golden Week and CNY spike prices — plan early. #ChinaTravel #Seasons',
    },
    'blog-photo-china': {
      linkedin: `Photography field notes: dawn beats bus-loads at major sites; ND filters on rivers; drone permits strict—assume no-fly in many parks; cultural consent beats viral shots.\n\n${commonCta}\n#TravelPhotography`,
      xiaohongshu:
        'Three photo tips in China: wake early, pack a light kit, respect no-fly zones 🚫 Misty Li River mornings 📸\n#TravelPhotography #Landscape',
      weibo:
        'Photo tips: golden hour light; Li River/Zhangjiajie haze and rain; check drone rules every time. #Photography #ChinaTravel',
    },
  };
  return maps[postId];
}

const statusRotation: StagingContent['status'][] = [
  'published',
  'published',
  'approved',
  'pending-review',
  'draft',
];

export const phase1StagingEntries: StagingContent[] = phase1TravelTipPosts.map((post, i) => ({
  id: `${post.id}-staging`,
  type: 'blog',
  title: post.title,
  slug: post.slug,
  content: post.content,
  metadata: {
    description: post.excerpt,
    keywords: post.tags,
    category: post.category,
  },
  socialVersions: socialFor(post.id),
  status: statusRotation[i] ?? 'draft',
  createdAt: '2026-04-07T20:00:00.000Z',
  updatedAt: '2026-04-08T08:00:00.000Z',
  submittedBy: i % 2 === 0 ? 'Claude' : 'Cursor',
  approvedBy: statusRotation[i] === 'published' || statusRotation[i] === 'approved' ? 'CTS Editor' : undefined,
  publishedAt:
    statusRotation[i] === 'published' ? '2026-04-08T09:00:00.000Z' : undefined,
}));
