import type { BlogPost } from '@/lib/types/blog-post';
import { migratedUnsplash, tourImage } from '@/lib/site-media';

/**
 * Long-tail SEO batch 2 — 5 articles targeting Chongqing/Chengdu/visa searches
 * Keyword targets: chongqing night life, chongqing hot pot, leshan giant buddha day trip,
 *   china visa free nz 2026, chengdu things to do
 */
export const longtailBatch2Posts: BlogPost[] = [

  {
    id: 'lt-b2-1',
    slug: 'chongqing-nightlife-guide',
    title: 'Chongqing at Night: The Best Evening Experiences',
    excerpt: 'I\'m Baker Gu — Chongqing after dark is a different city. Here\'s how I plan evenings in the neon-lit mountain city: Hongyadong, the river cruise, hot pot, and the view from the hilltop.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist, CTS Tours NZ',
    category: 'destination',
    tags: ['Chongqing', 'Nightlife', 'China Travel', 'Chongqing Night', 'Fire & Fuzz'],
    heroImage: '/blog/chongqing-night-skyline-hongyadong.jpg',
    publishedAt: '2026-04-27',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, CTS's China travel specialist. I've been taking New Zealand travellers to Chongqing for years, and the single most common piece of feedback I get is this: "I didn't realise how good it would be at night." Chongqing after dark is genuinely one of the most visually dramatic experiences in China. Here's how I plan evenings in this city.

## Why Chongqing Night Life is Different

Chongqing is built on mountains above the confluence of the Yangtze and Jialing Rivers. At night, this geography turns into spectacle: the city lights cascade down hillsides at five different levels, bridges light up above dark water, and the cliffside architecture — which looks architectural-odd in daylight — becomes something close to cinematic after sunset.

The city also stays awake. Hot pot restaurants fill from 7pm onwards. The riverfront walkways buzz until midnight. Chongqing night life isn't a concentrated nightclub district — it's the whole city, outside, eating and walking and looking at the lights.

## Hongyadong After Dark

[Hongyadong](/hongyadong-chongqing) is the headline act. This 11-storey stilted complex, built into the cliff above the Jialing River, is lit at night with thousands of red and golden lanterns. The full glow is only visible from across the river — cross to the Qiansimen Bridge for the shot that every photographer in Chongqing is trying to get.

Inside, the complex runs across interconnected stairways with restaurants, tea houses, and bars at each level. I usually take groups here for dinner first — you eat inside the glow before stepping out to photograph it from the bridge. Don't arrive before 7:30pm; the lighting effect needs full dark.

## The Yangtze Night River Cruise

The night river cruise is the best way to see both rivers at once, and it's consistently one of the things clients remember most. You board near Chaotianmen — where the Yangtze and Jialing meet — and cruise downstream and back with the lit skyline on both sides. Most cruises run 1.5–2 hours. The bridges are the highlight: each one is individually lit, and passing under them from the water level is something you can't replicate from the road.

Book in advance during peak season. CTS handles this for all Fire & Fuzz departures.

## Hot Pot at Night

Chongqing morning hot pot is a thing, but the true hot pot ritual is an evening event. Groups gather around split pots (half original broth, half mild) from around 7pm onwards. The originals use beef tallow, dried chillies, and Sichuan peppercorn — face-numbingly spicy in the proper sense.

Order: thinly sliced beef, tripe, lotus root, tofu skin, and at least one order of Mao blood curd (maoxuewang). The last item sounds confronting and tastes exceptional.

The restaurant atmosphere at 8pm in Chongqing is unlike any meal experience I can offer elsewhere on a China itinerary. Loud, smoky, communal, genuinely fun.

## Liziba Station at Night

[Liziba Station](/liziba-station-chongqing) — the monorail that passes through the 6th–8th floors of a residential building — is arguably more atmospheric at night than during the day. The lit train windows appear in the building's floors like something from a science fiction film. The street-level plaza below is busy with people who've come to photograph it. Trains run every few minutes; watch several passes.

## The Hilltop View: Nanshan One Tree Hill

For a panoramic night view of the entire city, Nanshan One Tree Hill (南山一棵树观景台) is where I send photographers. The platform faces the full skyline across the Yangtze — you can see the entire vertically stacked city from a single vantage point. Take a taxi up; 20–30 minutes from city centre. Best from 8:30pm when the city is fully lit.

## Planning Evening Time in Chongqing

My **Fire & Fuzz** 10-day tour allocates 4 nights in Chongqing specifically to allow unhurried evenings. I build the hot pot dinner, the Hongyadong walk, and the night cruise on separate evenings so you're not rushing between all three. You also have a free evening for independent exploration — which in Chongqing always turns into something memorable.

[View the Fire & Fuzz tour →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-b2-2',
    slug: 'chongqing-hot-pot-guide',
    title: 'Chongqing Hot Pot: What It Is and Where to Eat',
    excerpt: 'I\'m Baker Gu — Chongqing hot pot is the original, and it\'s significantly different from what you\'ve eaten elsewhere. Here\'s what makes it different, what to order, and what to expect from the heat.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist, CTS Tours NZ',
    category: 'experience',
    tags: ['Chongqing', 'Hot Pot', 'Food', 'Sichuan Cuisine', 'China Travel'],
    heroImage: '/blog/sourced/chongqing-yuanyang-hotpot.jpg',
    heroImageCredit: 'Photo: Akira CA, CC0, via Wikimedia Commons',
    publishedAt: '2026-04-27',
    readTime: '8 min read',
    faqs: [
      {
        question: 'What is Chongqing hot pot?',
        answer: 'Chongqing hot pot is the original Sichuan-region hot pot: a rolling broth of beef tallow, dried chillies and Sichuan peppercorn, kept at the boil in the centre of the table while diners cook thin-sliced meats, offal and vegetables in it. The signature sensation is mala — heat from the chillies plus a tingling numbness from the peppercorns.'
      },
      {
        question: 'How spicy is Chongqing hot pot really?',
        answer: 'The full-strength local broth is genuinely intense — most first-time visitors find it stronger than anything served in NZ. But every restaurant lets you choose your level (mild, medium, extra) and nearly all offer a split yuanyang pot with a mild broth on one side, so mixed groups are easy. The sesame-oil dipping sauce also takes the edge off every bite.'
      },
      {
        question: 'What should I order at a Chongqing hot pot restaurant?',
        answer: 'Safe essentials: thin-sliced beef, lotus root, potato, tofu skin and mushrooms. Local classics worth trying: tripe (maodu), duck intestine, and duck-blood curd. Order the split pot, go hungry, and expect the meal to run two hours or more — it is an evening, not a stop.'
      },
      {
        question: 'How much does hot pot cost in Chongqing?',
        answer: 'A generous hot pot dinner in a good local restaurant typically runs 80 to 150 yuan per person — roughly NZD 20 to 40 — including drinks. Famous-name restaurants in tourist areas charge more; the quality difference is usually small.'
      },
      {
        question: 'Is hot pot suitable for vegetarians?',
        answer: 'Yes, with planning. Order a mushroom or tomato broth on one side of a split pot, and cook from the large vegetable menu — lotus root, tofu in several forms, mushrooms, greens, konjac. In dedicated hot pot restaurants the broths are usually made in bulk with meat stock, so strict vegetarians should say so clearly; your guide or hotel can write the request in Chinese.'
      },
    ],
    content: `
I'm **Baker Gu**, CTS's China travel specialist. I've been eating hot pot in Chongqing far longer than I've been running tours there, and the first thing I tell every New Zealand client before we sit down is this: Chongqing hot pot is not the hot pot you've had in Auckland. It is louder, hotter, more social and more fun — and if you learn five or six menu items before you go, it might be the single best evening of your China trip. Here's the full picture.

## Where Does Chongqing Hot Pot Come From?

The dish started on the docks. In the late Qing era, boatmen and porters along the Jialing and Yangtze rivers cooked cheap offcuts — tripe, duck intestine, blood curd — in fierce, numbing broths that covered the ingredients' origins and kept out the river-valley damp. What began as workers' food moved indoors, went upmarket, and became the city's defining dish. Chongqing today has tens of thousands of hot pot restaurants — more per head than any other Chinese city — and locals treat the original beef-tallow broth as a point of civic pride.

That history explains the menu: the classic items are still the dock-worker cuts, now eaten by choice rather than necessity.

## What Makes It Different From Other Hot Pot?

Every region of China has hot pot — [Beijing](/beijing-tours) has its lamb and copper pots, [Shanghai](/shanghai-tours) its milder styles, and [Chengdu](/chengdu-tours) its own butter-broth variant. Chongqing's version is defined by two things:

- **Beef tallow.** The broth base is rendered beef fat, not oil or stock. It carries flavour into everything you cook and gives the surface its glossy red sheen.
- **Mala.** Dried chillies bring the heat; Sichuan peppercorn (huajiao) brings a tingling, faintly citrus numbness on the lips and tongue. The combination — ma (numbing) plus la (hot) — is the whole point, and it is genuinely novel the first time.

You will also see the pot itself divided into a nine-square grid (jiugongge). The squares are not decorative: different zones of the pot hold different temperatures, so quick-cooking items go in the fast-boiling centre and slow items simmer at the edges.

## How Do I Order Without Reading Chinese?

Nearly every restaurant offers a **split pot** (yuanyang guo) — original broth on one side, mild tomato, mushroom or chicken broth on the other. Order it. Even chilli-proof groups benefit from tasting both.

You will be asked for a spice level: **wei la** (mild), **zhong la** (medium), **te la** (extra). For a first visit, medium on the spicy side of a split pot is the honest sweet spot.

Then tick boxes on the order sheet. My standing order for every group:

- **Thin-sliced beef** (feiniu) — 20 seconds in the pot, absorbs the broth beautifully
- **Tripe** (maodu) — the Chongqing essential; count to fifteen and pull it out
- **Lotus root** (lian'ou) — sweet, crunchy, the perfect counterweight
- **Tofu skin** (doupi) — soaks up more flavour than any other tofu form
- **Potato and mushrooms** — reliable crowd-pleasers for cautious eaters
- **Duck intestine** (yachang) — for the adventurous; seconds only, wonderfully crunchy

At the sauce station, build the standard dip: sesame oil base, crushed garlic, spring onion, coriander if you like it. The oil coats and cools each bite — it is not optional, it is the brake pedal.

## What Is the Evening Actually Like?

Hot pot is not a quick meal; it is the whole night's entertainment. You order everything at once, the broth comes to a rolling boil, and the table settles into a two-to-three-hour rhythm of cooking, talking, and reaching across one another. The room will be loud. Iced soy milk or a cold local beer are the traditional coolants. Go hungry, wear nothing precious — the broth spits — and expect to leave very full for roughly 80 to 150 yuan a head (about NZD 20 to 40).

Locals eat hot pot year-round, including in Chongqing's steaming summers, on the theory that sweating is part of the experience. Evening from 7pm is the proper sitting, when the restaurants fill and the city's energy arrives with them.

## Where Should I Eat It?

For a first visit, pick a busy restaurant in the Jiefangbei area or near [Hongyadong](/hongyadong-chongqing) — dinner then flows straight into the riverside lights and the best of [Chongqing after dark](/blog/chongqing-nightlife-guide). Skip anywhere with a tout outside and photos of celebrities in the window; follow the queues of locals instead.

If your route runs on to Chengdu, taste the two cities' styles side by side — the differences are real, and the argument over which is better has run for a century. Our guide to [Sichuan food culture in Chengdu](/blog/chengdu-spicy-cuisine-culture) covers the other half of the story.

## Eating Hot Pot on a CTS Tour

On our **Fire and Fuzz** itinerary (Chongqing and Chengdu, 10 days) I include a guided hot pot dinner early in the trip — ordering handled, dishes explained, spice levels negotiated — so that by your free evenings you can walk into any local restaurant and order with confidence. That first supervised dinner is the difference between eating hot pot and understanding it.

[View the Fire and Fuzz tour →](/tours/china/discovery/chongqing-chengdu) or browse all [Chongqing tours](/chongqing-tours).
    `
  },

  {
    id: 'lt-b2-3',
    slug: 'leshan-giant-buddha-day-trip',
    title: 'Leshan Giant Buddha Day Trip from Chengdu: Full Guide',
    excerpt: 'I\'m Baker Gu — the Leshan Giant Buddha is 71 metres of carved cliff face, built over 90 years, and it\'s one of the genuinely surprising experiences I include on Chengdu itineraries. Here\'s how I plan the day trip.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist, CTS Tours NZ',
    category: 'destination',
    tags: ['Leshan', 'Giant Buddha', 'Day Trip', 'Chengdu', 'UNESCO', 'China Tours'],
    heroImage: '/images/tours/leshan-buddha-statue.jpg',
    publishedAt: '2026-04-27',
    readTime: '6 min read',
    content: `
I'm **Baker Gu**, CTS's China travel specialist. The Leshan Giant Buddha is on a short list of things I've shown clients that reliably stop conversation when they first see it. A 71-metre stone Buddha carved into a cliff face at the confluence of three rivers — the largest stone Buddha in the world, built over 90 years in the 8th century, still sitting there. Here's how I plan this day trip for New Zealand travellers based in Chengdu.

## Why the Leshan Giant Buddha is Worth a Day Trip

Leshan is 120km from Chengdu — about 35 minutes by high-speed train, then a short transfer to the site. The round trip takes the better part of a day, which makes it a full day trip rather than a half-day excursion. It's worth every minute.

The Buddha (大佛, Dàfó) was commissioned by a Tang Dynasty monk named Haitong, who believed the statue would calm the turbulent waters at the river confluence and protect passing boats. Construction began in 713 AD and finished around 803 AD — four emperors' lifetimes. The engineering is remarkable: a drainage system built into the statue's hair, folds, and body still functions after 1,200 years, preventing the water erosion that has damaged most comparable stone carvings elsewhere in China.

UNESCO inscribed the site as a World Heritage Site in 1996.

## The Two Ways to See It

**From the cliff stairs (上山步道):** You descend a steep switchback staircase cut into the cliff face beside the Buddha, reaching foot level at the base. This is the most dramatic perspective — you're standing next to the Buddha's feet, each of which is large enough to seat 100 people. The descent is steep and the staircase is narrow during peak season; expect queues of 40–60 minutes at busy times. Worth it.

**From the boat:** River cruise boats pass directly in front of the Buddha at water level. This is the only angle from which you can see the entire figure at once — from crown to feet. Most visitors do both: the cliff stairs for the close-up experience, the boat for the full-figure photograph. I include the boat in all Fire & Fuzz itineraries that go to Leshan.

My recommendation: **do the stairs first** (morning, before heat and crowds build), then take the boat back downstream.

## What Else Is at the Leshan Site

The site extends well beyond the Buddha itself. The Wuyou Temple complex above the statue has been a functioning monastery for over 1,000 years; monk robes and incense smoke are visible from the pathways above the Buddha's head. The Lingbao Pagoda dates from the Song Dynasty. The river confluence below — where the Min, Dadu, and Qingyi Rivers meet — was the engineering reason the Buddha exists at all.

Allow a full day. Rushing through in three hours means you've seen the Buddha but not the place.

## Practical Notes

**Getting there:** High-speed rail from Chengdu East to Leshan (35 minutes), then taxi or shuttle to the scenic area (15 minutes). Total transfer time approximately one hour each way.

**Crowds:** Peak season (May Golden Week, October Golden Week, Chinese New Year) means queues of 1–2 hours for the stair descent. I plan Leshan on a weekday mid-tour when possible.

**Combined with Emei Mountain:** Mount Emei (峨眉山), a sacred Buddhist mountain and UNESCO site, is 30km from Leshan. A one-night extension allows both in a single excursion — a full day at Leshan, overnight in Emei town, next morning up the mountain. I build this into Signature itineraries when clients want depth in Sichuan.

**Season:** Spring (March–May) and autumn (September–November) are optimal. Summer is hot and humid but not impossible. Winter can bring mist that partially obscures the statue — atmospheric for photography, less satisfying for the first-time visit.

## On the Fire & Fuzz Tour

The **Fire & Fuzz** 10-day itinerary includes Leshan Giant Buddha as an optional enhancement on the Chengdu segment. The base tour allocates time in Chengdu for the Panda Base, People's Park, and cultural highlights; Leshan is a full-day add-on that I recommend for anyone with three or more nights in Chengdu.

The tour departs Auckland on 1 November 2026, from NZD $2,999 per person (twin share).

[View the full Fire & Fuzz itinerary →](/tours/china/discovery/chongqing-chengdu)
    `
  },

  {
    id: 'lt-b2-4',
    slug: 'china-visa-free-nz-2026',
    title: 'China Visa-Free for New Zealand 2026: 30 Days, No Application Needed',
    excerpt: 'NZ passport holders can enter China visa-free for 30 days per visit until 31 Dec 2026 — no application, no embassy queue. Here are the exact documents to carry at the border, who qualifies, and the traps that catch New Zealanders out. Written by Baker Gu, CTS Tours NZ.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist, CTS Tours NZ',
    category: 'travel-tips',
    tags: ['China Visa', 'Visa Free', 'New Zealand', 'China Travel', 'NZ Passport', '2026'],
    heroImage: '/images/great-wall-cts-2.jpg',
    publishedAt: '2026-04-27',
    readTime: '7 min read',
    faqs: [
      {
        question: 'Do New Zealand citizens need a visa for China?',
        answer: 'No. New Zealand ordinary (blue) passport holders can enter mainland China visa-free for up to 30 days per visit. The policy is published until 31 December 2026 and covers tourism, visiting family, transit, and short business visits.'
      },
      {
        question: 'How long can NZ passport holders stay in China visa-free?',
        answer: 'Up to 30 days per visit. There is currently no published limit on the number of visa-free entries — only on each individual stay. Standard CTS Tours China holiday packages of 10 to 15 days sit comfortably within the limit.'
      },
      {
        question: 'What documents do I need at the border as a New Zealander?',
        answer: 'Three things: (1) an NZ ordinary passport with at least 6 months\' validity remaining, (2) a return or onward ticket showing you leave within 30 days, (3) accommodation confirmation or a tour itinerary. CTS Tours provides the necessary documentation with every booking.'
      },
      {
        question: 'Does the visa-free policy apply to NZ permanent residents?',
        answer: 'The 30-day visa-free policy applies to New Zealand ordinary (blue) passport holders only. NZ permanent residents travelling on another country\'s passport must check the rules for that passport — many nationalities have their own visa-free arrangements, but not all.'
      },
      {
        question: 'Does Hong Kong count towards my 30 days in mainland China?',
        answer: 'No. Hong Kong and Macau are separate immigration zones with their own entry rules for NZ passports. Crossing from the mainland into Hong Kong ends your mainland stay; entering the mainland again starts a fresh 30-day count.'
      },
      {
        question: 'Is the China visa-free policy for NZ permanent?',
        answer: 'It is currently published until 31 December 2026. It has been extended repeatedly since 2024 and we treat it as functionally stable, but confirm the status before booking — policy changes can arrive with little notice. Our China visa guide is kept current.'
      },
    ],
    content: `
NZ passport holders can enter mainland China **visa-free for up to 30 days** per visit — no application, no embassy queue, no fee. The policy applies to ordinary (blue) New Zealand passports and is published until **31 December 2026**. At the border you need a return ticket, six months of passport validity, and accommodation confirmation. Every CTS Tours China package includes the documentation you need.

---

I'm **Baker Gu**, CTS's China travel specialist. The visa-free policy for New Zealand passport holders is the single most useful piece of China travel news I've shared with Kiwi clients in years — it removes the cost, the courier envelopes, and the two-week wait that used to sit between you and a China holiday. But it comes with conditions that a surprising number of people miss, and getting them wrong at the airport is not a position you want to be in. Here's the honest breakdown.

## What Does the Policy Actually Say?

New Zealand ordinary passport holders can enter mainland China visa-free for **up to 30 days per visit**, for tourism, family visits, exchange visits, transit, and short business trips. The policy is published until **31 December 2026** and has been extended repeatedly since it was introduced in 2024.

Two details worth knowing:

- **Multiple entries are fine.** There is currently no published cap on how many visa-free visits you can make — only on the length of each stay.
- **It applies to ordinary (blue) NZ passports.** Diplomatic and official passports have separate arrangements, and NZ permanent residents travelling on another passport must check that passport's rules.

## What Do I Show at the Border?

Visa-free does not mean question-free. Chinese immigration can ask for evidence on arrival, and the officers are entitled to refuse entry if you cannot show it. Carry these:

- **A return or onward ticket** proving you leave within 30 days. This is the most commonly missed item.
- **Accommodation evidence** — hotel confirmations, or a tour itinerary listing your hotels.
- **A passport with 6 or more months of validity** remaining on the day you enter.
- **Proof of purpose** if asked — a tour confirmation letter covers this; CTS issues one with every booking.

The arrival process itself is straightforward: fingerprints at a self-service kiosk, an arrival card (short form, English available), then the immigration counter. Allow 20 to 40 minutes at major airports.

## What Does Not Qualify?

- Working, journalism, or study — these still need the appropriate visa
- Stays longer than 30 days
- Travelling on a non-NZ passport, even as an NZ permanent resident
- Airline crew and some special categories with their own rules

If your plans might stretch past 30 days, talk to us before you fly — extending inside China is possible in some cases but is not something to improvise.

## How Does Hong Kong Fit In?

Hong Kong and Macau are separate immigration zones. NZ passport holders get their own visa-free arrangements there, and time spent in Hong Kong or Macau does not count against your 30 mainland days. Crossing out of the mainland ends that stay; re-entering starts a fresh 30-day count. Many of our longer itineraries use this naturally.

Separately, China runs a **240-hour visa-free transit** scheme for passengers connecting through to a third country. For NZ passport holders the 30-day policy is more generous, so the transit scheme rarely matters for Kiwis — but you may see it mentioned online; do not confuse the two.

## What Should NZ Travellers Do With This?

The practical effect: a China holiday now books like a Fiji or Bali holiday — passport, flights, go. Our 10-day October Discovery departures — [A Tale of Two Cities (Beijing and Xi'an)](/campaigns/october-2026/tale-of-two-cities) and [Shanghai and Surroundings](/campaigns/october-2026/shanghai-surroundings) — both sit well inside the 30-day window, as does every package on our [China tours page](/china-tours).

Before you book, two sensible checks:

- Read the current status on our [China Visa Guide for New Zealanders](/china-visa-guide-for-new-zealanders) — I keep it updated whenever the policy moves.
- Check the New Zealand government's [SafeTravel advisory for China](https://www.safetravel.govt.nz/destinations/asia/china) for general travel advice.

And if you are still deciding when to go, our guide to the [best time to visit China](/best-time-to-visit-china) covers the seasons month by month. The short version: April, May, September and October are the sweet spots — and with no visa to arrange, you can decide late.
    `
  },

  {
    id: 'lt-b2-5',
    slug: 'chengdu-things-to-do',
    title: 'Things to Do in Chengdu Beyond the Pandas',
    excerpt: 'I\'m Baker Gu — the panda base is worth your morning, but Chengdu has a full week of things that most visitors never reach. Here\'s what I include when I have three days in the city.',
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist, CTS Tours NZ',
    category: 'destination',
    tags: ['Chengdu', 'Things to Do', 'China Travel', 'Sichuan', 'Chengdu Guide'],
    heroImage: tourImage('chengdu-old-town.jpg'),
    publishedAt: '2026-04-27',
    readTime: '7 min read',
    content: `
I'm **Baker Gu**, CTS's China travel specialist. Every client who asks me about [Chengdu](/chengdu-tours) starts the same way: "Is it just the pandas?" I always give the same answer: the pandas are one morning. The city is several days. Here is what I include when I have three or more nights in Chengdu.

## Morning 1: The Panda Base (Non-Negotiable)

I won't pretend the [Chengdu Panda Sanctuary](/chengdu-panda-sanctuary) isn't the reason most visitors put Chengdu on their list. It is, and it deserves to be. The Giant Panda Breeding Research Base houses approximately 150 giant pandas — 70% of the world's captive population — in naturalistic habitats across 666 hectares of bamboo forest.

The rule I give everyone: **arrive at opening time, 7:30am**. Giant pandas are most active before 10am. By noon they're asleep and won't move again until late afternoon. The difference between an 8am visit and an 11am visit is the difference between watching pandas eat, climb, and wrestle bamboo, versus watching them sleep in the exact position you found them.

The red pandas — a separate species, more raccoon than bear — are in the same facility. Most visitors call them the surprise highlight.

## People's Park and the Teahouse Ritual

People's Park (人民公园, Rénmín Gōngyuán) is the single best place to understand why Chengdu is consistently ranked China's most liveable city. By 9am, the park's teahouse section is full — local residents, mostly retired, sitting in bamboo chairs with cups of jasmine tea that get refilled all day by circulating attendants.

There is no agenda here. People are playing mahjong, getting ear-cleaning (a traditional Chengdu service — a practitioner with a long thin tool, offered openly in the park), reading newspapers, and having slow conversations. It's genuinely relaxing to sit in. Take an hour.

The Heming Teahouse (鹤鸣茶社), inside the park, is the classic choice. Order a pot of jasmine and stay as long as you want. Cost is minimal.

## Wenshu Temple

Wenshu Temple (文殊院, Wénshū Yuàn) is a functioning Tang Dynasty Buddhist monastery with approximately 100 monks in residence. The complex is a sequence of courtyards, prayer halls, and gardens, culminating in a vegetarian restaurant that is among the best-value meals on the Chengdu itinerary.

Morning is best — prayer ceremonies fill the main halls before 9am, and the incense smoke is thickest then. The temple's vegetarian dim sum is available from 8:30am and is excellent: steamed buns, dumplings, and soup, all without meat, served in the courtyard.

## Kuanzhai Xiangzi (Wide and Narrow Alleys)

The Wide and Narrow Alleys (宽窄巷子, Kuānzhǎi Xiāngzi) are a restored Ming and Qing Dynasty neighbourhood: three parallel lanes of preserved courtyard architecture, now occupied by tea houses, craft shops, restaurants, and independent boutiques.

I know this kind of restored heritage street in China can feel artificial — and in some cities it does. Kuanzhai works better than most because the scale is right and the activity is genuine: local families use the lanes as a park, not just tourists. The evening atmosphere, when the lanterns are lit and the restaurants fill up, is worth lingering over.

## Sichuan Opera: Face-Changing Performance

The face-changing technique (变脸, biànliǎn) involves masks that switch in fractions of a second — the mechanics are a state-protected trade secret and you will not catch the mechanism even on video. I include an evening performance on all Chengdu itineraries, usually at Shufengyayun Sichuan Opera House.

The show includes fire-breathing, shadow puppetry, and clapper opera before the face-changing sequences. The face-changing is the finale and it genuinely gets a reaction every time. Children love it. Adults claim they're going to figure out how it works and never do.

## Leshan Giant Buddha (Day Trip)

The [Leshan Giant Buddha](/blog/leshan-giant-buddha-day-trip) is 120km from Chengdu — 35 minutes by high-speed rail. If you have three nights in Chengdu, one of them anchors a Leshan day trip. The Buddha is 71 metres tall, carved into a cliff face at a river confluence, built over 90 years in the 8th century. The stair descent to foot level is the most memorable physical experience of the Chengdu segment of any itinerary I build.

## Three Days in Chengdu: How I Structure It

- **Day 1 morning:** Panda Base (arrive 7:30am, depart by noon)
- **Day 1 afternoon/evening:** People's Park teahouse, Wenshu Temple, Kuanzhai Xiangzi evening
- **Day 2:** Leshan Giant Buddha full day trip
- **Day 3:** Sichuan Opera evening, free morning for Jinli Ancient Street or independent exploration

This is the structure I use for the Chengdu segment of the **Fire & Fuzz** tour, which arrives from Chongqing by bullet train and allocates 3 nights before the return flight from Chengdu. The contrast between Chongqing's dramatic mountain city energy and Chengdu's teahouse pace is itself one of the pleasures of the combination.

[View the full Fire & Fuzz tour →](/tours/china/discovery/chongqing-chengdu)
    `
  },

];
