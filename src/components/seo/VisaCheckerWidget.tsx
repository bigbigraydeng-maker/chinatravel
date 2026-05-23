'use client';

import { useState } from 'react';

type Step = 'passport' | 'purpose' | 'duration' | 'result';
type PassportType = 'nz' | 'other';
type TravelPurpose = 'tourism' | 'business' | 'family' | 'work' | 'study';
type StayDuration = 'under30' | 'over30';

type ResultType = 'visa-free' | 'need-visa' | 'check-required';

interface CheckResult {
  type: ResultType;
  heading: string;
  summary: string;
  detail: string;
  ctaText: string;
  ctaHref: string;
}

function getResult(
  passport: PassportType,
  purpose: TravelPurpose,
  duration: StayDuration
): CheckResult {
  if (passport === 'other') {
    return {
      type: 'check-required',
      heading: 'Check Your Eligibility',
      summary: "China's visa-free policy now covers 50 countries.",
      detail:
        'China\'s unilateral visa-free policy (confirmed May 2026) covers 50 countries including Australia, UK, Canada, Japan, South Korea, and most of Europe — up to 30 days per stay. Check whether your passport country is on the list via the Chinese Embassy or consulate in your country.',
      ctaText: 'View China Embassy (NZ)',
      ctaHref: 'https://nz.china-embassy.gov.cn/eng/',
    };
  }

  if (purpose === 'work' || purpose === 'study') {
    return {
      type: 'need-visa',
      heading: 'Visa Required',
      summary: `${purpose === 'work' ? 'Work (Z-Visa)' : 'Study (X-Visa)'} requires a visa regardless of duration.`,
      detail:
        purpose === 'work'
          ? 'Employment in China requires a Z-Visa. Apply through the Chinese Embassy in Wellington before you travel. Allow 4–6 weeks.'
          : 'Students enrolled at Chinese institutions need an X-Visa. Your institution will provide the required documents. Apply at the Chinese Embassy before departure.',
      ctaText: 'Contact Chinese Embassy (NZ)',
      ctaHref: 'https://nz.china-embassy.gov.cn/eng/',
    };
  }

  if (duration === 'over30') {
    return {
      type: 'need-visa',
      heading: 'Visa Required',
      summary: 'Visa-free entry is limited to 30 consecutive days.',
      detail:
        'If your trip exceeds 30 days, you need to apply for an L-Visa (Tourist) or other appropriate category before departure. Alternatively, plan your holiday within the 30-day window — most CTS tours run 7–14 days.',
      ctaText: 'Browse CTS China Tours',
      ctaHref: '/china-tours',
    };
  }

  return {
    type: 'visa-free',
    heading: 'You Can Enter Visa-Free!',
    summary: 'Great news — no visa application needed.',
    detail:
      'As a New Zealand passport holder visiting for tourism, business, or family, you can enter China visa-free for up to 30 days per visit (valid until 31 Dec 2026). Multiple entries are allowed with no limit on the number of visits. Simply bring your NZ passport, return flight booking, and proof of accommodation. No embassy visit or pre-declaration required.',
    ctaText: 'Browse CTS China Tours',
    ctaHref: '/china-tours',
  };
}

const PURPOSES: { value: TravelPurpose; label: string; emoji: string }[] = [
  { value: 'tourism', label: 'Holiday / Tourism', emoji: '🏯' },
  { value: 'business', label: 'Business', emoji: '💼' },
  { value: 'family', label: 'Visiting Family', emoji: '👨‍👩‍👧' },
  { value: 'work', label: 'Work / Employment', emoji: '🔧' },
  { value: 'study', label: 'Study / Internship', emoji: '🎓' },
];

