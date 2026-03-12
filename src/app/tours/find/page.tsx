import { Metadata } from 'next';
import Link from 'next/link';
import { getAllActiveTours, destinations } from '@/lib/data/tours';
import TourCard from '@/components/tours/TourCard';

export const metadata: Metadata = {
  title: 'Find Your Tour | CTS Tours',
  description: 'Find your perfect tour by destination and travel style. Discover tours based on what you want to see and how you like to travel.',
};

export default function FindTourPage() {
  const allTours = getAllActiveTours();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Find Your Perfect Tour
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse all our tours across China, Japan, and Vietnam
          </p>
        </div>
      </section>

      {/* Destination Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-8">
            Browse by Destination
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/tours/${dest.slug}`}
                className="p-6 rounded-lg border-2 border-gray-200 text-center transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="text-2xl font-serif font-bold text-gray-900 mb-2">{dest.name}</div>
                <div className="text-sm text-gray-500">{dest.subtitle}</div>
                <div className="text-xs text-primary mt-2">
                  {allTours.filter(t => t.destination === dest.slug).length} tours available
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            All Tours ({allTours.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                destination={tour.destination}
                tier={tour.tier}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Our travel specialists can help you find the perfect tour based on your interests and preferences.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Speak to a Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
