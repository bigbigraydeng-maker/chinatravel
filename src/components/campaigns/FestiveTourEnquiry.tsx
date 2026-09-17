'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { getStoredUtmParams } from '@/lib/utils/utm-parser';

const DEPARTURES = {
  auckland: {
    label: 'Auckland',
    tourName: 'China Discovery — Christmas & New Year in China',
    tourSlug: 'china-icons-collection',
    detail: '16 days · NZD $7,188 pp',
  },
  christchurch: {
    label: 'Christchurch',
    tourName: 'China Discovery — Christmas & New Year in China (Christchurch Departure)',
    tourSlug: 'china-icons-collection-christchurch',
    detail: '15 days · NZD $6,188 pp',
  },
} as const;

type DepartureKey = keyof typeof DEPARTURES;

export default function FestiveTourEnquiry() {
  const router = useRouter();
  const [departure, setDeparture] = useState<DepartureKey>('auckland');
  const [form, setForm] = useState({ name: '', email: '', phone: '', travellers: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const selected = DEPARTURES[departure];

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!form.email.trim() && !form.phone.trim()) {
      setError('Please leave a phone number or an email so we can get back to you.');
      return;
    }

    setSubmitting(true);
    const utm = getStoredUtmParams();
    const context = [
      `Preferred departure: ${selected.label} — 22 December 2026`,
      form.travellers ? `Travellers: ${form.travellers}` : '',
      form.message.trim(),
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch('/api/tour-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourName: selected.tourName,
          tourSlug: selected.tourSlug,
          destination: 'china',
          tier: 'discovery',
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: context,
          source: 'Christmas & New Year China Landing Page',
          utm,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.');

      triggerGtmEvent({
        event: 'tour_enquiry_submit',
        form_type: 'festive_tour_enquiry',
        tour_name: selected.tourName,
        tour_slug: selected.tourSlug,
        pagePath: window.location.pathname,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        timestamp: Date.now(),
      });

      const query = new URLSearchParams({
        tour: selected.tourName,
        slug: selected.tourSlug,
        destination: 'china',
        tier: 'discovery',
      });
      router.push(`/thank-you?${query.toString()}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong. Please try again or call 0800 CTS 888.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">No obligation · reply within one working day</p>
        <h3 className="mt-2 font-serif text-3xl">Check availability</h3>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Where would you like to depart from?</legend>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(DEPARTURES) as [DepartureKey, (typeof DEPARTURES)[DepartureKey]][]).map(([key, option]) => (
            <button
              key={key}
              type="button"
              onClick={() => setDeparture(key)}
              aria-pressed={departure === key}
              className={`rounded-2xl border px-3 py-3 text-left transition-colors ${
                departure === key ? 'border-primary bg-primary/5 text-primary' : 'border-warm-200 bg-warm-50 hover:border-primary/40'
              }`}
            >
              <span className="block font-bold">{option.label}</span>
              <span className="mt-1 block text-xs text-ink-muted">{option.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="festive-name" className="mb-1 block text-sm font-semibold">Full name *</label>
          <input
            id="festive-name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="festive-travellers" className="mb-1 block text-sm font-semibold">Travellers</label>
          <select
            id="festive-travellers"
            name="travellers"
            value={form.travellers}
            onChange={handleChange}
            className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3–4">3–4 people</option>
            <option value="5+">5 or more</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="festive-email" className="mb-1 block text-sm font-semibold">Email</label>
          <input
            id="festive-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="festive-phone" className="mb-1 block text-sm font-semibold">Phone</label>
          <input
            id="festive-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="+64"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-ink-muted">Leave either a phone number or an email.</p>

      <div className="mt-4">
        <label htmlFor="festive-message" className="mb-1 block text-sm font-semibold">Anything you would like us to know?</label>
        <textarea
          id="festive-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          className="w-full resize-none rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Room preference, mobility, dietary requirements or questions..."
        />
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 font-bold uppercase tracking-[0.08em] text-white shadow-lg transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Sending…' : `Ask about ${selected.label} availability →`}
      </button>
      <p className="mt-3 text-center text-xs text-ink-muted">Your details stay with CTS Tours. No mailing list sign-up.</p>
    </form>
  );
}
