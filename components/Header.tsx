'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Film,
  Layers,
  Globe,
  Smartphone,
  Megaphone,
  Cloud,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

/* ═══════════════════════════════════════════════════════
   NAVBAR — 2026 Navy + Coral Premium EdTech
   Psychology: 4 items max = zero decision fatigue.
   Mega-dropdown groups products + services visually.
   Logo = Home. One bright CTA. Clean, scannable, fast.
   ═══════════════════════════════════════════════════════ */

/* Product/Service items for the mega-dropdown */
const products = [
  { icon: BookOpen, name: 'Smart LMS', nameAr: 'نظام التعلم الذكي', desc: 'Manage classes, lessons & progress', descAr: 'إدارة الفصول والدروس والتقدم', href: '/solutions/smart-lms', color: '#1E3A5F' },
  { icon: Layers, name: 'School ERP', nameAr: 'نظام إدارة المدرسة', desc: 'Fees, attendance, HR & operations', descAr: 'الرسوم والحضور والموارد البشرية', href: '/solutions/school-erp', color: '#172554' },
  { icon: Film, name: 'Animation Studio', nameAr: 'استوديو الرسوم', desc: 'Animated lessons in 3 languages', descAr: 'دروس متحركة بـ 3 لغات', href: '/solutions/animation-studio', color: '#8B5CF6' },
  { icon: Globe, name: 'Web Development', nameAr: 'تطوير المواقع', desc: 'School websites & parent portals', descAr: 'مواقع مدرسية وبوابات آباء', href: '/solutions/web-development', color: '#3B82F6' },
  { icon: Smartphone, name: 'Mobile App', nameAr: 'تطبيق الجوال', desc: 'Branded iOS & Android app', descAr: 'تطبيق iOS و Android بعلامتك', href: '/solutions/mobile-apps', color: '#F59E0B' },
];

