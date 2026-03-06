import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="text-primary text-2xl font-bold font-serif">CTS Tours</div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-accent hover:text-primary transition-colors font-medium">Explore China</Link>
          <Link href="/guide" className="text-accent hover:text-primary transition-colors font-medium">Travel Guide</Link>
          <Link href="/tours" className="text-accent hover:text-primary transition-colors font-medium">Tours</Link>
          <Link href="/experts/baker-gu" className="text-accent hover:text-primary transition-colors font-medium">Baker Gu</Link>
          <Link href="/agents" className="text-accent hover:text-primary transition-colors font-medium">Agents</Link>
          <Link href="/contact" className="text-accent hover:text-primary transition-colors font-medium">Contact</Link>
        </nav>
        
        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary">Plan Your Journey</Link>
        </div>
        
        <div className="md:hidden">
          <button className="text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;