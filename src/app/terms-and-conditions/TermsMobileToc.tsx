'use client';

const options: { id: string; label: string }[] = [
  { id: 'reservation-deposit', label: 'Reservation & Deposit' },
  { id: 'receipt-booking', label: 'Receipt of Booking Form & Deposit' },
  { id: 'finalisation-passport', label: 'Booking Finalisation & Passport' },
  { id: 'balance-payment', label: 'Balance of Payment' },
  { id: 'late-booking', label: 'Late Booking Fees' },
  { id: 'late-payment', label: 'Late Payment Fees' },
  { id: 'amendment-fees', label: 'Amendment & Administration' },
  { id: 'cancellation-customer', label: 'Cancellation by Customer' },
  { id: 'cancellation-cts', label: 'Cancellation by CTS Tours' },
  { id: 'fees-charges', label: 'Fees & Charges' },
  { id: 'invoicing', label: 'Invoicing Errors' },
  { id: 'agents', label: 'Agent Responsibilities' },
  { id: 'visa', label: 'Visa Requirements' },
  { id: 'insurance', label: 'Travel Insurance' },
  { id: 'health', label: 'Health Requirements' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'airlines', label: 'Airlines' },
  { id: 'transfers', label: 'Transfers' },
  { id: 'cruise', label: 'Cruise Packages' },
  { id: 'baggage', label: 'Baggage' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'tipping', label: 'Tipping' },
  { id: 'smoking', label: 'Smoking' },
  { id: 'minors', label: 'Travel With Minors' },
  { id: 'single', label: 'Single Travellers' },
  { id: 'triple', label: 'Triple Share' },
  { id: 'special-assistance', label: 'Special Assistance' },
  { id: 'special-requests', label: 'Special Requests' },
  { id: 'breakaway', label: 'Breakaway Policy' },
  { id: 'responsibility', label: 'Responsibility' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'cga', label: 'Consumer Guarantees Act' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'refusal-carriage', label: 'Refusal of Carriage' },
  { id: 'refusal-service', label: 'Refusal of Service' },
  { id: 'hotel-media', label: 'Hotel Descriptions & Media' },
  { id: 'travel-docs', label: 'Travel Documentation' },
  { id: 'complaints', label: 'Complaints & Claims' },
  { id: 'lost-property', label: 'Lost Property' },
  { id: 'testimonials', label: 'Testimonials' },
];

export function TermsMobileToc() {
  return (
    <div className="mb-8 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 lg:hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Jump to section</p>
      <label htmlFor="terms-toc-select" className="sr-only">
        Select a section
      </label>
      <select
        id="terms-toc-select"
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        defaultValue=""
        onChange={(e) => {
          const id = e.target.value;
          if (id) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            e.target.value = '';
          }
        }}
      >
        <option value="">Choose a section…</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
