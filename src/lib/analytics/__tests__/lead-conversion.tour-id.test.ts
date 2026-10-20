/**
 * Tests for lead-conversion.ts — tour identification
 *
 * WHY these tests exist:
 *
 * An enquiry on a tour page (or on an ad landing page, which uses the same
 * form) must tell the two conversion channels WHICH tour it is about, so ads
 * can be judged tour by tour:
 *   - GA4 `generate_lead` gets `tour_slug` = the address of the tour's own
 *     page (never the ad page the visitor came through).
 *   - Meta Pixel `Lead` gets `content_ids: [<tour slug>]` and
 *     `content_type: 'product'` — the same id and type the ViewContent event
 *     sends for that tour, so Meta can match "viewed tour X" with "enquired
 *     about tour X".
 *
 * Nothing else about the events changes: the Google Ads conversion, the
 * `enquiry_thank_you` event, the shared id between gtag and fbq, the
 * once-only firing and the late-script retry all stay as they were. Enquiries
 * from forms that are not about one tour (contact page, hub, visa guide) send
 * no tour fields at all.
 */

import { fireLeadConversion, type LeadTour } from '../lead-conversion';
import { fireViewContent } from '../view-content';

const TOUR: LeadTour = {
  path: '/tours/china/discovery/shanghai-surroundings',
  slug: 'shanghai-surroundings',
};

const mockGtag = jest.fn();
const mockFbq = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  Object.assign(window, { gtag: mockGtag, fbq: mockFbq });
  mockGtag.mockClear();
  mockFbq.mockClear();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

afterAll(() => {
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const gtagEvent = (name: string) =>
  mockGtag.mock.calls.find((call) => call[0] === 'event' && call[1] === name);

const gtagCount = (name: string) =>
  mockGtag.mock.calls.filter((call) => call[0] === 'event' && call[1] === name).length;

describe('fireLeadConversion with a tour', () => {
  it('adds the tour page address to the GA4 generate_lead event as tour_slug', () => {
    fireLeadConversion('tour_enquiry', TOUR);

    const conversion = gtagEvent('conversion');
    const lead = gtagEvent('generate_lead');
    expect(lead).toBeDefined();
    expect(lead![2]).toEqual({
      lead_source: 'tour_enquiry',
      transaction_id: conversion![2].transaction_id,
      tour_slug: TOUR.path,
    });
  });

  it('adds the tour slug to the Meta Lead event as content_ids, with no value or currency', () => {
    fireLeadConversion('tour_enquiry', TOUR);

    expect(mockFbq).toHaveBeenCalledTimes(1);
    expect(mockFbq).toHaveBeenCalledWith(
      'track',
      'Lead',
      { content_ids: ['shanghai-surroundings'], content_type: 'product' },
      expect.objectContaining({ eventID: expect.any(String) })
    );
    const customData = mockFbq.mock.calls[0][2] as Record<string, unknown>;
    expect(customData).not.toHaveProperty('value');
    expect(customData).not.toHaveProperty('currency');
  });

  it('uses the same content id and type as the Meta ViewContent event for that tour', () => {
    fireViewContent({ contentId: TOUR.slug, value: 2699 });
    expect(mockFbq).toHaveBeenCalledTimes(1);
    const viewContentData = mockFbq.mock.calls[0][2] as {
      content_ids: string[];
      content_type: string;
    };

    mockFbq.mockClear();
    fireLeadConversion('tour_enquiry', TOUR);

    const leadData = mockFbq.mock.calls[0][2] as {
      content_ids: string[];
      content_type: string;
    };
    expect(leadData.content_ids).toEqual(viewContentData.content_ids);
    expect(leadData.content_type).toBe(viewContentData.content_type);
  });

  it('leaves the Google Ads conversion exactly as it was', () => {
    fireLeadConversion('tour_enquiry', TOUR);

    const conversion = gtagEvent('conversion');
    expect(conversion).toBeDefined();
    expect(conversion![2]).toEqual({
      send_to: 'AW-17984232872/y-kaCLSI9YAcEKi7xv9C',
      value: 1,
      currency: 'NZD',
      transaction_id: expect.any(String),
    });
  });

  it('leaves the enquiry_thank_you event without tour fields', () => {
    fireLeadConversion('tour_enquiry', TOUR);

    const thankYou = gtagEvent('enquiry_thank_you');
    expect(thankYou).toBeDefined();
    expect(thankYou![2]).not.toHaveProperty('tour_slug');
    expect(thankYou![2]).not.toHaveProperty('content_ids');
  });

  it('still uses one shared id for gtag and fbq', () => {
    fireLeadConversion('tour_enquiry', TOUR);

    const lead = gtagEvent('generate_lead');
    expect(lead).toBeDefined();
    expect(lead![2].transaction_id).toBe(mockFbq.mock.calls[0][3].eventID);
  });

  it('fires each event once even when the scripts load late', () => {
    Reflect.deleteProperty(window, 'gtag');
    Reflect.deleteProperty(window, 'fbq');

    fireLeadConversion('tour_enquiry', TOUR);
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();

    Object.assign(window, { gtag: mockGtag, fbq: mockFbq });
    jest.advanceTimersByTime(200);
    jest.advanceTimersByTime(2000);

    expect(gtagCount('conversion')).toBe(1);
    expect(gtagCount('generate_lead')).toBe(1);
    expect(gtagCount('enquiry_thank_you')).toBe(1);
    expect(mockFbq.mock.calls.filter((call) => call[1] === 'Lead')).toHaveLength(1);
  });
});

describe('fireLeadConversion without a tour', () => {
  it.each(['contact_page', 'china_tours_hub', 'china_visa_guide'] as const)(
    'sends no tour fields for the forms that are not about one tour (%s)',
    (source) => {
      fireLeadConversion(source);

      const lead = gtagEvent('generate_lead');
      expect(lead).toBeDefined();
      expect(lead![2]).toEqual({
        lead_source: source,
        transaction_id: expect.any(String),
      });
      expect(mockFbq.mock.calls[0][2]).toEqual({});
    }
  );

  it('a tour enquiry without a tour also sends none', () => {
    fireLeadConversion('tour_enquiry');

    const lead = gtagEvent('generate_lead');
    expect(lead).toBeDefined();
    expect(lead![2]).not.toHaveProperty('tour_slug');
    expect(mockFbq.mock.calls[0][2]).toEqual({});
  });
});
