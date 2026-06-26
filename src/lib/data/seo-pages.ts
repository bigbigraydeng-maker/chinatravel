// SEO Pages Data
// Metadata, introductions, and FAQs for all 12 Phase 1 pages

export interface SeoPageMeta {
  slug: string;
  title: string; // Page <title>
  description: string; // meta description
  h1: string; // Main heading
  heroSubtitle: string; // Subtitle under hero
  introText: string; // Intro paragraph(s)
  faqs: Array<{ question: string; answer: string }>;
}

export interface CityHubMeta extends SeoPageMeta {
  cityName: string;
  searchTerms: string[]; // For getToursByCityName()
  highlights: string[]; // City-specific highlights
  bestTimeToVisit: string; // Season description
  heroImage?: string; // Optional hero image
}

// ===== Commercial hub pages =====

export const chinaToursMeta: SeoPageMeta = {
  slug: 'china-tours',
  title: 'China Tours from New Zealand 2026-27 · 4 Itineraries | CTS',
  description:
    'Compare 4 China tours from NZ 2026-27: Tale of Two Cities NZD $3,480 · Best of China $3,880 · Shanghai & Surroundings $3,399 · Silk Road $7,999. Backed by CTS — global travel brand since 1928, NZ team 25 years. Auckland-based, TAANZ-bonded. Free quote.',
  h1: 'China Tours from New Zealand',
  heroSubtitle: '4 Kiwi-Led China itineraries 2026-27 · 10-18 days · NZD $3,399-7,999 · Auckland-based',
  introText:
    'CTS Tours is New Zealand\'s dedicated China travel specialist — a TAANZ member and IATA-accredited agency with direct China operations since 1928. Our Auckland consultants design and operate every China holiday package and china trip in our collection.\n\nWe offer three distinct China tour packages to suit different budgets and travel styles: Signature (boutique 4–5 star hotels, small groups up to 16), Discovery (excellent-value escorted China travel packages with 3–4 star stays), and Stopover (2–4 day city breaks, perfect as an add-on to business travel or a taster before a longer trip).\n\nNew Zealand ordinary passport holders currently enjoy visa-free entry to China for up to 30 days — making booking a China holiday package faster and simpler than ever. Browse more than fifty curated itineraries below, or contact our Auckland team for a tailor-made china trip.',
  faqs: [
    {
      question: 'What are the best China tours from New Zealand in 2026-27?',
      answer: 'CTS Tours\' four headline China itineraries for Kiwi travellers in 2026-27 are: Tale of Two Cities — Beijing + Xi\'an (10 days, NZD $3,480, Discovery tier); Shanghai & Surroundings — Jiangnan loop (10 days, NZD $3,399, Discovery tier); Best of China — 4 cities including Beijing, Xi\'an, Shanghai, Guilin (15 days, NZD $3,880, Discovery tier); and Silk Road Discovery (18 days, NZD $7,999, Signature tier). All four are Kiwi-led, Auckland-based, with NZD pricing and English-speaking guides on the ground in China.'
    },
    {
      question: 'What China tour packages does CTS offer?',
      answer: 'CTS offers three collections of China tour packages: Signature (premium 4–5 star hotels, small groups up to 16, bespoke itineraries), Discovery (great-value guided packages with comfortable 3–4 star hotels, ideal for first-time visitors), and Stopover (short 2–4 day city breaks). All packages include international flights from New Zealand, accommodation, guides, and most meals.'
    },
    {
      question: 'Do you offer China holiday packages from New Zealand?',
      answer: 'Yes. All our China holiday packages are priced in NZD and include return international airfares from Auckland (AKL) — the only New Zealand airport with direct flights to mainland China. If you are based in Wellington, Christchurch, Dunedin or regional NZ, our Auckland-based consultants arrange a connecting domestic flight to Auckland; the domestic connecting leg is quoted separately and is not included in the headline tour price. Our team handles everything else — international flights, hotels, China guides, domestic transport in China, and visa-free entry advice for NZ passport holders.'
    },
    {
      question: 'What is included in a CTS China travel package?',
      answer: 'Inclusions vary by package but typically cover: return international flights from New Zealand, domestic flights or high-speed trains in China, hotel accommodation (3–5 star depending on tier), English-speaking local guides, entrance fees listed in the itinerary, and meals as specified. Exclusions (travel insurance, personal expenses, tips) are clearly listed on each tour page.'
    },
    {
      question: 'How long are your China holiday packages?',
      answer: 'Our China packages range from 2–4 day Stopover city breaks to 17+ day Silk Road journeys. Most popular Signature and Discovery packages run 8–12 days, covering 2–3 cities with an immersive but comfortable pace. Custom-length China travel packages are also available — contact us for a tailored quote.'
    },
    {
      question: 'When is the best time to book a China tour package?',
      answer: 'We recommend booking 2–3 months ahead for spring (March–May) and autumn (September–November) travel — China\'s peak seasons with ideal weather. For Chinese New Year or Golden Week (October) travel, book 4–6 months ahead as these periods fill quickly. Contact our Auckland team anytime for availability.'
    },
    {
      question: 'How much does a China tour package from New Zealand cost?',
      answer: 'CTS Tours\' published lead-in prices range from NZD $3,399 (Shanghai & Surroundings, 10 days, Discovery tier) and NZD $3,480 (Tale of Two Cities — Beijing & Xi\'an, 10 days, Discovery) up to NZD $7,999 (Silk Road Discovery, 18 days). Best of China runs 15 days from NZD $3,880. All prices include return international airfares from Auckland, accommodation, English-speaking guides, entrance fees, and listed meals. Single supplement applies for solo travellers.'
    },
    {
      question: 'Do New Zealand passport holders need a visa for China?',
      answer: 'Most NZ ordinary passport holders do not need a visa. China currently allows visa-free entry of up to 30 days for tourism, business, family visits, exchange, and transit — policy published to 31 December 2026. Bring a valid passport, return or onward tickets, and accommodation or tour confirmation. Confirm the latest rules before booking; CTS can advise based on your itinerary.'
    },
    {
      question: 'Which is the best China tour package for first-time visitors?',
      answer: 'For first-time visitors from New Zealand, we recommend Tale of Two Cities (10 days, Beijing + Xi\'an, NZD $3,480) — it covers the Forbidden City, Great Wall, hutongs, Terracotta Warriors and the City Wall at a comfortable pace. For travellers who want to add Shanghai and Yangtze River cities, Best of China (15 days, NZD $3,880) is the classic full-coverage option.'
    },
    {
      question: 'What makes CTS Tours different from other China travel agencies in NZ?',
      answer: 'CTS Tours New Zealand operates as the local arm of China Travel Service, a group founded in 1928 — making us one of the longest-running specialists in Aotearoa. We are TAANZ-bonded, IATA-accredited, Auckland-based, and design and operate every itinerary in-house with direct China operations (not resold from third parties). All quotes and payments are in NZD, and our consultants are on the ground in Auckland for support before, during, and after your trip.'
    }
  ]
};

// ===== City hub pages =====

export const beijingToursMeta: CityHubMeta = {
  slug: 'beijing-tours',
  cityName: 'Beijing',
  title: 'Beijing Tours from New Zealand | Great Wall | CTS Tours',
  description: 'Explore Beijing with CTS Tours. From the Great Wall to the Forbidden City and Ming Tombs. Signature and Discovery tours from NZD $3,999.',
  h1: 'Beijing Tours from New Zealand',
  heroSubtitle: 'Walk the Great Wall. Explore the Forbidden City. Immerse in 5,000 years of history.',
  introText: 'Beijing, China\'s imperial capital, is a city where ancient dynasties meet modern energy. Home to the Great Wall, the Forbidden City, and the Summer Palace, Beijing offers iconic cultural experiences alongside world-class dining and vibrant neighbourhoods. Our Beijing tours range from quick 2-3 day stopovers to in-depth 8+ day journeys exploring the city and surrounding regions like the Ming Tombs and Mutianyu sections of the Great Wall.',
  searchTerms: ['beijing', 'great wall', 'forbidden city', 'summer palace', 'ming tombs'],
  highlights: [
    'Walk the Great Wall of China at Mutianyu or Badaling',
    'Explore the UNESCO-listed Forbidden City and Imperial treasures',
    'Visit the Summer Palace gardens and temples',
    'Marvel at the Ming Tombs and Sacred Way',
    'Experience a traditional hutong neighbourhood tour',
    'Enjoy Peking duck at a historic Beijing restaurant'
  ],
  bestTimeToVisit: 'Spring (April-May) and autumn (September-October) offer perfect weather for walking the Great Wall and exploring outdoor sites. Winters can be cold and smoggy, while summers are hot and humid.',
  faqs: [
    {
      question: 'How many days should I spend in Beijing?',
      answer: 'We recommend a minimum of 3-4 days to experience Beijing\'s highlights: the Forbidden City, Great Wall, Summer Palace, and a hutong neighbourhood. Many of our guests prefer 5-7 days to also explore the Ming Tombs, enjoy dining experiences, and absorb the city\'s contemporary culture.'
    },
    {
      question: 'Which section of the Great Wall is best to visit?',
      answer: 'Mutianyu (90 minutes from Beijing city) is less crowded and beautifully forested, ideal for hiking. Badaling (43 minutes) is the most visited and iconic for photography. Both are included in various CTS tours—we\'ll recommend based on your fitness and time.'
    },
    {
      question: 'Is it safe to walk the Great Wall?',
      answer: 'Yes, the restored sections visited on our tours are very safe and well-maintained. We provide experienced guides, and the paths are suitable for most fitness levels. Wear good hiking shoes and bring plenty of water.'
    },
    {
      question: 'Can I visit the Forbidden City in one day?',
      answer: 'Yes, the Forbidden City can be explored in 3-4 hours with a guide, though many guests prefer a full day to enjoy the audio guide and museums. Our tours typically allocate a full morning or afternoon depending on the overall itinerary.'
    }
  ]
};

