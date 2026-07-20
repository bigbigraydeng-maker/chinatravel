'use client';

import { useState, useMemo } from 'react';

// Pre-defined avatar color pairs (full strings for Tailwind JIT)
const AVATAR_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-emerald-600 to-teal-400',
  'from-violet-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-red-600 to-rose-400',
  'from-indigo-600 to-blue-400',
  'from-green-600 to-emerald-400',
  'from-pink-600 to-rose-400',
  'from-cyan-600 to-sky-400',
];

interface Testimonial {
  id: number;
  name: string;
  location: string;
  tour: string;
  rating: number;
  title: string;
  text: string;
  avatarInitials: string;
  colorIndex: number;
  date: string;
  customizedBy: 'Baker' | 'Lisa';
  initialLikes: number;
  initialWants: number;
  spotlightTag?: string; // e.g. "Beijing & Xi'an", "Shanghai & Surroundings", "Chongqing & Chengdu"
}

// ── Spotlight reviews (pinned first) ─────────────────────────────────────────

const spotlightTestimonials: Testimonial[] = [
  // --- Beijing + Xi'an: China Discovery — A Tale of Two Cities ---
  {
    id: 101,
    name: 'Claire & Tom Mackenzie',
    location: 'Wellington',
    tour: "China Discovery — A Tale of Two Cities",
    rating: 5,
    title: "Beijing to Xi'an on the Bullet Train — The Perfect 10 Days",
    text: "The visa-free entry for Kiwis (it came in mid-2024) made booking so much easier than we ever expected — no embassy queues, no paperwork, just flights booked and off we went. Baker's itinerary was brilliantly paced: three days in Beijing (Forbidden City, hutong evening walk, Great Wall at Mutianyu at sunrise), then a bullet train to Xi'an for the Terracotta Warriors and the Muslim Quarter's lamb skewers. Two of the world's great historical capitals in ten days. Couldn't have asked for more.",
    avatarInitials: 'CM',
    colorIndex: 0,
    date: 'Jan 2025',
    customizedBy: 'Baker',
    initialLikes: 219,
    initialWants: 171,
    spotlightTag: "Beijing & Xi'an",
  },
  {
    id: 102,
    name: 'Michael & Bev Larsen',
    location: 'Dunedin',
    tour: "China Discovery — A Tale of Two Cities",
    rating: 5,
    title: "Great Wall at Dawn, Terracotta Warriors After Lunch — Incredible",
    text: "As Dunediners, we're no strangers to spectacular scenery — but nothing prepared us for standing on the Great Wall with mist rolling through the valleys below. Lisa matched that moment perfectly with our private guide at the Terracotta Warriors pit two days later. The scale is genuinely hard to believe until you're standing in front of it. The Xi'an Muslim Quarter lamb skewers and pomegranate juice were the perfect ending to a brilliant day. Ten days, two ancient capitals, zero complaints.",
    avatarInitials: 'ML',
    colorIndex: 5,
    date: 'Oct 2024',
    customizedBy: 'Lisa',
    initialLikes: 196,
    initialWants: 149,
    spotlightTag: "Beijing & Xi'an",
  },
  {
    id: 103,
    name: 'Fiona Hewitt',
    location: 'Auckland',
    tour: "China Discovery — A Tale of Two Cities",
    rating: 5,
    title: "Solo Kiwi Traveller — Visa-Free Entry Made This Finally Happen",
    text: "I'd been putting off China for years, mostly because of the visa process. Then visa-free access opened for NZ passport holders in mid-2024 and I had no more excuses. Baker sorted the rest: a great small group for the Beijing–Xi'an itinerary, a private morning at the Wall before the tour buses arrived, and a Xi'an family dinner that turned into a two-hour dumpling lesson. I've been talking about this trip non-stop since I got home. The no-visa thing genuinely is a game-changer for Kiwis.",
    avatarInitials: 'FH',
    colorIndex: 3,
    date: 'Mar 2025',
    customizedBy: 'Baker',
    initialLikes: 183,
    initialWants: 138,
    spotlightTag: "Beijing & Xi'an",
  },

  // --- Shanghai & Surroundings ---
  {
    id: 201,
    name: 'Simon & Kate Brennan',
    location: 'Christchurch',
    tour: 'China Discovery — Shanghai & Surroundings',
    rating: 5,
    title: 'Shanghai, Suzhou, Hangzhou — Three Cities, One Perfect Trip',
    text: "We've done a fair bit of Asia, but Shanghai & Surroundings completely redefined our benchmark for a well-designed tour. The contrast between the futuristic Bund skyline and the classical gardens of Suzhou made us feel like we'd moved through 1,000 years of history in two days. Lisa arranged a private silk-making demonstration in Suzhou that our daughter (14) still talks about. And Hangzhou's West Lake at dusk — we sat on a pavilion and watched the sun drop behind the mountains. One of the most beautiful evenings of our lives.",
    avatarInitials: 'SB',
    colorIndex: 1,
    date: 'Dec 2024',
    customizedBy: 'Lisa',
    initialLikes: 204,
    initialWants: 159,
    spotlightTag: 'Shanghai & Surroundings',
  },
  {
    id: 202,
    name: 'Graham & Shirley Voss',
    location: 'Hamilton',
    tour: 'China Discovery — Shanghai & Surroundings',
    rating: 5,
    title: 'The Bund at Night Is Worth the Long-Haul Flight Alone',
    text: "We knew the Shanghai skyline would be impressive. We didn't expect it to stop us mid-sentence. Baker timed our Bund walk perfectly — the lights came up as we arrived and the entire Pudong skyline reflected in the Huangpu River. Suzhou's Humble Administrator's Garden the next morning was a completely different kind of beauty: quiet, intricate, centuries old. NZ travellers can now enter China visa-free (from mid-2024), which made the whole booking process incredibly smooth. Worth every cent.",
    avatarInitials: 'GV',
    colorIndex: 6,
    date: 'Aug 2024',
    customizedBy: 'Baker',
    initialLikes: 178,
    initialWants: 132,
    spotlightTag: 'Shanghai & Surroundings',
  },
  {
    id: 203,
    name: 'Rachel Donohue',
    location: 'Tauranga',
    tour: 'China Discovery — Shanghai & Surroundings',
    rating: 5,
    title: 'Suzhou and Hangzhou Are Hidden Gems — Don\'t Sleep on This Tour',
    text: "Everyone talks about Beijing and Xi'an, but honestly? Suzhou and Hangzhou stole the show for me. The canal streets of Suzhou after dark, the silk market, the traditional garden tea ceremony — it felt like stepping into a classical Chinese painting. Then Hangzhou's West Lake and the Longjing tea plantations up in the hills. Lisa had everything seamlessly organised. As a solo Tauranga traveller, I felt looked after every single day. Coming back for the Tale of Two Cities next time.",
    avatarInitials: 'RD',
    colorIndex: 9,
    date: 'Feb 2025',
    customizedBy: 'Lisa',
    initialLikes: 167,
    initialWants: 124,
    spotlightTag: 'Shanghai & Surroundings',
  },

  // --- Fire & Fuzz: Chongqing × Chengdu ---
  {
    id: 301,
    name: 'Josh & Amy Tanner',
    location: 'Auckland',
    tour: 'Fire & Fuzz — Chongqing × Chengdu',
    rating: 5,
    title: "Chongqing's Neon Skyline + Chengdu's Pandas — Absolutely Wicked",
    text: "We nearly booked Beijing instead. So glad we didn't. Chongqing is like nothing else on earth — a neon-lit mountain city where the monorail literally passes through a skyscraper (the Liziba station is completely insane), the ancient Hongyadong stilt houses glow over the river at night, and the hotpot is so fiery you'll question your life choices in the best possible way. Then Chengdu arrived like a deep breath: morning pandas, afternoon teahouse, Sichuan opera with face-changing. Baker knew exactly how these two cities complement each other. Do not sleep on this one.",
    avatarInitials: 'JT',
    colorIndex: 4,
    date: 'Jan 2025',
    customizedBy: 'Baker',
    initialLikes: 225,
    initialWants: 178,
    spotlightTag: 'Chongqing & Chengdu',
  },
  {
    id: 302,
    name: 'Mel & Chris Orton',
    location: 'Wellington',
    tour: 'Fire & Fuzz — Chongqing × Chengdu',
    rating: 5,
    title: 'The Liziba Monorail Through a Skyscraper Is Real — And We Rode It',
    text: "I sent a video of the Liziba station to my mates back in Wellington and none of them believed it was real. The Line 2 train literally passes through the middle of a residential block — completely extraordinary and totally normal to locals. Chongqing itself is a vertical city built on clifftops above the Yangtze; watching the fog roll in over Hongyadong from the riverbank at night is something I'll never forget. Chengdu was the perfect counterweight: quieter, greener, with the giant pandas as the absolute highlight of our kids' lives.",
    avatarInitials: 'MO',
    colorIndex: 7,
    date: 'Nov 2024',
    customizedBy: 'Lisa',
    initialLikes: 198,
    initialWants: 152,
    spotlightTag: 'Chongqing & Chengdu',
  },
  {
    id: 303,
    name: 'Bec Connelly',
    location: 'Queenstown',
    tour: 'Fire & Fuzz — Chongqing × Chengdu',
    rating: 5,
    title: 'Hotpot, Pandas, and a City Built on Cliffs — This Route Is Fire',
    text: "Baker recommended Chongqing & Chengdu when I called asking about Beijing, and honestly — thank you. Chongqing was a revelation: the city climbs up the hillside in layers, the food is extraordinary (Sichuan hotpot will make your eyes water in the best way), and the Dazu Rock Carvings were a genuine surprise that most tourists miss. Baker had everything dialled in: small group, guides who actually live in these cities, and perfect balance of guided time and free evenings. Chengdu pandas on the final morning sealed the deal. Absolutely coming back.",
    avatarInitials: 'BC',
    colorIndex: 2,
    date: 'Mar 2025',
    customizedBy: 'Baker',
    initialLikes: 187,
    initialWants: 144,
    spotlightTag: 'Chongqing & Chengdu',
  },
];

