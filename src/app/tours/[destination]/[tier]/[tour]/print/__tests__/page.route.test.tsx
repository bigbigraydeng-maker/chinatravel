import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({ notFound: jest.fn() }));
jest.mock('@/components/tours/PrintPageActions', () => ({ __esModule: true, default: () => null }));
jest.mock('@/lib/data/published-tour-catalog', () => ({
  getPublishedTourBySlug: jest.fn().mockResolvedValue({
    isActive: true, tier: 'signature', title: 'China Panorama', shortDescription: 'Short', duration: '27 Days', price: 'NZD $10,899',
    highlights: [], inclusions: [], exclusions: [],
    itinerary: [{ day: 1, title: 'May route day', description: 'd', meals: [] }],
    routeVariants: [{ id: 'oct-2027', label: '16 October 2027', note: 'Zhangjiajie replaces Yunnan.', departureDates: ['16 October 2027'],
      itinerary: [{ day: 1, title: 'Oct route day', description: 'd', meals: [] }] }],
  }),
}));

import TourPrintPage from '../page';

const params = { destination: 'china', tier: 'signature', tour: 'grand-tour' };

describe('print page and routes', () => {
  it('prints the tour\'s own itinerary by default', async () => {
    render(await TourPrintPage({ params }));
    expect(screen.getByText('May route day')).toBeInTheDocument();
    expect(screen.queryByText('Oct route day')).toBeNull();
    expect(screen.queryByText(/Itinerary for the/)).toBeNull();
  });

  it('prints the alternative route and names the departure', async () => {
    render(await TourPrintPage({ params, searchParams: { route: 'oct-2027' } }));
    expect(screen.getByText('Oct route day')).toBeInTheDocument();
    expect(screen.queryByText('May route day')).toBeNull();
    expect(screen.getByText(/Itinerary for the 16 October 2027 departure/)).toBeInTheDocument();
  });

  it('falls back to the default for an unknown route', async () => {
    render(await TourPrintPage({ params, searchParams: { route: 'nope' } }));
    expect(screen.getByText('May route day')).toBeInTheDocument();
  });
});
