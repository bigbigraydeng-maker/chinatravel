import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import ConditionalChrome from '@/components/ConditionalChrome';
import { useGtmTracking } from '@/components/GoogleTagManager';
import { AD_LANDING_CONFIGS } from '@/lib/ad-landing/configs';

jest.mock('next/navigation', () => ({ usePathname: jest.fn() }));

jest.mock('@/components/Navbar', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'navbar' }) };
});

jest.mock('@/components/Footer', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'footer' }) };
});

jest.mock('@/components/VisaFreeBanner', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'visa-banner' }) };
});

jest.mock('@/components/newsletter/NewsletterPopup', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'newsletter-popup' }) };
});

jest.mock('@/components/GoogleTagManager', () => ({ useGtmTracking: jest.fn() }));

function renderAt(path: string | null) {
  (usePathname as jest.Mock).mockReturnValue(path);
  return render(
    <ConditionalChrome>
      <main data-testid="page">page</main>
    </ConditionalChrome>,
  );
}

const CHROME = ['navbar', 'footer', 'visa-banner', 'newsletter-popup'];

describe('ConditionalChrome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    '/',
    '/tours/china/discovery/shanghai-surroundings',
    '/campaigns/best-of-china',
    '/campaigns/october-2026/shanghai-surroundings',
    '/campaigns/chongqing',
  ])('shows the site chrome and the page on an ordinary page: %s', (path) => {
    renderAt(path);
    for (const testId of CHROME) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
    expect(screen.getByTestId('page')).toBeInTheDocument();
  });

  it.each(AD_LANDING_CONFIGS.map((config) => `/campaigns/${config.pathKey}`))(
    'shows only the page on an ad landing page: %s',
    (path) => {
      renderAt(path);
      expect(screen.getByTestId('page')).toBeInTheDocument();
      for (const testId of CHROME) {
        expect(screen.queryByTestId(testId)).toBeNull();
      }
    },
  );

  it.each(['/admin/orders', '/dev/preview'])('still hides the chrome in the back office: %s', (path) => {
    renderAt(path);
    expect(screen.getByTestId('page')).toBeInTheDocument();
    for (const testId of CHROME) {
      expect(screen.queryByTestId(testId)).toBeNull();
    }
  });

  it('keeps tracking on in both cases', () => {
    renderAt('/');
    expect(useGtmTracking).toHaveBeenCalled();

    (useGtmTracking as jest.Mock).mockClear();

    renderAt(`/campaigns/${AD_LANDING_CONFIGS[0].pathKey}`);
    expect(useGtmTracking).toHaveBeenCalled();
  });

  it('copes with a missing path', () => {
    renderAt(null);
    for (const testId of CHROME) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
    expect(screen.getByTestId('page')).toBeInTheDocument();
  });
});
