import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash } from '@/lib/site-media';

/**
 * Phase 3 — Line B: Shanghai & Surroundings (5 posts)
 * Slugs: shanghai-skyline-modern-china, suzhou-gardens-classical-beauty,
 *        hangzhou-west-lake-romance, zhujiajiao-water-village,
 *        yangtze-river-cruise-journey
 */
export const phase3LineBPosts: BlogPost[] = [

  // ─────────────────────────────────────────────
  // B-1: Shanghai Skyline & Modern China
  // ─────────────────────────────────────────────
  {
    id: 'p3-b1',
    slug: 'shanghai-skyline-modern-china',
    title: "Shanghai Skyline and Modern China: A Traveller's Introduction",
    excerpt: 'Shanghai is the city that makes every visitor rethink what China is. Baker Gu explains the Bund, Pudong, the French Concession, and how to understand Shanghai as both a historical port city and a glimpse of China\'s future.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Shanghai', 'The Bund', 'Pudong', 'Modern China', 'China Tourism'],
    heroImage: migratedUnsplash('photo-1512941937669-90a1b58e7e9c'),
    publishedAt: '2026-05-20',
    readTime: '7 min read',
    content: `
I'm **Baker Gu**, and Shanghai is the city I use to recalibrate client expectations about China. If you arrive expecting ancient temples and rural villages, Shanghai will surprise you thoroughly — and that surprise is worth leaning into.

Shanghai is one of the most architecturally layered cities on earth. Within a single afternoon you can walk from Qing Dynasty tea houses to 1930s Art Deco banking halls to 21st-century supertall towers. Each layer is real. Each layer tells you something different about China's relationship with the world.

## The Bund: Where the Story Starts

The Bund (外滩, Wàitān) is Shanghai's signature promenade along the west bank of the Huangpu River. The buildings on the western side of the road — the ones facing the river — are the colonial-era headquarters of the banks, trading houses, and hotels that made Shanghai one of the world's great commercial cities in the late 19th and early 20th centuries.

These buildings are not Chinese architecture. They are British neoclassical, Italian Renaissance, Art Deco, and Baroque — a remarkable collection of European commercial architecture built in Asia. The Customs House with its clock tower. The old HSBC building (now a Chinese bank) with its magnificent mosaic-domed banking hall. The Fairmont Peace Hotel (formerly the Cathay Hotel) where Noël Coward allegedly wrote Private Lives.

Across the river, Pudong: the jungle of towers that Shanghai built in the 1990s and 2000s on what was, before 1990, farmland. The Oriental Pearl Tower (1994, now looking retro), the Jin Mao Tower (1999), the World Financial Centre with its trapezoidal sky window at 492 metres, and the Shanghai Tower (2015, 632 metres) — all within walking distance of each other.

The Bund at night, looking across at the Pudong skyline, is one of the great city views in the world. Go before dinner.

## The French Concession

The Foreign Concessions — areas of Shanghai administered by foreign powers under 19th-century treaty arrangements — produced an extraordinary urban fabric that survives in pockets across the city. The French Concession (法租界) is the most intact.

The streets of the French Concession are shaded by plane trees planted a century ago, lined with townhouses in a style that blends French residential design with Chinese decorative elements. Many of these buildings now house restaurants, boutiques, and cafes. The neighbourhood feels different from the rest of Shanghai — quieter, more intimate, with a pace that rewards walking without a destination.

Wukang Road is the neighbourhood's most photographed street, particularly where it curves past the Wukang Mansion — a 1924 Normandy-style apartment building that terminates the street's sightline. Walk north from there into the surrounding lanes and you will find some of the city's best coffee, independent bookshops, and the occasional surviving shikumen (stone gate) lanehouse — the distinctive Shanghai residential form that blends a Chinese courtyard with European row house construction.

## Old Shanghai: Yu Garden and the City God Temple

Yu Garden (豫园, Yùyuán) is the preserved Ming Dynasty private garden that survived successive occupiers and developers through sheer historical prominence. It is small — 2 hectares — but dense with rockeries, pavilions, goldfish ponds, and the peculiarly beautiful garden aesthetic of the Jiangnan style.

The surrounding bazaar area, reconstructed in Ming style, is pure tourist commerce — but the garden itself repays the visit, particularly if you arrive at opening (8:30am) before the day crowds.

## How to Understand Pudong

Many first-time visitors to Shanghai treat Pudong purely as a background for the Bund photos. This misses something. Take the Pearl Line ferry across (CNY 2, the cheapest river crossing in any major world city), go up to the observation deck of the Shanghai Tower or the World Financial Centre, and look down at the city spread below you.

What you are seeing is what China built in 30 years — the physical manifestation of an economic transformation without precedent in speed or scale. The highways, the tower clusters, the container port at the mouth of the river (the world's busiest): all of it assembled within living memory. Shanghai helps you understand the modern Chinese story in a way that the ancient capitals cannot.

## Practical Details

- **Getting around:** Metro is excellent, cheap, and has English signage. Download the Alipay app for transit payments.
- **Time required:** Shanghai deserves a minimum of two full days; three is better.
- **Must-visit at night:** The Bund promenade (7–9pm), Tianzifang laneway area (lively after dark), Bar Rouge for the Pudong view.
- **Day trips:** Suzhou (30 minutes by high-speed rail), Hangzhou (45 minutes), Zhujiajiao water village (1 hour by bus).

Shanghai is the gateway for our [Shanghai & Surroundings Discovery tour](/tours/china/discovery/shanghai-surroundings) and can be added to any custom itinerary. [Contact us](/contact) to discuss.
    `
  },

  // ─────────────────────────────────────────────
  // B-2: Suzhou Classical Gardens
  // ─────────────────────────────────────────────
  {
    id: 'p3-b2',
    slug: 'suzhou-gardens-classical-beauty',
    title: "Suzhou Classical Gardens: China's UNESCO Masterpieces of Landscape Design",
    excerpt: 'Suzhou\'s classical gardens are UNESCO World Heritage sites — miniature landscapes that took centuries to perfect. Here\'s how to visit without the crowds, which gardens to prioritise, and why they matter.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Suzhou', 'Classical Gardens', 'UNESCO', 'Shanghai Day Trip', 'Jiangnan'],
    heroImage: migratedUnsplash('photo-1469474968028-56623f02e42e'),
    publishedAt: '2026-05-21',
    readTime: '6 min read',
    content: `
Suzhou, 30 minutes from Shanghai by high-speed rail, is one of China's oldest cities and the capital of classical garden design. The private gardens that the scholar-officials of the Song, Ming, and Qing dynasties built here — and that nine of them survive in sufficient condition to be listed as UNESCO World Heritage Sites — represent a tradition of landscape art that has no direct equivalent in Western culture.

Understanding what these gardens are for makes the difference between an interesting visit and a genuinely affecting one.

## What the Gardens Are

The classical Chinese garden is not a garden in the Western sense of cultivated plants in a formal or informal arrangement. It is a constructed landscape: a miniature world complete within its walls, containing mountains (represented by rockeries), water (ponds and channels), vegetation, architecture (pavilions, bridges, corridors), and empty space — all arranged to create the experience of being in a natural landscape while remaining within a city.

The gardens were built by scholar-officials — men who had succeeded in the imperial examination system and risen to positions of power, then (often) retired or been dismissed from office. In their gardens, they created a world they controlled completely: a landscape that embodied the Daoist and Confucian ideals of harmony, restraint, and the proper relationship between humanity and nature.

The garden was also a social and intellectual space. Scholars would gather in pavilions to compose poetry, paint, play music, and drink tea. The garden's elements — the rock formations, the lotus pond, the bamboo groves — were not passive scenery but subjects for contemplation and allusion.

## Which Gardens to Visit

**The Humble Administrator's Garden** (拙政园, Zhuōzhèng Yuán) is the largest and most famous — 5.2 hectares, dating from 1513. It was built by a retired imperial inspector (the name is a self-deprecating reference to managing his garden as his official duty). The water areas are extensive, the pavilions well-spaced, and the internal views — framed by moon gates and corridor windows — are the classic Suzhou experience. **Visit first, early.**

**The Lingering Garden** (留园, Liú Yuán) is distinguished by its extraordinary rockery: a 6.5-metre scholar's rock that is the centrepiece of the central courtyard. The building complex is larger and more elaborate than the Administrator's Garden, with a remarkable suite of interconnected halls that demonstrate the relationship between architecture and garden in classical design.

**The Master of the Nets Garden** (网师园, Wǎngshī Yuán) is the most intimate — barely one-third of a hectare. Its scale allows you to understand the garden as a composition in a way that the larger gardens' size does not. The central pond, surrounded by pavilions at precise distances, is the most photographed view in Suzhou's gardens.

## Practical Notes

Suzhou's garden crowds are genuinely problematic during Chinese public holidays and weekend peak hours (10am–2pm). If your schedule allows:

- Arrive at opening (8:30am) for the Humble Administrator's Garden
- Visit smaller gardens mid-afternoon when the tour groups are at lunch
- Consider a Monday or Tuesday visit (weekday crowds are significantly lighter)

The city of Suzhou itself is worth a half-day beyond the gardens: the old canal district (Pingjiang Road) is a preserved waterfront with traditional architecture, and the Silk Museum offers excellent exhibits on the industry that made Suzhou wealthy enough to build the gardens in the first place.

**Day trip from Shanghai:** High-speed rail from Shanghai Hongqiao or Shanghai Railway Station to Suzhou takes 25–35 minutes. Tickets cost CNY 26–41. Taxis from Suzhou station to the garden district take 10 minutes and cost CNY 15–20.

We include Suzhou on our [Shanghai & Surroundings Discovery tour](/tours/china/discovery/shanghai-surroundings). Read our full [Suzhou travel guide](/suzhou-travel-guide) for more detail on the city.
    `
  },

  // ─────────────────────────────────────────────
  // B-3: Hangzhou West Lake Romance
  // ─────────────────────────────────────────────
  {
    id: 'p3-b3',
    slug: 'hangzhou-west-lake-romance',
    title: "Hangzhou West Lake: Romance, Poetry, and China's Most Beloved Landscape",
    excerpt: 'West Lake has been the subject of Chinese poetry for 1,000 years. Baker Gu explains why Hangzhou still deserves its UNESCO listing, the best ways to experience the lake, and what to do beyond the water.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Hangzhou', 'West Lake', 'Jiangnan', 'UNESCO', 'Travel China'],
    heroImage: migratedUnsplash('photo-1513415756790-2ac1db1297d0'),
    publishedAt: '2026-05-22',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, and Hangzhou's West Lake is one of those landscapes that has been written about so often, in so many centuries of Chinese poetry, that arriving there feels like meeting someone you already know. The relationship between Hangzhou and the Chinese cultural imagination is deep — Su Dongpo, the great Song Dynasty poet, served as governor here and wrote about the lake so memorably that his images have been embedded in Chinese culture for 950 years.

