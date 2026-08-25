/**
 * Newsletter funnel tracking — GTM + Meta Pixel, each guarded independently.
 *
 * Fires 4 events (kept short so they read cleanly in GA4 / GTM debug):
 *   - newsletter_popup_view       modal opens after the delay
 *   - newsletter_popup_dismiss    close button / backdrop / "No thanks"
 *   - newsletter_popup_submit     subscribe API returned OK from the popup
 *   - newsletter_footer_submit    subscribe API returned OK from the footer form
 *
 * The two submit events give us the "popup vs. footer" split PM asked for
 * ("弹窗是不是浪费"). Without it we can't tell where subscriptions actually
 * come from.
 *
 * The Meta Pixel side uses `Subscribe` for popup submissions so it can drive
 * lookalike / retargeting audiences directly. Dismiss and view fire only as
 * GTM dataLayer events — pushing "somebody closed a popup" to Facebook's ad
 * pixel is signal-poor and audience-hostile.
 */

type FbqFn = (...args: unknown[]) => void

function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { dataLayer?: Array<Record<string, unknown>> }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...params })
}

function fbq(): FbqFn | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { fbq?: FbqFn }).fbq
}

export function trackNewsletterPopupView(): void {
  pushDataLayer('newsletter_popup_view', { location: 'popup' })
}

export function trackNewsletterPopupDismiss(reason: 'close_button' | 'backdrop' | 'no_thanks'): void {
  pushDataLayer('newsletter_popup_dismiss', { location: 'popup', reason })
}

export function trackNewsletterSubmit(location: 'popup' | 'footer', email?: string): void {
  const event = location === 'popup' ? 'newsletter_popup_submit' : 'newsletter_footer_submit'
  pushDataLayer(event, { location })

  // Meta Pixel — only on successful submit, and only from the popup (footer
  // subscriptions already fire the site-wide Lead pixel via other channels
  // when the visitor later fills a proper enquiry form).
  if (location === 'popup') {
    const f = fbq()
    if (f) {
      // eventID lets a future CAPI Subscribe event de-dupe against this browser hit.
      const eventId = `cts-newsletter-${Date.now()}`
      f('track', 'Subscribe', { content_name: 'newsletter_popup' }, { eventID: eventId })
      void email // reserved for CAPI hashed-email payload, not sent client-side.
    }
  }
}
