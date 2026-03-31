'use client';

import { useState } from 'react';

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

export default function TailorMadeForm() {
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
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitting(true);

    const payload = {
      ...formData,
      source: 'Tailor Made Page',
      submittedAt: new Date().toISOString(),
    };

    // TODO: Integrate with Go High Level webhook
    // TODO: Integrate with Go High Level webhook - send payload
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
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
          Your tailor-made request has been submitted. Our specialist will contact you within 24 hours to start designing your dream journey.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-8">
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Your Details</h3>
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
            <label htmlFor="tm-country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
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

      {/* Destinations */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Where would you like to go?</h3>
        <div className="flex flex-wrap gap-3">
          {destinationOptions.map(dest => (
            <button key={dest} type="button"
              onClick={() => toggleCheckbox('destinations', dest)}
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

      {/* Interests */}
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">What are you interested in?</h3>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map(interest => (
            <button key={interest} type="button"
              onClick={() => toggleCheckbox('interests', interest)}
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
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Trip Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tm-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date</label>
            <input type="date" id="tm-date" name="travelDate" value={formData.travelDate} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
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
            <label htmlFor="tm-travellers" className="block text-sm font-medium text-gray-700 mb-1">Number of Travellers</label>
            <input type="text" id="tm-travellers" name="travellers" value={formData.travellers} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="e.g. 2 adults, 1 child" />
          </div>
          <div>
            <label htmlFor="tm-budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
            <select id="tm-budget" name="budget" value={formData.budget} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
              <option value="">Select budget range</option>
              {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="tm-message" className="block text-sm font-medium text-gray-700 mb-1">Tell us more about your dream trip</label>
        <textarea id="tm-message" name="message" rows={4} value={formData.message} onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
          placeholder="Any special requirements, must-see destinations, dietary needs, mobility considerations..." />
      </div>

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
          'Submit My Trip Request'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Your information will not be shared with third parties.
      </p>
    </form>
  );
}
