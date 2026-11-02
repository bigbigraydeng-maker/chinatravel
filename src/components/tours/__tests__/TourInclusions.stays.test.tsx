import { render, screen } from '@testing-library/react';
import TourInclusions from '@/components/tours/TourInclusions';
import type { DayItinerary } from '@/lib/data/tours';

const day = (n: number, accommodation?: string): DayItinerary => ({
  day: n,
  title: `Day ${n}`,
  description: 'x',
  meals: ['Breakfast'],
  accommodation,
});

describe('TourInclusions accommodation summary', () => {
  const itinerary = [
    day(1, 'On board international flight'),
    day(2, 'Hotel A or a similar 5-star hotel'),
    day(3, 'Hotel A or a similar 5-star hotel'),
    day(4, 'Three Gorges cruise ship'),
    day(5, 'On board international flight'),
    day(6),
  ];

  it('does not count the international flight as a property or a night', () => {
    const { container } = render(<TourInclusions inclusions={[]} exclusions={[]} itinerary={itinerary} />);
    expect(container.textContent).toContain('Accommodation (3 nights)');
    expect(container.textContent).toContain('2 carefully selected properties');
    expect(screen.queryByText('On board international flight')).toBeNull();
  });

  it('still lists hotels and the cruise', () => {
    render(<TourInclusions inclusions={[]} exclusions={[]} itinerary={itinerary} />);
    expect(screen.getByText('Hotel A or a similar 5-star hotel')).toBeTruthy();
    expect(screen.getByText('Three Gorges cruise ship')).toBeTruthy();
  });
});
