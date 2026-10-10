/**
 * The traveller-details form must let guests pick the tour + departure, choose
 * rooming per traveller (who shares with whom, and what beds), and see a
 * passport expiry hint. Tests encode why: CTS needs the booked departure for
 * filing, and the rooming split is the one fact it cannot guess.
 */

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

  it('has no Done button and no Room select on a card', () => {
    setup();
    expect(screen.queryByText('Done')).toBeNull();
    expect(screen.queryByLabelText('Room')).toBeNull();
  });

  it('expands a collapsed card when its header is clicked', () => {
    setup();
    fillTraveller(0, 'Alice');
    fireEvent.click(screen.getByText('Add another traveller'));
    expect(document.querySelector('#fullName-0')).toBeNull();
    fireEvent.click(screen.getByText(/Traveller 1 · Alice/));
    expect(document.querySelector('#fullName-0')).toBeTruthy();
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
  it('hides the rooming section for a single traveller', () => {
    setup();
    expect(screen.queryByText('Who shares a room?')).toBeNull();
  });

  it('pairs four travellers into two double rooms by default', () => {
    setup();
    addTravellers(3);
    ['Alice', 'Bob', 'Carol', 'Dan'].forEach((name, i) => fillTraveller(i, name));
    expect(screen.getByText('Room 1 — Alice & Bob')).toBeTruthy();
    expect(screen.getByText('Room 2 — Carol & Dan')).toBeTruthy();
    const room1 = screen.getByText('Room 1 — Alice & Bob').closest('div')!;
    const doubleBtn = room1.querySelector('button[aria-pressed="true"]') as HTMLButtonElement;
    expect(doubleBtn.textContent).toBe('Double bed');
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

    const room1 = screen.getByText('Room 1 — Alice & Bob').closest('div')!;
    fireEvent.click(room1.querySelector('button')!.nextElementSibling as HTMLButtonElement);

    fireEvent.submit(screen.getByText('Submit details').closest('form') as HTMLFormElement);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const body = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body);
    expect(body.rooms).toEqual([
      { bedType: 'twin', travellerIndexes: [0, 1] },
      { bedType: 'double', travellerIndexes: [2, 3] },
    ]);
  });

  it('reveals per-traveller room selects and moves a traveller to their own room', () => {
    setup();
    addTravellers(3);
    fillTraveller(0, 'Alice');
    fillTraveller(1, 'Bob');
    fillTraveller(2, 'Carol');
    fillTraveller(3, 'Dan');
    fireEvent.click(screen.getByText('Change who shares with whom'));
    fireEvent.change(screen.getByLabelText('Room for Dan'), { target: { value: '' } });
    expect(screen.getByText('Room 3 — Dan')).toBeTruthy();
    // Carol is left alone, so her room turns into a single room instead of showing an error.
    const room2 = screen.getByText('Room 2 — Carol').closest('div')!;
    expect((room2.querySelector('button[aria-pressed="true"]') as HTMLButtonElement).textContent).toBe('Single');
    expect(room2.querySelectorAll('button').length).toBe(1);
    expect(screen.queryByText(/is a double room but has 1 person/)).toBeNull();
    expect(screen.getByText('Everyone has a room')).toBeTruthy();
  });

  it('turns the room left behind into a single room and lets the form submit', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    (global as unknown as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch;
    setup();
    addTravellers(1);
    fillTraveller(0, 'Alice');
    fillTraveller(1, 'Bob');
    fillRequiredFields();
    fireEvent.click(screen.getByText('Change who shares with whom'));
    fireEvent.change(screen.getByLabelText('Room for Bob'), { target: { value: '' } });
    expect(screen.queryByText(/is a double room but has 1 person/)).toBeNull();
    fireEvent.submit(screen.getByText('Submit details').closest('form') as HTMLFormElement);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const body = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body);
    expect(body.rooms).toEqual([
      { bedType: 'single', travellerIndexes: [0] },
      { bedType: 'single', travellerIndexes: [1] },
    ]);
  });

  it('reveals the children notes field when children are travelling', () => {
    setup();
    expect(screen.queryByLabelText(/Children.s ages/)).toBeNull();
    fireEvent.click(screen.getByLabelText('Children are travelling with us'));
    expect(screen.getByLabelText(/Children.s ages/)).toBeTruthy();
  });

  it('places a new traveller into a waiting twin room without leaving anyone unroomed', () => {
    setup();
    addTravellers(1);
    fillTraveller(0, 'Alice');
    fillTraveller(1, 'Bob');
    const room1 = screen.getByText('Room 1 — Alice & Bob').closest('div')!;
    fireEvent.click(within(room1).getByText('Twin beds'));
    addTravellers(2);
    expect(screen.queryByText(/is not in any room/)).toBeNull();
    expect(screen.getByText(/Room 2/)).toBeTruthy();
  });
});

describe('step numbering', () => {
  it('shows three steps for a single traveller', () => {
    setup();
    expect(screen.getByText('Step 3 of 3')).toBeTruthy();
    expect(screen.queryByText('Step 4 of 4')).toBeNull();
  });

  it('shows four steps once a second traveller is added', () => {
    setup();
    addTravellers(1);
    expect(screen.getByText('Step 4 of 4')).toBeTruthy();
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
    addTravellers(1);
    fillTraveller(0, 'Alice');
    fillTraveller(1, 'Bob');
    fireEvent.click(screen.getByText('Change who shares with whom'));
    fireEvent.change(screen.getByLabelText('Room for Bob'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Room for Bob'), { target: { value: '0' } });
    expect(screen.getByText('Room 1 — Alice & Bob')).toBeTruthy();
    expect(screen.queryByText('Room 2 — Bob')).toBeNull();
  });
});

describe('lead name mirrors Traveller 1', () => {
  it('copies the lead name into Traveller 1 as it is typed', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Jane Smith' } });
    expect((document.querySelector('#fullName-0') as HTMLInputElement).value).toBe('Jane Smith');
  });

  it('stops mirroring once the checkbox is unticked', () => {
    setup();
    fireEvent.click(screen.getByLabelText(/use this name for Traveller 1/));
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Jane Smith' } });
    expect((document.querySelector('#fullName-0') as HTMLInputElement).value).toBe('');
  });

  it('keeps a name typed directly into Traveller 1 and unticks the checkbox', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Jane Smith' } });
    fireEvent.change(document.querySelector('#fullName-0')!, { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Jane Smyth' } });
    expect((document.querySelector('#fullName-0') as HTMLInputElement).value).toBe('Alice');
    expect((screen.getByLabelText(/use this name for Traveller 1/) as HTMLInputElement).checked).toBe(false);
  });
});
