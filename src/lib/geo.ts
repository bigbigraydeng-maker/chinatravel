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
  // Real tour data from tours.ts (kept in sync via migration script)
  const tours: Tour[] = [
    {
      id: 1,
      title: 'China Signature — Imperial Heritage',
      slug: 'imperial-heritage',
      description: 'Experience the highlights of Beijing and Xi\'an in this immersive tour, from the Great Wall and Forbidden City to the Terracotta Warriors, Lhasa, Yangtze River cruise, and Shanghai.',
      duration: '17 Days',
      price: 'From NZD $6,799',
      image_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
      isPremium: true
    },
    {
      id: 2,
      title: 'China Signature — Grand Tour',
      slug: 'grand-tour',
      description: 'See China in full colour on this 27-day grand tour. From the Great Wall and Terracotta Warriors to a Yangtze River cruise, pandas in Chengdu, and the scenic beauty of Guilin, Hangzhou, and Suzhou.',
      duration: '27 Days',
      price: 'From NZD $8,699',
      image_url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      isPremium: true
    },
    {
      id: 3,
      title: 'China Signature — Silk Road',
      slug: 'silk-road',
      description: 'Journey through China\'s ancient trade route, from Urumqi to Xi\'an, exploring desert oases, Buddhist grottoes and colourful Danxia mountains.',
      duration: '17 Days',
      price: 'From NZD $4,899',
      image_url: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80',
      isPremium: true
    },
    {
      id: 4,
      title: 'China Discovery — Beijing & Shanghai',
      slug: 'beijing-shanghai',
      description: 'Step into the heart of China experiencing the Great Wall, Forbidden City, Terracotta Warriors, and the contrast between ancient Beijing and modern Shanghai.',
      duration: '10 Days',
      price: 'From NZD $3,099',
      image_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
      isPremium: false
    },
    {
      id: 5,
      title: 'China Discovery — Highlights',
      slug: 'highlights',
      description: 'A journey combining wildlife encounters with historical exploration — giant pandas, high-speed trains, Terracotta Warriors, and Jiuzhaigou\'s crystalline lakes.',
      duration: '11 Days',
      price: 'From NZD $2,999',
      image_url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
      isPremium: false
    },
    {
      id: 6,
      title: 'China Discovery — Essentials',
      slug: 'essentials',
      description: 'A comprehensive journey through China\'s iconic destinations — Shanghai, Suzhou, Wuxi, Hangzhou, Beijing, and Xi\'an.',
      duration: '15 Days',
      price: 'From NZD $3,599',
      image_url: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
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