export const xianToursMeta: CityHubMeta = {
  slug: 'xian-tours',
  cityName: "Xi'an",
  title: "Xi'an Tours NZ | Terracotta Warriors | CTS Tours",
  description: "Visit Xi'an with CTS Tours. Meet the Terracotta Warriors, walk the ancient city walls, explore Buddhist temples. Signature and Discovery tours available.",
  h1: "Xi'an Tours from New Zealand",
  heroSubtitle: 'Marvel at the Terracotta Warriors. Walk 2,000-year-old city walls. Experience China\'s ancient capital.',
  introText: 'Xi\'an, once the capital of multiple Chinese dynasties, is home to one of the world\'s greatest archaeological discoveries: the Terracotta Warriors. This ancient city blends millennia-old history with vibrant street markets, Buddhist temples, and authentic local culture. Our Xi\'an tours range from short stopovers to multi-day explorations combining the Terracotta Warriors, the Great Goose Pagoda, the ancient city walls, and the Silk Road heritage.',
  searchTerms: ['xi\'an', 'xian', 'terracotta warriors', 'terracotta army', 'ancient city walls', 'great goose pagoda'],
  highlights: [
    'Discover the world-famous Terracotta Warriors at Mausoleum of Emperor Qin',
    'Walk the stunning ancient city walls (13.6 km circumference)',
    'Visit the Giant Goose Pagoda and learn Buddhist history',
    'Explore the Muslim Quarter with its bustling street markets',
    'Visit a traditional Chinese dumpling restaurant for a special lunch',
    'See the Shaanxi History Museum with Silk Road treasures'
  ],
  bestTimeToVisit: 'Spring (April-May) and autumn (September-October) offer ideal weather. Summer is hot, and winter can be cold. Avoid peak tourist seasons (July-August, December-January) for a more intimate experience.',
  faqs: [
    {
      question: 'How much time do I need for the Terracotta Warriors?',
      answer: 'Plan 3-4 hours to explore the Terracotta Warriors museum and excavation site, including time for queues and an audio guide. Most CTS tours allocate a full half-day to this iconic attraction.'
    },
    {
      question: 'Can I walk the entire city wall?',
      answer: 'Yes! The complete circuit is 13.6 km and takes about 2 hours by bicycle or 3-4 hours on foot. Our tours typically include a partial walk (2-3 km) along the most scenic and historic sections. Bicycle rental is available.'
    },
    {
      question: 'What is the Muslim Quarter?',
      answer: 'The Muslim Quarter (Hui neighbourhood) is a vibrant 2.5 km area with narrow streets filled with food stalls, small shops, and mosques. It\'s one of Xi\'an\'s best culinary destinations. Our guides will lead you through the highlights and best street food vendors.'
    },
    {
      question: 'Is Xi\'an a good starting point for the Silk Road?',
      answer: 'Absolutely! Xi\'an was the eastern terminus of the ancient Silk Road. Our Silk Road tours depart from Xi\'an and travel west through Lanzhou, Dunhuang, and beyond, following the historical trade routes.'
    }
  ]
};

export const shanghaiToursMeta: CityHubMeta = {
  slug: 'shanghai-tours',
  cityName: 'Shanghai',
  title: 'Shanghai Tours from New Zealand | The Bund | CTS Tours',
  description: 'Explore Shanghai with CTS Tours. The Bund, Yu Garden, modern skyline, and water town villages. Signature and Discovery tours from NZD $3,500.',
  h1: 'Shanghai Tours from New Zealand',
  heroSubtitle: 'Experience the Bund\'s colonial elegance. Explore ancient water towns. Embrace the modern metropolis.',
  introText: 'Shanghai, China\'s most cosmopolitan city, is a fascinating blend of Colonial heritage, timeless tradition, and cutting-edge modernity. From the iconic skyline of Pudong to the restored French Concession, from ancient water town villages to avant-garde museums, Shanghai offers endless exploration. Our Shanghai tours range from city-focused itineraries to multi-day journeys combining Shanghai with nearby cities like Suzhou and Hangzhou.',
  searchTerms: ['shanghai', 'the bund', 'yu garden', 'pudong', 'french concession', 'water towns', 'zhujiajiao'],
  highlights: [
    'Stroll the iconic Bund colonial waterfront',
    'Ascend the Oriental Pearl Tower for panoramic city views',
    'Wander Yu Garden\'s classical Ming Dynasty gardens',
    'Explore the charming French Concession neighbourhood',
    'Visit a water town village (Zhujiajiao or Zhouzu) with narrow canals',
    'Experience world-class dining from street food to Michelin-starred restaurants'
  ],
  bestTimeToVisit: 'Spring (March-May) and autumn (September-October) are ideal with mild temperatures and low humidity. Summer is hot and humid, while winter is cold but dry. Avoid Chinese New Year (late Jan/early Feb) due to crowds and closures.',
  faqs: [
    {
      question: 'What is the Bund?',
      answer: 'The Bund is Shanghai\'s famous waterfront promenade lined with Colonial-era buildings from the early 1900s. The eastern side features soaring modern skyscrapers across the Huangpu River in Pudong, creating a stunning contrast of old and new. Walking the Bund at night is magical with the skyline illuminated.'
    },
    {
      question: 'Is Shanghai suitable for a short stopover?',
      answer: 'Yes! Shanghai works well as a 2-3 day stopover to experience the Bund, Yu Garden, French Concession, and the Pearl Tower. However, we recommend 4+ days if you want to visit water town villages like Zhujiajiao or Zhouzu, which are best experienced with a day trip.'
    },
    {
      question: 'What are water towns?',
      answer: 'Water towns are traditional ancient villages outside Shanghai built around canals and ponds. Zhujiajiao (30 km west) and Zhouzu (80 km south-east) are the most popular, featuring narrow lanes, arched bridges, traditional Ming/Qing architecture, and folk museums. They\'re perfect for a half-day or full-day excursion.'
    },
    {
      question: 'Can I see the Oriental Pearl Tower at night?',
      answer: 'Yes! The tower is illuminated beautifully at night. However, daytime visits offer the clearest views. Many of our tours include a daytime tower visit followed by evening river cruises or strolls along the night-lit Bund.'
    }
  ]
};

export const chengduToursMeta: CityHubMeta = {
  slug: 'chengdu-tours',
  cityName: 'Chengdu',
  title: 'Chengdu Tours from New Zealand | Giant Pandas | CTS Tours',
  description: 'Visit Chengdu with CTS Tours. Meet giant pandas at the Panda Reserve, explore temples, enjoy authentic Sichuan cuisine. Tours from NZD $3,700.',
  h1: 'Chengdu Tours from New Zealand',
  heroSubtitle: 'Meet giant pandas. Explore ancient temples. Savour world-famous Sichuan cuisine.',
  introText: 'Chengdu, the capital of Sichuan Province, is synonymous with China\'s most iconic animal: the giant panda. But this vibrant city offers far more than just pandas—ancient Buddhist temples, breathtaking natural landscapes like Mount Emei, and a world-renowned food scene centered on fiery Sichuan cuisine. Our Chengdu tours showcase the city\'s unique blend of wildlife, culture, and gastronomy.',
  searchTerms: ['chengdu', 'giant panda', 'panda', 'mount emei', 'leshan buddha'],
  highlights: [
    'Visit the Giant Panda Research Base and observe pandas in a natural setting',
    'Explore Wenshu Monastery, a 1,400-year-old Buddhist temple in the city',
    'Hike Mount Emei, one of Buddhism\'s four sacred mountains',
    'See the colossal Leshan Buddha carved into a cliffside',
    'Enjoy an authentic Sichuan hot pot (malatang) dinner experience',
    'Relax at traditional teahouses with locals playing cards and mahjong'
  ],
  bestTimeToVisit: 'Spring (March-May) and autumn (September-October) are ideal. Summers are hot and humid, while winters are cold and often cloudy. Mount Emei can have snow or fog in winter, making visibility poor.',
  faqs: [
    {
      question: 'What is it like to see giant pandas up close?',
      answer: 'The Giant Panda Research Base allows visitors to see pandas in a semi-natural habitat as they eat, play, and rest. Morning visits (7-9 AM) are best when pandas are most active. You can also see baby pandas in the breeding facility. It\'s an unforgettable experience—the pandas are adorable and surprisingly graceful.'
    },
    {
      question: 'Is Mount Emei difficult to climb?',
      answer: 'Mount Emei can be explored by cable car, walking certain sections, or a combination of both. Our tours typically take visitors to the Golden Summit (3,077 m) by cable car for stunning views and temples. Some visitors hike the lower slopes. All fitness levels can enjoy the experience with proper planning.'
    },
    {
      question: 'What is Sichuan cuisine like?',
      answer: 'Sichuan cuisine is famous for fiery heat from Sichuan peppercorns (má là = numb + spicy). Popular dishes include hot pot (huoguo), mapo tofu, and Chongqing la zi ji (spicy chicken). It\'s intensely flavorful. CTS will inform you of heat levels for each dish—ask for mild options if you prefer.'
    },
    {
      question: 'Can I see pandas and Mount Emei in one trip?',
      answer: 'Absolutely! A 4-5 day Chengdu-based tour can include both the Panda Base (1 day), Mount Emei & Leshan Buddha (2-3 days), and city experiences (1 day). Our tours combine these perfectly for a well-rounded Chengdu experience.'
    }
  ]
};

export const guilinToursMeta: CityHubMeta = {
  slug: 'guilin-tours',
  cityName: 'Guilin',
  title: 'Guilin Tours from New Zealand | Li River Cruise | CTS Tours',
  description: 'Explore Guilin with CTS Tours. Cruise the Li River, explore karst mountains, visit Yangshuo. Signature and Discovery tours available.',
  h1: 'Guilin Tours from New Zealand',
  heroSubtitle: 'Cruise the Li River\'s dreamscape. Hike dramatic karst peaks. Discover rural Yangshuo.',
  introText: 'Guilin, nestled in southern China\'s Guangxi Province, is famous worldwide for its ethereal landscape of limestone karst mountains rising from emerald rivers and valleys. The Li River cruise from Guilin to Yangshuo is considered one of the most beautiful journeys in China. Our Guilin tours combine river cruises, mountain hiking, traditional bamboo rafting, and the charming rural town of Yangshuo.',
  searchTerms: ['guilin', 'li river', 'yangshuo', 'karst mountains', 'bamboo raft'],
  highlights: [
    'Cruise the legendary Li River from Guilin to Yangshuo (4-5 hours of breathtaking scenery)',
    'Hike among the dramatic karst mountains surrounding Yangshuo',
    'Experience a traditional bamboo raft ride at sunset',
    'Explore Yangshuo\'s cycling routes through rural villages and rice paddies',
    'Visit local limestone caves with stunning stalactite formations',
    'Enjoy fresh river fish and farm-to-table village cuisine'
  ],
  bestTimeToVisit: 'Spring (March-May) and autumn (September-October) are perfect—clear skies, comfortable temperatures, and water levels ideal for cruising. Summer is hot and humid. Winter is cool but may have mist obscuring mountain views.',
  faqs: [
    {
      question: 'What is the Li River cruise like?',
      answer: 'The Li River cruise from Guilin to Yangshuo (4-5 hours) is one of China\'s most famous scenic journeys. You\'ll drift past limestone mountains, bamboo groves, water buffalo, and villages straight out of classical Chinese paintings. Modern tourist boats offer comfortable seating and light meals. The journey is relaxing and spectacular.'
    },
    {
      question: 'Should I visit Guilin or Yangshuo?',
      answer: 'Both! Guilin is the larger city (gateway airport, museums, restaurants) but more touristy. Yangshuo is a charming countryside town where you can hike, cycle, relax by the river, and experience rural life. Most CTS tours start in Guilin and spend 2-3 days in Yangshuo for the best experience.'
    },
    {
      question: 'Can I do the Li River cruise multiple times?',
      answer: 'The main cruise (Guilin to Yangshuo) is typically done once as it\'s quite long. However, there are shorter boat rides and bamboo raft experiences near Yangshuo. Some visitors explore different sections of the Li River on different visits, but most find the main cruise sufficient.'
    },
    {
      question: 'Is Yangshuo good for hiking?',
      answer: 'Yes! Yangshuo is surrounded by karst mountains perfect for hiking. Trails range from easy (1-2 hours) to challenging full-day hikes. Local guides can take you on scenic routes through villages and rice paddies. Your fitness level determines which trails are best.'
    }
  ]
};

export const zhangjiajieToursMetadata: CityHubMeta = {
  slug: 'zhangjiajie-tours',
  cityName: 'Zhangjiajie',
  title: 'Zhangjiajie Tours NZ | Avatar Mountains | CTS Tours',
  description: 'Visit Zhangjiajie with CTS Tours. Explore the Avatar-inspired mountains, walk the glass skywalk, experience Tujia culture. Tours from NZD $2,999.',
  h1: 'Zhangjiajie Tours from New Zealand',
  heroSubtitle: 'Discover the mountains that inspired Avatar. Walk the world\'s highest glass walkway. Experience untamed wilderness.',
  introText: 'Zhangjiajie, located in northwest Hunan Province, is home to the Zhangjiajie Grand Canyon and Wulingyuan Scenic Area—the very landscapes that inspired the floating mountains of Avatar. These UNESCO-listed peaks, some over 1,000 meters tall, create a breathtaking wilderness experience. Our Zhangjiajie tours combine mountain hiking, cable car rides, the famous Colourfull Rainbow Bridge and Glass Walkway, and authentic Tujia minority experiences.',
  searchTerms: ['zhangjiajie', 'avatar', 'wulingyuan', 'glass walkway', 'tianmen mountain'],
  highlights: [
    'Walk the Colourfull Rainbow Bridge, a photogenic curved walkway 430m high',
    'Experience the breathtaking Glass Walkway 1,430m above ground',
    'Explore towering sandstone columns of Wulingyuan Scenic Area',
    'Ride cable cars among misty mountain peaks',
    'Hike scenic trails through ancient forests',
    'Discover Tujia ethnic minority culture and cuisine'
  ],
  bestTimeToVisit: 'Spring (April-May) and autumn (September-October) offer clear skies and comfortable hiking weather. Summer is hot and humid with frequent mist. Winter is cool but misty, reducing visibility. Avoid rainy seasons (May-June).',
  faqs: [
    {
      question: 'Is the glass walkway really made of glass?',
      answer: 'Yes! The Zhangjiajie Glass Walkway is a transparent walkway at the edge of Tianmen Mountain, 1,430 meters above ground. Walking on glass overlooking the vast landscape below is thrilling and not for those with severe heights fears. However, the glass is incredibly strong (safety tested to hold 800 kg) and visitors report it\'s safer than many traditional mountain paths.'
    },
    {
      question: 'Which scenic areas should I visit in Zhangjiajie?',
      answer: 'The main areas are: Wulingyuan Scenic Area (UNESCO site with hiking and cable cars), Zhangjiajie Grand Canyon (hiking, glass bridge, cable car), and Tianmen Mountain (where the glass walkway is located). A 2-3 day visit covers the highlights. Each area requires separate tickets but CTS handles all logistics.'
    },
    {
      question: 'Is Zhangjiajie suitable for all fitness levels?',
      answer: 'Zhangjiajie has options for all levels. You can enjoy cable cars and short walks at scenic viewpoints, or undertake challenging full-day hikes. CTS will customize the itinerary to your fitness level. The glass walkway is accessible to anyone comfortable with heights.'
    },
    {
      question: 'What is Tujia culture?',
      answer: 'Tujia is an ethnic minority group native to western Hunan. They have unique traditions including distinctive clothing, architecture with carved wooden patterns (diaojiaolou), traditional songs and dances, and local cuisine featuring bamboo shoots and wild herbs. CTS tours include opportunities to meet Tujia people and experience their heritage.'
    }
  ]
};

export const yunnanToursMeta: CityHubMeta = {
  slug: 'yunnan-tours',
  cityName: 'Yunnan',
  title: 'Yunnan Tours from New Zealand | Lijiang & Dali | CTS Tours',
  description: 'Explore Yunnan with CTS Tours. Lijiang ancient town, Dali, Shangri-La mountains, Kunming gardens. Signature and Discovery tours available.',
  h1: 'Yunnan Tours from New Zealand',
  heroSubtitle: 'Journey through mountains, monasteries, and ancient towns. Experience China\'s most diverse region.',
  introText: 'Yunnan Province in southwest China is known for its breathtaking landscapes, rich cultural diversity, and mild year-round climate. Home to dozens of ethnic minorities, UNESCO World Heritage sites, and some of China\'s most picturesque towns, Yunnan offers authentic experiences off the typical China tour route. Our Yunnan tours explore Kunming, Dali, the ancient town of Lijiang, Shangri-La, and the surrounding mountain landscapes.',
  searchTerms: ['yunnan', 'lijiang', 'dali', 'shangri-la', 'kunming', 'naxi', 'bai'],
  highlights: [
    'Wander the UNESCO-listed Lijiang Old Town with Naxi heritage and wooden architecture',
    'Visit the Jade Dragon Snow Mountain and hike scenic Yulong trails',
    'Explore the ancient city of Dali with Bai minority culture and Erhai Lake',
    'Discover Shangri-La (formerly Zhongdian), a Tibetan Buddhist town among mountains',
    'See traditional puppet shows and local minority performances',
    'Enjoy fresh local cuisine: Yunnan rice noodles, Pu-erh tea, local mushrooms'
  ],
  bestTimeToVisit: 'Year-round is pleasant thanks to Yunnan\'s mild "eternal spring" climate. Spring (March-May) and autumn (September-October) are ideal. Summer is the rainy season. Winter is cool but dry and sunny.',
  faqs: [
    {
      question: 'What is special about Lijiang?',
      answer: 'Lijiang is one of China\'s best-preserved ancient towns, inhabited predominantly by the Naxi ethnic minority. The Old Town features narrow cobblestone streets, traditional wooden architecture, small bridges over canals, and a perfect blend of ancient heritage with modern boutique hotels and restaurants. UNESCO recognizes Lijiang\'s significance in Silk Road history and architectural traditions.'
    },
    {
      question: 'Is Yunnan good for trekking?',
      answer: 'Absolutely! Yunnan offers diverse trekking options: Jade Dragon Snow Mountain near Lijiang, Tiger Leaping Gorge between Lijiang and Shangri-La, and various mountain trails around Dali. CTS can arrange treks of various difficulty levels. The scenery is stunning, and local Naxi and Tibetan guides enhance the experience.'
    },
    {
      question: 'What is Shangri-La?',
      answer: 'Shangri-La (formerly Zhongdian) is a Tibetan Buddhist town at 3,200m elevation in the Diqing Tibetan Autonomous Prefecture. The town sits among mountains dotted with monasteries. Nearby Pudacuo National Park offers pristine alpine lakes and forest scenery. It\'s very different from Han Chinese cities, with strong Tibetan cultural influences and Buddhist traditions.'
    },
    {
      question: 'Can I visit all these towns in one trip?',
      answer: 'Yes! A typical 7-10 day Yunnan tour might visit Kunming (2 days) → Dali (2 days) → Lijiang (2-3 days) → Shangri-La (2 days) → return to Kunming. We arrange flights between cities to save time. This itinerary balances cities with nature and provides diverse cultural experiences.'
    }
  ]
};

