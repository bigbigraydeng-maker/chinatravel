import type { Metadata } from 'next';
import HomePageRedesign from '@/app/page-redesign';

export const metadata: Metadata = {
  title: 'Homepage redesign preview (internal) | CTS Tours',
  description: 'Internal preview of the redesigned homepage. Not for public search.',
  robots: { index: false, follow: false },
};

/**
 * Internal preview of the full redesigned homepage.
 * The live homepage (/) is intentionally untouched — swap only on instruction.
 */
export default function PreviewHomePage() {
  return <HomePageRedesign />;
}