// ── General reviews ───────────────────────────────────────────────────────────

const generalTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Margaret & John Patterson',
    location: 'Auckland',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    title: 'Once-in-a-Lifetime — And We\'d Do It All Again Tomorrow',
    text: 'We\'ve clocked up plenty of air miles, but this China Signature tour was genuinely in a class of its own. Baker arranged a private tai chi session on the Great Wall at sunrise — just the two of us, no crowds. As Aucklanders, we\'re used to queuing for everything; that one moment of pure silence on the Wall had us both tearing up. The boutique hotels were stunning, the guides passionate, and every day felt curated rather than scripted. If you\'re on the fence about China, trust me — just book it.',
    avatarInitials: 'MP',
    colorIndex: 0,
    date: 'Feb 2023',
    customizedBy: 'Baker',
    initialLikes: 214,
    initialWants: 167,
  },
  {
    id: 2,
    name: 'Sarah & Tom Williams',
    location: 'Christchurch',
    tour: 'China Signature Grand Tour',
    rating: 5,
    title: 'Sorted From Start to Finish — Couldn\'t Have Asked for More',
    text: 'We were quite nervous going to China for the first time, but Lisa had everything sorted before we\'d even packed our bags. The itinerary was perfectly paced — enough to see the iconic highlights without feeling herded. The hotels were beautiful, local guides spoke brilliant English, and the included meals were genuinely delicious, not just tourist-friendly. Back in Christchurch now and already missing the dumplings.',
    avatarInitials: 'SW',
    colorIndex: 1,
    date: 'Oct 2022',
    customizedBy: 'Lisa',
    initialLikes: 189,
    initialWants: 142,
  },
  {
    id: 3,
    name: 'Paul & Linda Foster',
    location: 'Dunedin',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    title: 'Our Golden Anniversary — Made Absolutely Unforgettable',
    text: 'We wanted our 50th to be something extraordinary, and Baker exceeded every expectation. A surprise intimate dinner in a lantern-lit Beijing courtyard, a private calligraphy lesson in a hutong, and thoughtful upgrades throughout. Coming from Dunedin, we joked we\'d miss the cold — but the warmth of the Chinese people and the CTS team more than compensated. If you\'re celebrating something special, trust CTS to make it magnificent.',
    avatarInitials: 'PF',
    colorIndex: 2,
    date: 'Apr 2024',
    customizedBy: 'Baker',
    initialLikes: 231,
    initialWants: 156,
  },
  {
    id: 4,
    name: 'Andrew Sinclair',
    location: 'Napier',
    tour: 'China Signature Grand Tour',
    rating: 5,
    title: 'This Is How China Should Be Experienced — No Other Way',
    text: 'The Signature Grand Tour showed me a China I didn\'t know existed. Staying in a restored courtyard hotel rather than a chain, having dinner at a local family\'s home in Xi\'an — these aren\'t things you find in a standard package. As a solo Napier traveller, I\'d been worried about fitting in with couples and families, but the group dynamic was brilliant from day one. The guides were knowledgeable, passionate, and often genuinely funny.',
    avatarInitials: 'AS',
    colorIndex: 3,
    date: 'Jun 2023',
    customizedBy: 'Baker',
    initialLikes: 176,
    initialWants: 128,
  },
  {
    id: 5,
    name: 'Helen & Bruce Donaldson',
    location: 'Nelson',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    title: 'A Buddhist Monastery Morning That Changed How We See Travel',
    text: 'Baker arranged access to a small Buddhist monastery that doesn\'t appear in any guidebook. That one morning — the incense, the chanting, the monks sharing tea — changed how we approach every trip since. We\'re a retired couple from Nelson who thought we\'d seen enough of the world; China proved us absolutely wrong. This is what Signature travel means: experiences that money alone can\'t buy.',
    avatarInitials: 'HD',
    colorIndex: 4,
    date: 'Mar 2022',
    customizedBy: 'Baker',
    initialLikes: 208,
    initialWants: 173,
  },
  {
    id: 6,
    name: 'David Chen',
    location: 'Wellington',
    tour: 'China Discovery Highlights',
    rating: 5,
    title: 'Reconnecting With My Heritage — Deeply Moving',
    text: 'As a second-generation Chinese Kiwi born and raised in Wellington, I wanted to reconnect with my roots. I\'d visited China before with family, but never like this. Lisa understood exactly what I was after — the neighbourhood tea houses, local markets, conversations with ordinary people. This trip gave me something I didn\'t know I was missing. Genuinely emotional moments throughout. Highly recommend for any NZ Chinese looking to come home.',
    avatarInitials: 'DC',
    colorIndex: 5,
    date: 'Sep 2023',
    customizedBy: 'Lisa',
    initialLikes: 193,
    initialWants: 144,
  },
  {
    id: 7,
    name: 'Jennifer O\'Brien',
    location: 'Tauranga',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    title: 'The Hutong Cooking Class Was the Best Afternoon of My Life',
    text: 'I\'m a foodie at heart, and Lisa clearly remembered that from our consultation call. The cooking class in a Beijing hutong courtyard was outstanding — we made dumplings from scratch with a family who\'d been doing it the same way for three generations. The kids in the family taught me to fold the dough; I was terrible at it and everyone laughed, including me. Best afternoon I\'ve had in years. The Li River cruise wasn\'t bad either!',
    avatarInitials: 'JO',
    colorIndex: 6,
    date: 'Jan 2024',
    customizedBy: 'Lisa',
    initialLikes: 167,
    initialWants: 119,
  },
  {
    id: 8,
    name: 'Greg & Michelle Hart',
    location: 'Rotorua',
    tour: 'China Discovery Highlights',
    rating: 5,
    title: 'Brilliant Value, Incredible Guides — Sweet As!',
    text: 'We looked at a few operators before choosing CTS, and the value here is genuinely unbeatable. The Great Wall, the Terracotta Warriors, Shanghai\'s Bund — all the iconic sites, but with guides who made every one come alive with stories and context. Baker even suggested we swap a shopping stop for a local market visit instead — that kind of insider flexibility is gold. Back in Rotorua recommending CTS to everyone we meet.',
    avatarInitials: 'GH',
    colorIndex: 7,
    date: 'Nov 2022',
    customizedBy: 'Baker',
    initialLikes: 154,
    initialWants: 112,
  },
  {
    id: 9,
    name: 'Angela Morrison',
    location: 'Palmerston North',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    title: 'Solo Travel Made Completely Effortless — Already Booked My Next Trip',
    text: 'I travel solo and I\'ve had mixed experiences with group tours before. This was different. Lisa matched me with a group that had a brilliant mix of ages and backgrounds — a couple of Aucklanders, a family from Wellington, retirees from Nelson. We were laughing together by day two. The pace was perfect for doing your own thing in the evenings while keeping logistics completely sorted. I\'m already on the waitlist for the Yunnan Discovery next April.',
    avatarInitials: 'AM',
    colorIndex: 8,
    date: 'May 2023',
    customizedBy: 'Lisa',
    initialLikes: 182,
    initialWants: 139,
  },
  {
    id: 10,
    name: 'Trevor & Jan Bowen',
    location: 'Invercargill',
    tour: 'China Discovery Highlights',
    rating: 5,
    title: 'Perfect Pace — Not Once Did We Feel Rushed or Left Behind',
    text: 'At our age we worried the pace might be too hectic. Jan has a dodgy knee and we mentioned it upfront — Baker arranged accessible room allocations throughout and the local guides always walked at our pace without making a fuss. The Li River cruise was breathtaking. Coming from Invercargill, we\'re not easily impressed by scenery, but Guilin\'s karst peaks genuinely stopped us in our tracks. We\'d go again in a heartbeat.',
    avatarInitials: 'TB',
    colorIndex: 9,
    date: 'Aug 2024',
    customizedBy: 'Baker',
    initialLikes: 139,
    initialWants: 97,
  },
  {
    id: 11,
    name: 'Priya Nair',
    location: 'Auckland',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    title: 'China Was Nothing Like I Expected — Utterly Brilliant',
    text: 'Coming from an Indian family in Auckland, I assumed Asian travel would feel somewhat familiar. China completely blew that assumption out of the water — it\'s in a category entirely its own. Lisa sorted the visa paperwork, transfers, hotels, everything. I just had to show up and enjoy. The Sichuan hotpot night in Chengdu was extraordinary — I went back for seconds, then thirds, then needed help standing up. Zero regrets whatsoever.',
    avatarInitials: 'PN',
    colorIndex: 0,
    date: 'Dec 2022',
    customizedBy: 'Lisa',
    initialLikes: 161,
    initialWants: 118,
  },
  {
    id: 12,
    name: 'Karen Blackwell',
    location: 'Queenstown',
    tour: 'China Stopover Shanghai',
    rating: 5,
    title: 'Three Days in Shanghai — Three Days of Pure Magic',
    text: 'I had a three-day stopover in Shanghai and almost didn\'t bother with a tour — just planned to wander. Thank goodness I called CTS. Baker organised a private driver, the Bund at night (extraordinary), a garden tour in Suzhou, and the best xiaolongbao I\'ve ever had from a hole-in-the-wall only locals know about. Shanghai is wild and beautiful and nothing like the China I imagined. Now I\'m planning a full 14-day Discovery tour. Baker\'s fault entirely.',
    avatarInitials: 'KB',
    colorIndex: 1,
    date: 'Mar 2025',
    customizedBy: 'Baker',
    initialLikes: 201,
    initialWants: 158,
  },
  {
    id: 13,
    name: 'Tony & Rachel Green',
    location: 'Hamilton',
    tour: 'China Stopover Beijing',
    rating: 5,
    title: 'Turned a Layover Into the Best Day We\'ve Had Travelling',
    text: 'We had an annoying 36-hour layover in Beijing and were dreading it. Baker organised a hotel pickup at 5am, sunrise at the Mutianyu section of the Great Wall (practically empty at that hour), a Beijing duck lunch, then back to the airport with time to spare. We landed in Hamilton having seen the Great Wall of China. Our mates thought we were pulling their leg. Absolutely wicked experience — highly recommend for any NZ traveller with a Beijing connection.',
    avatarInitials: 'TG',
    colorIndex: 2,
    date: 'Jul 2023',
    customizedBy: 'Baker',
    initialLikes: 145,
    initialWants: 103,
  },
  {
    id: 14,
    name: 'Robert & Anne Murray',
    location: 'Hamilton',
    tour: 'Tailor Made Silk Road',
    rating: 5,
    title: 'The Silk Road — A Three-Week Journey That Belongs in a Film',
    text: 'Baker designed a three-week Silk Road itinerary for us and it felt like travelling through a living history book. The Mogao Caves at Dunhuang, camping in the Gobi desert under more stars than I knew existed, the ancient Sunday market in Kashgar — every single day brought something remarkable. We\'ve been travelling for 30 years and this was the best trip we\'ve ever taken. No hesitation whatsoever in recommending CTS for any ambitious itinerary.',
    avatarInitials: 'RM',
    colorIndex: 3,
    date: 'Feb 2022',
    customizedBy: 'Baker',
    initialLikes: 223,
    initialWants: 168,
  },
  {
    id: 15,
    name: 'The Wilson Family',
    location: 'Auckland',
    tour: 'Tailor Made Family Adventure',
    rating: 5,
    title: 'Kids Are Still Talking About the Pandas — Four Months Later',
    text: 'Our two kids (9 and 13) were difficult to impress before this trip. Lisa designed a family itinerary that kept both engaged — bamboo rafting in Guilin, giant pandas in Chengdu, the kid-friendly sections of the Great Wall. Our teenager, who\'d sulked about "having to go to China" for weeks, was the one asking to extend the trip at the end. Our 9-year-old has decided she wants to be a panda keeper. Best family holiday we\'ve ever taken.',
    avatarInitials: 'WF',
    colorIndex: 4,
    date: 'Apr 2023',
    customizedBy: 'Lisa',
    initialLikes: 198,
    initialWants: 152,
  },
  {
    id: 16,
    name: 'James & Mia Cooper',
    location: 'Wellington',
    tour: 'Tailor Made Photography Tour',
    rating: 5,
    title: 'Every Shot Looked Like a National Geographic Cover',
    text: 'We\'re serious amateur photographers and Baker clearly understood the brief. Every location was chosen with the light in mind: sunrise at Zhangjiajie\'s Avatar Mountains (otherworldly), golden hour from the Bund, misty dawn on the Li River. Baker even arranged private pre-opening access to a section of the Forbidden City — just us and the palace cats. We came home with over 3,000 keepers. Worth every cent of the Signature upgrade.',
    avatarInitials: 'JC',
    colorIndex: 5,
    date: 'Oct 2024',
    customizedBy: 'Baker',
    initialLikes: 187,
    initialWants: 143,
  },
  {
    id: 17,
    name: 'Liz & Peter Armstrong',
    location: 'Christchurch',
    tour: 'Tailor Made Yunnan Explorer',
    rating: 5,
    title: 'Off the Beaten Track — Baker Showed Us a China Nobody Else Sees',
    text: 'We specifically told Baker we didn\'t want the usual tourist checklist. He delivered: Tiger Leaping Gorge, Shangri-La in the early morning fog, the tea plantations of Pu\'er, Lijiang\'s backstreets at dawn. Two weeks in Yunnan and barely another Western tourist in sight. For two Cantabrians who thought they\'d seen enough beautiful landscapes in the South Island, Yunnan genuinely humbled us. Sweet as trip from start to finish.',
    avatarInitials: 'LA',
    colorIndex: 6,
    date: 'Jun 2022',
    customizedBy: 'Baker',
    initialLikes: 163,
    initialWants: 121,
  },
  {
    id: 18,
    name: 'Donna Stewart',
    location: 'Napier',
    tour: 'Tailor Made Culture & Cuisine',
    rating: 5,
    title: 'A Foodie\'s Dream Trip — I Gained 3kg and Have Zero Regrets',
    text: 'I told Lisa upfront: food is my primary travel motivation. She took that seriously. Private cooking classes in Beijing, a dawn tour of a Shanghai wet market, a tea ceremony with a 90-year-old master in Hangzhou, and restaurant recommendations it would have taken me months to find myself. Every city revealed a completely different cuisine. I\'ve been trying to recreate the Hangzhou red-braised pork belly at home ever since. Lisa knows the best tables in every city.',
    avatarInitials: 'DS',
    colorIndex: 7,
    date: 'Sep 2024',
    customizedBy: 'Lisa',
    initialLikes: 178,
    initialWants: 136,
  },
  {
    id: 19,
    name: 'Steve & Carole Bennett',
    location: 'Whangarei',
    tour: 'China Signature Grand Tour',
    rating: 5,
    title: 'Our Third Trip With CTS — They Just Keep Getting Better',
    text: 'We\'ve now done the China Signature, Japan Discovery, and Vietnam Grand Tour — all with CTS. Each one has been better than the last. What keeps us coming back isn\'t just the quality; it\'s that Baker remembers us. He knows our preferred pace, our dietary requirements, that Carole gets cold easily and I always want more museum time. We feel like VIPs on every trip, not just customers. Booking our fourth trip — Yunnan — as we speak.',
    avatarInitials: 'SB',
    colorIndex: 8,
    date: 'Feb 2025',
    customizedBy: 'Baker',
    initialLikes: 237,
    initialWants: 181,
  },
  {
    id: 20,
    name: 'Ruth Chapman',
    location: 'New Plymouth',
    tour: 'China Discovery Highlights',
    rating: 5,
    title: '72 Years Young and Loving Every Single Minute of China',
    text: 'I\'ll be honest: at 72, I wasn\'t sure I could manage a trip like this. My daughter nearly talked me out of it. I\'m so glad I didn\'t listen to her. Lisa was extraordinary — accessible rooms throughout, local guides briefed about my pace, and she personally checked in with me several times during the trip. Not once did I feel like a burden. The Terracotta Warriors made me cry. I cried a lot on this trip, actually. Absolute magic from start to finish.',
    avatarInitials: 'RC',
    colorIndex: 9,
    date: 'Nov 2023',
    customizedBy: 'Lisa',
    initialLikes: 147,
    initialWants: 109,
  },
  {
    id: 21,
    name: 'Daniel & Sophie Wright',
    location: 'Queenstown',
    tour: 'Tailor Made Honeymoon',
    rating: 5,
    title: 'Our Honeymoon in China — Dreamy, Romantic, Absolutely Flawless',
    text: 'Baker designed our China honeymoon and it was nothing short of extraordinary. A private sunset dinner on the Bund with champagne waiting when we arrived, a hot air balloon at dawn over the Yangshuo countryside, a couples\' spa in a Guilin mountain resort. We\'d considered Bali or the Maldives — but China with Baker was something no beach resort could have delivered. Already talking about the Silk Road for our 5th anniversary.',
    avatarInitials: 'DW',
    colorIndex: 0,
    date: 'Sep 2022',
    customizedBy: 'Baker',
    initialLikes: 206,
    initialWants: 162,
  },
  {
    id: 22,
    name: 'Emily & Chris Taylor',
    location: 'Wellington',
    tour: 'Japan Discovery',
    rating: 5,
    title: 'Cherry Blossom Season in Kyoto — Everything We\'d Hoped For',
    text: 'Getting cherry blossom timing right in Japan is notoriously difficult — too early or too late and you miss it. Lisa timed our Kyoto visit perfectly: peak hanami at Maruyama Park, a sunrise walk along the Philosopher\'s Path when petals were falling like pink snow. We\'d been warned Japan at cherry blossom is impossibly crowded; Lisa found us moments and corners that felt completely private. Bullet train experience was a highlight for the whole family. Wicked trip.',
    avatarInitials: 'ET',
    colorIndex: 1,
    date: 'Apr 2023',
    customizedBy: 'Lisa',
    initialLikes: 194,
    initialWants: 148,
  },
  {
    id: 23,
    name: 'Nick & Sandra Fowler',
    location: 'Blenheim',
    tour: 'Vietnam Discovery',
    rating: 5,
    title: 'Halong Bay at Sunrise Is Worth the Long-Haul Flight Alone',
    text: 'We almost went to Vietnam independently — so glad we didn\'t. Baker\'s local knowledge made all the difference. Halong Bay on a private junk boat at sunrise, the lantern-lit streets of Hoi An at dusk, and the sheer energy of Ho Chi Minh City — all without a single logistical headache. Sleeping on the boat and waking to limestone karsts emerging from morning mist: some things are worth flying 14 hours from New Zealand for.',
    avatarInitials: 'NF',
    colorIndex: 2,
    date: 'Aug 2023',
    customizedBy: 'Baker',
    initialLikes: 155,
    initialWants: 111,
  },
  {
    id: 24,
    name: 'Sam Whitmore',
    location: 'Tauranga',
    tour: 'China Stopover Shanghai',
    rating: 5,
    title: 'Perfect Intro to China — Already Planning the Full Discovery Tour',
    text: 'Two nights in Shanghai was meant to be a quick taste. Instead it became an obsession. Lisa put together a stopover package dense with quality: the Bund walk, Yu Garden, a cooking class in an old lane house, and a sunset view from the observation deck. Shanghai is wild, beautiful, and nothing like the China I\'d imagined. I\'m already emailing Lisa about the full Discovery tour for late 2025. Exactly how China should introduce itself to a first-timer.',
    avatarInitials: 'SW',
    colorIndex: 3,
    date: 'Nov 2024',
    customizedBy: 'Lisa',
    initialLikes: 172,
    initialWants: 127,
  },
];

