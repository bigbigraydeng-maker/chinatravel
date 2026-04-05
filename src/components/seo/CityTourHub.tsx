// City tour hub template component
// Used by all city hub pages (beijing-tours, shanghai-tours, etc.)
// Combines hero, city info, tour grid, and FAQs into a reusable template

import React from 'react';
import { Tour } from '@/lib/data/tours';
import HubHero from './HubHero';
import TourGrid from './TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';

interface CityHubProps {
  // Metadata
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;

  // Content
  introText: string;
  highlights: string[];
  bestTimeToVisit: string;

  // Tours
  tours: Tour[];

  // FAQs
  faqs: Array<{ question: string; answer: string }>;

  // Meta description (for SEO)
  metaDescription?: string;
}

const CityTourHub: React.FC<CityHubProps> = ({
  cityName,
  heroTitle,
  heroSubtitle,
  heroImage,
  introText,
  highlights,
  bestTimeToVisit,
  tours,
  faqs,
  metaDescription
}) => {
  return (
    <div>
      {/* Hero */}
      <HubHero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage || 'linear-gradient(135deg, #8B5A3C 0%, #D4A574 100%)'}
      />

      <TrustBar />

      {/* Main content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  About {cityName}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {introText}
                </p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-warm-50 rounded-lg border border-warm-100"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">✓</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-700">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best time to visit */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Best Time to Visit
                </h2>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {bestTimeToVisit}
                  </p>
                </div>
              </section>

              {/* Tours section */}
              <section>
                <SectionTitle
                  title={`${cityName} Tours`}
                  subtitle={`Discover our ${cityName} experiences`}
                />
                <TourGrid tours={tours} columns={2} />
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick info card */}
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Facts</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Destination</dt>
                      <dd className="font-medium capitalize">{cityName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Tours Available</dt>
                      <dd className="font-medium">{tours.length}</dd>
                    </div>
                    {tours.length > 0 && (
                      <>
                        <div>
                          <dt className="text-sm text-gray-600">Starting From</dt>
                          <dd className="font-medium text-primary">
                            {tours[tours.length - 1].price}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-600">Best Season</dt>
                          <dd className="font-medium">Spring & Autumn</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>

                {/* CTA Button */}
                <a
                  href="#tours-section"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  View Tours
                </a>

                {/* Info box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-bold">Planning tip:</span> Book 3+ months in advance for the best availability and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* CTA Section */}
      <CTASection
        title={`Ready to Explore ${cityName}?`}
        description={`Let our China specialists craft a tailor-made ${cityName} itinerary just for you.`}
        primaryButtonText="Plan My Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Browse All Tours"
        secondaryButtonLink="/tours/china"
      />
    </div>
  );
};

export default CityTourHub;
