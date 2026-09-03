import type { Metadata } from 'next';
import { Suspense } from 'react';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { migratedSite } from '@/lib/site-media';
import TravellerDetailsForm from './TravellerDetailsForm';

export const metadata: Metadata = {
  title: 'Traveller Details Form | CTS Tours',
  description:
    'Complete your traveller details to finalise your CTS Tours China booking — full legal names, dates of birth, dietary and medical notes, and emergency contact.',
  alternates: { canonical: '/traveller-details' },
  robots: { index: false, follow: false },
};

export default function TravellerDetailsPage() {
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
        <TravellerDetailsForm />
      </Suspense>
    </div>
  );
}
