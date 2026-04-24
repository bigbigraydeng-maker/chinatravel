// Hero section for SEO hub pages (china-tours, beijing-tours, etc.)

import React from 'react';
import Image from 'next/image';

interface HubHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  /** Merged with default `object-cover` on the hero image (e.g. object-[center_30%]). */
  imageClassName?: string;
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
}) => {
  const raw = backgroundImage?.trim() || DEFAULT_HERO;
  const useNextImage = isOptimizableImageSrc(raw);

  return (
    <section className="relative h-96 md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      {useNextImage ? (
        <>
          <Image
            src={raw}
            alt={title}
            fill
            priority
            sizes="100vw"
            className={['object-cover z-0', imageClassName].filter(Boolean).join(' ')}
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: raw }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden />
        </>
      )}

      {/* Content */}
      <div className="relative z-[2] container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/90">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HubHero;
