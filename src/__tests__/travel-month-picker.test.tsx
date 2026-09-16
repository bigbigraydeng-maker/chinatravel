import { render, screen, fireEvent, within } from '@testing-library/react';
import TravelMonthPicker from '@/components/tailor-made/TravelMonthPicker';

describe('TravelMonthPicker', () => {
  test('lets travellers choose a future year directly and returns a month-only value', () => {
    const onChange = jest.fn();
    render(<TravelMonthPicker min="2026-09" value="" onChange={onChange} />);
    const trigger = screen.getByRole('button', {name: 'Choose month and year'});
    fireEvent.click(trigger);
    const popup = screen.getByRole('dialog');
    expect(within(popup).getByRole('button', {name:'Jan'})).toBeDisabled();
    fireEvent.click(within(popup).getByRole('button', {name:/2026/}));
    fireEvent.click(within(popup).getByRole('button', {name:'2028'}));
    fireEvent.click(within(popup).getByRole('button', {name:'Jan'}));
    expect(onChange).toHaveBeenCalledWith('2028-01');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  test('preserves a prefilled selection when dismissed with Escape or outside click', () => {
    const onChange = jest.fn();
    render(<TravelMonthPicker min="2026-09" value="2027-04" onChange={onChange} />);
    const trigger = screen.getByRole('button', {name:'April 2027'});
    fireEvent.click(trigger);
    expect(screen.getByRole('button', {name:'Apr'})).toHaveAttribute('aria-pressed','true');
    fireEvent.keyDown(screen.getByRole('dialog'), {key:'Escape'});
    expect(trigger).toHaveFocus();
    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
