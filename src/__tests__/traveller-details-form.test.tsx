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
  { key: 'china/discovery/best-of-china', group: 'China Discovery', shortName: 'Best of China', name: 'China Discovery — Best of China', dates: ['13 May 2027', '21 October 2027'] },
  { key: 'china/stopover/beijing-express', group: 'China Stopover', shortName: 'Beijing Express', name: 'China Stopover — Beijing Express', dates: [] },
];

function setup() {
  return render(<TravellerDetailsForm tourOptions={tourOptions} />);
}

function pickTour(group: string, key: string) {
  fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: group } });
  fireEvent.change(screen.getByLabelText('Tour'), { target: { value: key } });
}

describe('tour and departure dropdowns', () => {
  it('shows departure dates only after a tour with dates is chosen', () => {
    setup();
    expect(screen.queryByLabelText('Departure date')).toBeNull();
    pickTour('China Discovery', 'china/discovery/best-of-china');
    const dates = screen.getByLabelText('Departure date') as HTMLSelectElement;
    expect(Array.from(dates.options).map((o) => o.value)).toEqual(['', '13 May 2027', '21 October 2027']);
  });

  it('first offers a short list of tour types, then only the tours in that type', () => {
    setup();
    const groups = screen.getByLabelText('Which tour did you book?') as HTMLSelectElement;
    expect(Array.from(groups.options).map((o) => o.value)).toEqual([
      '', 'China Discovery', 'China Stopover', '__other__',
    ]);
    fireEvent.change(groups, { target: { value: 'China Stopover' } });
    const tours = screen.getByLabelText('Tour') as HTMLSelectElement;
    expect(Array.from(tours.options).map((o) => o.text)).toEqual(['Select your tour', 'Beijing Express']);
  });

  it('skips the date step for tours without scheduled dates', () => {
    setup();
    pickTour('China Stopover', 'china/stopover/beijing-express');
    expect(screen.queryByLabelText('Departure date')).toBeNull();
  });

  it('lets guests type a tour that is not listed', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Which tour did you book?'), { target: { value: '__other__' } });
    expect(screen.getByLabelText('Tour name')).toBeTruthy();
  });
});

describe('rooming', () => {
  it('always shows the Double / Twin / Single choice, even for one traveller', () => {
    setup();
    expect(screen.getByLabelText(/Double/)).toBeTruthy();
    expect(screen.getByLabelText(/Twin/)).toBeTruthy();
    expect(screen.getByLabelText(/Single/)).toBeTruthy();
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
    pickTour('China Discovery', 'china/discovery/best-of-china');
    fireEvent.change(screen.getByLabelText('Departure date'), { target: { value: '13 May 2027' } });
    fireEvent.change(screen.getAllByLabelText(/Passport expiry date/)[0], { target: { value: '2027-05-01' } });
    expect(screen.getByRole('status').textContent).toMatch(/expires before your travel date/);
  });

  it('confirms a passport with 6+ months of validity', () => {
    setup();
    pickTour('China Discovery', 'china/discovery/best-of-china');
    fireEvent.change(screen.getByLabelText('Departure date'), { target: { value: '13 May 2027' } });
    fireEvent.change(screen.getAllByLabelText(/Passport expiry date/)[0], { target: { value: '2028-06-01' } });
    expect(screen.getByRole('status').textContent).toMatch(/meets the 6-month/);
  });

  it('stays silent until an expiry date is entered', () => {
    setup();
    expect(screen.queryByRole('status')).toBeNull();
  });
});

describe('passport confirmation', () => {
  it('has a checkbox confirming 6 months of passport validity', () => {
    setup();
    expect(screen.getByLabelText(/valid for at least 6 months/)).toBeTruthy();
  });

  it('blocks submit until the passport box is ticked', () => {
    setup();
    fireEvent.click(screen.getByLabelText(/details above are correct/));
    fireEvent.click(screen.getByLabelText(/Terms/));
    fireEvent.submit(screen.getByText('Submit details').closest('form') as HTMLFormElement);
    expect(screen.getByText(/tick all three confirmation boxes/)).toBeTruthy();
  });
});
