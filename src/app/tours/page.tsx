import { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

// 静态旅游产品数据
const premiumTours = [
  {
    id: 1,
    title: 'Imperial China Tour',
    slug: 'imperial-china-tour',
    description: 'Explore the imperial history of China with visits to Beijing, Xi\'an, and Shanghai. Small groups, premium hotels, deeper access, and expert-led experiences.',
    duration: '12 Days',
    price: 'From $3,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20imperial%20tour%20historical%20sites&image_size=landscape_16_9'
  },
  {
    id: 2,
    title: 'Yangtze River Cruise',
    slug: 'yangtze-river-cruise',
    description: 'Experience the majesty of the Yangtze River with a luxury cruise. Small groups, premium accommodations, deeper access, and expert-led experiences.',
    duration: '7 Days',
    price: 'From $2,499',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangtze%20River%20cruise%20luxury%20ship&image_size=landscape_16_9'
  },
  {
    id: 3,
    title: 'Cultural China Immersion',
    slug: 'cultural-china-immersion',
    description: 'Immerse yourself in Chinese culture with visits to traditional villages, local markets, and cultural performances. Small groups, premium hotels, deeper access, and expert-led experiences.',
    duration: '10 Days',
    price: 'From $3,299',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20cultural%20immersion%20traditional%20village&image_size=landscape_16_9'
  }
];

const valueTours = [
  {
    id: 1,
    title: 'Classic China Experience',
    slug: 'classic-china-experience',
    description: 'A comprehensive tour covering the best of China\'s cultural and natural highlights. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '10 Days',
    price: 'From $2,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20classic%20tour%20cultural%20highlights&image_size=landscape_16_9'
  },
  {
    id: 2,
    title: 'China Discovery Tour',
    slug: 'china-discovery-tour',
    description: 'A perfect introduction to China\'s top destinations. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '8 Days',
    price: 'From $2,199',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20discovery%20tour%20popular%20destinations&image_size=landscape_16_9'
  },
  {
    id: 3,
    title: 'Essential China',
    slug: 'essential-china',
    description: 'Experience the essential highlights of China in a concise itinerary. Carefully designed itineraries, excellent value, and quality essential experiences.',
    duration: '7 Days',
    price: 'From $1,999',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20essential%20highlights%20tour&image_size=landscape_16_9'
  }
];

export const metadata: Metadata = {
  title: 'China Tours - CTS Tours',
  description: 'Explore our carefully curated collection of China tours, from premium journeys to value discoveries.',
  keywords: ['China tours', 'China travel packages', 'Premium China tours', 'Value China tours', 'CTS Tours'],
  openGraph: {
    title: 'China Tours - CTS Tours',
    description: 'Explore our carefully curated collection of China tours, from premium journeys to value discoveries.',
    type: 'website',
  },
};

const ToursPage = () => {
  return (
    <div>
      {/* Hero 小头图 */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20tourism%20landscape%20professional%20photography&image_size=landscape_16_9" 
            alt="China Tours" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">China Tours</h1>
          <p className="text-lg">Explore our carefully curated collection of China tours</p>
        </div>
      </section>

      {/* 产品层级展示 */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle title="Our Tour Collections" center />
          
          {/* Premium China Journeys */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">Premium China Journeys</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumTours.map((tour) => (
                <Link 
                  key={tour.id} 
                  href={`/tours/${tour.slug}`}
                  className="block card group"
                >
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={tour.image_url} 
                      alt={tour.title} 
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{tour.title}</h4>
                    <p className="text-gray-600 mb-6">{tour.description}</p>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tour.duration}
                      </span>
                      <span className="text-primary font-semibold">{tour.price}</span>
                    </div>
                    <div className="btn-primary inline-block w-full text-center group-hover:bg-primary/95 transition-colors">View Details</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Value China Discovery */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">Value China Discovery</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueTours.map((tour) => (
                <Link 
                  key={tour.id} 
                  href={`/tours/${tour.slug}`}
                  className="block card group"
                >
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={tour.image_url} 
                      alt={tour.title} 
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{tour.title}</h4>
                    <p className="text-gray-600 mb-6">{tour.description}</p>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tour.duration}
                      </span>
                      <span className="text-primary font-semibold">{tour.price}</span>
                    </div>
                    <div className="btn-secondary inline-block w-full text-center group-hover:bg-primary/10 transition-colors">View Details</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;