'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Pricing Plan', href: '/pricing' },
    ],
  },
  { name: 'Contact', href: '/contact' },
  {
    name: 'Pages',
    href: '#',
    children: [
      { name: 'Team', href: '/team' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Blog', href: '/blog' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-4"
        style={{
          transform: navHidden ? 'translateY(-120%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto mt-3 px-3 sm:px-5 py-2 rounded-full"
          style={{
            background: 'rgba(18,18,20,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(232,140,50,0.1)',
          }}
        >
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center font-heading font-bold text-sm text-white shadow-lg shadow-orange-600/25 flex-shrink-0">
                C
              </div>
              <span className="font-heading font-bold text-sm text-white hidden sm:inline whitespace-nowrap">
                Cubico<span className="text-orange-300">.tech</span>
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] mx-1.5 hidden lg:block flex-shrink-0" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/55 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    {link.name}
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && openDropdown === link.name && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-[#1a1a1e]/95 backdrop-blur-xl rounded-xl border border-orange-500/[0.12] shadow-2xl py-2 min-w-[180px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-[13px] text-white/55 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] mx-1.5 hidden lg:block flex-shrink-0" />

            {/* CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] hover:from-[#C0630F] hover:to-[#D4711A] text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,140,50,0.4)]"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/[0.08] transition-colors ml-auto"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-50 bg-[#1a1a1e]/95 backdrop-blur-xl rounded-2xl border border-orange-500/[0.12] shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => !link.children && setMobileMenuOpen(false)}
                    className="block text-white/70 hover:text-white hover:bg-white/[0.06] font-medium transition-colors px-4 py-3 rounded-xl"
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-white/45 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/[0.08]">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-sm font-semibold w-full py-3 rounded-xl transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
