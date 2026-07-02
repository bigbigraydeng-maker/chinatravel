/**
 * Three featured 5-star reviews surfaced on /china-tours between the trip
 * photos and the flagship tour grid.
 *
 * Quotes are paraphrased to ~1 sentence from the canonical Testimonials.tsx
 * dataset (already in production). One review per spotlight cluster
 * (Beijing & Xi'an / Shanghai & Surroundings / Silk Road signature) so the
 * three flagship surfaces below all carry social proof above them.
 */

interface ReviewHighlight {
  travellerName: string;
  travellerLocation: string;
  tourLabel: string;
  title: string;
  quote: string;
  initials: string;
  accent: 'amber' | 'blue' | 'red';
  date: string;
}

const REVIEWS: ReviewHighlight[] = [
  {
    travellerName: 'Claire & Tom Mackenzie',
    travellerLocation: 'Wellington',
    tourLabel: "Tale of Two Cities · Beijing + Xi'an",
    title: 'Beijing to Xi’an on the bullet train — the perfect 10 days',
    quote:
      'Visa-free entry made booking so much easier than we expected. Baker’s itinerary was brilliantly paced — three days in Beijing, then a bullet train to Xi’an for the Terracotta Warriors. Couldn’t have asked for more.',
    initials: 'CM',
    accent: 'amber',
    date: 'January 2026',
  },
  {
    travellerName: 'Simon & Kate Brennan',
    travellerLocation: 'Christchurch',
    tourLabel: 'Shanghai & Surroundings · 10 days',
    title: 'Shanghai, Suzhou, Hangzhou — three cities, one perfect trip',
    quote:
      'The contrast between the futuristic Bund skyline and the classical gardens of Suzhou made us feel like we’d moved through 1,000 years of history in two days. A new benchmark for a well-designed tour.',
    initials: 'SB',
    accent: 'blue',
    date: 'December 2025',
  },
  {
    travellerName: 'Robert & Anne Murray',
    travellerLocation: 'Hamilton',
    tourLabel: 'Silk Road Discovery · 18 days',
    title: 'A three-week journey that belongs in a film',
    quote:
      'The Mogao Caves at Dunhuang, camping in the Gobi desert under more stars than I knew existed, the ancient Sunday market in Kashgar — we’ve been travelling for 30 years and this was the best trip we’ve ever taken.',
    initials: 'RM',
    accent: 'red',
    date: 'February 2026',
  },
];

const ACCENT: Record<ReviewHighlight['accent'], { ring: string; badge: string; gradient: string }> = {
  amber: {
    ring: 'ring-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    gradient: 'from-amber-50 to-white',
  },
  blue: {
    ring: 'ring-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    gradient: 'from-blue-50 to-white',
  },
  red: {
    ring: 'ring-red-200',
    badge: 'bg-red-100 text-red-800 border-red-200',
    gradient: 'from-red-50 to-white',
  },
};

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewsHighlightsProps {
  /**
   * On viewports below md (~768px), cap review count to this many with the
   * rest CSS-hidden. Used by FB Leadform thankyou traffic where mobile
   * scroll fatigue is worst; desktop still shows all three reviews.
   */
  mobileLimit?: number;
}

export default function ReviewsHighlights({ mobileLimit }: ReviewsHighlightsProps = {}) {
  return (
    <section className="bg-warm-50 border-y border-warm-100">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Stars />
            <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
              5.0 from 24 verified NZ reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            What Kiwi travellers say
          </h2>
          <p className="text-lg text-gray-700">
            Three reviews — one per flagship route below — straight from our most
            recent New Zealand departures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, index) => {
            const a = ACCENT[r.accent];
            const hideOnMobile = mobileLimit != null && index >= mobileLimit;
            return (
              <article
                key={r.travellerName}
                className={`bg-gradient-to-br ${a.gradient} rounded-2xl p-5 border border-warm-100 ring-1 ${a.ring} flex flex-col${
                  hideOnMobile ? ' hidden md:flex' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {r.travellerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {r.travellerLocation}, NZ · {r.date}
                    </p>
                  </div>
                </div>
                <Stars />
                <h3 className="mt-3 font-bold text-gray-900 text-base leading-snug">
                  {r.title}
                </h3>
                <blockquote className="mt-2 text-sm text-gray-700 leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <span
                  className={`mt-4 inline-flex self-start items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${a.badge}`}
                >
                  {r.tourLabel}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
