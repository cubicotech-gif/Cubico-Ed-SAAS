'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */
interface LS { en: string; ar: string } // bilingual string pair

interface Slide {
  word:      LS;
  sub:       LS;
  bgImage:   string;
  fallbackBg: string;
  story: {
    name:  LS;
    type:  LS;
    icon:  string;
    quote: LS;
    tag:   LS;
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   SLIDE DATA  (all bilingual)
   ───────────────────────────────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    word: { en: 'websites', ar: 'مواقع الويب' },
    sub:  {
      en: 'A school website that works as hard as your admissions team — fast, professional, and built to convert.',
      ar: 'موقع مدرسي يعمل بجد فريق القبول تماماً — سريع واحترافي ومُصمَّم للتحويل.',
    },
    bgImage:    '/images/hero/hero-websites.jpg',
    fallbackBg: '#161e30',
    story: {
      name:  { en: 'MSL School',       ar: 'مدرسة MSL' },
      type:  { en: 'Clifton, Karachi', ar: 'كليفتون، كراتشي' },
      icon:  '🏫',
      quote: {
        en: "MSL's new website boosted inquiry submissions 3× in the first month.",
        ar: 'رفع الموقع الجديد لمدرسة MSL نسبة الاستفسارات 3 أضعاف في أول شهر.',
      },
      tag: { en: 'Website', ar: 'موقع ويب' },
    },
  },
  {
    word: { en: 'management', ar: 'إدارة المدرسة' },
    sub:  {
      en: 'End-to-end school management — attendance, fees, timetables, and parent communication in one platform.',
      ar: 'إدارة مدرسية شاملة — الحضور والرسوم والجداول وتواصل الأولياء في منصة واحدة.',
    },
    bgImage:    '/images/hero/hero-management.jpg',
    fallbackBg: '#0e1626',
    story: {
      name:  { en: 'Al-Huffaz Academy', ar: 'أكاديمية الحفاظ' },
      type:  { en: 'Karachi',           ar: 'كراتشي' },
      icon:  '📋',
      quote: {
        en: 'Moved from WhatsApp groups to a full digital admin system in 4 weeks.',
        ar: 'الانتقال من مجموعات واتساب إلى نظام إداري رقمي كامل في 4 أسابيع.',
      },
      tag: { en: 'Management', ar: 'الإدارة' },
    },
  },
  {
    word: { en: 'learning', ar: 'التعلّم' },
    sub:  {
      en: 'Custom LMS where teachers teach, students learn, and principals track progress — entirely online.',
      ar: 'نظام تعلم مخصص يُدرّس فيه المعلمون ويتعلم الطلاب ويتابع المديرون التقدم — بالكامل عبر الإنترنت.',
    },
    bgImage:    '/images/hero/hero-learning.jpg',
    fallbackBg: '#12102e',
    story: {
      name:  { en: 'Cornwall Islamic', ar: 'كورنوول الإسلامية' },
      type:  { en: 'Foundation',       ar: 'مؤسسة' },
      icon:  '📚',
      quote: {
        en: '300+ students now on a live Moodle LMS with built-in class supervision.',
        ar: 'أكثر من 300 طالب على نظام Moodle مباشر مع إشراف صفي مدمج.',
      },
      tag: { en: 'LMS', ar: 'نظام التعلم' },
    },
  },
  {
    word: { en: 'animation', ar: 'الرسوم المتحركة' },
    sub:  {
      en: 'Animated lesson content that makes complex topics visual, engaging, and memorable for students.',
      ar: 'محتوى دروس متحرك يجعل الموضوعات المعقدة مرئية وجذابة ولا تُنسى للطلاب.',
    },
    bgImage:    '/images/hero/hero-animation.jpg',
    fallbackBg: '#1a0a24',
    story: {
      name:  { en: 'Cubico Studio',        ar: 'استوديو كيوبيكو' },
      type:  { en: 'Content & Animation',  ar: 'المحتوى والرسوم' },
      icon:  '🎬',
      quote: {
        en: 'Animated modules increased student engagement scores by +40%.',
        ar: 'رفعت الوحدات المتحركة درجات تفاعل الطلاب بنسبة +40%.',
      },
      tag: { en: 'Animation', ar: 'الرسوم' },
    },
  },
  {
    word: { en: 'marketing', ar: 'التسويق' },
    sub:  {
      en: 'Digital marketing that fills your classrooms — SEO, social, and ad campaigns built specifically for schools.',
      ar: 'تسويق رقمي يملأ فصولك — تحسين محركات البحث والحملات الإعلانية المُصمَّمة خصيصاً للمدارس.',
    },
    bgImage:    '/images/hero/hero-marketing.jpg',
    fallbackBg: '#0c1a16',
    story: {
      name:  { en: 'Cubico Creative',  ar: 'كيوبيكو كريتيف' },
      type:  { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
      icon:  '📣',
      quote: {
        en: 'School clients saw 2× more admission inquiries within 60 days.',
        ar: 'حقق عملاء المدارس ضعف استفسارات القبول خلال 60 يوماً.',
      },
      tag: { en: 'Marketing', ar: 'التسويق' },
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NAV LINKS  (mapped to real routes)
   ───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS: Array<{ en: string; ar: string; href: string }> = [
  { en: 'Services',  ar: 'الخدمات',  href: '/services'  },
  { en: 'Solutions', ar: 'الحلول',   href: '/solutions' },
  { en: 'Work',      ar: 'أعمالنا',  href: '/about'     },
  { en: 'Company',   ar: 'الشركة',   href: '/about'     },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────────────────────── */
const TOTAL  = SLIDES.length;
const NAV_H  = 64;   // px — navbar height
const LINE_H = 72;   // px — one word-slot height in the drum

/* ─────────────────────────────────────────────────────────────────────────────
   WORD ANIMATION VARIANTS  (direction-aware slot-machine)
   dir > 0 = forward  →  enter from below, exit to top
   dir < 0 = backward →  enter from above, exit to bottom
   ───────────────────────────────────────────────────────────────────────────── */
const DRUM_EASE: [number, number, number, number] = [0.77, 0, 0.18, 1];
const EXIT_EASE: [number, number, number, number] = [0.4,  0, 1,    1];

const wordVariants = {
  enter: (dir: number) => ({
    y:       dir > 0 ?  LINE_H * 0.8 : -LINE_H * 0.8,
    opacity: 0,
  }),
  center: {
    y:          0,
    opacity:    1,
    transition: { duration: 0.72, ease: DRUM_EASE },
  },
  exit: (dir: number) => ({
    y:          dir > 0 ? -LINE_H * 0.8 : LINE_H * 0.8,
    opacity:    0,
    transition: { duration: 0.35, ease: EXIT_EASE },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const { t, direction: langDir } = useLanguage();
  const isRTL = langDir === 'rtl';

  const [current,  setCurrent]  = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [paused,   setPaused]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Auto-advance ── */
  const advance = useCallback(() => {
    setSlideDir(1);
    setCurrent(p => (p + 1) % TOTAL);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused) timerRef.current = setTimeout(advance, 2800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, advance]);

  /* ── Manual dot navigation — picks shortest-path direction ── */
  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    const fwd = (idx - current + TOTAL) % TOTAL;
    const bwd = (current - idx + TOTAL) % TOTAL;
    setSlideDir(fwd <= bwd ? 1 : -1);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(idx);
  }, [current]);

  const slide = SLIDES[current];
  const prev  = SLIDES[(current - 1 + TOTAL) % TOTAL];
  const next  = SLIDES[(current + 1)          % TOTAL];

  /* ── Dot element — reused for desktop (inline) and mobile (bottom-centre) ── */
  const renderDots = () =>
    SLIDES.map((_, i) => (
      <button
        key={i}
        onClick={() => goTo(i)}
        aria-label={`${t('Go to slide', 'انتقل إلى الشريحة')} ${i + 1}`}
        aria-current={i === current ? 'true' : undefined}
        className="focus:outline-none transition-all duration-300 cursor-pointer"
        style={{
          width:        i === current ? 18 : 6,
          height:       6,
          borderRadius: i === current ? 3 : '50%',
          background:   i === current ? '#ffffff' : 'rgba(255,255,255,0.25)',
          border:       'none',
          padding:      0,
          flexShrink:   0,
        }}
      />
    ));

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '90vh', minHeight: 560 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ══════════════════════════════════════════════════════════
          BACKGROUND — per-slide images, crossfade 1.1 s
          ══════════════════════════════════════════════════════════ */}
      {SLIDES.map((s, i) => (
        <div
          key={s.bgImage}
          className="absolute inset-0"
          style={{
            backgroundColor: s.fallbackBg,
            opacity:         i === current ? 1 : 0,
            transition:      'opacity 1.1s ease',
            zIndex:          0,
          }}
        >
          <Image
            src={s.bgImage}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ══════════════════════════════════════════════════════════
          DARK GRADIENT — flips for RTL
          LTR: dark on left (text side)
          RTL: dark on right (text side)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: isRTL
            ? 'linear-gradient(to left,  rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 100%)',
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════════════════════════ */}
      <nav
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
        style={{
          height:       NAV_H,
          padding:      '0 clamp(1.5rem, 4vw, 3rem)',
          borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-white text-xl tracking-tight hover:opacity-75 transition-opacity flex-shrink-0"
        >
          Cubico.
        </Link>

        {/* Centre nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.en}
              href={link.href}
              className="transition-colors hover:text-white"
              style={{
                color:          'rgba(255,255,255,0.5)',
                fontSize:       11,
                textTransform:  'uppercase',
                letterSpacing:  '0.12em',
                fontWeight:     500,
                textDecoration: 'none',
              }}
            >
              {t(link.en, link.ar)}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
          {/* Language toggle — same as the rest of the site */}
          <div className="hidden sm:block">
            <LanguageToggle className="text-white/50 hover:text-white" />
          </div>

          <a
            href="#login"
            className="hidden lg:block transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}
          >
            {t('Login', 'تسجيل الدخول')}
          </a>

          <Link
            href="/contact"
            className="text-white transition-colors hover:bg-white/10 whitespace-nowrap"
            style={{
              fontSize:     13,
              padding:      '8px 18px',
              borderRadius: 9999,
              border:       '0.5px solid rgba(255,255,255,0.2)',
            }}
          >
            {t('Request a demo', 'اطلب عرضاً')}
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          LEFT CONTENT — anchored bottom-left (or bottom-right in RTL)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute"
        style={{
          bottom:   'clamp(3.5rem, 7vh, 5.5rem)',
          ...(isRTL
            ? { right: 'clamp(1.5rem, 4vw, 4rem)' }
            : { left:  'clamp(1.5rem, 4vw, 4rem)' }),
          zIndex:   10,
          maxWidth: 'min(520px, calc(100vw - 2rem))',
        }}
      >
        {/* Eyebrow */}
        <div className={`mb-5 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span
            style={{
              width:      28,
              height:     1,
              background: 'rgba(255,255,255,0.3)',
              flexShrink: 0,
              display:    'inline-block',
            }}
          />
          <span
            style={{
              color:         'rgba(255,255,255,0.45)',
              fontSize:      11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontWeight:    600,
            }}
          >
            {t('EdTech for Islamic & K-12 Schools', 'تقنية التعليم للمدارس الإسلامية وK-12')}
          </span>
        </div>

        {/* ── HEADLINE: static + drum + static ── */}
        <div className="mb-8 select-none" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {/* Line 1 — static */}
          <div className="text-white leading-none" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            {t('Smarter', 'أذكى')}
          </div>

          {/* ── SLOT-MACHINE DRUM ── */}
          <div className="relative overflow-hidden" style={{ height: LINE_H * 3 }}>
            {/* Top fade mask */}
            <div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{ height: LINE_H, background: 'linear-gradient(to bottom, rgba(0,0,0,0.52), transparent)', zIndex: 4 }}
            />
            {/* Bottom fade mask */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: LINE_H, background: 'linear-gradient(to top, rgba(0,0,0,0.52), transparent)', zIndex: 4 }}
            />

            {/* SLOT 1 — prev */}
            <div className="absolute inset-x-0 flex items-center" style={{ top: 0, height: LINE_H, zIndex: 1 }}>
              <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: 'rgba(255,255,255,0.22)', lineHeight: 1 }}>
                {t(prev.word.en, prev.word.ar)}
              </span>
            </div>

            {/* SLOT 2 — active */}
            <div className="absolute inset-x-0 flex items-center" style={{ top: LINE_H, height: LINE_H, zIndex: 3 }}>
              <AnimatePresence mode="sync" custom={slideDir}>
                <motion.div
                  key={`word-${current}`}
                  custom={slideDir}
                  variants={wordVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontFamily:   'Georgia, "Times New Roman", serif',
                      fontStyle:    'italic',
                      fontSize:     'clamp(2.4rem, 5vw, 4.2rem)',
                      lineHeight:   1,
                      color:        '#ffffff',
                      background:   'rgba(255,255,255,0.1)',
                      borderRadius: 9999,
                      padding:      '6px 22px',
                      display:      'inline-block',
                      whiteSpace:   'nowrap',
                    }}
                  >
                    {t(slide.word.en, slide.word.ar)}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SLOT 3 — next */}
            <div className="absolute inset-x-0 flex items-center" style={{ top: LINE_H * 2, height: LINE_H, zIndex: 1 }}>
              <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: 'rgba(255,255,255,0.22)', lineHeight: 1 }}>
                {t(next.word.en, next.word.ar)}
              </span>
            </div>
          </div>

          {/* Line 3 — static */}
          <div className="text-white leading-none" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            {t('for your school.', 'لمدرستك.')}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-white font-medium transition-opacity hover:opacity-85 whitespace-nowrap"
            style={{ background: '#534AB7', fontSize: 14, padding: '11px 24px', borderRadius: 6 }}
          >
            {t('Book a free demo', 'احجز عرضاً مجانياً')}
            <span aria-hidden="true" className={isRTL ? 'rotate-180 inline-block' : ''}>→</span>
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center text-white transition-colors hover:bg-white/10 whitespace-nowrap"
            style={{ fontSize: 14, padding: '11px 24px', borderRadius: 6, border: '0.5px solid rgba(255,255,255,0.2)' }}
          >
            {t('See our solutions', 'استكشف حلولنا')}
          </Link>
        </div>

        {/* Dots — desktop only */}
        <div className="hidden md:flex items-center gap-2">
          {renderDots()}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          RIGHT PANEL — full-height dark sidebar strip, flush to edge
          Hidden on mobile. RTL: flips to left edge.
          ══════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:flex flex-col justify-end absolute"
        style={{
          top:     NAV_H,
          bottom:  0,
          ...(isRTL ? { left: 0 } : { right: 0 }),
          width:   'clamp(220px, 22vw, 300px)',
          background: 'rgba(4,6,14,0.88)',
          ...(isRTL
            ? { borderRight: '0.5px solid rgba(255,255,255,0.08)' }
            : { borderLeft:  '0.5px solid rgba(255,255,255,0.08)' }),
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`panel-${current}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {/* Slide subtitle */}
            <p
              className={`leading-relaxed mb-5 ${isRTL ? 'text-right' : ''}`}
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}
            >
              {t(slide.sub.en, slide.sub.ar)}
            </p>

            {/* Divider */}
            <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', marginBottom: '1.25rem' }} />

            {/* Story badge */}
            <div className={`flex items-center gap-2.5 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xl leading-none flex-shrink-0" aria-hidden="true">
                {slide.story.icon}
              </span>
              <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
                <p className="text-white font-semibold truncate" style={{ fontSize: 13 }}>
                  {t(slide.story.name.en, slide.story.name.ar)}
                </p>
                <p className="truncate" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                  {t(slide.story.type.en, slide.story.type.ar)}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p
              className={`leading-relaxed mb-5 ${isRTL ? 'text-right' : ''}`}
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}
            >
              &ldquo;{t(slide.story.quote.en, slide.story.quote.ar)}&rdquo;
            </p>

            {/* Read story CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white font-semibold transition-opacity hover:opacity-80"
              style={{ fontSize: 12, padding: '9px 20px', borderRadius: 9999, background: '#E24B4A' }}
            >
              {t('Read story', 'اقرأ القصة')}
              <span aria-hidden="true" className={isRTL ? 'rotate-180 inline-block' : ''}>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE DOTS — bottom-centre
          ══════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden absolute bottom-10 left-0 right-0 flex justify-center gap-2"
        style={{ zIndex: 20 }}
      >
        {renderDots()}
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCROLL INDICATOR — bottom-left (LTR) / bottom-right (RTL)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute hidden md:flex items-center justify-center"
        style={{
          bottom: 32,
          ...(isRTL
            ? { right: 'clamp(1.5rem, 4vw, 3rem)' }
            : { left:  'clamp(1.5rem, 4vw, 3rem)' }),
          width:        28,
          height:       28,
          borderRadius: '50%',
          border:       '1px solid rgba(255,255,255,0.2)',
          zIndex:       20,
        }}
      >
        <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.5)' }} />
      </div>
    </section>
  );
}
