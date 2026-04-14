'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TAILOR_MADE_DURATION_VALUES, type TailorMadeDurationValue } from '@/lib/tailor-made-enquiry-params';

function monthOptions(count = 18): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [{ value: '', label: 'Any month' }];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' });
    out.push({ value, label });
  }
  return out;
}

const durationLabels: Record<TailorMadeDurationValue, string> = {
  '3-5 days': '3–5 days',
  '1 week': 'About 1 week',
  '10-14 days': '10–14 days',
  '2-3 weeks': '2–3 weeks',
  '3+ weeks': '3+ weeks',
  Flexible: 'Flexible / not sure',
};

export default function TailorMadeQuickPlan() {
  const router = useRouter();
  const months = useMemo(() => monthOptions(18), []);
  const [month, setMonth] = useState('');
  const [duration, setDuration] = useState<TailorMadeDurationValue | ''>('');
  const [pax, setPax] = useState(2);

  const applyToEnquiry = () => {
    const q = new URLSearchParams();
    if (month) q.set('month', month);
    if (duration) q.set('duration', duration);
    if (pax >= 1) q.set('pax', String(pax));
    const qs = q.toString();
    router.push(qs ? `/tailor-made?${qs}#enquiry-form` : '/tailor-made#enquiry-form', { scroll: false });
    requestAnimationFrame(() => {
      document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto text-left">
      <p className="text-center text-white/70 text-sm mb-3">Plan your trip — we&apos;ll pre-fill the enquiry below (indicative only, not a live quote).</p>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="tm-qp-month" className="block text-xs font-semibold uppercase tracking-wide text-white/80 mb-1.5">
              Travel month
            </label>
            <select
              id="tm-qp-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 border border-white/30 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {months.map((m) => (
                <option key={m.value || 'any'} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tm-qp-duration" className="block text-xs font-semibold uppercase tracking-wide text-white/80 mb-1.5">
              Trip length
            </label>
            <select
              id="tm-qp-duration"
              value={duration}
              onChange={(e) => setDuration((e.target.value as TailorMadeDurationValue) || '')}
              className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 border border-white/30 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              <option value="">Any duration</option>
              {TAILOR_MADE_DURATION_VALUES.map((v) => (
                <option key={v} value={v}>
                  {durationLabels[v]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tm-qp-pax" className="block text-xs font-semibold uppercase tracking-wide text-white/80 mb-1.5">
              Travellers
            </label>
            <select
              id="tm-qp-pax"
              value={pax}
              onChange={(e) => setPax(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 border border-white/30 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? '1 person' : `${n} people`}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={applyToEnquiry}
              className="w-full py-2.5 px-4 rounded-lg bg-secondary text-accent font-bold text-sm hover:bg-secondary/90 transition-colors shadow-md"
            >
              Pre-fill enquiry form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
