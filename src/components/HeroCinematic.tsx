'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

/**
 * Cinematic hero — internal preview variant of the homepage hero.
 *
 * Rendered ONLY on /preview-hero (noindex). The live homepage keeps using
 * <Hero /> until the redesign is signed off. Differences vs <Hero />:
 *  - film-grade overlays: warm colour grade + inset vignette + film grain +
 *    letterbox bars, for the "movie still" look
 *  - larger serif headline and an optional "Watch our China film" affordance
 *  - same background asset and <SearchBar /> as the live hero (proven to work)
 */
const HeroCinematic = () => {
  const handleFilmClick = () => {
    // TODO: wire to a video modal / YouTube embed once the film asset exists.
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_film_click', {
        event_category: 'engagement',
        event_label: 'hero_cinematic_film',
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1A1411]">
      {/* Background photo (existing Supabase asset) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg"
          alt="Great Wall of China at dawn"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
      </div>

      {/* Warm colour grade + legibility darkening */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-black/10 to-black/90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-primary/25 via-transparent to-secondary/15"
        aria-hidden
      />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{ boxShadow: 'inset 0 0 300px 80px rgba(6,4,3,0.72)' }}
        aria-hidden
      />

      {/* Letterbox bars (top / bottom) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-14 bg-gradient-to-b from-black/85 to-transparent md:h-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-14 bg-gradient-to-t from-black/85 to-transparent md:h-16"
        aria-hidden
      />

      {/* Film grain */}
      <svg
        className="pointer-events-none absolute inset-0 z-[5] h-full w-full opacity-[0.10] mix-blend-overlay"
        aria-hidden
      >
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center text-white">
        <div className="mb-7 inline-block animate-fade-in-up rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-white/90">
            Signature &amp; Discovery journeys across China
          </p>
        </div>

        <h1
          className="mb-6 animate-fade-in-up font-serif text-5xl font-bold leading-[1.03] tracking-tight md:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.2s' }}
        >
          See <em className="italic text-secondary">all of China</em>,<br />
          the way it deserves.
        </h1>

        <p
          className="mx-auto mb-10 max-w-2xl animate-fade-in-up text-xl font-light leading-relaxed text-white/90 md:text-2xl"
          style={{ animationDelay: '0.4s' }}
        >
          Fully-hosted small groups and tailor-made journeys, designed in New Zealand
          and led by China specialists — from the Great Wall to the Li River.
        </p>

        {/* Search */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
          <SearchBar />
        </div>

        {/* Film affordance */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            type="button"
            onClick={handleFilmClick}
            className="group inline-flex items-center gap-3 font-medium text-white"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition group-hover:scale-105 group-hover:border-primary group-hover:bg-primary">
              <svg className="h-4 w-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch our China film
          </button>
        </div>

        {/* Authority row */}
        <div
          className="mt-9 flex animate-fade-in-up flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-white/85"
          style={{ animationDelay: '0.65s' }}
        >
          <span>
            <span className="text-secondary">●</span>{' '}
            <b className="font-semibold text-white">98 years</b> of China expertise
          </span>
          <span>
            <span className="text-secondary">●</span>{' '}
            <b className="font-semibold text-white">10,000+</b> Kiwi travellers hosted
          </span>
          <span>
            <span className="text-secondary">●</span> TAANZ-bonded &amp; IATA-accredited
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">Scroll</span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-secondary to-transparent" />
      </div>
    </section>
  );
};

export default HeroCinematic;
