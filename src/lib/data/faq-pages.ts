/**
 * FAQ Pages Data Structure
 * Phase 3&4 SEO Implementation
 * Updated: 2026-04-29
 */

export interface FAQItem {
  question: string;
  answer: string;
  searchIntent?: string; // Primary keyword intent
  monthlySearches?: number;
}

export interface RelatedFAQ {
  slug: string;
  title: string;
}

export interface FAQPage {
  slug: string;
  title: string;
  metaDescription: string;
  introText: string;
  faqs: FAQItem[];
  relatedGuides?: string[]; // Links to destination guides
  relatedFaqs?: RelatedFAQ[]; // Links to other FAQ pages
}

/**
 * Tier 1: High-Priority FAQ Pages
 * Target: 150+ monthly searches, <25 keyword difficulty
 * Timeline: May 2026
 */

export const faqPlanningYourChinaTrip: FAQPage = {
  slug: 'faq-planning-your-china-trip',
  title: 'Planning Your China Trip: FAQ for New Zealand Travelers',
  metaDescription: 'Complete FAQ for planning your China trip. How long, best time, costs, safety, and multi-city itineraries for NZ travelers.',
  introText: 'Planning a trip to China from New Zealand? Here are the most common questions answered.',
  faqs: [
    {
      question: 'How long should my China trip be?',
      searchIntent: 'duration planning',
      monthlySearches: 200,
      answer: `For most first-time visitors, we recommend <strong>8-12 days</strong> in China. Here's why:

<strong>Minimum (4-5 days):</strong> Visit one major city like Beijing or Shanghai. Not recommended for long-haul travel from NZ.

<strong>Ideal (8-10 days):</strong> Visit 2-3 cities (e.g., Beijing + Xi'an + Shanghai, or Shanghai + Guilin + Chengdu). Allows time for travel between destinations and genuine experiences.

<strong>Comprehensive (12-14 days):</strong> Visit 3-4 cities plus a natural region. Full immersion in Chinese culture, landscapes, and heritage.

<strong>Extended (15+ days):</strong> Combine multiple regions (e.g., Beijing + Xi'an + Shanghai + Yunnan). Recommended if you have 2-3 weeks available.

Consider your budget, energy level, and how many cities you want to see. Quality experiences > quantity of destinations.`
    },
    {
      question: "What's the best time to visit China?",
      searchIntent: 'seasonal planning',
      monthlySearches: 280,
      answer: `<strong>Best Season: Autumn (September-October)</strong>
Perfect weather (15-30°C), clear skies, ideal for sightseeing and photography. Only downside: October Golden Week holidays cause crowds and higher prices.

<strong>Second Best: Spring (March-May)</strong>
Mild temperatures (15-25°C), spring flowers blooming, comfortable hiking weather. Moderate crowds except during May's Golden Week.

<strong>Avoid: Summer (June-August)</strong>
Hot and humid (25-40°C), rainy season in some regions, school holidays = peak crowds and prices.

<strong>Consider: Winter (November-February)</strong>
Cold in the north (Beijing: -5°C), but dry, clear skies, fewer tourists, and lower prices. Great for photography. Keep the Great Wall, Terracotta Warriors, and northern cities for this season.

<strong>Special Timing:</strong>
- Avoid Chinese New Year (late Jan-early Feb): Very crowded, expensive
- Avoid October Golden Week (Oct 1-7): Peak crowds, higher prices
- Best value: November-April (outside holidays)`
    },
    {
      question: 'How much does a China trip cost?',
      searchIntent: 'budget estimation',
      monthlySearches: 170,
      answer: `Cost varies significantly based on travel style and duration:

<strong>Budget Travel (per person, 10 days):</strong>
- Accommodation: NZD $800-1,200 (mid-range hotels)
- Transport (flights, trains, local): $300-500
- Food: $400-600 (street food + local restaurants)
- Activities/Tours: $600-1,000
- <strong>Total: NZD $2,100-3,300</strong>

<strong>Mid-Range (per person, 10 days):</strong>
- Accommodation: $1,200-1,800 (quality 3-4 star hotels)
- Transport: $500-800
- Food: $600-900 (mix of local + restaurants)
- Activities/Tours: $1,200-1,800
- <strong>Total: NZD $3,500-5,300</strong>

<strong>Luxury (per person, 10 days):</strong>
- Accommodation: $2,000-3,500 (5-star hotels)
- Transport: $800-1,200 (business class, private guides)
- Food: $1,200-1,800 (fine dining)
- Activities/Tours: $2,000-3,500 (private tours)
- <strong>Total: NZD $6,000-10,000+</strong>

<strong>Money-Saving Tips:</strong>
- Travel during shoulder seasons (spring/late autumn)
- Book tours with local specialists (better rates than independent travel)
- Eat where locals eat (street food is delicious + cheap)
- Use high-speed trains instead of flying (faster, cheaper city-to-city)`
    },
    {
      question: 'Can I visit multiple cities in one trip?',
      searchIntent: 'multi-city itineraries',
      monthlySearches: 120,
      answer: `<strong>Yes, absolutely!</strong> Multiple cities are one of China's greatest appeals. Here are proven combinations:

<strong>Classic Golden Triangle (10-12 days):</strong>
Beijing (3 days) → Xi'an (2 days) → Shanghai (3 days)

<strong>Southern Route (10-12 days):</strong>
Shanghai (2 days) → Hangzhou (1 day) → Guilin (3 days) → Yangshuo (2 days) → Chengdu (2 days)

<strong>Western Adventure (12-14 days):</strong>
Beijing (2 days) → Xi'an (2 days) → Chengdu (3 days) → Kunming + Lijiang (3 days)

<strong>Complete Journey (14-16 days):</strong>
Beijing → Xi'an → Shanghai → Guilin → Chengdu

<strong>Important Tips:</strong>
- Don't try more than 4-5 cities in one trip (exhausting)
- Factor in 1-2 days for travel between cities
- High-speed trains are the best option (fast, comfortable, affordable)
- Each city needs minimum 2-3 days to enjoy properly
- Consider your energy level and travel style`
    },
    {
      question: 'Is it safe to travel to China?',
      searchIntent: 'safety concerns',
      monthlySearches: 150,
      answer: `<strong>Yes, China is very safe for tourists.</strong> Here's what you need to know:

<strong>Safety Advantages:</strong>
- Very low violent crime (China is one of the safest countries globally)
- Excellent public transportation (trains, buses, subways all reliable and safe)
- Large tourism infrastructure with English-speaking staff in major cities
- Hotel and restaurant standards are high
- Police presence is visible and responsive

<strong>Practical Safety Tips:</strong>
- Keep valuables secure (use hotel safe, avoid displaying expensive items)
- Use registered taxis or ride-sharing apps (Didi) instead of hailing cabs
- Avoid traveling alone late at night in unfamiliar areas
- Be cautious with food if you have sensitive digestion (street food is delicious but spicy)
- Register with your embassy before traveling

<strong>Health Precautions:</strong>
- Get standard vaccinations (hepatitis A/B, typhoid if recommended)
- Purchase travel insurance (covers medical emergencies)
- Bring basic medications (antacids, pain relief, antihistamines)
- Drink bottled or boiled water, avoid street ice
- Air quality can be poor in some cities; those with respiratory issues should check AQI

<strong>Cultural Safety:</strong>
- Avoid political discussions
- Respect local customs and temples
- Photography: ask permission before photographing people
- Don't discuss Tibet or Uyghur issues unless you understand local sensitivity

Bottom line: Most New Zealand tourists have safe, enjoyable trips. Use common sense and follow local guidance.`
    }
  ],
  relatedGuides: [
    'china-tours',
    'china-visa-guide-for-new-zealanders',
    'best-time-to-visit-china'
  ],
  relatedFaqs: [
    {
      slug: 'faq-beijing-travel',
      title: 'Beijing Travel FAQ'
    },
    {
      slug: 'faq-great-wall-of-china',
      title: 'Great Wall of China FAQ'
    }
  ]
};

