/**
 * Tests for lead-conversion.ts
 *
 * Covers:
 *  - fires the Google Ads conversion to the correct send_to + value/currency
 *  - fires the Meta Pixel `Lead` event with a matching eventID (CAPI dedup)
 *  - gtag and fbq share the same transaction_id / eventID per call
 *  - each channel is guarded independently (missing gtag or fbq does not throw)
 *  - source is reflected in the eventID
 */

import { fireLeadConversion } from '../lead-conversion';

const mockGtag = jest.fn();
const mockFbq = jest.fn();

beforeEach(() => {
  (window as any).gtag = mockGtag;
  (window as any).fbq = mockFbq;
  mockGtag.mockClear();
  mockFbq.mockClear();
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
});
