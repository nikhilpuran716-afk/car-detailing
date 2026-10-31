import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { DEMO_CONTACT } from '../data/siteData';

interface NavbarProps {
  onBookNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'About', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#08080A]/92 backdrop-blur-md border-white/10'
          : 'bg-[#08080A]/80 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-lg md:text-xl font-bold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5500]"
        >
          APEX AUTO DETAILING
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5500] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5500]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Desktop) + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookNowClick();
            }}
            className="px-5 py-2.5 text-xs md:text-sm font-semibold tracking-wide text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.99] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
          >
            BOOK NOW
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-200 hover:text-white hover:bg-white/5 border border-white/10 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5500]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0F14] border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-3 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <a
              href={DEMO_CONTACT.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md border border-white/15 text-sm font-medium text-slate-200 hover:text-white hover:border-white/30 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF5500]" />
              <span>Call {DEMO_CONTACT.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full py-3 px-4 rounded-md bg-[#FF5500] hover:bg-[#E04800] text-sm font-semibold text-white tracking-wide transition-colors cursor-pointer"
            >
              BOOK YOUR DETAIL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
