'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   SLIDE DATA
   Each slide owns: cycling word · subtext · background image · story card data
   ───────────────────────────────────────────────────────────────────────────── */
const slides = [
  {
    word: 'websites',
    sub: 'A school website that works as hard as your admissions team — fast, professional, and built to convert.',
    bgImage: '/images/hero/hero-websites.jpg',
    fallbackBg: '#161e30',
    story: {
      name: 'MSL School',
      type: 'Clifton, Karachi',
      icon: '🏫',
      quote: "MSL's new website boosted inquiry submissions 3× in the first month.",
      tag: 'Website',
    },
  },
  {
    word: 'management',
    sub: 'End-to-end school management — attendance, fees, timetables, and parent communication in one platform.',
    bgImage: '/images/hero/hero-management.jpg',
    fallbackBg: '#0e1626',
    story: {
      name: 'Al-Huffaz Academy',
      type: 'Karachi',
      icon: '📋',
      quote: 'Moved from WhatsApp groups to a full digital admin system in 4 weeks.',
      tag: 'Management',
    },
  },
  {
    word: 'learning',
    sub: 'Custom LMS where teachers teach, students learn, and principals track progress — entirely online.',
    bgImage: '/images/hero/hero-learning.jpg',
    fallbackBg: '#12102e',
    story: {
      name: 'Cornwall Islamic',
      type: 'Foundation',
      icon: '📚',
      quote: '300+ students now on a live Moodle LMS with built-in class supervision.',
      tag: 'LMS',
    },
  },
  {
    word: 'animation',
    sub: 'Animated lesson content that makes complex topics visual, engaging, and memorable for students.',
    bgImage: '/images/hero/hero-animation.jpg',
    fallbackBg: '#1a0a24',
    story: {
      name: 'Cubico Studio',
      type: 'Content & Animation',
      icon: '🎬',
      quote: 'Animated modules increased student engagement scores by +40%.',
      tag: 'Animation',
    },
  },
  {
    word: 'marketing',
    sub: 'Digital marketing that fills your classrooms — SEO, social, and ad campaigns built specifically for schools.',
    bgImage: '/images/hero/hero-marketing.jpg',
    fallbackBg: '#0c1a16',
    story: {
      name: 'Cubico Creative',
      type: 'Digital Marketing',
      icon: '📣',
      quote: 'School clients saw 2× more admission inquiries within 60 days.',
      tag: 'Marketing',
    },
  },
] as const;

