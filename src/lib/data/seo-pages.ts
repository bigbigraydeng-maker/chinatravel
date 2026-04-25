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
  title: 'China Tour Packages & Holiday Deals from New Zealand | CTS Tours',
  description:
    'Explore our China tour packages and holiday deals for New Zealand travellers. Signature luxury, Discovery value & Stopover breaks. TAANZ-member, IATA-accredited China travel specialists. Transparent NZD pricing.',
  h1: 'China Tour Packages from New Zealand',
  heroSubtitle: 'Signature luxury · Discovery value · Stopover breaks. Tailored China holiday packages for Kiwis.',
  introText:
    'CTS Tours is New Zealand\'s dedicated China travel specialist — a TAANZ member and IATA-accredited agency with direct China operations since 1928. Our Auckland consultants design and operate every China holiday package in our collection.\n\nWe offer three distinct China tour packages to suit different budgets and travel styles: Signature (boutique 4–5 star hotels, small groups up to 16), Discovery (excellent-value escorted China travel packages with 3–4 star stays), and Stopover (2–4 day city breaks, perfect as an add-on to business travel or a taster before a longer trip).\n\nNew Zealand ordinary passport holders currently enjoy visa-free entry to China for up to 30 days — making booking a China holiday package faster and simpler than ever. Browse more than fifty curated itineraries below, or contact our Auckland team for a tailor-made China travel package.',
  faqs: [
    {
      question: 'What China tour packages does CTS offer?',
      answer: 'CTS offers three collections of China tour packages: Signature (premium 4–5 star hotels, small groups up to 16, bespoke itineraries), Discovery (great-value guided packages with comfortable 3–4 star hotels, ideal for first-time visitors), and Stopover (short 2–4 day city breaks). All packages include international flights from New Zealand, accommodation, guides, and most meals.'
    },
    {
      question: 'Do you offer China holiday packages from New Zealand?',
      answer: 'Yes. All our China holiday packages are priced in NZD and include return international airfares from Auckland, Wellington, or Christchurch. Our Auckland-based consultants handle everything — flights, hotels, China guides, domestic transport, and visa-free entry advice for NZ passport holders.'
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
  title: 'China Tours from New Zealand | Expert China Travel Specialists | CTS Tours',
  description: 'China tours from New Zealand designed by NZ-based China specialists. Departing Auckland, Wellington & Christchurch. Visa-free entry for NZ passports. NZD pricing. Book with CTS Tours — New Zealand\'s China travel experts since 1928.',
  h1: 'China Tours from New Zealand',
  heroSubtitle: 'Departing Auckland · Wellington · Christchurch. Visa-free for NZ passports. NZD pricing. Expert NZ team.',
  introText:
    'CTS has been taking New Zealand travellers to China for nearly 98 years. We understand what Kiwis love about travel: authenticity, value, and expert guidance. Our China tours are designed for New Zealand visitors with direct flights from Auckland, transparent NZD pricing, and help with China entry rules — including the current visa-free window for NZ ordinary passport holders (see our guide for eligibility and what to carry). Flights depart from Auckland (AKL), Wellington (WLG), and Christchurch (CHC), with connecting domestic legs arranged at no extra cost.\n\n' +
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
      answer: 'Direct flights from Auckland (AKL) to Shanghai (PVG) take approximately 12–13 hours. Flights to Beijing (PEK) are also available, sometimes with a short connection. All CTS China tour packages include return international airfares from your nearest New Zealand airport — Auckland, Wellington, or Christchurch.'
    },
    {
      question: 'How long is the flight from Auckland to Beijing or Shanghai?',
      answer: 'Auckland to Shanghai is approximately 12–13 hours direct. Auckland to Beijing is similar, around 12–14 hours depending on routing. CTS arranges the most convenient connections so your total travel time is minimised.'
    },
    {
      question: 'Can I pay for China tours in New Zealand dollars?',
      answer: 'Yes. All CTS tour prices are quoted and paid in NZD. There are no hidden exchange rate markups — what you see is what you pay. Our Auckland team handles all currency conversion for in-China costs including hotels, guides, and domestic transport.'
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
      answer: 'Our published tour prices include flights from New Zealand. Most departure flights are from Auckland (AKL), which offers direct flights to Shanghai and Beijing. If you\'re based elsewhere in New Zealand (Wellington, Christchurch, Dunedin), CTS can arrange connecting flights at no extra cost via Auckland. Contact us for provincial pricing.'
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
      answer: 'CTS serves all New Zealand. If you\'re based in Wellington, Christchurch, Dunedin, or elsewhere, we can arrange connecting flights to Auckland to meet your outbound international flight. We also offer video consultations and phone support. You\'re never far from expert China travel advice!'
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
  description: 'Great news! New Zealand citizens can now visit China visa-free for 30 days (until 31 Dec 2026). Requirements, travel tips, and what to know before you go.',
  h1: 'China Visa-Free for New Zealand Citizens',
  heroSubtitle: '✅ No visa required for 30-day stays. Valid until 31 December 2026. Simple entry requirements.',
  introText: 'Excellent news! As of 2024, New Zealand passport holders can enter mainland China visa-free for up to 30 days for tourism, business, family visits, or transit. This policy is valid until 31 December 2026. No visa application needed—just your passport and travel documents. This guide covers entry requirements, what to prepare, eligibility rules, and answers to common questions so you can travel with confidence.',
  faqs: [
    {
      question: 'Do I need a visa to visit China as a New Zealand citizen?',
      answer: 'No! New Zealand citizens can enter China visa-free for up to 30 days for tourism, business, family visits, exchange, and transit. This applies to regular passport holders and is valid until 31 December 2026. Simply show your valid passport at immigration—no visa application needed. This makes booking a CTS tour easier and faster than ever!'
    },
    {
      question: 'How long can I stay in China visa-free?',
      answer: 'You can stay for up to 30 days per visit, starting from your date of entry. This is sufficient for most CTS Signature and Discovery tours (typically 5-17 days). If your planned trip exceeds 30 days, or if you\'re traveling for work or study, you\'ll need to apply for a traditional visa (L-Visa, Z-Visa, etc.). For multi-country Asia trips, the 30-day allowance works perfectly.'
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
      question: 'Can I do a visa run or extend my stay beyond 30 days?',
      answer: 'The visa-free policy allows 30 days per entry. You cannot extend this period without leaving and re-entering China (which resets the 30-day counter). However, most CTS tours are 5-17 days, comfortably within the limit. If you need a longer stay, you must apply for a traditional L-Visa (tourist visa) before your trip.'
    },
    {
      question: 'Does visa-free entry apply to all entry points?',
      answer: 'Yes. Visa-free entry is available at all major entry ports: Beijing Capital, Shanghai Pudong/Hongqiao, Guangzhou, Chengdu, Xi\'an, Chongqing airports, and land borders. CTS will arrange your flights to these hubs, so immigration processing is seamless.'
    },
    {
      question: 'I\'m a New Zealand citizen but hold dual nationality. Can I still use visa-free entry?',
      answer: 'You must enter China using your New Zealand passport to qualify for visa-free entry. If you hold a second passport (Australian, UK, etc.), using that passport requires a traditional visa. Always carry your NZ passport when visiting China to benefit from the visa-free policy.'
    },
    {
      question: 'What if I\'m working or studying in China for more than 30 days?',
      answer: 'The visa-free policy applies only to tourism, business, family visits, and transit. If you\'re staying for work, study, or residence longer than 30 days, you must apply for a Z-Visa (work), X-Visa (study), or other appropriate visa before travel. Contact the Chinese Embassy in Wellington for specific requirements.'
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
  title: 'Suzhou Tours from New Zealand | Classical Gardens | CTS Tours',
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
  'best-time-to-visit-china': bestTimeToVisitChinaMeta,
  'china-visa-guide-for-new-zealanders': chinaVisaGuideMeta
};

export const getSeoPageMeta = (slug: string): SeoPageMeta | undefined => {
  return allSeoPages[slug];
};

export const getCityHubMeta = (slug: string): CityHubMeta | undefined => {
  const meta = allSeoPages[slug];
  return meta && 'searchTerms' in meta ? (meta as CityHubMeta) : undefined;
};
