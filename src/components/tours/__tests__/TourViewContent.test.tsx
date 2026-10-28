/**
 * WHY — Meta retargeting audiences ("viewed tour X but did not enquire") need
 * the tour slug and the starting price on every tour page view; the price must
 * come from the tour's own headline price and be left out when it cannot be
 * read.
 */
import { render } from '@testing-library/react';
import TourViewContent from '@/components/tours/TourViewContent';

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

test('fires ViewContent once with the tour slug and the starting price taken from the headline price', () => {
  render(<TourViewContent tour={{ slug: 'beijing-xian', price: 'From NZD $3,480' }} />);

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
    { eventID: expect.stringMatching(/^cts-viewcontent-beijing-xian-/) },
  );
});

test('reads a price written with per person and thousands separators', () => {
  render(<TourViewContent tour={{ slug: 'beijing-xian', price: 'NZD $10,899 per person' }} />);

  expect(mockFbq).toHaveBeenCalledTimes(1);
  expect(mockFbq).toHaveBeenCalledWith(
    'track',
    'ViewContent',
    {
      content_ids: ['beijing-xian'],
      content_type: 'product',
      value: 10899,
      currency: 'NZD',
    },
    { eventID: expect.stringMatching(/^cts-viewcontent-beijing-xian-/) },
  );
});

test('sends no value or currency when the headline price cannot be read', () => {
  render(<TourViewContent tour={{ slug: 'x', price: 'Price on request' }} />);

  expect(mockFbq).toHaveBeenCalledTimes(1);
  expect(mockFbq.mock.calls[0][2]).toEqual({
    content_ids: ['x'],
    content_type: 'product',
  });
});

test('does not fire again when the same page re-renders', () => {
  const { rerender } = render(
    <TourViewContent tour={{ slug: 'beijing-xian', price: 'From NZD $3,480' }} />,
  );
  rerender(<TourViewContent tour={{ slug: 'beijing-xian', price: 'From NZD $3,480' }} />);

  expect(mockFbq).toHaveBeenCalledTimes(1);
});

test('fires again for a different tour (client-side navigation between tour pages)', () => {
  const { rerender } = render(
    <TourViewContent tour={{ slug: 'beijing-xian', price: 'From NZD $3,480' }} />,
  );
  rerender(<TourViewContent tour={{ slug: 'shanghai-suzhou', price: 'From NZD $2,699' }} />);

  expect(mockFbq).toHaveBeenCalledTimes(2);
  expect(mockFbq.mock.calls[1][2]).toEqual({
    content_ids: ['shanghai-suzhou'],
    content_type: 'product',
    value: 2699,
    currency: 'NZD',
  });
});
