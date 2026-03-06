import { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

// 静态目的地数据
const destinations = [
  { 
    id: 1, 
    name: 'Beijing', 
    description: 'Home to the Great Wall and Forbidden City', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20Forbidden%20City%20historic%20architecture&image_size=landscape_16_9' 
  },
  { 
    id: 2, 
    name: 'Xi\'an', 
    description: 'Home to the Terracotta Army and ancient city walls', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xian%20Terracotta%20Army%20historical%20site&image_size=landscape_16_9' 
  },
  { 
    id: 3, 
    name: 'Shanghai', 
    description: 'A modern metropolis with skyscrapers and historical landmarks', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20skyline%20modern%20city&image_size=landscape_16_9' 
  },
  { 
    id: 4, 
    name: 'Chengdu', 
    description: 'Famous for pandas and Sichuan cuisine', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20panda%20research%20center&image_size=landscape_16_9' 
  },
  { 
    id: 5, 
    name: 'Guilin', 
    description: 'Famous for its karst mountains and Li River scenery', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guilin%20Li%20River%20karst%20mountains&image_size=landscape_16_9' 
  },
  { 
    id: 6, 
    name: 'Zhangjiajie', 
    description: 'Inspiration for Avatar\'s floating mountains', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhangjiajie%20floating%20mountains%20scenic&image_size=landscape_16_9' 
  },
  { 
    id: 7, 
    name: 'Lhasa', 
    description: 'Home to the Potala Palace and Tibetan culture', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lhasa%20Potala%20Palace%20Tibetan%20culture&image_size=landscape_16_9' 
  },
  { 
    id: 8, 
    name: 'Hangzhou', 
    description: 'Famous for West Lake and traditional Chinese gardens', 
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hangzhou%20West%20Lake%20traditional%20garden&image_size=landscape_16_9' 
  },
];

export const metadata: Metadata = {
  title: 'Explore China - CTS Tours',
  description: 'Discover the diverse landscapes, rich history, and vibrant culture of China with our expert-guided tours.',
  keywords: ['China destinations', 'Explore China', 'China travel', 'CTS Tours'],
  openGraph: {
    title: 'Explore China - CTS Tours',
    description: 'Discover the diverse landscapes, rich history, and vibrant culture of China with our expert-guided tours.',
    type: 'website',
  },
};

const ExplorePage = () => {
  return (
    <div>
      {/* Hero 小头图 */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20scenic%20landscape%20panorama%20professional%20photography&image_size=landscape_16_9" 
            alt="China Landscapes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Explore China</h1>
          <p className="text-lg">Discover the diverse landscapes, rich history, and vibrant culture of China</p>
        </div>
      </section>

      {/* 目的地卡片网格 */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Destinations" title="Explore Our China Destinations" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="group">
                <div className="overflow-hidden rounded-lg shadow-md mb-4">
                  <img 
                    src={destination.image_url} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-serif">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Link href="#" className="text-primary hover:underline inline-flex items-center gap-2">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;