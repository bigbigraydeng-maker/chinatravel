import Image from 'next/image';

/**
 * Social-proof photo wall for /china-tours.
 *
 * Six trip-vibe shots (destinations our travellers actually go to) with a
 * real reviewer quote overlaid on each. Photos come from the existing CTS
 * tour-images Supabase bucket; the quotes are pulled (paraphrased to one
 * sentence) from the Testimonials.tsx dataset already live in production.
 *
 * Why an inline list rather than a Testimonials variant: the existing
 * Testimonials component renders a full reviews page (header chrome, load-
 * more, summary stats). Here we want a quick visual social-proof strip
 * between the hero and the reviews highlights — different visual job, so a
 * lightweight standalone is the right scope.
 */

interface TripPhoto {
  image: string;
  altText: string;
  city: string;
  travellerName: string;
  travellerLocation: string;
  quote: string;
}

const PHOTOS: TripPhoto[] = [
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg',
    altText: 'Forbidden City golden lion at dawn',
    city: 'Beijing',
    travellerName: 'Claire & Tom Mackenzie',
    travellerLocation: 'Wellington',
    quote: 'Two of the world’s great historical capitals in ten days. Couldn’t have asked for more.',
  },
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/xian-terracotta/xian-terracotta.jpg',
    altText: "Xi'an Terracotta Warriors",
    city: "Xi'an",
    travellerName: 'Michael & Bev Larsen',
    travellerLocation: 'Dunedin',
    quote: 'Great Wall at dawn, Terracotta Warriors after lunch — the scale is genuinely hard to believe.',
  },
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg',
    altText: 'Shanghai Bund skyline at night',
    city: 'Shanghai',
    travellerName: 'Graham & Shirley Voss',
    travellerLocation: 'Hamilton',
    quote: 'The Bund at night stopped us mid-sentence. Worth every cent.',
  },
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/wuzhen-canal/wuzhen-canal.jpg',
    altText: 'Wuzhen water town canal',
    city: 'Suzhou & Hangzhou',
    travellerName: 'Rachel Donohue',
    travellerLocation: 'Tauranga',
    quote: 'Canal streets after dark, silk markets, garden tea ceremony — like stepping into a classical painting.',
  },
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/silk-road-wall/silk-road-wall.jpg',
    altText: 'Silk Road desert wall and dunes',
    city: 'Silk Road',
    travellerName: 'Robert & Anne Murray',
    travellerLocation: 'Hamilton',
    quote: 'Camping in the Gobi under more stars than I knew existed — best trip we’ve ever taken.',
  },
  {
    image:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    altText: 'Forbidden City aerial view',
    city: 'Beijing',
    travellerName: 'Fiona Hewitt',
    travellerLocation: 'Auckland',
    quote: 'Visa-free entry made this finally happen for me as a solo Kiwi traveller.',
  },
];

export default function CustomerTripPhotos() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
            Real Kiwi travellers · real itineraries
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Stories from the road
          </h2>
          <p className="text-lg text-gray-700">
            A snapshot of where our New Zealand travellers have been this year — and what
            they told us when they came back.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PHOTOS.map((p) => (
            <figure
              key={p.travellerName + p.city}
              className="relative aspect-square rounded-xl overflow-hidden bg-warm-100 group"
            >
              <Image
                src={p.image}
                alt={p.altText}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Bottom-aligned dark gradient + quote overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">
                <div className="flex items-center gap-1 mb-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-amber-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-[10px] uppercase tracking-wider text-white/80 font-semibold">
                    {p.city}
                  </span>
                </div>
                <p className="text-xs md:text-sm leading-snug mb-1.5 line-clamp-3">
                  &ldquo;{p.quote}&rdquo;
                </p>
                <p className="text-[11px] text-white/80">
                  {p.travellerName} · {p.travellerLocation}, NZ
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
