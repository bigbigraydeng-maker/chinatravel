/**
 * UtmAwareBanner tests
 *
 * - hides when no utm_source on URL
 * - shows for utm_source=meta / facebook / instagram / google (Meta + Google Ads)
 * - hides for utm_source values outside the allow-list
 * - swaps to visa-pain copy when utm_campaign matches /visa/i
 * - CTA scrolls to #china-tours-hero (matches the hero section id)
 */
import { render, screen, act } from '@testing-library/react';
import UtmAwareBanner from '../UtmAwareBanner';

function setQuery(qs: string) {
  window.history.replaceState({}, '', `/china-tours${qs}`);
}

describe('UtmAwareBanner', () => {
  afterEach(() => {
    setQuery('');
  });

  it('does not render when there are no UTM params', () => {
    setQuery('');
    render(<UtmAwareBanner />);
    expect(screen.queryByRole('region')).toBeNull();
  });

  it('renders default welcome copy for utm_source=meta with no campaign', async () => {
    setQuery('?utm_source=meta');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    const region = screen.getByRole('region', { name: /campaign welcome message/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('data-variant', 'default');
    expect(screen.getByText(/Welcome from our China campaign/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Request a callback/i })).toBeInTheDocument();
  });

  it('renders default copy for utm_source=facebook (Meta synonym)', async () => {
    setQuery('?utm_source=facebook');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toHaveAttribute('data-variant', 'default');
  });

  it('renders default copy for utm_source=google (Google Ads)', async () => {
    setQuery('?utm_source=google');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toHaveAttribute('data-variant', 'default');
  });

  it('hides when utm_source is outside the allow-list (e.g. newsletter)', async () => {
    setQuery('?utm_source=newsletter&utm_campaign=visa-free-2026');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    // Even with a visa campaign, organic / non-paid sources stay silent.
    expect(screen.queryByRole('region')).toBeNull();
  });

  it('swaps to visa-pain copy when utm_campaign contains "visa"', async () => {
    setQuery('?utm_source=google&utm_campaign=visa-free-2026');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('data-variant', 'visa');
    expect(screen.getByText(/No embassy queues/i)).toBeInTheDocument();
    expect(screen.getByText(/Visa-free for NZ passport holders until 31 Dec 2026/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Talk to a specialist/i })).toBeInTheDocument();
  });

  it('also matches visa variant case-insensitively (utm_campaign=NZ-Visa-Pain)', async () => {
    setQuery('?utm_source=meta&utm_campaign=NZ-Visa-Pain');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toHaveAttribute('data-variant', 'visa');
  });

  it('CTA links to the hero anchor in both variants', async () => {
    setQuery('?utm_source=google&utm_campaign=visa-free-2026');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('link', { name: /Talk to a specialist/i })).toHaveAttribute(
      'href',
      '#china-tours-hero'
    );
  });

  // ── best_of_china variant (campaign-aware) ──────────────────────────────
  it('swaps to best_of_china copy when utm_campaign matches /best-of-china/', async () => {
    setQuery('?utm_source=google&utm_campaign=best-of-china');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('data-variant', 'best_of_china');
    expect(screen.getByText(/Best of China · 15 days/i)).toBeInTheDocument();
    expect(screen.getByText(/from NZD \$3,880/i)).toBeInTheDocument();
  });

  it('best_of_china CTA points at the campaign LP (not the hero anchor)', async () => {
    setQuery('?utm_source=meta&utm_campaign=best-of-china-oct26');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('link', { name: /See Best of China/i })).toHaveAttribute(
      'href',
      '/campaigns/best-of-china'
    );
  });

  it('best_of_china also matches the underscored form (utm_campaign=best_of_china)', async () => {
    setQuery('?utm_source=meta&utm_campaign=best_of_china');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toHaveAttribute('data-variant', 'best_of_china');
  });

  it('best_of_china wins over visa when both keywords appear (product-specific > generic visa)', async () => {
    // utm_campaign=best-of-china-visa-2026 → product copy, not the visa banner.
    setQuery('?utm_source=google&utm_campaign=best-of-china-visa-2026');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toHaveAttribute('data-variant', 'best_of_china');
  });
});
