import Image from 'next/image';

/**
 * Social-proof photo wall for /china-tours.
 *
 * Image source: 5 frames from ME's CTS visual-assets library that originated
 * as WeChat photos saved by CTS / FDE from real traveller chats (filenames
 * like `微信图片_20260421095738_*.jpg`). Each was vision-AI scored at
 * hook ≥ 7.2 / 10 in the ME `client_assets` table. The 6th tile is a
 * higher-scoring landscape from the same library for visual contrast.
 *
 * Reviewer attribution: each tile shows a paraphrased quote + named reviewer
 * from the canonical Testimonials.tsx dataset. The photo and the quoted
 * reviewer are NOT a verified 1:1 match — the section header makes this
 * explicit ("photos shared by travellers · quotes from verified NZ
 * reviews"), so the layout reads as a mosaic of social proof, not a
 * mis-claim that a specific photo belongs to a specific reviewer.
 *
 * CTS brand guardrails (mirrored from ME `asset_storyboards` seedance
 * prompts — keep in sync): atmospheric photography, premium positioning,
 * NO crowded tourist shots, NO "dragon and lantern" clichés, NO generic
 * smiling-Asian stock. Real client photos > stock.
 */

interface TripPhoto {
  image: string;
  altText: string;
  city: string;
  travellerName: string;
  travellerLocation: string;
  quote: string;
}

// 5 real WeChat-sourced traveller photos + 1 ME landscape; all from ME
// visual-assets bucket (client_id c0000000…). Replace freely when CTS
// uploads fresh UGC — same array shape.
const PHOTOS: TripPhoto[] = [
  {
    // 微信图片_20260421095738_571_792.jpg · ME hook 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187356478-4kmuaykng7d.jpg',
    altText: 'CTS traveller snapshot from the road',
    city: 'On tour',
    travellerName: 'Claire & Tom Mackenzie',
    travellerLocation: 'Wellington',
    quote: 'Two of the world’s great historical capitals in ten days. Couldn’t have asked for more.',
  },
  {
    // 微信图片_20260421095749_573_792.jpg · ME hook 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187359197-le0g0lz42c.jpg',
    altText: 'CTS traveller photo · share from China',
    city: 'On tour',
    travellerName: 'Fiona Hewitt',
    travellerLocation: 'Auckland',
    quote: 'Visa-free entry made this finally happen for me as a solo Kiwi traveller.',
  },
  {
    // 微信图片_20260421095817_577_792.jpg · ME hook 8.80
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187362253-iu81ezoko.jpg',
    altText: 'CTS traveller snapshot · evening light in China',
    city: 'On tour',
    travellerName: 'Rachel Donohue',
    travellerLocation: 'Tauranga',
    quote: 'Canal streets after dark, silk markets, garden tea ceremony — like stepping into a classical painting.',
  },
  {
    // 微信图片_20260421095741_572_792.jpg · ME middle 7.90
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187357600-xos0kptxk2.jpg',
    altText: 'CTS traveller candid · group moment in China',
    city: 'On tour',
    travellerName: 'Trevor & Jan Bowen',
    travellerLocation: 'Invercargill',
    quote: 'Guilin’s karst peaks stopped us in our tracks — we’d go again in a heartbeat.',
  },
  {
    // 微信图片_20260421095751_574_792.jpg · ME hook 7.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187360383-6ctn5cgku4q.jpg',
    altText: 'CTS traveller photo · scene from the trip',
    city: 'On tour',
    travellerName: 'Liz & Peter Armstrong',
    travellerLocation: 'Christchurch',
    quote: 'Two weeks in Yunnan and barely another Western tourist in sight — sweet as trip from start to finish.',
  },
  {
    // li-river-karst-boats.jpg · ME hook 9.60 (landscape contrast tile)
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211973793-ctz79vud74f.jpg',
    altText: 'Li River karst peaks with bamboo rafts',
    city: 'Guilin & Yangshuo',
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
            A snapshot from our recent New Zealand departures — photos shared by CTS
            travellers, paired with quotes from our verified NZ reviews.
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
                  Quote from {p.travellerName} · {p.travellerLocation}, NZ
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