export default function VisaCheckerWidget() {
  const [step, setStep] = useState<Step>('passport');
  const [passport, setPassport] = useState<PassportType | null>(null);
  const [purpose, setPurpose] = useState<TravelPurpose | null>(null);
  const [duration, setDuration] = useState<StayDuration | null>(null);

  const result =
    step === 'result' && passport && purpose && duration
      ? getResult(passport, purpose, duration)
      : null;

  const reset = () => {
    setStep('passport');
    setPassport(null);
    setPurpose(null);
    setDuration(null);
  };

  const resultColour: Record<ResultType, string> = {
    'visa-free': 'border-green-500 bg-green-50',
    'need-visa': 'border-amber-500 bg-amber-50',
    'check-required': 'border-blue-500 bg-blue-50',
  };

  const resultIcon: Record<ResultType, string> = {
    'visa-free': '✅',
    'need-visa': '⚠️',
    'check-required': '🔍',
  };

  return (
    <section
      id="visa-checker"
      className="bg-warm-50 border-y border-warm-200 py-10 px-4 scroll-mt-24"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-6">
          <p className="text-primary font-semibold uppercase tracking-wider text-xs mb-1">
            Free instant check
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Do I Need a Visa for China?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Answer 3 quick questions to find out in seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-6 md:p-8">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {(['passport', 'purpose', 'duration'] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  step === 'result' || ['passport', 'purpose', 'duration'].indexOf(step) >= i
                    ? 'bg-primary'
                    : 'bg-warm-200'
                }`}
              />
            ))}
          </div>

          {/* Step 1 — Passport */}
          {step === 'passport' && (
            <div>
              <p className="font-semibold text-gray-900 text-center mb-4">
                What passport do you hold?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setPassport('nz'); setStep('purpose'); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-warm-200 hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-gray-800"
                >
                  <span className="text-3xl">🇳🇿</span>
                  New Zealand
                </button>
                <button
                  onClick={() => { setPassport('other'); setStep('purpose'); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-warm-200 hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-gray-800"
                >
                  <span className="text-3xl">🌐</span>
                  Other country
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Purpose */}
          {step === 'purpose' && (
            <div>
              <p className="font-semibold text-gray-900 text-center mb-4">
                Why are you visiting China?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PURPOSES.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setPurpose(value);
                      if (value === 'work' || value === 'study') {
                        setDuration('under30');
                        setStep('result');
                      } else {
                        setStep('duration');
                      }
                    }}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-warm-200 hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-gray-800 text-left"
                  >
                    <span className="text-xl flex-shrink-0">{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('passport')} className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors block mx-auto">
                ← Back
              </button>
            </div>
          )}

          {/* Step 3 — Duration */}
          {step === 'duration' && (
            <div>
              <p className="font-semibold text-gray-900 text-center mb-4">
                How long will you stay?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setDuration('under30'); setStep('result'); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-warm-200 hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-gray-800"
                >
                  <span className="text-2xl">📅</span>
                  30 days or less
                </button>
                <button
                  onClick={() => { setDuration('over30'); setStep('result'); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-warm-200 hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-gray-800"
                >
                  <span className="text-2xl">🗓️</span>
                  More than 30 days
                </button>
              </div>
              <button onClick={() => setStep('purpose')} className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors block mx-auto">
                ← Back
              </button>
            </div>
          )}

          {/* Result */}
          {step === 'result' && result && (
            <div>
              <div className={`rounded-xl border-2 p-5 mb-5 ${resultColour[result.type]}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{resultIcon[result.type]}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg leading-snug mb-1">
                      {result.heading}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-2">{result.summary}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{result.detail}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={result.ctaHref}
                  {...(result.ctaHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition"
                >
                  {result.ctaText}
                </a>
                <button
                  onClick={reset}
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-warm-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-warm-50 transition"
                >
                  Check again
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Based on China&apos;s visa-free policy for NZ passport holders, valid until 31 Dec 2026. Confirmed by China MFA, May 2026.{' '}
          <a
            href="https://nz.china-embassy.gov.cn/eng/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Verify with the Chinese Embassy
          </a>{' '}
          before travel.
        </p>
      </div>
    </section>
  );
}
