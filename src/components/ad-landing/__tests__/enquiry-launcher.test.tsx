import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdEnquiryPanel, AdEnquiryProvider, OpenEnquiryButton, StickyCtaBar } from '@/components/ad-landing/enquiry-launcher';

/**
 * The enquiry form of an ad landing page exists ONCE in the page. On a phone it is a bottom sheet that every
 * "Send Enquiry" button opens, and it must behave like a proper dialog: the page behind does not scroll, Escape
 * closes it, Tab stays inside it, and focus goes back to the button that opened it. From `lg` up it is an ordinary
 * card that the buttons only bring into view. Opening it is reported to analytics with the tour and the button's
 * place, so the click -> form -> enquiry funnel has a middle number. These tests pin all of that.
 */

function mockMatchMedia(initialDesktop: boolean) {
  let matches = initialDesktop;
  const listeners = new Set<() => void>();
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    addEventListener: (_type: string, callback: () => void) => {
      listeners.add(callback);
    },
    removeEventListener: (_type: string, callback: () => void) => {
      listeners.delete(callback);
    },
  }));
  return {
    setDesktop(value: boolean) {
      matches = value;
      act(() => {
        listeners.forEach((callback) => callback());
      });
    },
  };
}

type ObserverCallback = (entries: Array<{ isIntersecting: boolean; boundingClientRect: { top: number } }>) => void;

let observerCallback: ObserverCallback | null = null;

class FakeObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function scrollHeroOutOfSight() {
  act(() => {
    observerCallback?.([{ isIntersecting: false, boundingClientRect: { top: -10 } }]);
  });
}

function scrollHeroIntoSight() {
  act(() => {
    observerCallback?.([{ isIntersecting: true, boundingClientRect: { top: 10 } }]);
  });
}

let gtag: jest.Mock;

beforeEach(() => {
  observerCallback = null;
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: FakeObserver,
  });
  Element.prototype.scrollIntoView = jest.fn();
  gtag = jest.fn();
  Object.defineProperty(window, 'gtag', { writable: true, configurable: true, value: gtag });
  document.body.style.overflow = '';
});

afterEach(() => {
  document.body.style.overflow = '';
});

function Harness() {
  return (
    <AdEnquiryProvider tourSlug='test-tour'>
      <div id='hero-cta' />
      <OpenEnquiryButton location='hero'>Hero button</OpenEnquiryButton>
      <StickyCtaBar priceLine='From NZD $2,699 per person' />
      <AdEnquiryPanel>
        <input aria-label='Name' />
        <input aria-label='Email' />
        <button type='button'>Send it</button>
      </AdEnquiryPanel>
    </AdEnquiryProvider>
  );
}

describe('AdEnquiryPanel on a phone', () => {
  it('starts closed: hidden and not a dialog', () => {
    mockMatchMedia(false);
    render(<Harness />);

    const panel = document.getElementById('ad-enquiry-panel');
    expect(panel).not.toBeNull();
    expect(panel).toHaveClass('invisible');
    expect(panel).toHaveClass('translate-y-full');
    expect(panel?.getAttribute('role')).toBeNull();
    expect(screen.queryByTestId('enquiry-backdrop')).toBeNull();
  });

  it('opens as a modal dialog from the hero button', async () => {
    mockMatchMedia(false);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));

    const panel = document.getElementById('ad-enquiry-panel');
    expect(panel).toHaveAttribute('role', 'dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
    expect(panel).toHaveClass('translate-y-0');
    expect(panel).not.toHaveClass('invisible');
    expect(screen.getByTestId('enquiry-backdrop')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByLabelText('Name'));
    });
  });

  it('closes with Escape, restores scrolling and gives focus back to the button', () => {
    mockMatchMedia(false);
    render(<Harness />);

    const heroButton = screen.getByRole('button', { name: 'Hero button' });
    fireEvent.click(heroButton);

    fireEvent.keyDown(document, { key: 'Escape' });

    const panel = document.getElementById('ad-enquiry-panel');
    expect(panel?.getAttribute('role')).toBeNull();
    expect(screen.queryByTestId('enquiry-backdrop')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(heroButton);
  });

  it('closes from the backdrop and from the close button', () => {
    mockMatchMedia(false);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));
    fireEvent.click(screen.getByTestId('enquiry-backdrop'));
    expect(document.getElementById('ad-enquiry-panel')?.getAttribute('role')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close the enquiry form' }));
    expect(document.getElementById('ad-enquiry-panel')?.getAttribute('role')).toBeNull();
  });

  it('keeps Tab inside the sheet', () => {
    mockMatchMedia(false);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));

    const closeButton = screen.getByRole('button', { name: 'Close the enquiry form' });
    const sendButton = screen.getByRole('button', { name: 'Send it' });

    sendButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);

    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(sendButton);
  });

  it('closes if the window becomes desktop-wide while open', () => {
    const media = mockMatchMedia(false);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));
    expect(document.getElementById('ad-enquiry-panel')).toHaveAttribute('role', 'dialog');

    media.setDesktop(true);

    expect(document.getElementById('ad-enquiry-panel')?.getAttribute('role')).toBeNull();
    // The scroll lock must go with it, or the desktop page would stay frozen behind a sheet nobody can see.
    expect(document.body.style.overflow).toBe('');
  });
});

