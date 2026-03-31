import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllActiveTours, destinations } from '@/lib/data/tours';
import TourFinder from '@/components/TourFinder';

export const metadata: Metadata = {
  title: 'Find Your Tour | CTS Tours',
  description: 'Find your perfect tour by destination, interest, and travel style. Discover tours across China, Japan, and Vietnam.',
};

export default function FindTourPage() {
  const allTours = getAllActiveTours();

  const tourData = allTours.map(t => ({
    id: t.id,
    slug: t.slug,
    destination: t.destination,
    tier: t.tier,
    name: t.name,
    shortDescription: t.shortDescription,
    duration: t.duration,
    price: t.price,
    heroImage: t.heroImage,
    highlights: t.highlights,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Find Your Perfect Tour
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Search and filter tours across China, Japan, and Vietnam
          </p>
        </div>
      </section>

      {/* Destination Quick Links */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/tours/${dest.slug}`}
                className="px-6 py-3 rounded-full border-2 border-gray-200 text-center transition-all hover:shadow-md hover:border-primary/50 hover:text-primary"
              >
                <span className="font-bold">{dest.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {allTours.filter(t => t.destination === dest.slug).length} tours
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Finder with Filters */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="text-center py-12">Loading tours...</div>}>
            <TourFinder tours={tourData} />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Let our specialists design a tailor-made journey just for you.
          </p>
          <Link
            href="/tailor-made"
            className="inline-block px-8 py-4 bg-secondary text-accent font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Request Tailor Made Tour
          </Link>
        </div>
      </section>
    </>
  );
}