export const faqBeijingTravel: FAQPage = {
  slug: 'faq-beijing-travel',
  title: 'Beijing Travel FAQ: Questions Answered for NZ Travelers',
  metaDescription: 'Complete Beijing travel FAQ for New Zealand visitors. How many days, best time, budget, Great Wall day trips, and safety.',
  introText: 'Planning a Beijing trip? Here are answers to the most common questions from our guests.',
  faqs: [
    {
      question: 'How many days should I spend in Beijing?',
      searchIntent: 'duration for Beijing',
      monthlySearches: 200,
      answer: `<strong>Recommended: 3-4 days</strong>

<strong>3 Days (Minimum):</strong> One day for Forbidden City + Summer Palace, one day for Great Wall, one day for Temple of Heaven + hutong neighborhoods.

<strong>4 Days (Recommended):</strong> Same as above plus:
- Extra time to explore neighborhoods (Chaoyang, Haidian)
- Visit Olympic Stadium or 798 Art District
- Enjoy evening activities (night markets, restaurants)

<strong>5+ Days:</strong> If you want to:
- Take multiple Great Wall hikes
- Visit Badaling AND Mutianyu (two different sections)
- Explore less-touristy areas (Ming Tombs, Eastern Qing Tombs)
- Have a relaxed pace without rushing

<strong>Why not shorter?</strong>
- Jet lag from NZ (you'll lose 1 day adjusting)
- Great Wall alone takes full day
- Historical sites are spread out
- 3 days minimum to enjoy the city properly`
    },
    {
      question: "What's the best time to visit Beijing?",
      searchIntent: 'best season Beijing',
      monthlySearches: 280,
      answer: `<strong>Best: September-October</strong>
Clear skies, perfect temperatures (15-25°C), ideal for outdoor sightseeing. October has crowds during Golden Week but weather is excellent.

<strong>Good: March-May (Spring)</strong>
Mild weather (15-20°C), spring flowers, comfortable for walking. Occasional wind and dust storms. Avoid early May (holiday crowds).

<strong>Acceptable: November</strong>
Cool but dry (10-15°C), clear skies, fewer tourists. Bring layers.

<strong>Avoid: June-August</strong>
Hot (25-35°C), humid, occasional rain. School holidays = peak crowds and higher prices.

<strong>Not Recommended: December-February</strong>
Very cold (-5 to 5°C) with occasional snow. Dry but harsh. Better for winter photography than general tourism.

<strong>Special Events:</strong>
- Chinese New Year (late Jan-early Feb): Avoid (very crowded, expensive, many businesses closed)
- October Golden Week: Crowded but magical autumn weather`
    },
    {
      question: 'How much should I budget for Beijing?',
      searchIntent: 'Beijing costs',
      monthlySearches: 155,
      answer: `Per person, per day in Beijing:

<strong>Budget:</strong>
- Hotel: NZD $60-100/night (3-star hotels, hostels)
- Food: $30-50 (street food, noodle shops)
- Activities: $30-60 (temple entry fees)
- Transport: $5-10 (subway/bus)
- <strong>Daily Total: $125-220 (~$1,100-1,900 for 8 days)</strong>

<strong>Mid-Range:</strong>
- Hotel: $120-180/night (4-star hotels)
- Food: $50-100 (mix of restaurants)
- Activities: $80-120 (paid tours, museum entries)
- Transport: $10-15
- <strong>Daily Total: $260-415 (~$2,080-3,320 for 8 days)</strong>

<strong>Luxury:</strong>
- Hotel: $200-400/night (5-star hotels)
- Food: $100-200 (fine dining)
- Activities: $150-300 (private guides, premium tours)
- Transport: $20-30 (taxis, private transfers)
- <strong>Daily Total: $470-930 (~$3,760-7,440 for 8 days)</strong>

<strong>Sample 3-Day Budget Breakdown (Mid-Range):</strong>
- Hotel (3 nights): $360
- Forbidden City + Summer Palace: $100
- Great Wall tour: $150
- Meals (9 meals): $200
- Metro/transport: $30
- Miscellaneous: $100
- <strong>Total: ~NZD $940</strong>`
    },
    {
      question: 'Can I visit the Great Wall on a day trip from Beijing?',
      searchIntent: 'Great Wall day trip Beijing',
      monthlySearches: 180,
      answer: `<strong>Yes, but it's tight.</strong> You'll spend 4-5 hours traveling + 2-3 hours on the wall.

<strong>Best Day Trip Options:</strong>

1. <strong>Badaling (Closest - 80km):</strong>
   - Travel time: 2 hours each way (train + walk)
   - Time on wall: 2-3 hours
   - Pros: Easiest, most accessible, best facilities
   - Cons: Most crowded, most touristy
   - Cost: $50-100 with tour

2. <strong>Mutianyu (90km):</strong>
   - Travel time: 2.5-3 hours each way
   - Time on wall: 3-4 hours
   - Pros: Less crowded, more scenic, cable car available
   - Cons: Longer travel, more tiring
   - Cost: $80-150 with tour

3. <strong>Jinshanling (125km):</strong>
   - Travel time: 3 hours each way
   - Time on wall: 3-4 hours
   - Pros: Very few tourists, beautiful scenery
   - Cons: Most remote, hardest to reach independently
   - Cost: $100-180 with tour

<strong>Our Recommendation:</strong>
Book a full-day organized tour from Beijing (includes hotel pickup, guide, lunch). Much easier than doing it independently. Most tours depart 6-7am, return 6-7pm.

<strong>Alternative: Juyongguan or Simatai</strong>
Closer/easier but less famous sections. Still impressive for photography.`
    }
  ],
  relatedGuides: [
    'beijing-travel-guide',
    'great-wall-of-china-travel-guide',
    'best-time-to-visit-china'
  ],
  relatedFaqs: [
    {
      slug: 'faq-planning-your-china-trip',
      title: 'Planning Your China Trip FAQ'
    },
    {
      slug: 'faq-great-wall-of-china',
      title: 'Great Wall of China FAQ'
    }
  ]
};

