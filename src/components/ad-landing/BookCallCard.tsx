import { Phone } from 'lucide-react';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HOURS } from '@/lib/site';
import { CallLink, OpenEnquiryButton } from './enquiry-launcher';

/** The page's main prompt: speak to a consultant. The title is the config's; the number and hours come from the site. */
export default function BookCallCard({ title }: { title: string }) {
  return (
    <section aria-labelledby="book-call-heading" className="rounded-2xl bg-primary px-6 py-8 text-white sm:px-10 sm:py-10">
      <h2 id="book-call-heading" className="text-3xl font-extrabold leading-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-white">
        {CTS_PHONE_HOURS} · talk it through with a real person, no form needed.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <CallLink
          location="book_call"
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-primary shadow-lg"
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
          Call {CTS_PHONE_DISPLAY}
        </CallLink>
        <OpenEnquiryButton
          location="book_call"
          className="inline-flex min-h-[44px] items-center text-lg font-semibold text-white underline decoration-white/70 underline-offset-4"
        >
          Or send an enquiry
        </OpenEnquiryButton>
      </div>
    </section>
  );
}
