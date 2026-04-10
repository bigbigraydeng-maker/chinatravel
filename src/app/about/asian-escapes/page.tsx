import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Asian Escapes | Asiascape Holidays | CTS Tours',
  description: 'Asiascape Holidays is the sister brand of CTS Tours, offering curated holiday packages across Asia including Japan, Vietnam, Thailand, Bali, and more.',
  keywords: ['Asiascape Holidays', 'Asian travel', 'Asia tours', 'Japan tours', 'Vietnam tours', 'Thailand tours'],
};

const asianDestinations = [
  {
    name: 'Japan',
    description: 'Cherry blossoms, ancient temples, and cutting-edge culture. From Tokyo to Kyoto, experience the harmony of old and new.',
    highlights: ['Tokyo & Osaka city breaks', 'Cherry blossom season specials', 'Cultural immersion tours', 'Ski holidays in Hokkaido'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/japan-hero.jpg',
  },
  {
    name: 'Vietnam',
    description: 'From the emerald waters of Halong Bay to the lantern-lit streets of Hoi An, Vietnam enchants every traveller.',
    highlights: ['Halong Bay cruises', 'Ho Chi Minh City food tours', 'Hoi An cultural experiences', 'Sapa trekking adventures'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/vietnam-hero.jpg',
  },
  {
    name: 'Thailand',
    description: 'Golden temples, pristine beaches, and legendary cuisine. Thailand offers something for every type of traveller.',
    highlights: ['Bangkok & Chiang Mai combos', 'Island hopping packages', 'Thai cooking experiences', 'Wellness retreats'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/thailand-placeholder.jpg',
  },
  {
    name: 'Bali & Indonesia',
    description: 'Volcanic landscapes, rice terraces, and spiritual temples. Bali and beyond offer unforgettable island experiences.',
    highlights: ['Bali cultural tours', 'Ubud wellness retreats', 'Komodo Island adventures', 'Beach resort packages'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/bali-placeholder.jpg',
  },
  {
    name: 'Cambodia',
    description: 'Home to the magnificent Angkor Wat and a rich, resilient culture that captivates visitors from around the world.',
    highlights: ['Angkor Wat sunrise tours', 'Phnom Penh heritage walks', 'Floating village visits', 'Cambodia & Vietnam combos'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/cambodia-placeholder.jpg',
  },
  {
    name: 'South Korea',
    description: 'K-culture, ancient palaces, and incredible food. South Korea is Asia\'s rising travel star.',
    highlights: ['Seoul city experiences', 'K-culture tours', 'Temple stay programs', 'Jeju Island getaways'],
    image: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/korea-placeholder.jpg',
  },
];

const services = [
  {
    title: 'Holiday Packages',
    description: 'Fully inclusive tour packages with flights, accommodation, transfers, and guided experiences across Asia.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Tailor Made Itineraries',
    description: 'Custom-designed journeys built around your preferences, pace, and interests. Your trip, your way.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Group Tours',
    description: 'Join like-minded Kiwi travellers on our popular group departures. Small groups, big experiences.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Stopover Packages',
    description: 'Make the most of transit stops with our curated city break packages. Turn a layover into an adventure.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function AsianEscapesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent via-accent/95 to-primary/80 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full border-2 border-white/30"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full border border-white/20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-secondary font-semibold uppercase tracking-wider mb-4">A CTS Tours Brand</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Asiascape Holidays</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your gateway to extraordinary Asian experiences. Asiascape Holidays is the sister brand of CTS Tours,
            extending our 98-year heritage of excellence to destinations across Asia.
          </p>
        </div>
      </section>

      {/* About Asiascape */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold uppercase tracking-wider mb-2">Our Story</p>
                <h2 className="text-3xl font-serif font-bold mb-6">Asia Beyond China</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While CTS Tours is renowned for its unparalleled expertise in China travel, our sister brand
                  Asiascape Holidays extends this same commitment to quality across the wider Asian continent.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Founded as a natural extension of our travel expertise, Asiascape Holidays offers curated
                  experiences across Japan, Vietnam, Thailand, Bali, Cambodia, South Korea, and more.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With the same team, the same values, and the same dedication to authentic travel experiences,
                  Asiascape Holidays is your trusted partner for exploring all of Asia.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4">Why Asiascape?</h3>
                <ul className="space-y-3">
                  {[
                    'Same trusted team as CTS Tours',
                    'Direct partnerships across Asia',
                    'NZ-based support before, during & after your trip',
                    'Competitive pricing with price match guarantee',
                    'TAANZ bonded for your protection',
                    'Flexible booking & cancellation policies',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-light hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Explore Asia</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Destinations</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {asianDestinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <h3 className="text-3xl font-serif font-bold text-accent group-hover:text-primary transition-colors">{dest.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{dest.description}</p>
                  <ul className="space-y-1.5">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Connection to CTS */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Looking for China Tours?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Asiascape Holidays works hand-in-hand with CTS Tours, our China travel specialists.
            For dedicated China experiences, visit CTS Tours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours/china" className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Explore China Tours
            </Link>
            <Link href="/contact" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Subscribe to receive the latest Asian travel deals and inspiration from Asiascape Holidays.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