export const faqGreatWall: FAQPage = {
  slug: 'faq-great-wall-of-china',
  title: 'Great Wall of China FAQ: Complete Visitor Guide',
  metaDescription: 'Great Wall FAQ for visitors. How long, best time to visit, Badaling vs Mutianyu, and what to expect.',
  introText: 'Visiting the Great Wall of China? Find answers to the most common questions here.',
  faqs: [
    {
      question: 'How long is the Great Wall of China?',
      searchIntent: 'Great Wall length facts',
      monthlySearches: 250,
      answer: `<strong>The total length of the Great Wall is approximately 21,000 kilometers (13,000 miles).</strong>

<strong>Important clarifications:</strong>

<strong>Main Wall Sections:</strong>
- Badaling (near Beijing): 7.4 km restored/accessible
- Mutianyu: 2.25 km cable car route
- Jinshanling: 10.5 km hiking trail
- Simatai: 5.4 km unrestored/steep

<strong>Why so long?</strong>
The Great Wall isn't one continuous wall—it's a series of fortifications built over 2,000 years by different dynasties. Each section was built to protect against different threats.

<strong>What visitors typically see:</strong>
- Day visitors explore 2-5 km on a single section
- A complete wall section takes 2-4 hours to walk
- Most people see less than 10 km in a single visit

<strong>If you wanted to walk the entire Great Wall:</strong>
It would take several months. No tourists do this. Instead, experience the most famous sections (Badaling for accessibility, Mutianyu for scenery, Jinshanling for solitude).`
    },
    {
      question: "What's the best time to hike the Great Wall?",
      searchIntent: 'Great Wall hiking season',
      monthlySearches: 95,
      answer: `<strong>Best: September-October</strong>
Perfect temperatures (15-25°C), clear skies, dry weather. Crowds on weekends but manageable. Ideal for photography.

<strong>Good: March-May (Spring)</strong>
Mild weather (15-20°C), spring flowers. Watch for dust storms in April. Comfortable for most fitness levels.

<strong>Acceptable: November</strong>
Cool (10-15°C) but dry. Fewer tourists. Bring layers.

<strong>Avoid: June-August</strong>
Hot (25-35°C), humid, steep sections are exhausting. School holidays = crowds.

<strong>Not Recommended: December-February</strong>
Cold and icy (can be -10°C). Some sections closed due to ice. Only for experienced winter hikers.

<strong>Hiking Tips by Season:</strong>
- Spring: Watch for afternoon rain; start early
- Autumn: Best all-around conditions
- Winter: Bring crampons if hiking unrestored sections
- Summer: Start at dawn to avoid heat

<strong>Best Hiking Sections by Season:</strong>
- All seasons: Badaling (restored, easiest)
- Spring-Autumn: Mutianyu (most scenic, cable car available)
- Experienced hikers: Jinshanling or Simatai (less crowded, steeper)`
    },
    {
      question: 'Is Badaling or Mutianyu better?',
      searchIntent: 'Badaling vs Mutianyu comparison',
      monthlySearches: 120,
      answer: `<strong>The Answer: It depends on your priorities.</strong>

<strong>BADALING</strong>
<strong>Pros:</strong>
- Closest to Beijing (80 km, 2 hours)
- Most restored and accessible
- Modern facilities (restaurants, bathrooms)
- Easiest for first-time visitors
- Best for photography (sunset views)

<strong>Cons:</strong>
- Most crowded (especially weekends)
- Most touristy
- Less scenic/less "wild"
- Can feel commercialized
- Fewer challenging hiking routes

<strong>MUTIANYU</strong>
<strong>Pros:</strong>
- More scenic and less crowded
- Cable car option for easier access
- More challenging hiking routes
- Feels more "authentic"
- Great for photography (less people in shots)
- Surrounded by forest/nature

<strong>Cons:</strong>
- Further from Beijing (90 km, 2.5-3 hours)
- Takes full day (6am-6pm)
- Cable car costs extra ($20-30)
- Can be muddy in wet seasons
- Fewer tourists = longer walks between scenic spots

<strong>Our Recommendation:</strong>
- <strong>First-time visitors:</strong> Badaling (more convenient, iconic views)
- <strong>Photography enthusiasts:</strong> Mutianyu (better scenery, fewer crowds)
- <strong>Adventure seekers:</strong> Jinshanling (least touristy, more challenging)
- <strong>Families with kids:</strong> Badaling (easiest, shortest time commitment)
- <strong>If you have 3+ days:</strong> Visit both (Badaling for classic views, Mutianyu for scenery)

<strong>Don't Miss:</strong>
Sunset from Badaling is spectacular. Consider staying for sunset if timing allows.`
    },
    {
      question: 'How long does a Great Wall visit take?',
      searchIntent: 'Great Wall visit duration',
      monthlySearches: 140,
      answer: `<strong>Total time commitment: 8-10 hours (full day from Beijing)</strong>

<strong>Time Breakdown (Badaling):</strong>
- Hotel pickup: 30 min
- Drive to Badaling: 2 hours
- Hiking/exploring wall: 2-3 hours
- Lunch break: 1 hour
- Return drive: 2 hours
- Drop-off at hotel: 30 min
- <strong>Total: 8.5-9.5 hours</strong>

<strong>Time Breakdown (Mutianyu):</strong>
- Hotel pickup: 30 min
- Drive to Mutianyu: 2.5-3 hours
- Cable car up: 30 min
- Hiking/exploring: 2.5-3 hours
- Lunch: 1 hour
- Cable car down: 30 min
- Return drive: 2.5-3 hours
- Drop-off: 30 min
- <strong>Total: 10-11 hours</strong>

<strong>What You Actually Do on the Wall:</strong>
- 30 min: Walking uphill to main wall
- 1-1.5 hours: Walking along the wall
- 30-45 min: Taking photos, enjoying views
- 30 min: Walking downhill back to parking

<strong>Can You Do It Faster?</strong>
Yes, but you'll miss the experience. Organized tours are designed for comfort, not speed. Independent travelers could do it in 6-7 hours, but this is exhausting.

<strong>Can You Spend More Time?</strong>
Absolutely! Hikers spend 4-6 hours on certain sections. If you're an avid hiker, consider Jinshanling (less crowded, longer hikes available).`
    },
    {
      question: 'Can I hike the Great Wall?',
      searchIntent: 'Great Wall hiking difficulty',
      monthlySearches: 130,
      answer: `<strong>Yes, but it's more difficult than many expect.</strong>

<strong>Fitness Level Required:</strong>

<strong>Easy (Badaling - restored section):</strong>
- Altitude gain: ~200m over 2 km
- Terrain: Well-maintained stone steps, wide paths
- Time: 1-1.5 hours one way
- Fitness: Any level (elderly, children ok with assistance)
- Pros: Modern facilities, easy pace
- Cons: Crowded, touristy

<strong>Moderate (Mutianyu - cable car assisted):</strong>
- Altitude gain: Minimal with cable car
- Terrain: Mix of restored and natural sections
- Time: 1.5-2 hours with cable car
- Fitness: Moderate fitness recommended
- Pros: Scenic, fewer crowds
- Cons: Cable car costs extra

<strong>Challenging (Jinshanling - unrestored):</strong>
- Altitude gain: 300-400m
- Terrain: Uneven, steep, some crumbling sections
- Time: 3-4 hours
- Fitness: Good fitness + hiking experience recommended
- Pros: Authentic, fewer tourists, excellent views
- Cons: Physically demanding, uneven surfaces

<strong>Very Challenging (Simatai - expert section):</strong>
- Altitude gain: 400-500m
- Terrain: Very steep, narrow, some dramatic drops
- Time: 4-6 hours
- Fitness: Experienced hikers only
- Pros: Most authentic, spectacular views, adventure
- Cons: Dangerous, requires full day, many are turned back

<strong>Important Considerations:</strong>
- Altitude: Beijing is already at 50m elevation, most sections are 300-600m. Mild altitude effect possible.
- Weather: Stone can be slippery when wet. Avoid after rain on Jinshanling/Simatai.
- Physical: Many sections have stairs of 15-30cm height. Not suitable for knees/ankles.
- Age: 70+ year olds successfully hike Badaling with assistance. Jinshanling is too challenging for seniors.
- Footwear: Good hiking boots essential. Trainers ok for Badaling, not recommended elsewhere.

<strong>Our Recommendation:</strong>
- First visit: Badaling (easy, iconic)
- Second visit: Mutianyu (moderate, scenic)
- Adventure seekers: Jinshanling (challenging, rewarding)
- Expert hikers: Simatai (expert-only, unforgettable)`
    }
  ],
  relatedGuides: [
    'great-wall-of-china-travel-guide',
    'beijing-travel-guide',
    'best-time-to-visit-china'
  ],
  relatedFaqs: [
    {
      slug: 'faq-planning-your-china-trip',
      title: 'Planning Your China Trip FAQ'
    },
    {
      slug: 'faq-beijing-travel',
      title: 'Beijing Travel FAQ'
    }
  ]
};

