import type { Metadata } from 'next';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { migratedSite } from '@/lib/site-media';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact CTS Tours | New Zealand China Travel Specialists',
  description:
    'Get in touch with CTS Tours. Our New Zealand-based China travel experts are ready to help plan your perfect China trip. Request a personalised quote today.',
};

export default function ContactPage() {
  return (
    <div>
      <ImmersivePageHero
        eyebrow="Contact"
        title="Contact Us"
        subtitle="Get in touch with our China travel specialists"
        imageSrc={migratedSite('shanghai-skyline.jpg')}
        imageAlt="Shanghai skyline — contact CTS Tours New Zealand"
        priority
      />
      <ContactFormClient />
    </div>
  );
}
