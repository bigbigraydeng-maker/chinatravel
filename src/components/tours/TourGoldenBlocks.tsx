import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { aucklandToday, departures } from '@/lib/tour-discovery';

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
  price: string;
}

/** Departures with a published price whose date has not passed. Nothing else is shown. */
export function getDepartureRows(tour: Tour, today: string = aucklandToday()): DepartureRow[] {
  return departures(tour, today).map((d) => ({
    label: d.label,
    returnDate: computeReturnDate(d.label, tour.duration),
    price: displayPrice(d.price),
  }));
}

/** True when the departure block will render something (used to decide on the nav link). */
export function hasDepartureRows(tour: Tour): boolean {
  if (!tour.goldenBlocks || tour.soldOut) return false;
  return getDepartureRows(tour).length > 0;
}

export function TourDepartureTable({ tour }: { tour: Tour }) {
  if (!hasDepartureRows(tour)) return null;
  const confirmed = getDepartureRows(tour);
  const note = tour.singleSupplementNote?.trim().replace(/\.$/, '');

  return (
    <section id="departures" className="scroll-mt-24">
      <h2 className="font-serif text-3xl">Departure dates and prices.</h2>
      {confirmed.length > 0 && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Scheduled group departures from Auckland. Prices are per person in NZD, twin share. See the
            inclusions on this page for exactly what the price covers.
          </p>
          <div
            className="mt-5 overflow-x-auto rounded-xl border border-warm-200 bg-white"
            role="region"
            aria-label={`${tour.name} departure dates and prices`}
            tabIndex={0}
          >
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
                {confirmed.map((row) => (
                  <tr key={row.label} className="border-t border-warm-200">
                    <th scope="row" className="px-4 py-3 font-semibold">{row.label}</th>
                    <td className="px-4 py-3 text-ink-muted">{row.returnDate ?? 'On request'}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {tour.singleSupplement && confirmed.length > 0 && (
        <p className="mt-3 text-sm text-ink-muted">
          <strong className="text-ink">Travelling solo?</strong> The single supplement (the extra cost of your
          own room) is <strong className="text-primary">{tour.singleSupplement}</strong>
          {note ? ` — ${note}` : ''}.
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

/** Cancellation steps as published in the Terms & Conditions of Booking. */
function cancellationSteps(tickets: string): Array<{ when: string; cost: string }> {
  return [
    { when: '90 days or more before departure', cost: `You lose the deposit, plus administration fees and the cost of any ${tickets} already issued.` },
    { when: '89 to 61 days before departure', cost: `You lose the deposit and 50% of the total booking cost, plus the cost of ${tickets}.` },
    { when: '60 to 31 days before departure', cost: `You lose the deposit and 75% of the total booking cost, plus the cost of ${tickets}.` },
    { when: '30 days or less before departure', cost: `You lose the deposit and 100% of the total booking cost, plus the cost of ${tickets}.` },
  ];
}

function hasCruise(tour: Tour): boolean {
  return tour.itinerary.some((d) => /cruise/i.test(`${d.title} ${d.accommodation ?? ''}`));
}

export function TourBookingTerms({ tour }: { tour: Tour }) {
  if (!tour.goldenBlocks || tour.soldOut) return null;
  const tickets = hasCruise(tour) ? 'air and cruise tickets' : 'air tickets';

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
          <dt className="font-semibold">Tips</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            Tipping is prepaid in New Zealand before you leave, and we confirm the exact amount when you
            book. We suggest NZD $10 per person per day.
          </dd>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white p-5">
          <dt className="font-semibold">Shopping stops</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
            Some itineraries include visits to local speciality stores, such as silk, jade or tea. The
            day-by-day programme lists the stops on this tour. You are never obliged to buy, and there is no
            minimum spend.
          </dd>
        </div>
      </dl>
      <h3 className="mt-8 font-semibold">If you need to cancel</h3>
      <p className="mt-2 text-sm text-ink-muted">
        Cancellations must be made in writing. Charges run from the date we receive your written cancellation.
      </p>
      <ol className="mt-4 space-y-2">
        {cancellationSteps(tickets).map((step) => (
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
