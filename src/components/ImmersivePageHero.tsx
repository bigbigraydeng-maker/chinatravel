'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

export type ImmersivePageHeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  eyebrow?: string;
  children?: ReactNode;
  layout?: 'center' | 'bottom';
  tall?: boolean;
  textAlign?: 'center' | 'left';
};

/**
 * Client component: avoids Next 14 RSC + nested client children (e.g. Tailor Made)
 * tripping webpack flight chunks (undefined factory). Visual stack unchanged.
 */
export default function ImmersivePageHero({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  priority = false,
  eyebrow,
  children,
  layout = 'center',
  tall = false,
  textAlign = 'center',
}: ImmersivePageHeroProps) {
  const justify =
    layout === 'bottom'
      ? 'justify-end pb-12 pt-28 md:pb-16 md:pt-32'
      : 'justify-center py-16 md:py-24';

  const minH = tall
    ? 'min-h-[min(78svh,880px)] min-h-[480px]'
    : 'min-h-[min(58svh,640px)] min-h-[380px] md:min-h-[min(62svh,680px)]';

  return (
    <section
      className={`relative flex w-full flex-col overflow-hidden ${minH} ${justify}`}
      aria-labelledby="immersive-page-hero-title"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Linear overlays only — avoids tiled/artifact looks from complex gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/15 to-slate-950/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" aria-hidden />
      </div>

      <div
        className={`relative z-10 container mx-auto w-full max-w-5xl px-4 ${
          textAlign === 'left' ? 'text-center md:text-left' : 'text-center'
        }`}
      >
        <div
          className={
            textAlign === 'left'
              ? 'mx-auto max-w-3xl md:mx-0 md:max-w-2xl'
              : 'mx-auto max-w-3xl'
          }
        >
          {eyebrow ? (
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70 md:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="immersive-page-hero-title"
            className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.35)] md:text-5xl lg:text-[3.25rem]"
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg font-light leading-relaxed text-white/95 md:text-xl [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              {subtitle}
            </p>
          ) : null}
          {description ? (
            <p className="mt-4 text-base font-light leading-relaxed text-white/88 md:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
              {description}
            </p>
          ) : null}
        </div>
        {children ? (
          <div
            className={`mt-8 w-full max-w-4xl ${textAlign === 'left' ? 'md:mx-0' : 'mx-auto'}`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
