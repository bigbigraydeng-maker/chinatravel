'use client';

import { useState } from 'react';

interface TourEnquiryProps {
  tourName: string;
  tourSlug: string;
}

export default function TourEnquiry({ tourName, tourSlug }: TourEnquiryProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      ...formData,
      source: 'Tour Page Enquiry',
      submittedAt: new Date().toISOString(),
    };

    // TODO: Integrate with Go High Level webhook
    // TODO: Integrate with Go High Level webhook - send payload
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div id="enquiry" className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your enquiry has been submitted. Our travel specialists will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div id="enquiry" className="bg-white border border-warm-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-5 text-white">
        <h3 className="text-lg font-bold">Enquire About This Tour</h3>
        <p className="text-sm text-white/80 mt-1">
          Interested in {tourName}? We&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eq-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" id="eq-name" name="name" required value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="John Smith" />
          </div>

          <div>
            <label htmlFor="eq-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input type="email" id="eq-email" name="email" required value={formData.email} onChange={handleChange}
              className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="john@example.com" />
          </div>

          <div>
            <label htmlFor="eq-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input type="tel" id="eq-phone" name="phone" required value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="+64 21 123 4567" />
          </div>

          <div>
            <label htmlFor="eq-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="eq-message" name="message" rows={4} value={formData.message} onChange={handleChange}
              className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none bg-warm-50/50"
              placeholder="Tell us about your travel dates, group size, and any special requirements..." />
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              'Send Enquiry'
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We respect your privacy. Your information will not be shared.
          </p>
        </form>
      </div>
    </div>
  );
}
