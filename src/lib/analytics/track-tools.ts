/**
 * GA4 event tracking functions for Travel Tools integration
 * Used across Tailor-Made page to track tool discovery and conversion funnel
 */

type ToolClickSource = 'tailor-made-banner' | 'form-tip' | 'floating-cta';

/**
 * Track when a user clicks a tool link from the Tailor-Made recommendation banner
 */
export function trackToolClick(toolName: string, source: ToolClickSource): void {
  if (typeof window === 'undefined') return;
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
    'event',
    'tool_clicked_from_tailor_made',
    {
      tool_name: toolName,
      source,
      timestamp: new Date().toISOString(),
    }
  );
}

/**
 * Track when a user clicks a tool tip link inside the enquiry form
 */
export function trackToolTipClick(toolName: string, fieldName: string): void {
  if (typeof window === 'undefined') return;
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
    'event',
    'tool_tip_clicked_in_form',
    {
      tool_name: toolName,
      field_name: fieldName,
      timestamp: new Date().toISOString(),
    }
  );
}

/**
 * Track when a user clicks the mobile floating CTA button
 */
export function trackMobileFloatingCTAClick(): void {
  if (typeof window === 'undefined') return;
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
    'event',
    'mobile_tools_floating_cta_clicked',
    {
      timestamp: new Date().toISOString(),
    }
  );
}

/**
 * Track when a user submits the Tailor-Made enquiry form
 */
export function trackEnquirySubmitted(source: 'direct' | 'tools-recommended'): void {
  if (typeof window === 'undefined') return;
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
    'event',
    'tailor_made_enquiry_submitted',
    {
      enquiry_source: source === 'direct' ? 'tailor-made-direct' : 'tailor-made-tools-recommended',
      timestamp: new Date().toISOString(),
    }
  );
}
