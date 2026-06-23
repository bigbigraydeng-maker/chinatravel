'use client';

import { useEffect, useRef } from 'react';

/**
 * Auto-playing muted video background overlaid on the hero region. Improves
 * paid LP visual impact compared to a static image hero. Falls back to the
 * existing TourHero static image if browser blocks autoplay or video fails.
 *
 * Sits absolutely positioned behind the TourHero markup — paired with a
 * dark gradient overlay so headline + CTA remain legible.
 */
export default function HeroVideoOverlay({
  videoSrc = '/videos/china-tours-hero.mp4',
}: {
  videoSrc?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {
      // Autoplay blocked → leave the static poster visible. No crash.
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
    </div>
  );
}