// Spotlight reviews lead; general reviews follow
const allTestimonials: Testimonial[] = [...spotlightTestimonials, ...generalTestimonials];

// ── Module-level UI helpers (stable identity — no re-creation on each render) ──

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-red-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ t, size = 'md' }: { t: Testimonial; size?: 'sm' | 'md' }) {
  // Derive a stable avatar image number (1-70) from the testimonial id
  const imgNum = ((Math.abs(t.id) * 13 + t.colorIndex * 7) % 70) + 1;
  const dim = size === 'sm' ? 'w-9 h-9' : 'w-12 h-12';
  return (
    <div className={`${dim} rounded-full overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white bg-gradient-to-br ${AVATAR_COLORS[t.colorIndex]}`}>
      <img
        src={`https://i.pravatar.cc/80?img=${imgNum}`}
        alt={t.name}
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface ReviewCardProps {
  t: Testimonial;
  showDivider: boolean;
  isExpanded: boolean;
  isLiked: boolean;
  isWanted: boolean;
  likeCount: number;
  wantCount: number;
  onToggleLike: () => void;
  onToggleWant: () => void;
  onToggleExpand: () => void;
}

function ReviewCard({ t, showDivider, isExpanded, isLiked, isWanted, likeCount, wantCount, onToggleLike, onToggleWant, onToggleExpand }: ReviewCardProps) {
  const TEXT_LIMIT = 220;
  const needsTruncate = t.text.length > TEXT_LIMIT;
  const displayText = isExpanded || !needsTruncate ? t.text : t.text.slice(0, TEXT_LIMIT) + '…';

  return (
    <div>
      {showDivider && <hr className="border-gray-100 mx-6" />}
      <div className={`px-6 py-7 ${t.spotlightTag ? 'bg-amber-50/30' : ''}`}>
        {/* Row 1: Avatar + Name + Location | Like count */}
        <div className="flex items-start gap-4">
          <Avatar t={t} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-gray-900 leading-tight">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}, New Zealand</p>
              </div>
              <button
                onClick={onToggleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all flex-shrink-0 ${
                  isLiked
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'
                }`}
                aria-label={isLiked ? 'Unlike' : 'Like this review'}
              >
                <ThumbIcon filled={isLiked} />
                <span className="text-sm font-semibold">{likeCount}</span>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={t.rating} />
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{t.location}</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mt-4 text-base leading-snug">{t.title}</h3>

        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {displayText}
          {needsTruncate && (
            <button onClick={onToggleExpand} className="ml-1 text-primary hover:underline font-medium text-sm">
              {isExpanded ? 'show less' : 'read more'}
            </button>
          )}
        </p>

        <div className="mt-4 space-y-1 text-xs text-gray-500">
          <p><span className="font-semibold text-gray-700">Date of Experience:</span>{' '}{t.date}</p>
          <p><span className="font-semibold text-gray-700">Tour Customized by:</span>{' '}{t.customizedBy}</p>
          <p>
            <span className="font-semibold text-gray-700">You May Be Interested in This Tour:</span>{' '}
            <span className="text-primary font-semibold hover:underline cursor-pointer">{t.tour}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={onToggleLike}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              isLiked
                ? 'bg-primary/10 border-primary/30 text-primary font-semibold'
                : 'bg-white border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'
            }`}
          >
            <ThumbIcon filled={isLiked} />
            Helpful · {likeCount}
          </button>
          <button
            onClick={onToggleWant}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              isWanted
                ? 'bg-rose-50 border-rose-300 text-rose-600 font-semibold'
                : 'bg-white border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500'
            }`}
          >
            <HeartIcon filled={isWanted} />
            Want to Go · {wantCount}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Spotlight card variants ────────────────────────────────────────────────────

interface SpotlightCardBaseProps {
  t: Testimonial;
  isExpanded: boolean;
  isLiked: boolean;
  isWanted: boolean;
  likeCount: number;
  wantCount: number;
  onToggleLike: () => void;
  onToggleWant: () => void;
  onToggleExpand: () => void;
}

const ACCENT_BG: Record<string, string> = {
  amber: 'from-amber-50/60 to-white',
  blue:  'from-blue-50/60 to-white',
  red:   'from-red-50/60 to-white',
};

/** Large featured card — first review in each spotlight group */
function FeaturedSpotlightCard({ t, isExpanded, isLiked, isWanted, likeCount, wantCount, onToggleLike, onToggleWant, onToggleExpand, accentBg = 'amber' }: SpotlightCardBaseProps & { accentBg?: string }) {
  const TEXT_LIMIT = 280;
  const needsTruncate = t.text.length > TEXT_LIMIT;
  const displayText = isExpanded || !needsTruncate ? t.text : t.text.slice(0, TEXT_LIMIT) + '…';
  return (
    <div className={`px-6 pt-6 pb-5 bg-gradient-to-br ${ACCENT_BG[accentBg] ?? ACCENT_BG.amber}`}>
      <div className="flex items-start gap-4">
        <Avatar t={t} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-gray-900 leading-tight text-base">{t.name}</p>
              <p className="text-sm text-gray-500">{t.location}, New Zealand</p>
            </div>
            <button
              onClick={onToggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all flex-shrink-0 ${isLiked ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'}`}
              aria-label={isLiked ? 'Unlike' : 'Like this review'}
            >
              <ThumbIcon filled={isLiked} />
              <span className="text-sm font-semibold">{likeCount}</span>
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={t.rating} />
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">{t.date}</span>
          </div>
        </div>
      </div>
      <h3 className="font-bold text-gray-900 mt-4 text-lg leading-snug">{t.title}</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        {displayText}
        {needsTruncate && (
          <button onClick={onToggleExpand} className="ml-1 text-primary hover:underline font-medium text-sm">
            {isExpanded ? 'show less' : 'read more'}
          </button>
        )}
      </p>
      <div className="mt-3 space-y-0.5 text-xs text-gray-500">
        <p><span className="font-semibold text-gray-700">Tour Customized by:</span>{' '}{t.customizedBy}</p>
        <p>
          <span className="font-semibold text-gray-700">Tour:</span>{' '}
          <span className="text-primary font-semibold cursor-pointer hover:underline">{t.tour}</span>
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onToggleLike}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${isLiked ? 'bg-primary/10 border-primary/30 text-primary font-semibold' : 'bg-white border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'}`}
        >
          <ThumbIcon filled={isLiked} />
          Helpful · {likeCount}
        </button>
        <button
          onClick={onToggleWant}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${isWanted ? 'bg-rose-50 border-rose-300 text-rose-600 font-semibold' : 'bg-white border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500'}`}
        >
          <HeartIcon filled={isWanted} />
          Want to Go · {wantCount}
        </button>
      </div>
    </div>
  );
}

