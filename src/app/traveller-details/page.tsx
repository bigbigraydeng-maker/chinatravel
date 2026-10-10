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

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildTourOptions(): TourOption[] {
  const today = new Date();
  return getAllActiveTours()
    .map((tour) => {
      const name = tour.title || tour.name;
      const group = `${capitalise(tour.destination)} ${capitalise(tour.tier)}`;
      return {
        key: `${tour.destination}/${tour.tier}/${tour.slug}`,
        group,
        shortName: name.startsWith(`${group} — `) ? name.slice(group.length + 3) : name,
        name,
        dates: upcomingDates(tour.departureDates, today),
        singleSupplement: tour.singleSupplement,
        singleSupplementNote: tour.singleSupplementNote,
      };
    })
    .sort((a, b) => a.group.localeCompare(b.group) || a.shortName.localeCompare(b.shortName));
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
