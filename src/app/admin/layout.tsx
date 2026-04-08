import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · CTS Tours',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-warm-50 text-warm-900">{children}</div>;
}
