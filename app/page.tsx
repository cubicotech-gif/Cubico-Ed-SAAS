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
    boxShadow: '0 20px 60px rgba(13,124,107,0.12)',
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
function StatCounter({ value, suffix, label, color = '#0D7C6B' }: { value: number; suffix: string; label: string; color?: string }) {
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
  const [showFloatingCta, setShowFloatingCta] = useState(false);
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

  /* ── Floating CTA: show after scrolling past hero ── */
  useEffect(() => {
    const onScroll = () => setShowFloatingCta(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        @keyframes pulse-soft { 0%,100%{ box-shadow:0 0 0 0 rgba(13,124,107,0.35); } 50%{ box-shadow:0 0 0 12px rgba(13,124,107,0); } }
        .animate-float        { animation:float 7s ease-in-out infinite; }
        .animate-float2       { animation:float2 9s ease-in-out infinite; }
        .animate-float3       { animation:float3 11s ease-in-out infinite; }
        .animate-marquee-slow { animation:marquee 38s linear infinite; }
        .animate-glow-breath  { animation:glow-breath 4.5s ease-in-out infinite; }
        .animate-pulse-soft   { animation:pulse-soft 2.5s ease-in-out infinite; }
        .shimmer-text {
          background:linear-gradient(90deg,#0D7C6B 0%,#0F8C7F 30%,#3BA697 50%,#0F8C7F 70%,#0D7C6B 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 6s ease-in-out infinite;
        }
      `}</style>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <Header />

      {/* ═══════════════════════════════════════════════════════════
         HERO — 2026 Premium Light (BetterUp × Notion)
         Psychology: Bold teal keywords = instant scan in <2 seconds.
         Realistic mockups = "this is a real working product" trust.
         20% overlay on classroom = warm, human, welcoming.
         55/45 split: text left, visual proof right.
         ═══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative overflow-hidden bg-[#FAFAF7]"
        style={{ minHeight: '100dvh' }}
      >
        {/* ── Warm bright classroom background — 20% light overlay ── */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2560&q=80"
            alt="Bright welcoming Islamic and K-12 school classroom with engaged students"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(155deg, rgba(250,250,247,0.92) 0%, rgba(250,250,247,0.86) 40%, rgba(250,250,247,0.76) 70%, rgba(250,250,247,0.70) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 55% at 28% 48%, rgba(13,124,107,0.03) 0%, transparent 70%)',
        }} />

        {/* ═══ 2-COLUMN LAYOUT ═══ */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-24 md:pb-32">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Text (55%) ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-[540px]"
            >
              {/* Tagline pill */}
              <motion.div variants={fadeUp} custom={0} className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#0A6558] border border-[#0D7C6B]/15 bg-white/80 backdrop-blur-sm shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B] animate-pulse flex-shrink-0" />
                  {t(
                    'Trusted by 760+ schools in Pakistan, GCC & Canada',
                    'موثوق من أكثر من 760 مدرسة في باكستان والخليج وكندا'
                  )}
                </span>
              </motion.div>

              {/* Single clear promise headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.3rem] xl:text-[3.6rem] font-heading font-extrabold text-[#0F172A] leading-[1.08] tracking-[-0.03em] mb-7"
              >
                {t('Your school deserves ', 'مدرستك تستحق ')}
                <span className="shimmer-text">{t('tools that actually work.', 'أدوات تعمل فعلاً.')}</span>
              </motion.h1>

              {/* Empathetic subheadline — one sharp sentence */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-[#475569] text-lg md:text-[1.25rem] leading-relaxed mb-10 max-w-[500px]"
              >
                {t(
                  'One platform replaces your spreadsheets, fills your classrooms, and gives teachers animated lessons students actually enjoy.',
                  'منصة واحدة تحل محل جداولك وتملأ فصولك وتمنح المعلمين دروساً متحركة يستمتع بها الطلاب فعلاً.'
                )}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  {t('See It in Action', 'شاهدها تعمل')}
                  <ArrowRight size={18} className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] font-semibold text-[15px] px-7 py-4 rounded-full border border-[#CBD5E1] hover:border-[#94A3B8] bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  {t('Explore Solutions', 'استكشف الحلول')}
                </Link>
              </motion.div>

              {/* Trust bar — specific, scannable */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-wrap items-center gap-4 text-[13px] text-[#64748B]"
              >
                <span className="font-medium"><span className="text-[#0F172A] font-extrabold">760+</span> {t('schools', 'مدرسة')}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#CBD5E1]" />
                <span><span className="text-[#0F172A] font-extrabold">85K+</span> {t('students', 'طالب')}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#CBD5E1]" />
                <span><span className="text-[#0F172A] font-extrabold">3</span> {t('countries', 'دول')}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#CBD5E1]" />
                <span className="text-[#0D7C6B] font-semibold">{t('Live in 4 weeks', 'جاهز في 4 أسابيع')}</span>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Big scannable outcome cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:flex flex-col gap-4 max-w-[420px]"
            >
              {/* Outcome card 1 */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#E2E8F0] shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0D7C6B] to-[#0F8C7F] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0D7C6B]/20">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">+340%</div>
                    <div className="text-sm text-[#64748B]">{t('average enrollment increase', 'متوسط زيادة التسجيل')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Outcome card 2 */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#E2E8F0] shadow-lg ml-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0F8C7F] to-[#0A6E64] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0F8C7F]/20">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">94.2%</div>
                    <div className="text-sm text-[#64748B]">{t('student attendance rate', 'معدل حضور الطلاب')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Outcome card 3 */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#E2E8F0] shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A6558] to-[#085249] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0A6558]/20">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">47 {t('hrs', 'ساعة')}</div>
                    <div className="text-sm text-[#64748B]">{t('saved per staff member/month', 'يوفرها كل موظف شهرياً')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Subtle glow behind cards */}
              <div className="absolute -inset-8 -z-10 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(13,124,107,0.05) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }} />
            </motion.div>
          </div>
        </div>

        {/* Animated scroll cue — pulls the eye down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">{t('Scroll to explore', 'مرر للاستكشاف')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-[#0D7C6B]" />
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </section>

      {/* ═══════ "IS THIS FOR ME?" — Quick persona ID ═══════
         Psychology: Self-identification in <3 seconds. Visitor
         sees themselves and thinks "yes, this is for me."
         ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="text-[#94A3B8] text-sm font-semibold tracking-wide mb-8">
              {t('760 schools already made the switch. Here\'s why', '760 مدرسة انتقلت بالفعل. إليك السبب')} <span className="text-[#0D7C6B]">&darr;</span>
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-heading font-extrabold text-[#0F172A] mb-10">
              {t('This is for you if you\'re a...', 'هذا لك إذا كنت...')}
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Users, role: t('Principal or School Owner', 'مدير أو مالك مدرسة'), pain: t('who wants to grow enrollment and run operations smoothly', 'يريد زيادة التسجيل وإدارة العمليات بسلاسة') },
              { icon: GraduationCap, role: t('Academic Director', 'مدير أكاديمي'), pain: t('who needs engaging content and a modern LMS for teachers', 'يحتاج محتوى جذاب ونظام تعلم حديث للمعلمين') },
              { icon: Monitor, role: t('IT Head or Admin', 'رئيس تقنية أو مسؤول'), pain: t('who\'s tired of duct-taping 5 different systems together', 'سئم من ربط 5 أنظمة مختلفة ببعضها') },
            ].map((persona, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-[#FAFAF7] hover:border-[#0D7C6B]/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0D7C6B]/10 to-[#0F8C7F]/10 flex items-center justify-center mb-4">
                  <persona.icon size={22} className="text-[#0D7C6B]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm mb-1">{persona.role}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{persona.pain}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         ROLE-BASED WAYFINDING — Emotional & Visual Centerpiece
         Psychology: Hick's Law — 3 strong choices reduces decision
         fatigue. Principals self-identify their #1 pain and click.
         Human-centric photography for emotional connection.
         ═══════════════════════════════════════════════════════════ */}
      <section id="wayfinding" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle teal gradient accent in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(13,124,107,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section title — empathetic, clear */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-5">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#0D7C6B]/15 bg-[#F5F7F5]/60 text-[#0D7C6B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B]" />
                {t('What We Solve', 'ما نحله')}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-[3rem] font-heading font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4"
            >
              {t('What\'s your biggest ', 'ما هو أكبر ')}<span className="shimmer-text">{t('headache right now?', 'تحدٍ لديك الآن؟')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-[#64748B] text-lg max-w-2xl mx-auto">
              {t(
                'Every school is different. Pick what matters most to you — we have a solution ready.',
                'كل مدرسة مختلفة. اختر ما يهمك أكثر — لدينا الحل جاهز.'
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
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0D7C6B]/30 shadow-sm hover:shadow-2xl hover:shadow-[#0D7C6B]/8 transition-all duration-300 cursor-pointer"
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
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D7C6B]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Megaphone size={12} /> {t('GROW', 'نمو')}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 lg:p-7">
                {/* Bold headline — scannability with inline keywords */}
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('"We need ', '"نحتاج ')}<span className="text-[#0D7C6B]">{t('more students', 'المزيد من الطلاب')}</span>{t(' this year"', ' هذا العام"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'We build your school a professional website, run Google Ads, and set up enrollment funnels that actually bring parents to your door.',
                    'نبني لمدرستك موقعاً احترافياً ونشغل إعلانات جوجل ونعد مسارات تسجيل تجلب الآباء إلى بابك فعلاً.'
                  )}
                </p>

                {/* Social proof stat */}
                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F5F7F5] border border-[#0D7C6B]/10">
                  <TrendingUp size={16} className="text-[#0D7C6B] flex-shrink-0" />
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
                  className="inline-flex items-center gap-2 text-[#0D7C6B] font-bold text-sm group-hover:gap-3 transition-all duration-200"
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
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0F8C7F]/30 shadow-sm hover:shadow-2xl hover:shadow-[#0F8C7F]/10 transition-all duration-300 cursor-pointer"
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
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F8C7F]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <GraduationCap size={12} /> {t('TEACH', 'تعليم')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('"Students are ', '"الطلاب ')}<span className="text-[#0F8C7F]">{t('bored and disengaged', 'يشعرون بالملل')}</span>{t('"', '"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    '200+ animated video lessons in English, Arabic & Urdu, plus a smart LMS that adapts to each student. Learning they actually want to do.',
                    'أكثر من 200 درس فيديو متحرك بالإنجليزية والعربية والأردية، بالإضافة إلى نظام تعلم ذكي يتكيف مع كل طالب. تعلّم يرغبون فيه فعلاً.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F0F5F2] border border-[#0F8C7F]/10">
                  <Users size={16} className="text-[#0F8C7F] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '85K+ active learners \u2022 Students stay 4x longer',
                      'أكثر من 85 ألف متعلم نشط \u2022 الطلاب يبقون 4 أضعاف'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/smart-lms"
                  className="inline-flex items-center gap-2 text-[#0F8C7F] font-bold text-sm group-hover:gap-3 transition-all duration-200"
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
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0A6558]/30 shadow-sm hover:shadow-2xl hover:shadow-[#0A6558]/8 transition-all duration-300 cursor-pointer"
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
                  {t('"I\'m drowning in ', '"أغرق في ')}<span className="text-[#0A6558]">{t('admin work', 'العمل الإداري')}</span>{t('"', '"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'Admissions, fees, attendance, HR, exams, timetables — one dashboard replaces the chaos. Staff save 47 hours a month.',
                    'القبول والرسوم والحضور والموارد البشرية والامتحانات والجداول — لوحة تحكم واحدة تحل محل الفوضى. يوفر الموظفون 47 ساعة شهرياً.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F5F7F5] border border-[#0A6558]/10">
                  <Zap size={16} className="text-[#0A6558] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '47 hours saved per staff/month \u2022 94.2% attendance',
                      '47 ساعة توفير لكل موظف/شهر \u2022 94.2% حضور'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/school-erp"
                  className="inline-flex items-center gap-2 text-[#0A6558] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Cubico Manage\u2122', 'استكشف Cubico Manage\u2122')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* ── 3 Additional Cards — second row ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8"
          >
            {/* ────── CARD 4: Animation Studio (Violet accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={0}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#8B5CF6]/30 shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80"
                  alt="Creative animation and digital content production studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Film size={12} /> {t('CREATE', 'إبداع')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('"We need ', '"نحتاج ')}<span className="text-[#8B5CF6]">{t('better content', 'محتوى أفضل')}</span>{t(' in our language"', ' بلغتنا"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'Studio-quality animated lessons in English, Arabic & Urdu — aligned to your curriculum. Students actually pay attention.',
                    'دروس متحركة بجودة الاستوديو بالإنجليزية والعربية والأردية — متوافقة مع منهجك. الطلاب ينتبهون فعلاً.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#F5F3FF] border border-[#8B5CF6]/10">
                  <Sparkles size={16} className="text-[#8B5CF6] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      '200+ animated lessons \u2022 3 languages \u2022 Curriculum-aligned',
                      'أكثر من 200 درس متحرك \u2022 3 لغات \u2022 متوافق مع المنهج'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/animation-studio"
                  className="inline-flex items-center gap-2 text-[#8B5CF6] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Animation Studio', 'استكشف استوديو الرسوم المتحركة')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* ────── CARD 5: Web Development (Blue accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={1}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#3B82F6]/30 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Modern website design and development on screen"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Globe size={12} /> {t('BUILD', 'بناء')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('"Our website looks ', '"موقعنا يبدو ')}<span className="text-[#3B82F6]">{t('outdated', 'قديماً')}</span>{t('"', '"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'We build fast, modern school websites with online admissions, parent portals, and SEO — live in 2 weeks.',
                    'نبني مواقع مدرسية سريعة وعصرية مع قبول إلكتروني وبوابات آباء وتحسين محركات بحث — جاهزة في أسبوعين.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#EFF6FF] border border-[#3B82F6]/10">
                  <Monitor size={16} className="text-[#3B82F6] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      'Live in 2 weeks \u2022 SEO-optimized \u2022 Mobile-first design',
                      'جاهز في أسبوعين \u2022 محسن لمحركات البحث \u2022 تصميم متجاوب'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/web-development"
                  className="inline-flex items-center gap-2 text-[#3B82F6] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Web Solutions', 'استكشف حلول الويب')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* ────── CARD 6: Mobile Apps (Orange accent) ────── */}
            <motion.div
              variants={fadeUp}
              custom={2}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#F59E0B]/30 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt="Mobile app interface on smartphone showing school application"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                  <Smartphone size={12} /> {t('CONNECT', 'تواصل')}
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="text-xl lg:text-[1.4rem] font-extrabold text-[#0F172A] mb-3 leading-snug tracking-tight">
                  {t('"Parents never know ', '"الآباء لا يعرفون ')}<span className="text-[#F59E0B]">{t('what\'s happening', 'ما يحدث')}</span>{t('"', '"')}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {t(
                    'Your own branded iOS & Android app — grades, attendance, fee payments, and direct messaging. Parents stay in the loop.',
                    'تطبيقك الخاص على iOS و Android — الدرجات والحضور ودفع الرسوم والرسائل المباشرة. الآباء يبقون على اطلاع.'
                  )}
                </p>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-[#FFFBEB] border border-[#F59E0B]/10">
                  <Smartphone size={16} className="text-[#F59E0B] flex-shrink-0" />
                  <span className="text-sm text-[#0F172A] font-semibold">
                    {t(
                      'iOS + Android \u2022 Push notifications \u2022 Branded to your school',
                      'iOS + Android \u2022 إشعارات فورية \u2022 بعلامة مدرستك'
                    )}
                  </span>
                </div>

                <Link
                  href="/solutions/mobile-apps"
                  className="inline-flex items-center gap-2 text-[#F59E0B] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {t('Explore Mobile Apps', 'استكشف تطبيقات الجوال')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ BRIDGE LINE: Cards → How It Works ═══════ */}
      <div className="py-10 bg-white text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#94A3B8] text-sm font-semibold tracking-wide"
        >
          {t('Getting started is easier than you think', 'البدء أسهل مما تعتقد')} <span className="text-[#0D7C6B]">&darr;</span>
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         HOW IT WORKS — 3-step process bridge
         Psychology: Reduces uncertainty. Visitor knows exactly
         what happens next. Numbered steps = sense of control.
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28 bg-[#FAFAF7] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-5">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#0D7C6B]/15 bg-[#F5F7F5]/60 text-[#0D7C6B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B]" />
                {t('How It Works', 'كيف يعمل')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
              {t('From first call to ', 'من أول اتصال إلى ')}<span className="shimmer-text">{t('fully running — in 4 weeks.', 'تشغيل كامل — في 4 أسابيع.')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#64748B] text-lg max-w-xl mx-auto">
              {t('No complicated setup. No months of waiting. Here\'s what happens:', 'بدون إعداد معقد. بدون أشهر من الانتظار. إليك ما يحدث:')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
          >
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[#0D7C6B]/20 via-[#0D7C6B]/40 to-[#0D7C6B]/20" />

            {[
              {
                step: '01',
                title: t('We Listen', 'نستمع'),
                desc: t('Book a free 30-minute call. We learn about your school, your pain points, and your goals. No sales pitch — just a real conversation.', 'احجز اتصالاً مجانياً لمدة 30 دقيقة. نتعرف على مدرستك وتحدياتك وأهدافك. بدون عرض مبيعات — مجرد محادثة حقيقية.'),
                icon: Phone,
              },
              {
                step: '02',
                title: t('We Build', 'نبني'),
                desc: t('Our team configures your platform, migrates your data, and creates your custom setup. You review everything before going live.', 'يقوم فريقنا بتهيئة منصتك ونقل بياناتك وإنشاء إعدادك المخصص. تراجع كل شيء قبل الإطلاق.'),
                icon: Settings,
              },
              {
                step: '03',
                title: t('You Launch', 'تُطلق'),
                desc: t('We train your staff, go live together, and stay by your side. Dedicated support from a team that knows your name.', 'ندرب موظفيك ونطلق معاً ونبقى بجانبك. دعم مخصص من فريق يعرف اسمك.'),
                icon: Zap,
              },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i} className="text-center relative">
                <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center bg-white border-2 border-[#0D7C6B]/15 shadow-lg shadow-[#0D7C6B]/5 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5F7F5] to-[#F0F5F2] flex items-center justify-center">
                    <item.icon size={28} className="text-[#0D7C6B]" />
                  </div>
                </div>
                <div className="text-[11px] font-extrabold text-[#0D7C6B] tracking-[0.2em] uppercase mb-2">{t('Step', 'الخطوة')} {item.step}</div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              {t('Start With a Free Call', 'ابدأ باتصال مجاني')}
              <ArrowRight size={18} className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ BRIDGE LINE: How it works → Social Proof ═══════ */}
      <div className="py-10 bg-[#FAFAF7] text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#94A3B8] text-sm font-semibold tracking-wide"
        >
          {t('But don\'t take our word for it', 'لكن لا تأخذ كلامنا فقط')} <span className="text-[#0D7C6B]">&darr;</span>
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         DARK SOCIAL PROOF — Testimonials + Stats + Partners
         Psychology: Dark = premium. Pattern interrupt re-engages
         scrollers. All proof concentrated = overwhelming trust.
         ═══════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="relative overflow-hidden">
        {/* Dark background with subtle texture */}
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D7C6B]/6 rounded-full filter blur-[140px] animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F8C7F]/5 rounded-full filter blur-[140px] animate-float2" />
        </div>

        {/* ── Stats Row ── */}
        <div className="relative py-16 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                    color={['#0D7C6B', '#0F8C7F', '#3BA697', '#2EA894'][i]} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="relative py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-14"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#0D7C6B]/20 bg-[#0D7C6B]/10 text-[#3BA697]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B] animate-pulse" />
                  {t('Real Stories', 'قصص حقيقية')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-4"
              >
                {t('Don\'t take our word for it. ', 'لا تأخذ كلامنا. ')}<span className="shimmer-text">{t('Ask them.', 'اسألهم.')}</span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4 mt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/50 text-sm font-medium">{t('4.9/5 from 760+ principals', '4.9/5 من أكثر من 760 مدير')}</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, i) => {
                const gradients = [
                  'linear-gradient(135deg,#0D7C6B,#0F8C7F)',
                  'linear-gradient(135deg,#0A6558,#0D7C6B)',
                  'linear-gradient(135deg,#085249,#0A6558)',
                ];
                return (
                  <motion.div key={testimonial.name} variants={fadeUp} custom={i}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                    className="relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-7 overflow-hidden hover:bg-white/[0.07] hover:border-white/[0.12] transition-all cursor-default"
                  >
                    {/* Decorative quote */}
                    <div className="absolute -top-3 -left-1 leading-none select-none pointer-events-none text-white/[0.04]"
                      style={{ fontSize: '6.5rem', fontFamily: 'Georgia,serif', lineHeight: 1 }}>&ldquo;</div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 relative">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-auto text-[9px] font-bold text-white/20 tracking-wider">{t('VERIFIED', 'موثّق')}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-6 text-sm relative">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: gradients[i] }}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{testimonial.name}</h4>
                        <p className="text-xs text-white/40">{testimonial.role}, {testimonial.company}</p>
                      </div>
                      <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 bg-[#0D7C6B]/10 text-[#3BA697]">
                        {testimonial.location}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── Partner Logos Marquee ── */}
        <div className="relative py-12 border-t border-white/5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0B1120 0%, transparent 100%)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #0B1120 0%, transparent 100%)' }} />
          <p className="text-center text-[10px] font-bold text-white/15 tracking-[0.22em] uppercase mb-6">
            {t('Trusted by institutions across 3 countries', 'موثوق من قبل مؤسسات في 3 دول')}
          </p>
          <div className="flex animate-marquee-slow" style={{ width: 'max-content' }}>
            {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
              <div key={i} className="flex-shrink-0 mx-4 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] cursor-default hover:border-[#0D7C6B]/30 hover:bg-[#0D7C6B]/5 transition-all group">
                <div className="w-2 h-2 rounded-full bg-[#0D7C6B]/30 group-hover:bg-[#0D7C6B]/70 transition-colors" />
                <span className="text-white/25 font-heading font-bold text-sm whitespace-nowrap group-hover:text-[#0D7C6B] transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BRIDGE LINE: Proof → CTA ═══════ */}
      <div className="py-10 bg-[#FAFAF7] text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#94A3B8] text-sm font-semibold tracking-wide"
        >
          {t('Ready to see it yourself?', 'مستعد لتراه بنفسك؟')} <span className="text-[#0D7C6B]">&darr;</span>
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CTA + DEMO FORM SECTION
         Psychology: Low-pressure + urgency. Scarcity drives action.
         ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-[#FAFAF7]">
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
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#0D7C6B]/15 bg-[#F5F7F5]/60 text-[#0D7C6B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B]" />
                  {t('Book a Demo', 'احجز عرضاً')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-6"
              >
                {t('Curious? ', 'فضولي؟ ')}<span className="shimmer-text">{t('Let\'s talk.', 'لنتحدث.')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#64748B] leading-relaxed mb-8">
                {t(
                  "30 minutes. No sales pitch. We'll show you the platform using your curriculum, your student count, and your real goals — then you decide.",
                  '30 دقيقة. بدون عرض مبيعات. سنعرض لك المنصة باستخدام منهجك وعدد طلابك وأهدافك الحقيقية — ثم تقرر أنت.'
                )}
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-2.5 mb-6">
                {[
                  { text: t('See the LMS running your curriculum', 'شاهد نظام التعلم يعمل بمنهجك'), icon: BookOpen },
                  { text: t('Walk through the school dashboard', 'تجول في لوحة تحكم المدرسة'), icon: Layout },
                  { text: t('Watch sample animated lessons', 'شاهد نماذج من الدروس المتحركة'), icon: Film },
                  { text: t('Get a custom quote — no surprises', 'احصل على عرض سعر مخصص — بدون مفاجآت'), icon: Target },
                ].map((item, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * idx, duration: 0.35 }}
                    className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#0D7C6B]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={13} className="text-[#0D7C6B]" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              {/* Urgency + response guarantee */}
              <motion.div variants={fadeUp} custom={4} className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-2xl border bg-amber-50/60 border-amber-200/40">
                  <span className="text-lg flex-shrink-0">&#9200;</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {t('Only', 'فقط')} <span className="text-amber-600 font-bold">{t('6 onboarding slots', '6 أماكن إعداد')}</span> {t('left for Q2 2026', 'متبقية للربع الثاني 2026')}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl border bg-[#F5F7F5]/50 border-[#0D7C6B]/15">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D7C6B] animate-pulse flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">{t('We respond within', 'نرد خلال')} <span className="text-[#0D7C6B] font-bold">{t('24 hours', '24 ساعة')}</span>{t(', guaranteed.', '، مضمون.')}</span>
                </div>
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
                {/* Form header — reduces intimidation */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D7C6B] to-[#0F8C7F] flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#0D7C6B]/20">
                    <Phone size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">{t('Request Your Free Demo', 'اطلب عرضك المجاني')}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{t('Takes 30 seconds. We\'ll call you within 24hrs.', 'يستغرق 30 ثانية. سنتصل بك خلال 24 ساعة.')}</p>
                </div>
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#E0EFEB] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#0D7C6B]" />
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
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#0D7C6B]/15 bg-[#F5F7F5]/60 text-[#0D7C6B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C6B]" />
                  {t('FAQ', 'الأسئلة الشائعة')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-6"
              >
                {t('You\'re probably ', 'ربما ')}<span className="shimmer-text">{t('wondering...', 'تتساءل...')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#64748B] leading-relaxed mb-8">
                {t(
                  "Here are the questions principals and IT heads ask us before signing up.",
                  'إليك الأسئلة التي يطرحها المديرون ورؤساء تقنية المعلومات قبل التسجيل.'
                )}
              </motion.p>

              {/* Compact CTA card */}
              <motion.div variants={fadeUp} custom={3} className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hidden lg:block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D7C6B]/15 flex items-center justify-center">
                    <MessageSquare size={18} className="text-[#0D7C6B]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('Question not listed?', 'سؤالك غير مدرج؟')}</h4>
                    <p className="text-xs text-white/40">{t('Talk to a real human — no bots', 'تحدث مع إنسان حقيقي — بدون روبوتات')}</p>
                  </div>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white font-bold text-sm px-6 py-3 rounded-full w-full justify-center hover:shadow-lg hover:shadow-teal-500/20 transition-all">
                  {t('Chat With Us', 'تحدث معنا')} <ArrowRight size={14} className="rtl:rotate-180" />
                </Link>
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
                        style={openFaq === i ? { backgroundColor: '#0D7C6B', color: '#fff' } : { backgroundColor: '#F1F5F9', color: '#94A3B8' }}>
                        {i + 1}
                      </div>
                      <span className="font-semibold text-sm text-[#0F172A] pr-2 group-hover:text-[#0D7C6B] transition-colors">{faq.q}</span>
                    </div>
                    <span className="flex-shrink-0 mt-0.5">
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-[#0D7C6B]" />
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

      {/* ═══════════ FLOATING CTA BAR ═══════════
         Appears after scrolling past hero. Always-visible action.
         Psychology: Removes friction — CTA follows the visitor. */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-auto"
          >
            <div className="bg-[#0B1120]/95 backdrop-blur-xl border-t border-white/10 md:border md:rounded-2xl px-5 py-3.5 flex items-center gap-4 md:shadow-2xl">
              <div className="hidden sm:block">
                <p className="text-white text-sm font-bold">{t('Ready to transform your school?', 'مستعد لتحويل مدرستك؟')}</p>
                <p className="text-white/40 text-xs">{t('Free 30-min call. No commitment.', 'اتصال مجاني 30 دقيقة. بدون التزام.')}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-teal-500/25 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                {t('Book Free Call', 'احجز اتصالاً مجانياً')}
                <ArrowRight size={15} className="rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
