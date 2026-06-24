import Image from 'next/image'
import Link from 'next/link'

/**
 * Shared footer below every /play quiz reveal page.
 *
 * Surfaces six flagship CTS tour entry points so quiz-driven traffic can
 * continue browsing the catalogue. Identical for every quiz — the goal is a
 * predictable next-step UI that doesn't vary by quiz format.
 *
 * If a future quiz wants quiz-specific tour suggestions instead, swap this
 * component out at the quiz renderer (don't parameterise here — keep this
 * footer simple).
 */

const TOUR_IMG_LIB =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images'

interface FlagshipTour {
  href: string
  title: string
  duration: string
  blurb: string
  image: string
  alt: string
}

const FLAGSHIP_TOURS: FlagshipTour[] = [
  {
    href: '/campaigns/best-of-china',
    title: 'Best of China',
    duration: '15 days · from NZD $3,880',
    blurb:
      "Beijing · Xi'an · Shanghai · Suzhou — our most-booked grand tour, with the Great Wall, Terracotta Army and Yangtze Delta in one trip.",
    image: `${TOUR_IMG_LIB}/forbidden-city-aerial.jpg`,
    alt: "Aerial view of Beijing's Forbidden City",
  },
  {
    href: '/beijing-tours',
    title: 'Beijing & the Great Wall',
    duration: 'from 5 days',
    blurb:
      'Mutianyu Wall, Forbidden City, Temple of Heaven, hutongs. The capital with a local guide — Auckland-departing.',
    image: '/images/play/spot-the-lie-china-icons-1/panel-D.png',
    alt: 'The Great Wall of China snaking through autumn-coloured mountains at Mutianyu',
  },
  {
    href: '/xian-tours',
    title: "Xi'an & the Terracotta Army",
    duration: 'from 4 days',
    blurb:
      "Stand metres from 8,000+ unique warriors, walk the Ming city wall, eat through the Muslim Quarter — Xi'an is the easiest add-on.",
    image: '/images/play/spot-the-lie-china-icons-1/panel-B.png',
    alt: "Terracotta warriors in their excavation pit, Xi'an",
  },
  {
    href: '/yunnan-tours',
    title: 'Yunnan & Shangri-La',
    duration: '8-12 days',
    blurb:
      'Lijiang, Dali, Shangri-La — minority cultures, snow mountains and tea-horse trails in the most colourful corner of China.',
    image: '/images/play/spot-the-lie-china-icons-1/panel-C.png',
    alt: 'Songzanlin Monastery in Shangri-La with snow mountains behind',
  },
  {
    href: '/zhangjiajie-tours',
    title: 'Zhangjiajie Stopover',
    duration: '4-6 days',
    blurb:
      "The Avatar Mountains — vertical sandstone pillars and a glass skywalk. Easy to add to any grand tour as a 'wow' break.",
    image: '/images/play/spot-the-lie-china-icons-1/panel-E.png',
    alt: 'Vertical sandstone pillars rising through mist in Zhangjiajie',
  },
  {
    href: '/china-tours',
    title: 'Browse all China tours',
    duration: 'Signature · Discovery · Stopover',
    blurb:
      'See every CTS itinerary — NZD pricing, Auckland departures, NZ visa-free until 31 Dec 2026.',
    image: `${TOUR_IMG_LIB}/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg`,
    alt: 'Gold lion guarding a hall in the Forbidden City',
  },
]

export default function TourDiscoveryFooter() {
  return (
    <section className="bg-warm-50 border-t border-warm-100">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="max-w-2xl mb-8 md:mb-10 text-center mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-2">
            Now that you know the truth
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
            See China for yourself
          </h2>
          <p className="text-base text-gray-700">
            Six ways to start. All tours include NZD pricing, Auckland departures,
            and local Mandarin-speaking guides on the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FLAGSHIP_TOURS.map((tour) => (
            <Link
              key={tour.href}
              href={tour.href}
              className="group block bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg hover:border-amber-300 transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
                <Image
                  src={tour.image}
                  alt={tour.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
                  {tour.duration}
                </p>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {tour.blurb}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary/80">
                  See itinerary
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-md transition-colors"
          >
            Talk to a CTS specialist →
          </Link>
          <p className="mt-3 text-xs text-gray-500">
            NZ-based · Mandarin-speaking · No call centre. Replies in 1 business day.
          </p>
        </div>
      </div>
    </section>
  )
}
