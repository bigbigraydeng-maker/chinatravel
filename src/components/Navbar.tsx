'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const destTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsToursDropdownOpen(false);
    setActiveDestination(null);
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
      setActiveDestination(null);
    }, 150);
  };

  const handleDestMouseEnter = (slug: string) => {
    if (destTimeoutRef.current) {
      clearTimeout(destTimeoutRef.current);
      destTimeoutRef.current = null;
    }
    setActiveDestination(slug);
  };

  const handleDestMouseLeave = () => {
    destTimeoutRef.current = setTimeout(() => {
      setActiveDestination(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (destTimeoutRef.current) clearTimeout(destTimeoutRef.current);
    };
  }, []);

  const destinations = [
    {
      href: '/tours/china',
      label: 'China',
      slug: 'china',
      tiers: [
        { href: '/tours/china/signature', label: 'Signature' },
        { href: '/tours/china/discovery', label: 'Discovery' },
        { href: '/tours/china/stopover', label: 'Stopover' },
      ],
    },
    { href: '/tours/japan', label: 'Japan', slug: 'japan', tiers: [] },
    { href: '/tours/vietnam', label: 'Vietnam', slug: 'vietnam', tiers: [] },
  ];

  // Mobile accordion state for destinations
  const [mobileExpandedDest, setMobileExpandedDest] = useState<string | null>(null);

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
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
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
                <p className="px-4 py-1 text-xs text-gray-400 uppercase tracking-wider">Destinations</p>
                {destinations.map((dest) => (
                  <div
                    key={dest.href}
                    className="relative"
                    onMouseEnter={() => handleDestMouseEnter(dest.slug)}
                    onMouseLeave={handleDestMouseLeave}
                  >
                    <Link
                      href={dest.href}
                      className="flex items-center justify-between px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsToursDropdownOpen(false)}
                    >
                      {dest.label}
                      {dest.tiers.length > 0 && (
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                    {/* Sub-menu for tiers */}
                    {dest.tiers.length > 0 && activeDestination === dest.slug && (
                      <div
                        className="absolute left-full top-0 ml-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                        onMouseEnter={() => handleDestMouseEnter(dest.slug)}
                        onMouseLeave={handleDestMouseLeave}
                      >
                        <Link
                          href={dest.href}
                          className="block px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors font-medium"
                          onClick={() => { setIsToursDropdownOpen(false); setActiveDestination(null); }}
                        >
                          All {dest.label} Tours
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        {dest.tiers.map((tier) => (
                          <Link
                            key={tier.href}
                            href={tier.href}
                            className="block px-4 py-2 text-accent hover:bg-gray-50 hover:text-primary transition-colors"
                            onClick={() => { setIsToursDropdownOpen(false); setActiveDestination(null); }}
                          >
                            {tier.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  href="/tailor-made"
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 transition-colors font-medium"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Tailor Made
                </Link>
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
          <Link href="/tailor-made" className="btn-primary">Tailor My Trip</Link>
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
                <div className="pl-4 mt-2 space-y-1">
                  <Link
                    href="/tours"
                    className="block text-accent hover:text-primary transition-colors py-2"
                    onClick={closeMenu}
                  >
                    All Tours
                  </Link>
                  <Link
                    href="/tours/find"
                    className="block text-accent hover:text-primary transition-colors py-2"
                    onClick={closeMenu}
                  >
                    Find Your Tour
                  </Link>
                  {destinations.map((dest) => (
                    <div key={dest.href}>
                      {dest.tiers.length > 0 ? (
                        <>
                          <button
                            onClick={() => setMobileExpandedDest(mobileExpandedDest === dest.slug ? null : dest.slug)}
                            className="flex items-center justify-between w-full text-accent hover:text-primary transition-colors py-2"
                          >
                            {dest.label}
                            <svg className={`w-3 h-3 transition-transform ${mobileExpandedDest === dest.slug ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          {mobileExpandedDest === dest.slug && (
                            <div className="pl-4 space-y-1">
                              <Link href={dest.href} className="block text-sm text-accent hover:text-primary py-1.5" onClick={closeMenu}>
                                All {dest.label} Tours
                              </Link>
                              {dest.tiers.map((tier) => (
                                <Link key={tier.href} href={tier.href} className="block text-sm text-accent hover:text-primary py-1.5" onClick={closeMenu}>
                                  {tier.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={dest.href} className="block text-accent hover:text-primary transition-colors py-2" onClick={closeMenu}>
                          {dest.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/tailor-made"
                    className="block text-primary font-medium hover:text-primary/80 transition-colors py-2"
                    onClick={closeMenu}
                  >
                    Tailor Made
                  </Link>
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
              href="/tailor-made"
              className="btn-primary text-center mt-2"
              onClick={closeMenu}
            >
              Tailor My Trip
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
