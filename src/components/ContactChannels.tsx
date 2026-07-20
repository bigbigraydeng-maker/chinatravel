import { Icon } from '@/components/ui/Icon';

/**
 * Enquiry contact channels — WhatsApp / Email / Phone.
 *
 * Per the redesign decision, CTS is enquiry-led: every "get in touch" surface
 * offers the same three channels. Reused in the specialist block and the CTA
 * band on the redesigned homepage.
 */

export const CTS_PHONE_DISPLAY = '0800 287 888';
export const CTS_PHONE_HREF = 'tel:0800287888';
export const CTS_EMAIL = 'info@ctstours.co.nz';
// TODO: current WhatsApp number pending from client.
// The old page number +64 277520888 is RETIRED (departed employee) — do not use.
// Set to digits only in international format, e.g. '64211234567'.
export const CTS_WHATSAPP = '';

const waHref = CTS_WHATSAPP ? `https://wa.me/${CTS_WHATSAPP}` : '/contact';

interface Props {
  tone?: 'light' | 'dark';
  className?: string;
}

export default function ContactChannels({ tone = 'light', className = '' }: Props) {
  const btn =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5';
  const outline =
    tone === 'dark'
      ? 'border border-white/30 text-white hover:bg-white/10'
      : 'border border-warm-200 text-ink hover:border-primary hover:text-primary';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {CTS_WHATSAPP ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-[#25D366] text-white shadow-md hover:brightness-105`}
        >
          <Icon name="message" className="h-4 w-4" /> WhatsApp
        </a>
      ) : (
        <span
          aria-disabled="true"
          title="WhatsApp coming soon"
          className={`${btn} cursor-not-allowed border border-dashed hover:translate-y-0 ${
            tone === 'dark' ? 'border-white/30 text-white/55' : 'border-warm-200 text-ink-muted'
          }`}
        >
          <Icon name="message" className="h-4 w-4" /> WhatsApp · Coming soon
        </span>
      )}
      <a href={`mailto:${CTS_EMAIL}`} className={`${btn} ${outline}`}>
        <Icon name="mail" className="h-4 w-4" /> Email us
      </a>
      <a href={CTS_PHONE_HREF} className={`${btn} ${outline}`}>
        <Icon name="phone" className="h-4 w-4" /> {CTS_PHONE_DISPLAY}
      </a>
    </div>
  );
}
