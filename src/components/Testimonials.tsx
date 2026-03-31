'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  location: string;
  tour: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Margaret & John Patterson',
    location: 'Auckland, NZ',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    text: 'An absolutely magical experience! Baker arranged a private tai chi session on the Great Wall at sunrise. We have travelled extensively, but this trip was in a class of its own. The attention to detail was extraordinary.',
    avatar: 'MP',
  },
  {
    name: 'David Chen',
    location: 'Wellington, NZ',
    tour: 'China Discovery Highlights',
    rating: 5,
    text: 'As a second-generation Chinese Kiwi, I wanted to reconnect with my heritage. CTS created a journey that was both deeply personal and wonderfully surprising. The local guides opened doors I never knew existed.',
    avatar: 'DC',
  },
  {
    name: 'Sarah & Tom Williams',
    location: 'Christchurch, NZ',
    tour: 'China Signature Grand Tour',
    rating: 5,
    text: 'We were nervous about travelling to China for the first time, but CTS made everything seamless. The hotels were beautiful, the guides were knowledgeable, and the itinerary was perfectly paced. Highly recommend!',
    avatar: 'SW',
  },
  {
    name: 'Jennifer O\'Brien',
    location: 'Tauranga, NZ',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    text: 'The cooking class in a Beijing hutong was the highlight of our trip! Lisa and Baker clearly love what they do, and it shows in every aspect of the tour. We are already planning our next trip with CTS.',
    avatar: 'JO',
  },
  {
    name: 'Robert & Anne Murray',
    location: 'Hamilton, NZ',
    tour: 'Tailor Made Silk Road',
    rating: 5,
    text: 'Baker designed a 3-week Silk Road journey that exceeded all expectations. The Dunhuang caves, the Gobi desert camping, the Kashgar market — every day brought something extraordinary. A life-changing trip.',
    avatar: 'RM',
  },
  {
    name: 'Karen Blackwell',
    location: 'Queenstown, NZ',
    tour: 'China Stopover Shanghai',
    rating: 5,
    text: 'I only had 3 days in Shanghai on a stopover, but CTS packed in so much. The Bund at night, a garden tour in Suzhou, and the best xiaolongbao I have ever tasted. Now I need to come back for a full tour!',
    avatar: 'KB',
  },
  {
    name: 'Paul & Linda Foster',
    location: 'Dunedin, NZ',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    text: 'This was our 50th wedding anniversary trip and CTS made it truly special. From the surprise dinner at a courtyard restaurant in Beijing to the private calligraphy lesson, every moment was thoughtfully curated.',
    avatar: 'PF',
  },
  {
    name: 'Michael Zhang',
    location: 'Auckland, NZ',
    tour: 'Japan Discovery',
    rating: 5,
    text: 'CTS showed us a Japan beyond the tourist trail. The ryokan experience in Hakone, the hidden temples of Kyoto, and the incredible food tours — their expertise extends far beyond China. Truly world-class service.',
    avatar: 'MZ',
  },
];

interface TestimonialsProps {
  variant?: 'full' | 'compact';
  tourFilter?: string;
}

export default function Testimonials({ variant = 'full', tourFilter }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = tourFilter
    ? testimonials.filter(t => t.tour.toLowerCase().includes(tourFilter.toLowerCase()))
    : testimonials;

  const displayTestimonials = filtered.length >= 3 ? filtered : testimonials;
  const visibleCount = variant === 'compact' ? 1 : 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(displayTestimonials[(currentIndex + i) % displayTestimonials.length]);
    }
    return items;
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-secondary' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  if (variant === 'compact') {
    const item = displayTestimonials[currentIndex % displayTestimonials.length];
    return (
      <div className="bg-light rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {item.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">{item.location}</p>
          </div>
          <div className="ml-auto">
            <StarRating rating={item.rating} />
          </div>
        </div>
        <p className="text-sm text-gray-700 italic">&ldquo;{item.text}&rdquo;</p>
        <p className="text-xs text-gray-400 mt-2">{item.tour}</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider mb-2">What Our Travellers Say</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Traveller Stories</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {getVisibleItems().map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow relative">
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none">&rdquo;</div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>

              <StarRating rating={item.rating} />

              <p className="text-gray-700 mt-4 leading-relaxed italic">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-primary font-medium">{item.tour}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-8 gap-2">
          {displayTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
