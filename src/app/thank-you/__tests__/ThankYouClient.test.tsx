/**
 * ThankYouClient tests
 *
 * WHY: opening /thank-you directly (bookmark, refresh, shared link, QA) is not
 * an enquiry, so this page must never fire the Lead conversion (Google Ads /
 * Meta Pixel / GA4). The enquiry forms fire it themselves, right after their
 * API call succeeds.
 *
 * To prove that, we deliberately do NOT mock '@/lib/analytics/lead-conversion'.
 * Instead we observe the real ad tags (window.gtag / window.fbq) and assert
 * they are never called, no matter how the page is reached.
 */
import { render } from '@testing-library/react';
import ThankYouClient from '@/app/thank-you/ThankYouClient';

const mockTriggerGtm = jest.fn();

jest.mock('@/components/GoogleTagManager', () => ({
  triggerGtmEvent: (...args: unknown[]) => mockTriggerGtm(...args),
}));

const mockGtag = jest.fn();
const mockFbq = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  mockTriggerGtm.mockClear();
  sessionStorage.clear();
  mockGtag.mockReset();
  mockFbq.mockReset();
  Object.assign(window, { gtag: mockGtag, fbq: mockFbq });
});

afterEach(() => {
  jest.useRealTimers();
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

describe('ThankYouClient', () => {
  it('does not fire any Google Ads / Meta / GA4 conversion when opened with tour params', () => {
    render(<ThankYouClient tourSlug="beijing-xian" tourName="A Tale of Two Cities" />);
    jest.advanceTimersByTime(10000);
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('does not fire any conversion on a direct visit with no params', () => {
    render(<ThankYouClient />);
    jest.advanceTimersByTime(10000);
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('does not fire any conversion when the same URL is opened again (refresh)', () => {
    const { unmount } = render(
      <ThankYouClient tourSlug="beijing-xian" tourName="A Tale of Two Cities" />
    );
    unmount();
    render(<ThankYouClient tourSlug="beijing-xian" tourName="A Tale of Two Cities" />);
    jest.advanceTimersByTime(10000);
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('still pushes the GTM thank-you page event once, with the tour from the URL', () => {
    render(<ThankYouClient tourSlug="beijing-xian" tourName="A Tale of Two Cities" />);
    expect(mockTriggerGtm).toHaveBeenCalledTimes(1);
    expect(mockTriggerGtm.mock.calls[0][0]).toMatchObject({
      event: 'tour_enquiry_thank_you',
      form_type: 'tour_enquiry',
      tour_slug: 'beijing-xian',
      tour_name: 'A Tale of Two Cities',
      pagePath: '/thank-you',
    });
  });

  it('pushes the GTM page event with empty tour fields on a direct visit', () => {
    render(<ThankYouClient />);
    expect(mockTriggerGtm.mock.calls[0][0]).toMatchObject({
      event: 'tour_enquiry_thank_you',
      tour_slug: '',
      tour_name: '',
    });
  });
});
