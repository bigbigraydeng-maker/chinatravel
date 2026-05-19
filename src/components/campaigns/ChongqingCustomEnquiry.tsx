'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChongqingCustomEnquiry() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    duration: '',
    travellers: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/tailor-made-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: 'New Zealand',
          destinations: ['Chongqing'],
          travelDate: form.travelDate,
          duration: form.duration,
          travellers: form.travellers,
          message: form.message,
          source: 'Landing Page — Chongqing Custom Itinerary',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      router.push('/enquiry-thank-you?source=chongqing-custom');
    } catch {
      setError('Connection error. Please try again or call 0800 CTS 888.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cq-name" className="block text-sm font-medium text-gray-700 mb-1">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="cq-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label htmlFor="cq-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="cq-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cq-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            id="cq-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+64 21 000 000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label htmlFor="cq-travellers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of travellers
          </label>
          <select
            id="cq-travellers"
            name="travellers"
            value={form.travellers}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select</option>
            <option value="1">Solo</option>
            <option value="2">2 people</option>
            <option value="3–4">3–4 people</option>
            <option value="5+">5 or more</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cq-date" className="block text-sm font-medium text-gray-700 mb-1">
            When do you want to travel?
          </label>
          <input
            id="cq-date"
            name="travelDate"
            type="text"
            value={form.travelDate}
            onChange={handleChange}
            placeholder="e.g. Jan 2026 or New Year"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label htmlFor="cq-duration" className="block text-sm font-medium text-gray-700 mb-1">
            Trip duration
          </label>
          <select
            id="cq-duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select</option>
            <option value="7–9 days">7–9 days</option>
            <option value="10–12 days">10–12 days</option>
            <option value="13–16 days">13–16 days</option>
            <option value="17+ days">17+ days</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cq-message" className="block text-sm font-medium text-gray-700 mb-1">
          Tell us about your trip idea
        </label>
        <textarea
          id="cq-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="e.g. We'd like 3 days in Chongqing and 4 days in Beijing. We're interested in food, culture, and the night skyline. Happy to add Shanghai if time allows."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Send My Enquiry →'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We reply within 1 business day. No obligation.
      </p>
    </form>
  );
}
