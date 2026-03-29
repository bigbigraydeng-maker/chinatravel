// CMS Data Model for Tours
// This can be replaced with Supabase integration later

export interface Tour {
  id: string;
  slug: string;
  destination: 'china' | 'japan' | 'vietnam';
  tier: 'signature' | 'discovery' | 'stopover';
  name: string; // Format: Destination + Tier + Descriptor
  title: string; // Full display title
  shortDescription: string;
  duration: string;
  price: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation?: string;
}

export interface Destination {
  id: string;
  slug: 'china' | 'japan' | 'vietnam';
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
  tiers: Tier[];
}

export interface Tier {
  id: string;
  slug: 'signature' | 'discovery' | 'stopover';
  name: string;
  description: string;
  features: string[];
  agentOneLiner: string;
  definingCharacteristics: string[];
}

// Destination Definitions
export const destinations: Destination[] = [
  {
    id: 'dest-1',
    slug: 'china',
    name: 'China',
    subtitle: 'The Middle Kingdom Awaits',
    description: 'Discover the ancient wonders and modern marvels of China. From the Great Wall to the Terracotta Warriors, experience a civilization that spans over 5,000 years.',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    highlights: [
      'Walk the Great Wall of China',
      'Explore the Forbidden City',
      'Meet the Terracotta Warriors',
      'Cruise the Yangtze River',
      'Experience Shanghai\'s skyline'
    ],
    metaTitle: 'China Tours | Signature & Discovery | CTS Tours',
    metaDescription: 'Explore China with CTS Tours. Signature luxury tours and discovery packages to Beijing, Shanghai, Xi\'an and beyond. 98 years of expertise.',
    tiers: [
      {
        id: 'tier-signature',
        slug: 'signature',
        name: 'Signature',
        description: 'CTS\'s premium programme for travellers who want depth over coverage. Boutique accommodation, smaller groups or private departures, and itineraries designed around access and immersion.',
        features: ['Maximum 16 passengers', '4-5 star hotels', 'Locally-led experiences', 'Baker Gu\'s oversight'],
        agentOneLiner: 'China Signature is their premium programme — boutique hotels, small groups, deeper experiences designed by their China specialist.',
        definingCharacteristics: [
          'Maximum 16 passengers (group), or private departure',
          '4-5 star hotels selected for character and location, not just star rating',
          'Locally-led experiences, off-circuit access, itinerary depth over destination count',
          'Baker Gu\'s direct product oversight',
          'Airline selection is product-specific, not a tier-level promise'
        ]
      },
      {
        id: 'tier-discovery',
        slug: 'discovery',
        name: 'Discovery',
        description: 'A well-organised, reliable experience at an accessible price point. Core itineraries covering essential destinations, designed for first-time visitors.',
        features: ['Standard group sizes', '3-4 star hotels', 'Must-see itineraries', 'Straightforward pricing'],
        agentOneLiner: 'China Discovery is their well-priced option — reliable, well-organised, great for a first trip to China.',
        definingCharacteristics: [
          'Standard group sizes',
          '3-4 star hotels, clean, well-located, comfortable',
          'Must-see itineraries — well-paced, well-guided, covering highlights',
          'Straightforward pricing that reflects value of experience',
          'Cost-effective carriers offering good value'
        ]
      },
      {
        id: 'tier-stopover',
        slug: 'stopover',
        name: 'Stopover',
        description: 'Short-stay city packages for travellers transiting through China or testing destination before committing to a full itinerary.',
        features: ['2-4 day packages', 'Consistent naming', 'Visa-friendly', 'Natural upsell path'],
        agentOneLiner: 'China Stopover is their gateway product — perfect for transit passengers or testing a destination before a full tour.',
        definingCharacteristics: [
          '2-4 day city-specific packages',
          'Consistent naming: China Stopover — [City] ([Duration])',
          'Designed for visa-free traveller and transit passenger',
          'Pipeline product: agent who books a stopover has a natural follow-up conversation for a full tour'
        ]
      }
    ]
  },
  {
    id: 'dest-2',
    slug: 'japan',
    name: 'Japan',
    subtitle: 'Where Tradition Meets Tomorrow',
    description: 'Experience the perfect harmony of ancient traditions and cutting-edge modernity. From serene temples to bustling Tokyo, Japan offers unforgettable journeys.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
    highlights: [
      'Witness Mount Fuji',
      'Explore ancient Kyoto temples',
      'Experience Tokyo\'s energy',
      'Relax in traditional onsen',
      'Enjoy authentic kaiseki dining'
    ],
    metaTitle: 'Japan Tours | Signature & Discovery | CTS Tours',
    metaDescription: 'Discover Japan with CTS Tours. From Tokyo to Kyoto, experience authentic Japan with our expert guides. Signature and Discovery tours available.',
    tiers: [
      {
        id: 'tier-signature',
        slug: 'signature',
        name: 'Signature',
        description: 'Immersive journeys with exclusive cultural experiences',
        features: ['Max 10 guests', 'Ryokan stays', 'Expert guides', 'Cultural immersion'],
        agentOneLiner: 'Japan Signature is their premium programme — boutique ryokans, small groups, deeper cultural experiences designed by their Japan specialist.',
        definingCharacteristics: [
          'Maximum 16 passengers (group), or private departure',
          '4-5 star hotels selected for character and location, not just star rating',
          'Locally-led experiences, off-circuit access, itinerary depth over destination count',
          'Baker Gu\'s direct product oversight',
          'Airline selection is product-specific, not a tier-level promise'
        ]
      },
      {
        id: 'tier-discovery',
        slug: 'discovery',
        name: 'Discovery',
        description: 'Essential Japan experiences at exceptional value',
        features: ['Small groups', 'Quality hotels', 'Local guides', 'Great value'],
        agentOneLiner: 'Japan Discovery is their well-priced option — reliable, well-organised, great for a first trip to Japan.',
        definingCharacteristics: [
          'Standard group sizes',
          '3-4 star hotels, clean, well-located, comfortable',
          'Must-see itineraries — well-paced, well-guided, covering highlights',
          'Straightforward pricing that reflects value of experience',
          'Cost-effective carriers offering good value'
        ]
      }
    ]
  },
  {
    id: 'dest-3',
    slug: 'vietnam',
    name: 'Vietnam',
    subtitle: 'Timeless Charm, Unforgettable Experiences',
    description: 'From the emerald waters of Halong Bay to the ancient streets of Hoi An, Vietnam captivates with its natural beauty, rich history, and warm hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=80',
    highlights: [
      'Cruise Halong Bay',
      'Explore Hoi An Ancient Town',
      'Discover Ho Chi Minh City',
      'Experience Mekong Delta',
      'Taste authentic Vietnamese cuisine'
    ],
    metaTitle: 'Vietnam Tours | Discovery Collection | CTS Tours',
    metaDescription: 'Explore Vietnam with CTS Tours. From Halong Bay to Hoi An, discover the beauty and culture of Vietnam with our expert guides.',
    tiers: [
      {
        id: 'tier-discovery',
        slug: 'discovery',
        name: 'Discovery',
        description: 'Authentic Vietnam experiences showcasing the best of the country',
        features: ['Small groups', 'Boutique hotels', 'Local guides', 'Authentic experiences'],
        agentOneLiner: 'Vietnam Discovery is their well-priced option — reliable, well-organised, great for a first trip to Vietnam.',
        definingCharacteristics: [
          'Standard group sizes',
          '3-4 star hotels, clean, well-located, comfortable',
          'Must-see itineraries — well-paced, well-guided, covering highlights',
          'Straightforward pricing that reflects value of experience',
          'Cost-effective carriers offering good value'
        ]
      }
    ]
  }
];


