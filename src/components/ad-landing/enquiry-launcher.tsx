'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/**
 * The enquiry form of an ad landing page exists ONCE in the page. On a phone it is a bottom sheet that the buttons
 * open; from the `lg` breakpoint up it is an ordinary card in the hero. Every "Send Enquiry" button on the page goes
 * through this context, so the form, its fields and its conversion events are the same however the visitor reached it.
 */

export type CtaLocation = 'hero' | 'sticky_bar' | 'price' | 'closing';

interface LauncherValue {
  isOpen: boolean;
  /** `trigger` is the button that was pressed; focus goes back to it when the sheet closes. */
  open: (location: CtaLocation, trigger?: HTMLElement | null) => void;
  close: () => void;
}

const LauncherContext = createContext<LauncherValue | null>(null);

export const ENQUIRY_PANEL_ID = 'ad-enquiry-panel';
const DESKTOP_QUERY = '(min-width: 1024px)';
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

function useLauncher(): LauncherValue {
  const value = useContext(LauncherContext);
  if (!value) throw new Error('Ad landing buttons and panel must be inside <AdEnquiryProvider>.');
  return value;
}

function isDesktopNow(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(DESKTOP_QUERY).matches;
}

function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return desktop;
}

/** GA4 only, and not a conversion: "someone asked for the form". Gives the click -> form -> enquiry funnel a middle number. */
function trackEnquiryOpen(location: CtaLocation, tourSlug: string): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') gtag('event', 'enquiry_open', { tour_slug: tourSlug, cta_location: location });
}

export function AdEnquiryProvider({ tourSlug, children }: { tourSlug: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setIsOpen(false), []);

  const open = useCallback(
    (location: CtaLocation, trigger?: HTMLElement | null) => {
      trackEnquiryOpen(location, tourSlug);
      if (isDesktopNow()) {
        // The form is already on screen: bring it into view and put the cursor in the first field.
        const panel = document.getElementById(ENQUIRY_PANEL_ID);
        panel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel?.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true });
        return;
      }
      // Remember the button itself: Safari does not give a clicked button the focus, so the focused element is not reliable.
      lastFocused.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      setIsOpen(true);
    },
    [tourSlug],
  );

  // While the sheet is open: the page behind does not scroll, Escape closes it, Tab stays inside it, focus moves into
  // it, and goes back to the button that opened it when it closes. A switch to a desktop-width window closes it.
  useEffect(() => {
    if (!isOpen) return;
    const panel = document.getElementById(ENQUIRY_PANEL_ID);
    const previouslyFocused = lastFocused.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    const frame = window.requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>('input, select, textarea')?.focus();
    });

    const desktopQuery = typeof window.matchMedia === 'function' ? window.matchMedia(DESKTOP_QUERY) : null;
    const closeOnDesktop = () => {
      if (desktopQuery?.matches) setIsOpen(false);
    };
    desktopQuery?.addEventListener('change', closeOnDesktop);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(frame);
      desktopQuery?.removeEventListener('change', closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return <LauncherContext.Provider value={value}>{children}</LauncherContext.Provider>;
}

/** Holds the page's single enquiry form: a bottom sheet below `lg`, a plain card from `lg` up. */
export function AdEnquiryPanel({ children }: { children: ReactNode }) {
  const { isOpen, close } = useLauncher();
  const isDesktop = useIsDesktop();
  const asDialog = isOpen && !isDesktop;

  return (
    <>
      {asDialog && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
          aria-hidden="true"
          data-testid="enquiry-backdrop"
        />
      )}
      <div
        id={ENQUIRY_PANEL_ID}
        role={asDialog ? 'dialog' : undefined}
        aria-modal={asDialog ? true : undefined}
        aria-label={asDialog ? 'Send an enquiry' : undefined}
        className={[
          'fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white text-gray-900 shadow-2xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'visible translate-y-0' : 'invisible translate-y-full',
          'lg:visible lg:static lg:z-auto lg:max-h-[calc(100vh-3rem)] lg:translate-y-0 lg:rounded-2xl lg:shadow-xl',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close the enquiry form"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
    </>
  );
}

/** Any "Send Enquiry" style button on the page. */
export function OpenEnquiryButton({
  location,
  className,
  children,
  id,
}: {
  location: CtaLocation;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const { open } = useLauncher();
  return (
    <button type="button" id={id} className={className} onClick={(event) => open(location, event.currentTarget)}>
      {children}
    </button>
  );
}

/** Fixed bar at the bottom of the screen once the hero button has scrolled out of sight; hidden while the sheet is open. */
export function StickyCtaBar({ priceLine, ctaLabel = 'Send Enquiry' }: { priceLine: string; ctaLabel?: string }) {
  const { isOpen, open } = useLauncher();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const target = document.getElementById('hero-cta');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !isOpen;
  return (
    <div
      aria-hidden={!visible}
      className={[
        'fixed inset-x-0 bottom-0 z-30 border-t border-warm-200 bg-white/95 px-4 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300',
        visible ? 'visible translate-y-0' : 'invisible translate-y-full',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">{priceLine}</p>
        <button
          type="button"
          onClick={(event) => open('sticky_bar', event.currentTarget)}
          className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
