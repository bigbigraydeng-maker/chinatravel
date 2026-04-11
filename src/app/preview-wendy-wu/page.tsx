import type { Metadata } from 'next';
import HomePageWendyWu from '@/app/page-wendy-wu';

export const metadata: Metadata = {
  title: 'Homepage preview (internal) | CTS Tours',
  description: 'Internal alternate homepage layout preview. Not for public search.',
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <HomePageWendyWu />;
}
