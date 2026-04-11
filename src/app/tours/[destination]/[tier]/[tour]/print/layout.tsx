import type { Metadata } from 'next';

/** Print-friendly itinerary views are utility URLs; keep out of search results (canonical = tour detail). */
export const metadata: Metadata = {
  title: 'Print itinerary | CTS Tours',
  robots: { index: false, follow: true },
};

export default function TourPrintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
