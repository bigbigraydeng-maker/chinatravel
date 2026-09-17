import GuidePageShell, { buildGuidePageMetadata } from '@/components/seo/GuidePageShell';

const SLUG = 'xian-city-wall-travel-guide';
export const metadata = buildGuidePageMetadata(SLUG);

export default function Page() {
  return <GuidePageShell slug={SLUG} />;
}
