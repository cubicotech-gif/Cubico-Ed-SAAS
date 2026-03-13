'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  Play,
  GraduationCap,
  School,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  CheckCircle2,
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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const featureCards = [
  {
    icon: BookOpen,
    title: 'Smart LMS',
    desc: 'Moodle-powered learning management with native Arabic, Urdu & English content delivery for Islamic and mainstream schools.',
  },
  {
    icon: Film,
    title: 'Animated Lessons',
    desc: '2D & 3D animated educational content that brings complex Islamic and academic subjects to life for K-12 students.',
  },
  {
    icon: Monitor,
    title: 'School ERP',
    desc: 'Complete school administration — admissions, finance, HR, attendance, parent portals — all under one roof.',
  },
];

const services = [
  { icon: BarChart3, title: 'LMS Implementation', desc: 'Moodle setup, customization, and full deployment with teacher training and ongoing support.' },
  { icon: Film, title: 'Animation Studio', desc: 'Islamic & academic 2D/3D animated lessons in English, Arabic, and Urdu.' },
  { icon: Monitor, title: 'School ERP System', desc: 'End-to-end school management — admissions, fees, HR, transport, and parent portals.' },
  { icon: Globe, title: 'Web Development', desc: 'Custom school websites, landing pages, and digital presence built with modern frameworks.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'iOS & Android apps for students, parents, and teachers with real-time notifications.' },
  { icon: Cloud, title: 'Cloud Hosting', desc: 'Secure, scalable hosting infrastructure optimized for educational institutions.' },
  { icon: Mail, title: 'Digital Marketing', desc: 'SEO, social media, and lead generation strategies tailored for schools.' },
  { icon: GraduationCap, title: 'Teacher Training', desc: 'Comprehensive onboarding and CPD programs to maximize technology adoption.' },
];

const testimonials = [
  {
    name: 'Dr. Ahmed Al-Rashid',
    role: 'Director, Al-Noor Academy',
    location: 'Riyadh, Saudi Arabia',
    text: 'Cubico transformed our entire school ecosystem. From a paper-based system to a fully digital campus in just 4 weeks. The Arabic LMS content is outstanding.',
    rating: 5,
  },
  {
    name: 'Fatima Hassan',
    role: 'Principal, Iqra Foundation School',
    location: 'Karachi, Pakistan',
    text: 'The animated Islamic studies content has completely changed how our students engage with the curriculum. Enrollment inquiries increased by 40% after our website launch.',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'CEO, Cornwall Islamic Foundation',
    location: 'Ontario, Canada',
    text: 'Having one partner handle everything — LMS, animations, website, and ERP — eliminated all the vendor coordination headaches we had before.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'How quickly can Cubico launch our school platform?',
    a: 'Our average launch time is 4 weeks. This includes LMS setup, school website, ERP configuration, and initial teacher training. Complex multi-campus deployments may take 6-8 weeks.',
  },
  {
    q: 'Do you support Arabic and Urdu content?',
    a: 'Absolutely. Language is identity — we build native content in English, Arabic (العربية), and Urdu (اردو) with full RTL support across all platforms.',
  },
  {
    q: 'Can we use Cubico for just one service, like animations only?',
    a: 'Yes. While our strength is the integrated ecosystem, you can engage us for any individual service — LMS, animation, web development, or ERP — independently.',
  },
  {
    q: 'What makes Cubico different from other EdTech vendors?',
    a: 'We are not a product company. We are an ecosystem partner. Active teachers sit on our team. We combine LMS, animation, ERP, and web under one roof — eliminating vendor juggling.',
  },
  {
    q: 'Which countries do you currently serve?',
    a: 'We are active in Pakistan, Saudi Arabia, and Canada — serving 760+ institutions. Our solutions support multi-timezone and multi-currency operations for international schools.',
  },
];

const stats = [
  { value: 760, suffix: '+', label: 'Institutions Served' },
  { value: 3, suffix: '', label: 'Countries Active' },
  { value: 4, suffix: ' Weeks', label: 'Average Launch' },
  { value: 100, suffix: '%', label: 'Client Retention' },
];

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
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoSubmit = async (e: React.FormEvent) => {
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('newsletter_signups').insert([{ name: newsletterName, email: newsletterEmail }]);
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setNewsletterName('');
    } catch {
      // silent fail for newsletter
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* ═══ HEADER / NAV ═══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/90 backdrop-blur-xl border-b border-primary/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-white font-heading font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-heading font-semibold text-white">
              Cubico<span className="text-primary-light">.tech</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden md:inline-flex btn-primary text-sm">
              Get Started <ArrowRight size={16} />
            </a>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="lg:hidden bg-dark-800/95 backdrop-blur-xl border-t border-primary/10"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white py-2 font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#contact" className="btn-primary text-center mt-2">
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ HERO SECTION ═══ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="hero-orb w-[500px] h-[500px] bg-primary/20 top-[-100px] left-[-200px]" />
        <div className="hero-orb w-[400px] h-[400px] bg-accent/10 bottom-[-100px] right-[-150px]" />
        <div className="absolute inset-0 bg-grid opacity-40" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Trusted by 760+ Institutions Worldwide
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-6"
              >
                From Chalk-and-Board to{' '}
                <span className="gradient-text">World-Class</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl"
              >
                One partner, every solution. We help schools, academies & institutions
                across Pakistan, Saudi Arabia & Canada modernize with integrated LMS,
                animations, ERP & web platforms.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary text-base">
                  Book Free Demo <ArrowRight size={18} />
                </a>
                <a href="#solutions" className="btn-outline text-base">
                  <Play size={18} /> Explore Solutions
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-12 flex items-center gap-8 flex-wrap"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-accent" />
                  <span>Pakistan · Saudi Arabia · Canada</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe size={14} className="text-accent" />
                  <span>EN · AR · UR</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Device Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <div className="glass-card rounded-2xl p-6 glow-purple">
                  <div className="bg-dark-700 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs text-gray-500 ml-2">cubico-lms.edu</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-dark-800 rounded-lg p-3 text-center">
                        <div className="text-2xl font-heading font-bold text-accent">2.4K</div>
                        <div className="text-[10px] text-gray-500 mt-1">Active Students</div>
                      </div>
                      <div className="bg-dark-800 rounded-lg p-3 text-center">
                        <div className="text-2xl font-heading font-bold text-primary-light">148</div>
                        <div className="text-[10px] text-gray-500 mt-1">Courses Live</div>
                      </div>
                      <div className="bg-dark-800 rounded-lg p-3 text-center">
                        <div className="text-2xl font-heading font-bold text-green-400">96%</div>
                        <div className="text-[10px] text-gray-500 mt-1">Completion Rate</div>
                      </div>
                    </div>
                  </div>
                  {/* Mini Chart Bars */}
                  <div className="flex items-end gap-2 h-20 px-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-sm"
                        style={{
                          background: `linear-gradient(to top, rgba(108,58,237,0.6), rgba(0,212,255,${h / 100}))`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Card — Top Right */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Deployment Complete</div>
                    <div className="text-[10px] text-gray-500">Al-Noor Academy, Riyadh</div>
                  </div>
                </motion.div>

                {/* Floating Card — Bottom Left */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-6 glass-card rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    &ldquo;Best EdTech partner we&rsquo;ve had&rdquo;
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE CARDS (3 columns) ═══ */}
      <section className="relative py-20 -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-2xl p-8 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                  <card.icon size={26} className="text-primary-light" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-primary-light text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT / WHO WE ARE ═══ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 rounded-xl p-5 text-center">
                      <School size={32} className="text-primary-light mx-auto mb-3" />
                      <div className="text-sm font-semibold">K-12 Schools</div>
                      <div className="text-[11px] text-gray-500 mt-1">Government & Private</div>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-5 text-center">
                      <BookOpen size={32} className="text-accent mx-auto mb-3" />
                      <div className="text-sm font-semibold">Islamic Schools</div>
                      <div className="text-[11px] text-gray-500 mt-1">Foundations & Academies</div>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-5 text-center">
                      <Globe size={32} className="text-green-400 mx-auto mb-3" />
                      <div className="text-sm font-semibold">International</div>
                      <div className="text-[11px] text-gray-500 mt-1">Bilingual & Multicultural</div>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-5 text-center">
                      <GraduationCap size={32} className="text-yellow-400 mx-auto mb-3" />
                      <div className="text-sm font-semibold">Colleges & NGOs</div>
                      <div className="text-[11px] text-gray-500 mt-1">Vocational & Aid Programs</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} custom={0} className="section-label">
                Who we are
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6"
              >
                The ultimate <span className="gradient-text">ecosystem</span> for modern
                schools.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-gray-400 leading-relaxed mb-8"
              >
                Cubico Technologies is a full-stack EdTech agency founded by Rooh Ul Hasnain.
                Rather than offering a single software product, we position ourselves as a
                complete ecosystem partner — delivering four integrated solutions that cover
                school administration, animated lesson content, student engagement, and digital
                infrastructure.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Education First</div>
                    <div className="text-xs text-gray-500">Revenue follows purpose — always.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Built With Educators</div>
                    <div className="text-xs text-gray-500">Active teachers sit on our team.</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS SECTION ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Empowering education at{' '}
              <span className="gradient-text">scale</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-400 max-w-xl mx-auto">
              Real numbers. Real impact. From Karachi to Riyadh to Ontario.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const { count, ref } = useCounter(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-2xl p-8 text-center group"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                    {count}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID (What We Offer) ═══ */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="section-label">
              What we offer
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-4"
            >
              One roof, <span className="gradient-text">every solution</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-400 max-w-xl mx-auto">
              No vendor juggling. Every service your school needs, delivered by one
              dedicated team.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-2xl p-6 group cursor-pointer text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svc.icon size={24} className="text-primary-light" />
                </div>
                <h4 className="font-heading font-semibold mb-2">{svc.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA / DEMO FORM ═══ */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="glass-card rounded-3xl p-8 md:p-14 glow-purple">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <span className="section-label">Get Started</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-4">
                  Book a <span className="gradient-text">Free Demo</span> & Solutions
                  Walkthrough
                </h2>
                <p className="text-gray-400 mb-8">
                  See how Cubico can transform your institution in just 4 weeks. Our team
                  will prepare a custom demo based on your school&rsquo;s needs.
                </p>
                <div className="flex flex-col gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-400" />
                    Personalized walkthrough of LMS, ERP & Animations
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-400" />
                    Arabic, Urdu & English content samples
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-400" />
                    No commitment — just explore what&rsquo;s possible
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="School / Company"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Your Position / Role"
                  className="form-input"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
                <select
                  className="form-select"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                >
                  <option value="">Number of Students / Staff</option>
                  <option value="1-50">1 – 50</option>
                  <option value="51-200">51 – 200</option>
                  <option value="201-500">201 – 500</option>
                  <option value="501-1000">501 – 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="btn-primary w-full justify-center mt-2 text-base"
                >
                  {formStatus === 'loading' ? (
                    'Submitting...'
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={18} /> Demo Requested!
                    </>
                  ) : (
                    <>
                      Get Free Demo <ArrowRight size={18} />
                    </>
                  )}
                </button>
                {formStatus === 'error' && (
                  <p className="text-red-400 text-xs text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="section-label">
              Testimonials
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-4"
            >
              What our <span className="gradient-text">partners</span> say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} custom={0} className="section-label">
                FAQ
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-4"
              >
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-400">
                Everything you need to know about working with Cubico Technologies.
                Can&rsquo;t find what you&rsquo;re looking for? Reach out to our team.
              </motion.p>
            </motion.div>

            {/* Right — Accordion */}
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-sm md:text-base">{faq.q}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      {openFaq === i ? (
                        <ChevronUp size={16} className="text-primary-light" />
                      ) : (
                        <ChevronDown size={16} className="text-primary-light" />
                      )}
                    </span>
                  </button>
                  <div className={`faq-content ${openFaq === i ? 'open' : ''}`}>
                    <p className="text-gray-400 text-sm leading-relaxed pt-3 pb-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARTNER LOGOS ═══ */}
      <section className="py-16 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-600 mb-8 font-medium uppercase tracking-widest">
            Trusted by leading institutions
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            {['Al-Huffaz', 'Al-Noor Academy', 'CIF Canada', 'Iqra Foundation', 'Saudi Schools Network', 'TechEd Pakistan'].map((name) => (
              <div
                key={name}
                className="text-gray-500 font-heading font-semibold text-lg tracking-wide"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1 — Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-heading font-semibold">
                  Cubico<span className="text-primary-light">.tech</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Transforming schools from chalk-and-board to world-class. One partner,
                every solution.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-surface-card flex items-center justify-center text-gray-500 hover:text-primary-light hover:bg-primary/10 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Solutions */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-sm">Solutions</h4>
              <div className="flex flex-col gap-3">
                {['Smart LMS', 'School ERP', 'Animated Content', 'Web Development', 'Mobile Apps'].map((link) => (
                  <a key={link} href="#" className="text-gray-500 text-sm hover:text-primary-light transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3 — Company */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-sm">Company</h4>
              <div className="flex flex-col gap-3">
                {['About Us', 'Our Team', 'Careers', 'Blog', 'Contact'].map((link) => (
                  <a key={link} href="#" className="text-gray-500 text-sm hover:text-primary-light transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 4 — Newsletter */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-sm">Newsletter</h4>
              <p className="text-gray-500 text-xs mb-4">
                Get updates on new features, EdTech insights, and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-input text-xs"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input text-xs"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary text-xs justify-center py-3">
                  {newsletterStatus === 'success' ? 'Subscribed!' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Cubico Technologies. All rights reserved. Karachi,
              Pakistan.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
