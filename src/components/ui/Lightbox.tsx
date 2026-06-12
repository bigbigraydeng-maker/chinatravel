'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export interface LightboxImage {
  src: string;
  alt?: string;
  /** Extra Tailwind classes for object-position tuning on the thumbnail. */
  imgClass?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Desktop column count for the thumbnail grid. */
  columns?: 2 | 3 | 4;
  /** Tailwind aspect-ratio class for thumbnails. */
  thumbnailAspect?: string;
}

const COLS: Record<NonNullable<LightboxProps['columns']>, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

/**
 * Accessible, dependency-free image gallery with a click-to-zoom lightbox.
 * Thumbnails open a full-screen viewer with large, touch-friendly controls
 * (prev / next / close), keyboard navigation (← → Esc) and an image counter —
 * tuned for an older audience that relies on clear tap targets over hover.
 */
export default function Lightbox({ images, columns = 3, thumbnailAspect = 'aspect-square' }: LightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback(
    (next: number) => setOpenIndex((i) => (i === null ? i : (next + images.length) % images.length)),
    [images.length],
  );

  // Keyboard navigation + body scroll lock while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show((openIndex as number) + 1);
      else if (e.key === 'ArrowLeft') show((openIndex as number) - 1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, openIndex, show, close]);

  if (images.length === 0) return null;

  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className={`grid grid-cols-2 ${COLS[columns]} gap-3`}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View photo ${i + 1} of ${images.length}`}
            className={`relative overflow-hidden rounded-lg ${thumbnailAspect} bg-warm-100 group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
          >
            <Image
              src={img.src}
              alt={img.alt ?? `Photo ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={['object-cover group-hover:scale-105 transition-transform duration-500', img.imgClass]
                .filter(Boolean)
                .join(' ')}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {isOpen && current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          {/* Prev / Next — only when there is more than one image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); show(openIndex! - 1); }}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 5 8 12 15 19" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); show(openIndex! + 1); }}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 5 16 12 9 19" />
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative h-[80vh] w-[92vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt ?? `Photo ${openIndex! + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption + counter */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1 px-4 text-center text-white">
            {current.alt && <p className="text-sm sm:text-base">{current.alt}</p>}
            <span className="text-xs text-white/70">{openIndex! + 1} / {images.length}</span>
          </div>
        </div>
      )}
    </>
  );
}
