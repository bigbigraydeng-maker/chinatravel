import { render, screen, fireEvent } from '@testing-library/react';
import MonthPickerWidget from '../MonthPickerWidget';

describe('MonthPickerWidget', () => {
  it('renders heading and placeholder on mount', () => {
    render(<MonthPickerWidget />);
    expect(screen.getByText('When Are You Planning to Travel?')).toBeInTheDocument();
    expect(screen.getByText('Select a month above to see your travel window')).toBeInTheDocument();
  });

  it('renders all 12 month buttons', () => {
    render(<MonthPickerWidget />);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(m => expect(screen.getByText(m)).toBeInTheDocument());
  });

  it('shows detail panel when a month is selected', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Apr'));
    expect(screen.getByRole('heading', { name: /April — Spring/i })).toBeInTheDocument();
    expect(screen.getAllByText(/cherry blossoms/i).length).toBeGreaterThan(0);
  });

  it('shows crowd level indicator', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Apr'));
    expect(screen.getAllByText('Crowd level').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Moderate').length).toBeGreaterThan(0);
  });

  it('shows bestFor tags after selection', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Apr'));
    expect(screen.getByText('All regions')).toBeInTheDocument();
    expect(screen.getByText('Hiking')).toBeInTheDocument();
  });

  it('shows CTA link after selection', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Sep'));
    expect(screen.getByRole('link', { name: /Plan a September trip/i })).toHaveAttribute('href', '/tailor-made');
  });

  it('deselects month when clicked again', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('May'));
    expect(screen.queryByText('Select a month above to see your travel window')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('May'));
    expect(screen.getByText('Select a month above to see your travel window')).toBeInTheDocument();
  });

  it('switches to different month when another is clicked', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Jan'));
    expect(screen.getByText(/January — Winter/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Oct'));
    expect(screen.getByText(/October — Autumn/)).toBeInTheDocument();
    expect(screen.queryByText(/January — Winter/)).not.toBeInTheDocument();
  });

  it('marks October as Very High crowd level', () => {
    render(<MonthPickerWidget />);
    fireEvent.click(screen.getByText('Oct'));
    expect(screen.getByText('Very High')).toBeInTheDocument();
  });

  it('has a section with id month-picker for anchor navigation', () => {
    render(<MonthPickerWidget />);
    expect(document.getElementById('month-picker')).toBeInTheDocument();
  });
});
