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
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* ── Layer 1: Full-Width Unsplash Photo ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />

        {/* ── Layer 2: Cinematic Dark Gradient Overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(108deg,
              rgba(10, 10, 26, 0.95) 0%,
              rgba(10, 10, 26, 0.90) 30%,
              rgba(10, 10, 26, 0.78) 55%,
              rgba(10, 10, 26, 0.60) 75%,
              rgba(10, 10, 26, 0.72) 100%
            )`,
          }}
        />

        {/* ── Layer 3a: Warm Sepia Tint (Left — Chalk World) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg,
              rgba(139, 115, 85, 0.08) 0%,
              rgba(139, 115, 85, 0.04) 40%,
              transparent 55%
            )`,
          }}
        />

        {/* ── Layer 3b: Cool Purple/Cyan Tint (Right — Digital World) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg,
              transparent 45%,
              rgba(108, 58, 237, 0.06) 60%,
              rgba(0, 212, 255, 0.05) 80%,
              rgba(0, 212, 255, 0.08) 100%
            )`,
          }}
        />

        {/* ── Layer 4: Diagonal Transition Line (The "Split") ── */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(105deg,
              transparent 48%,
              rgba(108, 58, 237, 0.12) 49.5%,
              rgba(139, 92, 246, 0.08) 50%,
              rgba(0, 212, 255, 0.06) 50.5%,
              transparent 52%
            )`,
          }}
        />

        {/* ── Layer 5: Chalk-to-Digital Particles ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          {/* Left particles (chalk = warm, square-ish) */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-amber-200/30 rounded-[1px]"
            style={{ left: '46%', top: '85%' }}
            animate={{ y: [0, -750], opacity: [0, 0.6, 0.4, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-amber-200/30 rounded-[1px]"
            style={{ left: '47%', top: '92%' }}
            animate={{ y: [0, -700], opacity: [0, 0.6, 0.4, 0] }}
            transition={{ duration: 14, repeat: Infinity, delay: 3 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-amber-200/30 rounded-[1px]"
            style={{ left: '48%', top: '100%' }}
            animate={{ y: [0, -800], opacity: [0, 0.6, 0.4, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 6 }}
          />

          {/* Center particles (morphing = purple, transitional) */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full"
            style={{ left: '50%', top: '88%' }}
            animate={{ y: [0, -700], opacity: [0, 0.7, 0.4, 0], scale: [1, 1.2, 0.8] }}
            transition={{ duration: 11, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full"
            style={{ left: '51%', top: '95%' }}
            animate={{ y: [0, -650], opacity: [0, 0.7, 0.4, 0], scale: [1, 1.2, 0.8] }}
            transition={{ duration: 9, repeat: Infinity, delay: 4 }}
          />

          {/* Right particles (digital = cool, perfectly round) */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
            style={{ left: '52%', top: '82%' }}
            animate={{ y: [0, -600], opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: 13, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
            style={{ left: '53%', top: '90%' }}
            animate={{ y: [0, -550], opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 5 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
            style={{ left: '54%', top: '98%' }}
            animate={{ y: [0, -700], opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: 11, repeat: Infinity, delay: 7 }}
          />
        </div>

        {/* ── Layer 6: Top Glow ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.08] rounded-full blur-[120px] pointer-events-none" />

        {/* ── Layer 7: Bottom Vignette ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(10, 10, 26, 1))' }}
        />

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32 lg:py-40">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* 1. Trust Badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-7">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm text-sm font-medium text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Trusted by 760+ Institutions in 3 Countries
                </span>
              </motion.div>

              {/* 2. Headline (Line-by-Line Stagger) */}
              <div className="mb-7">
                <motion.div variants={fadeUp} custom={1} className="overflow-hidden">
                  <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold text-white leading-[1.05] tracking-[-0.02em]">
                    From Chalk
                  </h1>
                </motion.div>
                <motion.div variants={fadeUp} custom={1.5} className="overflow-hidden">
                  <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold text-white leading-[1.05] tracking-[-0.02em]">
                    and Board to
                  </h1>
                </motion.div>
                <motion.div variants={fadeUp} custom={2} className="overflow-hidden">
                  <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold leading-[1.05] tracking-[-0.02em]">
                    <span className="gradient-text">World-Class.</span>
                  </h1>
                </motion.div>
              </div>

              {/* 3. Sub-headline */}
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-10"
              >
                The complete EdTech ecosystem that transforms schools across Pakistan, Saudi Arabia & Canada — from LMS and animated lessons to ERP and digital infrastructure.
              </motion.p>

              {/* 4. CTA Buttons */}
              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4 mb-10">
                <a href="#contact" className="btn-primary text-base px-8 py-4">
                  Book Free Demo
                  <ArrowRight size={18} />
                </a>
                <a href="#about" className="btn-outline-white text-base px-7 py-4">
                  <Play size={18} />
                  Watch the Story
                </a>
              </motion.div>

              {/* 5. Before/After Photo Pair + Trust Indicators */}
              <motion.div variants={fadeUp} custom={5} className="flex items-center gap-5 flex-wrap">
                {/* Group A — Before/After Photos */}
                <div className="flex items-center gap-3">
                  {/* Before Photo */}
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&q=80"
                      alt="Traditional chalkboard teaching"
                      className="w-full h-full object-cover grayscale sepia brightness-75"
                    />
                  </div>

                  {/* Arrow Between */}
                  <div className="flex flex-col items-center">
                    <ArrowRight size={16} className="text-primary-light" />
                    <span className="text-[9px] text-white/30">4 weeks</span>
                  </div>

                  {/* After Photo */}
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-cyan-400/30 ring-2 ring-cyan-400/10 ring-offset-2 ring-offset-transparent">
                    <img
                      src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80"
                      alt="Student engaged with digital learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Group B — Vertical Divider */}
                <div className="w-px h-8 bg-white/10 hidden sm:block" />

                {/* Group C — Flags + Rating */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-sm text-white/40">
                    <span>🇵🇰</span>
                    <span>🇸🇦</span>
                    <span>🇨🇦</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-white/40">5/5 by clients</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column — Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block relative"
            >
              {/* Main Dashboard Card */}
              <div className="relative rounded-2xl p-6 bg-[rgba(13,13,43,0.75)] backdrop-blur-xl border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(108,58,237,0.12)]">
                {/* Browser Chrome Bar */}
                <div className="bg-dark-700/80 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="bg-dark-800/60 rounded-md px-3 py-1 flex-1">
                      <span className="text-[10px] text-gray-500 font-mono">cubico-lms.edu/dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-gray-200">Student Engagement</span>
                    <span className="text-xs font-bold text-emerald-400">+24%</span>
                  </div>
                  <div className="flex items-end gap-[5px] h-24">
                    {[35, 55, 40, 70, 50, 80, 60, 75, 55, 85, 65, 78, 58, 92].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.9 + i * 0.04, ease: 'easeOut' }}
                        className={`flex-1 rounded-t-sm ${
                          i >= 12
                            ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                            : i >= 9
                            ? 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                            : i >= 5
                            ? 'bg-gradient-to-t from-purple-500 to-purple-400'
                            : 'bg-gradient-to-t from-purple-700 to-purple-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-heading font-bold text-cyan-400">2,847</div>
                    <div className="text-[10px] text-gray-500">Active Courses</div>
                  </div>
                  <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-heading font-bold text-emerald-400">94.2%</div>
                    <div className="text-[10px] text-gray-500">Completion Rate</div>
                  </div>
                  <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-heading font-bold text-primary-light">760+</div>
                    <div className="text-[10px] text-gray-500">Schools Active</div>
                  </div>
                </div>
              </div>

              {/* Floating Card #1 — Deployment Success */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute -top-5 -right-4"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-[rgba(13,13,43,0.85)] backdrop-blur-lg border border-emerald-500/15 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400">Deployment</div>
                      <div className="text-sm font-bold text-emerald-400">98% Success</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Card #2 — Client Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="absolute -bottom-4 -left-4"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="bg-[rgba(13,13,43,0.85)] backdrop-blur-lg border border-yellow-500/15 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&q=80"
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">5.0</span>
                      </div>
                      <div className="text-[10px] text-gray-400">Client Satisfaction</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Card #3 — Arabic LMS */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
                className="absolute bottom-16 -right-3"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                  className="bg-[rgba(13,13,43,0.85)] backdrop-blur-lg border border-cyan-400/15 rounded-2xl px-4 py-3"
                >
                  <div className="text-[10px] text-gray-400 mb-1">Arabic LMS</div>
                  <div className="text-cyan-400 text-sm font-semibold" dir="rtl">بسم الله الرحمن الرحيم</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Scroll</span>
            <ChevronDown size={16} className="text-white/20" />
          </motion.div>
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
