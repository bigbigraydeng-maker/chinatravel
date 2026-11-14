import type { Metadata } from 'next';
import Link from 'next/link';
import { findOpenLink } from '@/lib/passport/store';
import { isPassportCryptoConfigured } from '@/lib/passport/crypto';
import PassportUploadForm from './PassportUploadForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Upload your passport | CTS Tours',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Personal, expiring, single-use page. The token in the URL is the only key. */
export default async function PassportUploadPage({ params }: { params: { token: string } }) {
  const link = isPassportCryptoConfigured() ? await findOpenLink(params.token).catch(() => null) : null;

  if (!link) {
    return (
      <main className="container mx-auto max-w-xl px-4 py-16">
        <h1 className="font-serif text-3xl font-bold">This link is no longer active</h1>
        <p className="mt-4 text-gray-700">
          Upload links are personal and expire after a short time, or once a passport has been submitted. Please contact your CTS consultant for a new link, or call
          0800 CTS 888.
        </p>
        <Link href="/contact" className="mt-6 inline-block text-primary underline">
          Contact CTS Tours
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold">Upload your passport</h1>
      <p className="mt-3 text-gray-700">
        Hello {link.travellerLabel} — this is for <strong>{link.tourName}</strong>, departing {formatDate(link.departureDate)}. Airlines, hotels and our team in China
        need your details exactly as printed in your passport.
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-gray-600">
        <li>Your photo is encrypted and only CTS staff can see it.</li>
        <li>We read it automatically (including with an AI service that does not use it for training), and a CTS staff member checks the result.</li>
        <li>The photo is deleted 6 months after your tour returns. See our <Link href="/privacy-policy#passport-information" className="text-primary underline">privacy policy</Link>.</li>
      </ul>
      <PassportUploadForm token={params.token} attemptsLeft={link.attemptsLeft} />
    </main>
  );
}