/**
 * Phase 3 FAQ Pages — Tour Planning, Visa Requirements, Best Time to Travel
 * URL slugs: /faq/tour-planning | /faq/visa-requirements | /faq/best-time-travel
 */

export const faqTourPlanning: FAQPage = {
  slug: 'tour-planning',
  title: 'How to Plan a China Tour: FAQ for New Zealand Travellers',
  metaDescription: 'Everything you need to plan your China tour from New Zealand — group vs tailor-made, how long, what to include, budgeting, and why using a specialist makes the difference.',
  introText: 'Organising a China trip from New Zealand raises dozens of practical questions. Here are the ones we answer most often — with honest, specific answers from our team of China travel specialists.',
  faqs: [
    {
      question: 'Should I book a group tour or a tailor-made private tour?',
      searchIntent: 'group vs private tour China',
      monthlySearches: 180,
      answer: `Both work well — the right choice depends on your travel style and budget.

<strong>Group tours</strong> are structured itineraries with fixed dates, set accommodation, and a group of typically 8–16 travellers sharing the same schedule. They cost 20–40% less than private equivalents, are fully organised so you do not need to handle logistics, and provide a social dimension that solo or couple travellers often appreciate. The trade-off is flexibility: the itinerary is set, and the pace must accommodate the whole group.

<strong>Tailor-made private tours</strong> are planned specifically for you. Departure dates are flexible, the itinerary can be built around your interests (food, history, photography, hiking), accommodation can range from 3-star to 5-star at your choice, and the pace is yours. They cost more, but the experience is qualitatively different.

<strong>CTS recommendation:</strong> For first-time visitors to China who prefer structure and certainty, our group Discovery tours are excellent value. For travellers with specific interests, repeat visitors, or families with children, our tailor-made Signature itineraries are worth the premium.`
    },
    {
      question: 'How far in advance should I book my China tour?',
      searchIntent: 'when to book China tour',
      monthlySearches: 140,
      answer: `<strong>Minimum recommended lead time: 3 months.</strong>

For travel during peak periods — October Golden Week (Oct 1–7), Chinese New Year (late January or February), and New Zealand school holidays — book 5–6 months in advance. These periods have limited availability on group departures and significantly higher prices for accommodation.

For travel during shoulder seasons (March–May, November), 3 months is generally sufficient for group tours. Tailor-made itineraries need slightly more time for careful planning — 4 months is ideal.

Key items that require early booking:
- Domestic flight tickets during peak periods
- High-speed rail tickets on popular routes (Beijing–Xi'an)
- Accommodation in major cities at quality properties
- Specialist experiences (panda volunteer programme, private Great Wall access)`
    },
    {
      question: 'What is typically included in a China tour package?',
      searchIntent: 'what is included China tour',
      monthlySearches: 160,
      answer: `Standard CTS tour packages include:

<strong>Usually included:</strong>
- Airport transfers (arrival and departure)
- All domestic transport (private vehicle, domestic flights or high-speed rail between cities)
- Accommodation (twin or double room as specified)
- Breakfast daily; some dinners as noted
- English-speaking local guide at each destination
- Group entrance fees to major attractions
- 24/7 emergency support contact

<strong>Usually not included:</strong>
- International flights (Auckland to China and return)
- Travel insurance (strongly recommended — mandatory for visa applications)
- Visa fee (NZD 130–220 depending on application type)
- Personal spending, souvenirs, optional activities
- Lunches and most dinners
- Tips for guides and drivers (NZD 5–10 per person per day is customary)

<strong>Ask specifically about:</strong> Whether international flights are included. Some packages include them; most CTS packages price them separately so you can choose your own routing.`
    },
    {
      question: 'Can I customise a standard tour itinerary?',
      searchIntent: 'customise China tour itinerary',
      monthlySearches: 120,
      answer: `Yes — and we encourage it.

Our Discovery group tours have fixed itineraries because they depart on set dates with multiple travellers. However, even within group tours, we can often accommodate small modifications: a different hotel tier, an additional excursion, or a day's extension at the end.

Our Signature tailor-made tours are built entirely around your preferences. We start with a consultation about your interests, travel style, pace preference, and budget, and design the itinerary from there. Common customisations include:

- Adding food-focused experiences (cooking classes, market tours, restaurant bookings)
- Including natural areas alongside the classic cities (Guilin, Zhangjiajie, Yunnan)
- Incorporating a Yangtze River cruise segment
- Adjusting the city mix (spending more days in Xi'an, skipping cities that don't interest you)
- Adding a Tibet or Silk Road extension

<a href="/contact">Contact us</a> to start the conversation — we typically respond within one business day.`
    },
    {
      question: 'Is China safe for New Zealand travellers?',
      searchIntent: 'China safe travel New Zealand',
      monthlySearches: 200,
      answer: `China is consistently rated as one of the safer destinations in Asia for foreign travellers.

<strong>Crime:</strong> Violent crime against tourists is extremely rare. Petty theft (pickpocketing in crowded areas) exists as it does in any major tourist destination — standard precautions apply.

<strong>Health:</strong> Tap water is not drinkable in China; use bottled water. Food safety standards in established restaurants and hotels are good. Air quality varies by city and season; those with respiratory conditions should check pollution levels.

<strong>Scams:</strong> The main risks for tourists are non-violent: "tea ceremony" scams in Beijing and Shanghai (a friendly local invites you for tea, the bill is enormous), art gallery scams, and overpriced taxis at tourist sites. Awareness prevents most of these.

<strong>Language:</strong> Outside tourist areas and major hotels, English is limited. Our guides handle all communication; on tailor-made tours, we provide a 24/7 emergency contact number for situations where you need immediate translation support.

<strong>SafeTravel NZ rating:</strong> Check the NZ government's SafeTravel website before departure for the current official advisory. China has consistently been rated as low-risk for New Zealand travellers.`
    },
    {
      question: 'Do I need travel insurance for China?',
      searchIntent: 'travel insurance China NZ',
      monthlySearches: 130,
      answer: `<strong>Yes — travel insurance is mandatory</strong>, both for your China visa application and as a practical necessity.

<strong>For your visa:</strong> Chinese visa applications for New Zealanders now require proof of travel insurance as part of the application. Your policy must cover medical evacuation and have a minimum medical coverage of NZD 100,000.

<strong>Practically:</strong> Chinese healthcare is high-quality in major cities, but hospital bills must be paid upfront by foreign nationals and then claimed back from your insurer. A serious medical event without insurance can cost NZD 50,000–200,000. Medical evacuation from China to New Zealand costs NZD 80,000–150,000 uninsured.

<strong>What to look for in a policy:</strong>
- Medical coverage: NZD 500,000 minimum
- Medical evacuation: included
- Trip cancellation/interruption: included
- COVID-19 coverage: confirm specifically
- Pre-existing conditions: declare and check coverage

Recommended NZ providers: Southern Cross Travel Insurance, Cover-More, IAG/AMI. Compare at least three quotes. Do not travel to China without it.`
    },
    {
      question: 'What is the approximate budget for a 10-day China tour?',
      searchIntent: 'China tour budget New Zealand',
      monthlySearches: 150,
      answer: `Cost varies significantly by tour type and accommodation standard. Approximate per-person costs for a 10-day tour (not including international flights):

<strong>Group Discovery tour (CTS standard):</strong>
- Tour package: NZD 3,200–4,500 per person (twin share)
- Visas: NZD 130–220
- Travel insurance: NZD 200–350
- Personal spending (lunches, souvenirs, tips): NZD 600–900
- <strong>Total: NZD 4,130–5,970</strong>

<strong>Signature tailor-made (4-star hotels):</strong>
- Tour package: NZD 5,500–7,500 per person
- Personal spending: NZD 800–1,200
- <strong>Total: NZD 6,630–9,170</strong>

<strong>International flights from Auckland:</strong> NZD 1,400–2,800 return depending on airline and season.

<strong>Total trip cost estimate:</strong> NZD 5,500–12,000 per person depending on tour type, travel season, and flight class.

Budget and shoulder-season travel is possible; luxury-class travel is also available. <a href="/contact">Contact us</a> for a specific quote based on your dates and preferences.`
    },
    {
      question: 'How do I pay for things in China as a New Zealand traveller?',
      searchIntent: 'payment methods China tourist',
      monthlySearches: 110,
      answer: `Payment in China has shifted dramatically to mobile payments (WeChat Pay and Alipay), which creates a challenge for foreign visitors whose bank accounts are not linked to Chinese mobile numbers.

<strong>What works for international travellers:</strong>

<strong>Cash (Chinese yuan / RMB):</strong> Still accepted everywhere, from street vendors to taxi drivers. Exchange NZD to CNY before departure at ANZ, BNZ, or Westpac; rates are generally better in New Zealand than at Chinese airports.

<strong>Alipay International:</strong> Alipay has launched an international version allowing foreign credit cards (Visa, Mastercard) to be linked to an Alipay account. Works at most merchants. Set this up before departure.

<strong>Credit cards:</strong> Accepted at international hotels, high-end restaurants, and some tourist sites. Not reliable at small restaurants, markets, or transport.

<strong>Practical recommendation:</strong> Bring NZD 500–800 in cash (CNY equivalent) for daily expenses. Set up the Alipay international app before departure. Your hotel concierge can assist with local cash exchange if needed.

Our guides handle payments for group activities; this is most relevant for personal purchases and meals on your own time.`
    },
    {
      question: 'What China tours does CTS offer for New Zealand travellers?',
      searchIntent: 'CTS Tours China packages NZ',
      monthlySearches: 90,
      answer: `CTS Tours offers two main types of China travel:

<strong>Discovery Tours (group departures):</strong>
- <a href="/tours/china/discovery/beijing-xian">A Tale of Two Cities — Beijing & Xi'an</a> (7 days)
- <a href="/tours/china/discovery/shanghai-surroundings">Shanghai & Surroundings</a> (7 days)
- Fixed departure dates throughout the year
- Group size: 8–16 travellers
- Includes accommodation, transport, guide, major entrance fees

<strong>Signature Tours (tailor-made):</strong>
- Custom itineraries designed for your group (2–12 people)
- Flexible departure dates
- Choice of hotels from 3-star to luxury
- Available for all destinations: Beijing, Xi'an, Shanghai, Guilin, Chengdu, Yunnan, and more
- Includes full private guide service throughout

To discuss your options, <a href="/contact">contact our team</a> — we will respond within one business day with specific recommendations and a no-obligation quote.`
    },
    {
      question: 'Do I need to speak Mandarin to travel in China?',
      searchIntent: 'travel China without speaking Chinese',
      monthlySearches: 170,
      answer: `On a guided tour with CTS, no. Your local English-speaking guide handles all communication throughout.

For independent movement within your tour (exploring on your own during free time), a few practical tools help:

<strong>Translation apps:</strong> Google Translate's camera function reads Chinese text in real time — menu items, street signs, transport information. Works without a data connection if you download the Chinese language pack offline.

<strong>Useful phrases:</strong> Even minimal Mandarin is appreciated. "Xièxie" (谢谢, thank you), "Nǐ hǎo" (你好, hello), and showing your hotel's name card (every hotel provides them at check-in) covers most situations.

<strong>Ride-hailing:</strong> DiDi (China's Uber equivalent) works with an English-language interface and eliminates taxi language barriers. Your guide will help you set it up on day one.

<strong>Navigation:</strong> Baidu Maps is more accurate than Google Maps in China. Download it before departure; it works with English searches for major landmarks.

Major tourist attractions and 4–5 star hotels all have English-speaking staff. The language challenge is real but manageable with preparation.`
    }
  ],
  relatedGuides: [
    'beijing-travel-guide',
    'shanghai-travel-guide',
    'best-time-to-visit-china'
  ],
  relatedFaqs: [
    { slug: 'visa-requirements', title: 'China Visa Requirements FAQ' },
    { slug: 'best-time-travel', title: 'Best Time to Travel to China FAQ' }
  ]
};

