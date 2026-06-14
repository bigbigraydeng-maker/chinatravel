/**
 * UtmAwareBanner tests
 *
 * - hides when no utm_source on URL
 * - shows for utm_source=meta / facebook / instagram / google (Meta + Google Ads)
 * - hides for utm_source values outside the allow-list
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

  it('renders for utm_source=meta', async () => {
    setQuery('?utm_source=meta&utm_campaign=cts-china-oct26');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region', { name: /campaign welcome message/i })).toBeInTheDocument();
    expect(screen.getByText(/Welcome from our China campaign/i)).toBeInTheDocument();
  });

  it('renders for utm_source=facebook / instagram (Meta synonyms)', async () => {
    setQuery('?utm_source=facebook');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders for utm_source=google (Google Ads)', async () => {
    setQuery('?utm_source=google');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('hides when utm_source is outside the allow-list (e.g. newsletter)', async () => {
    setQuery('?utm_source=newsletter');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    expect(screen.queryByRole('region')).toBeNull();
  });

  it('CTA links to the hero anchor', async () => {
    setQuery('?utm_source=meta');
    await act(async () => {
      render(<UtmAwareBanner />);
    });
    const cta = screen.getByRole('link', { name: /Request a callback/i });
    expect(cta).toHaveAttribute('href', '#china-tours-hero');
  });
});
