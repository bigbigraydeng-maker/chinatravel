import { OCTOBER_2026_SPOTLIGHT_TOURS } from '@/lib/campaigns/october-2026-spotlight';
import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';
import { getTourBySlug } from '@/lib/data/tours';

describe('Spotlight tour roster', () => {
  it('restores Golden China without changing the homepage December focus', () => {
    expect(OCTOBER_2026_SPOTLIGHT_TOURS.map(tour => tour.slug)).toEqual([
      'golden-china',
      'china-icons-collection',
      'china-icons-collection-christchurch',
    ]);

    expect(HOME_SPOTLIGHT_TOURS.map(tour => tour.slug)).toEqual([
      'china-icons-collection',
      'china-icons-collection-christchurch',
    ]);
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
