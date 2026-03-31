'use client';

import { useState, useEffect, useMemo } from 'react';

interface Testimonial {
  name: string;
  location: string;
  tour: string;
  rating: number;
  text: string;
  avatar: string;
}

const allTestimonials: Testimonial[] = [
  // China Signature
  {
    name: 'Margaret & John Patterson',
    location: 'Auckland, NZ',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    text: 'An absolutely magical experience! Baker arranged a private tai chi session on the Great Wall at sunrise. We have travelled extensively, but this trip was in a class of its own.',
    avatar: 'MP',
  },
  {
    name: 'Sarah & Tom Williams',
    location: 'Christchurch, NZ',
    tour: 'China Signature Grand Tour',
    rating: 5,
    text: 'We were nervous about travelling to China for the first time, but CTS made everything seamless. The hotels were beautiful, the guides were knowledgeable, and the itinerary was perfectly paced.',
    avatar: 'SW',
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
    name: 'Andrew Sinclair',
    location: 'Napier, NZ',
    tour: 'China Signature Grand Tour',
    rating: 5,
    text: 'The Signature Grand Tour exceeded every expectation. Staying in a restored courtyard hotel in Beijing and having dinner with a local family in Xi\'an were highlights I will never forget.',
    avatar: 'AS',
  },
  {
    name: 'Helen & Bruce Donaldson',
    location: 'Nelson, NZ',
    tour: 'China Signature Imperial Heritage',
    rating: 5,
    text: 'Baker personally arranged a visit to a Buddhist monastery that wasn\'t on any tourist map. That one morning changed how we see travel entirely. This is what Signature means.',
    avatar: 'HD',
  },
  // China Discovery
  {
    name: 'David Chen',
    location: 'Wellington, NZ',
    tour: 'China Discovery Highlights',
    rating: 5,
    text: 'As a second-generation Chinese Kiwi, I wanted to reconnect with my heritage. CTS created a journey that was both deeply personal and wonderfully surprising.',
    avatar: 'DC',
  },
  {
    name: 'Jennifer O\'Brien',
    location: 'Tauranga, NZ',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    text: 'The cooking class in a Beijing hutong was the highlight of our trip! Lisa and Baker clearly love what they do, and it shows in every aspect of the tour.',
    avatar: 'JO',
  },
  {
    name: 'Greg & Michelle Hart',
    location: 'Rotorua, NZ',
    tour: 'China Discovery Highlights',
    rating: 5,
    text: 'Fantastic value for money. We saw the Great Wall, Terracotta Warriors, and Shanghai skyline all in one well-paced trip. The guides were outstanding.',
    avatar: 'GH',
  },
  {
    name: 'Angela Morrison',
    location: 'Palmerston North, NZ',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    text: 'I travelled solo and felt completely looked after. The group was friendly, the pace was perfect, and the included meals were delicious. Already planning my next trip!',
    avatar: 'AM',
  },
  {
    name: 'Trevor & Jan Bowen',
    location: 'Invercargill, NZ',
    tour: 'China Discovery Highlights',
    rating: 5,
    text: 'At our age we worried about the pace, but CTS got it just right. Not too rushed, not too slow. Every day had a genuine highlight. The Li River cruise was breathtaking.',
    avatar: 'TB',
  },
  {
    name: 'Priya Nair',
    location: 'Auckland, NZ',
    tour: 'China Discovery Beijing & Shanghai',
    rating: 5,
    text: 'Coming from India, I expected Asia travel to feel familiar — but China blew me away. CTS handled visas, transfers, everything. I just had to show up and enjoy.',
    avatar: 'PN',
  },
  // China Stopover
  {
    name: 'Karen Blackwell',
    location: 'Queenstown, NZ',
    tour: 'China Stopover Shanghai',
    rating: 5,
    text: 'I only had 3 days in Shanghai on a stopover, but CTS packed in so much. The Bund at night, a garden tour in Suzhou, and the best xiaolongbao I have ever tasted.',
    avatar: 'KB',
  },
  {
    name: 'Tony & Rachel Green',
    location: 'Hamilton, NZ',
    tour: 'China Stopover Beijing',
    rating: 5,
    text: 'Turned a boring layover into a Great Wall adventure. CTS arranged everything — hotel pickup at 5am, sunrise at the Wall, and back to the airport in time for our evening flight.',
    avatar: 'TG',
  },
  {
    name: 'Sam Whitmore',
    location: 'Tauranga, NZ',
    tour: 'China Stopover Shanghai',
    rating: 5,
    text: 'Perfect introduction to China. Two days in Shanghai gave me a taste that now has me booking a full Discovery tour for next year. Exactly what a stopover should be.',
    avatar: 'SW',
  },
  // Tailor Made
  {
    name: 'Robert & Anne Murray',
    location: 'Hamilton, NZ',
    tour: 'Tailor Made Silk Road',
    rating: 5,
    text: 'Baker designed a 3-week Silk Road journey that exceeded all expectations. The Dunhuang caves, the Gobi desert camping, the Kashgar market — every day brought something extraordinary.',
    avatar: 'RM',
  },
  {
    name: 'The Wilson Family',
    location: 'Auckland, NZ',
    tour: 'Tailor Made Family Adventure',
    rating: 5,
    text: 'Baker designed the perfect trip for our family of four. The kids still talk about feeding the pandas in Chengdu and the bamboo rafting in Guilin!',
    avatar: 'WF',
  },
  {
    name: 'James & Mia Cooper',
    location: 'Wellington, NZ',
    tour: 'Tailor Made Photography Tour',
    rating: 5,
    text: 'Every location was chosen for the best light. Sunrise at Zhangjiajie, golden hour on the Yangtze, misty mornings in Guilin. Baker understood exactly what we wanted.',
    avatar: 'JC',
  },
  {
    name: 'Liz & Peter Armstrong',
    location: 'Christchurch, NZ',
    tour: 'Tailor Made Yunnan Explorer',
    rating: 5,
    text: 'We wanted off-the-beaten-path China, and Baker delivered. Tiger Leaping Gorge, Shangri-La, the tea plantations of Pu\'er. Felt like we had China to ourselves.',
    avatar: 'LA',
  },
  {
    name: 'Donna Stewart',
    location: 'Hawke\'s Bay, NZ',
    tour: 'Tailor Made Culture & Cuisine',
    rating: 5,
    text: 'As a food lover, this was heaven. Private cooking classes, market tours, a tea ceremony in Hangzhou. Baker knows the best restaurants in every city we visited.',
    avatar: 'DS',
  },
  // Japan
  {
    name: 'Michael Zhang',
    location: 'Auckland, NZ',
    tour: 'Japan Signature',
    rating: 5,
    text: 'CTS showed us a Japan beyond the tourist trail. The ryokan experience in Hakone, the hidden temples of Kyoto, and the incredible food tours — truly world-class service.',
    avatar: 'MZ',
  },
  {
    name: 'Emily & Chris Taylor',
    location: 'Wellington, NZ',
    tour: 'Japan Discovery',
    rating: 5,
    text: 'Cherry blossom season in Japan with CTS was unforgettable. They timed our Kyoto visit perfectly and the bullet train experience was a highlight for the whole family.',
    avatar: 'ET',
  },
  {
    name: 'Wendy Marsh',
    location: 'Tauranga, NZ',
    tour: 'Japan Signature',
    rating: 5,
    text: 'From the neon lights of Tokyo to the serenity of a bamboo forest in Arashiyama, every moment was perfectly orchestrated. The attention to detail rivals Japanese hospitality itself.',
    avatar: 'WM',
  },
  // Vietnam
  {
    name: 'Nick & Sandra Fowler',
    location: 'Christchurch, NZ',
    tour: 'Vietnam Discovery',
    rating: 5,
    text: 'Halong Bay at sunrise, the lantern-lit streets of Hoi An, and the energy of Ho Chi Minh City. CTS made Vietnam feel both exciting and completely effortless.',
    avatar: 'NF',
  },
  {
    name: 'Marie Leung',
    location: 'Auckland, NZ',
    tour: 'Vietnam Discovery',
    rating: 5,
    text: 'The overnight junk boat cruise in Halong Bay was pure magic. And the street food tour in Hanoi — I gained 3 kilos and zero regrets. Superb organisation by CTS.',
    avatar: 'ML',
  },
  // General / Multi-destination
  {
    name: 'Steve & Carole Bennett',
    location: 'Whangarei, NZ',
    tour: 'China Signature Grand Tour',
    rating: 5,
    text: 'We\'ve now done three trips with CTS. Each one better than the last. They remember our preferences, surprise us with special touches, and make us feel like VIPs.',
    avatar: 'SB',
  },
  {
    name: 'Ruth Chapman',
    location: 'New Plymouth, NZ',
    tour: 'China Discovery Highlights',
    rating: 5,
    text: 'At 72, I wasn\'t sure I could manage a China trip. The CTS team were so considerate — adjusting the pace, ensuring accessible rooms, checking in on me daily. I felt truly cared for.',
    avatar: 'RC',
  },
  {
    name: 'Daniel & Sophie Wright',
    location: 'Queenstown, NZ',
    tour: 'Tailor Made Honeymoon',
    rating: 5,
    text: 'Our honeymoon in China was absolutely dreamy. A private dinner on the Bund, a hot air balloon over Yangshuo, and a couples\' spa in a Guilin mountain resort. Pure romance.',
    avatar: 'DW',
  },
];

