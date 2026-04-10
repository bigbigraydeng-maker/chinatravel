import { Metadata } from 'next';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import FeatureCard from '@/components/FeatureCard';
import ExpertHighlight from '@/components/ExpertHighlight';
import DestinationCard from '@/components/DestinationCard';
import TourTierCard from '@/components/TourTierCard';
import ArticleCard from '@/components/ArticleCard';
import CTASection from '@/components/CTASection';
import StatsCounter from '@/components/StatsCounter';
import GeoRecommendations from '@/components/GeoRecommendations';
import Testimonials from '@/components/Testimonials';
import { getTourBySlug } from '@/lib/data/tours';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'CTS Tours | China Travel Specialists for New Zealanders',
    description:
      'Discover authentic China with CTS Tours, New Zealand\'s China travel specialists since 1928. Expert-led small groups, direct China operations, and immersive itineraries from NZD $875.',
    path: '/',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'Great Wall of China mist, CTS Tours',
    keywords: [
      'China tours New Zealand',
      'China travel specialists',
      'CTS Tours',
      'Beijing tours',
      'Shanghai tours',
      'luxury China travel',
      'small group China tours',
    ],
    ogType: 'website',
    openGraphTitle: 'CTS Tours | China Travel Specialists for New Zealanders',
    openGraphDescription:
      'Discover authentic China with CTS Tours, New Zealand\'s China travel specialists since 1928. Expert-led small groups, direct China operations, and immersive itineraries.',
    openGraphSiteName: 'CTS Tours — China Travel Specialists',
  });
}

const HomePage = () => {
  const destinations = [
    { name: 'Beijing', slug: 'beijing', description: 'Home to the Great Wall and Forbidden City', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg' },
    { name: 'Xi\'an', slug: 'xian', description: 'Home to the Terracotta Army and ancient city walls', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg' },
    { name: 'Shanghai', slug: 'shanghai', description: 'A modern metropolis with skyscrapers and historical landmarks', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-skyline.jpg' },
    { name: 'Chengdu', slug: 'chengdu', description: 'Famous for pandas and Sichuan cuisine', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg' },
    { name: 'Guilin', slug: 'guilin', description: 'Famous for its karst mountains and Li River scenery', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/guilin-mist.jpg' },
    { name: 'Zhangjiajie', slug: 'zhangjiajie', description: 'Inspiration for Avatar\'s floating mountains', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg' },
  ];

  const articles = [
    { title: 'Best Time to Visit China', content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery.', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-green.jpg', slug: 'best-time-to-visit-china' },
    { title: 'China Visa Guide for New Zealanders', content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip.', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg', slug: 'china-visa-guide-for-new-zealanders' },
    { title: 'Is China Safe to Travel?', content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions.', image_url: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-night-blue.jpg', slug: 'is-china-safe-to-travel' },
  ];

  return (
    <div>
      {/* Hero with Search */}
      <Hero />

      {/* Stats Counter — immediate impact */}
      <StatsCounter />

      {/* Why CTS */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-warm-50 via-white to-warm-50/30 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/8 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
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
              description="We don't just know China — we live it. Our team has spent years on the ground so you don't miss a thing."
            />
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="98 Years in China"
              description="Founded in 1928, we've been taking travellers to China longer than most airlines have existed."
            />
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Direct Operations"
              description="Our own offices and guides in China mean no middlemen, no surprises — just seamless travel from day one."
            />
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Authentic Access"
              description="Small groups, local guides, off-the-beaten-track stops. The China that most tourists never get to see."
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

      {/* Explore China — vibrant section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-warm-50/30 to-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-100/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-20 right-0 w-40 h-40 bg-sky-100/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-warm-50 via-warm-100/30 to-warm-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Our Tours" title="Choose Your Journey" center />

          {/* China Signature */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-5 py-2 rounded-full uppercase tracking-wider">
                Signature
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-200 to-transparent rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(() => { const t = getTourBySlug('china', 'signature', 'imperial-heritage'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="signature" isPremium route={['Beijing', "Xi'an", 'Guilin', 'Shanghai']} />
              ) : null; })()}
              {(() => { const t = getTourBySlug('china', 'signature', 'grand-tour'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="signature" isPremium route={['Beijing', "Xi'an", 'Chengdu', 'Guilin', 'Shanghai']} />
              ) : null; })()}
            </div>
          </div>

          {/* China Discovery */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full uppercase tracking-wider">
                Discovery
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-200 to-transparent rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(() => { const t = getTourBySlug('china', 'discovery', 'beijing-shanghai'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="discovery" route={['Beijing', 'Shanghai']} />
              ) : null; })()}
              {(() => { const t = getTourBySlug('china', 'discovery', 'essentials'); return t ? (
              <TourTierCard title={t.name} description={t.shortDescription} duration={t.duration} price={t.price} image_url={t.heroImage} slug={t.slug} tier="discovery" route={["Beijing", "Xi'an", 'Shanghai']} />
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-warm-50/20 to-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-purple-100/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-sky-100/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent via-gray-800 to-accent text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block bg-secondary/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-secondary/30">
              <h3 className="text-sm uppercase tracking-widest text-secondary font-semibold">Legacy</h3>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif leading-tight">Backed by Nearly a Century<br />of China Travel Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary via-white/30 to-secondary mx-auto mb-8 rounded-full"></div>
          </div>
          <p className="text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed text-white/85">
            CTS is part of China Travel Service heritage, established in 1928 with direct operational depth across China.
            This is proof of capability, not just background.
          </p>
          <div className="flex justify-center">
            <a href="/about" className="inline-flex items-center gap-2 bg-white text-accent font-semibold text-lg py-4 px-10 rounded-full hover:bg-secondary hover:text-white hover:shadow-2xl hover:shadow-secondary/30 transition-all hover:-translate-y-1 hover:scale-105">
              Learn Our Story
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
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
