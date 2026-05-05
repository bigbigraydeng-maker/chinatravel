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
 * Tier 2: Secondary FAQ Pages (implement June-July)
 * Target: 100+ monthly searches, <30 keyword difficulty
 */

// Placeholder for Tier 2 expansion
// Coming soon:
// - faqDestinationSpecificGuides (Shanghai, Xi'an, Chengdu, Guilin)
// - faqBudgetAndCosts
// - faqTransport
// - faqAccommodation
