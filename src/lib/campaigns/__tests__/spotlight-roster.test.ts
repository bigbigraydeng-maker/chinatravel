import { OCTOBER_2026_SPOTLIGHT_TOURS } from '@/lib/campaigns/october-2026-spotlight';
import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';
import { getTourBySlug } from '@/lib/data/tours';

describe('Spotlight tour roster', () => {
  it('features only Golden China on the spotlight hub and nothing on the homepage', () => {
    expect(OCTOBER_2026_SPOTLIGHT_TOURS.map(tour => tour.slug)).toEqual([
      'golden-china',
    ]);

    expect(HOME_SPOTLIGHT_TOURS.map(tour => tour.slug)).toEqual([]);
  });

  it('only references active, available tours', () => {
    for (const spotlight of OCTOBER_2026_SPOTLIGHT_TOURS) {
      const tour = getTourBySlug(spotlight.destination, spotlight.tier, spotlight.slug);
      expect(tour).toBeDefined();
      expect(tour?.isActive).toBe(true);
      expect(tour?.soldOut).not.toBe(true);
    }
  });
});
