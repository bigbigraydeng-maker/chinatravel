import { CTS_PHONE_HREF } from '@/lib/site';

/**
 * The only footer an ad landing page has. The contact details and the trust line are the site footer's own words
 * (src/components/Footer.tsx); the bottom padding on phones keeps the fixed enquiry bar from covering the last lines.
 */
export default function AdFooter() {
  return (
    <footer className="border-t border-warm-200 bg-white pb-36 lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-relaxed text-gray-600">
        <p className="font-semibold text-gray-900">CTS Tours</p>
        <p className="mt-1">175 Queen St, Auckland</p>
        <p>
          <a href={CTS_PHONE_HREF} className="underline">
            0800 CTS 888
          </a>
          {' · '}
          <a href="mailto:info@ctstours.co.nz" className="underline">
            info@ctstours.co.nz
          </a>
        </p>
        <p className="mt-3">Client funds held in a TAANZ-bonded trust account.</p>
        <p className="mt-3">
          <a href="/terms-and-conditions" className="underline">
            Terms &amp; Conditions
          </a>
          {' · '}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
        </p>
        <p className="mt-3">&copy; {new Date().getFullYear()} CTS Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}