UNESCO listed West Lake in 2011 as a Cultural Landscape. That designation captures something important: the lake is not a natural wilderness preserved intact, but a landscape that has been shaped, managed, and aestheticised by human activity over ten centuries. The causeways, islands, gardens, and temples that structure the view are as much part of the lake as the water itself.

## The Lake and Its Structure

West Lake is about 6.5 square kilometres, surrounded by hills on three sides and the city on the fourth. Two causeways — the Su Causeway (named after Su Dongpo) and the Bai Causeway (named after an earlier Tang Dynasty poet-governor, Bai Juyi) — cross the lake and divide it into sections. Three islands rise from the water.

The essential experience of West Lake involves these causeways. Walking or cycling the Su Causeway (2.8km) in the early morning, before the crowds arrive, with the willow trees trailing into the still water and mist still sitting on the hills, is one of the genuinely lovely experiences that China offers.

## How to Experience the Lake

**By boat:** Small wooden boats with a single rower are available for hire at various points around the lake. A 30-minute tour of the central lake area costs CNY 45 per person. This gives you the view from the water — the pagodas framed against the hills, the lotus fields in summer, the reflections that the photographers spend so much effort chasing.

**By bicycle:** Bikes are available for hire at the parking lots near the major causeways. A circuit of the full lake perimeter is about 15km and takes 2–3 hours at a comfortable pace. This is the most satisfying way to see the lake, allowing you to stop at will.

