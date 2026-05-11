import type { Metadata } from 'next';
import Link from 'next/link';
import TripPlanner from '@/components/tools/TripPlanner';

export const metadata: Metadata = {
  title: 'China Trip Planner — Find Your Perfect Tour | CTS Tours NZ',
  description:
    'Answer four quick questions about your duration, interests, budget, and season. Our Trip Planner matches you with the best China tours, travel guides, and blog articles for your style.',
  alternates: {
    canonical: 'https://www.ctstours.co.nz/tools/trip-planner',
  },
  openGraph: {
    title: 'China Trip Planner | CTS Tours NZ',
    description:
      'Personalised China tour recommendations based on your travel preferences — free and instant.',
    url: 'https://www.ctstours.co.nz/tools/trip-planner',
    type: 'website',
  },
};

export default function TripPlannerPage() {
  return (
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-4 pt-6 text-sm text-gray-500">
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
            Trip Planner
          </li>
        </ol>
      </nav>

      <TripPlanner />
    </main>
  );
}
