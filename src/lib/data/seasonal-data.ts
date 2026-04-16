export interface SeasonalData {
  month: number; // 1-12
  monthName: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  nationalClimate: string;
  avgTemp: { min: number; max: number; unit: 'C' };
  humidity: string;
  rainfallLevel: 'low' | 'medium' | 'high';
  priceLevel: 'low' | 'medium' | 'high'; // tourism price level
  crowding: 'light' | 'moderate' | 'peak';
  bestDestinations: Array<{
    slug: string;
    name: string;
    reason: string;
  }>;
  highlights: string[];
  festivals: string[];
  tips: string[];
  packing: string[];
}

export const seasonalCalendar: SeasonalData[] = [
  {
    month: 1,
    monthName: 'January',
    season: 'winter',
    nationalClimate: 'Cold across most regions. Heavy snow in north, mild in south.',
    avgTemp: { min: -8, max: 5, unit: 'C' },
    humidity: 'Low to moderate (50-70%)',
    rainfallLevel: 'low',
    priceLevel: 'low',
    crowding: 'light',
    bestDestinations: [
      {
        slug: 'harbin',
        name: 'Harbin',
        reason: 'Ice festival season. Frozen landscapes create otherworldly beauty. Best month for ice sculpture.'
      },
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Crisp winter air. Fewer tourists. Great for exploring Great Wall. Duty to experience Beijing winter.'
      },
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Mild winter (10-15°C). Perfect weather. Spring-like conditions. Escape the cold.'
      },
      {
        slug: 'shangri-la',
        name: 'Shangri-La',
        reason: 'Clear skies. Snow-capped mountains. Less rain. Trekking season begins.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Cool, dry weather. Comfortable walking conditions. Excellent for historical sightseeing.'
      }
    ],
    highlights: [
      'Harbin Ice Festival',
      'Snow-covered Great Wall',
      'Clear skies in mountain regions',
      'New Year celebrations',
      'Lowest tourism crowds'
    ],
    festivals: [
      'New Year (Jan 1)',
      'Harbin Ice Lantern Festival (Jan-Feb)',
      'Chinese New Year preparation'
    ],
    tips: [
      'Book accommodations early—winter travelers book ahead',
      'Dress heavily for north, light layers for south',
      'Many attractions have reduced hours',
      'Best deals on accommodations and flights'
    ],
    packing: [
      'Heavy winter coat',
      'Thermal underwear',
      'Waterproof boots',
      'Thick socks',
      'Warm hat, gloves, scarf',
      'Hand warmers'
    ]
  },

  {
    month: 2,
    monthName: 'February',
    season: 'winter',
    nationalClimate: 'Transitional month. North still cold, south warming.',
    avgTemp: { min: -5, max: 10, unit: 'C' },
    humidity: 'Low to moderate (50-65%)',
    rainfallLevel: 'low',
    priceLevel: 'medium',
    crowding: 'moderate',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Spring flowers begin blooming. Cherry blossoms and wildflowers. Ideal temperatures.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Mild weather (10-18°C). Clear visibility. Li River tours are pleasant.'
      },
      {
        slug: 'shanghai',
        name: 'Shanghai',
        reason: 'Cool but increasingly pleasant. Damp and gray sometimes. Spring breaks emerge.'
      },
      {
        slug: 'hangzhou',
        name: 'Hangzhou',
        reason: 'Warming season begins. Tea plantations prepare for spring harvest.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Clear mountain skies. Cable cars and hiking become more accessible. Lower crowds.'
      }
    ],
    highlights: [
      'Chinese New Year (Jan/Feb)',
      'Spring flower preview in Yunnan',
      'Clear mountain weather',
      'Emerging spring atmosphere',
      'Reasonable temperatures'
    ],
    festivals: [
      'Chinese New Year (lunar calendar)',
      'Spring Lantern Festival',
      'Temple fairs and celebrations'
    ],
    tips: [
      'Chinese New Year (2-3 week period): Accommodations triple in price, attractions packed',
      'Spring flower bloom begins in Yunnan',
      'Weather becoming more pleasant in south',
      'North still requires heavy coats'
    ],
    packing: [
      'Warm jacket',
      'Layers',
      'Comfortable walking shoes',
      'Light rain jacket (occasional drizzle)',
      'Sunglasses (mountain sun)',
      'Umbrella'
    ]
  },

  {
    month: 3,
    monthName: 'March',
    season: 'spring',
    nationalClimate: 'Spring arrives. Flowers bloom everywhere. North warming, pollen season.',
    avgTemp: { min: 5, max: 18, unit: 'C' },
    humidity: 'Moderate (55-70%)',
    rainfallLevel: 'medium',
    priceLevel: 'high',
    crowding: 'moderate',
    bestDestinations: [
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Cherry blossoms, spring colors. Mild temps perfect for walking. Peak spring beauty.'
      },
      {
        slug: 'yangshuo',
        name: 'Yangshuo',
        reason: 'Perfect weather (18-25°C). Rice fields flood for planting. Photography gold.'
      },
      {
        slug: 'hanzhou',
        name: 'Hangzhou',
        reason: 'Longjing tea harvest season begins. Spring flowers. Romantic West Lake.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Warm, dry spring weather. Pollen manageable. Historical sites perfect for walking.'
      },
      {
        slug: 'shanghai',
        name: 'Shanghai',
        reason: 'Spring arrives. Flowers bloom. Comfortable 15-20°C temperatures.'
      }
    ],
    highlights: [
      'Cherry blossom season (peak late March)',
      'Spring flower blooms nationwide',
      'Dragon Well tea harvest begins',
      'Rice planting season (dramatic landscapes)',
      'Ideal temperatures 15-25°C'
    ],
    festivals: [
      'Qingming Festival (early April)',
      'Spring temple fairs',
      'Cherry blossom festivals'
    ],
    tips: [
      'Peak season for northern attractions due to blossoms',
      'Prices rise 20-30%',
      'Pack for changeable weather—warm sun, cool mornings',
      'Tea plantations offer special spring harvest tours',
      'Photography conditions are excellent'
    ],
    packing: [
      'Light jacket',
      'Long-sleeve shirts',
      'Comfortable pants',
      'Good walking shoes',
      'Sunscreen',
      'Light rain jacket',
      'Hat (sun protection)'
    ]
  },

  {
    month: 4,
    monthName: 'April',
    season: 'spring',
    nationalClimate: 'Late spring. Warm, mostly dry. Flowers fade, foliage green.',
    avgTemp: { min: 12, max: 25, unit: 'C' },
    humidity: 'Moderate (60-75%)',
    rainfallLevel: 'medium',
    priceLevel: 'high',
    crowding: 'peak',
    bestDestinations: [
      {
        slug: 'yangshuo',
        name: 'Yangshuo',
        reason: 'Rice paddies fully planted. Water reflections create perfect mirror images. Peak beauty.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Perfect spring weather. Blossoms still visible. Ideal for historical tours.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Spring rains create misty landscapes. Perfect for photographer. 20-26°C.'
      },
      {
        slug: 'chengdu',
        name: 'Chengdu',
        reason: 'Late spring weather. Panda breeding season continues. Outdoor hot pot season.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Green mountains. Clear visibility. Cable cars fully operational. Peak season.'
      }
    ],
    highlights: [
      'Qingming Festival (tomb visiting)',
      'Late spring wildflowers',
      'Water reflections in rice paddies',
      'Full green foliage',
      'Comfortable 20-25°C nationwide'
    ],
    festivals: [
      'Qingming Festival (early April)',
      'April fools (Western)',
      'Local spring celebrations'
    ],
    tips: [
      'Peak season—prices highest, crowds largest',
      'Book accommodations 1-2 months in advance',
      'April 4-6 (Qingming): Many Chinese travel; expect 100%+ price increases',
      'Consider timing your visit before or after Qingming',
      'Weather perfect but very crowded'
    ],
    packing: [
      'Light clothing',
      'Sunscreen (SPF 50+)',
      'Hat',
      'Comfortable walking shoes',
      'Light rain jacket',
      'Insect repellent',
      'Water bottle'
    ]
  },

  {
    month: 5,
    monthName: 'May',
    season: 'spring',
    nationalClimate: 'Late spring transitioning to early summer. Warm, occasional rain.',
    avgTemp: { min: 18, max: 28, unit: 'C' },
    humidity: 'Moderate to high (65-80%)',
    rainfallLevel: 'medium',
    priceLevel: 'high',
    crowding: 'peak',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Dry season continues. Wildflowers peak. 20-28°C. Ideal conditions.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Spring rain creates gorgeous mist. Li River perfect. 23-28°C.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Dry season. Alpine flowers bloom. Clear mountain views. 15-25°C.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Full green vegetation. Waterfalls active. Misty mountain views. 20-26°C.'
      },
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Very hot beginning. Dust storms possible late May. 20-30°C.'
      }
    ],
    highlights: [
      'Late spring/early summer transition',
      'Wildflower peak in mountains',
      'Green landscapes throughout',
      'Waterfalls active from spring snowmelt',
      'Comfortable 20-28°C in most regions'
    ],
    festivals: [
      'Labor Day (May 1)',
      'Dragon Boat Festival preparation (lunar calendar)',
      'Spring university graduation season'
    ],
    tips: [
      'Labor Day holidays (May 1-3): Avoid; expect triple prices and massive crowds',
      'Perfect balance of price and crowd outside holidays',
      'Rainy season begins in some regions',
      'Bring rain jacket for afternoon showers',
      'Mountain routes fully operational'
    ],
    packing: [
      'Light, breathable clothing',
      'Lightweight rain jacket',
      'Quick-dry pants',
      'Hiking boots',
      'Hat and sunglasses',
      'Sunscreen',
      'Water bottle and electrolyte tablets'
    ]
  },

  {
    month: 6,
    monthName: 'June',
    season: 'summer',
    nationalClimate: 'Early summer. Hot and humid in most regions. Rainy season peaks.',
    avgTemp: { min: 22, max: 32, unit: 'C' },
    humidity: 'High (70-85%)',
    rainfallLevel: 'high',
    priceLevel: 'medium',
    crowding: 'moderate',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Dry season ending but still pleasant. 20-28°C. Summer rains begin late month.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Cool mountain elevation (2400m). 18-25°C. Escape the heat. Clear skies.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Mountain coolness. Misty from rain. 22-28°C. Lush green.'
      },
      {
        slug: 'harbin',
        name: 'Harbin',
        reason: 'Summer arrives. Cool compared to south. 20-26°C. Outdoor culture.'
      },
      {
        slug: 'chengdu',
        name: 'Chengdu',
        reason: 'Hot and humid. 25-33°C. Rain frequent. Panda watching still good.'
      }
    ],
    highlights: [
      'Dragon Boat Festival (lunar calendar, May/June)',
      'Summer season begins',
      'Rainy season peaks',
      'Mountain regions cool and pleasant',
      'Fewer tourists than spring/fall'
    ],
    festivals: [
      'Dragon Boat Festival',
      'College graduation season',
      'Summer vacation season begins'
    ],
    tips: [
      'Avoid lowlands (too hot and humid)',
      'Head to mountains for cool temperatures',
      'Pack for heavy rain—flooding possible in some regions',
      'Prices drop 20-30% compared to spring',
      'Shorter daylight hours for north (summer solstice around June 21)'
    ],
    packing: [
      'Lightweight, loose-fitting clothing',
      'Waterproof backpack cover',
      'Rain boots or waterproof shoes',
      'Quick-dry pants',
      'Light rain jacket',
      'Insect repellent (mosquitoes)',
      'Hat and sunglasses',
      'Extra underwear and socks (dampness)',
      'Anti-fungal powder'
    ]
  },

  {
    month: 7,
    monthName: 'July',
    season: 'summer',
    nationalClimate: 'Mid-summer. Hottest month for most regions. Rainy season active.',
    avgTemp: { min: 24, max: 35, unit: 'C' },
    humidity: 'Very high (75-90%)',
    rainfallLevel: 'high',
    priceLevel: 'low',
    crowding: 'light',
    bestDestinations: [
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Mountain elevation keeps temperature 18-26°C. Escape summer heat. Dry pockets.'
      },
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Rainy season but still pleasant. Mountains cool. 20-28°C in highlands.'
      },
      {
        slug: 'harbin',
        name: 'Harbin',
        reason: 'Coolest major city in China. 21-27°C. Summer culture vibrant. Music festivals.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Mountain coolness but very rainy. 22-28°C. Fewer tourists. Waterfalls active.'
      },
      {
        slug: 'chengdu',
        name: 'Chengdu',
        reason: 'Very hot and humid. 25-35°C. Rainy. Only good for panda breeding season.'
      }
    ],
    highlights: [
      'Summer peak season for mountains',
      'Waterfall season—spectacular water flows',
      'Coolest regions: Lijiang, Shangri-La',
      'Lowest tourism prices',
      'Summer vacation season for students'
    ],
    festivals: [
      'Summer music festivals (Harbin)',
      'Torch Festival (Lijiang, July 23-25)',
      'Summer university programs'
    ],
    tips: [
      'Best deals on accommodations this month',
      'Avoid lowlands—dangerously hot and humid',
      'Rainy season causes some road closures',
      'Book mountain attractions for cooling',
      'Consider extending travel—prices justify longer stay'
    ],
    packing: [
      'Minimal, lightweight clothing',
      'Waterproof bag for phone/valuables',
      'Rain boots',
      'Quick-dry everything',
      'Heavy-duty insect repellent',
      'Anti-fungal powder',
      'Hat for sun protection',
      'Sunscreen SPF 50+',
      'Water purification tablets'
    ]
  },

  {
    month: 8,
    monthName: 'August',
    season: 'summer',
    nationalClimate: 'Late summer. Still very hot in lowlands. Rainy season continuing.',
    avgTemp: { min: 23, max: 34, unit: 'C' },
    humidity: 'High (70-85%)',
    rainfallLevel: 'high',
    priceLevel: 'low',
    crowding: 'moderate',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Rainy season benefits landscape. 20-28°C. Fewer tourists, low prices.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Cool mountain temperatures 18-26°C. Escape summer heat. Dry areas within Yunnan.'
      },
      {
        slug: 'harbin',
        name: 'Harbin',
        reason: 'Cool summer continues. 21-27°C. Summer culture at peak. Music festivals.'
      },
      {
        slug: 'shangri-la',
        name: 'Shangri-La',
        reason: 'Alpine temperatures 15-24°C. Cool escape. Trekking season active.'
      },
      {
        slug: 'great-wall',
        name: 'Great Wall',
        reason: 'Too hot for hiking. 24-32°C. Afternoon thunderstorms frequent.'
      }
    ],
    highlights: [
      'Late summer temperatures still extreme in south',
      'Rainy season creates lush landscapes',
      'Mountain regions ideal',
      'Student summer vacation (crowds possible)',
      'Budget-friendly prices'
    ],
    festivals: [
      'Ghost Month (August, lunar calendar)',
      'Mid-Autumn Festival preparation',
      'Summer end festivals'
    ],
    tips: [
      'Mid-August: Back-to-school rush; shorter tourism window',
      'Stick to mountains for comfortable temps',
      'Weather becoming unpredictable—sudden rains',
      'Prices remain low, but some students traveling',
      'Best month for mountain hiking outside rainstorms'
    ],
    packing: [
      'Lightweight, breathable clothing',
      'Waterproof jacket and pants',
      'Hiking boots',
      'Sun protection (hat, sunglasses, SPF 50+)',
      'Heavy insect repellent',
      'Quick-dry clothing',
      'Anti-fungal powder',
      'Water purification'
    ]
  },

  {
    month: 9,
    monthName: 'September',
    season: 'autumn',
    nationalClimate: 'Early autumn. Rainy season ending. Cooling begins in north.',
    avgTemp: { min: 18, max: 28, unit: 'C' },
    humidity: 'Moderate to high (65-80%)',
    rainfallLevel: 'medium',
    priceLevel: 'medium',
    crowding: 'light',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Rainy season ends. Clear skies begin. 20-28°C. Ideal conditions return.'
      },
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Perfect autumn weather arrives. 15-25°C. Clear skies. Less dust.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Clear mountain skies. 15-25°C. Autumn colors begin. Perfect trekking.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Fall arrives. 18-26°C. Comfortable walking. Historical sites shine.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Rainy season ends. Clear rivers reflect mountains. 22-28°C.'
      }
    ],
    highlights: [
      'End of rainy season',
      'Clear skies return',
      'Comfortable 20-25°C throughout China',
      'Autumn colors begin appearing',
      'Mid-Autumn Festival (Sep/Oct, lunar calendar)'
    ],
    festivals: [
      'Mid-Autumn Festival (Sep 15, lunar calendar)',
      'Moon festivals',
      'Autumn celebrations'
    ],
    tips: [
      'Perfect balance: good weather, moderate prices, fewer crowds',
      'Mid-Autumn (Sep 15): Holiday week, prices/crowds increase 50%',
      'Otherwise excellent value',
      'Avoid around Mid-Autumn festival dates',
      'Autumn colors peak late Sept in mountains'
    ],
    packing: [
      'Light layers',
      'Light jacket',
      'Comfortable walking shoes',
      'Hat and sunglasses',
      'Sunscreen',
      'Light rain jacket (occasional showers)',
      'Water bottle'
    ]
  },

  {
    month: 10,
    monthName: 'October',
    season: 'autumn',
    nationalClimate: 'Mid-autumn. Cool in north, mild in south. Clear skies.',
    avgTemp: { min: 12, max: 23, unit: 'C' },
    humidity: 'Moderate (60-75%)',
    rainfallLevel: 'low',
    priceLevel: 'high',
    crowding: 'peak',
    bestDestinations: [
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Peak autumn colors. Crisp air. 12-22°C. Perfect for Great Wall hikes.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Clear mountain visibility. Autumn colors. 15-23°C. Excellent conditions.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Crisp autumn. Mountain colors. 10-22°C. Perfect trekking season.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Ideal autumn weather. 15-24°C. Clear skies. Historical sites perfect.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Crystal clear rivers. Autumn colors emerging. 18-26°C. Photography gold.'
      }
    ],
    highlights: [
      'Peak autumn colors nationwide',
      'Clearest skies of the year',
      'Perfect temperatures 15-25°C',
      'Golden October (early month less crowded)',
      'National Golden Week holidays (Oct 1-7)'
    ],
    festivals: [
      'National Day (October 1)',
      'Golden Week holidays (Oct 1-7)',
      'Chrysanthemum festivals'
    ],
    tips: [
      'Golden Week (Oct 1-7): Peak prices (50-100% higher), massive crowds everywhere',
      'Plan before Oct 1 or after Oct 7',
      'Best weather, worst timing for budget travelers',
      'Book accommodations 6-8 weeks in advance',
      'October 8+ excellent value and clear weather'
    ],
    packing: [
      'Light jacket or sweater',
      'Long pants',
      'Comfortable hiking shoes',
      'Hat and sunglasses',
      'Sunscreen',
      'Light rain jacket',
      'Scarf (cooler mornings/evenings)',
      'Camera (excellent photography conditions)'
    ]
  },

  {
    month: 11,
    monthName: 'November',
    season: 'autumn',
    nationalClimate: 'Late autumn. Cool in north, mild in south. Dry and clear.',
    avgTemp: { min: 8, max: 18, unit: 'C' },
    humidity: 'Low to moderate (50-70%)',
    rainfallLevel: 'low',
    priceLevel: 'medium',
    crowding: 'light',
    bestDestinations: [
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Autumn ending. Fewer tourists. 5-18°C. Clear skies. Winter approaching.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Perfect fall weather. 8-22°C. Autumn colors peak. Trekking ideal.'
      },
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Dry season returns. 15-25°C. Clear mountain skies. Excellent visibility.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Perfect weather. 15-23°C. Clear rivers. Autumn foliage. Photography time.'
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Late fall colors. Clear visibility. 12-22°C. Fewer crowds.'
      }
    ],
    highlights: [
      'Late autumn colors',
      'Clear, dry skies',
      'Comfortable 15-23°C',
      'Dry season returns in south',
      'Fewer tourists than October'
    ],
    festivals: [
      'Thanksgiving (Western, Nov 28)',
      'Autumn harvest celebrations',
      'Cultural festivals'
    ],
    tips: [
      'Excellent value month—good weather, low prices',
      'Before winter sets in for northern regions',
      'Ideal for photographers',
      'Fewer crowds than spring/fall peaks',
      'Daytime comfortable, nights cool'
    ],
    packing: [
      'Light sweater or fleece',
      'Long pants or jeans',
      'Closed-toe hiking shoes',
      'Hat and sunglasses',
      'Sunscreen',
      'Light jacket (evening cool)',
      'Scarf',
      'Dry bag for hiking'
    ]
  },

  {
    month: 12,
    monthName: 'December',
    season: 'winter',
    nationalClimate: 'Early winter. Cold in north, mild in south. Dry.',
    avgTemp: { min: 2, max: 12, unit: 'C' },
    humidity: 'Low (40-60%)',
    rainfallLevel: 'low',
    priceLevel: 'low',
    crowding: 'light',
    bestDestinations: [
      {
        slug: 'yunnan',
        name: 'Yunnan',
        reason: 'Dry season perfect. 15-25°C. Escape northern winter. Ideal conditions.'
      },
      {
        slug: 'lijiang',
        name: 'Lijiang',
        reason: 'Cool 5-20°C. Clear skies. Snow possible on mountains. Beautiful.'
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Cool 10-18°C. Clear visibility. River cruises less crowded.'
      },
      {
        slug: 'beijing',
        name: 'Beijing',
        reason: 'Freezing (-5 to 5°C). Possible snow. Winter aesthetic. Cold but beautiful.'
      },
      {
        slug: 'xian',
        name: 'Xi\'an',
        reason: 'Cold (0-10°C). Possible snow. Fewer tourists. Winter charm.'
      }
    ],
    highlights: [
      'Dry season peaks in Yunnan',
      'Winter snow possible in mountains',
      'Lowest tourism prices',
      'Perfect temperatures 15-25°C in Yunnan',
      'Christmas and New Year prep'
    ],
    festivals: [
      'Christmas (Dec 25)',
      'New Year\'s Eve (Dec 31)',
      'Winter solstice (Dongzhi Festival)',
      'New Year celebration prep'
    ],
    tips: [
      'Lowest prices of the year',
      'North requires heavy coats',
      'South (Yunnan) remains pleasant',
      'Year-end holidays (Dec 24-Jan 2): Prices increase before New Year',
      'Excellent for budget travelers avoiding holidays'
    ],
    packing: [
      'Heavy winter coat (north)',
      'Thermal underwear',
      'Waterproof boots',
      'Thick socks',
      'Warm hat, gloves, scarf',
      'Hand warmers (chemical)',
      'Light clothing for south',
      'Layers for temperature changes'
    ]
  }
];

export const getSeasonalDataByMonth = (month: number): SeasonalData | undefined => {
  return seasonalCalendar.find(data => data.month === month);
};

export const getSeasonalDataBySeason = (season: 'spring' | 'summer' | 'autumn' | 'winter'): SeasonalData[] => {
  return seasonalCalendar.filter(data => data.season === season);
};


export const getMonthRecommendation = (month: number): string => {
  const data = getSeasonalDataByMonth(month);
  return data?.season || '';
};
