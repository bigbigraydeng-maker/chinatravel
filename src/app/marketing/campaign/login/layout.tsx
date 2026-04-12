import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing plan login | CTS Tours',
  robots: { index: false, follow: false },
};

export default function MarketingPlanLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
