import { CTS_TRIP_REVIEWS } from '@/lib/data/cts-review-quotes';
import type { AccentId } from '@/lib/ad-landing/types';
import SectionHeading from './SectionHeading';

/** Whole stars only, as text for screen readers and as glyphs for the eye. */
function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="text-lg tracking-wider text-secondary">
      {'★'.repeat(rating)}
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

/**
 * Real Google review excerpts, each with the trip the traveller took. The note under the title says whose trips
 * they are, so nobody reads them as reviews of a tour that has not run yet.
 */
export default function TravellerReviews({
  title,
  note,
  accent,
}: {
  title: string;
  note: string;
  accent: AccentId;
}) {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24">
      <SectionHeading id="reviews-heading" title={title} accent={accent} />
      <p className="mt-4 text-base leading-relaxed text-gray-700">{note}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {CTS_TRIP_REVIEWS.map((review) => (
          <li key={review.reviewUid} className="flex flex-col rounded-2xl border border-warm-200 bg-white p-5">
            <Stars rating={review.rating} />
            <blockquote className="mt-3 flex-1 text-base leading-relaxed text-gray-900">
              “{review.excerpt}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-gray-900">{review.author}</p>
            <p className="text-sm text-gray-600">{review.trip} · Google review</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
