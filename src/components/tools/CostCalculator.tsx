'use client';

import { useMemo, useState } from 'react';
import { calculateCost, type CostInput } from '@/lib/cost-calculator/calculateCost';
import { ADD_ON_PRICES } from '@/lib/cost-calculator/flightRates';

const TIERS = [
  {
    id: 'stopover' as const,
    label: 'Stopover',
    description: '3–5 days — city highlights',
    color: 'green',
  },
  {
    id: 'discovery' as const,
    label: 'Discovery',
    description: '8–12 days — cultural depth',
    color: 'blue',
  },
  {
    id: 'signature' as const,
    label: 'Signature',
    description: '12–18 days — luxury immersion',
    color: 'amber',
  },
];

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring (Mar–May)',
  summer: 'Summer (Jun–Aug) — peak season',
  autumn: 'Autumn (Sep–Nov) — popular',
  winter: 'Winter (Dec–Feb) — best value',
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 0 }).format(n);
}

function BarSegment({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-accent">
          {fmt(value)} <span className="text-gray-400">({pct}%)</span>
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-warm-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
          role="meter"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${pct}%`}
        />
      </div>
    </div>
  );
}

export default function CostCalculator() {
  const [step, setStep] = useState(1);
  const [groupSize, setGroupSize] = useState(2);
  const [tier, setTier] = useState<'signature' | 'discovery' | 'stopover'>('discovery');
  const [travelMonth, setTravelMonth] = useState(4);
  const [insurance, setInsurance] = useState(false);
  const [singleUpgrade, setSingleUpgrade] = useState(false);
  const [privateTransfer, setPrivateTransfer] = useState(false);

  const input: CostInput = useMemo(
    () => ({
      groupSize,
      tier,
      travelMonth,
      addOns: { insurance, singleUpgrade, privateTransfer },
      tourPrice: '',
    }),
    [groupSize, insurance, privateTransfer, singleUpgrade, tier, travelMonth]
  );

  const result = useMemo(() => calculateCost(input), [input]);

  const canGoNext =
    (step === 1 && groupSize >= 1) ||
    (step === 2 && !!tier) ||
    step === 3;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Cost Calculator</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-accent md:text-4xl">
          Estimate your China trip cost
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Get an indicative budget breakdown — flights, tour fee, and optional extras — in under a minute.
        </p>
      </header>

      {/* Progress */}
      <nav aria-label="Calculator progress" className="mb-8">
        <ol className="flex justify-center gap-2">
          {[
            { n: 1, label: 'Group' },
            { n: 2, label: 'Tour' },
            { n: 3, label: 'Extras' },
          ].map(({ n, label }) => (
            <li key={n}>
              <button
                type="button"
                aria-current={step === n ? 'step' : undefined}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  step === n
                    ? 'bg-primary text-white shadow-md'
                    : step > n
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-warm-100 text-gray-400'
                }`}
                onClick={() => setStep(n)}
              >
                {label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-10">
        {/* Step 1: Group size */}
        {step === 1 && (
          <fieldset>
            <legend className="mb-6 font-serif text-xl font-semibold text-accent">
              How many travellers?
            </legend>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                aria-label="Decrease group size"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-warm-300 text-xl font-bold text-accent transition hover:border-primary hover:text-primary disabled:opacity-30"
                onClick={() => setGroupSize((n) => Math.max(1, n - 1))}
                disabled={groupSize <= 1}
              >
                −
              </button>
              <output
                aria-live="polite"
                className="min-w-[3rem] text-center font-serif text-4xl font-bold text-accent"
              >
                {groupSize}
              </output>
              <button
                type="button"
                aria-label="Increase group size"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-warm-300 text-xl font-bold text-accent transition hover:border-primary hover:text-primary disabled:opacity-30"
                onClick={() => setGroupSize((n) => Math.min(20, n + 1))}
                disabled={groupSize >= 20}
              >
                +
              </button>
              <span className="text-gray-500">
                {groupSize === 1 ? 'traveller' : 'travellers'}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">Minimum 1 · Maximum 20</p>
          </fieldset>
        )}

        {/* Step 2: Tour tier + travel month */}
        {step === 2 && (
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-4 font-serif text-xl font-semibold text-accent">
                Which tour style?
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {TIERS.map((t) => (
                  <label
                    key={t.id}
                    className={`flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all ${
                      tier === t.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-warm-200 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      className="sr-only"
                      checked={tier === t.id}
                      onChange={() => setTier(t.id)}
                    />
                    <span className="font-semibold text-accent">{t.label}</span>
                    <span className="mt-1 text-sm text-gray-500">{t.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-serif text-lg font-semibold text-accent">
                When do you plan to travel?
              </legend>
              <select
                aria-label="Travel month"
                className="w-full rounded-xl border-2 border-warm-200 bg-white px-4 py-3 text-accent transition focus:border-primary focus:outline-none"
                value={travelMonth}
                onChange={(e) => setTravelMonth(Number(e.target.value))}
              >
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-secondary font-medium">
                {SEASON_LABELS[result.season]}
                {result.seasonMultiplier !== 1 && (
                  <span className="ml-2 text-gray-500">
                    (flight {result.seasonMultiplier > 1 ? '+' : ''}
                    {Math.round((result.seasonMultiplier - 1) * 100)}%)
                  </span>
                )}
              </p>
            </fieldset>
          </div>
        )}

        {/* Step 3: Add-ons */}
        {step === 3 && (
          <fieldset>
            <legend className="mb-4 font-serif text-xl font-semibold text-accent">
              Optional extras
            </legend>
            <div className="space-y-3">
              {[
                {
                  id: 'insurance',
                  label: 'Travel insurance',
                  price: ADD_ON_PRICES.insurance,
                  checked: insurance,
                  onChange: setInsurance,
                  desc: 'Comprehensive coverage for the trip',
                },
                {
                  id: 'singleUpgrade',
                  label: 'Single room supplement',
                  price: ADD_ON_PRICES.singleUpgrade,
                  checked: singleUpgrade,
                  onChange: setSingleUpgrade,
                  desc: 'Private room throughout the tour',
                },
                {
                  id: 'privateTransfer',
                  label: 'Private airport transfers',
                  price: ADD_ON_PRICES.privateTransfer,
                  checked: privateTransfer,
                  onChange: setPrivateTransfer,
                  desc: 'Dedicated vehicle from/to airport',
                },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                    item.checked
                      ? 'border-secondary bg-secondary/5 shadow-sm'
                      : 'border-warm-200 hover:border-secondary/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-secondary"
                    checked={item.checked}
                    onChange={(e) => item.onChange(e.target.checked)}
                    aria-label={item.label}
                  />
                  <div className="flex-1">
                    <span className="font-medium text-accent">{item.label}</span>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    +{fmt(item.price)}/person
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            className="rounded-full border border-warm-300 px-6 py-2.5 font-medium text-accent transition hover:bg-warm-50 disabled:opacity-30"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              className="rounded-full bg-primary px-6 py-2.5 font-medium text-white shadow-md transition hover:bg-primary/90 disabled:opacity-40"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canGoNext}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-primary to-red-500 px-6 py-2.5 font-medium text-white shadow-md transition hover:opacity-95"
              onClick={() => setStep(4)}
            >
              See estimate
            </button>
          )}
        </div>
      </div>

      {/* Results — always visible once step 4 */}
      {step === 4 && (
        <section
          aria-label="Cost estimate"
          className="mt-8 space-y-6 rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-accent">Your indicative estimate</h2>
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => setStep(1)}
            >
              Recalculate
            </button>
          </div>

          {/* Summary card */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 text-center">
            <p className="text-sm text-gray-600">
              {groupSize} {groupSize === 1 ? 'traveller' : 'travellers'} ·{' '}
              {TIERS.find((t) => t.id === tier)?.label} tour · {MONTHS[travelMonth - 1]?.label}
            </p>
            <p
              aria-label="Total group cost"
              className="mt-2 font-serif text-4xl font-bold text-accent"
            >
              {fmt(result.totalGroupCost)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {fmt(result.totalPerPerson)}/person (indicative)
            </p>
          </div>

          {/* Cost breakdown bars */}
          <div className="space-y-4">
            <h3 className="font-semibold text-accent">Cost breakdown</h3>
            <BarSegment
              label="Flights (AKL → China, return)"
              value={result.flightCostPerPerson}
              total={result.totalPerPerson}
              color="bg-blue-400"
            />
            <BarSegment
              label={`Tour fee (${TIERS.find((t) => t.id === tier)?.label})`}
              value={result.tourCostPerPerson}
              total={result.totalPerPerson}
              color="bg-primary"
            />
            {result.addOnCostPerPerson > 0 && (
              <BarSegment
                label="Optional extras"
                value={result.addOnCostPerPerson}
                total={result.totalPerPerson}
                color="bg-secondary"
              />
            )}
          </div>

          {/* Per person + group totals table */}
          <table className="w-full text-sm" aria-label="Itemised costs">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="pb-2 text-left font-medium text-gray-500">Item</th>
                <th className="pb-2 text-right font-medium text-gray-500">Per person</th>
                <th className="pb-2 text-right font-medium text-gray-500">
                  Group ({groupSize})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              <tr>
                <td className="py-2 text-accent">Flights</td>
                <td className="py-2 text-right text-accent">{fmt(result.flightCostPerPerson)}</td>
                <td className="py-2 text-right text-accent">{fmt(result.flightTotal)}</td>
              </tr>
              <tr>
                <td className="py-2 text-accent">Tour fee</td>
                <td className="py-2 text-right text-accent">{fmt(result.tourCostPerPerson)}</td>
                <td className="py-2 text-right text-accent">{fmt(result.tourTotal)}</td>
              </tr>
              {result.addOnCostPerPerson > 0 && (
                <tr>
                  <td className="py-2 text-accent">Extras</td>
                  <td className="py-2 text-right text-accent">{fmt(result.addOnCostPerPerson)}</td>
                  <td className="py-2 text-right text-accent">{fmt(result.addOnTotal)}</td>
                </tr>
              )}
              <tr className="border-t-2 border-warm-300 font-bold">
                <td className="pt-3 text-accent">Total</td>
                <td className="pt-3 text-right text-primary">{fmt(result.totalPerPerson)}</td>
                <td className="pt-3 text-right text-primary">{fmt(result.totalGroupCost)}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs text-gray-400">
            * Flight costs are indicative estimates based on Auckland–Shanghai return fares with seasonal
            adjustment. Tour prices are representative — actual pricing depends on selected tour and
            departure date. Contact us for a tailored quote.
          </p>

          <a
            href="/contact"
            className="mt-2 block w-full rounded-full bg-accent py-3 text-center font-medium text-white transition hover:bg-accent/90"
          >
            Get a personalised quote
          </a>
        </section>
      )}
    </div>
  );
}
