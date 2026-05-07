import { render, screen, fireEvent } from '@testing-library/react';
import VisaCheckerWidget from '../VisaCheckerWidget';

describe('VisaCheckerWidget', () => {
  it('renders the passport step on mount', () => {
    render(<VisaCheckerWidget />);
    expect(screen.getByText('Do I Need a Visa for China?')).toBeInTheDocument();
    expect(screen.getByText('What passport do you hold?')).toBeInTheDocument();
    expect(screen.getByText('New Zealand')).toBeInTheDocument();
    expect(screen.getByText('Other country')).toBeInTheDocument();
  });

  it('advances to purpose step after selecting NZ passport', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    expect(screen.getByText('Why are you visiting China?')).toBeInTheDocument();
    expect(screen.getByText('Holiday / Tourism')).toBeInTheDocument();
  });

  it('shows visa-free result for NZ + tourism + under 30 days', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Holiday / Tourism'));
    fireEvent.click(screen.getByText('30 days or less'));
    expect(screen.getByText('You Can Enter Visa-Free!')).toBeInTheDocument();
    expect(screen.getByText('Browse CTS China Tours')).toBeInTheDocument();
  });

  it('shows need-visa result for stay over 30 days', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Holiday / Tourism'));
    fireEvent.click(screen.getByText('More than 30 days'));
    expect(screen.getByText('Visa Required')).toBeInTheDocument();
    expect(screen.getByText(/Visa-free entry is limited to 30 consecutive days/)).toBeInTheDocument();
  });

  it('shows need-visa result immediately for work purpose', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Work / Employment'));
    expect(screen.getByText('Visa Required')).toBeInTheDocument();
    expect(screen.getByText(/Work \(Z-Visa\)/)).toBeInTheDocument();
  });

  it('shows need-visa result immediately for study purpose', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Study / Internship'));
    expect(screen.getByText('Visa Required')).toBeInTheDocument();
    expect(screen.getByText(/Study \(X-Visa\)/)).toBeInTheDocument();
  });

  it('shows check-required result for other passport', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('Other country'));
    fireEvent.click(screen.getByText('Holiday / Tourism'));
    fireEvent.click(screen.getByText('30 days or less'));
    expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
  });

  it('resets back to passport step when Check again is clicked', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Holiday / Tourism'));
    fireEvent.click(screen.getByText('30 days or less'));
    fireEvent.click(screen.getByText('Check again'));
    expect(screen.getByText('What passport do you hold?')).toBeInTheDocument();
  });

  it('allows going back from purpose step', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    expect(screen.getByText('Why are you visiting China?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('← Back'));
    expect(screen.getByText('What passport do you hold?')).toBeInTheDocument();
  });

  it('allows going back from duration step', () => {
    render(<VisaCheckerWidget />);
    fireEvent.click(screen.getByText('New Zealand'));
    fireEvent.click(screen.getByText('Holiday / Tourism'));
    expect(screen.getByText('How long will you stay?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('← Back'));
    expect(screen.getByText('Why are you visiting China?')).toBeInTheDocument();
  });
});
