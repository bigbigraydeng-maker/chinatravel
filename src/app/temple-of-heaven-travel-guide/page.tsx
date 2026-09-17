import GuidePageShell, { buildGuidePageMetadata } from '@/components/seo/GuidePageShell';

const SLUG = 'temple-of-heaven-travel-guide';
export const metadata = buildGuidePageMetadata(SLUG);

export default function Page() {
  return <GuidePageShell slug={SLUG} />;
}
