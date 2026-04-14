import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-accent to-dark text-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Desktop: 4 columns / Mobile: brand full-width, then 2+1 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand — spans full width on mobile */}
          <div className="col-span-2 md:col-span-1 mb-2 md:mb-0">
            <div className="mb-3">
              <Image src="/logo.png" alt="CTS Tours" width={180} height={48} className="h-10 md:h-12 w-auto bg-white rounded px-2 py-1" />
            </div>
            <p className="text-gray-400 text-sm mb-2">China Travel Specialists for New Zealanders</p>
            <p className="text-gray-400 text-xs mb-4">98 Years Heritage | Direct China Operations</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/CTSTOURS/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CTS Tours on Facebook"
                className="w-8 h-8 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/chinatravelservices/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CTS Tours on Instagram"
                className="w-8 h-8 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Tours column */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Tours</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors">All Tours</Link></li>
              <li><Link href="/china-tours" className="text-gray-400 hover:text-white transition-colors font-medium">China Tours Hub</Link></li>
              <li><Link href="/tours/china/signature" className="text-gray-400 hover:text-white transition-colors">China Signature</Link></li>
              <li><Link href="/tours/china/discovery" className="text-gray-400 hover:text-white transition-colors">China Discovery</Link></li>
              <li><Link href="/tours/china/stopover" className="text-gray-400 hover:text-white transition-colors">China Stopover</Link></li>
              <li><Link href="/tailor-made" className="text-gray-400 hover:text-white transition-colors">Tailor Made</Link></li>
            </ul>
          </div>

          {/* Guides column */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Guides</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link href="/best-time-to-visit-china" className="text-gray-400 hover:text-white transition-colors">Best Time to Visit</Link></li>
              <li><Link href="/china-visa-guide-for-new-zealanders" className="text-gray-400 hover:text-white transition-colors">China entry (NZ)</Link></li>
              <li><Link href="/china-tours-from-new-zealand" className="text-gray-400 hover:text-white transition-colors">Tours from NZ</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About CTS</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors font-medium">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h3>
            <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
              <a href="mailto:info@ctstours.co.nz" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@ctstours.co.nz
              </a>
              <a href="tel:0800287888" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0800 CTS 888
              </a>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                175 Queen St, Auckland
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm md:text-left">
          <p className="mb-2 md:mb-0 md:inline">
            &copy; {new Date().getFullYear()} CTS Tours. All rights reserved.
          </p>
          <span className="mx-2 hidden text-gray-600 md:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/terms-and-conditions"
            className="font-medium text-gray-300 hover:text-white transition-colors md:inline"
          >
            Terms & Conditions
          </Link>
          <span className="mx-2 hidden text-gray-600 md:inline" aria-hidden>
            ·
          </span>
          <p className="mt-1 text-gray-500 md:mt-0 md:inline">
            Part of China Travel Service Group, est. 1928
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
