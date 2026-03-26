'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

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
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      setScrolled(y > 20);
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
        {/* Glassmorphism navbar — becomes more opaque on scroll for readability */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto mt-3 px-3 sm:px-5 py-2 rounded-full"
          style={{
            background: scrolled
              ? 'rgba(248, 250, 252, 0.85)'
              : 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(20,184,166,0.12)'
              : '0 8px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(20,184,166,0.1)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className={`flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full transition-colors ${
              scrolled ? 'hover:bg-navy-900/[0.04]' : 'hover:bg-white/[0.06]'
            }`}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#10B981] flex items-center justify-center font-heading font-bold text-sm text-white shadow-lg shadow-teal-600/25 flex-shrink-0">
                C
              </div>
              <span className={`font-heading font-bold text-sm hidden sm:inline whitespace-nowrap ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}>
                Cubico<span className={scrolled ? 'text-teal-600' : 'text-teal-300'}>.tech</span>
              </span>
            </Link>

            {/* Divider */}
            <div className={`w-px h-5 mx-1.5 hidden lg:block flex-shrink-0 ${
              scrolled ? 'bg-navy-200' : 'bg-white/[0.1]'
            }`} />

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
                    className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex items-center gap-1 ${
                      scrolled
                        ? 'text-navy-500 hover:text-navy-900 hover:bg-navy-100'
                        : 'text-white/55 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {link.name}
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && openDropdown === link.name && (
                    <div className="absolute top-full left-0 pt-2 rtl:left-auto rtl:right-0">
                      <div className="bg-white/95 backdrop-blur-xl rounded-xl border border-navy-100 shadow-2xl py-2 min-w-[180px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-[13px] text-navy-500 hover:text-navy-900 hover:bg-primary-50 transition-colors"
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
            <div className={`w-px h-5 mx-1.5 hidden lg:block flex-shrink-0 ${
              scrolled ? 'bg-navy-200' : 'bg-white/[0.1]'
            }`} />

            {/* Language Toggle + CTAs */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              <LanguageToggle className={scrolled ? 'text-navy-500 hover:text-navy-900' : 'text-white/55 hover:text-white'} />
              <Link
                href="/contact"
                className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  scrolled
                    ? 'text-navy-600 hover:text-navy-900 border border-navy-200 hover:border-navy-300 hover:bg-navy-50'
                    : 'text-white/70 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.05]'
                }`}
              >
                {t('Login', 'تسجيل الدخول')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#14B8A6] to-[#10B981] hover:from-[#0D9488] hover:to-[#059669] text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              >
                {t('Book a Demo', 'احجز عرضاً')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ml-auto rtl:ml-0 rtl:mr-auto ${
                scrolled ? 'text-navy-900 hover:bg-navy-100' : 'text-white hover:bg-white/[0.08]'
              }`}
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
            className="fixed top-[72px] left-4 right-4 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-navy-100 shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {/* Mobile Language Toggle */}
              <div className="flex justify-center pb-3 border-b border-navy-100 mb-2">
                <LanguageToggle className="text-navy-500 hover:text-navy-900 text-sm" />
              </div>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => !link.children && setMobileMenuOpen(false)}
                    className="block text-navy-600 hover:text-navy-900 hover:bg-primary-50 font-medium transition-colors px-4 py-3 rounded-xl"
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
                          className="block text-navy-400 hover:text-navy-900 text-sm px-4 py-2 rounded-lg hover:bg-primary-50/50 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-navy-100 space-y-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white text-sm font-semibold w-full py-3 rounded-xl transition-colors">
                  {t('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 border border-navy-200 text-navy-600 text-sm font-semibold w-full py-3 rounded-xl transition-colors hover:bg-navy-50">
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
