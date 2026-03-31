import { Metadata } from 'next';
import Link from 'next/link';
import TailorMadeForm from '@/components/TailorMadeForm';

export const metadata: Metadata = {
  title: 'Tailor Made Tours | CTS Tours',
  description: 'Create your perfect Asia journey with a custom itinerary designed by our travel specialists. Tell us your dream trip and we will make it happen.',
  keywords: ['tailor made tours', 'custom itinerary', 'bespoke travel', 'China custom tour', 'Asia private tour'],
};

const interests = [
  { icon: '🏛️', label: 'Culture & History', description: 'Ancient temples, museums, UNESCO sites' },
  { icon: '🍜', label: 'Food & Culinary', description: 'Street food, cooking classes, fine dining' },
  { icon: '🏔️', label: 'Nature & Adventure', description: 'Hiking, national parks, scenic landscapes' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family', description: 'Kid-friendly activities, educational tours' },
  { icon: '💑', label: 'Honeymoon & Romance', description: 'Romantic getaways, luxury stays' },
  { icon: '📸', label: 'Photography', description: 'Iconic viewpoints, hidden photo spots' },
  { icon: '🧘', label: 'Wellness & Spa', description: 'Hot springs, meditation, traditional healing' },
  { icon: '🎭', label: 'Arts & Performance', description: 'Opera, folk art, local performances' },
];

const steps = [
  {
    number: '01',
    title: 'Share Your Vision',
    description: 'Tell us about your dream trip — destinations, interests, travel dates, budget, and any special requirements.',
  },
  {
    number: '02',
    title: 'Expert Design',
    description: 'Our specialist Baker Gu crafts a bespoke itinerary tailored to your preferences, with insider access and authentic experiences.',
  },
  {
    number: '03',
    title: 'Refine Together',
    description: 'Review the proposed itinerary, suggest changes, and fine-tune every detail until it is perfect.',
  },
  {
    number: '04',
    title: 'Travel with Confidence',
    description: 'Enjoy your journey with 24/7 local support, pre-arranged logistics, and the peace of mind that comes from 98 years of expertise.',
  },
];

const caseStudies = [
  {
    title: 'The Wilsons\' Family Adventure',
    duration: '14 Days',
    travellers: 'Family of 4',
    highlights: ['Great Wall camping experience', 'Panda volunteer program in Chengdu', 'Traditional dumpling making class', 'Li River bamboo rafting'],
    quote: 'Baker designed the perfect trip for our family. The kids still talk about feeding the pandas!',
    author: 'Sarah Wilson, Auckland',
  },
  {
    title: 'A Photographer\'s Dream',
    duration: '18 Days',
    travellers: 'Couple',
    highlights: ['Sunrise at Zhangjiajie pillars', 'Honghe Hani rice terraces', 'Old town Lijiang at dawn', 'Yangtze River golden hour cruise'],
    quote: 'Every location was chosen for the best light. Baker understood exactly what we were looking for.',
    author: 'James & Mia Chen, Wellington',
  },
  {
    title: 'Silk Road Expedition',
    duration: '21 Days',
    travellers: 'Group of 6 friends',
    highlights: ['Dunhuang Mogao Caves private viewing', 'Camel trek in Gobi Desert', 'Kashgar Sunday Market', 'Turpan grape valley homestay'],
    quote: 'An unforgettable journey through China\'s western frontier. Truly once in a lifetime.',
    author: 'David Thompson, Christchurch',
  },
];

export default function TailorMadePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-accent text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/95 to-primary/80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white/30"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white/20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-secondary font-semibold uppercase tracking-wider mb-4">Bespoke Travel Experiences</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Tailor Made Journeys</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            No two travellers are alike. Tell us your dream, and our specialists will craft a bespoke itinerary
            that turns your vision into an unforgettable journey across Asia.
          </p>
          <a href="#enquiry-form" className="inline-block bg-secondary text-accent font-semibold px-8 py-4 rounded-lg hover:bg-secondary/90 transition-colors text-lg">
            Start Planning
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Your Interests</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">What Inspires You?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From cultural immersion to culinary adventures, we design itineraries around what excites you most.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {interests.map((interest, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all cursor-default group">
                <div className="text-4xl mb-3">{interest.icon}</div>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{interest.label}</h3>
                <p className="text-sm text-gray-500">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Success Stories</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Journeys We Have Crafted</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <div className="flex gap-4 text-sm text-white/80">
                    <span>{study.duration}</span>
                    <span>{study.travellers}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {study.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 text-sm mb-3">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                  <p className="text-xs text-gray-500">&mdash; {study.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-wider mb-2">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Tell Us About Your Dream Trip</h2>
              <p className="text-gray-600 mt-4">
                Fill in the form below and our specialist will get in touch within 24 hours.
              </p>
            </div>
            <TailorMadeForm />
          </div>
        </div>
      </section>

      {/* Expert CTA */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Prefer to Talk?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Call our specialist Baker Gu directly to discuss your trip ideas. No obligation, just expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
            <Link href="/experts/baker-gu" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Meet Baker Gu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
