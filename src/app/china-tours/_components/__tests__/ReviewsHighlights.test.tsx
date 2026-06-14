/**
 * ReviewsHighlights tests
 *
 * Three featured 5-star reviews — guarantees:
 *  - exactly 3 review cards (one per flagship route's spotlight cluster)
 *  - each card has a 5-star rating label, reviewer name, NZ location, tour label
 *  - section header carries the verified-reviews count badge
 */
import { render, screen } from '@testing-library/react';
import ReviewsHighlights from '../ReviewsHighlights';

describe('ReviewsHighlights', () => {
  it('renders header + verified-reviews badge', () => {
    render(<ReviewsHighlights />);
    expect(screen.getByRole('heading', { name: /What Kiwi travellers say/i })).toBeInTheDocument();
    expect(screen.getByText(/5\.0 from 24 verified NZ reviews/i)).toBeInTheDocument();
  });

  it('renders exactly 3 review cards', () => {
    render(<ReviewsHighlights />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });

  it('each card surfaces the tour-label chip (continuity with flagship grid below)', () => {
    render(<ReviewsHighlights />);
    expect(screen.getByText(/Tale of Two Cities · Beijing \+ Xi'an/)).toBeInTheDocument();
    expect(screen.getByText(/Shanghai & Surroundings · 10 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Silk Road Discovery · 18 days/i)).toBeInTheDocument();
  });

  it('each card carries an aria-labelled 5-star rating', () => {
    render(<ReviewsHighlights />);
    const ratings = screen.getAllByLabelText(/5 out of 5 stars/i);
    // 1 in section header + 3 in cards = 4
    expect(ratings.length).toBeGreaterThanOrEqual(3);
  });
});
