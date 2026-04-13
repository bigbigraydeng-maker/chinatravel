import Link from 'next/link';
import type { Metadata } from 'next';
import ThankYouClient from './ThankYouClient';

export const metadata: Metadata = {
  title: 'Thank You | CTS Tours',
  description:
    'Your tour enquiry was received. Our China travel specialists for New Zealand will respond shortly.',
  robots: { index: false, follow: true },
};

type SearchParams = Record<string, string | string[] | undefined>;

function pickString(p: SearchParams, key: string): string | undefined {
  const v = p[key];
  if (typeof v === 'string' && v.length > 0) return v;
  return undefined;
}

export default function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
  const tourName = pickString(searchParams, 'tour');
  const slug = pickString(searchParams, 'slug');
  const destination = pickString(searchParams, 'destination');
  const tier = pickString(searchParams, 'tier');

  const tourBackHref =
    destination && tier && slug ? `/tours/${destination}/${tier}/${slug}` : '/tours';

  return (
    <>
      <ThankYouClient tourSlug={slug} tourName={tourName} />
      <main className="min-h-[70vh] bg-gradient-to-b from-warm-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-secondary/15 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-accent mb-4">Thank you</h1>
          <p className="text-lg text-gray-700 mb-2">
            {tourName ? (
              <>
                We have received your enquiry about <span className="font-semibold text-accent">{tourName}</span>.
              </>
            ) : (
              <>We have received your enquiry.</>
            )}
          </p>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Our travel specialists will contact you within <strong>24 hours</strong> (New Zealand business hours).
            If your request is urgent, call us on{' '}
            <a href="tel:0800287888" className="text-primary font-semibold hover:underline">
              0800 CTS 888
            </a>{' '}
            (0800 287 888).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={tourBackHref}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary text-white font-semibold hover:opacity-95 transition-opacity shadow-md"
            >
              {slug ? 'Back to tour' : 'Browse tours'}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border-2 border-warm-200 text-accent font-semibold hover:bg-warm-50 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
