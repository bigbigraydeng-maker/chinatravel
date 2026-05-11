import type { Metadata } from 'next';
import Link from 'next/link';
import CostCalculator from '@/components/tools/CostCalculator';

export const metadata: Metadata = {
  title: 'China Trip Budget Calculator — Estimate Your Costs | CTS Tours NZ',
  description:
    'Estimate the total cost of your China holiday from New Zealand — flights from Auckland, tour fee by tier, and optional extras. Seasonal pricing included. Free and instant.',
  alternates: {
    canonical: 'https://www.ctstours.co.nz/tools/cost-calculator',
  },
  openGraph: {
    title: 'China Trip Budget Calculator | CTS Tours NZ',
    description:
      'Instant budget estimate for your China trip — flights, tour costs, and add-ons broken down clearly.',
    url: 'https://www.ctstours.co.nz/tools/cost-calculator',
    type: 'website',
  },
};

export default function CostCalculatorPage() {
  return (
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-6 text-sm text-gray-500">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li>
            <Link href="/tools" className="hover:text-primary hover:underline">
              Planning tools
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li aria-current="page" className="text-accent font-medium">
            Budget Calculator
          </li>
        </ol>
      </nav>

      <CostCalculator />
    </main>
  );
}
