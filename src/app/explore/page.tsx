import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

// 静态目的地数据
const destinations = [
  { id: 1, slug: 'beijing', name: 'Beijing', description: 'Home to the Great Wall and Forbidden City', image_url: '/images/tours/forbidden-city-aerial.jpg' },
  { id: 2, slug: 'xian', name: 'Xi\'an', description: 'Home to the Terracotta Army and ancient city walls', image_url: '/images/tours/xian-terracotta.jpg' },
  { id: 3, slug: 'shanghai', name: 'Shanghai', description: 'A modern metropolis with skyscrapers and historical landmarks', image_url: '/images/tours/shanghai-skyline.jpg' },
  { id: 4, slug: 'chengdu', name: 'Chengdu', description: 'Famous for pandas and Sichuan cuisine', image_url: '/images/tours/chengdu-pandas.jpg' },
  { id: 5, slug: 'guilin', name: 'Guilin', description: 'Famous for its karst mountains and Li River scenery', image_url: '/images/tours/guilin-mist.jpg' },
  { id: 6, slug: 'zhangjiajie', name: 'Zhangjiajie', description: 'Inspiration for Avatar\'s floating mountains', image_url: '/images/tours/zhangjiajie.jpg' },
  { id: 7, slug: 'lhasa', name: 'Lhasa', description: 'Home to the Potala Palace and Tibetan culture', image_url: '/images/tours/shangri-la-monastery-lake.jpg' },
  { id: 8, slug: 'hangzhou', name: 'Hangzhou', description: 'Famous for West Lake and traditional Chinese gardens', image_url: '/images/tours/suzhou-canal.jpg' },
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
          <Image
            src="/images/tours/great-wall-cloud-sea.jpg"
            alt="China Landscapes"
            fill
            sizes="100vw"
            priority
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
                <div className="relative h-64 overflow-hidden rounded-lg shadow-md mb-4">
                  <Image
                    src={destination.image_url}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-serif">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Link href={`/explore/${destination.slug}`} className="text-primary hover:underline inline-flex items-center gap-2">
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