describe('AdEnquiryPanel on a desktop', () => {
  it('does not open a dialog; it brings the card into view and focuses the first field', () => {
    mockMatchMedia(true);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));

    const panel = document.getElementById('ad-enquiry-panel');
    expect(panel?.getAttribute('role')).toBeNull();
    expect(screen.queryByTestId('enquiry-backdrop')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(screen.getByLabelText('Name'));
  });
});

describe('analytics', () => {
  it('reports the opening with the tour and the place of the button', () => {
    mockMatchMedia(false);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));

    expect(gtag).toHaveBeenCalledWith('event', 'enquiry_open', {
      tour_slug: 'test-tour',
      cta_location: 'hero',
    });
  });

  it('reports the opening on a desktop too', () => {
    mockMatchMedia(true);
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero button' }));

    expect(gtag).toHaveBeenCalledWith('event', 'enquiry_open', {
      tour_slug: 'test-tour',
      cta_location: 'hero',
    });
  });

  it('does not fail when analytics is not loaded', () => {
    mockMatchMedia(false);
    Object.defineProperty(window, 'gtag', { writable: true, configurable: true, value: undefined });
    render(<Harness />);

    expect(() => fireEvent.click(screen.getByRole('button', { name: 'Hero button' }))).not.toThrow();

    expect(document.getElementById('ad-enquiry-panel')).toHaveAttribute('role', 'dialog');
  });
});

describe('StickyCtaBar', () => {
  it('is hidden until the hero button has scrolled out of sight', () => {
    mockMatchMedia(false);
    render(<Harness />);

    const bar = screen.getByText('From NZD $2,699 per person').closest('[aria-hidden]');
    expect(bar).not.toBeNull();
    expect(bar).toHaveAttribute('aria-hidden', 'true');
    expect(bar).toHaveClass('invisible');

    scrollHeroOutOfSight();

    expect(bar).toHaveAttribute('aria-hidden', 'false');
    expect(bar).toHaveClass('visible');
  });

  it('stays hidden while the hero button is still on screen', () => {
    mockMatchMedia(false);
    render(<Harness />);

    const bar = screen.getByText('From NZD $2,699 per person').closest('[aria-hidden]');
    expect(bar).not.toBeNull();

    scrollHeroIntoSight();

    expect(bar).toHaveAttribute('aria-hidden', 'true');
    expect(bar).toHaveClass('invisible');
  });

  it('opens the sheet and reports "sticky_bar"', () => {
    mockMatchMedia(false);
    render(<Harness />);

    scrollHeroOutOfSight();

    const bar = screen.getByText('From NZD $2,699 per person').closest('[aria-hidden]');
    expect(bar).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Send Enquiry' }));

    expect(document.getElementById('ad-enquiry-panel')).toHaveAttribute('role', 'dialog');
    expect(gtag).toHaveBeenCalledWith('event', 'enquiry_open', {
      tour_slug: 'test-tour',
      cta_location: 'sticky_bar',
    });
    expect(bar).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('outside the provider', () => {
  it('fails loudly when a button is used without the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<OpenEnquiryButton location='hero'>x</OpenEnquiryButton>)).toThrow(
      'must be inside <AdEnquiryProvider>',
    );

    spy.mockRestore();
  });
});
