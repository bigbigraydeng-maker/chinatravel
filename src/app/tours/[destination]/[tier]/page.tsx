import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getDestinationBySlug, 
  getToursByDestinationAndTier,
  destinations
} from '@/lib/data/tours';
import TourCard from '@/components/tours/TourCard';

interface TierPageProps {
  params: {
    destination: string;
    tier: string;
  };
}

// Generate static params for all destination/tier combinations
export async function generateStaticParams() {
  const params: { destination: string; tier: string }[] = [];
  
  destinations.forEach((destination) => {
    destination.tiers.forEach((tier) => {
      params.push({
        destination: destination.slug,
        tier: tier.slug,
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: TierPageProps): Promise<Metadata> {
  const destination = getDestinationBySlug(params.destination);
  
  if (!destination) {
    return {
      title: 'Not Found | CTS Tours',
      description: 'The requested page could not be found.',
    };
  }

  const tier = destination.tiers.find(t => t.slug === params.tier);
  
  if (!tier) {
    return {
      title: 'Not Found | CTS Tours',
      description: 'The requested page could not be found.',
    };
  }

  const title = `${destination.name} ${tier.name} Tours | CTS Tours`;
  const description = `Explore ${destination.name} with our ${tier.name} collection. ${tier.description}`;

  return {
    title,
    description,
    keywords: [
      `${destination.name} tours`,
      `${tier.name} tours`,
      `${destination.name.toLowerCase()} ${tier.name.toLowerCase()}`,
      'CTS Tours',
      'Asia travel'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: destination.heroImage,
          width: 1200,
          height: 630,
          alt: `${destination.name} ${tier.name} Tours`,
        },
      ],
    },
    alternates: {
      canonical: `/tours/${params.destination}/${params.tier}`,
    },
  };
}

export default function TierPage({ params }: TierPageProps) {
  const destination = getDestinationBySlug(params.destination);
  
  if (!destination) {
    notFound();
  }

  const tier = destination.tiers.find(t => t.slug === params.tier);
  
  if (!tier) {
    notFound();
  }

  const tours = getToursByDestinationAndTier(params.destination, params.tier);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src={destination.heroImage}
              alt={`${destination.name} ${tier.name} Tours`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black/60" />
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
              <li>
                <Link 
                  href={`/tours/${destination.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {destination.name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{tier.name}</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            {destination.name} {tier.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {tier.description}
          </p>
        </div>
      </section>

      {/* Tier Features */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tier.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defining Characteristics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Defining Characteristics
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {tier.definingCharacteristics.map((characteristic, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="flex-1 text-gray-700 leading-relaxed">
                    {characteristic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              {tours.length} {tours.length === 1 ? 'Tour' : 'Tours'} Available
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated {destination.name} {tier.name} collection. 
              Each journey is designed to provide an unforgettable experience.
            </p>
          </div>

          {tours.length > 0 ? (
            <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard 
                  key={tour.id} 
                  tour={tour}
                  destination={destination.slug}
                  tier={tier.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No tours available in this category at the moment.
              </p>
              <Link 
                href={`/tours/${destination.slug}`}
                className="inline-block mt-4 text-primary hover:underline"
              >
                View all {destination.name} tours
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Explore Other {destination.name} Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.tiers
              .filter(t => t.slug !== tier.slug)
              .map((otherTier) => (
                <Link
                  key={otherTier.id}
                  href={`/tours/${destination.slug}/${otherTier.slug}`}
                  className="group block p-8 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-white">
                    {otherTier.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 mb-4">
                    {otherTier.description}
                  </p>
                  <span className="inline-flex items-center text-primary group-hover:text-white font-medium">
                    View Collection
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Our travel specialists are here to help you find the perfect {destination.name} journey. 
            Get personalized recommendations based on your interests and travel style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Speak to a Specialist
            </Link>
            <Link 
              href={`/tours/${destination.slug}`}
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              View All {destination.name} Tours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
