'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Megaphone,
  MessageSquare,
  Monitor,
  BookOpen,
  Film,
  Globe,
  Smartphone,
  Cloud,
  Mail,
  Star,
  Users,
  Award,
  Phone,
  CheckCircle2,
  Layers,
  PieChart,
  ShoppingCart,
  Lightbulb,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Layout,
  Settings,
  Play,
  MapPin,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS — Framer Motion
   Premium 2026 micro-interactions
   ═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* Card hover — lift 8px + shadow glow + subtle scale */
const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0 4px 30px rgba(0,0,0,0.06)' },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 60px rgba(20,184,166,0.15)',
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

/* ═══════════════════════════════════════════
   COUNTER HOOK — Animated stat numbers
   ═══════════════════════════════════════════ */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════ */
function StatCounter({ value, suffix, label, color = '#14B8A6' }: { value: number; suffix: string; label: string; color?: string }) {
  const { count, ref } = useCounter(value);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const pct = value > 0 ? Math.min(count / value, 1) : 0;
  return (
    <div ref={ref} className="text-center flex flex-col items-center">
      <div className="relative w-28 h-28 mb-3">
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={String(circ)}
            strokeDashoffset={String(circ * (1 - pct))}
            style={{ transition: 'stroke-dashoffset 0.04s linear', filter: `drop-shadow(0 0 8px ${color}70)` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="stat-number text-3xl text-white leading-none">
            {count}<span className="text-xl" style={{ color }}>{suffix}</span>
          </div>
        </div>
      </div>
      <p className="text-white/50 text-[10px] font-bold tracking-[0.16em] uppercase">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    position: '',
    employees: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { t } = useLanguage();

  /* ── Testimonials data (region-segmented) ── */
  const testimonials = [
    {
      name: t('Dr. Ahmed Al-Rashid', 'د. أحمد الراشد'),
      role: t('Director', 'مدير'),
      company: t('Al-Noor Academy', 'أكاديمية النور'),
      location: t('Saudi Arabia', 'المملكة العربية السعودية'),
      text: t('Cubico transformed our entire school system. The LMS and animated content have dramatically improved student engagement. Their team understood our Islamic education requirements perfectly.', 'حوّلت كيوبيكو نظام مدرستنا بالكامل. أدى نظام إدارة التعلم والمحتوى المتحرك إلى تحسين تفاعل الطلاب بشكل كبير. فهم فريقهم متطلبات التعليم الإسلامي لدينا بشكل مثالي.'),
      rating: 5,
    },
    {
      name: t('Fatima Hassan', 'فاطمة حسن'),
      role: t('Principal', 'مديرة المدرسة'),
      company: t('Iqra Foundation School', 'مدرسة إقرأ التأسيسية'),
      location: t('Pakistan', 'باكستان'),
      text: t('From day one, Cubico delivered beyond our expectations. The ERP system streamlined our operations and the animated Urdu lessons are loved by our students. Truly world-class service.', 'منذ اليوم الأول، قدمت كيوبيكو ما فاق توقعاتنا. نظّم نظام تخطيط الموارد عملياتنا والدروس المتحركة بالأردية يحبها طلابنا. خدمة عالمية المستوى حقاً.'),
      rating: 5,
    },
    {
      name: t('Michael Torres', 'مايكل توريس'),
      role: t('Board Chair', 'رئيس مجلس الإدارة'),
      company: t('Cornwall Islamic Foundation', 'مؤسسة كورنوال الإسلامية'),
      location: t('Canada', 'كندا'),
      text: t('Working with Cubico has been exceptional. They deployed our complete digital infrastructure in just 3 weeks. The ongoing support and training have been invaluable for our staff.', 'كان العمل مع كيوبيكو استثنائياً. نشروا بنيتنا التحتية الرقمية الكاملة في 3 أسابيع فقط. الدعم والتدريب المستمر كانا لا يقدران بثمن لموظفينا.'),
      rating: 5,
    },
  ];

  /* ── FAQ data ── */
  const faqs = [
    {
      q: t('How quickly can we launch our digital platform?', 'ما مدى سرعة إطلاق منصتنا الرقمية؟'),
      a: t('Most institutions go live within 4 weeks. Our streamlined onboarding process includes data migration, staff training, and content setup — all handled by our dedicated team.', 'تبدأ معظم المؤسسات العمل خلال 4 أسابيع. تتضمن عملية الإعداد المبسطة لدينا نقل البيانات وتدريب الموظفين وإعداد المحتوى — يتولاها فريقنا المتخصص بالكامل.'),
    },
    {
      q: t('Do you support Arabic and Urdu content?', 'هل تدعمون المحتوى بالعربية والأردية؟'),
      a: t('Yes! We specialize in multilingual education content. Our animation studio produces high-quality lessons in English, Arabic, and Urdu with full RTL support across all platforms.', 'نعم! نحن متخصصون في المحتوى التعليمي متعدد اللغات. ينتج استوديو الرسوم المتحركة لدينا دروساً عالية الجودة بالإنجليزية والعربية والأردية مع دعم كامل للكتابة من اليمين لليسار.'),
    },
    {
      q: t('Can we engage Cubico for just one service?', 'هل يمكننا التعاقد مع كيوبيكو لخدمة واحدة فقط؟'),
      a: t('Absolutely. While we offer a full-stack approach, each service — LMS, ERP, animations, web development — can be engaged independently based on your needs.', 'بالتأكيد. بينما نقدم نهجاً شاملاً، يمكن التعاقد على كل خدمة — نظام إدارة التعلم، نظام تخطيط الموارد، الرسوم المتحركة، تطوير الويب — بشكل مستقل حسب احتياجاتك.'),
    },
    {
      q: t('What makes Cubico different from other EdTech providers?', 'ما الذي يميز كيوبيكو عن مزودي تكنولوجيا التعليم الآخرين؟'),
      a: t('We combine deep understanding of Islamic and traditional education with cutting-edge technology. Our team includes educators and technologists who bridge the gap between pedagogy and innovation.', 'نجمع بين الفهم العميق للتعليم الإسلامي والتقليدي والتكنولوجيا المتطورة. يضم فريقنا معلمين وتقنيين يسدون الفجوة بين أساليب التدريس والابتكار.'),
    },
    {
      q: t('Which countries do you operate in?', 'في أي دول تعملون؟'),
      a: t('We actively serve institutions across Pakistan, Saudi Arabia, and Canada. Our cloud-based solutions can be deployed globally with local support teams in each region.', 'نخدم المؤسسات بنشاط في باكستان والمملكة العربية السعودية وكندا. يمكن نشر حلولنا السحابية عالمياً مع فرق دعم محلية في كل منطقة.'),
    },
  ];

  /* ── Stats ── */
  const stats = [
    { value: 760, suffix: '+', label: t('Institutions Served', 'مؤسسة تم خدمتها') },
    { value: 3, suffix: '', label: t('Countries Active', 'دول نشطة') },
    { value: 4, suffix: '', label: t('Weeks Avg Launch', 'أسابيع متوسط الإطلاق') },
    { value: 100, suffix: '%', label: t('Client Retention', 'نسبة الاحتفاظ بالعملاء') },
  ];

  /* ── Partner logos marquee ── */
  const partners = [
    t('Al-Huffaz Academy', 'أكاديمية الحفاظ'),
    t('Al-Noor Academy', 'أكاديمية النور'),
    t('CIF Canada', 'مؤسسة CIF كندا'),
    t('Iqra Foundation', 'مؤسسة إقرأ'),
    t('Saudi Schools Network', 'شبكة المدارس السعودية'),
    t('TechEd Pakistan', 'تيك إد باكستان'),
  ];

  /* ── Form handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const { error } = await supabase.from('demo_requests').insert([formData]);
      if (error) throw error;
      setFormStatus('success');
      setFormData({ name: '', company: '', phone: '', email: '', position: '', employees: '' });
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes float      { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-20px); } }
        @keyframes float2     { 0%,100%{ transform:translateY(-10px); } 50%{ transform:translateY(14px); } }
        @keyframes float3     { 0%,100%{ transform:translateY(-5px) translateX(0); } 50%{ transform:translateY(10px) translateX(-8px); } }
        @keyframes marquee    { 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        @keyframes glow-breath{ 0%,100%{ opacity:0.4; transform:scale(1); } 50%{ opacity:0.75; transform:scale(1.06); } }
        @keyframes pulse-soft { 0%,100%{ box-shadow:0 0 0 0 rgba(20,184,166,0.4); } 50%{ box-shadow:0 0 0 12px rgba(20,184,166,0); } }
        .animate-float        { animation:float 7s ease-in-out infinite; }
        .animate-float2       { animation:float2 9s ease-in-out infinite; }
        .animate-float3       { animation:float3 11s ease-in-out infinite; }
        .animate-marquee-slow { animation:marquee 38s linear infinite; }
        .animate-glow-breath  { animation:glow-breath 4.5s ease-in-out infinite; }
        .animate-pulse-soft   { animation:pulse-soft 2.5s ease-in-out infinite; }
        .shimmer-text {
          background:linear-gradient(90deg,#14B8A6 0%,#10B981 30%,#2DD4BF 50%,#10B981 70%,#14B8A6 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <Header />

      {/* ═══════════════════════════════════════════════════════════
         HERO SECTION — Full viewport, powerful & visual
         Psychology: Instant clarity in <3 seconds. Z-pattern layout.
         Warm background image overlay for emotional connection.
         ═══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        {/* ── Background image — diverse K-12/Islamic school scene for warmth ── */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2560&q=80"
            alt="Students engaged in modern digital classroom learning"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* ── Gradient overlay — teal-to-navy for brand cohesion ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(2,6,23,0.92) 0%, rgba(15,23,42,0.82) 35%, rgba(15,23,42,0.78) 60%, rgba(2,6,23,0.96) 100%)',
          }}
        />
        {/* ── Subtle teal accent glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 50% 30%, rgba(20,184,166,0.1) 0%, transparent 70%)',
          }}
        />
        {/* ── Floating atmosphere orbs — teal/emerald tones ── */}
        <div className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle,rgba(20,184,166,0.14) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-[22%] right-[8%] w-80 h-80 rounded-full pointer-events-none animate-float2"
          style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute top-[50%] left-[30%] w-96 h-96 rounded-full pointer-events-none animate-float3"
          style={{ background: 'radial-gradient(circle,rgba(20,184,166,0.06) 0%,transparent 70%)', filter: 'blur(70px)' }} />
        {/* ── Dot grid overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ═══ HERO CONTENT ═══ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center px-6 py-32 max-w-5xl mx-auto"
        >
          {/* Top tagline — region context */}
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-medium text-white/75 border border-teal-400/20 bg-teal-900/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
              {t(
                'AI-Powered Platform for K-12 & Islamic Schools in Pakistan \u2022 GCC \u2022 Canada',
                'منصة مدعومة بالذكاء الاصطناعي لمدارس K-12 والمدارس الإسلامية في باكستان \u2022 الخليج \u2022 كندا'
              )}
            </span>
          </motion.div>

          {/* Massive headline — kinetic bold typography */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-heading font-extrabold text-white leading-[1.06] tracking-[-0.03em] mb-6 max-w-4xl"
          >
            {t(
              'Give your school the platform it deserves — ',
              'امنح مدرستك المنصة التي تستحقها — '
            )}
            <span className="shimmer-text">
              {t(
                'one intelligent system with four powerful modules.',
                'نظام ذكي واحد بأربعة وحدات قوية.'
              )}
            </span>
          </motion.h1>

          {/* Subheadline — module names for clarity */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base md:text-lg text-white/55 max-w-2xl leading-relaxed mb-10"
          >
            {t(
              'Cubico Manage\u2122 \u2022 Cubico Learn\u2122 \u2022 Smart LMS \u2022 Cubico Marketing\u2122 — all working together to transform learning and operations.',
              'Cubico Manage\u2122 \u2022 Cubico Learn\u2122 \u2022 Smart LMS \u2022 Cubico Marketing\u2122 — تعمل معًا لتحويل التعلم والعمليات.'
            )}
          </motion.p>

          {/* CTA buttons — "Book a Demo" prominent teal + secondary "Watch Overview" */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] transition-all duration-200 animate-pulse-soft"
            >
              {t('Book a Demo', 'احجز عرضاً')}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2.5 text-white/65 hover:text-white font-semibold text-base px-7 py-4 rounded-full border border-white/[0.15] hover:border-white/[0.3] hover:bg-white/[0.05] transition-all duration-200"
            >
              <Play size={16} className="text-teal-400" />
              {t('Watch 90-Second Overview', 'شاهد نظرة عامة في 90 ثانية')}
            </Link>
          </motion.div>

          {/* Trust bar — social proof numbers for instant credibility */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {[
              { val: '760+', label: t('Schools', 'مدرسة') },
              { val: '3', label: t('Countries', 'دول') },
              { val: 'ISO 27001', label: t('Certified', 'معتمد') },
              { val: '4.9/5', label: t('from Principals', 'من المديرين') },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="text-white font-extrabold text-lg md:text-xl">{item.val}</span>
                <span className="text-white/40 text-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bottom fade to white ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F8FAFC)' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         ROLE-BASED WAYFINDING — Emotional & Visual Centerpiece
         Psychology: Hick's Law — 3 strong choices reduces decision
         fatigue. Principals self-identify their #1 pain and click.
         Human-centric photography for emotional connection.
         ═══════════════════════════════════════════════════════════ */}
      <section id="wayfinding" className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
        {/* Subtle teal gradient accent in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section title with underline animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-20"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl lg:text-[3rem] font-heading font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4"
            >
              {t('Where do you want to ', 'أين تريد أن ')}<span className="shimmer-text">{t('win first?', 'تفوز أولاً؟')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-[#64748B] text-lg max-w-xl mx-auto">
              {t(
                'Choose your biggest challenge. We\'ll show you the solution.',
                'اختر أكبر تحدٍ لديك. سنعرض لك الحل.'
              )}
            </motion.p>
          </motion.div>

          {/* ── 3 Role Cards — responsive grid, stack on mobile ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* ────── CARD 1: Grow Admissions (Teal accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={0}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#14B8A6]/30 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Top image — warm enrollment/admissions scene */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                  alt="Happy diverse students arriving at school - enrollment growth"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                {/* Accent badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Megaphone size={12} /> {t('GROW', 'نمو')}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 lg:p-7">
                {/* Bold headline — scannability with inline keywords */}
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('Get ', 'احصل على ')}<span className="text-[#14B8A6]">{t('3x More Students', '3 أضعاف الطلاب')}</span>{t(' in Your First Semester', ' في فصلك الأول')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'Professional websites, SEO, Google Ads, and AI enrollment funnels with Cubico Marketing\u2122.',
                    'مواقع احترافية، تحسين محركات البحث، إعلانات جوجل، ومسارات تسجيل ذكية مع Cubico Marketing\u2122.'
                  )}
                </p>

                {/* Social proof stat */}
                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F0FDFA] border border-[#14B8A6]/10">
                  <TrendingUp size={16} className="text-[#14B8A6] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '3x average enrollment increase — real results from schools like yours',
                      '3 أضعاف متوسط زيادة التسجيل — نتائج حقيقية من مدارس مثل مدرستك'
                    )}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href="/solutions/web-development"
                  className="inline-flex items-center gap-2 text-[#14B8A6] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Cubico Marketing\u2122', 'استكشف Cubico Marketing\u2122')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* ────── CARD 2: Better Teaching (Emerald accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={1}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#10B981]/30 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Top image — engaging classroom with animated lesson scene */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                  alt="Students happily engaged in interactive digital learning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <GraduationCap size={12} /> {t('TEACH', 'تعليم')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('Immersive Lessons & ', 'دروس غامرة و')}<span className="text-[#10B981]">{t('Smart LMS', 'نظام تعلم ذكي')}</span>{t(' Students Actually Love', ' يحبه الطلاب فعلاً')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    '200+ professional 2D & 3D animated lessons in English, Arabic & Urdu (Cubico Learn\u2122) + AI-powered adaptive Smart LMS.',
                    'أكثر من 200 درس متحرك احترافي ثنائي وثلاثي الأبعاد بالإنجليزية والعربية والأردية (Cubico Learn\u2122) + نظام تعلم ذكي تكيفي.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#ECFDF5] border border-[#10B981]/10">
                  <Users size={16} className="text-[#10B981] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '85K+ active learners \u2022 Students stay 4x longer',
                      'أكثر من 85 ألف متعلم نشط \u2022 الطلاب يبقون 4 أضعاف'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/smart-lms"
                  className="inline-flex items-center gap-2 text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Learn\u2122 & Smart LMS', 'استكشف Learn\u2122 و Smart LMS')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* ────── CARD 3: Run Smoothly (Navy-teal accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={2}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0D9488]/30 shadow-sm hover:shadow-2xl hover:shadow-teal-600/10 transition-all duration-300 cursor-pointer"
            >
              {/* Top image — calm admin at dashboard scene */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="School administrator calmly managing operations on dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A]/85 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Settings size={12} /> {t('MANAGE', 'إدارة')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  <span className="text-[#0D9488]">{t('Zero-Stress', 'بدون توتر')}</span>{t(' Operations with Full ERP', ' عمليات مع نظام تخطيط متكامل')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'Admissions, fees, attendance, HR, exams, timetables — all automated in Cubico Manage\u2122.',
                    'القبول والرسوم والحضور والموارد البشرية والامتحانات والجداول — كلها مؤتمتة في Cubico Manage\u2122.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F0FDFA] border border-[#0D9488]/10">
                  <Zap size={16} className="text-[#0D9488] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '47 hours saved per staff/month \u2022 94.2% attendance',
                      '47 ساعة توفير لكل موظف/شهر \u2022 94.2% حضور'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/school-erp"
                  className="inline-flex items-center gap-2 text-[#0D9488] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Cubico Manage\u2122', 'استكشف Cubico Manage\u2122')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         UNIFIED PLATFORM PROOF — "Everything works together"
         Shows 4 modules with integrated dashboard imagery.
         Psychology: Reduces fear of fragmented tools.
         ═══════════════════════════════════════════════════════════ */}
      <section id="platform" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-teal-200/60 bg-teal-50/60 text-[#14B8A6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                {t('One Platform', 'منصة واحدة')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-heading font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-4">
              {t('Everything works together as ', 'كل شيء يعمل معاً ')}<span className="shimmer-text">{t('one seamless platform.', 'كمنصة واحدة متكاملة.')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#64748B] text-lg max-w-lg mx-auto leading-relaxed">
              {t('Four products. One ecosystem. Each built specifically for education.', 'أربعة منتجات. منظومة واحدة. كل منها مصمم خصيصاً للتعليم.')}
            </motion.p>
          </motion.div>

          {/* ── 4 Module Highlights — Bento Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Module 1: Cubico Manage — Full ERP Dashboard */}
            <motion.a
              href="/solutions/school-erp"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 group relative rounded-[20px] border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #ffffff 50%, rgba(13,148,136,0.03) 100%)', borderColor: 'rgba(13,148,136,0.2)' }}
            >
              <div className="grid lg:grid-cols-[45%_55%] gap-0 min-h-[420px] lg:min-h-[460px]">
                <div className="p-8 lg:p-10 xl:p-12 flex flex-col justify-center relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit mb-5 bg-[#0D9488]/10 text-[#0D9488]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" /> {t('MANAGE', 'إدارة')}
                  </span>
                  <h3 className="text-2xl lg:text-3xl xl:text-[2.2rem] font-extrabold text-[#0F172A] mb-3 leading-tight tracking-tight">
                    {t('Cubico Manage\u2122', 'كيوبيكو إدارة\u2122')}
                  </h3>
                  <p className="text-[#64748B] text-sm lg:text-base leading-relaxed mb-6 max-w-md">
                    {t(
                      'Your entire institution — admissions, fee collection, attendance, HR, exams, timetables — managed from one intelligent dashboard.',
                      'مؤسستك بالكامل — القبول وتحصيل الرسوم والحضور والموارد البشرية والامتحانات والجداول — تُدار من لوحة تحكم ذكية واحدة.'
                    )}
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-black tracking-tight text-[#0D9488]">{t('47 hrs', '47 ساعة')}</span>
                    <span className="text-sm text-[#64748B]">{t('saved per staff member, per month', 'يتم توفيرها لكل موظف شهرياً')}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0D9488] group-hover:gap-3 transition-all">
                    {t('Explore Cubico Manage', 'استكشف كيوبيكو إدارة')}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                {/* Dashboard mockup */}
                <div className="relative flex items-end lg:items-center justify-center overflow-hidden px-4 pb-4 lg:p-6 xl:p-8">
                  <div className="w-full max-w-[540px] rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
                    <div className="bg-[#f8f9fb] px-3.5 py-2 flex items-center gap-2 border-b border-gray-200/60">
                      <div className="flex gap-1.5"><div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" /><div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" /><div className="w-[9px] h-[9px] rounded-full bg-[#28C840]" /></div>
                      <div className="flex-1 ml-2"><div className="bg-white rounded-md px-3 py-[3px] text-[10px] text-gray-400 border border-gray-100 w-fit">app.cubico.tech/dashboard</div></div>
                    </div>
                    <div className="p-4 lg:p-5 bg-[#f5f7fa]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold bg-[#0D9488]">C</div>
                          <div><div className="text-[11px] font-bold text-gray-900">Springfield Academy</div><div className="text-[9px] text-gray-400">Academic Year 2025-26</div></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {[
                          { label: 'Total Students', val: '2,847', delta: '+12%' },
                          { label: 'Attendance', val: '94.2%', delta: '+2.1%' },
                          { label: 'Fee Collected', val: '\u20B918.4L', delta: '78%' },
                          { label: 'Staff', val: '186', delta: '+4' },
                        ].map((c, ci) => (
                          <div key={ci} className="bg-white rounded-lg p-2.5 border border-gray-100/80 shadow-sm">
                            <span className="text-[9px] font-bold text-emerald-500 block mb-1">{c.delta}</span>
                            <div className="text-sm font-extrabold text-gray-900 leading-none">{c.val}</div>
                            <div className="text-[9px] text-gray-400 mt-0.5">{c.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end gap-[3px] h-16 bg-white rounded-lg p-3 border border-gray-100/80">
                        {[40,65,45,80,60,90,75,95,70,85,92,78].map((h, hi) => (
                          <div key={hi} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: hi === 11 ? '#0D9488' : 'rgba(13,148,136,0.2)' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none bg-[#0D9488]" />
                </div>
              </div>
            </motion.a>

            {/* Module 2: Cubico Learn — Animation Player */}
            <motion.a
              href="/solutions/animation-studio"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-[20px] border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(160deg, #ECFDF5 0%, #ffffff 60%)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <div className="p-6 lg:p-7 flex flex-col h-full">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit mb-4 bg-[#10B981]/10 text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> {t('LEARN', 'تعلّم')}
                </span>
                <h3 className="text-xl lg:text-2xl font-extrabold text-[#0F172A] mb-2 tracking-tight">{t('Cubico Learn\u2122', 'كيوبيكو تعلّم\u2122')}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(
                    'Professional 2D & 3D animated lessons in English, Arabic & Urdu — designed for K-12 curricula.',
                    'دروس متحركة احترافية ثنائية وثلاثية الأبعاد بالإنجليزية والعربية والأردية — مصممة لمناهج K-12.'
                  )}
                </p>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-2xl font-black text-[#10B981]">200+</span>
                  <span className="text-xs text-[#64748B]">{t('animated lessons in 3 languages', 'درس متحرك بـ 3 لغات')}</span>
                </div>
                {/* Mini mockup */}
                <div className="flex-1 mt-auto">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200/40 bg-white">
                    <div className="bg-[#f8f9fb] px-3 py-1.5 flex items-center gap-1.5 border-b border-gray-100">
                      <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-[#FF5F57]" /><div className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><div className="w-2 h-2 rounded-full bg-[#28C840]" /></div>
                      <div className="flex-1 ml-1.5"><div className="bg-white rounded px-2 py-[2px] text-[9px] text-gray-400 border border-gray-100 w-fit">learn.cubico.tech</div></div>
                    </div>
                    <div className="p-3 bg-gradient-to-b from-emerald-50/40 to-white">
                      <div className="relative rounded-lg overflow-hidden mb-3 bg-emerald-50/50 aspect-video flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm">
                          <Play size={18} className="ml-0.5 text-[#10B981]" />
                        </div>
                        <div className="absolute top-2.5 left-3">
                          <div className="px-2 py-0.5 rounded-full text-[8px] font-bold text-white bg-[#10B981]">BIOLOGY</div>
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-gray-600">The Water Cycle</span>
                            <span className="text-[9px] text-gray-400">3:24 / 8:10</span>
                          </div>
                          <div className="w-full bg-white/50 rounded-full h-1 mt-1"><div className="h-1 rounded-full w-[42%] bg-[#10B981]" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-5 text-sm font-bold text-[#10B981] group-hover:gap-2.5 transition-all">
                  {t('Explore Cubico Learn', 'استكشف كيوبيكو تعلّم')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>

            {/* Module 3: Smart LMS */}
            <motion.a
              href="/solutions/smart-lms"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group relative rounded-[20px] border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(160deg, #F0FDFA 0%, #ffffff 60%)', borderColor: 'rgba(20,184,166,0.2)' }}
            >
              <div className="p-6 lg:p-7 flex flex-col h-full">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit mb-4 bg-[#14B8A6]/10 text-[#14B8A6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" /> {t('TEACH', 'تدريس')}
                </span>
                <h3 className="text-xl lg:text-2xl font-extrabold text-[#0F172A] mb-2 tracking-tight">{t('Smart LMS', 'نظام إدارة التعلم الذكي')}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(
                    'AI-powered learning management with adaptive course paths, progress tracking, and interactive assessments.',
                    'إدارة تعلم مدعومة بالذكاء الاصطناعي مع مسارات دورات تكيفية وتتبع التقدم وتقييمات تفاعلية.'
                  )}
                </p>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-2xl font-black text-[#14B8A6]">85K+</span>
                  <span className="text-xs text-[#64748B]">{t('active learners across 3 countries', 'متعلم نشط في 3 دول')}</span>
                </div>
                {/* Mini LMS mockup */}
                <div className="flex-1 mt-auto">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200/40 bg-white">
                    <div className="bg-[#f8f9fb] px-3 py-1.5 flex items-center gap-1.5 border-b border-gray-100">
                      <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-[#FF5F57]" /><div className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><div className="w-2 h-2 rounded-full bg-[#28C840]" /></div>
                      <div className="flex-1 ml-1.5"><div className="bg-white rounded px-2 py-[2px] text-[9px] text-gray-400 border border-gray-100 w-fit">lms.cubico.tech</div></div>
                    </div>
                    <div className="p-3 bg-gradient-to-b from-teal-50/30 to-white">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { title: 'Physics 101', students: 48, progress: 72, color: '#14B8A6' },
                          { title: 'Chemistry', students: 36, progress: 45, color: '#6366F1' },
                          { title: 'Biology', students: 52, progress: 89, color: '#10B981' },
                          { title: 'Math', students: 41, progress: 33, color: '#F59E0B' },
                        ].map((course, ci) => (
                          <div key={ci} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                            <div className="text-[10px] font-bold text-gray-800 mb-0.5">{course.title}</div>
                            <div className="text-[8px] text-gray-400 mb-1.5">{course.students} students</div>
                            <div className="w-full bg-gray-100 rounded-full h-1">
                              <div className="h-1 rounded-full" style={{ width: `${course.progress}%`, backgroundColor: course.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-5 text-sm font-bold text-[#14B8A6] group-hover:gap-2.5 transition-all">
                  {t('Explore Smart LMS', 'استكشف نظام التعلم الذكي')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-5 text-sm text-[#64748B]"
          >
            {[
              { icon: Shield, text: t('ISO 27001 Certified', 'شهادة ISO 27001') },
              { icon: Globe, text: t('Used across 12+ countries', 'مستخدم في أكثر من 12 دولة') },
              { icon: Award, text: t('Top EdTech 2025', 'أفضل تقنية تعليمية 2025') },
            ].map((badge, bi) => (
              <div key={bi} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                <badge.icon size={14} className="text-[#14B8A6]" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SOCIAL PROOF — Testimonials (region-segmented) + Partners
         Psychology: Trust transfer from peer institutions.
         Photo avatars + location chips for credibility.
         ═══════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-teal-200/60 bg-teal-50/60 text-[#14B8A6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                {t('Testimonials', 'الشهادات')}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-4"
            >
              {t('Trusted by ', 'موثوق من قبل ')}<span className="shimmer-text">{t('educators worldwide', 'معلمين حول العالم')}</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-[#64748B] text-sm font-medium">{t('4.9/5 from 760+ reviews', '4.9/5 من أكثر من 760 مراجعة')}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, i) => {
              const gradients = [
                'linear-gradient(135deg,#14B8A6,#10B981)',
                'linear-gradient(135deg,#0D9488,#14B8A6)',
                'linear-gradient(135deg,#0F766E,#0D9488)',
              ];
              const chips = [
                { bg: 'rgba(20,184,166,0.08)', fg: '#14B8A6' },
                { bg: 'rgba(16,185,129,0.08)', fg: '#10B981' },
                { bg: 'rgba(13,148,136,0.08)', fg: '#0D9488' },
              ];
              return (
                <motion.div key={testimonial.name} variants={fadeUp} custom={i}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                  className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm hover:shadow-2xl cursor-default"
                >
                  {/* Decorative quote */}
                  <div className="absolute -top-3 -left-1 leading-none select-none pointer-events-none text-gray-100"
                    style={{ fontSize: '6.5rem', fontFamily: 'Georgia,serif', lineHeight: 1 }}>&ldquo;</div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4 relative">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-auto text-[9px] font-bold text-gray-300 tracking-wider">{t('VERIFIED', 'موثّق')}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm relative">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: gradients[i] }}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#0F172A] text-sm truncate">{testimonial.name}</h4>
                      <p className="text-xs text-[#64748B]">{testimonial.role}, {testimonial.company}</p>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: chips[i].bg, color: chips[i].fg }}>
                      {testimonial.location}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PARTNER LOGOS MARQUEE ═══════════ */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg,white 0%,transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg,white 0%,transparent 100%)' }} />
        <p className="text-center text-[10px] font-bold text-gray-300 tracking-[0.22em] uppercase mb-6">
          {t('Trusted by institutions across 3 countries', 'موثوق من قبل مؤسسات في 3 دول')}
        </p>
        <div className="flex animate-marquee-slow" style={{ width: 'max-content' }}>
          {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
            <div key={i} className="flex-shrink-0 mx-4 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-gray-50 cursor-default hover:border-[#14B8A6]/30 hover:bg-[#14B8A6]/5 transition-all group">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6]/25 group-hover:bg-[#14B8A6]/60 transition-colors" />
              <span className="text-gray-400 font-heading font-bold text-sm whitespace-nowrap group-hover:text-[#14B8A6] transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         STATS SECTION — Dark overlay with animated counters
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2560&q=80"
          alt="Books and education background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#020617]/92" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#14B8A6]/12 rounded-full filter blur-[110px] animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#10B981]/10 rounded-full filter blur-[110px] animate-float2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label}
                  color={['#14B8A6', '#10B981', '#2DD4BF', '#34D399'][i]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         CTA + DEMO FORM SECTION
         Psychology: Strong demo push with value-stacking checklist.
         ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-[#F8FAFC] bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-teal-200/60 bg-teal-50/60 text-[#14B8A6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                  {t('Book a Demo', 'احجز عرضاً')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-6"
              >
                {t('See Cubico in action — ', 'شاهد كيوبيكو في العمل — ')}<br />
                <span className="shimmer-text">{t('free personalized demo', 'عرض مجاني مخصص')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#64748B] leading-relaxed mb-8">
                {t(
                  "Walk through the LMS, ERP, animated content, and marketing tools with our team. We'll customize the demo to your curriculum, student count, and goals.",
                  'تصفح نظام إدارة التعلم ونظام تخطيط الموارد والمحتوى المتحرك وأدوات التسويق مع فريقنا. سنخصص العرض حسب منهجك وعدد طلابك وأهدافك.'
                )}
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-3 mb-6">
                {[
                  { text: t('Full LMS demo with your curriculum', 'عرض كامل لنظام التعلم مع منهجك'), emoji: '\uD83D\uDCBB' },
                  { text: t('ERP system walkthrough', 'جولة في نظام تخطيط الموارد'), emoji: '\uD83C\uDFE2' },
                  { text: t('Animated content preview', 'معاينة المحتوى المتحرك'), emoji: '\uD83C\uDFA5' },
                  { text: t('Custom pricing for your needs', 'أسعار مخصصة لاحتياجاتك'), emoji: '\uD83D\uDCB0' },
                  { text: t('Implementation timeline review', 'مراجعة الجدول الزمني للتنفيذ'), emoji: '\uD83D\uDCC5' },
                ].map((item, idx) => (
                  <motion.div key={item.text}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.07 * idx, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#14B8A6]/25 transition-all">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="text-sm text-gray-600 font-medium flex-1">{item.text}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#14B8A6] flex-shrink-0" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={4}
                className="flex items-center gap-3 p-4 rounded-2xl border bg-teal-50/50 border-[#14B8A6]/15">
                <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">{t('We respond within', 'نرد خلال')} <span className="text-[#14B8A6] font-bold">{t('24 hours', '24 ساعة')}</span>{t(', guaranteed.', '، مضمون.')}</span>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#14B8A6]" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-[#0F172A] mb-2">{t('Thank You!', 'شكراً لك!')}</h3>
                    <p className="text-[#64748B]">{t("We'll be in touch within 24 hours.", 'سنتواصل معك خلال 24 ساعة.')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input type="text" placeholder={t('Your Name *', 'اسمك *')} value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
                      <input type="text" placeholder={t('Company *', 'الشركة *')} value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="form-input" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input type="tel" placeholder={t('Phone *', 'الهاتف *')} value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-input" required />
                      <input type="email" placeholder={t('Email *', 'البريد الإلكتروني *')} value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" required />
                    </div>
                    <select value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="form-select">
                      <option value="">{t('Select Position', 'اختر المنصب')}</option>
                      <option value="principal">{t('Principal / Head of School', 'مدير / رئيس المدرسة')}</option>
                      <option value="director">{t('Director / Board Member', 'مدير / عضو مجلس إدارة')}</option>
                      <option value="it_head">{t('IT Head / Administrator', 'رئيس تقنية المعلومات / مسؤول')}</option>
                      <option value="teacher">{t('Teacher / Department Head', 'معلم / رئيس قسم')}</option>
                      <option value="other">{t('Other', 'أخرى')}</option>
                    </select>
                    <select value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: e.target.value })} className="form-select">
                      <option value="">{t('Number of Students / Staff', 'عدد الطلاب / الموظفين')}</option>
                      <option value="1-50">1 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="501-1000">501 – 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    <button type="submit" disabled={formStatus === 'loading'} className="btn-primary w-full justify-center text-base">
                      {formStatus === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('Sending...', 'جارِ الإرسال...')}
                        </span>
                      ) : (
                        <>{t('Get Free Demo', 'احصل على عرض مجاني')} <ArrowRight className="w-4 h-4 rtl:rotate-180" /></>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">{t('Something went wrong. Please try again.', 'حدث خطأ ما. يرجى المحاولة مرة أخرى.')}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         FAQ SECTION
         ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-teal-200/60 bg-teal-50/60 text-[#14B8A6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                  {t('FAQ', 'الأسئلة الشائعة')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-6"
              >
                {t('Questions schools ', 'أسئلة المدارس ')}<br />
                <span className="shimmer-text">{t('ask us most', 'الأكثر شيوعاً')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#64748B] leading-relaxed mb-8">
                {t(
                  "From onboarding timelines to multilingual support — here's what principals and IT heads want to know before signing up.",
                  'من الجداول الزمنية للإعداد إلى الدعم متعدد اللغات — إليك ما يريد المديرون ورؤساء تقنية المعلومات معرفته قبل التسجيل.'
                )}
              </motion.p>

              {/* FAQ Visual */}
              <motion.div variants={fadeUp} custom={3} className="rounded-3xl overflow-hidden hidden lg:block">
                <div className="relative" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                    alt="Students learning in a modern classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{t('Still have questions?', 'لا تزال لديك أسئلة؟')}</h4>
                        <p className="text-sm text-white/60">{t('Our team is ready to help', 'فريقنا مستعد للمساعدة')}</p>
                      </div>
                    </div>
                    <Link href="/contact" className="btn-primary text-sm">
                      {t('Contact Us', 'تواصل معنا')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Accordion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="py-5 border-b border-gray-100 last:border-0"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-start justify-between w-full text-left gap-3 group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={openFaq === i ? { backgroundColor: '#14B8A6', color: '#fff' } : { backgroundColor: '#F1F5F9', color: '#94A3B8' }}>
                        {i + 1}
                      </div>
                      <span className="font-semibold text-sm text-[#0F172A] pr-2 group-hover:text-[#14B8A6] transition-colors">{faq.q}</span>
                    </div>
                    <span className="flex-shrink-0 mt-0.5">
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-[#14B8A6]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 pr-6 pt-3 pb-1">
                          <p className="text-[#64748B] text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </>
  );
}
