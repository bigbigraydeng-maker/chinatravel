'use client';

import TravelMonthPicker from '@/components/tailor-made/TravelMonthPicker';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { experiences, aucklandToday } from '@/lib/tour-discovery';
import { prefillFromSearchParams } from '@/lib/tailor-made-enquiry-params';
import { FieldToolTip } from '@/components/tailor-made/FormToolTips';
import { trackToolTipClick, trackEnquirySubmitted } from '@/lib/analytics/track-tools';

const destinationOptions = ['China', 'Japan', 'Vietnam', 'Multiple Countries'];
const interestOptions = [
  'Culture & History', 'Food & Culinary', 'Nature & Adventure', 'Family',
  'Honeymoon & Romance', 'Photography', 'Wellness & Spa', 'Arts & Performance',
];
const budgetOptions = [
  'Economy (under $3,000 pp)',
  'Comfort ($3,000 - $5,000 pp)',
  'Premium ($5,000 - $8,000 pp)',
  'Luxury ($8,000+ pp)',
  'Flexible / Not sure',
];

const accommodationOptions = [
  'Four-star hotels (well-located, great value)',
  'Five-star hotels (upgraded comfort)',
  'Mix of four- and five-star',
  'Top-tier / suite-style where available',
  'Not sure — advise me',
];

const referralOptions = [
  '',
  'Internet search',
  'Referral from a friend',
  'Travel agent',
  'Social media',
  'Email or newsletter',
  'Travel show or event',
  'Returning CTS traveller',
  'Other',
];

function TailorMadeFormInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const heading = useRef<HTMLHeadingElement>(null);
  const [dateMode, setDateMode] = useState('Flexible');
  const changeStep = (next: number) => { setStep(next); setTimeout(() => { heading.current?.focus(); heading.current?.scrollIntoView({behavior:'smooth', block:'center'}); }, 0); };
  const [prefillBanner, setPrefillBanner] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    destinations: [] as string[],
    interests: [] as string[],
    travelDate: '',
    duration: '',
    travellers: '',
    budget: '',
    accommodation: '',
    includeFlights: '',
    referralSource: '',
    message: '',
    cities: '',
    childAges: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const patch = prefillFromSearchParams(searchParams);
    const allowed = new Set(destinationOptions);
    const destFiltered = (patch.destinations ?? []).filter((d) => allowed.has(d));
    const experience = experiences.find(e => e.id === searchParams.get('experience'));
    const idea = searchParams.get('idea');
    const city = searchParams.get('city')?.slice(0,200) || '';
    const budget = searchParams.get('budget');
    const budgetLabel = budget && /^\d+$/.test(budget) ? `Up to NZ$${Number(budget).toLocaleString('en-NZ')} per person` : '';
    const searchNotes = ['q','interest','tag'].flatMap(key=>searchParams.get(key) ? [key + ': ' + searchParams.get(key)!.slice(0,200)] : []).join('; ');
    const destination = ({china:'China',japan:'Japan',vietnam:'Vietnam'} as Record<string,string>)[searchParams.get('destination') || ''];
    const has = !!city || !!budgetLabel || !!searchNotes || !!destination || !!experience || !!idea ||
      !!patch.travelDate ||
      !!patch.duration ||
      !!patch.travellers ||
      destFiltered.length > 0;
    if (!has) return;

    if(patch.travelDate) setDateMode('Month');
    setFormData((prev) => ({
      ...prev,
      ...(experience ? {message: 'I am interested in ' + experience.title + '. Please advise on a suitable itinerary.', destinations:['China']} : {}),
      ...(idea ? {message: 'I would like to explore: ' + idea.slice(0,200)} : {}),
      ...(patch.travelDate ? { travelDate: patch.travelDate.slice(0,7) } : {}),
      ...(city ? {cities:city} : {}),
      ...(budgetLabel ? {budget:budgetLabel} : {}),
      ...(destination ? {destinations:[destination]} : {}),
      ...(searchNotes ? {message:[experience ? 'I am interested in ' + experience.title : '',searchNotes].filter(Boolean).join('\n')} : {}),
      ...(patch.duration ? { duration: patch.duration } : {}),
      ...(patch.travellers ? { travellers: patch.travellers } : {}),
      ...(destFiltered.length ? { destinations: destFiltered } : {}),
    }));
    setPrefillBanner(true);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleCheckbox = (field: 'destinations' | 'interests', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(step === 1) {
      if (dateMode === 'Month' && (!formData.travelDate || formData.travelDate < aucklandToday().slice(0,7))) {
        setSubmitError('Please choose a travel month and year, or select Flexible.');
        document.getElementById('tm-date')?.focus();
        return;
      }
      setSubmitError(null); changeStep(2); return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      destinations: formData.destinations,
      interests: formData.interests,
      travelDate: dateMode === 'Flexible' ? 'Flexible' : formData.travelDate.trim(),
      duration: formData.duration.trim(),
      travellers: [formData.travellers.trim(), formData.childAges ? 'Children ages: ' + formData.childAges.trim() : ''].filter(Boolean).join('; '),
      budget: formData.budget.trim(),
      accommodation: formData.accommodation.trim(),
      includeFlights: formData.includeFlights.trim(),
      referralSource: formData.referralSource.trim(),
      message: [formData.cities ? 'Places I would like to visit: ' + formData.cities.trim() : '', formData.message.trim()].filter(Boolean).join('\n'),
      source: 'Tailor Made Page',
    };

    try {
      const res = await fetch('/api/tailor-made-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.');
      }

      trackEnquirySubmitted();
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your tailor-made request has been submitted. Our specialist will contact you to start planning your journey, usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-8">
      {submitError && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
          {submitError}
        </p>
      )}
      {prefillBanner && (
        <div className="-mt-2 mb-2 rounded-lg bg-warm-50 border border-warm-200 px-4 py-3 text-sm text-gray-800">
          <span className="font-semibold text-primary">Pre-filled from your selection.</span>{' '}
          Review trip length, month, and party size below, then add your contact details.
        </div>
      )}
      <p className="text-sm text-gray-600 -mt-2">
        CTS Tours is committed to protecting your privacy. We do not sell your details. See our{' '}
        <a href="/terms-and-conditions" className="text-primary font-medium hover:underline">
          terms &amp; conditions
        </a>{' '}
        for how we handle enquiries.
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary" aria-live="polite">Step {step} of 2 · {step === 1 ? 'Your journey' : 'Your details'}</p>
      <h3 ref={heading} tabIndex={-1} className="font-serif text-2xl outline-none">{step === 1 ? 'Tell us what a great trip looks like.' : 'Where should we send your plan?'}</h3>
      {step === 1 && <>
      {/* Destinations */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Where would you like to go?</h3>
        <div className="flex flex-wrap gap-3">
          {destinationOptions.map(dest => (
            <button key={dest} type="button"
              aria-pressed={formData.destinations.includes(dest)} onClick={() => toggleCheckbox('destinations', dest)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                formData.destinations.includes(dest)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
              }`}>
              {dest}
            </button>
          ))}
        </div>
      </div>

      <label className="block text-sm font-medium">Any cities or places in mind?
        <input name="cities" value={formData.cities} onChange={handleChange} maxLength={500} placeholder="Beijing, Zhangjiajie, Universal Beijing… or tell us you’re unsure" className="mt-2 block w-full rounded-lg border border-gray-300 p-3" />
      </label>
      {/* Interests */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">What are you interested in?</h3>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map(interest => (
            <button key={interest} type="button"
              aria-pressed={formData.interests.includes(interest)} onClick={() => toggleCheckbox('interests', interest)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                formData.interests.includes(interest)
                  ? 'bg-secondary text-accent border-secondary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-secondary hover:text-accent'
              }`}>
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Trip Details */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Trip details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tm-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred travel date</label>
            <select aria-label="Date flexibility" value={dateMode} onChange={e=>{setDateMode(e.target.value);setFormData(p=>({...p,travelDate:''}));}} className="mb-2 w-full rounded-lg border border-gray-300 p-3"><option>Flexible</option><option>Month</option><option>Exact date</option></select>
            {dateMode === 'Month' && <TravelMonthPicker value={formData.travelDate} min={aucklandToday().slice(0,7)} onChange={travelDate=>{setFormData(p=>({...p,travelDate}));setSubmitError(null);}} />}
            {dateMode === 'Exact date' && <input type="date" min={aucklandToday()} id="tm-date" required name="travelDate" value={formData.travelDate} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />}
            <FieldToolTip
              fieldName="travel-date"
              onToolClick={(toolName) => trackToolTipClick(toolName, 'travel-date')}
            />
          </div>
          <div>
            <label htmlFor="tm-duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select id="tm-duration" name="duration" value={formData.duration} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">How long?</option>
              <option value="3-5 days">3-5 days</option>
              <option value="1 week">About 1 week</option>
              <option value="10-14 days">10-14 days</option>
              <option value="2-3 weeks">2-3 weeks</option>
              <option value="3+ weeks">3+ weeks</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
          <div>
            <label htmlFor="tm-travellers" className="block text-sm font-medium text-gray-700 mb-1">Number of travellers</label>
            <input type="text" id="tm-travellers" name="travellers" value={formData.travellers} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="e.g. 2 adults, 1 child" />
          </div>
          <div>
            <label htmlFor="tm-budget" className="block text-sm font-medium text-gray-700 mb-1">Budget per person (NZD, indicative)</label>
            <select id="tm-budget" name="budget" value={formData.budget} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">Select budget range</option>
              {formData.budget && !budgetOptions.includes(formData.budget) && <option value={formData.budget}>{formData.budget}</option>}
              {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <FieldToolTip
              fieldName="budget"
              onToolClick={(toolName) => trackToolTipClick(toolName, 'budget')}
            />
          </div>
          <div>
            <label htmlFor="tm-accommodation" className="block text-sm font-medium text-gray-700 mb-1">Accommodation style</label>
            <select id="tm-accommodation" name="accommodation" value={formData.accommodation} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">Select preference</option>
              {accommodationOptions.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tm-flights" className="block text-sm font-medium text-gray-700 mb-1">Should this budget include international flights?</label>
            <select id="tm-flights" name="includeFlights" value={formData.includeFlights} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">Select</option>
              <option value="Yes">Yes — please include options</option>
              <option value="No">No — land-only</option>
              <option value="Not sure">Not sure yet</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="tm-referral" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
            <select id="tm-referral" name="referralSource" value={formData.referralSource} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              {referralOptions.map((opt) => (
                <option key={opt || 'empty'} value={opt}>{opt || 'Optional — select one'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <label className="block text-sm font-medium">Children’s ages at time of travel (if applicable)<input name="childAges" value={formData.childAges} onChange={handleChange} maxLength={100} placeholder="e.g. 6 and 11" className="mt-2 block w-full rounded-lg border border-gray-300 p-3" /></label>
      {/* Message */}
      <div>
        <label htmlFor="tm-message" className="block text-sm font-medium text-gray-700 mb-1">Tell us more about your dream trip</label>
        <textarea id="tm-message" name="message" rows={4} maxLength={9000} value={formData.message} onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
          placeholder="Any special requirements, must-see destinations, dietary needs, mobility considerations..." />
      </div>

      </>}
      {step === 2 && <>
        <div className="rounded-xl bg-surface p-5 text-sm leading-relaxed"><h4 className="mb-2 font-semibold">Your trip at a glance</h4>
          <p>{formData.destinations.join(', ') || 'Destination: advise me'}{formData.cities ? ' · ' + formData.cities : ''}</p>
          <p>{dateMode === 'Flexible' ? 'Flexible dates' : formData.travelDate || 'Date to discuss'} · {formData.duration || 'Flexible duration'} · {formData.travellers || 'Party size to discuss'}</p>
          {formData.childAges && <p>Children ages: {formData.childAges}</p>}
          <p>{formData.budget || 'Budget to discuss'} · {formData.accommodation || 'Hotel advice welcome'}</p>
          <p>Flights: {formData.includeFlights || 'To discuss'}</p><p>{formData.interests.join(', ')}</p><p className="whitespace-pre-wrap">{formData.message}</p>
        </div>
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Your details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tm-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" id="tm-name" name="name" required value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="John Smith" />
          </div>
          <div>
            <label htmlFor="tm-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" id="tm-email" name="email" required value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="tm-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" id="tm-phone" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="+64 / 0800 287 888" />
          </div>
          <div>
            <label htmlFor="tm-country" className="block text-sm font-medium text-gray-700 mb-1">Country of residence *</label>
            <select id="tm-country" name="country" required value={formData.country} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">Select your country</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Australia">Australia</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      </>}
      {step === 2 && <button type="button" onClick={()=>changeStep(1)} className="font-medium text-primary underline">← Edit trip details</button>}
      {/* Submit */}
      <button type="submit" disabled={isSubmitting}
        className="w-full py-4 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg">
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          step === 1 ? 'Continue to your details →' : 'Send my trip request'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Your information will not be shared with third parties.
      </p>
    </form>
  );
}

export default function TailorMadeForm() {
  return <TailorMadeFormInner />;
}
