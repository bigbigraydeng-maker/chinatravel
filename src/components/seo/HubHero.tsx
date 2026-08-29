// Hero section for SEO hub pages (china-tours, beijing-tours, etc.)

import React from 'react';
import Image from 'next/image';

interface HubHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  /** Merged with default `object-cover` on the hero image (e.g. object-[center_30%]). */
  imageClassName?: string;
  /** Attribution line for CC-licensed hero images (e.g. 'Photo: Name, CC BY-SA 4.0, via Wikimedia Commons'). */
  imageCredit?: string;
}

const DEFAULT_HERO =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg';

/** Next/Image only accepts a real URL/path — not CSS like `linear-gradient(...), url(...)`. */
function isOptimizableImageSrc(src: string): boolean {
  const s = src.trim();
  if (!s) return false;
  if (s.includes('linear-gradient') || s.includes('radial-gradient')) return false;
  return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/');
}

const HubHero: React.FC<HubHeroProps> = ({
  title,
  subtitle,
  backgroundImage = DEFAULT_HERO,
  imageClassName,
  imageCredit,
}) => {
  const raw = backgroundImage?.trim() || DEFAULT_HERO;
  const useNextImage = isOptimizableImageSrc(raw);

  return (
    /*
      Ceepii hero language, adapted for a content page.
      - Taller and bottom-aligned rather than a short centred band, so the
        image reads as a photograph rather than a header strip.
      - Ceepii runs its hero at lg:min-h-dvh. Full height is wrong here: these
        are SEO pages whose value is the copy below, and a full viewport of
        image pushes it entirely below the fold. 70vh clamped to 520-680px is
        the compromise — noticeably immersive, still shows content starting.

        Sized with `h` plus min/max rather than `min-h` alone. min-height wins
        over max-height in CSS, so `min-h-[70vh] max-h-[680px]` would let the
        hero grow unbounded on a tall viewport with the max silently ignored.
        Caught on a 3200px-tall screenshot where the hero ran past 2000px.
      - Left-aligned. Centred display type is the single most "template" thing
        about the old hero.
      - A gradient scrim instead of a flat 40% wash: darkest where the text
        sits, nearly clear at the top, so more of the photograph survives while
        contrast under the copy actually improves.
    */
    <section className="relative flex min-h-[440px] items-end overflow-hidden text-white md:h-[70vh] md:min-h-[520px] md:max-h-[680px]">
      {useNextImage ? (
        <Image
          src={raw}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={['object-cover z-0', imageClassName].filter(Boolean).join(' ')}
        />
      ) : (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: raw }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/40 to-black/10"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-[2] container mx-auto px-4 pb-12 md:pb-16 lg:pb-20">
        <h1 className="max-w-3xl font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">
          {subtitle}
        </p>
      </div>

      {imageCredit && (
        <span className="absolute bottom-1 right-2 z-[2] text-[10px] leading-tight text-white/50">
          {imageCredit}
        </span>
      )}
    </section>
  );
};

export default HubHero;
