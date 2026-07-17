import type { Metadata } from 'next';
import HeroCinematic from '@/components/HeroCinematic';
import TrustBar from '@/components/TrustBar';

export const metadata: Metadata = {
  title: 'Cinematic hero preview (internal) | CTS Tours',
  description: 'Internal cinematic homepage hero preview. Not for public search.',
  robots: { index: false, follow: false },
};

/**
 * Internal preview of the redesigned cinematic hero.
 *
 * The live homepage (/) is intentionally untouched — this route exists so the
 * new hero can be reviewed on real infrastructure before any swap. TrustBar is
 * rendered underneath purely to show the hero in context.
 */
export default function PreviewHeroPage() {
  return (
    <>
      <HeroCinematic />
      <TrustBar />
    </>
  );
}
