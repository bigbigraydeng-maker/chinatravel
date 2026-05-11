import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash } from '@/lib/site-media';

/**
 * Phase 3 — Line A: Beijing & Xi'an Experience Blogs (5 posts)
 * Slugs: great-wall-trekking-guide, forbidden-city-insider-tips,
 *        terracotta-warriors-history, xian-street-food-adventure,
 *        beijing-hutong-culture
 */
export const phase3LineAPosts: BlogPost[] = [

  // ─────────────────────────────────────────────
  // A-1: Great Wall Trekking Guide
  // ─────────────────────────────────────────────
  {
    id: 'p3-a1',
    slug: 'great-wall-trekking-guide',
    title: 'Great Wall of China Trekking Guide for New Zealand Travellers',
    excerpt: 'Which section of the Great Wall should you visit? How steep is it really? Baker Gu breaks down the four main sections, best times, and how CTS tours make the experience unforgettable for NZ travellers.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ['Great Wall', 'Beijing', 'Hiking', 'China Tours', 'New Zealand'],
    heroImage: migratedUnsplash('photo-1508804185872-d7badad00f7d'),
    publishedAt: '2026-05-15',
    readTime: '7 min read',
    content: `
I'm **Baker Gu**, and the Great Wall question comes up in almost every inquiry I receive from New Zealand travellers. Which section? How long? Is it really that steep? What time should we go?

After guiding hundreds of clients from Auckland and Wellington along various stretches of the Wall, here is my honest, opinionated guide.

## Why the Great Wall Surprises Every First-Time Visitor

Photographs cannot prepare you for the Wall in person. The images always show it snaking into the distance — that part is accurate — but they don't convey the steepness, the narrowness of the path, or the strange feeling of standing on something built across 2,000 years by a civilisation that is still very much alive around you.

The Wall is also not one thing. It was built, rebuilt, extended, and allowed to crumble across many dynasties. What most visitors see near Beijing is the Ming Dynasty reconstruction (1368–1644) — well-maintained, with proper watchtowers, crenellated parapets, and the signature silhouette you recognise from postcards.

## Choosing Your Section: Four Options

**Mutianyu** is my recommendation for most first-time NZ visitors. It sits about 75km northeast of central Beijing, takes roughly 90 minutes to reach by road, and offers a restored section with functioning cable car and toboggan descent. The toboggan is genuinely exhilarating and saves your knees on the way down. Crowds are lighter than Badaling, the scenery is excellent, and the day feels complete without being exhausting.

**Badaling** is the most visited section in the world — which should tell you something about both its accessibility and its crowds. It is closest to Beijing, fully wheelchair-accessible in some areas, and has excellent museum facilities. If you are travelling with elderly relatives or young children, Badaling makes sense. If you want space to breathe, go elsewhere.

**Jinshanling to Simatai** is the trekking section I recommend for clients who specifically want to hike. This is a 10km ridge walk between two sections, unreconstructed in parts, and genuinely demanding. The views are extraordinary. The sense of remoteness — even though you are only two hours from one of the world's largest cities — is real. Bring proper footwear and allow a full day.

**Huanghuacheng (Lakeside Great Wall)** is the hidden option. This section sits partially submerged in a reservoir, creating a surreal landscape that no other section matches. Less visited, more atmospheric, and perfect for photography. The section requires a local permit, which we arrange for our Signature clients.

## What to Expect Physically

Even at Mutianyu, the Great Wall is not easy walking. The steps are irregular in height — some are 15cm, others 45cm — and the gradient on certain sections approaches 45 degrees. Wear proper footwear with ankle support. Avoid sandals, regardless of season.

At Jinshanling, allow 3–4 hours for the full trekking route. Take more water than you think you need. The Wall has no shade, and in summer the exposed sections are extremely hot.

In winter (December to February), the Wall is beautiful — clear skies, very few tourists, the possibility of snow — but the surfaces are icy and some cable car services are suspended. Our winter Wall experiences are some of the most memorable we offer, but they require appropriate preparation.

## Best Time to Visit

**October** is the golden month: autumn colours in the hills, temperatures of 10–20°C, and post-Golden Week crowds that have thinned back to manageable. This is when I personally prefer to take clients.

**April and May** are also excellent — spring light, fresh vegetation, comfortable hiking temperatures.

**Avoid July and August** if possible. The heat on an exposed ridge in full summer is brutal, and school holiday crowds make the popular sections unpleasant.

## How CTS Tours Plans Your Wall Day

On our Beijing itineraries, the Great Wall day is structured around you, not a fixed coach schedule. We typically leave your hotel by 7:30am to arrive before the day-trippers, allow 3–4 hours on the Wall itself, and work in a lunch stop at a restaurant near the base that serves proper Shandong-style food rather than tourist cafeteria fare.

For clients who want more, we can arrange overnight stays near the Wall — a few carefully selected guesthouses in the nearby villages offer the rare experience of seeing the Wall at dusk and dawn, empty and luminous, before the day visitors arrive.

## Practical Details

- **Cost at Mutianyu:** Cable car up + toboggan down + entrance = approximately CNY 160 (NZD 37 at current rates). Budget separately.
- **Getting there independently:** Public bus from Dongzhimen (Line H23) + local shuttle. Takes around 2 hours. Reliable, inexpensive.
- **Photography tip:** The best light is in the first two hours after sunrise and the hour before sunset. The midday light is flat and unflattering.
- **What to bring:** Sunscreen, a hat, at least 1.5 litres of water per person, snack bars, and a light jacket — even in summer, wind on the ridgeline can be cool.

Interested in adding the Great Wall to your China itinerary? [Browse our Beijing tours](/beijing-tours) or [contact us](/contact) and we'll build something around your timeline and fitness level.
    `
  },

  // ─────────────────────────────────────────────
  // A-2: Forbidden City Insider Tips
  // ─────────────────────────────────────────────
  {
    id: 'p3-a2',
    slug: 'forbidden-city-insider-tips',
    title: 'Forbidden City Insider Tips: What First-Time Visitors Need to Know',
    excerpt: 'The Palace Museum holds 980 buildings and 1.8 million artefacts. Baker Gu shares the insider route, the sections most visitors miss, and how to see it without the crowds crushing the experience.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Forbidden City', 'Beijing', 'Palace Museum', 'China Heritage', 'Travel Tips'],
    heroImage: migratedUnsplash('photo-1528360983277-13d401cdc186'),
    publishedAt: '2026-05-16',
    readTime: '6 min read',
    content: `
The Forbidden City — officially the Palace Museum — is one of the most visited sites on earth, and one of the easiest to do badly. Most visitors walk the central axis, take photos of the Hall of Supreme Harmony, and leave three hours later feeling vaguely overwhelmed without understanding what they saw.

I'm **Baker Gu**, and after hundreds of visits guiding clients from New Zealand and beyond, here is the approach that actually works.

## What You're Looking At

The complex covers 72 hectares and contains 980 surviving buildings. From 1420 to 1912, this was the centre of Chinese imperial power — the residence of 24 emperors across two dynasties, and a place that the general population was forbidden to enter on pain of death. The name is literal.

The buildings you see were largely rebuilt after fires during the Qing Dynasty, though the layout follows the original Ming design. The central axis — Meridian Gate → Hall of Supreme Harmony → Hall of Middle Harmony → Hall of Preserving Harmony → Imperial Garden — is the formal processional route. Most visitors walk it, photograph the main halls, and leave.

The side sections are where the real detail is.

## Book Your Tickets in Advance

The Forbidden City has a daily cap of 80,000 visitors (reduced from the pre-pandemic 100,000) and tickets must be booked online at least one day in advance. Walk-up tickets are not available. Foreign travellers can book through the official Palace Museum website with a passport number.

On our tours, we handle all bookings and pre-purchase timed entry for the sections that require separate reservations (the Ningshou Palace area, the Clock and Watch Exhibition).

## The Route Most Visitors Miss

The western section — the Six Western Palaces — is where the imperial concubines lived. It is quieter than the central axis, architecturally intact, and contains details that tell you more about life inside the Forbidden City than the grand processional halls ever can. The small courtyard gardens, the intimate scale of the living quarters, the exhibition of daily life objects — these sections humanise a place that can otherwise feel purely ceremonial.

The Treasure Gallery in the northeast corner holds the imperial collection of gold, jade, and ceremonial objects. The Clock and Watch Gallery (Fengxian Palace) is extraordinary — a room of European clocks brought to China by Jesuit missionaries in the 17th and 18th centuries, some of which still function and are demonstrated at specific times. Check the schedule when you arrive.

## Timing and Crowds

The Forbidden City opens at 8:30am. Arrive at 8:15. The first hour is manageable; by 10am, the central axis is densely crowded.

If your schedule allows, enter from the **Shenwu Gate (north)** after visiting the Imperial Garden. This reverses the standard route and puts you moving against the majority of the visitor flow, which is thinner.

Avoid weekends and Chinese public holidays entirely. The experience during Golden Week (October 1–7) is genuinely unpleasant regardless of when you arrive.

## What to Focus On

**The Hall of Supreme Harmony** is the largest wooden building in China and worth slowing down for. The golden throne inside is the actual Qing Dynasty throne. The roofline decorations — the animal figures descending from the ridge — number nine on this building, the imperial maximum.

**The Imperial Garden** at the north end of the complex is the antidote to the formal grandeur of the central axis. Ancient cypress trees, rockeries, pavilions, and a scale that encourages sitting rather than moving. Take time here.

**The Meridian Gate** on your way out — or in — is worth looking up at properly. The five arched gates correspond to rank: the emperor used the central gate, foreign dignitaries and the empress on her wedding day used the slightly smaller flanking gates, and officials used the outer gates.

## Practical Details

- **Opening hours:** 8:30am–5pm (last entry 4:30pm); closes Mondays except public holidays
- **Ticket price:** CNY 60 (NZD 14) standard; additional CNY 10 for Treasury, CNY 10 for Clocks
- **Time required:** Minimum 3 hours; I recommend 4 hours for a thorough visit
- **Audio guides:** Available in English at the entrance; the official Palace Museum app (free) is excellent
- **Wear comfortable shoes:** The total walking distance is approximately 5–6km if you explore properly

Combining the Forbidden City with Tiananmen Square on the same morning, then the hutongs in the afternoon, is how we structure most first Beijing days. [See our Beijing tours](/beijing-tours) for full itineraries.
    `
  },

  // ─────────────────────────────────────────────
  // A-3: Terracotta Warriors History
  // ─────────────────────────────────────────────
  {
    id: 'p3-a3',
    slug: 'terracotta-warriors-history',
    title: "Terracotta Warriors: History, Discovery, and What You'll Actually See",
    excerpt: "Discovered in 1974 by farmers digging a well, the Terracotta Warriors are still being excavated today. Here is the full story of China's most astonishing archaeological site, and how to visit it properly.",
    author: 'CTS Tours',
    authorRole: 'China Travel Specialists, Auckland NZ',
    category: 'culture',
    tags: ["Terracotta Warriors", "Xi'an", 'Ancient China', 'UNESCO', 'Archaeology'],
    heroImage: migratedUnsplash('photo-1545569341-9eb8b30979d9'),
    publishedAt: '2026-05-17',
    readTime: '7 min read',
    content: `
In March 1974, a group of farmers digging a well near Xi'an, Shaanxi Province, struck something unexpected at 1.5 metres depth: terracotta fragments, and then a bronze arrowhead, and then — as they dug wider — the upper torso of a life-size clay figure. They had accidentally broken into the largest archaeological discovery of the 20th century.

The Mausoleum of Qin Shi Huang and its surrounding burial complex have been under formal excavation since 1976. The dig is ongoing today.

## Who Was Qin Shi Huang?

Qin Shi Huang (259–210 BC) was the first person to unify what we now call China. Before him, the territory was divided into seven competing kingdoms in a period of constant warfare. After a military campaign that took 17 years, Qin conquered all of them by 221 BC, declared himself the first emperor, standardised writing, currency, and measurements across the empire, and then immediately began preparing for his death.

Construction of his tomb started when he was 13 years old — the year he became king of the state of Qin. By the time he died at 49, an estimated 700,000 workers had spent decades building the complex. The underground palace at the centre has never been opened.

The terracotta army was not discovered by archaeologists first. It was known, in fragmentary form, to local farmers for generations — pieces of clay figures would surface during ploughing. The systematic excavation only began after the 1974 discovery.

## The Three Pits

Three pit halls are open to visitors. A fourth pit was found empty, interpreted as a construction project interrupted by the emperor's death and the rebellion that followed.

**Pit 1** is the famous one: a cavernous hangar 230 metres long and 60 metres wide, containing approximately 6,000 infantry figures in 11 parallel corridors. From the observation platforms along the sides, the scale is difficult to process. The figures are life-size (average height 1.8 metres) and stand in formation, many still in the original positions they were placed in over 2,200 years ago.

**Pit 2** contains cavalry, chariots, and archers in kneeling position. This is where most of the restored individual figures are displayed at close range — you can study the facial expressions, the distinctive hairstyles, the detailed armour construction up close in a way that Pit 1's scale does not allow.

**Pit 3** is the smallest and is interpreted as the command structure — the high-ranking officers and command chariot that would have directed the military formation in the afterlife. Only 68 figures were found here.

## No Two Faces Are Alike

This is the detail that stays with visitors longest. Each of the estimated 8,000 terracotta figures has a distinct face. They were not mass-produced from moulds — the bodies were, for efficiency, but each head was individually sculpted and attached. Historians believe they may represent actual people: soldiers, officers, or individuals known to the craftsmen who made them.

## What Has Not Been Excavated

The central tomb mound — the large earthen hill visible from the car park — has not been opened. Ancient records describe rivers of mercury inside, representing the rivers of China, with a ceiling map of the heavens. Modern soil surveys have detected significantly elevated mercury levels around the mound, consistent with these descriptions. The Chinese government has made the decision not to excavate until preservation technology has advanced enough to protect what will be found.

## Visiting Practically

The site is 35km east of Xi'an city and takes about 45 minutes by road. Most tours include a stop at the nearby Huaqing Hot Springs (where the Tang Dynasty emperors brought their favoured consorts) on the same day.

Allow a minimum of two hours at the pits themselves; three is better. The complex is large, the indoor temperature in summer is high, and the Museum of Qin Shihuang Terracotta Warriors and Horses adjacent to the pit halls is worth 45 minutes of your time.

- **Opening hours:** 8:30am–5:30pm (summer); 8:30am–5pm (winter)
- **Ticket price:** CNY 120 (NZD 28) including all three pits and the museum
- **Photography:** Permitted in all pit halls; tripods are not allowed
- **Audio guide:** Essential — the context makes the experience

See this extraordinary site on our [Xi'an tours](/xian-tours) or as part of our [Beijing and Xi'an Discovery tour](/tours/china/discovery/beijing-xian).
    `
  },

  // ─────────────────────────────────────────────
  // A-4: Xi'an Street Food Adventure
  // ─────────────────────────────────────────────
  {
    id: 'p3-a4',
    slug: 'xian-street-food-adventure',
    title: "Xi'an Street Food Adventure: A Guide to the Muslim Quarter",
    excerpt: "Xi'an's Muslim Quarter is one of the great street food corridors in Asia — lamb skewers, roujiamo, persimmon cake, and pomegranate juice. Here is how to eat your way through it without the tourist traps.",
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ["Xi'an", 'Street Food', 'Muslim Quarter', 'Food Travel', 'Silk Road'],
    heroImage: migratedUnsplash('photo-1559827260-dc66d52bef19'),
    publishedAt: '2026-05-18',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, and the Muslim Quarter in Xi'an is one of the three or four food experiences I always tell New Zealand clients to clear an afternoon for. Not a lunch stop. An afternoon.

Xi'an was the eastern terminus of the Silk Road, and for over a millennium it was one of the most cosmopolitan cities on earth. Arab and Persian merchants who travelled the Silk Road settled here, intermarried with the local population, and established a community — the Hui people — whose culinary traditions are now 1,300 years deep. The Muslim Quarter (Huimin Jie) is the living result.

## What You're Walking Into

The Muslim Quarter is a working neighbourhood, not a reconstruction. The Great Mosque of Xi'an — one of China's largest and oldest Islamic sites, founded in 742 AD — sits at its centre. The streets leading to it are narrow, loud, fragrant, and densely packed with food stalls, restaurants, and vendors selling everything from lamb bones to persimmon vinegar.

The main artery is Beiyuanmen Street, about 500 metres long, but the real eating is in the side alleys where the vendors who've been doing this for generations have their permanent stalls.

## What to Eat

**Roujiamo** is the Xi'an dish I recommend starting with. It is sometimes described as the world's oldest hamburger: slow-braised pork (or lamb in halal versions) chopped and stuffed into a round, slightly crispy flatbread baked in a clay oven. The bread is baked fresh and the filling is warm. CNY 8–15 depending on size and filling.

**Lamb skewers (羊肉串, yángròuchuàn)** are everywhere, but the quality varies. Look for the stalls with charcoal grills and visible smoke — these are the ones where the lamb has been marinated properly and is cooked to order. Cumin, chilli, and salt are the seasonings. Two or three skewers per person before anything else.

**Yangrou paomo** is Xi'an's signature dish and the one that requires the most commitment. A bowl of rich, slow-cooked lamb broth arrives at your table with two large rounds of unleavened flatbread. You break the bread into pieces — the smaller the better, traditionally thumbnail-sized — and drop them into the broth, which is then returned to the kitchen and cooked briefly until the bread has absorbed the liquid and become tender. This takes preparation. Most restaurants hand you the bread and wait for you to break it before the bowl goes to the kitchen. It is excellent, deeply warming, and not appropriate if you are in a hurry.

**Persimmon cake (柿子饼, shìzi bǐng)** is a sweet Xi'an speciality: dried persimmon paste mixed with walnuts and other fillings, pressed flat and pan-fried. The stalls near the mosque entrance make them fresh. CNY 5 each.

**Fresh pomegranate juice** is pressed to order at stalls throughout the Quarter. Xi'an pomegranates are genuinely excellent in season (August to November). If you are visiting at other times, the juice is still good.

**Biangbiang noodles** are Xi'an's most famous noodle: hand-pulled, belt-wide, served with chilli oil, black vinegar, and toppings that vary by stall. The character for "biang" is famously complex — 58 strokes, not included in any standard font, usually hand-written on the restaurant signs. The noodles are excellent and substantial.

## Navigating Without Tourist Traps

The front-facing stalls on Beiyuanmen are often less authentic and more expensive than what you find 50 metres into the side alleys. A useful rule: if the sign is in English with photos of every dish, look for the next option. The stalls with handwritten signs in Chinese and a queue of local students are the ones worth finding.

We deliberately do not rush the Muslim Quarter on our Xi'an days. It is structured as a self-guided afternoon with a local-recommended starting point, then time to wander without a schedule.

## The Great Mosque

Before or after eating, take 30 minutes to walk through the Great Mosque. It is not a tourist attraction primarily — active prayers happen five times daily — but the grounds are open to non-Muslim visitors outside prayer times, and the architecture is extraordinary: a mosque built in Chinese architectural style, with pagoda-like minarets and tiled roofs that look distinctly Chinese until you notice the Arabic calligraphy and the qibla orientation.

Entry is CNY 25. Dress modestly. Women are asked to cover their hair at the entrance (scarves are provided).

## Practical Details

- **Location:** Beiyuanmen Street, inside the ancient city walls, about 10 minutes by taxi from the city centre
- **Best time:** Late afternoon (4–7pm) when the stalls are busiest and the food is freshest
- **Budget:** CNY 80–150 per person covers a thorough eating session
- **Language:** Most food stalls operate by pointing — the food is visible, prices are posted

See Xi'an on our [Beijing and Xi'an tour](/tours/china/discovery/beijing-xian) or as part of our [Signature journey](/tours/china/signature).
    `
  },

  // ─────────────────────────────────────────────
  // A-5: Beijing Hutong Culture
  // ─────────────────────────────────────────────
  {
    id: 'p3-a5',
    slug: 'beijing-hutong-culture',
    title: "Beijing Hutong Culture: A Deep Dive Into Old Peking's Hidden Laneways",
    excerpt: 'Beijing\'s hutongs are the ancient laneways where ordinary Beijingers lived for centuries. Baker Gu explains the history, the best areas to explore, and why the hutongs tell a more honest story about China than any imperial monument.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'culture',
    tags: ['Beijing', 'Hutong', 'Old Beijing', 'China Heritage', 'Culture'],
    heroImage: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-05-19',
    readTime: '6 min read',
    content: `