/** Compact card — 2nd and 3rd reviews in each spotlight group, shown in a 2-col grid */
function MiniSpotlightCard({ t, isLiked, isWanted, likeCount, wantCount, onToggleLike, onToggleWant }: Omit<SpotlightCardBaseProps, 'isExpanded' | 'onToggleExpand'>) {
  return (
    <div className="px-5 py-5 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-3">
        <Avatar t={t} size="sm" />
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{t.name}</p>
          <p className="text-xs text-gray-500">{t.location}, NZ · {t.date}</p>
        </div>
      </div>
      <StarRating rating={t.rating} />
      <p className="font-semibold text-sm text-gray-800 mt-2 leading-snug">{t.title}</p>
      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-4 flex-1">{t.text}</p>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={onToggleLike}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all ${isLiked ? 'bg-primary/10 border-primary/30 text-primary font-semibold' : 'bg-white border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'}`}
        >
          <ThumbIcon filled={isLiked} />
          {likeCount}
        </button>
        <button
          onClick={onToggleWant}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all ${isWanted ? 'bg-rose-50 border-rose-300 text-rose-600 font-semibold' : 'bg-white border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500'}`}
        >
          <HeartIcon filled={isWanted} />
          Want to Go · {wantCount}
        </button>
      </div>
    </div>
  );
}

// ── Spotlight tag colour config ────────────────────────────────────────────────

const SPOTLIGHT_TAGS = ["Beijing & Xi'an", 'Shanghai & Surroundings', 'Chongqing & Chengdu'] as const;

const SPOTLIGHT_TAG_STYLES: Record<string, { border: string; badge: string }> = {
  "Beijing & Xi'an":        { border: 'border-amber-400', badge: 'border-amber-400 text-amber-700 bg-amber-50' },
  'Shanghai & Surroundings': { border: 'border-blue-400',  badge: 'border-blue-400  text-blue-700  bg-blue-50'  },
  'Chongqing & Chengdu':    { border: 'border-red-400',   badge: 'border-red-400   text-red-700   bg-red-50'   },
};

const SPOTLIGHT_ACCENT_BG: Record<string, string> = {
  "Beijing & Xi'an":        'amber',
  'Shanghai & Surroundings': 'blue',
  'Chongqing & Chengdu':    'red',
};

// ── Main component ─────────────────────────────────────────────────────────────

interface TestimonialsProps {
  variant?: 'full' | 'compact' | 'sidebar';
  tourFilter?: string;
  maxItems?: number;
  hideSpotlight?: boolean;
}

const INITIAL_VISIBLE = 3;
const LOAD_MORE_COUNT = 4;
const TOTAL_REVIEWS = allTestimonials.length;

export default function Testimonials({ variant = 'full', tourFilter, maxItems, hideSpotlight = false }: TestimonialsProps) {
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [wanted, setWanted] = useState<Record<number, boolean>>({});
  const [wants, setWants] = useState<Record<number, number>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const displayTestimonials = useMemo(() => {
    let filtered = tourFilter
      ? allTestimonials.filter(t => t.tour.toLowerCase().includes(tourFilter.toLowerCase()))
      : allTestimonials;
    if (filtered.length < 3) filtered = allTestimonials;
    if (maxItems) filtered = filtered.slice(0, maxItems);
    return filtered;
  }, [tourFilter, maxItems]);

  const getLikeCount = (t: Testimonial) => likes[t.id] ?? t.initialLikes;
  const getWantCount = (t: Testimonial) => wants[t.id] ?? t.initialWants;

  const toggleLike = (t: Testimonial) => {
    const isLiked = !!liked[t.id];
    setLiked(prev => ({ ...prev, [t.id]: !isLiked }));
    setLikes(prev => ({ ...prev, [t.id]: isLiked ? t.initialLikes : t.initialLikes + 1 }));
  };

  const toggleWant = (t: Testimonial) => {
    const isWanted = !!wanted[t.id];
    setWanted(prev => ({ ...prev, [t.id]: !isWanted }));
    setWants(prev => ({ ...prev, [t.id]: isWanted ? t.initialWants : t.initialWants + 1 }));
  };

  const renderCard = (t: Testimonial, idx: number) => (
    <ReviewCard
      key={t.id}
      t={t}
      showDivider={idx > 0}
      isExpanded={!!expanded[t.id]}
      isLiked={!!liked[t.id]}
      isWanted={!!wanted[t.id]}
      likeCount={getLikeCount(t)}
      wantCount={getWantCount(t)}
      onToggleLike={() => toggleLike(t)}
      onToggleWant={() => toggleWant(t)}
      onToggleExpand={() => setExpanded(prev => ({ ...prev, [t.id]: !expanded[t.id] }))}
    />
  );

  const renderFeaturedCard = (t: Testimonial, accentBg: string) => (
    <FeaturedSpotlightCard
      key={t.id}
      t={t}
      accentBg={accentBg}
      isExpanded={!!expanded[t.id]}
      isLiked={!!liked[t.id]}
      isWanted={!!wanted[t.id]}
      likeCount={getLikeCount(t)}
      wantCount={getWantCount(t)}
      onToggleLike={() => toggleLike(t)}
      onToggleWant={() => toggleWant(t)}
      onToggleExpand={() => setExpanded(prev => ({ ...prev, [t.id]: !expanded[t.id] }))}
    />
  );

  const renderMiniCard = (t: Testimonial) => (
    <MiniSpotlightCard
      key={t.id}
      t={t}
      isLiked={!!liked[t.id]}
      isWanted={!!wanted[t.id]}
      likeCount={getLikeCount(t)}
      wantCount={getWantCount(t)}
      onToggleLike={() => toggleLike(t)}
      onToggleWant={() => toggleWant(t)}
    />
  );

  // Sidebar variant for tour pages
  if (variant === 'sidebar') {
    const items = displayTestimonials.slice(0, 3);
    return (
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Traveller Reviews
        </h3>
        {items.map((item) => (
          <div key={item.id} className="bg-warm-50 rounded-xl p-5 border border-warm-100">
            <div className="flex items-center gap-2 mb-2">
              <Avatar t={item} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.location}, NZ</p>
              </div>
            </div>
            <StarRating rating={item.rating} />
            <p className="text-xs font-semibold text-gray-800 mt-2">{item.title}</p>
            <p className="text-sm text-gray-600 mt-1 italic leading-relaxed line-clamp-3">&ldquo;{item.text}&rdquo;</p>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => toggleLike(item)}
                className={`flex items-center gap-1 text-xs transition-colors ${liked[item.id] ? 'text-primary font-semibold' : 'text-gray-400 hover:text-primary'}`}
              >
                <ThumbIcon filled={!!liked[item.id]} />
                {getLikeCount(item)}
              </button>
              <button
                onClick={() => toggleWant(item)}
                className={`flex items-center gap-1 text-xs transition-colors ${wanted[item.id] ? 'text-rose-500 font-semibold' : 'text-gray-400 hover:text-rose-500'}`}
              >
                <HeartIcon filled={!!wanted[item.id]} />
                Want to Go · {getWantCount(item)}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    const item = displayTestimonials[0];
    return (
      <div className="bg-warm-50 rounded-xl p-6 border border-warm-100">
        <div className="flex items-center gap-3 mb-3">
          <Avatar t={item} />
          <div>
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">{item.location}, NZ · {item.date}</p>
          </div>
          <div className="ml-auto">
            <StarRating rating={item.rating} />
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
        <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
        <p className="text-xs text-primary/70 mt-2 font-medium">{item.tour}</p>
      </div>
    );
  }

  // Full variant — list style
  const generalItems = displayTestimonials.filter(t => !t.spotlightTag);
  const spotlightItems = displayTestimonials.filter(t => !!t.spotlightTag);
  const visibleGeneralItems = generalItems.slice(0, visibleCount);
  const hasMore = visibleCount < generalItems.length;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/20 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-rose-200/15 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-5 py-2 mb-4 border border-amber-200/50">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">What Our Travellers Say</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent">Traveller Stories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-4 text-sm">{TOTAL_REVIEWS} reviews from New Zealand travellers</p>
        </div>

        {/* ── Spotlight section ── */}
        {!hideSpotlight && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">HOT PICK</span>
            <span className="text-sm font-semibold text-gray-700">Reviews for our most popular tours right now</span>
          </div>

          {SPOTLIGHT_TAGS.map(tag => {
            const tagItems = spotlightItems.filter(t => t.spotlightTag === tag);
            if (!tagItems.length) return null;
            const style = SPOTLIGHT_TAG_STYLES[tag] ?? { border: 'border-primary', badge: 'border-primary text-primary bg-white' };
            const accentBg = SPOTLIGHT_ACCENT_BG[tag] ?? 'amber';
            const [featured, ...miniCards] = tagItems;
            return (
              <div key={tag} className={`mb-5 rounded-2xl border-2 ${style.border} overflow-hidden shadow-sm`}>
                {/* Group header */}
                <div className="px-5 py-3 flex items-center gap-2 bg-white border-b border-gray-100">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>{tag}</span>
                  <span className="text-xs text-gray-400">{tagItems.length} reviews</span>
                </div>
                <div className="bg-white">
                  {/* Featured (large) card — first review */}
                  {renderFeaturedCard(featured, accentBg)}
                  {/* Mini (compact) cards — 2nd & 3rd reviews in a 2-col grid */}
                  {miniCards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px border-t border-gray-100 bg-gray-100">
                      {miniCards.map(t => (
                        <div key={t.id} className="bg-white">
                          {renderMiniCard(t)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* ── General reviews ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-600">All Reviews</p>
          </div>
          {visibleGeneralItems.map((t, idx) => renderCard(t, idx))}

          {/* Load more */}
          {hasMore && (
            <div className="px-6 pb-7 pt-2 border-t border-gray-100">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, generalItems.length))}
                className="w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
              >
                Show more reviews ({generalItems.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-accent">5.0</p>
            <div className="flex justify-center mt-1"><StarRating rating={5} /></div>
            <p className="text-xs text-gray-500 mt-1">Overall Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-accent">{allTestimonials.length}</p>
            <p className="text-xs text-gray-500 mt-3">Verified Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-gray-500 mt-3">Recommend Us</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThumbIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-3.5 h-3.5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-3.5 h-3.5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}
