import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash } from '@/lib/site-media';

/**
 * Long-tail SEO batch 1 — 15 articles across 3 tour lines
 * Line A: Beijing / Xi'an (5 posts)
 * Line B: Shanghai & Surroundings (5 posts)
 * Line C: Chongqing / Chengdu (5 posts)
 * Target: GSC impression data after 4 weeks to determine ad spend priority
 */
export const longtailBatch1Posts: BlogPost[] = [

  // ─────────────────────────────────────────────
  // LINE A: BEIJING / XI'AN
  // ─────────────────────────────────────────────

  {
    id: 'lt-a1',
    slug: 'beijing-xian-itinerary-10-days',
    title: 'The Perfect 10-Day Beijing & Xi\'an Itinerary (From New Zealand)',
    excerpt: 'A practical day-by-day guide to 10 days in Beijing and Xi\'an — the Forbidden City, Great Wall, high-speed train, and Terracotta Warriors — designed for New Zealand travellers doing China for the first time.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Beijing', 'Xi\'an', 'Itinerary', 'China Tours', 'First Time China', 'New Zealand'],
    heroImage: '/blog/group-great-wall-cts.jpg',
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    content: `
A 10-day Beijing and Xi'an trip is the single most rewarding first China itinerary for New Zealand travellers. You get imperial Beijing in the north, a high-speed train journey across northern China, and the ancient capital of Xi'an — home to the Terracotta Warriors — in one clean loop. No internal flights. No rushed transit. Just two of the most historically significant cities on earth, connected by one of the world's great train journeys.

Here is how CTS Tours structures 10 days across both cities, and why we make the choices we do.

## Why Beijing and Xi'an Together?

Beijing and Xi'an represent two distinct chapters of Chinese civilisation. Beijing is Ming and Qing Dynasty imperial China — the Forbidden City, the Great Wall, the Temple of Heaven, the hutong laneways of old Peking. Xi'an is the even older story: the first unified Chinese empire, the Han Dynasty trade routes to Rome, and the three terracotta armies buried to guard an emperor who died 2,200 years ago.

Together, they give you a span of history that most Western itineraries never manage. And crucially, the high-speed rail between them — around four hours, comfortable, no airports — makes the combination logistically simple.

## Day-by-Day: 10-Day Beijing & Xi'an Itinerary

**Days 1–2: Arrive Beijing**

You'll fly from Auckland via a hub city (most commonly Shanghai or Beijing direct). After landing and settling into your 4-star centrally located hotel, the first afternoon is light — orientation, jet lag recovery, and a walk to get the feel of the city.

Day 2 is your first full Beijing day: Tiananmen Square in the early morning (arrive before the crowds), then through the Meridian Gate into the Forbidden City. The scale takes time to absorb — 980 buildings, 9,999 rooms, six centuries of imperial ceremony happening in this one complex. Allow 3–4 hours minimum.

**Day 3: Great Wall**

We recommend the Mutianyu section for most first-time visitors — well-restored, less crowded than Badaling, and the toboggan descent is genuinely fun. The drive out of Beijing gives you your first sense of the scale of northern China: the city doesn't end so much as it gradually thins out into hills.

The Great Wall in person is different from every photo you've seen. It's narrower than you expect, steeper in places than you'd believe possible to build, and extends further into the mist in both directions than your brain can easily process. Give it a full morning.

**Day 4: Temple of Heaven and Hutongs**

The Temple of Heaven is where the Ming and Qing emperors came to pray for good harvests — a circular, cobalt-blue hall in a vast park that feels completely different from the Forbidden City's fortress-like walls. Morning is best, when local residents use the park for tai chi, ballroom dancing, and what appears to be very competitive badminton.

The afternoon goes to a hutong tour by pedicab — the narrow alleyways of old Beijing, mostly demolished but partially preserved around the Drum Tower. This is where Beijing residents actually lived for centuries, and it provides the human scale that the imperial monuments deliberately avoid.

**Day 5: Beijing → Xi'an by High-Speed Train**

This is one of the best days of the trip, even though it's technically a transit day. The G-class high-speed train from Beijing South takes approximately four hours to reach Xi'an North — pulling out of the capital through suburbs, then across the vast North China Plain, with the landscape gradually becoming more rugged as you approach Shaanxi Province.

Your guide meets you at Xi'an North Station and transfers you to your hotel within the city walls.

**Day 6: Terracotta Warriors**

Allow a full day. The Terracotta Army is 35km from Xi'an city — close enough for a comfortable day trip, far enough to be a genuine excursion rather than a quick walk.

Three pit halls are open to visitors. Pit 1 is the one you've seen in photographs: rows of infantry and cavalry stretching the length of a football pitch. Pit 2 contains cavalry and archers. Pit 3 is the command structure. The scale in person is different from photos — the figures are life-size, which means you're standing at ground level looking at a thousand faces, each one individually sculpted, none identical.

The story behind them matters almost as much as the sight: Qin Shi Huang, the first emperor to unify China, had these figures buried around 210 BC to guard him in the afterlife. They were discovered by farmers digging a well in 1974. The dig is still ongoing.

**Day 7: Xi'an City Walls and Muslim Quarter**

Xi'an's ancient city walls are among the best-preserved in China — 14km of walkable ramparts, wide enough to cycle along the top. Rent a bike from the South Gate and ride the full circuit for the best view of the city inside and the modern skyline outside.

The Muslim Quarter (Huimin Jie) is a working neighbourhood — not a tourist reconstruction — centred on the Great Mosque of Xi'an, one of China's oldest Islamic sites. The streets leading to it are a dense, fragrant corridor of street food: lamb skewers, roujiamo (Chinese "hamburgers"), persimmon cake, and pomegranate juice. Eat your way through it.

**Day 8: Shaanxi History Museum and Banpo**

The Shaanxi History Museum holds one of the finest collections of Chinese antiquities outside Beijing — particularly the Tang Dynasty golden age pieces (618–907 AD) from when Xi'an was the eastern terminus of the Silk Road. The free permanent collection is outstanding; the special exhibitions are worth the small additional fee.

**Days 9–10: Return to Beijing, Fly Home**

The itinerary returns to Beijing for the international connection home. Depending on your flight timing, you may have a final morning in the capital — the Summer Palace is a good option if you missed it on the way out.

## Practical Information for NZ Travellers

**Visa:** Many New Zealand passport holders currently qualify for China's visa-free entry policy for short leisure visits. Confirm the current rules before booking, as policies can change. CTS Tours can advise.

**Weather in October:** Beijing and Xi'an in October are excellent — clear skies, mild temperatures (10–20°C), the city trees turning golden. It's arguably the best month of the year to visit northern China.

**What's included with CTS:** International airfares from Auckland, all domestic travel, 4-star hotels, English-speaking guide throughout, entrance fees to all listed sites, meals as per itinerary. Tips are suggested at NZD $10 per person per day.

## Book the Tour

CTS Tours offers **A Tale of Two Cities** — a 10-day Discovery tour covering exactly this itinerary, from NZD $3,480 per person (twin share). Departs October 2026 from Auckland.

[View the full tour details →](/tours/china/discovery/beijing-xian)
    `
  },

  {
    id: 'lt-a2',
    slug: 'first-time-china-beijing-xian',
    title: 'First Time in China? Why Beijing + Xi\'an Is the Right Starting Point',
    excerpt: 'If you\'re planning your first trip to China from New Zealand, Beijing and Xi\'an is the most rewarding and logistically sensible combination. Here\'s why — and how to do it properly.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['First Time China', 'Beijing', 'Xi\'an', 'New Zealand', 'China Travel Tips'],
    heroImage: '/blog/group-temple-of-heaven-beijing.jpg',
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
The most common question we get from New Zealand travellers planning their first China trip: *where should I go?*

The honest answer, almost every time, is Beijing and Xi'an.

Not Beijing and Shanghai. Not a grand sweep of five cities. Not the Yangtze River cruise. For a first visit — particularly if you have 10 days — Beijing combined with Xi'an gives you the most rewarding experience with the least logistical friction.

Here's why we keep recommending this combination, and what makes it work so well for Kiwi travellers.

