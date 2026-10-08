import type { Metadata } from 'next';
import { Suspense } from 'react';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { migratedSite } from '@/lib/site-media';
import { getAllActiveTours } from '@/lib/data/tours';
import { upcomingDates, type TourOption } from '@/lib/traveller-form';
import TravellerDetailsForm from './TravellerDetailsForm';

// Personalised booking form (reads URL params, not indexed). Render per request
// so content changes ship immediately instead of being pinned by the 1-year
// static cache Next.js applies to fully static routes.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Traveller Details Form | CTS Tours',
  description:
    'Complete your traveller details to finalise your CTS Tours China booking — full legal names, dates of birth, dietary and medical notes, and emergency contact.',
  alternates: { canonical: '/traveller-details' },
  robots: { index: false, follow: false },
};

function buildTourOptions(): TourOption[] {
  const today = new Date();
  return getAllActiveTours()
    .map((tour) => ({ key: `${tour.destination}/${tour.tier}/${tour.slug}`, name: tour.title || tour.name, dates: upcomingDates(tour.departureDates, today) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function TravellerDetailsPage() {
  const tourOptions = buildTourOptions();
  return (
    <div>
      <ImmersivePageHero
        eyebrow="Your Booking"
        title="Traveller Details"
        subtitle="A few details to finalise your China trip"
        imageSrc={migratedSite('shanghai-skyline.jpg')}
        imageAlt="Shanghai skyline — CTS Tours traveller details"
        priority
      />
      <Suspense fallback={null}>
        <TravellerDetailsForm tourOptions={tourOptions} />
      </Suspense>
    </div>
  );
}
