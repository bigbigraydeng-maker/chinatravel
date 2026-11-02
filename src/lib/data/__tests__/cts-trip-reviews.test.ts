import { CTS_TRIP_REVIEWS } from '../cts-review-quotes';

describe('CTS_TRIP_REVIEWS', () => {
  it('every review is traceable and says whose trip it is', () => {
    expect(CTS_TRIP_REVIEWS.length).toBeGreaterThan(0);
    const uids = new Set<string>();
    for (const review of CTS_TRIP_REVIEWS) {
      expect(review.reviewUid.length).toBeGreaterThan(20);
      expect(uids.has(review.reviewUid)).toBe(false);
      uids.add(review.reviewUid);
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(review.excerpt.trim()).not.toBe('');
      expect(review.trip.trim()).not.toBe('');
      expect(review.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('none of them is about a tour that has not run yet', () => {
    for (const review of CTS_TRIP_REVIEWS) {
      expect(`${review.trip} ${review.excerpt}`).not.toMatch(/Shanghai (&|and) (Beyond|Surroundings)/i);
    }
  });
});