**By electric boat:** Larger tourist boats do loops of the lake with stops at Xiaoyingzhou Island (the island-within-an-island) and the Three Pools Mirroring the Moon — three stone pagodas that create a reflection effect at the mid-autumn moon festival. These boats run on a schedule; times are posted at the departure points.

**On foot:** The northern shore lakefront promenade, between the two causeway starts, is a pleasant 3km walk with good views toward the hills.

## Beyond the Lake

The hills surrounding the lake contain temples, Buddhist statuary, tea plantations, and pagodas worth half a day of exploration.

**Lingyin Temple** is one of China's most important Buddhist temples, operating continuously since 326 AD. The main hall houses a 24.8-metre wooden sculpture of the Seated Sakyamuni — one of the largest in China. The pathway to the temple passes through a ravine (Feilai Feng) where Song and Yuan Dynasty Buddhist carvings have been cut directly into the limestone.

**Longjing Village** is the source of Longjing (Dragon Well) tea — the most famous of Chinese green teas. The village sits among terraced tea fields on the hills west of the lake. In April during harvest season, you can watch the leaves being hand-plucked and processed, and taste the fresh-pressed tea at the farmers' houses. Outside harvest season, the fields are still beautiful and the tea is excellent.

## Practical Information

- **Getting there:** High-speed rail from Shanghai Hongqiao to Hangzhou takes 45 minutes (CNY 35–53). Metro line 1 connects Hangzhou station to the lake area.
- **Best time:** Spring (March–April) for the tea harvest and early flowers; autumn (October) for cool temperatures and autumn colour. Avoid summer weekends when the lake is very crowded.
- **Accommodation:** Staying overnight is worth it — West Lake in the early morning before tour groups arrive is a different experience from the midday chaos.

