import { Metadata } from 'next';
import Link from 'next/link';

// 静态旅游产品数据
const tours = [
  {
    id: 1,
    title: 'Imperial China Tour',
    slug: 'imperial-china-tour',
    description: 'Explore the imperial history of China with visits to Beijing, Xi\'an, and Shanghai. Small groups, premium hotels, deeper access, and expert-led experiences.',
    duration: '12 Days',
    price: 'From $3,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20imperial%20tour%20historical%20sites&image_size=landscape_16_9',
    isPremium: true,
    itinerary: [
      'Day 1: Arrival in Beijing',
      'Day 2: Forbidden City and Tiananmen Square',
      'Day 3: Great Wall of China',
      'Day 4: Summer Palace and Hutong Tour',
      'Day 5: Flight to Xi\'an',
      'Day 6: Terracotta Army',
      'Day 7: Ancient City Wall and Muslim Quarter',
      'Day 8: Flight to Shanghai',
      'Day 9: The Bund and Yu Garden',
      'Day 10: Shanghai Urban Exploration',
      'Day 11: Zhujiajiao Water Town',
      'Day 12: Departure'
    ],
    inclusions: [
      'Accommodation in 5-star hotels',
      'All meals as specified in itinerary',
      'Private transportation',
      'Expert English-speaking guide',
      'Entrance fees to all attractions',
      'Domestic flights'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Travel insurance'
    ]
  },
  {
    id: 2,
    title: 'Yangtze River Cruise',
    slug: 'yangtze-river-cruise',
    description: 'Experience the majesty of the Yangtze River with a luxury cruise. Small groups, premium accommodations, deeper access, and expert-led experiences.',
    duration: '7 Days',
    price: 'From $2,499',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangtze%20River%20cruise%20luxury%20ship&image_size=landscape_16_9',
    isPremium: true,
    itinerary: [
      'Day 1: Arrival in Chongqing',
      'Day 2: Board cruise ship',
      'Day 3: Yangtze Gorges',
      'Day 4: Three Gorges Dam',
      'Day 5: Lesser Three Gorges',
      'Day 6: Arrival in Yichang',
      'Day 7: Departure'
    ],
    inclusions: [
      'Cruise accommodation',
      'All meals on board',
      'Shore excursions',
      'Expert guide',
      'Transfers'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Travel insurance'
    ]
  },
  {
    id: 3,
    title: 'Cultural China Immersion',
    slug: 'cultural-china-immersion',
    description: 'Immerse yourself in Chinese culture with visits to traditional villages, local markets, and cultural performances. Small groups, premium hotels, deeper access, and expert-led experiences.',
    duration: '10 Days',
    price: 'From $3,299',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20cultural%20immersion%20traditional%20village&image_size=landscape_16_9',
    isPremium: true,
    itinerary: [
      'Day 1: Arrival in Beijing',
      'Day 2: Cultural workshop',
      'Day 3: Visit to traditional village',
      'Day 4: Flight to Chengdu',
      'Day 5: Panda research center',
      'Day 6: Sichuan opera performance',
      'Day 7: Flight to Hangzhou',
      'Day 8: West Lake and tea ceremony',
      'Day 9: Traditional silk workshop',
      'Day 10: Departure'
    ],
    inclusions: [
      'Accommodation in 4-star hotels',
      'All meals as specified',
      'Private transportation',
      'Expert guide',
      'Cultural workshops'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Travel insurance'
    ]
  },
  {
    id: 4,
    title: 'Classic China Experience',
    slug: 'classic-china-experience',
    description: 'A comprehensive tour covering the best of China\'s cultural and natural highlights. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '10 Days',
    price: 'From $2,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20classic%20tour%20cultural%20highlights&image_size=landscape_16_9',
    isPremium: false,
    itinerary: [
      'Day 1: Arrival in Beijing',
      'Day 2: Forbidden City',
      'Day 3: Great Wall',
      'Day 4: Flight to Xi\'an',
      'Day 5: Terracotta Army',
      'Day 6: Flight to Shanghai',
      'Day 7: The Bund and Yu Garden',
      'Day 8: Zhujiajiao Water Town',
      'Day 9: Free day',
      'Day 10: Departure'
    ],
    inclusions: [
      'Accommodation in 3-4 star hotels',
      'Breakfast daily',
      'Group transportation',
      'English-speaking guide',
      'Entrance fees'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ]
  },
  {
    id: 5,
    title: 'China Discovery Tour',
    slug: 'china-discovery-tour',
    description: 'A perfect introduction to China\'s top destinations. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '8 Days',
    price: 'From $2,199',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20discovery%20tour%20popular%20destinations&image_size=landscape_16_9',
    isPremium: false,
    itinerary: [
      'Day 1: Arrival in Beijing',
      'Day 2: Forbidden City and Tiananmen',
      'Day 3: Great Wall',
      'Day 4: Flight to Shanghai',
      'Day 5: The Bund and Yu Garden',
      'Day 6: Shanghai Urban Tour',
      'Day 7: Free day',
      'Day 8: Departure'
    ],
    inclusions: [
      'Accommodation in 3-star hotels',
      'Breakfast daily',
      'Group transportation',
      'English-speaking guide',
      'Entrance fees'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ]
  },
  {
    id: 6,
    title: 'Essential China',
    slug: 'essential-china',
    description: 'Experience the essential highlights of China in a concise itinerary. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '7 Days',
    price: 'From $1,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20essential%20highlights%20tour&image_size=landscape_16_9',
    isPremium: false,
    itinerary: [
      'Day 1: Arrival in Beijing',
      'Day 2: Forbidden City',
      'Day 3: Great Wall',
      'Day 4: Flight to Xi\'an',
      'Day 5: Terracotta Army',
      'Day 6: Flight to Shanghai',
      'Day 7: Departure'
    ],
    inclusions: [
      'Accommodation in 3-star hotels',
      'Breakfast daily',
      'Group transportation',
      'English-speaking guide',
      'Entrance fees'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ]
  }
];

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  isPremium: boolean;
  itinerary: string[];
  inclusions: string[];
  exclusions: string[];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = tours.find((tour) => tour.slug === params.slug);
  
  if (!tour) {
    return {
      title: 'Tour Not Found - CTS Tours',
      description: 'The tour you are looking for does not exist.',
    };
  }

  return {
    title: `${tour.title} - CTS Tours`,
    description: tour.description,
    keywords: ['China tour', tour.title, 'CTS Tours'],
    openGraph: {
      title: `${tour.title} - CTS Tours`,
      description: tour.description,
      type: 'website',
      images: [
        {
          url: tour.image_url,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
  };
}

const TourDetailPage = ({ params }: { params: { slug: string } }) => {
  const tour = tours.find((tour) => tour.slug === params.slug);

  if (!tour) {
    return (
      <div className="section bg-white">
        <div className="container text-center py-20">
          <h1 className="text-3xl font-bold mb-4 font-serif">Tour Not Found</h1>
          <p className="text-lg mb-8">The tour you are looking for does not exist.</p>
          <Link href="/tours" className="btn-primary">
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero 区域 */}
      <section className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={tour.image_url} 
            alt={tour.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{tour.title}</h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-4">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.price}
            </span>
            {tour.isPremium && (
              <span className="px-4 py-1 bg-secondary text-primary rounded-full text-sm font-semibold">
                Premium
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 旅游详情 */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/tours" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tours
            </Link>
          </div>

          {/* 描述 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 font-serif">About This Tour</h2>
            <p className="text-gray-600 leading-relaxed">{tour.description}</p>
          </div>

          {/* 行程安排 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 font-serif">Itinerary</h2>
            <div className="space-y-4">
              {tour.itinerary.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 包含内容 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 font-serif">Inclusions</h2>
              <ul className="space-y-2">
                {tour.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 font-serif">Exclusions</h2>
              <ul className="space-y-2">
                {tour.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 预订按钮 */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <h2 className="text-2xl font-semibold mb-6 font-serif">Ready to Book?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className={tour.isPremium ? "btn-primary" : "btn-secondary"}
              >
                Contact Us to Book
              </Link>
              <Link 
                href="/contact" 
                className="btn-outline"
              >
                Request More Information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetailPage;