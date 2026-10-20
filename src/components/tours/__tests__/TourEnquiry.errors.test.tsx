/**
 * TourEnquiry — when the enquiry cannot be sent
 *
 * WHY — the error message used to sit above the form, out of sight on a phone.
 * It now lives inside the <form>, right before the Send button, as a single
 * <p role="alert">. Validation and server errors are plain text; the two cases
 * that really happen (server unreachable, no answer within 30 s) get a plain
 * sentence with the phone number from site.ts. Conversion events fire only
 * after the server accepted the enquiry.
 *
 * window.gtag and window.fbq are stubbed only to observe the Lead conversion;
 * this file asserts they are NOT called when the enquiry fails.
 */
import { render, screen, fireEvent, waitFor, within, act } from '@testing-library/react';
import TourEnquiry from '@/components/tours/TourEnquiry';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';

// Numbers that differ from the real ones: the phone links must come from site.ts, never be typed into the form.
jest.mock('@/lib/site', () => ({
  ...jest.requireActual('@/lib/site'),
  CTS_PHONE_HREF: 'tel:+6491234567',
  CTS_PHONE_DISPLAY: '09 123 4567',
}));

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
  jest.useRealTimers();
  jest.restoreAllMocks();
  Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const PROPS = {
  tourName: 'A Tale of Two Cities',
  tourSlug: 'beijing-xian',
  destination: 'china',
  tier: 'discovery',
};

function fillAndSubmit(values: { name?: string; email?: string; travelWindow?: string | null; budgetBand?: string | null }) {
  if (values.name !== undefined) {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: values.name } });
  }
  if (values.email !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: values.email } });
  }
  // The two travel questions are required on the form: choose valid answers unless a test passes null to leave one empty.
  const travelWindow = values.travelWindow === undefined ? 'mar_may_2027' : values.travelWindow;
  if (travelWindow !== null) {
    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), { target: { value: travelWindow } });
  }
  const budgetBand = values.budgetBand === undefined ? 'under_3000' : values.budgetBand;
  if (budgetBand !== null) {
    fireEvent.change(screen.getByLabelText(/Estimated budget per person/i), { target: { value: budgetBand } });
  }
  fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));
}

const sendButton = () => screen.getByRole('button', { name: /Send Enquiry|Sending/i });

function expectNoConversionEvents() {
  const gtagConversionEvents = ['conversion', 'generate_lead', 'enquiry_thank_you'];
  const gtagConversionCalls = mockGtag.mock.calls.filter(
    (call) => call[0] === 'event' && gtagConversionEvents.includes(call[1] as string)
  );
  expect(gtagConversionCalls).toEqual([]);

  const fbqLeadCalls = mockFbq.mock.calls.filter((call) => call[0] === 'track' && call[1] === 'Lead');
  expect(fbqLeadCalls).toEqual([]);

  expect(mockTriggerGtm).not.toHaveBeenCalled();
  expect(mockPush).not.toHaveBeenCalled();
}

function pendingFetch() {
  const requests: Array<{
    signal: AbortSignal;
    answer: (response: { ok: boolean; json: () => Promise<unknown> }) => void;
  }> = [];
  mockFetch.mockImplementation(
    (_url: string, init: RequestInit) =>
      new Promise((resolve, reject) => {
        const signal = init.signal as AbortSignal;
        requests.push({ signal, answer: resolve });
        signal.addEventListener('abort', () =>
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        );
      })
  );
  return requests;
}

const OK = { ok: true, json: async () => ({}) };

