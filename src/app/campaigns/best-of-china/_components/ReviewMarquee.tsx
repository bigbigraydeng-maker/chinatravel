import { Icon } from '@/components/ui/Icon';

/**
 * Horizontal scrolling review marquee — small reviewer cards with
 * 5-star row + short quote + name. Always visible (no auto-pause), runs at
 * a slow speed so the eye can catch a couple of quotes as the visitor
 * scrolls down the LP.
 */
interface Review {
  stars: 5;
  quote: string;
  name: string;
  location: string;
}

const REVIEWS: Review[] = [
  {
    stars: 5,
    quote:
      'CTS made our 15-day China trip effortless. Beijing to Shanghai — every transfer, every meal, sorted by Kiwi-friendly people.',
    name: 'Margaret & David Anderson',
    location: 'Auckland',
  },
  {
    stars: 5,
    quote:
      'Booking from NZ felt safe — Auckland office, NZD pricing, real humans who understood our school holidays.',
    name: 'Sarah Chen',
    location: 'Christchurch',
  },
  {
    stars: 5,
    quote:
      'The Great Wall day was the trip of a lifetime. Our guide had grown up nearby and the stories made it magical.',
    name: 'Robert Williams',
    location: 'Wellington',
  },
  {
    stars: 5,
    quote:
      'Direct China ops, not a reseller chain — you can feel it. Hotels, drivers, restaurants all just worked.',
    name: 'Janet Thompson',
    location: 'Hamilton',
  },
  {
    stars: 5,
    quote:
      'Xi’an, Hangzhou, Shanghai — every city had its own character. CTS got the pacing exactly right.',
    name: 'Michael & Patricia Lee',
    location: 'Tauranga',
  },
];

const REPEATED = [...REVIEWS, ...REVIEWS]; // duplicate for seamless loop

export default function ReviewMarquee() {
  return (
    <section
      aria-label="What Kiwi travellers say about CTS"
      className="bg-gradient-to-r from-amber-50 via-warm-50 to-amber-50 border-y border-amber-100 py-10 overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-1">
          From Kiwi travellers who&apos;ve been
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon key={i} name="star" filled className="w-5 h-5 text-amber-500" />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700">5.0 average across NZ reviews</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 marquee-track">
          {REPEATED.map((r, idx) => (
            <article
              key={`${r.name}-${idx}`}
              className="flex-shrink-0 w-80 bg-white rounded-2xl border border-warm-100 px-5 py-4 shadow-sm"
            >
              <div className="flex mb-2" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Icon key={i} name="star" filled className="w-4 h-4 text-amber-500" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-snug mb-3">&ldquo;{r.quote}&rdquo;</p>
              <p className="text-xs font-bold text-gray-900">{r.name}</p>
              <p className="text-xs text-gray-500">{r.location}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 60s linear infinite;
          width: max-content;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
