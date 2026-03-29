import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About CTS Tours</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Connecting New Zealanders to the wonders of Asia for over 20 years
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Company Overview</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Who We Are</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                CTS Tours is the New Zealand branch of China Travel Service, one of the world's leading travel organizations. Established in 2000 by Lisa Li, MNZM, we have grown to become a trusted name in travel between New Zealand and Asia.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our History</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our roots trace back to the China Travel Service Group, founded in 1928. With nearly a century of experience in the travel industry, we bring unparalleled expertise to every journey we create.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our Brands</h3>
              <p className="text-gray-700 leading-relaxed">
                In addition to CTS Tours, we also operate under the Asiascape Holidays brand, offering specialized travel experiences across Asia. Both brands share our commitment to quality, authenticity, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Lisa Li */}
            <Link href="/experts/lisa-li" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src="/images/lisa-li-portrait.jpg"
                    alt="Lisa Li, Managing Director"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Lisa Li, MNZM</h3>
                  <p className="text-primary font-semibold mb-4">Managing Director, CTS Tours</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Founder of CTS Tours New Zealand and Member of the New Zealand Order of Merit (MNZM) with over 25 years of experience connecting New Zealand and Asia through travel.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Baker Gu */}
            <Link href="/experts/baker-gu" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src="/images/baker-gu-portrait.jpg"
                    alt="Baker Gu, China Specialist"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Baker Gu</h3>
                  <p className="text-primary font-semibold mb-4">China Travel Specialist</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    With over 15 years of experience in the travel industry, Baker brings unparalleled expertise in Chinese destinations and cultures.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Credentials */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Credentials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <img src="/images/credentials/taanz.png" alt="TAANZ Membership" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold">TAANZ Membership</h3>
              </div>
              <p className="text-gray-700">Member of the Travel Agents Association of New Zealand, ensuring professional standards and ethical business practices.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <img src="/images/credentials/iata.png" alt="IATA Certification" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold">IATA Certification</h3>
              </div>
              <p className="text-gray-700">International Air Transport Association certified, providing access to global airfares and industry resources.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <img src="/images/credentials/tourism-export-council.png" alt="Tourism Export Council" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold">Tourism Export Council</h3>
              </div>
              <p className="text-gray-700">Member of the Tourism Export Council of New Zealand, supporting sustainable tourism growth.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <img src="/images/credentials/auckland-business-chamber.png" alt="Auckland Business Chamber" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold">Auckland Business Chamber</h3>
              </div>
              <p className="text-gray-700">Active member of the Auckland Business Chamber, contributing to the local business community.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <img src="/images/credentials/qualmark.png" alt="Qualmark" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold">Qualmark</h3>
              </div>
              <p className="text-gray-700">Recognized by Qualmark, New Zealand's official tourism quality assurance organization.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <div className="w-full h-full rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary text-center leading-tight">Forté Global</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Forté Global Network</h3>
              </div>
              <p className="text-gray-700">Member of Forté Global Network Business Solutions, providing enhanced travel services and benefits to our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Why Choose CTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">20+ Years Experience</h3>
                <p className="text-gray-700">Serving Kiwi travellers since 2000, with a deep understanding of both New Zealand and Asian markets.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Direct China Operations</h3>
                <p className="text-gray-700">On-the-ground presence and partnerships throughout China, ensuring seamless travel experiences.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fully Inclusive Packages</h3>
                <p className="text-gray-700">Comprehensive packages that include flights, accommodation, meals, and activities for stress-free travel.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">NZ-Only Groups</h3>
                <p className="text-gray-700">Small, exclusive groups with only New Zealand travelers for a more personalized experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
