import type { Tour } from '@/lib/data/tours';
import { getDepartureRows } from '@/components/tours/TourGoldenBlocks';
import { aucklandToday } from '@/lib/tour-discovery';
import { DEPOSIT_TEXT } from '@/lib/ad-landing/facts';
import type { AccentId } from '@/lib/ad-landing/types';
import SectionHeading from './SectionHeading';
import { OpenEnquiryButton } from './enquiry-launcher';

/**
 * The price block of an ad landing page. It lists only the departures that have not left yet and that have a
 * published price of their own, so the table is never empty and never quotes a price we cannot honour. When nothing
 * is bookable it asks the visitor to get in touch instead. The deposit terms and the booking-terms link are always
 * shown, because they are part of what the visitor is agreeing to.
 */
export default function PriceDepartures({
  tour,
  title,
  accent,
  today = aucklandToday(),
}: {
  tour: Tour;
  title: string;
  accent: AccentId;
  today?: string;
}) {
  const rows = getDepartureRows(tour, today);
  const note = tour.singleSupplementNote?.trim().replace(/\.$/, '');

  return (
    <section id='price' aria-labelledby='price-heading' className='scroll-mt-24'>
      <SectionHeading id='price-heading' title={title} accent={accent} />
      {rows.length > 0 ? (
        <>
          <p className='mt-6 text-base leading-relaxed text-gray-700'>
            Scheduled group departures from Auckland. Prices are per person in NZD, twin share.
          </p>
          <ul className='mt-6 grid gap-4 sm:grid-cols-2'>
            {rows.map((row) => (
              <li key={row.label} className='rounded-2xl border border-warm-200 bg-white p-5'>
                <p className='text-sm font-semibold uppercase tracking-wide text-gray-500'>Departs Auckland</p>
                <p className='font-serif text-2xl text-gray-900'>{row.label}</p>
                {row.returnDate !== null && <p className='mt-1 text-base text-gray-700'>Returns {row.returnDate}</p>}
                <p className='mt-4 text-3xl font-bold text-primary'>{row.price}</p>
                <p className='text-sm text-gray-600'>per person, twin share</p>
              </li>
            ))}
          </ul>
          {tour.singleSupplement && (
            <p className='mt-5 text-base leading-relaxed text-gray-700'>
              <strong className='text-gray-900'>Travelling solo?</strong> The single supplement (the extra cost of your
              own room) is <strong className='text-gray-900'>{tour.singleSupplement}</strong>
              {note ? ` — ${note}` : ''}.
            </p>
          )}
        </>
      ) : (
        <p className='mt-6 text-base leading-relaxed text-gray-700'>Ask us for the next departure date and price.</p>
      )}
      <p className='mt-5 text-base leading-relaxed text-gray-700'>
        {DEPOSIT_TEXT}{' '}
        <a
          href='/terms-and-conditions'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-primary underline'
        >
          Read the full booking terms
        </a>
        .
      </p>
      <OpenEnquiryButton
        location='price'
        className='mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-primary/90'
      >
        Check availability
      </OpenEnquiryButton>
    </section>
  );
}
