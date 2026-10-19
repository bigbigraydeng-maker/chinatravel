/**
 * WHY — a free newsletter signup must not be reported to Meta as the standard
 * `Subscribe` event: Meta defines Subscribe as the start of a PAID subscription
 * (its value and currency describe that payment), so the free signup is sent as
 * the custom event `NewsletterSignup` instead. The footer form sends nothing to
 * Meta, and the email address is never given to the browser pixel.
 */

import {
  trackNewsletterSubmit,
  trackNewsletterPopupView,
  trackNewsletterPopupDismiss,
} from '@/lib/analytics/newsletter-tracking'

const mockFbq = jest.fn()

const dataLayer = (): Array<Record<string, unknown>> => Reflect.get(window, 'dataLayer')

beforeEach(() => {
  mockFbq.mockClear()
  Object.assign(window, { fbq: mockFbq, dataLayer: [] })
})

afterEach(() => {
  Reflect.deleteProperty(window, 'fbq')
  Reflect.deleteProperty(window, 'dataLayer')
})

describe('trackNewsletterSubmit — popup', () => {
  it('popup signup sends the custom event NewsletterSignup once, with an eventID', () => {
    trackNewsletterSubmit('popup', 'ada@example.com')

    expect(mockFbq).toHaveBeenCalledTimes(1)
    expect(mockFbq).toHaveBeenCalledWith(
      'trackCustom',
      'NewsletterSignup',
      { content_name: 'newsletter_popup' },
      { eventID: expect.stringMatching(/^cts-newsletter-\d+$/) },
    )
  })

  it('popup signup is never reported as the standard Subscribe event', () => {
    trackNewsletterSubmit('popup', 'ada@example.com')

    const calls = mockFbq.mock.calls as unknown[][]
    expect(calls.some((call) => call[1] === 'Subscribe')).toBe(false)
    expect(calls.some((call) => call[0] === 'track')).toBe(false)
  })

  it('popup signup does not give the free signup a made-up value or currency', () => {
    trackNewsletterSubmit('popup', 'ada@example.com')

    const params = mockFbq.mock.calls[0][2] as Record<string, unknown>
    expect(params).not.toHaveProperty('value')
    expect(params).not.toHaveProperty('currency')
  })

  it('the email address is not given to the pixel', () => {
    trackNewsletterSubmit('popup', 'ada@example.com')

    expect(JSON.stringify(mockFbq.mock.calls)).not.toContain('ada@example.com')
  })
})

describe('trackNewsletterSubmit — footer', () => {
  it('footer signup sends nothing to Meta', () => {
    trackNewsletterSubmit('footer', 'ada@example.com')

    expect(mockFbq).not.toHaveBeenCalled()
  })
})

describe('dataLayer events', () => {
  it('both signups still push their own dataLayer event', () => {
    trackNewsletterSubmit('popup', 'ada@example.com')
    trackNewsletterSubmit('footer', 'ada@example.com')

    const entries = dataLayer()
    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event: 'newsletter_popup_submit', location: 'popup' }),
        expect.objectContaining({ event: 'newsletter_footer_submit', location: 'footer' }),
      ]),
    )
  })

  it('popup view and dismiss only touch the dataLayer, never the pixel', () => {
    trackNewsletterPopupView()
    trackNewsletterPopupDismiss('close_button')

    expect(mockFbq).not.toHaveBeenCalled()

    const entries = dataLayer()
    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event: 'newsletter_popup_view' }),
        expect.objectContaining({ event: 'newsletter_popup_dismiss' }),
      ]),
    )
  })
})

describe('resilience', () => {
  it('does not throw when the pixel is not loaded', () => {
    Reflect.deleteProperty(window, 'fbq')

    expect(() => trackNewsletterSubmit('popup')).not.toThrow()
  })
})
