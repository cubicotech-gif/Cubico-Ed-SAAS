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
    id: 'manage',
    name: 'Cubico Manage™',
    tagline: 'Your entire institution. One intelligent system.',
    icon: Layout,
    painPoint: 'Still running your school on Excel sheets and WhatsApp groups?',
    metric: '47 hrs',
    metricLabel: 'saved per staff member, per month',
    bgTint: 'rgba(108,58,237,0.07)',
    activeTabBg: '#F3F0FF',
    activeTabBorder: '#6C3AED',
    accentHex: '#6C3AED',
    accentLight: '#EDE9FE',
    accentColor: 'text-purple-600',
    accentBg: 'bg-purple-600',
    demoUrl: 'demo.cubico.tech/manage',
    proofBadges: [
      { stat: '47 hrs', label: 'saved / staff / month', emoji: '⏱️', pos: '-top-6 -left-4' },
      { stat: 'Live in', label: '4 weeks flat', emoji: '🚀', pos: 'top-1/3 -right-6' },
      { stat: '₨0', label: 'paper fee receipts', emoji: '📵', pos: '-bottom-4 left-8' },
    ],
    features: [
      { icon: Users, title: 'Enrollment & Admissions', desc: 'Full student lifecycle from inquiry to graduation.' },
      { icon: BarChart3, title: 'Fee & Finance', desc: 'Invoices, payments, and overdue alerts — automated.' },
      { icon: PieChart, title: 'Attendance & Exams', desc: 'Smart attendance, gradebooks, and exam scheduling.' },
      { icon: Settings, title: 'HR & Timetable', desc: 'Staff records, payroll, and auto-generated schedules.' },
    ],
    themes: [
      { name: 'Eclipse Dark', bg: '#0F0F23', accent: '#7C3AED', label: 'Enterprise' },
      { name: 'Horizon Light', bg: '#F8FAFC', accent: '#3B82F6', label: 'Classic' },
      { name: 'Campus Fresh', bg: '#F0FDF4', accent: '#10B981', label: 'School' },
      { name: 'Al-Arabiya RTL', bg: '#FFFBEB', accent: '#F59E0B', label: 'Arabic RTL' },
    ],
  },
  {
    id: 'teach',
    name: 'Cubico Teach™',
    tagline: 'Everything a teacher needs. Nothing they don\'t.',
    icon: BookOpen,
    painPoint: 'Teachers spending Sunday nights building lesson plans from scratch?',
    metric: '2×',
    metricLabel: 'faster lesson planning from day one',
    bgTint: 'rgba(6,182,212,0.07)',
    activeTabBg: '#F0FEFF',
    activeTabBorder: '#0891B2',
    accentHex: '#0891B2',
    accentLight: '#CFFAFE',
    accentColor: 'text-cyan-700',
    accentBg: 'bg-cyan-600',
    demoUrl: 'demo.cubico.tech/teach',
    proofBadges: [
      { stat: '2×', label: 'faster lesson planning', emoji: '⚡', pos: '-top-6 right-8' },
      { stat: '100%', label: 'curriculum covered', emoji: '✅', pos: 'top-1/4 -left-6' },
      { stat: 'Zero', label: 'missed at-risk students', emoji: '🎯', pos: '-bottom-4 right-10' },
    ],
    features: [
      { icon: Lightbulb, title: 'Lesson Plan Builder', desc: 'Drag-and-drop blocks aligned to national curriculum.' },
      { icon: Target, title: 'Curriculum Mapping', desc: 'Visual scope & sequence across subjects and grades.' },
      { icon: BarChart3, title: 'Class Analytics', desc: 'Per-student progress with automatic at-risk flags.' },
      { icon: Cloud, title: 'Resource Library', desc: 'Upload, tag, and share materials across departments.' },
    ],
  },
  {
    id: 'learn',
    name: 'Cubico Learn™',
    tagline: 'Textbooks come alive.',
    icon: Film,
    painPoint: 'Students zoning out 8 minutes into a 40-minute lecture?',
    metric: '4×',
    metricLabel: 'higher engagement vs. traditional textbooks',
    bgTint: 'rgba(244,63,94,0.06)',
    activeTabBg: '#FFF1F2',
    activeTabBorder: '#E11D48',
    accentHex: '#E11D48',
    accentLight: '#FFE4E6',
    accentColor: 'text-rose-600',
    accentBg: 'bg-rose-600',
    demoUrl: 'demo.cubico.tech/learn',
    proofBadges: [
      { stat: '4×', label: 'higher engagement', emoji: '🔥', pos: '-top-6 left-8' },
      { stat: '3', label: 'languages: EN · AR · UR', emoji: '🌍', pos: 'top-1/3 -right-6' },
      { stat: '94%', label: 'lesson completion rate', emoji: '🏆', pos: '-bottom-4 right-12' },
    ],
    features: [
      { icon: Film, title: '2D & 3D Animation', desc: 'Character-led animated lessons, any subject.' },
      { icon: Monitor, title: 'Interactive Simulations', desc: 'STEM labs students can actually manipulate.' },
      { icon: Globe, title: 'English · Arabic · Urdu', desc: 'Full narration and RTL support built in.' },
      { icon: Zap, title: 'Adaptive Quizzes', desc: 'End-of-lesson assessments that self-adjust.' },
    ],
    animStyles: [
      { label: '2D Character', icon: '🎭' },
      { label: '3D Model', icon: '🧊' },
      { label: 'Whiteboard', icon: '✏️' },
      { label: 'Motion GFX', icon: '✨' },
    ],
  },
  {
    id: 'marketing',
    name: 'Cubico Marketing™',
    tagline: 'Fill every seat. Every semester.',
    icon: Megaphone,
    painPoint: 'Your school is incredible. Nobody outside your city knows it exists.',
    metric: '+34%',
    metricLabel: 'average increase in admission enquiries',
    bgTint: 'rgba(5,150,105,0.06)',
    activeTabBg: '#F0FDF4',
    activeTabBorder: '#059669',
    accentHex: '#059669',
    accentLight: '#D1FAE5',
    accentColor: 'text-emerald-700',
    accentBg: 'bg-emerald-600',
    demoUrl: 'demo.cubico.tech/marketing',
    proofBadges: [
      { stat: '+34%', label: 'more admission enquiries', emoji: '📈', pos: '-top-6 right-6' },
      { stat: '3 wks', label: 'website live from brief', emoji: '⚡', pos: 'top-1/4 -left-6' },
      { stat: '22%', label: 'higher conversion rate', emoji: '🎯', pos: '-bottom-4 left-12' },
    ],
    features: [
      { icon: Globe, title: 'Premium School Websites', desc: 'Conversion-focused, mobile-first, and beautiful.' },
      { icon: TrendingUp, title: 'Enrollment Funnels', desc: 'Google Ads, landing pages, and retargeting.' },
      { icon: Megaphone, title: 'Social Media Management', desc: 'Content, campaigns, and brand voice.' },
      { icon: Shield, title: 'SEO & Monthly Reports', desc: 'Search visibility that compounds over time.' },
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
      <section id="showcase" className="relative overflow-hidden bg-[#F7F6FF]">
        {/* Per-solution color flood — transitions behind everything */}
        <AnimatePresence mode="wait">
          <motion.div
            key={solutions[activeSolution].id + '-bg'}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ background: solutions[activeSolution].bgTint }}
          />
        </AnimatePresence>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        {/* TOP HALF — cream/light, editorial header */}
        <div className="relative pt-20 pb-0 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
                style={{ color: solutions[activeSolution].accentHex, borderColor: solutions[activeSolution].accentHex + '33', backgroundColor: solutions[activeSolution].accentHex + '0D' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: solutions[activeSolution].accentHex }} />
                The Cubico Ecosystem
              </span>
            </motion.div>

            {/* Main headline — gut punch */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-[3.75rem] font-heading font-bold text-gray-900 leading-[1.06] tracking-[-0.025em] mb-5"
            >
              Stop duct-taping<br />
              your school together.
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-lg max-w-lg leading-relaxed mb-14">
              One partner. Four purpose-built products. Zero integration headaches. <span className="text-gray-800 font-medium">Built for institutions like yours.</span>
            </motion.p>
          </motion.div>

          {/* ── OVERSIZED TAB SELECTOR ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          >
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              const isActive = activeSolution === i;
              return (
                <button
                  key={sol.id}
                  onClick={() => { hasInteracted.current = true; setActiveSolution(i); }}
                  className="relative text-left rounded-2xl p-5 border-2 transition-all duration-300 overflow-hidden group"
                  style={isActive ? {
                    backgroundColor: sol.activeTabBg,
                    borderColor: sol.activeTabBorder,
                    boxShadow: `0 8px 32px ${sol.accentHex}22`,
                  } : {
                    backgroundColor: '#ffffff',
                    borderColor: '#E5E7EB',
                  }}
                >
                  {/* Active left stripe */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: sol.accentHex }} />
                  )}

                  {/* Icon */}
                  <div className="mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isActive ? sol.accentHex + '18' : '#F3F4F6' }}>
                      <Icon size={17} style={{ color: isActive ? sol.accentHex : '#9CA3AF' }} />
                    </div>
                  </div>

                  {/* Solution name */}
                  <div className="text-sm font-bold mb-1" style={{ color: isActive ? sol.accentHex : '#374151' }}>
                    {sol.name}
                  </div>

                  {/* BIG metric */}
                  <div className="font-heading font-bold leading-none mb-0.5"
                    style={{ fontSize: '2rem', color: isActive ? sol.accentHex : '#D1D5DB' }}>
                    {sol.metric}
                  </div>
                  <div className="text-[10px] leading-snug" style={{ color: isActive ? '#6B7280' : '#D1D5DB' }}>
                    {sol.metricLabel}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── DEMO STAGE — dark band ── */}
        <div className="bg-[#0A0A1A] relative overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          {/* Glow from active solution */}
          <AnimatePresence mode="wait">
            <motion.div
              key={solutions[activeSolution].id + '-glow'}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[160px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ backgroundColor: solutions[activeSolution].accentHex + '14' }}
            />
          </AnimatePresence>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
            {/* Pain point line — changes per active tab */}
            <AnimatePresence mode="wait">
              <motion.p
                key={solutions[activeSolution].id + '-pain'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-sm italic text-white/35 text-center mb-8"
              >
                &ldquo;{solutions[activeSolution].painPoint}&rdquo;
              </motion.p>
            </AnimatePresence>

            {/* Browser + 3D mockup wrapper */}
            <AnimatePresence mode="wait">
              {solutions.map((sol, i) =>
                activeSolution === i ? (
                  <motion.div
                    key={sol.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                  >
                    {/* Floating proof badges */}
                    {sol.proofBadges.map((badge, bi) => (
                      <motion.div
                        key={bi}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + bi * 0.15, duration: 0.4 }}
                        className={`absolute ${badge.pos} z-20 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl`}
                        style={{ backgroundColor: 'rgba(13,13,43,0.9)' }}
                      >
                        <motion.span
                          animate={{ y: [0, bi % 2 === 0 ? -5 : 5, 0] }}
                          transition={{ duration: 3 + bi, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-lg leading-none"
                        >
                          {badge.emoji}
                        </motion.span>
                        <div>
                          <div className="font-heading font-bold text-sm leading-none" style={{ color: sol.accentHex }}>
                            {badge.stat}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5">{badge.label}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* 3D-tilted browser chrome */}
                    <div style={{ perspective: '1400px' }}>
                      <div
                        className="rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
                        style={{
                          transform: 'rotateX(5deg) rotateY(-1.5deg) scale(0.97)',
                          transformOrigin: 'center top',
                          border: `1px solid ${sol.accentHex}33`,
                        }}
                      >
                        {/* Browser chrome bar */}
                        <div className="bg-[#1A1A2E] px-5 py-3.5 flex items-center gap-4 border-b border-white/[0.05]">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                          </div>
                          <div className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-1.5 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sol.accentHex + '80' }} />
                            <span className="text-[11px] font-mono text-white/35">{sol.demoUrl}</span>
                            <span className="ml-auto text-[10px] text-white/20">🔒</span>
                          </div>
                        </div>

                        {/* Mockup body */}
                        <div className="bg-[#0D0D2B] p-5 lg:p-7">

                          {/* ── MANAGE ── */}
                          {sol.id === 'manage' && (
                            <div className="grid lg:grid-cols-[200px_1fr] gap-4">
                              <div className="hidden lg:block bg-[#080818] rounded-xl p-3 space-y-0.5">
                                <div className="text-[9px] text-white/20 uppercase tracking-widest px-3 py-2 font-bold">Navigation</div>
                                {['Dashboard', 'Students', 'Courses', 'Attendance', 'Fee Management', 'Timetable', 'HR & Staff', 'Reports'].map((item, idx) => (
                                  <div key={item}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] cursor-default"
                                    style={idx === 0 ? {
                                      backgroundColor: sol.accentHex + '20',
                                      color: sol.accentHex,
                                      border: `1px solid ${sol.accentHex}25`,
                                    } : { color: 'rgba(255,255,255,0.35)' }}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: idx === 0 ? sol.accentHex : 'rgba(255,255,255,0.15)' }} />
                                    {item}
                                  </div>
                                ))}
                              </div>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                                  {[
                                    { label: 'Total Students', value: '2,847', trend: '+12%', hex: '#7C3AED' },
                                    { label: 'Fee Collected', value: '₨4.2M', trend: '+8%', hex: '#10B981' },
                                    { label: 'Attendance', value: '94.3%', trend: '+2%', hex: '#06B6D4' },
                                    { label: 'Active Courses', value: '186', trend: '+5', hex: '#F59E0B' },
                                  ].map((kpi) => (
                                    <div key={kpi.label} className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-3.5">
                                      <div className="text-[9px] text-white/25 mb-1">{kpi.label}</div>
                                      <div className="text-base font-heading font-bold" style={{ color: kpi.hex }}>{kpi.value}</div>
                                      <div className="text-[9px] text-emerald-400 mt-0.5">{kpi.trend} ↑</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid md:grid-cols-[1fr_160px] gap-2.5">
                                  <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                    <div className="flex justify-between mb-3">
                                      <span className="text-[11px] font-semibold text-white/60">Week Attendance</span>
                                      <span className="text-[10px] text-emerald-400">● Live</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                      {[['Mon',92],['Tue',88],['Wed',95],['Thu',91],['Fri',86]].map(([d,v]) => (
                                        <div key={d as string} className="text-center">
                                          <div className="text-[8px] text-white/25 mb-1.5">{d}</div>
                                          <div className="w-full aspect-square rounded-lg flex items-center justify-center text-[9px] font-bold"
                                            style={{ backgroundColor: (v as number) > 90 ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.2)', color: (v as number) > 90 ? '#34D399' : '#FBB740' }}>
                                            {v}%
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                    <div className="text-[11px] font-semibold text-white/60 mb-3">Upcoming</div>
                                    {[['Mid-Term','Mar 18','#7C3AED'],['Fee Due','Mar 20','#F59E0B'],['Staff Mtg','Mar 22','#06B6D4']].map(([l,d,c]) => (
                                      <div key={l as string} className="flex gap-2 mb-2 last:mb-0 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: c as string }} />
                                        <div><div className="text-[10px] text-white/55">{l}</div><div className="text-[9px] text-white/25">{d}</div></div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                  <div className="text-[11px] font-semibold text-white/60 mb-2.5">Recent Enrollments</div>
                                  {[['Aisha Rahman','Grade 7','Paid'],['Omar Khalid','Grade 9','Pending'],['Sara Ahmed','Grade 5','Paid']].map(([n,g,f]) => (
                                    <div key={n as string} className="grid grid-cols-4 gap-2 text-[10px] py-1.5 border-b border-white/[0.04] last:border-0">
                                      <span className="text-white/65 font-medium col-span-2 truncate">{n}</span>
                                      <span className="text-white/35">{g}</span>
                                      <span style={{ color: f === 'Paid' ? '#34D399' : '#FBB740' }}>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ── TEACH ── */}
                          {sol.id === 'teach' && (
                            <div className="grid lg:grid-cols-[1fr_185px] gap-4">
                              <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-[11px] font-bold text-white/60">Lesson Plan — Photosynthesis · Ch.4</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-md text-cyan-400" style={{ backgroundColor: '#0891B220' }}>Grade 8 Biology</span>
                                  </div>
                                  {[
                                    ['🎯','Learning Objective','border-cyan-500/30 bg-cyan-500/5','Students will explain light-dependent reactions of photosynthesis.'],
                                    ['⚡','Starter Activity','border-blue-500/30 bg-blue-500/5','Quick-fire quiz: 5 questions from previous lesson (5 mins)'],
                                    ['📖','Main Teaching','border-purple-500/30 bg-purple-500/5','Animated explainer video + diagram labelling worksheet'],
                                    ['✅','Assessment','border-emerald-500/30 bg-emerald-500/5','Exit ticket: 3-question diagnostic via Google Forms'],
                                  ].map(([icon,label,cls,text]) => (
                                    <div key={label as string} className={`flex gap-3 p-3 rounded-lg border mb-2 last:mb-0 ${cls}`}>
                                      <span className="text-sm mt-0.5 flex-shrink-0">{icon}</span>
                                      <div><div className="text-[9px] font-bold text-white/35 uppercase tracking-wider mb-0.5">{label}</div>
                                        <div className="text-[10px] text-white/55 leading-snug">{text}</div></div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                  <div className="flex justify-between mb-2.5">
                                    <span className="text-[11px] font-semibold text-white/60">Grade Distribution — Class 8B</span>
                                    <span className="text-[10px] text-emerald-400">Avg 76.4%</span>
                                  </div>
                                  <div className="flex items-end gap-1.5 h-14">
                                    {[30,55,75,85,70,60,45,80,90,65].map((h, idx) => (
                                      <motion.div key={idx} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.4, delay: 0.04 * idx, ease: 'easeOut' }}
                                        className="flex-1 rounded-t-sm"
                                        style={{ backgroundColor: h >= 80 ? '#10B98155' : h >= 60 ? '#06B6D455' : '#3B82F640' }} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                  <div className="text-[11px] font-semibold text-white/60 mb-3">Today&apos;s Schedule</div>
                                  {[['08:00','Biology','8B','#06B6D4'],['09:30','Science','7A','#7C3AED'],['11:00','Biology','9C','#06B6D4'],['14:00','Lab','8B','#10B981']].map(([t,s,g,c]) => (
                                    <div key={t as string} className="pl-3 mb-2.5 last:mb-0 border-l-2" style={{ borderColor: c as string }}>
                                      <div className="text-[8px] text-white/25">{t}</div>
                                      <div className="text-[11px] text-white/65 font-medium">{s}</div>
                                      <div className="text-[8px] text-white/25">{g}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                  <div className="text-[11px] font-semibold text-white/60 mb-2.5">Resources</div>
                                  {['Photosynthesis.pdf','Lab_Safety.pptx','Cell_Div.mp4'].map(f => (
                                    <div key={f} className="flex gap-2 mb-2 last:mb-0 items-center">
                                      <div className="w-6 h-6 rounded bg-white/[0.06] flex items-center justify-center text-[9px]">📄</div>
                                      <div className="text-[10px] text-white/40 truncate">{f}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ── LEARN ── */}
                          {sol.id === 'learn' && (
                            <div className="grid lg:grid-cols-[1fr_200px] gap-4">
                              <div className="space-y-3">
                                <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                                  <div className="relative bg-gradient-to-br from-rose-900/50 via-orange-900/30 to-purple-900/40 aspect-video flex items-center justify-center">
                                    <div className="text-center z-10 relative">
                                      <div className="text-5xl mb-2">🧬</div>
                                      <div className="text-white/70 text-sm font-semibold">Chapter 3: DNA Replication</div>
                                      <div className="text-white/30 text-xs mt-1">3D Animated Lesson · 8:42</div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center cursor-default">
                                        <Play size={16} className="text-white ml-1" />
                                      </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-white/40">3:24</span>
                                        <div className="flex-1 h-1 bg-white/10 rounded-full">
                                          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400" />
                                        </div>
                                        <span className="text-[9px] text-white/40">8:42</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-[#080818] px-4 py-2.5 flex justify-between items-center">
                                    <span className="text-[10px] text-white/30">Grade 10 · Biology</span>
                                    <div className="flex gap-3">
                                      {['Quiz','Notes','Next →'].map(b => <button key={b} className="text-[10px] text-white/35 hover:text-rose-400 cursor-default">{b}</button>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                  {sol.animStyles?.map(s => (
                                    <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-center hover:bg-white/[0.07] hover:scale-[1.04] transition-all cursor-default">
                                      <div className="text-2xl mb-1">{s.icon}</div>
                                      <div className="text-[9px] text-white/40 font-medium">{s.label}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white/[0.04] border border-rose-500/20 rounded-xl p-4">
                                  <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2">📝 Checkpoint Quiz</div>
                                  <div className="text-xs text-white/55 mb-3">Which enzyme unzips the DNA helix during replication?</div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {['Helicase','Polymerase','Ligase','Primase'].map((o,oi) => (
                                      <div key={o} className="text-[10px] px-3 py-2 rounded-lg border cursor-default"
                                        style={oi === 0 ? { backgroundColor:'rgba(16,185,129,0.15)',borderColor:'rgba(16,185,129,0.35)',color:'#34D399' } : { borderColor:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.3)' }}>
                                        {o}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4">
                                <div className="text-[11px] font-bold text-white/60 mb-3">Biology — Grade 10</div>
                                {[['Ch 1','Cell Structure',true,false],['Ch 2','Cell Division',true,false],['Ch 3','DNA Replication',false,true],['Ch 4','Protein Synthesis',false,false],['Ch 5','Genetics',false,false],['Ch 6','Evolution',false,false]].map(([ch,t,done,active]) => (
                                  <div key={ch as string} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg mb-0.5 text-[10px]"
                                    style={active ? { backgroundColor:`${sol.accentHex}18`,border:`1px solid ${sol.accentHex}30`,color:sol.accentHex } : { color: done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)' }}>
                                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px]"
                                      style={{ backgroundColor: done ? 'rgba(16,185,129,0.2)' : active ? `${sol.accentHex}25` : 'rgba(255,255,255,0.06)', color: done ? '#34D399' : active ? sol.accentHex : 'rgba(255,255,255,0.2)' }}>
                                      {done ? '✓' : active ? '▶' : '○'}
                                    </span>
                                    <span className="font-medium">{ch}</span>
                                    <span className="truncate opacity-70">{t}</span>
                                  </div>
                                ))}
                                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                                  <div className="text-[9px] text-white/25 mb-1.5">Progress</div>
                                  <div className="h-1.5 rounded-full bg-white/10">
                                    <div className="h-full w-2/6 rounded-full bg-gradient-to-r from-rose-500 to-orange-400" />
                                  </div>
                                  <div className="text-[9px] text-white/30 mt-1">2 of 6 complete</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ── MARKETING ── */}
                          {sol.id === 'marketing' && (
                            <div className="space-y-4">
                              <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                                <div className="relative px-7 py-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #0D9488 100%)' }}>
                                  <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                                  <div className="relative">
                                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-300 mb-2">Al-Noor Academy · Est. 1998</div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">Where Knowledge Meets Excellence</h3>
                                    <p className="text-emerald-100/70 text-xs mb-4 leading-relaxed max-w-xs">Preparing students for a global future — KG to Grade 12, in the heart of the community.</p>
                                    <div className="flex gap-2.5">
                                      <div className="bg-white text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full cursor-default">Apply Now →</div>
                                      <div className="border border-white/30 text-white text-xs px-4 py-1.5 rounded-full cursor-default">Virtual Tour</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 bg-white border-b border-gray-100">
                                  {[['760+','Students'],['48','Teachers'],['98%','Pass Rate'],['25yr','Excellence']].map(([v,l]) => (
                                    <div key={l as string} className="text-center py-2.5 border-r border-gray-100 last:border-0">
                                      <div className="text-sm font-heading font-bold text-gray-800">{v}</div>
                                      <div className="text-[9px] text-gray-400">{l}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-gray-50 px-5 py-3.5">
                                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Programs</div>
                                  <div className="flex flex-wrap gap-2">
                                    {['KG & Primary','Middle School','O-Level','A-Level','Hifz Program'].map(p => (
                                      <div key={p} className="text-[10px] text-gray-500 bg-white rounded-lg px-3 py-1.5 border border-gray-100">{p}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="grid md:grid-cols-3 gap-3">
                                {[
                                  { label: 'Monthly Visits', value: '12,480', change: '+34%', emoji: '👁️', hex: '#059669' },
                                  { label: 'Form Submissions', value: '284', change: '+18%', emoji: '📩', hex: '#0891B2' },
                                  { label: 'Admission Rate', value: '22.4%', change: '+5%', emoji: '🎯', hex: '#0D9488' },
                                ].map(m => (
                                  <div key={m.label} className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-4 flex justify-between items-start">
                                    <div>
                                      <div className="text-[9px] text-white/25 mb-1">{m.label}</div>
                                      <div className="text-lg font-heading font-bold" style={{ color: m.hex }}>{m.value}</div>
                                      <div className="text-[9px] text-emerald-400 mt-0.5">{m.change} ↑</div>
                                    </div>
                                    <span className="text-xl">{m.emoji}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Footer row */}
                          <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <div className="text-xs font-bold mb-0.5" style={{ color: sol.accentHex }}>{sol.name}</div>
                              <div className="text-[11px] text-white/30 italic">{sol.tagline}</div>
                            </div>
                            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
                              style={{ backgroundColor: sol.accentHex }}>
                              Book a Live Demo
                              <ArrowRight size={15} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Manage theme strip */}
                    {sol.id === 'manage' && (
                      <div className="mt-6">
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] text-center mb-3">Available Theme Variations</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {sol.themes?.map(theme => (
                            <div key={theme.name}
                              className="rounded-xl p-4 border border-white/[0.07] hover:scale-[1.03] hover:border-white/20 transition-all cursor-default"
                              style={{ backgroundColor: theme.bg }}>
                              <div className="w-8 h-1.5 rounded-full mb-2.5" style={{ backgroundColor: theme.accent }} />
                              <div className="space-y-1.5 mb-3 opacity-30">
                                <div className="h-1.5 bg-current rounded w-3/4" />
                                <div className="h-1.5 bg-current rounded w-1/2" />
                                <div className="h-1.5 bg-current rounded w-5/6" />
                              </div>
                              <div className="text-[10px] font-bold" style={{ color: theme.accent === '#080818' ? 'white' : theme.bg === '#F8FAFC' ? '#374151' : '#374151', opacity: 0.8 }}>{theme.name}</div>
                              <div className="text-[9px] font-semibold mt-0.5" style={{ color: theme.accent }}>{theme.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feature highlights */}
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {sol.features.map((feat, fi) => {
                        const FIcon = feat.icon;
                        return (
                          <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * fi, duration: 0.3 }}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.06] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: sol.accentHex + '18' }}>
                              <FIcon size={14} style={{ color: sol.accentHex }} />
                            </div>
                            <div className="text-xs font-bold text-white/75 mb-1">{feat.title}</div>
                            <div className="text-[10px] text-white/30 leading-snug">{feat.desc}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom spacer to blend into next section */}
        <div className="h-16 bg-[#0A0A1A]" />
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