## The Case for Beijing + Xi'an as a First China Trip

**You get the two most historically significant cities in China.**

Beijing is imperial China — the Forbidden City, the Great Wall, the Temple of Heaven. Five centuries of Ming and Qing Dynasty power concentrated in one city. It is, by most measures, the most impressive collection of ancient monuments in the world still functioning in their original urban setting.

Xi'an is older and in some ways even more astonishing. It was the capital of China under the first unified empire (Qin Dynasty, 221 BC) and the eastern terminus of the Silk Road during the Tang Dynasty golden age (618–907 AD). The Terracotta Warriors are the most obvious draw, but the city walls, the Muslim Quarter, and the Shaanxi History Museum each justify the visit independently.

**The route is simple and stress-free.**

Beijing to Xi'an is a direct high-speed train — no internal flights, no airport transfers, no connection anxiety. You board at Beijing South, the train reaches up to 300km/h across the North China Plain, and you arrive at Xi'an North approximately four hours later. The guide meets you at the station. It is genuinely one of the smoothest inter-city transitions in the world.

**It's the right scope for 10 days.**

A first China trip that tries to cover Beijing, Shanghai, and Xi'an in 10 days ends up rushed and exhausting. Two cities done properly — with time to absorb them, to walk without a schedule, to eat without rushing — is a far better experience than three cities done at pace.

## The Objections We Hear — Answered

**"But I want to see Shanghai."**

Shanghai is an excellent China trip in its own right — but it's a very different experience from Beijing and Xi'an. Shanghai is modern, coastal, cosmopolitan. Beijing and Xi'an are ancient, landlocked, imperial. If you try to combine all three in one 10-day trip, you end up with 2–3 days in each city, which is genuinely not enough for any of them.

Our recommendation: do Beijing and Xi'an first. Return for Shanghai and the Jiangnan water towns later.

**"Is China difficult to navigate independently?"**

It depends what you mean. The high-speed rail system is genuinely excellent and the major tourist sites are well-signposted. But for a first visit, the language barrier is real, the distances are large, and the difference between a good guide and no guide is the difference between understanding what you're seeing and just looking at it.

For most first-time visitors from New Zealand, a guided tour for at least the first China trip is the right call — not because China is dangerous, but because a knowledgeable guide turns a confusing experience into a coherent one.

**"Is China safe for New Zealand travellers?"**

Yes. China has very low rates of petty crime, the tourist infrastructure in Beijing and Xi'an is well-developed, and the food safety standards in 4-star hotels and reputable restaurants are reliable. The main practical challenges are pollution (Beijing has improved significantly in recent years), crowds at major sites (manageable with early starts), and the language barrier (manageable with a guide).

## The October Factor

If you're flexible on timing, October is the best month for northern China. The summer heat and humidity have passed, the skies are clearer after the monsoon season, and the temperature (10–20°C in October) is ideal for walking. The trees around the Summer Palace and hutong neighbourhoods turn golden, and the Great Wall in autumn light is genuinely stunning.

CTS Tours' October 2026 departure for this itinerary leaves from Auckland on 15 October — timed specifically for the best conditions in both cities.

## Visa for New Zealand Travellers

Many New Zealand passport holders currently qualify for China's visa-free entry policy for short leisure visits (typically up to 15 days). This makes a 10-day trip accessible without the lead time of a full visa application. Confirm the current requirements with CTS or the Chinese Embassy before booking, as policies are subject to change.

## What to Book

CTS Tours offers **A Tale of Two Cities** — 10 days, Beijing + Xi'an, guided throughout, from NZD $3,480 per person (twin share). Includes international airfares from Auckland, 4-star hotels, high-speed train, entrance fees, and English-speaking guide.

[View tour details and departure dates →](/tours/china/discovery/beijing-xian)
    `
  },

  {
    id: 'lt-a3',
    slug: 'beijing-to-xian-high-speed-train',
    title: 'Beijing to Xi\'an by High-Speed Train: Everything NZ Travellers Need to Know',
    excerpt: 'The high-speed train between Beijing and Xi\'an is one of the best travel experiences in China. Here\'s how it works, what to expect, and why it\'s better than flying.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['Beijing', 'Xi\'an', 'High Speed Train', 'China Rail', 'China Travel Tips'],
    heroImage: '/blog/group-bullet-train-large.jpg',
    publishedAt: '2026-04-25',
    readTime: '5 min read',
    content: `
The high-speed train from Beijing to Xi'an is one of those travel experiences that changes how you think about transport. It's fast, comfortable, punctual, and the journey itself — 1,200km across the North China Plain and into Shaanxi Province — is genuinely interesting to watch unfold through the window.

If you're visiting both cities on a China tour, this train is almost always the right choice over flying. Here's everything you need to know.

## The Basics

**Route:** Beijing South Station → Xi'an North Station
**Train class:** G-class (Gaotie) high-speed, 2nd class seating
**Journey time:** Approximately 4–5 hours depending on service
**Top speed:** Up to 300km/h
**Distance:** Approximately 1,215km

The G-class trains are China's flagship high-speed services — wide seats, quiet carriages, smooth ride, and a catering trolley that passes regularly with drinks, snacks, and instant noodles. 2nd class is the standard booking for tour groups; it's comfortable and entirely adequate for a 4-hour journey.

## Beijing South Station

Beijing South is one of China's largest railway stations — a vast, modern terminal with multiple levels for high-speed and conventional rail. It's not in central Beijing; allow at least 30–40 minutes from the city centre by metro or taxi, and arrive at least 30 minutes before departure.

On a guided tour, your guide handles the logistics: tickets are collected in advance, the group moves through the station together, and boarding is straightforward. For independent travellers, the station is well-signposted in English, and the process — showing your ticket at the gate, finding the platform, boarding the correct carriage — is manageable with basic preparation.

## Xi'an North Station

Xi'an North is similarly large and modern, located about 15km from the city centre. Taxis and the metro (Line 2) connect it to the city. Again, on a guided tour, your guide meets the group at the station exit and transfers you to your hotel.

## The Journey

The train departs Beijing and passes through southern Beijing's outer suburbs before entering the North China Plain — a vast, flat agricultural landscape that extends for hours. This is one of the most densely populated and historically significant agricultural regions in the world, and watching it scroll past at 300km/h gives you a visceral sense of China's scale that no map or statistic can replicate.

As the train approaches Xi'an, the landscape changes: the plains give way to the hills of Shaanxi Province, the loess plateau that has shaped Chinese civilisation since its earliest recorded history. By the time you arrive at Xi'an North, you have crossed something you can feel as well as see.

## Why Not Fly?

Several reasons, in rough order of importance:

**The airport experience is worse.** Domestic air travel in China means getting to the airport 90 minutes before departure, check-in queues, security, gate waits, boarding, taxiing — add it up and the time saving over the train is often minimal, while the comfort deficit is significant.

**The train stations are more central.** Beijing South and Xi'an North are both connected to the city metro. The airports are further out and less convenient.

**The journey is part of the experience.** The train crossing northern China is genuinely interesting. The flight is not.

**Lower carbon footprint.** For travellers thinking about this: high-speed rail produces significantly less CO₂ per passenger-kilometre than domestic air travel.

## On a CTS Tour

CTS Tours includes the Beijing–Xi'an high-speed train (2nd class) as a standard inclusion in the **A Tale of Two Cities** Discovery tour. Tickets are arranged in advance, and your guide accompanies the group from Beijing South to Xi'an North. There's nothing you need to organise or worry about — you simply turn up at the station and board.

