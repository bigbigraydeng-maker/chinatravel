/**
 * Tests for track-tools.ts
 *
 * Covers:
 *  - sessionStorage attribution flag (markToolsUsed / hasUsedTools)
 *  - GA4 event firing for each tracker function
 *  - trackEnquirySubmitted auto-derives source from flag
 */

import {
  trackToolClick,
  trackToolTipClick,
  trackMobileFloatingCTAClick,
  trackEnquirySubmitted,
  hasUsedTools,
} from '../track-tools';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mockGtag = jest.fn();

beforeEach(() => {
  // Attach a fresh mock to window.gtag before each test
  (window as any).gtag = mockGtag;
  mockGtag.mockClear();
  // Reset sessionStorage between tests
  sessionStorage.clear();
});

afterAll(() => {
  delete (window as any).gtag;
});

// ─── sessionStorage attribution ───────────────────────────────────────────────

describe('hasUsedTools', () => {
  it('returns false when no tool has been clicked this session', () => {
    expect(hasUsedTools()).toBe(false);
  });

  it('returns true after trackToolClick is called', () => {
    trackToolClick('cost-calculator', 'tailor-made-banner');
    expect(hasUsedTools()).toBe(true);
  });

  it('returns true after trackToolTipClick is called', () => {
    trackToolTipClick('best-time-to-visit', 'travel-date');
    expect(hasUsedTools()).toBe(true);
  });

  it('returns true after trackMobileFloatingCTAClick is called', () => {
    trackMobileFloatingCTAClick();
    expect(hasUsedTools()).toBe(true);
  });

  it('resets to false after sessionStorage.clear()', () => {
    trackToolClick('visa-checker', 'form-tip');
    expect(hasUsedTools()).toBe(true);
    sessionStorage.clear();
    expect(hasUsedTools()).toBe(false);
  });
});

// ─── GA4 event: trackToolClick ────────────────────────────────────────────────

describe('trackToolClick', () => {
  it('fires tool_clicked_from_tailor_made with correct params', () => {
    trackToolClick('cost-calculator', 'tailor-made-banner');

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'tool_clicked_from_tailor_made',
      expect.objectContaining({
        tool_name: 'cost-calculator',
        source: 'tailor-made-banner',
      })
    );
  });

  it('works with all valid source values', () => {
    const sources = ['tailor-made-banner', 'form-tip', 'floating-cta'] as const;
    sources.forEach((source) => {
      mockGtag.mockClear();
      trackToolClick('best-time-to-visit', source);
      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'tool_clicked_from_tailor_made',
        expect.objectContaining({ source })
      );
    });
  });

  it('does not throw when window.gtag is undefined', () => {
    delete (window as any).gtag;
    expect(() => trackToolClick('visa-checker', 'form-tip')).not.toThrow();
  });
});

// ─── GA4 event: trackToolTipClick ─────────────────────────────────────────────

describe('trackToolTipClick', () => {
  it('fires tool_tip_clicked_in_form with tool_name and field_name', () => {
    trackToolTipClick('cost-calculator', 'budget');

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'tool_tip_clicked_in_form',
      expect.objectContaining({
        tool_name: 'cost-calculator',
        field_name: 'budget',
      })
    );
  });
});

// ─── GA4 event: trackMobileFloatingCTAClick ──────────────────────────────────

describe('trackMobileFloatingCTAClick', () => {
  it('fires mobile_tools_floating_cta_clicked', () => {
    trackMobileFloatingCTAClick();

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'mobile_tools_floating_cta_clicked',
      expect.objectContaining({ timestamp: expect.any(String) })
    );
  });
});

// ─── GA4 event: trackEnquirySubmitted ─────────────────────────────────────────

describe('trackEnquirySubmitted', () => {
  it('records tailor-made-direct when no tool was used this session', () => {
    // sessionStorage is clear — user came directly
    trackEnquirySubmitted();

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'tailor_made_enquiry_submitted',
      expect.objectContaining({ enquiry_source: 'tailor-made-direct' })
    );
  });

  it('records tailor-made-tools-recommended when a tool was clicked first', () => {
    trackToolClick('visa-checker', 'tailor-made-banner'); // sets the flag
    mockGtag.mockClear();

    trackEnquirySubmitted();

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'tailor_made_enquiry_submitted',
      expect.objectContaining({ enquiry_source: 'tailor-made-tools-recommended' })
    );
  });

  it('records tools-recommended when a form-tip was clicked first', () => {
    trackToolTipClick('cost-calculator', 'budget');
    mockGtag.mockClear();

    trackEnquirySubmitted();

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'tailor_made_enquiry_submitted',
      expect.objectContaining({ enquiry_source: 'tailor-made-tools-recommended' })
    );
  });
});
