export interface City {
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  culturalIntro: string[];
  highlights: string[];
  bestTimeToVisit: string;
  metaTitle: string;
  metaDescription: string;
}

export const cities: City[] = [
  {
    slug: 'beijing',
    name: 'Beijing',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    description: 'Home to the Great Wall and Forbidden City',
    culturalIntro: [
      'Beijing, the capital of China for over 800 years, is a city where ancient imperial grandeur meets modern dynamism. As the political and cultural heart of the nation, it houses some of the most significant historical sites in the world, including the Forbidden City — the largest palace complex ever built — and the iconic Great Wall of China, which winds through the mountains just north of the city.',
      'The city\'s hutong neighbourhoods offer a glimpse into traditional Beijing life, with narrow alleyways lined by courtyard homes that have stood for centuries. From the serene Temple of Heaven, where emperors once prayed for good harvests, to the vibrant night markets of Wangfujing, Beijing effortlessly blends the old with the new.',
      'Beijing is also a culinary capital, famous for its Peking Duck — a dish perfected over centuries in the imperial kitchens. The city\'s food scene ranges from humble street stalls serving jianbing (savoury crepes) to Michelin-starred restaurants reimagining Chinese cuisine.'
    ],
    highlights: [
      'The Great Wall at Mutianyu or Badaling',
      'Forbidden City & Tiananmen Square',
      'Temple of Heaven',
      'Summer Palace',
      'Hutong neighbourhood walks',
      'Peking Duck dining experience'
    ],
    bestTimeToVisit: 'September to November (autumn) for clear skies and comfortable temperatures',
    metaTitle: 'Beijing Travel Guide — CTS Tours',
    metaDescription: 'Discover Beijing with CTS Tours — explore the Great Wall, Forbidden City, Temple of Heaven, and authentic hutong neighbourhoods with expert-guided China tours.'
  },
  {
    slug: 'xian',
    name: "Xi'an",
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg',
    description: 'Home to the Terracotta Army and ancient city walls',
    culturalIntro: [
      "Xi'an, one of the Four Great Ancient Capitals of China, served as the seat of power for 13 dynasties over more than 1,100 years. It was the eastern terminus of the legendary Silk Road, making it one of the most cosmopolitan cities in the ancient world. Today, it remains a living museum of Chinese civilisation.",
      "The city's crowning treasure is the Terracotta Army — over 8,000 life-sized warriors buried with Emperor Qin Shi Huang more than 2,200 years ago. This UNESCO World Heritage Site is one of the greatest archaeological discoveries of the 20th century, and seeing the warriors in person is a truly awe-inspiring experience.",
      "Xi'an's Muslim Quarter is one of the most vibrant food streets in all of China, where Hui Muslim culture blends with Han Chinese traditions. Here you'll find hand-pulled noodles, lamb skewers, and roujiamo — often called 'Chinese hamburgers'. The ancient City Wall, one of the best-preserved in China, offers cycling and walking with panoramic views of the old city."
    ],
    highlights: [
      'Terracotta Army museum',
      'Ancient City Wall cycling',
      'Muslim Quarter street food',
      'Big Wild Goose Pagoda',
      'Shaanxi History Museum',
      'Tang Dynasty cultural show'
    ],
    bestTimeToVisit: 'March to May or September to November for pleasant weather',
    metaTitle: "Xi'an Travel Guide — CTS Tours",
    metaDescription: "Explore Xi'an with CTS Tours — visit the Terracotta Army, cycle the ancient City Wall, and taste authentic Silk Road cuisine on expert-guided tours."
  },
  {
    slug: 'shanghai',
    name: 'Shanghai',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-skyline.jpg',
    description: 'A modern metropolis with skyscrapers and historical landmarks',
    culturalIntro: [
      'Shanghai is China\'s most cosmopolitan city, a dazzling fusion of East and West that has captivated travellers for centuries. The Bund — a waterfront promenade lined with colonial-era architecture — faces the futuristic skyline of Pudong across the Huangpu River, creating one of the most iconic cityscapes in the world.',
      'Beyond the glittering towers, Shanghai reveals layers of history and culture. The French Concession neighbourhood is a tree-lined haven of art deco buildings, boutique cafes, and hidden gardens. Yu Garden, dating back to the Ming Dynasty, offers a tranquil escape in the heart of the old city, while the nearby bazaar bustles with vendors selling traditional crafts and xiaolongbao (soup dumplings).',
      'Shanghai\'s food scene is legendary — from delicate dim sum and hairy crab (a seasonal delicacy) to innovative fusion restaurants. The city is also China\'s fashion and art capital, home to galleries, design studios, and a nightlife scene that rivals any global metropolis.'
    ],
    highlights: [
      'The Bund waterfront promenade',
      'Yu Garden & Old City bazaar',
      'French Concession neighbourhood',
      'Pudong skyline & Shanghai Tower',
      'Xiaolongbao soup dumplings',
      'Zhujiajiao water town day trip'
    ],
    bestTimeToVisit: 'October to November for mild autumn weather, or March to May for spring',
    metaTitle: 'Shanghai Travel Guide — CTS Tours',
    metaDescription: 'Discover Shanghai with CTS Tours — walk the Bund, explore Yu Garden, taste authentic xiaolongbao, and experience China\'s most dynamic city.'
  },
  {
    slug: 'chengdu',
    name: 'Chengdu',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg',
    description: 'Famous for pandas and Sichuan cuisine',
    culturalIntro: [
      'Chengdu, the capital of Sichuan province, is one of China\'s most relaxed and liveable cities. It is best known as the home of the giant panda — the Chengdu Research Base of Giant Panda Breeding allows visitors to observe these beloved animals in a naturalistic setting, often just metres away from playful cubs.',
      'The city is the undisputed capital of Sichuan cuisine, one of China\'s Eight Great Culinary Traditions. Famous for its bold use of chilli and Sichuan peppercorn — which creates a unique numbing-spicy sensation — the local food ranges from fiery hotpot to the more subtle flavours of kung pao chicken and mapo tofu. Chengdu was designated a UNESCO City of Gastronomy in 2010.',
      'Chengdu\'s teahouse culture is central to daily life. Locals gather in bamboo-shaded teahouses to sip jasmine tea, play mahjong, and watch traditional Sichuan opera performances featuring the mesmerising art of face-changing (bianlian). The city also serves as a gateway to spectacular scenery, including the Leshan Giant Buddha and Mount Emei.'
    ],
    highlights: [
      'Giant Panda Research Base',
      'Sichuan hotpot experience',
      'Jinli Ancient Street',
      'Sichuan opera face-changing show',
      'Leshan Giant Buddha day trip',
      'Traditional teahouse culture'
    ],
    bestTimeToVisit: 'March to June or September to November to avoid summer heat and winter chill',
    metaTitle: 'Chengdu Travel Guide — CTS Tours',
    metaDescription: 'Visit Chengdu with CTS Tours — meet giant pandas, taste fiery Sichuan hotpot, and experience the relaxed teahouse culture of western China.'
  },
  {
    slug: 'guilin',
    name: 'Guilin',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/guilin-river-valley.jpg',
    description: 'Famous for its karst mountains and Li River scenery',
    culturalIntro: [
      'Guilin\'s landscape is the stuff of Chinese paintings come to life. The city and its surroundings are defined by dramatic karst peaks that rise like ancient sentinels from emerald-green rice paddies and winding rivers. A cruise along the Li River from Guilin to Yangshuo is widely regarded as one of the most beautiful river journeys in the world.',
      'Yangshuo, a charming town at the end of the Li River cruise, has become a destination in its own right. Surrounded by towering limestone peaks, it offers cycling through rural villages, bamboo rafting, and the spectacular Impression Liu Sanjie — a large-scale outdoor light show directed by Zhang Yimou, set against the natural backdrop of the Li River.',
      'The region is home to diverse ethnic minorities, including the Zhuang and Yao peoples, whose terraced rice fields at Longji (Dragon\'s Backbone) are among the most photographed landscapes in China. Guilin\'s cuisine features rice noodles as its staple — Guilin rice noodles are a beloved breakfast dish across all of southern China.'
    ],
    highlights: [
      'Li River cruise to Yangshuo',
      'Longji Rice Terraces',
      'Reed Flute Cave',
      'Yangshuo countryside cycling',
      'Impression Liu Sanjie show',
      'Guilin rice noodle tasting'
    ],
    bestTimeToVisit: 'April to October for the best river cruising conditions and green landscapes',
    metaTitle: 'Guilin Travel Guide — CTS Tours',
    metaDescription: 'Experience Guilin with CTS Tours — cruise the Li River, explore karst landscapes, visit Longji Rice Terraces, and discover rural China at its most beautiful.'
  },
  {
    slug: 'zhangjiajie',
    name: 'Zhangjiajie',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg',
    description: "Inspiration for Avatar's floating mountains",
    culturalIntro: [
      'Zhangjiajie National Forest Park, a UNESCO Global Geopark, is home to over 3,000 towering sandstone pillars that rise dramatically from lush subtropical forest. These otherworldly formations inspired the floating Hallelujah Mountains in James Cameron\'s film Avatar, and seeing them shrouded in morning mist is an unforgettable experience.',
      'The park offers some of China\'s most thrilling adventures. The Zhangjiajie Glass Bridge — the world\'s highest and longest glass-bottomed bridge — spans 430 metres across a deep canyon. The Bailong Elevator, built into the side of a massive cliff face, is the world\'s tallest outdoor lift, carrying visitors 326 metres to a stunning viewpoint above the pillar forests.',
      'Beyond the national park, the wider Zhangjiajie region is home to the Tujia and Miao ethnic minorities, whose colourful traditions, architecture, and festivals add cultural depth to the natural splendour. Tianmen Mountain, accessible by the world\'s longest cable car ride, features a natural arch known as Heaven\'s Gate and a glass skywalk along sheer cliff faces.'
    ],
    highlights: [
      'Avatar-inspired pillar forests',
      'Zhangjiajie Glass Bridge',
      'Bailong Elevator cliff lift',
      'Tianmen Mountain & Heaven\'s Gate',
      'Golden Whip Stream hiking',
      'Tujia ethnic minority culture'
    ],
    bestTimeToVisit: 'April to October, with spring and autumn offering the best visibility',
    metaTitle: 'Zhangjiajie Travel Guide — CTS Tours',
    metaDescription: 'Discover Zhangjiajie with CTS Tours — walk among Avatar\'s floating mountains, cross the Glass Bridge, and ride the world\'s tallest outdoor elevator.'
  },
  {
    slug: 'lhasa',
    name: 'Lhasa',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shangri-la-monastery-lake.jpg',
    description: 'Home to the Potala Palace and Tibetan culture',
    culturalIntro: [
      'Lhasa, the spiritual heart of Tibetan Buddhism, sits at 3,650 metres on the Tibetan Plateau — the highest city of its size in the world. Its name means "Place of the Gods", and the city\'s centrepiece is the magnificent Potala Palace, a 13-storey architectural marvel that served as the winter residence of the Dalai Lama for centuries.',
      'The Jokhang Temple, Tibet\'s most sacred Buddhist site, draws pilgrims from across the Tibetan world who prostrate themselves along the Barkhor Circuit — a devotional walking path that encircles the temple. The atmosphere of deep faith and devotion here is one of the most powerful cultural experiences in all of Asia.',
      'Lhasa offers a window into a unique civilisation shaped by the extremes of high-altitude life. Tibetan cuisine features hearty staples like tsampa (roasted barley flour), yak butter tea, and momo (Tibetan dumplings). The surrounding landscape of vast plains, sacred lakes, and snow-capped peaks provides a dramatic backdrop to this extraordinary city.'
    ],
    highlights: [
      'Potala Palace',
      'Jokhang Temple & Barkhor Circuit',
      'Sera Monastery monk debates',
      'Norbulingka summer palace',
      'Tibetan cuisine tasting',
      'High-altitude plateau landscapes'
    ],
    bestTimeToVisit: 'May to October for warmer temperatures and clearer skies',
    metaTitle: 'Lhasa Travel Guide — CTS Tours',
    metaDescription: 'Explore Lhasa with CTS Tours — visit the Potala Palace, experience Tibetan Buddhist culture, and discover the sacred temples of the Roof of the World.'
  },
  {
    slug: 'hangzhou',
    name: 'Hangzhou',
    heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/suzhou-canal.jpg',
    description: 'Famous for West Lake and traditional Chinese gardens',
    culturalIntro: [
      'Hangzhou has been celebrated as an earthly paradise for over a thousand years. Marco Polo declared it "the finest and most splendid city in the world" when he visited in the 13th century. At its heart lies West Lake, a UNESCO World Heritage Site whose misty waters, willow-lined causeways, and lakeside pagodas have inspired Chinese poets, painters, and philosophers for millennia.',
      'The city is the birthplace of Longjing (Dragon Well) tea, one of China\'s most prized green teas. The tea plantations in the hills surrounding West Lake offer visitors the chance to pick leaves, watch traditional roasting techniques, and taste tea in serene village settings. Hangzhou\'s food culture is equally refined — the city\'s signature dish, Dongpo Pork, is a slow-braised masterpiece named after the Song Dynasty poet Su Dongpo.',
      'Modern Hangzhou is also a tech powerhouse — home to Alibaba\'s headquarters — yet it has preserved its natural beauty and cultural heritage remarkably well. The Lingyin Temple, one of the largest Buddhist temples in China, sits among ancient trees and hillside grottoes. A boat ride on West Lake at sunset, with the distant hills silhouetted against the sky, remains one of China\'s most iconic experiences.'
    ],
    highlights: [
      'West Lake boat cruise',
      'Longjing tea village visit',
      'Lingyin Temple',
      'Six Harmonies Pagoda',
      'Hefang Street old quarter',
      'Dongpo Pork culinary experience'
    ],
    bestTimeToVisit: 'March to May (spring blossoms) or September to November (autumn colours)',
    metaTitle: 'Hangzhou Travel Guide — CTS Tours',
    metaDescription: 'Discover Hangzhou with CTS Tours — cruise West Lake, taste Dragon Well tea at its source, and explore one of China\'s most beautiful and historic cities.'
  }
];

export const getCityBySlug = (slug: string): City | undefined => {
  return cities.find(city => city.slug === slug);
};

export const getAllCities = (): City[] => {
  return cities;
};
