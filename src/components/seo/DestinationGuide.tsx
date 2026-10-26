import type { DestinationGuide as DestinationGuideType } from '@/lib/data/guides';
import { getPublishedTours } from '@/lib/data/published-tour-catalog';
import DestinationGuideClient from './DestinationGuideClient';

/** Server boundary that hydrates every guide's related product cards from ME. */
export default async function DestinationGuide({ guide }: { guide: DestinationGuideType }) {
  const managedTours = await getPublishedTours();
  return <DestinationGuideClient guide={guide} managedTours={managedTours} />;
}
