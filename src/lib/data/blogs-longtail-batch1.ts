import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash, tourImage } from '@/lib/site-media';

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
    title: '10-Day Beijing & Xi\'an Itinerary for NZ Travellers',
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
    title: 'First China Trip: Why Beijing & Xi\'an Is the Right Start',
    excerpt: 'If you\'re planning your first trip to China from New Zealand, Beijing and Xi\'an is the most rewarding and logistically sensible combination. Here\'s why — and how to do it properly.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['First Time China', 'Beijing', 'Xi\'an', 'New Zealand', 'China Travel Tips'],
    heroImage: '/images/great-wall-cts-1.jpg',
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
    title: 'Beijing to Xi\'an High-Speed Train: NZ Travel Guide',
    excerpt: 'The high-speed train between Beijing and Xi\'an is one of the best travel experiences in China. Here\'s how it works, what to expect, and why it\'s better than flying.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'travel-tips',
    tags: ['Beijing', 'Xi\'an', 'High Speed Train', 'China Rail', 'China Travel Tips'],
    heroImage: '/blog/group-bullet-train-large.jpg',
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    faqs: [
      {
        question: 'How long does the high-speed train from Beijing to Xi\'an take?',
        answer: 'Most G-class services take between 4 and 5 hours; the fastest scheduled trains complete the 1,200 km run in about 4 hours 11 minutes. Around 30 high-speed departures run daily from early morning to evening, so there is almost always a time that fits your day.'
      },
      {
        question: 'Which stations does the Beijing to Xi\'an train use?',
        answer: 'High-speed services depart from Beijing West Railway Station and arrive at Xi\'an North Railway Station. Both are large, modern and metro-connected — allow 30 to 40 minutes to reach Beijing West from the city centre, and about the same from Xi\'an North into central Xi\'an on Metro Line 2.'
      },
      {
        question: 'How much does the Beijing to Xi\'an train cost?',
        answer: 'A second-class seat costs roughly 470 to 580 yuan — around NZD 110 to 140 — depending on the service. First class and business class cost more for wider seats and quieter carriages. On CTS guided tours the ticket is included and arranged in advance.'
      },
      {
        question: 'Is the train better than flying between Beijing and Xi\'an?',
        answer: 'For almost all travellers, yes. City centre to city centre, the total journey time is comparable once airport transfers, check-in and security are counted — and the train is more comfortable, more punctual, more scenic and produces far less carbon per passenger.'
      },
      {
        question: 'Do I need my passport to board a train in China?',
        answer: 'Yes. Chinese rail tickets are real-name tickets linked to your passport, and you present the physical passport at the station gates. Carry it on the day of travel — a photo of it is not accepted.'
      },
    ],
    content: `
The high-speed train from Beijing to Xi'an is one of those travel experiences that changes how you think about transport. Around 30 G-class services a day cover the 1,200 km in as little as 4 hours 11 minutes, city centre to city centre, at up to 300 km/h — and the journey across the North China Plain into the loess hills of Shaanxi is genuinely worth watching. If you are visiting both cities, the train beats flying on almost every measure. Here is how it works.

## What Are the Basics?

- **Route:** Beijing West Railway Station → Xi'an North Railway Station
- **Trains:** G-class (gaotie) high-speed services, roughly 30 per day from early morning to evening
- **Journey time:** about 4 to 5 hours; the fastest services run about 4 hours 11 minutes
- **Distance and speed:** roughly 1,200 km at up to 300 km/h
- **Cost:** second class roughly 470 to 580 yuan (about NZD 110 to 140); first and business class higher

Seat classes are simple: **second class** is the standard booking — comfortable, clean, a 3+2 layout with decent legroom, entirely adequate for four hours. **First class** gives a 2+2 layout and more recline. **Business class** is an airline-style lie-flat seat at several times the price. A catering trolley passes regularly with drinks, snacks and instant noodles, and every carriage has hot-water dispensers — bring tea or pot noodles like the locals do. Full schedules and fares are published on sites like [Travel China Guide](https://www.travelchinaguide.com/china-trains/beijing-xian-highspeed.htm).

## How Does Boarding Work?

Chinese rail runs on **real-name ticketing linked to your passport** — there is no paper ticket to lose. You show your physical passport at the entry gates, at the boarding gate, and occasionally on board. Two practical notes:

- **Arrive 40 to 45 minutes early.** Beijing West is one of the largest railway stations in Asia; security screening and finding your gate take time, and boarding gates close a few minutes before departure.
- **Luggage is easy.** There are no airline-style weight checks. Racks above the seats take cabin bags; shelves at the carriage ends take large suitcases.

Beijing West is about 30 to 40 minutes from central Beijing by metro or taxi. At the other end, Xi'an North connects to central Xi'an on Metro Line 2 in around 25 minutes, or 30 to 40 minutes by taxi.

On a guided tour none of this is your problem: tickets are issued in advance, and your guide walks the group from hotel to seat.

## What Do I See Out the Window?

The first hour crosses the North China Plain — one of the most densely farmed and historically consequential landscapes on earth, scrolling past at 300 km/h in a way that gives you a physical sense of China's scale no statistic can. The line threads through Shijiazhuang and Zhengzhou, crosses the Yellow River, and then the land begins to fold: the flat plain gives way to the terraced loess hills of Shaanxi, the yellow-earth plateau where Chinese civilisation keeps its oldest records. By the time you slide into Xi'an North you have crossed something you can feel as well as see.

Sit on the **left side heading to Xi'an** for the better river views, and keep your camera out around the Yellow River crossing.

## Why Not Just Fly?

We book the train for our groups deliberately, and clients thank us for it afterwards:

- **The total time is a wash.** Add airport transfers at both ends, 90-minute check-in, security and taxiing, and the plane's advantage evaporates.
- **The stations are central and metro-connected;** the airports are not.
- **Punctuality.** Chinese high-speed rail runs to the minute; domestic flights are far more weather- and traffic-prone.
- **Comfort.** You can stand, walk, and watch the country go by with a cup of tea.
- **Carbon.** High-speed rail emits a fraction of the CO2 per passenger of a domestic flight.

## How Does This Fit an NZ Itinerary?

Beijing plus Xi'an is the classic first-time China route — capital, Great Wall, then the [Terracotta Warriors](/blog/terracotta-warriors-guide-nz) — and the train is the hinge between them. Our [10-day Beijing and Xi'an itinerary](/blog/beijing-xian-itinerary-10-days) shows how the days fit together, and with the current [30-day visa-free entry for NZ passports](/china-visa-guide-for-new-zealanders) the whole trip books as easily as a Pacific holiday.

On the CTS **A Tale of Two Cities** Discovery tour, the Beijing–Xi'an high-speed train (second class) is a standard inclusion — tickets arranged in advance, guide with you door to door.

[View the full Beijing and Xi'an tour →](/tours/china/discovery/beijing-xian), or browse our [Beijing tours](/beijing-tours) and [Xi'an tours](/xian-tours).
    `
  },

  {
    id: 'lt-a4',
    slug: 'terracotta-warriors-guide-nz',
    title: 'Visiting the Terracotta Warriors: NZ Traveller Guide',
    excerpt: 'The Terracotta Army is one of the greatest archaeological discoveries in history. Here\'s what to expect, how to make the most of your visit, and why it deserves a full day.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Terracotta Warriors', 'Xi\'an', 'China History', 'UNESCO', 'New Zealand Travel'],
    heroImage: tourImage('xian-terracotta.jpg'),
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
    title: 'Beijing & Xi\'an Tours from New Zealand (2026 Guide)',
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

