'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu,
  X,
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
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
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
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const featureCards = [
  {
    icon: BookOpen,
    title: 'Smart LMS',
    desc: 'Next-generation learning management with AI-driven insights, progress tracking and interactive courses for modern education.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Film,
    title: 'Animated Lessons',
    desc: 'Engaging 2D & 3D animated content that brings lessons to life, supporting multilingual education across all curricula.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Monitor,
    title: 'School ERP',
    desc: 'All-in-one school management — from admissions and attendance to finance and reporting in a single platform.',
    color: 'bg-blue-50 text-blue-600',
  },
];

const services = [
  { icon: BarChart3, title: 'LMS Implementation', desc: 'Complete Moodle-based learning management system customized for your institution.' },
  { icon: Film, title: 'Animation Studio', desc: 'Professional 2D/3D animated educational content in English, Arabic & Urdu.' },
  { icon: Monitor, title: 'School ERP System', desc: 'Comprehensive school management with admissions, HR, finance & reporting.' },
  { icon: Globe, title: 'Web Development', desc: 'Modern, responsive websites and web applications built for education sector.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile applications for students, parents and administrators.' },
  { icon: Cloud, title: 'Cloud Hosting', desc: 'Reliable cloud infrastructure with 99.9% uptime and global CDN delivery.' },
  { icon: Mail, title: 'Digital Marketing', desc: 'Strategic digital marketing campaigns to increase enrollment and engagement.' },
  { icon: Users, title: 'Teacher Training', desc: 'Professional development programs for educators on digital tools and pedagogy.' },
];

const testimonials = [
  {
    name: 'Dr. Ahmed Al-Rashid',
    role: 'Director',
    company: 'Al-Noor Academy',
    location: 'Saudi Arabia',
    text: 'Cubico transformed our entire school system. The LMS and animated content have dramatically improved student engagement. Their team understood our Islamic education requirements perfectly.',
    rating: 5,
  },
  {
    name: 'Fatima Hassan',
    role: 'Principal',
    company: 'Iqra Foundation School',
    location: 'Pakistan',
    text: 'From day one, Cubico delivered beyond our expectations. The ERP system streamlined our operations and the animated Urdu lessons are loved by our students. Truly world-class service.',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'Board Chair',
    company: 'Cornwall Islamic Foundation',
    location: 'Canada',
    text: 'Working with Cubico has been exceptional. They deployed our complete digital infrastructure in just 3 weeks. The ongoing support and training have been invaluable for our staff.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'How quickly can we launch our digital platform?',
    a: 'Most institutions go live within 4 weeks. Our streamlined onboarding process includes data migration, staff training, and content setup — all handled by our dedicated team.',
  },
  {
    q: 'Do you support Arabic and Urdu content?',
    a: 'Yes! We specialize in multilingual education content. Our animation studio produces high-quality lessons in English, Arabic, and Urdu with full RTL support across all platforms.',
  },
  {
    q: 'Can we engage Cubico for just one service?',
    a: 'Absolutely. While we offer a full-stack approach, each service — LMS, ERP, animations, web development — can be engaged independently based on your needs.',
  },
  {
    q: 'What makes Cubico different from other EdTech providers?',
    a: 'We combine deep understanding of Islamic and traditional education with cutting-edge technology. Our team includes educators and technologists who bridge the gap between pedagogy and innovation.',
  },
  {
    q: 'Which countries do you operate in?',
    a: 'We actively serve institutions across Pakistan, Saudi Arabia, and Canada. Our cloud-based solutions can be deployed globally with local support teams in each region.',
  },
];

const stats = [
  { value: 760, suffix: '+', label: 'Institutions Served' },
  { value: 3, suffix: '', label: 'Countries Active' },
  { value: 4, suffix: '', label: 'Weeks Avg Launch' },
  { value: 100, suffix: '%', label: 'Client Retention' },
];

const partners = [
  'Al-Huffaz Academy',
  'Al-Noor Academy',
  'CIF Canada',
  'Iqra Foundation',
  'Saudi Schools Network',
  'TechEd Pakistan',
];

