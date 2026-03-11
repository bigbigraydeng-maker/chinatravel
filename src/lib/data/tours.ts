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

// Sample Tours Data
export const tours: Tour[] = [
  // China Signature Tours
  {
    id: 'tour-cn-sig-1',
    slug: 'silk-road',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Silk Road',
    title: 'China Signature — Silk Road',
    shortDescription: 'Journey along the ancient Silk Road, tracing the footsteps of merchants and explorers through China\'s western frontiers.',
    duration: '14 Days',
    price: 'From $5,999',
    heroImage: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80'
    ],
    highlights: [
      'Explore the ancient city of Kashgar',
      'Visit the Mogao Caves in Dunhuang',
      'Walk through the Rainbow Mountains of Zhangye',
      'Experience Uyghur culture and cuisine',
      'Ride a camel in the Singing Sand Dunes'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Welcome to China! Transfer to your luxury hotel and enjoy a welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 2,
        title: 'Beijing to Xi\'an',
        description: 'Morning flight to Xi\'an. Visit the ancient city wall and Muslim Quarter.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Sofitel Xi\'an'
      },
      {
        day: 3,
        title: 'Terracotta Warriors',
        description: 'Full day exploring the Terracotta Army with an expert archaeologist.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Sofitel Xi\'an'
      }
    ],
    inclusions: [
      'All accommodation in 5-star hotels',
      'Daily breakfast and select meals',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'China Signature Silk Road Tour | 14 Days | CTS Tours',
    metaDescription: 'Journey along the ancient Silk Road with CTS Tours. 14-day luxury tour from Beijing to Kashgar. Expert guides, 5-star hotels, exclusive experiences.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-sig-2',
    slug: 'imperial-heritage',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Imperial Heritage',
    title: 'China Signature — Imperial Heritage',
    shortDescription: 'Classic northern cultural route. Beijing, Xi\'an, core heritage sites. Premium accommodations, expert guides, and exclusive experiences.',
    duration: '12 Days',
    price: 'From $4,999',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Private after-hours access to the Forbidden City',
      'Walk the Great Wall at sunrise',
      'Meet the Terracotta Warriors with an expert',
      'Explore ancient Xi\'an city walls',
      'Dine in former imperial banquet halls'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'VIP airport greeting and transfer to your hotel. Welcome dinner at a private courtyard restaurant.',
        meals: ['Dinner'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 2,
        title: 'The Forbidden City',
        description: 'Exclusive early access to the Forbidden City before public opening.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 3,
        title: 'Great Wall at Mutianyu',
        description: 'Private sunrise visit to the Great Wall. Afternoon at leisure.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 4,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Evening at Muslim Quarter.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Sofitel Legend Xi\'an'
      },
      {
        day: 5,
        title: 'Terracotta Warriors',
        description: 'Full day exploring the Terracotta Army with an expert archaeologist.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Sofitel Legend Xi\'an'
      },
      {
        day: 6,
        title: 'Xi\'an City Exploration',
        description: 'Ancient City Wall bike ride, Big Wild Goose Pagoda, and Tang Dynasty show.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Sofitel Legend Xi\'an'
      },
      {
        day: 7,
        title: 'Xi\'an to Shanghai',
        description: 'Fly to Shanghai. Evening Bund walking tour.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 8,
        title: 'Shanghai Highlights',
        description: 'Yu Garden, Old Town, and Shanghai Museum with expert guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 9,
        title: 'Zhujiajiao Water Town',
        description: 'Day trip to ancient water town with private boat ride.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 10,
        title: 'Shanghai at Leisure',
        description: 'Free day to explore or optional cooking class. Farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 11,
        title: 'Departure',
        description: 'Transfer to airport for your onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'All accommodation in 5-star hotels',
      'Daily breakfast and select meals',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'VIP airport transfers',
      'High-speed train tickets'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'China Signature Imperial Heritage | 12 Days | CTS Tours',
    metaDescription: 'Classic northern cultural route with CTS Tours. 12-day luxury tour of Beijing, Xi\'an and Shanghai. Premium accommodations, expert guides.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-sig-3',
    slug: 'grand-tour',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Grand Tour',
    title: 'China Signature — Grand Tour',
    shortDescription: 'Multi-region comprehensive itinerary. Longest duration product with strong inclusions. The ultimate China experience.',
    duration: '16 Days',
    price: 'From $5,999',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Beijing, Xi\'an, Shanghai, Guilin, and Yangshuo',
      'Li River cruise through karst mountains',
      'Private cooking class in Yangshuo',
      'High-speed train experience',
      'Exclusive cultural performances'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'VIP airport greeting and transfer to luxury hotel. Welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City & Temple of Heaven',
        description: 'Exclusive early access to Forbidden City. Afternoon at Temple of Heaven.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 3,
        title: 'Great Wall at Jinshanling',
        description: 'Full day hiking the most scenic section of the Great Wall.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 4,
        title: 'Hutongs & Summer Palace',
        description: 'Rickshaw tour through hutongs. Afternoon at Summer Palace.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'The Peninsula Beijing'
      },
      {
        day: 5,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Evening dumpling banquet.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Sofitel Legend Xi\'an'
      },
      {
        day: 6,
        title: 'Terracotta Warriors',
        description: 'Full day at Terracotta Army with expert guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Sofitel Legend Xi\'an'
      },
      {
        day: 7,
        title: 'Xi\'an to Shanghai',
        description: 'Fly to Shanghai. Evening acrobatics show.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 8,
        title: 'Shanghai City Tour',
        description: 'Yu Garden, Bund, and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 9,
        title: 'Zhujiajiao Water Town',
        description: 'Day trip to ancient water town.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 10,
        title: 'Shanghai to Guilin',
        description: 'Fly to Guilin. Evening walk along Li River.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Guilin'
      },
      {
        day: 11,
        title: 'Li River Cruise',
        description: 'Scenic cruise from Guilin to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 12,
        title: 'Yangshuo Countryside',
        description: 'Bike ride through karst landscape. Evening cooking class.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 13,
        title: 'Yangshuo at Leisure',
        description: 'Free day for optional activities.',
        meals: ['Breakfast'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 14,
        title: 'Yangshuo to Guilin',
        description: 'Return to Guilin. Visit Reed Flute Cave.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Shangri-La Guilin'
      },
      {
        day: 15,
        title: 'Guilin to Shanghai',
        description: 'Fly to Shanghai. Farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Park Hyatt Shanghai'
      },
      {
        day: 16,
        title: 'Departure',
        description: 'Transfer to airport for your onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'All accommodation in 5-star hotels',
      'Daily breakfast and select meals',
      'Expert English-speaking guide throughout',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'High-speed train tickets',
      'Li River cruise',
      'VIP airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'China Signature Grand Tour | 16 Days | CTS Tours',
    metaDescription: 'The ultimate China experience with CTS Tours. 16-day comprehensive tour covering Beijing, Xi\'an, Shanghai, and Guilin. Premium all the way.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // China Discovery Tours
  {
    id: 'tour-cn-dis-1',
    slug: 'highlights',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Highlights',
    title: 'China Discovery — Highlights',
    shortDescription: 'The essential China experience covering Beijing, Xi\'an, and Shanghai in one comprehensive journey.',
    duration: '10 Days',
    price: 'From $2,999',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80'
    ],
    highlights: [
      'Walk the Great Wall at Mutianyu',
      'Explore the Forbidden City',
      'Meet the Terracotta Warriors',
      'Discover Shanghai\'s Bund',
      'Experience high-speed train travel'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Arrive in Beijing and transfer to your hotel. Evening welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Great Wall',
        description: 'Full day at the Great Wall with cable car ride and toboggan descent.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'High-speed train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Highlights Tour | 10 Days | CTS Tours',
    metaDescription: 'Discover China\'s highlights with CTS Tours. 10-day tour covering Beijing, Xi\'an, and Shanghai. Great value, expert guides, quality hotels.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-2',
    slug: 'beijing-shanghai',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Beijing & Shanghai',
    title: 'China Discovery — Beijing & Shanghai',
    shortDescription: 'A perfect introduction to China\'s two most dynamic cities, blending ancient heritage with modern marvels.',
    duration: '8 Days',
    price: 'From $2,499',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Explore Beijing\'s hutongs by rickshaw',
      'Visit the Temple of Heaven',
      'Walk Shanghai\'s historic Bund',
      'Explore Yu Garden',
      'Experience Shanghai\'s modern skyline'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Arrive in Beijing and transfer to your hotel.',
        meals: ['Breakfast'],
        accommodation: 'Novotel Beijing'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'High-speed train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Beijing & Shanghai | 8 Days | CTS Tours',
    metaDescription: 'Explore Beijing and Shanghai with CTS Tours. 8-day discovery tour of China\'s two greatest cities. Great value, expert guides.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-3',
    slug: 'essential-china',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Essential China',
    title: 'China Discovery — Essential China',
    shortDescription: 'Perfect first-timer route. Beijing, Xi\'an, Shanghai. The name makes the itinerary scope immediately clear.',
    duration: '9 Days',
    price: 'From $2,699',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Great Wall at Mutianyu',
      'Forbidden City and Tiananmen Square',
      'Terracotta Warriors in Xi\'an',
      'Shanghai Bund and Yu Garden',
      'High-speed train experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Airport transfer and check-in. Evening welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City',
        description: 'Full day exploring the Forbidden City and Tiananmen Square.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Great Wall',
        description: 'Day trip to Great Wall at Mutianyu with cable car.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 4,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Evening at Muslim Quarter.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 5,
        title: 'Terracotta Warriors',
        description: 'Full day at Terracotta Army with expert guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 6,
        title: 'Xi\'an to Shanghai',
        description: 'Fly to Shanghai. Evening Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 7,
        title: 'Shanghai Tour',
        description: 'Yu Garden, Old Town, and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'High-speed train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Essential China | 9 Days | CTS Tours',
    metaDescription: 'Perfect first-timer China tour with CTS Tours. 9-day journey covering Beijing, Xi\'an, and Shanghai. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-4',
    slug: 'cultural-triangle',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Cultural Triangle',
    title: 'China Discovery — Cultural Triangle',
    shortDescription: 'Beijing, Xi\'an, Chengdu. Three major cultural centers in one journey.',
    duration: '11 Days',
    price: 'From $3,299',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Forbidden City and Great Wall',
      'Terracotta Warriors',
      'Panda Research Center in Chengdu',
      'Sichuan cuisine experience',
      'Cultural immersion'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'VIP transfer and welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City',
        description: 'Full day at Forbidden City and Great Wall.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Terracotta Warriors.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 4,
        title: 'Xi\'an to Chengdu',
        description: 'Fly to Chengdu. Evening hot pot dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Chengdu'
      },
      {
        day: 5,
        title: 'Panda Research Center',
        description: 'Full day at Panda Center and Jinsha Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Chengdu'
      },
      {
        day: 6,
        title: 'Chengdu City',
        description: 'Wuhou Shrine and Jinli Ancient Street.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Chengdu'
      },
      {
        day: 7,
        title: 'Chengdu to Beijing',
        description: 'Fly to Beijing. Evening at leisure.',
        meals: ['Breakfast'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 8,
        title: 'Beijing to Shanghai',
        description: 'High-speed train to Shanghai. Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 9,
        title: 'Shanghai Tour',
        description: 'Yu Garden and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 10,
        title: 'Shanghai to Beijing',
        description: 'Return to Beijing. Farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 11,
        title: 'Departure',
        description: 'Transfer to airport.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Domestic flights and transportation',
      'High-speed train tickets'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Cultural Triangle | 11 Days | CTS Tours',
    metaDescription: 'Three major cultural centers with CTS Tours. 11-day journey covering Beijing, Xi\'an, and Chengdu. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-5',
    slug: 'golden-route',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Golden Route',
    title: 'China Discovery — Golden Route',
    shortDescription: 'Beijing, Xi\'an, Guilin. Classic golden triangle route.',
    duration: '10 Days',
    price: 'From $3,499',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Great Wall hiking',
      'Terracotta Warriors',
      'Li River cruise',
      'Guilin karst mountains',
      'Elephant Trunk Hill'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Airport transfer and check-in.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City',
        description: 'Full day at Forbidden City and Great Wall.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Terracotta Warriors.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 4,
        title: 'Xi\'an to Guilin',
        description: 'Fly to Guilin. Evening Li River walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 5,
        title: 'Li River Cruise',
        description: 'Full day cruise to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 6,
        title: 'Yangshuo Exploration',
        description: 'Bamboo rafting and countryside bike ride.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 7,
        title: 'Yangshuo to Guilin',
        description: 'Return to Guilin. Reed Flute Cave.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 8,
        title: 'Guilin to Shanghai',
        description: 'Fly to Shanghai. Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 9,
        title: 'Shanghai Tour',
        description: 'Yu Garden and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 10,
        title: 'Departure',
        description: 'Transfer to airport.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Domestic flights and transportation',
      'Li River cruise'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Golden Route | 10 Days | CTS Tours',
    metaDescription: 'Classic golden triangle with CTS Tours. 10-day journey covering Beijing, Xi\'an, and Guilin. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-6',
    slug: 'classic-china',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — Classic China',
    title: 'China Discovery — Classic China',
    shortDescription: 'Beijing, Xi\'an, Shanghai, Suzhou. Comprehensive cultural route.',
    duration: '11 Days',
    price: 'From $3,199',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Forbidden City and Great Wall',
      'Terracotta Warriors',
      'Shanghai modern skyline',
      'Suzhou water towns',
      'Traditional gardens'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Airport transfer and check-in.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City',
        description: 'Full day at Forbidden City and Great Wall.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Beijing to Xi\'an',
        description: 'High-speed train to Xi\'an. Terracotta Warriors.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 4,
        title: 'Xi\'an to Shanghai',
        description: 'Fly to Shanghai. Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 5,
        title: 'Suzhou Day Trip',
        description: 'Day trip to Suzhou water towns.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 6,
        title: 'Shanghai Tour',
        description: 'Yu Garden and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 7,
        title: 'Zhujiajiao Water Town',
        description: 'Day trip to ancient water town.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 8,
        title: 'Shanghai at Leisure',
        description: 'Free day for shopping or optional tour.',
        meals: ['Breakfast'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 9,
        title: 'Shanghai to Beijing',
        description: 'Return to Beijing. Farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 10,
        title: 'Beijing Tour',
        description: 'Temple of Heaven and Summer Palace.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 11,
        title: 'Departure',
        description: 'Transfer to airport.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Domestic flights and transportation',
      'Water town visits'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery Classic China | 11 Days | CTS Tours',
    metaDescription: 'Comprehensive cultural route with CTS Tours. 11-day journey covering Beijing, Xi\'an, Shanghai, and Suzhou. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-dis-7',
    slug: 'china-express',
    destination: 'china',
    tier: 'discovery',
    name: 'China Discovery — China Express',
    title: 'China Discovery — China Express',
    shortDescription: 'Beijing and Shanghai only. Short and focused for time-limited travelers.',
    duration: '6 Days',
    price: 'From $1,999',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Great Wall at Mutianyu',
      'Forbidden City',
      'Tiananmen Square',
      'Shanghai Bund',
      'Yu Garden',
      'Modern Shanghai skyline'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Airport transfer and check-in.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Forbidden City',
        description: 'Full day at Forbidden City and Great Wall.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Beijing to Shanghai',
        description: 'High-speed train to Shanghai. Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 4,
        title: 'Shanghai Tour',
        description: 'Yu Garden, Old Town, and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 5,
        title: 'Shanghai at Leisure',
        description: 'Free day for shopping or optional tour.',
        meals: ['Breakfast'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Transfer to airport.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'High-speed train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Discovery China Express | 6 Days | CTS Tours',
    metaDescription: 'Short and focused China tour with CTS Tours. 6-day journey covering Beijing and Shanghai. Great value for time-limited travelers.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // China Stopover Tours
  {
    id: 'tour-cn-stp-1',
    slug: 'beijing',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Beijing',
    title: 'China Stopover — Beijing (4 Days)',
    shortDescription: 'Make the most of your layover with this compact Beijing experience featuring the Great Wall and Forbidden City.',
    duration: '4 Days',
    price: 'From $899',
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80'
    ],
    highlights: [
      'Half-day Great Wall visit',
      'Forbidden City tour',
      'Tiananmen Square',
      'Hutong rickshaw tour',
      'Peking duck dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Arrive and transfer to your hotel. Evening Peking duck dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Great Wall',
        description: 'Morning visit to the Great Wall at Mutianyu.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'City Highlights',
        description: 'Forbidden City, Tiananmen Square, and hutong tour.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Transfer to airport for your onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Beijing Stopover Tour | 4 Days | CTS Tours',
    metaDescription: 'Perfect Beijing stopover with CTS Tours. 4-day tour featuring Great Wall and Forbidden City. Ideal for layovers.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-2',
    slug: 'beijing-express',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Beijing Express',
    title: 'China Stopover — Beijing Express (3 Days)',
    shortDescription: 'Quick Beijing experience with Great Wall and Forbidden City. Perfect for short layovers.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80'
    ],
    highlights: [
      'Great Wall at Mutianyu',
      'Forbidden City',
      'Tiananmen Square',
      'Hutong exploration',
      'Peking duck dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Arrive and transfer to your hotel. Evening Peking duck dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Great Wall',
        description: 'Morning visit to the Great Wall at Mutianyu.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'City Highlights',
        description: 'Forbidden City, Tiananmen Square, and hutong tour.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Beijing Express Stopover | 3 Days | CTS Tours',
    metaDescription: 'Quick Beijing stopover with CTS Tours. 3-day tour featuring Great Wall and Forbidden City. Perfect for short layovers.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-3',
    slug: 'shanghai',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai',
    title: 'China Stopover — Shanghai (3 Days)',
    shortDescription: 'Experience Shanghai\'s blend of modern and traditional China. Perfect for city lovers.',
    duration: '3 Days',
    price: 'From $599',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Shanghai Bund walk',
      'Yu Garden',
      'Shanghai Museum',
      'Old Town exploration',
      'Modern skyline views'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shanghai',
        description: 'Arrive and transfer to your hotel. Evening Bund walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 2,
        title: 'Shanghai Tour',
        description: 'Yu Garden, Old Town, and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 3,
        title: 'Modern Shanghai',
        description: 'Pudong skyline and shopping. Departure.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Shanghai Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Experience Shanghai with CTS Tours. 3-day stopover featuring Bund, Yu Garden, and modern skyline.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-4',
    slug: 'shanghai-express',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai Express',
    title: 'China Stopover — Shanghai Express (2 Days)',
    shortDescription: 'Quick Shanghai experience for the shortest layovers.',
    duration: '2 Days',
    price: 'From $499',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Shanghai Bund',
      'Yu Garden',
      'Old Town',
      'Pudong skyline'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shanghai',
        description: 'Arrive and transfer to your hotel. Evening Bund walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 2,
        title: 'Shanghai Tour',
        description: 'Yu Garden and Old Town. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '1 night accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Shanghai Express Stopover | 2 Days | CTS Tours',
    metaDescription: 'Quick Shanghai stopover with CTS Tours. 2-day tour featuring Bund and Yu Garden.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-5',
    slug: 'chengdu',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Chengdu',
    title: 'China Stopover — Chengdu (3 Days)',
    shortDescription: 'Meet giant pandas and experience Sichuan culture.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Giant Panda Research Center',
      'Sichuan hot pot dinner',
      'Jinli Ancient Street',
      'Wuhou Shrine',
      'Sichuan cuisine'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chengdu',
        description: 'Arrive and transfer to your hotel. Evening hot pot dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Chengdu'
      },
      {
        day: 2,
        title: 'Panda Research Center',
        description: 'Full day at Giant Panda Research Center.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Chengdu'
      },
      {
        day: 3,
        title: 'Chengdu Culture',
        description: 'Wuhou Shrine and Jinli Ancient Street. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Chengdu Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Meet pandas with CTS Tours. 3-day Chengdu stopover featuring Panda Research Center and Sichuan cuisine.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-6',
    slug: 'guilin',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guilin',
    title: 'China Stopover — Guilin (3 Days)',
    shortDescription: 'Experience Guilin\'s stunning karst landscape.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Li River cruise',
      'Elephant Trunk Hill',
      'Reed Flute Cave',
      'Karst mountains',
      'Guilin city tour'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guilin',
        description: 'Arrive and transfer to your hotel. Evening Li River walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 2,
        title: 'Li River Cruise',
        description: 'Full day Li River cruise to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 3,
        title: 'Guilin Tour',
        description: 'Elephant Trunk Hill and Reed Flute Cave. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Li River cruise',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Guilin Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Experience Guilin with CTS Tours. 3-day stopover featuring Li River cruise and karst landscape.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-7',
    slug: 'xian',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Xi\'an',
    title: 'China Stopover — Xi\'an (3 Days)',
    shortDescription: 'Discover the Terracotta Warriors and ancient Xi\'an.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Terracotta Warriors',
      'Ancient City Wall',
      'Muslim Quarter',
      'Big Wild Goose Pagoda',
      'Tang Dynasty show'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Xi\'an',
        description: 'Arrive and transfer to your hotel. Evening Muslim Quarter.',
        meals: ['Dinner'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 2,
        title: 'Terracotta Warriors',
        description: 'Full day at Terracotta Army with expert guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 3,
        title: 'Xi\'an Tour',
        description: 'City Wall and Big Wild Goose Pagoda. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Xi\'an Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Discover Xi\'an with CTS Tours. 3-day stopover featuring Terracotta Warriors and ancient city.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-8',
    slug: 'guangzhou',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guangzhou',
    title: 'China Stopover — Guangzhou (3 Days)',
    shortDescription: 'Experience Guangzhou\'s modern city and Cantonese culture.',
    duration: '3 Days',
    price: 'From $599',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Canton Tower',
      'Shamian Island',
      'Cantonese dim sum',
      'Chen Clan Academy',
      'Modern Guangzhou'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guangzhou',
        description: 'Arrive and transfer to your hotel. Evening dim sum dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Guangzhou'
      },
      {
        day: 2,
        title: 'Guangzhou Tour',
        description: 'Canton Tower, Shamian Island, and Chen Clan Academy.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guangzhou'
      },
      {
        day: 3,
        title: 'Modern Guangzhou',
        description: 'Shopping and modern city exploration. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Guangzhou Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Experience Guangzhou with CTS Tours. 3-day stopover featuring Canton Tower and Cantonese culture.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-9',
    slug: 'shanghai-suzhou',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai & Suzhou',
    title: 'China Stopover — Shanghai & Suzhou (3 Days)',
    shortDescription: 'Shanghai city tour plus Suzhou classical gardens.',
    duration: '3 Days',
    price: 'From $799',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Shanghai Bund',
      'Suzhou classical gardens',
      'Humble Administrator\'s Garden',
      'Old Town Suzhou',
      'Shanghai Museum'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shanghai',
        description: 'Arrive and transfer to your hotel. Evening Bund walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 2,
        title: 'Suzhou Day Trip',
        description: 'Day trip to Suzhou classical gardens.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 3,
        title: 'Shanghai Tour',
        description: 'Shanghai Museum and Old Town. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Shanghai & Suzhou Stopover | 3 Days | CTS Tours',
    metaDescription: 'Shanghai and Suzhou with CTS Tours. 3-day stopover featuring Bund and classical gardens.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-10',
    slug: 'shanghai-wuzhen',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai & Wuzhen',
    title: 'China Stopover — Shanghai & Wuzhen (4 Days)',
    shortDescription: 'Shanghai city tour plus Wuzhen water town experience.',
    duration: '4 Days',
    price: 'From $899',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Shanghai Bund',
      'Wuzhen water town',
      'Traditional architecture',
      'Canal boat ride',
      'Shanghai Museum'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shanghai',
        description: 'Arrive and transfer to your hotel. Evening Bund walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 2,
        title: 'Wuzhen Water Town',
        description: 'Day trip to Wuzhen ancient water town.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 3,
        title: 'Shanghai Tour',
        description: 'Shanghai Museum and Old Town.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Shanghai & Wuzhen Stopover | 4 Days | CTS Tours',
    metaDescription: 'Shanghai and Wuzhen with CTS Tours. 4-day stopover featuring Bund and water town.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-11',
    slug: 'guilin-surrounds',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guilin & Surrounds',
    title: 'China Stopover — Guilin & Surrounds (4 Days)',
    shortDescription: 'Guilin city plus Yangshuo and Longsheng rice terraces.',
    duration: '4 Days',
    price: 'From $899',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Li River cruise',
      'Yangshuo countryside',
      'Longsheng rice terraces',
      'Karst mountains',
      'Bamboo rafting'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guilin',
        description: 'Arrive and transfer to your hotel. Evening Li River walk.',
        meals: ['Dinner'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 2,
        title: 'Li River Cruise',
        description: 'Full day cruise to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 3,
        title: 'Yangshuo to Longsheng',
        description: 'Bamboo rafting and Longsheng rice terraces.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Li River cruise',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Guilin & Surrounds Stopover | 4 Days | CTS Tours',
    metaDescription: 'Guilin and surrounds with CTS Tours. 4-day stopover featuring Li River and rice terraces.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-12',
    slug: 'zhangjiajie',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Zhangjiajie',
    title: 'China Stopover — Zhangjiajie (3 Days)',
    shortDescription: 'Experience the Avatar Mountains and Zhangjiajie National Forest Park.',
    duration: '3 Days',
    price: 'From $799',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Avatar Mountains',
      'Zhangjiajie National Forest Park',
      'Glass bridge',
      'Tianmen Mountain',
      'Natural scenery'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zhangjiajie',
        description: 'Arrive and transfer to your hotel. Evening at leisure.',
        meals: ['Dinner'],
        accommodation: 'Novotel Zhangjiajie'
      },
      {
        day: 2,
        title: 'Zhangjiajie National Park',
        description: 'Full day exploring Avatar Mountains.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Zhangjiajie'
      },
      {
        day: 3,
        title: 'Tianmen Mountain',
        description: 'Tianmen Mountain cable car. Departure.',
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Cable car tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Zhangjiajie Stopover | 3 Days | CTS Tours',
    metaDescription: 'Avatar Mountains with CTS Tours. 3-day Zhangjiajie stopover featuring National Forest Park.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-13',
    slug: 'guangzhou-shenzhen',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guangzhou & Shenzhen',
    title: 'China Stopover — Guangzhou & Shenzhen (4 Days)',
    shortDescription: 'Experience modern innovation in Guangzhou and Shenzhen.',
    duration: '4 Days',
    price: 'From $899',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Canton Tower',
      'Shenzhen tech hubs',
      'Innovation centers',
      'Modern architecture',
      'Cantonese cuisine'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guangzhou',
        description: 'Arrive and transfer to your hotel. Evening dim sum dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Guangzhou'
      },
      {
        day: 2,
        title: 'Guangzhou Tour',
        description: 'Canton Tower and modern Guangzhou.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guangzhou'
      },
      {
        day: 3,
        title: 'Shenzhen Day Trip',
        description: 'Day trip to Shenzhen innovation centers.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guangzhou'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Airport transfers',
      'One dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Guangzhou & Shenzhen Stopover | 4 Days | CTS Tours',
    metaDescription: 'Modern innovation with CTS Tours. 4-day stopover featuring Guangzhou and Shenzhen.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-14',
    slug: 'huangshan',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Huangshan',
    title: 'China Stopover — Huangshan (4 Days)',
    shortDescription: 'Experience the legendary Yellow Mountain scenery.',
    duration: '4 Days',
    price: 'From $899',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Yellow Mountain (Huangshan)',
      'Ancient pine trees',
      'Sea of clouds',
      'Sunrise views',
      'Cable car experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Huangshan',
        description: 'Arrive and transfer to your hotel. Evening at leisure.',
        meals: ['Dinner'],
        accommodation: 'Novotel Huangshan'
      },
      {
        day: 2,
        title: 'Yellow Mountain',
        description: 'Full day on Yellow Mountain with cable car.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Huangshan'
      },
      {
        day: 3,
        title: 'Huangshan Exploration',
        description: 'Sunrise and ancient villages. Return to base.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Huangshan'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Cable car tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Huangshan Stopover | 4 Days | CTS Tours',
    metaDescription: 'Yellow Mountain with CTS Tours. 4-day stopover featuring Huangshan scenery and cable car.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-sig-4',
    slug: 'shangri-la',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Shangri-La Tour',
    title: 'China Signature — Shangri-La Tour',
    shortDescription: '8-day Yangtze River cruise with Three Gorges and Shangri-La water town experience. Premium accommodations and exclusive river views.',
    duration: '8 Days',
    price: 'From $4,299',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'Yangtze River luxury cruise',
      'Three Gorges scenic views',
      'Shangri-La water town exploration',
      'Private boat excursions',
      'Premium river-view hotels'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chongqing',
        description: 'VIP transfer to luxury hotel. Welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Shangri-La Hotel Chongqing'
      },
      {
        day: 2,
        title: 'Yangtze River Cruise Begins',
        description: 'Board luxury cruise ship. Sail through Qutang Gorge.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Yangtze Explorer'
      },
      {
        day: 3,
        title: 'Three Gorges',
        description: 'Full day cruising through Wu, Qutang, and Xiling Gorges. Shore excursion to Fengdu.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Yangtze Explorer'
      },
      {
        day: 4,
        title: 'Yichang to Shangri-La',
        description: 'Disembark and transfer to Shangri-La. Evening water town walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Hotel'
      },
      {
        day: 5,
        title: 'Shangri-La Exploration',
        description: 'Full day exploring ancient water town. Private boat excursion.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Hotel'
      },
      {
        day: 6,
        title: 'Shangri-La to Yichang',
        description: 'Return to cruise ship. Sail through Three Gorges.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Yangtze Explorer'
      },
      {
        day: 7,
        title: 'Three Gorges to Chongqing',
        description: 'Final day cruising. Evening farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Yangtze Explorer'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      '7 nights luxury cruise accommodation',
      'All meals on board',
      'Expert English-speaking cruise director',
      'All shore excursions',
      'Premium river-view hotels',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'China Signature Shangri-La Tour | 8 Days | CTS Tours',
    metaDescription: 'Luxury Yangtze River cruise with CTS Tours. 8-day journey featuring Three Gorges and Shangri-La. Premium accommodations.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-sig-5',
    slug: 'yunnan-explorer',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Yunnan Explorer',
    title: 'China Signature — Yunnan Explorer',
    shortDescription: 'Regional depth product exploring ethnic minority cultures and natural wonders of Yunnan province.',
    duration: '9 Days',
    price: 'From $4,499',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Kunming city exploration',
      'Dali ancient town',
      'Lijiang Old Town',
      'Tiger Leaping Gorge',
      'Ethnic minority cultural experiences',
      'Shaxi rice terraces'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kunming',
        description: 'VIP transfer to luxury hotel. Welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Shangri-La Kunming'
      },
      {
        day: 2,
        title: 'Kunming to Dali',
        description: 'Transfer to Dali. Explore ancient town and Three Pagodas.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Shangri-La Dali'
      },
      {
        day: 3,
        title: 'Dali to Lijiang',
        description: 'Drive to Lijiang. Explore Old Town and Black Dragon Pool.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Lijiang'
      },
      {
        day: 4,
        title: 'Lijiang to Shaxi',
        description: 'Visit Tiger Leaping Gorge. Continue to Shaxi.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Shaxi'
      },
      {
        day: 5,
        title: 'Shaxi to Kunming',
        description: 'Return to Kunming. Evening at leisure.',
        meals: ['Breakfast'],
        accommodation: 'Shangri-La Kunming'
      },
      {
        day: 6,
        title: 'Kunming to Yuanyang',
        description: 'Fly to Yuanyang. Visit rice terraces.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Yuanyang'
      },
      {
        day: 7,
        title: 'Yuanyang Exploration',
        description: 'Full day exploring rice terraces and Hani culture.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Yuanyang'
      },
      {
        day: 8,
        title: 'Yuanyang to Kunming',
        description: 'Return to Kunming. Farewell dinner.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Kunming'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'All accommodation in 4-star hotels',
      'Daily breakfast',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'Private transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Signature Yunnan Explorer | 9 Days | CTS Tours',
    metaDescription: 'Regional depth exploration with CTS Tours. 9-day journey through Kunming, Dali, Lijiang, and Yuanyang. Premium accommodations.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-sig-6',
    slug: 'natural-china',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Natural China',
    title: 'China Signature — Natural China',
    shortDescription: 'Nature-focused, off-circuit journey through China\'s most scenic landscapes and natural wonders.',
    duration: '11 Days',
    price: 'From $4,799',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Zhangjiajie Avatar Mountains',
      'Yellow Mountain (Huangshan)',
      'Guilin karst landscape',
      'Li River cruise',
      'Nature photography opportunities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zhangjiajie',
        description: 'VIP transfer to luxury hotel. Welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Shangri-La Zhangjiajie'
      },
      {
        day: 2,
        title: 'Zhangjiajie Exploration',
        description: 'Full day exploring Avatar Mountains with private guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Zhangjiajie'
      },
      {
        day: 3,
        title: 'Zhangjiajie to Guilin',
        description: 'Fly to Guilin. Evening Li River walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Guilin'
      },
      {
        day: 4,
        title: 'Li River Cruise',
        description: 'Full day cruise to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 5,
        title: 'Yangshuo Exploration',
        description: 'Bamboo rafting and countryside bike ride.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Alila Yangshuo'
      },
      {
        day: 6,
        title: 'Yangshuo to Guilin',
        description: 'Return to Guilin. Visit Reed Flute Cave.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Guilin'
      },
      {
        day: 7,
        title: 'Guilin to Huangshan',
        description: 'Fly to Huangshan. Cable car and sunset views.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Huangshan'
      },
      {
        day: 8,
        title: 'Huangshan Exploration',
        description: 'Full day on Yellow Mountain with private guide.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Huangshan'
      },
      {
        day: 9,
        title: 'Huangshan to Shanghai',
        description: 'Fly to Shanghai. Evening Bund walk.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Shangri-La Shanghai'
      },
      {
        day: 10,
        title: 'Shanghai Tour',
        description: 'Yu Garden and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Shangri-La Shanghai'
      },
      {
        day: 11,
        title: 'Departure',
        description: 'Transfer to airport for onward flight.',
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'All accommodation in 4-star hotels',
      'Daily breakfast',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'Li River cruise',
      'Huangshan cable car'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'China Signature Natural China | 11 Days | CTS Tours',
    metaDescription: 'Nature-focused journey with CTS Tours. 11-day tour covering Zhangjiajie, Guilin, and Huangshan. Premium accommodations.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

// Helper functions
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getToursByDestination(destination: string): Tour[] {
  return tours.filter(t => t.destination === destination && t.isActive);
}

export function getToursByDestinationAndTier(destination: string, tier: string): Tour[] {
  return tours.filter(t => 
    t.destination === destination && 
    t.tier === tier && 
    t.isActive
  );
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(t => t.slug === slug && t.isActive);
}

export function getAllActiveTours(): Tour[] {
  return tours.filter(t => t.isActive);
}
