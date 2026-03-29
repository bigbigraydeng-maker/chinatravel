# Tour Product Update Instructions

> This document provides complete specifications for updating 8 tour products in `src/lib/data/tours.ts`.
> Each section contains the exact data to replace. Update the corresponding tour object in the `tours` array.

---

## Overview: Tour ID Mapping

| Docx Source | Current Slug | Tour ID | Tier | Action |
|---|---|---|---|---|
| Natural China-16D | `landscapes` | `tour-cn-sig-5` | signature | Update name, duration, price, itinerary, details |
| Legacy of China-17D | `imperial-heritage` | `tour-cn-sig-2` | signature | Update name, duration, price, itinerary, details |
| Silk Road Discovery | `silk-road` | `tour-cn-sig-1` | signature | Update price, itinerary, accommodation, details |
| China Panorama-27D | `grand-tour` | `tour-cn-sig-3` | signature | Update price, itinerary, details |
| Best of China | `essentials` | `tour-cn-dis-3` | discovery | Update name, duration, price, itinerary, details |
| Colorful Yunnan | `yunnan-explorer` | `tour-cn-dis-7` | discovery | Update name, duration, price, itinerary, details |
| Shanghai & Surroundings | `shanghai-beyond` | `tour-cn-dis-4` | discovery | Update name, duration, price, itinerary, details |
| A Tale of Two Cities | `beijing-shanghai` | `tour-cn-dis-2` | discovery | Update name, duration, price, itinerary, details |

---

## IMPORTANT: Data Structure Reference

Each tour object in `tours.ts` follows this interface:

```typescript
{
  id: string,
  slug: string,           // Keep existing slug unchanged for URL stability
  destination: 'china',
  tier: 'signature' | 'discovery',
  name: string,           // Format: "China {Tier} — {Name}"
  title: string,          // Same as name
  shortDescription: string,
  duration: string,       // e.g., "16 Days"
  price: string,          // e.g., "From NZD $7,670"
  heroImage: string,      // Keep existing
  gallery: string[],      // Keep existing
  highlights: string[],
  itinerary: DayItinerary[],
  inclusions: string[],
  exclusions: string[],
  metaTitle: string,
  metaDescription: string,
  isActive: boolean,      // true
  createdAt: string,      // Keep existing
  updatedAt: string       // Set to '2026-03-29'
}
```

---

## Tour 1: Natural China (Signature — Landscapes)

