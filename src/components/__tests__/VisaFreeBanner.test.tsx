/**
 * VisaFreeBanner — sticky behaviour + height publishing tests
 *
 * The banner sits above the sticky <Navbar> in ConditionalChrome. The two
 * stack cleanly because:
 *  - Banner is `sticky top-0 z-[60]`
 *  - Navbar offsets itself by `top: var(--vfb-h, 0px)`
 *  - Banner publishes its measured offsetHeight into `--vfb-h` on the
 *    document root (and zeroes it on dismiss/unmount)
 *
 * If either contract regresses (class removed, var-publishing effect
 * deleted, dismiss no longer zeroes the var) the visual stack breaks —
 * pin both here.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import VisaFreeBanner from '../VisaFreeBanner';

// jsdom has no ResizeObserver — stub a minimal one so the height effect runs.
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  (global as any).ResizeObserver = MockResizeObserver;
  window.localStorage.clear();
  document.documentElement.style.removeProperty('--vfb-h');
});

afterEach(() => {
  document.documentElement.style.removeProperty('--vfb-h');
});

describe('VisaFreeBanner', () => {
  it('the outer banner div is sticky top-0 with z-[60] so it stays pinned to viewport top above the navbar', () => {
    render(<VisaFreeBanner />);
    const banner = document.getElementById('visa-free-banner');
    expect(banner).not.toBeNull();
    const cls = banner!.className;
    expect(cls).toMatch(/\bsticky\b/);
    expect(cls).toMatch(/\btop-0\b/);
    expect(cls).toMatch(/z-\[60\]/);
  });

  it('publishes `--vfb-h` on the document root on mount (lets the navbar offset itself)', () => {
    // jsdom returns 0 for offsetHeight, so we just assert the var is set to
    // *something* (a px string). The contract that matters is "var exists",
    // not the numeric value (the browser measures the real height).
    render(<VisaFreeBanner />);
    const v = document.documentElement.style.getPropertyValue('--vfb-h');
    expect(v).toMatch(/^\d+px$/);
  });

  it('zeroes `--vfb-h` when the user dismisses the banner (so the navbar collapses flush to top)', () => {
    render(<VisaFreeBanner />);
    const dismiss = screen.getByLabelText(/dismiss visa-free banner/i);
    act(() => {
      fireEvent.click(dismiss);
    });
    expect(document.documentElement.style.getPropertyValue('--vfb-h')).toBe('0px');
  });

  it('honours a previously stored dismiss flag and zeroes `--vfb-h` immediately', () => {
    window.localStorage.setItem('cts_visa_banner_v1_dismissed', '1');
    render(<VisaFreeBanner />);
    // Effect reads localStorage → setHidden(true) → second effect → var set to 0
    expect(document.documentElement.style.getPropertyValue('--vfb-h')).toBe('0px');
  });
});
