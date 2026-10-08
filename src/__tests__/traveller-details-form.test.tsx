/**
 * The traveller-details form must let guests pick the tour + departure, choose
 * Double/Twin when two or more people share, and see a passport expiry hint.
 * Tests encode why: CTS needs the booked departure for filing, and the bed
 * choice is the one rooming fact it cannot guess.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import TravellerDetailsForm from '@/app/traveller-details/TravellerDetailsForm';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));
jest.mock('@/components/GoogleTagManager', () => ({ triggerGtmEvent: jest.fn() }));

const tourOptions = [
  { key: 'china/discovery/best-of-china', name: 'China Discovery — Best of China', dates: ['13 May 2027', '21 October 2027'] },
  { key: 'china/stopover/beijing-express', name: 'China Stopover — Beijing Express', dates: [] },
];

function setup() {
  return render(<TravellerDetailsForm tourOptions={tourOptions} />);
}

describe('tour and departure dropdowns', () => {
  it('shows departure dates only after a tour with dates is chosen', () => {
    setup();
    expect(screen.queryByLabelText('Departure date')).toBeNull();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: 'china/discovery/best-of-china' } });
    const dates = screen.getByLabelText('Departure date') as HTMLSelectElement;
    expect(Array.from(dates.options).map((o) => o.value)).toEqual(['', '13 May 2027', '21 October 2027']);
  });

  it('skips the date step for tours without scheduled dates', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: 'china/stopover/beijing-express' } });
    expect(screen.queryByLabelText('Departure date')).toBeNull();
  });

  it('lets guests type a tour that is not listed', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: '__other__' } });
    expect(screen.getByLabelText('Tour name')).toBeTruthy();
  });
});

describe('rooming', () => {
  it('asks for Double or Twin only when two or more travellers share', () => {
    setup();
    expect(screen.queryByLabelText(/Double/)).toBeNull();
    fireEvent.click(screen.getByText('Add another traveller'));
    expect(screen.getByLabelText(/Double/)).toBeTruthy();
    expect(screen.getByLabelText(/Twin/)).toBeTruthy();
  });

  it('reveals the children notes field when children are travelling', () => {
    setup();
    expect(screen.queryByLabelText(/Children.s ages/)).toBeNull();
    fireEvent.click(screen.getByLabelText('Children are travelling with us'));
    expect(screen.getByLabelText(/Children.s ages/)).toBeTruthy();
  });
});

describe('passport self-check', () => {
  it('warns when the passport expires before the chosen departure', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: 'china/discovery/best-of-china' } });
    fireEvent.change(screen.getByLabelText('Departure date'), { target: { value: '13 May 2027' } });
    fireEvent.change(screen.getAllByLabelText(/Passport expiry date/)[0], { target: { value: '2027-05-01' } });
    expect(screen.getByRole('status').textContent).toMatch(/expires before your travel date/);
  });

  it('confirms a passport with 6+ months of validity', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: 'china/discovery/best-of-china' } });
    fireEvent.change(screen.getByLabelText('Departure date'), { target: { value: '13 May 2027' } });
    fireEvent.change(screen.getAllByLabelText(/Passport expiry date/)[0], { target: { value: '2028-06-01' } });
    expect(screen.getByRole('status').textContent).toMatch(/meets the 6-month/);
  });

  it('stays silent until an expiry date is entered', () => {
    setup();
    expect(screen.queryByRole('status')).toBeNull();
  });
});
