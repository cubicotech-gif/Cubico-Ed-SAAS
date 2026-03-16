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
    accentHex: '#6C3AED', accentLight: '#EDE9FE',
    demoUrl: 'demo.cubico.tech/manage',
    tiles: [
      { icon: Users,     stat: '2,847', label: 'Students Enrolled',  bg: '#F5F3FF', color: '#6C3AED' },
      { icon: BarChart3, stat: '94.3%', label: 'Attendance Rate',    bg: '#ECFDF5', color: '#059669' },
      { icon: PieChart,  stat: '₨4.2M',label: 'Fee Collected',      bg: '#FFFBEB', color: '#D97706' },
      { icon: Settings,  stat: '186',   label: 'Active Courses',     bg: '#EFF6FF', color: '#2563EB' },
    ],
    features: [
      { icon: Users,    title: 'Enrollment & Admissions', desc: 'Full student lifecycle from inquiry to graduation.'   },
      { icon: BarChart3,title: 'Fee & Finance',           desc: 'Invoices, payments, and overdue alerts — automated.' },
      { icon: PieChart, title: 'Attendance & Exams',      desc: 'Smart attendance, gradebooks, and exam scheduling.'  },
      { icon: Settings, title: 'HR & Timetable',          desc: 'Staff records, payroll, and auto-generated schedules.'},
    ],
    themes: [
      { name: 'Eclipse Dark',   bg: '#0F0F23', accent: '#7C3AED', label: 'Enterprise' },
      { name: 'Horizon Light',  bg: '#F8FAFC', accent: '#3B82F6', label: 'Classic'    },
      { name: 'Campus Fresh',   bg: '#F0FDF4', accent: '#10B981', label: 'School'     },
      { name: 'Al-Arabiya RTL', bg: '#FFFBEB', accent: '#F59E0B', label: 'Arabic RTL' },
    ],
  },
  {
    id: 'teach', name: 'Cubico Teach™',
    tagline: "Everything a teacher needs. Nothing they don't.",
    icon: BookOpen,
    painPoint: 'Teachers spending Sunday nights building lesson plans from scratch?',
    metric: '2×', metricLabel: 'faster lesson planning from day one',
    accentHex: '#0891B2', accentLight: '#CFFAFE',
    demoUrl: 'demo.cubico.tech/teach',
    tiles: [
      { icon: Lightbulb, stat: '2×',    label: 'Faster Lesson Plans', bg: '#ECFEFF', color: '#0891B2' },
      { icon: Target,    stat: '100%',  label: 'Curriculum Covered',  bg: '#EFF6FF', color: '#2563EB' },
      { icon: BarChart3, stat: '76.4%', label: 'Class Avg Grade',     bg: '#ECFDF5', color: '#059669' },
      { icon: Cloud,     stat: '∞',     label: 'Resource Library',    bg: '#F5F3FF', color: '#7C3AED' },
    ],
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
    demoUrl: 'demo.cubico.tech/learn',
    tiles: [
      { icon: Film,    stat: '4×',  label: 'Higher Engagement',    bg: '#FFF1F2', color: '#E11D48' },
      { icon: Globe,   stat: '3',   label: 'Languages: EN·AR·UR', bg: '#ECFDF5', color: '#059669' },
      { icon: Zap,     stat: '94%', label: 'Lesson Completion',    bg: '#FFFBEB', color: '#D97706' },
      { icon: Monitor, stat: '50+', label: 'Subject Animations',   bg: '#F5F3FF', color: '#7C3AED' },
    ],
    features: [
      { icon: Film,    title: '2D & 3D Animation',       desc: 'Character-led animated lessons, any subject.'   },
      { icon: Monitor, title: 'Interactive Simulations', desc: 'STEM labs students can actually manipulate.'     },
      { icon: Globe,   title: 'English · Arabic · Urdu', desc: 'Full narration and RTL support built in.'        },
      { icon: Zap,     title: 'Adaptive Quizzes',        desc: 'End-of-lesson assessments that self-adjust.'     },
    ],
    animStyles: [
      { label: '2D Character', icon: '🎭' },
      { label: '3D Model',     icon: '🧊' },
      { label: 'Whiteboard',   icon: '✏️' },
      { label: 'Motion GFX',   icon: '✨' },
    ],
  },
  {
    id: 'marketing', name: 'Cubico Marketing™',
    tagline: 'Fill every seat. Every semester.',
    icon: Megaphone,
    painPoint: 'Your school is incredible. Nobody outside your city knows it exists.',
    metric: '+34%', metricLabel: 'average increase in admission enquiries',
    accentHex: '#059669', accentLight: '#D1FAE5',
    demoUrl: 'demo.cubico.tech/marketing',
    tiles: [
      { icon: TrendingUp, stat: '+34%', label: 'More Enquiries',      bg: '#ECFDF5', color: '#059669' },
      { icon: Globe,      stat: '3wk',  label: 'Website Go-Live',     bg: '#ECFEFF', color: '#0891B2' },
      { icon: Target,     stat: '22%',  label: 'Admission Conversion',bg: '#EFF6FF', color: '#2563EB' },
      { icon: Megaphone,  stat: '5×',   label: 'Ad ROI',              bg: '#F5F3FF', color: '#7C3AED' },
    ],
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
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="stat-number text-4xl md:text-5xl text-white mb-2">
        {count}
        <span className="text-accent-light">{suffix}</span>
      </div>
      <p className="text-white/60 text-sm font-medium tracking-wide uppercase">{label}</p>
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
      {/* ═══════════ NAVIGATION ═══════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-lg ${
                scrolled ? 'bg-primary text-white' : 'bg-white text-primary'
              }`}>
                C
              </div>
              <span className={`font-heading font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Cubico<span className="text-primary-light">.tech</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    scrolled ? 'text-gray-600' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="#contact" className="btn-primary text-sm">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#contact" className="btn-primary text-sm w-full justify-center mt-4">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* ── Sky gradient background ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #0C1B3A 0%, #1A3D72 12%, #2E6BAD 28%, #4E96C8 44%, #82BDD6 56%, #C8975F 68%, #C45F30 80%, #7A3318 92%, #4A1E0C 100%)',
          }}
        />

        {/* ── Atmospheric haze at horizon ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 120% 30% at 50% 62%, rgba(220,160,80,0.35) 0%, transparent 70%)',
          }}
        />

        {/* ── Painted/noise texture ── */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '300px 300px',
          }}
        />

        {/* ── Left tree silhouette ── */}
        <div className="absolute bottom-0 left-0 w-[260px] h-[60%] pointer-events-none select-none">
          <svg viewBox="0 0 260 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMinYMax meet">
            {/* Background thin tree */}
            <ellipse cx="200" cy="200" rx="28" ry="60" fill="#120B02"/>
            <ellipse cx="210" cy="155" rx="22" ry="48" fill="#120B02"/>
            <rect x="196" y="245" width="10" height="235" fill="#120B02"/>
            {/* Mid tree */}
            <ellipse cx="130" cy="170" rx="38" ry="75" fill="#0E0801"/>
            <ellipse cx="118" cy="115" rx="30" ry="58" fill="#0E0801"/>
            <ellipse cx="145" cy="105" rx="26" ry="50" fill="#0E0801"/>
            <rect x="122" y="230" width="14" height="250" fill="#0E0801"/>
            {/* Main foreground tree */}
            <ellipse cx="55" cy="190" rx="55" ry="100" fill="#0A0700"/>
            <ellipse cx="40" cy="115" rx="45" ry="82" fill="#0A0700"/>
            <ellipse cx="72" cy="100" rx="40" ry="72" fill="#0A0700"/>
            <ellipse cx="55" cy="78" rx="32" ry="58" fill="#0A0700"/>
            <rect x="46" y="270" width="18" height="210" fill="#0A0700"/>
          </svg>
        </div>

        {/* ── Right tree silhouette ── */}
        <div className="absolute bottom-0 right-0 w-[200px] h-[48%] pointer-events-none select-none">
          <svg viewBox="0 0 200 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMaxYMax meet">
            {/* Background small tree */}
            <ellipse cx="40" cy="180" rx="24" ry="52" fill="#120B02"/>
            <ellipse cx="32" cy="138" rx="18" ry="40" fill="#120B02"/>
            <rect x="32" y="222" width="9" height="158" fill="#120B02"/>
            {/* Main right tree */}
            <ellipse cx="145" cy="155" rx="50" ry="88" fill="#0A0700"/>
            <ellipse cx="130" cy="95" rx="40" ry="70" fill="#0A0700"/>
            <ellipse cx="158" cy="82" rx="34" ry="62" fill="#0A0700"/>
            <rect x="136" y="228" width="16" height="152" fill="#0A0700"/>
          </svg>
        </div>

        {/* ── Ground / dark base strip ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[8%] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #2A1008)' }}
        />

        {/* ═══ CONTENT (upper viewport) ═══ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center pt-36 pb-10 px-6"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium text-white/80 border border-white/15 bg-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Trusted by 760+ Institutions · Pakistan · Saudi Arabia · Canada
            </span>
          </motion.div>

          {/* Headline — 3 lines, huge, centered */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-heading font-bold text-white leading-[1.1] tracking-[-0.025em] mb-6 max-w-4xl"
          >
            Give your school the platform
            <br />
            it deserves — and your students
            <br />
            the education they expect.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-10"
          >
            Cubico brings LMS, animated lessons, digital marketing, and complete
            institution management under one intelligent platform.
          </motion.p>

          {/* Single CTA */}
          <motion.div variants={fadeUp} custom={3}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-white text-gray-900 font-bold text-base px-9 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Book Free Demo
              <ArrowRight size={17} />
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ DASHBOARD MOCKUP — rises from bottom ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex justify-center px-4 sm:px-6 lg:px-10 -mb-[28vh]"
        >
          <div
            className="w-full max-w-[980px] rounded-t-2xl overflow-hidden"
            style={{
              boxShadow: '0 -8px 60px rgba(0,0,0,0.55), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Browser chrome ── */}
            <div className="bg-[#1C1C2E] px-4 py-3 flex items-center gap-3 border-b border-white/[0.07]">
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-white/[0.06] rounded-md px-3 py-1 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400/60 flex-shrink-0" />
                <span className="text-[11px] font-mono text-white/35">app.cubico.tech/dashboard</span>
              </div>
              <div className="hidden sm:flex gap-2 flex-shrink-0">
                <div className="text-[10px] text-white/25 px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">↑ Upload Data</div>
                <div className="text-[10px] text-white/25 px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">⊞ Generate Report</div>
              </div>
            </div>

            {/* ── Dashboard body ── */}
            <div className="flex bg-[#F4F5F7] min-h-[340px]">

              {/* Sidebar */}
              <div className="w-[180px] flex-shrink-0 bg-[#0F0F1E] flex flex-col py-4 hidden sm:flex">
                {/* Logo */}
                <div className="flex items-center gap-2 px-4 mb-6">
                  <div className="w-6 h-6 rounded-md bg-[#6C3AED] flex items-center justify-center text-white text-[10px] font-bold">C</div>
                  <span className="text-white text-sm font-bold font-heading">Cubico</span>
                </div>
                {/* Nav */}
                {[
                  { label: 'Dashboard',     active: true  },
                  { label: 'Students',      active: false },
                  { label: 'Courses',       active: false },
                  { label: 'Attendance',    active: false },
                  { label: 'Fee Management',active: false },
                  { label: 'Reports',       active: false },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 px-4 py-2 mx-2 rounded-lg text-[11px] font-medium cursor-default"
                    style={item.active
                      ? { backgroundColor: 'rgba(108,58,237,0.2)', color: '#A78BFA', border: '1px solid rgba(108,58,237,0.25)' }
                      : { color: 'rgba(255,255,255,0.35)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.active ? '#7C3AED' : 'rgba(255,255,255,0.15)' }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">Institution Overview</span>
                  <div className="flex gap-2">
                    {['This Month ▾', 'Export', '+ New'].map(btn => (
                      <div key={btn} className="text-[10px] text-gray-400 px-2.5 py-1 rounded-md border border-gray-200 bg-white cursor-default hover:border-gray-300 transition-colors">{btn}</div>
                    ))}
                  </div>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3 px-5 pt-4 pb-3">
                  {[
                    { label: 'Total Students', value: '2,847', trend: '+12% vs last month', color: '#6C3AED', bg: '#F5F3FF' },
                    { label: 'Fee Collected',  value: '₨4.2M',  trend: '+8% vs last month',  color: '#059669', bg: '#ECFDF5' },
                    { label: 'Completion Rate',value: '94.2%', trend: '+2% this semester',  color: '#2563EB', bg: '#EFF6FF' },
                  ].map(k => (
                    <div key={k.label} className="bg-white rounded-xl p-3 border border-gray-100">
                      <div className="text-[9px] text-gray-400 mb-1">{k.label}</div>
                      <div className="font-heading font-bold text-lg leading-none mb-1" style={{ color: k.color }}>{k.value}</div>
                      <div className="text-[9px] text-emerald-500 font-medium">{k.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex-1 mx-5 mb-4 bg-[#0D0D1F] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-[11px] font-semibold text-white/70">Enrollment Trend</span>
                    <span className="text-[10px] text-white/30 border border-white/10 rounded px-2 py-0.5">Last 6 months ▾</span>
                  </div>
                  {/* SVG Line Chart */}
                  <div className="px-4 pb-4">
                    <svg viewBox="0 0 600 120" className="w-full" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[20,45,70,95].map(y => (
                        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      ))}
                      {/* Y-axis labels */}
                      {[['80k',8],['60k',33],['40k',58],['20k',83]].map(([l,y]) => (
                        <text key={String(l)} x="590" y={Number(y)} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="end">{l}</text>
                      ))}
                      {/* X-axis labels */}
                      {[['Aug',50],['Sep',150],['Oct',250],['Nov',350],['Dec',450],['Jan',545]].map(([l,x]) => (
                        <text key={String(l)} x={Number(x)} y="115" fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="middle">{l}</text>
                      ))}
                      {/* Area fill */}
                      <path d="M0,95 C40,90 80,80 130,70 C180,60 210,55 260,45 C310,35 350,30 400,25 C440,20 480,18 550,12 L550,105 L0,105 Z"
                        fill="url(#chartGrad)" opacity="0.3"/>
                      {/* Line */}
                      <path d="M0,95 C40,90 80,80 130,70 C180,60 210,55 260,45 C310,35 350,30 400,25 C440,20 480,18 550,12"
                        stroke="#6C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      {/* End dot */}
                      <circle cx="550" cy="12" r="4" fill="#6C3AED"/>
                      <circle cx="550" cy="12" r="7" fill="rgba(108,58,237,0.3)"/>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6C3AED"/>
                          <stop offset="100%" stopColor="transparent"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="w-[200px] flex-shrink-0 bg-white border-l border-gray-100 py-4 px-3 hidden lg:flex flex-col gap-4">
                {/* Processing Status */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live Status</span>
                  </div>
                  {[
                    { label: 'Students Online',  val: '142'    },
                    { label: 'Active Sessions',  val: '38'     },
                    { label: 'Pending Fees',     val: '₨62K'   },
                    { label: 'Today Attendance', val: '94%'    },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                      <span className="text-[10px] text-gray-400">{r.label}</span>
                      <span className="text-[10px] font-bold text-gray-700">{r.val}</span>
                    </div>
                  ))}
                </div>
                {/* Recent Activity */}
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Activity</div>
                  {[
                    { text: '3 new enrollments today', color: '#6C3AED' },
                    { text: 'Mid-term results uploaded', color: '#059669' },
                    { text: '2 fee reminders sent', color: '#D97706' },
                  ].map((a, ai) => (
                    <div key={ai} className="flex items-start gap-2 mb-2 last:mb-0">
                      <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: a.color }} />
                      <span className="text-[10px] text-gray-400 leading-snug">{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FEATURE CARDS ═══════════ */}
      <section className="py-20 bg-white relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                <div className={`icon-box ${card.color.includes('purple') ? '' : card.color.includes('emerald') ? 'icon-box-accent' : ''} mb-5`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
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

                  {/* RIGHT — illustrated tiles */}
                  <div className="space-y-4">
                    {/* 2×2 illustrated feature tiles */}
                    <div className="grid grid-cols-2 gap-3">
                      {sol.tiles.map((tile, ti) => {
                        const TIcon = tile.icon;
                        return (
                          <motion.div key={tile.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * ti, duration: 0.28 }}
                            className="rounded-2xl p-5 flex flex-col gap-3 border border-white shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: tile.bg }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: tile.color + '18' }}>
                              <TIcon size={20} style={{ color: tile.color }} />
                            </div>
                            <div>
                              <div className="font-heading font-bold text-gray-900 leading-none"
                                style={{ fontSize: '1.65rem' }}>{tile.stat}</div>
                              <div className="text-xs font-medium text-gray-400 mt-1">{tile.label}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Manage: theme strip */}
                    {sol.id === 'manage' && sol.themes && (
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">Available Themes</div>
                        <div className="grid grid-cols-4 gap-2">
                          {sol.themes.map(t => (
                            <div key={t.name} className="rounded-xl p-3 bg-white border border-gray-100 hover:shadow-sm transition-shadow cursor-default">
                              <div className="w-6 h-1 rounded-full mb-2.5" style={{ backgroundColor: t.accent }} />
                              <div className="space-y-1.5">
                                <div className="h-1 rounded bg-gray-200 w-full" />
                                <div className="h-1 rounded bg-gray-200 w-2/3" />
                              </div>
                              <div className="text-[9px] font-bold mt-2.5" style={{ color: t.accent }}>{t.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learn: animation format chips */}
                    {sol.id === 'learn' && sol.animStyles && (
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">Animation Formats We Produce</div>
                        <div className="grid grid-cols-4 gap-2">
                          {sol.animStyles.map(s => (
                            <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-3 text-center hover:shadow-sm transition-shadow cursor-default">
                              <div className="text-2xl mb-1.5">{s.icon}</div>
                              <div className="text-[9px] font-semibold text-gray-400">{s.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Teach / Marketing: outcome bullets card */}
                    {(sol.id === 'teach' || sol.id === 'marketing') && (
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">What changes for you</div>
                        <div className="space-y-2.5">
                          {sol.id === 'teach' && [
                            ['📅', 'Lesson plans done in 15 min, not 2 hours'],
                            ['🔔', 'Automatic alerts for students falling behind'],
                            ['🗂️', 'Every resource organised, searchable, sharable'],
                          ].map(([icon, text]) => (
                            <div key={String(text)} className="flex items-start gap-2.5">
                              <span className="text-base flex-shrink-0 leading-snug">{icon}</span>
                              <span className="text-xs text-gray-500 leading-snug">{text}</span>
                            </div>
                          ))}
                          {sol.id === 'marketing' && [
                            ['📱', 'Websites that rank on Google AND convert visitors'],
                            ['📊', 'Monthly reports showing exactly what is working'],
                            ['🎯', 'Admission funnels that turn clicks into enrollments'],
                          ].map(([icon, text]) => (
                            <div key={String(text)} className="flex items-start gap-2.5">
                              <span className="text-base flex-shrink-0 leading-snug">{icon}</span>
                              <span className="text-xs text-gray-500 leading-snug">{text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                {/* Feature Image Mockup */}
                <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, label: 'K-12 Schools', color: 'bg-purple-100 text-purple-600' },
                      { icon: Award, label: 'Islamic Schools', color: 'bg-emerald-100 text-emerald-600' },
                      { icon: Globe, label: 'International', color: 'bg-blue-100 text-blue-600' },
                      { icon: Users, label: 'Colleges & NGOs', color: 'bg-orange-100 text-orange-600' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex flex-col items-center p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
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
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-[100px]" />
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
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
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
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                custom={i}
                className="card-white group text-center cursor-pointer"
              >
                <div className="icon-box mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
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

              <motion.div variants={fadeUp} custom={3} className="space-y-4">
                {[
                  'Full LMS demo with your curriculum',
                  'ERP system walkthrough',
                  'Animated content preview',
                  'Custom pricing based on your needs',
                  'Implementation timeline review',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
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
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} className="card-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                    <p className="text-xs text-primary font-medium">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  className="faq-item py-5"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <span className="flex-shrink-0">
                      {openFaq === i ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 text-sm leading-relaxed pt-3">{faq.a}</p>
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
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
          >
            {partners.map((name, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                custom={i}
                className="text-gray-300 font-heading font-bold text-lg md:text-xl hover:text-primary transition-colors cursor-default"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ JOIN CTA SECTION ═══════════ */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/15 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full filter blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
            >
              Join Our <span className="gradient-text">760+</span> Happy Institutions
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Transform your school with cutting-edge technology. Start your digital journey today and see
              results within weeks, not months.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
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
