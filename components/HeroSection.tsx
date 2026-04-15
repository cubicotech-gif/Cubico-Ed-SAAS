'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */
interface LS { en: string; ar: string }

interface Slide {
  word:      LS;
  sub:       LS;
  bgImage:   string;
  storyText: LS;
  school:    LS;
  type:      LS;
  icon:      string;
  quote:     LS;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA  (bilingual)
   ───────────────────────────────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    word:      { en: 'websites',   ar: 'مواقع الويب' },
    sub:       { en: 'A school website that works as hard as your admissions team — fast, professional, and built to convert.', ar: 'موقع مدرسي يعمل بجد فريق القبول — سريع واحترافي ومُصمَّم للتحويل.' },
    bgImage:   '/images/hero/hero-websites.jpg',
    storyText: { en: 'A school website that works as hard as your admissions team — fast, professional, and built to convert.', ar: 'موقع مدرسي يعمل بجد فريق القبول — سريع واحترافي ومُصمَّم للتحويل.' },
    school:    { en: 'MSL SCHOOL',       ar: 'مدرسة MSL' },
    type:      { en: 'Clifton, Karachi', ar: 'كليفتون، كراتشي' },
    icon:      '🏫',
    quote:     { en: "\"MSL's new website boosted inquiry submissions 3× in the first month.\"", ar: '"رفع الموقع الجديد لمدرسة MSL نسبة الاستفسارات 3 أضعاف في أول شهر."' },
  },
  {
    word:      { en: 'management', ar: 'إدارة المدرسة' },
    sub:       { en: 'End-to-end school management — attendance, fees, timetables, and parent communication in one platform.', ar: 'إدارة مدرسية شاملة — الحضور والرسوم والجداول وتواصل الأولياء في منصة واحدة.' },
    bgImage:   '/images/hero/hero-management.jpg',
    storyText: { en: 'End-to-end school management — attendance, fees, timetables, and parent communication in one platform.', ar: 'إدارة مدرسية شاملة — الحضور والرسوم والجداول وتواصل الأولياء في منصة واحدة.' },
    school:    { en: 'AL-HUFFAZ ACADEMY', ar: 'أكاديمية الحفاظ' },
    type:      { en: 'Karachi',           ar: 'كراتشي' },
    icon:      '📋',
    quote:     { en: '"Moved from WhatsApp groups to a full digital admin system in 4 weeks."', ar: '"الانتقال من مجموعات واتساب إلى نظام إداري رقمي كامل في 4 أسابيع."' },
  },
  {
    word:      { en: 'learning', ar: 'التعلّم' },
    sub:       { en: 'Custom LMS where teachers teach, students learn, and principals track progress — entirely online.', ar: 'نظام تعلم مخصص يُدرّس فيه المعلمون ويتعلم الطلاب ويتابع المديرون التقدم — بالكامل عبر الإنترنت.' },
    bgImage:   '/images/hero/hero-learning.jpg',
    storyText: { en: 'Custom LMS where teachers teach, students learn, and principals track progress — entirely online.', ar: 'نظام تعلم مخصص يُدرّس فيه المعلمون ويتعلم الطلاب ويتابع المديرون التقدم — بالكامل عبر الإنترنت.' },
    school:    { en: 'CORNWALL ISLAMIC', ar: 'كورنوول الإسلامية' },
    type:      { en: 'Foundation',       ar: 'مؤسسة' },
    icon:      '📚',
    quote:     { en: '"300+ students now on a live LMS with built-in class supervision."', ar: '"أكثر من 300 طالب على نظام LMS مباشر مع إشراف صفي مدمج."' },
  },
  {
    word:      { en: 'animation', ar: 'الرسوم المتحركة' },
    sub:       { en: 'Animated lesson content that makes complex topics visual, engaging, and memorable for every student.', ar: 'محتوى دروس متحرك يجعل الموضوعات المعقدة مرئية وجذابة ولا تُنسى لكل طالب.' },
    bgImage:   '/images/hero/hero-animation.jpg',
    storyText: { en: 'Animated lesson content that makes complex topics visual, engaging, and memorable for every student.', ar: 'محتوى دروس متحرك يجعل الموضوعات المعقدة مرئية وجذابة ولا تُنسى لكل طالب.' },
    school:    { en: 'CUBICO STUDIO',       ar: 'استوديو كيوبيكو' },
    type:      { en: 'Content & Animation', ar: 'المحتوى والرسوم' },
    icon:      '🎬',
    quote:     { en: '"Animated modules increased student engagement scores by +40%."', ar: '"رفعت الوحدات المتحركة درجات تفاعل الطلاب بنسبة +40%."' },
  },
  {
    word:      { en: 'marketing', ar: 'التسويق' },
    sub:       { en: 'Digital marketing that fills your classrooms — SEO, social, and ad campaigns built for schools.', ar: 'تسويق رقمي يملأ فصولك — تحسين محركات البحث والحملات الإعلانية المُصمَّمة للمدارس.' },
    bgImage:   '/images/hero/hero-marketing.jpg',
    storyText: { en: 'Digital marketing that fills classrooms — SEO, social, and ad campaigns built specifically for schools.', ar: 'تسويق رقمي يملأ الفصول — تحسين محركات البحث والحملات الإعلانية المُصمَّمة خصيصاً للمدارس.' },
    school:    { en: 'CUBICO CREATIVE',  ar: 'كيوبيكو كريتيف' },
    type:      { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    icon:      '📣',
    quote:     { en: '"School clients saw 2× more admission inquiries within 60 days."', ar: '"حقق عملاء المدارس ضعف استفسارات القبول خلال 60 يوماً."' },
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NAV LINKS  (real routes)
   ───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { en: 'Services',  ar: 'الخدمات',  href: '/services'  },
  { en: 'Solutions', ar: 'الحلول',   href: '/solutions' },
  { en: 'Work',      ar: 'أعمالنا',  href: '/about'     },
  { en: 'Company',   ar: 'الشركة',   href: '/about'     },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────────────────────── */
const TOTAL    = SLIDES.length;
const NAV_H    = 52;
const SLOT_H   = 58;   // px — height of one slot item
const INTERVAL = 2800; // ms

/* ─────────────────────────────────────────────────────────────────────────────
   SLOT TRACK  (static array — wrap clone prepended + appended for circular illusion)
   Track indices: 0 = clone of last, 1…TOTAL = the real slides, TOTAL+1 = clone of first
   translateY = -(current * SLOT_H)  →  active always in middle row
   ───────────────────────────────────────────────────────────────────────────── */
const TRACK_ITEMS = [SLIDES[TOTAL - 1], ...SLIDES, SLIDES[0]];

/* SVG progress ring geometry */
const RING_R  = 14;
const RING_C  = 2 * Math.PI * RING_R; // ≈ 87.96 → spec says 88

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const { t, direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Scroll listener for dynamic navbar ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Auto-cycle: restarted on every slide change to keep ring in sync ── */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % TOTAL), INTERVAL);
    return () => clearInterval(id);
  }, [paused, current]);

  /* ── Manual dot navigation ── */
  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
  }, [current]);

  const slide  = SLIDES[current];
  const trackY = -(current * SLOT_H);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '90vh', minHeight: 560, background: '#06080f', marginTop: NAV_H }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ══════════════════════════════════════════════════════════
          BACKGROUND IMAGES — crossfade 1.2 s
          ══════════════════════════════════════════════════════════ */}
      {SLIDES.map((s, i) => (
        <div
          key={s.bgImage}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: 0 }}
        >
          <Image src={s.bgImage} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" />
        </div>
      ))}

      {/* ══════════════════════════════════════════════════════════
          GRADIENT OVERLAY
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: isRTL
            ? 'linear-gradient(to left, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 72%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 72%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          NAVBAR — fixed, glass-morphic, scroll-dynamic
          ══════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 flex items-center transition-all duration-500"
        style={{
          height:         NAV_H,
          padding:        '0 clamp(1.25rem, 3vw, 2.5rem)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(5px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(5px)',
          background:     scrolled
            ? 'rgba(6,8,15,0.65)'
            : 'rgba(6,8,15,0.08)',
          borderBottom:   scrolled
            ? '0.5px solid rgba(255,255,255,0.10)'
            : '0.5px solid rgba(255,255,255,0.04)',
          boxShadow:      scrolled ? '0 4px 32px rgba(0,0,0,0.35)' : 'none',
          zIndex:         50,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            flexShrink:     0,
            display:        'inline-flex',
            alignItems:     'baseline',
            gap:            1,
          }}
        >
          <span style={{
            fontFamily:    '"Playfair Display", Georgia, "Times New Roman", serif',
            fontWeight:    800,
            fontSize:      24,
            color:         '#fff',
            letterSpacing: '-0.02em',
            lineHeight:    1,
          }}>
            Cubico
          </span>
          <span style={{
            fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
            fontWeight: 800,
            fontSize:   26,
            color:      '#4C8EF7',
            lineHeight: 1,
          }}>.</span>
        </Link>

        {/* Centre nav — absolutely positioned at 50% */}
        <div
          className="hidden md:flex items-center gap-6 lg:gap-8"
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.en}
              href={link.href}
              className="transition-colors hover:text-white"
              style={{
                color:         'rgba(255,255,255,0.5)',
                fontSize:      11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight:    500,
                textDecoration: 'none',
              }}
            >
              {t(link.en, link.ar)}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3 lg:gap-4 flex-shrink-0">
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
            className="transition-colors hover:bg-white/10 text-white whitespace-nowrap"
            style={{ fontSize: 13, padding: '7px 18px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.45)', textDecoration: 'none' }}
          >
            {t('Request a demo', 'اطلب عرضاً')}
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          LEFT CONTENT  (bottom 13%, left 4%)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute"
        style={{
          bottom:   '13%',
          ...(isRTL ? { right: '4%' } : { left: '4%' }),
          zIndex:   5,
          maxWidth: 580,
        }}
      >

        {/* Eyebrow */}
        <div
          style={{
            display:       'flex',
            alignItems:    'center',
            gap:           10,
            marginBottom:  '1.4rem',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.35)', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'system-ui, sans-serif' }}>
            {t('EdTech for Islamic & K-12 Schools', 'تقنية التعليم للمدارس الإسلامية وK-12')}
          </span>
        </div>

        {/* ── HEADLINE — ONE LINE, slot machine inline ── */}
        <div
          style={{
            display:      'flex',
            alignItems:   'center',
            marginBottom: '1.2rem',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            flexWrap:     'nowrap',
            whiteSpace:   'nowrap',
          }}
        >
          {/* Static word — "Smarter" */}
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 400, color: '#fff', lineHeight: 1 }}>
            {t('Smarter', 'أذكى')}
          </span>

          {/* ── SLOT MACHINE ──
              Outer: 3 rows tall (SLOT_H × 3), overflow hidden
              Track: translateY shifts so active item is always in the center row
              ── */}
          <div
            style={{
              height:   SLOT_H * 3,
              overflow: 'hidden',
              margin:   `0 ${isRTL ? '0 0 14px' : '14px 0 0'}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display:        'flex',
                flexDirection:  'column',
                transform:      `translateY(${trackY}px)`,
                transition:     'transform 0.72s cubic-bezier(0.77,0,0.18,1)',
              }}
            >
              {TRACK_ITEMS.map((item, i) => {
                /* Track index current+1 is the active center slot */
                const isActive = i === current + 1;
                return (
                  <div
                    key={i}
                    style={{
                      height:      SLOT_H,
                      display:     'flex',
                      alignItems:  'center',
                      fontFamily:  'Georgia, "Times New Roman", serif',
                      fontSize:    'clamp(2rem, 3.5vw, 3.2rem)',
                      fontStyle:   'italic',
                      fontWeight:  400,
                      lineHeight:  1,
                      padding:     '0 18px',
                      borderRadius: 5,
                      color:       isActive ? '#fff' : 'rgba(255,255,255,0.20)',
                      background:  isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                      transition:  'color 0.35s ease, background 0.35s ease',
                      whiteSpace:  'nowrap',
                    }}
                  >
                    {t(item.word.en, item.word.ar)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Static word — "for your school." */}
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 400, color: '#fff', lineHeight: 1 }}>
            {t('for your school.', 'لمدرستك.')}
          </span>
        </div>

        {/* Sub headline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              fontFamily:   'system-ui, sans-serif',
              fontSize:     13,
              color:        'rgba(255,255,255,0.48)',
              lineHeight:   1.7,
              maxWidth:     420,
              marginBottom: '1.6rem',
            }}
          >
            {t(slide.sub.en, slide.sub.ar)}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <div
          style={{
            display:       'flex',
            gap:           10,
            flexWrap:      'wrap',
            marginBottom:  '1.6rem',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <Link
            href="/contact"
            style={{
              background:     '#534AB7',
              color:          '#fff',
              padding:        '10px 22px',
              borderRadius:   6,
              fontSize:       13,
              fontWeight:     500,
              textDecoration: 'none',
              display:        'inline-flex',
              alignItems:     'center',
              gap:            6,
              whiteSpace:     'nowrap',
            }}
          >
            {t('Book a free demo', 'احجز عرضاً مجانياً')}
            <span aria-hidden="true" style={{ display: 'inline-block', transform: isRTL ? 'scaleX(-1)' : 'none' }}>→</span>
          </Link>
          <Link
            href="/solutions"
            style={{
              background:     'transparent',
              color:          'rgba(255,255,255,0.6)',
              border:         '0.5px solid rgba(255,255,255,0.22)',
              padding:        '10px 22px',
              borderRadius:   6,
              fontSize:       13,
              fontWeight:     500,
              textDecoration: 'none',
              display:        'inline-flex',
              alignItems:     'center',
              whiteSpace:     'nowrap',
            }}
          >
            {t('See our solutions', 'استكشف حلولنا')}
          </Link>
        </div>

        {/* Dots */}
        <div
          style={{ display: 'flex', gap: 7, flexDirection: isRTL ? 'row-reverse' : 'row' }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${t('Go to slide', 'انتقل إلى الشريحة')} ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              style={{
                width:        i === current ? 18 : 6,
                height:       6,
                borderRadius: i === current ? 3 : '50%',
                background:   i === current ? '#fff' : 'rgba(255,255,255,0.2)',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 0.4s ease, background 0.4s ease',
                flexShrink:   0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          RIGHT STORY STRIP
          Full height from navbar to bottom, flush to edge
          ══════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block absolute"
        style={{
          top:            0,
          bottom:         0,
          ...(isRTL ? { left: 0 } : { right: 0 }),
          width:                360,
          backdropFilter:       'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          background:           'rgba(255,255,255,0.055)',
          ...(isRTL
            ? {
                borderRight:  '0.5px solid rgba(255,255,255,0.18)',
                boxShadow:    '-8px 0 40px rgba(0,0,0,0.3), inset -1px 0 0 rgba(255,255,255,0.08)',
              }
            : {
                borderLeft:   '0.5px solid rgba(255,255,255,0.18)',
                boxShadow:    '8px 0 40px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.08)',
              }),
          zIndex: 10,
        }}
      >
        {/* Story panel — anchored to bottom of strip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`story-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom:   '2.2rem',
              left:     '1.4rem',
              right:    '1.4rem',
            }}
          >
            {/* Story text */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, marginBottom: '1.4rem', fontFamily: 'system-ui, sans-serif' }}>
              {t(slide.storyText.en, slide.storyText.ar)}
            </p>

            {/* Separator */}
            <div style={{ width: '100%', height: '0.5px', background: 'rgba(255,255,255,0.12)', marginBottom: '1.1rem' }} />

            {/* School badge */}
            <div
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           9,
                marginBottom:  '0.8rem',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <div
                style={{
                  width:          26,
                  height:         26,
                  borderRadius:   5,
                  background:     'rgba(255,255,255,0.10)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       13,
                  flexShrink:     0,
                }}
              >
                {slide.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize:      11,
                    fontWeight:    700,
                    color:         '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace:    'nowrap',
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                  }}
                >
                  {t(slide.school.en, slide.school.ar)}
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t(slide.type.en, slide.type.ar)}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p style={{ fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, marginBottom: '1rem' }}>
              {t(slide.quote.en, slide.quote.ar)}
            </p>

            {/* Read story */}
            <Link
              href="/about"
              style={{
                background:     '#E24B4A',
                color:          '#fff',
                padding:        '8px 18px',
                borderRadius:   20,
                fontSize:       12,
                fontWeight:     500,
                textDecoration: 'none',
                display:        'inline-flex',
                alignItems:     'center',
                gap:            5,
                border:         'none',
              }}
            >
              {t('Read story', 'اقرأ القصة')}
              <span aria-hidden="true" style={{ display: 'inline-block', transform: isRTL ? 'scaleX(-1)' : 'none' }}>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCROLL PROGRESS RING  (bottom 1.4rem, left 4%)
          34×34 SVG circle — arc animates from 88 → 0 each slide
          ══════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:flex items-center justify-center absolute"
        style={{
          bottom: '1.4rem',
          ...(isRTL ? { right: '4%' } : { left: '4%' }),
          width:  34,
          height: 34,
          zIndex: 10,
        }}
      >
        {/* SVG ring — rotated -90° so progress starts from 12 o'clock */}
        <svg
          width={34}
          height={34}
          style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
          aria-hidden="true"
        >
          {/* Static background ring */}
          <circle
            cx={17} cy={17} r={RING_R}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1.5}
          />
          {/* Animated progress arc — key resets animation on every slide */}
          <motion.circle
            key={`ring-${current}`}
            cx={17} cy={17} r={RING_R}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: RING_C }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
          />
        </svg>
        {/* Down chevron arrow — CSS border trick */}
        <div
          aria-hidden="true"
          style={{
            width:        7,
            height:       7,
            borderRight:  '1.5px solid rgba(255,255,255,0.6)',
            borderBottom: '1.5px solid rgba(255,255,255,0.6)',
            transform:    'rotate(45deg) translateY(-1.5px)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE DOTS — bottom centre (hidden md+)
          ══════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden absolute bottom-8 left-0 right-0 flex justify-center"
        style={{ gap: 7, zIndex: 10 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${t('Go to slide', 'انتقل إلى الشريحة')} ${i + 1}`}
            style={{
              width:        i === current ? 18 : 6,
              height:       6,
              borderRadius: i === current ? 3 : '50%',
              background:   i === current ? '#fff' : 'rgba(255,255,255,0.2)',
              border:       'none',
              padding:      0,
              cursor:       'pointer',
              transition:   'width 0.4s ease, background 0.4s ease',
            }}
          />
        ))}
      </div>

    </section>
  );
}
