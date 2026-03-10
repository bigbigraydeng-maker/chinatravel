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
        description: 'Premium small-group journeys with exclusive experiences and luxury accommodations',
        features: ['Max 12 guests', '5-star hotels', 'Expert guides', 'Exclusive access']
      },
      {
        id: 'tier-discovery',
        slug: 'discovery',
        name: 'Discovery',
        description: 'Carefully crafted itineraries offering exceptional value without compromise',
        features: ['Small groups', 'Quality hotels', 'Local guides', 'Great value']
      },
      {
        id: 'tier-stopover',
        slug: 'stopover',
        name: 'Stopover',
        description: 'Short city breaks perfect for extending your journey',
        features: ['2-5 days', 'City focused', 'Flexible dates', 'Easy add-on']
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
        features: ['Max 10 guests', 'Ryokan stays', 'Expert guides', 'Cultural immersion']
      },
      {
        id: 'tier-discovery',
        slug: 'discovery',
        name: 'Discovery',
        description: 'Essential Japan experiences at exceptional value',
        features: ['Small groups', 'Quality hotels', 'Local guides', 'Great value']
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
        features: ['Small groups', 'Boutique hotels', 'Local guides', 'Authentic experiences']
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
    slug: 'imperial-journey',
    destination: 'china',
    tier: 'signature',
    name: 'China Signature — Imperial Journey',
    title: 'China Signature — Imperial Journey',
    shortDescription: 'Experience China\'s imperial heritage through its grand palaces, gardens, and ancient capitals.',
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
      'Cruise the Summer Palace gardens',
      'Explore the Summer Palace with a historian',
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
      }
    ],
    inclusions: [
      'All accommodation in 5-star hotels',
      'Daily breakfast and select meals',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic flights and transportation',
      'VIP airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'China Signature Imperial Journey | 12 Days | CTS Tours',
    metaDescription: 'Experience China\'s imperial heritage with CTS Tours. 12-day luxury tour featuring exclusive Forbidden City access. Expert guides, 5-star hotels.',
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
