'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/explore', label: 'Explore China' },
    { href: '/guide', label: 'Travel Guide' },
    { href: '/tours', label: 'Tours' },
    { href: '/experts/baker-gu', label: 'Baker Gu' },
    { href: '/agents', label: 'Agents' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="text-primary text-2xl font-bold font-serif">CTS Tours</div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
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
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-accent hover:text-primary transition-colors font-medium py-2"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
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