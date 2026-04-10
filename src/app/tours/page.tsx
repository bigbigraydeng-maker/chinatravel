import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { destinations, getAllActiveTours } from '@/lib/data/tours';
import TourCard from '@/components/tours/TourCard';
import CtsDepartureScheduleBlock from '@/components/tours/CtsDepartureScheduleBlock';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Asia Tours | China, Japan, Vietnam | CTS Tours',
    description: 'Explore Asia with CTS Tours — Signature, Discovery and Stopover collections to China, Japan, and Vietnam. 98 years of expertise crafting unforgettable journeys from New Zealand.',
    path: '/tours',
    ogImagePath: '/images/tours/great-wall-mist.jpg',
    ogImageAlt: 'Asia Tours — China, Japan, Vietnam with CTS Tours',
    keywords: ['Asia tours', 'China tours', 'Japan tours', 'Vietnam tours', 'CTS Tours', 'Asia travel New Zealand'],
    ogType: 'website',
  });
}

export default function ToursPage() {
  const featuredTours = getAllActiveTours().slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1920&q=80"
            alt="Asia Tours"
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Explore Asia
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover the ancient wonders and modern marvels of Asia with our expertly crafted journeys
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#destinations"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore Destinations
            </Link>
            <Link 
              href="#featured"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              View Featured Tours
            </Link>
            <Link 
              href="#cts-departure-schedule"
              className="inline-block px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white/15 transition-colors"
            >
              Departure dates
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-warm-50/70 border-y border-warm-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <CtsDepartureScheduleBlock />
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully selected destinations, each offering unique experiences and unforgettable memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/tours/${destination.slug}`}
                className="group relative h-96 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={destination.heroImage}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-serif font-bold mb-2">{destination.name}</h3>
                  <p className="text-white/80 mb-4">{destination.subtitle}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      {destination.tiers.length} Collections
                    </span>
                    <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Explore
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process to your dream Asian adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Destination',
                description: 'Browse our collections and find the perfect journey that matches your interests and travel style.',
                icon: '🌏'
              },
              {
                step: '02',
                title: 'Customize Your Tour',
                description: 'Work with our specialists to personalize your itinerary, add extensions, or adjust the pace.',
                icon: '✏️'
              },
              {
                step: '03',
                title: 'Embark on Your Journey',
                description: 'Relax and enjoy as we handle all the details, from airport transfers to expert guides.',
                icon: '🧳'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-5xl font-serif font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section id="featured" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Tours
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular journeys, carefully crafted for unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard 
                key={tour.id}
                tour={tour}
                destination={tour.destination}
                tier={tour.tier}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/tours/china"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Why Choose CTS Tours
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              98 years of expertise crafting unforgettable journeys across Asia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '98 Years Heritage',
                description: 'Nearly a century of travel expertise and local knowledge'
              },
              {
                title: 'Local Experts',
                description: 'Professional guides with deep cultural insights'
              },
              {
                title: 'Curated Experiences',
                description: 'Handpicked activities and authentic encounters'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance throughout your journey'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Let our travel specialists help you plan the perfect Asian adventure. 
            Get personalized recommendations and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Speak to a Specialist
            </Link>
            <Link 
              href="#destinations"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Browse Destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
