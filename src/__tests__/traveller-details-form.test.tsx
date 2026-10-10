/**
 * The traveller-details form must let guests pick the tour + departure, choose
 * rooming per traveller (who shares with whom, and what beds), and see a
 * passport expiry hint. Tests encode why: CTS needs the booked departure for
 * filing, and the rooming split is the one fact it cannot guess.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

function addTravellers(count: number) {
  for (let i = 0; i < count; i += 1) {
    fireEvent.click(screen.getByText('Add another traveller'));
  }
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jane@example.com' } });
  fireEvent.change(document.querySelector('#emergencyName')!, {
    target: { value: 'Bob Smith' },
  });
  fireEvent.change(document.querySelector('#emergencyPhone')!, {
    target: { value: '021 000 000' },
  });
  fireEvent.click(screen.getByLabelText(/details above are correct/));
  fireEvent.click(screen.getByLabelText(/valid for at least 6 months/));
  fireEvent.click(screen.getByLabelText(/Terms/));
}

function fillTraveller(index: number, name: string, dob = '1960-01-01') {
  fireEvent.change(document.querySelector(`#fullName-${index}`)!, { target: { value: name } });
  fireEvent.change(document.querySelector(`#dob-${index}`)!, { target: { value: dob } });
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

describe('travellers flow', () => {
  it('shows the traveller name in the card header once typed', () => {
    setup();
    fillTraveller(0, 'Alice');
    expect(screen.getByText(/Traveller 1 · Alice/)).toBeTruthy();
  });

  it('shows a tick once name and date of birth are filled', () => {
    setup();
    expect(screen.queryByLabelText('Complete')).toBeNull();
    fillTraveller(0, 'Alice');
    expect(screen.getByLabelText('Complete')).toBeTruthy();
  });

  it('expands the new card and collapses the completed previous one', () => {
    setup();
    fillTraveller(0, 'Alice');
    fireEvent.click(screen.getByText('Add another traveller'));
    expect(document.querySelector('#fullName-1')).toBeTruthy();
    expect(document.querySelector('#fullName-0')).toBeNull();
  });

  it('lists rooms and New room in the Room select', () => {
    setup();
    const select = document.querySelector('#room-0') as HTMLSelectElement;
    expect(Array.from(select.options).map((o) => o.text)).toEqual([
      'Not assigned', 'Room 1', 'New room',
    ]);
  });

  it('creates a new room when New room is chosen and names the old room-mate in the error', () => {
    setup();
    fillTraveller(0, 'Alice');
    fireEvent.click(screen.getByText('Add another traveller'));
    fillTraveller(1, 'Dan');
    fireEvent.change(document.querySelector('#room-1')!, { target: { value: '__new__' } });
    // Alice and Dan were paired in Room 1; Dan moves to a new Room 2, leaving both rooms with one person.
    expect(screen.getByRole('heading', { name: 'Room 2' })).toBeTruthy();
    expect(screen.getByText(/Room 1 \(Alice\) is a double room but has 1 person/)).toBeTruthy();
    expect(screen.getByText(/Room 2 \(Dan\) is a double room but has 1 person/)).toBeTruthy();
  });

  it('blocks submit with a name-based message when a double room has one person', () => {
    setup();
    fillTraveller(0, 'Alice');
    fillRequiredFields();
    // A lone traveller defaults to Single; switch the room to Double to create the problem.
    fireEvent.click(document.querySelector('input[name="bedType-0"][value="double"]')!);
    fireEvent.submit(screen.getByText('Submit details').closest('form') as HTMLFormElement);
    expect(screen.getAllByText(/Room 1 \(Alice\) is a double room but has 1 person/).length).toBeGreaterThan(0);
  });

  it('asks for confirmation before removing a traveller with content', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    setup();
    fillTraveller(0, 'Alice');
    fireEvent.click(screen.getByText('Add another traveller'));
    fillTraveller(1, 'Dan');
    fireEvent.click(screen.getAllByText('Remove')[1]);
    expect(confirmSpy).toHaveBeenCalled();
    expect(document.querySelector('#fullName-1')).toBeTruthy();
    confirmSpy.mockRestore();
  });
});

describe('rooming', () => {
  it('starts a lone traveller in a single room', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Room 1' })).toBeTruthy();
    const single = screen.getByLabelText(/Single/) as HTMLInputElement;
    expect(single.checked).toBe(true);
  });

  it('pairs four travellers into two double rooms by default', () => {
    setup();
    addTravellers(3);
    expect(screen.getByRole('heading', { name: 'Room 1' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Room 2' })).toBeTruthy();
    const room1 = screen.getByRole('heading', { name: 'Room 1' }).closest('div')!.parentElement!;
    const room2 = screen.getByRole('heading', { name: 'Room 2' }).closest('div')!.parentElement!;
    expect((room1.querySelector('input[name="bedType-0"]') as HTMLInputElement).checked).toBe(true);
    expect((room2.querySelector('input[name="bedType-1"]') as HTMLInputElement).checked).toBe(true);
  });

  it('sends per-room bed types and traveller indexes on submit', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    (global as unknown as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch;

    setup();
    addTravellers(3);
    fillTraveller(0, 'Alice');
    fillTraveller(1, 'Bob');
    fillTraveller(2, 'Carol');
    fillTraveller(3, 'Dan');
    fillRequiredFields();

    const room1 = screen.getByRole('heading', { name: 'Room 1' }).closest('div')!.parentElement!;
    fireEvent.click(room1.querySelector('input[name="bedType-0"][value="twin"]')!);

    fireEvent.submit(screen.getByText('Submit details').closest('form') as HTMLFormElement);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const body = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body);
    expect(body.rooms).toEqual([
      { bedType: 'twin', travellerIndexes: [0, 1] },
      { bedType: 'double', travellerIndexes: [2, 3] },
    ]);
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

describe('room numbering stays consistent', () => {
  it('drops empty rooms so the card, the select and the summary agree', () => {
    setup();
    fillTraveller(0, 'Alice');
    fireEvent.click(screen.getByText('Add another traveller'));
    fillTraveller(1, 'Dan');
    // Dan leaves Room 1 for a new room, then comes back: the empty room must vanish.
    fireEvent.change(document.querySelector('#room-1')!, { target: { value: '__new__' } });
    fireEvent.change(document.querySelector('#room-1')!, { target: { value: '0' } });
    const select = document.querySelector('#room-1') as HTMLSelectElement;
    expect(Array.from(select.options).map((o) => o.text)).toEqual(['Not assigned', 'Room 1', 'New room']);
    expect(screen.queryByRole('heading', { name: 'Room 2' })).toBeNull();
    expect(screen.getByText(/Traveller 2 · Dan · Room 1/)).toBeTruthy();
    expect(screen.getAllByText('Sharing with Alice').length).toBe(1);
  });
});
