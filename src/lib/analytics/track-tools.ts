/**
 * GA4 event tracking functions for Travel Tools integration
 * Used across Tailor-Made page to track tool discovery and conversion funnel
 */

type ToolClickSource = 'tailor-made-banner' | 'form-tip' | 'floating-cta';

// ─── Session attribution helpers ─────────────────────────────────────────────

const SESSION_TOOLS_KEY = 'cts_tools_assisted';

/**
 * Mark in sessionStorage that the user interacted with a planning tool during
 * this browser session. Persists until the tab is closed, so a user who opens
 * a tool and then returns to submit the form is correctly attributed.
 */
function markToolsUsed(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_TOOLS_KEY, '1');
  } catch {
    // sessionStorage unavailable (private mode quota edge-cases) — ignore
  }
}

/**
 * Returns true if the user clicked any planning tool link during this session.
 * Used at form-submission time to decide the enquiry_source attribution.
 */
export function hasUsedTools(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SESSION_TOOLS_KEY) === '1';
  } catch {
    return false;
  }
}

// ─── GA4 event helpers ────────────────────────────────────────────────────────

type GtagFn = (...args: unknown[]) => void;
function gtag(): GtagFn | undefined {
  return (window as Window & { gtag?: GtagFn }).gtag;
}

/**
 * Track when a user clicks a tool link from the Tailor-Made recommendation banner
 */
export function trackToolClick(toolName: string, source: ToolClickSource): void {
  if (typeof window === 'undefined') return;
  markToolsUsed();
  gtag()?.('event', 'tool_clicked_from_tailor_made', {
    tool_name: toolName,
    source,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when a user clicks a tool tip link inside the enquiry form
 */
export function trackToolTipClick(toolName: string, fieldName: string): void {
  if (typeof window === 'undefined') return;
  markToolsUsed();
  gtag()?.('event', 'tool_tip_clicked_in_form', {
    tool_name: toolName,
    field_name: fieldName,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when a user clicks the mobile floating CTA button
 */
export function trackMobileFloatingCTAClick(): void {
  if (typeof window === 'undefined') return;
  markToolsUsed();
  gtag()?.('event', 'mobile_tools_floating_cta_clicked', {
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when a user submits the Tailor-Made enquiry form.
 * Derives the source automatically from the session attribution flag — callers
 * should not pass a hardcoded value.
 */
export function trackEnquirySubmitted(): void {
  if (typeof window === 'undefined') return;
  const source = hasUsedTools() ? 'tailor-made-tools-recommended' : 'tailor-made-direct';
  gtag()?.('event', 'tailor_made_enquiry_submitted', {
    enquiry_source: source,
    timestamp: new Date().toISOString(),
  });
}