const TOTAL = slides.length;
const NAV_H  = 64;  // px — navbar height
const LINE_H = 72;  // px — height of each word slot in the drum

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Auto-advance ── */
  const advance = useCallback(() => setCurrent(p => (p + 1) % TOTAL), []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused) timerRef.current = setTimeout(advance, 2800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, advance]);

  /* ── Manual navigation ── */
  const goTo = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(idx);
  };

  /*
   * drumY — translates the word column so the active word sits in the
   * center slot of the 3-slot drum window.
   *
   * Container height = 3 × LINE_H (three visible slots).
   * Word[i] sits at column y = i × LINE_H.
   * For word[current] to land at container y = LINE_H (centre slot):
   *   drumY = LINE_H × (1 − current)
   */
  const drumY = LINE_H * (1 - current);

  /* ─── Dot elements (shared between desktop inline & mobile absolute) ─── */
  const Dots = () => (
    <div className="flex items-center gap-2">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="focus:outline-none transition-all duration-300 cursor-pointer"
          style={{
            width:        i === current ? 18 : 6,
            height:       6,
            borderRadius: i === current ? 3 : '50%',
            background:   i === current ? '#ffffff' : 'rgba(255,255,255,0.25)',
            border:       'none',
            padding:      0,
          }}
        />
      ))}
    </div>
  );

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '90vh', minHeight: 560 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ══════════════════════════════════════
          BACKGROUND — crossfading images
          ══════════════════════════════════════ */}
      {slides.map((slide, i) => (
        <div
          key={slide.word}
          className="absolute inset-0"
          style={{
            backgroundColor: slide.fallbackBg,
            opacity:    i === current ? 1 : 0,
            transition: 'opacity 1.1s ease',
            zIndex:     0,
          }}
        >
          <Image
            src={slide.bgImage}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ══════════════════════════════════════
          DARK GRADIENT OVERLAY
          left → right: 0.78 → 0.15
          ══════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 100%)',
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════ */}
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

        {/* Center links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {(['Services', 'Solutions', 'Work', 'Company'] as const).map(label => (
            <a
              key={label}
              href="#"
              className="transition-colors hover:text-white/80"
              style={{
                color:          'rgba(255,255,255,0.5)',
                fontSize:       11,
                textTransform:  'uppercase',
                letterSpacing:  '0.12em',
                fontWeight:     500,
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <a
            href="#"
            className="hidden sm:block transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}
          >
            Login
          </a>
          <Link
            href="/contact"
            className="text-white transition-colors hover:bg-white/10"
            style={{
              fontSize:       13,
              padding:        '8px 20px',
              borderRadius:   9999,
              border:         '0.5px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
            }}
          >
            Request a demo
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 10, paddingTop: NAV_H }}
      >
        <div
          className="w-full max-w-7xl mx-auto flex items-center"
          style={{
            padding: '0 clamp(1.5rem, 4vw, 3rem)',
            gap:     'clamp(2rem, 5vw, 4rem)',
            height:  '100%',
          }}
        >

          {/* ─── LEFT COLUMN ─── */}
          <div
            className="flex flex-col justify-center"
            style={{ flex: '1 1 0', minWidth: 0 }}
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="inline-block"
                style={{
                  width:           28,
                  height:          1,
                  background:      'rgba(255,255,255,0.3)',
                  flexShrink:      0,
                }}
              />
              <span
                style={{
                  color:          'rgba(255,255,255,0.45)',
                  fontSize:       11,
                  textTransform:  'uppercase',
                  letterSpacing:  '0.14em',
                  fontWeight:     600,
                }}
              >
                EdTech for Islamic &amp; K-12 Schools
              </span>
            </div>

            {/* ── Headline ── */}
            <div
              className="mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', userSelect: 'none' }}
            >
              {/* Line 1 — static */}
              <div
                className="text-white leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Smarter
              </div>

              {/* Line 2 — slot-machine drum */}
              <div
                className="relative overflow-hidden"
                style={{ height: LINE_H * 3 }}
              >
                {/* Fade mask — top (dims word above active) */}
                <div
                  className="absolute inset-x-0 top-0 pointer-events-none"
                  style={{
                    height:     LINE_H,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
                    zIndex:     2,
                  }}
                />
                {/* Fade mask — bottom (dims word below active) */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height:     LINE_H,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
                    zIndex:     2,
                  }}
                />

                {/* Drum column — translates to keep active word centred */}
                <motion.div
                  animate={{ y: drumY }}
                  transition={{ duration: 0.72, ease: [0.77, 0, 0.18, 1] }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                >
                  {slides.map((slide, i) => {
                    const isActive = i === current;
                    return (
                      <div
                        key={slide.word}
                        style={{ height: LINE_H, display: 'flex', alignItems: 'center' }}
                      >
                        <span
                          style={{
                            fontFamily:  'Georgia, "Times New Roman", serif',
                            fontStyle:   'italic',
                            fontSize:    'clamp(2rem, 4vw, 3.5rem)',
                            lineHeight:  1,
                            color:       isActive ? '#ffffff' : 'rgba(255,255,255,0.22)',
                            background:  isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                            borderRadius: isActive ? 9999 : 0,
                            padding:     isActive ? '6px 22px' : '6px 0',
                            display:     'inline-block',
                            transition:  'color 0.35s ease, background 0.35s ease, padding 0.35s ease',
                          }}
                        >
                          {slide.word}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Line 3 — static */}
              <div
                className="text-white leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                for your school.
              </div>
            </div>

            {/* ── Subtext ── */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="leading-relaxed mb-8"
                style={{
                  color:    'rgba(255,255,255,0.6)',
                  fontSize: 15,
                  maxWidth: 'min(440px, 100%)',
                }}
              >
                {slides[current].sub}
              </motion.p>
            </AnimatePresence>

            {/* ── CTAs ── */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-white font-medium transition-opacity hover:opacity-85"
                style={{
                  background:     '#534AB7',
                  fontSize:       14,
                  padding:        '11px 24px',
                  borderRadius:   6,
                  textDecoration: 'none',
                  whiteSpace:     'nowrap',
                }}
              >
                Book a free demo <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center text-white transition-colors hover:bg-white/10"
                style={{
                  fontSize:       14,
                  padding:        '11px 24px',
                  borderRadius:   6,
                  border:         '0.5px solid rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                  whiteSpace:     'nowrap',
                }}
              >
                See our solutions
              </Link>
            </div>

            {/* ── Dots — desktop only (inline) ── */}
            <div className="hidden md:block">
              <Dots />
            </div>
          </div>

          {/* ─── RIGHT — Story card (hidden below md) ─── */}
          <div
            className="hidden md:block relative flex-shrink-0 overflow-hidden"
            style={{
              width:        260,
              height:       `calc(90vh - ${NAV_H}px - 80px)`,
              minHeight:    320,
              maxHeight:    640,
              borderRadius: 12,
            }}
          >
            {/* Card background: mirrors slide background */}
            {slides.map((slide, i) => (
              <div
                key={`card-bg-${slide.word}`}
                className="absolute inset-0"
                style={{
                  backgroundColor: slide.fallbackBg,
                  opacity:    i === current ? 1 : 0,
                  transition: 'opacity 1.1s ease',
                }}
              >
                <Image
                  src={slide.bgImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>
            ))}

            {/* Bottom gradient — lifts content off the image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)' }}
            />

            {/* Story content — staggered fade+slide on slide change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`story-${current}`}
                className="absolute bottom-0 left-0 right-0"
                style={{ padding: '1.2rem' }}
              >
                {/* Badge: icon + name + type */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center gap-2.5 mb-3"
                >
                  <span className="text-lg leading-none flex-shrink-0" aria-hidden="true">
                    {slides[current].story.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-white font-semibold truncate"
                      style={{ fontSize: 13 }}
                    >
                      {slides[current].story.name}
                    </p>
                    <p className="truncate" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      {slides[current].story.type}
                    </p>
                  </div>
                </motion.div>

                {/* Quote */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
                  className="leading-relaxed mb-4"
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}
                >
                  &ldquo;{slides[current].story.quote}&rdquo;
                </motion.p>

                {/* Read story — red pill button */}
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
                  className="text-white font-semibold transition-opacity hover:opacity-80 cursor-pointer"
                  style={{
                    fontSize:     11,
                    padding:      '7px 16px',
                    borderRadius: 9999,
                    background:   '#E24B4A',
                    border:       'none',
                  }}
                >
                  Read story
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          DOTS — mobile only, absolute bottom-centre
          ══════════════════════════════════════ */}
      <div
        className="md:hidden absolute bottom-10 left-0 right-0 flex justify-center"
        style={{ zIndex: 20 }}
      >
        <Dots />
      </div>

      {/* ══════════════════════════════════════
          SCROLL INDICATOR — bottom-left
          ══════════════════════════════════════ */}
      <div
        className="absolute"
        style={{
          bottom:  32,
          left:    'clamp(1.5rem, 4vw, 3rem)',
          zIndex:  20,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width:        28,
            height:       28,
            borderRadius: '50%',
            border:       '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </section>
  );
}
