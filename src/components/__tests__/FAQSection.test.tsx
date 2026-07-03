/**
 * FAQSection — subtitle + contactHref overrides.
 *
 * The blog post page reuses FAQSection but points its contact CTA at
 * /contact (not the tour LP-only `#enquiry` anchor). Both overrides are
 * optional and default to CTS's tour-LP-facing copy, so tour LP callers
 * unaffected. Pin the contract here.
 */
import { render, screen } from '@testing-library/react';
import FAQSection from '../FAQSection';

const sampleFaqs = [
  { question: 'Sample question one?', answer: 'Sample answer one.' },
  { question: 'Sample question two?', answer: 'Sample answer two.' },
];

describe('FAQSection prop overrides', () => {
  it('renders default subtitle + #enquiry contact href when no overrides passed', () => {
    render(<FAQSection faqs={sampleFaqs} />);
    expect(
      screen.getByText(/Everything you need to know about traveling to China with CTS/i),
    ).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: /Contact Our Specialists/i });
    expect(cta).toHaveAttribute('href', '#enquiry');
  });

  it('honours subtitle override', () => {
    render(
      <FAQSection
        faqs={sampleFaqs}
        subtitle='Frequently asked about "China Visa-Free 2026"'
      />,
    );
    expect(
      screen.getByText(/Frequently asked about "China Visa-Free 2026"/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Everything you need to know about traveling to China with CTS/i),
    ).not.toBeInTheDocument();
  });

  it('honours contactHref override — blog pages point at /contact', () => {
    render(<FAQSection faqs={sampleFaqs} contactHref='/contact' />);
    const cta = screen.getByRole('link', { name: /Contact Our Specialists/i });
    expect(cta).toHaveAttribute('href', '/contact');
  });
});
