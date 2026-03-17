'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  Trophy,
  BrainCircuit,
  Languages,
  Video,
  ClipboardCheck,
  Users,
  BarChart3,
  Clock,
  Bell,
  Play,
  CheckCircle2,
  Star,
  MessageSquare,
  Calendar,
  FileText,
  Award,
  Zap,
  Globe,
  Sparkles,
  Monitor,
  Smartphone,
  GraduationCap,
  Search,
  Settings,
  Home,
  Layout,
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

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const features = [
  {
    icon: Trophy,
    title: 'Gamified Learning',
    desc: 'Motivate students with badges, leaderboards, XP points, and achievement unlocks. Turn every lesson into an engaging quest that drives participation and completion rates.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Analytics',
    desc: 'Predictive insights identify at-risk students before they fall behind. Get actionable dashboards that show learning patterns, engagement gaps, and grade forecasts.',
  },
  {
    icon: Languages,
    title: 'Multilingual Content',
    desc: 'Full support for English, Arabic, and Urdu with proper RTL layout handling. Switch languages seamlessly — content, interface, and assessments all adapt instantly.',
  },
  {
    icon: Video,
    title: 'Video Conferencing',
    desc: 'Built-in live classes with screen sharing, breakout rooms, and recording. No need for third-party tools — everything runs inside your LMS with one click.',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment Engine',
    desc: 'Auto-grading with 15+ question types, randomized question banks, plagiarism detection, and rubric-based evaluation. Save teachers hours every week.',
  },
  {
    icon: Users,
    title: 'Parent Portal',
    desc: 'Parents track progress, view grades, communicate with teachers, and receive automated reports. Full visibility keeps families engaged in the learning journey.',
  },
];

const steps = [
  {
    num: '01',
    title: 'We Audit Your Curriculum',
    desc: 'Our education specialists review your existing curriculum, content formats, and teaching workflows to create a migration blueprint.',
  },
  {
    num: '02',
    title: 'Customize & Configure',
    desc: 'We tailor the LMS to your branding, grading policies, academic calendar, and role-based permissions for every user type.',
  },
  {
    num: '03',
    title: 'Content Migration & Training',
    desc: 'Existing courses, question banks, and resources are migrated seamlessly. Your staff receives hands-on training with ongoing support.',
  },
  {
    num: '04',
    title: 'Launch & Ongoing Support',
    desc: 'Go live with confidence. Our team provides 24/7 support, quarterly feature updates, and performance monitoring from day one.',
  },
];

const integrations = [
  { name: 'Google Classroom', color: 'bg-blue-500', letter: 'G' },
  { name: 'Microsoft Teams', color: 'bg-indigo-600', letter: 'T' },
  { name: 'Zoom', color: 'bg-blue-600', letter: 'Z' },
  { name: 'PayPal', color: 'bg-sky-600', letter: 'P' },
  { name: 'WhatsApp', color: 'bg-emerald-500', letter: 'W' },
  { name: 'SIS Systems', color: 'bg-gray-700', letter: 'S' },
];

const stats = [
  { number: '500+', label: 'Courses Deployed' },
  { number: '50K+', label: 'Active Students' },
  { number: '98%', label: 'Uptime Guaranteed' },
  { number: '3', label: 'Languages Supported' },
];