Many NZ passport holders currently qualify for China's visa-free entry. Confirm before booking. The **Shanghai & Surroundings** Discovery tour is priced from **NZD $3,399** per person (twin share), including international airfares from Auckland.

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
    heroImage: '/blog/sourced/hangzhou-west-lake-broken-bridge.jpg',
    heroImageCredit: 'Photo: Jakub Hałun, CC BY-SA 4.0, via Wikimedia Commons',
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

CTS Tours' **Shanghai & Surroundings** tour allocates 2 nights in Hangzhou, which is the minimum needed to cover the lake, a tea plantation, and the Lingyin Temple without rushing. The tour is priced from NZD $3,399 per person from Auckland, departing 14 October 2026.

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
    heroImage: tourImage('suzhou-canal.jpg'),
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

The tour is priced from NZD $3,399 per person (twin share) from Auckland, departing 14 October 2026.

[View the full Shanghai & Surroundings tour →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b4',
    slug: 'shanghai-10-days-itinerary',
    title: '10-Day Shanghai & Jiangnan Itinerary for NZ Travellers (2026)',
    excerpt: 'Day-by-day 10-day route covering Shanghai, Suzhou, Wuxi & Hangzhou — pacing, October weather, meals, and real prices from NZD $3,399. By CTS Tours, NZ\'s China specialists since 1928.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Shanghai', 'China Itinerary', '10 Days China', 'Jiangnan', 'New Zealand Travel'],
    heroImage: '/blog/group-shanghai-bund-selfie.jpg',
    publishedAt: '2026-04-25',
    readTime: '7 min read',
    content: `
> **Quick answer:** A 10-day Shanghai & Jiangnan itinerary covers Shanghai (2 days), Suzhou (2 days), Wuxi & Lake Tai (1–2 days), Hangzhou (2 days), and a final Shanghai day before flying home. Best in October (warm days, clear skies). From NZD $3,399 per person twin share with CTS Tours, including international airfares from Auckland.

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

The CTS **Shanghai & Surroundings** Discovery tour covers this route from NZD $3,399 per person (twin share) including international airfares from Auckland. Departs 14 October 2026.

[View full tour details →](/tours/china/discovery/shanghai-surroundings)
    `
  },

  {
    id: 'lt-b5',
    slug: 'china-water-towns-jiangnan-guide',
    title: 'China\'s Water Towns: The Jiangnan Region Guide',
    excerpt: 'The Jiangnan water towns — canal cities, classical gardens, silk culture, and West Lake — are a different China from Beijing and Xi\'an. Here\'s what makes them special and how to experience them from New Zealand.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'culture',
    tags: ['Jiangnan', 'Water Towns', 'Suzhou', 'Wuxi', 'China Culture', 'New Zealand Travel'],
    heroImage: tourImage('wuzhen-canal.jpg'),
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    faqs: [
      {
        question: 'What is the Jiangnan region of China?',
        answer: 'Jiangnan means south of the river — the land below the lower Yangtze, centred on Shanghai, Suzhou, Hangzhou and Wuxi. It has been China\'s wealthiest region for a thousand years, and its signature landscape is water: canal towns, stone bridges, classical gardens and West Lake. Culturally it is a gentler, more refined China than the imperial north.'
      },
      {
        question: 'Which water town near Shanghai is best?',
        answer: 'It depends what you want. Zhujiajiao is the closest to Shanghai (under an hour) and the easiest half-day trip. Wuzhen is the most beautifully restored, best experienced overnight when the day crowds leave. Xitang is famous for lantern-lit evenings along covered walkways. Tongli, near Suzhou, is the quiet local option. For most first-time visitors we recommend Zhujiajiao as a taster or Wuzhen for the full experience.'
      },
      {
        question: 'How many days do you need for Shanghai, Suzhou and Hangzhou?',
        answer: 'A comfortable loop is 7 to 10 days: three nights in Shanghai with a water-town day trip, two in Suzhou for the gardens and canals, and two or three in Hangzhou for West Lake and the tea hills. The cities are 30 to 90 minutes apart by high-speed rail, so the travelling itself is easy.'
      },
      {
        question: 'When is the best time to visit the Jiangnan region?',
        answer: 'Late March to May and September to early November. Spring brings mild temperatures and the Longjing tea harvest; autumn gives clear skies and osmanthus blossom in Hangzhou. Avoid the first week of October — China\'s National Day holiday fills every water town in the region.'
      },
      {
        question: 'Are the water towns touristy?',
        answer: 'The famous ones are popular, and on holiday weekends genuinely crowded — but mostly with Chinese domestic travellers, which is its own atmosphere. Go early morning or stay overnight and you will have the stone lanes and canals close to yourself. Western visitors remain rare enough that you will not feel you are in a tourist bubble.'
      },
    ],
    content: `
Most travellers planning a first China trip think of Beijing and the Great Wall. The Jiangnan region — the watery lowlands south of the Yangtze, centred on Suzhou, Hangzhou, Wuxi and Shanghai — is a completely different China: canals instead of avenues, gardens instead of palaces, tea hills instead of steppe. For many of our NZ clients it ends up the most lasting memory of the whole trip. Here is what makes it special and how to do it well.

## What Does Jiangnan Mean?

Jiangnan literally means south of the river — the Yangtze. Since the Song Dynasty (960 AD) this delta has been the richest region in China, and the culture that grew here is distinct: refined, literary, and aesthetically precise. The classical garden tradition, Suzhou silk and embroidery, Kunqu opera (older than Beijing opera), Hangzhou's tea culture, and the canal network that once linked every town — all of it belongs specifically to Jiangnan.

The practical consequence for travellers: the region rewards slowness. The distances are short, the trains fast, and the best moments — morning mist on a canal, an empty garden courtyard — come to people who are not rushing.

## Which Water Town Should I Choose?

The canal towns are the region's signature, and they are not interchangeable:

- **Zhujiajiao** — under an hour from Shanghai, built around the great arc of Fangsheng Bridge. The easiest half-day water-town trip in China. Our [Zhujiajiao guide](/blog/zhujiajiao-water-village) covers it in detail.
- **Wuzhen** — the most carefully restored, split into two scenic zones; the western zone at dusk, after the day-trippers leave, is the single best water-town experience in the region. Worth an overnight stay.
- **Xitang** — famous for its kilometre of covered waterside walkways and lantern-lit evenings; livelier and more commercial.
- **Tongli and Luzhi** — smaller towns near Suzhou where daily life continues between the visitors; the quiet choices.

If you only have one slot, take Zhujiajiao as a Shanghai day trip or give Wuzhen a night. If water towns become your favourite thing — it happens — two or three fit easily into a ten-day loop.

## Why Do People Rave About Suzhou?

Suzhou has run on water for 2,500 years, and the old quarter around Pingjiang Road still works the way the Song-dynasty maps drew it: whitewashed houses, stone bridges, boats sliding along narrow canals. Walk it before 9am and you will have it almost to yourself.

The city's nine UNESCO-listed classical gardens are the concentrated expression of Jiangnan culture — compressed landscapes where rocks stand for mountains and ponds for lakes. See the **Humble Administrator's Garden** for scale, the **Master of the Nets Garden** for perfect proportion, and the **Lingering Garden** for its extraordinary rockery. Our [Suzhou gardens guide](/blog/suzhou-gardens-guide-nz) explains how to visit them well; the short version is: two gardens properly beat five gardens quickly.

## What About Hangzhou and West Lake?

Hangzhou's **West Lake** is the most celebrated landscape in Chinese art — a thousand years of poets and painters have fixed its causeways, pagodas and misty islands in the national imagination. Walk or cycle the Su Causeway early, take the boat to the island of Three Pools Mirroring the Moon, and give the lakeshore an unhurried evening. Our full [West Lake travel guide](/blog/west-lake-hangzhou-travel-guide) has the details.

In the hills directly behind the lake grow the tea bushes of **Longjing (Dragon Well)** — China's most prized green tea. A half-day in the tea villages, watching the leaves hand-fired in hot woks and tasting the grades in sequence, connects you to a tradition running back to the Tang Dynasty. The spring harvest in late March and April is the most atmospheric time.

## How Do the Logistics Work?

This is the easiest region in China to travel independently or in a small group: Shanghai, Suzhou and Hangzhou form a triangle 30 to 90 minutes apart by high-speed rail, with trains every few minutes. A comfortable shape for the region is 7 to 10 days — three nights Shanghai (with a water-town day), two Suzhou, two or three Hangzhou. Our [10-day Shanghai and Jiangnan itinerary](/blog/shanghai-suzhou-hangzhou-itinerary) lays out the full route day by day.

**When to go:** late March to May, or September to early November. Avoid the first week of October, when National Day holidays fill the entire region. And remember NZ passport holders currently enter China [visa-free for up to 30 days](/china-visa-guide-for-new-zealanders), so the trip books with nothing more than passport and flights.

## Experiencing Jiangnan With CTS

Our **Shanghai and Surroundings** Discovery tour covers this exact region — Shanghai, Suzhou, Hangzhou and a water town in one comfortable loop, with the October departure timed for the region's best weather. From NZD 3,399 per person twin share including airfares from Auckland.

[View the full tour →](/tours/china/discovery/shanghai-surroundings), or browse [Shanghai](/shanghai-tours), [Suzhou](/suzhou-tours) and [Hangzhou](/hangzhou-tours) tours.
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
    heroImage: '/blog/group-chongqing-costume-riverside-4.jpg',
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
    id: 'lt-c4',
    slug: 'liziba-station-chongqing-guide',
    title: 'Liziba Station Chongqing: Complete Visitor Guide',
    excerpt: 'Liziba Station is the most photographed railway station in China — and possibly the world. Here\'s everything you need to know: what it is, how to visit, and how to get the best shot.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Liziba Station', 'Chongqing', 'China Travel', 'Unique Attractions', 'Train Travel'],
    heroImage: '/blog/sourced/liziba-station-train-arriving.jpg',
    heroImageCredit: 'Photo: Nissangeniss, CC BY-SA 4.0, via Wikimedia Commons',
    publishedAt: '2026-04-25',
    readTime: '8 min read',
    faqs: [
      {
        question: 'Is Liziba Station real, or built for tourists?',
        answer: 'It is completely real. Liziba Station is a working stop on Chongqing Rail Transit Line 2, carrying commuters daily since 18 June 2005. The 19-storey building it passes through is full of ordinary apartments and offices — the station occupies floors 6 to 8. Nothing about it was built as a tourist attraction; the fame came later.'
      },
      {
        question: 'How do I get to Liziba Station?',
        answer: 'Take Chongqing Rail Transit Line 2 and get off at Liziba. From the Jiefangbei city-centre area, connect to Line 2 at Linjiangmen or Jiaochangkou — the ride takes roughly 10 minutes and costs just a few yuan. Ride through from the adjacent station (Fotuguan or Zengjiayan) at least once for the inside view before you photograph the outside.'
      },
      {
        question: 'Where is the best place to photograph the train going through the building?',
        answer: 'Use the purpose-built riverside viewing platform across the road from the station — it was added in 2019 precisely because so many visitors were standing in traffic. It gives the classic straight-on angle, and train arrival times are posted so you know how long until the next pass. Trains come every 5 to 10 minutes, so you never wait long.'
      },
      {
        question: 'How long should I spend at Liziba?',
        answer: 'Between 30 and 90 minutes. The photo itself takes minutes; most people stay to watch several trains pass, ride through the building once in each direction, and walk the riverside. It slots neatly into a morning or afternoon alongside Hongyadong or Eling Park rather than filling a day on its own.'
      },
      {
        question: 'Is there an entry fee for Liziba Station?',
        answer: 'No. The viewing platform is free and open all day, and riding through the building costs only a normal metro fare of a few yuan. It is one of the cheapest world-famous sights in China.'
      },
    ],
    content: `
Liziba Station is real. This is the first thing most people need to confirm when they see photographs of it — a commuter train passing directly through the floors of a 19-storey residential building in central Chongqing. It is not a tourist installation and not a mock-up. It is a functioning metro station on Line 2 of the Chongqing Rail Transit system, the building around it is full of apartments and offices, and you can visit it for the price of a metro ticket. Here is everything you need to know before you go.

## What Exactly Is Liziba Station?

Liziba Station (Chinese: 李子坝站) is a straddle-type monorail stop on Chongqing Rail Transit Line 2, in Yuzhong District on the north bank of the Jialing River. The station occupies floors 6 to 8 of a 19-storey mixed-use tower: floors 1 to 5 are commercial space, floors 9 to 19 are residential apartments.

Station and building were designed together and built simultaneously from 1998, with the structure of the platform separated from the building's load-bearing frame. The station opened for service on 18 June 2005 — the first of its kind in China.

The trains are rubber-tyred monorail rather than steel-wheel, which is the detail that makes the whole arrangement liveable: residents above the line describe the noise as barely perceptible, roughly the hum of a household appliance. Watch a train glide in and you will notice how quiet it is — often quieter than the traffic below.

## Why Does a Train Run Through an Apartment Building?

Chongqing is a mountain city. It is built on steep limestone ridges above the confluence of the Yangtze and Jialing Rivers, and there is almost no flat ground for conventional rail corridors. Land in the city core was too tight to route the line around the building plot, so engineers routed it through — and the result became the most photographed railway station in China.

Liziba is the most extreme example, but not an isolated one: Line 2 hugs cliff faces and skims rooftops along much of its riverside run. The ride between Liziba and Fotuguan is worth doing purely for the view of the Jialing River below.

## How Do I Visit?

**By metro.** Take Line 2 to Liziba. From the Jiefangbei area, change onto Line 2 at Linjiangmen or Jiaochangkou; the trip takes about 10 minutes and costs a few yuan. Trains run from roughly 6:30am to 10:30pm at 5 to 10 minute intervals.

**Ride through it first.** Board one stop away (Fotuguan or Zengjiayan) and ride through the building. Daylight flashes into the carriage on both sides as you pass through the tower — a strange few seconds that the photographs cannot convey.

**Then photograph it from the viewing platform.** In 2019 the city built a dedicated riverside viewing platform across the road from the station, complete with posted train times, because visitors kept standing in the road for the shot. The straight-on angle you have seen online is taken from here. It is free and open all day.

**Light.** Morning light comes from the east and lights the river side of the tower; late afternoon gives warmer tones from the west. Midday in summer is flat and hazy — Chongqing's famous fog is real, and moody shots in light mist are their own genre.

## How Long Do I Need, and What Should I Combine It With?

Allow 30 to 90 minutes. The classic pairing is Liziba plus [Hongyadong](/hongyadong-chongqing), the lantern-lit stilt-house complex a short taxi ride away — do Liziba in the late afternoon and walk into Hongyadong as the lights come on. Eling Park, one stop away, has one of the best free lookouts over the peninsula.

A note on Ciqikou: the Song-dynasty market town is well worth a visit, but it is across town in Shapingba District — pair it with Liziba in the same day by metro, not on foot.

For a fuller picture of how a Chongqing day fits together, see our [10-day Chongqing and Chengdu itinerary](/blog/chongqing-chengdu-itinerary-10-days) and our guide to [Chongqing after dark](/blog/chongqing-nightlife-guide).

## Is It Worth It for NZ Travellers?

Yes — with the right expectations. Liziba is a 45-minute wonder, not a half-day attraction, and it is the kind of sight that makes Chongqing feel unlike anywhere else you have travelled. Combined with Hongyadong, the river crossings by cable car, and the night skyline, it is a core part of why Kiwi travellers consistently rate Chongqing the surprise of their China trip.

New Zealand passport holders can currently visit China [visa-free for up to 30 days](/china-visa-guide-for-new-zealanders), which makes a Chongqing stop easier than it has ever been.

## Visiting With CTS Tours

Our **Fire and Fuzz** itinerary (Chongqing and Chengdu, 10 days) includes Liziba Station on the Chongqing days, timed for the viewing platform and combined with Hongyadong in the evening. Your guide handles the metro, the timing, and the photo spots.

[View the full itinerary →](/tours/china/discovery/chongqing-chengdu) or browse all [Chongqing tours](/chongqing-tours).
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
    heroImage: tourImage('chengdu-pandas.jpg'),
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
