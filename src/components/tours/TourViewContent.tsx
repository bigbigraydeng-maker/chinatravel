import type { Tour } from '@/lib/data/tours';
import { priceNumber } from '@/lib/tour-discovery';
import ViewContentTracker from './ViewContentTracker';

/**
 * Put this block on any page that is about one specific tour (the tour detail
 * page and the ad landing pages) so Meta can build "viewed tour X" audiences.
 *
 * The price parsing lives here, in a server component, so the client bundle
 * never imports tour-discovery.
 */
export default function TourViewContent({
  tour,
}: {
  tour: Pick<Tour, 'slug' | 'price'>;
}) {
  return <ViewContentTracker contentId={tour.slug} value={priceNumber(tour.price)} />;
}
