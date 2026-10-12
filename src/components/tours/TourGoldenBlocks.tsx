import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { departures } from '@/lib/tour-discovery';

/**
 * Opt-in blocks for the "tour page golden structure" (departure and price table,
 * booking terms in plain words). Rendered only when `tour.goldenBlocks` is true,
 * so the rest of the catalogue is unchanged until each product is reviewed.
 *
 * Every figure here is either read from the tour entry (dates, prices, duration)
 * or taken from the published Terms & Conditions of Booking
 * (/terms-and-conditions, "Updated March 2026"). Nothing is inferred.
 */

function displayPrice(price: string): string {
  return price.replace(/\s*(?:per\s+person|pp)\s*$/i, '');
}

interface DepartureRow {
  label: string;
  returnDate: string | null;
  price: string | null;
}

function buildRows(tour: Tour): DepartureRow[] {
  const confirmed: DepartureRow[] = departures(tour).map((d) => ({
    label: d.label,
    returnDate: computeReturnDate(d.label, tour.duration),
    price: displayPrice(d.price),
  }));
  const pending: DepartureRow[] = (tour.pendingDepartures ?? []).map((label) => ({
    label,
    returnDate: computeReturnDate(label, tour.duration),
    price: null,
  }));
  return [...confirmed, ...pending];
}

export function TourDepartureTable({ tour }: { tour: Tour }) {
  if (!tour.goldenBlocks || tour.soldOut) return null;
  const rows = buildRows(tour);
  if (rows.length === 0) return null;
  const hasPending = rows.some((r) => r.price === null);

  return (
    <section id="departures" className="scroll-mt-24">
      <h2 className="font-serif text-3xl">Departure dates and prices.</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Scheduled group departures from Auckland. Prices are per person in NZD, twin share. See What&apos;s
        Included below for exactly what the price covers.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-warm-200 bg-white">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <caption className="sr-only">{tour.name} departure dates and prices</caption>
          <thead className="bg-warm-50 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Departs Auckland</th>
              <th scope="col" className="px-4 py-3 font-semibold">Returns</th>
              <th scope="col" className="px-4 py-3 font-semibold">Price per person (twin share)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-warm-200">
                <th scope="row" className="px-4 py-3 font-semibold">{row.label}</th>
                <td className="px-4 py-3 text-ink-muted">{row.returnDate ?? 'On request'}</td>
                <td className="px-4 py-3">
                  {row.price ? (
                    <span className="font-semibold text-primary">{row.price}</span>
                  ) : (
                    <span className="text-ink-muted">Price to be confirmed — ask us</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tour.singleSupplement && (
        <p className="mt-3 text-sm text-ink-muted">
          <strong className="text-ink">Travelling solo?</strong> A private room is an additional{' '}
          <strong className="text-primary">{tour.singleSupplement}</strong>
          {tour.singleSupplementNote ? ` — ${tour.singleSupplementNote}` : ''}.
        </p>
      )}
      {hasPending && (
        <p className="mt-2 text-xs text-ink-muted">
          Dates marked &ldquo;to be confirmed&rdquo; are planned but not yet open for booking at a published
          price. Send an enquiry and we will tell you where they stand.
        </p>
      )}
      <a
        href="#enquiry"
        className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
      >
        Check availability →
      </a>
    </section>
  );
}

/** Cancellation steps exactly as published in the Terms & Conditions of Booking. */
const CANCELLATION_STEPS: Array<{ when: string; cost: string }> = [
  { when: '90 days or more before departure', cost: 'You lose the deposit, plus administration fees and the cost of any air and cruise tickets already issued.' },
  { when: '89 to 61 days before departure', cost: 'You lose the deposit and 50% of the total booking cost, plus the cost of air and cruise tickets.' },
  { when: '60 to 31 days before departure', cost: 'You lose the deposit and 75% of the total booking cost, plus the cost of air and cruise tickets.' },
  { when: '30 days or less before departure', cost: 'You lose the deposit and 100% of the total booking cost, plus the cost of air and cruise tickets.' },
];

export function TourBookingTerms({ tour }: { tour: Tour }) {
  if (!tour.goldenBlocks || tour.soldOut) return null;

  return (
    <section id="booking-terms" className="scroll-mt-24">
      <h2 className="font-serif text-3xl">How booking works, in plain words.</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        A summary of our{' '}
        <Link href="/terms-and-conditions" className="text-primary underline">
          Terms &amp; Conditions of Booking
        </Link>{' '}
        (updated March 2026) so there are no surprises. The full terms apply.
      </p>
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-warm-200 bg-white p-5">
          <dt className="font-semibold">Deposit</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            A non-refundable deposit of NZD $1,000 per person confirms your booking, payable within 3
            working days of reserving. Your booking is not confirmed until we receive it.
          </dd>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white p-5">
          <dt className="font-semibold">Final payment</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            Due 90 days before departure for itineraries under 15 days, or 120 days before departure for
            itineraries of 15 days or longer (or with an ocean cruise). We confirm your exact due date when
            you book.
          </dd>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white p-5">
          <dt className="font-semibold">Tips</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            Tipping is prepaid in New Zealand before you leave, so there is no cash to hand out in China. We
            suggest NZD $10 per person per day, and confirm the exact amount when you book.
          </dd>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white p-5">
          <dt className="font-semibold">Shopping stops</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            Some itineraries include a visit to a local speciality store, such as a silk or jade workshop.
            There is no obligation to buy and no minimum spend.
          </dd>
        </div>
      </dl>
      <h3 className="mt-8 font-semibold">If you need to cancel</h3>
      <p className="mt-2 text-sm text-ink-muted">
        Cancellations must be made in writing. Charges run from the date we receive your written cancellation.
      </p>
      <ol className="mt-4 space-y-2">
        {CANCELLATION_STEPS.map((step) => (
          <li key={step.when} className="rounded-lg bg-warm-50 px-4 py-3 text-sm">
            <strong className="text-ink">{step.when}:</strong>{' '}
            <span className="text-ink-muted">{step.cost}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-muted">
        We strongly recommend comprehensive travel insurance at the time of booking to protect your deposit.
      </p>
      {tour.planLinks && tour.planLinks.length > 0 && (
        <>
          <h3 className="mt-8 font-semibold">Plan this trip</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tour.planLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-full border border-primary/20 bg-white px-4 py-2 text-sm text-primary hover:bg-warm-50"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
