'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  FileText,
  Users,
  ShoppingCart,
  Network,
  Building2,
  CheckCircle2,
  Star,
  Quote,
  Rocket,
  Search,
  Palette,
  Code2,
  TestTube2,
  Headphones,
  Zap,
  Clock,
  Award,
  Shield,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const services = [
  {
    icon: Globe,
    title: 'School Websites',
    desc: 'Stunning, brand-aligned landing pages that capture your institution\'s identity. SEO-optimized, blazing fast, and designed to convert visitors into enrolled students.',
  },
  {
    icon: FileText,
    title: 'Admission Portals',
    desc: 'End-to-end online applications with document upload, status tracking, payment processing, and automated notifications. Reduce paperwork by 90%.',
  },
  {
    icon: Users,
    title: 'Parent Portals',
    desc: 'Real-time access to grades, attendance, fee statements, and teacher communication. Keep parents engaged with beautiful, intuitive dashboards.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Stores',
    desc: 'Online uniform shops, bookstores, and merchandise stores with inventory management, secure checkout, and delivery tracking built in.',
  },
  {
    icon: Network,
    title: 'Alumni Networks',
    desc: 'Searchable directories, event management, donation portals, and mentorship matching. Keep your alumni community active and connected for life.',
  },
  {
    icon: Building2,
    title: 'Staff Intranets',
    desc: 'Internal communication hubs with policy libraries, leave management, shared calendars, and announcement boards. Streamline staff operations.',
  },
];

const techStack = [
  { name: 'Next.js', color: '#000000', bg: '#f0f0f0', desc: 'React framework for production' },
  { name: 'React', color: '#61DAFB', bg: '#0a1929', desc: 'Component-based UI library' },
  { name: 'Node.js', color: '#339933', bg: '#f0faf0', desc: 'Server-side JavaScript runtime' },
  { name: 'PostgreSQL', color: '#4169E1', bg: '#f0f0fa', desc: 'Reliable relational database' },
  { name: 'Tailwind CSS', color: '#06B6D4', bg: '#f0fafa', desc: 'Utility-first CSS framework' },
  { name: 'Vercel', color: '#000000', bg: '#f5f5f5', desc: 'Edge deployment platform' },
  { name: 'AWS', color: '#FF9900', bg: '#fff8f0', desc: 'Cloud infrastructure at scale' },
  { name: 'Stripe', color: '#635BFF', bg: '#f5f0ff', desc: 'Payment processing APIs' },
];

const processSteps = [
  { icon: Search, title: 'Discovery', desc: 'We deep-dive into your institution\'s goals, audience, branding guidelines, and technical requirements.' },
  { icon: Palette, title: 'Design', desc: 'Interactive prototypes and polished UI designs reviewed with your team until every pixel is perfect.' },
  { icon: Code2, title: 'Development', desc: 'Agile sprints with weekly demos. Clean, tested code deployed to staging for your review.' },
  { icon: TestTube2, title: 'Testing', desc: 'Cross-browser QA, accessibility audits, performance optimization, and security penetration testing.' },
  { icon: Rocket, title: 'Launch & Support', desc: 'Zero-downtime deployment, staff training, documentation, and 24/7 ongoing maintenance.' },
];

const portfolioProjects = [
  { name: 'Greenfield Academy', type: 'K-12 School Website', color: '#10B981' },
  { name: 'Oxford Prep Institute', type: 'Admission Portal', color: '#6366F1' },
  { name: 'Sunrise International', type: 'Parent Portal', color: '#F59E0B' },
  { name: 'Cambridge Heights', type: 'Complete Digital Suite', color: '#EF4444' },
];

const stats = [
  { number: '100+', label: 'Websites Delivered' },
  { number: '< 2s', label: 'Average Load Time' },
  { number: '95+', label: 'SEO Score' },
  { number: '24/7', label: 'Support & Monitoring' },
];

