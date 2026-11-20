import Image from 'next/image';
import { Phone } from 'lucide-react';
import { CTS_PHONE_DISPLAY } from '@/lib/site';
import { CallLink, OpenEnquiryButton } from './enquiry-launcher';
import type { HeroProps } from './WaterTownHero';

/** "NZD $2,699" -> { currency: 'NZD', amount: '$2,699' }; anything else is shown whole. */
function splitPrice(price: string): { currency: string | null; amount: string } {
  const match = price.match(/^([A-Z]{3})\s*(\S.*)$/);
  return match ? { currency: match[1], amount: match[2] } : { currency: null, amount: price };
}

/**
 * Hero that mirrors the tour's Reel: one full-bleed photograph, a red block with white bold type on its lower part,
 * and the price as the biggest thing on the screen. Built for people arriving from an email: the price is the hook,
 * the next screen is the other tours. Duration and price come from the tour data; nothing is typed here.
 */
export default function PriceBannerHero({ config, tour, imageSrc, fromPrice }: HeroProps) {
  const { hero } = config;
  const price = fromPrice ? splitPrice(fromPrice) : null;

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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-950/70 via-transparent to-gray-950/10" />
      <div className="flex min-h-[34rem] flex-col justify-end px-4 pb-6 pt-24 sm:min-h-[38rem] sm:px-8 sm:pb-8">
        <div className="rounded-xl bg-primary/95 px-5 py-6 shadow-xl sm:px-8 sm:py-8">
          <p className="text-base font-semibold text-white">
            {hero.eyebrow} · {tour.duration.toLowerCase()} from Auckland
          </p>
          <h1 id="hero-heading" className="mt-2 text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            {hero.headline}
          </h1>
          {price ? (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 leading-none">
              <span className="text-7xl font-extrabold tracking-tight sm:text-8xl">{price.amount}</span>
              <span className="text-lg font-semibold text-white/90 sm:text-xl">
                {price.currency ? `${price.currency} ` : ''}per person · twin share
              </span>
            </p>
          ) : null}
          <p className="mt-4 max-w-xl text-lg font-semibold leading-snug text-white">
            {hero.subhead.map((item) => item.text).join(' · ')}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <OpenEnquiryButton
              id="hero-cta"
              location="hero"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-primary shadow-lg transition-colors hover:bg-white/90"
            >
              Send Enquiry
            </OpenEnquiryButton>
            <CallLink
              location="hero"
              className="inline-flex min-h-[44px] items-center gap-2 text-lg font-semibold text-white underline decoration-white/60 underline-offset-4"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              Call {CTS_PHONE_DISPLAY}
            </CallLink>
          </div>
        </div>
      </div>
    </section>
  );
}
