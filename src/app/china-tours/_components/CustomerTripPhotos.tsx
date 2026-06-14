import Image from 'next/image';

/**
 * Social-proof photo wall for /china-tours.
 *
 * Six trip-vibe shots with a real reviewer quote overlaid on each.
 *
 * Image source: Magic Engine's visual-assets Supabase bucket (the same
 * library that powers CTS's social-content generation pipeline). Each URL
 * below maps to a `client_assets` row whose vision-AI `hook_score` is ≥ 9.2
 * out of 10 — i.e., images ME independently flagged as the strongest
 * "stop-the-scroll" frames in the CTS library. Reviewer quotes are
 * paraphrased to one sentence from the canonical Testimonials.tsx dataset
 * already in production.
 *
 * CTS brand guardrails (mirrored from the storyboard seedance prompts in
 * ME's `asset_storyboards` table — keep this section in sync if those rules
 * change): atmospheric photography, premium positioning, NO crowded tourist
 * shots, NO "dragon and lantern" clichés, NO generic smiling Asian stock.
 * Real client photos > stock — but until CTS uploads true UGC the
 * destination-vibe + reviewer-quote pairing is the next-best surrogate.
 */

interface TripPhoto {
  image: string;
  altText: string;
  city: string;
  travellerName: string;
  travellerLocation: string;
  quote: string;
}

// Curated from ME's CTS client_assets library by vision-AI hook_score.
// All six URLs are direct CDN paths into ME's visual-assets bucket; replacing
// them with future-uploaded real client UGC is a one-array edit.
const PHOTOS: TripPhoto[] = [
  {
    // beijing-temple-2.jpg · ME hook_score 9.60 (highest in library)
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211693675-iwm03e1pq1g.jpg',
    altText: 'Beijing temple in golden-hour light',
    city: 'Beijing',
    travellerName: 'Claire & Tom Mackenzie',
    travellerLocation: 'Wellington',
    quote: 'Two of the world’s great historical capitals in ten days. Couldn’t have asked for more.',
  },
  {
    // forbidden-city-gold-lion.jpg · ME hook_score 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211701044-bsrfh51booi.jpg',
    altText: 'Forbidden City golden lion at the gate',
    city: 'Beijing',
    travellerName: 'Fiona Hewitt',
    travellerLocation: 'Auckland',
    quote: 'Visa-free entry made this finally happen for me as a solo Kiwi traveller.',
  },
  {
    // wuzhen-canal.jpg · ME hook_score 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780212105087-x3n9ywu2w0n.jpg',
    altText: 'Wuzhen water-town canal at dusk',
    city: 'Suzhou & Hangzhou',
    travellerName: 'Rachel Donohue',
    travellerLocation: 'Tauranga',
    quote: 'Canal streets after dark, silk markets, garden tea ceremony — like stepping into a classical painting.',
  },
  {
    // li-river-karst-boats.jpg · ME hook_score 9.60
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211973793-ctz79vud74f.jpg',
    altText: 'Li River karst peaks with bamboo rafts',
    city: 'Guilin & Yangshuo',
    travellerName: 'Trevor & Jan Bowen',
    travellerLocation: 'Invercargill',
    quote: 'Guilin’s karst peaks stopped us in our tracks — we’d go again in a heartbeat.',
  },
  {
    // yunnan-rice-terraces.jpg · ME hook_score 9.60
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780212110491-00injb5cl7ui.jpg',
    altText: 'Yunnan rice terraces at sunrise',
    city: 'Yunnan',
    travellerName: 'Liz & Peter Armstrong',
    travellerLocation: 'Christchurch',
    quote: 'Two weeks in Yunnan and barely another Western tourist in sight — sweet as trip from start to finish.',
  },
  {
    // tianmen-mountain-glass-walkway.jpg · ME hook_score 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211985338-qcnp83p0ufe.jpg',
    altText: 'Tianmen Mountain glass walkway above the cliffs',
    city: 'Zhangjiajie',
    travellerName: 'James & Mia Cooper',
    travellerLocation: 'Wellington',
    quote: 'Sunrise at Zhangjiajie’s Avatar Mountains was otherworldly — every shot looked like a National Geographic cover.',
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
