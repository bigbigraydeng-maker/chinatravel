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
  title: 'China Tours from New Zealand | Signature, Discovery & Stopover | CTS Tours',
  description: 'Discover authentic China tours for New Zealand travellers. Signature luxury, Discovery value, and Stopover packages. 98 years of expertise.',
  h1: 'China Tours from New Zealand',
  heroSubtitle: 'Signature luxury, Discovery value, Stopover adventures',
  introText: 'Choose from 50+ carefully curated China tours across all three CTS collections. Whether you are seeking boutique 4-5 star experiences with small groups, reliable well-organised journeys at excellent value, or quick city stopovers, we have the perfect itinerary for you. Direct operations in China since 1928.',
  faqs: [
    {
      question: 'What is the difference between CTS China Signature, Discovery, and Stopover collections?',
      answer: 'Signature tours offer premium accommodations (4-5 star), small groups (max 16), locally-led experiences, and deep itinerary immersion designed by our China specialists. Discovery tours provide reliable, well-organised journeys with 3-4 star hotels at excellent value for first-time visitors. Stopover packages are short 2-4 day city breaks perfect for transit passengers or testing a destination before a full tour.'
    },
    {
      question: 'What is included in CTS China tours?',
      answer: 'Inclusions vary by tour but typically include: return international airfares from Auckland/New Zealand, domestic flights and train travel in China (often high-speed first class), hotel accommodation, English-speaking tour guides, all entrance fees listed in the itinerary, and meals as specified. Exclusions typically include visa fees, travel insurance, personal expenses, and tips.'
    },
    {
      question: 'How long are CTS China tours?',
      answer: 'Our China tours range from 2-4 day stopovers to comprehensive 17+ day Silk Road journeys. Most Signature and Discovery tours are 5-10 days, allowing deep exploration without excessive travel fatigue. See individual tour details for specific durations.'
    },
    {
      question: 'When is the best time to visit China?',
      answer: 'Spring (March-May) and autumn (September-November) offer mild weather and clear skies, making them ideal seasons for sightseeing. However, the best time depends on your specific destinations—northern cities peak in spring/autumn, southern regions suit winter escapes, and some areas (like Yunnan) are pleasant year-round. See our detailed guide for destination-specific recommendations.'
    },
    {
      question: 'Do I need a China visa?',
      answer: 'Great news! New Zealand citizens can now enter China visa-free for 30 days (valid until 31 December 2026). No visa application needed—just bring your valid passport, return flight proof, and hotel booking. This makes booking and travelling with CTS faster and easier than ever!'
    }
  ]
};

// ===== City hub pages =====

export const beijingToursMeta: CityHubMeta = {
  slug: 'beijing-tours',
  cityName: 'Beijing',
  title: 'Beijing Tours from New Zealand | Great Wall, Forbidden City, Summer Palace | CTS Tours',
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
  title: "Xi'an Tours from New Zealand | Terracotta Warriors, Ancient City Walls | CTS Tours",
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
  title: 'Shanghai Tours from New Zealand | The Bund, Yu Garden, Modern City | CTS Tours',
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
  title: 'Chengdu Tours from New Zealand | Giant Pandas, Ancient Temples | CTS Tours',
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
  title: 'Guilin Tours from New Zealand | Li River Cruise, Karst Mountains | CTS Tours',
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
  title: 'Zhangjiajie Tours from New Zealand | Avatar Mountains, Glass Walkway | CTS Tours',
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
  title: 'Yunnan Tours from New Zealand | Lijiang, Dali, Shangri-La, Kunming | CTS Tours',
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
  title: 'China Tours from New Zealand | Direct Flights, No Visa For 72 Hours | CTS Tours NZ',
  description: 'China tours tailored for New Zealand travellers. Direct flights from Auckland, visa guidance, NZ dollar pricing, local Aotearoa-based support since 1928.',
  h1: 'China Tours from New Zealand',
  heroSubtitle: 'Tailored for Kiwis. Direct flights from Auckland. Expert visa guidance. Local NZ support.',
  introText: 'CTS has been taking New Zealand travellers to China for nearly 98 years. We understand what Kiwis love about travel: authenticity, value, and expert guidance. Our China tours are specifically designed for New Zealand visitors with direct flights from Auckland, transparent NZD pricing, visa support, and consultation from our local Aotearoa team.',
  faqs: [
    {
      question: 'Do New Zealand citizens need a China visa?',
      answer: 'Yes, New Zealand citizens require a visa to visit China. However, some cities (Shanghai, Beijing, Chengdu) offer a 72-hour visa-free transit if you\'re connecting to another country. Most our tours require a standard L (tourist) visa, which takes 4-6 weeks to process. CTS provides visa guidance; however, you arrange your visa independently. Visa fees are not included in tour prices.'
    },
    {
      question: 'What is the flight duration from New Zealand to China?',
      answer: 'Direct flights from Auckland to Shanghai or Beijing take 12-13 hours. All CTS tours include return international airfares from your nearest New Zealand airport. We arrange the most convenient routing, and most international flights depart/arrive Auckland (AKL).'
    },
    {
      question: 'Do CTS prices include international airfares?',
      answer: 'Yes! All our published prices (e.g., "From NZD $4,850") include return international airfares from New Zealand, domestic flights/trains in China, accommodation, meals, guide services, and entrance fees as detailed in each tour itinerary. Exclusions (visa, travel insurance, tips) are clearly listed on each tour.'
    },
    {
      question: 'What is the time difference between New Zealand and China?',
      answer: 'China Standard Time (CST) is 6 hours behind New Zealand Standard Time (NZST) in winter, or 4 hours behind during NZ daylight saving. Jet lag is typically minimal given the relatively short flight and time difference. CTS provides jet lag advice and allows a day of rest upon arrival in China.'
    },
    {
      question: 'Can I pay in New Zealand dollars?',
      answer: 'Yes. All tour prices are quoted in NZD. You pay CTS (based in Aotearoa) in NZD. We handle currency conversion for payments to hotels, guides, and operators in China. This simplifies budgeting and avoids hidden exchange rate fluctuations.'
    }
  ]
};

export const chinaToursFromAucklandMeta: SeoPageMeta = {
  slug: 'china-tours-from-auckland',
  title: 'China Tours from Auckland | Flights from AKL, Local Support | CTS Tours',
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
  title: 'Best Time to Visit China | Month-by-Month Guide for New Zealand Travellers',
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
  title: 'China Visa-Free for New Zealand Citizens | 30 Days No Visa Required | CTS Tours',
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
