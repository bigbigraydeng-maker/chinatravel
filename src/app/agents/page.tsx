import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Resources - CTS Tours',
  description: 'CTS supports trade partners with specialist China expertise.',
  keywords: ['Agent resources', 'Travel agent tools', 'China travel partners', 'CTS Tours'],
  openGraph: {
    title: 'Agent Resources - CTS Tours',
    description: 'CTS supports trade partners with specialist China expertise.',
    type: 'website',
  },
};

const AgentsPage = () => {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg"
            alt="Forbidden City Beijing — CTS Tours Agent Resources"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Agent Resources</h1>
          <p className="text-lg">CTS supports trade partners with specialist China expertise</p>
        </div>
      </section>

      {/* Page body */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">Agent Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              CTS supports trade partners with specialist China expertise. Our dedicated team provides comprehensive resources to help you sell China travel with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brochure column */}
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-serif">Brochures</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive brochures showcasing our China tour packages and destinations.
              </p>
              <div className="bg-light p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Coming soon: Digital and print brochures
                </p>
              </div>
            </div>

            {/* Selling points column */}
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-serif">Selling Points</h3>
              <p className="text-gray-600 mb-6">
                Key selling points and unique features of our China tours to help you close sales.
              </p>
              <div className="bg-light p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Coming soon: Sales tools and talking points
                </p>
              </div>
            </div>

            {/* Support materials column */}
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-serif">Support Materials</h3>
              <p className="text-gray-600 mb-6">
                Training materials, destination guides, and marketing resources for your team.
              </p>
              <div className="bg-light p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Coming soon: Training modules and marketing assets
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6 font-serif">Get in Touch</h3>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              For more information about our agent resources or to become a partner, please contact our team.
            </p>
            <a href="/contact" className="btn-primary inline-block">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;