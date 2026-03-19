import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="CTS Tours" className="h-12 w-auto bg-white rounded px-2 py-1" />
            </div>
            <p className="text-gray-400 mb-4">China Travel Specialists for New Zealanders</p>
            <p className="text-gray-400">98 Years Heritage | Direct China Operations | Authentic Access</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="text-gray-400 hover:text-white transition-colors">Explore China</Link></li>
              <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors">Tours</Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">Travel Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              <li><Link href="/experts/baker-gu" className="text-gray-400 hover:text-white transition-colors">Our Experts</Link></li>
              <li><Link href="/agents" className="text-gray-400 hover:text-white transition-colors">Agent Resources</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Email: info@ctstours.co.nz</p>
            <p className="text-gray-400">Phone: +64 9 123 4567</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CTS Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;