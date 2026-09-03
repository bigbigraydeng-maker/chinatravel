'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

interface Traveller {
  fullName: string;
  dob: string;
  dietary: string;
  medical: string;
}

const emptyTraveller = (): Traveller => ({ fullName: '', dob: '', dietary: '', medical: '' });

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary';
const labelClass = 'block text-gray-700 mb-2 text-sm font-medium';

export default function TravellerDetailsForm() {
  const params = useSearchParams();

  const [bookingRef, setBookingRef] = useState(params.get('booking') ?? '');
  const [tourName, setTourName] = useState(params.get('tour') ?? '');
  const [leadName, setLeadName] = useState(params.get('name') ?? '');
  const [leadEmail, setLeadEmail] = useState(params.get('email') ?? '');
  const [leadPhone, setLeadPhone] = useState('');

  const [travellers, setTravellers] = useState<Traveller[]>([emptyTraveller()]);

  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');

  const [agreeAccurate, setAgreeAccurate] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateTraveller = (index: number, field: keyof Traveller, value: string) => {
    setTravellers((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  };

  const addTraveller = () => setTravellers((prev) => [...prev, emptyTraveller()]);

  const removeTraveller = (index: number) =>
    setTravellers((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!agreeAccurate || !agreeTerms) {
      setSubmitError('Please tick both confirmation boxes before submitting.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/traveller-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: bookingRef.trim(),
          leadName: leadName.trim(),
          leadEmail: leadEmail.trim(),
          leadPhone: leadPhone.trim(),
          tourName: tourName.trim(),
          travellers: travellers.map((t) => ({
            fullName: t.fullName.trim(),
            dob: t.dob.trim(),
            dietary: t.dietary.trim(),
            medical: t.medical.trim(),
          })),
          emergencyName: emergencyName.trim(),
          emergencyRelationship: emergencyRelationship.trim(),
          emergencyPhone: emergencyPhone.trim(),
          specialOccasion: specialOccasion.trim(),
          agreeAccurate,
          agreeTerms,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.');
      }

      triggerGtmEvent({
        event: 'traveller_details_submit',
        form_type: 'traveller_details',
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/traveller-details',
      });

      setSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <section className="section bg-white">
        <div className="container max-w-2xl">
          <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-10 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-semibold mb-3">Thank you — details received</h2>
            <p className="text-gray-700 mb-2">
              We&apos;ve received your traveller details{bookingRef ? ` for booking ${bookingRef}` : ''}.
            </p>
            <p className="text-gray-600 text-sm">
              Our team will be in touch about your deposit and next steps. Questions? Call{' '}
              <a href="tel:0800287888" className="text-primary font-medium">0800 CTS 888</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <p className="text-gray-600 mb-8 leading-relaxed">
          Please complete this form so we can finalise your booking. Enter each traveller&apos;s full legal
          name exactly as it appears on their passport — this is what we use for flights, visas and hotels.
          All information is kept confidential and used only to arrange your trip.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Booking / lead contact */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">Your booking</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="tourName" className={labelClass}>Tour name</label>
                <input id="tourName" type="text" value={tourName} onChange={(e) => setTourName(e.target.value)}
                  placeholder="e.g. Golden China — 12 Days" className={inputClass} />
              </div>
              <div>
                <label htmlFor="bookingRef" className={labelClass}>Booking reference (if you have one)</label>
                <input id="bookingRef" type="text" value={bookingRef} onChange={(e) => setBookingRef(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadName" className={labelClass}>
                  Your name <span className="text-red-500">*</span>
                </label>
                <input id="leadName" type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadEmail" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="leadEmail" type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadPhone" className={labelClass}>Phone</label>
                <input id="leadPhone" type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)}
                  className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* Travellers */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">Traveller details</legend>
            {travellers.map((t, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark">Traveller {i + 1}</h3>
                  {travellers.length > 1 && (
                    <button type="button" onClick={() => removeTraveller(i)}
                      className="text-sm text-red-600 hover:text-red-700">
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`fullName-${i}`} className={labelClass}>
                      Full legal name (as per passport) <span className="text-red-500">*</span>
                    </label>
                    <input id={`fullName-${i}`} type="text" required value={t.fullName}
                      onChange={(e) => updateTraveller(i, 'fullName', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor={`dob-${i}`} className={labelClass}>
                      Date of birth <span className="text-red-500">*</span>
                    </label>
                    <input id={`dob-${i}`} type="date" required value={t.dob}
                      onChange={(e) => updateTraveller(i, 'dob', e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor={`dietary-${i}`} className={labelClass}>
                    Dietary requirements <span className="text-gray-400">(optional)</span>
                  </label>
                  <input id={`dietary-${i}`} type="text" value={t.dietary}
                    onChange={(e) => updateTraveller(i, 'dietary', e.target.value)}
                    placeholder="e.g. vegetarian, no seafood, gluten-free" className={inputClass} />
                </div>
                <div>
                  <label htmlFor={`medical-${i}`} className={labelClass}>
                    Medical or mobility notes <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea id={`medical-${i}`} rows={2} value={t.medical}
                    onChange={(e) => updateTraveller(i, 'medical', e.target.value)}
                    placeholder="Anything our guides should know — medication, allergies, walking limits, wheelchair, etc."
                    className={inputClass} />
                </div>
              </div>
            ))}
            <button type="button" onClick={addTraveller}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add another traveller
            </button>
          </fieldset>

          {/* Emergency contact */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">Emergency contact</legend>
            <p className="text-sm text-gray-500 -mt-2">Someone not travelling with you whom we can contact if needed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="emergencyName" className={labelClass}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input id="emergencyName" type="text" required value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="emergencyRelationship" className={labelClass}>Relationship</label>
                <input id="emergencyRelationship" type="text" value={emergencyRelationship}
                  onChange={(e) => setEmergencyRelationship(e.target.value)}
                  placeholder="e.g. spouse, son" className={inputClass} />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className={labelClass}>
                  Phone <span className="text-red-500">*</span>
                </label>
                <input id="emergencyPhone" type="tel" required value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)} className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* Special occasion */}
          <fieldset className="space-y-3">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">Special occasion</legend>
            <label htmlFor="specialOccasion" className={labelClass}>
              Celebrating something during your trip? <span className="text-gray-400">(optional)</span>
            </label>
            <input id="specialOccasion" type="text" value={specialOccasion}
              onChange={(e) => setSpecialOccasion(e.target.value)}
              placeholder="e.g. 40th wedding anniversary on 12 Oct, birthday during the tour"
              className={inputClass} />
          </fieldset>

          {/* Consent */}
          <fieldset className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2 px-2">Confirmation</legend>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreeAccurate} onChange={(e) => setAgreeAccurate(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">
                I confirm the details above are correct and match each traveller&apos;s passport.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">
                I have read and agree to the{' '}
                <Link href="/terms-and-conditions" target="_blank" className="text-primary font-medium underline">
                  Terms &amp; Conditions
                </Link>
                , and I understand the booking deposit is non-refundable.
              </span>
            </label>
          </fieldset>

          {submitError && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {submitError}
            </p>
          )}

          <div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3">
              {isLoading ? 'Submitting...' : 'Submit details'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Your information is handled in line with our{' '}
              <Link href="/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
