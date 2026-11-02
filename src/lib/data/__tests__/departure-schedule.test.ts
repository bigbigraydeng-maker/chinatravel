import { tours as fallbackTours } from '@/lib/data/tours';
import { publishedDepartureRows } from '../departure-schedule';

describe('published departure schedule rows', () => {
  it('uses every current sellable ME tour record, including newly added records', () => {
    const newTour = {
      ...fallbackTours.find((tour) => tour.slug === 'landscapes')!,
      id: 'new-tour',
      slug: 'new-signature-tour',
      name: 'New Signature Tour',
      departureDates: ['9 September 2027'],
    };
    const rows = publishedDepartureRows([...fallbackTours, newTour], 'signature');
    expect(rows.find((row) => row.slug === 'new-signature-tour')).toMatchObject({
      name: 'New Signature Tour',
      dates: ['9 September 2027'],
    });
  });

  it('omits inactive, sold-out and departure-free records', () => {
    const tour = fallbackTours.find((item) => item.slug === 'landscapes')!;
    const rows = publishedDepartureRows([
      { ...tour, slug: 'inactive', isActive: false },
      { ...tour, slug: 'sold-out', soldOut: true },
      { ...tour, slug: 'no-departures', departureDates: [] },
    ], 'signature');
    expect(rows).toEqual([]);
  });
});
