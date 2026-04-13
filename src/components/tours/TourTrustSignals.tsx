import Image from 'next/image';
import Link from 'next/link';
import { migratedSite } from '@/lib/site-media';

/**
 * Product-page trust strip: NZ industry credentials + deep link to full About credentials.
 * Anchor id for campaign / QA: #trust-signals
 */
export default function TourTrustSignals() {
  const logos: { src: string; alt: string; wide?: boolean }[] = [
    { src: migratedSite('credentials-taanz.png'), alt: 'TAANZ — Travel Agents Association of New Zealand' },
    { src: migratedSite('credentials-iata.png'), alt: 'IATA accredited agent' },
    { src: migratedSite('credentials-qualmark.png'), alt: 'Qualmark recognised' },
    { src: migratedSite('credentials-tourism-export-council.png'), alt: 'Tourism Export Council New Zealand', wide: true },
  ];

  return (
    <section
      id="trust-signals"
      className="scroll-mt-24 border-y border-warm-200 bg-white"
      aria-labelledby="trust-signals-heading"
    >
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 id="trust-signals-heading" className="font-serif text-xl font-bold text-gray-900 md:text-2xl">
              Book with a licensed New Zealand travel specialist
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              CTS Tours is a TAANZ member and IATA-accredited agency with local support in Auckland and direct operations
              in China—so you deal with one trusted team from enquiry to return.
            </p>
            <Link
              href="/about#credentials"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View memberships &amp; credentials
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:justify-end">
            {logos.map(({ src, alt, wide }) => (
              <div
                key={src}
                className={`relative h-12 shrink-0 opacity-90 grayscale transition hover:grayscale-0 ${wide ? 'w-28 md:w-32' : 'w-20 md:w-24'}`}
              >
                <Image src={src} alt={alt} fill className="object-contain object-center" sizes="128px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