const performanceMetrics = [
  { label: 'Page Speed', score: 98, color: '#10B981' },
  { label: 'SEO Score', score: 95, color: '#D4711A' },
  { label: 'Accessibility', score: 100, color: '#6366F1' },
  { label: 'Best Practices', score: 98, color: '#06B6D4' },
];

/* ═══════════════════════════════════════════
   CSS-ONLY MOCKUP COMPONENTS
   ═══════════════════════════════════════════ */

function BrowserMockup({ scale = 'full' }: { scale?: 'full' | 'tablet' | 'mobile' }) {
  const isTablet = scale === 'tablet';
  const isMobile = scale === 'mobile';

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-sm overflow-hidden">
      {/* Nav Bar */}
      <div className={`flex items-center justify-between bg-white border-b border-gray-100 ${isMobile ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
        <div className="flex items-center gap-1.5">
          <div className={`rounded-full bg-[#D4711A] ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          <span className={`font-bold text-gray-800 ${isMobile ? 'text-[6px]' : isTablet ? 'text-[7px]' : 'text-[9px]'}`}>
            Greenfield Academy
          </span>
        </div>
        {!isMobile && (
          <div className="flex gap-2">
            {['Home', 'About', 'Admissions', 'Contact'].map((item) => (
              <span key={item} className={`text-gray-500 ${isTablet ? 'text-[5px]' : 'text-[7px]'}`}>{item}</span>
            ))}
          </div>
        )}
        {isMobile && (
          <div className="flex flex-col gap-[1.5px]">
            <div className="w-2.5 h-[1px] bg-gray-400" />
            <div className="w-2.5 h-[1px] bg-gray-400" />
            <div className="w-2.5 h-[1px] bg-gray-400" />
          </div>
        )}
      </div>

      {/* Hero Banner */}
      <div
        className={`relative ${isMobile ? 'py-3 px-2' : isTablet ? 'py-4 px-3' : 'py-6 px-4'}`}
        style={{ background: 'linear-gradient(135deg, #D4711A 0%, #E88C32 50%, #F4A261 100%)' }}
      >
        <div className={`font-bold text-white leading-tight ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[11px]'}`}>
          Shaping Tomorrow&apos;s Leaders
        </div>
        <div className={`text-white/70 mt-0.5 ${isMobile ? 'text-[4px]' : isTablet ? 'text-[5px]' : 'text-[6px]'}`}>
          World-class education for every child
        </div>
        <div
          className={`mt-1.5 inline-block rounded-full text-[#D4711A] font-semibold bg-white ${isMobile ? 'text-[4px] px-1.5 py-0.5' : isTablet ? 'text-[5px] px-2 py-0.5' : 'text-[6px] px-2.5 py-1'}`}
        >
          Enroll Now
        </div>
      </div>

      {/* Feature Cards */}
      <div className={`flex-1 bg-gray-50 ${isMobile ? 'p-1.5' : isTablet ? 'p-2' : 'p-3'}`}>
        <div className={`${isMobile ? 'space-y-1' : `grid gap-1.5 ${isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}`}>
          {(isMobile ? ['Programs', 'Events'] : isTablet ? ['Programs', 'Events', 'Gallery', 'News'] : ['Programs', 'Events', 'Gallery', 'News', 'Alumni', 'Contact']).map(
            (card, idx) => (
              <div key={card} className="bg-white rounded-sm p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div
                  className="w-3 h-3 rounded-sm mb-1"
                  style={{
                    backgroundColor: ['#D4711A', '#10B981', '#6366F1', '#F59E0B', '#EF4444', '#06B6D4'][idx % 6] + '20',
                  }}
                />
                <div className={`font-semibold text-gray-700 ${isMobile ? 'text-[5px]' : 'text-[6px]'}`}>{card}</div>
                <div className={`bg-gray-100 rounded-sm mt-0.5 ${isMobile ? 'h-1' : 'h-1.5'}`} />
                <div className="w-2/3 bg-gray-100 rounded-sm mt-0.5 h-1" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopFrame() {
  return (
    <div className="relative">
      {/* Browser Chrome */}
      <div className="bg-[#2A1A0C] rounded-t-xl px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 bg-[#1A1008] rounded-md px-3 py-1 ml-2">
          <span className="text-[10px] text-[#C8A888]">https://greenfieldacademy.edu</span>
        </div>
      </div>
      {/* Content */}
      <div className="bg-white rounded-b-xl overflow-hidden border border-[#2A1A0C]/20 border-t-0" style={{ height: '280px' }}>
        <BrowserMockup scale="full" />
      </div>
    </div>
  );
}

function TabletFrame() {
  return (
    <div className="relative mx-auto" style={{ width: '200px' }}>
      {/* Tablet body */}
      <div className="bg-[#1A1008] rounded-2xl p-2.5 shadow-2xl">
        {/* Camera */}
        <div className="flex justify-center mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A1A0C]" />
        </div>
        {/* Screen */}
        <div className="bg-white rounded-lg overflow-hidden" style={{ height: '260px' }}>
          <BrowserMockup scale="tablet" />
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-1.5">
          <div className="w-6 h-1 rounded-full bg-[#2A1A0C]" />
        </div>
      </div>
    </div>
  );
}

function PhoneFrame() {
  return (
    <div className="relative mx-auto" style={{ width: '120px' }}>
      {/* Phone body */}
      <div className="bg-[#1A1008] rounded-[20px] p-2 shadow-2xl">
        {/* Notch */}
        <div className="flex justify-center mb-1">
          <div className="w-10 h-2 rounded-full bg-[#0F0A04]" />
        </div>
        {/* Screen */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ height: '220px' }}>
          <BrowserMockup scale="mobile" />
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-1.5">
          <div className="w-8 h-1 rounded-full bg-[#2A1A0C]" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PERFORMANCE CIRCLE COMPONENT
   ═══════════════════════════════════════════ */
function PerformanceCircle({ score, label, color, delay }: { score: number; label: string; color: string; delay: number }) {
  const circumference = 2 * Math.PI * 54;
  const strokeOffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="#2A1A0C" strokeWidth="8" />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: strokeOffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-[#8E7A65]">/100</span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-[#C8A888]">{label}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PORTFOLIO CARD MOCKUP
   ═══════════════════════════════════════════ */
function PortfolioThumb({ color, name }: { color: string; name: string }) {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white" style={{ height: '180px' }}>
      {/* Mini browser bar */}
      <div className="bg-gray-100 px-2 py-1.5 flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-1.5 py-0.5 ml-1">
          <div className="text-[5px] text-gray-400">{name.toLowerCase().replace(/\s/g, '')}.edu</div>
        </div>
      </div>
      {/* Hero */}
      <div className="px-2 py-3" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
        <div className="text-[8px] font-bold text-white">{name}</div>
        <div className="text-[5px] text-white/70 mt-0.5">Excellence in Education</div>
        <div className="mt-1 inline-block bg-white text-[4px] font-semibold px-1.5 py-0.5 rounded-full" style={{ color }}>
          Apply Now
        </div>
      </div>
      {/* Content */}
      <div className="p-2 grid grid-cols-3 gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 rounded p-1">
            <div className="w-2.5 h-2.5 rounded-sm mb-0.5" style={{ backgroundColor: color + '25' }} />
            <div className="h-0.5 bg-gray-200 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-2/3 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function WebDevelopmentPage() {
  return (
    <>
      <Header />

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO — "Your Digital Front Door"
          ══════════════════════════════════════════════ */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4711A]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8B4513]/5 rounded-full blur-[100px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
            >
              <span className="section-label-light inline-block mb-6">
                Web Development for Education
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                Your Digital{' '}
                <span className="gradient-text">Front Door</span>
              </h1>

              <p className="text-lg text-[#C8A888] max-w-lg mb-8 leading-relaxed">
                We build modern, responsive websites and web applications
                specifically for educational institutions. From school landing
                pages to complex admission portals, payment gateways, and
                parent dashboards &mdash; we craft digital experiences that
                impress and convert.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#portfolio" className="btn-outline-white">
                  View Our Work <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Stats Inline */}
              <div className="flex gap-8 mt-10">
                {[
                  { val: '100+', lbl: 'Websites' },
                  { val: '< 2s', lbl: 'Load Time' },
                  { val: '99.9%', lbl: 'Uptime' },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {s.val}
                    </div>
                    <div className="text-xs text-[#8E7A65]">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Browser Mockup */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <DesktopFrame />
              {/* Floating badges */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-[#1E1408] border border-[#2A1A0C] rounded-xl px-4 py-2.5 shadow-xl hidden lg:flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">98/100</div>
                  <div className="text-[10px] text-[#8E7A65]">Page Speed</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2: WHAT WE BUILD — 6 Service Cards
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4">
              What We <span className="gradient-text">Build</span>
            </h2>
            <p className="text-[#6A5A48] text-lg">
              End-to-end web solutions crafted for the unique needs of schools,
              universities, and educational organizations.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="card-white group"
                variants={fadeUp}
                custom={i}
              >
                <div className="icon-box mb-5">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#2A1E14] mb-3 group-hover:text-[#D4711A] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#6A5A48] text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3: TECH STACK SHOWCASE
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4711A]/5 rounded-full blur-[120px] -translate-y-1/2" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-light inline-block mb-4">Technology</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Built With the <span className="gradient-text">Best Stack</span>
            </h2>
            <p className="text-[#C8A888] text-lg">
              We use battle-tested, modern technologies that ensure speed,
              security, scalability, and long-term maintainability.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="group relative bg-[#1E1408] border border-[#2A1A0C] rounded-2xl p-5 hover:border-[#D4711A]/30 transition-all duration-300"
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                {/* Color accent bar */}
                <div className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: tech.color }} />

                <div
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3"
                  style={{
                    backgroundColor: tech.bg,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </div>
                <p className="text-[#8E7A65] text-xs leading-relaxed group-hover:text-[#C8A888] transition-colors">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4: RESPONSIVE DESIGN SHOWCASE
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Responsive by Default</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4">
              Pixel-Perfect on <span className="gradient-text">Every Screen</span>
            </h2>
            <p className="text-[#6A5A48] text-lg">
              Every website we build adapts flawlessly to desktops, tablets, and
              phones. Parents, students, and staff get a beautiful experience
              no matter how they browse.
            </p>
          </motion.div>

          {/* Device Mockups */}
          <motion.div
            className="flex items-end justify-center gap-6 md:gap-10 lg:gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Desktop */}
            <motion.div
              className="hidden md:block flex-shrink-0"
              style={{ width: '420px' }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Monitor className="w-4 h-4 text-[#D4711A]" />
                <span className="text-sm font-semibold text-[#2A1E14]">Desktop</span>
              </div>
              <DesktopFrame />
            </motion.div>

            {/* Tablet */}
            <motion.div
              className="hidden sm:block flex-shrink-0"
              variants={fadeUp}
              custom={1}
            >
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Tablet className="w-4 h-4 text-[#D4711A]" />
                <span className="text-sm font-semibold text-[#2A1E14]">Tablet</span>
              </div>
              <TabletFrame />
            </motion.div>

            {/* Mobile */}
            <motion.div
              className="flex-shrink-0"
              variants={fadeUp}
              custom={2}
            >
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Smartphone className="w-4 h-4 text-[#D4711A]" />
                <span className="text-sm font-semibold text-[#2A1E14]">Mobile</span>
              </div>
              <PhoneFrame />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5: PERFORMANCE METRICS
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4711A]/5 rounded-full blur-[140px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-light inline-block mb-4">Performance</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Lighthouse <span className="gradient-text">Scores</span>
            </h2>
            <p className="text-[#C8A888] text-lg">
              Every site we ship meets the highest standards. These are real
              scores from Google Lighthouse audits on our production sites.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {performanceMetrics.map((metric, i) => (
              <PerformanceCircle
                key={metric.label}
                score={metric.score}
                label={metric.label}
                color={metric.color}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: DEVELOPMENT PROCESS TIMELINE
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Our Process</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4">
              From Idea to <span className="gradient-text">Launch</span>
            </h2>
            <p className="text-[#6A5A48] text-lg">
              A proven five-phase process that delivers on time, every time.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4711A]/20 via-[#D4711A] to-[#D4711A]/20" />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative text-center"
                  variants={fadeUp}
                  custom={i}
                >
                  {/* Circle node */}
                  <div className="relative z-10 w-14 h-14 mx-auto rounded-full bg-white border-[3px] border-[#D4711A] flex items-center justify-center shadow-lg shadow-[#D4711A]/10 mb-6">
                    <step.icon className="w-6 h-6 text-[#D4711A]" />
                  </div>

                  {/* Phase number */}
                  <div className="text-xs font-bold text-[#D4711A] mb-1 tracking-wider uppercase">
                    Phase {i + 1}
                  </div>

                  <h3 className="text-lg font-bold text-[#2A1E14] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6A5A48] leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Arrow between steps (visible on lg) */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[3.4rem] -right-4 z-20">
                      <ChevronRight className="w-5 h-5 text-[#D4711A]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7: PORTFOLIO SHOWCASE
          ══════════════════════════════════════════════ */}
      <section id="portfolio" className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#D4711A]/5 rounded-full blur-[120px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-light inline-block mb-4">Portfolio</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-[#C8A888] text-lg">
              A glimpse into the educational websites and portals we have
              delivered for institutions around the world.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {portfolioProjects.map((project, i) => (
              <motion.div
                key={project.name}
                className="group bg-[#1E1408] border border-[#2A1A0C] rounded-2xl overflow-hidden hover:border-[#D4711A]/30 transition-all duration-300"
                variants={scaleIn}
                whileHover={{ y: -4 }}
              >
                {/* Mockup thumbnail */}
                <div className="p-4 pb-0">
                  <PortfolioThumb color={project.color} name={project.name} />
                </div>

                {/* Info */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4711A] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#8E7A65]">{project.type}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2A1A0C] flex items-center justify-center group-hover:bg-[#D4711A]/20 transition-colors">
                    <ExternalLink className="w-4 h-4 text-[#8E7A65] group-hover:text-[#D4711A] transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8: STATS BAR
          ══════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4711A 0%, #8B4513 100%)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeUp}
                custom={i}
              >
                <div
                  className="text-4xl sm:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 9: TESTIMONIAL
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-6">Testimonial</span>

            <div className="relative">
              <Quote className="w-12 h-12 text-[#D4711A]/20 mx-auto mb-6" />

              <blockquote className="text-2xl sm:text-3xl font-medium text-[#2A1E14] leading-relaxed mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                &ldquo;Cubico completely transformed our online presence. Our new
                website increased admission inquiries by 340% in the first
                semester. The parent portal alone saved our admin team 20 hours
                a week.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  SA
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#2A1E14]">Dr. Sarah Al-Rashid</div>
                  <div className="text-sm text-[#6A5A48]">
                    Director, Greenfield International Academy
                  </div>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4711A] fill-[#D4711A]" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 10: CTA
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/8 rounded-full blur-[160px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-light inline-block mb-6">
              Ready to Get Started?
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let&apos;s Build Your School&apos;s{' '}
              <span className="gradient-text">Digital Home</span>
            </h2>

            <p className="text-lg text-[#C8A888] max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you need a simple landing page or a full-featured
              admission portal, our team is ready to bring your vision to
              life. Get a free consultation and project estimate today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/solutions" className="btn-outline-white">
                Explore All Solutions
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
              {[
                { icon: Shield, text: 'SSL Secured' },
                { icon: Zap, text: 'Lightning Fast' },
                { icon: Award, text: 'WCAG 2.1 AA' },
                { icon: Clock, text: '24/7 Support' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-[#8E7A65]">
                  <badge.icon className="w-4 h-4 text-[#D4711A]" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
