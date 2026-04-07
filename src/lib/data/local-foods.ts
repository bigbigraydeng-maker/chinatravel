export interface LocalFood {
  id: string;
  name: string;
  chineseName: string;
  destination: string; // Slug of destination guide
  destinationName: string; // Display name
  description: string; // 100-150 words
  imageUrl: string; // Unsplash URL
  whereToBuy: string[]; // 2-3 locations/restaurant names
  flavor: string; // 'spicy' | 'savory' | 'sweet' | 'umami' | 'sour'
  difficulty: 'must-try' | 'recommended' | 'adventurous';
  relatedBlogSlug?: string;
  relatedGuideSlug?: string;
  season?: string; // best season to try
}

export const localFoods: LocalFood[] = [
  // Beijing 北京
  {
    id: 'beijing-001',
    name: 'Peking Duck',
    chineseName: '北京烤鸭',
    destination: 'beijing',
    destinationName: 'Beijing',
    description: 'The quintessential Beijing dish. Roasted over fruitwood for hours until the skin is golden and crispy, then sliced tableside. Traditionally wrapped in thin crepes with hoisin sauce and cucumber. A UNESCO Intangible Cultural Heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1609335314336-52e4f5a04f82?w=800&q=80',
    whereToBuy: ['Quanjude Duck Restaurant', 'Da Dong Roast Duck', 'Made in China Restaurant'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'beijing-travel-guide',
    season: 'year-round'
  },
  {
    id: 'beijing-002',
    name: 'Jianbing',
    chineseName: '煎饼',
    destination: 'beijing',
    destinationName: 'Beijing',
    description: 'A savory crepe found at street carts throughout Beijing. Made from flour and eggs, it\'s folded with scallions, a crispy cracker, and sweet or salty sauce. Perfect for breakfast and costs just 1-2 yuan.',
    imageUrl: 'https://images.unsplash.com/photo-1613168342304-ce983512c205?w=800&q=80',
    whereToBuy: ['Street vendors near subway stations', 'Morning markets', 'Temple Fair (Miao Hui)'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'spring-autumn'
  },
  {
    id: 'beijing-003',
    name: 'Maoxuewang',
    chineseName: '毛血旺',
    destination: 'beijing',
    destinationName: 'Beijing',
    description: 'A spicy hotpot dish with blood and meat in chili broth. An adventurous must-try for the brave. The name translates to "furry blood"—quite literal but incredibly flavorful.',
    imageUrl: 'https://images.unsplash.com/photo-1568143211346-98f3ebb25121?w=800&q=80',
    whereToBuy: ['Sichuan hotpot restaurants', 'Huguosi Street food area'],
    flavor: 'spicy',
    difficulty: 'adventurous',
    season: 'autumn-winter'
  },
  {
    id: 'beijing-004',
    name: 'Zhajiang Noodles',
    chineseName: '炸酱面',
    destination: 'beijing',
    destinationName: 'Beijing',
    description: 'Wheat noodles topped with a thick, salty-sweet sauce made from fermented soybean and pork. Served with julienned cucumber, daikon, and soybean sprouts. Beijing\'s everyday comfort food.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Local noodle shops', 'Department store food courts', 'Neighborhood restaurants'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },
  {
    id: 'beijing-005',
    name: 'Youtiao',
    chineseName: '油条',
    destination: 'beijing',
    destinationName: 'Beijing',
    description: 'Long, crispy fried dough sticks. Eaten for breakfast dipped in soy milk (doujiang) or congee. A beloved street food found everywhere in China, perfect for early risers.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-4de3c9ac56d5?w=800&q=80',
    whereToBuy: ['Street carts', 'Breakfast stalls', 'Dim sum restaurants'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },

  // Shanghai 上海
  {
    id: 'shanghai-001',
    name: 'Xiaolongbao',
    chineseName: '小笼包',
    destination: 'shanghai',
    destinationName: 'Shanghai',
    description: 'Delicate soup dumplings with a thin wrapper and pork-filled center. Hot broth is sealed inside the dumpling—eat carefully to avoid splashing. The signature Shanghai dish.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    whereToBuy: ['Jia Jia Tang Bao', 'Nanxiang Mantou Dian', 'Din Tai Fung', 'Yuyuan Teahouse'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'shanghai-travel-guide',
    season: 'year-round'
  },
  {
    id: 'shanghai-002',
    name: 'Shengian',
    chineseName: '生煎',
    destination: 'shanghai',
    destinationName: 'Shanghai',
    description: 'Pan-fried dumplings with soup inside. The bottom is crispy from being fried in the pan, while the top stays tender. Topped with sesame and scallions.',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    whereToBuy: ['Street food carts', 'Breakfast stalls', 'Xiao Long Tang Bao'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },
  {
    id: 'shanghai-003',
    name: 'Luosifen',
    chineseName: '螺蛳粉',
    destination: 'shanghai',
    destinationName: 'Shanghai',
    description: 'Rice noodles in a rich, pungent snail broth with fermented bean paste. Strong aroma—not for everyone, but deeply addictive. Originated in Liuzhou, now popular everywhere.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Luosifen specialist restaurants', 'Guangxi food courts'],
    flavor: 'spicy',
    difficulty: 'adventurous',
    season: 'year-round'
  },
  {
    id: 'shanghai-004',
    name: 'Chives Box',
    chineseName: '韭菜盒子',
    destination: 'shanghai',
    destinationName: 'Shanghai',
    description: 'Crispy pan-fried pastry stuffed with Chinese chives (garlic chives), egg, and glass noodles. Eaten as breakfast or snack. Simple but extraordinarily satisfying.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-4de3c9ac56d5?w=800&q=80',
    whereToBuy: ['Street vendors', 'Breakfast shops', 'Local bakeries'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },

  // Xi'an 西安
  {
    id: 'xian-001',
    name: 'Biang Biang Noodles',
    chineseName: '陕西面条',
    destination: 'xian',
    destinationName: 'Xi\'an',
    description: 'Wide, thick wheat noodles topped with chili oil, minced meat, and vegetables. The name "biang biang" mimics the sound of slapping dough on the counter. Authentic street food from Shaanxi province.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Food Street (Hui Min Jie)', 'Muslim Quarter', 'Local noodle shops'],
    flavor: 'spicy',
    difficulty: 'must-try',
    relatedGuideSlug: 'xian-travel-guide',
    season: 'year-round'
  },
  {
    id: 'xian-002',
    name: 'Roujiamo',
    chineseName: '肉夹馍',
    destination: 'xian',
    destinationName: 'Xi\'an',
    description: 'A crispy flatbread sandwich filled with slow-cooked, spiced meat. Often compared to a Chinese hamburger. Beloved breakfast food. The meat is stewed for hours with 20+ spices.',
    imageUrl: 'https://images.unsplash.com/photo-1596040424919-b3100d56d435?w=800&q=80',
    whereToBuy: ['Hui Min Jie (Muslim Quarter)', 'Street vendors', 'Local restaurants'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },
  {
    id: 'xian-003',
    name: 'Yangrou Paomo',
    chineseName: '羊肉泡馍',
    destination: 'xian',
    destinationName: 'Xi\'an',
    description: 'A hearty soup with lamb, bread soaked in rich broth, and cilantro. Breakfast dish favored for its warming properties. The bread is torn into small pieces before serving.',
    imageUrl: 'https://images.unsplash.com/photo-1568143211346-98f3ebb25121?w=800&q=80',
    whereToBuy: ['Lao Sun Jia restaurant', 'Muslim Quarter soup stalls', 'Local restaurants'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'autumn-winter'
  },

  // Chengdu 成都
  {
    id: 'chengdu-001',
    name: 'Mapo Tofu',
    chineseName: '麻婆豆腐',
    destination: 'chengdu',
    destinationName: 'Chengdu',
    description: 'Silken tofu in a numbing, spicy Sichuan peppercorn sauce with minced pork. One of China\'s most iconic dishes. The "ma" sensation from Sichuan peppercorns is unlike anything else.',
    imageUrl: 'https://images.unsplash.com/photo-1568143211346-98f3ebb25121?w=800&q=80',
    whereToBuy: ['Chen Mapo Tofu', 'Sichuan hotpot restaurants', 'Local eateries'],
    flavor: 'spicy',
    difficulty: 'must-try',
    relatedGuideSlug: 'chengdu-travel-guide',
    season: 'year-round'
  },
  {
    id: 'chengdu-002',
    name: 'Chongqing Chicken (La Zi Ji)',
    chineseName: '辣子鸡',
    destination: 'chengdu',
    destinationName: 'Chengdu',
    description: 'Diced chicken fried with dried red chilies, Sichuan peppercorns, and spices. A pile of chili peppers hides tender chicken underneath. Genuinely spicy—not for the faint of heart.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-4de3c9ac56d5?w=800&q=80',
    whereToBuy: ['Chongqing restaurants', 'Sichuan spice markets', 'Specialty eateries'],
    flavor: 'spicy',
    difficulty: 'adventurous',
    season: 'year-round'
  },
  {
    id: 'chengdu-003',
    name: 'Hot Pot (Huoguo)',
    chineseName: '火锅',
    destination: 'chengdu',
    destinationName: 'Chengdu',
    description: 'A bubbling broth at the table where you cook raw ingredients—meat, seafood, vegetables, tofu. Dip in sauce. A social, interactive dining experience. Chengdu style uses spicy oil-based broth.',
    imageUrl: 'https://images.unsplash.com/photo-1568143211346-98f3ebb25121?w=800&q=80',
    whereToBuy: ['Xiaolongkan', 'Ba Jiao You', 'Hotpot restaurants throughout the city'],
    flavor: 'spicy',
    difficulty: 'must-try',
    season: 'autumn-winter'
  },

  // Hangzhou 杭州
  {
    id: 'hangzhou-001',
    name: 'West Lake Fish in Vinegar Sauce',
    chineseName: '西湖醋鱼',
    destination: 'hangzhou',
    destinationName: 'Hangzhou',
    description: 'Fresh grass carp from West Lake, poached and served in a sweet-sour vinegar sauce. Delicate, light, and beautifully presented. A poetic Hangzhou signature.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    whereToBuy: ['Louwailou Restaurant', 'West Lake fine dining', 'High-end Hangzhou restaurants'],
    flavor: 'umami',
    difficulty: 'must-try',
    relatedGuideSlug: 'hangzhou-travel-guide',
    season: 'year-round'
  },
  {
    id: 'hangzhou-002',
    name: 'Longjing Tea',
    chineseName: '龙井茶',
    destination: 'hangzhou',
    destinationName: 'Hangzhou',
    description: 'Hangzhou\'s most famous tea, grown in the Dragon Well (Longjing) area. Delicate green tea with a chestnut aroma. Fresh, fragrant, and complex. Visit tea plantations to see production.',
    imageUrl: 'https://images.unsplash.com/photo-1597318471222-5d17e4f1ebf6?w=800&q=80',
    whereToBuy: ['Dragon Well tea plantations', 'Tea markets', 'Specialty tea shops'],
    flavor: 'umami',
    difficulty: 'must-try',
    season: 'spring'
  },
  {
    id: 'hangzhou-003',
    name: 'Beggar\'s Chicken',
    chineseName: '叫花鸡',
    destination: 'hangzhou',
    destinationName: 'Hangzhou',
    description: 'Whole chicken wrapped in lotus leaves and clay, slow-roasted until tender and fragrant. Theatrical presentation—the server breaks the clay at your table. Ancient Hangzhou specialty.',
    imageUrl: 'https://images.unsplash.com/photo-1583623352506-e94eb2e85be9?w=800&q=80',
    whereToBuy: ['Lou Wai Lou', 'Fine dining restaurants', 'Specialty poultry restaurants'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },

  // Guilin 桂林
  {
    id: 'guilin-001',
    name: 'Guilin Rice Noodles (Guilin Mifen)',
    chineseName: '桂林米粉',
    destination: 'guilin',
    destinationName: 'Guilin',
    description: 'Thin rice noodles served in a clear broth with various toppings—pork, peanuts, pickles, and greens. Guilin\'s signature breakfast. Light, fresh, and endlessly comforting.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Street stalls', 'Breakfast markets', 'Local noodle shops throughout Guilin'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'guilin-travel-guide',
    season: 'year-round'
  },
  {
    id: 'guilin-002',
    name: 'Snails in Broth (Luosifen)',
    chineseName: '螺蛳粉',
    destination: 'guilin',
    destinationName: 'Guilin',
    description: 'Originated in nearby Liuzhou. Rice noodles in a pungent snail broth with fermented beans. Aromatic, complex, addictive. Often considered one of China\'s greatest street foods.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Liuzhou food markets', 'Luosifen specialist shops', 'Guangxi food courts'],
    flavor: 'spicy',
    difficulty: 'adventurous',
    season: 'year-round'
  },

  // Chongqing 重庆
  {
    id: 'chongqing-001',
    name: 'Chongqing Hot Pot',
    chineseName: '重庆火锅',
    destination: 'chongqing',
    destinationName: 'Chongqing',
    description: 'The spiciest hotpot in China. A bubbling red broth of chili oil, Sichuan peppercorns, and spices. Cook thinly sliced meat, organ meats, vegetables, and fungi. For spice lovers only.',
    imageUrl: 'https://images.unsplash.com/photo-1568143211346-98f3ebb25121?w=800&q=80',
    whereToBuy: ['Xiaolongkan', 'Yu Xiang hotpot', 'Hotpot restaurants throughout Chongqing'],
    flavor: 'spicy',
    difficulty: 'adventurous',
    relatedGuideSlug: 'chongqing-travel-guide',
    season: 'autumn-winter'
  },
  {
    id: 'chongqing-002',
    name: 'Dumplings (Xiao Long Bao)',
    chineseName: '小笼包',
    destination: 'chongqing',
    destinationName: 'Chongqing',
    description: 'Chongqing\'s version of soup dumplings, often with chili oil incorporated. Spicy, tender, and filled with hot broth. A perfect complement to Chongqing\'s bold flavors.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    whereToBuy: ['Dim sum restaurants', 'Morning tea houses', 'Local dumpling shops'],
    flavor: 'spicy',
    difficulty: 'must-try',
    season: 'year-round'
  },

  // Yunnan 云南
  {
    id: 'yunnan-001',
    name: 'Rice Noodles in Soup (Yunnan Mixian)',
    chineseName: '云南米线',
    destination: 'yunnan',
    destinationName: 'Yunnan',
    description: 'Silky rice noodles served in a light broth with various toppings—sesame, peanuts, herbs. Each region in Yunnan has its own style. A staple throughout the province.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Street carts', 'Yunnan restaurants', 'Rice noodle shops in Kunming'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'yunnan-travel-guide',
    season: 'year-round'
  },
  {
    id: 'yunnan-002',
    name: 'Pu-erh Tea',
    chineseName: '普洱茶',
    destination: 'yunnan',
    destinationName: 'Yunnan',
    description: 'Dark, earthy tea from Yunnan\'s Pu\'er region. Can be aged for years, improving with time. Heavy, complex, warming. Visit tea plantations to see terraced gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1597318471222-5d17e4f1ebf6?w=800&q=80',
    whereToBuy: ['Pu\'er tea plantations', 'Tea markets in Kunming', 'Specialty tea houses'],
    flavor: 'umami',
    difficulty: 'must-try',
    season: 'year-round'
  },
  {
    id: 'yunnan-003',
    name: 'Crossing the Bridge Noodles (Guo Qiao Mi Xian)',
    chineseName: '过桥米线',
    destination: 'yunnan',
    destinationName: 'Yunnan',
    description: 'A legendary Yunnan dish with poetic origins. Rice noodles served in hot broth with raw ingredients on the side—cook them in the broth at your table. Beautiful and interactive.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Guo Qiao Mi Xian Restaurants', 'Kunming restaurants', 'Yunnan eateries'],
    flavor: 'savory',
    difficulty: 'must-try',
    season: 'year-round'
  },

  // Suzhou 苏州
  {
    id: 'suzhou-001',
    name: 'Suzhou Noodles (Su Zhou Cu Mian)',
    chineseName: '苏州面',
    destination: 'suzhou',
    destinationName: 'Suzhou',
    description: 'Soft, delicate noodles topped with a savory sauce (with or without broth). Often served with a perfect soft-boiled egg. Refined simplicity characteristic of Suzhou cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-415c69b41c0f?w=800&q=80',
    whereToBuy: ['Noodle shops', 'Local restaurants', 'Suzhou Old District'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'suzhou-travel-guide',
    season: 'year-round'
  },
  {
    id: 'suzhou-002',
    name: 'Fresh Water Shrimp (Tai Hu Bai Xia)',
    chineseName: '太湖白虾',
    destination: 'suzhou',
    destinationName: 'Suzhou',
    description: 'Delicate, sweet shrimp from Tai Lake. Often served simply stir-fried with salt or in a light sauce to preserve their natural sweetness. A local treasure.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    whereToBuy: ['Fine dining restaurants', 'Suzhou seafood restaurants', 'Local markets'],
    flavor: 'umami',
    difficulty: 'recommended',
    season: 'spring-autumn'
  },

  // Lijiang 丽江
  {
    id: 'lijiang-001',
    name: 'Naxi Grilled Fish',
    chineseName: '纳西烤鱼',
    destination: 'lijiang',
    destinationName: 'Lijiang',
    description: 'Fish from local mountain streams, grilled whole with Naxi spices. Smoky, tender, and infused with regional flavors. A specialty of the Naxi minority ethnic group.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    whereToBuy: ['Lijiang Old Town restaurants', 'Naxi specialty eateries'],
    flavor: 'savory',
    difficulty: 'recommended',
    relatedGuideSlug: 'lijiang-travel-guide',
    season: 'year-round'
  },

  // Dali 大理
  {
    id: 'dali-001',
    name: 'Bai Ethnic Cuisine',
    chineseName: '白族料理',
    destination: 'dali',
    destinationName: 'Dali',
    description: 'Unique Bai minority cuisine featuring fresh mountain vegetables, preserved foods, and unique preparations. Lighter and more herbal than Chinese cuisines elsewhere.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-4de3c9ac56d5?w=800&q=80',
    whereToBuy: ['Dali Old Town', 'Bai ethnic restaurants', 'Local markets'],
    flavor: 'savory',
    difficulty: 'recommended',
    relatedGuideSlug: 'dali-travel-guide',
    season: 'year-round'
  },

  // Yangshuo 阳朔
  {
    id: 'yangshuo-001',
    name: 'Yangshuo Beer Fish',
    chineseName: '啤酒鱼',
    destination: 'yangshuo',
    destinationName: 'Yangshuo',
    description: 'River fish braised in beer, tomato sauce, and spices. A Yangshuo specialty. The beer tenderizes the meat while adding subtle sweetness. Signature riverside restaurant dish.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    whereToBuy: ['Yangshuo West Street restaurants', 'Li River riverside eateries'],
    flavor: 'savory',
    difficulty: 'must-try',
    relatedGuideSlug: 'yangshuo-travel-guide',
    season: 'year-round'
  },
];

export const getLocalFoodsByDestination = (destination: string): LocalFood[] => {
  return localFoods.filter(food => food.destination === destination);
};

export const getLocalFoodsByFlavor = (flavor: string): LocalFood[] => {
  return localFoods.filter(food => food.flavor === flavor);
};

export const getMustTryFoods = (): LocalFood[] => {
  return localFoods.filter(food => food.difficulty === 'must-try');
};

export const getAllDestinationsWithFood = (): string[] => {
  return Array.from(new Set(localFoods.map(food => food.destination)));
};
