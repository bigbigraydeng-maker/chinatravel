import type { Metadata } from 'next';
import { TermsArticle, TermsTableOfContents } from './TermsContent';
import { TermsMobileToc } from './TermsMobileToc';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Booking | CTS Tours',
  description:
    'Terms and conditions for bookings with China Travel Service (New Zealand) Limited, trading as CTS Tours. Updated March 2026.',
  openGraph: {
    title: 'Terms & Conditions | CTS Tours',
    description: 'Booking terms and conditions for CTS Tours New Zealand.',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-light via-warm-50 to-light">
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            CTS Tours
          </p>
          <h1 className="mx-auto max-w-4xl text-center font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
            Terms & Conditions of Booking
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-white/90 md:text-lg">
            China Travel Service (New Zealand) Limited, trading as CTS Tours
          </p>
          <p className="mt-6 text-center text-sm text-white/70">Updated March 2026</p>
        </div>
      </section>

      <section className="section pb-24 pt-10 md:pt-14">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
            <div className="hidden lg:block">
              <TermsTableOfContents />
            </div>
            <div>
              <TermsMobileToc />
              <TermsArticle />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
