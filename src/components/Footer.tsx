import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="CTS Tours" className="h-12 w-auto bg-white rounded px-2 py-1" />
            </div>
            <p className="text-gray-400 mb-4">China Travel Specialists for New Zealanders</p>
            <p className="text-gray-400 text-sm">98 Years Heritage | Direct China Operations | Authentic Access</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tours</h3>
            <ul className="space-y-2">
              <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors">All Tours</Link></li>
              <li><Link href="/tours/china/signature" className="text-gray-400 hover:text-white transition-colors">China Signature</Link></li>
              <li><Link href="/tours/china/discovery" className="text-gray-400 hover:text-white transition-colors">China Discovery</Link></li>
              <li><Link href="/tours/china/stopover" className="text-gray-400 hover:text-white transition-colors">China Stopover</Link></li>
              <li><Link href="/tailor-made" className="text-gray-400 hover:text-white transition-colors">Tailor Made</Link></li>
              <li><Link href="/tours/find" className="text-gray-400 hover:text-white transition-colors">Find Your Tour</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About CTS</Link></li>
              <li><Link href="/about/asian-escapes" className="text-gray-400 hover:text-white transition-colors">Asiascape Holidays</Link></li>
              <li><Link href="/experts/baker-gu" className="text-gray-400 hover:text-white transition-colors">Our Experts</Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">Travel Guide</Link></li>
              <li><Link href="/agents" className="text-gray-400 hover:text-white transition-colors">Agent Resources</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@ctstours.co.nz
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +64 9 123 4567
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Travel Street, Auckland, NZ
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CTS Tours. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Part of China Travel Service Group, est. 1928</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
