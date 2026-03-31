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
import Testimonials from '@/components/Testimonials';
import { getTourBySlug } from '@/lib/data/tours';

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
  const destinations = [
    { name: 'Beijing', slug: 'beijing', description: 'Home to the Great Wall and Forbidden City', image_url: '/images/tours/forbidden-city-aerial.jpg' },
    { name: 'Xi\'an', slug: 'xian', description: 'Home to the Terracotta Army and ancient city walls', image_url: '/images/tours/xian-terracotta.jpg' },
    { name: 'Shanghai', slug: 'shanghai', description: 'A modern metropolis with skyscrapers and historical landmarks', image_url: '/images/tours/shanghai-skyline.jpg' },
    { name: 'Chengdu', slug: 'chengdu', description: 'Famous for pandas and Sichuan cuisine', image_url: '/images/tours/chengdu-pandas.jpg' },
    { name: 'Guilin', slug: 'guilin', description: 'Famous for its karst mountains and Li River scenery', image_url: '/images/tours/guilin-mist.jpg' },
    { name: 'Zhangjiajie', slug: 'zhangjiajie', description: 'Inspiration for Avatar\'s floating mountains', image_url: '/images/tours/zhangjiajie.jpg' },
  ];

  const articles = [
    { title: 'Best Time to Visit China', content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery.', image_url: '/images/tours/great-wall-green.jpg', slug: 'best-time-to-visit-china' },
    { title: 'China Visa Guide for New Zealanders', content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip.', image_url: '/images/tours/forbidden-city-aerial.jpg', slug: 'china-visa-guide-for-new-zealanders' },
    { title: 'Is China Safe to Travel?', content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions.', image_url: '/images/tours/shanghai-night-blue.jpg', slug: 'is-china-safe-to-travel' },
  ];

  return (
    <div>
      {/* Hero with Search */}
      <Hero />

      {/* Why CTS - warmer styling */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-light">
        <div className="container mx-auto px-4">
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

      {/* Baker Gu Expert */}
      <ExpertHighlight
        name="Baker Gu"
        title="China Travel Specialist"
        description="With over 20 years of experience in the Chinese travel industry, Baker Gu is our lead specialist. His deep knowledge of China's culture, history, and hidden gems ensures that our clients receive authentic and unforgettable travel experiences."
        fullDescription="Baker has traveled extensively throughout China, from the bustling cities to remote villages, building relationships with local communities and gaining insider access to unique experiences. As our lead specialist, Baker designs our most exclusive tours, ensuring that every detail is carefully crafted to provide the best possible experience for our clients."
        image_url="/images/baker-gu-portrait.jpg"
      />

      {/* Explore China */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Discover" title="Explore China" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={index}
                name={destination.name}
                slug={destination.slug}
                description={destination.description}
                image_url={destination.image_url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="py-20 md:py-28 bg-light">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Our Tours" title="Product Tiers" center />

          {/* China Signature */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">China Signature</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(() => { const t = getTourBySlug('china', 'signature', 'imperial-heritage'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="signature" isPremium />
              ) : null; })()}
              {(() => { const t = getTourBySlug('china', 'signature', 'grand-tour'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="signature" isPremium />
              ) : null; })()}
            </div>
          </div>

          {/* China Discovery */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold font-serif">China Discovery</h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(() => { const t = getTourBySlug('china', 'discovery', 'beijing-shanghai'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="discovery" />
              ) : null; })()}
              {(() => { const t = getTourBySlug('china', 'discovery', 'highlights'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="discovery" />
              ) : null; })()}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Personalized Recommendations */}
      <GeoRecommendations />

      {/* China Travel Guide */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
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

      {/* Heritage / Proof */}
      <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
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

      {/* CTA */}
      <CTASection
        title="Plan Your China Journey"
        description="Let our China specialists create a tailor-made itinerary for your perfect journey."
        primaryButtonText="Tailor My Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Explore Tours"
        secondaryButtonLink="/tours"
      />
    </div>
  );
};

export default HomePage;
