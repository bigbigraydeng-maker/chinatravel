import { getTourBySlug } from '@/lib/data/tours';

describe('Shanghai & Surroundings group size', () => {
  test('caps the departure at 18 travellers', () => {
    // PM capped this departure at 18 travellers on 2026-10-06.
    const tour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');
    expect(tour).toBeDefined();
    expect(tour?.maxGroupSize).toBe(18);
  });
});