[View the full Beijing & Xi'an tour →](/tours/china/discovery/beijing-xian)
    `
  },

  {
    id: 'lt-a4',
    slug: 'terracotta-warriors-guide-nz',
    title: 'Visiting the Terracotta Warriors: A Guide for New Zealand Travellers',
    excerpt: 'The Terracotta Army is one of the greatest archaeological discoveries in history. Here\'s what to expect, how to make the most of your visit, and why it deserves a full day.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Terracotta Warriors', 'Xi\'an', 'China History', 'UNESCO', 'New Zealand Travel'],
    heroImage: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-25',
    readTime: '7 min read',
    content: `
The Terracotta Army is one of those rare travel experiences where the reality exceeds the expectation. You've seen the photographs. You know the scale. And then you walk into Pit 1 and find that the photographs were not adequate preparation for what it's actually like to stand in front of several thousand life-sized warriors, each one individually sculpted, stretching away from you toward a horizon that's inside a building.

Here's everything New Zealand travellers need to know before visiting.

## The Background

Qin Shi Huang unified China for the first time in 221 BC, founding the Qin Dynasty and establishing himself as the first emperor. He then spent significant resources preparing for his afterlife — including a buried army of terracotta soldiers, horses, and chariots designed to protect him in death as his real armies had protected him in life.

The warriors were discovered in March 1974 by farmers digging a well outside Xi'an. They notified local authorities; archaeologists arrived; and what followed was one of the most significant archaeological excavations of the 20th century, still ongoing more than 50 years later.

The buried complex is enormous — it surrounds the emperor's actual tomb mound, which has not yet been excavated. The three warrior pits open to visitors are just one part of what has been found.

## The Three Pits

**Pit 1** is the one in all the photographs. It's housed in a large hangar-like building — the largest on the site. The scale is immediately apparent: rows of infantry extending to the far wall, horses and chariots at intervals, the colour long faded from the clay figures but the detail in every face, every uniform, every hand position still sharp after 2,200 years.

Crucially, no two faces are the same. Each warrior was modelled on a real soldier, with individual facial features sculpted by different craftsmen. This is not mass production in any modern sense — it is the recorded face of an actual person who lived in China in the third century BC.

**Pit 2** is smaller and contains cavalry units and archers. Some of the most technically impressive pieces are here — the kneeling archers in particular, with extraordinary detail in the straps and laces of their armour.

**Pit 3** is interpreted as the command structure: a small group of higher-ranking officers, their horses, and a war chariot. It's also where some of the most damaged pieces are on display — broken by the wooden roof collapsing in antiquity — which gives the pit an eerie, excavation-in-progress atmosphere.

## The Exhibition Halls

Before or after the pits, the on-site museum displays individual warriors and horses at close range, allowing you to examine the craftsmanship that's harder to appreciate from the viewing distances in the pits. The bronze chariots and horses discovered in a separate pit near the emperor's tomb are also here — exquisitely detailed, about half the size of real horses, fully functional miniatures of working vehicles.

## Practical Advice

**Time required:** A proper visit to all three pits plus the museum takes 3–4 hours. Most guided tours allocate a full morning or afternoon.

**Getting there:** The site is 35km east of Xi'an city centre — approximately 45 minutes by road. On a guided tour, transport is included. Independent travellers can take Bus 306 from Xi'an train station.

**Crowds:** The site receives millions of visitors per year. Weekdays are significantly quieter than weekends. Early morning (opening time, 8:30am) is the least crowded period in Pit 1. If your tour arrives mid-morning, the main pit will be busy — adjust expectations accordingly.

**Photography:** Photography is permitted in all pits. Flash is not necessary and can be irritating to other visitors; turn it off.

**The guide matters.** The significance of what you're seeing isn't self-evident from the figures themselves. A guide who can explain the historical context, identify specific details in the warrior types, and explain the excavation process makes the visit several times more meaningful than wandering without that context.

## Combining Xi'an with Beijing

The Terracotta Warriors are the anchor of any Xi'an visit, but they shouldn't be the only reason to go. The city's ancient walls, the Muslim Quarter, and the Shaanxi History Museum are each worth half a day. CTS Tours allocates 3 full days in Xi'an as part of the **A Tale of Two Cities** itinerary — enough time to do all of them properly.

[View the Beijing & Xi'an tour →](/tours/china/discovery/beijing-xian)
    `
  },

  {
    id: 'lt-a5',
    slug: 'beijing-xian-tour-new-zealand',
    title: 'Beijing & Xi\'an Tours from New Zealand: What to Expect (2026 Guide)',
    excerpt: 'Planning a Beijing and Xi\'an tour from New Zealand? Here\'s what\'s included, what to budget, when to go, and why booking with an Auckland-based operator makes a difference.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['Beijing', 'Xi\'an', 'New Zealand', 'China Tours', 'Tour Packages', 'NZD'],
    heroImage: '/blog/group-lake-deck-beijing.jpg',
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
Booking a China tour from New Zealand has historically meant dealing with operators based in Australia or the UK — companies with good products but no particular understanding of what Kiwi travellers want or expect, and no one to call in your timezone.

CTS Tours is different. We're Auckland-based, have been running guided China tours for New Zealand travellers for decades, and price everything in NZD. Here's what you should know about booking a Beijing and Xi'an tour from New Zealand in 2026.

## What's Typically Included

A fully-inclusive Beijing and Xi'an tour from New Zealand should cover:

**International airfares** from Auckland to Beijing, and return. Most routes connect through Shanghai, Hong Kong, or a Southeast Asian hub. Journey time is approximately 12–14 hours including connection.

**Domestic transport** within China — the high-speed train from Beijing to Xi'an (2nd class) is typically included, along with all coach transfers between hotels and attractions.

**4-star hotel accommodation** in centrally located hotels in both cities. In Beijing, central means within reasonable distance of Tiananmen/Wangfujing. In Xi'an, central means inside or adjacent to the city walls.

**English-speaking guide throughout** — not just for specific sites, but accompanying the group from arrival to departure. This is the single most important inclusion on any China tour.

**Entrance fees** to all listed sites: Forbidden City, Great Wall, Temple of Heaven, Terracotta Warriors, city walls, and others depending on the itinerary.

**Meals as specified** — typically breakfast daily, some lunches at local restaurants, and a highlight dinner (Peking Duck in Beijing is standard on CTS itineraries).

## What's Typically Excluded

**Travel insurance** — strongly recommended for any international trip. CTS Tours does not include this in the tour price; purchase it separately before departure.

**Tips** — the standard suggestion is NZD $10 per person per day for the guide and driver.

**Personal expenses** — shopping, optional activities, beverages beyond included meals.

**China visa fee** (if required) — check the current visa-free entry rules for New Zealand passport holders before booking.

## Pricing in 2026

CTS Tours' **A Tale of Two Cities** — 10 days, Beijing + Xi'an — is priced from NZD $3,480 per person (twin share). Single supplement is additional; enquire when booking.

This pricing includes international airfares from Auckland. If you're used to seeing China tour prices in Australian or British dollars and converting, or seeing land-only packages that exclude flights, the all-inclusive NZD pricing is straightforwardly comparable: this is the full cost of the trip from your door to China and back.

## When to Go

**October** is the best month for northern China. The summer heat has passed, the skies are typically clear after the monsoon season, temperatures are 10–20°C — ideal for walking — and the autumn foliage around the Summer Palace and hutong areas is genuinely beautiful.

CTS Tours' 2026 October departure leaves Auckland on **15 October**. This timing is chosen deliberately for the best conditions.

**April–May** is the second-best window — spring blossoms, good temperatures, before the summer humidity arrives. We also run spring departures; enquire for dates.

**Avoid:** July and August in Beijing are hot (35°C+) and humid, and July–August is peak domestic tourism season in China, which means larger crowds at all major sites.

## Visa-Free Entry for NZ Travellers

New Zealand passport holders currently benefit from China's visa-free entry policy for short leisure visits. This makes the logistics of a first China trip simpler — no embassy appointment, no waiting period, no visa photo requirements. Confirm the current rules before booking; policies are subject to change.

## Why Book with an Auckland-Based Operator

The practical difference: when you have a question at 2pm on a weekday, you call us. Not an Australian toll-free number. Not a UK call centre. Us, in Auckland, in your timezone, familiar with where you're flying from and what matters to you.

We've been running China tours for New Zealand travellers for decades. We know what Kiwi travellers find surprising about China, what they find challenging, and what they find extraordinary. Our itineraries are designed with that knowledge, not adapted from a product built for a different market.

[Enquire about the Beijing & Xi'an tour →](/tours/china/discovery/beijing-xian)
    `
  },

  // ─────────────────────────────────────────────
  // LINE B: SHANGHAI & SURROUNDINGS
  // ─────────────────────────────────────────────

  {
    id: 'lt-b1',
    slug: 'shanghai-suzhou-hangzhou-itinerary',
    title: 'Shanghai, Suzhou & Hangzhou: The Complete Jiangnan Itinerary',
    excerpt: 'The Yangtze Delta — Shanghai, Suzhou\'s classical gardens, Wuxi\'s lake country, and Hangzhou\'s West Lake — is one of China\'s great travel routes. Here\'s how to do it properly from New Zealand.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Shanghai', 'Suzhou', 'Hangzhou', 'Jiangnan', 'China Tours', 'New Zealand'],
    heroImage: '/blog/group-shanghai-bund-skyline.jpg',
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    content: `
Jiangnan — the land south of the Yangtze — is one of China's most distinct regions. Canals, classical gardens, silk production, refined cuisine, and cities that have been prosperous for a thousand years. It is not the China of the Great Wall or the Terracotta Warriors. It is softer, greener, more intimate — and for many travellers, the more surprising and lasting experience.

A tour combining Shanghai with Suzhou, Wuxi, and Hangzhou gives you both faces of modern China: the hyper-kinetic international city of the 21st century, and the ancient, water-laced culture that shaped Chinese aesthetics for centuries.

## The Route

The CTS **Shanghai & Surroundings** tour runs as a Yangtze Delta loop: fly into Shanghai, travel through Suzhou and Wuxi toward Hangzhou, then return to Shanghai for departure. The inter-city distances are short — often 1–1.5 hours by coach — which means less time in transit and more time in each place.

**Suzhou (2 nights)** is the classical gardens capital. The city has nine UNESCO World Heritage gardens, built by retired officials and scholars over several centuries as private retreats. The Humble Administrator's Garden (Zhuozheng Yuan) and the Master of the Nets Garden are the finest, but each of the nine has a distinct character. Suzhou also has an ancient canal district that predates Venice as a water city.

**Wuxi (1–2 nights)** sits on the shores of Lake Tai — a vast freshwater lake dotted with islands. The lakeside scenery is the draw: classical pavilions on promontories, fishing boats, morning mist. Wuxi is also the home of the Lingshan Giant Buddha — at 88 metres, significantly taller than the Leshan Buddha in Sichuan, though less dramatically sited.

**Hangzhou (2 nights)** is the West Lake city. Marco Polo reportedly called it the finest city in the world. The lake itself is the centre of everything: classical gardens at its edge, pagodas on islands, the Su Causeway for morning walks, and the surrounding hills dotted with tea plantations producing Longjing (Dragon Well) tea — the most prized green tea in China.

**Shanghai (2 nights)** bookends the trip. The Bund — the curved riverside promenade lined with colonial-era banking and trading buildings facing the Pudong skyline — is the defining image of the city. But Shanghai rewards exploration beyond it: the French Concession neighbourhood, the Yu Garden, the Old City food market, the contemporary art district of M50.

## What Makes This Route Work

The inter-city rhythm is comfortable. Unlike a grand sweep from Beijing to Yunnan, this itinerary stays within a region where everything is connected, the culture is consistent, and the pace doesn't require you to be on a coach or plane every other day.

Several meals on this tour are deliberately left as own expense — a design choice, not an oversight. The street food in Suzhou (glutinous rice dumplings, fried tofu) and the tea-house culture in Hangzhou are best experienced independently, at your own pace, rather than as a scheduled group meal. CTS Tours builds this into the itinerary deliberately.

## Best Time to Visit: October

October is the strongest month for this route. The summer heat and humidity have passed, the West Lake in Hangzhou takes on its autumn character, the tea harvest season is ending, and the region's famous silk-producing industry is in full operation. The CTS October 2026 departure leaves Auckland on **14 October** — timed for these conditions.

## Visa and Pricing

Many NZ passport holders currently qualify for China's visa-free entry. Confirm before booking. The **Shanghai & Surroundings** Discovery tour is priced from **NZD $2,999** per person (twin share), including international airfares from Auckland.

[View the Shanghai & Surroundings tour →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b2',
    slug: 'west-lake-hangzhou-travel-guide',
    title: 'West Lake Hangzhou: A Travel Guide for New Zealand Visitors',
    excerpt: 'West Lake is one of China\'s most celebrated landscapes — the subject of 1,000 years of poetry, painting, and pilgrimage. Here\'s what to see, when to go, and how to experience it properly.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Hangzhou', 'West Lake', 'Jiangnan', 'China Gardens', 'China Travel'],
    heroImage: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
West Lake (Xihu) is one of the most written-about places in Chinese history. For a thousand years, poets, painters, emperors, and ordinary travellers have come to Hangzhou specifically to look at it. It was inscribed as a UNESCO Cultural Landscape in 2011. Marco Polo visited in the 13th century and reportedly found no words adequate for the city it anchors.

That's a lot of expectation to meet. West Lake, to its credit, meets it.

## What West Lake Is

The lake sits within and adjacent to Hangzhou's city centre — accessible on foot, bike, or boat. It covers approximately 6 square kilometres and is surrounded by hills on three sides, with the city spreading eastward from the fourth. Three causeways cross it (the Su Causeway and Bai Causeway are the most-walked), and three islands sit mid-lake, each with classical gardens and pavilions.

The scenery is refined rather than dramatic — this is not the Three Gorges or Zhangjiajie. It is the China of Song Dynasty paintings: mist on water, willows trailing, a pagoda in the middle distance, a small boat crossing the reflection of hills. The famous "Ten Views of West Lake" are a set of classical vantage points, each with a name — "Three Ponds Mirroring the Moon," "Watching Fish at Flower Harbour" — that tells you what you should be looking at and feeling when you stand there.

## The Su Causeway at Dawn

The Su Causeway (named after the Song Dynasty poet Su Dongpo, who was once governor of Hangzhou) runs 2.8km along the western edge of the lake. Walking it at dawn — before the tourist crowd arrives, in the early light — is one of the finest short walks in China. Willows hang over the water. Locals do tai chi on the banks. The city is quiet enough that you can hear the birds.

This is not on most rushed itineraries. CTS Tours builds a morning walk into the Hangzhou days specifically for this reason.

## Longjing Tea Plantations

The hills west of West Lake are the source of Longjing (Dragon Well) tea — China's most celebrated green tea, roasted by hand in a specific technique that gives it its characteristic flat-leaf appearance and chestnut aroma. The tea village of Longjing (a 20-minute drive from the lake) has working plantations open to visitors: you can watch the pan-firing process, sample the grades, and buy directly from producers rather than tourist shops.

October is late in the tea harvest season, but the plantations are still active and the landscape — terraced green hills above mist-filled valleys — is at its autumnal best.

## Lingyin Temple

The Lingyin Temple complex, in the hills west of the city, is one of China's largest and wealthiest Buddhist monasteries — founded in 328 AD, repeatedly rebuilt after various destructions, its current structures mostly Qing Dynasty. The temple sits at the end of a valley lined with hundreds of Buddhist carvings cut into the cliff faces: the Feilai Feng grottos, spanning work from the 10th to 14th centuries.

The atmosphere in the early morning is genuine religious activity rather than tourist spectacle — monks chanting, incense burning, locals lighting offerings. The temple receives several million visitors per year, but the scale of the complex means it never feels completely overrun.

## Combining Hangzhou with Suzhou and Shanghai

Hangzhou is best experienced as part of the Jiangnan triangle: Suzhou for the classical gardens and canals, Hangzhou for West Lake and tea culture, Shanghai for the modern city and the Bund. The three are connected by comfortable inter-city distances, and the contrast between them — ancient, romantic, modern — is itself one of the pleasures of the route.

CTS Tours' **Shanghai & Surroundings** tour allocates 2 nights in Hangzhou, which is the minimum needed to cover the lake, a tea plantation, and the Lingyin Temple without rushing. The tour is priced from NZD $2,999 per person from Auckland, departing 14 October 2026.

[View the full tour →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b3',
    slug: 'suzhou-gardens-guide-nz',
    title: 'Suzhou Classical Gardens: A Guide for New Zealand Travellers',
    excerpt: 'Suzhou\'s classical gardens are UNESCO-listed masterpieces of landscape design — private retreats built over centuries by retired officials and scholars. Here\'s what to see and how to appreciate them.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Suzhou', 'Classical Gardens', 'UNESCO', 'Jiangnan', 'China Travel'],
    heroImage: migratedUnsplash('photo-1493976040374-85c8e12f0c0e'),
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
Suzhou has nine UNESCO World Heritage gardens. The city has been famous for them since the Song Dynasty (960–1279 AD), when it was one of the wealthiest cities in China and successful merchants and retired government officials competed to build the most refined private retreats within its canal-crossed streets.

Each garden is different. Each one encodes a philosophy of nature, space, and contemplation that takes time to read — and is more rewarding the more you know how to look.

## What a Classical Garden Is

A Suzhou classical garden is not a park. It's a compressed landscape: rockeries suggesting mountains, ponds suggesting lakes, a pavilion from which a particular view was designed to be seen, corridors that control what you see and when. The best ones are spatially deceptive — they feel larger than they are, create vistas that seem to extend beyond their walls, and change with every step.

They were designed for private contemplation, poetry writing, painting, and the entertainment of scholars. The rocks are Taihu stones — porous, grotesquely shaped limestone from Lake Tai — selected individually for their visual qualities. The plantings are deliberately seasonal: lotus in summer, chrysanthemums in autumn, plum blossoms in winter, wisteria in spring.

## The Humble Administrator's Garden

The largest private garden in China and the one most first-time visitors prioritise. Built by a Ming Dynasty official named Wang Xianchen in the 16th century (the garden's self-deprecating name is a translation of his description of his own retirement activities), it covers approximately 5.2 hectares — large for a classical garden — with a substantial central pond, a zigzag bridge, and a series of pavilions connected by covered walkways.

The best approach is slow. Pick one pavilion, sit in it for ten minutes, and look at what you were supposed to look at from that position. The garden is designed to be experienced this way — not walked through briskly.

## The Master of the Nets Garden

Smaller, more intimate, and arguably more refined. The Master of the Nets Garden (Wangshi Yuan) covers just 0.5 hectares but is considered the most perfectly proportioned of all Suzhou's classical gardens. Every element — the rock arrangement in the courtyard, the moon gate framing the central pond, the relationship between the interior rooms and the garden beyond their windows — has been calibrated with unusual care.

In the evenings during peak season, the garden hosts traditional performances (Kunqu opera, pipa music, Suzhou embroidery) in the pavilions by candlelight. This is one of the more memorable evening experiences available in the Jiangnan region.

## The Canals

Beyond the gardens, Suzhou has an ancient canal district that has been the city's physical structure since long before Venice was founded. The Pingjiang Road area, along one of the oldest surviving canal streets, has been carefully preserved: whitewashed walls, arched bridges, willow trees trailing in the water, small restaurants and tea houses at intervals. Walking it in the early morning is the closest you can get in modern China to the city as it was in the Song Dynasty.

## Combining Suzhou with Hangzhou and Shanghai

Suzhou is approximately 1 hour by high-speed train from Shanghai and 1.5–2 hours from Hangzhou — perfectly positioned as the first stop on a Yangtze Delta tour. CTS Tours allocates 2 nights in Suzhou within the **Shanghai & Surroundings** itinerary, covering the Humble Administrator's Garden, Master of the Nets, and the canal district.

The tour is priced from NZD $2,999 per person (twin share) from Auckland, departing 14 October 2026.

[View the full Shanghai & Surroundings tour →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b4',
    slug: 'shanghai-10-days-itinerary',
    title: '10 Days in Shanghai & Surroundings: A First-Timer\'s Guide from NZ',
    excerpt: 'What to see, where to go, and how to pace 10 days across Shanghai and the Jiangnan water towns — a practical guide for New Zealand travellers visiting this region for the first time.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Shanghai', 'China Itinerary', '10 Days China', 'Jiangnan', 'New Zealand Travel'],
    heroImage: '/blog/group-walking-shanghai-street.jpg',
    publishedAt: '2026-04-25',
    readTime: '7 min read',
    content: `
Ten days in Shanghai and the surrounding Jiangnan region gives you enough time to do this part of China properly — not rushing, not skipping things, with room to follow your own interests on the free days built into the itinerary.

Here's how CTS Tours structures 10 days across this region, and the reasoning behind the choices.

## Why This Region for a First China Trip

The Yangtze Delta — Shanghai, Suzhou, Wuxi, Hangzhou — is China's most accessible region for first-time visitors from the West. The distances are short, the infrastructure is excellent, and the culture — refined, historical, visually beautiful — is immediately engaging without the intimidating scale of Beijing or the dramatic remoteness of western China.

It is also the oldest continuously wealthy region in China. Suzhou and Hangzhou were already major cities a thousand years ago. The silk trade, the canal network, and the classical garden tradition all come from here. You are walking through a living history that goes back considerably further than anything in New Zealand's European history.

## Day-by-Day Structure

**Days 1–2: Arrive Shanghai, explore the city**

Most flights from Auckland arrive via a hub (Singapore, Hong Kong, or directly into Shanghai Pudong). First afternoon: check in, walk to the Bund, and let the skyline of Pudong opposite resolve the scale of the city. Evening on the Bund is the single most iconic image in modern China — the colonial buildings of the former foreign concession facing the space-age towers across the Huangpu River, the river traffic moving between them.

Day 2: the French Concession — tree-lined streets, art deco apartment buildings, the best café scene in China, the Xintiandi heritage block. Yu Garden in the afternoon for the classical contrast: a 16th-century private garden somehow surviving in the middle of Shanghai's old city.

**Days 3–4: Suzhou**

Coach west (approximately 1 hour) to Suzhou for 2 nights. The classical gardens are the priority: the Humble Administrator's Garden in the morning (arrive early for the fewest crowds), the Master of the Nets in the afternoon (smaller, more intimate, more perfectly proportioned). Evening on Pingjiang Road, Suzhou's best-preserved canal street. Day 4 for remaining gardens and the Suzhou Museum (I.M. Pei's final major work in China — the architecture is as interesting as the collection).

**Days 5–6: Wuxi and Lake Tai**

Short coach to Wuxi (approximately 1 hour from Suzhou). Lake Tai is the draw here: a vast freshwater lake, the source of the Taihu stones used in every classical garden, with classical pavilions along its shores. The Lingshan Giant Buddha (88 metres) is a day-excursion option. Wuxi is also known for its wonton soup and small steamed buns — the food is a reason to be here as much as the scenery.

**Days 7–8: Hangzhou**

Travel to Hangzhou for 2 nights. West Lake morning walk on the Su Causeway before the crowds arrive. Boat to the mid-lake islands in the afternoon. Longjing tea plantation visit — see the hand-firing process, sample the grades. Lingyin Temple complex for the cliff-face Buddhist carvings. Several dinners on this section are deliberately at own expense: the soup dumplings (xiaolongbao) and West Lake fish in vinegar sauce at local restaurants are better than anything in a group-meal setting.

**Days 9–10: Return to Shanghai, fly home**

Return to Shanghai for the international connection. Depending on flight timing, a final morning in the city — the Contemporary Art Museum, the Tianzifang arts district, or simply a last walk along the Bund.

## Practical Notes

**Pace:** This itinerary is steady, not rushed. The longest single coach journey is approximately 2 hours. There are no internal flights. This is deliberate: the pace of the Jiangnan region rewards slower movement.

**Meals:** Several lunches and dinners are at own expense — see each day above. This is a feature, not a gap: the regional food in each city is worth seeking out independently.

**October weather:** Warm days (18–24°C), cooler evenings (10–15°C), generally clear skies. Light layers recommended. The autumn light on West Lake is worth the timing specifically.

The CTS **Shanghai & Surroundings** Discovery tour covers this route from NZD $2,999 per person (twin share) including international airfares from Auckland. Departs 14 October 2026.

[View full tour details →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b5',
    slug: 'china-water-towns-jiangnan-guide',
    title: 'China\'s Water Towns: Suzhou, Wuxi & the Jiangnan Region Explained',
    excerpt: 'The Jiangnan water towns — canal cities, classical gardens, silk culture, and West Lake — are a different China from Beijing and Xi\'an. Here\'s what makes them special and how to experience them from New Zealand.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'culture',
    tags: ['Jiangnan', 'Water Towns', 'Suzhou', 'Wuxi', 'China Culture', 'New Zealand Travel'],
    heroImage: migratedUnsplash('photo-1564349683136-77e08dba1ef7'),
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
Most Western travellers who think about China think about Beijing and the Great Wall. The Jiangnan region — the land south of the Yangtze River, centred on Suzhou, Wuxi, Hangzhou, and Shanghai — is a completely different China, and for many visitors the more lasting experience.

## What "Jiangnan" Means

Jiangnan literally means "south of the river" — the Yangtze River. The region has been the most prosperous in China since at least the Song Dynasty (960 AD), when the imperial capital moved south and the agricultural richness of the Yangtze Delta made it the economic heart of the empire.

The culture that developed here is distinct: refined, literary, aesthetically particular. The classical garden tradition, the Suzhou embroidery and silk weaving, the Kunqu opera (older than Beijing Opera), the tea culture of Hangzhou, the canal network that once connected every significant settlement — all of these belong specifically to Jiangnan.

## The Canal Cities

Suzhou has more canals than Venice — an older canal network that has been the city's infrastructure for more than 2,000 years. The ancient quarter around Pingjiang Road survives in much its original form: whitewashed walls, arched stone bridges, boats moving through narrow waterways, willows trailing in the water. Walking it in the early morning, before the day's visitors arrive, is an experience without equivalent in China.

Wuxi, on the shores of Lake Tai, operates on a larger water scale. The lake itself — 2,250 square kilometres — has been the economic and aesthetic heart of the region for millennia. The Taihu stones used in every classical garden come from its floor. The fishing villages along its shores have barely changed in appearance since the Song Dynasty paintings that documented them.

## The Gardens

Suzhou's nine UNESCO Heritage classical gardens are the concentrated expression of Jiangnan culture. Each is a compressed landscape — rocks suggesting mountains, ponds suggesting lakes, pavilions positioned to frame specific views. They are spatial philosophy made physical: the scholar-officials who built them were using the garden to enact ideas about nature, retirement, and the proper life.

The Humble Administrator's Garden (the largest), the Master of the Nets Garden (the most perfectly proportioned), and the Lingering Garden (the most eccentric, with its extraordinary rockery) are the three essential ones.

## The Tea Culture

Hangzhou's West Lake hills produce Longjing (Dragon Well) tea — China's most prized green tea. The spring harvest (late March to early April) produces the most valuable grades, but the plantations are active through October. Visiting a tea village, watching the hand-pan firing process, and tasting the grades in sequence is a half-day that connects you to a production tradition going back to the Tang Dynasty.

## How to Experience It from New Zealand

CTS Tours runs the **Shanghai & Surroundings** Discovery tour specifically for this region: 10 days covering Suzhou, Wuxi, Hangzhou, and Shanghai in a comfortable loop. From NZD $2,999 per person (twin share), including international airfares from Auckland. The October departure — 14 October 2026 — is timed for the best conditions in the region.

[View the full tour →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  // ─────────────────────────────────────────────
  // LINE C: CHONGQING / CHENGDU
  // ─────────────────────────────────────────────

  {
    id: 'lt-c1',
    slug: 'chongqing-chengdu-itinerary-10-days',
    title: 'The Perfect 10-Day Chongqing & Chengdu Itinerary',
    excerpt: 'Futuristic Chongqing and laid-back Chengdu, connected by a bullet train. Here\'s how to structure 10 days across both cities — from the viral monorail through a building to giant pandas at dawn.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Chongqing', 'Chengdu', 'Itinerary', 'China Tours', 'Giant Pandas', 'New Zealand'],
    heroImage: '/blog/group-chongqing-costume-riverside-1.jpg',
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    content: `
Chongqing and Chengdu are the two most talked-about cities in China right now — and they couldn't be more different from each other. Chongqing is vertical, neon-drenched, dramatic: a mountain metropolis built on cliffs above two rivers, with a monorail that passes through the floors of a residential building. Chengdu is horizontal, relaxed, green: teahouse culture, giant pandas, and the most famous street food in western China.

They are 90 minutes apart by high-speed train. Together, they make one of the best 10-day itineraries in the country.

Here is how CTS Tours structures the time, and why.

## The Structure: 4 Nights in Chongqing, 3 Nights in Chengdu

Four nights is the right allocation for Chongqing. There is enough here for three full days: the viral attractions (Liziba Station, Hongyadong), the UNESCO site (Dazu Rock Carvings, a full-day excursion), the historic districts (Huguang Guild Hall, Ciqikou Ancient Town), and a free day for the Yangtze River Cableway, the night river cruise, and dinner at a proper Chongqing hot pot restaurant.

Three nights in Chengdu works well because the core day — the giant panda base — is the morning of one full day, and the afternoon and evening fill naturally with People's Park, Jinli Street, and Chunxi Road. A second full day (often a free day) covers the optional excursions: Leshan Giant Buddha, Sanxingdui Museum, or a Sichuan Opera face-changing performance in the evening.

## Day-by-Day

**Day 1: Auckland → Beijing (overnight flight)**

Evening departure from Auckland. Overnight flight, arriving Beijing the following morning.

**Day 2: Beijing → Chongqing**

Connecting domestic flight to Chongqing. The city's reputation as a mountain metropolis is immediately apparent from the airport approach — it is built on cliffs and hills in a way that makes flat Chinese cities feel like a different country. Guide meets at the airport. Transfer to hotel, orientation walk.

**Day 3: Huguang Guild Hall, Liziba Station, Ciqikou**

Morning at the Huguang Guild Hall — a beautifully preserved Qing Dynasty merchant complex (1759) on a terraced hillside above the Yangtze River. This is one of the best-preserved examples of guild hall architecture in China, and its setting alone justifies the visit.

Afternoon: Liziba Station. Take the metro to the platform, ride through the building once (Line 2 passes through floors 6–8 of a 19-storey residential block), then exit and watch from the street-level plaza. Allow 30–60 minutes. You will want multiple views.

Late afternoon: Ciqikou Ancient Town, a Song Dynasty market street with flagstone lanes and Sichuan street food stalls. Good evening walking territory.

**Day 4: Dazu Rock Carvings (full day), Hongyadong evening**

Early start for the drive to Dazu (approximately 1.5 hours). The Dazu Rock Carvings are a UNESCO World Heritage Site with approximately 50,000 Buddhist, Taoist, and Confucian stone sculptures carved between the 9th and 13th centuries. The Baodingshan site is the main visit: the 31-metre reclining Nirvana Buddha, the large-scale narrative carvings, the extraordinary preservation of 800-year-old detail.

Return to Chongqing mid-afternoon. Evening visit to Hongyadong after dark — the 11-storey stilted complex on the cliff above the Jialing River is lit in gold and red from sunset. Cross to the Qiansimen Bridge for the panoramic view. Free to enter; restaurants and tea houses inside.

**Day 5: Free Day — Chongqing**

Suggested options: the Yangtze River Cableway (a commuter aerial tramway opened in 1987, one of the last of its kind in China), Jiefangbei pedestrian square and street food, a Yangtze and Jialing River night cruise after dark, or a proper Chongqing hot pot dinner with the full beef tallow and Sichuan peppercorn broth.

**Day 6: Chongqing → Chengdu by Bullet Train**

Board the high-speed train for the 90-minute journey across Sichuan Province. Smooth, fast, the scenery transitioning from Chongqing's dramatic river valleys to Chengdu's wide agricultural basin. Guide meets at Chengdu station.

**Day 7: Giant Panda Base, People's Park, Jinli Street**

This is the day everyone remembers. Arrive at the Chengdu Research Base of Giant Panda Breeding between 8 and 9am — the window when the pandas are active and feeding on bamboo. The base has over 200 giant and red pandas across 3,500 acres of bamboo forest habitats.

After the panda base: People's Park and the Matchmaking Corner — where parents and grandparents of unmarried adults gather on weekends to display handwritten profiles of their children and search for suitable partners. It is funny, touching, and completely unique.

Afternoon: Jinli Ancient Street for Sichuan snacks, then Chunxi Road for Chengdu's modern shopping district.

**Day 8: Free Day — Chengdu**

Option A: Leshan Giant Buddha day trip (35 minutes by high-speed rail, then boat for the best view of the 71-metre Buddha carved into a cliff face — the largest stone Buddha in the world).

Option B: Sanxingdui Museum (a Bronze Age civilisation 3,000–5,000 years old, with bronze masks unlike anything else in Chinese art — widely described as China's most surprising museum).

Option C: Sichuan Opera face-changing performance in the evening — the masks switch in fractions of a second, the technique is a state-protected trade secret, and you will attempt to catch it in slow motion. You won't.

**Days 9–10: Chengdu → Beijing → Auckland**

Transfer to airport, connecting flight via Beijing to Auckland.

## Practical Notes

**Pricing:** CTS Tours **China Discovery — Fire & Fuzz** covers this itinerary from NZD $2,999 per person (twin share), including international airfares from Auckland. Single supplement NZD $400. Departs 1 November 2026.

**Hotels:** Pagoda SASA Design Hotel (or similar 4-star) in Chongqing; Holiday Inn Express Chengdu Gulou (or similar 4-star) in Chengdu.

**Visa:** Many NZ passport holders qualify for visa-free entry for short leisure visits. Confirm current rules before booking.

[View the full tour →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-c2',
    slug: 'how-many-days-in-chongqing',
    title: 'How Many Days Do You Need in Chongqing? (Honest Answer)',
    excerpt: 'Not enough — that\'s the real answer. Here\'s what you can realistically do in 2, 3, or 4 days in Chongqing, and why most visitors underestimate the city.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['Chongqing', 'China Travel Tips', 'Itinerary Planning', 'How Many Days'],
    heroImage: '/blog/chongqing-night-skyline-hongyadong.jpg',
    publishedAt: '2026-04-25',
    readTime: '5 min read',
    content: `
Most people who ask "how many days do I need in Chongqing?" are expecting the answer to be two. The honest answer is three to four — and here's why almost everyone underestimates this city.

## The Chongqing Misconception

Chongqing went viral on social media for two things: the monorail through a building (Liziba Station) and the glowing cliffside complex at night (Hongyadong). Both are real and both are worth your time. But if you plan two days around those two highlights, you'll arrive, photograph them, and leave without understanding what makes Chongqing one of the most interesting cities in China.

The city has layers — literally and figuratively. It's built on mountains above two rivers, with roads at five different levels, bridges connecting buildings at the 20th floor, and a history going back 3,000 years. The Dazu Rock Carvings alone — a UNESCO World Heritage Site with 50,000 Buddhist sculptures just outside the city — are worth a full day. Ciqikou Ancient Town, the Huguang Guild Hall, the Yangtze River Cableway, the night river cruise: each one adds something that Liziba and Hongyadong don't.

## What You Can Do in 2 Days

Tight. You can cover Liziba Station, Hongyadong after dark, and a quick walk through either Ciqikou or the Jiefangbei pedestrian district. You will not get to Dazu. You will not get to the Yangtze River Cableway or the night cruise. You will have seen the viral highlights but not the city.

If two days is all you have, prioritise: Liziba in the afternoon, Hongyadong after dark, Dazu (full day, worth rearranging everything else around).

## What You Can Do in 3 Days

More comfortable. Three full days allows: Huguang Guild Hall and Liziba and Ciqikou on day one. Dazu Rock Carvings as a full day-trip on day two. Hongyadong after dark on day two's evening. Free day three for the Yangtze River Cableway, Jiefangbei, and the night river cruise.

This is the minimum to feel like you've actually been to Chongqing rather than through it.

## What You Can Do in 4 Days

This is what CTS Tours allocates, and it's the right amount. Four nights gives you the free day that makes the difference: a proper morning hot pot (yes, morning hot pot is a Chongqing thing), the Yangtze River Cableway without rushing, the Jiefangbei district at leisure, and the night cruise on an evening when you're not already tired from a Dazu day trip.

Four days also gives you the thing that two or three days doesn't: the chance to stop planning and just walk. Chongqing rewards wandering. The vertically stacked streets, the unexpected staircases connecting roads at different elevations, the food vendors in mid-level walkways — none of this shows up in a highlights list, and all of it is memorable.

## The Chongqing + Chengdu Case

The strongest argument for 4 nights in Chongqing is what comes after it: Chengdu, 90 minutes by bullet train. The contrast between the two cities — Chongqing's neon-drenched drama and Chengdu's laid-back teahouse culture — is itself one of the pleasures of the combination. Spending enough time in Chongqing means you arrive in Chengdu with a clear sense of what you're contrasting it with.

CTS Tours' **Fire & Fuzz** tour allocates 4 nights in Chongqing and 3 nights in Chengdu — 10 days total, from NZD $2,999 per person from Auckland. Departs 1 November 2026.

[View the full itinerary →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-c3',
    slug: 'chongqing-vs-chengdu',
    title: 'Chongqing vs Chengdu: Which City Should You Visit?',
    excerpt: 'Both. But if you\'re choosing just one, here\'s the honest comparison — what each city does best, who it suits, and why most visitors who go to one end up wishing they\'d had time for the other.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Chongqing', 'Chengdu', 'China Travel', 'City Comparison', 'Sichuan'],
    heroImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
Chongqing and Chengdu are 300km apart, 90 minutes by bullet train, and completely unlike each other. Choosing between them is genuinely difficult — so here is an honest comparison of what each city offers, who each one suits, and why we almost always recommend both.

## Chongqing: The City That Goes Viral

Chongqing is dramatic. It is built on mountains above the confluence of the Yangtze and Jialing Rivers, which means roads pass over rooftops, bridges connect buildings at the 20th floor, and the metro runs through the floors of a residential building (Liziba Station — Line 2, floors 6–8 of a 19-storey block). Locals call it "8D Magic." The internet calls it cyberpunk. Both are accurate.

The city went viral on TikTok and Douyin for good reason: it looks like nothing else in China, and the photographs and videos that capture Liziba Station or the Hongyadong cliffside complex at night are genuinely difficult to believe until you're standing in front of them.

Beyond the viral moments, Chongqing has the Dazu Rock Carvings (UNESCO World Heritage, 50,000 Buddhist sculptures carved over 400 years), a beautifully preserved Qing Dynasty merchant district (Huguang Guild Hall), and the most intense version of Chinese hot pot anywhere — beef tallow broth, dried chillies, face-numbing Sichuan peppercorn, the works.

**Chongqing suits you if:** you want visual spectacle, modern urban drama, genuinely unique experiences, and you respond to the feeling of a city that's slightly beyond your ability to process it.

## Chengdu: The City That Makes You Stay Longer

Chengdu is relaxed. This is China's most liveable city by most rankings, and the reason is obvious within an hour of arrival: people here are not in a hurry. Teahouses in People's Park fill by 9am with locals who have no plans to leave until dusk. The mahjong tables are permanent. An ear-cleaning practitioner moves slowly through the outdoor chairs.

The anchor experience is the giant panda base — 200+ giant and red pandas in 3,500 acres of bamboo forest, best visited between 8 and 10am when they're active. But Chengdu has more to offer than pandas: People's Park's extraordinary Matchmaking Corner (parents displaying profile notices of their unmarried children in search of partners), Jinli Ancient Street, the Sichuan Opera face-changing performances, and the optional day trips to Leshan (the world's largest stone Buddha, 71 metres, carved 1,300 years ago) and Sanxingdui (a 5,000-year-old Bronze Age civilisation with alien-looking bronze masks that predate all known Chinese art by centuries).

**Chengdu suits you if:** you want wildlife, cultural depth, great food, and a pace that allows you to actually absorb where you are rather than rushing between photographs.

## The Verdict

They are complementary, not competing. Chongqing's drama is enhanced by the contrast with Chengdu's calm. Chengdu's depth is more vivid because you've already been overwhelmed by Chongqing.

The bullet train between them is 90 minutes. The combination in 10 days is one of the best itineraries in China. CTS Tours' **Fire & Fuzz** tour (4 nights Chongqing, 3 nights Chengdu) is built around exactly this — from NZD $2,999 per person from Auckland, departing 1 November 2026.

If you genuinely can only choose one: go to Chongqing if you've already been to Chengdu, and go to Chengdu if you've never seen a giant panda. Otherwise, go to both.

[View the Fire & Fuzz tour →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-c4',
    slug: 'liziba-station-chongqing-guide',
    title: 'Liziba Station Chongqing: The Complete Guide to the Monorail Through a Building',
    excerpt: 'Liziba Station is the most photographed railway station in China — and possibly the world. Here\'s everything you need to know: what it is, how to visit, and how to get the best shot.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Liziba Station', 'Chongqing', 'China Travel', 'Unique Attractions', 'Train Travel'],
    heroImage: migratedUnsplash('photo-1581252584837-95f73fd23574'),
    publishedAt: '2026-04-25',
    readTime: '5 min read',
    content: `
Liziba Station is real. This is the first thing most people need to confirm when they see photographs of it — a commuter train passing directly through the floors of a 19-storey residential building in central Chongqing. It is not a tourist installation. It is not a special attraction. It is a functioning metro station on Line 2 of the Chongqing Rail Transit system, and the building surrounding it is full of apartments and offices where people live and work.

Here is everything you need to know before visiting.

## What It Is

Liziba Station (李子坝站) is a straddle-type monorail station on Chongqing Rail Transit Line 2 (the "Light Rail" line). The station occupies floors 6 to 8 of a 19-storey mixed-use building in Yuzhong District: floors 1–5 are commercial space, floors 9–19 are residential apartments.

The station and the building were constructed simultaneously, beginning in 2004, using a structural method that separated the station platform from the building's residential load-bearing frame. Construction was completed in March 2004; the station opened for service on 18 June 2005. It was the first station of this type in China.

The trains are rubber-tyred monorail, which significantly reduces noise and vibration compared to steel-wheel systems. Residents above the station report the noise as barely perceptible — roughly equivalent to a domestic appliance. This is the engineering solution that made the co-construction possible.

## Why It Exists

Chongqing's topography made conventional metro construction extremely difficult. The city is built on steep limestone mountains above two rivers; the terrain leaves almost no flat ground for surface-level rail infrastructure. The urban density made underground-only solutions insufficient. The result is a transit system that integrates with buildings, bridges, and existing urban structures in ways that have no precedent in flat-terrain cities.

Liziba is the most extreme example of this integration, which is why it became famous — but it is one of several points along Line 2 where the train travels at building-height levels through or adjacent to the urban fabric.

## How to Visit

**By Metro:** Take Chongqing Rail Transit Line 2 to Liziba Station. Ride through the building from either adjacent station (Jiayuwan or Zengjiayan) to experience the inside view. Trains run every 5–10 minutes during peak hours.

**For the famous photograph:** Exit the station and walk to the street-level plaza below the building. The best viewing angle is from across the road, slightly to the west, looking up at the point where the track enters and exits the building. The framing you've seen in photographs is from approximately this position.

**Timing:** The station is active from approximately 6:30am to 10:30pm. Trains run frequently enough that you won't wait more than 10 minutes for a pass-through view. Morning light comes from the east; afternoon light from the west — adjust depending on what you're photographing.

**Allow:** 30–60 minutes. Most visitors find themselves watching multiple trains pass before feeling satisfied they've understood what they're seeing.

## What to Do Nearby

Ciqikou Ancient Town is a 10-minute walk from Liziba — a Song Dynasty market street with flagstone lanes, teahouses, and Sichuan street food. The combination of ancient commercial architecture and the futuristic train overhead is one of Chongqing's best sensory contrasts, and the two together fill a comfortable afternoon.

## On a CTS Tour

CTS Tours' **Fire & Fuzz** itinerary (Chongqing × Chengdu, 10 days) includes Liziba Station on Day 3, combined with the Huguang Guild Hall in the morning and Ciqikou in the late afternoon. The tour departs Auckland on 1 November 2026, from NZD $2,999 per person (twin share).

[View the full itinerary →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-c5',
    slug: 'chengdu-panda-tour-new-zealand',
    title: 'Visiting Giant Pandas in Chengdu: A Guide for New Zealand Travellers',
    excerpt: 'The Chengdu Research Base of Giant Panda Breeding is the best place in the world to see giant pandas up close. Here\'s what to expect, the best time to visit, and how to book from New Zealand.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'experience',
    tags: ['Giant Pandas', 'Chengdu', 'China Wildlife', 'Panda Base', 'New Zealand Travel'],
    heroImage: migratedUnsplash('photo-1556679343-c7306c1976bc'),
    publishedAt: '2026-04-25',
    readTime: '6 min read',
    content: `
There are approximately 1,800 giant pandas left in the wild. About 600 live in captivity. The single best place in the world to see them — to actually stand close to them, watch them eat, observe them in naturalistic bamboo forest environments — is the Chengdu Research Base of Giant Panda Breeding in Sichuan Province.

Here is everything New Zealand travellers need to know before visiting.

## About the Research Base

The Chengdu Research Base of Giant Panda Breeding was established in 1987 with six pandas rescued from the wild. It now houses more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat — the largest captive panda population in the world.

The base operates as an active conservation and research facility, not simply a zoo. It has made significant contributions to global panda population growth through captive breeding programmes, and regularly works with wild panda reserves on reintroduction and habitat management. UNESCO has recognised it as a Man and Biosphere Reserve.

The result, from a visitor perspective: the pandas live in habitats that replicate their wild environment rather than the small enclosures of older zoo designs. You see them moving through bamboo groves, climbing trees, and interacting with their surroundings. The scale of the facility means you can spend hours here without covering the same ground twice.

## The Critical Timing Rule: Come Before 10am

Giant pandas are crepuscular — most active in the early morning and late afternoon. Between roughly 8am and 10am, they are awake, moving, and eating. By 10am they are beginning to settle. By noon they are almost entirely inactive and will not move significantly for the rest of the afternoon.

If you arrive at 11am, you will see pandas sleeping. This is not the visit people remember.

Arrive at opening time (7:30am) or within the first hour. Watch the feeding, which happens at the enclosures throughout the morning. Position yourself at feeding stations 10–15 minutes before the bamboo is delivered if you want the best viewing position.

## Giant Pandas vs Red Pandas

The red panda (Ailurus fulgens) is a separate species from the giant panda — more closely related to raccoons and weasels than to bears. It is smaller (roughly the size of a large cat), has reddish-brown fur, and is in many respects more engaging as a viewing animal: more active during visiting hours, more curious, more likely to approach visitors.

Most visitors come for the giant pandas. The red pandas are a bonus that many people describe as the actual highlight. They are in the same facility, accessible on the same visit.

## What the Experience Is Like

The pandas eat bamboo for most of their active hours — up to 38kg per day, given that bamboo has minimal nutritional value and they need quantity to compensate. Watching a giant panda eat bamboo — the methodical grip, the cracking of stems, the indifference to the audience — is one of those experiences that is genuinely difficult to describe as entertainment but is somehow completely absorbing for 30–40 minutes.

The facility is clean, well-organised, and easy to navigate. Paths wind through bamboo forest between the different enclosure areas. A shuttle bus operates for visitors who don't want to walk the full circuit.

**Photography:** The pandas are relatively easy to photograph at the right time of day. Natural light in the morning is generally good. A zoom lens is not necessary — the viewing areas allow reasonably close approach.

## Combining the Panda Base with Chongqing

CTS Tours' **Fire & Fuzz** itinerary combines 4 nights in Chongqing (Liziba Station, Hongyadong, UNESCO Dazu Rock Carvings) with 3 nights in Chengdu (panda base, People's Park, optional Leshan Giant Buddha or Sichuan Opera). The cities are 90 minutes apart by bullet train.

The tour departs Auckland on 1 November 2026, from NZD $2,999 per person (twin share). Single supplement NZD $400.

[View the full tour →](/tours/china/discovery/chongqing-chengdu)
    `
  },

];