We include Hangzhou on our [Shanghai & Surroundings Discovery tour](/tours/china/discovery/shanghai-surroundings). For the full regional context, read our [Hangzhou travel guide](/hangzhou-travel-guide).
    `
  },

  // ─────────────────────────────────────────────
  // B-4: Zhujiajiao Water Village
  // ─────────────────────────────────────────────
  {
    id: 'p3-b4',
    slug: 'zhujiajiao-water-village',
    title: "Zhujiajiao Water Village: Shanghai's Ancient Town Within Reach",
    excerpt: 'Just 45km from central Shanghai, Zhujiajiao is a 1,700-year-old water town with stone bridges, canal gondolas, and Ming Dynasty streets. Here\'s how to visit without turning it into a tourist conveyor belt.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'experience',
    tags: ['Zhujiajiao', 'Water Town', 'Shanghai Day Trip', 'Ancient China', 'Jiangnan'],
    heroImage: migratedUnsplash('photo-1553531384-cc64ac80f931'),
    publishedAt: '2026-05-23',
    readTime: '5 min read',
    content: `
Forty-five kilometres west of Shanghai's city centre, accessible by direct bus in under an hour, Zhujiajiao has been a functioning town on the waterways of the Jiangnan delta for approximately 1,700 years. It reached its commercial peak during the Ming and Qing Dynasties as a rice and cotton trading hub, and the town that survives today — the canal network, the 36 stone bridges, the riverside merchant houses — dates substantially from that period.