The Forbidden City and the Great Wall tell the story of Chinese imperial power — the emperors, the armies, the dynastic ambitions. The hutongs tell a different story: the one about everyone else.

I'm **Baker Gu**, and hutong visits are consistently among the most affecting experiences I plan for my New Zealand clients. Not because the alleyways are pretty, though some are. But because they are genuinely old, genuinely inhabited, and genuinely Beijing in a way that the tourist-facing attractions cannot replicate.

## What Is a Hutong?

The word hutong derives from the Mongolian word for "water well" — the community shared wells that the Yuan Dynasty settlers of the 13th century organised their settlements around. The Mongols built Beijing as their imperial capital (calling it Khanbaliq), and the grid of alleys surrounding the well areas became the template for residential Beijing.

By the Ming Dynasty (1368–1644), Beijing had an estimated 6,000 hutongs. By the Qing Dynasty (1644–1912), closer to 9,000. At their peak in the early 20th century, they housed almost the entire population of the city.

Today, after decades of urban redevelopment that demolished much of old Beijing, approximately 1,000 hutongs remain in various states of preservation.

## Why They Matter

Imperial China had an extraordinarily stratified social structure, and Beijing's layout reflected it precisely. The Forbidden City was at the centre. Around it, in rings, were the residences of the imperial family, then the nobilities and high officials, then merchants and tradespeople, then everyone else — all the way out to the city walls. The hutongs were where ordinary Beijingers lived their actual lives: raising children, running small businesses, practising trades, attending their neighbourhood temples.

