'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

/* ═══════════════════════════════════════════════════════
   NAVBAR — 2026 Premium EdTech
   Psychology: Familiar pill-shaped nav reduces cognitive load.
   Glassmorphism on scroll = modern depth cue.
   Always starts transparent over hero, becomes frosted white on scroll.
   ═══════════════════════════════════════════════════════ */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const navLinks = [
    { name: t('Home', 'الرئيسية'), href: '/' },
    { name: t('About', 'من نحن'), href: '/about' },
    {
      name: t('Solutions', 'الحلول'),
      href: '/solutions',
      children: [
        { name: t('Smart LMS', 'نظام إدارة التعلم'), href: '/solutions/smart-lms' },
        { name: t('Animation Studio', 'استوديو الرسوم المتحركة'), href: '/solutions/animation-studio' },
        { name: t('School ERP', 'نظام إدارة المدرسة'), href: '/solutions/school-erp' },
        { name: t('Web Development', 'تطوير المواقع'), href: '/solutions/web-development' },
        { name: t('Mobile Apps', 'تطبيقات الجوال'), href: '/solutions/mobile-apps' },
      ],
    },
    {
      name: t('Services', 'الخدمات'),
      href: '/services',
      children: [
        { name: t('Cloud Hosting', 'الاستضافة السحابية'), href: '/services/cloud-hosting' },
        { name: t('Digital Marketing', 'التسويق الرقمي'), href: '/services/digital-marketing' },
        { name: t('Teacher Training', 'تدريب المعلمين'), href: '/services/teacher-training' },
        { name: t('Pricing Plan', 'خطة الأسعار'), href: '/pricing' },
      ],
    },
    { name: t('Contact', 'تواصل معنا'), href: '/contact' },
    {
      name: t('Pages', 'الصفحات'),
      href: '#',
      children: [
        { name: t('Team', 'الفريق'), href: '/team' },
        { name: t('FAQ', 'الأسئلة الشائعة'), href: '/faq' },
        { name: t('Blog', 'المدونة'), href: '/blog' },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > lastScrollY.current && y > 80);
      setScrolled(y > 10);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Shared text color class based on scroll state */
  const txt = scrolled ? 'text-[#0F172A]' : 'text-[#0F172A]';
  const txtMuted = scrolled ? 'text-[#64748B]' : 'text-[#64748B]';

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
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto mt-3 px-3 sm:px-5 py-2 rounded-full transition-all duration-300"
          style={{
            /* Soft off-white glass — always light since hero is light */
            background: scrolled
              ? 'rgba(255,255,255,0.82)'
              : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            boxShadow: scrolled
              ? '0 4px 30px rgba(15,23,42,0.08), 0 0 0 1px rgba(226,232,240,0.6)'
              : '0 4px 30px rgba(15,23,42,0.04), 0 0 0 1px rgba(226,232,240,0.3)',
          }}
        >
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-[#0F172A]/[0.04] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0A6B5C] to-[#0C7A6E] flex items-center justify-center font-heading font-bold text-sm text-white shadow-md shadow-[#0A6B5C]/20 flex-shrink-0">
                C
              </div>
              <span className={`font-heading font-bold text-sm hidden sm:inline whitespace-nowrap ${txt}`}>
                Cubico<span className="text-[#0A6B5C]">.tech</span>
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-[#E2E8F0] mx-1.5 hidden lg:block flex-shrink-0" />

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
                    className={`text-[13px] font-medium ${txtMuted} hover:text-[#0F172A] hover:bg-[#0F172A]/[0.04] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex items-center gap-1`}
                  >
                    {link.name}
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && openDropdown === link.name && (
                    <div className="absolute top-full left-0 pt-2 rtl:left-auto rtl:right-0">
                      <div
                        className="rounded-2xl py-2 min-w-[200px] border border-[#E2E8F0]"
                        style={{
                          background: 'rgba(255,255,255,0.92)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          boxShadow: '0 12px 40px rgba(15,23,42,0.1)',
                        }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-[13px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#0A6B5C]/[0.05] transition-colors"
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
            <div className="w-px h-5 bg-[#E2E8F0] mx-1.5 hidden lg:block flex-shrink-0" />

            {/* Language Toggle + CTAs */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              <LanguageToggle className="text-[#64748B] hover:text-[#0F172A]" />
              <Link
                href="/contact"
                className="text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] px-3.5 py-1.5 rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white/60 transition-all"
              >
                {t('Login', 'تسجيل الدخول')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#14B8A6] to-[#10B981] hover:from-[#0D9488] hover:to-[#059669] text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-sm shadow-teal-500/15 hover:shadow-md hover:shadow-teal-500/20"
              >
                {t('Book a Demo', 'احجز عرضاً')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#0F172A] hover:bg-[#0F172A]/[0.04] transition-colors ml-auto rtl:ml-0 rtl:mr-auto"
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
            className="fixed top-[72px] left-4 right-4 z-50 rounded-2xl border border-[#E2E8F0] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(15,23,42,0.1)',
            }}
          >
            <div className="px-5 py-5 space-y-1">
              <div className="flex justify-center pb-3 border-b border-[#F1F5F9] mb-2">
                <LanguageToggle className="text-[#64748B] hover:text-[#0F172A] text-sm" />
              </div>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => !link.children && setMobileMenuOpen(false)}
                    className="block text-[#334155] hover:text-[#0F172A] hover:bg-[#0A6B5C]/[0.05] font-medium transition-colors px-4 py-3 rounded-xl"
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="ps-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[#94A3B8] hover:text-[#0F172A] text-sm px-4 py-2 rounded-lg hover:bg-[#0A6B5C]/[0.04] transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white text-sm font-semibold w-full py-3 rounded-xl">
                  {t('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#334155] text-sm font-medium w-full py-3 rounded-xl hover:bg-[#F7F7F3]">
                  {t('Login', 'تسجيل الدخول')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
