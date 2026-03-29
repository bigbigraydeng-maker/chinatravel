'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsToursDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsToursDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsToursDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const destinations = [
    { href: '/tours/china', label: 'China' },
    { href: '/tours/japan', label: 'Japan' },
    { href: '/tours/vietnam', label: 'Vietnam' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="CTS Tours" className="h-12 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Tours Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center gap-1 text-accent hover:text-primary transition-colors font-medium"
              onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
            >
              Tours
              <svg className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isToursDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href="/tours"
                  className="block px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  All Tours
                </Link>
                <Link 
                  href="/tours/find"
                  className="block px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  Find Your Tour
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                {destinations.map((dest) => (
                  <Link 
                    key={dest.href}
                    href={dest.href}
                    className="block px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors"
                    onClick={() => setIsToursDropdownOpen(false)}
                  >
                    {dest.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/guide"
            className="text-accent hover:text-primary transition-colors font-medium"
          >
            Travel Guide
          </Link>
          <Link 
            href="/about"
            className="text-accent hover:text-primary transition-colors font-medium"
          >
            About
          </Link>
          <Link 
            href="/agents"
            className="text-accent hover:text-primary transition-colors font-medium"
          >
            Agents
          </Link>
          <Link 
            href="/contact"
            className="text-accent hover:text-primary transition-colors font-medium"
          >
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary">Plan Your Journey</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-accent p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {/* Mobile Tours Section */}
            <div>
              <button 
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className="flex items-center justify-between w-full text-accent hover:text-primary transition-colors font-medium py-2"
              >
                Tours
                <svg className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isToursDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/tours"
                    className="block text-accent hover:text-primary transition-colors py-2"
                    onClick={closeMenu}
                  >
                    All Tours
                  </Link>
                  {destinations.map((dest) => (
                    <Link 
                      key={dest.href}
                      href={dest.href}
                      className="block text-accent hover:text-primary transition-colors py-2"
                      onClick={closeMenu}
                    >
                      {dest.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/guide"
              className="text-accent hover:text-primary transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Travel Guide
            </Link>
            <Link 
              href="/about"
              className="text-accent hover:text-primary transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/agents"
              className="text-accent hover:text-primary transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Agents
            </Link>
            <Link 
              href="/contact"
              className="text-accent hover:text-primary transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="btn-primary text-center mt-2"
              onClick={closeMenu}
            >
              Plan Your Journey
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
