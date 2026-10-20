import Image from 'next/image';
import type { Tour } from '@/lib/data/tours';
import type { AdLandingConfig } from '@/lib/ad-landing/types';
import { OpenEnquiryButton } from './enquiry-launcher';

export interface HeroProps {
  config: AdLandingConfig;
  tour: Tour;
  /** The picture the hero stands on. */
  imageSrc: string;
  /** Price of the first bookable departure, e.g. 'NZD $2,699'; null when nothing is bookable. */
  fromPrice: string | null;
}

/** "A, B and C." Built from the config's sourced phrases, so the subhead says nothing the tour data does not. */
function sentence(parts: string[]): string {
  if (parts.length === 0) return '';
  const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
  return `${list}.`;
}

/**
 * Hero for the water-town loop: one full-width photograph with the words on its lower third, the main button and the
 * price. The duration comes from the tour data; the page never types a figure of its own.
 */
export default function WaterTownHero({ config, tour, imageSrc, fromPrice }: HeroProps) {
  const { hero } = config;
  const eyebrow = `${hero.eyebrow} · ${tour.duration.toLowerCase()} from Auckland`;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-gray-900 text-white lg:rounded-2xl">
      <Image
        src={imageSrc}
        alt={hero.imageAlt}
        fill
        priority
        sizes="(min-width: 1024px) 45rem, 100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-950/90 via-gray-950/60 to-gray-950/15" />
      {hero.imageCaption ? (
        <p className="absolute right-4 top-4 rounded-md bg-black/45 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
          {hero.imageCaption}
        </p>
      ) : null}
      <div className="flex min-h-[30rem] flex-col justify-end px-5 pb-8 pt-28 sm:min-h-[34rem] sm:px-8 sm:pb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">{eyebrow}</p>
        <h1 id="hero-heading" className="mt-3 font-serif text-4xl leading-[1.1] [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] sm:text-5xl">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">{sentence(hero.subhead.map((item) => item.text))}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <OpenEnquiryButton
            id="hero-cta"
            location="hero"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-primary/90"
          >
            Send Enquiry
          </OpenEnquiryButton>
          {fromPrice ? (
            <p className="leading-tight">
              <span className="block text-sm text-white/75">From</span>
              <span className="text-3xl font-semibold">{fromPrice}</span>
              <span className="ml-1 text-sm text-white/75">per person</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
