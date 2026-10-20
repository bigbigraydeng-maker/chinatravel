/**
 * TourEnquiry — after the Send button is pressed
 *
 * WHY — once the visitor has pressed Send, the form must stay honest about what is happening: the button says
 * "Sending..." and, after 10 s, "Still sending…" so nobody presses it twice on a slow connection. Once the server
 * has accepted the enquiry the button stays off until the page changes (a second press would send it twice), and
 * comes back after 10 s if the form is still on screen. Work that happens after acceptance (our own events, the
 * move to the thank-you page) must never be shown to the visitor as a failure: it is logged with console.error.
 * A visitor who leaves the page does not cancel the request — the server may already have the enquiry, and then it
 * must still be counted — but a late answer may not touch the form or move the page.
 *
 * window.gtag and window.fbq are stubbed only to observe the Lead conversion; this file asserts they fire exactly
 * once for an accepted enquiry and never for a refused one.
 */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import TourEnquiry from '@/components/tours/TourEnquiry';

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

function conversionCounts() {
  return {
    ads: mockGtag.mock.calls.filter((c) => c[0] === 'event' && c[1] === 'conversion').length,
    ga4Lead: mockGtag.mock.calls.filter((c) => c[0] === 'event' && c[1] === 'generate_lead').length,
    metaLead: mockFbq.mock.calls.filter((c) => c[0] === 'track' && c[1] === 'Lead').length,
  };
}

describe('TourEnquiry — after the Send button is pressed', () => {
  it('says "Still sending…" after 10 seconds and not before', async () => {
    jest.useFakeTimers();
    const requests = pendingFetch();

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));

    await act(async () => {
      jest.advanceTimersByTime(9999);
    });
    expect(sendButton()).toHaveAccessibleName(/Sending/i);
    expect(sendButton().textContent).not.toMatch(/Still sending/i);

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(sendButton().textContent).toMatch(/Still sending/i);
    expect(sendButton()).toBeDisabled();
  });

  it('does not turn the label into "Still sending…" once the server has answered', async () => {
    jest.useFakeTimers();
    const requests = pendingFetch();

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });
    await waitFor(() => expect(requests).toHaveLength(1));

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await act(async () => {
      requests[0].answer(OK);
    });
    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    await act(async () => {
      jest.advanceTimersByTime(7000);
    });
    expect(sendButton().textContent).not.toMatch(/Still sending/i);
  });

  it('goes back to Send Enquiry when the request is given up', async () => {
    jest.useFakeTimers();
    const requests = pendingFetch();

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });
    await screen.findByRole('alert');

    expect(sendButton()).toBeEnabled();
    expect(sendButton()).toHaveAccessibleName(/Send Enquiry/i);
  });

  it('keeps the Send button off after the server accepted the enquiry, so a second press cannot send it twice', async () => {
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const button = sendButton();
    expect(button).toBeDisabled();
    fireEvent.click(button);
    fireEvent.submit(button.closest('form') as HTMLFormElement);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('brings the button back if the page is still there 10 seconds after the enquiry was accepted', async () => {
    jest.useFakeTimers();
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    act(() => {
      jest.advanceTimersByTime(9999);
    });
    expect(sendButton()).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(sendButton()).toBeEnabled();
    expect(sendButton()).toHaveAccessibleName(/Send Enquiry/i);
  });

  it('shows no error when the thank-you event fails after the server accepted the enquiry, and still counts the lead and moves on', async () => {
    mockTriggerGtm.mockImplementation(() => {
      throw new Error('boom');
    });
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(screen.queryByRole('alert')).toBeNull();
    expect(conversionCounts()).toEqual({ ads: 1, ga4Lead: 1, metaLead: 1 });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('failed after the enquiry was accepted'),
      expect.any(Error)
    );
  });

  it('shows no error when the move to the thank-you page fails after the server accepted the enquiry', async () => {
    mockPush.mockImplementation(() => {
      throw new Error('navigation failed');
    });
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockResolvedValue(OK);

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(screen.queryByRole('alert')).toBeNull();
    expect(conversionCounts()).toEqual({ ads: 1, ga4Lead: 1, metaLead: 1 });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('failed after the enquiry was accepted'),
      expect.any(Error)
    );
  });

  it('an accepted enquiry whose answer arrives after the visitor left is still counted once, and moves nothing', async () => {
    const requests = pendingFetch();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));
    unmount();

    await act(async () => {
      requests[0].answer(OK);
    });

    expect(mockPush).not.toHaveBeenCalled();
    expect(conversionCounts()).toEqual({ ads: 1, ga4Lead: 1, metaLead: 1 });
    expect(mockTriggerGtm).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls.filter((call) => /unmounted|state update/i.test(String(call[0])))).toEqual([]);
  });

  it('a refused enquiry whose answer arrives after the visitor left sends nothing to the ad systems', async () => {
    const requests = pendingFetch();

    const { unmount } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));
    unmount();

    await act(async () => {
      requests[0].answer({ ok: false, json: async () => ({ error: 'This tour is currently unavailable.' }) });
    });

    expectNoConversionEvents();
  });

  it('leaving the page does not give the request up', async () => {
    const requests = pendingFetch();

    const { unmount } = render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(requests).toHaveLength(1));
    unmount();

    expect(requests[0].signal.aborted).toBe(false);
  });
});
