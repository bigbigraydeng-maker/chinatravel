import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CostCalculator from '../CostCalculator';

describe('CostCalculator component', () => {
  it('renders heading', () => {
    render(<CostCalculator />);
    expect(screen.getByRole('heading', { name: /Estimate your China trip cost/i })).toBeInTheDocument();
  });

  it('shows group step by default', () => {
    render(<CostCalculator />);
    expect(screen.getByText(/How many travellers/i)).toBeInTheDocument();
  });

  it('renders progress steps', () => {
    render(<CostCalculator />);
    expect(screen.getByRole('button', { name: 'Group' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tour' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Extras' })).toBeInTheDocument();
  });

  it('Back button disabled on step 1', () => {
    render(<CostCalculator />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  });

  it('default group size is 2', () => {
    render(<CostCalculator />);
    expect(screen.getByRole('status', { hidden: true })).toHaveTextContent('2');
  });

  it('increases group size when + clicked', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Increase group size' }));
    expect(screen.getByRole('status', { hidden: true })).toHaveTextContent('3');
  });

  it('decreases group size when − clicked', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Increase group size' }));
    await user.click(screen.getByRole('button', { name: 'Decrease group size' }));
    expect(screen.getByRole('status', { hidden: true })).toHaveTextContent('2');
  });

  it('does not go below 1 traveller', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    // default is 2 → click decrease → reaches minimum 1
    await user.click(screen.getByRole('button', { name: 'Decrease group size' }));
    expect(screen.getByRole('status')).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: 'Decrease group size' })).toBeDisabled();
  });

  it('advances to step 2 (tour selection) on Next', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Which tour style/i)).toBeInTheDocument();
  });

  it('shows three tier options on step 2', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('radio', { name: /Stopover/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Discovery/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Signature/i })).toBeInTheDocument();
  });

  it('shows month selector on step 2', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('combobox', { name: /Travel month/i })).toBeInTheDocument();
  });

  it('advances to step 3 (extras) from step 2', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('group', { name: /Optional extras/i })).toBeInTheDocument();
  });

  it('shows three add-on checkboxes on step 3', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('checkbox', { name: /Travel insurance/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Single room supplement/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Private airport transfers/i })).toBeInTheDocument();
  });

  it('shows "See estimate" button on step 3', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'See estimate' })).toBeInTheDocument();
  });

  it('shows estimate results after completing all steps', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    expect(screen.getByRole('heading', { name: /Your indicative estimate/i })).toBeInTheDocument();
  });

  it('shows total group cost in results', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    expect(screen.getByLabelText('Total group cost')).toBeInTheDocument();
  });

  it('results include "Get a personalised quote" link to /contact', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    expect(screen.getByRole('link', { name: /Get a personalised quote/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('Recalculate button resets to step 1', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    await user.click(screen.getByRole('button', { name: 'Recalculate' }));
    expect(screen.getByText(/How many travellers/i)).toBeInTheDocument();
  });

  it('results show cost breakdown bars', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    expect(screen.getByText(/Flights \(AKL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tour fee/i).length).toBeGreaterThanOrEqual(1);
  });

  it('shows season hint on step 2', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Spring/i)).toBeInTheDocument();
  });

  it('results table shows per person and group columns', async () => {
    const user = userEvent.setup();
    render(<CostCalculator />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'See estimate' }));
    const table = screen.getByRole('table', { name: /Itemised costs/i });
    expect(within(table).getByText(/Per person/i)).toBeInTheDocument();
  });
});