## What You're Looking At

The Jiangnan water towns — of which Zhujiajiao, Wuzhen, Tongji, and Xitang are the most visited — share a common geography: a flat delta landscape crossed by canals that historically served as the road network, with towns built along the water's edge. The architecture is a consistent style of whitewashed walls, black tile roofs, and wooden storefronts opening directly onto narrow lanes.

Zhujiajiao's defining feature among the water towns is its bridges. Fangsheng Bridge, built in 1571, is the longest five-arched stone bridge in the Shanghai region — 72 metres, still carrying foot traffic as it has for over four centuries. Standing on it and looking along the canal in either direction at dawn or dusk is one of the classic Jiangnan views.

## How to Visit Well

**Arrive before 9am.** The tour buses from Shanghai begin arriving from 9:30am, and by 10am the main canal street (Xijing Street) is densely crowded. The town before the crowds is a different experience — local residents going about their morning routines, shopkeepers setting up, the light on the water still soft.

**Take a gondola ride early.** Wooden gondolas with a single standing rower are available at several points along the main canal. A 20-minute ride costs CNY 80 for the whole boat (up to 6 people). The view from water level — under the stone bridges, past the willow trees trailing into the canal, with the old houses rising directly from the water's edge — is what Zhujiajiao is for.

**Explore the back lanes.** The main canal street is commercial and increasingly tourist-oriented. The smaller lanes running perpendicular to the water are where the town lives: residents' washing hung between buildings, cats sleeping on doorsteps, the occasional traditional craft workshop still operating.

**Visit the City God Temple and Catholic Church.** Two religious buildings that tell you something about the town's history: the City God Temple (a Daoist site on an island in the middle of the town's lake) and the Church of Ascension (a 1863 Catholic church built by Jesuit missionaries from Shanghai), both within easy walking distance of each other. The coexistence is very Jiangnan.

## Practical Details

- **Transport from Shanghai:** Tourist Line 9 bus departs from the Pu'an Road bus terminal near People's Square. Takes approximately 50 minutes. CNY 12 each way. Return buses run until around 6pm.
- **Entrance fees:** The town itself has no entrance fee. Individual historic buildings (Post Office Museum, City God Temple) charge CNY 5–30 each. An all-inclusive pass for the major attractions is CNY 60.
- **Food:** Zongzi (sticky rice in bamboo leaves), braised pork trotters, and freshwater fish are the local specialities. The restaurants along the back canal lanes are substantially better value than the main street tourist operations.
- **Time required:** Half a day is sufficient; a full day if you want to linger.

Zhujiajiao is included as an optional excursion on our [Shanghai & Surroundings Discovery tour](/tours/china/discovery/shanghai-surroundings). It also pairs naturally with a morning in Suzhou or an afternoon in Hangzhou as part of a Jiangnan region exploration.
    `
  },

  // ─────────────────────────────────────────────
  // B-5: Yangtze River Cruise
  // ─────────────────────────────────────────────
  {
    id: 'p3-b5',
    slug: 'yangtze-river-cruise-journey',
    title: "Yangtze River Cruise: What You'll See, Feel, and Never Forget",
    excerpt: 'A Yangtze River cruise through the Three Gorges is unlike any other river journey in the world. Baker Gu explains what the cruise experience is actually like, what changed after the Three Gorges Dam, and who it suits.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ['Yangtze River', 'Three Gorges', 'River Cruise', 'Chongqing', 'China Landscape'],
    heroImage: migratedUnsplash('photo-1506905925346-21bda4d32df4'),
    publishedAt: '2026-05-24',
    readTime: '7 min read',
    content: `
