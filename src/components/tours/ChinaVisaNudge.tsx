import Link from 'next/link';

/**
 * Compact NZ-facing note on visa-free policy + link to full guide.
 * Shown on October campaign core Discovery tour pages only.
 */
export default function ChinaVisaNudge() {
  return (
    <div id="visa-nudge" className="scroll-mt-24 border-b border-secondary/30 bg-secondary/10">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-accent md:text-base">
          <span className="font-semibold text-primary">Visa-free China for NZ travellers</span>
          {' — '}
          NZ passport holders can enter China visa-free for up to 30 days for tourism, business &amp; family visits.
          Multiple entries allowed, no entry limit. Valid until 31 Dec 2026 (confirmed by China MFA, May 2026).
          {' '}
          <Link href="/china-visa-guide-for-new-zealanders" className="font-semibold text-primary underline-offset-2 hover:underline">
            Full guide →
          </Link>
        </p>
      </div>
    </div>
  );
}
