'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const QUICK_DESTINATIONS = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: "Xi'an", value: 'xian' },
  { label: 'Chengdu', value: 'chengdu' },
  { label: 'Guilin', value: 'guilin' },
  { label: 'Yunnan', value: 'yunnan' },
  { label: 'Zhangjiajie', value: 'zhangjiajie' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const destTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleNavClick = () => {
    setIsNavigating(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsToursDropdownOpen(false);
    setActiveDestination(null);
    setIsSearchOpen(false);
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

  // 打开搜索时自动聚焦输入框
  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  // Escape 关闭搜索面板
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    // 打开搜索时关闭汉堡菜单，避免两者同时展开
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/tours/find?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleQuickDest = (value: string) => {
    router.push(`/tours/find?destination=${value}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

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

  const [mobileExpandedDest, setMobileExpandedDest] = useState<string | null>(null);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-warm-200/50">
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary via-red-500 to-primary animate-pulse w-full"></div>
      )}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="CTS Tours" width={180} height={48} className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* About - First Item */}
          <Link href="/about" className="text-accent hover:text-primary transition-colors font-medium">
            About
          </Link>

          <Link
            href="/campaigns/october-2026"
            className="text-accent hover:text-primary transition-colors font-medium inline-flex items-center gap-2 rounded-lg py-1 -my-1"
            onClick={handleNavClick}
          >
            <span>Spotlight</span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ring-1 ring-white/30">
              Hot
            </span>
          </Link>

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
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100/80 py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/tours" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={() => { setIsToursDropdownOpen(false); handleNavClick(); }}>
                  All Tours
                </Link>
                <Link href="/tours/find" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={() => { setIsToursDropdownOpen(false); handleNavClick(); }}>
                  Find Your Tour
                </Link>
                <Link href="/china-tours" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors font-medium text-primary" onClick={() => { setIsToursDropdownOpen(false); handleNavClick(); }}>
                  💫 China Tours Hub
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <p className="px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wider">Destinations</p>
                {destinations.map((dest) => (
                  <div key={dest.href} className="relative"
                    onMouseEnter={() => handleDestMouseEnter(dest.slug)}
                    onMouseLeave={handleDestMouseLeave}
                  >
                    <Link href={dest.href}
                      className="flex items-center justify-between px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors"
                      onClick={() => {
                        setIsToursDropdownOpen(false);
                        handleNavClick();
                      }}
                    >
                      {dest.label}
                      {dest.tiers.length > 0 && (
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                    {dest.tiers.length > 0 && activeDestination === dest.slug && (
                      <div
                        className="absolute left-full top-0 ml-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100/80 py-2"
                        onMouseEnter={() => handleDestMouseEnter(dest.slug)}
                        onMouseLeave={handleDestMouseLeave}
                      >
                        <Link href={dest.href}
                          className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors font-medium"
                          onClick={() => { setIsToursDropdownOpen(false); setActiveDestination(null); }}
                        >
                          All {dest.label} Tours
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        {dest.tiers.map((tier) => (
                          <Link key={tier.href} href={tier.href}
                            className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors"
                            onClick={() => { setIsToursDropdownOpen(false); setActiveDestination(null); }}
                          >
                            {tier.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tailor Made - Top Level */}
          <Link href="/tailor-made" className="text-accent hover:text-primary transition-colors font-medium">
            Tailor Made
          </Link>

          {/* Travel Guide Dropdown */}
          <div className="relative group">
            <Link href="/guide" prefetch={false} className="flex items-center gap-1 text-accent hover:text-primary transition-colors font-medium" onClick={handleNavClick}>
              Travel Guide
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100/80 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/guide" prefetch={false} className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors font-medium" onClick={handleNavClick}>
                All Travel Guides
              </Link>
              <Link href="/blog" prefetch={false} className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={handleNavClick}>
                Travel Blog
              </Link>
              <div className="border-t border-gray-100 my-1.5 mx-3" />
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Resources</p>
              <Link href="/best-time-to-visit-china" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={handleNavClick}>
                Best Time to Visit
              </Link>
              <Link href="/china-visa-guide-for-new-zealanders" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={handleNavClick}>
                China Entry (NZ)
              </Link>
              <Link href="/faq" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={handleNavClick}>
                FAQ
              </Link>
              <Link href="/travel-tools" className="block px-4 py-2.5 text-accent hover:bg-warm-50 hover:text-primary transition-colors" onClick={handleNavClick}>
                Travel Tools
              </Link>
            </div>
          </div>
          <Link href="/agents" className="text-accent hover:text-primary transition-colors font-medium">
            Agents
          </Link>
          <Link href="/contact" className="text-accent hover:text-primary transition-colors font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* 桌面搜索图标 */}
          <button
            onClick={toggleSearch}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-primary/10 text-primary' : 'text-accent hover:text-primary hover:bg-warm-100'}`}
          >
            {isSearchOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
          <Link href="/contact" className="bg-gradient-to-r from-primary to-red-500 text-white px-6 py-2.5 rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all font-medium hover:-translate-y-0.5 hover:scale-105 animate-pulse-glow">
            Plan Your Journey
          </Link>
        </div>

        {/* Mobile：搜索图标 + 汉堡按钮 */}
        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggleSearch}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'text-primary' : 'text-accent hover:text-primary'}`}
          >
            {isSearchOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
          <button onClick={toggleMenu} className="text-accent p-2" aria-label="Toggle menu">
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

      {/* ===== 搜索面板（桌面 + 移动端共用）===== */}
      {isSearchOpen && (
        <div className="border-t border-warm-200/60 bg-white animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            {/* 搜索输入框 */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 bg-warm-50 rounded-xl px-4 py-3 border border-warm-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, tours, experiences..."
                  className="flex-1 bg-transparent outline-none text-accent placeholder-gray-400 text-base"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* 快速目的地选择 */}
            <div className="max-w-2xl mx-auto mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider flex-shrink-0">Quick:</span>
              {QUICK_DESTINATIONS.map((dest) => (
                <button
                  key={dest.value}
                  onClick={() => handleQuickDest(dest.value)}
                  className="text-sm px-3 py-1 rounded-full bg-warm-100 text-accent hover:bg-primary hover:text-white transition-colors border border-warm-200 hover:border-primary"
                >
                  {dest.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <div>
              <button onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className="flex items-center justify-between w-full text-accent hover:text-primary transition-colors font-medium py-2">
                Tours
                <svg className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isToursDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-secondary/30 ml-2">
                  <Link href="/tours" className="block text-accent hover:text-primary transition-colors py-2" onClick={closeMenu}>All Tours</Link>
                  <Link href="/tours/find" className="block text-accent hover:text-primary transition-colors py-2" onClick={closeMenu}>Find Your Tour</Link>
                  {destinations.map((dest) => (
                    <div key={dest.href}>
                      {dest.tiers.length > 0 ? (
                        <>
                          <button onClick={() => setMobileExpandedDest(mobileExpandedDest === dest.slug ? null : dest.slug)}
                            className="flex items-center justify-between w-full text-accent hover:text-primary transition-colors py-2">
                            {dest.label}
                            <svg className={`w-3 h-3 transition-transform ${mobileExpandedDest === dest.slug ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          {mobileExpandedDest === dest.slug && (
                            <div className="pl-4 space-y-1">
                              <Link href={dest.href} className="block text-sm text-accent hover:text-primary py-1.5" onClick={() => { closeMenu(); handleNavClick(); }}>All {dest.label} Tours</Link>
                              {dest.tiers.map((tier) => (
                                <Link key={tier.href} href={tier.href} className="block text-sm text-accent hover:text-primary py-1.5" onClick={() => { closeMenu(); handleNavClick(); }}>{tier.label}</Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={dest.href} className="block text-accent hover:text-primary transition-colors py-2" onClick={() => { closeMenu(); handleNavClick(); }}>{dest.label}</Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button onClick={() => setMobileExpandedDest('guides')}
                className="flex items-center justify-between w-full text-accent hover:text-primary transition-colors font-medium py-2">
                Travel Guide
                <svg className={`w-4 h-4 transition-transform ${mobileExpandedDest === 'guides' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpandedDest === 'guides' && (
                <div className="pl-4 mt-1 border-l-2 border-warm-200 ml-2">
                  <Link href="/guide" prefetch={false} className="block text-accent hover:text-primary transition-colors py-2.5 font-medium" onClick={closeMenu}>
                    All Travel Guides
                  </Link>
                  <Link href="/blog" prefetch={false} className="block text-accent hover:text-primary transition-colors py-2.5" onClick={closeMenu}>
                    Travel Blog
                  </Link>
                  <div className="border-t border-gray-100 my-1.5 mr-3" />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 pb-1 pt-0.5">Resources</p>
                  <Link href="/best-time-to-visit-china" className="block text-accent hover:text-primary transition-colors py-2.5" onClick={closeMenu}>Best Time to Visit</Link>
                  <Link href="/china-visa-guide-for-new-zealanders" className="block text-accent hover:text-primary transition-colors py-2.5" onClick={closeMenu}>China Entry (NZ)</Link>
                  <Link href="/faq" className="block text-accent hover:text-primary transition-colors py-2.5" onClick={closeMenu}>FAQ</Link>
                  <Link href="/travel-tools" className="block text-accent hover:text-primary transition-colors py-2.5" onClick={closeMenu}>Travel Tools</Link>
                </div>
              )}
            </div>

            <Link href="/tailor-made" className="text-accent hover:text-primary transition-colors font-medium py-2" onClick={closeMenu}>
              Tailor Made
            </Link>
            <Link href="/about" className="text-accent hover:text-primary transition-colors font-medium py-2" onClick={closeMenu}>About</Link>
            <Link
              href="/campaigns/october-2026"
              className="text-accent hover:text-primary transition-colors font-medium py-2 inline-flex items-center justify-between gap-2"
              onClick={() => {
                closeMenu();
                handleNavClick();
              }}
            >
              <span>Spotlight</span>
              <span className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                Hot
              </span>
            </Link>
            <Link href="/agents" className="text-accent hover:text-primary transition-colors font-medium py-2" onClick={closeMenu}>Agents</Link>
            <Link href="/contact" className="text-accent hover:text-primary transition-colors font-medium py-2" onClick={closeMenu}>Contact</Link>
            <Link href="/contact" className="bg-primary text-white text-center py-3 rounded-full font-medium mt-2" onClick={closeMenu}>Plan Your Journey</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
