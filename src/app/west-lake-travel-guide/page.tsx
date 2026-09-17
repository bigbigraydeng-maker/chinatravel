import GuidePageShell, { buildGuidePageMetadata } from '@/components/seo/GuidePageShell';

const SLUG = 'west-lake-travel-guide';
export const metadata = buildGuidePageMetadata(SLUG);

export default function Page() {
  return <GuidePageShell slug={SLUG} />;
}
