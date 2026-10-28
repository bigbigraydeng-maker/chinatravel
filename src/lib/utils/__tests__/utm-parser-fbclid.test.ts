/**
 * utm-parser — fbclid first-touch capture
 *
 * WHY — fbclid is the only link between a website enquiry and the Facebook ad
 * click that produced it; it must be kept from the landing URL until the
 * enquiry is submitted, even when a link shortener moved it into the URL hash,
 * and the first ad click of a session must not be overwritten by a later visit.
 */
import { captureUtmParams, getStoredUtmParams, persistUtmParams } from '@/lib/utils/utm-parser';

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('utm-parser — fbclid first-touch capture', () => {
  it('keeps the fbclid from the landing URL for the enquiry that follows', () => {
    window.history.replaceState(
      {},
      '',
      '/tours/china/discovery/x?utm_source=facebook&fbclid=IwAR2x_abc'
    );

    captureUtmParams();

    expect(getStoredUtmParams()).toMatchObject({
      utm_source: 'facebook',
      fbclid: 'IwAR2x_abc',
    });
  });

  it('finds the fbclid in the URL hash when a link shortener moved the parameters there', () => {
    window.history.replaceState({}, '', '/x#fbclid=IwAR_hash&utm_source=facebook');

    captureUtmParams();

    expect(getStoredUtmParams().fbclid).toBe('IwAR_hash');
  });

  it('first touch wins: a later visit with another fbclid does not replace the stored one', () => {
    window.history.replaceState({}, '', '/a?fbclid=first');
    captureUtmParams();

    window.history.replaceState({}, '', '/b?fbclid=second');
    persistUtmParams();

    expect(getStoredUtmParams().fbclid).toBe('first');
  });

  it('stores nothing for a visit without tracking parameters', () => {
    window.history.replaceState({}, '', '/plain');

    captureUtmParams();

    expect(getStoredUtmParams()).toEqual({});
  });
});
