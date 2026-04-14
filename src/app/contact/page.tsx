import ImmersivePageHero from '@/components/ImmersivePageHero';
import { migratedSite } from '@/lib/site-media';
import ContactFormClient from './ContactFormClient';

export default function ContactPage() {
  return (
    <div>
      <ImmersivePageHero
        eyebrow="Contact"
        chineseAccent="随时启程 · 我们在此"
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
