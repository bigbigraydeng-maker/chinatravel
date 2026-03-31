'use client';

import { useState } from 'react';

interface TourEnquiryProps {
  tourName: string;
  tourSlug: string;
}

type FormTab = 'enquiry' | 'booking';

export default function TourEnquiry({ tourName, tourSlug }: TourEnquiryProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('enquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    departureDate: '',
    returnDate: '',
    adults: '2',
    children: '0',
    roomType: '',
    flightPreference: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      tourName,
      tourSlug,
      formType: activeTab,
      ...formData,
      source: activeTab === 'booking' ? 'Tour Page Booking' : 'Tour Page Enquiry',
      submittedAt: new Date().toISOString(),
    };

    // TODO: Integrate with Go High Level webhook
    console.log('Tour form submission:', payload);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div id="enquiry" className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          {activeTab === 'booking' ? 'Booking Request Received!' : 'Thank You!'}
        </h3>
        <p className="text-green-700">
          {activeTab === 'booking'
            ? 'Your booking request has been submitted. Our team will confirm availability and contact you within 24 hours.'
            : 'Your enquiry has been submitted. Our travel specialists will contact you within 24 hours.'
          }
        </p>
      </div>
    );
  }

  return (
    <div id="enquiry" className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('enquiry')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-colors relative ${
            activeTab === 'enquiry'
              ? 'text-primary bg-white'
              : 'text-gray-500 bg-gray-50 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Enquiry
          </div>
          {activeTab === 'enquiry' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('booking')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-colors relative ${
            activeTab === 'booking'
              ? 'text-primary bg-white'
              : 'text-gray-500 bg-gray-50 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Booking
          </div>
          {activeTab === 'booking' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
          )}
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {activeTab === 'booking' ? 'Book This Tour' : 'Enquire About This Tour'}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {activeTab === 'booking'
            ? `Ready to book ${tourName}? Fill in your details and we will confirm availability.`
            : `Interested in ${tourName}? Send us an enquiry and we'll get back to you within 24 hours.`
          }
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eq-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="eq-name" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                placeholder="John Smith" />
            </div>
            <div>
              <label htmlFor="eq-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" id="eq-email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eq-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" id="eq-phone" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                placeholder="+64 21 123 4567" />
            </div>
            <div>
              <label htmlFor="eq-country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <select id="eq-country" name="country" required value={formData.country} onChange={handleChange}
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

          {/* Travel Dates */}
          <div className="bg-light rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Travel Dates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eq-departure" className="block text-xs font-medium text-gray-600 mb-1">Departure Date {activeTab === 'booking' ? '*' : ''}</label>
                <input type="date" id="eq-departure" name="departureDate"
                  required={activeTab === 'booking'}
                  value={formData.departureDate} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="eq-return" className="block text-xs font-medium text-gray-600 mb-1">Return Date</label>
                <input type="date" id="eq-return" name="returnDate"
                  value={formData.returnDate} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
              </div>
            </div>
          </div>

          {/* Traveller Count */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="eq-adults" className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
              <select id="eq-adults" name="adults" required value={formData.adults} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
                <option value="10+">10+</option>
              </select>
            </div>
            <div>
              <label htmlFor="eq-children" className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <select id="eq-children" name="children" value={formData.children} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                {[0,1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            {activeTab === 'booking' && (
              <>
                <div>
                  <label htmlFor="eq-room" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <select id="eq-room" name="roomType" value={formData.roomType} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                    <option value="">Select</option>
                    <option value="twin">Twin Share</option>
                    <option value="double">Double</option>
                    <option value="single">Single</option>
                    <option value="triple">Triple</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eq-flight" className="block text-sm font-medium text-gray-700 mb-1">Flight Pref.</label>
                  <select id="eq-flight" name="flightPreference" value={formData.flightPreference} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                    <option value="">Any</option>
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="no-flight">No Flight Needed</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="eq-message" className="block text-sm font-medium text-gray-700 mb-1">
              {activeTab === 'booking' ? 'Special Requests' : 'Message'}
            </label>
            <textarea id="eq-message" name="message" rows={3} value={formData.message} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
              placeholder={activeTab === 'booking'
                ? 'Any special requests, dietary requirements, accessibility needs...'
                : 'Tell us about your travel preferences...'
              } />
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            className={`w-full py-3.5 px-4 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              activeTab === 'booking'
                ? 'bg-secondary hover:bg-secondary/90 text-accent'
                : 'bg-primary hover:bg-primary/90'
            }`}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              activeTab === 'booking' ? 'Submit Booking Request' : 'Send Enquiry'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Your information will not be shared with third parties.
          </p>
        </form>
      </div>
    </div>
  );
}
