import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash } from '@/lib/site-media';

/**
 * Phase 3 — Line C: Chongqing & Chengdu (5 posts)
 * Slugs: chongqing-three-gorges-scenic, chengdu-panda-sanctuary-experience,
 *        chengdu-spicy-cuisine-culture, chongqing-night-city-lights,
 *        sichuan-hot-pot-tradition
 */
export const phase3LineCPosts: BlogPost[] = [

  // ─────────────────────────────────────────────
  // C-1: Chongqing & Three Gorges
  // ─────────────────────────────────────────────
  {
    id: 'p3-c1',
    slug: 'chongqing-three-gorges-scenic',
    title: "Chongqing and the Three Gorges: China's Most Dramatic River Scenery",
    excerpt: "Chongqing is the departure point for Yangtze River cruises through the Three Gorges — but it's also a fascinating city in its own right. Baker Gu explains what makes this mountain metropolis worth two days before you board.",
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Chongqing', 'Three Gorges', 'Yangtze River', 'Mountain City', 'China Landscape'],
    heroImage: migratedUnsplash('photo-1581252584837-95f73fd23574'),
    publishedAt: '2026-05-25',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, and Chongqing is the city I spend the most time explaining to New Zealand clients before their first visit. It is not on most people's China radar. It is not on the standard Beijing-Xi'an-Shanghai circuit. And yet it has a population larger than Australia's entire country, a topography unlike any other major city in China, and — via the Yangtze River — direct access to one of the world's great landscape experiences.

## A City Built on Mountains

Chongqing (重庆) sits at the confluence of the Yangtze and Jialing rivers, on a peninsula of steep hills. Unlike Beijing's flat grid or Shanghai's flat delta, Chongqing has no flat ground to speak of. The city climbs up and down the hillsides in ways that defeat standard urban navigation logic. Escalators have been built into the hillside streets. Monorail lines pass directly through the middle of residential tower blocks. Bridges of extraordinary engineering span the river gorges.

The city grew during the Second World War as China's wartime capital — the Nationalist government relocated here after the Japanese advance, and Chongqing survived sustained bombing for six years. What you see today is mostly post-war construction, but the DNA of the city — dense, vertical, built around the rivers — is ancient.

## Chongqing Before the Cruise

Most travellers who visit Chongqing do so because the Yangtze River cruise to Yichang begins here. This creates a tendency to treat Chongqing as a transit stop — a night before the boat.

I recommend two nights. The city repays exploration.

**Hongyadong** is the most dramatic of Chongqing's architectural curiosities: an 11-storey stilt-house complex built down the cliff face of the Jialing River, containing restaurants, shops, and viewing terraces. The view at night — the city lights on the water, the bridges, the stacked buildings — is genuinely impressive.

**Ciqikou Ancient Town** is a Ming Dynasty riverside neighbourhood that survived the city's redevelopment: narrow stone streets, traditional Chongqing architecture, tea houses, and street food. The flatbread ovens, the doubanjiang stalls, the silk embroidery workshops — this is the texture of old Chongqing.

**The Stilwell Museum** commemorates General Joseph Stilwell, the American commander who coordinated Allied support for Chongqing during the Second World War. The exhibits are well-curated and provide essential context for the city's wartime significance.

## The Three Gorges: What the Cruise Shows You

The cruise from Chongqing passes through three gorges in sequence over two to three days.

**Qutang Gorge** is the shortest (8km) and most dramatic: sheer walls, narrow channel, the river compressed to 100 metres in places. The scale of the cliff faces — several hundred metres of vertical limestone — is most immediately impressive here.

**Wu Gorge** (44km) is the most atmospheric: deep, winding, cloud-covered. The peaks are named after a mythological creation — the 12 Goddess Peaks, named in a Tang Dynasty poem by Su Dongpo. The light changes constantly, filtered through cloud that rarely fully lifts.

**Xiling Gorge** (76km) is the longest and was historically the most dangerous for navigation, with rocks and rapids that sank boats for millennia. The Three Gorges Dam sits at the eastern end of Xiling. Passing through the dam's five-step lock system — a process that takes several hours — gives you the engineering at its most immediate scale.

## The Dazu Rock Carvings

Before or after Chongqing, the Dazu Rock Carvings (大足石刻) are worth a half-day. A UNESCO World Heritage Site since 1999, Dazu contains over 50,000 Buddhist, Daoist, and Confucian carvings cut into cliffsides between the 7th and 13th centuries. The Baoding Mountain section (the largest) contains a 31-metre reclining Buddha and a series of multi-figure compositions of extraordinary sophistication. It is 90 minutes from Chongqing by high-speed rail.

## Practical Details

- **Cruise departures:** Most cruises depart in the evening from the Chaotianmen cruise terminal near the confluence of the two rivers
- **Recommended time in Chongqing:** 2 nights pre-cruise or 1 night on arrival (the city is also a common end-point for the downstream cruise)
- **Hot pot:** Eat Chongqing hot pot on your first evening — the original, numbingly spicy version, not the Sichuan-lite version you get in other cities

Our Yangtze cruises depart from Chongqing. [Contact us](/contact) to discuss adding this to your China itinerary.
    `
  },

  // ─────────────────────────────────────────────
  // C-2: Chengdu Panda Sanctuary
  // ─────────────────────────────────────────────
  {
    id: 'p3-c2',
    slug: 'chengdu-panda-sanctuary-experience',
    title: 'Chengdu Panda Sanctuary: Everything You Need to Plan Your Visit',
    excerpt: "The Chengdu Research Base of Giant Panda Breeding is home to over 100 giant pandas. Baker Gu shares what to book, what time to arrive, and how CTS adds exclusive access most visitors never get.",
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ['Chengdu', 'Giant Panda', 'Panda Base', 'Wildlife China', 'Sichuan'],
    heroImage: migratedUnsplash('photo-1564349683136-77e08dba1ef7'),
    publishedAt: '2026-05-26',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, and the giant panda question comes with every Chengdu inquiry. Yes, you should go. Yes, it is worth the early start. Yes, it is different from seeing photos.

The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is not a zoo. It was established in 1987 with six giant pandas rescued from the wild, and has grown into the world's largest facility dedicated to panda conservation and breeding — currently home to over 100 giant pandas and 70-plus red pandas, in naturalistic bamboo forest enclosures across 100 hectares.

The science matters here. The Base has contributed significantly to understanding panda reproduction, nutrition, and behaviour, and has a cub-survival rate that exceeds wild breeding under comparable conditions. This is working conservation, not a tourist attraction that happens to have pandas.

## The Critical Timing Rule

Giant pandas eat bamboo for 12–16 hours a day. They are most active — which in panda terms means moving between bamboo piles and doing things worth watching — in the early morning, typically 8:00–10:00am. By 10:30am, most adult pandas are beginning their midday rest, which involves finding the most comfortable position for sleep and staying there.

Arrive at 8:00am when the gates open. The pandas will be at their most engaged. The crowds will be manageable. By 11am, the tour groups have arrived and the pandas are asleep.

This is not optional advice. An 8am arrival and a 10:30am departure is better than a 10am arrival and a 1pm departure in every measurable way.

## What You'll See

**The giant panda enclosures** on the eastern side of the Base are where the adult and sub-adult pandas live. Multiple enclosures at different levels — ground level, elevated walkways, upper bamboo platforms — give different viewing angles. The pandas eat constantly during the active morning period, and watching a 100kg animal delicately manipulate a bamboo cane with its "false thumb" (an adapted wrist bone, not a true thumb) is genuinely engaging.

**The cub nursery** — when cubs are in residence, typically from late summer through winter — is one of the most popular areas and genuinely moving. Cubs at one to four months are among the most endearing animals in the world, and the nursery viewing window allows close observation of the keepers' work.

**The red panda enclosure** is often undervisited because visitors rush to the giant pandas. Red pandas are, if anything, more naturally charming — fox-sized, rust-coloured, with the same bamboo-eating adaptations as their larger relatives and none of the imposing scale. Allow 20 minutes here.

## Exclusive Access on Our Signature Tours

On our Signature itineraries, we arrange experiences that go beyond the standard visitor access:

**Volunteer keeper experience:** Spend 90 minutes working alongside the keepers — preparing bamboo, cleaning the enclosures, and helping with the pandas' morning feeding. Places are extremely limited and must be booked months in advance. Cost is approximately CNY 1,800 per person.

**Behind-the-scenes visit:** Access to the research and breeding facilities not open to standard visitors, including the quarantine area where new arrivals acclimatise and the maternity ward during cub season.

**Early-access private morning:** Before general opening, the Base allows a small number of private early-entry experiences where you see the pandas before any other visitors arrive. The serenity of the bamboo forest before the gates open is qualitatively different from the standard visit.

These options must be arranged through us as part of a full Chengdu tour — they are not available for individual booking.

## Practical Details

- **Location:** 10km north of central Chengdu, approximately 30 minutes by taxi
- **Opening hours:** 7:30am–6pm (last entry 5pm)
- **Standard entry:** CNY 55 (NZD 13)
- **Time required:** 2.5–3 hours for a thorough standard visit
- **What to wear:** Comfortable walking shoes; bamboo forest paths can be uneven
- **Photography:** Permitted throughout. No flash photography in enclosed areas.

See our [Chengdu tours](/chengdu-tours) for full itineraries combining the Panda Base with the city's temples, food, and culture. The Base fits naturally into a morning, leaving the afternoon for the city centre or the Sichuan Opera.
    `
  },

  // ─────────────────────────────────────────────
  // C-3: Chengdu Spicy Cuisine Culture
  // ─────────────────────────────────────────────
  {
    id: 'p3-c3',
    slug: 'chengdu-spicy-cuisine-culture',
    title: 'Chengdu Spicy Cuisine: A Deep Dive Into Sichuan Food Culture',
    excerpt: "Sichuan cuisine is one of China's eight great culinary traditions, and Chengdu is its undisputed capital. Baker Gu explains the flavour science behind the numbing heat, and the dishes you absolutely must eat.",
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'culture',
    tags: ['Chengdu', 'Sichuan Food', 'Spicy Cuisine', 'Food Culture', 'China Dining'],
    heroImage: migratedUnsplash('photo-1607623814075-e51df1bdc82f'),
    publishedAt: '2026-05-27',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, and I tell every client heading to Chengdu the same thing: put the food at the centre of the visit, not at the margins. Chengdu has been a UNESCO Creative City of Gastronomy since 2010. The designation is correct.

Sichuan cuisine is one of China's eight officially recognised great culinary traditions, and the one with the strongest global footprint. What makes it distinctive is not simply heat — many cuisines are hot — but a specific and complex flavour profile that Chinese cooking calls **mala (麻辣)**: the combination of heat (from dried chillies) and numbness (from Sichuan peppercorns). The two components work on different neurological pathways and create a flavour experience that is genuinely unique.

## The Science of Mala

Sichuan peppercorns (花椒, huājiāo) are not actually pepper at all — they are the dried husks of a small shrub in the citrus family. They contain hydroxy-alpha-sanshool, a compound that activates the same nerve fibres that respond to touch and vibration. The sensation on the tongue is a gentle tingling that slowly builds to a mild numbness — the "ma" (麻) component.

Dried red chillies — which came to China from the Americas via Portuguese traders in the 16th century — provide the heat ("la" component).

Together, they create the signature mala sensation: your mouth is simultaneously hot, numb, and tasting complex layers of flavour underneath. The numbness from the peppercorn actually mediates the heat from the chilli, allowing you to eat spicier food than you could without it. This is why Sichuan food is frequently described as "addictively spicy" by people who do not normally eat spicy food.

## The Dishes You Must Eat

**Mapo tofu (麻婆豆腐):** Silken tofu in a sauce of doubanjiang (fermented broad bean and chilli paste), minced pork, Sichuan peppercorns, and broth. The original version is both spicier and more complex than most overseas versions. Order it at a restaurant that makes its own doubanjiang.

**Kung pao chicken (宫保鸡丁):** Diced chicken, dried chillies, and roasted peanuts in a sauce balancing sweetness, sourness, heat, and the specific fragrance of the chillies. The version served in Chengdu has nothing to do with the Westernised version you know.

**Dan dan noodles (担担面):** Thin wheat noodles topped with minced pork, preserved vegetables, sesame paste, chilli oil, and Sichuan peppercorn. Originally a street food sold from shoulder poles — "dan dan" refers to the carrying pole. The best versions in Chengdu are still prepared in small restaurants where the noodles are pulled to order.

**Boiled fish in chilli broth (水煮鱼):** Fillets of white fish poached in a broth with doubanjiang, dried chillies, Sichuan peppercorns, and garlic. The fish is tender; the broth is aggressively spiced; the combination is outstanding.

**Rabbit heads (兔头):** A Chengdu street food speciality with devoted local fans. Spiced rabbit heads, split and eaten with considerable technique. Worth trying once, even if you conclude that extracting rabbit brain from a skull is more effort than reward.

## Chengdu's Teahouse Culture

Sichuan food culture is inseparable from teahouse culture. Chengdu has more teahouses per capita than any other Chinese city, and the teahouse (茶馆) serves a function closer to the British pub or the Viennese coffeehouse than to a Western tea room: a place for extended social sitting, gossip, card games, and the slow passage of an afternoon.

The traditional teahouses in Renmin Park and in the old districts around the Kuanzhai Alleyways (宽窄巷子) serve Sichuan-style gaiwan tea — a lidded bowl of jasmine, chrysanthemum, or green tea, refilled from a long-spouted bronze kettle by a professional tea-pourer with remarkable skill.

The Sichuan Opera evening performance — the highlight of which is bianlian (face-changing), where performers switch elaborate painted masks in less than a second — is best preceded by two hours in a teahouse watching the preparations and the audience arrive.

## Where to Eat

**Longchaoshou** (龙抄手) near People's Park is the most famous dumplings in Chengdu: wonton soup with a pork-and-mushroom filling in a clear, peppercorn-perfumed broth. Queue for it.

**Yu's Family Kitchen (喻家厨房)** requires a reservation weeks in advance but represents the most sophisticated end of Chengdu home cooking — a private residence that serves three generations of family recipes to eight diners at a time.

**Jinli Night Market** adjacent to the Wuhou Shrine is the best place to graze through multiple street foods in one evening: skewers, rabbit, cold dishes, dumplings, icy sweet rice wine.

Explore Chengdu's food culture on our [Chengdu tours](/chengdu-tours) — every itinerary includes an evening at the Sichuan Opera and a hot pot dinner on the last night.
    `
  },

  // ─────────────────────────────────────────────
  // C-4: Chongqing Night City Lights
  // ─────────────────────────────────────────────
  {
    id: 'p3-c4',
    slug: 'chongqing-night-city-lights',
    title: 'Chongqing Night City: Why This Mountain Metropolis Glows After Dark',
    excerpt: 'Chongqing at night is one of the great urban spectacles in Asia — a city of 32 million built on steep hills above two rivers, with a light display that outdoes anything in mainland China.',
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'destination',
    tags: ['Chongqing', 'Night View', 'City Lights', 'Mountain City', 'Urban China'],
    heroImage: migratedUnsplash('photo-1556679343-c7306c1976bc'),
    publishedAt: '2026-05-28',
    readTime: '5 min read',
    content: `
There is a photograph that circulates regularly on Chinese social media: a monorail train passing through the sixth floor of a residential apartment block, with the passengers visible through the carriage windows and the residents visible through their apartment windows, separated by a few metres and a pane of glass. This is Chongqing. This is a real thing that happens, on Line 2 of the Chongqing Rail Transit, at Liziba Station.

Chongqing's peculiar topography — a mountainous peninsula at the confluence of the Yangtze and Jialing rivers — made conventional city-building impossible and produced instead a vertical, layered, physically strange city that looks like science fiction from the right angle. At night, illuminated from below and above, it looks like something more.

## The Best Night Views in Chongqing

**Nanshan One Tree Hill (南山一棵树观景台)** is the classic panorama: a viewpoint on the south bank of the Yangtze, facing north toward the central peninsula. The city spreads below you from left to right — the rivers, the bridges, the stacked lights of the residential towers climbing the hillsides, and the CBD towers in the centre. This is the view that goes viral on Chinese social media each Spring Festival when the fireworks go off. Come on a clear night, ideally after rain when the air has cleaned.

**Yangtze River Cableway** is the most dramatic way to cross the river: a cable car system that has connected the north and south banks since 1987, climbing 100 metres above the river surface. The view from the cabin — the river traffic below, the two banks receding in both directions — is disorienting in the best way. CNY 10 each way.

**Hongyadong at night** (mentioned in the Chongqing daytime guide) is even better illuminated after dark: the cliff-face stilt structure lit in layers of red and gold lanterns, reflected in the Jialing River below.

**Chaotianmen Square** at the tip of the peninsula, where the Yangtze and Jialing meet, is the emotional centrepiece of Chongqing's identity — the place where the two brown rivers join and where Chongqing's maritime culture has concentrated for millennia. At night, the cruise ships moored here for departure are lit from stem to stern, and the confluence is visible from the elevated walkway.

## The Monorail Experience

Take the Chongqing Rail Transit Line 2 specifically to experience the Liziba Station passage. Board at any station heading toward Xinshan Village, and sit in a window seat on the left side of the carriage as you approach Liziba. The train enters the apartment building at the 6th floor, travels through the interior, and exits the other side. The building was designed around the transit line. This is urban planning at its most creative (or desperate, depending on your perspective). The locals treat it with complete normalcy.

## The Food After Dark

Chongqing's night food culture centres on the riverside areas and the old alleyways of the Jiefangbei district (the CBD). Key experiences after dark:

**Night hot pot:** Chongqing hot pot is the original — more aggressively spiced than the Sichuan version, based on a tallow-heavy broth with dried chillies and Sichuan peppercorns. The outdoor hot pot restaurants along the river, with the city lights on the water and the long tables of diners, are where you understand what Chongqing actually is.

**Xiaomian (小面):** Chongqing's other great contribution to Chinese noodle culture — thin noodles in a broth with chilli oil, Sichuan pepper, preserved vegetables, peanuts, and spring onion. CNY 6–10 at street-level breakfast stalls. Outstanding.

## Practical Details for a Night Visit

- **Best months:** October–November (clear air, comfortable temperature) and March–April
- **Avoid:** Summer nights can be hot and humid; winter can be foggy
- **Transport:** Chongqing's metro system runs until 11pm and connects all major viewpoints
- **Dinner timing:** Eat hot pot from 7pm; the riverside restaurants are fullest (and most atmospheric) between 8–10pm

Chongqing is included in our longer western China itineraries combining Chengdu, Chongqing, and the Yangtze River cruise. [Contact us](/contact) to discuss building it into your journey.
    `
  },

  // ─────────────────────────────────────────────
  // C-5: Sichuan Hot Pot Tradition
  // ─────────────────────────────────────────────
  {
    id: 'p3-c5',
    slug: 'sichuan-hot-pot-tradition',
    title: "Sichuan Hot Pot: The History, Ritual, and Heat Behind China's Most Famous Dish",
    excerpt: "Sichuan hot pot is China's most social meal — a bubbling communal broth with a ritual that takes all evening. Here's the full guide: history, broth types, what to order, and how to eat without embarrassing yourself.",
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'culture',
    tags: ['Sichuan', 'Hot Pot', 'Chengdu Food', 'Chongqing Food', 'Chinese Cuisine'],
    heroImage: migratedUnsplash('photo-1544025162-d76694265947'),
    publishedAt: '2026-05-29',
    readTime: '6 min read',
    content: `
Hot pot is not a dish. It is an event. A Sichuan hot pot dinner in Chengdu or Chongqing typically occupies two to three hours, involves more food than you planned to eat, produces a quantity of soup-stained clothing, and ends with everyone at the table considerably happier than when they sat down.

## A Brief History of the Bubbling Pot

The practice of communal cooking in a central vessel of broth is documented in China from the Zhou Dynasty (1046–256 BC), making it one of the oldest surviving Chinese culinary traditions. The Sichuan hot pot as we know it today — with its characteristic mala broth of dried chillies, Sichuan peppercorns, and fermented broad bean paste — developed in Chongqing along the docks of the Yangtze River in the late Qing Dynasty.

Dock workers on the Chongqing waterfront cooked offal and cheap cuts of meat in a communal pot of spiced broth to make otherwise undesirable ingredients edible and warming through long river nights. The dish moved up the social scale through the Republican period, acquired more refined ingredients, and became the centrepiece of Sichuan dining culture. Today it is one of the most consumed dishes in China.

## The Broth: Where Everything Starts

Sichuan hot pot broth is either red (红汤, hóng tāng) or white/clear (清汤, qīng tāng), or divided in the famous "yin-yang" pot (鸛鸯锅) that provides both in separate halves.

**Red broth** is the authentic Sichuan version: a base of beef tallow (牛油, niúyóu) into which dried chillies, Sichuan peppercorns, doubanjiang (fermented broad bean paste), ginger, garlic, and various spices are fried and then simmered. The resulting broth is deep red, intensely fragrant, and aggressively spiced. This is what Chengdu and Chongqing restaurants have been serving for a century.

**Clear broth** is usually a light chicken or mushroom stock. Less dramatically flavoured, but allows the ingredients' natural tastes to come through. Recommended if you are sensitive to heat, or want to taste delicate items like fresh tofu and vegetables without the chilli masking them.

The yin-yang pot is the practical compromise for groups with mixed heat tolerances.

## What to Order

The raw ingredients are ordered from a menu and brought raw to the table, to be cooked at your personal pace in the communal broth. Ordering strategy:

**Meat:** Thinly sliced beef and lamb are the standards — they cook in 10–15 seconds and are best eaten immediately. Pork belly, duck intestine, and beef tripe are more adventurous but excellent with proper preparation. The intestine in particular is a Chongqing speciality: cleaned, scored, and blanched before service, it cooks to a satisfying crunch in the broth.

**Seafood:** Prawns (shell on, head on), fish balls (whether hand-made or extruded — the hand-made versions are noticeably better), and shellfish where available.

**Vegetables:** Lotus root is the classic hot pot vegetable — it absorbs the broth while retaining its crunch. Potato slices, winter melon, and leafy greens (spinach, chrysanthemum leaves) all work well. Mushrooms — oyster, enoki, king oyster — are the most flavoursome.

**Tofu and noodles:** Silken tofu comes apart in the broth and becomes infused with the mala flavour. Order it last, when the broth has concentrated. Hand-pulled noodles are added near the end of the meal to soak up the remaining broth.

**The dipping sauce:** This is where Sichuan hot pot diverges from Mongolian hot pot tradition. In Sichuan, each diner constructs their own dipping sauce at a condiment station: sesame paste is the base, then dried chilli flakes, garlic, spring onion, coriander, fermented tofu, oyster sauce, and sesame oil in proportions of your choosing. The sauce moderates the broth's heat and adds its own flavour layer.

## The Ritual of Eating

Cooking times matter. Sliced meat: 10–20 seconds. Intestine: 30 seconds. Lotus root: 1–2 minutes. Dense vegetables: 3–4 minutes. Tofu: 3 minutes. If you overcook the sliced meat, it becomes tough.

The correct sequence at a Sichuan hot pot: vegetables and tofu into the broth first (they can survive overcooking better), then meat, then seafood, then repeat as desired. The noodles come last when you are full but the broth is too good to waste.

**Do not add cold water to the pot.** This happens. It ruins the broth temperature and disrupts the cooking. If the broth reduces, ask for more stock (the restaurant will provide it free).

## Where to Eat It

In Chengdu: **Haidilao** (海底捞) is the internationally known chain — impeccable service, consistent quality, and the spectacle of noodle-pulling performance tableside. Worth experiencing once. For more local character, the independent hot pot restaurants in the Yulin district or around Tongzilin are where Chengdu residents actually eat.

In Chongqing: **Liu Yishou** (刘一手) is the most recognised local chain; independent restaurants along the riverside near Nanbin Road are more atmospheric.

Budget CNY 100–200 per person (NZD 23–47) for a thorough hot pot session including drinks.

Hot pot is on the final evening agenda of all our Chengdu and Chongqing tours. [Browse our Chengdu tours](/chengdu-tours) or [contact us](/contact) to build a Sichuan food itinerary.
    `
  }
];
