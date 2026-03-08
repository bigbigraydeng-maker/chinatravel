// GEO 服务，用于地理位置检测和个性化推荐

// 地理位置接口
interface Location {
  country: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

// 旅游产品接口
interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  isPremium: boolean;
}

// 文章接口
interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: string;
}

// 模拟地理位置检测
// 在实际应用中，可以使用 IP 地址检测或浏览器的 Geolocation API
export const detectLocation = async (): Promise<Location> => {
  // 模拟新西兰用户
  // 在实际应用中，这里可以使用第三方服务如 ipinfo.io 或浏览器的 Geolocation API
  return new Promise((resolve) => {
    // 模拟网络请求延迟
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

// 基于地理位置的个性化推荐
export const getPersonalizedRecommendations = async (location: Location) => {
  // 模拟旅游产品数据
  const tours: Tour[] = [
    {
      id: 1,
      title: 'Imperial China Tour',
      slug: 'imperial-china-tour',
      description: 'Explore the imperial history of China with visits to Beijing, Xi\'an, and Shanghai. Small groups, premium hotels, deeper access, and expert-led experiences.',
      duration: '12 Days',
      price: 'From $3,999',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20imperial%20tour%20historical%20sites&image_size=landscape_16_9',
      isPremium: true
    },
    {
      id: 2,
      title: 'Yangtze River Cruise',
      slug: 'yangtze-river-cruise',
      description: 'Experience the majesty of the Yangtze River with a luxury cruise. Small groups, premium accommodations, deeper access, and expert-led experiences.',
      duration: '7 Days',
      price: 'From $2,499',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangtze%20River%20cruise%20luxury%20ship&image_size=landscape_16_9',
      isPremium: true
    },
    {
      id: 3,
      title: 'Cultural China Immersion',
      slug: 'cultural-china-immersion',
      description: 'Immerse yourself in Chinese culture with visits to traditional villages, local markets, and cultural performances. Small groups, premium hotels, deeper access, and expert-led experiences.',
      duration: '10 Days',
      price: 'From $3,299',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20cultural%20immersion%20traditional%20village&image_size=landscape_16_9',
      isPremium: true
    },
    {
      id: 4,
      title: 'Classic China Experience',
      slug: 'classic-china-experience',
      description: 'A comprehensive tour covering the best of China\'s cultural and natural highlights. Carefully designed itineraries, excellent value, and quality essential experiences.',
      duration: '10 Days',
      price: 'From $2,999',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20classic%20tour%20cultural%20highlights&image_size=landscape_16_9',
      isPremium: false
    },
    {
      id: 5,
      title: 'China Discovery Tour',
      slug: 'china-discovery-tour',
      description: 'A perfect introduction to China\'s top destinations. Carefully designed itineraries, excellent value, and quality essential experiences.',
      duration: '8 Days',
      price: 'From $2,199',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20discovery%20tour%20popular%20destinations&image_size=landscape_16_9',
      isPremium: false
    },
    {
      id: 6,
      title: 'Essential China',
      slug: 'essential-china',
      description: 'Experience the essential highlights of China in a concise itinerary. Carefully designed itineraries, excellent value, and quality essential experiences.',
      duration: '7 Days',
      price: 'From $1,999',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20essential%20highlights%20tour&image_size=landscape_16_9',
      isPremium: false
    }
  ];

  // 模拟文章数据
  const articles: Article[] = [
    {
      id: 1,
      title: 'Best Time to Visit China',
      slug: 'best-time-to-visit-china',
      content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery.',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20spring%20cherry%20blossoms&image_size=landscape_16_9',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'China Visa Guide for New Zealanders',
      slug: 'china-visa-guide-for-new-zealanders',
      content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip.',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20visa%20application%20process&image_size=landscape_16_9',
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: 3,
      title: 'Is China Safe to Travel?',
      slug: 'is-china-safe-to-travel',
      content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions.',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20safe%20travel%20tourist%20friendly&image_size=landscape_16_9',
      created_at: '2024-01-05T00:00:00Z'
    },
    {
      id: 4,
      title: 'Top 10 Attractions in China',
      slug: 'top-10-attractions-in-china',
      content: 'China is home to many world-famous attractions, including the Great Wall, Forbidden City, Terracotta Army, and more. This guide will help you plan your visit to these iconic sites.',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20top%20attractions%20Great%20Wall&image_size=landscape_16_9',
      created_at: '2023-12-20T00:00:00Z'
    },
    {
      id: 5,
      title: 'Chinese Cuisine Guide',
      slug: 'chinese-cuisine-guide',
      content: 'Chinese cuisine is diverse and delicious, with each region offering its own unique dishes. From Peking duck to Sichuan hot pot, this guide will help you navigate the culinary delights of China.',
      image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cuisine%20traditional%20dishes&image_size=landscape_16_9',
      created_at: '2023-12-15T00:00:00Z'
    }
  ];

  // 基于地理位置的推荐逻辑
  // 对于新西兰用户，我们可以优先推荐：
  // 1. 适合新西兰人假期长度的旅游产品（7-14天）
  // 2. 包含新西兰直飞航线的目的地
  // 3. 针对新西兰人兴趣的文化体验
  
  let recommendedTours: Tour[] = [];
  let recommendedArticles: Article[] = [];

  if (location.country === 'New Zealand') {
    // 推荐适合新西兰人假期长度的旅游产品
    recommendedTours = tours.filter(tour => {
      const duration = parseInt(tour.duration);
      return duration >= 7 && duration <= 14;
    });

    // 推荐与新西兰用户相关的文章
    recommendedArticles = articles.filter(article => 
      article.title.includes('New Zealanders') || 
      article.title.includes('Time to Visit') || 
      article.title.includes('Safe')
    );
  } else {
    // 对于其他国家用户，推荐热门旅游产品和通用文章
    recommendedTours = tours.slice(0, 3);
    recommendedArticles = articles.slice(0, 3);
  }

  return {
    tours: recommendedTours.slice(0, 3), // 最多返回3个推荐
    articles: recommendedArticles.slice(0, 3) // 最多返回3个推荐
  };
};

// 获取用户当前季节的推荐
export const getSeasonalRecommendations = () => {
  const currentMonth = new Date().getMonth() + 1;
  let season = '';
  let recommendedDestinations: string[] = [];

  // 确定北半球季节（中国的季节）
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