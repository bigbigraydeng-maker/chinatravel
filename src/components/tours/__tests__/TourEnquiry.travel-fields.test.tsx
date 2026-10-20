/**
 * TourEnquiry — travel window and budget questions
 *
 * WHY — the tour enquiry form sits on the ad landing page, and CTS needs two
 * answers with every lead: when the visitor plans to travel and their budget
 * per person. Both are REQUIRED on the page (an empty submit must not reach
 * the server) but the server stays lenient. Only the option CODES travel
 * (request, analytics event); labels are for people.
 *
 * We deliberately do NOT mock '@/lib/analytics/lead-conversion',
 * '@/lib/analytics/first-touch' or '@/lib/utils/utm-parser'. window.gtag and
 * window.fbq are stubbed only to absorb the Lead conversion that fires on
 * success; this file does not assert on them.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TourEnquiry from '@/components/tours/TourEnquiry';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

const mockTriggerGtm = jest.fn();
jest.mock('@/components/GoogleTagManager', () => ({
  triggerGtmEvent: (...args: unknown[]) => mockTriggerGtm(...args),
}));

const mockGtag = jest.fn();
const mockFbq = jest.fn();

const mockFetch = jest.fn();

beforeEach(() => {
  mockPush.mockReset();
  mockTriggerGtm.mockReset();
  mockFetch.mockReset();
  sessionStorage.clear();
  mockGtag.mockReset();
  mockFbq.mockReset();
  Object.assign(window, { gtag: mockGtag, fbq: mockFbq });
  global.fetch = mockFetch as unknown as typeof fetch;
});

afterEach(() => {
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const PROPS = {
  tourName: 'A Tale of Two Cities',
  tourSlug: 'beijing-xian',
  destination: 'china',
  tier: 'discovery',
};

const TRAVEL_WINDOW_OPTIONS = [
  { value: '', text: 'Please choose…' },
  { value: 'mar_may_2027', text: 'March – May 2027' },
  { value: 'jun_sep_2027', text: 'June – September 2027' },
  { value: 'oct_dec_2027', text: 'October – December 2027' },
  { value: 'not_sure', text: 'Not sure yet' },
];

const BUDGET_BAND_OPTIONS = [
  { value: '', text: 'Please choose…' },
  { value: 'under_3000', text: 'Under $3,000' },
  { value: '3000_5000', text: '$3,000 – $5,000' },
  { value: '5000_8000', text: '$5,000 – $8,000' },
  { value: 'above_8000', text: 'Above $8,000' },
];

function fillAndSubmit(values: {
  name?: string;
  email?: string;
  phone?: string;
  travelWindow?: string;
  budgetBand?: string;
}) {
  if (values.name !== undefined) {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: values.name } });
  }
  if (values.email !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: values.email } });
  }
  if (values.phone !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Phone/i), { target: { value: values.phone } });
  }
  if (values.travelWindow !== undefined) {
    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), {
      target: { value: values.travelWindow },
    });
  }
  if (values.budgetBand !== undefined) {
    fireEvent.change(screen.getByLabelText(/Estimated budget per person/i), {
      target: { value: values.budgetBand },
    });
  }
  fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));
}

function optionsOf(select: HTMLSelectElement): { value: string; text: string }[] {
  return Array.from(select.options).map((option) => ({
    value: option.value,
    text: option.textContent ?? '',
  }));
}

describe('TourEnquiry — travel window and budget questions', () => {
  it('shows both questions, each with its options in order', () => {
    render(<TourEnquiry {...PROPS} />);

    const travelWindow = screen.getByLabelText(/When are you planning to travel/i) as HTMLSelectElement;
    expect(travelWindow).toBeRequired();
    expect(travelWindow.value).toBe('');
    expect(optionsOf(travelWindow)).toEqual(TRAVEL_WINDOW_OPTIONS);

    const budgetBand = screen.getByLabelText(/Estimated budget per person/i) as HTMLSelectElement;
    expect(budgetBand).toBeRequired();
    expect(budgetBand.value).toBe('');
    expect(optionsOf(budgetBand)).toEqual(BUDGET_BAND_OPTIONS);
  });

  it('an empty submit is stopped and nothing is sent', () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('the browser asks in plain words, and the message goes away once an answer is chosen', () => {
    render(<TourEnquiry {...PROPS} />);
    const travelWindow = screen.getByLabelText(/When are you planning to travel/i) as HTMLSelectElement;
    const budgetBand = screen.getByLabelText(/Estimated budget per person/i) as HTMLSelectElement;

    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(travelWindow.validity.valueMissing).toBe(true);
    expect(travelWindow.validationMessage).toBe('Please choose when you are planning to travel.');
    expect(budgetBand.validationMessage).toBe('Please choose your estimated budget per person.');

    fireEvent.change(travelWindow, { target: { value: 'not_sure' } });
    fireEvent.change(budgetBand, { target: { value: 'under_3000' } });

    expect(travelWindow.validationMessage).toBe('');
    expect(budgetBand.validationMessage).toBe('');
    expect(travelWindow.validity.valid).toBe(true);
  });

  it('a submit that gets past the browser check still stops with a plain message for each missing answer', () => {
    const { container } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    const form = container.querySelector('form');
    expect(form).not.toBeNull();

    fireEvent.submit(form as HTMLFormElement);
    expect(screen.getByText('Please choose when you are planning to travel.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), {
      target: { value: 'mar_may_2027' },
    });
    fireEvent.submit(form as HTMLFormElement);
    expect(screen.getByText('Please choose your estimated budget per person.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('sends the codes, not the labels', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      travelWindow: 'jun_sep_2027',
      budgetBand: '5000_8000',
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const rawBody = mockFetch.mock.calls[0][1].body as string;
    const body = JSON.parse(rawBody);
    expect(body.travelWindow).toBe('jun_sep_2027');
    expect(body.budgetBand).toBe('5000_8000');
    expect(rawBody).not.toContain('June – September');
    expect(rawBody).not.toContain('$5,000');
  });

  it('the analytics event carries both codes and nothing personal', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      travelWindow: 'jun_sep_2027',
      budgetBand: '5000_8000',
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockTriggerGtm).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'tour_enquiry_submit',
          travel_window: 'jun_sep_2027',
          budget_band: '5000_8000',
        })
      )
    );

    const eventArg = mockTriggerGtm.mock.calls[0][0];
    const serialised = JSON.stringify(eventArg);
    expect(serialised).not.toContain('Ada Lovelace');
    expect(serialised).not.toContain('ada@example.com');
  });

  it('"Not sure yet" is a real answer', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      travelWindow: 'not_sure',
      budgetBand: 'above_8000',
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.travelWindow).toBe('not_sure');
    expect(body.budgetBand).toBe('above_8000');
    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
  });

  it('phone or email: the rule is unchanged', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({
      name: 'Ada Lovelace',
      travelWindow: 'mar_may_2027',
      budgetBand: 'under_3000',
    });

    expect(await screen.findByText(/leave a phone number or an email/i)).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/^Phone/i), { target: { value: '021 555 0100' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });

  it('a failed request keeps the answers so the visitor does not retype them', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to send enquiry. Please try again.' }),
    });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      travelWindow: 'oct_dec_2027',
      budgetBand: '3000_5000',
    });

    expect(await screen.findByText('Failed to send enquiry. Please try again.')).toBeInTheDocument();

    const travelWindow = screen.getByLabelText(/When are you planning to travel/i) as HTMLSelectElement;
    const budgetBand = screen.getByLabelText(/Estimated budget per person/i) as HTMLSelectElement;
    expect(travelWindow.value).toBe('oct_dec_2027');
    expect(budgetBand.value).toBe('3000_5000');
  });

  it('the compact layout asks the same two questions', () => {
    render(<TourEnquiry {...PROPS} compact />);

    expect(screen.getByLabelText(/When are you planning to travel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estimated budget per person/i)).toBeInTheDocument();
  });
});
