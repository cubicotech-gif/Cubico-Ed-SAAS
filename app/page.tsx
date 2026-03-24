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
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ═══════════════════════════════════════════
   COUNTER HOOK
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
   DATA
   ═══════════════════════════════════════════ */
// navLinks moved inside component for i18n access

// featureCards moved inside component for i18n access

// services moved inside component for i18n access

// testimonials moved inside component for i18n access

// faqs moved inside component for i18n access

// stats moved inside component for i18n access

// partners moved inside component for i18n access

// solutions moved inside component for i18n access

/* ═══════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════ */
function StatCounter({ value, suffix, label, color = '#818CF8' }: { value: number; suffix: string; label: string; color?: string }) {
  const { count, ref } = useCounter(value);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const pct = value > 0 ? Math.min(count / value, 1) : 0;
  return (
    <div ref={ref} className="text-center flex flex-col items-center">
      <div className="relative w-28 h-28 mb-3">
        <svg className="absolute inset-0 w-full h-full" style={{ transform:'rotate(-90deg)' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={String(circ)}
            strokeDashoffset={String(circ * (1 - pct))}
            style={{ transition:'stroke-dashoffset 0.04s linear', filter:`drop-shadow(0 0 8px ${color}70)` }}/>
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

  const stats = [
    { value: 760, suffix: '+', label: t('Institutions Served', 'مؤسسة تم خدمتها') },
    { value: 3, suffix: '', label: t('Countries Active', 'دول نشطة') },
    { value: 4, suffix: '', label: t('Weeks Avg Launch', 'أسابيع متوسط الإطلاق') },
    { value: 100, suffix: '%', label: t('Client Retention', 'نسبة الاحتفاظ بالعملاء') },
  ];

  const partners = [
    t('Al-Huffaz Academy', 'أكاديمية الحفاظ'),
    t('Al-Noor Academy', 'أكاديمية النور'),
    t('CIF Canada', 'مؤسسة CIF كندا'),
    t('Iqra Foundation', 'مؤسسة إقرأ'),
    t('Saudi Schools Network', 'شبكة المدارس السعودية'),
    t('TechEd Pakistan', 'تيك إد باكستان'),
  ];

  const products = [
    {
      id: 'manage',
      accent: '#2563EB',
      accentLight: '#EFF6FF',
      label: t('MANAGE', 'إدارة'),
      name: t('Cubico Manage™', 'كيوبيكو إدارة™'),
      pain: t('Still running your school on Excel sheets and WhatsApp groups?', 'هل لا تزال تدير مدرستك عبر جداول Excel ومجموعات واتساب؟'),
      desc: t('Your entire institution — admissions, fee collection, attendance, HR, exams, timetables — managed from one intelligent dashboard.', 'مؤسستك بالكامل — القبول وتحصيل الرسوم والحضور والموارد البشرية والامتحانات والجداول — تُدار من لوحة تحكم ذكية واحدة.'),
      stat: t('47 hrs', '47 ساعة'),
      statContext: t('saved per staff member, per month', 'يتم توفيرها لكل موظف شهرياً'),
      cta: t('Explore Cubico Manage', 'استكشف كيوبيكو إدارة'),
      ctaHref: '/solutions/school-erp',
      mockupUrl: 'app.cubico.tech/manage',
    },
    {
      id: 'learn',
      accent: '#D97706',
      accentLight: '#FFFBEB',
      label: t('LEARN', 'تعلّم'),
      name: t('Cubico Learn™', 'كيوبيكو تعلّم™'),
      pain: t('Students lose interest in static PDFs and outdated textbooks.', 'يفقد الطلاب الاهتمام بملفات PDF الثابتة والكتب المدرسية القديمة.'),
      desc: t('Professional 2D & 3D animated lessons in English, Arabic & Urdu — designed for K-12 curricula and ready to deploy across your classrooms.', 'دروس متحركة احترافية ثنائية وثلاثية الأبعاد بالإنجليزية والعربية والأردية — مصممة لمناهج K-12 وجاهزة للنشر في فصولك الدراسية.'),
      stat: '200+',
      statContext: t('animated lessons in 3 languages', 'درس متحرك بـ 3 لغات'),
      cta: t('Explore Cubico Learn', 'استكشف كيوبيكو تعلّم'),
      ctaHref: '/solutions/animation-studio',
      mockupUrl: 'learn.cubico.tech/lesson/water-cycle',
    },
    {
      id: 'lms',
      accent: '#0D9488',
      accentLight: '#F0FDFA',
      label: t('TEACH', 'تدريس'),
      name: t('Smart LMS', 'نظام إدارة التعلم الذكي'),
      pain: t("Teachers spend hours creating content that still doesn't engage.", 'يقضي المعلمون ساعات في إنشاء محتوى لا يزال غير تفاعلي.'),
      desc: t('AI-powered learning management with adaptive course paths, progress tracking, interactive assessments, and analytics that show exactly where each student stands.', 'إدارة تعلم مدعومة بالذكاء الاصطناعي مع مسارات دورات تكيفية وتتبع التقدم وتقييمات تفاعلية وتحليلات تُظهر بدقة مستوى كل طالب.'),
      stat: '85K+',
      statContext: t('active learners across 3 countries', 'متعلم نشط في 3 دول'),
      cta: t('Explore Smart LMS', 'استكشف نظام التعلم الذكي'),
      ctaHref: '/solutions/smart-lms',
      mockupUrl: 'lms.cubico.tech/dashboard',
    },
    {
      id: 'marketing',
      accent: '#7C3AED',
      accentLight: '#F5F3FF',
      label: t('GROW', 'نمو'),
      name: t('Cubico Marketing™', 'كيوبيكو تسويق™'),
      pain: t("Great school, empty seats. Your admissions pipeline shouldn't be a WhatsApp number.", 'مدرسة رائعة، مقاعد فارغة. لا ينبغي أن يكون خط القبول لديك مجرد رقم واتساب.'),
      desc: t('Professional school websites, SEO, Google Ads management, and enrollment funnels that turn website visitors into enrolled students.', 'مواقع مدرسية احترافية، تحسين محركات البحث، إدارة إعلانات جوجل، ومسارات تسجيل تحوّل زوار الموقع إلى طلاب مسجلين.'),
      stat: '3x',
      statContext: t('average enrollment increase in first semester', 'متوسط زيادة التسجيل في الفصل الأول'),
      cta: t('Explore Cubico Marketing', 'استكشف كيوبيكو تسويق'),
      ctaHref: '/solutions/web-development',
      mockupUrl: 'marketing.cubico.tech/analytics',
    },
  ];

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
      <style>{`
        @keyframes float      { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-20px); } }
        @keyframes float2     { 0%,100%{ transform:translateY(-10px); } 50%{ transform:translateY(14px); } }
        @keyframes float3     { 0%,100%{ transform:translateY(-5px) translateX(0); } 50%{ transform:translateY(10px) translateX(-8px); } }
        @keyframes marquee    { 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        @keyframes glow-breath{ 0%,100%{ opacity:0.4; transform:scale(1); } 50%{ opacity:0.75; transform:scale(1.06); } }
        @keyframes spin-slow  { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
        @keyframes pdrift     { 0%{ transform:translateY(0) scale(1); opacity:0.55; } 100%{ transform:translateY(-110px) translateX(25px) scale(0.3); opacity:0; } }
        @keyframes pdrift2    { 0%{ transform:translateY(0) scale(1); opacity:0.45; } 100%{ transform:translateY(-90px) translateX(-30px) scale(0.2); opacity:0; } }
        .animate-float        { animation:float 7s ease-in-out infinite; }
        .animate-float2       { animation:float2 9s ease-in-out infinite; }
        .animate-float3       { animation:float3 11s ease-in-out infinite; }
        .animate-marquee-slow { animation:marquee 38s linear infinite; }
        .animate-glow-breath  { animation:glow-breath 4.5s ease-in-out infinite; }
        .animate-spin-slow    { animation:spin-slow 22s linear infinite; }
        .shimmer-text {
          background:linear-gradient(90deg,#D4711A 0%,#E88C32 30%,#F4A94D 50%,#E88C32 70%,#D4711A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <Header />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        id="home"
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        {/* ── Background image — modern ed-tech classroom ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2560&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />
        {/* ── Dark warm overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(12,10,8,0.93) 0%, rgba(28,18,10,0.82) 35%, rgba(20,14,10,0.78) 60%, rgba(10,8,6,0.96) 100%)',
          }}
        />

        {/* ── Warm accent glow at center ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 50% 30%, rgba(232,140,50,0.1) 0%, transparent 70%)',
          }}
        />

        {/* ── Floating atmosphere orbs — warm orange tones ── */}
        <div className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full pointer-events-none animate-float"
          style={{ background:'radial-gradient(circle,rgba(232,140,50,0.14) 0%,transparent 70%)', filter:'blur(60px)' }}/>
        <div className="absolute top-[22%] right-[8%] w-80 h-80 rounded-full pointer-events-none animate-float2"
          style={{ background:'radial-gradient(circle,rgba(212,113,26,0.1) 0%,transparent 70%)', filter:'blur(50px)' }}/>
        <div className="absolute top-[50%] left-[30%] w-96 h-96 rounded-full pointer-events-none animate-float3"
          style={{ background:'radial-gradient(circle,rgba(232,140,50,0.06) 0%,transparent 70%)', filter:'blur(70px)' }}/>

        {/* ── Subtle dot grid overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ═══ CONTENT ═══ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center pt-32 pb-6 px-6"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-medium text-white/75 border border-orange-400/20 bg-orange-900/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
              {t('Trusted by 760+ Institutions · Pakistan · Saudi Arabia · Canada', 'موثوق من قبل 760+ مؤسسة · باكستان · المملكة العربية السعودية · كندا')}
            </span>
          </motion.div>

          {/* Headline — smaller, tighter */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-heading font-bold text-white leading-[1.08] tracking-[-0.02em] mb-5 max-w-3xl"
          >
            {t('Give your school the platform', 'امنح مدرستك المنصة')}
            <br className="hidden sm:block" />
            {' '}{t('it deserves — and your students', 'التي تستحقها — وطلابك')}
            <br className="hidden sm:block" />
            {' '}{t('the education they expect.', 'التعليم الذي يتوقعونه.')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm md:text-base text-white/55 max-w-lg leading-relaxed mb-8"
          >
            {t('Cubico brings LMS, animated lessons, digital marketing, and complete institution management under one intelligent platform.', 'تجمع كيوبيكو نظام إدارة التعلم والدروس المتحركة والتسويق الرقمي وإدارة المؤسسات الكاملة تحت منصة ذكية واحدة.')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-200"
            >
              {t('Book Free Demo', 'احجز عرضاً مجانياً')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.05] transition-all duration-200"
            >
              {t('See Products', 'تصفح المنتجات')}
            </Link>
          </motion.div>
        </motion.div>

        {/* ═══ HORIZONTAL SCROLL NARRATIVE — 4 Mini Browser Screens ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full mt-6 pb-8"
        >
          {/* ── Glow behind ── */}
          <div className="absolute inset-0 -top-10 -bottom-10 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,140,50,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />

          {/* ── Horizontal card strip — uses CSS transform for layout, NO scroll ── */}
          <div className="relative flex items-center justify-center py-6 mx-auto overflow-hidden" style={{ maxWidth: '100vw' }}>
            {/* Perspective wrapper — all 4 cards in a flex row, sized to fit */}
            <div className="flex items-center gap-4 lg:gap-6" style={{ transform: 'perspective(1200px)' }}>

              {/* ────── SCREEN 1: Login ────── */}
              <div className="hidden md:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.7,
                  transform: 'scale(0.92) translateY(8px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/login</span>
                  </div>
                </div>
                {/* Login body */}
                <div className="bg-[#111113] p-4 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center text-white font-bold text-xs mb-1.5 shadow-lg shadow-orange-600/30">C</div>
                  <span className="text-white text-[10px] font-bold mb-0.5">Cubico LMS</span>
                  <span className="text-white/20 text-[7px] mb-4">Sign in to your institution</span>
                  <div className="w-full space-y-2 mb-3">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <svg className="w-2.5 h-2.5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      <span className="text-[8px] text-white/20">admin@school.edu</span>
                    </div>
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <svg className="w-2.5 h-2.5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      <span className="text-[8px] text-white/20">••••••••••</span>
                    </div>
                  </div>
                  <div className="w-full bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-[9px] font-bold py-2 rounded-lg text-center shadow-md shadow-orange-700/20">
                    Sign In
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[7px] text-white/15">Forgot password?</span>
                    <span className="text-[7px] text-orange-400/40">Create account</span>
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 2: Dashboard (ACTIVE / CENTER) ────── */}
              <div className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[420px] lg:w-[520px] rounded-2xl overflow-hidden relative z-10"
                style={{
                  transform: 'scale(1.06)',
                  boxShadow: '0 30px 100px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(232,140,50,0.3), 0 0 60px rgba(232,140,50,0.06)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5 flex items-center gap-1.5">
                    <svg className="w-2.5 h-2.5 text-orange-400/50 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                    <span className="text-[8px] font-mono text-white/30">lms.cubico.tech/dashboard</span>
                  </div>
                </div>
                {/* Dashboard body */}
                <div className="flex bg-[#FAFAFA]">
                  {/* Sidebar */}
                  <div className="w-[110px] lg:w-[120px] flex-shrink-0 bg-[#1a1310] flex-col py-3 hidden sm:flex">
                    <div className="flex items-center gap-1.5 px-3 mb-4">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center text-[7px] text-white font-bold">C</div>
                      <span className="text-[8px] text-white font-bold">Cubico</span>
                    </div>
                    {[
                      { l: 'Dashboard', active: true },
                      { l: 'Courses' },
                      { l: 'Students' },
                      { l: 'Grades' },
                      { l: 'Calendar' },
                      { l: 'Messages' },
                      { l: 'Settings' },
                    ].map(n => (
                      <div key={n.l} className={`mx-2 px-2 py-1.5 rounded-md text-[8px] font-medium mb-0.5 ${
                        n.active ? 'bg-orange-500/15 text-orange-300' : 'text-white/25'
                      }`}>{n.l}</div>
                    ))}
                  </div>
                  {/* Main */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Welcome banner */}
                    <div className="m-2.5 bg-gradient-to-r from-[#8B4513] via-[#C0651A] to-[#E88C32] rounded-xl p-3 relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/[0.06]" />
                      <div className="absolute -right-1 -bottom-6 w-14 h-14 rounded-full bg-white/[0.04]" />
                      <div className="relative flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-orange-200/60 text-[7px] font-medium">Welcome back</div>
                          <div className="text-white font-bold text-[11px]">Admin Khan</div>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          {[
                            { v: '1,284', l: 'Learners' },
                            { v: '78%', l: 'Progress' },
                            { v: 'B+', l: 'Avg Grade' },
                          ].map(s => (
                            <div key={s.l} className="bg-white/[0.12] rounded-lg px-2 py-1.5 text-center border border-white/[0.06]">
                              <div className="text-white font-bold text-[9px] leading-none">{s.v}</div>
                              <div className="text-white/30 text-[5px] mt-0.5">{s.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* 3×2 Course grid */}
                    <div className="grid grid-cols-3 gap-1.5 px-2.5 pb-2.5">
                      {[
                        { name: 'Mathematics 101', students: 45, progress: 82, color: '#D4711A' },
                        { name: 'English Literature', students: 38, progress: 65, color: '#E76F51' },
                        { name: 'Physics Lab', students: 32, progress: 91, color: '#2563EB' },
                        { name: 'Islamic Studies', students: 52, progress: 74, color: '#B8860B' },
                        { name: 'Computer Science', students: 41, progress: 88, color: '#E88C32' },
                        { name: 'Arabic Language', students: 36, progress: 70, color: '#7C3AED' },
                      ].map(c => (
                        <div key={c.name} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                            <span className="text-[6px] font-bold text-gray-700 truncate">{c.name}</span>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[5px] text-gray-400">{c.students} students</span>
                            <span className="text-[6px] font-bold" style={{ color: c.color }}>{c.progress}%</span>
                          </div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.progress}%`, backgroundColor: c.color, opacity: 0.85 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 3: Course View ────── */}
              <div className="hidden sm:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.7,
                  transform: 'scale(0.92) translateY(8px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/course/math-101</span>
                  </div>
                </div>
                {/* Course body */}
                <div className="bg-[#FAFAFA]">
                  {/* Course header */}
                  <div className="bg-gradient-to-r from-[#8B4513] to-[#D4711A] p-3">
                    <div className="text-[7px] text-orange-200/50 font-medium mb-0.5">STEM · Mathematics</div>
                    <div className="text-white font-bold text-[11px] mb-2">Mathematics 101</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/[0.15] rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-orange-200 to-orange-300 rounded-full" />
                      </div>
                      <span className="text-[8px] text-orange-100 font-bold">65%</span>
                    </div>
                  </div>
                  {/* Lesson list */}
                  <div className="p-2.5 space-y-1">
                    {[
                      { name: 'Intro to Algebra', done: true },
                      { name: 'Linear Equations', done: true },
                      { name: 'Quadratic Functions', done: true },
                      { name: 'Polynomials', done: false, current: true },
                      { name: 'Trigonometry Basics', done: false },
                      { name: 'Statistics & Probability', done: false },
                    ].map((lesson, i) => (
                      <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[8px] ${
                        lesson.current ? 'bg-orange-50 border border-orange-200' : 'bg-white border border-gray-100'
                      }`}>
                        {lesson.done ? (
                          <div className="w-3 h-3 rounded-full bg-[#D4711A] flex items-center justify-center flex-shrink-0">
                            <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          </div>
                        ) : (
                          <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${lesson.current ? 'border-orange-400 bg-orange-100' : 'border-gray-200'}`} />
                        )}
                        <span className={`font-medium truncate ${lesson.done ? 'text-gray-400 line-through' : lesson.current ? 'text-orange-700' : 'text-gray-500'}`}>{lesson.name}</span>
                        {lesson.current && <span className="ml-auto text-[6px] bg-[#D4711A] text-white px-1 py-0.5 rounded font-bold flex-shrink-0">NOW</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 4: Grades ────── */}
              <div className="hidden lg:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.45,
                  transform: 'scale(0.88) translateY(12px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.03)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/grades</span>
                  </div>
                </div>
                {/* Grades body */}
                <div className="bg-[#FAFAFA] p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold text-gray-700">Grade Report</span>
                    <span className="text-[6px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-semibold">Spring 2026</span>
                  </div>
                  {/* Table */}
                  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-4 gap-px bg-gray-50 border-b border-gray-100 px-2 py-1">
                      {['Student', 'Math', 'Eng', 'Sci'].map(h => (
                        <span key={h} className="text-[6px] font-bold text-gray-400 uppercase tracking-wider">{h}</span>
                      ))}
                    </div>
                    {/* Rows */}
                    {[
                      { name: 'Sara Ahmed', math: 'A', eng: 'A-', sci: 'B+', colors: ['#059669','#059669','#D4711A'] },
                      { name: 'Omar Khan', math: 'B+', eng: 'A', sci: 'A-', colors: ['#D4711A','#059669','#059669'] },
                      { name: 'Aisha Ali', math: 'A-', eng: 'B', sci: 'A', colors: ['#059669','#B8860B','#059669'] },
                      { name: 'Hassan M.', math: 'B', eng: 'B+', sci: 'B-', colors: ['#B8860B','#D4711A','#B8860B'] },
                      { name: 'Fatima Z.', math: 'A+', eng: 'A', sci: 'A+', colors: ['#059669','#059669','#059669'] },
                      { name: 'Yusuf R.', math: 'C+', eng: 'B-', sci: 'B', colors: ['#E76F51','#B8860B','#B8860B'] },
                    ].map((row, ri) => (
                      <div key={ri} className={`grid grid-cols-4 gap-px px-2 py-1 items-center ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 last:border-0`}>
                        <span className="text-[7px] font-medium text-gray-600 truncate">{row.name}</span>
                        {[row.math, row.eng, row.sci].map((grade, gi) => (
                          <span key={gi} className="text-[7px] font-bold px-1 py-0.5 rounded text-center w-fit" style={{
                            color: row.colors[gi],
                            backgroundColor: row.colors[gi] + '12',
                          }}>{grade}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Summary */}
                  <div className="mt-2 flex gap-1.5">
                    {[
                      { label: 'Class Avg', value: 'B+', color: '#D4711A' },
                      { label: 'Top Perf.', value: '86%', color: '#059669' },
                    ].map(s => (
                      <div key={s.label} className="flex-1 bg-white rounded-lg p-1.5 border border-gray-100 text-center">
                        <div className="text-[9px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[5px] text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Soft edge fade masks that match the dark hero bg ── */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-20" style={{ background: 'linear-gradient(to right, rgba(12,10,8,0.7), transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-20" style={{ background: 'linear-gradient(to left, rgba(12,10,8,0.7), transparent)' }} />
        </motion.div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('Testimonials', 'الشهادات')}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              {t('Trusted by', 'موثوق من قبل')} <span className="shimmer-text">{t('educators worldwide', 'معلمين حول العالم')}</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm font-medium">{t('Rated 5 out of 5 (760+ reviews)', 'تقييم 5 من 5 (أكثر من 760 مراجعة)')}</span>
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
              const tGrads = [
                'linear-gradient(135deg,#D4711A,#E88C32)',
                'linear-gradient(135deg,#B85E15,#D4711A)',
                'linear-gradient(135deg,#8B4513,#C0651A)',
              ];
              const tChip = [
                { bg:'rgba(212,113,26,0.08)', fg:'#D4711A' },
                { bg:'rgba(184,94,21,0.08)',  fg:'#B85E15' },
                { bg:'rgba(139,69,19,0.08)',  fg:'#8B4513' },
              ];
              return (
                <motion.div key={testimonial.name} variants={fadeUp} custom={i}
                  whileHover={{ y:-6, rotateY:3, rotateX:-2, scale:1.01 }}
                  transition={{ type:'spring', stiffness:250, damping:25 }}
                  style={{ transformStyle:'preserve-3d', transformOrigin:'center center' }}
                  className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm hover:shadow-2xl cursor-default"
                >
                  {/* Giant decorative quote */}
                  <div className="absolute -top-3 -left-1 leading-none select-none pointer-events-none text-gray-100"
                    style={{ fontSize:'6.5rem', fontFamily:'Georgia,serif', lineHeight:1 }}>"</div>
                  {/* Stars + verified */}
                  <div className="flex items-center gap-1 mb-4 relative">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-auto text-[9px] font-bold text-gray-300 tracking-wider">{t('VERIFIED', 'موثّق')}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm relative">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background:tGrads[i] }}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor:tChip[i].bg, color:tChip[i].fg }}>
                      {testimonial.location}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PARTNER LOGOS ═══════════ */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(90deg,white 0%,transparent 100%)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(270deg,white 0%,transparent 100%)' }}/>
        <p className="text-center text-[10px] font-bold text-gray-300 tracking-[0.22em] uppercase mb-6">
          {t('Trusted by institutions across 3 countries', 'موثوق من قبل مؤسسات في 3 دول')}
        </p>
        <div className="flex animate-marquee-slow" style={{ width:'max-content' }}>
          {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
            <div key={i} className="flex-shrink-0 mx-4 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-gray-50 cursor-default hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="w-2 h-2 rounded-full bg-primary/25 group-hover:bg-primary/60 transition-colors"/>
              <span className="text-gray-400 font-heading font-bold text-sm whitespace-nowrap group-hover:text-primary transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ PRODUCT CARDS — SCROLL STACKING ═══════════ */}
      <section id="showcase" className="pt-20 pb-8 bg-white relative overflow-hidden">

        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #E5E5F0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── SECTION HEADER ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-gray-200/60 bg-gray-50/60 text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                {t('Our Solutions', 'حلولنا')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-heading font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              {t('Everything your school needs.', 'كل ما تحتاجه مدرستك.')}{' '}
              <span className="shimmer-text">{t("Nothing it doesn't.", 'لا شيء لا تحتاجه.')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
              {t('Four products. One ecosystem. Each built specifically for education.', 'أربعة منتجات. منظومة واحدة. كل منها مصمم خصيصاً للتعليم.')}
            </motion.p>
          </motion.div>

          {/* ── STACKING CARDS ── */}
          <div className="relative">


            {products.map((sol, i) => (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="sticky top-24 mb-8 last:mb-0"
                  style={{ zIndex: i + 1 }}
                >
                  <div
                    className="rounded-3xl border shadow-xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${sol.accent}08 0%, #ffffff 40%, ${sol.accent}05 100%)`,
                      borderColor: `${sol.accent}20`,
                    }}
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* ── Copy side ── */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div
                          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 w-fit"
                          style={{
                            backgroundColor: sol.accent + "14",
                            color: sol.accent,
                          }}
                        >
                          {sol.label}
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                          {sol.name}
                        </h3>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-4 italic">
                          {sol.pain}
                        </p>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                          {sol.desc}
                        </p>

                        <div className="flex items-baseline gap-2 mb-8">
                          <span className="text-3xl font-black" style={{ color: sol.accent }}>{sol.stat}</span>
                          <span className="text-sm text-gray-500">{sol.statContext}</span>
                        </div>

                        <a
                          href={sol.ctaHref}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:shadow-lg w-fit"
                          style={{ backgroundColor: sol.accent }}
                        >
                          {sol.cta}
                          <ArrowRight size={15} />
                        </a>
                      </div>

                      {/* ── Mockup side ── */}
                      <div className="relative p-6 lg:p-10 flex items-center justify-center min-h-[340px] lg:min-h-[460px]">
                        {/* Browser chrome frame */}
                        <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200/60">
                          <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200/80">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 ml-3">
                              <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 max-w-[200px]">
                                cubico.app/{sol.id}
                              </div>
                            </div>
                          </div>
                          <div
                            className="p-6 lg:p-8 min-h-[260px] lg:min-h-[360px]"
                            style={{
                              background: `linear-gradient(180deg, ${sol.accent}06 0%, ${sol.accent}12 100%)`,
                            }}
                          >
                            {/* Mockup content per solution */}
                            {sol.id === "manage" && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</div>
                                    <div className="text-lg font-bold text-gray-900">School Overview</div>
                                  </div>
                                  <div className="flex gap-2">
                                    <div className="px-3 py-1.5 rounded-lg bg-white shadow-sm text-xs font-medium text-gray-600">This Week</div>
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: sol.accent }}>This Month</div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                  {[
                                    { label: "Students", value: "2,847", change: "+12%" },
                                    { label: "Attendance", value: "94.2%", change: "+2.1%" },
                                    { label: "Revenue", value: "₹18.4L", change: "+8%" },
                                  ].map((stat, si) => (
                                    <div key={si} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                      <div className="text-xs font-medium" style={{ color: sol.accent }}>{stat.change}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-gray-700">Fee Collection</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: sol.accent + "14", color: sol.accent }}>On Track</span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="h-2.5 rounded-full" style={{ width: "78%", backgroundColor: sol.accent }} />
                                  </div>
                                  <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                                    <span>₹14.3L collected</span>
                                    <span>₹18.4L target</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {sol.id === "learn" && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">A</div>
                                  <div>
                                    <div className="text-sm font-bold text-gray-900">Welcome back, Ananya!</div>
                                    <div className="text-xs text-gray-500">3 lessons to complete today</div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: sol.accent }}>
                                      <BookOpen size={14} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-gray-800">Quadratic Equations</div>
                                      <div className="text-xs text-gray-500">Mathematics · Chapter 4</div>
                                    </div>
                                    <div className="text-xs font-bold" style={{ color: sol.accent }}>75%</div>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full" style={{ width: "75%", backgroundColor: sol.accent }} />
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Practice Quiz</div>
                                  <div className="space-y-2">
                                    {["Solve: x² + 5x + 6 = 0", "Find roots of 2x² - 8 = 0"].map((q, qi) => (
                                      <div key={qi} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: sol.accent }} />
                                        <span className="text-xs text-gray-700">{q}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-white" style={{ backgroundColor: sol.accent }}>Continue Lesson</div>
                                  <div className="px-4 py-2.5 rounded-xl text-center text-xs font-medium text-gray-600 bg-white border border-gray-200">Ask AI Tutor</div>
                                </div>
                              </div>
                            )}

                            {sol.id === "lms" && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="text-sm font-bold text-gray-900">Course Builder</div>
                                  <div className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: sol.accent }}>+ New Module</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-10 rounded-full" style={{ backgroundColor: sol.accent }} />
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-gray-800">Introduction to Physics</div>
                                      <div className="text-xs text-gray-500">12 lessons · 6 assignments · 3 quizzes</div>
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium">Published</div>
                                  </div>
                                  <div className="flex gap-2 ml-5">
                                    <div className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600">📹 Video</div>
                                    <div className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600">📄 PDF</div>
                                    <div className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600">🧪 Lab</div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-80">
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-10 rounded-full bg-gray-300" />
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-gray-800">Advanced Chemistry</div>
                                      <div className="text-xs text-gray-500">8 lessons · 4 assignments</div>
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">Draft</div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { label: "Courses", value: "24" },
                                    { label: "Enrolled", value: "1.2K" },
                                    { label: "Completion", value: "89%" },
                                  ].map((s, si) => (
                                    <div key={si} className="bg-white rounded-lg p-2.5 text-center shadow-sm border border-gray-100">
                                      <div className="text-base font-bold text-gray-900">{s.value}</div>
                                      <div className="text-xs text-gray-500">{s.label}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {sol.id === "marketing" && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="text-sm font-bold text-gray-900">Enrollment Pipeline</div>
                                  <div className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: sol.accent + "14", color: sol.accent }}>Live</div>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                  {[
                                    { stage: "Leads", count: 847, color: "#94A3B8" },
                                    { stage: "Applied", count: 423, color: "#FBBF24" },
                                    { stage: "Reviewed", count: 312, color: sol.accent },
                                    { stage: "Enrolled", count: 198, color: "#10B981" },
                                  ].map((s, si) => (
                                    <div key={si} className="text-center">
                                      <div className="text-base font-bold text-gray-900">{s.count}</div>
                                      <div className="text-xs text-gray-500 mb-1.5">{s.stage}</div>
                                      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: s.color + "30" }}>
                                        <div className="h-1.5 rounded-full" style={{ width: `${(s.count / 847) * 100}%`, backgroundColor: s.color }} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Activity</div>
                                  <div className="space-y-2.5">
                                    {[
                                      { name: "Priya S.", action: "Submitted application", time: "2m ago" },
                                      { name: "Rahul M.", action: "Completed form", time: "15m ago" },
                                      { name: "Sneha K.", action: "Opened email", time: "1h ago" },
                                    ].map((a, ai) => (
                                      <div key={ai} className="flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: sol.accent }}>
                                          {a.name[0]}
                                        </div>
                                        <div className="flex-1">
                                          <span className="text-xs font-semibold text-gray-800">{a.name}</span>
                                          <span className="text-xs text-gray-500"> {a.action}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{a.time}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
                                    <div className="text-lg font-bold" style={{ color: sol.accent }}>32%</div>
                                    <div className="text-xs text-gray-500">Conversion Rate</div>
                                  </div>
                                  <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
                                    <div className="text-lg font-bold text-gray-900">₹2.4K</div>
                                    <div className="text-xs text-gray-500">Cost per Lead</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Floating accent elements */}
                        <div
                          className="absolute -top-3 -right-3 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                          style={{ backgroundColor: sol.accent }}
                        />
                        <div
                          className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full blur-2xl opacity-15 pointer-events-none"
                          style={{ backgroundColor: sol.accent }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          {/* ── Trust strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            {[
              { icon: Shield, text: "ISO 27001 Certified" },
              { icon: Globe, text: "Used across 12+ countries" },
              { icon: Award, text: "Top EdTech 2025" },
            ].map((badge, bi) => (
              <div key={bi} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                <badge.icon size={14} className="text-gray-400" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════ ABOUT / WHO WE ARE ═══════════ */}
      <section id="about" className="py-24 bg-surface-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual with real image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Main classroom image */}
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Students learning in a modern digital classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Floating 760+ badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.5, type:'spring', stiffness:260, damping:20 }}
                  className="absolute top-4 right-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2"
                  style={{ animation:'float 6s ease-in-out 0.5s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-[#D4711A] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">760+</div>
                    <div className="text-[9px] text-gray-400 leading-tight">{t('Schools', 'مدرسة')}</div>
                  </div>
                </motion.div>
                {/* Floating 3 Countries badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.7, type:'spring', stiffness:260, damping:20 }}
                  className="absolute bottom-4 left-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2"
                  style={{ animation:'float2 8s ease-in-out 1s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">{t('3 Countries', '3 دول')}</div>
                    <div className="text-[9px] text-gray-400 leading-tight">PK · SA · CA</div>
                  </div>
                </motion.div>
                {/* Bottom stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 z-10">
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: BookOpen, label: 'K-12',    count:'460+', color: 'text-[#D4711A]' },
                      { icon: Award,    label: 'Islamic',  count:'180+', color: 'text-[#B85E15]' },
                      { icon: Globe,    label: 'Int\'l',   count:'85+',  color: 'text-[#C0651A]' },
                      { icon: Users,    label: 'NGOs',     count:'35+',  color: 'text-[#8B4513]' },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <item.icon className={`w-4 h-4 mx-auto mb-1 ${item.color}`} />
                        <div className="text-xs font-black text-gray-900">{item.count}</div>
                        <div className="text-[9px] text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  {t('Who We Are', 'من نحن')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                {t('Educators & engineers', 'معلمون ومهندسون')}<br />
                {t('building', 'يبنون')} <span className="shimmer-text">{t('what schools actually need', 'ما تحتاجه المدارس فعلاً')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Cubico Technologies is a full-stack EdTech company serving schools across Pakistan, Saudi Arabia & Canada.
                We don&apos;t just sell software — we deploy complete digital infrastructure, train your staff,
                and stay with you long after launch. Our team includes former principals, curriculum designers,
                and full-stack engineers.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#D4711A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t('Education-First DNA', 'التعليم أولاً في حمضنا النووي')}</h4>
                    <p className="text-sm text-gray-500">{t("Built by people who've run classrooms, not just code editors.", 'بُني بواسطة أشخاص أداروا الفصول الدراسية، وليس فقط محررات الأكواد.')}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t('Co-Created With Schools', 'تم إنشاؤه بالتعاون مع المدارس')}</h4>
                    <p className="text-sm text-gray-500">{t('Every feature ships after real-world testing with principals and teachers.', 'كل ميزة تُطلق بعد اختبار فعلي مع مديري المدارس والمعلمين.')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="py-20 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2560&q=80"
          alt="Books and education background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0A08]/92" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4711A]/12 rounded-full filter blur-[110px] animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B4513]/10 rounded-full filter blur-[110px] animate-float2" />
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
                  color={['#D4711A','#E88C32','#F4A261','#FBBF24'][i]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA + FORM SECTION ═══════════ */}
      <section id="contact" className="py-24 bg-surface-light bg-grid-light">
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
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  Book a Demo
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                See Cubico in action —<br />
                <span className="shimmer-text">free personalized demo</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Walk through the LMS, ERP, animated content, and marketing tools with our team.
                We&apos;ll customize the demo to your curriculum, student count, and goals.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-3 mb-6">
                {[
                  { text:'Full LMS demo with your curriculum', emoji:'💻' },
                  { text:'ERP system walkthrough',             emoji:'🏢' },
                  { text:'Animated content preview',           emoji:'🎥' },
                  { text:'Custom pricing for your needs',      emoji:'💰' },
                  { text:'Implementation timeline review',     emoji:'📅' },
                ].map((item, idx) => (
                  <motion.div key={item.text}
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.07 * idx, duration:0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4711A]/25 transition-all">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="text-sm text-gray-600 font-medium flex-1">{item.text}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#D4711A] flex-shrink-0" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={4}
                className="flex items-center gap-3 p-4 rounded-2xl border"
                style={{ backgroundColor:'rgba(212,113,26,0.05)', borderColor:'rgba(212,113,26,0.18)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4711A] animate-pulse flex-shrink-0"/>
                <span className="text-sm font-semibold text-gray-700">{t('We respond within', 'نرد خلال')} <span className="text-[#D4711A] font-bold">{t('24 hours', '24 ساعة')}</span>{t(', guaranteed.', '، مضمون.')}</span>
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
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{t('Thank You!', 'شكراً لك!')}</h3>
                    <p className="text-gray-500">{t("We'll be in touch within 24 hours.", 'سنتواصل معك خلال 24 ساعة.')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder={t('Your Name *', 'اسمك *')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder={t('Company *', 'الشركة *')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="tel"
                        placeholder={t('Phone *', 'الهاتف *')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder={t('Email *', 'البريد الإلكتروني *')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="form-select"
                    >
                      <option value="">{t('Select Position', 'اختر المنصب')}</option>
                      <option value="principal">{t('Principal / Head of School', 'مدير / رئيس المدرسة')}</option>
                      <option value="director">{t('Director / Board Member', 'مدير / عضو مجلس إدارة')}</option>
                      <option value="it_head">{t('IT Head / Administrator', 'رئيس تقنية المعلومات / مسؤول')}</option>
                      <option value="teacher">{t('Teacher / Department Head', 'معلم / رئيس قسم')}</option>
                      <option value="other">{t('Other', 'أخرى')}</option>
                    </select>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="form-select"
                    >
                      <option value="">{t('Number of Students / Staff', 'عدد الطلاب / الموظفين')}</option>
                      <option value="1-50">1 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="501-1000">501 – 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center text-base"
                    >
                      {formStatus === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('Sending...', 'جارِ الإرسال...')}
                        </span>
                      ) : (
                        <>
                          {t('Get Free Demo', 'احصل على عرض مجاني')}
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </>
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

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section id="faq" className="py-24 bg-surface-light">
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
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  {t('FAQ', 'الأسئلة الشائعة')}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                {t('Questions schools', 'أسئلة المدارس')}<br />
                <span className="shimmer-text">{t('ask us most', 'الأكثر شيوعاً')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                {t("From onboarding timelines to multilingual support — here's what principals and IT heads want to know before signing up.", 'من الجداول الزمنية للإعداد إلى الدعم متعدد اللغات — إليك ما يريد المديرون ورؤساء تقنية المعلومات معرفته قبل التسجيل.')}
              </motion.p>

              {/* FAQ Visual — image + CTA */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="rounded-3xl overflow-hidden hidden lg:block"
              >
                <div className="relative" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaborating on education technology solutions"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
                        style={openFaq === i ? { backgroundColor:'#D4711A', color:'#fff' } : { backgroundColor:'#F3F4F6', color:'#9CA3AF' }}>
                        {i + 1}
                      </div>
                      <span className="font-semibold text-sm text-gray-900 pr-2 group-hover:text-primary transition-colors">{faq.q}</span>
                    </div>
                    <span className="flex-shrink-0 mt-0.5">
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
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
                        transition={{ duration: 0.3, ease:'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 pr-6 pt-3 pb-1">
                          <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
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
