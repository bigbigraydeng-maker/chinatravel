import { EYEBROW, H2_BAND } from '@/lib/ui/typography';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  center?: boolean;
}

/**
 * Phase A W2: adopts the shared Ceepii heading scale.
 *
 * Removed two flourishes rather than restyling them — the dashes flanking the
 * eyebrow, and the gradient dash rule under the title. Ceepii's section
 * headings carry no ornament; the weight change and the spacing do the work.
 * Both were purely decorative, so nothing depends on them.
 *
 * The `center` and `subtitle` props keep their existing behaviour, so the 11
 * call sites need no changes.
 */
const SectionTitle = ({ subtitle, title, center = false }: SectionTitleProps) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      {subtitle && (
        <p className={`${EYEBROW} mb-3 text-primary`}>{subtitle}</p>
      )}
      <h2
        className={`${H2_BAND} text-3xl sm:text-4xl md:text-5xl text-accent leading-tight`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