const services = [
  { icon: Megaphone, name: 'Digital Marketing', nameAr: 'التسويق الرقمي', desc: 'Ads, SEO & enrollment funnels', descAr: 'إعلانات وتحسين بحث ومسارات تسجيل', href: '/services/digital-marketing', color: '#E8634A' },
  { icon: Cloud, name: 'Cloud Hosting', nameAr: 'الاستضافة السحابية', desc: 'Fast, secure school infrastructure', descAr: 'بنية تحتية سريعة وآمنة', href: '/services/cloud-hosting', color: '#6366F1' },
  { icon: GraduationCap, name: 'Teacher Training', nameAr: 'تدريب المعلمين', desc: 'Hands-on staff onboarding', descAr: 'تدريب عملي للموظفين', href: '/services/teacher-training', color: '#1E3A5F' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

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

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setSolutionsOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setSolutionsOpen(false), 150);
  };

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
          className="pointer-events-auto mt-3 w-full max-w-5xl px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(255,255,255,0.88)'
              : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
            boxShadow: scrolled
              ? '0 4px 30px rgba(15,23,42,0.10), 0 0 0 1px rgba(226,232,240,0.7)'
              : '0 4px 30px rgba(15,23,42,0.04), 0 0 0 1px rgba(226,232,240,0.3)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* ── Left: Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 py-1 rounded-xl hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#172554] flex items-center justify-center font-heading font-bold text-sm text-white shadow-md shadow-[#0F172A]/15">
                C
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-[15px] text-[#0F172A]">
                  Cubico<span className="text-[#E8634A]">.tech</span>
                </span>
              </div>
            </Link>

            {/* ── Center: Nav Links (desktop) ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Solutions — mega dropdown trigger */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`text-[13.5px] font-semibold text-[#475569] hover:text-[#0F172A] px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${solutionsOpen ? 'bg-[#E8634A]/[0.06] text-[#0F172A]' : 'hover:bg-[#0F172A]/[0.04]'}`}
                >
                  {t('Solutions', 'الحلول')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* ── Mega Dropdown ── */}
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div
                        className="rounded-2xl border border-[#E2E8F0] overflow-hidden w-[580px]"
                        style={{
                          background: 'rgba(255,255,255,0.96)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.5)',
                        }}
                      >
                        <div className="grid grid-cols-2">
                          {/* Left column — Products */}
                          <div className="p-4 border-r border-[#F1F5F9] rtl:border-r-0 rtl:border-l">
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#94A3B8] px-3 mb-2">{t('Products', 'المنتجات')}</p>
                            {products.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSolutionsOpen(false)}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                                  style={{ backgroundColor: `${item.color}10` }}>
                                  <item.icon size={16} style={{ color: item.color }} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#E8634A] transition-colors">{t(item.name, item.nameAr)}</p>
                                  <p className="text-[11.5px] text-[#94A3B8] leading-snug">{t(item.desc, item.descAr)}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Right column — Services */}
                          <div className="p-4">
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#94A3B8] px-3 mb-2">{t('Services', 'الخدمات')}</p>
                            {services.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSolutionsOpen(false)}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ backgroundColor: `${item.color}10` }}>
                                  <item.icon size={16} style={{ color: item.color }} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#E8634A] transition-colors">{t(item.name, item.nameAr)}</p>
                                  <p className="text-[11.5px] text-[#94A3B8] leading-snug">{t(item.desc, item.descAr)}</p>
                                </div>
                              </Link>
                            ))}

                            {/* View all link */}
                            <Link
                              href="/solutions"
                              onClick={() => setSolutionsOpen(false)}
                              className="flex items-center gap-1.5 px-3 py-2 mt-1 text-[12px] font-semibold text-[#E8634A] hover:text-[#D14F38] transition-colors"
                            >
                              {t('View all solutions', 'عرض جميع الحلول')}
                              <ArrowRight size={12} className="rtl:rotate-180" />
                            </Link>
                          </div>
                        </div>

                        {/* Bottom bar — quick CTA inside dropdown */}
                        <div className="border-t border-[#F1F5F9] bg-[#F8FAFC] px-5 py-3 flex items-center justify-between">
                          <p className="text-[12px] text-[#64748B]">{t('Not sure which solution?', 'لست متأكداً أي حل؟')}</p>
                          <Link
                            href="/contact"
                            onClick={() => setSolutionsOpen(false)}
                            className="text-[12px] font-bold text-[#E8634A] hover:text-[#D14F38] transition-colors flex items-center gap-1"
                          >
                            {t('Talk to us', 'تحدث معنا')} <ArrowRight size={11} className="rtl:rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className="text-[13.5px] font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#0F172A]/[0.04] px-3.5 py-2 rounded-xl transition-colors"
              >
                {t('About', 'من نحن')}
              </Link>

              <Link
                href="/pricing"
                className="text-[13.5px] font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#0F172A]/[0.04] px-3.5 py-2 rounded-xl transition-colors"
              >
                {t('Pricing', 'الأسعار')}
              </Link>

              <Link
                href="/contact"
                className="text-[13.5px] font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#0F172A]/[0.04] px-3.5 py-2 rounded-xl transition-colors"
              >
                {t('Contact', 'تواصل معنا')}
              </Link>
            </nav>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <LanguageToggle className="text-[#64748B] hover:text-[#0F172A]" />
              </div>

              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#E8634A] to-[#D14F38] hover:from-[#D14F38] hover:to-[#9A3412] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-[#E8634A]/15 hover:shadow-md hover:shadow-[#E8634A]/20"
              >
                {t('Book a Demo', 'احجز عرضاً')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#0F172A] hover:bg-[#0F172A]/[0.05] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* ═══════ MOBILE MENU ═══════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[76px] left-3 right-3 z-50 rounded-2xl border border-[#E2E8F0] overflow-hidden max-h-[calc(100vh-96px)] overflow-y-auto"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 20px 60px rgba(15,23,42,0.12)',
            }}
          >
            <div className="p-5">
              {/* Language toggle */}
              <div className="flex justify-center pb-4 mb-3 border-b border-[#F1F5F9]">
                <LanguageToggle className="text-[#64748B] hover:text-[#0F172A] text-sm" />
              </div>

              {/* Solutions — expandable */}
              <div className="mb-1">
                <button
                  onClick={() => setMobileSection(mobileSection === 'solutions' ? null : 'solutions')}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[#0F172A] font-semibold hover:bg-[#EFF6FF] transition-colors"
                >
                  {t('Solutions', 'الحلول')}
                  <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${mobileSection === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileSection === 'solutions' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-2">
                        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#94A3B8] px-3 pt-2 pb-1">{t('Products', 'المنتجات')}</p>
                        {products.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${item.color}10` }}>
                              <item.icon size={16} style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A]">{t(item.name, item.nameAr)}</p>
                              <p className="text-[11px] text-[#94A3B8]">{t(item.desc, item.descAr)}</p>
                            </div>
                          </Link>
                        ))}
                        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#94A3B8] px-3 pt-3 pb-1">{t('Services', 'الخدمات')}</p>
                        {services.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${item.color}10` }}>
                              <item.icon size={16} style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A]">{t(item.name, item.nameAr)}</p>
                              <p className="text-[11px] text-[#94A3B8]">{t(item.desc, item.descAr)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple links */}
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-[#0F172A] font-semibold hover:bg-[#EFF6FF] transition-colors">
                {t('About', 'من نحن')}
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-[#0F172A] font-semibold hover:bg-[#EFF6FF] transition-colors">
                {t('Pricing', 'الأسعار')}
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-[#0F172A] font-semibold hover:bg-[#EFF6FF] transition-colors">
                {t('Contact', 'تواصل معنا')}
              </Link>

              {/* CTAs */}
              <div className="pt-4 mt-3 border-t border-[#F1F5F9] space-y-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#E8634A] to-[#D14F38] text-white text-sm font-semibold w-full py-3.5 rounded-xl shadow-sm">
                  {t('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
