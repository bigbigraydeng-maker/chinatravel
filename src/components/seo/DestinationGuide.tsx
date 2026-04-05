'use client';

import { DestinationGuide as DestinationGuideType } from '@/lib/data/guides';
import HubHero from './HubHero';

export default function DestinationGuide({ guide }: { guide: DestinationGuideType }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HubHero
        title={guide.h1}
        subtitle={guide.heroSubtitle}
        backgroundImage={guide.heroImage}
      />

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 text-sm text-gray-600">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <a href="/tours" className="hover:text-primary">Guides</a>
        <span className="mx-2">/</span>
        <span className="text-accent">{guide.destinationName}</span>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Intro Text */}
        {guide.introText.map((paragraph, i) => (
          <p key={i} className="text-gray-700 leading-relaxed text-base mb-6">
            {paragraph}
          </p>
        ))}

        {/* Sections */}
        {guide.sections.map((section, i) => (
          <section key={i} id={section.id} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-accent mb-4">
              {section.title}
            </h2>
            {section.content.map((para, j) => (
              <p key={j} className="text-gray-700 leading-relaxed text-base mb-4">
                {para}
              </p>
            ))}
          </section>
        ))}

        {/* Attractions */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            Top Attractions
          </h2>
          <div className="grid gap-6">
            {guide.attractions.map((attraction, i) => (
              <div key={i} className="border-l-4 border-primary pl-6 py-4">
                <h3 className="text-xl font-semibold text-accent mb-2">
                  {attraction.name}
                </h3>
                <p className="text-gray-700 mb-3">{attraction.description}</p>
                <div className="text-sm text-gray-600">
                  <p>⏱️ {attraction.visitDuration}</p>
                  <p className="mt-2">Best time: {attraction.bestTime}</p>
                  {attraction.ticketInfo && (
                    <p className="mt-2">{attraction.ticketInfo}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guide.galleryImages.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
                <img
                  src={img}
                  alt={`{guide.destinationName}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-warm-50">
                <summary className="font-semibold text-accent cursor-pointer">
                  {faq.question}
                </summary>
                <p className="text-gray-700 mt-3 ml-6">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Practical Info */}
        <section className="bg-warm-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            Practical Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-accent mb-2">Transportation</h3>
              <p className="text-gray-700 text-sm">{guide.practicalInfo.transportation}</p>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-2">Climate & Best Time</h3>
              <p className="text-gray-700 text-sm">{guide.practicalInfo.climate}</p>
              <p className="text-gray-700 text-sm mt-2">Best: {guide.practicalInfo.bestTime}</p>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-2">Budget</h3>
              <p className="text-gray-700 text-sm">{guide.practicalInfo.budget}</p>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-2">Language & Safety</h3>
              <p className="text-gray-700 text-sm">{guide.practicalInfo.language}</p>
              <p className="text-gray-700 text-sm mt-2">{guide.practicalInfo.safety}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-red-500 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold mb-3">
            Ready to Experience {guide.destinationName}?
          </h2>
          <p className="text-white mb-6">
            Explore our curated tours to {guide.destinationName}
          </p>
          <a
            href={`/tours`}
            className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow"
          >
            View All Tours
          </a>
        </section>
      </div>
    </div>
  );
}