const solutions = [
  {
    id: 'manage', name: 'Cubico Manage™',
    tagline: 'Your entire institution. One intelligent system.',
    icon: Layout,
    painPoint: 'Still running your school on Excel sheets and WhatsApp groups?',
    metric: '47 hrs', metricLabel: 'saved per staff member, per month',
    accentHex: '#1E6B5A', accentLight: '#E6F5F0',
    demoUrl: 'app.cubico.tech/manage',
    features: [
      { icon: Users,    title: 'Enrollment & Admissions', desc: 'Full student lifecycle from inquiry to graduation.'   },
      { icon: BarChart3,title: 'Fee & Finance',           desc: 'Invoices, payments, and overdue alerts — automated.' },
      { icon: PieChart, title: 'Attendance & Exams',      desc: 'Smart attendance, gradebooks, and exam scheduling.'  },
      { icon: Settings, title: 'HR & Timetable',          desc: 'Staff records, payroll, and auto-generated schedules.'},
    ],
  },
  {
    id: 'lms', name: 'Moodle LMS Setup',
    tagline: 'Your branded Moodle — configured, hosted, supported.',
    icon: BookOpen,
    painPoint: 'Moodle is powerful but complex — setting it up right takes months without the right team.',
    metric: '2 wks', metricLabel: 'from signup to a fully live Moodle platform',
    accentHex: '#F47B20', accentLight: '#FEF0E6',
    demoUrl: 'lms.cubico.tech/demo',
    features: [
      { icon: Settings,  title: 'Custom Moodle Theme',     desc: 'Your logo, colors, and branding — pixel-perfect.'    },
      { icon: BookOpen,  title: 'Course Build & Migration', desc: 'We build or migrate your course content for you.'     },
      { icon: Shield,    title: 'Managed Hosting',          desc: 'Secure cloud hosting with 99.9% uptime guarantee.'    },
      { icon: Users,     title: 'Training & Onboarding',    desc: 'Live sessions for teachers and admins, included.'     },
    ],
  },
  {
    id: 'teach', name: 'Cubico Teach™',
    tagline: "Everything a teacher needs. Nothing they don't.",
    icon: Lightbulb,
    painPoint: 'Teachers spending Sunday nights building lesson plans from scratch?',
    metric: '2×', metricLabel: 'faster lesson planning from day one',
    accentHex: '#0891B2', accentLight: '#CFFAFE',
    demoUrl: 'app.cubico.tech/teach',
    features: [
      { icon: Lightbulb, title: 'Lesson Plan Builder', desc: 'Drag-and-drop blocks aligned to national curriculum.'  },
      { icon: Target,    title: 'Curriculum Mapping',  desc: 'Visual scope & sequence across subjects and grades.'   },
      { icon: BarChart3, title: 'Class Analytics',     desc: 'Per-student progress with automatic at-risk flags.'    },
      { icon: Cloud,     title: 'Resource Library',    desc: 'Upload, tag, and share materials across departments.'  },
    ],
  },
  {
    id: 'learn', name: 'Cubico Learn™',
    tagline: 'Textbooks come alive.',
    icon: Film,
    painPoint: 'Students zoning out 8 minutes into a 40-minute lecture?',
    metric: '4×', metricLabel: 'higher engagement vs. traditional textbooks',
    accentHex: '#E11D48', accentLight: '#FFE4E6',
    demoUrl: 'app.cubico.tech/learn',
    features: [
      { icon: Film,    title: '2D & 3D Animation',       desc: 'Character-led animated lessons, any subject.'   },
      { icon: Monitor, title: 'Interactive Simulations', desc: 'STEM labs students can actually manipulate.'     },
      { icon: Globe,   title: 'English · Arabic · Urdu', desc: 'Full narration and RTL support built in.'        },
      { icon: Zap,     title: 'Adaptive Quizzes',        desc: 'End-of-lesson assessments that self-adjust.'     },
    ],
  },
  {
    id: 'marketing', name: 'Cubico Marketing™',
    tagline: 'Fill every seat. Every semester.',
    icon: Megaphone,
    painPoint: 'Your school is incredible. Nobody outside your city knows it exists.',
    metric: '+34%', metricLabel: 'average increase in admission enquiries',
    accentHex: '#059669', accentLight: '#D1FAE5',
    demoUrl: 'app.cubico.tech/marketing',
    features: [
      { icon: Globe,      title: 'Premium School Websites', desc: 'Conversion-focused, mobile-first, and beautiful.'  },
      { icon: TrendingUp, title: 'Enrollment Funnels',      desc: 'Google Ads, landing pages, and retargeting.'       },
      { icon: Megaphone,  title: 'Social Media Management', desc: 'Content, campaigns, and brand voice.'              },
      { icon: Shield,     title: 'SEO & Monthly Reports',   desc: 'Search visibility that compounds over time.'       },
    ],
  },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    position: '',
    employees: '',
  });
  const [activeSolution, setActiveSolution] = useState(0);
  const hasInteracted = useRef(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hasInteracted.current) {
        setActiveSolution((prev) => (prev + 1) % solutions.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

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

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('newsletter_signups').insert([{ name: newsletterName, email: newsletterEmail }]);
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setNewsletterName('');
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
          background:linear-gradient(90deg,#1E6B5A 0%,#2A9D8F 30%,#5ABFB3 50%,#2A9D8F 70%,#1E6B5A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Outer wrapper — always full width, handles centering */}
        <div className="flex justify-center px-4">
          <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pointer-events-auto w-full"
            style={{
              maxWidth: scrolled ? '820px' : '100%',
              marginTop: scrolled ? '12px' : '0px',
              padding: scrolled ? '6px 16px' : '12px 24px',
              borderRadius: scrolled ? '50px' : '0px',
              background: scrolled
                ? 'rgba(12,31,27,0.94)'
                : 'rgba(4,31,26,0.55)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: scrolled
                ? '0 8px 40px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(42,157,143,0.12)'
                : '0 1px 0 rgba(255,255,255,0.06)',
              transition: 'max-width 0.5s cubic-bezier(0.4,0,0.2,1), margin-top 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.5s cubic-bezier(0.4,0,0.2,1), border-radius 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className="flex items-center gap-1 max-w-7xl mx-auto">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E6B5A] to-[#2A9D8F] flex items-center justify-center font-heading font-bold text-sm text-white shadow-lg shadow-teal-600/20 flex-shrink-0">
                  C
                </div>
                <span className="font-heading font-bold text-sm text-white hidden sm:inline whitespace-nowrap">
                  Cubico<span className="text-teal-300">.tech</span>
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-white/[0.1] mx-2 hidden lg:block flex-shrink-0" />

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[13px] font-medium text-white/55 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Divider */}
              <div className="w-px h-5 bg-white/[0.1] mx-2 hidden lg:block flex-shrink-0" />

              {/* CTA */}
              <div className="hidden lg:flex items-center flex-shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1E6B5A] to-[#2A9D8F] hover:from-[#155C4E] hover:to-[#1E6B5A] text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(42,157,143,0.4)]"
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto mx-4 mt-2 bg-[#0C1F1B]/95 backdrop-blur-xl rounded-2xl border border-teal-500/[0.12] shadow-2xl overflow-hidden"
            >
              <div className="px-5 py-5 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white/70 hover:text-white hover:bg-white/[0.06] font-medium transition-colors px-4 py-3 rounded-xl"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-white/[0.08]">
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E6B5A] to-[#2A9D8F] text-white text-sm font-semibold w-full py-3 rounded-xl transition-colors">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-x-hidden"
      >
        {/* ── Background image — education/library atmosphere ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2560&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* ── Dark teal overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(4,31,26,0.92) 0%, rgba(10,46,37,0.82) 35%, rgba(12,31,27,0.78) 60%, rgba(4,18,16,0.95) 100%)',
          }}
        />

        {/* ── Warm accent glow at center ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 50% 30%, rgba(42,157,143,0.12) 0%, transparent 70%)',
          }}
        />

        {/* ── Floating atmosphere orbs — teal/warm tones ── */}
        <div className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full pointer-events-none animate-float"
          style={{ background:'radial-gradient(circle,rgba(42,157,143,0.16) 0%,transparent 70%)', filter:'blur(60px)' }}/>
        <div className="absolute top-[22%] right-[8%] w-80 h-80 rounded-full pointer-events-none animate-float2"
          style={{ background:'radial-gradient(circle,rgba(231,111,81,0.08) 0%,transparent 70%)', filter:'blur(50px)' }}/>
        <div className="absolute top-[50%] left-[30%] w-96 h-96 rounded-full pointer-events-none animate-float3"
          style={{ background:'radial-gradient(circle,rgba(42,157,143,0.06) 0%,transparent 70%)', filter:'blur(70px)' }}/>

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
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-medium text-white/75 border border-teal-400/20 bg-teal-900/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
              Trusted by 760+ Institutions · Pakistan · Saudi Arabia · Canada
            </span>
          </motion.div>

          {/* Headline — smaller, tighter */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-heading font-bold text-white leading-[1.08] tracking-[-0.02em] mb-5 max-w-3xl"
          >
            Give your school the platform
            <br className="hidden sm:block" />
            {' '}it deserves — and your students
            <br className="hidden sm:block" />
            {' '}the education they expect.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm md:text-base text-white/55 max-w-lg leading-relaxed mb-8"
          >
            Cubico brings LMS, animated lessons, digital marketing, and complete
            institution management under one intelligent platform.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#1E6B5A] to-[#2A9D8F] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] transition-all duration-200"
            >
              Book Free Demo
              <ArrowRight size={16} />
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.05] transition-all duration-200"
            >
              See Products
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ ENHANCED MOODLE LMS DASHBOARD — bigger, polished, overflows ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex justify-center px-3 sm:px-5 lg:px-8 mt-2 mb-[-160px]"
        >
          {/* ── Glow behind the dashboard ── */}
          <div className="absolute -inset-10 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(42,157,143,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />

          <div
            className="relative w-full max-w-[1140px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 30px 100px rgba(4,31,26,0.5), 0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(42,157,143,0.1)',
            }}
          >
            {/* ── Browser chrome ── */}
            <div className="bg-[#0C1F1B] px-4 py-2.5 flex items-center gap-3 border-b border-white/[0.06]">
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-white/[0.05] rounded-lg px-3 py-1.5 flex items-center gap-2">
                <svg className="w-3 h-3 text-teal-400/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                <span className="text-[11px] font-mono text-white/35">lms.cubico.tech/dashboard</span>
              </div>
              <div className="hidden sm:flex gap-2 flex-shrink-0">
                <div className="text-[10px] text-white/25 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">⬆ Upload</div>
                <div className="text-[10px] text-white/25 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">📊 Reports</div>
              </div>
            </div>

            {/* ── Dashboard body ── */}
            <div className="flex bg-[#F5FAF8] min-h-[460px]">

              {/* Sidebar — education themed */}
              <div className="w-[210px] flex-shrink-0 bg-[#041F1A] flex-col py-4 hidden sm:flex">
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-4 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E6B5A] to-[#2A9D8F] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-teal-600/25">C</div>
                  <div>
                    <span className="text-white text-sm font-bold font-heading block leading-tight">Cubico LMS</span>
                    <span className="text-[9px] text-teal-400/40">Powered by Moodle</span>
                  </div>
                </div>
                {/* Nav */}
                {[
                  { label: 'Dashboard',      icon: '📊', active: true  },
                  { label: 'My Courses',     icon: '📚', active: false },
                  { label: 'Participants',   icon: '👥', active: false },
                  { label: 'Grades',         icon: '📝', active: false },
                  { label: 'Calendar',       icon: '📅', active: false },
                  { label: 'Messages',       icon: '💬', active: false },
                  { label: 'Competencies',   icon: '🎯', active: false },
                  { label: 'Settings',       icon: '⚙️', active: false },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-xl text-[11px] font-medium cursor-default mb-0.5"
                    style={item.active
                      ? { backgroundColor: 'rgba(42,157,143,0.18)', color: '#5ABFB3', border: '1px solid rgba(42,157,143,0.25)' }
                      : { color: 'rgba(255,255,255,0.30)' }}
                  >
                    <span className="text-[13px]">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
                {/* Storage indicator */}
                <div className="mt-auto mx-4 pt-4 border-t border-white/[0.06]">
                  <div className="text-[9px] text-white/25 mb-1.5 flex justify-between">
                    <span>Storage</span><span>67%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full w-[67%] bg-gradient-to-r from-[#1E6B5A] to-[#2A9D8F] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-800">Course Dashboard</span>
                    <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">Spring 2026</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-[10px] text-gray-400 px-2.5 py-1 rounded-lg border border-gray-200 bg-white cursor-default">🔍 Search courses...</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-[10px] text-white font-bold">AK</div>
                  </div>
                </div>

                {/* Welcome banner */}
                <div className="px-5 pt-4 pb-3">
                  <div className="bg-gradient-to-r from-[#0E4538] via-[#1E6B5A] to-[#2A9D8F] rounded-2xl p-4 mb-4 flex items-center justify-between relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/[0.04]" />
                    <div className="absolute -right-2 -bottom-8 w-20 h-20 rounded-full bg-white/[0.03]" />
                    <div className="relative">
                      <div className="text-teal-200/60 text-[10px] font-medium mb-0.5">Welcome back</div>
                      <div className="text-white font-heading font-bold text-base">Admin Khan</div>
                      <div className="text-teal-200/40 text-[10px] mt-1">5 courses active · 12 assignments due</div>
                    </div>
                    <div className="hidden sm:flex gap-3 relative">
                      {[
                        { label: 'Active Learners', value: '1,284', icon: '👤' },
                        { label: 'Course Progress', value: '78%', icon: '📈' },
                        { label: 'Avg. Grade', value: 'B+', icon: '⭐' },
                      ].map(s => (
                        <div key={s.label} className="bg-white/[0.10] rounded-xl px-3 py-2 text-center backdrop-blur-sm border border-white/[0.06]">
                          <div className="text-[12px] mb-0.5">{s.icon}</div>
                          <div className="text-white font-heading font-bold text-sm leading-none">{s.value}</div>
                          <div className="text-white/35 text-[8px] mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course cards grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-5 pb-4">
                  {[
                    { name: 'Mathematics 101', students: 45, progress: 82, color: '#1E6B5A', category: 'STEM' },
                    { name: 'English Literature', students: 38, progress: 65, color: '#E76F51', category: 'Arts' },
                    { name: 'Physics Lab', students: 32, progress: 91, color: '#2563EB', category: 'STEM' },
                    { name: 'Islamic Studies', students: 52, progress: 74, color: '#D97706', category: 'Core' },
                    { name: 'Computer Science', students: 41, progress: 88, color: '#2A9D8F', category: 'STEM' },
                    { name: 'Arabic Language', students: 36, progress: 70, color: '#7C3AED', category: 'Language' },
                  ].map(course => (
                    <div key={course.name} className="bg-white rounded-xl p-3.5 border border-gray-100/80 hover:shadow-lg hover:border-gray-200 transition-all duration-200 cursor-default group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: course.color }} />
                        <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: course.color }}>{course.category}</span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-800 mb-2 leading-tight">{course.name}</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] text-gray-400">{course.students} students</span>
                        <span className="text-[9px] font-bold" style={{ color: course.color }}>{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${course.progress}%`, backgroundColor: course.color, opacity: 0.85 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel — activity & timeline */}
              <div className="w-[220px] flex-shrink-0 bg-white border-l border-gray-100 py-4 px-3.5 hidden lg:flex flex-col gap-4">
                {/* Upcoming */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[13px]">📌</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upcoming</span>
                  </div>
                  {[
                    { text: 'Math Quiz — Grade 10', time: 'Today, 2:00 PM', color: '#1E6B5A' },
                    { text: 'Physics Lab Submission', time: 'Tomorrow', color: '#2563EB' },
                    { text: 'Parent-Teacher Meeting', time: 'Mar 20', color: '#E76F51' },
                  ].map((item, i) => (
                    <div key={i} className="mb-3 last:mb-0 pl-3 border-l-2 transition-colors" style={{ borderColor: item.color + '35' }}>
                      <div className="text-[10px] font-semibold text-gray-700 leading-snug">{item.text}</div>
                      <div className="text-[9px] text-gray-400">{item.time}</div>
                    </div>
                  ))}
                </div>

                {/* Live Feed */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live Feed</span>
                  </div>
                  {[
                    { text: 'Sara submitted English essay', time: '2m ago', color: '#059669' },
                    { text: 'New forum post in Physics', time: '8m ago', color: '#2563EB' },
                    { text: 'Grade updated: Math 101', time: '15m ago', color: '#1E6B5A' },
                    { text: '3 new enrollments today', time: '1h ago', color: '#D97706' },
                  ].map((a, ai) => (
                    <div key={ai} className="flex items-start gap-2 mb-2.5 last:mb-0">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: a.color }} />
                      <div>
                        <span className="text-[10px] text-gray-600 leading-snug block">{a.text}</span>
                        <span className="text-[8px] text-gray-300">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Completion ring */}
                <div className="bg-[#F5FAF8] rounded-xl p-3 text-center mt-auto">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke="#2A9D8F" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray={String(2 * Math.PI * 26)} strokeDashoffset={String(2 * Math.PI * 26 * 0.22)} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-heading font-bold text-gray-800">78%</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-medium">Overall Completion</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FEATURE CARDS ═══════════ */}
      <section className="pt-52 pb-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {featureCards.map((card, i) => {
              const fcAccents = ['#1E6B5A','#E76F51','#2563EB'];
              const fcGrads = [
                'linear-gradient(90deg,#1E6B5A,#2A9D8F)',
                'linear-gradient(90deg,#E76F51,#F4A261)',
                'linear-gradient(90deg,#2563EB,#60A5FA)',
              ];
              const fcLabels = ['Smart Learning','Content Studio','Operations Hub'];
              const fcIconBg = ['bg-teal-50 text-teal-700','bg-orange-50 text-orange-600','bg-blue-50 text-blue-600'];
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y:-7, scale:1.01 }}
                  transition={{ type:'spring', stiffness:280, damping:20 }}
                  className="group cursor-pointer relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow"
                >
                  {/* Gradient top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background:fcGrads[i] }}/>
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                    style={{ background:`radial-gradient(ellipse at 30% 0%,${fcAccents[i]}08 0%,transparent 65%)` }}/>
                  {/* Category chip */}
                  <div className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color:fcAccents[i] }}>
                    {fcLabels[i]}
                  </div>
                  <motion.div
                    whileHover={{ rotate:-5, scale:1.12 }}
                    transition={{ type:'spring', stiffness:400, damping:15 }}
                    className={`icon-box mb-5 ${fcIconBg[i]}`}>
                    <card.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{card.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color:fcAccents[i] }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SOLUTIONS SHOWCASE ═══════════ */}
      <section id="showcase" className="py-20 bg-white relative overflow-hidden">

        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #E5E5F0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── SECTION HEADER ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer} className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-500">
                The Cubico Ecosystem
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-heading font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              One school.{' '}
              <span className="gradient-text">Four superpowers.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
              Each product is purpose-built. Together they run your entire institution.
            </motion.p>
          </motion.div>

          {/* ── TAB RAIL ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-1 mb-10 justify-start lg:justify-center">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              const active = activeSolution === i;
              return (
                <button key={sol.id}
                  onClick={() => { hasInteracted.current = true; setActiveSolution(i); }}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap"
                  style={active
                    ? { backgroundColor: sol.accentHex, borderColor: sol.accentHex, color: '#fff', boxShadow: '0 4px 16px ' + sol.accentHex + '50' }
                    : { backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#6B7280' }}>
                  <Icon size={15} />
                  {sol.name}
                </button>
              );
            })}
          </motion.div>

          {/* ── SHOWCASE STAGE ── */}
          <AnimatePresence mode="wait">
            {solutions.map((sol, i) => activeSolution !== i ? null : (
              <motion.div key={sol.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>

                <div className="grid lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-start">

                  {/* LEFT — narrative column */}
                  <div className="pt-2">
                    {/* Product icon badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                      style={{ backgroundColor: sol.accentLight }}>
                      {(() => { const SolIcon = sol.icon; return <SolIcon size={26} style={{ color: sol.accentHex }} />; })()}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-2">{sol.name}</h3>
                    <p className="text-base font-medium mb-5" style={{ color: sol.accentHex }}>{sol.tagline}</p>

                    {/* Pain point callout */}
                    <div className="rounded-2xl p-4 mb-6 bg-gray-50 border-l-4 border-gray-300">
                      <p className="text-sm text-gray-500 italic leading-relaxed">&ldquo;{sol.painPoint}&rdquo;</p>
                    </div>

                    {/* Headline outcome metric */}
                    <div className="inline-flex items-end gap-3 mb-6 p-4 rounded-2xl border"
                      style={{ backgroundColor: sol.accentLight + 'BB', borderColor: sol.accentHex + '25' }}>
                      <span className="font-heading font-bold leading-none"
                        style={{ fontSize: '2.5rem', color: sol.accentHex }}>{sol.metric}</span>
                      <span className="text-xs text-gray-500 leading-snug pb-1 max-w-[140px]">{sol.metricLabel}</span>
                    </div>

                    {/* Feature bullets */}
                    <ul className="space-y-3 mb-8">
                      {sol.features.map(feat => {
                        const FIcon = feat.icon;
                        return (
                          <li key={feat.title} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: sol.accentLight }}>
                              <FIcon size={13} style={{ color: sol.accentHex }} />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-800">{feat.title}</span>
                              <span className="text-sm text-gray-400"> — {feat.desc}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <a href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: sol.accentHex }}>
                      Book a Live Demo
                      <ArrowRight size={15} />
                    </a>
                  </div>

                  {/* RIGHT — Illustrated Mockup */}
                  <div className="relative">

                    {/* Browser chrome wrapper */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200/80"
                      style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.06)' }}>

                      {/* Chrome bar */}
                      <div className="bg-[#1C1C2E] px-3 py-2.5 flex items-center gap-2.5">
                        <div className="flex gap-1.5 flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
                        </div>
                        <div className="flex-1 bg-white/[0.06] rounded px-2.5 py-1 flex items-center gap-1.5 min-w-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0"/>
                          <span className="text-[10px] font-mono text-white/30 truncate">{sol.demoUrl}</span>
                        </div>
                      </div>

                      {/* ══ MANAGE MOCKUP ══ */}
                      {sol.id === 'manage' && (
                        <div className="flex bg-[#F4F5F7]" style={{ minHeight: '360px' }}>
                          {/* Sidebar */}
                          <div className="w-[152px] flex-shrink-0 bg-[#0F0F1E] flex flex-col py-3 hidden sm:flex">
                            <div className="flex items-center gap-1.5 px-3 mb-4">
                              <div className="w-5 h-5 rounded-md bg-[#6C3AED] flex items-center justify-center text-white text-[8px] font-bold">C</div>
                              <span className="text-white text-xs font-bold">Cubico</span>
                            </div>
                            {[['Dashboard',true],['Students',false],['Fee & Finance',false],['Attendance',false],['HR & Staff',false],['Reports',false]].map(([label, active]) => (
                              <div key={String(label)} className="flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-lg text-[10px] mb-0.5"
                                style={active ? { backgroundColor: 'rgba(108,58,237,0.18)', color: '#A78BFA' } : { color: 'rgba(255,255,255,0.30)' }}>
                                <span className="w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: active ? '#7C3AED' : 'rgba(255,255,255,0.15)' }}/>
                                {String(label)}
                              </div>
                            ))}
                          </div>
                          {/* Main */}
                          <div className="flex-1 flex flex-col min-w-0 p-3 gap-2.5">
                            {/* KPI row */}
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: 'Students',      value: '2,847', color: '#6C3AED', bg: '#F5F3FF' },
                                { label: 'Fee Collected', value: '₨4.2M', color: '#059669', bg: '#ECFDF5' },
                                { label: 'Attendance',    value: '94.3%', color: '#2563EB', bg: '#EFF6FF' },
                              ].map(k => (
                                <div key={k.label} className="rounded-xl p-2.5 border border-white shadow-sm" style={{ backgroundColor: k.bg }}>
                                  <div className="text-[8px] text-gray-400 mb-0.5">{k.label}</div>
                                  <div className="font-bold text-sm leading-none" style={{ color: k.color }}>{k.value}</div>
                                </div>
                              ))}
                            </div>
                            {/* Student table */}
                            <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
                              <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-600">Recent Enrollments</span>
                                <span className="text-[8px] text-[#6C3AED] bg-purple-50 px-2 py-0.5 rounded-full cursor-default">View All</span>
                              </div>
                              <div className="divide-y divide-gray-50">
                                {[
                                  { name: 'Ahmed Raza',  grade: 'Grade 8A', fee: 'Paid',    fc: '#059669' },
                                  { name: 'Sara Khan',   grade: 'Grade 7B', fee: 'Pending', fc: '#D97706' },
                                  { name: 'Ali Hassan',  grade: 'Grade 9C', fee: 'Paid',    fc: '#059669' },
                                  { name: 'Fatima Noor', grade: 'Grade 6A', fee: 'Overdue', fc: '#E11D48' },
                                ].map((s, si) => (
                                  <div key={s.name} className="flex items-center gap-2 px-3 py-1.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                                      style={{ backgroundColor: ['#6C3AED','#0891B2','#059669','#E11D48'][si] }}>
                                      {s.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[10px] font-semibold text-gray-700 truncate">{s.name}</div>
                                      <div className="text-[8px] text-gray-400">{s.grade}</div>
                                    </div>
                                    <div className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                      style={{ color: s.fc, backgroundColor: s.fc + '18' }}>{s.fee}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Attendance mini-chart */}
                            <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                              <div className="text-[9px] font-semibold text-gray-500 mb-2">Weekly Attendance</div>
                              <div className="flex items-end gap-1 h-9">
                                {[88,92,87,95,94,91,96].map((v, i) => (
                                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: v + '%', backgroundColor: i === 6 ? '#6C3AED' : '#EDE9FE' }}/>
                                ))}
                              </div>
                              <div className="flex mt-1">
                                {['M','T','W','T','F','S','S'].map((d, i) => (
                                  <div key={i} className="flex-1 text-center text-[7px] text-gray-300">{d}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ MOODLE LMS MOCKUP ══ */}
                      {sol.id === 'lms' && (
                        <div className="bg-white" style={{ minHeight: '360px' }}>
                          {/* Moodle top nav */}
                          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #F47B20 0%, #E05E00 100%)' }}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                                <span className="text-white text-[9px] font-black">M</span>
                              </div>
                              <div>
                                <div className="text-white text-[10px] font-bold leading-none">Al-Noor Academy</div>
                                <div className="text-white/60 text-[8px]">Moodle LMS · Powered by Cubico</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[9px]">A</div>
                              <span className="text-white/70 text-[9px]">Admin</span>
                            </div>
                          </div>
                          {/* Content */}
                          <div className="p-3">
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-[10px] font-bold text-gray-700">My Courses</span>
                              <span className="text-[9px] font-semibold cursor-default" style={{ color: '#F47B20' }}>+ Add Course</span>
                            </div>
                            {/* Course grid 3x2 */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {[
                                { name: 'Mathematics', grade: 'Grade 8', color: '#6C3AED', bg: '#F5F3FF', pct: 78, students: 34 },
                                { name: 'Physics',     grade: 'Grade 9', color: '#0891B2', bg: '#ECFEFF', pct: 92, students: 28 },
                                { name: 'English',     grade: 'Grade 7', color: '#059669', bg: '#ECFDF5', pct: 65, students: 41 },
                                { name: 'Chemistry',   grade: 'Grade 10',color: '#E11D48', bg: '#FFF1F2', pct: 45, students: 22 },
                                { name: 'Urdu',        grade: 'Grade 8', color: '#D97706', bg: '#FFFBEB', pct: 88, students: 38 },
                                { name: 'Biology',     grade: 'Grade 9', color: '#7C3AED', bg: '#F5F3FF', pct: 55, students: 30 },
                              ].map(c => (
                                <div key={c.name} className="rounded-xl overflow-hidden border border-gray-100 cursor-default hover:shadow-sm transition-shadow">
                                  <div className="h-9 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: c.bg }}>
                                    <span className="text-lg font-black leading-none" style={{ color: c.color + '40' }}>{c.name.slice(0,2).toUpperCase()}</span>
                                    <div className="absolute bottom-1 right-1.5 text-[7px] font-bold px-1 py-0.5 rounded-full text-white" style={{ backgroundColor: c.color }}>{c.pct}%</div>
                                  </div>
                                  <div className="p-1.5 bg-white">
                                    <div className="text-[8px] font-bold text-gray-700 truncate">{c.name}</div>
                                    <div className="text-[7px] text-gray-400">{c.grade} · {c.students} students</div>
                                    <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: c.pct + '%', backgroundColor: c.color }}/>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Activity feed */}
                            <div className="bg-gray-50 rounded-xl p-2.5 mb-3">
                              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Activity</div>
                              {[
                                { text: 'Ahmed submitted “Week 3 Quiz”',   time: '5m ago',  color: '#6C3AED' },
                                { text: 'New assignment: Chapter 4 Review', time: '1h ago',  color: '#F47B20' },
                                { text: 'Sara viewed Lesson 7 Video',       time: '2h ago',  color: '#0891B2' },
                                { text: '6 students completed Module 2',    time: '3h ago',  color: '#059669' },
                              ].map((a, ai) => (
                                <div key={ai} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: a.color }}/>
                                  <div className="flex-1 flex items-center justify-between gap-2">
                                    <span className="text-[8px] text-gray-600 leading-snug">{a.text}</span>
                                    <span className="text-[7px] text-gray-400 flex-shrink-0">{a.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Powered by badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border" style={{ backgroundColor: '#FEF0E6', borderColor: '#F47B20' + '40' }}>
                                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F47B20' }}>
                                  <span className="text-white text-[7px] font-black">M</span>
                                </div>
                                <span className="text-[9px] font-bold" style={{ color: '#F47B20' }}>Powered by Moodle™</span>
                              </div>
                              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border" style={{ backgroundColor: '#EDE9FE', borderColor: '#6C3AED' + '40' }}>
                                <div className="w-3.5 h-3.5 rounded-md bg-[#6C3AED] flex items-center justify-center text-white text-[7px] font-bold">C</div>
                                <span className="text-[9px] font-bold text-[#6C3AED]">Setup by Cubico</span>
                              </div>
                              <div className="flex items-center gap-1 rounded-full px-2 py-1 bg-emerald-50 border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                                <span className="text-[8px] font-semibold text-emerald-600">Live in 2 weeks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ TEACH MOCKUP ══ */}
                      {sol.id === 'teach' && (
                        <div className="bg-[#F8FBFC]" style={{ minHeight: '360px' }}>
                          {/* Toolbar */}
                          <div className="bg-white border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-700">Lesson Plan Builder</span>
                            <div className="flex-1"/>
                            <span className="text-[8px] text-white rounded-full px-2.5 py-1 cursor-default" style={{ backgroundColor: '#0891B2' }}>Save Draft</span>
                          </div>
                          <div className="flex gap-3 p-3">
                            {/* Lesson blocks */}
                            <div className="flex-1">
                              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Week 3 · Grade 6 Mathematics</div>
                              {[
                                { label: 'Learning Objective',   emoji: '🎯', color: '#0891B2', desc: 'Students will understand fractions and mixed numbers' },
                                { label: 'Introduction (10 min)',emoji: '📖', color: '#7C3AED', desc: 'Warm-up: review whole numbers with visual aids' },
                                { label: 'Main Activity (20 min)',emoji: '⚡',      color: '#D97706', desc: 'Group work: pizza fraction exercise with worksheets' },
                                { label: 'Assessment',           emoji: '✅',      color: '#059669', desc: 'Exit ticket: 5 fraction problems — auto-graded' },
                              ].map((block, bi) => (
                                <div key={bi} className="flex items-start gap-2 mb-2 bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                                    style={{ backgroundColor: block.color + '15' }}>
                                    {block.emoji}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[9px] font-bold text-gray-700">{block.label}</div>
                                    <div className="text-[8px] text-gray-400 mt-0.5 leading-snug">{block.desc}</div>
                                  </div>
                                  <div className="text-gray-200 text-xs flex-shrink-0 cursor-grab">⋮⋮</div>
                                </div>
                              ))}
                              <div className="border-2 border-dashed border-gray-200 rounded-xl p-2 flex items-center justify-center gap-1.5 cursor-default">
                                <span className="text-gray-300 text-sm">+</span>
                                <span className="text-[9px] text-gray-300">Add Block</span>
                              </div>
                            </div>
                            {/* At-risk + chart panel */}
                            <div className="w-[118px] flex-shrink-0 flex flex-col gap-2">
                              <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                                <div className="text-[9px] font-bold text-gray-500 mb-2">At-Risk Alerts</div>
                                {[
                                  { name: 'Ali M.',   issue: 'Missed 3 lessons', color: '#E11D48' },
                                  { name: 'Sara K.',  issue: '< 60% quiz avg',   color: '#D97706' },
                                  { name: 'Umar B.',  issue: 'Low attendance',   color: '#D97706' },
                                ].map(s => (
                                  <div key={s.name} className="flex items-start gap-1.5 mb-2 last:mb-0">
                                    <div className="w-1.5 h-1.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: s.color }}/>
                                    <div>
                                      <div className="text-[8px] font-semibold text-gray-700">{s.name}</div>
                                      <div className="text-[7px] text-gray-400 leading-tight">{s.issue}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                                <div className="text-[9px] font-bold text-gray-500 mb-2">Class Avg</div>
                                <div className="flex items-end gap-1 h-12">
                                  {[72,85,68,92,78,88].map((v, i) => (
                                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: v + '%', backgroundColor: i === 3 ? '#0891B2' : '#CFFAFE' }}/>
                                  ))}
                                </div>
                                <div className="text-[8px] font-bold text-center mt-1" style={{ color: '#0891B2' }}>76.4% avg</div>
                              </div>
                              <div className="bg-white rounded-xl border border-gray-100 p-2">
                                <div className="text-[8px] font-bold text-gray-400 mb-1.5">Curriculum</div>
                                {[
                                  { sub: 'Mathematics', pct: 68, color: '#0891B2' },
                                  { sub: 'Science',     pct: 82, color: '#059669' },
                                  { sub: 'English',     pct: 55, color: '#7C3AED' },
                                ].map(c => (
                                  <div key={c.sub} className="mb-1.5 last:mb-0">
                                    <div className="flex justify-between mb-0.5">
                                      <span className="text-[7px] text-gray-400">{c.sub}</span>
                                      <span className="text-[7px] font-bold" style={{ color: c.color }}>{c.pct}%</span>
                                    </div>
                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: c.pct + '%', backgroundColor: c.color }}/>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ LEARN MOCKUP ══ */}
                      {sol.id === 'learn' && (
                        <div style={{ minHeight: '360px', backgroundColor: '#0D0D1F' }}>
                          {/* Language + title bar */}
                          <div className="bg-[#1A1A2E] px-3 py-2 flex items-center gap-2 border-b border-white/[0.06]">
                            <div className="flex gap-1">
                              {['EN','AR','UR'].map(lang => (
                                <div key={lang} className="text-[8px] px-1.5 py-0.5 rounded font-bold"
                                  style={lang === 'EN' ? { backgroundColor: '#E11D48', color: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}>
                                  {lang}
                                </div>
                              ))}
                            </div>
                            <div className="flex-1 text-[8px] text-white/35 text-center">Chapter 3: Fractions · Grade 6 Math</div>
                            <div className="text-[8px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">HD</div>
                          </div>
                          {/* Animation stage */}
                          <div className="relative p-3" style={{ minHeight: '200px' }}>
                            {/* Scene bg */}
                            <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a4e 0%, #2d1b69 50%, #4a1e8a 100%)', minHeight: '180px', position: 'relative' }}>
                              {/* Stars */}
                              {[[10,8],[35,14],[65,7],[85,18],[25,22],[55,11],[78,5],[48,26]].map(([x,y], i) => (
                                <div key={i} className="absolute rounded-full bg-white"
                                  style={{ width: i % 3 === 0 ? '2px' : '1.5px', height: i % 3 === 0 ? '2px' : '1.5px', left: x+'%', top: y+'%', opacity: 0.5 + (i * 0.06) }}/>
                              ))}
                              {/* Chalkboard */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-xl border-4 p-4 w-48 shadow-2xl"
                                  style={{ backgroundColor: '#1E3A2E', borderColor: '#2D5040' }}>
                                  <div className="text-center">
                                    <div className="text-white/80 font-mono font-bold mb-3" style={{ fontSize: '1.1rem' }}>&frac12; + &frac14; = ?</div>
                                    <div className="flex items-center justify-center gap-2">
                                      {['½', '+', '¼', '=', '¾'].map((sym, si) => (
                                        <div key={si} className={si === 2 || si === 0 ? 'w-7 h-7 rounded-lg flex items-center justify-center text-xs' : si === 4 ? 'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold' : 'text-white/40 text-sm'}
                                          style={si === 0 || si === 2 ? { backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' } : si === 4 ? { backgroundColor: 'rgba(225,29,72,0.3)', border: '1px solid rgba(225,29,72,0.5)', color: '#E11D48' } : {}}>
                                          {sym}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Animated character SVG */}
                              <div className="absolute bottom-2 left-4">
                                <svg width="44" height="66" viewBox="0 0 44 66" fill="none">
                                  <ellipse cx="22" cy="42" rx="11" ry="15" fill="#F97316"/>
                                  <circle cx="22" cy="20" r="11" fill="#FBBF24"/>
                                  <circle cx="18.5" cy="18" r="2" fill="#1F2937"/>
                                  <circle cx="25.5" cy="18" r="2" fill="#1F2937"/>
                                  <path d="M17.5 23 Q22 27.5 26.5 23" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                                  <path d="M11 39 L4 31" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <path d="M33 37 L41 27" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <line x1="41" y1="27" x2="47" y2="20" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M17 56 L14 66" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <path d="M27 56 L30 66" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                </svg>
                              </div>
                              {/* Quiz popup */}
                              <div className="absolute top-3 right-3 bg-white rounded-xl shadow-lg p-2.5 w-28">
                                <div className="text-[8px] font-bold text-gray-700 mb-1.5">Quick Check ✓</div>
                                {['¾','½','1¼'].map((opt, oi) => (
                                  <div key={opt} className="flex items-center gap-1.5 mb-1 last:mb-0 rounded-lg px-1.5 py-1"
                                    style={oi === 0 ? { backgroundColor: '#DCFCE7', border: '1px solid #86EFAC' } : {}}>
                                    <div className="w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0"
                                      style={oi === 0 ? { backgroundColor: '#22C55E', borderColor: '#22C55E' } : { borderColor: '#D1D5DB' }}>
                                      {oi === 0 && <span className="text-white text-[6px]">✓</span>}
                                    </div>
                                    <span className="text-[8px]"
                                      style={oi === 0 ? { color: '#15803D', fontWeight: 700 } : { color: '#9CA3AF' }}>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Player controls */}
                          <div className="px-3 py-2 bg-[#1A1A2E]">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div className="h-full rounded-full" style={{ width: '38%', backgroundColor: '#E11D48' }}/>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] text-white/50">▶</span>
                              <span className="text-[9px] text-white/40 font-mono">04:33 / 12:00</span>
                              <div className="flex-1"/>
                              <div className="flex gap-1">
                                {['2D Char','3D Model','Whiteboard','Motion GFX'].map((t, ti) => (
                                  <div key={t} className="text-[7px] px-1.5 py-0.5 rounded font-medium"
                                    style={ti === 0 ? { backgroundColor: '#E11D48', color: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.28)' }}>
                                    {t}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Chapter list */}
                          <div className="px-3 py-2 border-t border-white/[0.05] bg-[#0F0F1E]">
                            <div className="flex gap-2 overflow-x-auto pb-1">
                              {[
                                { num: '01', title: 'Intro to Fractions',     done: true  },
                                { num: '02', title: 'Adding Fractions',        done: true  },
                                { num: '03', title: 'Mixed Numbers',           active: true },
                                { num: '04', title: 'Fraction Word Problems',  done: false },
                              ].map(ch => (
                                <div key={ch.num} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default"
                                  style={'active' in ch && ch.active
                                    ? { backgroundColor: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.3)' }
                                    : { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                  <span className="text-[8px] font-mono font-bold"
                                    style={{ color: 'active' in ch && ch.active ? '#E11D48' : ch.done ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)' }}>
                                    {ch.done ? '✓' : ch.num}
                                  </span>
                                  <span className="text-[8px] whitespace-nowrap"
                                    style={{ color: 'active' in ch && ch.active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)' }}>
                                    {ch.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ MARKETING MOCKUP ══ */}
                      {sol.id === 'marketing' && (
                        <div className="bg-white" style={{ minHeight: '360px' }}>
                          {/* Dashboard header */}
                          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)' }}>
                            <div>
                              <div className="text-white text-[10px] font-bold">Admissions Dashboard</div>
                              <div className="text-white/60 text-[8px]">March 2025 · Al-Noor Academy</div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"/>
                              <span className="text-white text-[8px] font-semibold">Live</span>
                            </div>
                          </div>
                          <div className="p-3 flex gap-3">
                            {/* Funnel chart */}
                            <div className="flex-1">
                              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Enrollment Funnel · This Month</div>
                              {[
                                { label: 'Website Visitors', value: '4,280', pct: 100, color: '#0891B2' },
                                { label: 'Ad Clicks',        value: '1,940', pct: 71,  color: '#6C3AED' },
                                { label: 'Inquiries',        value: '342',   pct: 45,  color: '#F47B20' },
                                { label: 'Enrolled',         value: '164',   pct: 22,  color: '#059669' },
                              ].map((step, si) => (
                                <div key={step.label} className="mb-2.5">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[8px] text-gray-500 font-medium">{step.label}</span>
                                    <span className="text-[9px] font-bold text-gray-700">{step.value}</span>
                                  </div>
                                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: step.pct + '%', backgroundColor: step.color }}/>
                                  </div>
                                </div>
                              ))}
                              {/* ROI cards */}
                              <div className="grid grid-cols-3 gap-1.5 mt-3">
                                {[
                                  { label: 'Ad ROI',           value: '5×',     color: '#059669', bg: '#ECFDF5' },
                                  { label: 'Cost/Enrollment',  value: '₩2,100', color: '#2563EB', bg: '#EFF6FF' },
                                  { label: 'Enquiries ↑', value: '+34%',        color: '#F47B20', bg: '#FEF0E6' },
                                ].map(r => (
                                  <div key={r.label} className="rounded-xl p-2 border"
                                    style={{ backgroundColor: r.bg, borderColor: r.color + '30' }}>
                                    <div className="text-[7px] text-gray-400">{r.label}</div>
                                    <div className="text-sm font-bold leading-none mt-0.5" style={{ color: r.color }}>{r.value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Social & SEO panel */}
                            <div className="w-[115px] flex-shrink-0 flex flex-col gap-2">
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <div className="text-[8px] font-bold text-gray-500 mb-2">Social Reach</div>
                                {[
                                  { platform: 'Facebook',  val: '12.4K', color: '#1877F2' },
                                  { platform: 'Instagram', val: '8.2K',  color: '#E11D48' },
                                  { platform: 'YouTube',   val: '3.8K',  color: '#FF0000' },
                                ].map(s => (
                                  <div key={s.platform} className="flex items-center justify-between mb-1.5 last:mb-0">
                                    <span className="text-[7px] text-gray-400">{s.platform}</span>
                                    <span className="text-[8px] font-bold" style={{ color: s.color }}>{s.val}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <div className="text-[8px] font-bold text-gray-500 mb-2">SEO Rankings</div>
                                {[
                                  { kw: '"Best school Lahore"', pos: '#2' },
                                  { kw: '"O-levels academy"',   pos: '#4' },
                                  { kw: '"Cambridge school"',   pos: '#3' },
                                ].map(k => (
                                  <div key={k.kw} className="flex items-center justify-between mb-1.5 last:mb-0">
                                    <span className="text-[7px] text-gray-400 truncate flex-1 mr-1">{k.kw}</span>
                                    <span className="text-[8px] font-bold flex-shrink-0" style={{ color: '#059669' }}>{k.pos}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-[#ECFDF5] rounded-xl p-2 border border-emerald-100">
                                <div className="text-[8px] font-bold text-emerald-700 mb-0.5">Website Live ✓</div>
                                <div className="text-[7px] text-gray-500">alnooracademy.edu.pk</div>
                                <div className="text-[7px] text-emerald-600 font-medium mt-1">Live in 3 weeks</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Floating metric badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100 hidden lg:flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: sol.accentLight }}>
                        {(() => { const SolIcon = sol.icon; return <SolIcon size={16} style={{ color: sol.accentHex }} />; })()}
                      </div>
                      <div>
                        <div className="text-sm font-heading font-bold leading-none" style={{ color: sol.accentHex }}>{sol.metric}</div>
                        <div className="text-[9px] text-gray-400 leading-snug max-w-[100px]">{sol.metricLabel}</div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── BOTTOM TRUST STRIP ── */}
          <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield,     stat: '760+', label: 'Institutions',      sub: 'across 3 countries'    },
                { icon: TrendingUp, stat: '94%',  label: 'Avg. Satisfaction', sub: 'rated 5/5 by clients'  },
                { icon: Zap,        stat: '4 wk', label: 'Avg. Go-Live',      sub: 'from signed contract'  },
                { icon: Users,      stat: '24/7', label: 'Support',           sub: 'dedicated account mgr' },
              ].map(item => {
                const SIcon = item.icon;
                return (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.3 }}
                    className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <SIcon size={15} className="text-gray-400" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-gray-900 text-xl leading-none">{item.stat}</div>
                      <div className="text-xs font-semibold text-gray-600 mt-0.5">{item.label}</div>
                      <div className="text-[10px] text-gray-400">{item.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ ABOUT / WHO WE ARE ═══════════ */}
      <section id="about" className="py-24 bg-surface-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 relative">
                {/* Floating 760+ badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.5, type:'spring', stiffness:260, damping:20 }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2 animate-bounce-soft"
                  style={{ animation:'float 6s ease-in-out 0.5s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">760+</div>
                    <div className="text-[9px] text-gray-400 leading-tight">Institutions</div>
                  </div>
                </motion.div>
                {/* Floating 3 Countries badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.7, type:'spring', stiffness:260, damping:20 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2"
                  style={{ animation:'float2 8s ease-in-out 1s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">3 Countries</div>
                    <div className="text-[9px] text-gray-400 leading-tight">PK · SA · CA</div>
                  </div>
                </motion.div>
                {/* Feature Image Mockup */}
                <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, label: 'K-12 Schools',    color: 'bg-purple-100 text-purple-600',  count:'460+' },
                      { icon: Award,    label: 'Islamic Schools', color: 'bg-emerald-100 text-emerald-600', count:'180+' },
                      { icon: Globe,    label: 'International',   color: 'bg-blue-100 text-blue-600',      count:'85+'  },
                      { icon: Users,    label: 'Colleges & NGOs', color: 'bg-orange-100 text-orange-600',  count:'35+'  },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.85, y:8 }}
                        whileInView={{ opacity: 1, scale: 1, y:0 }}
                        whileHover={{ scale:1.05, y:-3 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.12 * i, duration:0.4, type:'spring', stiffness:260, damping:20 }}
                        className="flex flex-col items-center p-5 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-default"
                      >
                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-2`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-black text-gray-900 mb-0.5">{item.count}</span>
                        <span className="text-xs font-medium text-gray-500 text-center leading-snug">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float2" />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
                Who we are
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                The Ultimate Source of
                <br />
                <span className="gradient-text">EdTech Solutions</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                We are a full-stack EdTech agency helping schools across Pakistan, Saudi Arabia & Canada
                modernize their operations and learning experiences. Our team combines deep understanding of
                education with cutting-edge technology.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="icon-box flex-shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Education First</h4>
                    <p className="text-sm text-gray-500">Built by educators and technologists who understand learning.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="icon-box icon-box-accent flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Built With Educators</h4>
                    <p className="text-sm text-gray-500">Every solution is co-developed with real teachers and administrators.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="py-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/12 rounded-full filter blur-[110px] animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full filter blur-[110px] animate-float2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full filter blur-[80px] animate-glow-breath" />
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
                  color={['#818CF8','#34D399','#60A5FA','#FBBF24'][i]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SOLUTIONS / SERVICES ═══════════ */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
              What we offer
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              Listening to You, and Answering
              <br />
              with <span className="gradient-text">Technology</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive digital solutions designed specifically for the education sector, delivered with expertise and care.
            </motion.p>
          </motion.div>

          <motion.div
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => {
              const SC = [
                { b:'#1E6B5A', ib:'#E6F5F0', if_:'#1E6B5A', lg:'linear-gradient(90deg,#1E6B5A,#2A9D8F)' },
                { b:'#E11D48', ib:'#FFE4E6', if_:'#E11D48', lg:'linear-gradient(90deg,#E11D48,#FB7185)' },
                { b:'#0891B2', ib:'#CFFAFE', if_:'#0891B2', lg:'linear-gradient(90deg,#0891B2,#22D3EE)' },
                { b:'#2563EB', ib:'#DBEAFE', if_:'#2563EB', lg:'linear-gradient(90deg,#2563EB,#60A5FA)' },
                { b:'#D97706', ib:'#FEF3C7', if_:'#D97706', lg:'linear-gradient(90deg,#D97706,#FCD34D)' },
                { b:'#059669', ib:'#D1FAE5', if_:'#059669', lg:'linear-gradient(90deg,#059669,#34D399)' },
                { b:'#3B82F6', ib:'#DBEAFE', if_:'#3B82F6', lg:'linear-gradient(90deg,#3B82F6,#93C5FD)' },
                { b:'#7C3AED', ib:'#EDE9FE', if_:'#7C3AED', lg:'linear-gradient(90deg,#7C3AED,#A78BFA)' },
              ];
              const c = SC[i % 8];
              return (
                <motion.div
                  key={svc.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y:-5, scale:1.02 }}
                  transition={{ type:'spring', stiffness:300, damping:20 }}
                  className="group cursor-pointer relative rounded-2xl bg-white border border-gray-100 p-6 text-center overflow-hidden shadow-sm hover:shadow-xl"
                >
                  {/* Hover bg gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background:`radial-gradient(ellipse at 50% 0%,${c.b}14 0%,transparent 70%)` }}/>
                  {/* Animated bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"
                    style={{ background:c.lg }}/>
                  {/* Service number */}
                  <div className="absolute top-2.5 right-3 text-[10px] font-mono font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                    {String(i + 1).padStart(2,'0')}
                  </div>
                  <motion.div
                    whileHover={{ rotate:-6, scale:1.15 }}
                    transition={{ type:'spring', stiffness:400, damping:15 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor:c.ib }}>
                    <svc.icon className="w-6 h-6" style={{ color:c.if_ }} />
                  </motion.div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2 text-sm">{svc.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
                </motion.div>
              );
            })}
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
              <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
                Contact us
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                Get a Free Trial and
                <br />
                Solutions <span className="gradient-text">Demo</span> from Us
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Experience our complete EdTech suite with a personalized demo. Our team will walk you through
                every feature and answer all your questions.
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
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/25 transition-all">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="text-sm text-gray-600 font-medium flex-1">{item.text}</span>
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={4}
                className="flex items-center gap-3 p-4 rounded-2xl border"
                style={{ backgroundColor:'rgba(5,150,105,0.05)', borderColor:'rgba(5,150,105,0.18)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0"/>
                <span className="text-sm font-semibold text-gray-700">We respond within <span className="text-accent font-bold">24 hours</span>, guaranteed.</span>
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
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-500">We&apos;ll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Company *"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email *"
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
                      <option value="">Select Position</option>
                      <option value="principal">Principal / Head of School</option>
                      <option value="director">Director / Board Member</option>
                      <option value="it_head">IT Head / Administrator</option>
                      <option value="teacher">Teacher / Department Head</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="form-select"
                    >
                      <option value="">Number of Students / Staff</option>
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
                          Sending...
                        </span>
                      ) : (
                        <>
                          Get Free Demo
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
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
            <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
              Customer Reviews
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              What Our <span className="gradient-text">Clients</span> Say
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm font-medium">Rated 5 out of 5 (760+ reviews)</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => {
              const tGrads = [
                'linear-gradient(135deg,#1E6B5A,#2A9D8F)',
                'linear-gradient(135deg,#059669,#0891B2)',
                'linear-gradient(135deg,#E76F51,#F4A261)',
              ];
              const tChip = [
                { bg:'rgba(30,107,90,0.08)', fg:'#1E6B5A' },
                { bg:'rgba(5,150,105,0.08)',  fg:'#059669' },
                { bg:'rgba(37,99,235,0.08)',  fg:'#2563EB' },
              ];
              return (
                <motion.div key={t.name} variants={fadeUp} custom={i}
                  whileHover={{ y:-6, rotateY:3, rotateX:-2, scale:1.01 }}
                  transition={{ type:'spring', stiffness:250, damping:25 }}
                  style={{ transformStyle:'preserve-3d', transformOrigin:'center center' }}
                  className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm hover:shadow-2xl cursor-default"
                >
                  {/* Giant decorative quote */}
                  <div className="absolute -top-3 -left-1 leading-none select-none pointer-events-none text-gray-100"
                    style={{ fontSize:'6.5rem', fontFamily:'Georgia,serif', lineHeight:1 }}>“</div>
                  {/* Stars + verified */}
                  <div className="flex items-center gap-1 mb-4 relative">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-auto text-[9px] font-bold text-gray-300 tracking-wider">VERIFIED</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm relative">“{t.text}”</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background:tGrads[i] }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor:tChip[i].bg, color:tChip[i].fg }}>
                      {t.location}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
              <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
                FAQ
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                Frequently Asked
                <br />
                <span className="gradient-text">Questions</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Everything you need to know about our EdTech solutions and how we can help transform your institution.
              </motion.p>

              {/* FAQ Visual */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 hidden lg:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Still have questions?</h4>
                    <p className="text-sm text-gray-500">Our team is ready to help</p>
                  </div>
                </div>
                <a href="#contact" className="btn-primary text-sm">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </a>
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
                        style={openFaq === i ? { backgroundColor:'#1E6B5A', color:'#fff' } : { backgroundColor:'#F3F4F6', color:'#9CA3AF' }}>
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

      {/* ═══════════ PARTNER LOGOS ═══════════ */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(90deg,white 0%,transparent 100%)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(270deg,white 0%,transparent 100%)' }}/>
        <p className="text-center text-[10px] font-bold text-gray-300 tracking-[0.22em] uppercase mb-6">
          Trusted by institutions across 3 countries
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

      {/* ═══════════ JOIN CTA SECTION ═══════════ */}
      <section className="py-24 section-dark relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/15 rounded-full filter blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full filter blur-[120px] animate-float2" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'32px 32px' }}/>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"/>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { l:'8%',  b:'25%', s:4, d:'0s',    a:'pdrift'  },
            { l:'18%', b:'55%', s:3, d:'1.3s',  a:'pdrift2' },
            { l:'28%', b:'12%', s:5, d:'2.6s',  a:'pdrift'  },
            { l:'45%', b:'35%', s:3, d:'0.7s',  a:'pdrift2' },
            { l:'60%', b:'65%', s:4, d:'1.9s',  a:'pdrift'  },
            { l:'72%', b:'18%', s:3, d:'3.1s',  a:'pdrift2' },
            { l:'82%', b:'45%', s:5, d:'0.4s',  a:'pdrift'  },
            { l:'92%', b:'72%', s:3, d:'2.2s',  a:'pdrift2' },
          ].map((p, pi) => (
            <div key={pi} className="absolute rounded-full bg-white/20"
              style={{ left:p.l, bottom:p.b, width:p.s, height:p.s,
                animation:`${p.a} ${4.5 + pi * 0.4}s ease-in-out ${p.d} infinite alternate` }}/>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Live status badge */}
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">Now Enrolling Institutions</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
            >
              Join Our <span className="shimmer-text">760+</span> Happy Institutions
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Transform your school with cutting-edge technology. Start your digital journey today and see
              results within weeks, not months.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn-primary text-lg px-10">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#solutions" className="btn-outline-white text-lg px-10">
                Explore Solutions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-dark-950 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-heading font-bold text-lg text-white">
                  C
                </div>
                <span className="font-heading font-bold text-xl">
                  Cubico<span className="text-primary-light">.tech</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Full-stack EdTech agency transforming education across Pakistan, Saudi Arabia & Canada with innovative technology solutions.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Solutions */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Solutions</h4>
              <ul className="space-y-3">
                {['Smart LMS', 'Animation Studio', 'School ERP', 'Web Development', 'Mobile Apps'].map((link) => (
                  <li key={link}>
                    <a href="#solutions" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Team', 'Careers', 'News & Blog', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#about" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-white/50 text-sm mb-6">
                Sign up for updates, insights, and news about EdTech innovation.
              </p>
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-2 text-accent-light text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <button type="submit" className="btn-primary w-full justify-center text-sm">
                    Sign Up <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              Copyright © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
