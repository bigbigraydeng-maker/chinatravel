'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomePageWendyWu = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const destinations = [
    {
      name: 'Beijing',
      slug: 'beijing',
      description: 'Imperial grandeur & ancient walls',
      color: 'from-amber-400 to-orange-500',
      image: '/images/tours/forbidden-city-aerial.jpg'
    },
    {
      name: 'Xi\'an',
      slug: 'xian',
      description: 'Terracotta warriors & silk roads',
      color: 'from-orange-400 to-red-500',
      image: '/images/tours/xian-terracotta.jpg'
    },
    {
      name: 'Shanghai',
      slug: 'shanghai',
      description: 'Modern meets traditional',
      color: 'from-rose-400 to-pink-500',
      image: '/images/tours/shanghai-skyline.jpg'
    },
    {
      name: 'Chengdu',
      slug: 'chengdu',
      description: 'Pandas & spice in the mountains',
      color: 'from-emerald-400 to-teal-500',
      image: '/images/tours/chengdu-pandas.jpg'
    },
    {
      name: 'Guilin',
      slug: 'guilin',
      description: 'Karst mountains & misty rivers',
      color: 'from-sky-400 to-cyan-500',
      image: '/images/tours/guilin-mist.jpg'
    },
    {
      name: 'Zhangjiajie',
      slug: 'zhangjiajie',
      description: 'Avatar\'s floating mountains',
      color: 'from-purple-400 to-indigo-500',
      image: '/images/tours/zhangjiajie.jpg'
    },
  ];

  const highlights = [
    {
      icon: '🌏',
      title: 'Live in China',
      description: 'Our team lives and breathes China daily. We know the hidden gems, the best local experiences, and the real stories.',
      gradient: 'from-orange-50 to-amber-50'
    },
    {
      icon: '🎯',
      title: '98 Years Heritage',
      description: 'Since 1928, we\'ve been crafting unforgettable journeys. That\'s nearly a century of trust and expertise.',
      gradient: 'from-rose-50 to-pink-50'
    },
    {
      icon: '🚀',
      title: 'Direct Access',
      description: 'Our own offices and guides across China mean no middlemen. Just seamless, authentic experiences from day one.',
      gradient: 'from-amber-50 to-orange-50'
    },
    {
      icon: '✨',
      title: 'Authentic Access',
      description: 'Small groups, local guides, off-the-beaten-path stops. The real China that most tourists never discover.',
      gradient: 'from-yellow-50 to-orange-50'
    },
  ];

  return (
    <div className="bg-white">
      {/* ============================================================================
          HERO SECTION - Warm & Inviting
          ============================================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-full text-sm font-semibold uppercase tracking-wide">
                    New Zealand's China Specialists
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-orange-900 via-rose-800 to-orange-900 bg-clip-text text-transparent leading-tight">
                  Journey into Real China
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Discover authentic experiences beyond the guidebook. With 98 years of expertise and local ground presence, we craft journeys that transform how you see Asia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tours"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Explore Tours
                </Link>
                <Link
                  href="/tailor-made"
                  className="px-8 py-4 border-2 border-orange-400 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 text-center"
                >
                  Tailor Your Trip
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex gap-8 pt-8 border-t border-orange-100">
                <div>
                  <div className="text-3xl font-bold text-orange-600">98+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">5000+</div>
                  <div className="text-sm text-gray-600">Happy Travellers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">30+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-rose-300 rounded-2xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl transform -rotate-3 opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <Image
                    src="/images/tours/forbidden-city-aerial.jpg"
                    alt="Great Wall of China"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          WHY US SECTION - Warm cards with micro-interactions
          ============================================================================ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Why Choose CTS
            </h2>
            <p className="text-xl text-gray-600">
              Nearly a century of connecting New Zealanders with authentic Asia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, i) => (
              <div
                key={i}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${item.gradient} border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2`}
              >
                <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-125">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================
          DESTINATIONS SECTION - Interactive cards with overlay effects
          ============================================================================ */}
      <section className="py-24 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Explore Iconic Destinations
            </h2>
            <p className="text-xl text-gray-600">
              From imperial cities to misty mountains, discover the soul of China
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${dest.slug}-travel-guide`}
                onMouseEnter={() => setHoveredCard(dest.slug)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                </div>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform transition-all duration-500" style={{
                    transform: hoveredCard === dest.slug ? 'translateY(-8px)' : 'translateY(0)'
                  }}>
                    <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-sm text-gray-200 mb-4">{dest.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Explore <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================
          CTA SECTION - Warm and inviting call to action
          ============================================================================ */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready for an Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create your perfect China journey. Whether you follow our expertly-designed itineraries or craft something uniquely yours.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-rose-600 font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Planning Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePageWendyWu;
