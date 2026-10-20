import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Data Science', href: '#datascience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section based on scroll offset
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 inset-x-0 z-40 mx-auto w-[94%] max-w-6xl transition-all duration-300 ${
          isScrolled ? 'top-3' : 'top-5'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="relative px-4 sm:px-6 py-3 rounded-2xl glass-nav border border-white/10 flex items-center justify-between shadow-2xl transition-all duration-300"
          style={{
            boxShadow: isScrolled
              ? '0 12px 36px -10px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(139, 92, 246, 0.25)'
              : '0 8px 30px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Brand Mark JR Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1 py-0.5"
            aria-label="Jagan Kumar Rath - Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-b from-[#22104b] to-[#08021c] border border-white/20 flex items-center justify-center shadow-md group-hover:border-purple-400/60 transition-colors">
              <span className="font-heading font-black text-sm silver-gradient-text tracking-tight">
                JR
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold tracking-wider text-slate-100 group-hover:text-purple-300 transition-colors block">
                JAGAN
              </span>
              <span className="text-[9px] font-mono text-purple-300/70 tracking-widest uppercase block">
                BEYOND THE CODE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-violet-300 shadow-[0_0_10px_#a855f7]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Direct Connect CTA */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="relative group hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600/80 to-violet-600/80 hover:from-purple-500 hover:to-violet-500 border border-purple-400/30 shadow-lg shadow-purple-950/40 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation (z-50 above everything) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <div className="relative z-10 mx-4 mt-20 max-h-[calc(100vh-6.5rem)] overflow-y-auto p-5 rounded-2xl glass-nav border border-white/15 shadow-2xl flex flex-col space-y-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                Navigation Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-1 pt-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-3 min-h-[48px] flex items-center rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-purple-600/30 text-white border border-purple-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 border border-purple-400/40 shadow-lg active:scale-[0.98]"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