// ===== Geo-targeted landing pages =====

export const chinaToursFromNZMeta: SeoPageMeta = {
  slug: 'china-tours-from-new-zealand',
  title: 'China Tours from NZ 2026-27 · 4 Tours from NZD $3,399 | CTS',
  description: 'Compare 4 China tours from New Zealand 2026-27: Tale of Two Cities ($3,480) · Best of China ($3,880) · Shanghai & Surroundings ($3,399) · Silk Road ($7,999). All include Auckland return flights. Backed by CTS — global brand since 1928, NZ team 25 years. Visa-free for Kiwi passports.',
  h1: 'China Tours from New Zealand',
  heroSubtitle: '4 Kiwi-Led China itineraries 2026-27 · NZD $3,399-7,999 · Auckland-based · Visa-free for NZ passports',
  introText:
    'CTS is backed by China Travel Service — the pioneering China travel brand established in 1928 — with our New Zealand operations running Kiwi-led China tours for 25 years. We understand what Kiwis love about travel: authenticity, value, and expert guidance. Our China tours are designed for New Zealand visitors with direct return international flights from Auckland (AKL) — the only NZ airport with direct service to mainland China — transparent NZD pricing, and help with China entry rules including the current visa-free window for NZ ordinary passport holders (see our guide for eligibility and what to carry). If you are based in Wellington, Christchurch or regional New Zealand, our team arranges a connecting domestic flight to Auckland for the international departure; the connecting leg is quoted separately at additional cost on top of the headline tour price.\n\n' +
    'Whether you want a first-time highlights loop (Beijing, Xi\'an, Shanghai), a deeper regional journey (Yunnan, the Silk Road, or the Yangtze), or a short stopover bolted onto business travel, our Auckland-based consultants quote in NZD, explain what is included, and stay with you from enquiry to touchdown back home.',
  faqs: [
    {
      question: 'How do I book a China tour from New Zealand?',
      answer: 'Booking is simple: browse our China tour packages online, then contact our Auckland-based consultants via phone or enquiry form. We quote in NZD, explain inclusions, and handle all bookings — flights, hotels, guides, and visas where required. Most bookings are confirmed within 48 hours.'
    },
    {
      question: 'Do New Zealand citizens need a visa for China?',
      answer: 'No visa required for most NZ travellers. New Zealand ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism, currently valid until 31 December 2026. Bring your valid passport, return flight confirmation, and accommodation details. See our full NZ China visa guide for conditions and updates.'
    },
    {
      question: 'What flights go from New Zealand to China?',
      answer: 'Direct flights from Auckland (AKL) to Shanghai (PVG) take approximately 12–13 hours. Flights to Beijing (PEK) are also available, sometimes with a short connection. Auckland is the only New Zealand airport with direct flights to mainland China — all CTS tour package prices include the return international airfares from AKL. If you are based in Wellington, Christchurch, Dunedin or regional NZ, our consultants arrange a connecting domestic flight to Auckland for an additional fee, quoted separately based on your departure city and travel dates.'
    },
    {
      question: 'How long is the flight from Auckland to Beijing or Shanghai?',
      answer: 'Auckland to Shanghai is approximately 12–13 hours direct. Auckland to Beijing is similar, around 12–14 hours depending on routing. CTS arranges the most convenient connections so your total travel time is minimised.'
    },
    {
      question: 'Can I pay for China tours in New Zealand dollars?',
      answer: 'Yes. All CTS tour prices are quoted and paid in NZD. There are no hidden exchange rate markups — what you see is what you pay. Our Auckland team handles all currency conversion for in-China costs including hotels, guides, and domestic transport.'
    },
    {
      question: 'What are the most popular China tours for New Zealand travellers?',
      answer: 'Our four flagship China tours for NZ travellers are: Tale of Two Cities (Beijing + Xi\'an, 10 days, from NZD $3,480), Best of China (15 days covering Beijing, Xi\'an, Shanghai, Guilin, from NZD $3,880), Shanghai & Surroundings (10 days in Shanghai, Suzhou, Wuxi, Hangzhou, from NZD $3,399), and Silk Road Discovery (18 days through Xi\'an, Dunhuang, Turpan, Urumqi, from NZD $7,999). All include return flights from Auckland.'
    },
    {
      question: 'Is it safe to travel from New Zealand to China?',
      answer: 'Yes — China is a well-developed and safe travel destination. Violent crime rates are very low, public transport is modern and reliable, and our tours include English-speaking local guides who handle all logistics. For New Zealand travellers, the main considerations are checking the latest visa-free entry conditions before booking and arranging comprehensive travel insurance (not included in tour price but strongly recommended).'
    },
    {
      question: 'When is the best time to travel from New Zealand to China?',
      answer: 'September to early November (autumn) and March to May (spring) are the most comfortable months for Kiwi travellers — mild temperatures, lower humidity, and clear skies. October is widely considered the single best month. Avoid Chinese Golden Week (1–7 October) and Chinese New Year (late January / early February) if you prefer fewer crowds. June to August is hot and humid in most regions.'
    },
    {
      question: 'Why book a China tour through a New Zealand specialist instead of online?',
      answer: 'CTS Tours NZ is the Auckland-based arm of China Travel Service — a pioneering China travel brand founded in 1928 — with our NZ operations running Kiwi-led tours for 25 years. Direct China operations means our team in Auckland talks to our team in China, not a reseller chain. You get NZD pricing with no hidden FX markups, TAANZ-bonded payment protection, an Auckland contact who understands NZ school holidays and departure preferences, and on-the-ground support throughout your trip. We are not a generic online travel agency.'
    },
    {
      question: 'Can CTS arrange a private or tailor-made China tour from New Zealand?',
      answer: 'Yes. While our published itineraries cover most travellers\' needs, we also design fully custom China tours for couples, families, multi-generational groups, and special interests (photography, history, food). Tailor-made trips use the same CTS network — direct China operations, English-speaking guides, NZD pricing — but with itinerary pace, hotels, and inclusions tuned to your preferences. Contact our Auckland team for a tailored quote.'
    },
    {
      question: 'Is it cheaper to book a China tour direct from New Zealand or through an Australian operator?',
      answer: 'For most NZ travellers, booking direct from a New Zealand specialist like CTS Tours NZ ends up cheaper and simpler. Reasons: (1) NZD pricing with no AUD-NZD FX conversion markup (typically 3-5% savings), (2) no AU-NZ flight repositioning required because Auckland already has direct flights to Shanghai and Beijing, (3) TAANZ bonding gives NZ-specific payment protection, and (4) NZ school holidays and departure date preferences are understood without explanation. Australian operators can be excellent for AU travellers but rarely structure deals around the Auckland direct-flight advantage.'
    },
    {
      question: 'What is included vs not included in a CTS China tour package?',
      answer: 'Included in every CTS published tour price: return international flights from Auckland (AKL), all hotels (3-4 star Discovery / 4-5 star Signature), all in-China internal flights and high-speed rail transfers, English-speaking local guides in each city, daily breakfast and most lunches, all entrance fees per itinerary, and emergency support from the Auckland office during your trip. Not included (budget separately): travel insurance (strongly recommended), drinks beyond meals, optional shore excursions, tips for guides and drivers (typically NZD 10-20 per day per person), personal expenses, and connecting domestic flights from Wellington/Christchurch/regional NZ to Auckland (quoted separately).'
    },
    {
      question: 'How does CTS Tours compare to Wendy Wu Tours or Intrepid for China from New Zealand?',
      answer: 'All three are reputable, but they target different traveller types. CTS Tours NZ is Auckland-based with direct China operations (CTS group founded 1928, NZ team 25 years) — strongest for travellers wanting deep China specialisation, NZD pricing, and Auckland office contact. Wendy Wu Tours is a generalist Asia operator with broader portfolio but typically AUD-priced for NZ market. Intrepid is small-group adventure-focused, generally suited to younger or active travellers comfortable with shared dorm-style options. If you want a China-focused tour with Kiwi-led booking and direct China supplier relationships, CTS is purpose-built for that. For Asia-wide comparison shopping or backpacker-style group adventure, the other two are reasonable alternatives.'
    },
    {
      question: 'What is the difference between Discovery and Signature tour collections?',
      answer: 'Discovery (from NZD $3,399) uses 3-4 star city centre hotels, larger group sizes (up to 24), and a more active sightseeing pace — great value for first-time visitors. Signature (from NZD $4,800) uses 4-5 star premium hotels, smaller groups (max 16), more relaxed pacing with built-in free time and exclusive experiences (e.g. private hutong dining, after-hours museum visits). Both include all the headline sights, English-speaking guides, and CTS Auckland support. Choose Signature if you value smaller groups and premium hotels; Discovery if you want excellent value and don\'t mind a faster pace.'
    },
    {
      question: 'What travel insurance do New Zealanders need for a China tour?',
      answer: 'Travel insurance is not included in CTS tour packages but is strongly recommended. Look for a policy that covers: medical emergencies in mainland China (international hospitals in major cities accept Western insurance), trip cancellation and curtailment, lost luggage, and (optional but recommended for older travellers) pre-existing condition cover. Most NZ insurers (Southern Cross, AA Insurance, Cover-More) offer suitable China travel policies. Premiums for a 2-week China trip from NZ typically run NZD $80-200 per person depending on age and cover level. Our Auckland team can recommend brokers but does not sell insurance directly.'
    }
  ]
};

