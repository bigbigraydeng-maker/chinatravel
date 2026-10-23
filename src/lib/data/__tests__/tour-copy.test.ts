import { tours as fallbackTours } from '@/lib/data/tours';
import { resolvePublishedTourCopyTokens } from '../tour-copy';

describe('published tour copy tokens', () => {
  it('resolves product names, duration and prices from the current record', () => {
    const naturalChina = {
      ...fallbackTours.find((tour) => tour.slug === 'landscapes')!,
      name: 'Updated China Journey',
      duration: '18 Days',
      price: 'From NZD $8,250',
    };
    const text = resolvePublishedTourCopyTokens(
      '[[TOUR_NAME:signature:landscapes]] · [[TOUR_DURATION:signature:landscapes]] · [[TOUR_PRICE:signature:landscapes]]',
      [naturalChina],
    );

    expect(text).toBe('Updated China Journey · 18 Days · from NZD $8,250');
  });

  it('uses a safe generic fallback when an editorial reference has no published record', () => {
    expect(resolvePublishedTourCopyTokens('[[TOUR_NAME:signature:landscapes]]', [])).toBe('the current tour');
  });
});