The siheyuan — the courtyard house that is the basic unit of hutong architecture — tells you everything about traditional Chinese family structure. A central courtyard with rooms on four sides, each room assigned by status within the extended family: the patriarch and his wife in the northern room (highest status, best light), sons and their families in the eastern rooms, daughters in the western, and servants and storage in the southern section near the gate.

Walking through the hutongs, you still encounter siheyuan in various states of preservation. Some have been beautifully restored; others are still divided among multiple families in the improvised way that decades of communal living produced; others have been converted into guesthouses, restaurants, or boutique hotels.

## Where to Explore

**The Drum Tower area** (Gulou) is where most visitors start, and rightly so — the hutongs radiating out from Gulou Dongdajie and the adjacent lake areas (Houhai) are among the best preserved and contain interesting old residences, independent coffee shops, and the occasional converted courtyard restaurant.

**Nanluoguxiang** is the most touristed hutong — a single straight alley lined with boutique shops, cafes, and street food. Worth a look, but not representative. The real hutong experience is in the surrounding grid of smaller alleys that branch off it.

**Wudaoying Hutong** near Yonghegong (the Lama Temple) is less visited and more authentic — a mixture of residents going about their daily lives and a small selection of quality independent businesses that have moved in over the past decade.

**Baitasi area** in the west of the historic city is where a thoughtful urban regeneration project has been underway, restoring hutong courtyards while keeping residents in place. This is the model for how Beijing would ideally handle its remaining historic fabric.

