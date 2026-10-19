/**
 * Tests for view-content.ts
 *
 * WHY: retargeting needs to know WHICH tour was viewed and at what starting
 * price; a missing price must never be replaced by a placeholder number.
 *
 * Covers:
 *  - sends ViewContent with the tour slug as content_ids and the starting price in NZD
 *  - omits value/currency when the price is unknown (never a placeholder)
 *  - does nothing and does not throw when the pixel never loads, and stops retrying
 *  - retries until the pixel script has loaded, then fires exactly once
 *  - never reports another event type
 *  - fires a separate event for every call (each page view counts)
 */

import { fireViewContent } from '@/lib/analytics/view-content';

const mockFbq = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  mockFbq.mockClear();
  Object.assign(window, { fbq: mockFbq });
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  Reflect.deleteProperty(window, 'fbq');
});

describe('fireViewContent', () => {
  it('sends ViewContent with the tour slug as content_ids and the starting price in NZD', () => {
    fireViewContent({ contentId: 'beijing-xian', value: 3480 });
    expect(mockFbq).toHaveBeenCalledTimes(1);
    expect(mockFbq).toHaveBeenCalledWith(
      'track',
      'ViewContent',
      {
        content_ids: ['beijing-xian'],
        content_type: 'product',
        value: 3480,
        currency: 'NZD',
      },
      { eventID: expect.stringMatching(/^cts-viewcontent-beijing-xian-\d+$/) }
    );
  });

  it('omits value and currency when the price is unknown (never a placeholder)', () => {
    fireViewContent({ contentId: 'x', value: null });
    expect(mockFbq).toHaveBeenCalledTimes(1);
    const params = mockFbq.mock.calls[0][2] as Record<string, unknown>;
    expect(params).toEqual({ content_ids: ['x'], content_type: 'product' });
    expect(params).not.toHaveProperty('value');
    expect(params).not.toHaveProperty('currency');
  });

  it('does nothing and does not throw when the pixel never loads, and stops retrying', () => {
    Reflect.deleteProperty(window, 'fbq');
    expect(() => fireViewContent({ contentId: 'x', value: 1 })).not.toThrow();
    jest.advanceTimersByTime(10_000);
    expect(mockFbq).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('retries until the pixel script has loaded, then fires exactly once', () => {
    Reflect.deleteProperty(window, 'fbq');
    fireViewContent({ contentId: 'x', value: 1 });
    expect(mockFbq).not.toHaveBeenCalled();
    Object.assign(window, { fbq: mockFbq });
    jest.advanceTimersByTime(200);
    expect(mockFbq).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(5000);
    expect(mockFbq).toHaveBeenCalledTimes(1);
  });

  it('never reports another event type', () => {
    fireViewContent({ contentId: 'x', value: 1 });
    for (const call of mockFbq.mock.calls) {
      expect(call[0]).toBe('track');
      expect(call[1]).toBe('ViewContent');
    }
  });

  it('fires a separate event for every call (each page view counts)', () => {
    fireViewContent({ contentId: 'x', value: 1 });
    fireViewContent({ contentId: 'x', value: 1 });
    expect(mockFbq).toHaveBeenCalledTimes(2);
  });
});
