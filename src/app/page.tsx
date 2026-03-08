import { Metadata } from 'next';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import FeatureCard from '@/components/FeatureCard';
import ExpertHighlight from '@/components/ExpertHighlight';
import DestinationCard from '@/components/DestinationCard';
import TourTierCard from '@/components/TourTierCard';
import ArticleCard from '@/components/ArticleCard';
import CTASection from '@/components/CTASection';
import GeoRecommendations from '@/components/GeoRecommendations';

export const metadata: Metadata = {
  title: 'CTS Tours | China Travel Specialists',
  description: 'Discover China with specialists who combine heritage, direct operations and authentic access for New Zealand travellers.',
  keywords: ['China travel', 'China tours', 'China specialists', 'New Zealand', 'CTS Tours', 'Great Wall', 'Beijing', 'Shanghai'],
  openGraph: {
    title: 'CTS Tours | China Travel Specialists',
    description: 'Discover China with specialists who combine heritage, direct operations and authentic access for New Zealand travellers.',
    type: 'website',
  },
};

const HomePage = () => {
  // 静态数据
  const destinations = [
    { name: 'Beijing', description: 'Home to the Great Wall and Forbidden City', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20Forbidden%20City%20historic%20architecture&image_size=landscape_16_9' },
    { name: 'Xi\'an', description: 'Home to the Terracotta Army and ancient city walls', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xian%20Terracotta%20Army%20historical%20site&image_size=landscape_16_9' },
    { name: 'Shanghai', description: 'A modern metropolis with skyscrapers and historical landmarks', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20skyline%20modern%20city&image_size=landscape_16_9' },
    { name: 'Chengdu', description: 'Famous for pandas and Sichuan cuisine', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20panda%20research%20center&image_size=landscape_16_9' },
    { name: 'Guilin', description: 'Famous for its karst mountains and Li River scenery', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guilin%20Li%20River%20karst%20mountains&image_size=landscape_16_9' },
    { name: 'Zhangjiajie', description: 'Inspiration for Avatar\'s floating mountains', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhangjiajie%20floating%20mountains%20scenic&image_size=landscape_16_9' },
  ];

  const articles = [
    { title: 'Best Time to Visit China', content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery.', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20spring%20cherry%20blossoms&image_size=landscape_16_9', slug: 'best-time-to-visit-china' },
    { title: 'China Visa Guide for New Zealanders', content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip.', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20visa%20application%20process&image_size=landscape_16_9', slug: 'china-visa-guide-for-new-zealanders' },
    { title: 'Is China Safe to Travel?', content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions.', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20safe%20travel%20tourist%20friendly&image_size=landscape_16_9', slug: 'is-china-safe-to-travel' },
  ];

  return (
    <div>
      {/* 1. Navbar */}
      {/* Navbar is included in layout.tsx */}

      {/* 2. Hero 区 */}
      <Hero />

      {/* 3. Why CTS */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle title="Why CTS" center />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="China Specialists"
              description="Expert knowledge and experience in Chinese travel"
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="98 Years Heritage"
              description="Decades of experience in providing quality travel services"
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Direct Operations"
              description="Local presence in China for seamless travel experiences"
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Authentic Access"
              description="Unique experiences and insider access to Chinese culture"
            />
          </div>
        </div>
      </section>

      {/* 4. Baker Gu 专家模块 */}
      <ExpertHighlight 
        name="Baker Gu"
        title="China Travel Specialist"
        description="With over 20 years of experience in the Chinese travel industry, Baker Gu is our lead specialist. His deep knowledge of China's culture, history, and hidden gems ensures that our clients receive authentic and unforgettable travel experiences."
        fullDescription="Baker has traveled extensively throughout China, from the bustling cities to remote villages, building relationships with local communities and gaining insider access to unique experiences. As our lead specialist, Baker designs our most exclusive tours, ensuring that every detail is carefully crafted to provide the best possible experience for our clients."
        image_url="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20Chinese%20travel%20expert%20portrait%20in%20traditional%20attire%20elegant%20photography&image_size=portrait_4_3"
      />

      {/* 5. Explore China */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Discover" title="Explore China" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard 
                key={index}
                name={destination.name}
                description={destination.description}
                image_url={destination.image_url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Two Product Tiers */}
      <section className="section bg-light">
        <div className="container">
          <SectionTitle subtitle="Our Tours" title="Product Tiers" center />
          
          {/* Premium China Journeys */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">Premium China Journeys</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TourTierCard 
                title="Imperial China Tour"
                description="Explore the imperial history of China with visits to Beijing, Xi'an, and Shanghai. Small groups, premium hotels, deeper access, and expert-led experiences."
                duration="12 Days"
                price="From $3,999"
                image_url="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20imperial%20tour%20historical%20sites&image_size=landscape_16_9"
                slug="imperial-china-tour"
                isPremium
              />
              <TourTierCard 
                title="Yangtze River Cruise"
                description="Experience the majesty of the Yangtze River with a luxury cruise. Small groups, premium accommodations, deeper access, and expert-led experiences."
                duration="7 Days"
                price="From $2,499"
                image_url="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangtze%20River%20cruise%20luxury%20ship&image_size=landscape_16_9"
                slug="yangtze-river-cruise"
                isPremium
              />
            </div>
          </div>
          
          {/* Value China Discovery */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">Value China Discovery</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TourTierCard 
                title="Classic China Experience"
                description="A comprehensive tour covering the best of China's cultural and natural highlights. Carefully designed itineraries, excellent value, and quality essential experiences."
                duration="10 Days"
                price="From $2,999"
                image_url="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20classic%20tour%20cultural%20highlights&image_size=landscape_16_9"
                slug="classic-china-experience"
              />
              <TourTierCard 
                title="China Discovery Tour"
                description="A perfect introduction to China's top destinations. Carefully designed itineraries, excellent value, and quality essential experiences."
                duration="8 Days"
                price="From $2,199"
                image_url="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20discovery%20tour%20popular%20destinations&image_size=landscape_16_9"
                slug="china-discovery-tour"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Personalized Recommendations */}
      <GeoRecommendations />

      {/* 8. China Travel Guide */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Resources" title="China Travel Guide" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard 
                key={index}
                title={article.title}
                content={article.content}
                image_url={article.image_url}
                slug={article.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Heritage / Proof 模块 */}
      <section className="section bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="container text-center relative z-10">
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-4">Legacy</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Backed by Nearly a Century of China Travel Expertise</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          </div>
          <p className="text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            CTS is part of China Travel Service heritage, established in 1928 with direct operational depth across China. 
            This is proof of capability, not just background.
          </p>
          <div className="flex justify-center">
            <a href="/about" className="btn-secondary bg-white text-primary hover:bg-gray-50 text-lg py-4 px-8">Learn Our Story</a>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <CTASection 
        title="Plan Your China Journey"
        description="Let our China specialists create a tailor-made itinerary for your perfect journey."
        primaryButtonText="Contact CTS"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Tours"
        secondaryButtonLink="/tours"
      />

      {/* 10. Footer */}
      {/* Footer is included in layout.tsx */}
    </div>
  );
};

export default HomePage;