export const chinaToursFromAucklandMeta: SeoPageMeta = {
  slug: 'china-tours-from-auckland',
  title: 'China Tours from Auckland | Direct Flights | CTS Tours',
  description: 'China tours departing Auckland (AKL). Non-stop flights to Shanghai or Beijing. Kiwi travellers supported by our NZ-based consultants.',
  h1: 'China Tours from Auckland',
  heroSubtitle: 'Non-stop from Auckland Airport. Local Kiwi expertise. Seamless journey.',
  introText: 'For Aucklanders, departing direct from Auckland Airport (AKL) means less travel hassle and more trip enjoyment. CTS coordinates non-stop flights from AKL to Shanghai or Beijing on all our China tours. With our local Auckland office and NZ-based team, you get Kiwi hospitality and support every step of the way.',
  faqs: [
    {
      question: 'Do all CTS China tours depart from Auckland?',
      answer: 'Our published tour prices include the return international airfares from Auckland (AKL), the only New Zealand airport with direct flights to Shanghai and Beijing. If you are based elsewhere in New Zealand (Wellington, Christchurch, Dunedin, regional NZ), CTS arranges a connecting domestic flight to Auckland for the international departure; this connecting leg is quoted separately at additional cost based on your home city and travel dates, and is not included in the headline tour price.'
    },
    {
      question: 'How early should I arrive at Auckland Airport?',
      answer: 'For international flights, arrive 3 hours before departure. This allows time for check-in (1 hour), security (30 min), and any queue delays. Your CTS consultant will send a detailed timeline before your departure. Many clients also arrive early to relax before the long flight.'
    },
    {
      question: 'Can you arrange airport transfers in Auckland?',
      answer: 'Yes! CTS can arrange pre-tour transport from your home to Auckland Airport, or return transport from AKL to home. We offer private car, shared shuttle, or public transport options at various price points. Discuss with your consultant when booking.'
    },
    {
      question: 'Is there a CTS office in Auckland I can visit?',
      answer: 'Yes! CTS has a local Auckland office where you can meet consultants face-to-face to discuss your China tour, ask questions, and finalize bookings. Many Aucklanders prefer meeting in person to plan their itinerary. Contact us for office hours and location.'
    },
    {
      question: 'What if I live outside Auckland?',
      answer: 'CTS serves all New Zealand. If you are based in Wellington, Christchurch, Dunedin or elsewhere, our team arranges a connecting domestic flight to Auckland to meet your outbound international flight — the domestic connecting leg is quoted separately at additional cost and is not included in the headline tour price. We also offer video consultations and phone support. You are never far from expert China travel advice!'
    }
  ]
};

// ===== Guide pages =====

export const bestTimeToVisitChinaMeta: SeoPageMeta = {
  slug: 'best-time-to-visit-china',
  title: 'Best Time to Visit China | NZ Seasonal Guide | CTS Tours',
  description: 'When to visit China? Detailed season guide covering weather, crowds, prices for all major regions. Plan your ideal trip.',
  h1: 'Best Time to Visit China: Month-by-Month Guide',
  heroSubtitle: 'Perfect your China trip timing. Every region has its ideal season.',
  introText: 'China\'s vast landscape spans multiple climate zones. The best time to visit depends on your destination and travel style. Spring and autumn are universally recommended, but each month offers unique experiences. This guide breaks down weather, crowds, prices, and festivities by region, so you can choose the perfect timing for your China adventure.',
  faqs: [
    {
      question: 'What is the single best time to visit China?',
      answer: 'October is widely considered the ideal month—mild temperatures nationwide, clear skies, manageable crowds (autumn school holidays start late October), and excellent conditions for sightseeing. September and late April/early May are also excellent. Summer (June-August) is hot and crowded; winter (December-February) is cold but beautiful with clear skies.'
    },
    {
      question: 'Should I visit during Chinese holidays?',
      answer: 'Major holidays (Chinese New Year, late January/early February; May 1 Golden Week; October Golden Week) see massive domestic tourism, crowding, and higher prices. If possible, avoid these 1-2 week periods. However, Chinese New Year offers unique festive experiences and special tours if you plan accordingly.'
    },
    {
      question: 'Is it worth visiting in winter?',
      answer: 'Yes! Winter (December-February) offers clear, crisp weather ideal for photography, fewer foreign tourists, and lower prices. Northern China can be very cold (Beijing averages -5°C), but the Forbidden City and Great Wall are stunning under blue skies. Southern regions (Yunnan, Guilin) have mild winters. Pack layers!'
    },
    {
      question: 'Is summer too hot to visit China?',
      answer: 'Summer (June-August) is hot and humid, especially in central/southern China. However, it\'s ideal for high-altitude trekking (Yunnan, Tibet), swimming in Yangshuo, and experiencing vibrant nightlife. Peak tourist crowds and high prices are downsides. If you visit summer, plan morning sightseeing and afternoon rest to avoid heat.'
    }
  ]
};

export const chinaVisaGuideMeta: SeoPageMeta = {
  slug: 'china-visa-guide-for-new-zealanders',
  title: 'China Visa-Free for New Zealand Citizens | CTS Tours',
  description: 'New Zealand citizens can visit China visa-free for up to 30 days (valid until 31 Dec 2026). Multiple entries allowed, no entry limit. Official requirements, travel tips, and what to know.',
  h1: 'China Visa-Free for New Zealand Citizens',
  heroSubtitle: 'No visa required for 30-day stays. Multiple entries allowed. Valid until 31 December 2026.',
  introText: 'Great news for New Zealand travellers! NZ passport holders can enter mainland China visa-free for up to 30 days — for tourism, business, family visits, exchange, and transit. The policy is officially confirmed valid until 31 December 2026, with no limit on the number of entries. China\'s unilateral visa-free policy now covers 50 countries, reconfirmed by China\'s Ministry of Foreign Affairs in May 2026. No visa application needed — just your valid NZ passport and travel documents. This guide covers entry requirements, eligible purposes, and answers to the most common questions.',
  faqs: [
    {
      question: 'Do I need a visa to visit China as a New Zealand citizen?',
      answer: 'No! New Zealand citizens can enter China visa-free for up to 30 days for tourism, business, family visits, exchange, and transit. This applies to regular passport holders and is valid until 31 December 2026. Simply show your valid passport at immigration—no visa application needed. This makes booking a CTS tour easier and faster than ever!'
    },
    {
      question: 'How long can I stay in China visa-free?',
      answer: 'You can stay up to 30 consecutive calendar days per visit. The 30-day count starts from the day after your arrival date — so if you arrive on 1 June, your stay is valid until 1 July inclusive. There is currently no limit on the number of times you can enter China visa-free, as long as each individual stay does not exceed 30 days. Most CTS tours run 7–17 days, comfortably within the limit.'
    },
    {
      question: 'When does the visa-free policy end?',
      answer: 'The current visa-free policy for New Zealand citizens is valid until 31 December 2026. After that date, the policy may be extended, modified, or end—requiring a return to traditional visa applications. We recommend checking for updates closer to that date. For now, you\'re in a fortunate window to visit China without visa hassles!'
    },
    {
      question: 'What documents do I need to enter China visa-free?',
      answer: 'You\'ll need: (1) Valid New Zealand passport (recommended 6+ months validity), (2) Return/onward flight ticket, (3) Proof of accommodation (hotel booking, CTS tour itinerary, etc.), (4) Sufficient funds for your stay. You don\'t need a visa form, tourist visa application, or invitation letter. CTS will provide all necessary itinerary and booking confirmations when you reserve your tour.'
    },
    {
      question: 'Can I visit China multiple times visa-free?',
      answer: 'Yes! There is currently no restriction on the number of times you can enter China under the visa-free policy, and no required interval between visits. Each stay simply must not exceed 30 days. If you need to stay longer than 30 consecutive days, you have two options: apply for an L-Visa before departure, or — if you\'re already in China — apply to the local Public Security Bureau exit-entry administration for a stay extension.'
    },
    {
      question: 'Does visa-free entry apply to all entry points?',
      answer: 'Yes. China\'s visa-free policy applies to all sea, land, and air ports open to foreign nationals. Whether you fly into Beijing, Shanghai, Guangzhou, Chengdu, Xi\'an or Chongqing, or arrive by sea or overland, the same 30-day visa-free entry applies. You can also travel to China from any third country — you do not need to fly directly from New Zealand.'
    },
    {
      question: 'I\'m a New Zealand citizen but hold dual nationality. Can I still use visa-free entry?',
      answer: 'You must enter China using your New Zealand passport to qualify for visa-free entry. If you hold a second passport (Australian, UK, etc.), using that passport requires a traditional visa. Always carry your NZ passport when visiting China to benefit from the visa-free policy.'
    },
    {
      question: 'What activities are covered — and what still requires a visa?',
      answer: 'Visa-free entry covers: tourism, business, family and friends visits, exchange activities, transit, sports competitions, conferences and exhibitions, and study tours (summer/winter camps) — as long as the stay is 30 days or fewer. It does NOT apply to paid employment, formal study enrolment, or journalism. If you\'re being employed in China, you need a Z-Visa (Work); if you\'re enrolling in a Chinese institution, you need an X-Visa (Study). Contact the Chinese Embassy in Wellington for the appropriate visa category.'
    },
    {
      question: 'Do I need to notify the Chinese Embassy before travelling visa-free?',
      answer: 'No pre-declaration or advance notification to the Chinese Embassy or consulate is required. Simply arrive at the port of entry with your valid New Zealand passport and supporting documents (return flight, accommodation booking). Chinese border inspection will verify your documents on arrival.'
    }
  ]
};