**File:** `src/lib/data/tours.ts`
**Tour ID:** `tour-cn-sig-5`
**Slug:** `landscapes` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Signature — Natural China',
title: 'China Signature — Natural China',
shortDescription: 'Discover China\'s most breathtaking natural landscapes across 16 days — from Shanghai\'s urban charm to the karst peaks of Guilin, the pandas of Chengdu, the ancient riverside beauty of Fenghuang, and the dramatic \"Avatar\" mountains of Zhangjiajie.',
duration: '16 Days',
price: 'From NZD $7,670',
```

### Highlights:

```typescript
highlights: [
  'Cruise the Li River through stunning karst landscapes',
  'Visit the Chengdu Giant Panda Breeding Research Base',
  'Explore the Leshan Giant Buddha, the world\'s largest stone Buddha',
  'Discover the enchanting night views of Fenghuang Ancient Town',
  'Walk the Glass Skywalk at Tianmen Mountain',
  'See the \"Hallelujah Mountains\" in Zhangjiajie National Forest Park',
  'Cross the famous Zhangjiajie Glass Bridge',
  'Stroll through charming Zhujiajiao Water Town',
  'Enjoy a Huangpu River night cruise in Shanghai',
  'Experience West Street in Yangshuo'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Shanghai (Overnight Flight)',
    description: 'Depart from Auckland on an evening flight to Shanghai. Overnight on board.',
    meals: []
  },
  {
    day: 2,
    title: 'Arrival in Shanghai',
    description: 'Upon arrival in Shanghai, meet your guide and begin your city tour. Visit the historic Yuyuan Garden and Chenghuang Temple, stroll along Nanjing Road, continue to the iconic Bund for stunning skyline views, then explore the trendy districts of Xintiandi and Tianzifang, known for their Shikumen-style architecture.',
    meals: ['Lunch'],
    accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star'
  },
  {
    day: 3,
    title: 'Shanghai',
    description: 'Visit the peaceful Jade Buddha Temple. Continue to the Oriental Pearl TV Tower for panoramic city views, followed by the Shanghai Museum (East Hall), showcasing rich cultural relics. In the evening, enjoy a relaxing Huangpu River night cruise offering spectacular views of illuminated Shanghai.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star'
  },
  {
    day: 4,
    title: 'Shanghai — Guilin',
    description: 'Transfer to the airport for your morning flight to Guilin. Upon arrival, visit Elephant Trunk Hill, the iconic landmark of Guilin.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star'
  },
  {
    day: 5,
    title: 'Guilin — Yangshuo',
    description: 'Transfer to Zhujiang Pier to board a deluxe 4-star cruise along the Li River to Yangshuo with your guide. Enjoy the breathtaking karst landscapes along the way. Upon arrival, explore the lively West Street.',
    meals: ['Breakfast', 'Lunch (Buffet onboard)'],
    accommodation: 'Licheng Yitian West Street Hotel Yangshuo or similar 4.5-star'
  },
  {
    day: 6,
    title: 'Yangshuo — Guilin',
    description: 'Enjoy a free morning at leisure. In the afternoon, return to Guilin and visit Reed Flute Cave, known for its impressive stalactites and stalagmites, followed by Jingjiang Prince\'s City.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star'
  },
  {
    day: 7,
    title: 'Guilin — Chengdu',
    description: 'Transfer to the railway station for a high-speed train from Guilin West to Chengdu East (Train D1804, 10:39–17:09, First Class seat, or similar). Upon arrival, your guide will meet you and transfer you to the hotel.',
    meals: ['Breakfast'],
    accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star'
  },
  {
    day: 8,
    title: 'Chengdu',
    description: 'Visit the Chengdu Research Base of Giant Panda Breeding to see China\'s beloved pandas. Experience local life at People\'s Park with a traditional tea break. Continue to explore Taikoo Li and the historic Kuanzhai Alley.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star'
  },
  {
    day: 9,
    title: 'Chengdu — Leshan',
    description: 'Full-day excursion to the Leshan Giant Buddha, the world\'s largest stone Buddha statue. On the way back, visit Huanglongxi Ancient Town, known for its well-preserved traditional architecture.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star'
  },
  {
    day: 10,
    title: 'Chengdu — Fenghuang Ancient Town',
    description: 'High-speed train from Chengdu East to Huaihua South (Train G2187, 10:10–15:06, First Class seat, or similar). Upon arrival, transfer to Fenghuang Ancient Town. In the evening, enjoy the enchanting night views of this historic riverside town.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Kaisheng International Hotel or similar 5-star'
  },
  {
    day: 11,
    title: 'Fenghuang — Zhangjiajie',
    description: 'Explore Fenghuang Ancient Town, famous for its traditional wooden houses and rich ethnic culture. After lunch, visit Furong Town, a picturesque village built around a waterfall, before continuing to Zhangjiajie.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Wyndham Garden Zhangjiajie or similar 5-star'
  },
  {
    day: 12,
    title: 'Zhangjiajie — Wulingyuan',
    description: 'Visit Tianmen Mountain National Forest Park, including cable car rides, eco-bus, escalator to Tianmen Cave, Glass Skywalk (with shoe covers), and the thrilling Guigu Plank Road. Visit the Tujia Folk Custom Park before heading to Wulingyuan.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Wyndham Hotel Wulingyuan (Ruijing Manshan) or similar 5-star'
  },
  {
    day: 13,
    title: 'Wulingyuan',
    description: 'Explore Zhangjiajie National Forest Park. Take the Bailong Elevator up and descend by Tianzi Mountain cable car. Visit Yuanjiajie, known for the "Hallelujah Mountains," West Sea scenic area, and enjoy a ride on the mini train through Ten-Mile Gallery.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Wyndham Hotel Wulingyuan (Ruijing Manshan) or similar 5-star'
  },
  {
    day: 14,
    title: 'Wulingyuan — Shanghai',
    description: 'Visit Golden Whip Stream, a scenic walking trail through the forest. Continue to Zhangjiajie Grand Canyon and experience the famous Glass Bridge. Transfer to the airport for your evening flight to Shanghai (FM9344, 20:35–22:40 or similar).',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star'
  },
  {
    day: 15,
    title: 'Shanghai — Zhujiajiao — Departure',
    description: 'Day trip to Zhujiajiao Water Town, the "Venice of Shanghai," with its charming canals and ancient bridges. Return to Shanghai and transfer to Pudong International Airport after dinner.',
    meals: ['Breakfast']
  },
  {
    day: 16,
    title: 'Shanghai — Auckland',
    description: 'Departure from Shanghai, arrive Auckland.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '4–5 star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transport including high-speed trains (First Class)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Signature — Natural China | 16 Days | CTS Tours',
metaDescription: 'Discover China\'s most breathtaking natural landscapes — Li River, Zhangjiajie, Giant Pandas, Fenghuang Ancient Town. 16-day premium tour from NZD $7,670. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement (add as comment):
```typescript
// Single room supplement: NZD $1,215
```

---

## Tour 2: Legacy of China (Signature — Imperial Heritage)

**Tour ID:** `tour-cn-sig-2`
**Slug:** `imperial-heritage` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Signature — Legacy of China',
title: 'China Signature — Legacy of China',
shortDescription: 'A 17-day journey through China\'s greatest imperial and cultural treasures — from Beijing\'s Forbidden City and the Great Wall to the Potala Palace in Lhasa, a Yangtze River Three Gorges cruise, and the dazzling skyline of Shanghai.',
duration: '17 Days',
price: 'From NZD $9,999',
```

### Highlights:

```typescript
highlights: [
  'Explore the Forbidden City and Tiananmen Square in Beijing',
  'Walk the Mutianyu section of the Great Wall',
  'Discover the Terracotta Warriors in Xi\'an',
  'Visit the sacred Potala Palace in Lhasa',
  'Witness monk debating at Sera Monastery',
  'Cruise through the Yangtze River Three Gorges',
  'Meet giant pandas at Chengdu breeding base',
  'Enjoy a Peking Duck banquet and Tang Dynasty show',
  'Experience a Tibetan cultural dinner with performances',
  'Stroll along the Bund and cruise the Huangpu River in Shanghai'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Beijing',
    description: 'Take a China Eastern Airlines flight to Beijing, the capital of China.',
    meals: []
  },
  {
    day: 2,
    title: 'Arrival in Beijing',
    description: 'Upon arrival, depending on your flight time, enjoy some free time at leisure to begin experiencing the local culture.',
    meals: [],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 3,
    title: 'Beijing',
    description: 'Visit the Temple of Heaven and join locals practicing Tai Chi. Explore Tiananmen Square and the magnificent Forbidden City. In the evening, enjoy a traditional Peking Duck banquet followed by a Chinese acrobatic performance. Note: If Forbidden City tickets are unavailable, the visit will be replaced with Jingshan Park and Prince Gong\'s Mansion.',
    meals: ['Breakfast', 'Dinner (Peking Duck Banquet)'],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 4,
    title: 'Beijing',
    description: 'Visit the Mutianyu Great Wall and enjoy breathtaking views. Visit a jade factory to learn about traditional craftsmanship. In the afternoon, explore the Summer Palace, strolling through beautiful classical Chinese gardens.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 5,
    title: 'Beijing — Xi\'an',
    description: 'High-speed train from Beijing West to Xi\'an North (Train G55, 09:55–14:05, First Class seat or similar). Explore the lively Muslim Quarter. In the evening, enjoy a traditional dumpling banquet with a Tang Dynasty dance performance.',
    meals: ['Breakfast', 'Dinner (Dumpling Banquet)'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 6,
    title: 'Xi\'an',
    description: 'Visit the world-famous Terracotta Warriors of Emperor Qin Shi Huang. Visit a ceramics and lacquerware workshop. Walk along the well-preserved 14th-century Ancient City Wall with panoramic views of Xi\'an\'s old city.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 7,
    title: 'Xi\'an — Lhasa',
    description: 'Take a flight from Xi\'an to Lhasa. Enjoy free time to acclimatise to the high-altitude environment.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'InterContinental Lhasa Paradise or similar 5-star'
  },
  {
    day: 8,
    title: 'Lhasa',
    description: 'Visit the sacred Jokhang Temple, an important spiritual centre of Tibetan Buddhism. Stroll along Barkhor Street. In the afternoon, visit Sera Monastery and witness the unique monk debating sessions.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'InterContinental Lhasa Paradise or similar 5-star'
  },
  {
    day: 9,
    title: 'Lhasa',
    description: 'Visit the magnificent Potala Palace, a symbol of Tibet. Explore Norbulingka, the former summer palace of the Dalai Lama. Visit a Tibetan handicraft workshop. In the evening, enjoy a Tibetan-style dinner with traditional singing and dancing performances.',
    meals: ['Breakfast', 'Dinner (Tibetan Cultural Show)'],
    accommodation: 'InterContinental Lhasa Paradise or similar 5-star'
  },
  {
    day: 10,
    title: 'Lhasa — Chengdu',
    description: 'Fly from Lhasa to Chengdu. In the evening, enjoy an authentic Sichuan cuisine dinner.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star'
  },
  {
    day: 11,
    title: 'Chengdu — Chongqing (Yangtze Cruise)',
    description: 'Visit the Chengdu Research Base of Giant Panda Breeding. Travel to Chongqing by high-speed train (First Class seat). Board your Yangtze River cruise to begin the Three Gorges journey.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — International 5-star cruise'
  },
  {
    day: 12,
    title: 'Yangtze River Cruise',
    description: 'Enjoy spectacular scenery of the Yangtze River Three Gorges. Participate in shore excursions to Shennü Stream or Shennong Stream.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise'
  },
  {
    day: 13,
    title: 'Yangtze River Cruise',
    description: 'Continue cruising through the Three Gorges, taking in the breathtaking natural landscapes along the river.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise'
  },
  {
    day: 14,
    title: 'Three Gorges Dam — Yichang — Shanghai',
    description: 'Visit the impressive Three Gorges Dam, the world\'s largest hydropower project. Transfer to Yichang and take an evening flight to Shanghai.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star'
  },
  {
    day: 15,
    title: 'Shanghai',
    description: 'Visit Yuyuan Garden and admire its classical beauty. Visit a silk factory. Stroll along the Bund. In the evening, enjoy a Huangpu River cruise and a Shanghai-style dinner.',
    meals: ['Breakfast', 'Dinner (Shanghai Local Cuisine)'],
    accommodation: 'HUALUXE Shanghai Changfeng Park or similar 5-star'
  },
  {
    day: 16,
    title: 'Shanghai — Departure',
    description: 'Enjoy free time at leisure before transferring to the airport for your return flight to New Zealand.',
    meals: ['Breakfast']
  },
  {
    day: 17,
    title: 'Arrive Auckland',
    description: 'Arrive in New Zealand. Tour concludes.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '5-star hotel accommodation',
  'Victoria Yangtze River Cruise (International 5-star)',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transport including high-speed trains (First Class)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Signature — Legacy of China | 17 Days | CTS Tours',
metaDescription: 'Experience China\'s imperial legacy — Forbidden City, Great Wall, Terracotta Warriors, Potala Palace, Yangtze cruise, and Shanghai. 17 days from NZD $9,999. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $2,410

---

## Tour 3: Silk Road Discovery (Signature — Silk Road)

**Tour ID:** `tour-cn-sig-1`
**Slug:** `silk-road` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Signature — Silk Road Discovery',
title: 'China Signature — Silk Road Discovery',
shortDescription: 'Journey along China\'s ancient Silk Road from Urumqi to Xi\'an across 17 days — exploring Heavenly Lake, the Flaming Mountains, Mogao Caves, colourful Danxia mountains, Bingling Temple grottoes, and the Terracotta Warriors.',
duration: '17 Days',
price: 'From NZD $6,699',
```

### Highlights:

```typescript
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
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'New Zealand — Beijing',
    description: 'Depart from New Zealand on your international flight to Beijing. Overnight on board.',
    meals: []
  },
  {
    day: 2,
    title: 'Beijing — Urumqi',
    description: 'Take a domestic flight to Urumqi, the capital of Xinjiang, and begin your Silk Road journey.',
    meals: [],
    accommodation: 'Urumqi Universal International Grand Hotel or similar 5-star'
  },
  {
    day: 3,
    title: 'Urumqi — Heavenly Lake',
    description: 'Visit the stunning Heavenly Lake of Tianshan Mountains, a picturesque alpine lake surrounded by dramatic peaks. Enjoy the tranquil natural scenery and fresh mountain air.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Urumqi Universal International Grand Hotel or similar 5-star'
  },
  {
    day: 4,
    title: 'Urumqi — Turpan',
    description: 'Travel to Turpan and visit Emin Minaret, the ancient Jiaohe Ruins, and the Karez Irrigation System, gaining insight into the region\'s history and traditional water engineering.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Turpan Huozhou Hotel or similar 4-star'
  },
  {
    day: 5,
    title: 'Turpan',
    description: 'Visit the Flaming Mountains, famous for their intense heat and dramatic red landscape. Continue to the Bezeklik Thousand Buddha Caves to admire ancient Buddhist murals.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Turpan Huozhou Hotel or similar 4-star'
  },
  {
    day: 6,
    title: 'Turpan — Dunhuang',
    description: 'Transfer to Turpan North Railway Station and take a high-speed train to Liuyuan (Train D2708, 09:15–12:43, First Class seat or similar). Drive to Dunhuang (approx. 2 hours), enjoying the vast western landscapes.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Tianhe Hotel (Building 2 & 3) or similar 5-star'
  },
  {
    day: 7,
    title: 'Dunhuang',
    description: 'Visit the world-famous Mogao Caves, renowned for their exquisite Buddhist murals and statues. Continue to Mingsha Mountain and Crescent Spring, where you can experience the unique beauty of a desert oasis.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Tianhe Hotel (Building 2 & 3) or similar 5-star'
  },
  {
    day: 8,
    title: 'Dunhuang — Jiayuguan',
    description: 'Travel to Jiayuguan and visit the Hanging Great Wall and Jiayuguan Fortress, the western end of the Ming Dynasty Great Wall, showcasing its grandeur and strategic importance.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Mingzhu Hotel or similar 5-star'
  },
  {
    day: 9,
    title: 'Jiayuguan — Zhangye',
    description: 'Drive to Zhangye and visit the Zhangye Danxia National Geological Park, famous for its colourful layered rock formations.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Zhangye Hotel or similar 5-star'
  },
  {
    day: 10,
    title: 'Zhangye — Wuwei',
    description: 'Travel to Wuwei and visit Leitai Han Tomb and the Confucius Temple, learning about the region\'s rich history and culture.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Jinling Hotel or similar 5-star'
  },
  {
    day: 11,
    title: 'Wuwei — Lanzhou',
    description: 'Travel to Lanzhou and visit the Yellow River Scenic Area, enjoying views of China\'s "Mother River."',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Wyndham Garden Lanzhou or similar 5-star'
  },
  {
    day: 12,
    title: 'Lanzhou — Bingling Temple',
    description: 'Take a boat trip to the Bingling Temple Grottoes, where you will admire over 1,700 years of Buddhist art carved into the cliffs. Return to Lanzhou afterwards.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Wyndham Garden Lanzhou or similar 5-star'
  },
  {
    day: 13,
    title: 'Lanzhou — Xi\'an',
    description: 'Take a high-speed train from Lanzhou West to Xi\'an North (Train D2658, 09:19–12:30, First Class seat or similar). Transfer to your hotel and rest.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 14,
    title: 'Xi\'an',
    description: 'Visit the Terracotta Warriors of Emperor Qin Shi Huang and marvel at this incredible ancient army. Continue to the Big Wild Goose Pagoda to learn about Buddhist culture and history.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 15,
    title: 'Xi\'an — Free Day',
    description: 'Enjoy a free day at leisure to explore Xi\'an at your own pace — sample local cuisine, go shopping, or join optional activities.',
    meals: ['Breakfast'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 16,
    title: 'Xi\'an — Beijing',
    description: 'Take a domestic flight to Beijing.',
    meals: ['Breakfast']
  },
  {
    day: 17,
    title: 'Beijing — New Zealand',
    description: 'Take your international flight back to New Zealand, concluding your memorable Silk Road journey.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from New Zealand',
  'Domestic airfares within China',
  '4–5 star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transport including high-speed trains (First Class)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Signature — Silk Road Discovery | 17 Days | CTS Tours',
metaDescription: 'Journey along China\'s ancient Silk Road — Heavenly Lake, Mogao Caves, Danxia Mountains, Terracotta Warriors. 17 days from NZD $6,699. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $1,435

---

## Tour 4: China Panorama (Signature — Grand Tour)

**Tour ID:** `tour-cn-sig-3`
**Slug:** `grand-tour` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Signature — China Panorama',
title: 'China Signature — China Panorama',
shortDescription: 'The ultimate 27-day China experience — from the Great Wall and Forbidden City to a Yangtze River cruise, giant pandas in Chengdu, the Li River in Guilin, classical gardens of Suzhou, West Lake in Hangzhou, and vibrant Shanghai.',
duration: '27 Days',
price: 'From NZD $10,899',
```

### Highlights:

```typescript
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
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Departure',
    description: 'Depart from Auckland on your international flight to China. Overnight on board.',
    meals: []
  },
  {
    day: 2,
    title: 'Arrival in Beijing',
    description: 'Arrive in Beijing. Depending on your arrival time, enjoy some free time at leisure.',
    meals: [],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 3,
    title: 'Beijing',
    description: 'Visit Tiananmen Square and explore the magnificent Forbidden City. Continue to the Hutongs for a local family visit, learn to make dumplings and enjoy them. Note: If Forbidden City tickets are unavailable, visit Jingshan Park and Prince Gong\'s Mansion instead.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 4,
    title: 'Beijing',
    description: 'Visit the Juyongguan Great Wall and take in spectacular scenery. In the afternoon, stroll through the Summer Palace. In the evening, enjoy a traditional Peking Duck dinner.',
    meals: ['Breakfast', 'Dinner (Peking Duck)'],
    accommodation: 'Beijing Qianyuan Hotel or similar 5-star'
  },
  {
    day: 5,
    title: 'Beijing — Xi\'an',
    description: 'Visit the Temple of Heaven and experience Tai Chi activities with locals. High-speed train from Beijing West to Xi\'an (Train G657, 11:41–16:59, First Class seat or similar). In the evening, enjoy a traditional dumpling banquet.',
    meals: ['Breakfast', 'Dinner (Dumpling Banquet)'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 6,
    title: 'Xi\'an',
    description: 'Visit the Small Wild Goose Pagoda, stroll through the Muslim Quarter. Walk along the well-preserved 14th-century Ancient City Wall with panoramic views of Xi\'an\'s old town.',
    meals: ['Breakfast'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 7,
    title: 'Xi\'an',
    description: 'Visit the world-famous Terracotta Warriors Museum including bronze chariots and internal shuttle. Note: Guests are advised to bring snacks.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Crowne Plaza Xi\'an Weiyang (Guangcheng) or similar 5-star'
  },
  {
    day: 8,
    title: 'Xi\'an — Yangtze River Cruise',
    description: 'Flight to Yichang. Board your Yangtze River cruise to begin the Three Gorges journey.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise (Victoria Jenna or Victoria Katarina) — International 5-star cruise'
  },
  {
    day: 9,
    title: 'Yangtze River Cruise',
    description: 'Enjoy the spectacular scenery of the Yangtze River Three Gorges. Participate in shore excursions.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise'
  },
  {
    day: 10,
    title: 'Yangtze River Cruise',
    description: 'Continue cruising. Shore excursion to Shennü Stream or Shennong Stream.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise'
  },
  {
    day: 11,
    title: 'Yangtze River Cruise',
    description: 'Final day of the Three Gorges cruise, immersing yourself in the breathtaking natural landscapes.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Victoria Yangtze River Cruise — International 5-star cruise'
  },
  {
    day: 12,
    title: 'Chongqing — Chengdu',
    description: 'Disembark in Chongqing and visit Ciqikou Ancient Town. High-speed train from Shapingba to Chengdu East (Train G8648, 14:35–16:14, First Class seat or similar). Enjoy a Sichuan cuisine dinner with optional face-changing show.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Holiday Inn Chengdu Oriental Plaza or similar 5-star'
  },
  {
    day: 13,
    title: 'Chengdu — Dali',
    description: 'Visit the Chengdu Giant Panda Breeding Base. Enjoy leisure time at People\'s Park, Kuanzhai Alley, and Taikoo Li. Evening flight to Dali (Flight 8L9635, 22:30–23:55 or similar).',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Dali Wucaiyun Hotel or similar 5-star'
  },
  {
    day: 14,
    title: 'Dali — Kunming',
    description: 'Visit Xizhou Village, explore the local market, and tour the Yan Family Courtyard. Continue to Kunming.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Crowne Plaza Kunming City Centre or similar 5-star'
  },
  {
    day: 15,
    title: 'Kunming',
    description: 'Enjoy a cruise on Erhai Lake, explore Dali Ancient Town, and visit the Three Pagodas. Travel to Kunming.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Crowne Plaza Kunming City Centre or similar 5-star'
  },
  {
    day: 16,
    title: 'Kunming',
    description: 'Visit the famous Stone Forest and admire its unique karst landscape. In the evening, enjoy the local specialty — Crossing-the-Bridge Noodles.',
    meals: ['Breakfast', 'Dinner (Crossing-the-Bridge Noodles)'],
    accommodation: 'Crowne Plaza Kunming City Centre or similar 5-star'
  },
  {
    day: 17,
    title: 'Kunming — Guilin',
    description: 'Take a high-speed train to the picturesque city of Guilin.',
    meals: ['Breakfast'],
    accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star'
  },
  {
    day: 18,
    title: 'Guilin — Yangshuo',
    description: 'Cruise along the Li River to Yangshuo, enjoying the breathtaking karst scenery along the way.',
    meals: ['Breakfast', 'Lunch (Buffet onboard)'],
    accommodation: 'Licheng Yitian West Street Hotel Yangshuo or similar 4.5-star'
  },
  {
    day: 19,
    title: 'Yangshuo',
    description: 'Start the day with a Tai Chi session, followed by countryside exploration including traditional cormorant fishing scenes. Free time in the afternoon. Optional: Impression Liu Sanjie Show (approx. RMB 300 per person, VIP seating).',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Licheng Yitian West Street Hotel Yangshuo or similar 4.5-star'
  },
  {
    day: 20,
    title: 'Yangshuo — Guilin',
    description: 'Return to Guilin and visit Elephant Trunk Hill, Reed Flute Cave, and the Sun and Moon Twin Towers.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Lijiang Waterfall Hotel Guilin or similar 5-star'
  },
  {
    day: 21,
    title: 'Guilin — Hangzhou',
    description: 'Flight to Hangzhou (Flight SC4768, 13:10–15:15 or similar). Enjoy a scenic cruise on West Lake and visit West Lake Tiandi.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Radisson Blu Hangzhou Jiukamali Hotel or similar 5-star'
  },
  {
    day: 22,
    title: 'Hangzhou — Suzhou',
    description: 'Visit Lingyin Temple and Meijiawu Tea Plantation. Continue to Xinshi Ancient Town, where you can dress in traditional Hanfu. Enjoy a hot pot ice cream afternoon tea, then travel to Suzhou.',
    meals: ['Breakfast', 'Afternoon Tea', 'Dinner'],
    accommodation: 'DoubleTree by Hilton Suzhou Wujiang or similar 5-star'
  },
  {
    day: 23,
    title: 'Suzhou',
    description: 'Visit the Humble Administrator\'s Garden and admire its refined classical design. Enjoy a boat cruise along the Grand Canal. Note: If Humble Administrator\'s Garden is unavailable, Lingering Garden will be substituted.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'DoubleTree by Hilton Suzhou Wujiang or similar 5-star'
  },
  {
    day: 24,
    title: 'Suzhou — Shanghai',
    description: 'Travel to Shanghai and visit People\'s Square and the Shanghai Museum. Enjoy a Huangpu River cruise to admire the city skyline.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Wyndham Garden Shanghai Pudong or similar 5-star'
  },
  {
    day: 25,
    title: 'Shanghai',
    description: 'Visit Yuyuan Garden, stroll along the Bund, visit a silk factory. In the evening, enjoy the spectacular ERA Acrobatic Show.',
    meals: ['Breakfast'],
    accommodation: 'Wyndham Garden Shanghai Pudong or similar 5-star'
  },
  {
    day: 26,
    title: 'Shanghai — Auckland',
    description: 'Take your return flight to New Zealand.',
    meals: ['Breakfast']
  },
  {
    day: 27,
    title: 'Arrive Auckland',
    description: 'Flight arrives in Auckland in the afternoon. Tour concludes.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '5-star hotel accommodation',
  'Victoria Yangtze River Cruise (International 5-star)',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transport including high-speed trains (First Class)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Signature — China Panorama | 27 Days | CTS Tours',
metaDescription: 'The ultimate 27-day China experience — Great Wall, Terracotta Warriors, Yangtze cruise, pandas, Guilin, Suzhou, Hangzhou, Shanghai. From NZD $10,899. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $2,555

---

## Tour 5: Best of China (Discovery — Essentials)

**Tour ID:** `tour-cn-dis-3`
**Slug:** `essentials` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Discovery — Best of China',
title: 'China Discovery — Best of China',
shortDescription: 'A 15-day journey covering China\'s must-see highlights — the Great Wall, Forbidden City, Terracotta Warriors in Beijing and Xi\'an, then Puyuan Ancient Town, West Lake in Hangzhou, and modern Shanghai.',
duration: '15 Days',
price: 'From NZD $4,539',
```

### Highlights:

```typescript
highlights: [
  'Explore Tiananmen Square and the Forbidden City',
  'Walk the Great Wall of China',
  'Experience traditional Hutong life by pedicab',
  'Discover the 2,000-year-old Terracotta Warriors',
  'Visit the Small Wild Goose Pagoda Museum',
  'Stroll through Puyuan Fashion Ancient Town',
  'Cruise West Lake in Hangzhou',
  'Taste famous Longjing tea at Meijiawu Plantation',
  'Tour Yuyuan Garden and the Bund in Shanghai',
  'Visit the G20 Summit venue in Hangzhou'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Beijing',
    description: 'Flight to Beijing from Auckland in the evening.',
    meals: []
  },
  {
    day: 2,
    title: 'Beijing',
    description: 'Upon arrival, transfer to visit Temple of Heaven, the 500-year-old temple housing altars for sacrifices and offerings in a glorious setting of gardens, trees and sculptures.',
    meals: [],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 3,
    title: 'Beijing',
    description: 'Tour Tiananmen Square, the biggest public square in the world. Photo stop at the National Centre for the Performing Arts ("The Egg"). Visit Forbidden City and Beihai Park. Stop at a silk factory. Optional evening: acrobatic show. Note: If Forbidden City tickets are unavailable, visit Jingshan Park and Prince Gong\'s Mansion instead.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 4,
    title: 'Beijing',
    description: 'Morning tour to the Great Wall. Stopover at a jade carving factory. Return to the city, view the Olympic Park\'s Bird\'s Nest and Water Cube from outside.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 5,
    title: 'Beijing',
    description: 'Enjoy a pedicab tour of the Hutongs — the "old city" neighbourhoods of narrow alleyways and courtyard gardens, with a local family visit. Afternoon tour to the Silk Market.',
    meals: ['Breakfast'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 6,
    title: 'Beijing — Xi\'an',
    description: 'Morning free time. Train G89 15:00–19:12 to Xi\'an (or similar, 2nd-class seat). Local guide will meet you at arrival.',
    meals: ['Breakfast'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 7,
    title: 'Xi\'an',
    description: 'Visit the 2,000-year-old Terracotta Warriors including Circle Vision Movie and Bronze Chariot. Optional evening: Tang Palace Banquet Song and Dance Performance.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 8,
    title: 'Xi\'an',
    description: 'Visit the Old City Wall and Big Wild Goose Pagoda, the earliest and largest existing square pavilion-style brick pagoda of the Tang Dynasty.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 9,
    title: 'Xi\'an — Hangzhou — Puyuan',
    description: 'Visit the Small Wild Goose Pagoda Museum and Huimin Street. Flight to Hangzhou. Head to Puyuan Fashion Ancient Town featuring Southern Song Dynasty architecture, waterways, and Jiangnan water town charm.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Puyuan Hotel or similar 5-star'
  },
  {
    day: 10,
    title: 'Puyuan — Hangzhou',
    description: 'Free time in the morning. Depart for Hangzhou. Visit West Lake scenic area: Hua Gang Guan Yu, West Lake boat tour, Su Causeway, and Leifeng Pagoda.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Hangzhou or similar 4-star'
  },
  {
    day: 11,
    title: 'Hangzhou — Shanghai',
    description: 'Visit Hangzhou International Expo Center (G20 Summit venue). Visit Meijiawu Tea Plantation for Longjing tea tasting. Free time at Qinghefang Ancient Street. Depart for Shanghai.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Express Shanghai or similar 4-star'
  },
  {
    day: 12,
    title: 'Shanghai',
    description: 'Visit Yuyuan Garden and a silk factory. Stroll along the Bund to admire historical buildings. Free time on Nanjing Road.',
    meals: ['Breakfast'],
    accommodation: 'Holiday Inn Express Shanghai or similar 4-star'
  },
  {
    day: 13,
    title: 'Shanghai',
    description: 'Visit People\'s Square and Nanjing Road. Check in at the Lujiazui circular corridor to see three iconic buildings. Visit the World Cultural Heritage Art Exhibition Center.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Express Shanghai or similar 4-star'
  },
  {
    day: 14,
    title: 'Shanghai — Beijing',
    description: 'Free time in Shanghai until transfer to the airport.',
    meals: ['Breakfast']
  },
  {
    day: 15,
    title: 'Arrive Auckland',
    description: 'Fly back to New Zealand.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '4-star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transfer including trains (2nd-class seat)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Discovery — Best of China | 15 Days | CTS Tours',
metaDescription: 'Experience the best of China in 15 days — Great Wall, Forbidden City, Terracotta Warriors, West Lake, Shanghai. From NZD $4,539. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $695

---

## Tour 6: Colorful Yunnan (Discovery — Yunnan Explorer)

**Tour ID:** `tour-cn-dis-7`
**Slug:** `yunnan-explorer` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Discovery — Colorful Yunnan',
title: 'China Discovery — Colorful Yunnan',
shortDescription: 'An 11-day journey through Yunnan\'s most captivating landscapes and cultures — from the Bai ethnic charm of Dali and ancient streets of Lijiang to the dramatic Tiger Leaping Gorge and mystical Shangri-La with its Tibetan monasteries.',
duration: '11 Days',
price: 'From NZD $3,899',
```

### Highlights:

```typescript
highlights: [
  'Explore Dali\'s "Santorini" — the Ideal State by Erhai Lake',
  'Visit traditional Bai ethnic Wenbi Village',
  'Stroll through the ancient streets of Shuanglang and Lijiang',
  'Experience Lashi Lake Wetland and migratory birds',
  'Walk through the thousand-year-old Shuhe Ancient Town',
  'Witness the spectacular Tiger Leaping Gorge',
  'Turn the world\'s largest prayer wheel in Shangri-La',
  'Visit Ganden Sumtseling Monastery — the "Little Potala Palace"',
  'Experience Dukezong Ancient City at dusk',
  'Discover Napa Lake Wetlands and Highland Barley Avenue'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Beijing',
    description: 'Make your own way to Auckland Airport and take flight to Beijing.',
    meals: []
  },
  {
    day: 2,
    title: 'Beijing — Dali',
    description: 'Arrive in Beijing, then transfer to the airport for a connecting flight to Dali. Upon arrival, meet your guide and check in to the hotel.',
    meals: [],
    accommodation: 'Dali local 4-star hotel'
  },
  {
    day: 3,
    title: 'Dali',
    description: 'Visit Erhai Park and the breathtaking Dali Ideal State — "Santorini" — nestled by Cangshan Mountain and Erhai Lake with European and Bai ethnic charm. Visit Wenbi Village, known for its Bai ethnic residential buildings. After lunch, explore Shuanglang Ancient Town, known as the "First Town of Cang\'er Scenery."',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Dali local 4-star hotel'
  },
  {
    day: 4,
    title: 'Dali',
    description: 'Free activities or optional tours. Optional Haixi Line Tour (550 RMB/person, min 16 people): Dali Ancient City, Erhai Ecological Corridor, ethnic costume photos, Xizhou Ancient Town with horse carriage, Three-course Tea performance, and Bai ethnic Jumping Dish meal.',
    meals: ['Breakfast'],
    accommodation: 'Dali local 4-star hotel'
  },
  {
    day: 5,
    title: 'Dali — Lijiang',
    description: 'Free morning activities. Transfer to Lijiang in the afternoon. Visit Black Dragon Pool Park and Highland Dulong Jade. Explore Sifang Street in the ancient city.',
    meals: ['Breakfast'],
    accommodation: 'Jixiangyuan Hotel Lijiang or similar 4-star'
  },
  {
    day: 6,
    title: 'Lijiang',
    description: 'Head to picturesque Lashi Lake Wetland — in winter, the golden trees and migratory birds create a harmonious picture with distant mountains. Visit the Silk Bedding Exhibition Hall. After lunch, explore the thousand-year-old Shuhe Ancient Town on the Tea Horse Road.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Jixiangyuan Hotel Lijiang or similar 4-star'
  },
  {
    day: 7,
    title: 'Lijiang — Tiger Leaping Gorge — Shangri-La',
    description: 'Drive to Shangri-La. Visit Tiger Leaping Gorge (including elevators), one of the world\'s most famous canyons with a 13-metre Tiger Leaping Stone. Explore Dukezong Ancient City at dusk with Tibetan dancing in Moonlight Square. Visit Guishan Park and turn the world\'s largest prayer wheel — made of pure copper and gold, containing 1.24 million mantras.',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Elong Hotel Shangri-La or similar 4-star'
  },
  {
    day: 8,
    title: 'Shangri-La — Lijiang',
    description: 'Visit Ganden Sumtseling Monastery (including eco-friendly vehicle), the largest Tibetan Buddhist monastery in Yunnan — known as the "Little Potala Palace." Visit Napa Lake Wetlands and Highland Barley Avenue. Return to Lijiang.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Jixiangyuan Hotel Lijiang or similar 4-star'
  },
  {
    day: 9,
    title: 'Lijiang',
    description: 'Free activities or optional tour (550 RMB/person, min 16 people): Visit ancient Naxi village, learn Dongba pictographs, experience stone mill bean grinding, visit the Naxi Museum, and take photos in Naxi clothing. Visit Yuzhu Qingtian Scenic Area with snow-capped mountains, lakes, and cliff carvings.',
    meals: ['Breakfast'],
    accommodation: 'Jixiangyuan Hotel Lijiang or similar 4-star'
  },
  {
    day: 10,
    title: 'Lijiang — Beijing',
    description: 'Transfer to the airport for a flight to Beijing for connecting flight.',
    meals: ['Breakfast']
  },
  {
    day: 11,
    title: 'Beijing — Auckland',
    description: 'Take flight back to Auckland.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '4-star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transfer'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Discovery — Colorful Yunnan | 11 Days | CTS Tours',
metaDescription: 'Explore Yunnan\'s beauty — Dali, Lijiang, Tiger Leaping Gorge, Shangri-La, Tibetan monasteries. 11 days from NZD $3,899. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $340

---

## Tour 7: Shanghai & Surroundings (Discovery — Shanghai & Beyond)

**Tour ID:** `tour-cn-dis-4`
**Slug:** `shanghai-beyond` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Discovery — Shanghai & Surroundings',
title: 'China Discovery — Shanghai & Surroundings',
shortDescription: 'A 10-day exploration of the Yangtze River Delta — from the classical gardens of Suzhou and lakeside Wuxi to the ancient water town of Xinshi, the beauty of West Lake in Hangzhou, and the vibrant Bund of Shanghai.',
duration: '10 Days',
price: 'From NZD $2,999',
```

### Highlights:

```typescript
highlights: [
  'Visit the Master of the Nets Garden in Suzhou',
  'Explore Panmen, the only remaining water-and-land double gate',
  'Experience Three Kingdoms City with warship tour and horse battle show in Wuxi',
  'Dress in traditional Hanfu at Xinshi Ancient Town',
  'Cruise West Lake in Hangzhou with Su Causeway and Leifeng Pagoda',
  'Visit the G20 Summit venue and Six Harmonies Pagoda',
  'Taste famous Longjing tea at Meijiawu Plantation',
  'Stroll along Shanghai\'s iconic Bund waterfront',
  'Explore Yuyuan Garden and City God Temple area',
  'Optional: Shanghai Acrobatics Show and Maglev train ride'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Shanghai',
    description: 'Make your own way to Auckland Airport, check in, and fly to Shanghai.',
    meals: []
  },
  {
    day: 2,
    title: 'Shanghai — Suzhou',
    description: 'Arrive in Shanghai, meet your guide. Head to Suzhou (1.5 hours). Visit Master of the Nets Garden, a famous classical Chinese private garden. Visit Panmen, the only remaining water-and-land double gate, then explore Shantang Street for riverside life. Dinner self-arranged with local snacks.',
    meals: ['Lunch'],
    accommodation: 'Rosedale Chunshenhu Resort Hotel or similar 5-star'
  },
  {
    day: 3,
    title: 'Suzhou — Wuxi',
    description: 'Visit a silk factory. Head to Wuxi (1 hour). Visit Three Kingdoms City by Taihu Lake — take an ancient warship tour and enjoy a live horse battle show. Visit Purple Sand Museum and Nanchang Ancient Street.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Express Wuxi or similar 4-star'
  },
  {
    day: 4,
    title: 'Wuxi',
    description: 'Visit Li Garden at the lakeside, then Wuxi Pearl Exhibition Center. Lunch features Wuxi specialty dumplings and soup dumplings. Visit a traditional local food and daily goods market. Free time in the afternoon.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Holiday Inn Express Wuxi or similar 4-star'
  },
  {
    day: 5,
    title: 'Wuxi — Xinshi Ancient Town',
    description: 'Head to Xinshi Town (1.5 hours), a thousand-year-old southern Jiangsu picturesque town connected by waterways and ancient bridges. Experience wearing traditional Hanfu for photos. Enjoy afternoon tea with coffee, snacks, and ice cream.',
    meals: ['Breakfast', 'Afternoon Tea'],
    accommodation: 'Holiday Inn or similar 4-star'
  },
  {
    day: 6,
    title: 'Xinshi — Hangzhou',
    description: 'Free morning until 10:00. Head to Hangzhou. Visit West Lake scenic area: Hua Gang Guan Yu, West Lake boat tour, Su Causeway, and Leifeng Pagoda. Free time at the lakeside.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'New Century Hotel Hangzhou or similar 5-star'
  },
  {
    day: 7,
    title: 'Hangzhou — Shanghai',
    description: 'Visit Hangzhou International Expo Center (G20 Summit venue). Visit Six Harmonies Pagoda and Meijiawu Tea Plantation for Longjing tea tasting. Head to Shanghai (2 hours).',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Holiday Inn Express Shanghai or similar 4-star'
  },
  {
    day: 8,
    title: 'Shanghai',
    description: 'Visit the Bund along the Huangpu River with its 52 buildings known as the "Exhibition of World Architecture." Visit City God Temple area, Shanghai\'s ancient downtown. Visit the World Cultural Heritage Art Exhibition Center. Free time on Nanjing Road. Optional evening: Shanghai Acrobatics Show (NZD $80/person).',
    meals: ['Breakfast'],
    accommodation: 'Holiday Inn Express Shanghai or similar 4-star'
  },
  {
    day: 9,
    title: 'Shanghai — Departure',
    description: 'Free morning. Optional: Maglev train ride round trip (NZD $30/person). Afternoon transfer to the airport for departure.',
    meals: ['Breakfast']
  },
  {
    day: 10,
    title: 'Arrive Auckland',
    description: 'Arrive in Auckland in the morning.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  '4–5 star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transfer'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Discovery — Shanghai & Surroundings | 10 Days | CTS Tours',
metaDescription: 'Explore Shanghai and the Yangtze Delta — Suzhou gardens, Wuxi, Xinshi water town, West Lake, the Bund. 10 days from NZD $2,999. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $400

---

## Tour 8: A Tale of Two Cities (Discovery — Beijing & Shanghai)

**Tour ID:** `tour-cn-dis-2`
**Slug:** `beijing-shanghai` (keep unchanged)

### Fields to Update:

```typescript
name: 'China Discovery — A Tale of Two Cities',
title: 'China Discovery — A Tale of Two Cities',
shortDescription: 'A focused 10-day journey through China\'s two greatest cities and their ancient neighbour — Beijing\'s imperial treasures, Xi\'an\'s legendary warriors, and the contrasting worlds of hutong alleyways, city walls, and modern skylines.',
duration: '10 Days',
price: 'From NZD $3,480',
```

### Highlights:

```typescript
highlights: [
  'Visit the Temple of Heaven and experience its spiritual atmosphere',
  'Explore Tiananmen Square and the Forbidden City',
  'Walk the Great Wall of China',
  'Tour Beijing\'s Hutongs by pedicab with a local family visit',
  'Discover the 2,000-year-old Terracotta Warriors in Xi\'an',
  'Walk along Xi\'an\'s 14th-century Ancient City Wall',
  'Visit the Big Wild Goose Pagoda, a Tang Dynasty treasure',
  'Explore the Small Wild Goose Pagoda Museum',
  'Stroll through the vibrant Huimin Street in Xi\'an',
  'View the Olympic Bird\'s Nest and Water Cube'
],
```

### Itinerary:

```typescript
itinerary: [
  {
    day: 1,
    title: 'Auckland — Beijing',
    description: 'Flight to Beijing from Auckland in the evening.',
    meals: []
  },
  {
    day: 2,
    title: 'Beijing',
    description: 'Upon arrival, visit the Temple of Heaven, the 500-year-old temple housing altars for sacrifices and offerings in a glorious setting of gardens, trees and sculptures. Stop at a tea factory.',
    meals: [],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 3,
    title: 'Beijing',
    description: 'Tour Tiananmen Square, the biggest public square in the world. Photo stop at the National Centre for the Performing Arts ("The Egg"). Visit Forbidden City and Beihai Park. Stop at a silk factory. Optional evening: acrobatic show. Note: If Forbidden City tickets are unavailable, visit Jingshan Park and Prince Gong\'s Mansion instead.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 4,
    title: 'Beijing',
    description: 'Morning tour to the Great Wall. Stopover at a jade carving factory. Return to the city, view the Olympic Park\'s Bird\'s Nest and Water Cube from outside.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 5,
    title: 'Beijing',
    description: 'Pedicab tour of the Hutongs — the "old city" neighbourhoods of narrow alleyways and courtyard gardens, with a local family visit. Afternoon tour to the Silk Market.',
    meals: ['Breakfast'],
    accommodation: 'Beijing Wanda Moments or similar 4-star'
  },
  {
    day: 6,
    title: 'Beijing — Xi\'an',
    description: 'Morning free time. Train G89, 15:00–19:12 to Xi\'an (or similar, 2nd-class seat). Local guide will meet you on arrival.',
    meals: ['Breakfast'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 7,
    title: 'Xi\'an',
    description: 'Visit the 2,000-year-old Terracotta Warriors including Circle Vision Movie and Bronze Chariot. Optional evening: Tang Palace Banquet Song and Dance Performance.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 8,
    title: 'Xi\'an',
    description: 'Visit the Old City Wall and Big Wild Goose Pagoda — the earliest and largest existing square pavilion-style brick pagoda of the Tang Dynasty.',
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Mercure Xi\'an Downtown or similar 4-star'
  },
  {
    day: 9,
    title: 'Xi\'an — Beijing',
    description: 'Visit the Small Wild Goose Pagoda Museum and Huimin Street. Flight to Beijing for connecting flight.',
    meals: ['Breakfast']
  },
  {
    day: 10,
    title: 'Beijing — Auckland',
    description: 'Take connecting flight back to New Zealand.',
    meals: []
  }
],
```

### Inclusions & Exclusions:

```typescript
inclusions: [
  'Return international airfares from Auckland',
  'Domestic airfares within China',
  '4-star hotel accommodation',
  'English-speaking tour guide',
  'Entrance fees and meals as specified in the itinerary',
  'Land transfer including trains (2nd-class seat)'
],
exclusions: [
  'China visa fee (if required)',
  'Travel insurance (strongly recommended)',
  'Personal expenses',
  'Transportation and guide services during free time',
  'Meals not listed in the itinerary',
  'Tips (suggested NZD $10 per day per person)',
  'Any items not specifically mentioned as included'
],
```

### Meta:

```typescript
metaTitle: 'China Discovery — A Tale of Two Cities | 10 Days | CTS Tours',
metaDescription: 'Explore Beijing and Xi\'an — Great Wall, Forbidden City, Terracotta Warriors, Hutongs, City Wall. 10 days from NZD $3,480. Book with CTS Tours.',
updatedAt: '2026-03-29'
```

### Single Room Supplement: NZD $395

---

## Summary of Price Changes

| Tour | Slug | Old Price | New Price | Single Supplement |
|---|---|---|---|---|
| Natural China 16D | `landscapes` | (old) | NZD $7,670 | NZD $1,215 |
| Legacy of China 17D | `imperial-heritage` | (old) | NZD $9,999 | NZD $2,410 |
| Silk Road Discovery 17D | `silk-road` | NZD $4,899 | NZD $6,699 | NZD $1,435 |
| China Panorama 27D | `grand-tour` | (old) | NZD $10,899 | NZD $2,555 |
| Best of China 15D | `essentials` | NZD $3,599 | NZD $4,539 | NZD $695 |
| Colorful Yunnan 11D | `yunnan-explorer` | (old) | NZD $3,899 | NZD $340 |
| Shanghai & Surroundings 10D | `shanghai-beyond` | (old) | NZD $2,999 | NZD $400 |
| A Tale of Two Cities 10D | `beijing-shanghai` | NZD $3,099 | NZD $3,480 | NZD $395 |

## Implementation Notes

1. **Do NOT change slugs** — they form part of the URL structure
2. **Update `updatedAt`** to `'2026-03-29'` for all 8 tours
3. **Keep `heroImage` and `gallery`** arrays unchanged (images are not affected)
4. **Keep `isActive: true`** for all tours
5. **Keep `createdAt`** unchanged
6. **Single room supplements** are noted for reference but not currently stored in the data model — consider adding a `singleSupplement` field to the Tour interface if needed
7. **Optional activities** (acrobatic shows, Maglev rides, etc.) are mentioned in itinerary descriptions but not priced separately in the data model