// Tours Data — migrated from ctstours.co.nz
export const tours: Tour[] = [
  // China Signature Tours
  {
    id: 'tour-cn-sig-1',
    slug: 'silk-road',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Silk Road Discovery',
    title: 'China Signature — Silk Road Discovery',
    shortDescription: 'Journey along China\'s ancient Silk Road from Urumqi to Xi\'an across 17 days — exploring Heavenly Lake, the Flaming Mountains, Mogao Caves, colourful Danxia mountains, Bingling Temple grottoes, and the Terracotta Warriors.',
    duration: '17 Days',
    price: 'From NZD $6,699',
    heroImage: '/images/tours/silk-road-wall.jpg',
    gallery: [
      '/images/tours/silk-road-wall.jpg',
      '/images/tours/great-wall-mist.jpg'
    ],
    highlights: [
      'Visit Heavenly Lake (Tianchi) in the Tianshan Mountains',
      'Explore Turpan\'s ancient Jiaohe Ruins and Karez Irrigation System',
      'See the dramatic Flaming Mountains and Bezeklik Thousand Buddha Caves',
      'Marvel at the world-famous Mogao Caves in Dunhuang',
      'Experience the desert oasis of Mingsha Mountain and Crescent Spring',
      'Walk along the Hanging Great Wall and Jiayuguan Fortress',
      'Photograph the colourful Zhangye Danxia rock formations',
      'Take a boat trip to the Bingling Temple Grottoes',
      'Visit the Terracotta Warriors in Xi\'an',
      'Enjoy a free day to explore Xi\'an at your own pace'
    ],
    itinerary: [
      { day: 1, title: 'New Zealand — Shanghai', description: 'Depart New Zealand, arrive Shanghai.', meals: [] },
      { day: 2, title: 'Shanghai — Urumqi', description: 'Arrive Urumqi, capital of Xinjiang. Transfer to hotel.', meals: [], accommodation: 'Luolan Hotel Urumqi or equivalent 4-star' },
      { day: 3, title: 'Urumqi — Heavenly Lake', description: 'Visit Heavenly Lake (Tianchi) in Tianshan Mountains, enjoy alpine scenery.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Luolan Hotel Urumqi or equivalent 4-star' },
      { day: 4, title: 'Urumqi — Turpan', description: 'Visit Emin Minaret, Jiaohe Ancient City, and Karez Irrigation System.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Huozhou Turpan Hotel or equivalent 4-star' },
      { day: 5, title: 'Turpan', description: 'Explore the Flaming Mountains and Bezeklik Thousand Buddha Caves with ancient Buddhist murals.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Huozhou Turpan Hotel or equivalent 4-star' },
      { day: 6, title: 'Turpan — Dunhuang', description: 'High-speed train from Turpan North to Liuyuan. Coach transfer to Dunhuang.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Tianrun International Hotel or equivalent 4-star' },
      { day: 7, title: 'Dunhuang', description: 'Visit Mogao Caves with Buddhist murals and statues. Experience the Singing Sand Dunes and Crescent Lake desert oasis.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Tianrun International Hotel or equivalent 4-star' },
      { day: 8, title: 'Dunhuang — Jiayuguan', description: 'Visit the Hanging Great Wall and Jiayuguan Fortress, a Ming Dynasty masterpiece.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jiugang Hotel (West Wing) or equivalent 4-star' },
      { day: 9, title: 'Jiayuguan — Zhangye', description: 'Visit Zhangye Danxia National Geological Park with its stunning colourful layered mountains.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Puyue Hotel or equivalent 4-star' },
      { day: 10, title: 'Zhangye — Wuwei', description: 'Visit Leitai Han Tomb and Confucian Temple.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jinwu International Hotel or equivalent 4-star' },
      { day: 11, title: 'Wuwei — Lanzhou', description: 'Travel the Yellow River Scenic Route to Lanzhou.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Lanzhou Jianlan or equivalent 4-star' },
      { day: 12, title: 'Lanzhou — Bingling Temple', description: 'Boat trip to Bingling Temple Grottoes, featuring 1,700 years of Buddhist art in cliffside caves.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Lanzhou Jianlan or equivalent 4-star' },
      { day: 13, title: 'Lanzhou — Xi\'an', description: 'High-speed train from Lanzhou West to Xi\'an North. Rest upon arrival.', meals: ['Breakfast', 'Dinner'], accommodation: 'Mercure Bell Tower Xi\'an or equivalent 4-star' },
      { day: 14, title: 'Xi\'an', description: 'Visit the Terracotta Army and Giant Wild Goose Pagoda.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Bell Tower Xi\'an or equivalent 4-star' },
      { day: 15, title: 'Xi\'an — Free Day', description: 'Free day to explore Xi\'an on your own.', meals: ['Breakfast'], accommodation: 'Mercure Bell Tower Xi\'an or equivalent 4-star' },
      { day: 16, title: 'Xi\'an — Shanghai', description: 'Flight to Shanghai, prepare for return journey.', meals: ['Breakfast'] },
      { day: 17, title: 'Shanghai — New Zealand', description: 'Depart China, return to New Zealand.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from New Zealand',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Signature — Silk Road Discovery | 17 Days | CTS Tours',
    metaDescription: 'Journey along China\'s ancient Silk Road — Heavenly Lake, Mogao Caves, Danxia Mountains, Terracotta Warriors. 17 days from NZD $6,699. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $1,435
  },
  {
    id: 'tour-cn-sig-2',
    slug: 'imperial-heritage',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Legacy of China',
    title: 'China Signature — Legacy of China',
    shortDescription: 'A 17-day journey through China\'s greatest imperial and cultural treasures — from Beijing\'s Forbidden City and the Great Wall to the Potala Palace in Lhasa, a Yangtze River Three Gorges cruise, and the dazzling skyline of Shanghai.',
    duration: '17 Days',
    price: 'From NZD $9,999',
    heroImage: '/images/tours/forbidden-city-aerial.jpg',
    gallery: [
      '/images/tours/forbidden-city-aerial.jpg',
      '/images/tours/forbidden-city-gold-lion.jpg'
    ],
    highlights: [
      'Explore the Forbidden City and Tiananmen Square in Beijing',
      'Walk the Mutianyu section of the Great Wall',
      'Discover the Terracotta Warriors in Xi\'an',
      'Visit the sacred Potala Palace in Lhasa',
      'Witness monk debating at Sera Monastery',
      'Cruise through the Yangtze River Three Gorges',
      'Meet giant pandas at Chengdu breeding base',
      'Enjoy a Peking Duck banquet and Tang Dynasty show',
      'Experience a Tibetan cultural dinner with performances',
      'Stroll along the Bund and cruise the Huangpu River in Shanghai'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing', description: 'Take a China Eastern Airlines flight to Beijing, the capital of China.', meals: [] },
      { day: 2, title: 'Arrival in Beijing', description: 'Upon arrival, depending on your flight time, enjoy some free time at leisure to begin experiencing the local culture.', meals: [], accommodation: 'Beijing Qianyuan Hotel or similar 5-star' },
      { day: 3, title: 'Beijing', description: 'Visit the Temple of Heaven and join locals practicing Tai Chi. Explore Tiananmen Square and the magnificent Forbidden City. In the evening, enjoy a traditional Peking Duck banquet followed by a Chinese acrobatic performance. Note: If Forbidden City tickets are unavailable, the visit will be replaced with Jingshan Park and Prince Gong\'s Mansion.', meals: ['Breakfast', 'Dinner (Peking Duck Banquet)'], accommodation: 'Beijing Qianyuan Hotel or similar 5-star' },
      { day: 4, title: 'Beijing', description: 'Visit the Mutianyu Great Wall and enjoy breathtaking views. Visit a jade factory to learn about traditional craftsmanship. In the afternoon, explore the Summer Palace, strolling through beautiful classical Chinese gardens.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Qianyuan Hotel or similar 5-star' },
      { day: 5, title: 'Beijing — Xi\'an', description: 'High-speed train from Beijing West to Xi\'an North (Train G55, 09:55–14:05, First Class seat or similar). Explore the lively Muslim Quarter. In the evening, enjoy a traditional dumpling banquet with a Tang Dynasty dance performance.', meals: ['Breakfast', 'Dinner (Dumpling Banquet)'], accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star' },
      { day: 6, title: 'Xi\'an', description: 'Visit the world-famous Terracotta Warriors of Emperor Qin Shi Huang. Visit a ceramics and lacquerware workshop. Walk along the well-preserved 14th-century Ancient City Wall with panoramic views of Xi\'an\'s old city.', meals: ['Breakfast', 'Lunch'], accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star' },
      { day: 7, title: 'Xi\'an — Lhasa', description: 'Take a flight from Xi\'an to Lhasa. Enjoy free time to acclimatise to the high-altitude environment.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'InterContinental Lhasa Paradise or similar 5-star' },
      { day: 8, title: 'Lhasa', description: 'Visit the sacred Jokhang Temple, an important spiritual centre of Tibetan Buddhism. Stroll along Barkhor Street. In the afternoon, visit Sera Monastery and witness the unique monk debating sessions.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'InterContinental Lhasa Paradise or similar 5-star' },
      { day: 9, title: 'Lhasa', description: 'Visit the magnificent Potala Palace, a symbol of Tibet. Explore Norbulingka, the former summer palace of the Dalai Lama. Visit a Tibetan handicraft workshop. In the evening, enjoy a Tibetan-style dinner with traditional singing and dancing performances.', meals: ['Breakfast', 'Dinner (Tibetan Cultural Show)'], accommodation: 'InterContinental Lhasa Paradise or similar 5-star' },
      { day: 10, title: 'Lhasa — Chengdu', description: 'Fly from Lhasa to Chengdu. In the evening, enjoy an authentic Sichuan cuisine dinner.', meals: ['Breakfast', 'Dinner'], accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star' },
      { day: 11, title: 'Chengdu — Chongqing (Yangtze Cruise)', description: 'Visit the Chengdu Research Base of Giant Panda Breeding. Travel to Chongqing by high-speed train (First Class seat). Board your Yangtze River cruise to begin the Three Gorges journey.', meals: ['Breakfast', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — International 5-star cruise' },
      { day: 12, title: 'Yangtze River Cruise', description: 'Enjoy spectacular scenery of the Yangtze River Three Gorges. Participate in shore excursions to Shennü Stream or Shennong Stream.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise' },
      { day: 13, title: 'Yangtze River Cruise', description: 'Continue cruising through the Three Gorges, taking in the breathtaking natural landscapes along the river.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise' },
      { day: 14, title: 'Three Gorges Dam — Yichang — Shanghai', description: 'Visit the impressive Three Gorges Dam, the world\'s largest hydropower project. Transfer to Yichang and take an evening flight to Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star' },
      { day: 15, title: 'Shanghai', description: 'Visit Yuyuan Garden and admire its classical beauty. Visit a silk factory. Stroll along the Bund. In the evening, enjoy a Huangpu River cruise and a Shanghai-style dinner.', meals: ['Breakfast', 'Dinner (Shanghai Local Cuisine)'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star' },
      { day: 16, title: 'Shanghai — Departure', description: 'Enjoy free time at leisure before transferring to the airport for your return flight to New Zealand.', meals: ['Breakfast'] },
      { day: 17, title: 'Arrive Auckland', description: 'Arrive in New Zealand. Tour concludes.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '5-star hotel accommodation',
      'Victoria Yangtze River Cruise (International 5-star)',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Signature — Legacy of China | 17 Days | CTS Tours',
    metaDescription: 'Experience China\'s imperial legacy — Forbidden City, Great Wall, Terracotta Warriors, Potala Palace, Yangtze cruise, and Shanghai. 17 days from NZD $9,999. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $2,410
  },
  {
    id: 'tour-cn-sig-3',
    slug: 'grand-tour',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — China Panorama',
    title: 'China Signature — China Panorama',
    shortDescription: 'The ultimate 27-day China experience — from the Great Wall and Forbidden City to a Yangtze River cruise, giant pandas in Chengdu, the Li River in Guilin, classical gardens of Suzhou, West Lake in Hangzhou, and vibrant Shanghai.',
    duration: '27 Days',
    price: 'From NZD $10,899',
    heroImage: '/images/tours/great-wall-mist.jpg',
    gallery: [
      '/images/tours/great-wall-mist.jpg',
      '/images/tours/forbidden-city-aerial.jpg'
    ],
    highlights: [
      'Walk the Juyongguan Great Wall and explore the Forbidden City',
      'Discover the Terracotta Warriors in Xi\'an',
      'Cruise through the Yangtze River Three Gorges on a 5-star ship',
      'Visit giant pandas at the Chengdu breeding base',
      'Cruise the Li River to Yangshuo through karst landscapes',
      'Experience West Lake and Longjing tea plantations in Hangzhou',
      'Explore the classical Humble Administrator\'s Garden in Suzhou',
      'Enjoy the Huangpu River cruise and Bund in Shanghai',
      'Visit the Stone Forest in Kunming',
      'Dress in traditional Hanfu at Xinshi Ancient Town'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — China', description: 'Flight to China.', meals: [] },
      { day: 2, title: 'Beijing', description: 'Arrive Shanghai, connect to Beijing. Free time.', meals: [], accommodation: 'Wanda Meihua Hotel Dongba or similar 4-star' },
      { day: 3, title: 'Beijing', description: 'Tiananmen Square, Forbidden City, Hutong family visit. Peking duck dinner.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Wanda Meihua Hotel Dongba or similar 4-star' },
      { day: 4, title: 'Beijing', description: 'Great Wall at Juyongguan, jade carving factory, Summer Palace.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Wanda Meihua Hotel Dongba or similar 4-star' },
      { day: 5, title: 'Beijing — Xi\'an', description: 'Temple of Heaven, morning Tai Chi. High-speed train to Xi\'an. Dumpling banquet dinner.', meals: ['Breakfast', 'Dinner'], accommodation: 'Mercure Bell Tower Hotel Xi\'an or similar 4-star' },
      { day: 6, title: 'Xi\'an', description: 'Small Wild Goose Pagoda, Muslim Quarter, City Wall.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Bell Tower Hotel Xi\'an or similar 4-star' },
      { day: 7, title: 'Xi\'an', description: 'Full day visiting Terracotta Warriors Museum.', meals: ['Breakfast', 'Dinner'], accommodation: 'Mercure Bell Tower Hotel Xi\'an or similar 4-star' },
      { day: 8, title: 'Yichang — Yangtze Cruise', description: 'Flight to Yichang, board 5-star Yangtze cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '5-star Yangtze Cruise' },
      { day: 9, title: 'Yangtze River Cruise', description: 'Three Gorges scenery and shore excursions.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '5-star Yangtze Cruise' },
      { day: 10, title: 'Yangtze River Cruise', description: 'Continue Three Gorges cruise with Shennv/Shennong Stream excursion.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '5-star Yangtze Cruise' },
      { day: 11, title: 'Yangtze River Cruise', description: 'Final day of the Three Gorges cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '5-star Yangtze Cruise' },
      { day: 12, title: 'Chongqing — Chengdu', description: 'Disembark. Ciqikou Ancient Town. High-speed train to Chengdu. Sichuan dinner.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Chengdu Gulou or similar 4-star' },
      { day: 13, title: 'Chengdu — Dali', description: 'Panda Breeding Base, People\'s Park, Wide & Narrow Alleys, Taikoo Li. Evening flight to Dali.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali Shuiyun Academy Hotel or similar 4-star' },
      { day: 14, title: 'Dali', description: 'Xizhou Village market, Yan\'s Courtyard, Erhai Lake cruise, Three Pagodas.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali Shuiyun Academy Hotel or similar 4-star' },
      { day: 15, title: 'Dali — Kunming', description: 'Dali Ancient Town exploration. Transfer to Kunming.', meals: ['Breakfast'], accommodation: 'Ramada Encore Kunming or similar 4-star' },
      { day: 16, title: 'Kunming', description: 'Stone Forest (karst formations). Crossing-the-bridge rice noodles dinner.', meals: ['Breakfast'], accommodation: 'Ramada Encore Kunming or similar 4-star' },
      { day: 17, title: 'Kunming — Guilin', description: 'Flight to Guilin.', meals: ['Breakfast'], accommodation: 'Guilin Hotel or similar 4-star' },
      { day: 18, title: 'Li River Cruise — Yangshuo', description: 'Li River cruise to Yangshuo through karst mountain scenery.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Rezen Hotel West Street Yangshuo or similar 4-star' },
      { day: 19, title: 'Yangshuo', description: 'Morning Tai Chi, countryside tour, cormorant fishing. Free afternoon.', meals: ['Breakfast', 'Lunch'], accommodation: 'Rezen Hotel West Street Yangshuo or similar 4-star' },
      { day: 20, title: 'Yangshuo — Guilin', description: 'Elephant Trunk Hill, Reed Flute Cave, Sun & Moon Pagodas.', meals: ['Breakfast', 'Lunch'], accommodation: 'Guilin Hotel or similar 4-star' },
      { day: 21, title: 'Guilin — Hangzhou', description: 'Flight to Hangzhou. West Lake cruise, Hubin District.', meals: ['Breakfast'], accommodation: 'Radisson Hangzhou Liangzhu or similar' },
      { day: 22, title: 'Hangzhou — Suzhou', description: 'Lingyin Temple, Meijiawu Tea Plantation, Xinshi Ancient Town with Hanfu dress-up. Transfer to Suzhou.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Suzhou Bay or similar 4-star' },
      { day: 23, title: 'Suzhou', description: 'Humble Administrator\'s Garden, Grand Canal boat ride.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Suzhou Bay or similar 4-star' },
      { day: 24, title: 'Suzhou — Shanghai', description: 'People\'s Square, Shanghai Museum. Huangpu River cruise.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 4-star' },
      { day: 25, title: 'Shanghai', description: 'Yuyuan Garden, The Bund, silk factory. Evening ERA Acrobatic Show.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 4-star' },
      { day: 26, title: 'Shanghai — Auckland', description: 'Free time. Evening airport transfer, return flight.', meals: [] },
      { day: 27, title: 'Arrive Auckland', description: 'Arrive Auckland. Tour ends.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'Victoria Yangtze River Cruise (International 5-star)',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Signature — China Panorama | 27 Days | CTS Tours',
    metaDescription: 'The ultimate 27-day China experience — Great Wall, Forbidden City, Terracotta Warriors, Yangtze cruise, pandas, Li River, West Lake, and Shanghai. From NZD $10,899. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $2,555
  },
  {
    id: 'tour-cn-sig-4',
    slug: 'yunnan',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Yunnan',
    title: 'China Signature — Yunnan',
    shortDescription: 'Uncover the natural beauty and rich culture of southwest China, from the serene lakes of Dali and ancient towns of Lijiang to the dramatic Tiger Leaping Gorge and mystical Shangri-La.',
    duration: '11 Days',
    price: 'From NZD $2,899',
    heroImage: '/images/tours/yunnan-rice-terraces.jpg',
    gallery: [
      '/images/tours/yunnan-rice-terraces.jpg',
      '/images/tours/yunnan-village.jpg'
    ],
    highlights: [
      'Erhai Lake and Santorini-style views in Dali',
      'Shuanglang Ancient Town and Bai ethnic culture',
      'Lijiang\'s ancient town and Sifang Street',
      'Lashi Lake Wetland and Shuhe Ancient Town',
      'Tiger Leaping Gorge — one of the deepest canyons',
      'Dukezong Ancient City in Shangri-La',
      'World\'s largest prayer wheel',
      'Ganden Sumtseling Monastery'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing/Shanghai', description: 'Flight to Beijing/Shanghai.', meals: [] },
      { day: 2, title: 'Beijing/Shanghai — Dali', description: 'Arrive, city tour (798 Art District). Lunch. Flight to Dali. Dinner on arrival.', meals: ['Lunch', 'Dinner'], accommodation: 'Dali Landscape Hotel or similar 4-star' },
      { day: 3, title: 'Dali', description: 'Erhai Park, Dali Ideal State (Santorini views of Cangshan Mountain and Erhai Lake). Wenbi Village with Bai ethnic buildings. Shuanglang Ancient Town.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali Landscape Hotel or similar 4-star' },
      { day: 4, title: 'Dali — Free Day', description: 'Free day or optional Haixi Line tour: Dali Ancient City, Erhai Ecological Corridor, Xizhou Ancient Town, Three-course Tea ceremony, Bai ethnic meal.', meals: ['Breakfast'], accommodation: 'Dali Landscape Hotel or similar 4-star' },
      { day: 5, title: 'Dali — Lijiang', description: 'Transfer to Lijiang. Visit Black Dragon Pool Park, Highland Dulong Jade, and Sifang Street ancient city.', meals: ['Breakfast'], accommodation: 'Jixiangyuan Hotel or similar 4-star' },
      { day: 6, title: 'Lijiang', description: 'Lashi Lake Wetland with migratory birds. Silk Bedding Exhibition Hall. Shuhe Ancient Town along the ancient Tea Horse Road.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jixiangyuan Hotel or similar 4-star' },
      { day: 7, title: 'Lijiang — Shangri-La', description: 'Visit Dukezong Ancient City, Moonlight Square, and the world\'s largest prayer wheel. Tiger Leaping Gorge with Tiger Leaping Stone. Guishan Park.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Elong Hotel or similar 4-star' },
      { day: 8, title: 'Shangri-La — Lijiang', description: 'Visit Ganden Sumtseling Monastery (\'Little Potala Palace\'). Napa Lake Wetlands and Highland Barley Avenue. Return to Lijiang.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jixiangyuan Hotel or similar 4-star' },
      { day: 9, title: 'Lijiang — Free Day', description: 'Free day or optional tour to ancient Naxi village with Dongba pictographs, Naxi Museum, Yuzhu Qingtian Scenic Area.', meals: ['Breakfast'], accommodation: 'Jixiangyuan Hotel or similar 4-star' },
      { day: 10, title: 'Lijiang — Beijing/Shanghai', description: 'Flight to Beijing/Shanghai. Wangfujing Street shopping. Gather for airport departure.', meals: ['Breakfast'] },
      { day: 11, title: 'Beijing/Shanghai — Auckland', description: 'Return flight to Auckland.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and domestic flights',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)'
    ],
    metaTitle: 'China Signature — Yunnan | 11 Days | CTS Tours',
    metaDescription: 'Uncover the natural beauty and rich culture of southwest China, from the serene lakes of Dali and ancient towns of Lijiang to the dramatic T... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-sig-5',
    slug: 'landscapes',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Natural China',
    title: 'China Signature — Natural China',
    shortDescription: 'Discover China\'s most breathtaking natural landscapes across 16 days — from Shanghai\'s urban charm to the karst peaks of Guilin, the pandas of Chengdu, the ancient riverside beauty of Fenghuang, and the dramatic "Avatar" mountains of Zhangjiajie.',
    duration: '16 Days',
    price: 'From NZD $7,670',
    heroImage: '/images/tours/jiuzhaigou-lake.jpg',
    gallery: [
      '/images/tours/jiuzhaigou-lake.jpg',
      '/images/tours/jiuzhaigou-autumn.jpg'
    ],
    highlights: [
      'Cruise the Li River through stunning karst landscapes',
      'Visit the Chengdu Giant Panda Breeding Research Base',
      'Explore the Leshan Giant Buddha, the world\'s largest stone Buddha',
      'Discover the enchanting night views of Fenghuang Ancient Town',
      'Walk the Glass Skywalk at Tianmen Mountain',
      'See the "Hallelujah Mountains" in Zhangjiajie National Forest Park',
      'Cross the famous Zhangjiajie Glass Bridge',
      'Stroll through charming Zhujiajiao Water Town',
      'Enjoy a Huangpu River night cruise in Shanghai',
      'Experience West Street in Yangshuo'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai (Overnight Flight)', description: 'Depart from Auckland on an evening flight to Shanghai. Overnight on board.', meals: [] },
      { day: 2, title: 'Arrival in Shanghai', description: 'Upon arrival in Shanghai, meet your guide and begin your city tour. Visit the historic Yuyuan Garden and Chenghuang Temple, stroll along Nanjing Road, continue to the iconic Bund for stunning skyline views, then explore the trendy districts of Xintiandi and Tianzifang, known for their Shikumen-style architecture.', meals: ['Lunch'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star' },
      { day: 3, title: 'Shanghai', description: 'Visit the peaceful Jade Buddha Temple. Continue to the Oriental Pearl TV Tower for panoramic city views, followed by the Shanghai Museum (East Hall), showcasing rich cultural relics. In the evening, enjoy a relaxing Huangpu River night cruise offering spectacular views of illuminated Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star' },
      { day: 4, title: 'Shanghai — Guilin', description: 'Transfer to the airport for your morning flight to Guilin. Upon arrival, visit Elephant Trunk Hill, the iconic landmark of Guilin.', meals: ['Breakfast', 'Dinner'], accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star' },
      { day: 5, title: 'Guilin — Yangshuo', description: 'Transfer to Zhujiang Pier to board a deluxe 4-star cruise along the Li River to Yangshuo with your guide. Enjoy the breathtaking karst landscapes along the way. Upon arrival, explore the lively West Street.', meals: ['Breakfast', 'Lunch (Buffet onboard)'], accommodation: 'Licheng Yitian West Street Hotel Yangshuo or similar 4.5-star' },
      { day: 6, title: 'Yangshuo — Guilin', description: 'Enjoy a free morning at leisure. In the afternoon, return to Guilin and visit Reed Flute Cave, known for its impressive stalactites and stalagmites, followed by Jingjiang Prince\'s City.', meals: ['Breakfast', 'Lunch'], accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star' },
      { day: 7, title: 'Guilin — Chengdu', description: 'Transfer to the railway station for a high-speed train from Guilin West to Chengdu East (Train D1804, 10:39–17:09, First Class seat, or similar). Upon arrival, your guide will meet you and transfer you to the hotel.', meals: ['Breakfast'], accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star' },
      { day: 8, title: 'Chengdu', description: 'Visit the Chengdu Research Base of Giant Panda Breeding to see China\'s beloved pandas. Experience local life at People\'s Park with a traditional tea break. Continue to explore Taikoo Li and the historic Kuanzhai Alley.', meals: ['Breakfast', 'Dinner'], accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star' },
      { day: 9, title: 'Chengdu — Leshan', description: 'Full-day excursion to the Leshan Giant Buddha, the world\'s largest stone Buddha statue. On the way back, visit Huanglongxi Ancient Town, known for its well-preserved traditional architecture.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star' },
      { day: 10, title: 'Chengdu — Fenghuang Ancient Town', description: 'High-speed train from Chengdu East to Huaihua South (Train G2187, 10:10–15:06, First Class seat, or similar). Upon arrival, transfer to Fenghuang Ancient Town. In the evening, enjoy the enchanting night views of this historic riverside town.', meals: ['Breakfast', 'Dinner'], accommodation: 'Kaisheng International Hotel or similar 5-star' },
      { day: 11, title: 'Fenghuang — Zhangjiajie', description: 'Explore Fenghuang Ancient Town, famous for its traditional wooden houses and rich ethnic culture. After lunch, visit Furong Town, a picturesque village built around a waterfall, before continuing to Zhangjiajie.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Wyndham Garden Zhangjiajie or similar 5-star' },
      { day: 12, title: 'Zhangjiajie — Wulingyuan', description: 'Visit Tianmen Mountain National Forest Park, including cable car rides, eco-bus, escalator to Tianmen Cave, Glass Skywalk (with shoe covers), and the thrilling Guigu Plank Road. Visit the Tujia Folk Custom Park before heading to Wulingyuan.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Wyndham Hotel Wulingyuan (Ruijing Manshan) or similar 5-star' },
      { day: 13, title: 'Wulingyuan', description: 'Explore Zhangjiajie National Forest Park. Take the Bailong Elevator up and descend by Tianzi Mountain cable car. Visit Yuanjiajie, known for the "Hallelujah Mountains," West Sea scenic area, and enjoy a ride on the mini train through Ten-Mile Gallery.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Wyndham Hotel Wulingyuan (Ruijing Manshan) or similar 5-star' },
      { day: 14, title: 'Wulingyuan — Shanghai', description: 'Visit Golden Whip Stream, a scenic walking trail through the forest. Continue to Zhangjiajie Grand Canyon and experience the famous Glass Bridge. Transfer to the airport for your evening flight to Shanghai (FM9344, 20:35–22:40 or similar).', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star' },
      { day: 15, title: 'Shanghai — Zhujiajiao — Departure', description: 'Day trip to Zhujiajiao Water Town, the "Venice of Shanghai," with its charming canals and ancient bridges. Return to Shanghai and transfer to Pudong International Airport after dinner.', meals: ['Breakfast'] },
      { day: 16, title: 'Shanghai — Auckland', description: 'Departure from Shanghai, arrive Auckland.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Signature — Natural China | 16 Days | CTS Tours',
    metaDescription: 'Discover China\'s most breathtaking natural landscapes — Li River, Zhangjiajie, Giant Pandas, Fenghuang Ancient Town. 16-day premium tour from NZD $7,670. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
  },
  {
    id: 'tour-cn-sig-6',
    slug: 'shangri-la',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Shangri-la',
    title: 'China Signature — Shangri-la',
    shortDescription: 'An immersive 8-day journey exploring breathtaking landscapes and vibrant cultures of Yunnan, from Kunming\'s Stone Forest through Dali and Lijiang to the mystical Shangri-La region.',
    duration: '8 Days',
    price: 'From NZD $3,299',
    heroImage: '/images/tours/shangri-la-monastery.jpg',
    gallery: [
      '/images/tours/shangri-la-monastery.jpg',
      '/images/tours/shangri-la-monastery-lake.jpg'
    ],
    highlights: [
      'Kunming Stone Forest — highest karst terrain in the world',
      'Dali\'s Erhai Lake and Bai village Xizhou',
      'Three Pagodas of Chongsheng Temple',
      'Lijiang\'s Dayan Old Town (UNESCO World Heritage)',
      'Jade Dragon Snow Mountain and Yak Meadow',
      'Blue Moon Valley',
      'Tiger Leaping Gorge',
      'Dukezong Old Town in Shangri-La',
      'Potatso National Park with Bitahai and Shuduhu Lakes'
    ],
    itinerary: [
      { day: 1, title: 'Kunming', description: 'Arrival in Kunming, \'City of Perpetual Spring\'. Hotel transfer.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Kunming', description: 'Visit Stone Forest, the highest karst terrain in the world. Afternoon return with optional visits to old town or Flower and Bird Market.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 3, title: 'Kunming — Dali', description: 'Bullet train to Dali. Boat trip on Erhai Lake, visit Bai village Xizhou, photo stop at Three Pagodas of Chongsheng Temple, explore Dali Old Town.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 4, title: 'Dali — Lijiang', description: 'Coach to Lijiang with countryside views. Visit Black Dragon Pool Park and Dongba Culture Museum. Evening walk through Dayan Old Town (UNESCO World Heritage).', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 5, title: 'Lijiang', description: 'Visit Jade Dragon Snow Mountain National Park (3,000m elevation). Chairlift to Yak Meadow. Blue Moon Valley tour. Baisha Village ancient frescoes.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 6, title: 'Lijiang — Shangri-La', description: '250km drive passing Shigu County, First Bend of Yangtze River, and Tiger Leaping Gorge. Visit Old Town of Dukezong.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 7, title: 'Shangri-La', description: 'Morning visit Potatso National Park with Bitahai and Shuduhu Lakes. Afternoon visit Napahai with yaks and black-necked cranes.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 8, title: 'Shangri-La — Kunming', description: 'Morning flight to Kunming. Tour concludes.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'All meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to all sightseeing locations per itinerary'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (CNY 100/day/person)'
    ],
    metaTitle: 'China Signature — Shangri-la | 8 Days | CTS Tours',
    metaDescription: 'An immersive 8-day journey exploring breathtaking landscapes and vibrant cultures of Yunnan, from Kunming\'s Stone Forest through Dali and Li... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  // China Discovery Tours
  {
    id: 'tour-cn-dis-1',
    slug: 'highlights',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Highlights',
    title: 'China Discovery — Highlights',
    shortDescription: 'A journey combining wildlife encounters with historical exploration — giant pandas, high-speed trains, Terracotta Warriors, and Jiuzhaigou\'s crystalline lakes.',
    duration: '11 Days',
    price: 'From NZD $2,999',
    heroImage: '/images/tours/forbidden-city-lion.jpg',
    gallery: [
      '/images/tours/forbidden-city-lion.jpg',
      '/images/tours/forbidden-city-lion-2.jpg'
    ],
    highlights: [
      'Giant pandas at Dujiangyan Panda Base',
      'High-speed train rides across China',
      'Terracotta Warriors — Eighth Wonder of the World',
      'Jiuzhaigou crystalline lakes',
      'Kuan and Zhai alleys in Chengdu',
      'Huanglong Scenic Area'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Chengdu', description: 'Evening departure from Auckland.', meals: [] },
      { day: 2, title: 'Chengdu Area', description: 'Visit Giant Buddha at Lingyun Mountain. Return to Chengdu.', meals: ['Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Gulou (4-star)' },
      { day: 3, title: 'Chengdu', description: 'Dujiangyan Panda Base by battery-powered vehicle. Ancient irrigation project tour.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Gulou (4-star)' },
      { day: 4, title: 'Chengdu — Jiuzhaigou', description: 'Morning exploration of Kuan and Zhai alleys. Fast train to Jiuzhaigou Valley.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Grand Rezen Hotel (4-star)' },
      { day: 5, title: 'Jiuzhaigou Valley', description: 'Full-day reserve: four scenic areas, plateau lakes, waterfalls, calcified beaches.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Grand Rezen Hotel (4-star)' },
      { day: 6, title: 'Jiuzhaigou — Chengdu', description: 'Huanglong Scenic Area (elevation 1,700–5,588m). Return by fast train.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Gulou (4-star)' },
      { day: 7, title: 'Chengdu — Xi\'an', description: 'Fast train to Xi\'an. Bell Tower and Huimin Street exploration.', meals: ['Breakfast', 'Dinner'], accommodation: 'Novotel Hotel Daming Palace (4-star)' },
      { day: 8, title: 'Xi\'an', description: 'Terracotta Warriors, Circle Vision Movie, Bronze Chariot. Evening dumpling dinner.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Novotel Hotel Daming Palace (4-star)' },
      { day: 9, title: 'Xi\'an', description: 'Old City Wall and Big Wild Goose Pagoda.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Novotel Hotel Daming Palace (4-star)' },
      { day: 10, title: 'Xi\'an — Chengdu', description: 'Free morning. High-speed train to Chengdu. Airport transfer.', meals: ['Breakfast'] },
      { day: 11, title: 'Return to New Zealand', description: 'Arrive back in New Zealand.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and second-class train',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)'
    ],
    metaTitle: 'China Discovery — Highlights | 11 Days | CTS Tours',
    metaDescription: 'A journey combining wildlife encounters with historical exploration — giant pandas, high-speed trains, Terracotta Warriors, and Jiuzhaigou\'s... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-dis-2',
    slug: 'beijing-shanghai',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — A Tale of Two Cities',
    title: 'China Discovery — A Tale of Two Cities',
    shortDescription: 'Experience the contrast between ancient and modern China — from Beijing\'s imperial treasures and the Great Wall to Xi\'an\'s Terracotta Warriors and Shanghai\'s dazzling skyline.',
    duration: '10 Days',
    price: 'From NZD $3,480',
    heroImage: '/images/tours/forbidden-city-gold-lion.jpg',
    gallery: [
      '/images/tours/forbidden-city-gold-lion.jpg',
      '/images/tours/shanghai-night-blue.jpg'
    ],
    highlights: [
      'Walk the Juyongguan Great Wall and explore the Forbidden City',
      'Discover the Terracotta Warriors in Xi\'an',
      'Cruise on the Li River to Yangshuo through karst landscapes',
      'Experience West Lake and Longjing tea plantations in Hangzhou',
      'Explore the classical Humble Administrator\'s Garden in Suzhou',
      'Enjoy the Huangpu River cruise and Bund in Shanghai',
      'Visit the Lingshan Grand Buddha in Wuxi',
      'Stroll through charming Zhujiajiao Water Town'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing', description: 'Depart from Auckland on your international flight to Beijing. Overnight on board.', meals: [] },
      { day: 2, title: 'Arrival in Beijing', description: 'Arrive in Beijing. Meet your guide and transfer to your hotel. Enjoy some free time to rest.', meals: [], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 3, title: 'Beijing', description: 'Visit Tiananmen Square, National Centre for the Performing Arts, and the Forbidden City. Continue to Beihai Park and visit a silk factory.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 4, title: 'Beijing', description: 'Visit the Great Wall at Juyongguan section, a jade carving factory, and enjoy photo stops at the Bird\'s Nest and Water Cube.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 5, title: 'Beijing — Xi\'an', description: 'Enjoy a pedi-cab Hutong tour through old city neighbourhoods with a family visit. Visit the Summer Palace with Marble Boat and Long Corridor. High-speed train to Xi\'an (Train G89, 15:00–19:12, First Class seat or similar).', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Xi\'an or similar 5-star' },
      { day: 6, title: 'Xi\'an', description: 'Visit the Terracotta Warriors, a 2,000-year-old archaeological site, Circle Vision Movie, and Bronze Chariot. Enjoy a dumpling dinner in the evening.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Xi\'an or similar 5-star' },
      { day: 7, title: 'Xi\'an — Guilin', description: 'Visit the City Wall and Big Wild Goose Pagoda. Flight to Guilin.', meals: ['Breakfast', 'Lunch'], accommodation: 'Guilin Hotel or similar 5-star' },
      { day: 8, title: 'Li River Cruise — Yangshuo', description: 'Cruise on the Li River to Yangshuo through spectacular karst mountain scenery.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Rezen Hotel West Street Yangshuo or similar 5-star' },
      { day: 9, title: 'Yangshuo — Shanghai', description: 'Morning Tai Chi, countryside tour, and cormorant fishing. Flight to Shanghai. Visit the Bund and enjoy a Huangpu River cruise.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 5-star' },
      { day: 10, title: 'Shanghai — Auckland', description: 'Visit Yuyuan Garden and Nanjing Road. Transfer to the airport for your return flight to Auckland.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Discovery — A Tale of Two Cities | 10 Days | CTS Tours',
    metaDescription: 'Experience the contrast between ancient and modern China — Beijing\'s imperial treasures, Xi\'an\'s Terracotta Warriors, Guilin\'s karst landscapes, and Shanghai\'s skyline. 10 days from NZD $3,480. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $1,435
  },
  {
    id: 'tour-cn-dis-3',
    slug: 'essentials',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Best of China',
    title: 'China Discovery — Best of China',
    shortDescription: 'The ultimate 15-day China experience — from the Great Wall and Forbidden City to the Terracotta Warriors, classical gardens of Suzhou, West Lake in Hangzhou, and vibrant Shanghai.',
    duration: '15 Days',
    price: 'From NZD $4,539',
    heroImage: '/images/tours/shanghai-night-blue.jpg',
    gallery: [
      '/images/tours/shanghai-night-blue.jpg',
      '/images/tours/wuzhen-canal.jpg'
    ],
    highlights: [
      'Walk the Juyongguan Great Wall and explore the Forbidden City',
      'Discover the Terracotta Warriors in Xi\'an',
      'Cruise the Li River to Yangshuo through karst landscapes',
      'Experience West Lake and Longjing tea plantations in Hangzhou',
      'Explore the classical Humble Administrator\'s Garden in Suzhou',
      'Visit the Lingshan Grand Buddha in Wuxi',
      'Dress in traditional Hanfu at Xinshi Ancient Town',
      'Enjoy the Huangpu River cruise and Bund in Shanghai',
      'Visit the Stone Forest in Kunming',
      'Stroll through the charming Zhujiajiao Water Town'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai', description: 'Depart from Auckland on your international flight to Shanghai. Overnight on board.', meals: [] },
      { day: 2, title: 'Arrival in Shanghai', description: 'Upon arrival in Shanghai, meet your guide and begin your city tour. Visit the historic Yuyuan Garden and Chenghuang Temple, stroll along Nanjing Road, continue to the iconic Bund for stunning skyline views, then explore the trendy districts of Xintiandi and Tianzifang, known for their Shikumen-style architecture.', meals: ['Lunch'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 5-star' },
      { day: 3, title: 'Shanghai — Suzhou', description: 'Travel to Suzhou and visit the Master of the Nets Garden, Panmen Gate, and Shantang Street.', meals: ['Breakfast', 'Lunch'], accommodation: 'Rosedale Chunshenhu Resort or similar 5-star' },
      { day: 4, title: 'Suzhou — Wuxi', description: 'Visit a silk factory, the Lingshan Grand Buddha scenic area, and the Purple Sand Museum.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Kusatsu Hotel or similar 5-star' },
      { day: 5, title: 'Wuxi', description: 'Visit Three Kingdoms City (warship tour and horse battle show), Pearl Exhibition Center, and enjoy an Ancient Canal boat tour.', meals: ['Breakfast', 'Lunch'], accommodation: 'Kusatsu Hotel or similar 5-star' },
      { day: 6, title: 'Wuxi — Xinshi Town', description: 'Explore Xinshi Town, a thousand-year-old settlement. Experience traditional Hanfu costume photography and enjoy afternoon tea.', meals: ['Breakfast', 'Dinner'], accommodation: 'Holiday Inn or similar 4-star' },
      { day: 7, title: 'Xinshi — Hangzhou', description: 'Free time until 10 AM. Visit West Lake scenic area (Hua Gang Guan Yu, boat tour, Su Causeway) and Leifeng Pagoda.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'New Century Hotel or similar 5-star' },
      { day: 8, title: 'Hangzhou — Shanghai', description: 'Visit Hangzhou International Expo Center (G20 venue), Six Harmonies Pagoda, and Meijiawu Tea Plantation with Longjing tea tasting. Return to Shanghai.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 5-star' },
      { day: 9, title: 'Shanghai — Beijing', description: 'High-speed train to Beijing. Hotel check-in and free time.', meals: ['Breakfast'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 10, title: 'Beijing', description: 'Visit Tiananmen Square, National Centre for the Performing Arts, Forbidden City, Beihai Park, and a silk factory.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 11, title: 'Beijing', description: 'Visit the Great Wall at Juyongguan section, jade carving factory, and Olympic Park (Bird\'s Nest, Water Cube).', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 12, title: 'Beijing', description: 'Enjoy a pedi-cab Hutong tour with a family home visit. Visit the Summer Palace (Marble Boat, Long Corridor).', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar 5-star' },
      { day: 13, title: 'Beijing — Xi\'an', description: 'Morning free time. High-speed train to Xi\'an (Train G89, 15:00–19:12, First Class seat or similar).', meals: ['Breakfast'], accommodation: 'Holiday Inn Express Xi\'an or similar 5-star' },
      { day: 14, title: 'Xi\'an', description: 'Visit the Terracotta Warriors, Circle Vision Movie, and Bronze Chariot. Enjoy Xi\'an dumpling dinner.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Xi\'an or similar 5-star' },
      { day: 15, title: 'Xi\'an — Auckland', description: 'Visit the Old City Wall and Big Wild Goose Pagoda. Transfer to airport for your return flight to Auckland.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (First Class)'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Discovery — Best of China | 15 Days | CTS Tours',
    metaDescription: 'The ultimate 15-day China experience — Great Wall, Forbidden City, Terracotta Warriors, classical gardens, West Lake, and Shanghai. From NZD $4,539. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $1,435
  },
  {
    id: 'tour-cn-dis-4',
    slug: 'shanghai-beyond',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Shanghai & Surroundings',
    title: 'China Discovery — Shanghai & Surroundings',
    shortDescription: 'Discover the Yangtze River Delta region — from classical gardens of Suzhou and the Lingshan Grand Buddha in Wuxi to West Lake in Hangzhou, ancient water towns, and vibrant Shanghai.',
    duration: '10 Days',
    price: 'From NZD $2,999',
    heroImage: '/images/tours/wuzhen-canal.jpg',
    gallery: [
      '/images/tours/wuzhen-canal.jpg',
      '/images/tours/shanghai-night-red.jpg'
    ],
    highlights: [
      'Explore the classical Humble Administrator\'s Garden in Suzhou',
      'Visit the Lingshan Grand Buddha in Wuxi',
      'Experience Three Kingdoms City with live battle show',
      'Dress in traditional Hanfu at Xinshi Ancient Water Town',
      'Cruise on West Lake and visit Leifeng Pagoda in Hangzhou',
      'Visit Longjing tea plantation with tea tasting',
      'Enjoy the Huangpu River cruise and Bund in Shanghai',
      'Stroll through charming Zhujiajiao Water Town'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai', description: 'Depart from Auckland on your international flight to Shanghai. Overnight on board.', meals: [] },
      { day: 2, title: 'Arrival in Shanghai', description: 'Upon arrival in Shanghai, meet your guide and transfer to Suzhou. Visit the Master of the Nets Garden, Panmen Gate, and stroll along Shantang Street.', meals: ['Lunch'], accommodation: 'Rosedale Chunshenhu Resort Hotel or similar 5-star' },
      { day: 3, title: 'Suzhou — Wuxi', description: 'Visit a silk factory, the Lingshan Grand Buddha scenic area, and the Purple Sand Museum.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Kusatsu Hotel or similar 5-star' },
      { day: 4, title: 'Wuxi', description: 'Visit Three Kingdoms City (warship tour and live horse battle show), Pearl Exhibition Center, and enjoy an Ancient Canal boat tour.', meals: ['Breakfast', 'Lunch'], accommodation: 'Kusatsu Hotel or similar 5-star' },
      { day: 5, title: 'Wuxi — Xinshi', description: 'Explore Xinshi Ancient Water Town, a thousand-year-old settlement. Experience traditional Hanfu costume photography and enjoy afternoon tea.', meals: ['Breakfast', 'Dinner'], accommodation: 'Holiday Inn or similar 4-star' },
      { day: 6, title: 'Xinshi — Hangzhou', description: 'Free time until 10 AM. Visit West Lake scenic area (boat tour, Su Causeway) and Leifeng Pagoda.', meals: ['Lunch', 'Dinner'], accommodation: 'New Century Hotel or similar 5-star' },
      { day: 7, title: 'Hangzhou — Shanghai', description: 'Visit Hangzhou International Expo Center, Six Harmonies Pagoda, and Meijiawu Tea Plantation with Longjing tea tasting. Return to Shanghai.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 5-star' },
      { day: 8, title: 'Shanghai', description: 'Visit the Bund, Yuyuan Garden (Ming Dynasty), World Cultural Heritage Art Exhibition Center, and Nanjing Road.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai Fangta or similar 5-star' },
      { day: 9, title: 'Shanghai — Auckland', description: 'Morning free time. Afternoon transfer to the airport for your return flight to Auckland.', meals: ['Breakfast'] },
      { day: 10, title: 'Arrival in Auckland', description: 'Arrive in Auckland. Tour ends.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      'Domestic airfares within China',
      '4–5 star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Discovery — Shanghai & Surroundings | 10 Days | CTS Tours',
    metaDescription: 'Discover the Yangtze River Delta region — Suzhou gardens, Wuxi Buddha, West Lake, water towns, and Shanghai. 10 days from NZD $2,999. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $1,435
  },
  {
    id: 'tour-cn-dis-5',
    slug: 'beijing-xian-guilin',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Beijing, Xi\'an & Guilin',
    title: 'China Discovery — Beijing, Xi\'an & Guilin',
    shortDescription: 'A guided group tour from Beijing to Guilin covering the Great Wall, Terracotta Warriors, and Li River cruise through karst landscapes with 5-star accommodation.',
    duration: '9 Days',
    price: 'From NZD $3,749',
    heroImage: '/images/tours/guilin-mist.jpg',
    gallery: [
      '/images/tours/guilin-mist.jpg',
      '/images/tours/xian-terracotta.jpg'
    ],
    highlights: [
      '5-star hotel accommodation throughout',
      'Great Wall at Mutianyu section',
      'Exclusive Impression of Liu Sanjie landscape performance',
      'Regional cuisine: Roast Duck, hotpot, Yangshuo Beer Fish',
      'UNESCO Terracotta Warriors site',
      'Li River cruise through karst mountain scenery',
      'No compulsory shopping'
    ],
    itinerary: [
      { day: 1, title: 'Beijing Arrival', description: 'Arrive PEK airport, hotel transfer, free time.', meals: [], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 2, title: 'Great Wall & Old City', description: 'Mutianyu Great Wall, Nanluogu Lane historic neighbourhood. Beijing Copper Hotpot dinner.', meals: ['Breakfast', 'Dinner'], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 3, title: 'Free Day in Beijing', description: 'Self-guided or optional excursions: Beijing City Highlights ($109) or Chengde Bullet Train ($199).', meals: ['Breakfast'], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 4, title: 'Beijing — Xi\'an', description: 'Tiananmen Square, Forbidden City, Beijing Roast Duck lunch, Temple of Heaven. Evening flight to Xi\'an.', meals: ['Breakfast', 'Lunch'], accommodation: 'Novotel Xi\'an Daming Palace' },
      { day: 5, title: 'Xi\'an', description: 'Terracotta Warriors (UNESCO), Ancient City Wall, Big Wild Goose Pagoda, Grand Tang Dynasty Ever-bright City.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Novotel Xi\'an Daming Palace' },
      { day: 6, title: 'Xi\'an — Guilin', description: 'Small Wild Goose Pagoda, Bell Tower, Drum Tower, Shadow Play performance. Fly to Guilin.', meals: ['Breakfast', 'Lunch'], accommodation: 'Guilin Lijiang Waterfall Hotel' },
      { day: 7, title: 'Guilin — Yangshuo', description: '4-star Li River cruise to Yangshuo. Explore West Street. Evening \'Impression of Liu Sanjie\' performance.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Yangshuo Green Lotus Hotel' },
      { day: 8, title: 'Yangshuo Scenic Tour', description: 'Ten-Mile Gallery scenic drive, cable car to Ruyi Peak. Evening boat tour of four lakes.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Yangshuo Green Lotus Hotel' },
      { day: 9, title: 'Guilin Departure', description: 'Reed Flute Cave, Elephant Trunk Hill, Dongxi Alley (Ming/Qing district). Airport transfer.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      'Domestic flights: Beijing–Xi\'an, Xi\'an–Guilin',
      '5-star hotel accommodation (twin share)',
      'Daily meals as specified',
      'All ground transfers per itinerary',
      'English-speaking tour guide',
      'Attraction admission tickets',
      'Tips for guides and drivers'
    ],
    exclusions: [
      'International airfare and airport taxes',
      'China visa',
      'Travel insurance',
      'Optional excursions',
      'Personal expenses',
      'Single room supplement (NZD $1,050/person)'
    ],
    metaTitle: 'China Discovery — Beijing, Xi\'an & Guilin | 9 Days | CTS Tours',
    metaDescription: 'A guided group tour from Beijing to Guilin covering the Great Wall, Terracotta Warriors, and Li River cruise through karst landscapes with 5... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-dis-6',
    slug: 'yangtze',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Yangtze',
    title: 'China Discovery — Yangtze',
    shortDescription: 'An immersive journey through China\'s imperial heartland, combining ancient monuments with modern experiences and a luxury river cruise through the Three Gorges.',
    duration: '12 Days',
    price: 'From NZD $5,199',
    heroImage: '/images/tours/chengdu-old-town.jpg',
    gallery: [
      '/images/tours/chengdu-old-town.jpg',
      '/images/tours/guilin-river-valley.jpg'
    ],
    highlights: [
      'Great Wall at Mutianyu section',
      'Forbidden City and Temple of Heaven in Beijing',
      'Terracotta Warriors in Xi\'an',
      'Ancient City Wall and Tang Dynasty performances',
      'Three-night luxury Victoria Sabrina cruise',
      'Three Gorges Dam engineering marvel',
      'Shanghai\'s modern skyline and historic districts'
    ],
    itinerary: [
      { day: 1, title: 'Beijing Arrival', description: 'Arrive PEK airport, hotel transfer.', meals: [], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 2, title: 'Beijing', description: 'Mutianyu Great Wall, Nanluogu Lane. Beijing Copper Hotpot dinner.', meals: ['Breakfast', 'Dinner'], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 3, title: 'Beijing Free Day', description: 'Optional: Summer Palace/Qianmen/Acrobatics or Chengde Bullet Train excursion.', meals: ['Breakfast'], accommodation: 'Sofitel Beijing Central or Grand Metropark Hotel Beijing' },
      { day: 4, title: 'Beijing — Xi\'an', description: 'Tiananmen Square, Forbidden City, Beijing Roast Duck lunch, Temple of Heaven. Evening flight to Xi\'an.', meals: ['Breakfast', 'Lunch'], accommodation: 'Novotel Xi\'an Daming Palace' },
      { day: 5, title: 'Xi\'an', description: 'Terracotta Warriors, Ancient City Wall, Big Wild Goose Pagoda, Grand Tang Dynasty Ever-bright City.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Novotel Xi\'an Daming Palace' },
      { day: 6, title: 'Xi\'an — Chongqing', description: 'Small Wild Goose Pagoda, Bell and Drum Towers, Shadow Play. Afternoon flight to Chongqing.', meals: ['Breakfast', 'Lunch'], accommodation: 'VOCO Chongqing Chaotianmen Hotel' },
      { day: 7, title: 'Chongqing — Yangtze Cruise', description: 'Jiefangbei Pedestrian Street, Hongyadong, Liziba Station light rail. Evening board Victoria Sabrina cruise.', meals: ['Breakfast', 'Lunch'], accommodation: 'Victoria Sabrina (balcony room)' },
      { day: 8, title: 'Yangtze Cruise', description: 'Shuanggui Mountain. Captain\'s Welcome Reception.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Sabrina (balcony room)' },
      { day: 9, title: 'Yangtze Cruise', description: 'Qutang Gorge, Wu Gorge, Goddess River by smaller boat. Captain\'s Farewell Banquet.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Sabrina (balcony room)' },
      { day: 10, title: 'Cruise — Yichang — Shanghai', description: 'Three Gorges Dam visit. Jingzhou Ancient Wall. Afternoon flight to Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: 'DoubleTree by Hilton Shanghai – Pudong' },
      { day: 11, title: 'Shanghai', description: 'Jinmao Tower 88th floor, Wukang Building, Tian Zi Fang, The Bund, City God\'s Temple Ancient Street.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'DoubleTree by Hilton Shanghai – Pudong' },
      { day: 12, title: 'Shanghai Departure', description: 'Breakfast. Airport transfer.', meals: ['Breakfast'] }
    ],
    inclusions: [
      'All domestic flights (Beijing/Xi\'an/Chongqing/Jingzhou/Shanghai)',
      '5-star hotel and cruise accommodation (twin share)',
      'All specified meals',
      'Transfer services per itinerary',
      'English-speaking tour guide',
      'Admission tickets to listed attractions',
      'Gratuities for guides and drivers'
    ],
    exclusions: [
      'International airfare and airport taxes',
      'China visa',
      'Travel insurance',
      'Optional programs and activities',
      'Personal expenses',
      'Single room supplement (NZD $1,290/person)'
    ],
    metaTitle: 'China Discovery — Yangtze | 12 Days | CTS Tours',
    metaDescription: 'An immersive journey through China\'s imperial heartland, combining ancient monuments with modern experiences and a luxury river cruise throu... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-dis-7',
    slug: 'yunnan-explorer',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Colorful Yunnan',
    title: 'China Discovery — Colorful Yunnan',
    shortDescription: 'Discover the natural beauty and rich cultural heritage of Yunnan — from the Stone Forest and Jade Dragon Snow Mountain to Tiger Leaping Gorge, Lijiang Old Town, and the stunning landscapes of Dali.',
    duration: '11 Days',
    price: 'From NZD $3,899',
    heroImage: '/images/tours/yunnan-village.jpg',
    gallery: [
      '/images/tours/yunnan-village.jpg',
      '/images/tours/yunnan-rice-terraces.jpg'
    ],
    highlights: [
      'Visit the UNESCO-listed Stone Forest in Kunming',
      'Explore Jade Dragon Snow Mountain and Blue Moon Valley',
      'Experience the Impression of Lijiang outdoor performance',
      'Discover Tiger Leaping Gorge, one of the world\'s deepest canyons',
      'Walk through Dayan Old Town, a UNESCO World Heritage Site',
      'Cruise on Erhai Lake and explore Dali Ancient City',
      'Visit the Three Pagodas of Dali',
      'Experience the unique culture of Yunnan\'s ethnic minorities'
    ],
    itinerary: [
      { day: 1, title: 'New Zealand — Kunming', description: 'Depart from New Zealand on your international flight to Kunming. Overnight on board.', meals: [] },
      { day: 2, title: 'Arrival in Kunming', description: 'Arrive in Kunming, the "City of Eternal Spring." Meet your guide and transfer to your hotel.', meals: [], accommodation: 'Kunming Hotel or similar 4-star' },
      { day: 3, title: 'Kunming — Stone Forest', description: 'Visit the UNESCO-listed Stone Forest (Shilin), a spectacular karst landscape of limestone formations. In the afternoon, explore the old town or visit the Flower and Bird Market.', meals: ['Breakfast', 'Lunch'], accommodation: 'Kunming Hotel or similar 4-star' },
      { day: 4, title: 'Kunming — Lijiang', description: 'Take a high-speed train to Lijiang. Upon arrival, explore the charming old town and enjoy the local culture.', meals: ['Breakfast', 'Lunch'], accommodation: 'Lijiang Hotel or similar 4-star' },
      { day: 5, title: 'Lijiang — Jade Dragon Snow Mountain', description: 'Visit Jade Dragon Snow Mountain by cable car, then explore Blue Moon Valley by battery car. In the evening, enjoy the "Impression of Lijiang" outdoor performance, directed by Zhang Yimou.', meals: ['Breakfast', 'Lunch'], accommodation: 'Lijiang Hotel or similar 4-star' },
      { day: 6, title: 'Lijiang — Tiger Leaping Gorge', description: 'Full-day excursion to Tiger Leaping Gorge, one of the world\'s deepest canyons, and the First Bend of the Yangtze River. Return to Lijiang.', meals: ['Breakfast', 'Lunch'], accommodation: 'Lijiang Hotel or similar 4-star' },
      { day: 7, title: 'Lijiang — Dali', description: 'Drive to Dali. Visit Dali Ancient City, Dali Museum, and enjoy a boat trip on Erhai Lake.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali Hotel or similar 4-star' },
      { day: 8, title: 'Dali', description: 'Explore the Three Pagodas of Dali, an iconic landmark dating back to the Nanzhao Kingdom. Visit Xizhou Village to experience Bai ethnic culture.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali Hotel or similar 4-star' },
      { day: 9, title: 'Dali — Kunming', description: 'Return to Kunming by high-speed train. Enjoy some free time to explore the city.', meals: ['Breakfast'], accommodation: 'Kunming Hotel or similar 4-star' },
      { day: 10, title: 'Kunming — Free Day', description: 'Enjoy a free day at leisure to explore Kunming or join optional activities.', meals: ['Breakfast'], accommodation: 'Kunming Hotel or similar 4-star' },
      { day: 11, title: 'Kunming — New Zealand', description: 'Transfer to the airport for your return flight to New Zealand.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from New Zealand',
      'Domestic airfares within China',
      '4-star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains'
    ],
    exclusions: [
      'China visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included'
    ],
    metaTitle: 'China Discovery — Colorful Yunnan | 11 Days | CTS Tours',
    metaDescription: 'Discover the natural beauty and rich cultural heritage of Yunnan — Stone Forest, Jade Dragon Snow Mountain, Tiger Leaping Gorge, Lijiang Old Town, and Dali. 11 days from NZD $3,899. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-03-29'
    // Single room supplement: NZD $1,435
  },
  // China Stopover Tours
  {
    id: 'tour-cn-stp-1',
    slug: 'beijing',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Beijing (4 Days)',
    title: 'China Stopover — Beijing (4 Days)',
    shortDescription: 'Experience China\'s capital with visits to iconic landmarks including the Great Wall, Forbidden City, and imperial palaces in this carefully curated Beijing stopover.',
    duration: '4 Days',
    price: 'From NZD $2,120',
    heroImage: '/images/tours/forbidden-city-lion.jpg',
    gallery: [
      '/images/tours/forbidden-city-lion.jpg',
      '/images/tours/forbidden-city-aerial.jpg'
    ],
    highlights: [
      'Tiananmen Square and Forbidden City',
      'Great Wall at Juyongguan section',
      'Ming Tombs (Chang Tomb)',
      'Summer Palace with Marble Boat and Long Corridor',
      'Temple of Heaven',
      'Olympic venues (Bird\'s Nest & Water Cube)',
      'Peking Duck Banquet'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Beijing', description: 'Airport transfer to hotel.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Tiananmen Square', description: 'Visit Tiananmen Square, Forbidden City (nearly 10,000 rooms), and Beihai Park. Evening Peking Duck Banquet.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Great Wall', description: 'Great Wall at Juyongguan section. Jade carving factory. Ming Tombs (Chang Tomb).', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 4, title: 'Summer Palace', description: 'Summer Palace and gardens, Marble Boat and Long Corridor. Olympic venues photo stop. Pearl Factory. Temple of Heaven.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 5, title: 'Departure', description: 'Free time until airport transfer.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation (twin share)',
      'All meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to all sightseeing locations'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (recommended NZD $20/day/person)'
    ],
    metaTitle: 'China Stopover — Beijing (4 Days) | 4 Days | CTS Tours',
    metaDescription: 'Experience China\'s capital with visits to iconic landmarks including the Great Wall, Forbidden City, and imperial palaces in this carefully ... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-2',
    slug: 'beijing-express',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Beijing Express (3 Days)',
    title: 'China Stopover — Beijing Express (3 Days)',
    shortDescription: 'A perfect blend of history, culture, and culinary delights! This Beijing stopover combines iconic landmarks, cultural experiences, and authentic dining.',
    duration: '3 Days',
    price: 'From NZD $1,450',
    heroImage: '/images/tours/forbidden-city-lion-2.jpg',
    gallery: [
      '/images/tours/forbidden-city-lion-2.jpg'
    ],
    highlights: [
      'Tiananmen Square and the Forbidden City',
      'Great Wall at Juyongguan section',
      'Pedicab tour through historic Hutong neighbourhoods',
      'Local family visit',
      'Peking Duck Banquet dinner',
      'Free time for exploration and shopping'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Beijing', description: 'Airport transfer. Tiananmen Square and Forbidden City tour. Evening Peking Duck Banquet.', meals: ['Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 2, title: 'Beijing', description: 'Great Wall at Juyongguan section. Jade factory visit. Pedicab tour of Hutong neighbourhoods. Local family visit.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 3, title: 'Departure', description: 'Free time to explore or shop before airport transfer.', meals: ['Breakfast'], accommodation: '4-star hotel' }
    ],
    inclusions: [
      '4-star hotel accommodation (twin share)',
      'All meals per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Entrance fees',
      'Sightseeing activities'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (NZD $25/day/person)',
      'China visa fees'
    ],
    metaTitle: 'China Stopover — Beijing Express (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'A perfect blend of history, culture, and culinary delights! This Beijing stopover combines iconic landmarks, cultural experiences, and authe... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-3',
    slug: 'shanghai',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai (3 Days)',
    title: 'China Stopover — Shanghai (3 Days)',
    shortDescription: 'Explore dynamic and beautiful Shanghai on China\'s east coast, experiencing the city\'s transformation from a sleepy fishing town to a modern metropolis of skyscrapers and modern lifestyle.',
    duration: '3 Days',
    price: 'From NZD $1,060',
    heroImage: '/images/tours/shanghai-night-red.jpg',
    gallery: [
      '/images/tours/shanghai-night-red.jpg',
      '/images/tours/shanghai-night-blue.jpg'
    ],
    highlights: [
      'Old Town with winding alleyways, shops, and teahouses',
      'Yu Garden',
      'Silk Spinning Mill',
      'Shanghai Museum',
      'Bund promenade stroll',
      'Huangpu River cruise'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Shanghai', description: 'Airport pickup and hotel transfer.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Shanghai', description: 'Old Town exploration. Yu Garden visit. Silk Spinning Mill tour. Shanghai Museum. Bund walk. Huangpu River cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Shanghai Departure', description: 'Free time until airport transfer.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'All meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission fees per itinerary'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (recommended NZD $20/day/person)'
    ],
    metaTitle: 'China Stopover — Shanghai (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'Explore dynamic and beautiful Shanghai on China\'s east coast, experiencing the city\'s transformation from a sleepy fishing town to a modern ... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-4',
    slug: 'shanghai-express',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai Express (2 Days)',
    title: 'China Stopover — Shanghai Express (2 Days)',
    shortDescription: 'See the best Shanghai has to offer! This compact stopover showcases Shanghai\'s historic and modern attractions in an efficient timeframe.',
    duration: '2 Days',
    price: 'From NZD $875',
    heroImage: '/images/tours/shanghai-night-blue.jpg',
    gallery: [
      '/images/tours/shanghai-night-blue.jpg'
    ],
    highlights: [
      'China Town exploration with traditional alleyways',
      'Yu Garden (tranquil classical garden)',
      'Tianzifang bohemian district with Shikumen architecture',
      'The Bund promenade',
      'Huangpu River scenic cruise'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Shanghai', description: 'Guided visits to China Town, Yu Garden, Tianzifang, and the Bund. Huangpu River cruise.', meals: ['Lunch', 'Dinner'], accommodation: 'Lee Gardens Hotel (4-star) or similar' },
      { day: 2, title: 'Departure Shanghai', description: 'Morning airport transfer for departure.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as specified',
      'English-speaking guide',
      'Land transfers',
      'Admission to scheduled attractions'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Gratuities (suggested CNY 100/day/person)'
    ],
    metaTitle: 'China Stopover — Shanghai Express (2 Days) | 2 Days | CTS Tours',
    metaDescription: 'See the best Shanghai has to offer! This compact stopover showcases Shanghai\'s historic and modern attractions in an efficient timeframe. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-5',
    slug: 'chengdu',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Chengdu (3 Days)',
    title: 'China Stopover — Chengdu (3 Days)',
    shortDescription: 'This stopover showcases Chengdu, capital of Sichuan province, known as \'The Land of Abundance\'. Explore the region\'s natural heritage and cultural attractions.',
    duration: '3 Days',
    price: 'From NZD $1,359',
    heroImage: '/images/tours/chengdu-pandas.jpg',
    gallery: [
      '/images/tours/chengdu-pandas.jpg',
      '/images/tours/chengdu-old-town.jpg'
    ],
    highlights: [
      'Giant Panda Breeding and Research Centre',
      'People\'s Park (traditional tea house)',
      'Jinli Street (ancient commercial boulevard)',
      'Broad and Narrow Alley',
      'Dujiangyan Irrigation System (UNESCO, 2,300+ years old)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Chengdu', description: 'Guide meets at airport. Transfer to hotel.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Panda Centre & City', description: 'Giant Panda Breeding and Research Centre. Tea house at People\'s Park. Explore Jinli Street and Broad and Narrow Alley.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Chengdu Departure', description: 'Visit Dujiangyan Irrigation System. Transfer to airport.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'All meals per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission fees to scheduled attractions'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Gratuities (recommended NZD $25/day/person)'
    ],
    metaTitle: 'China Stopover — Chengdu (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'This stopover showcases Chengdu, capital of Sichuan province, known as \'The Land of Abundance\'. Explore the region\'s natural heritage and cu... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-6',
    slug: 'guilin',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guilin (3 Days)',
    title: 'China Stopover — Guilin (3 Days)',
    shortDescription: 'Explore Guilin\'s scenic landscapes featuring a Li River cruise to Yangshuo, limestone cave exploration, and iconic mountain formations.',
    duration: '3 Days',
    price: 'From NZD $1,099',
    heroImage: '/images/tours/guilin-mist.jpg',
    gallery: [
      '/images/tours/guilin-mist.jpg'
    ],
    highlights: [
      'Li River cruise',
      'Reed Flute Cave',
      'Elephant Trunk Hill'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Guilin', description: 'Guide meets at arrival. Transfer to hotel.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Guilin/Yangshuo/Guilin', description: '5–6 hour Li River cruise through scenic mountain formations. Visit Yangshuo market. Pearl Museum visit upon return.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Guilin Departure', description: 'Reed Flute Cave (stalactites and stalagmites). Elephant Trunk Hill. Transfer to airport.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation (twin share)',
      'Meals as specified',
      'English-speaking guide',
      'Land transfers',
      'Admission fees per itinerary'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping ($25 NZD/day/person suggested)'
    ],
    metaTitle: 'China Stopover — Guilin (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'Explore Guilin\'s scenic landscapes featuring a Li River cruise to Yangshuo, limestone cave exploration, and iconic mountain formations. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-7',
    slug: 'xian',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Xi\'an (3 Days)',
    title: 'China Stopover — Xi\'an (3 Days)',
    shortDescription: 'Immerse yourself in the rich history of Xi\'an, China\'s ancient capital, with experiences centred on archaeological treasures and cultural landmarks.',
    duration: '3 Days',
    price: 'From NZD $945',
    heroImage: '/images/tours/xian-terracotta.jpg',
    gallery: [
      '/images/tours/xian-terracotta.jpg',
      '/images/tours/xian-terracotta-2.jpg'
    ],
    highlights: [
      '2,000-year-old Terracotta Warriors with Circle Vision Movie',
      'Muslim Quarter and Great Mosque',
      'Traditional dumpling banquet with cultural show',
      'Shaanxi History Museum'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Xi\'an', description: 'Airport pickup and hotel transfer.', meals: [], accommodation: '4-star Xian Grand New World Hotel' },
      { day: 2, title: 'Xi\'an Sightseeing', description: 'Terracotta Warriors Museum. Ceramic and lacquer ware factory. Muslim Quarter walking tour, Great Mosque. Evening dumpling banquet with cultural performance.', meals: ['Breakfast', 'Dinner'], accommodation: '4-star Xian Grand New World Hotel' },
      { day: 3, title: 'Departure', description: 'Shaanxi History Museum (closed Mondays). Airport transfer.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as specified',
      'English-speaking guide',
      'Land transfers',
      'Admission fees per itinerary'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (suggested NZ$20/day/person)'
    ],
    metaTitle: 'China Stopover — Xi\'an (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'Immerse yourself in the rich history of Xi\'an, China\'s ancient capital, with experiences centred on archaeological treasures and cultural la... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-8',
    slug: 'guangzhou',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guangzhou (3 Days)',
    title: 'China Stopover — Guangzhou (3 Days)',
    shortDescription: 'Transform a lengthy journey into a rejuvenating escape. Explore vibrant streets, sample traditional Cantonese cuisine, and experience the city\'s relaxed pace.',
    duration: '3 Days',
    price: 'From NZD $1,399',
    heroImage: '/images/tours/shanghai-yuyuan-night.jpg',
    gallery: [
      '/images/tours/shanghai-yuyuan-night.jpg'
    ],
    highlights: [
      'Nanfeng Kiln and Shiwan pottery centre',
      'Ancestral Temple with Ming Dynasty architecture',
      'Chen Family Academy from the 1890s',
      'Six Banyan Temple and Hua Ta Pagoda',
      'Canton Tower for panoramic views',
      'Shamian Island cultural experiences'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Guangzhou', description: 'Guide meets travellers. Transfer to hotel.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Guangzhou — Foshan', description: 'Nanfeng Kiln in Shiwan. Zu Miao temple. Liang\'s Gardens. Lingnan Xintiandi. Return to Guangzhou.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Guangzhou Departure', description: 'Chen Family Academy. Six Banyan Temple and Hua Ta Pagoda. Qingping market. Shamian Island. Yuexiu Park and Canton Tower. Airport transfer.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation (twin room)',
      'All meals as specified',
      'English-speaking guide',
      'Land transfers',
      'Admission to all listed attractions'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (suggested NZD $20/day/person)'
    ],
    metaTitle: 'China Stopover — Guangzhou (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'Transform a lengthy journey into a rejuvenating escape. Explore vibrant streets, sample traditional Cantonese cuisine, and experience the ci... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-9',
    slug: 'shanghai-suzhou',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai & Suzhou (3 Days)',
    title: 'China Stopover — Shanghai & Suzhou (3 Days)',
    shortDescription: 'A vibrant fusion of tradition and modernity through Shanghai\'s old quarters, artistic neighbourhoods, and riverfront, plus Suzhou\'s water-town charm and elegant gardens.',
    duration: '3 Days',
    price: 'From NZD $1,356',
    heroImage: '/images/tours/suzhou-canal.jpg',
    gallery: [
      '/images/tours/suzhou-canal.jpg',
      '/images/tours/wuzhen-canal.jpg'
    ],
    highlights: [
      'Yu Garden and Tianzifang bohemian area',
      'The Bund promenade and Huangpu River cruise',
      'Suzhou — the \'Oriental Venice\'',
      'Garden of the Master of Fishing Net',
      'Silk Spinning Mill',
      'Canal boat cruise on 1,000-year-old waterway'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Shanghai', description: 'Airport pickup. Visit Yu Garden, explore Tianzifang (Shikumen houses), stroll the Bund. Huangpu River cruise.', meals: ['Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 2, title: 'Suzhou', description: 'Day trip to Suzhou. Garden of the Master of Fishing Net. Silk Spinning Mill. Canal boat cruise on ancient waterway. Shan Tang Street. Return to Shanghai.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Shanghai Departure', description: 'Airport transfer.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (NZD $25/day/person)'
    ],
    metaTitle: 'China Stopover — Shanghai & Suzhou (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'A vibrant fusion of tradition and modernity through Shanghai\'s old quarters, artistic neighbourhoods, and riverfront, plus Suzhou\'s water-to... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-10',
    slug: 'shanghai-wuzhen',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai & Wuzhen (4 Days)',
    title: 'China Stopover — Shanghai & Wuzhen (4 Days)',
    shortDescription: 'Explore Shanghai\'s modern attractions combined with the timeless beauty of Wuzhen, the peerless water town in the south of the Yangtze River.',
    duration: '4 Days',
    price: 'From NZD $1,760',
    heroImage: '/images/tours/wuzhen-canal.jpg',
    gallery: [
      '/images/tours/wuzhen-canal.jpg',
      '/images/tours/suzhou-canal.jpg'
    ],
    highlights: [
      'Shanghai Old Town and Yu Garden',
      'Silk Spinning Mill',
      'Shanghai Museum',
      'Huangpu River cruise',
      'Wuzhen water town',
      'Traditional residences and workshops'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Shanghai', description: 'Airport pickup and hotel transfer.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Shanghai', description: 'Old Town, Yu Garden, Silk Spinning Mill, Shanghai Museum. Evening Bund stroll and Huangpu River cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Wuzhen', description: 'Day trip to Wuzhen scenic area (2-hour drive). Traditional residences, workshops. Return to Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 4, title: 'Shanghai Departure', description: 'Free time until airport transfer.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (CNY 100/day/person)'
    ],
    metaTitle: 'China Stopover — Shanghai & Wuzhen (4 Days) | 4 Days | CTS Tours',
    metaDescription: 'Explore Shanghai\'s modern attractions combined with the timeless beauty of Wuzhen, the peerless water town in the south of the Yangtze River... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-11',
    slug: 'guilin-surrounds',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guilin & Surrounds (4 Days)',
    title: 'China Stopover — Guilin & Surrounds (4 Days)',
    shortDescription: 'Discover breathtaking landscapes and rich cultural heritage through visits to limestone caves, terraced mountains, ethnic villages, and a scenic Li River cruise.',
    duration: '4 Days',
    price: 'From NZD $1,310',
    heroImage: '/images/tours/guilin-river-valley.jpg',
    gallery: [
      '/images/tours/guilin-river-valley.jpg',
      '/images/tours/guilin-mist.jpg'
    ],
    highlights: [
      'Reed Flute Cave',
      'Dragon\'s Backbone rice terraces at Longsheng',
      'Zhuang and Yao Minority villages',
      'Li River cruise through karst scenery',
      'Yangshuo local market'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Reed Flute Cave', description: 'Guide meets at arrival. Hotel transfer. Visit Reed Flute Cave (if time allows).', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Guilin — Longsheng — Guilin', description: 'Full-day excursion to Longsheng. Longji area, Zhuang and Yao Minority villages, Dragon\'s Backbone summit. Pearl Museum.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 3, title: 'Guilin — Yangshuo', description: 'Li River cruise through karst mountains, villages, fishermen on bamboo rafts. Explore Yangshuo\'s local market.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 4, title: 'Yangshuo — Guilin', description: 'Morning free time with optional bike rentals to explore karst landscapes. Transfer to Guilin airport.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation (twin room)',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (NZD $25/day/person)'
    ],
    metaTitle: 'China Stopover — Guilin & Surrounds (4 Days) | 4 Days | CTS Tours',
    metaDescription: 'Discover breathtaking landscapes and rich cultural heritage through visits to limestone caves, terraced mountains, ethnic villages, and a sc... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-12',
    slug: 'zhangjiajie',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Zhangjiajie (3 Days)',
    title: 'China Stopover — Zhangjiajie (3 Days)',
    shortDescription: 'Experience Zhangjiajie\'s stunning natural landscapes, including Tianmen Mountain, the Bailong Elevator, and the famous Glass Bridge — the inspiration for Avatar.',
    duration: '3 Days',
    price: 'From NZD $1,899',
    heroImage: '/images/tours/zhangjiajie.jpg',
    gallery: [
      '/images/tours/zhangjiajie.jpg'
    ],
    highlights: [
      'Tianmen Mountain National Forest Park',
      'Cable car, glass skywalk, and Guigu Cliff Path',
      'Bailong Elevator — world\'s fastest sightseeing elevator',
      'Yuanjiajie, First Bridge Under Heaven, Tianzi Mountain',
      'Zhangjiajie Grand Canyon Glass Bridge'
    ],
    itinerary: [
      { day: 1, title: 'Guangzhou — Zhangjiajie', description: 'Morning train from Guangzhou. Tianmen Mountain National Forest Park: cable car, eco shuttle, escalator at Tianmen Cave, glass skywalk.', meals: ['Dinner'], accommodation: '4-star hotel' },
      { day: 2, title: 'Zhangjiajie', description: 'Bailong Elevator to Yuanjiajie. Mihun Stage, First Bridge Under Heaven, Tianzi Mountain. Cable car descent.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Zhangjiajie Departure', description: 'Zhangjiajie Grand Canyon Glass Bridge. Transfer to railway station, return to Guangzhou.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places',
      '2nd-class train tickets (Guangzhou–Zhangjiajie return)'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (NZD $25/day/person)'
    ],
    metaTitle: 'China Stopover — Zhangjiajie (3 Days) | 3 Days | CTS Tours',
    metaDescription: 'Experience Zhangjiajie\'s stunning natural landscapes, including Tianmen Mountain, the Bailong Elevator, and the famous Glass Bridge — the in... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-13',
    slug: 'guangzhou-shenzhen',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guangzhou & Shenzhen (4 Days)',
    title: 'China Stopover — Guangzhou & Shenzhen (4 Days)',
    shortDescription: 'Explore the dynamic city of Shenzhen with futuristic skyscrapers, vibrant shopping districts, and rich cultural landmarks. Experience innovation, cuisine, and a fusion of tradition and modernity.',
    duration: '4 Days',
    price: 'From NZD $2,340',
    heroImage: '/images/tours/china-pagoda-night.jpg',
    gallery: [
      '/images/tours/china-pagoda-night.jpg'
    ],
    highlights: [
      'Lotus Hill Park and Deng Xiaoping Sculpture',
      'Shenzhen Bay Park coastal greenway',
      'Splendid China Folk Culture Village',
      'Wutong Mountain — highest peak in Shenzhen',
      'Ping An Finance Centre observation deck',
      'Dongmen Pedestrian Street'
    ],
    itinerary: [
      { day: 1, title: 'Guangzhou — Shenzhen', description: 'Coach from Guangzhou to Shenzhen (~2 hours). Lotus Hill Park and Deng Xiaoping Sculpture.', meals: ['Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 2, title: 'Shenzhen Bay Park', description: 'Shenzhen Bay Park coastal greenway with mangroves. Afternoon: Splendid China + Folk Culture Village with ethnic performances.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 3, title: 'Wutong Mountain', description: 'Climb Wutong Mountain. Shenzhen Museum. Dongmen Pedestrian Street.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star hotel' },
      { day: 4, title: 'Ping An Finance Centre — Departure', description: 'Ping An Finance Centre Cloud Top Observation Deck. Free time. Transfer to Guangzhou Baiyun Airport.', meals: ['Breakfast'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (NZD $25/day/person)'
    ],
    metaTitle: 'China Stopover — Guangzhou & Shenzhen (4 Days) | 4 Days | CTS Tours',
    metaDescription: 'Explore the dynamic city of Shenzhen with futuristic skyscrapers, vibrant shopping districts, and rich cultural landmarks. Experience innova... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-cn-stp-14',
    slug: 'huangshan',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Huangshan (4 Days)',
    title: 'China Stopover — Huangshan (4 Days)',
    shortDescription: 'Experience the breathtaking beauty of Huangshan with a scenic cable car ride up Yellow Mountain, overnight stay atop the mountain, and visits to UNESCO-listed Hongcun and Nanping villages.',
    duration: '4 Days',
    price: 'From NZD $1,635',
    heroImage: '/images/tours/yunnan-village.jpg',
    gallery: [
      '/images/tours/yunnan-village.jpg'
    ],
    highlights: [
      'Cable car ride up Yellow Mountain',
      'Overnight stay atop Mt. Huangshan',
      'Magnificent sunrise (weather permitting)',
      'Summit of Brightness, Beginning-to-believe Peak',
      'Tunxi Old Street and Ink Factory',
      'UNESCO-listed Hongcun village (Crouching Tiger Hidden Dragon filming location)',
      'Nanping village (Judou filming location)'
    ],
    itinerary: [
      { day: 1, title: 'Tunxi (Huangshan)', description: 'Arrival in Tunxi (Huangshan). Guide meets and transfers to hotel.', meals: [], accommodation: '4-star hotel' },
      { day: 2, title: 'Tunxi — Mt. Huangshan', description: 'Cable car ascent to Yellow Mountain. View Summit of Brightness, Beginning-to-believe Peak, Dropped Rock, Paiyun Pavilion, \'Monkey viewing the sea\'.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel (on mountain)' },
      { day: 3, title: 'Mt. Huangshan — Tunxi', description: 'Watch magnificent sunrise (weather permitting). Explore mountain. Cable car down. Tunxi Old Street and Ink Factory.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: '4-star hotel' },
      { day: 4, title: 'Yixian — Nanping — Tunxi', description: 'Visit Hongcun village (UNESCO, Crouching Tiger Hidden Dragon location) and Nanping village (Judou location). Airport transfer.', meals: ['Breakfast', 'Lunch'] }
    ],
    inclusions: [
      '4-star hotel accommodation',
      'Meals as per itinerary',
      'English-speaking guide',
      'Land transfers',
      'Admission to sightseeing places'
    ],
    exclusions: [
      'Airfare',
      'Personal expenses',
      'Tipping (CNY 100/day/person)'
    ],
    metaTitle: 'China Stopover — Huangshan (4 Days) | 4 Days | CTS Tours',
    metaDescription: 'Experience the breathtaking beauty of Huangshan with a scenic cable car ride up Yellow Mountain, overnight stay atop the mountain, and visit... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  // Japan Tours
  {
    id: 'tour-jp-sig-1',
    slug: 'ultimate',
    destination: 'japan',
    tier: 'signature',
    name: 'Japan Signature — Ultimate',
    title: 'Japan Signature — Ultimate',
    shortDescription: 'A comprehensive Japan journey combining history, culture, and natural beauty across multiple regions, featuring iconic landmarks, scenic railways, and overnight ferry travel.',
    duration: '18 Days',
    price: 'From NZD $8,999',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80'
    ],
    highlights: [
      'Tokyo\'s iconic landmarks and Sensoji Temple',
      'Kamakura\'s Great Buddha',
      'Nostalgic Oigawa Railway experience',
      'Iga Ninja Museum',
      'Kyoto\'s Fushimi Inari Taisha Shrine',
      'Himeji Castle',
      'Miyajima Island and Itsukushima Shrine',
      'Hiroshima Peace Memorial',
      'Overnight ferry experience',
      'Edo-period villages (Narai-juku, Tsumago-juku)',
      'Mt. Fuji and Lake Kawaguchi',
      'Nara deer park'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — China Transit City', description: 'Depart Auckland via transit through Beijing, Shanghai, or similar Chinese hub.', meals: [] },
      { day: 2, title: 'China — Tokyo', description: 'Arrive Tokyo. Meet and greet, hotel transfer.', meals: [], accommodation: 'Shinagawa Prince Hotel or similar' },
      { day: 3, title: 'Tokyo Highlights', description: 'Visit Tsukiji Outer Market, Sensoji Temple, Meiji Shrine, and Shinjuku Gyoen National Garden.', meals: ['Breakfast'], accommodation: 'Shinagawa Prince Hotel or similar' },
      { day: 4, title: 'Tokyo — Kamakura — Shizuoka', description: 'Explore Kamakura\'s Great Buddha and Tsurugaoka Hachimangu Shrine, stroll Enoshima Island.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hotel Associa Shizuoka or similar' },
      { day: 5, title: 'Shizuoka — Oigawa Railway — Nagoya', description: 'Experience the nostalgic Oigawa Railway and visit a green tea plantation.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hotel JAL City Nagoya or similar' },
      { day: 6, title: 'Nagoya — Iga — Kyoto', description: 'Visit the Iga Ninja Museum and Fushimi Inari Taisha Shrine.', meals: ['Breakfast', 'Lunch'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 7, title: 'Kyoto Free Day', description: 'Optional Kyoto Cultural Discovery tour including matcha experience and temples.', meals: ['Breakfast'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 8, title: 'Kyoto — Himeji Castle — Okayama', description: 'Visit iconic Himeji Castle. Enjoy Shinkansen ride.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Okayama International Hotel or similar' },
      { day: 9, title: 'Okayama — Miyajima — Hiroshima', description: 'Tour Miyajima Island and Itsukushima Shrine, then Hiroshima Peace Memorial Park and Atomic Bomb Dome.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hiroshima Oriental Hotel or similar' },
      { day: 10, title: 'Hiroshima — Kintaikyo Bridge — Fukuoka', description: 'Visit Kintaikyo Bridge and Sanzoku Restaurant en route to Fukuoka.', meals: ['Breakfast', 'Lunch'], accommodation: 'Hotel JAL City Hakata or similar' },
      { day: 11, title: 'Fukuoka — Overnight Ferry', description: 'Visit Dazaifu Tenmangu Shrine and Canal City Hakata. Evening overnight ferry departure.', meals: ['Breakfast'], accommodation: 'Meimon Taiyo Ferry (Second Class DLX Twin Room)' },
      { day: 12, title: 'Osaka', description: 'Visit Osaka Castle Park, Shinsaibashi, and Dotonbori.', meals: ['Breakfast'], accommodation: 'Osaka KKR Hotel or similar' },
      { day: 13, title: 'Osaka Free Day', description: 'Optional Kyoto Seaside Excursion including Amanohashidate and thatched village.', meals: ['Breakfast'], accommodation: 'Osaka KKR Hotel or similar' },
      { day: 14, title: 'Osaka — Nara — Gifu', description: 'Visit Nara Park to see the friendly deer, then proceed to Gifu.', meals: ['Breakfast'], accommodation: 'Miyako Hotel Gifu or similar' },
      { day: 15, title: 'Gifu — Narai-juku & Tsumago-juku — Nagano', description: 'Stroll through the Edo-period post towns of Narai-juku and Tsumago-juku.', meals: ['Breakfast'], accommodation: 'Ikenotaira Onsen Hotel, Nagano or similar' },
      { day: 16, title: 'Nagano — Mt. Fuji — Yokohama', description: 'Visit Mt. Fuji 5th Station and enjoy lake cruise on Lake Kawaguchi.', meals: ['Breakfast'], accommodation: 'Shin-Yokohama Prince Hotel or similar' },
      { day: 17, title: 'Yokohama — Return', description: 'Transfer to Tokyo Narita or Haneda Airport for return flight.', meals: ['Breakfast'] },
      { day: 18, title: 'Arrive in New Zealand', description: 'Arrive Auckland. Tour ends.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and second-class train',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary'
    ],
    exclusions: [
      'Japan visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $15 per day per person)'
    ],
    metaTitle: 'Japan Signature — Ultimate | 18 Days | CTS Tours',
    metaDescription: 'A comprehensive Japan journey combining history, culture, and natural beauty across multiple regions, featuring iconic landmarks, scenic rai... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-jp-dis-1',
    slug: 'highlights',
    destination: 'japan',
    tier: 'discovery',
    name: 'Japan Discovery — Highlights',
    title: 'Japan Discovery — Highlights',
    shortDescription: 'Experience Japan blending timeless beauty with modern marvels. Journey includes ancient temples, bustling markets, Mt. Fuji, snow monkeys, UNESCO villages, and historic castles from Tokyo to Osaka.',
    duration: '18 Days',
    price: 'From NZD $10,999',
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'
    ],
    highlights: [
      'Mt. Fuji with Lake Ashi cruise and Hakone Ropeway',
      'Snow monkeys bathing in hot springs (Jigokudani)',
      'UNESCO Shirakawa-go gassho-style village',
      'Traditional Japanese tea ceremony in Kyoto',
      'Shinkansen bullet train experience',
      'Hiroshima Peace Memorial',
      'Miyajima\'s Itsukushima Shrine',
      'Himeji Castle',
      'Ancient temples and gardens throughout'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai/Beijing — Tokyo', description: 'Depart Auckland, transit in Shanghai.', meals: [] },
      { day: 2, title: 'Tokyo', description: 'Arrive Tokyo, free time depending on flight schedule.', meals: [], accommodation: 'Shinagawa Prince Hotel Tokyo or similar' },
      { day: 3, title: 'Tokyo Highlights', description: 'Visit Meiji Shrine, Outer Gardens of Imperial Palace, Tsukiji Market, Sensoji Temple, and Akihabara Electric Town.', meals: ['Breakfast', 'Lunch'], accommodation: 'Shinagawa Prince Hotel Tokyo or similar' },
      { day: 4, title: 'Deeper Tokyo', description: 'Asakusa district, Sensoji Temple, Nakamise Shopping Street. Ascend Tokyo Skytree for panoramic views.', meals: ['Breakfast', 'Lunch'], accommodation: 'Shinagawa Prince Hotel Tokyo or similar' },
      { day: 5, title: 'Fuji Five Lake Region', description: 'Lake Ashi boat cruise and Hakone Ropeway to Owakudani Valley.', meals: ['Breakfast', 'Lunch'], accommodation: 'Tenseien Hotel Hakone or similar' },
      { day: 6, title: 'Mt. Fuji — Nagano', description: 'Mt. Fuji 5th Station (weather permitting), Itchiku Kubota Art Museum, continue to Nagano.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Hotel Matsushiro Nagano or similar' },
      { day: 7, title: 'Nagano', description: 'Jigokudani Monkey Park to observe wild macaques in hot springs. Zenkoji Temple.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Hotel Matsushiro Nagano or similar' },
      { day: 8, title: 'Nagano — Takayama', description: 'Daio Wasabi Farm, Ishii Miso Brewery, Matsumoto Castle. Proceed to Takayama with hot spring experience.', meals: ['Breakfast', 'Lunch'], accommodation: 'Takayama Green Hotel or similar' },
      { day: 9, title: 'Takayama Cultural Tour', description: 'Miyagawa Morning Market, Takayama Jinya, Yatai Kaikan (Festival Floats), Kusakabe Folk Museum.', meals: ['Breakfast', 'Lunch'], accommodation: 'Takayama Green Hotel or similar' },
      { day: 10, title: 'Shirakawa-go — Kanazawa', description: 'UNESCO gassho-style village of Shirakawa-go. Traditional washi paper-making in Gokayama. Nomura Samurai House.', meals: ['Breakfast', 'Lunch'], accommodation: 'Kanazawa Tokyu Hotel or similar' },
      { day: 11, title: 'Kanazawa — Kyoto', description: 'Stroll through Kenrokuen Garden, then continue to Kyoto.', meals: ['Breakfast', 'Lunch'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 12, title: 'Kyoto Cultural Immersion', description: 'Kiyomizu-dera Temple, traditional tea ceremony, famous Fushimi Inari Shrine.', meals: ['Breakfast', 'Lunch'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 13, title: 'Kyoto — Hiroshima', description: 'Golden Pavilion (Kinkaku-ji) and Ryoan-ji Zen garden. Shinkansen bullet train to Hiroshima.', meals: ['Breakfast', 'Lunch'], accommodation: 'Hiroshima Prince Hotel or similar' },
      { day: 14, title: 'Hiroshima — Miyajima', description: 'Peace Memorial Park and Museum. Ferry to Miyajima Island and Itsukushima Shrine.', meals: ['Breakfast', 'Lunch'], accommodation: 'Hiroshima Prince Hotel or similar' },
      { day: 15, title: 'Himeji Castle — Osaka', description: 'Majestic Himeji Castle and Koko-en Garden. Continue to Osaka.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Osaka Namba or similar' },
      { day: 16, title: 'Osaka — Nara — Osaka', description: 'Day trip to Nara: Todai-ji Temple and Isuien Garden. Return to Osaka for Dotonbori and Osaka Castle.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Osaka Namba or similar' },
      { day: 17, title: 'Osaka — Departure', description: 'Depart from Osaka via Beijing or Shanghai.', meals: ['Breakfast'] },
      { day: 18, title: 'Arrive Auckland', description: 'Arrive back in New Zealand.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and second-class train',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary'
    ],
    exclusions: [
      'Japan visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $15 per day per person)'
    ],
    metaTitle: 'Japan Discovery — Highlights | 18 Days | CTS Tours',
    metaDescription: 'Experience Japan blending timeless beauty with modern marvels. Journey includes ancient temples, bustling markets, Mt. Fuji, snow monkeys, U... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-jp-dis-2',
    slug: 'explorer',
    destination: 'japan',
    tier: 'discovery',
    name: 'Japan Discovery — Explorer',
    title: 'Japan Discovery — Explorer',
    shortDescription: 'An immersive Japan journey from Tokyo to Osaka, combining iconic sights like Mt. Fuji, Matsumoto Castle, and Shirakawa-go with cultural traditions including tea ceremonies and gold leaf crafting.',
    duration: '14 Days',
    price: 'From NZD $8,699',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80'
    ],
    highlights: [
      'Mt. Fuji visit and Lake Ashi cruise',
      'Matsumoto Castle exploration',
      'UNESCO-listed Shirakawa-go village',
      'Traditional washi paper-making',
      'Gold leaf crafting experience in Kanazawa',
      'Kyoto temples (Golden Pavilion, Ryoan-ji)',
      'Japanese tea ceremony participation',
      'Mount Koya spiritual sites',
      'Osaka Castle and Dotonbori district'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai/Beijing — Tokyo', description: 'Depart Auckland, transit through Shanghai or Beijing.', meals: [] },
      { day: 2, title: 'Tokyo', description: 'Arrive Tokyo, greeting and hotel transfer.', meals: [], accommodation: 'Sunshine City Prince Hotel or similar' },
      { day: 3, title: 'Discover Tokyo', description: 'Tokyo Skytree, Sensoji Temple, Imperial Palace Outer Gardens, Hamarikyu Gardens. Evening dinner cruise on Tokyo Bay.', meals: ['Breakfast', 'Lunch'], accommodation: 'Sunshine City Prince Hotel or similar' },
      { day: 4, title: 'Mt. Fuji Adventure', description: 'Shinkansen to Odawara. Lake Ashi cruise, Komagatake Ropeway, Mt. Fuji\'s 5th Station (weather permitting).', meals: ['Breakfast', 'Lunch'], accommodation: 'Hotel Funinoko or similar' },
      { day: 5, title: 'Matsumoto Castle & Miso Culture', description: 'Tour iconic Matsumoto Castle and visit local brewery for traditional miso-making.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Hotel Matsushiro Nagano or similar' },
      { day: 6, title: 'Takayama Heritage', description: 'Miyagawa Morning Market, Edo-period homes, Festival Float Exhibition Hall, Kusakabe Folk Museum, Takayama Jinya.', meals: ['Breakfast'], accommodation: 'Takayama Green Hotel or similar' },
      { day: 7, title: 'Shirakawa-go — Kanazawa', description: 'UNESCO Shirakawa-go village with gassho-zukuri houses. Washi paper-making. Travel to Kanazawa and visit Kenrokuen Garden.', meals: ['Breakfast', 'Lunch'], accommodation: 'Kanazawa Tokyu Hotel or similar' },
      { day: 8, title: 'Kanazawa — Kyoto', description: 'Gold leaf crafting, Higashi Chaya district, historic Shima Teahouse. Travel to Kyoto.', meals: ['Breakfast', 'Lunch'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 9, title: 'Kyoto Traditions', description: 'Ryoan-ji Zen garden, Golden Pavilion (Kinkaku-ji). Participate in origami and traditional Japanese tea ceremony.', meals: ['Breakfast', 'Lunch'], accommodation: 'Miyako Hotel Kyoto Hachijo or similar' },
      { day: 10, title: 'Kyoto — Nara', description: 'Fushimi Inari Taisha with thousands of red torii gates. Todai-ji Temple and deer in Nara Park. Isuien Garden.', meals: ['Breakfast', 'Lunch'], accommodation: 'Hotel Nikko Nara or similar' },
      { day: 11, title: 'Nara — Osaka via Mount Koya', description: 'Mount Koya: Okunoin Cemetery, Kongobu-ji Temple, Garan temple complex. Continue to Osaka.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'KKR Hotel Osaka or similar' },
      { day: 12, title: 'Discover Osaka', description: 'Osaka Castle, Yodo River cruise, Dotonbori entertainment district. Free time for shopping.', meals: ['Breakfast', 'Lunch'], accommodation: 'KKR Hotel Osaka or similar' },
      { day: 13, title: 'Osaka — Departure', description: 'Transfer to airport for return flight to Auckland.', meals: ['Breakfast'] },
      { day: 14, title: 'Arrive Auckland', description: 'Arrive back in New Zealand.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and second-class train',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary'
    ],
    exclusions: [
      'Japan visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $15 per day per person)'
    ],
    metaTitle: 'Japan Discovery — Explorer | 14 Days | CTS Tours',
    metaDescription: 'An immersive Japan journey from Tokyo to Osaka, combining iconic sights like Mt. Fuji, Matsumoto Castle, and Shirakawa-go with cultural trad... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  // Vietnam Tours
  {
    id: 'tour-vn-dis-1',
    slug: 'panorama',
    destination: 'vietnam',
    tier: 'discovery',
    name: 'Vietnam Discovery — Panorama',
    title: 'Vietnam Discovery — Panorama',
    shortDescription: 'Kick off in Hanoi and journey through Vietnam\'s most iconic landscapes, from cruising Ha Long Bay to exploring imperial Hue, charming Hoi An and dynamic Ho Chi Minh City.',
    duration: '14 Days',
    price: 'From NZD $4,599',
    heroImage: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80'
    ],
    highlights: [
      'Ha Long Bay overnight luxury cruise with kayaking',
      'Imperial Citadel and Thien Mu Pagoda in Hue',
      'Hai Van Pass scenic coastal drive',
      'Lantern-lit Ancient Town of Hoi An',
      'Authentic Mekong Delta homestay experience',
      'War Remnants Museum and Cu Chi Tunnels',
      'Local cooking class in Hoi An',
      'Water Puppet Show in Hanoi'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Hanoi', description: 'Depart Auckland for Hanoi.', meals: [] },
      { day: 2, title: 'Arrival in Hanoi', description: 'Airport transfer, hotel check-in. Special welcome dinner. Free time to settle or explore.', meals: ['Dinner'], accommodation: '4-star Hotel in Hanoi' },
      { day: 3, title: 'Hanoi City Tour', description: 'Ho Chi Minh Mausoleum, Temple of Literature. Cyclo ride through Old Quarter. Evening Water Puppet Show.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hanoi' },
      { day: 4, title: 'Hanoi — Ha Long Bay', description: 'Travel to Ha Long Bay, board deluxe cruise. Kayaking or swimming. Sunset viewing.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Deluxe cruise cabin' },
      { day: 5, title: 'Ha Long Bay — Hanoi — Hue', description: 'Tai Chi session on deck. Sung Sot Cave exploration. Brunch on cruise. Afternoon flight to Hue.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hue' },
      { day: 6, title: 'Hue', description: 'Imperial Citadel, Thien Mu Pagoda, Dong Ba Market.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hue' },
      { day: 7, title: 'Hue — Hoi An', description: 'Scenic coastal drive via Hai Van Pass. Lang Co Beach stop. Marble Mountains visit. Evening lantern-lit walking tour.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hoi An' },
      { day: 8, title: 'Hoi An Exploration', description: 'Cooking class. Ancient Town highlights: Japanese Covered Bridge, Phuc Kien Temple. Free afternoon.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hoi An' },
      { day: 9, title: 'Hoi An — Ho Chi Minh City', description: 'Transfer to Da Nang Airport, flight to HCMC. War Remnants Museum, Notre-Dame Cathedral, Ben Thanh Market.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Saigon' },
      { day: 10, title: 'Mekong Delta Excursion', description: 'Boat trip to Cai Be floating market. Traditional workshops. Local homestay experience.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Local homestay in Mekong Delta' },
      { day: 11, title: 'Mekong Delta — Saigon', description: 'Morning bike ride through villages. Return to Saigon. Free afternoon.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Saigon' },
      { day: 12, title: 'Cu Chi Tunnels & Free Time', description: 'Cu Chi Tunnels visit (morning). Free afternoon for shopping and sightseeing.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Saigon' },
      { day: 13, title: 'Departure from Saigon', description: 'Airport transfer for departure flight.', meals: ['Breakfast'] },
      { day: 14, title: 'Arrive Auckland', description: 'Arrive back in Auckland.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and domestic flights',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Ha Long Bay overnight deluxe cruise'
    ],
    exclusions: [
      'Vietnam visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $15 per day per person)'
    ],
    metaTitle: 'Vietnam Discovery — Panorama | 14 Days | CTS Tours',
    metaDescription: 'Kick off in Hanoi and journey through Vietnam\'s most iconic landscapes, from cruising Ha Long Bay to exploring imperial Hue, charming Hoi An... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  },
  {
    id: 'tour-vn-dis-2',
    slug: 'highlights',
    destination: 'vietnam',
    tier: 'discovery',
    name: 'Vietnam Discovery — Highlights',
    title: 'Vietnam Discovery — Highlights',
    shortDescription: 'Experience the essence of Vietnam in just 10 in-country days, traveling from Hanoi to Ho Chi Minh City, including Ha Long Bay, Hoi An\'s lantern-lit streets, Cu Chi Tunnels, and the lush Mekong Delta.',
    duration: '12 Days',
    price: 'From NZD $4,299',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80'
    ],
    highlights: [
      'Ha Long Bay overnight cruise with kayaking and swimming',
      'Water Puppet Show in Hanoi',
      'UNESCO-listed Hoi An Ancient Town with lantern-making workshop',
      'Cu Chi Tunnels historical site',
      'Marble Mountains scenic stop',
      'Mekong Delta boat excursion with local workshops',
      'Cultural exploration across Vietnam\'s major regions'
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Hanoi', description: 'Depart Auckland, fly to Vietnam.', meals: [] },
      { day: 2, title: 'Arrival in Hanoi', description: 'Arrive with airport transfer and hosted welcome dinner.', meals: ['Dinner'], accommodation: '4-star Hotel in Hanoi' },
      { day: 3, title: 'Hanoi City Tour', description: 'Ho Chi Minh Mausoleum and Temple of Literature. Explore Old Quarter by cyclo. Evening Traditional Water Puppet Show.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hanoi' },
      { day: 4, title: 'Hanoi — Ha Long Bay', description: 'Travel to Ha Long Bay for overnight cruise. Swimming, kayaking, sunset viewing over limestone karsts.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Deluxe cruise cabin' },
      { day: 5, title: 'Ha Long Bay — Da Nang — Hoi An', description: 'Morning Tai Chi on deck. Visit Sung Sot Cave. Brunch aboard ship. Flight from Hanoi to Da Nang, transfer to Hoi An.', meals: ['Breakfast'], accommodation: '4-star Hotel in Hoi An' },
      { day: 6, title: 'Hoi An Ancient Town', description: 'Discover UNESCO Old Town, Japanese Covered Bridge, Phuc Kien Assembly Hall. Afternoon lantern-making workshop.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Hoi An' },
      { day: 7, title: 'Hoi An — Ho Chi Minh City', description: 'Morning to Da Nang, stop at Marble Mountains. Flight to Ho Chi Minh City. Evening at leisure.', meals: ['Breakfast'], accommodation: '4-star Hotel in Saigon' },
      { day: 8, title: 'Saigon & Cu Chi Tunnels', description: 'Cu Chi Tunnels (underground network from Vietnam War). War Remnants Museum, Notre-Dame Cathedral, Central Post Office.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Saigon' },
      { day: 9, title: 'Mekong Delta Excursion', description: 'Boat trip along winding rivers and coconut-fringed islands. Coconut candy workshops, honey tea tasting, traditional folk music. Return to Saigon.', meals: ['Breakfast', 'Lunch'], accommodation: '4-star Hotel in Saigon' },
      { day: 10, title: 'Free Day in Saigon', description: 'Full day at own pace for shopping, street food tours, or relaxation.', meals: ['Breakfast'], accommodation: '4-star Hotel in Saigon' },
      { day: 11, title: 'Departure from Saigon', description: 'Transfer to airport for departure flight.', meals: ['Breakfast'] },
      { day: 12, title: 'Arrive Auckland', description: 'Arrive back in Auckland.', meals: [] }
    ],
    inclusions: [
      'Return international airfares from Auckland',
      '4-star hotel accommodation',
      'Transportation by tour coach and domestic flights',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Ha Long Bay overnight deluxe cruise'
    ],
    exclusions: [
      'Vietnam visa fee (if required)',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $15 per day per person)'
    ],
    metaTitle: 'Vietnam Discovery — Highlights | 12 Days | CTS Tours',
    metaDescription: 'Experience the essence of Vietnam in just 10 in-country days, traveling from Hanoi to Ho Chi Minh City, including Ha Long Bay, Hoi An\'s lant... Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2025-01-01'
  }
];

// Utility Functions
export const getTourBySlug = (destination: string, tier: string, slug: string): Tour | undefined => {
  return tours.find(tour => 
    tour.destination === destination && 
    tour.tier === tier && 
    tour.slug === slug
  );
};

export const getToursByDestinationAndTier = (destination: string, tier: string): Tour[] => {
  return tours.filter(tour => 
    tour.destination === destination && 
    tour.tier === tier &&
    tour.isActive
  );
};

export const getToursByDestination = (destination: string): Tour[] => {
  return tours.filter(tour => 
    tour.destination === destination &&
    tour.isActive
  );
};

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return destinations.find(dest => dest.slug === slug);
};

export const getAllActiveTours = (): Tour[] => {
  return tours.filter(tour => tour.isActive);
};
