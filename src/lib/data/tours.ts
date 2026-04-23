import { OCTOBER_2026_DISCOVERY_BY_SLUG } from '@/lib/campaigns/october-2026-discovery';

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
  /** Interest / SEO labels from the operator (display verbatim) */
  tags?: string[];
  /** Scheduled departures when provided, e.g. "25 August", "14 October 2026" */
  departureDates?: string[];
  /** City IDs for itinerary route map, in order (e.g. ['beijing', 'xian']) */
  tourCities?: string[];
  /** When set, product and campaign pages use these FAQs instead of destination-generic defaults */
  faqs?: Array<{ question: string; answer: string }>;
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/silk-road-wall/silk-road-wall.jpg',
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
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',  // Japan nature + culture
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
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/silk-road-wall/silk-road-wall.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/silk-road-wall/silk-road-wall.jpg',
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
    updatedAt: '2026-03-29',
    tags: [
      '10–16 small group',
      'Ancient Silk Road',
      'Terracotta Warriors',
      'fully inclusive',
      'natural landscapes',
      'Xinjiang travel',
      'Mogao Caves',
      'high-speed train',
    ],
    departureDates: ['25 August', '14 October'],
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
    price: 'NZD $9,999',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-aerial/forbidden-city-aerial.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-aerial/forbidden-city-aerial.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg'
    ],
    highlights: [
      'Temple of Heaven with optional Tai Chi among locals; Tian\'anmen Square and Forbidden City (see itinerary for Monday closure & ticket substitution)',
      'Walk the Mutianyu Great Wall; jade craft workshop; Summer Palace gardens',
      'High-speed train Beijing–Xi\'an (G55, first class); Muslim Quarter; dumpling banquet with Tang Dynasty dance',
      'Terracotta Warriors, ceramics and lacquerware workshop, Xi\'an Ancient City Wall',
      'Lhasa: Jokhang Temple, Barkhor Street, Sera Monastery debates, Potala Palace, Norbulingka, Tibetan cultural dinner',
      'Chengdu pandas; first-class rail to Chongqing; Victoria Cruises Yangtze Three Gorges (Shennü or Shennong Stream excursions)',
      'Three Gorges Dam; evening flight to Shanghai; Yuyuan, silk factory, Bund, Huangpu River night cruise and Shanghai dinner',
      'Leisure time in Shanghai before your return to New Zealand',
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing', description: 'China Eastern Airlines flight to Beijing, capital of China.', meals: [] },
      { day: 2, title: 'Beijing — Arrival', description: 'Upon arrival, depending on flight timing, enjoy free time at leisure to begin experiencing local culture.', meals: [], accommodation: 'Beijing Qianyuan Hotel or similar (5-star)' },
      { day: 3, title: 'Beijing', description: 'Temple of Heaven — join residents practicing tai chi in a quiet, harmonious setting. Tian\'anmen Square and the Forbidden City, grand imperial architecture. Evening: traditional Peking Duck banquet and Chinese acrobatic performance. Note: Forbidden City is closed Mondays. Tickets are strictly capped — if unavailable, visit Jingshan Park (overlooking the palace) and Prince Gong\'s Mansion instead.', meals: ['Breakfast', 'Dinner (Peking Duck Banquet)'], accommodation: 'Beijing Qianyuan Hotel or similar (5-star)' },
      { day: 4, title: 'Beijing', description: 'Mutianyu Great Wall — walk this spectacular section with sweeping views. Jade factory. Afternoon: Summer Palace — classical gardens and architecture.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Qianyuan Hotel or similar (5-star)' },
      { day: 5, title: 'Beijing — Xi\'an', description: 'High-speed train Beijing West – Xi\'an North (G55 09:55–14:05, first class or similar). Muslim Quarter — lively heritage linked to the ancient Silk Road. Evening: dumpling banquet with Tang Dynasty dance show.', meals: ['Breakfast', 'Dinner (Dumpling Banquet)'], accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar (5-star)' },
      { day: 6, title: 'Xi\'an', description: 'Morning: Terracotta Warriors of Qin Shi Huang. Ceramics and lacquerware workshop. Afternoon: 14th-century Ancient City Wall and panoramas over old Xi\'an.', meals: ['Breakfast', 'Lunch'], accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar (5-star)' },
      { day: 7, title: 'Xi\'an — Lhasa', description: 'Flight to Lhasa. Free time to acclimatise to the altitude.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'InterContinental Lhasa Paradise or similar (5-star)' },
      { day: 8, title: 'Lhasa', description: 'Jokhang Temple; Barkhor Street markets and architecture. Afternoon: Sera Monastery and monk debating.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'InterContinental Lhasa Paradise or similar (5-star)' },
      { day: 9, title: 'Lhasa', description: 'Potala Palace. Norbulingka summer palace. Tibetan handicraft workshop. Evening: Tibetan dinner with songs and dance.', meals: ['Breakfast', 'Dinner (Tibetan Dinner with Cultural Show)'], accommodation: 'InterContinental Lhasa Paradise or similar (5-star)' },
      { day: 10, title: 'Lhasa — Chengdu', description: 'Flight to Chengdu. Evening: authentic Sichuan dinner.', meals: ['Breakfast', 'Dinner'], accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar (5-star)' },
      { day: 11, title: 'Chengdu — Chongqing (Yangtze Cruise)', description: 'Chengdu Giant Panda Breeding Research Base. High-speed train to Chongqing (afternoon service, first class or similar). Board Victoria Yangtze River cruise (Victoria Jenna or Katarina) for the Three Gorges.', meals: ['Breakfast', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — international 5-star cruise' },
      { day: 12, title: 'Yangtze River Cruise', description: 'Three Gorges scenery; shore excursion to Shennü Stream or Shennong Stream.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — international 5-star cruise' },
      { day: 13, title: 'Yangtze River Cruise', description: 'Second full day on the river — Three Gorges landscapes and included stream excursion programme as operated by the cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — international 5-star cruise' },
      { day: 14, title: 'Three Gorges Dam — Yichang — Shanghai', description: 'Three Gorges Dam. Transfer to Yichang; evening flight to Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar (5-star)' },
      { day: 15, title: 'Shanghai', description: 'Yuyuan Garden; silk factory; the Bund. Evening: Huangpu River cruise and Shanghai-style dinner.', meals: ['Breakfast', 'Dinner (Shanghai Local Cuisine)'], accommodation: 'HUALUXE Shanghai Changfeng Park or similar (5-star)' },
      { day: 16, title: 'Shanghai — Departure', description: 'Breakfast; free time until your scheduled airport transfer for the return flight to New Zealand.', meals: ['Breakfast'] },
      { day: 17, title: 'Auckland', description: 'Arrival in New Zealand — timing depends on your flight arrangements. Tour concludes.', meals: [] },
    ],
    inclusions: [
      'International and domestic airfares',
      '5-star hotel accommodation (and international-standard Yangtze cruise) as specified in the itinerary',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transport including high-speed trains (first class where specified)',
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included in the itinerary',
    ],
    metaTitle: 'China Signature — Legacy of China | 17 Days | CTS Tours',
    metaDescription: 'Legacy of China — Beijing, Xi\'an, Lhasa, pandas, Victoria Yangtze cruise, Three Gorges Dam, Shanghai; 17 days NZD $9,999. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-04-02',
    tags: [
      '10–16 small group',
      'Beijing',
      'Peking duck',
      'Great Wall',
      'Forbidden City',
      'high-speed train',
      'Terracotta Warriors',
      'traditional dumpling banquet with Tang Dynasty dance',
      'Tibet',
      'Lhasa',
      'pandas',
      'Potala Palace',
      'Yangtze River cruise',
      'Huangpu River night cruise',
      '5-star hotels',
      'Yangtze coach',
      'history',
      'ancient culture',
    ],
    departureDates: ['13 August', '15 October'],
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-aerial/forbidden-city-aerial.jpg'
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
    updatedAt: '2026-03-29',
    tags: [
      '10–16 small group',
      'Beijing',
      'Peking duck',
      'Great Wall',
      'Forbidden City',
      'high-speed train',
      'Xi\'an',
      'Terracotta Warriors',
      'dumpling banquet dinner',
      'Yangtze cruise',
      'Three Gorges Dam',
      'Yunnan ethnic culture',
      'natural scenery',
      'history',
      'Shanghai',
      'The Bund',
      'West Lake',
      'Suzhou gardens',
    ],
    departureDates: ['14 October'],
    // Single room supplement: NZD $2,555
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/zhangjiajie/zhangjiajie.jpg',
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
    updatedAt: '2026-03-29',
    tags: [
      'Shanghai',
      'Guilin landscapes',
      'rice terraces',
      'Li River',
      'pandas',
      'Zhangjiajie',
      'Fenghuang Ancient Town',
      'Avatar mountains',
      'The Bund',
      'Huangpu River cruise',
    ],
    departureDates: ['20 August', '25 October'],
  },
  // China Discovery Tours
  {
    id: 'tour-cn-dis-2',
    slug: 'beijing-xian',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — A Tale of Two Cities',
    title: 'China Discovery — A Tale of Two Cities',
    shortDescription:
      'October-ready from Auckland — Beijing\'s Forbidden City, Great Wall, and hutongs, then high-speed rail to Xi\'an for the Terracotta Warriors. Many NZ leisure trips can use China\'s visa-free entry (confirm before you book); published group departure in October as listed on this page.',
    duration: '10 Days',
    price: 'From NZD $3,480',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/xian-terracotta/xian-terracotta.jpg'
    ],
    highlights: [
      'Visit the 500-year-old Temple of Heaven set in imperial gardens',
      'Tour Tiananmen Square — the world\'s largest public square',
      'Explore the Forbidden City, home to emperors for over 500 years',
      'Walk the Great Wall, one of the ten wonders of the world',
      'Photo stop at the iconic Bird\'s Nest and Water Cube Olympic Park',
      'Experience old Beijing on a pedi-cab Hutong tour with a family visit',
      'Discover the Terracotta Warriors — the greatest archaeological find of the century',
      'Visit Xi\'an\'s ancient City Wall and the Tang Dynasty Big Wild Goose Pagoda'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Auckland — Beijing',
        description: 'Depart Auckland in the evening on your international flight to Beijing. Dinner and breakfast served on board.',
        meals: ['Meal on board']
      },
      {
        day: 2,
        title: 'Arrival in Beijing',
        description: 'Upon arrival in Beijing, your guide will meet you and transfer you to visit the Temple of Heaven — a 500-year-old complex of altars and pavilions set in sweeping gardens, where emperors once made offerings to the heavens. Continue to a tea factory before checking in to your hotel.',
        meals: [],
        accommodation: 'Beijing Wanda Moments or similar 4-star hotel'
      },
      {
        day: 3,
        title: 'Beijing',
        description: 'Tour Tiananmen Square, the largest public square in the world. Enjoy a photo stop at the National Centre for the Performing Arts — the striking glass dome affectionately known as "The Egg". Afterwards, step inside the Forbidden City, the vast palace complex that served as home to successive emperors for more than 500 years. Continue to Beihai Park, an imperial garden to the northwest of the Forbidden City, and visit a silk factory before dinner. Tonight\'s optional excursion: an acrobatic show.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Beijing Wanda Moments or similar 4-star hotel'
      },
      {
        day: 4,
        title: 'Beijing — Great Wall',
        description: 'This morning, travel to the Great Wall — stretching almost 4,000 miles from the Pacific Ocean to the sands of Central Asia and rightfully crowned one of the ten wonders of the world. En route, stop at a jade carving factory to watch artisans at work. Return to the city and view the Olympic Park\'s Bird\'s Nest stadium and Water Cube aquatic centre from the outside.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Beijing Wanda Moments or similar 4-star hotel'
      },
      {
        day: 5,
        title: 'Beijing — Hutong & Silk Market',
        description: 'This morning, climb aboard a pedi-cab for a tour of the Hutong — Beijing\'s historic neighbourhoods of narrow alleyways and courtyard gardens. Experience local life with a visit to a traditional family home. After lunch, head to the Silk Market for some shopping.',
        meals: ['Breakfast'],
        accommodation: 'Beijing Wanda Moments or similar 4-star hotel'
      },
      {
        day: 6,
        title: 'Beijing — Xi\'an by High-Speed Train',
        description: 'Morning is free at your leisure. Check out by noon, then board Train G89 (departs 15:00, arrives Xi\'an 19:12, 2nd-class seat or similar high-speed service). Your local Xi\'an guide will meet you on arrival and transfer you to your hotel.',
        meals: ['Breakfast'],
        accommodation: 'Mercure Xi\'an Downtown or similar 4-star hotel'
      },
      {
        day: 7,
        title: 'Xi\'an — Terracotta Warriors',
        description: 'This morning, visit the greatest archaeological discovery of the century: the Terracotta Warriors, a vast underground army of more than 2,000-year-old life-size soldiers interred with Emperor Qin Shi Huang. The visit includes the Circle Vision Movie and Bronze Chariot exhibition. Tonight\'s optional excursion: Tang Palace Banquet Song and Dance Performance.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Mercure Xi\'an Downtown or similar 4-star hotel'
      },
      {
        day: 8,
        title: 'Xi\'an — City Wall & Big Wild Goose Pagoda',
        description: 'Visit the ancient City Wall that encircles the historic centre of Xi\'an, then continue to the Big Wild Goose Pagoda — the earliest and largest surviving square brick pagoda of the Tang Dynasty, and a landmark testament to the integration of Indian Buddhist architecture into Chinese culture following the spread of Buddhism to the Central Plains.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Mercure Xi\'an Downtown or similar 4-star hotel'
      },
      {
        day: 9,
        title: 'Xi\'an — Small Wild Goose Pagoda & Huimin Street',
        description: 'This morning, visit the Small Wild Goose Pagoda Museum, then stroll through the vibrant Huimin Street — Xi\'an\'s famous Muslim Quarter lined with street food stalls and artisan shops. Transfer to the airport for your flight to Beijing.',
        meals: ['Breakfast']
      },
      {
        day: 10,
        title: 'Beijing — Auckland',
        description: 'Connect with your international flight from Beijing back to New Zealand.',
        meals: []
      }
    ],
    inclusions: [
      'International and domestic airfares',
      '4-star hotel accommodation throughout',
      'English-speaking tour guide',
      'Entrance fees as specified in the itinerary',
      'Meals as specified in the itinerary',
      'Land transfers'
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included in the itinerary'
    ],
    metaTitle: 'Beijing & Xi\'an Discovery Tour | October 2026 | CTS NZ',
    metaDescription:
      'China specialist–led Beijing & Xi\'an Discovery from New Zealand — October departures, Forbidden City, Great Wall, Terracotta Warriors, high-speed train. From NZD $3,480. Visa-free options for many NZ travellers — see CTS China visa guide.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-04-14',
    tags: [
      'Beijing',
      'Xi\'an',
      'Forbidden City',
      'Great Wall',
      'Terracotta Warriors',
      'high-speed train',
    ],
    /** Same order as `/campaigns/october-2026/tale-of-two-cities` (hero “next departure” = first). */
    departureDates: [...OCTOBER_2026_DISCOVERY_BY_SLUG['tale-of-two-cities'].heroDepartureOrder],
    tourCities: ['beijing', 'xian'],
    faqs: [
      {
        question: 'Does this tour include Shanghai or other cities?',
        answer:
          'No — A Tale of Two Cities is focused on Beijing and Xi\'an only. You spend several nights in Beijing (Forbidden City, Great Wall, hutongs), travel by high-speed train to Xi\'an for the Terracotta Warriors and ancient city sights, then fly back to Beijing to connect home. It is ideal if you want imperial Beijing and ancient-capital Xi\'an without a longer multi-region loop.',
      },
      {
        question: 'Do New Zealand passport holders need a visa for this itinerary?',
        answer:
          'Many leisure visits qualify for China\'s visa-free entry for NZ ordinary passport holders (commonly up to 30 days under current policy, published to 31 December 2026). This route stays well within a typical holiday length, but entry rules depend on your exact travel dates and purpose — confirm before you book. We summarise options in our China visa guide for New Zealanders; CTS can help you check what applies to your booking.',
      },
      {
        question: 'What is included in the tour price from New Zealand?',
        answer:
          'The advertised lead-in price covers return international flights from Auckland, domestic flights within China as per the itinerary, 4-star hotel accommodation, English-speaking guides, entrance fees and meals where listed, land transfers, and the Beijing–Xi\'an sector on high-speed train G89 (or similar) in 2nd class. Items such as travel insurance, tips (we suggest about NZD $10 per person per day), optional evening shows, and meals not listed are extra — see the Inclusions and Exclusions sections on this page.',
      },
      {
        question: 'How does the Beijing to Xi\'an journey work?',
        answer:
          'You travel by high-speed rail — typically train G89 departing Beijing around 15:00 and arriving in Xi\'an in the evening (about four hours), in a 2nd-class seat unless otherwise advised. Morning of that day is free at leisure in Beijing; you check out by noon. Your Xi\'an guide meets you at the station and transfers you to the hotel. It is a comfortable way to see the countryside between China\'s northern capital and the ancient Tang capital.',
      },
      {
        question: 'Which Beijing and Xi\'an highlights are covered?',
        answer:
          'In Beijing: Temple of Heaven, Tiananmen Square and the Forbidden City, Beihai Park, the Great Wall (with a jade workshop en route), Olympic Park photo stop, and a pedi-cab hutong tour with a family visit — plus optional acrobatic show in the evening where available. In Xi\'an: the Terracotta Warriors (including Circle Vision and Bronze Chariot), City Wall, Big Wild Goose Pagoda, Small Wild Goose Pagoda Museum, and Huimin Street — with an optional Tang Dynasty banquet show. Exact order follows the day-by-day itinerary.',
      },
      {
        question: 'How physically demanding is this tour?',
        answer:
          'Most sightseeing is at a Discovery pace with coach transfers, but the Great Wall involves walking on slopes and steps, Xi\'an\'s City Wall can be explored on foot or by bike depending on options offered locally, and hutong pedi-cabs are short rides with walking in narrow lanes. If you have mobility concerns, tell us when you enquire so we can note it for your guide.',
      },
      {
        question: 'When can I depart, and is a single room available?',
        answer:
          'Published departure for this programme is 15 October (year as on site — subject to change; confirm at booking). If you prefer your own room, a single supplement applies — ask CTS for the current amount. Twin-share pricing is shown as the lead-in rate.',
      },
      {
        question: 'How do I book or ask a specific question about this route?',
        answer:
          'Use the enquiry form on this page or call 0800 CTS 888 (0800 287 888). Our team will confirm availability on your dates, explain deposit and balance, and walk through any optional extras (such as evening shows) so you know the full picture before you commit.',
      },
    ],
  },
  {
    id: 'tour-cn-dis-3',
    slug: 'essentials',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Best of China',
    title: 'China Discovery — Best of China',
    shortDescription: 'Fifteen days from Beijing\'s Temple of Heaven, Forbidden City, Great Wall and hutongs, by high-speed train to Xi\'an\'s Terracotta Army, then by air to Hangzhou via Puyuan\'s fashion ancient town, West Lake and Longjing tea, finishing in Shanghai before your return via Beijing.',
    duration: '15 Days',
    price: 'NZD $4,539 per person',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-blue/shanghai-night-blue.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-blue/shanghai-night-blue.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg'
    ],
    highlights: [
      'Temple of Heaven, Tian\'anmen Square, Forbidden City (or substitute Jingshan Park & Prince Gong\'s Mansion if tickets unavailable), Beihai Park, and the Great Wall',
      'Hutong pedi-cab tour with family visit and Silk Market',
      'High-speed train G89 Beijing–Xi\'an (second class)',
      'Terracotta Warriors with Circle Vision and Bronze Chariot; optional Tang Palace banquet show',
      'Xi\'an City Wall, Big Wild Goose Pagoda, Small Wild Goose Pagoda Museum, and Muslim Quarter (Huimin Street)',
      'Flight to Hangzhou and Tongxiang — Puyuan Fashion Ancient Town (Song-style waterways)',
      'West Lake boat tour, G20 Hangzhou International Expo Center, Meijiawu Longjing tea, Qinghefang Ancient Street',
      'Shanghai: Yuyuan Garden, Bund, Nanjing Road, Lujiazui skyline corridor, World Cultural Heritage Art Exhibition Centre',
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing', description: 'Evening international flight from Auckland to Beijing.', meals: ['Meals on board'] },
      { day: 2, title: 'Beijing', description: 'On arrival, transfer to visit the Temple of Heaven — 500-year-old altars and pavilions set in gardens, trees and sculpture where emperors once made offerings to heaven.', meals: [], accommodation: 'Beijing Wanda Moments or similar (4-star)' },
      { day: 3, title: 'Beijing', description: 'Tian\'anmen Square; photo stop at the National Centre for the Performing Arts (\"The Egg\"). Forbidden City — palace complex home to emperors for 500+ years. Beihai Park, imperial garden northwest of the palace. Silk factory. Optional evening: acrobatic show. Note: Forbidden City tickets are capacity-limited; if unavailable, Jingshan Park (Forbidden City overlook) and Prince Gong\'s Mansion substitute.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar (4-star)' },
      { day: 4, title: 'Beijing', description: 'Great Wall — stretching toward Central Asia, counted among the ten wonders; jade carving factory en route. Return to Beijing for an outside view of the Bird\'s Nest and Water Cube in Olympic Park.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar (4-star)' },
      { day: 5, title: 'Beijing', description: 'Pedi-cab hutong tour — narrow lanes and courtyard life with a family visit. After lunch, Silk Market shopping.', meals: ['Breakfast', 'Lunch'], accommodation: 'Beijing Wanda Moments or similar (4-star)' },
      { day: 6, title: 'Beijing — Xi\'an', description: 'Morning at leisure. Train G89 15:00–19:12 to Xi\'an (or similar, second-class seat). Local guide meets you and transfers to the hotel.', meals: ['Breakfast'], accommodation: 'Mercure Xi\'an Downtown or similar (4-star)' },
      { day: 7, title: 'Xi\'an', description: 'Terracotta Warriors — Circle Vision film and Bronze Chariot. Optional evening: Tang Palace Banquet song-and-dance show.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Xi\'an Downtown or similar (4-star)' },
      { day: 8, title: 'Xi\'an', description: 'Ancient City Wall and Big Wild Goose Pagoda — iconic Tang-dynasty brick pagoda symbolising Buddhist architecture in China.', meals: ['Breakfast', 'Lunch'], accommodation: 'Mercure Xi\'an Downtown or similar (4-star)' },
      { day: 9, title: 'Xi\'an Tongxiang — Puyuan', description: 'Small Wild Goose Pagoda Museum and Huimin Street. Flight to Hangzhou, then continue to Tongxiang (Puyuan). Puyuan Fashion Ancient Town: Song-dynasty style architecture, waterways and \"parallel water and land\" Jiangnan lanes.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Puyuan Hotel or similar (5-star)' },
      { day: 10, title: 'Puyuan — Hangzhou', description: 'Breakfast and free time in Puyuan. Drive to Hangzhou. Afternoon: West Lake — Hua Gang Guan Yu, boat cruise, Su Causeway, Leifeng Pagoda; setting of the Legend of the White Snake.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Hangzhou or similar (4-star)' },
      { day: 11, title: 'Hangzhou — Shanghai', description: 'Hangzhou International Expo Center (G20 main venue). Lunch, then Meijiawu Tea Plantation with Longjing tea tasting. Free time at Qinghefang Ancient Street. Transfer to Shanghai.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai or similar (4-star)' },
      { day: 12, title: 'Shanghai', description: 'Yuyuan classical garden; silk factory; stroll the Bund. Free time on Nanjing Road.', meals: ['Breakfast'], accommodation: 'Holiday Inn Express Shanghai or similar (4-star)' },
      { day: 13, title: 'Shanghai', description: 'People\'s Square and Nanjing Road; Lujiazui circular corridor for three iconic towers; World Cultural Heritage Art Exhibition Centre.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Shanghai or similar (4-star)' },
      { day: 14, title: 'Shanghai — Beijing', description: 'Free time in Shanghai until transfer to the airport for your flight to Beijing to connect with your return to New Zealand.', meals: ['Breakfast'] },
      { day: 15, title: 'Auckland', description: 'Arrive back in New Zealand.', meals: [] },
    ],
    inclusions: [
      'International and domestic airfares',
      'Hotel accommodation as specified in the itinerary',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transfer',
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Optional tours and performances (e.g. acrobatic show, Tang Palace show)',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included in the itinerary',
    ],
    metaTitle: 'China Discovery — Best of China | 15 Days | CTS Tours',
    metaDescription: 'Best of China — Beijing, Xi\'an Terracotta Warriors, Puyuan water town, West Lake Hangzhou, and Shanghai; 15 days from NZD $4,539. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-04-02',
    tags: [
      'Beijing',
      'Xi\'an',
      'Forbidden City',
      'Great Wall',
      'Terracotta Warriors',
      'high-speed train',
      'Shanghai',
      'The Bund',
      'Hangzhou',
      'West Lake',
      'water towns',
      'Puyuan',
    ],
    departureDates: ['3 September'],
    // Single room supplement: NZD $695
  },
  {
    id: 'tour-cn-dis-4',
    slug: 'shanghai-surroundings',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Shanghai & Surroundings',
    title: 'China Discovery — Shanghai & Surroundings',
    shortDescription:
      'October-ready from Auckland — Yangtze Delta loop: Suzhou gardens and Shantang Street, Wuxi lakeside sights and Three Kingdoms City, Hanfu and afternoon tea in Xinshi water town, Hangzhou\'s West Lake and Longjing tea, then Shanghai\'s Bund. Visa-free entry may apply for many NZ trips (confirm dates); mid-October departure published.',
    duration: '10 Days',
    price: 'NZD $2,999 per person',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg'
    ],
    highlights: [
      'Master of the Nets Garden, Panmen, and Shantang Street in Suzhou',
      'Silk factory; Three Kingdoms City (warship tour & horse battle show); Purple Sand Museum; Nanchang Ancient Street in Wuxi',
      'Li Garden by the lake, Pearl Exhibition Centre, and a local market day in Wuxi',
      'Hanfu dress-up for photos and afternoon tea in thousand-year-old Xinshi Town',
      'West Lake boat tour, Su Causeway, Leifeng Pagoda, and Hangzhou International Expo Center (G20)',
      'Six Harmonies Pagoda and Longjing tea tasting at Meijiawu',
      'The Bund, City God Temple quarter, World Cultural Heritage Art Exhibition Centre, and Nanjing Road',
      'Optional Shanghai acrobatics show and Maglev ride (extra cost)',
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Shanghai', description: 'Make your own way to Auckland Airport, check in, and fly to Shanghai. Meals on board.', meals: ['Meals on board'] },
      { day: 2, title: 'Shanghai — Suzhou (≈1.5 hrs)', description: 'Arrive in Shanghai, meet your guide, and travel to Suzhou. Hotel check-in and refresh. Visit Master of the Nets Garden. After lunch, Panmen (water-and-land gate) and Shantang Street. Dinner at your own expense (local snacks).', meals: ['Lunch'], accommodation: 'Rosedale Chunshenhu Resort Hotel or similar (5-star standard)' },
      { day: 3, title: 'Suzhou — Wuxi (≈1 hr)', description: 'Silk factory, then Wuxi. Lunch on arrival; Three Kingdoms City by Taihu Lake (warship tour, horse battle show). Purple Sand Museum. Nanchang Ancient Street — dinner at own expense. Hotel check-in.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Wuxi or similar (4-star standard)' },
      { day: 4, title: 'Wuxi', description: 'Li Garden at the lakeside; Wuxi Pearl Exhibition Centre. Lunch with Wuxi specialty and soup dumplings. Afternoon: traditional local food and daily-goods market, then free time. Dinner at own expense.', meals: ['Breakfast', 'Lunch'], accommodation: 'Holiday Inn Express Wuxi or similar (4-star standard)' },
      { day: 5, title: 'Wuxi — Xinshi Ancient Town (≈1.5 hrs)', description: 'Xinshi — waterside ancient town; Hanfu photos; afternoon tea (coffee, snacks, ice cream). Dinner at own expense (hot pot suggested).', meals: ['Breakfast', 'Afternoon tea'], accommodation: 'Holiday Inn or similar (4-star standard)' },
      { day: 6, title: 'Xinshi — Hangzhou', description: 'Free until 10:00, then Hangzhou. After lunch: West Lake — Hua Gang Guan Yu, boat tour, Su Causeway, Leifeng Pagoda; free time by the lake. Dinner at own expense.', meals: ['Breakfast', 'Lunch'], accommodation: 'New Century Hotel Hangzhou or similar (5-star standard)' },
      { day: 7, title: 'Hangzhou — Shanghai (≈2 hrs)', description: 'Hangzhou International Expo Centre (G20). Lunch; Six Harmonies Pagoda and Meijiawu with Longjing tea. Transfer to Shanghai; dinner included. Check-in.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Holiday Inn Express Shanghai or similar (4-star standard)' },
      { day: 8, title: 'Shanghai', description: 'The Bund and City God Temple area — lunch at own expense. Afternoon: World Cultural Heritage Art Exhibition Centre; Nanjing Road (dinner at own expense). Optional: Shanghai Acrobatics Show — approx. NZD $80 pp.', meals: ['Breakfast'], accommodation: 'Holiday Inn Express Shanghai or similar (4-star standard)' },
      { day: 9, title: 'Shanghai — Departure', description: 'Breakfast; free time — optional Maglev round trip approx. NZD $30 pp. Afternoon airport transfer.', meals: ['Breakfast'] },
      { day: 10, title: 'Auckland', description: 'Arrive in Auckland in the morning.', meals: [] },
    ],
    inclusions: [
      'International and domestic airfares',
      'Hotel accommodation as specified in the itinerary',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transfer',
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Tips (suggested NZD $10 per day per person)',
      'Optional activities (e.g. Shanghai Acrobatics Show, Maglev ride)',
      'Any items not specifically mentioned as included in the itinerary',
    ],
    metaTitle: 'Shanghai & Surroundings Discovery | October 2026 | CTS NZ',
    metaDescription:
      'China specialist–led Shanghai & Jiangnan loop from NZ — October departure, Suzhou, Wuxi, Xinshi, Hangzhou West Lake, the Bund. From NZD $2,999. Visa-free options for many NZ travellers — CTS China visa guide.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-04-14',
    tags: [
      'Shanghai',
      'The Bund',
      'water towns',
      'real life experience in China',
      'West Lake',
    ],
    /** Same order as `/campaigns/october-2026/shanghai-surroundings` (hero “next departure” = first). */
    departureDates: [...OCTOBER_2026_DISCOVERY_BY_SLUG['shanghai-surroundings'].heroDepartureOrder],
    tourCities: ['suzhou', 'wuxi', 'xinshi', 'hangzhou', 'shanghai'],
    faqs: [
      {
        question: 'Does this tour visit Beijing or the Terracotta Warriors?',
        answer:
          'No — Shanghai & Surroundings is a Yangtze Delta loop from Shanghai: Suzhou classical gardens and Shantang Street, Wuxi lakeside and Three Kingdoms City, the ancient town of Xinshi (including Hanfu dress-up and afternoon tea), Hangzhou\'s West Lake and tea culture, then Shanghai\'s Bund and city sights. It is built for travellers who want Jiangnan water towns and modern Shanghai without flying north to Beijing or Xi\'an.',
      },
      {
        question: 'Do New Zealand passport holders need a visa?',
        answer:
          'Many NZ leisure trips qualify for China\'s visa-free entry (often up to 30 days under current published policy to 31 December 2026). This 10-day loop is a typical holiday length, but rules depend on your dates and travel purpose — always confirm before booking. See our China visa guide for New Zealanders or ask CTS when you enquire.',
      },
      {
        question: 'What is included in the NZD $2,999 price?',
        answer:
          'The tour is priced per person twin-share and includes international flights from Auckland, domestic connections as per the itinerary, hotels as named or similar, English-speaking guides, entrance fees and meals where specified in the day-by-day programme, and land transport between cities. It does not include travel insurance, personal spending, tips (we suggest about NZD $10 per person per day), most dinners where marked "at own expense", or optional extras — full detail is in Inclusions and Exclusions on this page.',
      },
      {
        question: 'Several meals are "at own expense" — what should I expect?',
        answer:
          'The itinerary deliberately leaves some lunches and dinners free so you can try local street food (for example on Shantang Street or in Wuxi\'s market areas), casual restaurants, or hot pot in Xinshi as suggested locally. Your guide can recommend options; budget a modest amount per day for those meals if you want to eat out every time.',
      },
      {
        question: 'What optional activities are offered in Shanghai?',
        answer:
          'On the listed programme, you can add the Shanghai Acrobatics Show (approximately NZD $80 per person) and a Maglev train round trip (approximately NZD $30 per person), subject to availability and schedule. These are paid locally or as advised at booking — they are not required to enjoy the tour.',
      },
      {
        question: 'How much coach or driving is there between cities?',
        answer:
          'Distances are relatively short within the delta — for example Shanghai to Suzhou about 1.5 hours and Wuxi to Xinshi about 1.5 hours, with other transfers similar. You stay a few nights in each area so the pace is steady rather than constant long drives.',
      },
      {
        question: 'Is October a good time for this route?',
        answer:
          'Autumn is popular: mild temperatures, comfortable for walking gardens, lakeside parks, and West Lake. Bring light layers and waterproofs for occasional rain. Ask CTS if you want tips tailored to the mid-October departure.',
      },
      {
        question: 'Can I have a single room, and when does the tour depart?',
        answer:
          'Twin-share pricing is shown; a single room supplement applies — ask CTS for the current amount on your departure. Published departure for this programme is 14 October (year as on site — subject to change; confirm live availability). Call 0800 CTS 888 (0800 287 888) or use the enquiry form to hold a seat and confirm the exact price for your room choice.',
      },
    ],
  },
  {
    id: 'tour-cn-dis-7',
    slug: 'yunnan-explorer',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Colorful Yunnan',
    title: 'China Discovery — Colorful Yunnan',
    shortDescription: 'Yunnan by air via Beijing — Erhai and Bai culture around Dali (including Shuanglang and “Santorini” viewpoints), Lijiang\'s Lashi Lake and Shuhe, then overland to Shangri-La through Tiger Leaping Gorge, Songzanlin Monastery, and Napa Lake before returning to Auckland via Beijing.',
    duration: '11 Days',
    price: 'NZD $3,899 per person',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/yunnan-village/yunnan-village.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/yunnan-village/yunnan-village.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/yunnan-rice-terraces/yunnan-rice-terraces.jpg'
    ],
    highlights: [
      'International flights routed Auckland — Beijing — Dali, returning Lijiang — Beijing — Auckland',
      'Dali: Erhai Park, Ideal State “Santorini,” Wenbi Village, and Shuanglang Ancient Town',
      'Optional full-day Haixi-line experience in Dali (extra charge; minimum numbers may apply)',
      'Lijiang: Black Dragon Pool, Lashi Lake wetland, Silk Bedding exhibition, and Shuhe ancient tea-horse town',
      'Road journey to Shangri-La via Tiger Leaping Gorge (incl. elevators); Dukezong Old Town, Guishan Park, and giant prayer wheel',
      'Ganden Sumtseling Monastery (“Little Potala”), Napa Lake wetlands, Highland Barley Avenue',
      'Optional Naxi village & Yuzhu Qingtian scenic day in Lijiang (extra charge; minimum numbers may apply)',
      'Bai, Naxi, and Tibetan cultural landscapes in one journey',
    ],
    itinerary: [
      { day: 1, title: 'Auckland — Beijing', description: 'Make your own way to Auckland Airport and take your international flight to Beijing.', meals: ['Meals on board'] },
      { day: 2, title: 'Beijing — Dali', description: 'Arrive in Beijing, then transfer to the airport for your flight to Dali. Meet your local guide on arrival and check in to your hotel.', meals: [], accommodation: 'Dali hotel or similar (4-star)' },
      { day: 3, title: 'Dali', description: 'After breakfast, visit Erhai Park and the Dali “Ideal State” (Santorini-style viewpoints) — white-and-brown buildings between Cangshan Mountain and Erhai Lake blending European and Bai charm. Visit Wenbi Village for traditional Bai residences. After lunch, explore Shuanglang Ancient Town: “First Town of Cang’er Scenery,” where architecture blends ancient and modern influences.', meals: ['Breakfast', 'Lunch'], accommodation: 'Dali hotel or similar (4-star)' },
      { day: 4, title: 'Dali — Free Day', description: 'Breakfast at the hotel. Free time, or join an optional full-day tour (about CNY 550 pp, minimum 16 travellers): includes transport, guide, attraction tickets, two meals (Hotpot Fish lunch, Jumping Dish dinner). Route typically covers Dali Old Town Foreigner Street, Erhai Eco Corridor (music-bar-style car), ethnic costume photos (3 digital photos + ~30 s aerial group clip), Xizhou with horse carriage, Three-Course Tea song-and-dance, and a Bai “Jumping Dish” meal — confirm details and availability locally.', meals: ['Breakfast'], accommodation: 'Dali hotel or similar (4-star)' },
      { day: 5, title: 'Dali — Lijiang', description: 'Free time in the morning. Afternoon transfer to Lijiang. Visit Black Dragon Pool Park, Highland Dulong Jade, and explore Sifang Street in the ancient city.', meals: ['Breakfast'], accommodation: 'Lijiang hotel or similar (4-star)' },
      { day: 6, title: 'Lijiang', description: 'Lashi Lake wetland — seasonal golden wetlands and birdlife against mountain backdrops. Visit the Silk Bedding Exhibition Hall. After lunch, Shuhe Ancient Town on the Tea Horse Road: old lanes, markets, and traditional houses.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Lijiang hotel or similar (4-star)' },
      { day: 7, title: 'Lijiang — Tiger Leaping Gorge — Shangri-La', description: 'Drive toward Zhongdian (Shangri-La). Dukezong Ancient Town comes alive at dusk with circle dances in Moonlight Square and the world’s largest prayer wheel nearby. Tiger Leaping Gorge (including up/down elevators): one of the world’s great river canyons; the “Tiger Leaping Stone” mid-river and thundering Jinsha. Guishan Park: Chaoyang Tower viewpoints, historic well water at the foot of the hill. Shangri-La giant prayer wheel: copper, gilded, with mantras and Buddhist treasures — turning it is a pilgrimage tradition. Overnight Shangri-La.', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Elong Hotel Shangri-La or similar (4-star)' },
      { day: 8, title: 'Shangri-La — Lijiang', description: 'Ganden Sumtseling Monastery (incl. eco shuttle) — largest Tibetan Buddhist monastery in Yunnan, “Little Potala,” Gelug centre for Sichuan–Yunnan. Napa Lake wetlands and Highland Barley Avenue. After lunch, drive back to Lijiang ancient city.', meals: ['Breakfast', 'Lunch'], accommodation: 'Jixiangyuan Hotel or similar (local 4-star), 11–15 Jiqing Road, Gucheng District, Lijiang — Tel +86 888 5577777' },
      { day: 9, title: 'Lijiang — Free Day', description: 'Breakfast; free time or optional tour (about CNY 550 pp, minimum 16, incl. two meals: salmon-style lunch, Naxi dinner with bonfire dance). Optional route: ancient Naxi village, Dongba pictographs, stone-mill tofu grinding, Naxi Museum, costume photos; afternoon Yuzhu Qingtian Scenic Area (mountains, springs, cliff art, Yulong Academy, ancient trees, Dongba/Buddhist sites). Confirm locally.', meals: ['Breakfast'], accommodation: 'Jixiangyuan Hotel or similar (local 4-star), 11–15 Jiqing Road, Gucheng District, Lijiang — Tel +86 888 5577777' },
      { day: 10, title: 'Lijiang — Beijing', description: 'After breakfast, transfer to Lijiang airport for your flight to Beijing to connect with your onward international flight.', meals: ['Breakfast'] },
      { day: 11, title: 'Beijing — Auckland', description: 'Depart Beijing on your return flight to Auckland.', meals: [] },
    ],
    inclusions: [
      'International and domestic airfares',
      '4-star hotel accommodation',
      'English-speaking tour guide',
      'Entrance fees and meals as specified in the itinerary',
      'Land transfer',
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Transportation and guide services during free time',
      'Meals not listed in the itinerary',
      'Optional day tours and activities (e.g. Haixi line, Naxi village / Yuzhu Qingtian)',
      'Tips (suggested NZD $10 per day per person)',
      'Any items not specifically mentioned as included in the itinerary',
    ],
    metaTitle: 'China Discovery — Colorful Yunnan | 11 Days | CTS Tours',
    metaDescription: 'Colorful Yunnan — Dali, Lijiang, Shangri-La, Tiger Leaping Gorge, and Tibetan culture; 11 days from NZD $3,899 via Beijing. Book with CTS Tours.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2026-04-02',
    tags: [
      'ethnic minority culture',
      'ancient towns',
      'Tiger Leaping Gorge',
      'natural landscapes',
      'Shangri-La',
      'Dali',
      'Lijiang',
    ],
    departureDates: ['10 September'],
    // Single room supplement: NZD $340
  },
  // China Discovery — Fire & Fuzz (Chongqing + Chengdu)
  {
    id: 'tour-cn-dis-5',
    slug: 'chongqing-chengdu',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Fire & Fuzz',
    title: 'China Discovery — Fire & Fuzz',
    shortDescription:
      "Two of China's most talked-about cities in one 10-day trip — futuristic Chongqing's neon cliffside skyline, the famous monorail through a building, and UNESCO Dazu Rock Carvings, then laid-back Chengdu's giant pandas and teahouse culture. Connected by bullet train. Departs 1 November.",
    duration: '10 Days',
    price: 'From NZD $2,750',
    heroImage:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/chengdu-pandas/chengdu-pandas.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/chengdu-old-town/chengdu-old-town.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg',
    ],
    highlights: [
      "Watch a real train pass through the middle of a residential building at Chongqing's legendary Liziba Station",
      'Explore Hongyadong after dark — a glowing cliffside complex that looks like a scene from a Miyazaki film',
      'Visit the Dazu Rock Carvings, a UNESCO World Heritage Site with 50,000 Buddhist sculptures carved over 1,000 years',
      'Step inside the Huguang Guild Hall, a beautifully preserved Qing Dynasty merchant complex beside the Yangtze River',
      "See giant pandas up close at the world-leading Chengdu Research Base -- best at morning feeding time",
      "Witness the Matchmaking Corner at People's Park, where parents search for partners on behalf of their adult children",
      "Travel city-to-city on China's high-speed bullet train -- Chongqing to Chengdu in under 90 minutes",
      'Wander Ciqikou Ancient Town and Jinli Street for Sichuan street food, local crafts, and old-quarter atmosphere',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Auckland — Beijing',
        description: 'Depart Auckland in the evening on your international flight to Beijing. Meals served on board.',
        meals: ['Meal on board'],
      },
      {
        day: 2,
        title: 'Beijing — Chongqing',
        description: "Connect to your domestic flight to Chongqing, a dramatic mountain metropolis built on cliffs above the Yangtze and Jialing rivers. Your guide meets you at the airport and transfers you to the hotel. Rest evening — no sightseeing today.",
        meals: [],
        accommodation: 'Pagoda SASA Design Hotel or similar 4-star, Chongqing',
      },
      {
        day: 3,
        title: 'Chongqing — Huguang Guild Hall, Liziba Station & Ciqikou',
        description: "Morning visit to the Huguang Guild Hall, a beautifully preserved Qing Dynasty complex (built 1759) beside the Yangtze River. Afternoon stop at Liziba Station, where Chongqing Rail Transit Line 2 passes directly through the 6th-8th floors of a 19-storey residential building -- one of the most photographed railway stations in the world. Finish the afternoon at Ciqikou Ancient Town, a Song Dynasty market street with flagstone lanes and Sichuan street food stalls.",
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Pagoda SASA Design Hotel or similar 4-star, Chongqing',
      },
      {
        day: 4,
        title: 'Chongqing — Dazu Rock Carvings & Hongyadong',
        description: "Morning drive to the Dazu Rock Carvings (UNESCO World Heritage Site, 1999) -- approximately 100km from Chongqing. The site contains around 50,000 Buddhist, Taoist, and Confucian stone sculptures carved between the 9th and 13th centuries, including the remarkable 31-metre reclining Nirvana Buddha. Return to Chongqing in the afternoon. Evening visit to Hongyadong -- the iconic 11-storey stilted complex built into the cliff face above the Jialing River, lit up at night in gold and red.",
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Pagoda SASA Design Hotel or similar 4-star, Chongqing',
      },
      {
        day: 5,
        title: 'Chongqing — Free Day',
        description: "A free day to explore Chongqing at your own pace. Suggested options: the Yangtze River Cableway (iconic aerial tramway opened 1987), Jiefangbei pedestrian square and street food, a Yangtze & Jialing River night cruise to see the full neon skyline from the water, or a classic Chongqing hot pot dinner.",
        meals: ['Breakfast'],
        accommodation: 'Pagoda SASA Design Hotel or similar 4-star, Chongqing',
      },
      {
        day: 6,
        title: 'Chongqing — Chengdu by Bullet Train',
        description: "Board the high-speed train from Chongqing to Chengdu (2nd class) -- a smooth journey through Sichuan's green hills in under 90 minutes. Your Chengdu guide meets you at the station exit.",
        meals: ['Breakfast'],
        accommodation: 'Holiday Inn Express Chengdu Gulou or similar 4-star, Chengdu',
      },
      {
        day: 7,
        title: "Chengdu — Pandas, People's Park & Jinli Street",
        description: "Morning at the Chengdu Research Base of Giant Panda Breeding -- home to over 200 giant and red pandas, best visited at feeding time (8-10am). Afterwards, explore People's Park and the Matchmaking Corner, where parents display handwritten profiles of their unmarried children in search of suitable partners. Afternoon on Jinli Ancient Street for Sichuan snacks, then Chunxi Road for Chengdu's modern shopping scene.",
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Holiday Inn Express Chengdu Gulou or similar 4-star, Chengdu',
      },
      {
        day: 8,
        title: 'Chengdu — Free Day',
        description: "A free day in Chengdu. Suggested options: a full-day trip to the Leshan Giant Buddha (UNESCO, 71 metres tall, 1,200+ years old -- best viewed by boat); a half-day at Sanxingdui Museum (extraordinary Bronze Age civilisation with alien-like bronze masks); or an evening Sichuan Opera face-changing show.",
        meals: ['Breakfast'],
        accommodation: 'Holiday Inn Express Chengdu Gulou or similar 4-star, Chengdu',
      },
      {
        day: 9,
        title: 'Chengdu — Beijing',
        description: 'Transfer to Chengdu airport for your flight to Beijing, connecting to your international flight back to New Zealand.',
        meals: ['Breakfast'],
      },
      {
        day: 10,
        title: 'Beijing — Auckland',
        description: 'International flight arrives in Auckland in the afternoon.',
        meals: ['Meal on board'],
      },
    ],
    inclusions: [
      'International and domestic return airfares (Auckland-Beijing-Chongqing; Chengdu-Beijing-Auckland)',
      '4-star centrally located hotel accommodation (twin share)',
      'Coach transfers throughout',
      'High-speed train Chongqing to Chengdu (2nd class)',
      'English-speaking tour guide',
      'Entrance fees for sightseeing as specified in the itinerary',
      'Meals as specified in the itinerary (B = Breakfast, L = Lunch)',
    ],
    exclusions: [
      'Travel insurance (strongly recommended)',
      'Tips (suggested NZD $10 per person per day)',
      'Meals not listed in the itinerary',
      'China visa fee if required',
      'Personal expenses',
      'Optional excursions and activities during free days',
    ],
    metaTitle: 'Fire & Fuzz — Chongqing & Chengdu Discovery | 10 Days | CTS NZ',
    metaDescription:
      "Chongqing's neon cliffside skyline and Chengdu's giant pandas in one 10-day tour from New Zealand. UNESCO Dazu Rock Carvings, Liziba monorail, Hongyadong, bullet train. From NZD $2,750. Departs 1 November.",
    isActive: true,
    createdAt: '2026-04-23',
    updatedAt: '2026-04-23',
    tags: ['Chongqing', 'Chengdu', 'Sichuan', 'Pandas', 'UNESCO', 'High-speed train', 'Cyberpunk', 'Hongyadong'],
    departureDates: ['1 November'],
    tourCities: ['chongqing', 'chengdu'],
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
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-aerial/forbidden-city-aerial.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-lion-2/forbidden-city-lion-2.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-blue/shanghai-night-blue.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-skyline/shanghai-skyline.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-blue/shanghai-night-blue.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/chengdu-pandas/chengdu-pandas.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/chengdu-pandas/chengdu-pandas.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/chengdu-old-town/chengdu-old-town.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/xian-terracotta/xian-terracotta.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/xian-terracotta/xian-terracotta.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/xian-terracotta-2/xian-terracotta-2.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg',
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/suzhou-canal/suzhou-canal.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/suzhou-canal/suzhou-canal.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/suzhou-canal/suzhou-canal.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/guilin-river-valley/guilin-river-valley.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/zhangjiajie/zhangjiajie.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/zhangjiajie/zhangjiajie.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/china-pagoda-night/china-pagoda-night.jpg'
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
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
    gallery: [
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/suzhou-canal/suzhou-canal.jpg',
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
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85'
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
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85'
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
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85'
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
    heroImage: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85'
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
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=85'
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

export const getToursByCityName = (cityName: string): Tour[] => {
  const searchTerms = [cityName.toLowerCase()];
  // Handle Xi'an variants
  if (cityName.toLowerCase() === "xi'an" || cityName.toLowerCase() === 'xian') {
    searchTerms.push("xi'an", 'xian', "xi\\'an");
  }

  return tours.filter(tour => {
    if (!tour.isActive || tour.destination !== 'china') return false;

    const searchableText = [
      tour.name,
      tour.shortDescription,
      ...tour.highlights,
      ...(tour.tags ?? []),
      ...tour.itinerary.map(day => day.title),
      ...tour.itinerary.map(day => day.description)
    ].join(' ').toLowerCase();

    return searchTerms.some(term => searchableText.includes(term));
  });
};

/** URL-safe id for a tag label (shared between find page and tour detail links). */
export function slugifyTourTag(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u2013\u2014\u2212\-–—]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Unique tags across tours for browse chips (label = first seen casing). */
export function collectTourTagSummaries(tourList: Tour[]): Array<{ label: string; slug: string; count: number }> {
  const bySlug = new Map<string, { label: string; count: number }>();
  for (const tour of tourList) {
    if (!tour.isActive || !tour.tags?.length) continue;
    for (const label of tour.tags) {
      const slug = slugifyTourTag(label);
      if (!slug) continue;
      const cur = bySlug.get(slug);
      if (cur) cur.count += 1;
      else bySlug.set(slug, { label, count: 1 });
    }
  }
  return Array.from(bySlug.entries())
    .map(([slug, { label, count }]) => ({ slug, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function tourHasTagSlug(tour: Tour, tagSlug: string): boolean {
  if (!tagSlug || !tour.tags?.length) return false;
  return tour.tags.some((label) => slugifyTourTag(label) === tagSlug);
}

/**
 * Get all active China tours sorted by tier (Signature > Discovery > Stopover)
 */
export const getAllChinaTours = (): Tour[] => {
  const tierOrder = { signature: 0, discovery: 1, stopover: 2 };
  return tours
    .filter(tour => tour.destination === 'china' && tour.isActive)
    .sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
};

/**
 * Get tours by multiple region/city names.
 * Used for city hub pages to match tours containing any of the city names.
 * Handles Xi'an variants, region fuzzy matching, etc.
 */
export const getToursByRegion = (regionNames: string[]): Tour[] => {
  const searchTerms = regionNames.flatMap(name => {
    const variants = [name.toLowerCase()];

    // Handle Xi'an variants
    if (name.toLowerCase() === "xi'an" || name.toLowerCase() === 'xian') {
      variants.push("xi'an", 'xian', "xi\\'an");
    }

    return variants;
  });

  return tours.filter(tour => {
    if (!tour.isActive || tour.destination !== 'china') return false;

    const searchableText = [
      tour.name,
      tour.shortDescription,
      ...tour.highlights,
      ...(tour.tags ?? []),
      ...tour.itinerary.map(day => day.title),
      ...tour.itinerary.map(day => day.description)
    ].join(' ').toLowerCase();

    return searchTerms.some(term => searchableText.includes(term));
  });
};
