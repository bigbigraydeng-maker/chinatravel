// GEO service: location detection and personalized recommendations

// User location from IP or browser APIs
interface Location {
  country: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

interface Tour {
  id: number;
  title: string;
  slug: string;
  url: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  isPremium: boolean;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  url: string;
  content: string;
  image_url: string;
  created_at: string;
}

// Mock geolocation (replace with IP lookup or navigator.geolocation in production)
export const detectLocation = async (): Promise<Location> => {
  // Mock New Zealand visitor
  // In production: ipinfo.io, MaxMind, or browser Geolocation with consent
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      resolve({
        country: 'New Zealand',
        city: 'Auckland',
        region: 'Auckland Region',
        latitude: -36.8485,
        longitude: 174.7633
      });
    }, 300);
  });
};

// Personalized tours and articles from inferred location
export const getPersonalizedRecommendations = async (location: Location) => {
  const SB = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

  const tours: Tour[] = [
    {
      id: 1,
      title: 'China Discovery — Beijing & Shanghai',
      slug: 'beijing-shanghai',
      url: '/tours/china/discovery/beijing-shanghai',
      description: 'Step into the heart of China experiencing the Great Wall, Forbidden City, Terracotta Warriors, and the contrast between ancient Beijing and modern Shanghai.',
      duration: '10 Days',
      price: 'From NZD $3,099',
      image_url: `${SB}/forbidden-city-aerial.jpg`,
      isPremium: false
    },
    {
      id: 2,
      title: 'China Discovery — Highlights',
      slug: 'highlights',
      url: '/tours/china/discovery/highlights',
      description: 'A journey combining wildlife encounters with historical exploration — giant pandas, high-speed trains, Terracotta Warriors, and crystalline lakes.',
      duration: '11 Days',
      price: 'From NZD $2,999',
      image_url: `${SB}/chengdu-pandas.jpg`,
      isPremium: false
    },
    {
      id: 3,
      title: 'China Signature — Imperial Heritage',
      slug: 'imperial-heritage',
      url: '/tours/china/signature/imperial-heritage',
      description: 'Experience the highlights of Beijing and Xi\'an, from the Great Wall and Forbidden City to the Terracotta Warriors, Lhasa, Yangtze River cruise, and Shanghai.',
      duration: '17 Days',
      price: 'From NZD $6,799',
      image_url: `${SB}/great-wall-mist.jpg`,
      isPremium: true
    },
    {
      id: 4,
      title: 'China Signature — Silk Road',
      slug: 'silk-road',
      url: '/tours/china/signature/silk-road',
      description: 'Journey through China\'s ancient trade route, from Urumqi to Xi\'an, exploring desert oases, Buddhist grottoes and colourful Danxia mountains.',
      duration: '17 Days',
      price: 'From NZD $4,899',
      image_url: `${SB}/silk-road-wall.jpg`,
      isPremium: true
    },
    {
      id: 5,
      title: 'China Discovery — Essentials',
      slug: 'essentials',
      url: '/tours/china/discovery/essentials',
      description: 'A comprehensive journey through China\'s iconic destinations — Shanghai, Suzhou, Wuxi, Hangzhou, Beijing, and Xi\'an.',
      duration: '15 Days',
      price: 'From NZD $3,599',
      image_url: `${SB}/shanghai-night-blue.jpg`,
      isPremium: false
    },
    {
      id: 6,
      title: 'China Signature — Grand Tour',
      slug: 'grand-tour',
      url: '/tours/china/signature/grand-tour',
      description: 'See China in full colour on this 27-day grand tour. From the Great Wall and Terracotta Warriors to a Yangtze River cruise, pandas in Chengdu, and the scenic beauty of Guilin.',
      duration: '27 Days',
      price: 'From NZD $8,699',
      image_url: `${SB}/guilin-mist.jpg`,
      isPremium: true
    }
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: 'Best Time to Visit China',
      slug: 'best-time-to-visit-china',
      url: '/best-time-to-visit-china',
      content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery.',
      image_url: `${SB}/yunnan-rice-terraces.jpg`,
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'China Visa-Free for New Zealanders',
      slug: 'china-visa-guide-for-new-zealanders',
      url: '/china-visa-guide-for-new-zealanders',
      content: 'New Zealand citizens can now enter China visa-free for up to 30 days. This guide covers entry requirements, what to prepare, eligibility rules, and answers to common questions.',
      image_url: `${SB}/shanghai-night-red.jpg`,
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: 3,
      title: 'Is China Safe to Travel?',
      slug: 'is-china-safe-to-travel',
      url: '/guide/is-china-safe-to-travel',
      content: 'China is consistently rated as one of the safest countries in Asia for international tourists. Crime rates are low, and cities have extensive public safety infrastructure.',
      image_url: `${SB}/forbidden-city-gold-lion.jpg`,
      created_at: '2024-01-05T00:00:00Z'
    }
  ];

  // Region-based ranking: NZ visitors get mid-length tours and NZ-relevant articles
  let recommendedTours: Tour[] = [];
  let recommendedArticles: Article[] = [];

  if (location.country === 'New Zealand') {
    // Prefer itineraries that fit typical NZ annual-leave windows (about 7–14 days)
    recommendedTours = tours.filter(tour => {
      const duration = parseInt(tour.duration);
      return duration >= 7 && duration <= 14;
    });

    // Surface visa, timing, and safety content first
    recommendedArticles = articles.filter(article => 
      article.title.includes('New Zealanders') || 
      article.title.includes('Time to Visit') || 
      article.title.includes('Safe')
    );
  } else {
    // Default: top tours and general articles
    recommendedTours = tours.slice(0, 3);
    recommendedArticles = articles.slice(0, 3);
  }

  return {
    tours: recommendedTours.slice(0, 3), // cap at three tours
    articles: recommendedArticles.slice(0, 3) // cap at three articles
  };
};

// Seasonal destination hints (Northern Hemisphere, China-focused)
export const getSeasonalRecommendations = () => {
  const currentMonth = new Date().getMonth() + 1;
  let season = '';
  let recommendedDestinations: string[] = [];

  // Map calendar month to season in China
  if (currentMonth >= 3 && currentMonth <= 5) {
    season = 'Spring';
    recommendedDestinations = ['Beijing', 'Shanghai', 'Hangzhou'];
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    season = 'Summer';
    recommendedDestinations = ['Qingdao', 'Lhasa', 'Zhangjiajie'];
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    season = 'Autumn';
    recommendedDestinations = ['Beijing', 'Xi\'an', 'Guilin'];
  } else {
    season = 'Winter';
    recommendedDestinations = ['Hainan', 'Hong Kong', 'Chengdu'];
  }

  return {
    season,
    recommendedDestinations
  };
};
