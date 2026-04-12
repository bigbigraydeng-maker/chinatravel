
    // Mock the destinations and tours arrays
    const destinations = [
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
    const tours = [
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
    slug: 'beijing-xian',
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
      'Hutong rickshaw ride',
      'Beijing duck dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Arrive and transfer to your hotel. Evening welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 2,
        title: 'Great Wall',
        description: 'Half-day trip to the Great Wall at Mutianyu.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Beijing'
      },
      {
        day: 3,
        title: 'Beijing City Tour',
        description: 'Forbidden City and Tiananmen Square.',
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
      'One lunch and one dinner'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Beijing Stopover Tour | 4 Days | CTS Tours',
    metaDescription: 'Make the most of your layover with CTS Tours. 4-day Beijing stopover featuring Great Wall and Forbidden City.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-2',
    slug: 'shanghai',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Shanghai',
    title: 'China Stopover — Shanghai (3 Days)',
    shortDescription: 'Experience the dynamic blend of old and new in Shanghai.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80'
    ],
    highlights: [
      'The Bund and Pudong skyline',
      'Yu Garden and Old Town',
      'Shanghai Museum',
      'Xintiandi entertainment district',
      'Acrobatics show'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shanghai',
        description: 'Arrive and transfer to your hotel. Evening at the Bund.',
        meals: ['Dinner'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 2,
        title: 'Shanghai City Tour',
        description: 'Yu Garden, Old Town, and Shanghai Museum.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Shanghai'
      },
      {
        day: 3,
        title: 'Departure',
        description: 'Transfer to airport for your onward flight.',
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
    metaDescription: 'Experience Shanghai with CTS Tours. 3-day stopover featuring The Bund and Yu Garden.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-3',
    slug: 'xian',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Xi\'an',
    title: 'China Stopover — Xi\'an (3 Days)',
    shortDescription: 'Discover the ancient capital and its famous Terracotta Warriors.',
    duration: '3 Days',
    price: 'From $799',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
    ],
    highlights: [
      'Terracotta Warriors',
      'Ancient City Wall',
      'Muslim Quarter',
      'Big Wild Goose Pagoda',
      'Xian dumpling dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Xi\'an',
        description: 'Arrive and transfer to your hotel. Evening at Muslim Quarter.',
        meals: ['Dinner'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 2,
        title: 'Terracotta Warriors',
        description: 'Full day at the Terracotta Army.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Xi\'an'
      },
      {
        day: 3,
        title: 'Xi\'an City Tour',
        description: 'Ancient City Wall and Big Wild Goose Pagoda. Departure.',
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
    id: 'tour-cn-stp-4',
    slug: 'chengdu',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Chengdu',
    title: 'China Stopover — Chengdu (3 Days)',
    shortDescription: 'Meet the pandas and experience Sichuan cuisine.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Giant Panda Research Center',
      'Jinli Ancient Street',
      'Wuhou Shrine',
      'Sichuan hot pot dinner',
      'Traditional tea ceremony'
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
        title: 'Panda Day',
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
  // Japan Signature Tours
  {
    id: 'tour-jp-sig-1',
    slug: 'ultimate',
    destination: 'japan',
    tier: 'signature',
    name: 'Japan Signature — Ultimate',
    title: 'Japan Signature — Ultimate',
    shortDescription: 'Premium Japan product. A natural Signature fit if inclusions align.',
    duration: '14 Days',
    price: 'From $5,999',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80'
    ],
    highlights: [
      'Witness Mount Fuji from multiple perspectives',
      'Stay in luxury ryokans with private onsens',
      'Exclusive access to ancient temples',
      'Authentic kaiseki dining experiences',
      'Bullet train journey across Japan'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tokyo',
        description: 'Welcome to Japan! Transfer to your luxury hotel and enjoy a welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'The Ritz-Carlton Tokyo'
      },
      {
        day: 2,
        title: 'Tokyo Exploration',
        description: 'Morning visit to Meiji Shrine, afternoon in Ginza shopping district.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'The Ritz-Carlton Tokyo'
      },
      {
        day: 3,
        title: 'Tokyo to Hakone',
        description: 'Bullet train to Hakone, enjoy hot springs and Mount Fuji views.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Gora Kadan Ryokan'
      }
    ],
    inclusions: [
      'All accommodation in 5-star hotels and luxury ryokans',
      'Daily breakfast and select meals',
      'Expert English-speaking guide',
      'All entrance fees and activities',
      'Domestic bullet train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Gratuities'
    ],
    metaTitle: 'Japan Signature Ultimate Tour | 14 Days | CTS Tours',
    metaDescription: 'Premium Japan experience with CTS Tours. 14-day luxury tour featuring Mount Fuji, ryokans, and exclusive cultural experiences.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // Japan Discovery Tours
  {
    id: 'tour-jp-dis-1',
    slug: 'highlights',
    destination: 'japan',
    tier: 'discovery',
    name: 'Japan Discovery — Highlights',
    title: 'Japan Discovery — Highlights',
    shortDescription: 'Core Japan highlights tour. Clean Discovery placement.',
    duration: '10 Days',
    price: 'From $3,499',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80'
    ],
    highlights: [
      'Tokyo city highlights',
      'Kyoto ancient temples and gardens',
      'Osaka castle and Dotonbori',
      'Bullet train experience',
      'Traditional Japanese cuisine'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tokyo',
        description: 'Arrive in Tokyo and transfer to your hotel. Evening welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Hilton Tokyo'
      },
      {
        day: 2,
        title: 'Tokyo City Tour',
        description: 'Senso-ji Temple, Asakusa, and Tokyo Tower.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Hilton Tokyo'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Bullet train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Japan Discovery Highlights Tour | 10 Days | CTS Tours',
    metaDescription: 'Core Japan highlights with CTS Tours. 10-day tour covering Tokyo, Kyoto, and Osaka. Great value, expert guides.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-jp-dis-2',
    slug: 'explorer',
    destination: 'japan',
    tier: 'discovery',
    name: 'Japan Discovery — Explorer',
    title: 'Japan Discovery — Explorer',
    shortDescription: 'Updated to align with the new tier structure, as \'Discovery\' now serves as a tier name across all destinations.',
    duration: '12 Days',
    price: 'From $3,999',
    heroImage: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80'
    ],
    highlights: [
      'Tokyo, Kyoto, Osaka, and Hiroshima',
      'Hiroshima Peace Memorial Park',
      'Miyajima Island',
      'Bullet train journey',
      'Local market experiences'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tokyo',
        description: 'Airport transfer and check-in. Evening at leisure.',
        meals: ['Breakfast'],
        accommodation: 'Hilton Tokyo'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Bullet train tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner',
      'Personal expenses'
    ],
    metaTitle: 'Japan Discovery Explorer Tour | 12 Days | CTS Tours',
    metaDescription: 'Explore Japan with CTS Tours. 12-day journey covering Tokyo, Kyoto, Osaka, and Hiroshima. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // Vietnam Discovery Tours
  {
    id: 'tour-vn-dis-1',
    slug: 'panorama',
    destination: 'vietnam',
    tier: 'discovery',
    name: 'Vietnam Discovery — Panorama',
    title: 'Vietnam Discovery — Panorama',
    shortDescription: 'Full country overview. Could move to Signature if inclusions warrant it — worth reviewing.',
    duration: '14 Days',
    price: 'From $3,499',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      'https://images.unsplash.com/photo-1581093483799-f1233f8696c5?w=800&q=80'
    ],
    highlights: [
      'Hanoi old quarter',
      'Halong Bay cruise',
      'Hue imperial city',
      'Hoi An ancient town',
      'Ho Chi Minh City',
      'Mekong Delta'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Hanoi',
        description: 'Welcome to Vietnam! Transfer to your hotel and enjoy a welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Sofitel Legend Metropole Hanoi'
      },
      {
        day: 2,
        title: 'Hanoi City Tour',
        description: 'Ho Chi Minh Mausoleum, One Pillar Pagoda, and Old Quarter.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Sofitel Legend Metropole Hanoi'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Halong Bay cruise',
      'Domestic flights and transportation',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Vietnam Discovery Panorama Tour | 14 Days | CTS Tours',
    metaDescription: 'Full country overview with CTS Tours. 14-day journey covering Hanoi, Halong Bay, Hue, Hoi An, and Ho Chi Minh City.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-vn-dis-2',
    slug: 'highlights',
    destination: 'vietnam',
    tier: 'discovery',
    name: 'Vietnam Discovery — Highlights',
    title: 'Vietnam Discovery — Highlights',
    shortDescription: 'Core Vietnam product. Clean Discovery placement.',
    duration: '12 Days',
    price: 'From $2,999',
    heroImage: 'https://images.unsplash.com/photo-1581093483799-f1233f8696c5?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581093483799-f1233f8696c5?w=800&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80'
    ],
    highlights: [
      'Hanoi cultural experiences',
      'Halong Bay cruise',
      'Hoi An ancient town',
      'Ho Chi Minh City highlights',
      'Vietnamese cuisine tasting'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Hanoi',
        description: 'Airport transfer and check-in. Evening welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Hilton Hanoi Opera'
      },
      {
        day: 2,
        title: 'Halong Bay Cruise',
        description: 'Full day cruise in Halong Bay with lunch and activities.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Overnight cruise'
      }
    ],
    inclusions: [
      'Accommodation in 4-star hotels and cruise',
      'Daily breakfast',
      'English-speaking guide',
      'Entrance fees',
      'Halong Bay cruise',
      'Domestic flights and transportation',
      'Airport transfers'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Lunch and dinner (except where specified)',
      'Personal expenses'
    ],
    metaTitle: 'Vietnam Discovery Highlights Tour | 12 Days | CTS Tours',
    metaDescription: 'Core Vietnam experience with CTS Tours. 12-day tour covering Hanoi, Halong Bay, Hoi An, and Ho Chi Minh City. Great value.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'tour-cn-stp-5',
    slug: 'guilin',
    destination: 'china',
    tier: 'stopover',
    name: 'China Stopover — Guilin',
    title: 'China Stopover — Guilin (3 Days)',
    shortDescription: 'Experience Guilin\'s stunning karst landscape.',
    duration: '3 Days',
    price: 'From $699',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80'
    ],
    highlights: [
      'Li River cruise',
      'Elephant Trunk Hill',
      'Reed Flute Cave',
      'Rongshui Miao Village',
      'Guilin night market'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guilin',
        description: 'Arrive and transfer to your hotel. Evening walk along Li River.',
        meals: ['Dinner'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 2,
        title: 'Li River Cruise',
        description: 'Scenic cruise along Li River to Yangshuo.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Novotel Guilin'
      },
      {
        day: 3,
        title: 'Guilin City Tour',
        description: 'Elephant Trunk Hill and Reed Flute Cave. Departure.',
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
    metaTitle: 'Guilin Stopover Tour | 3 Days | CTS Tours',
    metaDescription: 'Experience Guilin\'s karst landscape with CTS Tours. 3-day stopover featuring Li River cruise and Reed Flute Cave.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];
    
    // Mock the functions
    const getDestinationBySlug = (slug) => {
      
  return destinations.find(dest => dest.slug === slug);

    };
    
    const getToursByDestination = (destination) => {
      
  return tours.filter(tour => 
    tour.destination === destination &&
    tour.isActive
  );

    };
    
    // Mock the notFound function
    const notFound = () => {
      throw new Error('Not found');
    };
    
    // Test the server-side rendering process
    console.log('Testing server-side rendering for /tours/japan:');
    try {
      const destination = getDestinationBySlug('japan');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('japan');
      console.log('✓ Japan destination found:', destination.name);
      console.log('✓ Japan tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
    
    console.log('
Testing server-side rendering for /tours/vietnam:');
    try {
      const destination = getDestinationBySlug('vietnam');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('vietnam');
      console.log('✓ Vietnam destination found:', destination.name);
      console.log('✓ Vietnam tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
    
    console.log('
Testing server-side rendering for /tours/china:');
    try {
      const destination = getDestinationBySlug('china');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('china');
      console.log('✓ China destination found:', destination.name);
      console.log('✓ China tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
  