export default function SmartLMSPage() {
  return (
    <>
      <Header />

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════ */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#D4711A]/15 rounded-full filter blur-[200px]" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#8B4513]/10 rounded-full filter blur-[160px]" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full filter blur-[120px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 mb-8"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E88C32] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4711A]" />
                </span>
                <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                  Moodle-Powered LMS Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]"
              >
                The Smartest Way to{' '}
                <span className="gradient-text">Teach, Learn &amp; Grow</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/55 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              >
                A next-generation learning management system built on Moodle for K-12
                and higher education. Gamified learning, AI analytics, multilingual
                support, and a parent portal — all in one platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg px-8">
                  Request a Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing" className="btn-outline-white text-lg px-8">
                  View Pricing
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {['bg-orange-400', 'bg-violet-500', 'bg-emerald-400', 'bg-rose-400'].map(
                    (bg, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 ${bg} rounded-full border-2 border-[#0D0D0F] flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {['A', 'S', 'M', 'K'][i]}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#E88C32] fill-[#E88C32]" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">Trusted by 760+ schools worldwide</p>
                </div>
              </motion.div>
            </div>

            {/* Right - Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute -inset-6 bg-gradient-to-br from-[#D4711A]/20 via-violet-500/10 to-transparent rounded-3xl filter blur-2xl" />

                {/* Browser Window */}
                <div className="relative bg-[#1a1a2e] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border border-white/10">
                  {/* Browser Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#12121f] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 ml-3">
                      <div className="bg-white/5 rounded-lg px-4 py-1.5 text-xs text-white/30 border border-white/5 max-w-xs">
                        lms.cubico.tech/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-5">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <div className="text-white/90 text-sm font-bold font-heading">
                          Welcome back, Sarah!
                        </div>
                        <div className="text-white/30 text-xs mt-0.5">
                          You have 3 courses in progress
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#D4711A]/20 flex items-center justify-center">
                          <Bell className="w-4 h-4 text-[#E88C32]" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white text-xs font-bold">
                          S
                        </div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: 'Courses', val: '12', icon: BookOpen, change: '+2 this month' },
                        { label: 'Avg Grade', val: 'A-', icon: Award, change: '89.5%' },
                        { label: 'XP Points', val: '2,450', icon: Zap, change: 'Level 8' },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-white/[0.04] rounded-xl p-3 border border-white/5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <s.icon className="w-4 h-4 text-[#E88C32]" />
                            <span className="text-[10px] text-emerald-400">{s.change}</span>
                          </div>
                          <div className="text-white font-heading font-bold text-lg">{s.val}</div>
                          <div className="text-white/30 text-[10px]">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Course Cards */}
                    <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
                      My Courses
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Mathematics — Algebra II', progress: 78, color: 'from-violet-500 to-purple-600', grade: 'A' },
                        { name: 'Physics — Mechanics', progress: 52, color: 'from-[#D4711A] to-[#8B4513]', grade: 'B+' },
                        { name: 'English Literature — Poetry', progress: 91, color: 'from-emerald-500 to-teal-600', grade: 'A+' },
                      ].map((course) => (
                        <div
                          key={course.name}
                          className="bg-white/[0.03] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-xs font-medium">{course.name}</span>
                            <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">
                              {course.grade}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-white/40 w-8 text-right">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Grade Widget */}
                    <div className="mt-4 bg-white/[0.03] rounded-xl p-3 border border-white/5">
                      <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2">
                        Weekly Activity
                      </div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[35, 60, 45, 80, 65, 90, 50].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-[#D4711A] to-[#E88C32] rounded-sm opacity-70"
                              style={{ height: `${h}%` }}
                            />
                            <span className="text-[8px] text-white/20">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-6 top-1/4 bg-[#1a1a2e] rounded-2xl shadow-xl px-4 py-3 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40">Achievement!</div>
                      <div className="text-xs font-heading font-bold text-white">
                        Quiz Master
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-4 bottom-1/4 bg-[#1a1a2e] rounded-2xl shadow-xl px-4 py-3 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4711A]/20 flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4 text-[#E88C32]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40">AI Insight</div>
                      <div className="text-xs font-heading font-bold text-emerald-400">
                        +12% this week
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2: KEY FEATURES GRID
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-dots opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="section-label mb-4 block text-center justify-center">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Everything You Need to{' '}
              <span className="gradient-text">Power Learning</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Built on Moodle with powerful extensions, our LMS goes far beyond basic course
              delivery. Every feature is designed with educators and students in mind.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                custom={i}
                className="card-white group relative overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4711A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative">
                  <div className="icon-box mb-6 w-14 h-14 rounded-2xl bg-[#D4711A]/10 flex items-center justify-center group-hover:bg-[#D4711A]/20 transition-colors">
                    <feat.icon className="w-6 h-6 text-[#D4711A]" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3: INTERACTIVE DASHBOARD MOCKUP
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-surface-light relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label mb-4 block text-center justify-center">
              Dashboard Preview
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              A Dashboard That{' '}
              <span className="gradient-text">Teachers Love</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Clean, intuitive, and packed with insights. Every role sees exactly what they
              need — nothing more, nothing less.
            </p>
          </motion.div>

          {/* Full Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/8 overflow-hidden border border-gray-100">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 ml-3">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-400 border border-gray-200 max-w-sm flex items-center gap-2">
                    <Search className="w-3 h-3" />
                    lms.cubico.tech/teacher/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-200" />
                  <div className="w-6 h-6 rounded bg-gray-200" />
                </div>
              </div>

              <div className="flex min-h-[520px]">
                {/* Sidebar */}
                <div className="w-56 bg-[#0f0f1a] p-4 hidden md:flex flex-col">
                  {/* Logo */}
                  <div className="flex items-center gap-2.5 mb-8 px-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-heading font-bold text-sm">Smart LMS</span>
                  </div>

                  {/* Nav Items */}
                  <div className="space-y-1">
                    {[
                      { icon: Home, label: 'Dashboard', active: true },
                      { icon: BookOpen, label: 'My Courses', active: false },
                      { icon: Users, label: 'Students', active: false },
                      { icon: ClipboardCheck, label: 'Assessments', active: false },
                      { icon: BarChart3, label: 'Analytics', active: false },
                      { icon: MessageSquare, label: 'Messages', active: false },
                      { icon: Calendar, label: 'Schedule', active: false },
                      { icon: Settings, label: 'Settings', active: false },
                    ].map((nav) => (
                      <div
                        key={nav.label}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          nav.active
                            ? 'bg-[#D4711A]/20 text-[#E88C32]'
                            : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <nav.icon className="w-4 h-4" />
                        {nav.label}
                        {nav.label === 'Messages' && (
                          <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                            3
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bottom user */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2.5 px-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        MR
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">Ms. Rashida</div>
                        <div className="text-white/30 text-[10px]">Math Teacher</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-50/50">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading font-bold text-gray-900 text-base">
                        Good morning, Ms. Rashida!
                      </h3>
                      <p className="text-gray-400 text-xs mt-0.5">
                        You have 4 classes today and 12 assignments to review
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Total Students', val: '284', change: '+12', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { label: 'Active Courses', val: '8', change: '+1', color: 'text-blue-500', bg: 'bg-blue-50' },
                      { label: 'Avg. Score', val: '87%', change: '+3%', color: 'text-violet-500', bg: 'bg-violet-50' },
                      { label: 'Completion Rate', val: '92%', change: '+5%', color: 'text-[#D4711A]', bg: 'bg-orange-50' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                            {stat.label}
                          </span>
                          <span className={`text-[10px] font-bold ${stat.color} ${stat.bg} px-1.5 py-0.5 rounded`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-xl font-heading font-bold text-gray-900">
                          {stat.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-5 gap-5">
                    {/* Performance Chart */}
                    <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-heading font-bold text-gray-900 text-sm">
                            Student Performance
                          </div>
                          <div className="text-gray-400 text-[10px] mt-0.5">
                            Average scores per class this semester
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#D4711A]" />
                            <span className="text-[10px] text-gray-400">This Term</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                            <span className="text-[10px] text-gray-400">Last Term</span>
                          </div>
                        </div>
                      </div>
                      {/* Bar Chart */}
                      <div className="flex items-end gap-3 h-36">
                        {[
                          { label: 'Grade 7', cur: 72, prev: 65 },
                          { label: 'Grade 8', cur: 85, prev: 78 },
                          { label: 'Grade 9', cur: 68, prev: 71 },
                          { label: 'Grade 10', cur: 91, prev: 82 },
                          { label: 'Grade 11', cur: 76, prev: 74 },
                          { label: 'Grade 12', cur: 88, prev: 80 },
                        ].map((bar) => (
                          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex gap-0.5 items-end h-28">
                              <div
                                className="flex-1 bg-gray-100 rounded-t-sm"
                                style={{ height: `${bar.prev}%` }}
                              />
                              <div
                                className="flex-1 bg-gradient-to-t from-[#D4711A] to-[#E88C32] rounded-t-sm"
                                style={{ height: `${bar.cur}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400 whitespace-nowrap">
                              {bar.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-5">
                      {/* Recent Activity */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="font-heading font-bold text-gray-900 text-sm mb-3">
                          Recent Activity
                        </div>
                        <div className="space-y-3">
                          {[
                            { text: 'Ahmed submitted Algebra Quiz', time: '2m ago', icon: FileText, color: 'bg-violet-100 text-violet-600' },
                            { text: 'New student enrolled in Physics', time: '15m ago', icon: Users, color: 'bg-emerald-100 text-emerald-600' },
                            { text: 'Grade 10 assignment due reminder', time: '1h ago', icon: Clock, color: 'bg-orange-100 text-[#D4711A]' },
                            { text: 'Parent meeting scheduled', time: '3h ago', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
                          ].map((act, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className={`w-7 h-7 rounded-lg ${act.color} flex items-center justify-center flex-shrink-0`}>
                                <act.icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs text-gray-700 font-medium truncate">
                                  {act.text}
                                </div>
                                <div className="text-[10px] text-gray-400">{act.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Upcoming */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="font-heading font-bold text-gray-900 text-sm mb-3">
                          Upcoming Assignments
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: 'Algebra II — Chapter Test', due: 'Tomorrow', status: 'bg-red-100 text-red-600' },
                            { name: 'Physics Lab Report', due: 'In 3 days', status: 'bg-yellow-100 text-yellow-700' },
                            { name: 'Poetry Analysis Essay', due: 'In 1 week', status: 'bg-emerald-100 text-emerald-600' },
                          ].map((a, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div>
                                <div className="text-xs text-gray-700 font-medium">{a.name}</div>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${a.status}`}>
                                {a.due}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4: HOW IT WORKS
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-dots opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="section-label mb-4 block text-center justify-center">
              Implementation Process
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              From Zero to <span className="gradient-text">Launch in 4 Weeks</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our proven deployment process gets your LMS up and running fast — without
              disrupting your existing academic calendar.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#D4711A]/30 via-[#D4711A] to-[#D4711A]/30" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {steps.map((step, i) => (
                <motion.div key={step.num} variants={fadeUp} custom={i} className="text-center">
                  {/* Number Circle */}
                  <div className="relative inline-flex mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center shadow-lg shadow-[#D4711A]/20 relative z-10">
                      <span className="text-white font-heading font-bold text-lg">{step.num}</span>
                    </div>
                    <div className="absolute inset-0 w-14 h-14 rounded-full bg-[#D4711A]/20 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>

                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5: STUDENT EXPERIENCE (MOBILE MOCKUP)
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#D4711A]/10 rounded-full filter blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full filter blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label section-label-light mb-4 block">
                Student Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Learning That Fits in{' '}
                <span className="gradient-text">Every Pocket</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Students access courses, watch video lessons, take quizzes, and track their
                progress — all from a beautiful mobile interface that feels like the apps they
                already love.
              </p>

              <div className="space-y-4">
                {[
                  'Offline mode for areas with limited connectivity',
                  'Push notifications for deadlines and grades',
                  'Dark mode for late-night study sessions',
                  'One-tap access to live classes and recordings',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-[300px] bg-[#1a1a2e] rounded-[40px] p-3 shadow-2xl shadow-black/50 border border-white/10">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0f0f1a] rounded-full z-10" />

                  {/* Screen */}
                  <div className="bg-[#0f0f1a] rounded-[30px] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-8 pb-3">
                      <span className="text-white/50 text-[10px] font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-2 rounded-sm bg-white/30" />
                        <div className="w-3 h-2 rounded-sm bg-white/30" />
                        <div className="w-4 h-2.5 rounded-sm bg-white/50 border border-white/30" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-4 pb-4 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-heading font-bold text-base">
                            My Courses
                          </div>
                          <div className="text-white/30 text-[10px]">3 in progress</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white text-xs font-bold">
                          A
                        </div>
                      </div>

                      {/* Course Card - Featured */}
                      <div className="bg-gradient-to-br from-[#D4711A]/20 to-[#8B4513]/10 rounded-2xl p-3.5 border border-[#D4711A]/20">
                        {/* Video Thumbnail */}
                        <div className="relative bg-gradient-to-br from-[#D4711A]/40 to-[#8B4513]/30 rounded-xl h-28 flex items-center justify-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/50 rounded px-1.5 py-0.5 text-[9px] text-white">
                            24:30
                          </div>
                          <div className="absolute top-2 left-2 bg-[#D4711A] rounded px-1.5 py-0.5 text-[8px] text-white font-bold uppercase">
                            Live
                          </div>
                        </div>
                        <div className="text-white text-xs font-bold mb-1">
                          Algebra II — Quadratic Equations
                        </div>
                        <div className="text-white/40 text-[10px] mb-2">Ms. Rashida &middot; Chapter 4</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[65%] bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-full" />
                          </div>
                          <span className="text-[10px] text-white/40">65%</span>
                        </div>
                      </div>

                      {/* Course List */}
                      {[
                        { name: 'Physics — Mechanics', teacher: 'Mr. Hassan', prog: 42, color: 'from-violet-500 to-purple-600' },
                        { name: 'English Literature', teacher: 'Ms. Fatima', prog: 88, color: 'from-emerald-500 to-teal-600' },
                      ].map((c) => (
                        <div key={c.name} className="bg-white/[0.04] rounded-xl p-3 border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-xs font-medium truncate">{c.name}</div>
                              <div className="text-white/30 text-[10px]">{c.teacher}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/20" />
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${c.color} rounded-full`}
                                style={{ width: `${c.prog}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-white/30">{c.prog}%</span>
                          </div>
                        </div>
                      ))}

                      {/* Quiz Banner */}
                      <div className="bg-violet-500/20 rounded-xl p-3 border border-violet-500/20">
                        <div className="flex items-center gap-2">
                          <ClipboardCheck className="w-5 h-5 text-violet-400" />
                          <div className="flex-1">
                            <div className="text-white text-[11px] font-bold">
                              Quiz Available
                            </div>
                            <div className="text-white/40 text-[9px]">
                              Algebra — 10 questions &middot; 15 min
                            </div>
                          </div>
                          <div className="bg-violet-500 rounded-lg px-2.5 py-1 text-[9px] text-white font-bold">
                            Start
                          </div>
                        </div>
                      </div>

                      {/* Bottom Nav */}
                      <div className="flex items-center justify-around pt-3 border-t border-white/5">
                        {[
                          { icon: Home, label: 'Home', active: true },
                          { icon: BookOpen, label: 'Courses', active: false },
                          { icon: Video, label: 'Live', active: false },
                          { icon: Award, label: 'Badges', active: false },
                          { icon: Users, label: 'Profile', active: false },
                        ].map((nav) => (
                          <div key={nav.label} className="flex flex-col items-center gap-0.5">
                            <nav.icon className={`w-4 h-4 ${nav.active ? 'text-[#E88C32]' : 'text-white/20'}`} />
                            <span className={`text-[8px] ${nav.active ? 'text-[#E88C32]' : 'text-white/20'}`}>
                              {nav.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-16 top-20 bg-[#1a1a2e] rounded-2xl shadow-xl px-4 py-3 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-[9px] text-white/30">New Badge!</div>
                      <div className="text-xs font-bold text-white">Fast Learner</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="absolute -left-14 bottom-32 bg-[#1a1a2e] rounded-2xl shadow-xl px-4 py-3 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[9px] text-white/30">Quiz Result</div>
                      <div className="text-xs font-bold text-emerald-400">94% Score</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: STATS
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(212,113,26,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
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
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/40 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7: INTEGRATION ECOSYSTEM
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-dots opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label mb-4 block text-center justify-center">
              Integrations
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Connects With Your{' '}
              <span className="gradient-text">Existing Tools</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our Smart LMS integrates seamlessly with the platforms your school already uses.
              No data silos, no manual workarounds.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {integrations.map((int, i) => (
              <motion.div
                key={int.name}
                variants={fadeUp}
                custom={i}
                className="group flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#D4711A]/30 hover:shadow-lg hover:shadow-[#D4711A]/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${int.color} rounded-2xl flex items-center justify-center text-white text-xl font-heading font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                  {int.letter}
                </div>
                <span className="text-gray-700 text-sm font-medium text-center">
                  {int.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Extra info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm">
              Plus custom API integrations with any SIS, ERP, or payment gateway your institution requires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8: TESTIMONIAL
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-surface-light relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-30" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 text-[#E88C32] fill-[#E88C32]" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-10 leading-snug">
              &ldquo;Cubico&apos;s Smart LMS transformed how we deliver education. Our teachers
              went from overwhelmed to empowered, and student engagement increased by{' '}
              <span className="gradient-text">40% in the first semester</span>. The
              multilingual support was a game-changer for our diverse community.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white font-heading font-bold text-lg">
                NK
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-gray-900">Dr. Nadia Khalil</div>
                <div className="text-gray-500 text-sm">
                  Director, Al-Noor International School
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 9: CTA
          ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/8 rounded-full filter blur-[200px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#E88C32]" />
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                Get Started Today
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Ready to Launch Your{' '}
              <span className="gradient-text">Smart LMS?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Book a free 30-minute consultation. We&apos;ll walk you through a live demo,
              understand your curriculum needs, and show you exactly how our LMS can
              transform learning at your institution.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10">
                Request Free Demo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/solutions" className="btn-outline-white text-lg px-10">
                Explore All Solutions
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-12 flex items-center justify-center gap-6 text-white/30 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
