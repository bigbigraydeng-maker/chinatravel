'use client';

import Image from 'next/image';
import HeroSearchGlass from './HeroSearchGlass';

/**
 * Cinematic hero — internal preview variant of the homepage hero.
 *
 * Rendered ONLY on /preview-hero (noindex). The live homepage keeps using
 * <Hero /> until the redesign is signed off. The "film" feel comes from framing
 * and motion — NOT from darkening — so the Great Wall stays luminous:
 *  1. slow Ken Burns push-in on the photo (film motion)
 *  2. a light colour grade + a localised scrim only behind the headline
 *  3. a gentle vignette + subtle film grain
 *  4. cinemascope letterbox bars (solid black, top & bottom)
 *  5. glass segmented search (Destination / When / Style) matching the concept
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0E0A08]">
      {/* Component-scoped cinematic motion (respects reduced-motion via globals reset) */}
      <style>{`
        @keyframes heroKenBurns {
          from { transform: scale(1.08); }
          to   { transform: scale(1.22) translate3d(0, -1.5%, 0); }
        }
        .hero-kenburns { animation: heroKenBurns 26s ease-out forwards; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .hero-kenburns { animation: none; transform: scale(1.08); } }
      `}</style>

      {/* Background photo with slow push-in (existing Supabase asset).
          Kept luminous on purpose — the Great Wall is the hero, not a dark
          backdrop. Cinematic feel comes from letterbox + motion, NOT darkening. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg"
            alt="Great Wall of China at dawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Light mood grade: barely touch the top (keep the Wall bright), a little
          more at the bottom so the search bar + authority row stay legible. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-transparent to-black/60"
        aria-hidden
      />
      {/* Subtle warm tint */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-primary/12 via-transparent to-secondary/10"
        aria-hidden
      />
      {/* Localised scrim ONLY behind the headline block — keeps corners/Wall bright
          while guaranteeing white-text contrast. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 72% 52% at 50% 40%, rgba(8,5,4,0.52), transparent 70%)' }}
        aria-hidden
      />

      {/* Gentle cinematic vignette (light — corners kept readable) */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{ boxShadow: 'inset 0 0 220px 60px rgba(6,4,3,0.45)' }}
        aria-hidden
      />

      {/* Film grain (light) */}
      <svg
        className="pointer-events-none absolute inset-0 z-[4] h-full w-full opacity-[0.08] mix-blend-overlay"
        aria-hidden
      >
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      {/* Cinemascope letterbox bars (solid black, framing the frame) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-10 bg-black md:h-16" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-10 bg-black md:h-16" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center text-white">
        <div className="mb-7 inline-block animate-fade-in-up rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-white/90">
            Signature &amp; Discovery journeys across China
          </p>
        </div>

        <h1
          className="mb-6 animate-fade-in-up font-serif text-5xl font-bold leading-[1.03] tracking-tight md:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.2s', textShadow: '0 4px 40px rgba(0,0,0,0.55)' }}
        >
          See <em className="italic text-secondary">all of China</em>,<br />
          the way it deserves.
        </h1>

        <p
          className="mx-auto mb-10 max-w-2xl animate-fade-in-up text-xl font-light leading-relaxed text-white/90 md:text-2xl"
          style={{ animationDelay: '0.4s', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Fully-hosted small groups and tailor-made journeys, designed in New Zealand
          and led by China specialists — from the Great Wall to the Li River.
        </p>

        {/* Search — glass segmented (concept-matching) */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
          <HeroSearchGlass />
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

      {/* Scroll cue (sits above the bottom letterbox bar) */}
      <div className="absolute bottom-3 left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-secondary to-transparent" />
      </div>
    </section>
  );
};

export default HeroCinematic;