describe('TourEnquiry — when the enquiry cannot be sent', () => {
  it('tells a visitor who left no phone or email, in an alert inside the form just above the Send button', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace' });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Please leave a phone number or an email so we can get back to you.');
    expect(alert.closest('form')).not.toBeNull();
    expect(alert.compareDocumentPosition(sendButton()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(mockFetch).not.toHaveBeenCalled();
    expectNoConversionEvents();
  });

  it('brings the message into view', async () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace' });

    await screen.findByRole('alert');
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' });
  });

  it('still shows the message in a browser that has no scrollIntoView', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace' });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Please leave a phone number or an email so we can get back to you.');
  });

  it('says plainly that the server could not be reached, with a phone link taken from site.ts', async () => {
    mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain("We couldn't reach our server");
    const link = within(alert).getByRole('link');
    expect(link.getAttribute('href')).toBe(CTS_PHONE_HREF);
    expect(link.textContent).toBe(CTS_PHONE_DISPLAY);
    expect(alert.textContent).not.toContain('Failed to fetch');
    expectNoConversionEvents();
  });

  it('does the same for the wording Safari uses', async () => {
    mockFetch.mockRejectedValue(new TypeError('Load failed'));

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain("We couldn't reach our server");
    expect(alert.textContent).not.toContain('Load failed');
  });

  it('keeps what the visitor typed and lets them try again after a network failure', async () => {
    mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await screen.findByRole('alert');
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Ada Lovelace');
    expect(screen.getByLabelText(/^Email/i)).toHaveValue('ada@example.com');
    const button = sendButton();
    expect(button).toBeEnabled();
    expect(button).toHaveAccessibleName(/Send Enquiry/i);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('takes the old message away when the visitor tries again, and sends the enquiry', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch')).mockResolvedValueOnce(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });
    await screen.findByRole('alert');

    fireEvent.click(sendButton());

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('gives up after 30 seconds', async () => {
    jest.useFakeTimers();
    const requests = pendingFetch();

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));

    // `await act(async ...)` also lets the rejected request settle, so a timeout that fired early would already show its
    // message here.
    await act(async () => {
      jest.advanceTimersByTime(29999);
    });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(sendButton()).toHaveAccessibleName(/Sending/i);
    expect(sendButton()).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Sending is taking longer than expected');
    expect(within(alert).getByRole('link').getAttribute('href')).toBe(CTS_PHONE_HREF);
    expect(requests[0].signal.aborted).toBe(true);
    expect(sendButton()).toBeEnabled();
    expect(sendButton()).toHaveAccessibleName(/Send Enquiry/i);
    expectNoConversionEvents();
  });

  it("shows the server's own error text as it is", async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({ error: 'This tour is currently unavailable.' }) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('This tour is currently unavailable.');
    expectNoConversionEvents();
  });

  it('sends the request with an abort signal and the usual body', async () => {
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/tour-enquiry');
    expect(init.signal).toBeInstanceOf(AbortSignal);
    const body = JSON.parse(init.body as string);
    expect(body.name).toBe('Ada Lovelace');
    expect(body.tourSlug).toBe('beijing-xian');
  });

  it('a successful enquiry shows no alert, and no timeout message appears later', async () => {
    jest.useFakeTimers();
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(screen.queryByRole('alert')).toBeNull();
    const init = mockFetch.mock.calls[0][1] as RequestInit;
    expect((init.signal as AbortSignal).aborted).toBe(false);
  });

  it('a late answer after the request was given up changes nothing', async () => {
    jest.useFakeTimers();
    const requests = pendingFetch();

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));

    act(() => {
      jest.advanceTimersByTime(30000);
    });
    const alert = await screen.findByRole('alert');

    await act(async () => {
      requests[0].answer(OK);
    });

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toContain('Sending is taking longer than expected');
    expectNoConversionEvents();
  });

  it('leaving the page while a request is out gives the request up', async () => {
    const requests = pendingFetch();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));
    expect(requests[0].signal.aborted).toBe(false);

    unmount();
    expect(requests[0].signal.aborted).toBe(true);

    await act(async () => {
      await Promise.resolve();
    });

    const stateUpdateWarnings = errorSpy.mock.calls.filter((call) =>
      /unmounted|state update/i.test(String(call[0]))
    );
    expect(stateUpdateWarnings).toEqual([]);
    expectNoConversionEvents();
  });

  it('leaving the page also stops the 30-second timer', async () => {
    jest.useFakeTimers();
    const clearSpy = jest.spyOn(window, 'clearTimeout');
    const requests = pendingFetch();

    const { unmount } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));

    const before = clearSpy.mock.calls.length;
    unmount();
    expect(clearSpy.mock.calls.length).toBeGreaterThan(before);
  });
});