// ===== New city hub pages =====

export const chongqingToursMeta: CityHubMeta = {
  slug: 'chongqing-tours',
  cityName: 'Chongqing',
  title: 'Chongqing Tours from New Zealand | Three Gorges | CTS Tours',
  description: 'Explore Chongqing with CTS Tours. Sail the Yangtze Three Gorges, discover the mountain megacity, savour authentic hot pot, and visit UNESCO-listed Dazu Rock Carvings.',
  h1: 'Chongqing Tours from New Zealand',
  heroSubtitle: 'Sail the Yangtze Three Gorges. Explore China\'s mountain megacity. Savour authentic Chongqing hot pot.',
  introText: 'Chongqing is unlike any other Chinese city — a sprawling mountain metropolis perched above the confluence of the Yangtze and Jialing rivers. Famous as the gateway to the legendary Three Gorges, this UNESCO-rich city rewards visitors with dramatic river scenery, the ancient Dazu Rock Carvings, multi-level cable cars threading between skyscrapers, and one of China\'s most celebrated cuisine traditions: the fiery original Chongqing hot pot. Our Chongqing tours combine the city experience with unforgettable Yangtze cruises and scenic highlights of the surrounding Sichuan highlands.',
  searchTerms: ['chongqing', 'three gorges', 'yangtze', 'dazu'],
  highlights: [
    'Cruise the legendary Three Gorges on the Yangtze River',
    'Explore the ancient Ciqikou Porcelain Village (Ming Dynasty)',
    'Ride the Yangtze River cable car over steep mountain terrain',
    'Visit the UNESCO-listed Dazu Rock Carvings',
    'Savour the original Chongqing hot pot — spicier than all imitations',
    'Explore Hongya Cave, a multi-storey riverside entertainment complex'
  ],
  bestTimeToVisit: 'Spring (March–May) and autumn (September–October) are ideal — mild temperatures and clear river views. Summer is hot and humid. Winter is cool and often misty, which can add atmosphere to the gorges but reduces visibility.',
  faqs: [
    {
      question: 'What is the Three Gorges cruise like?',
      answer: 'The Three Gorges cruise sails along the Yangtze through Qutang, Wu, and Xiling gorges — some of China\'s most dramatic river scenery. Cruise ships range from comfortable day boats to multi-day luxury vessels with cabins, restaurants, and scenic viewing decks. CTS arranges the right vessel for your itinerary, typically combined with Chongqing city sightseeing.'
    },
    {
      question: 'What are the Dazu Rock Carvings?',
      answer: 'The Dazu Rock Carvings are a UNESCO World Heritage Site featuring over 50,000 Buddhist, Taoist, and Confucian sculptures carved into cliffsides between the 9th and 13th centuries. The Baodingshan and Beishan sites are the most impressive, with detailed narrative reliefs up to 31 metres tall. They\'re a highlight for any visitor to Chongqing.'
    },
    {
      question: 'Is Chongqing hot pot different from Sichuan hot pot?',
      answer: 'Yes — Chongqing hot pot is widely considered the original version and is known for being intensely spicy and numbing (má là) with a tallow-based broth. Sichuan hot pot in other cities has often been adapted to be milder. In Chongqing, restaurants use traditional recipes dating back centuries. CTS can recommend the best local spots and advise on heat levels for your group.'
    },
    {
      question: 'Can I combine Chongqing with a Chengdu tour?',
      answer: 'Absolutely — Chongqing and Chengdu are just 2 hours apart by high-speed train, making them an ideal pairing. A popular itinerary combines 2 days in Chengdu (pandas, temples) with 3 days in Chongqing (city, Three Gorges cruise). CTS offers combined tours covering both cities comfortably.'
    }
  ]
};

export const hangzhouToursMeta: CityHubMeta = {
  slug: 'hangzhou-tours',
  cityName: 'Hangzhou',
  title: 'Hangzhou Tours from New Zealand | West Lake | CTS Tours',
  description: 'Explore Hangzhou with CTS Tours. Stroll scenic West Lake, sip Longjing Dragon Well tea, explore silk museums and classical gardens. Day tours & multi-day packages available.',
  h1: 'Hangzhou Tours from New Zealand',
  heroSubtitle: 'Stroll scenic West Lake. Sip Longjing Dragon Well tea. Discover classical gardens and silk heritage.',
  introText: 'Hangzhou, the capital of Zhejiang Province, has enchanted poets, emperors, and travellers for over a thousand years. Its centrepiece, West Lake (Xihu), is a UNESCO World Heritage landscape of willow-lined causeways, pagodas, and mist-shrouded hills. Beyond the lake, Hangzhou is China\'s silk capital and home to the world\'s finest Longjing (Dragon Well) green tea, grown on terraced hillsides just minutes from the city. Most of our Hangzhou tours are combined with Shanghai or Suzhou as part of a wider Jiangnan (waterways region) itinerary.',
  searchTerms: ['hangzhou', 'west lake', 'longjing', 'xihu', 'suzhou', 'zhujiajiao'],
  highlights: [
    'Stroll the UNESCO-listed West Lake causeways at dawn or dusk',
    'Visit a traditional Longjing (Dragon Well) tea plantation and taste the harvest',
    'Explore the China National Silk Museum — the world\'s largest silk collection',
    'Walk the Hefang Street historic district with Qing Dynasty architecture',
    'Cruise West Lake by private boat to Six Harmonies Pagoda',
    'Day trip to Suzhou\'s classical gardens or Wuzhen water town'
  ],
  bestTimeToVisit: 'Spring (March–May) is peak season — West Lake blooms with lotus flowers and the new Longjing tea harvest begins. Autumn (September–October) offers clear skies and golden hillsides. Summer is hot and humid; winter is cool and atmospheric around the lake.',
  faqs: [
    {
      question: 'What is West Lake (Xihu)?',
      answer: 'West Lake is a UNESCO World Heritage Site and one of China\'s most celebrated landscapes. The lake covers 6.5 sq km and is surrounded by lush hills, ancient temples, and causeways. Famous views include the Broken Bridge, Three Pools Mirroring the Moon, and Leifeng Pagoda. The lake has inspired Chinese poetry and art for over 1,000 years.'
    },
    {
      question: 'What is Longjing (Dragon Well) tea?',
      answer: 'Longjing is China\'s most prestigious green tea, grown on terraced hillsides around the Longjing Village area southwest of Hangzhou. The flat, jade-green leaves are hand-picked and pan-fried to preserve their delicate flavour. Visiting a tea plantation during the spring harvest (late March–early May) is a highlight. CTS includes tea tastings in relevant itineraries.'
    },
    {
      question: 'How far is Hangzhou from Shanghai?',
      answer: 'Hangzhou is approximately 175 km from Shanghai — about 45 minutes by high-speed train. It\'s an ideal day trip from Shanghai, or a 2-night stop as part of a wider Jiangnan tour. CTS offers Shanghai-Hangzhou-Suzhou combinations that cover the best of China\'s waterways region in 4–5 days.'
    },
    {
      question: 'Is Hangzhou good for a stopover?',
      answer: 'Yes! Even a single full day in Hangzhou allows you to visit West Lake, try Longjing tea, and stroll Hefang Street. For a more relaxed experience, 2 nights is ideal. CTS\'s Stopover range includes short Hangzhou city breaks that pair naturally with Shanghai departures.'
    }
  ]
};

