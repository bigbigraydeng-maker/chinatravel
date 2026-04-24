import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, cities } from '@/lib/data/cities';
import { getToursByCityName } from '@/lib/data/tours';
import TourCard from '@/components/tours/TourCard';
import CTASection from '@/components/CTASection';

interface CityPageProps {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city);

  if (!city) {
    return {
      title: 'Not Found | CTS Tours',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: [
      `${city.name} travel`,
      `${city.name} tours`,
      `${city.name} China`,
      'CTS Tours',
      'China travel'
    ],
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      type: 'website',
      images: [{ url: city.heroImage, width: 1200, height: 630, alt: city.name }],
    },
    alternates: {
      canonical: `/explore/${params.city}`,
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  const relatedTours = getToursByCityName(city.name);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={city.heroImage}
            alt={`${city.name} — CTS Tours`}
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <p className="text-sm uppercase tracking-widest text-white/80 mb-3">Explore China</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{city.name}</h1>
          <p className="text-lg md:text-xl text-white/90">{city.description}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-light border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{city.name}</span>
          </nav>
        </div>
      </div>

      {/* Cultural Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-center">
              Discover {city.name}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-10"></div>
            <div className="space-y-6">
              {city.culturalIntro.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 font-serif text-center">
              {city.name} Highlights
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {city.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-8 text-sm">
              Best time to visit: {city.bestTimeToVisit}
            </p>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 font-serif text-center">
            Tours featuring {city.name}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-10"></div>

          {relatedTours.length > 0 ? (
            <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  destination={tour.destination}
                  tier={tour.tier}
                />
              ))}
            </div>
          ) : (
            <div className="text-center max-w-xl mx-auto">
              <p className="text-gray-600 text-lg mb-6">
                We are currently developing tours that feature {city.name}. Contact us for a custom itinerary.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={`Ready to Explore ${city.name}?`}
        description={`Let our China specialists craft the perfect ${city.name} itinerary for you. With over 20 years of experience and direct operations in China, we ensure an authentic and seamless travel experience.`}
        primaryButtonText="View All Tours"
        primaryButtonLink="/tours"
        secondaryButtonText="Contact a Specialist"
        secondaryButtonLink="/contact"
      />
    </div>
  );
}