## The Pedicab Controversy

Most tour operators offer hutong pedicab rides: a rickshaw driver takes you through the alleys in 45 minutes. I offer these on our tours, but I always tell clients what they are getting — a surface impression, moving. If you want to understand the hutongs, you need to walk them slowly, stop when something catches your attention, and ideally share a meal in one of the courtyard restaurants rather than just passing through.

## Hutong Etiquette

The hutongs are residential streets, not a theme park. People live here. When exploring:

- Keep noise down, especially early morning
- Do not photograph individuals without permission
- The open courtyard gates you can see through are private homes — peer respectfully but do not enter unless invited
- The public wells (mostly decorative now) and the public toilet buildings (which still exist) are part of the infrastructure of a functioning neighbourhood

## The Best Hutong Experience We Offer

On our Beijing days, we structure the hutong time as a combination: pedicab through the Drum Tower area to orient, then 90 minutes on foot through the surrounding alleys with a guide who has personal connections in the neighbourhood, followed by a lunch in a siheyuan courtyard restaurant where the food is home-style Beijing rather than tourist-adapted.

We finish with the lakes (Houhai or Qianhai, depending on season) where, in summer, residents bring their caged songbirds in the early morning and, in winter, skate on the frozen surface. Both are quintessentially Beijing and both are impossible to experience from a bus.

Explore Beijing authentically on our [Beijing tours](/beijing-tours) or our [Beijing and Xi'an Discovery itinerary](/tours/china/discovery/beijing-xian).
    `
  }
];