export const faqVisaRequirements: FAQPage = {
  slug: 'visa-requirements',
  title: 'China Visa Requirements: FAQ for New Zealand Travellers',
  metaDescription: 'Complete China visa guide for New Zealanders — what type to apply for, documents needed, costs, processing times, and whether NZ travellers need a visa at all in 2025.',
  introText: 'China visa requirements changed significantly in 2024–2025, with New Zealand now qualifying for visa-free entry under certain conditions. Here is the current picture — accurate as of May 2026.',
  faqs: [
    {
      question: 'Do New Zealanders need a visa to visit China in 2025?',
      searchIntent: 'China visa free New Zealand 2025',
      monthlySearches: 320,
      answer: `<strong>As of March 2025, New Zealand passport holders can enter mainland China visa-free for stays of up to 30 days</strong> for tourism, transit, business, and family visits.

This is a significant change from the previous requirement for a tourist visa. New Zealand was added to China's visa-free list as part of an expanded mutual visa-exemption programme.

<strong>Key conditions for visa-free entry:</strong>
- Stay must not exceed 30 days (cumulative days in a single visit)
- Purpose must be tourism, transit, business meeting, or visiting family/friends
- You must hold a valid New Zealand passport
- Your return or onward ticket must be confirmed

<strong>If you need to stay longer than 30 days</strong>, or if your visit includes other purposes (study, employment, journalism), you will still need to apply for the appropriate visa type.

<strong>Note:</strong> Visa-free arrangements can change. Confirm the current status on the MFAT SafeTravel website before booking.`
    },
    {
      question: 'What documents do I need for visa-free entry to China?',
      searchIntent: 'documents needed China visa free entry',
      monthlySearches: 180,
      answer: `For visa-free entry under the 30-day exemption, you will need:

<strong>At the port of entry:</strong>
- Valid New Zealand passport (minimum 6 months validity remaining)
- Confirmed return or onward flight ticket
- Hotel confirmation or confirmed accommodation address
- Completed arrival card (provided on the flight or at the immigration hall)
- Travel insurance documentation (not mandatory at the border, but required for any visa application and strongly recommended)

<strong>Practical tip:</strong> Chinese immigration officers may ask to see your hotel booking or onward flight ticket. Have these accessible on your phone or printed. Airlines occasionally ask for these documents at check-in before allowing you to board.

<strong>If you are entering with a group tour:</strong> Your tour operator should provide you with a welcome letter confirming your accommodation details. CTS provides this as a matter of course.`
    },
    {
      question: 'What types of China visas are available if I need one?',
      searchIntent: 'types of China visa NZ',
      monthlySearches: 130,
      answer: `If your situation falls outside the visa-free exemption (stay longer than 30 days, working, studying, or repeating visits that exceed the exemption limit), the main visa types are:

<strong>L Visa (Tourist):</strong> For tourism purposes. Single or multiple entry. Most common for NZ travellers who exceed the 30-day exemption or prefer the certainty of a formal visa.

<strong>M Visa (Business):</strong> For commercial and trade activities. Not required for tourist trips that include business meetings — the L visa covers this under visa-free entry.

<strong>F Visa (Exchange/Cultural):</strong> For non-commercial activities, cultural exchanges, study visits.

<strong>X Visa (Study):</strong> For students enrolled in Chinese educational institutions.

<strong>Z Visa (Work):</strong> For those with a Chinese work permit. Complex; requires employer sponsorship.

<strong>Q Visa (Family Visit):</strong> For visiting Chinese citizens who are family members.

For most NZ travellers who need a formal visa (typically because they are staying more than 30 days), the L Tourist Visa is the appropriate type.`
    },
    {
      question: 'How do I apply for a China tourist visa from New Zealand?',
      searchIntent: 'apply China visa New Zealand',
      monthlySearches: 200,
      answer: `<strong>For a formal visa (if required beyond the 30-day exemption):</strong>

Applications are made through the Chinese Visa Application Service Centre (CVASC) in Auckland:

<strong>Address:</strong> 16–20 Arthur Street, Newmarket, Auckland 1023
<strong>Hours:</strong> Monday–Friday, 9:00am–3:00pm (submission); 9:00am–4:00pm (collection)

<strong>Required documents (standard tourist visa):</strong>
1. Completed and signed application form (available on the CVASC website)
2. Valid NZ passport (original + photocopy of data page)
3. Passport-sized photo (white background, taken within the last 6 months)
4. Confirmed return flight booking
5. Confirmed hotel bookings for the entire stay
6. Travel insurance (covering medical and evacuation)
7. Visa fee (CNY equivalent or NZD cash/card)

<strong>Processing times:</strong>
- Standard: 4 working days
- Express (3 days): additional NZD 30–40
- Rush (2 days): additional NZD 50–70

<strong>Fee (approximately):</strong> NZD 130–160 standard single-entry; NZD 180–220 multiple-entry. Fees change periodically.

<strong>Important:</strong> Do not book non-refundable flights until your visa is approved.`
    },
    {
      question: 'Can I extend my stay in China beyond 30 days on the visa-free exemption?',
      searchIntent: 'extend China stay visa free',
      monthlySearches: 110,
      answer: `<strong>No — the visa-free exemption cannot be extended from within China.</strong>

If you arrive on the 30-day visa-free exemption and wish to stay longer, you have two options:

<strong>Option 1: Leave and re-enter.</strong> Travel to Hong Kong, Macau, or another country, and re-enter China on a new 30-day exemption. Note that China's immigration authorities monitor the pattern of entries and exits, and repeated border runs may attract scrutiny. This is not a sustainable long-term solution.

<strong>Option 2: Apply for a visa before departure.</strong> If you know you will want to stay longer than 30 days, apply for an L Tourist Visa (available for 30 or 60-day stays, single or multiple entry) before leaving New Zealand. This gives you certainty and flexibility.

For most NZ holiday travellers (10–21 days), the 30-day exemption is more than sufficient, and no visa is needed.`
    },
    {
      question: 'Do I need a China visa for a layover / transit through a Chinese airport?',
      searchIntent: 'China transit visa NZ',
      monthlySearches: 120,
      answer: `<strong>For transits through mainland China airports, New Zealand passport holders qualify for the Transit Without Visa (TWOV) policy</strong> at most major international airports.

<strong>144-hour TWOV (6 days):</strong> Available at Beijing Capital, Beijing Daxing, Shanghai Pudong, Shanghai Hongqiao, Guangzhou Baiyun, Chengdu Tianfu, Chongqing, and several other airports. You can leave the airport and visit the city during your layover without a Chinese visa, as long as you have confirmed onward travel to a third country within 144 hours.

<strong>72-hour TWOV (3 days):</strong> Available at Guilin, Harbin, Kunming, and several other cities.

<strong>24-hour airside transit:</strong> Available at most other international airports. You remain in the international transit area; no visa needed.

<strong>To qualify for TWOV, you must:</strong>
- Hold a NZ passport
- Have a confirmed onward flight to a third country (not China)
- Arrive and depart through the same city (or as specified by that city's TWOV rules)

This is excellent for travellers routing through China on the way to Europe or elsewhere who want to add a short China city visit.`
    },
    {
      question: 'Is a visa required for Hong Kong and Macau?',
      searchIntent: 'Hong Kong Macau visa NZ',
      monthlySearches: 140,
      answer: `<strong>Hong Kong:</strong> New Zealand passport holders can enter Hong Kong visa-free for up to 90 days. No application or documentation beyond your passport is required.

<strong>Macau:</strong> New Zealand passport holders can enter Macau visa-free for up to 90 days.

<strong>Important:</strong> Hong Kong and Macau are Special Administrative Regions (SARs) with separate immigration systems from mainland China. <strong>Entry to Hong Kong or Macau does not count as entry to mainland China</strong>, and travel between the mainland and the SARs requires crossing a border checkpoint.

If you are including Hong Kong or Macau as part of a China trip (which many travellers do — the high-speed rail between Hong Kong and mainland China is excellent), you will need to go through Chinese immigration when entering the mainland, even if you are coming from Hong Kong.`
    },
    {
      question: 'What is China\'s health entry requirements for New Zealand travellers?',
      searchIntent: 'China health entry requirements NZ',
      monthlySearches: 90,
      answer: `As of May 2026, China has removed all COVID-19 related entry requirements. No health declaration, vaccination certificate, or pre-departure testing is required.

<strong>Standard health entry requirements:</strong>
- Yellow fever vaccination certificate: Required only if you are arriving from a yellow fever endemic country (Sub-Saharan Africa, South America). Not required for direct travel from New Zealand.
- No other vaccinations are required for entry.

<strong>Recommended vaccinations (not entry requirements):</strong>
- Hepatitis A and B
- Typhoid
- Japanese Encephalitis (if visiting rural areas)
- Tetanus/diphtheria update

Consult your GP or a travel health clinic at least 6 weeks before departure. Some vaccinations require multiple doses over several weeks.`
    }
  ],
  relatedGuides: [
    'china-visa-guide-for-new-zealanders',
    'beijing-travel-guide',
    'best-time-to-visit-china'
  ],
  relatedFaqs: [
    { slug: 'tour-planning', title: 'Tour Planning FAQ' },
    { slug: 'best-time-travel', title: 'Best Time to Travel to China' }
  ]
};

