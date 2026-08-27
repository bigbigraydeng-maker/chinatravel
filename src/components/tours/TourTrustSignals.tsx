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

  const confidenceBadges: { title: string; body: string; icon: React.ReactNode }[] = [
    {
      title: 'Free changes up to 60 days',
      body: 'Amend dates or travellers at no fee until 60 days before departure.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'NZ-based specialist team',
      body: 'Speak to a Kiwi consultant in Auckland — one team, enquiry to return.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
      ),
    },
    {
      title: 'Backed by CTS · Founded 1928',
      body: 'CTS Tours NZ has run Kiwi-led tours from Auckland since 2000 (25 years), backed by China Travel Service (founded 1928) — hotels, guides, transport we run ourselves.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.169c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.363 1.118l1.287 3.966c.3.921-.755 1.688-1.539 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.363-1.118L2.06 9.393c-.784-.57-.381-1.81.587-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ),
    },
    {
      title: 'TAANZ bonded & IATA',
      body: 'Client funds held in a TAANZ-bonded trust — protected if travel plans are disrupted.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
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
            <p className="mt-2 text-base text-gray-700">
              CTS Tours is a TAANZ member and IATA-accredited agency with local support in Auckland and direct operations
              in China—so you deal with one trusted team from enquiry to return.
            </p>
            <Link
              href="/about#credentials"
              className="mt-3 inline-flex items-center gap-1 py-2 text-base font-semibold text-primary hover:underline"
            >
              View memberships &amp; credentials
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:justify-end">
            {logos.map(({ src, alt, wide }) => (
              <div
                key={src}
                className={`relative h-12 shrink-0 ${wide ? 'w-28 md:w-32' : 'w-20 md:w-24'}`}
              >
                <Image src={src} alt={alt} fill className="object-contain object-center" sizes="128px" />
              </div>
            ))}
          </div>
        </div>

        {/* Book With Confidence — 4 assurance badges */}
        <div className="mt-8 pt-8 border-t border-warm-200">
          <h3 className="text-center font-serif text-lg font-bold text-gray-900 mb-6">Book with confidence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {confidenceBadges.map(({ title, body, icon }) => (
              <div key={title} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                  {icon}
                </div>
                <p className="font-semibold text-sm md:text-base text-gray-900 leading-tight">{title}</p>
                <p className="mt-1 text-xs md:text-sm text-gray-600 leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