export const suzhouToursMeta: CityHubMeta = {
  slug: 'suzhou-tours',
  cityName: 'Suzhou',
  title: 'Suzhou Tours NZ | Classical Gardens | CTS Tours',
  description: 'Explore Suzhou with CTS Tours. Wander UNESCO-listed classical gardens, cruise ancient canals, and experience China\'s silk capital. Day tours & multi-day packages from NZD $1,356.',
  h1: 'Suzhou Tours from New Zealand',
  heroSubtitle: 'Wander UNESCO-listed classical gardens. Cruise ancient canals. Experience China\'s silk capital.',
  introText: 'Suzhou, just 30 minutes by high-speed train from Shanghai, is one of China\'s most refined destinations. Known as the "Venice of the East," its network of canals, hump-backed bridges, and classical gardens has earned it multiple UNESCO World Heritage listings. The city\'s gardens — including the Humble Administrator\'s Garden and Master of Nets Garden — are masterpieces of Chinese landscape design, combining rockeries, pavilions, ponds, and plants in precise harmony. Suzhou is also famous for its silk embroidery and brocade traditions, both of which can be explored at excellent local museums.',
  searchTerms: ['suzhou', 'classical gardens', 'canal', 'silk', 'humble administrator', 'tiger hill'],
  highlights: [
    'Explore the Humble Administrator\'s Garden — Suzhou\'s largest UNESCO-listed classical garden',
    'Stroll the ancient canals of Pingjiang Road at dusk',
    'Visit the Suzhou Silk Museum to learn about 2,000 years of silk craftsmanship',
    'Admire Tiger Hill, a 2,500-year-old pagoda leaning at 3 degrees',
    'Cruise by gondola through narrow waterways between Ming Dynasty houses',
    'Day trip to nearby Tongli or Zhouzhuang water town villages'
  ],
  bestTimeToVisit: 'Spring (March–May) and autumn (September–October) are ideal — comfortable temperatures and gardens in bloom. Summer is hot and humid. Winter is cool and quiet, perfect for exploring gardens without crowds.',
  faqs: [
    {
      question: 'What are Suzhou\'s classical gardens?',
      answer: 'Suzhou has nine UNESCO-listed classical gardens, each created during the Ming or Qing dynasties as private retreats for scholars and officials. The most famous are the Humble Administrator\'s Garden (Zhuozheng Yuan), Lion Grove Garden, and Lingering Garden. Each is designed to evoke mountain landscapes and philosophical ideals through careful arrangement of water, rocks, plants, and architecture.'
    },
    {
      question: 'How do I get from Shanghai to Suzhou?',
      answer: 'High-speed trains run from Shanghai Hongqiao or Shanghai station to Suzhou in 25–35 minutes. CTS arranges all transport as part of your tour. Suzhou makes an excellent day trip from Shanghai, or a 1–2 night stop on a wider Jiangnan itinerary.'
    },
    {
      question: 'What is Pingjiang Road?',
      answer: 'Pingjiang Road is one of Suzhou\'s best-preserved ancient streets, running alongside a canal for nearly a kilometre. Lined with teahouses, silk shops, local snack stalls, and traditional architecture, it\'s the most atmospheric area of the old city to explore on foot. Evening is particularly lovely when lanterns reflect on the water.'
    },
    {
      question: 'Can I combine Suzhou with Hangzhou?',
      answer: 'Yes — Suzhou and Hangzhou are both served by high-speed trains and are often combined in 4–5 day Jiangnan itineraries alongside Shanghai. CTS\'s Shanghai & Surroundings Discovery tour covers Shanghai, Suzhou\'s gardens, and the Hangzhou West Lake area. Contact us to build a custom Jiangnan itinerary.'
    }
  ]
};

export const chinaToursFromAustraliaMeta: SeoPageMeta = {
  slug: 'china-tours-from-australia',
  title: 'China Tours from Australia | Expert-Led | CTS Tours',
  description: 'China tours from Australia designed by specialists with 90+ years of experience. Departing Sydney, Melbourne & Brisbane. Visa-free for Australian passports. Expert guides, small groups. Book with CTS Tours.',
  h1: 'China Tours from Australia',
  heroSubtitle: 'Departing Sydney · Melbourne · Brisbane. Visa-free for AU passports. Expert-guided small groups.',
  introText:
    'CTS has been running China tours for nearly a century. For Australian travellers, we offer direct departures from Sydney (SYD), Melbourne (MEL), and Brisbane (BNE), with all logistics handled by our China specialists. Australian passport holders can enter mainland China visa-free for up to 30 days for tourism — making now an ideal time to go.\n\n' +
    'Whether you want a first-time China highlights loop covering Beijing, Xi\'an, and Shanghai, a Yangtze cruise with Chongqing and Chengdu, or a deeper journey through Yunnan or the Silk Road, our consultants tailor itineraries to your schedule and budget. All prices are quoted in AUD.',
  faqs: [
    {
      question: 'Do Australian citizens need a visa for China?',
      answer: 'No visa is required for most Australian travellers. Australian ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism. Bring your valid Australian passport, return flight confirmation, and hotel booking details. Check the Australian Department of Foreign Affairs for the latest conditions before travelling.'
    },
    {
      question: 'Which Australian cities have direct flights to China?',
      answer: 'Sydney (SYD) has the most direct flights to Shanghai (PVG) and Beijing (PEK), with flight times of approximately 11–12 hours. Melbourne (MEL) and Brisbane (BNE) also have regular services, sometimes with a short connection. CTS arranges the most convenient routing from your nearest Australian airport.'
    },
    {
      question: 'How long is the flight from Sydney to Beijing or Shanghai?',
      answer: 'Sydney to Shanghai is approximately 11–12 hours direct. Sydney to Beijing is similar, around 11–13 hours depending on routing. From Melbourne and Brisbane, add approximately 1–2 hours for connections if required.'
    },
    {
      question: 'Are CTS China tour prices quoted in Australian dollars?',
      answer: 'Yes. For Australian travellers, all prices are quoted in AUD with no hidden currency markups. Your consultant will provide a full cost breakdown covering international flights, accommodation, guided tours, and included meals before you commit to any booking.'
    },
    {
      question: 'What is the best China tour for first-time Australian visitors?',
      answer: 'The most popular first-time itinerary combines Beijing (Great Wall, Forbidden City, Temple of Heaven), Xi\'an (Terracotta Warriors, city walls), and Shanghai (Bund, Yu Garden, French Concession) — typically 10–14 days. For something more adventurous, our Fire & Fuzz tour combines Chongqing and Chengdu with giant pandas and the famous Liziba monorail-through-a-building.'
    },
    {
      question: 'How far in advance should I book a China tour from Australia?',
      answer: 'We recommend booking at least 8–12 weeks in advance to secure preferred departure dates, group availability, and optimal flight pricing. For peak travel periods (October–November, April–May), book 4–6 months ahead. Contact our team for current availability.'
    },
  ]
};

// ===== Fire & Fuzz SEO cluster — attraction pages =====

export const chengduPandaSanctuaryMeta: SeoPageMeta = {
  slug: 'chengdu-panda-sanctuary',
  title: 'Chengdu Panda Sanctuary: Giant Panda Guide | CTS NZ',
  description: 'Visit the Chengdu Research Base of Giant Panda Breeding — home to 200+ giant pandas. Morning feeding visits, bamboo forests, red pandas. Part of CTS Tours\' Fire & Fuzz 10-day Chongqing & Chengdu tour from New Zealand. Visa-free entry for NZ passports.',
  h1: 'Chengdu Giant Panda Sanctuary: A Complete Guide for New Zealand Visitors',
  heroSubtitle: 'Home to 200+ giant and red pandas · Morning feeding visits · Included in Fire & Fuzz 10-day tour from NZ',
  introText:
    'The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is the world\'s leading giant panda conservation and breeding facility. Established in 1987 with just six rescued pandas, it has grown to house more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat in northern Chengdu.\n\nFor New Zealand travellers, a morning visit to the panda base is the single most emotionally resonant experience available in any China itinerary. Giant pandas are most active during their morning feeding session — typically between 8:00am and 10:00am — when they can be observed at close range eating bamboo, climbing, and interacting. After 10am, pandas retreat to shade and sleep for much of the day.\n\nCTS Tours includes a Day 7 morning visit to the panda base as part of the Fire & Fuzz 10-day Chongqing and Chengdu tour. All logistics are handled — transfers from central Chengdu, guide commentary, and entry fees are included in the tour price.',
  faqs: [
    {
      question: 'What is the Chengdu Panda Sanctuary?',
      answer: 'The Chengdu Research Base of Giant Panda Breeding (成都大熊猫繁育研究基地) is the world\'s leading giant panda conservation and breeding facility, established in 1987. Located in Chengdu, Sichuan Province, it is home to more than 200 giant pandas and red pandas across 3,500 acres of bamboo forest habitat. It is the best place in the world to see giant pandas up close in a naturalistic environment.'
    },
    {
      question: 'What time should I visit Chengdu Panda Base?',
      answer: 'Visit as early as possible — ideally by 8:00am. Giant pandas are most active during their morning feeding session, typically between 8:00am and 10:00am. After 10am, pandas often retreat to shade and sleep for much of the day. CTS Tours schedules the panda base visit first thing on Day 7 of the Fire & Fuzz itinerary specifically for this reason.'
    },
    {
      question: 'Can I hold a panda at Chengdu?',
      answer: 'Holding pandas has been discontinued at the Chengdu Research Base as part of their animal welfare policy. However, you can get very close to the pandas during morning feeding, and photography is permitted from designated viewing areas. The experience of watching pandas eat bamboo at arm\'s length is genuinely remarkable.'
    },
    {
      question: 'How do I get from Chongqing to Chengdu Panda Base?',
      answer: 'From Chongqing city, take a high-speed train to Chengdu (approximately 65–80 minutes). From central Chengdu, the panda base is accessible by Metro Line 3 (Panda Avenue station) in about 40 minutes. CTS Tours handles all transfers and logistics as part of the Fire & Fuzz itinerary — no individual bookings required.'
    },
    {
      question: 'Is a Chengdu panda visit included in CTS tours?',
      answer: 'Yes. The Chengdu Research Base of Giant Panda Breeding is included in CTS Tours\' Fire & Fuzz 10-day tour (Chongqing & Chengdu Discovery). Day 7 begins with a morning visit to the panda base, timed for the morning feeding session. The tour departs from New Zealand and covers all transport, accommodation, guided visits, and most meals.'
    },
    {
      question: 'Do New Zealand passport holders need a visa for China?',
      answer: 'No visa is currently required. New Zealand ordinary passport holders can enter mainland China visa-free for up to 30 days for tourism purposes. Bring your valid NZ passport, return flight confirmation, and hotel booking details. CTS Tours can advise on the latest entry requirements when you book.'
    }
  ]
};