export const faqBestTimeTravel: FAQPage = {
  slug: 'best-time-travel',
  title: 'Best Time to Travel to China: Season-by-Season FAQ',
  metaDescription: 'When is the best time to visit China from New Zealand? Month-by-month weather guide, peak seasons to avoid, regional differences, and Baker Gu\'s honest recommendations for NZ travellers.',
  introText: 'China is a vast country with enormous climate variation between regions. The answer to "when should I go?" depends significantly on where you are going and what you want to do. Here is an honest, detailed guide.',
  faqs: [
    {
      question: 'What is the best overall time to visit China from New Zealand?',
      searchIntent: 'best time visit China NZ',
      monthlySearches: 280,
      answer: `<strong>Autumn (September–October) is the best overall time.</strong>

This is consistently the most recommended window for first-time visitors from New Zealand, and for good reason:

- Temperatures across most of China are comfortable: 15–28°C in Beijing, 20–30°C in Shanghai, 18–28°C in Xi'an, 18–25°C in Chengdu
- Skies are clearer than summer (lower humidity, less haze)
- Autumn colour arrives in October in Beijing and northern China
- The light for photography is excellent
- Tourism infrastructure is functioning at full capacity

<strong>The one complication:</strong> October Golden Week (October 1–7) is China's largest national holiday. Domestic travel peaks dramatically, major attractions are significantly more crowded, accommodation prices increase 30–50%, and the overall experience can be stressful. Plan to be in China either before (mid-September) or after (mid-October) this window.`
    },
    {
      question: 'What is spring like in China, and is it a good time to visit?',
      searchIntent: 'spring China travel weather',
      monthlySearches: 140,
      answer: `<strong>Spring (March–May) is the second-best season for China travel.</strong>

<strong>March:</strong> Still cool in northern China (Beijing: 5–15°C), mild in the south (Shanghai: 10–18°C, Chengdu: 12–20°C). Plum and cherry blossom appears in late March. Crowds are moderate.

<strong>April:</strong> The most universally pleasant month. Temperatures rise across all regions; flowers are at their peak in parks and gardens. Guilin's karst landscape is brilliant in the spring light. Suzhou's gardens are at their most photogenic.

<strong>May:</strong> Warm to hot in most of China (Beijing: 20–30°C, Shanghai: 22–28°C). The May Golden Week (May 1–7) creates the same crowd situation as October Golden Week — plan around it.

<strong>For NZ travellers:</strong> Spring aligns with New Zealand's autumn school holidays (late April), which creates a natural booking window. Book 4–5 months ahead for this period.`
    },
    {
      question: 'Should I avoid visiting China in summer?',
      searchIntent: 'China summer travel avoid',
      monthlySearches: 110,
      answer: `Summer (June–August) is the most challenging season for China travel, though not impossible.

<strong>The challenges:</strong>
- High temperatures throughout most of China: Beijing averages 31°C in July, Shanghai 34°C, Chengdu 30°C, with humidity making it feel hotter
- Peak domestic tourist season (Chinese school holidays), meaning significant crowds at all major attractions
- Rainy season in central and southern China (the plum rains in June affect Shanghai and the Yangtze basin)
- Air quality can be poor in northern cities during high-humidity periods

<strong>Where summer works better:</strong>
- Yunnan Province (Lijiang, Dali, Kunming) has a cooler, drier climate through summer — this is Yunnan's best season
- High-altitude areas (Tibet, Qinghai) are accessible and pleasantly cool
- Guilin's Li River is at its fullest and most impressive in summer

<strong>If you must travel in summer:</strong> July is marginally better than August (fewer domestic tourists). Focus on early morning activities before the heat peaks. Stay in accommodation with good air conditioning.`
    },
    {
      question: 'Is winter a good time to visit China?',
      searchIntent: 'China winter travel',
      monthlySearches: 130,
      answer: `<strong>Winter (November–February) is underrated for certain types of travel.</strong>

<strong>The advantages:</strong>
- Significantly fewer tourists at every major attraction
- Accommodation prices are 20–40% lower than peak season
- The Great Wall, Forbidden City, and Terracotta Warriors in winter are uncrowded and often beautiful
- Dry, clear skies in northern China produce excellent visibility

<strong>The challenges:</strong>
- Northern China (Beijing, Xi'an) is genuinely cold: Beijing averages -3°C in January, with wind chill making it feel colder. Pack accordingly.
- The Yangtze River cruise is cold and foggy in January–February; not the best time for that experience
- Chinese New Year (late January or February) is the worst possible time for tourism: enormous crowds, booked-out accommodation, very high prices, and service disruptions as many businesses close

<strong>Southern China in winter:</strong> Guilin, Yunnan, and southern Sichuan are significantly warmer. Guilin in December is 10–18°C — cool but manageable, and the limestone peaks look magnificent against clear winter skies.

<strong>Our recommendation for NZ travellers in winter:</strong> December is better than January or February. Combine Beijing (cold but uncrowded) with Guilin or Yunnan (mild weather) for a balanced trip.`
    },
    {
      question: 'Which Chinese holidays should I avoid when travelling?',
      searchIntent: 'China public holidays avoid travel',
      monthlySearches: 160,
      answer: `<strong>The three Golden Week periods cause the most significant disruption to tourist travel:</strong>

<strong>Chinese New Year (Spring Festival)</strong>
- Timing: Late January to mid-February (dates change annually based on the lunar calendar)
- Duration: Officially 7 days public holiday; travel surge extends 2–3 weeks
- Impact: WORST time to visit. 400+ million people travel simultaneously. Accommodation is fully booked and expensive. Many restaurants and services close. Domestic transport is extremely difficult to book.
- Recommendation: Avoid the entire Spring Festival period (usually 2 weeks before and 1 week after the official holiday).

<strong>May Golden Week (Labour Day)</strong>
- Timing: May 1–7
- Impact: Major crowds at all tourist sites; 20–30% price increase on accommodation. Less severe than Chinese New Year but still disruptive.
- Recommendation: Arrive before May 1 or depart before May 1. Or plan around October instead.

<strong>October Golden Week (National Day)</strong>
- Timing: October 1–7
- Impact: Similar to May Golden Week — severe crowds at major attractions, price increases, booked accommodation.
- Recommendation: Aim for mid-September (ideal autumn weather, lower crowds) or mid-October (Golden Week finished, weather still good).

<strong>For NZ school holiday alignment:</strong> The April school holidays in New Zealand (late April) align with the period just before May Golden Week. Book for late April departure and return before May 1.`
    },
    {
      question: 'What is the best time to visit Beijing specifically?',
      searchIntent: 'best time visit Beijing',
      monthlySearches: 190,
      answer: `<strong>Best months: September–October and April–May</strong>

<strong>September–October:</strong> Autumn is Beijing's finest season. Temperatures are 15–25°C, skies are clear, and the colours in the parks and hutong trees are at their peak. October 8–31 is the sweet spot: Golden Week is over, the best weather persists, and crowds have dropped.

<strong>April–May:</strong> Spring brings cherry blossoms and warm temperatures (15–25°C). The parks are beautiful. Avoid the May 1–7 Golden Week within this period.

<strong>Avoid in Beijing:</strong>
- July–August: Extremely hot (30–35°C) and humid. Air quality can be poor.
- January–February: Bitter cold (-5 to 3°C), wind, and Chinese New Year chaos.
- October 1–7: Golden Week — the Great Wall and Forbidden City are at their most crowded.`
    },
    {
      question: 'When is the best time to visit Guilin and the Li River?',
      searchIntent: 'best time visit Guilin Li River',
      monthlySearches: 120,
      answer: `<strong>Best months: April–May and September–November</strong>

Guilin's karst landscape looks different in different seasons, and each has appeal.

<strong>Spring (April–May):</strong> The Li River is full, the vegetation is intensely green, and mist frequently hangs in the karst peaks — creating the classic Chinese landscape painting atmosphere. Occasional rain enhances the mist effects. This is when Guilin looks most like the landscape paintings you have seen.

<strong>Autumn (September–November):</strong> Clear skies, comfortable temperatures (18–26°C), good visibility. Less atmospheric mist than spring, but excellent photography light. October is particularly good if you avoid the Golden Week window.

<strong>Summer (June–August):</strong> Hot and humid (30–35°C). The Li River is at its fullest — good for boat cruises. Occasional flooding can affect low-lying areas. Not the most comfortable weather for walking, but the landscape is dramatically green.

<strong>Winter (December–February):</strong> Cool (7–15°C), clear, and very uncrowded. The limestone peaks look striking against winter skies. The Li River cruise is still beautiful but can be cold on the water.`
    },
    {
      question: 'What is the weather like on a Yangtze River cruise?',
      searchIntent: 'Yangtze River cruise weather',
      monthlySearches: 80,
      answer: `The Yangtze River cruise (Chongqing to Yichang through the Three Gorges) runs year-round, but weather conditions vary significantly.

<strong>Best season: March–May and September–November</strong>

<strong>Spring (March–May):</strong> Temperatures 15–25°C. The gorge walls are intensely green. Morning mist in the gorges creates atmospheric views. Some rain. Comfortable and scenic — our recommended season.

<strong>Autumn (September–November):</strong> Clear, comfortable, 15–25°C. Excellent visibility in the gorges. The surrounding hills begin changing colour in late October. Second-best season.

<strong>Summer (June–August):</strong> Hot and humid (28–35°C). The river is at its highest, which maximises the water volume visible in the gorges. Air conditioning is essential on the cruise ship.

<strong>Winter (December–February):</strong> Cold (5–15°C) and frequently foggy. The mist can make gorge views beautiful but can also obscure them entirely for hours at a time. Not our first recommendation, but the uncrowded ships and lower prices attract some travellers.`
    },
    {
      question: 'When is the best time to visit Yunnan Province?',
      searchIntent: 'best time visit Yunnan',
      monthlySearches: 100,
      answer: `<strong>Yunnan is one of China's most year-round-friendly destinations.</strong>

Yunnan's high altitude (Lijiang is at 2,400m, Shangri-La at 3,300m) moderates temperatures year-round, and its position on the Tropic of Cancer gives it a subtropical climate tempered by elevation.

<strong>Best: October–April (dry season)</strong>
Clear skies, comfortable temperatures in Lijiang (15–22°C in October), excellent visibility for mountain views. The dry season is definitively Yunnan's best travel period.

<strong>Summer (June–August):</strong> Yunnan's monsoon season — afternoon rain is common in most of the province. The landscapes are intensely green and the flowers (rhododendrons at altitude, rice terraces lower down) are at their most dramatic. Not as good for photography as the dry season, but perfectly manageable with an early-morning activity schedule.

<strong>Avoid in Yunnan:</strong> There is no truly bad time to visit Yunnan, which makes it an excellent supplement to a wider China trip at almost any time of year.`
    },
    {
      question: 'How does the weather in China compare to New Zealand?',
      searchIntent: 'China weather vs New Zealand',
      monthlySearches: 70,
      answer: `NZ travellers often underestimate how different China's climate can be from New Zealand's relatively mild, oceanic weather.

<strong>Key differences:</strong>

<strong>More extreme temperatures:</strong> Beijing's summer highs (35°C) and winter lows (-10°C) significantly exceed anything most New Zealanders experience. Chongqing and Wuhan are among the hottest cities in China in summer ("furnace cities" in Chinese). Even Shanghai gets properly cold in winter (3–5°C with wind).

<strong>Humidity:</strong> China's east coast in summer is far more humid than New Zealand. A 30°C day in Shanghai with 80% humidity feels very different from a 30°C day in Auckland. Air conditioning is essential, not optional.

<strong>Air quality:</strong> Northern China (Beijing, Xi'an) can experience poor air quality, particularly in winter (coal heating season) and during wind events that bring desert dust from Inner Mongolia. Download the AirVisual app to monitor before outdoor activities.

<strong>Practical implications:</strong>
- Bring more layers than you think you need in autumn/winter
- Bring fewer layers and prioritise moisture-wicking fabrics in summer
- Budget for air conditioning in accommodation — this is worth paying for in summer

For Beijing in October: pack as you would for a Wellington September — layers, a light jacket, and the possibility of warm sunny afternoons.`
    }
  ],
  relatedGuides: [
    'best-time-to-visit-china',
    'beijing-travel-guide',
    'guilin-travel-guide'
  ],
  relatedFaqs: [
    { slug: 'tour-planning', title: 'Tour Planning FAQ' },
    { slug: 'visa-requirements', title: 'China Visa Requirements FAQ' }
  ]
};

/**
 * Tier 2: Secondary FAQ Pages (implement June-July)
 * Target: 100+ monthly searches, <30 keyword difficulty
 */

// Placeholder for Tier 2 expansion
// Coming soon:
// - faqDestinationSpecificGuides (Shanghai, Xi'an, Chengdu, Guilin)
// - faqBudgetAndCosts
// - faqTransport
// - faqAccommodation
