import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | CTS Tours NZ',
  description:
    'How CTS Tours New Zealand collects, uses, stores, and protects your personal information. Compliant with the NZ Privacy Act 2020.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

const sections: { id: string; heading: string; body: React.ReactNode }[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>
          CTS Tours New Zealand (&ldquo;CTS Tours&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) is committed to protecting the personal information of our customers,
          enquirers, and website visitors. This Privacy Policy explains what information we collect,
          how we use it, who we share it with, how long we keep it, and your rights in relation to
          it.
        </p>
        <p>
          We comply with the New Zealand Privacy Act 2020 and the thirteen Information Privacy
          Principles. Where you interact with us via Meta platforms (Facebook, Instagram), our
          handling of your information is additionally governed by Meta&apos;s policies.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    heading: 'Information we collect',
    body: (
      <>
        <p>We collect personal information that you provide to us directly, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Your name, email address, and phone number</li>
          <li>Your travel preferences and itinerary requirements</li>
          <li>Passport details (only when booking a tour)</li>
          <li>Emergency contact details (only when booking a tour)</li>
          <li>Payment information (processed by our payment provider, not stored by us)</li>
          <li>Any correspondence you send us</li>
        </ul>
        <p>
          We also automatically collect limited information when you visit our website, including
          your IP address, browser type, pages viewed, and referrer URL. See &ldquo;Cookies and
          tracking technologies&rdquo; below.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-collect',
    heading: 'How we collect your information',
    body: (
      <>
        <p>We collect information from the following sources:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Directly from you via website forms, email, phone, or in person</li>
          <li>
            From Meta (Facebook / Instagram) when you submit a lead form, click an advertisement,
            or message our Facebook Page
          </li>
          <li>From third-party booking platforms when you book through them</li>
          <li>From our payment provider when you complete a booking</li>
        </ul>
        <p>
          When you submit a lead form through a Meta advertisement, Meta shares the information you
          provided (name, email, phone, and any custom fields you completed) directly with CTS
          Tours. Meta acts as the form host; CTS Tours becomes the data controller for that
          information from the point of submission.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    heading: 'How we use your information',
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Send you the personalised China itinerary or travel information you requested</li>
          <li>Respond to your enquiries and provide quotes</li>
          <li>Process your booking and arrange your travel</li>
          <li>Send you booking confirmations, updates, and travel documents</li>
          <li>Improve our website, services, and tour offerings</li>
          <li>
            With your separate consent, send you marketing communications about future tours and
            departures
          </li>
          <li>Comply with our legal obligations</li>
        </ul>
        <p>
          You may opt out of marketing communications at any time by clicking &ldquo;unsubscribe&rdquo;
          in any email, replying &ldquo;STOP&rdquo; to any SMS, or contacting us directly.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    heading: 'Who we share your information with',
    body: (
      <>
        <p>
          We do not sell or rent your personal information to third parties. We share it only with
          parties that need it to deliver the service you have asked for, or where required by law:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Our China Travel Service operating partners in China who arrange your in-country tours,
            transfers, and accommodation
          </li>
          <li>Airlines, hotels, and other travel suppliers required to fulfil your booking</li>
          <li>Our payment provider for processing payments</li>
          <li>Our website hosting and email service providers under strict confidentiality</li>
          <li>Government authorities where legally required (e.g. for visa or border processes)</li>
        </ul>
        <p>
          Some of these recipients may be located outside New Zealand. When we transfer information
          overseas, we take reasonable steps to ensure the recipient is bound by comparable privacy
          protections.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    heading: 'Cookies and tracking technologies',
    body: (
      <>
        <p>
          Our website uses cookies and similar tracking technologies to remember your preferences,
          measure site performance, and improve your experience.
        </p>
        <p>We use the following tracking tools:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Google Analytics 4</strong> &mdash; aggregated traffic and behaviour analytics
          </li>
          <li>
            <strong>Google Ads conversion tag</strong> &mdash; to measure the effectiveness of our
            search advertising
          </li>
          <li>
            <strong>Meta Pixel</strong> &mdash; to measure the effectiveness of our advertising on
            Facebook and Instagram and to show relevant ads
          </li>
        </ul>
        <p>
          You can control or block cookies through your browser settings. Blocking cookies may
          limit some site functionality.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    heading: 'How long we keep your information',
    body: (
      <>
        <p>
          We retain your personal information only for as long as needed to provide our services
          and meet our legal obligations:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Enquiry information: up to 24 months from your last contact, after which we delete or
            anonymise it
          </li>
          <li>
            Booking and travel records: up to 7 years to meet tax, accounting, and insurance
            requirements
          </li>
          <li>
            Marketing subscribers: until you unsubscribe, after which we retain only minimal data
            to honour your opt-out
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: (
      <>
        <p>Under the NZ Privacy Act 2020, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ask what personal information we hold about you</li>
          <li>Request a copy of that information</li>
          <li>Ask us to correct information that is wrong or out of date</li>
          <li>
            Ask us to delete your information (where we are not legally required to retain it)
          </li>
          <li>Withdraw your consent to marketing communications</li>
          <li>
            Make a complaint to the New Zealand Privacy Commissioner if you are not satisfied with
            our response (
            <a
              href="https://www.privacy.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              privacy.org.nz
            </a>
            )
          </li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details below.</p>
      </>
    ),
  },
  {
    id: 'security',
    heading: 'Security',
    body: (
      <>
        <p>
          We take reasonable steps to protect your information from loss, misuse, and unauthorised
          access, including encrypted connections (HTTPS), access controls, and supplier due
          diligence. No system is completely secure, however, and we cannot guarantee absolute
          security of information transmitted over the internet.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    heading: 'Children',
    body: (
      <>
        <p>
          Our services are intended for adults aged 18 and over. We do not knowingly collect
          personal information from children. If you believe we have inadvertently collected
          information from a child, please contact us so we can delete it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices
          or applicable law. The &ldquo;Last updated&rdquo; date at the top of this page indicates
          when it was last revised. Material changes will be highlighted on this page or notified
          to you by email where appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: 'How to contact us',
    body: (
      <>
        <p>If you have any questions, requests, or complaints about your privacy, please contact:</p>
        <p className="leading-relaxed">
          <strong>CTS Tours New Zealand</strong>
          <br />
          Email:{' '}
          <a href="mailto:info@ctstours.co.nz" className="text-primary underline">
            info@ctstours.co.nz
          </a>
          <br />
          Web:{' '}
          <Link href="/contact" className="text-primary underline">
            ctstours.co.nz/contact
          </Link>
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Privacy Policy</h1>
            <p className="text-gray-500">Last updated: 14 June 2026</p>
          </header>

          <nav aria-label="Table of contents" className="mb-12 p-6 bg-light rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Contents</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary hover:underline">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose prose-lg max-w-none space-y-10">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-serif font-bold mb-4">
                  {index + 1}. {section.heading}
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-4">{section.body}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