I'm **Baker Gu**, and the Yangtze River cruise is the experience I recommend most carefully. Not because it is bad — it is extraordinary — but because it suits a specific type of traveller, and the people who choose it for the wrong reasons tend to be disappointed.

The Yangtze is the third-longest river in the world (6,300km from the Tibetan Plateau to the East China Sea), and the Three Gorges — Qutang, Wu, and Xiling — are the most dramatic stretch: sheer limestone walls rising up to 1,200 metres directly from the water, cloud-wrapped peaks, and a landscape so extreme that it generated its own genre of Chinese landscape painting.

The cruise from Chongqing to Yichang (or reverse) covers approximately 660km over 4–5 days, passing through all three gorges and stopping at the Three Gorges Dam.

## What Changed After the Dam

The Three Gorges Dam (completed 2006) is one of the largest engineering projects in human history, and it permanently changed the Yangtze gorge experience. The reservoir behind the dam raised the water level by up to 175 metres, permanently submerging significant sections of the Three Gorges and more than 1,000 towns and villages. Approximately 1.4 million people were relocated.

What this means practically for a contemporary cruise: the gorges are still dramatic, but the water is now higher — the sheer walls appear shorter than they did in pre-dam photographs, because you are now several dozen metres above where the original riverbed was. The narrower tributary gorges (Shennong Stream, Little Three Gorges) that are accessed by smaller boats as excursions from the main cruise are less affected, and in some cases actually more accessible.

The scale of what the dam removed from the world, and what it created (power for hundreds of millions of people, flood protection for cities downstream), is part of what makes the experience interesting. The cruise goes through the dam locks — a 5-hour passage that is itself worth witnessing.

## What the Cruise Experience Is

This is not a Mediterranean cruise or an Alaska voyage. The river gorges are the spectacle; the cruise ship is the platform from which you watch them. The best times to be on deck are dawn (the mist burns off the gorges slowly over about two hours) and the period before sunset when the rock faces turn orange. Midday is often hazy and the light is flat.

The cruise ships vary considerably in quality. At the top end, the luxury vessels operated by Viking and a handful of Chinese operators have cabins with floor-to-ceiling windows, proper restaurants, and well-organised excursion programmes. At the budget end, the public ferries are utilitarian — functional for Chinese travellers, not designed for international expectations.

On our Yangtze itineraries, we use the mid-range to luxury vessels and pre-select cabins with river-facing windows.

## Excursions Worth Taking

**Shennong Stream:** A tributary gorge accessible from the main river by small wooden sampan boats with local boatmen. Narrower, greener, and more intimate than the main gorges. The boatmen navigate the shallows with bamboo poles. One of the cruise highlights.

**Ghost City of Fengdu:** A hillside complex of Daoist temples dedicated to the afterlife — a somewhat surreal collection of buildings featuring depictions of hell and the judgment of souls. Not universally appealing, but memorable.

**Three Gorges Tribe:** A living history site where performances of ancient local music and dance are staged on a cliff face. Variable quality depending on the company, but gives a window into the pre-dam culture that was partly submerged.

**Three Gorges Dam visitors' centre:** The engineering is genuinely astonishing — a wall 2.3km wide and 185m high, generating 22,500 megawatts. The scale statistics take time to absorb.

## Who This Cruise Suits

The Yangtze River cruise is ideal for travellers who:
- Are comfortable with relatively slow, contemplative travel
- Have two or more weeks in China and want to see something genuinely different from the major cities
- Are interested in Chinese history, landscape, and the intersection of human engineering and natural scenery
- Are over 55 (the pace and physical demands are very manageable)

It is less ideal for travellers who want high-energy city experiences, have under 10 days total, or expect the activity variety of a large ocean cruise.

We build the Yangtze into our longer Signature itineraries as a mid-journey transition between the western cities (Chengdu, Chongqing) and the eastern cities (Yichang, Wuhan, Shanghai). [Contact us](/contact) to discuss whether a Yangtze cruise belongs in your itinerary.
    `
  }
];
