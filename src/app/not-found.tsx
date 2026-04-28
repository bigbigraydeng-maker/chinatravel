'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // GA4 will automatically track this as page_view for /not-found
    // If you want to explicitly mark it as a conversion:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: '/404',
        page_title: 'Page Not Found',
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-warm-50 to-white px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
          <p className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Page Not Found
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for has wandered off the Silk Road.
            <br />
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-primary via-primary to-red-500 text-white font-semibold py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/tours/find"
            className="inline-block bg-secondary text-white font-semibold py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-secondary/30 transition-all hover:-translate-y-1 hover:scale-105"
          >
            Explore Tours
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Beijing', href: '/tours/find?destination=beijing' },
              { name: 'Shanghai', href: '/tours/find?destination=shanghai' },
              { name: 'Xi\'an', href: '/tours/find?destination=xian' },
              { name: 'Chengdu', href: '/tours/find?destination=chengdu' },
              { name: 'Guilin', href: '/tours/find?destination=guilin' },
              { name: 'Zhangjiajie', href: '/tours/find?destination=zhangjiajie' },
            ].map((destination) => (
              <Link
                key={destination.name}
                href={destination.href}
                className="block p-4 rounded-lg bg-warm-100 hover:bg-primary hover:text-white transition-colors text-gray-700 font-medium hover:font-semibold"
              >
                {destination.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            If you believe this is a mistake, please contact us:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:info@ctstours.co.nz"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              info@ctstours.co.nz
            </a>
            <span className="text-gray-300">|</span>
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
