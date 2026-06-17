/**
 * Tests for lead-conversion.ts
 *
 * Covers:
 *  - fires the Google Ads conversion to the correct send_to + value/currency
 *  - fires the Meta Pixel `Lead` event with a matching eventID (CAPI dedup)
 *  - gtag and fbq share the same transaction_id / eventID per call
 *  - each channel is guarded independently (missing gtag or fbq does not throw)
 *  - source is reflected in the eventID
 *  - retries until gtag/fbq load (afterInteractive race), then gives up cleanly
 */

import { fireLeadConversion } from '../lead-conversion';

const mockGtag = jest.fn();
const mockFbq = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  (window as any).gtag = mockGtag;
  (window as any).fbq = mockFbq;
  mockGtag.mockClear();
  mockFbq.mockClear();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

afterAll(() => {
  delete (window as any).gtag;
  delete (window as any).fbq;
});

describe('fireLeadConversion', () => {
  it('fires the Google Ads conversion to the Booking Service action', () => {
    fireLeadConversion('contact_page');
    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({
        send_to: 'AW-17984232872/y-kaCLSI9YAcEKi7xv9C',
        value: 1.0,
        currency: 'NZD',
      })
    );
  });

  it('accepts the china_tours_hub source and reflects it in the eventID', () => {
    fireLeadConversion('china_tours_hub');
    expect(mockGtag).toHaveBeenCalledTimes(1);
    const gtagCall = mockGtag.mock.calls[0];
    expect(gtagCall[2].transaction_id).toMatch(/^cts-china_tours_hub-\d+$/);
    expect(mockFbq).toHaveBeenCalledTimes(1);
    const fbqEventId = mockFbq.mock.calls[0][3].eventID;
    expect(fbqEventId).toMatch(/^cts-china_tours_hub-\d+$/);
    expect(fbqEventId).toBe(gtagCall[2].transaction_id);
  });

  it('accepts the china_visa_guide source so visa-LP enquiries attribute separately in ME', () => {
    fireLeadConversion('china_visa_guide');
    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockGtag.mock.calls[0][2].transaction_id).toMatch(
      /^cts-china_visa_guide-\d+$/
    );
    expect(mockFbq).toHaveBeenCalledTimes(1);
    expect(mockFbq.mock.calls[0][3].eventID).toMatch(/^cts-china_visa_guide-\d+$/);
  });

  it('fires the Meta Pixel Lead event with value + currency', () => {
    fireLeadConversion('tour_enquiry');
    expect(mockFbq).toHaveBeenCalledTimes(1);
    expect(mockFbq).toHaveBeenCalledWith(
      'track',
      'Lead',
      { value: 1.0, currency: 'NZD' },
      expect.objectContaining({ eventID: expect.any(String) })
    );
  });

  it('uses one shared id for gtag transaction_id and fbq eventID (CAPI dedup)', () => {
    fireLeadConversion('tour_enquiry');
    const gtagId = mockGtag.mock.calls[0][2].transaction_id as string;
    const fbqId = mockFbq.mock.calls[0][3].eventID as string;
    expect(gtagId).toBe(fbqId);
  });

  it('reflects the lead source in the event id', () => {
    fireLeadConversion('contact_page');
    expect(mockGtag.mock.calls[0][2].transaction_id).toMatch(/^cts-contact_page-/);
  });

  it('does not throw and still fires Meta when gtag is missing', () => {
    delete (window as any).gtag;
    expect(() => fireLeadConversion('contact_page')).not.toThrow();
    expect(mockFbq).toHaveBeenCalledTimes(1);
  });

  it('does not throw and still fires Google Ads when fbq is missing', () => {
    delete (window as any).fbq;
    expect(() => fireLeadConversion('tour_enquiry')).not.toThrow();
    expect(mockGtag).toHaveBeenCalledTimes(1);
  });

  it('retries until gtag/fbq become available (afterInteractive race)', () => {
    delete (window as any).gtag;
    delete (window as any).fbq;
    fireLeadConversion('tour_enquiry');
    // Not ready on the synchronous first attempt → nothing fired yet.
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    // TrackingScripts finishes loading a moment later.
    (window as any).gtag = mockGtag;
    (window as any).fbq = mockFbq;
    jest.advanceTimersByTime(200); // > one retry interval (150ms)
    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockFbq).toHaveBeenCalledTimes(1);
    // Still shares one id across channels after the retry.
    expect(mockGtag.mock.calls[0][2].transaction_id).toBe(mockFbq.mock.calls[0][3].eventID);
  });

  it('fires each channel exactly once even if one loads later than the other', () => {
    delete (window as any).fbq; // gtag ready, fbq not
    fireLeadConversion('tour_enquiry');
    expect(mockGtag).toHaveBeenCalledTimes(1); // gtag fired immediately
    expect(mockFbq).not.toHaveBeenCalled();
    (window as any).fbq = mockFbq; // fbq shows up later
    jest.advanceTimersByTime(200);
    expect(mockGtag).toHaveBeenCalledTimes(1); // not re-fired
    expect(mockFbq).toHaveBeenCalledTimes(1);
  });

  it('gives up after ~3s without looping forever when nothing loads', () => {
    delete (window as any).gtag;
    delete (window as any).fbq;
    fireLeadConversion('contact_page');
    jest.advanceTimersByTime(10_000); // far beyond the retry budget
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0); // no dangling/looping timer
  });
});
