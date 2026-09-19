import { tours } from '@/lib/data/tours';
import { getTourCardMedia } from '@/lib/tour-card-media';

describe('tour card media', () => {
  it('uses a different image for every active, bookable tour', () => {
    const bookableTours = tours.filter((tour) => tour.isActive && !tour.soldOut);
    const mediaByImage = new Map<string, string[]>();

    for (const tour of bookableTours) {
      const image = getTourCardMedia(tour).src;
      const tourKey = `${tour.destination}/${tour.tier}/${tour.slug}`;
      mediaByImage.set(image, [...(mediaByImage.get(image) ?? []), tourKey]);
    }

    const duplicates = [...mediaByImage.entries()].filter(([, tourKeys]) => tourKeys.length > 1);

    expect(duplicates).toEqual([]);
  });
});