export const lizibastationChongqingMeta: SeoPageMeta = {
  slug: 'liziba-station-chongqing',
  title: 'Liziba Station Chongqing: Train Through a Building | CTS',
  description: 'Liziba Station in Chongqing is the world\'s only monorail station built inside a residential tower — trains pass through the 6th floor of a 19-storey building. How to visit, best viewing spots, and how to include it in a Chongqing tour from New Zealand.',
  h1: 'Liziba Station, Chongqing: A Complete Visitor Guide',
  heroSubtitle: 'The world\'s only monorail station inside a residential building · Chongqing Rail Transit Line 2 · Free to watch from street level',
  introText:
    'Liziba Station (李子坝站) is one of the most extraordinary pieces of urban infrastructure on earth. A working monorail station on Chongqing Rail Transit Line 2, it is built directly inside the 6th to 8th floors of a 19-storey residential and commercial tower in Yuzhong District. Trains pass through the building multiple times per hour. Residents live above and below the tracks. The building was co-constructed with the station simultaneously in 2004 — not retrofitted — as an engineering solution to Chongqing\'s mountainous terrain and extreme urban density.\n\nThe station has become one of China\'s most viral travel images, featured by BBC, CNN, National Geographic, and virtually every major travel publication. Low-noise rubber-tyred trains mean residents are minimally disturbed — the system works, and has worked continuously since it opened in June 2005.\n\nFor visitors, the experience works on two levels: watching from the dedicated street-level observation area as trains glide through the building above, and riding Line 2 through the station to experience it from inside the train. CTS Tours includes a Liziba visit on Day 1 of the Fire & Fuzz Chongqing and Chengdu tour.',
  faqs: [
    {
      question: 'What is Liziba Station in Chongqing?',
      answer: 'Liziba Station (李子坝站) is a monorail station on Chongqing Rail Transit Line 2 that is built directly inside a 19-storey residential and commercial tower. Trains pass through the 6th to 8th floors of the building at regular intervals. It is the only station of its kind in the world, and has become one of Chongqing\'s most photographed attractions.'
    },
    {
      question: 'How do I get to Liziba Station Chongqing?',
      answer: 'Take Chongqing Rail Transit Line 2 directly to Liziba Station — the station itself is the attraction. Alternatively, walk to the observation area on the street below the station (Li Zi Ba Zheng Jie) to watch trains passing through the building from the outside. The street-level viewing area is free and clearly signposted.'
    },
    {
      question: 'Is Liziba Station free to visit?',
      answer: 'Watching from the street-level observation area is completely free. To ride the train through the building, you need a standard Chongqing Metro ticket (approximately CNY 4, roughly NZD 1). Most visitors combine both — watching from outside first, then riding through to experience it from inside the train.'
    },
    {
      question: 'Why was Liziba Station built inside a building?',
      answer: 'Chongqing is a mountainous city with extremely limited flat land. The station was co-constructed with the building simultaneously in 2004 — not retrofitted — as a solution to the city\'s terrain constraints and high urban density. The trains use rubber tyres rather than steel wheels, significantly reducing noise and vibration for building residents.'
    },
    {
      question: 'Is Liziba Station included in CTS tours?',
      answer: 'Yes. Liziba Station is one of the signature experiences in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 1 includes a guided visit to Liziba, with time to watch from the observation area and ride through on the train. The guide provides full context on why the station was built this way and what makes Chongqing\'s urban planning so distinctive.'
    },
    {
      question: 'What else is near Liziba Station?',
      answer: 'Ciqikou Ancient Town (磁器口), a well-preserved Song Dynasty commercial street known for Sichuan street food, is approximately a 20-minute walk from Liziba. Hongyadong, the iconic illuminated clifftop complex, is about 3km away and best visited after dark. Both are included in the Fire & Fuzz itinerary.'
    }
  ]
};

export const hongyadongChongqingMeta: SeoPageMeta = {
  slug: 'hongyadong-chongqing',
  title: 'Hongyadong Chongqing: Cliffside Night Market | CTS NZ',
  description: 'Hongyadong is Chongqing\'s most iconic landmark — an 11-storey stilted building complex glowing on the clifftop above the Jialing River. Best visited after dark. Complete visitor guide plus how to see it as part of a Chongqing tour from New Zealand.',
  h1: 'Hongyadong, Chongqing: Visitor Guide to the Clifftop Night Market',
  heroSubtitle: '11-storey cliffside complex · Best after dark · The defining image of Chongqing',
  introText:
    'Hongyadong (洪崖洞) is the image most people picture when they think of Chongqing. An 11-storey stilted building complex — built in the traditional diaojiaolou style — constructed directly into the clifftop above the Jialing River in Yuzhong District. After dark, the entire facade illuminates in red and gold, its layers of windows and balconies reflected in the river below.\n\nThe complex houses restaurants, bars, teahouses, and shops across multiple levels, connected by staircases and lifts. It is open all day, but a daytime visit misses the point entirely — the atmosphere that has made Hongyadong one of China\'s most shared travel images only exists after sunset.\n\nIn 2019, social media users noted the striking visual similarity between Hongyadong at night and the bathhouse in Studio Ghibli\'s Spirited Away. The comparison spread globally, and Chongqing\'s international visitor numbers accelerated sharply. CTS Tours includes a Hongyadong evening visit — followed by a Jialing River night cruise past the lit facade — on Day 4 of the Fire & Fuzz Chongqing and Chengdu tour.',
  faqs: [
    {
      question: 'What is Hongyadong in Chongqing?',
      answer: 'Hongyadong (洪崖洞) is an 11-storey stilted building complex built directly into the clifftop above the Jialing River in central Chongqing. It houses restaurants, bars, teahouses, and shops across multiple levels. The complex is famous for its spectacular night lighting — thousands of red and golden lights that illuminate the cliffside after dark, making it the most photographed landmark in Chongqing.'
    },
    {
      question: 'When is the best time to visit Hongyadong?',
      answer: 'After dark — ideally between 7:30pm and 10:00pm. The full lighting effect is only visible once the sun goes down, and the reflection in the Jialing River adds a second layer to the visual. The complex is open all day, but daytime visits miss the defining atmosphere entirely. CTS Tours schedules the Hongyadong visit on Day 4 evening.'
    },
    {
      question: 'Is Hongyadong like Spirited Away?',
      answer: 'Many visitors have noted the strong visual similarity between Hongyadong and the bathhouse in Studio Ghibli\'s Spirited Away — the layered glowing windows, the cliffside water setting, and the overall atmosphere. Studio Ghibli has never officially confirmed any connection, but the comparison went viral in 2019 and significantly boosted Chongqing\'s international tourism profile.'
    },
    {
      question: 'Where is the best viewpoint for Hongyadong?',
      answer: 'The best full-building view is from Qiansimen Bridge (千厮门大桥), approximately a 10-minute walk away. From the bridge you can see the entire 11-storey lit facade reflected in the Jialing River. The Jialing River night cruise (included in the Fire & Fuzz tour) passes directly in front of Hongyadong — the water view at night is the most dramatic angle.'
    },
    {
      question: 'Is Hongyadong included in CTS tours?',
      answer: 'Yes. Hongyadong is included in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 4 includes an evening visit to Hongyadong followed by a Jialing River night cruise. The full itinerary also includes Liziba Station, the Dazu Rock Carvings UNESCO site, and the Chengdu Panda Base.'
    },
    {
      question: 'Is entry to Hongyadong free?',
      answer: 'Entry to the Hongyadong complex is free. Individual restaurants, bars, and shops charge normal prices. The Jialing River night cruise, included in the Fire & Fuzz tour, is a separate ticketed experience — CTS handles all bookings as part of the package.'
    }
  ]
};

// ===== Export all page metadata =====

export const allSeoPages: Record<string, SeoPageMeta> = {
  'china-tours': chinaToursMeta,
  'beijing-tours': beijingToursMeta,
  'xian-tours': xianToursMeta,
  'shanghai-tours': shanghaiToursMeta,
  'chengdu-tours': chengduToursMeta,
  'guilin-tours': guilinToursMeta,
  'zhangjiajie-tours': zhangjiajieToursMetadata,
  'yunnan-tours': yunnanToursMeta,
  'chongqing-tours': chongqingToursMeta,
  'hangzhou-tours': hangzhouToursMeta,
  'suzhou-tours': suzhouToursMeta,
  'china-tours-from-new-zealand': chinaToursFromNZMeta,
  'china-tours-from-auckland': chinaToursFromAucklandMeta,
  'china-tours-from-australia': chinaToursFromAustraliaMeta,
  'best-time-to-visit-china': bestTimeToVisitChinaMeta,
  'china-visa-guide-for-new-zealanders': chinaVisaGuideMeta,
  'chengdu-panda-sanctuary': chengduPandaSanctuaryMeta,
  'liziba-station-chongqing': lizibastationChongqingMeta,
  'hongyadong-chongqing': hongyadongChongqingMeta,
};

export const getSeoPageMeta = (slug: string): SeoPageMeta | undefined => {
  return allSeoPages[slug];
};

export const getCityHubMeta = (slug: string): CityHubMeta | undefined => {
  const meta = allSeoPages[slug];
  return meta && 'searchTerms' in meta ? (meta as CityHubMeta) : undefined;
};