interface TestimonialsProps {
  variant?: 'full' | 'compact' | 'sidebar';
  tourFilter?: string;
  maxItems?: number;
}

export default function Testimonials({ variant = 'full', tourFilter, maxItems }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayTestimonials = useMemo(() => {
    let filtered = tourFilter
      ? allTestimonials.filter(t => t.tour.toLowerCase().includes(tourFilter.toLowerCase()))
      : allTestimonials;
    if (filtered.length < 3) filtered = allTestimonials;
    if (maxItems) filtered = filtered.slice(0, maxItems);
    return filtered;
  }, [tourFilter, maxItems]);

  const visibleCount = variant === 'full' ? 3 : 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayTestimonials.length);
    }, 5000);
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
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Sidebar variant for tour pages
  if (variant === 'sidebar') {
    const items = displayTestimonials.slice(0, 3);
    return (
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Traveller Reviews
        </h3>
        {items.map((item, idx) => (
          <div key={idx} className="bg-warm-50 rounded-xl p-5 border border-warm-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-white font-bold text-xs">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            </div>
            <StarRating rating={item.rating} />
            <p className="text-sm text-gray-600 mt-2 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
          </div>
        ))}
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    const item = displayTestimonials[currentIndex % displayTestimonials.length];
    return (
      <div className="bg-warm-50 rounded-xl p-6 border border-warm-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-white font-bold text-sm">
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
        <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
        <p className="text-xs text-primary/70 mt-2 font-medium">{item.tour}</p>
      </div>
    );
  }

  // Full variant (homepage)
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-amber-50/50 via-white to-sky-50/30 relative overflow-hidden">
      {/* Colorful decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-200/20 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-rose-200/15 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-5 py-2 mb-4 border border-amber-200/50">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-primary font-bold uppercase tracking-wider text-sm">What Our Travellers Say</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent">Traveller Stories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {getVisibleItems().map((item, idx) => (
            <div key={`${item.name}-${currentIndex}-${idx}`}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-all duration-500 relative border border-warm-100/50 hover:-translate-y-2 group">
              <div className="absolute top-4 right-6 text-7xl text-primary/8 font-serif leading-none select-none">&rdquo;</div>

              {/* Colorful top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-t-2xl"></div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-red-400 to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>

              <StarRating rating={item.rating} />

              <p className="text-gray-600 mt-4 leading-relaxed italic">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="mt-5 pt-4 border-t border-warm-100">
                <p className="text-xs text-primary font-semibold">{item.tour}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-10 gap-2">
          {displayTestimonials.slice(0, Math.min(displayTestimonials.length, 12)).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex % displayTestimonials.length ? 'bg-gradient-to-r from-primary to-secondary w-8' : 'bg-gray-300 hover:bg-secondary w-2.5'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
