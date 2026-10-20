import { render, screen } from '@testing-library/react';
import type { Tour } from '@/lib/data/tours';
import PriceDepartures from '@/components/ad-landing/PriceDepartures';
import { AdEnquiryProvider } from '@/components/ad-landing/enquiry-launcher';
import { DEPOSIT_TEXT } from '@/lib/ad-landing/facts';

/**
 * The price block shows only departures that have not left yet and that have a published price of their own, never
 * an empty table, and always the deposit terms that the booking terms page states.
 */

function makeTour(overrides: Partial<Tour> = {}): Tour {
  return {
    id: 't1',
    slug: 'test-tour',
    destination: 'china',
    tier: 'discovery',
    name: 'Test Tour',
    title: 'Test Tour',
    shortDescription: 'A test tour.',
    duration: '10 Days',
    price: 'NZD $2,699 per person',
    heroImage: '/hero.jpg',
    gallery: [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    metaTitle: 'Test',
    metaDescription: 'Test',
    isActive: true,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    ...overrides,
  };
}

function renderBlock(tour: Tour, today = '2098-06-01') {
  return render(
    <AdEnquiryProvider tourSlug='test-tour'>
      <PriceDepartures tour={tour} title='Dates, price and booking' accent='teal' today={today} />
    </AdEnquiryProvider>,
  );
}

const DEPARTURES = {
  departureDates: ['5 February 2099', '3 August 2099'],
  departurePricing: {
    '5 February 2099': 'NZD $2,899',
    '3 August 2099': 'NZD $2,699',
  },
};

describe('PriceDepartures', () => {
  it('lists each upcoming departure with its return date and its own price', () => {
    renderBlock(makeTour(DEPARTURES));

    expect(screen.getAllByText('Departs Auckland')).toHaveLength(2);
    expect(screen.getByText('5 February 2099')).toBeInTheDocument();
    expect(screen.getByText('3 August 2099')).toBeInTheDocument();
    expect(screen.getByText('Returns 14 February 2099')).toBeInTheDocument();
    expect(screen.getByText('NZD $2,899')).toBeInTheDocument();
    expect(screen.getByText('NZD $2,699')).toBeInTheDocument();
    expect(screen.getAllByText('per person, twin share')).toHaveLength(2);
  });

  it('never shows a departure without a published price', () => {
    renderBlock(
      makeTour({
        departureDates: ['5 February 2099', '3 August 2099'],
        departurePricing: { '3 August 2099': 'NZD $2,699' },
      }),
    );

    expect(screen.queryByText('5 February 2099')).not.toBeInTheDocument();
    expect(screen.getByText('3 August 2099')).toBeInTheDocument();
  });

  it('drops departures that have already left', () => {
    renderBlock(makeTour(DEPARTURES), '2099-03-01');

    expect(screen.queryByText('5 February 2099')).not.toBeInTheDocument();
    expect(screen.getByText('3 August 2099')).toBeInTheDocument();
  });

  it('asks the visitor to ask when nothing is bookable', () => {
    renderBlock(makeTour());

    expect(screen.getByText('Ask us for the next departure date and price.')).toBeInTheDocument();
    expect(screen.queryByText('Departs Auckland')).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(DEPOSIT_TEXT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check availability' })).toBeInTheDocument();
  });

  it('shows the single supplement with its note when there are departures', () => {
    const { container, rerender } = renderBlock(
      makeTour({
        ...DEPARTURES,
        singleSupplement: 'NZD $400',
        singleSupplementNote: 'Covers hotel nights only.',
      }),
    );

    expect(container.textContent).toContain('Travelling solo?');
    expect(container.textContent).toContain('NZD $400');
    expect(container.textContent).toContain('Covers hotel nights only');

    rerender(
      <AdEnquiryProvider tourSlug='test-tour'>
        <PriceDepartures tour={makeTour(DEPARTURES)} title='Dates, price and booking' accent='teal' today='2098-06-01' />
      </AdEnquiryProvider>,
    );
    expect(container.textContent).not.toContain('Travelling solo?');

    rerender(
      <AdEnquiryProvider tourSlug='test-tour'>
        <PriceDepartures
          tour={makeTour({ singleSupplement: 'NZD $400', singleSupplementNote: 'Covers hotel nights only.' })}
          title='Dates, price and booking'
          accent='teal'
          today='2098-06-01'
        />
      </AdEnquiryProvider>,
    );
    expect(container.textContent).not.toContain('Travelling solo?');
  });

  it('always states the deposit terms and links to the full booking terms', () => {
    const { container } = renderBlock(makeTour());

    expect(container.textContent).toContain(DEPOSIT_TEXT);

    const link = screen.getByRole('link', { name: 'Read the full booking terms' });
    expect(link).toHaveAttribute('href', '/terms-and-conditions');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('offers one button that asks for availability', () => {
    renderBlock(makeTour());

    const button = screen.getByRole('button', { name: 'Check availability' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has the anchor id and heading the page links to', () => {
    const { container } = renderBlock(makeTour());

    expect(container.querySelector('section#price')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Dates, price and booking' })).toBeInTheDocument();
  });
});
