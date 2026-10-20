import { ACCENT_CLASSES } from '@/lib/ad-landing/accent';
import type { AccentId } from '@/lib/ad-landing/types';

/** The heading every block starts with: serif title and a short accent rule. */
export default function SectionHeading({ title, accent, id }: { title: string; accent: AccentId; id?: string }) {
  return (
    <div>
      <h2 id={id} className="font-serif text-2xl leading-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>
      <span className={`mt-3 block h-1 w-12 rounded ${ACCENT_CLASSES[accent].rule}`} aria-hidden="true" />
    </div>
  );
}
