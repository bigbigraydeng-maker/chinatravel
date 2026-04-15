import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getDestinationBySlug, 
  getToursByDestination,
  destinations 
} from '@/lib/data/tours';
import TourCard from '@/components/tours/TourCard';

interface DestinationPageProps {
  params: {
    destination: string;
  };
}

// Generate static params for all destinations
export async function generateStaticParams() {
  return destinations.map((destination) => ({
    destination: destination.slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const destination = getDestinationBySlug(params.destination);
  
  if (!destination) {
    return {
      title: 'Not Found | CTS Tours',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    keywords: [
      `${destination.name} tours`,
      `${destination.name} travel`,
      `${destination.name} vacation`,
      'CTS Tours',
      'Asia travel'
    ],
    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      type: 'website',
      images: [
        {
          url: destination.heroImage,
          width: 1200,
          height: 630,
          alt: `${destination.name} Tours`,
        },
      ],
    },
    alternates: {
      canonical: `/tours/${params.destination}`,
    },
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.destination);
  
  if (!destination) {
    notFound();
  }

  const allTours = getToursByDestination(params.destination);
  const featuredTours = allTours.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src={destination.heroImage}
              alt={`${destination.name} Tours`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <nav className="mb-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/80">
              <li>
                <Link href="/tours" className="hover:text-white transition-colors">
                  Tours
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{destination.name}</li>
            </ol>
          </nav>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            {destination.subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Why Visit {destination.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Collections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-4">
            Our {destination.name} Collections
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Choose from our carefully curated collections, each designed to offer a unique perspective on {destination.name}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.tiers.map((tier) => {
              const tierTours = allTours.filter(t => t.tier === tier.slug);
              return (
                <Link
                  key={tier.id}
                  href={`/tours/${destination.slug}/${tier.slug}`}
                  className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {tier.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {tierTours.length} {tierTours.length === 1 ? 'tour' : 'tours'}
                      </span>
                      <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                        Explore
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      {featuredTours.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-4">
              Featured {destination.name} Tours
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Our most popular journeys, carefully selected for unforgettable experiences
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard 
                  key={tour.id} 
                  tour={tour}
                  destination={destination.slug}
                  tier={tour.tier}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href={`/tours/${destination.slug}/${destination.tiers[0].slug}`}
                className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All {destination.name} Tours
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Explore Other Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations
              .filter(d => d.slug !== destination.slug)
              .map((otherDest) => (
                <Link
                  key={otherDest.id}
                  href={`/tours/${otherDest.slug}`}
                  className="group relative aspect-[16/9] rounded-lg overflow-hidden"
                >
                  <Image
                    src={otherDest.heroImage}
                    alt={otherDest.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-3xl font-serif font-bold mb-2">{otherDest.name}</h3>
                    <p className="text-white/80">{otherDest.subtitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Let our travel specialists help you plan the perfect journey. 
            Get personalized recommendations and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Speak to a Specialist
            </Link>
            <Link 
              href="/tours"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
