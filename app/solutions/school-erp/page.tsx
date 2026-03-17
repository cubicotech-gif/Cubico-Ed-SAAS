'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  BarChart3,
  Bell,
  Star,
  Calendar,
  FileText,
  Zap,
  Settings,
  Home,
  ChevronRight,
  DollarSign,
  UserPlus,
  Clock,
  Bus,
  BookOpen,
  Package,
  MessageSquare,
  PieChart,
  Shield,
  Lock,
  Database,
  Eye,
  Server,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CreditCard,
  Briefcase,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
  visible: { transition: { staggerChildren: 0.08 } },
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
const erpModules = [
  {
    icon: UserPlus,
    title: 'Admissions Management',
    desc: 'Online applications, document verification, merit lists, and enrollment workflows — all paperless.',
    color: '#D4711A',
  },
  {
    icon: DollarSign,
    title: 'Fee & Finance',
    desc: 'Automated invoicing, online payments, fee structures by class, late-fee rules, and financial reports.',
    color: '#2563EB',
  },
  {
    icon: Briefcase,
    title: 'HR & Payroll',
    desc: 'Staff profiles, salary processing, leave management, performance reviews, and compliance tracking.',
    color: '#7C3AED',
  },
  {
    icon: Calendar,
    title: 'Timetable & Scheduling',
    desc: 'Conflict-free timetable generation, substitution management, and room allocation in seconds.',
    color: '#059669',
  },
  {
    icon: ClipboardList,
    title: 'Exam Management',
    desc: 'Exam scheduling, hall tickets, mark entry, grade computation, and report card generation.',
    color: '#DC2626',
  },
  {
    icon: Clock,
    title: 'Attendance Tracking',
    desc: 'Biometric/RFID integration, period-wise tracking, SMS alerts to parents, and trend analytics.',
    color: '#0891B2',
  },
  {
    icon: Bus,
    title: 'Transport Management',
    desc: 'Route planning, GPS tracking, driver assignment, fee linking, and parent notifications.',
    color: '#CA8A04',
  },
  {
    icon: BookOpen,
    title: 'Library System',
    desc: 'Catalogue management, barcode scanning, issue/return tracking, overdue alerts, and e-library.',
    color: '#BE185D',
  },
  {
    icon: Package,
    title: 'Inventory & Assets',
    desc: 'Track lab equipment, furniture, IT assets, consumables, and procurement with depreciation logs.',
    color: '#6D28D9',
  },
  {
    icon: MessageSquare,
    title: 'Parent Communication',
    desc: 'In-app messaging, SMS/email broadcasts, event calendars, and homework notifications.',
    color: '#0D9488',
  },
  {
    icon: PieChart,
    title: 'Reports & Analytics',
    desc: '100+ pre-built reports, custom dashboards, export to Excel/PDF, and board-level analytics.',
    color: '#EA580C',
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'Multi-channel alerts via push, SMS, email, and WhatsApp with smart scheduling and templates.',
    color: '#4F46E5',
  },
];

const stats = [
  { number: '760+', label: 'Schools Powered' },
  { number: '12', label: 'Integrated Modules' },
  { number: '50%', label: 'Time Saved' },
  { number: '99.9%', label: 'Uptime SLA' },
];

const securityFeatures = [
  { icon: Shield, title: 'Role-Based Access', desc: 'Granular permissions for admins, teachers, parents, and staff with custom role creation.' },
  { icon: Lock, title: 'Data Encryption', desc: 'AES-256 encryption at rest, TLS 1.3 in transit. Your school data is vault-grade secure.' },
  { icon: Database, title: 'Automated Backups', desc: 'Daily incremental + weekly full backups with point-in-time recovery up to 30 days.' },
  { icon: Eye, title: 'GDPR Compliant', desc: 'Data processing agreements, consent management, and right-to-erasure workflows built in.' },
  { icon: FileText, title: 'Audit Logs', desc: 'Every action tracked — who changed what, when, and from which device. Full accountability.' },
  { icon: Server, title: 'Multi-Tenant Architecture', desc: 'Isolated databases per school. One school\'s data never touches another. Ever.' },
];

const roiData = [
  { metric: 'Weekly Admin Hours', before: '40 hrs', after: '8 hrs', beforePct: 100, afterPct: 20 },
  { metric: 'Fee Default Rate', before: '15%', after: '3%', beforePct: 100, afterPct: 20 },
  { metric: 'Report Generation', before: '3 days', after: 'Instant', beforePct: 100, afterPct: 5 },
  { metric: 'Parent Satisfaction', before: '62%', after: '94%', beforePct: 62, afterPct: 94 },
];

/* Fee table mock data */
const feeInvoices = [
  { student: 'Aisha Rahman', class: 'Grade 10-A', amount: 'AED 4,500', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' },
  { student: 'Omar Al-Farsi', class: 'Grade 8-B', amount: 'AED 4,500', status: 'Pending', statusColor: 'bg-yellow-500/20 text-yellow-400' },
  { student: 'Sara Khalid', class: 'Grade 12-A', amount: 'AED 5,200', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' },
  { student: 'Yusuf Hassan', class: 'Grade 7-C', amount: 'AED 4,500', status: 'Overdue', statusColor: 'bg-red-500/20 text-red-400' },
  { student: 'Fatima Noor', class: 'Grade 9-A', amount: 'AED 4,800', status: 'Paid', statusColor: 'bg-emerald-500/20 text-emerald-400' },
];

/* Report card mock data */
const reportCardSubjects = [
  { subject: 'Mathematics', marks: 92, grade: 'A+', comment: 'Excellent analytical skills' },
  { subject: 'Science', marks: 88, grade: 'A', comment: 'Strong lab performance' },
  { subject: 'English', marks: 85, grade: 'A', comment: 'Impressive writing growth' },
  { subject: 'Arabic', marks: 78, grade: 'B+', comment: 'Needs vocabulary focus' },
  { subject: 'Social Studies', marks: 90, grade: 'A+', comment: 'Outstanding projects' },
  { subject: 'Computer Science', marks: 95, grade: 'A+', comment: 'Exceptional coding ability' },
];

/* Data flow hub modules */
const hubModules = [
  { icon: UserPlus, label: 'Admissions', angle: 0 },
  { icon: DollarSign, label: 'Finance', angle: 30 },
  { icon: Briefcase, label: 'HR', angle: 60 },
  { icon: Calendar, label: 'Timetable', angle: 90 },
  { icon: ClipboardList, label: 'Exams', angle: 120 },
  { icon: Clock, label: 'Attendance', angle: 150 },
  { icon: Bus, label: 'Transport', angle: 180 },
  { icon: BookOpen, label: 'Library', angle: 210 },
  { icon: Package, label: 'Inventory', angle: 240 },
  { icon: MessageSquare, label: 'Comms', angle: 270 },
  { icon: PieChart, label: 'Reports', angle: 300 },
  { icon: Bell, label: 'Alerts', angle: 330 },
];

export default function SchoolERPPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Fee Management', 'Attendance Dashboard', 'Report Cards'];

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
                  Enterprise School Management
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]"
              >
                One System.{' '}
                <span className="gradient-text">Zero Chaos.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/55 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              >
                Manage admissions, fees, HR, exams, attendance, transport, and
                every aspect of school operations from one unified platform.
                Built for schools that refuse to settle for spreadsheets.
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
                        {['K', 'D', 'A', 'R'][i]}
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

            {/* Right - ERP Dashboard Mockup */}
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
                        erp.cubico.tech/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="w-14 bg-[#12121f] border-r border-white/5 py-4 flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center mb-2">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      {[Home, Users, DollarSign, Calendar, ClipboardList, Clock, BarChart3, Settings].map((Icon, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            i === 0 ? 'bg-[#D4711A]/20 text-[#E88C32]' : 'text-white/25 hover:text-white/40'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      ))}
                    </div>

                    {/* Main Area */}
                    <div className="flex-1 p-4">
                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-white/90 text-sm font-bold font-heading">
                            School Dashboard
                          </div>
                          <div className="text-white/30 text-[10px] mt-0.5">
                            Academic Year 2025-26 &middot; Term 2
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#D4711A]/20 flex items-center justify-center relative">
                            <Bell className="w-3.5 h-3.5 text-[#E88C32]" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[6px] text-white flex items-center justify-center font-bold">5</div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white text-[10px] font-bold">
                            P
                          </div>
                        </div>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: 'Total Students', val: '2,847', icon: Users, change: '+124 new', changeColor: 'text-emerald-400' },
                          { label: 'Monthly Revenue', val: 'AED 1.2M', icon: DollarSign, change: '+8.3%', changeColor: 'text-emerald-400' },
                          { label: 'Attendance', val: '94.2%', icon: Activity, change: '-0.5%', changeColor: 'text-yellow-400' },
                        ].map((card, i) => (
                          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/40 text-[9px] uppercase tracking-wider">{card.label}</span>
                              <card.icon className="w-3.5 h-3.5 text-[#E88C32]/60" />
                            </div>
                            <div className="text-white text-base font-bold font-heading">{card.val}</div>
                            <div className={`text-[9px] mt-1 ${card.changeColor}`}>{card.change}</div>
                          </div>
                        ))}
                      </div>

                      {/* Chart + Notifications */}
                      <div className="grid grid-cols-5 gap-2">
                        {/* Chart */}
                        <div className="col-span-3 bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-white/50 text-[9px] uppercase tracking-wider mb-3">Fee Collection Trend</div>
                          <div className="flex items-end gap-1 h-16">
                            {[45, 62, 58, 75, 82, 70, 88, 92, 85, 78, 95, 90].map((h, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                                <div
                                  className="w-full rounded-sm bg-gradient-to-t from-[#D4711A] to-[#E88C32]"
                                  style={{ height: `${h * 0.65}%`, minHeight: '4px', opacity: 0.6 + (i / 20) }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-white/20 text-[7px]">Jan</span>
                            <span className="text-white/20 text-[7px]">Jun</span>
                            <span className="text-white/20 text-[7px]">Dec</span>
                          </div>
                        </div>

                        {/* Recent Notifications */}
                        <div className="col-span-2 bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-white/50 text-[9px] uppercase tracking-wider mb-2">Notifications</div>
                          <div className="space-y-2">
                            {[
                              { text: 'Fee reminder sent', color: 'bg-orange-500' },
                              { text: '3 leaves approved', color: 'bg-emerald-500' },
                              { text: 'Exam schedule live', color: 'bg-blue-500' },
                              { text: 'Bus #7 delayed', color: 'bg-red-500' },
                            ].map((n, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${n.color} shrink-0`} />
                                <span className="text-white/40 text-[8px] truncate">{n.text}</span>
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2: 12 MODULES GRID
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="section-label">Modules</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mt-4 mb-6">
              12 Modules. <span className="gradient-text">One Platform.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every department, every workflow, every stakeholder — connected and synchronized
              in real time. No more data silos.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {erpModules.map((mod, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D4711A]/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ backgroundColor: `${mod.color}15` }}
                >
                  <mod.icon
                    className="w-6 h-6 transition-colors duration-300"
                    style={{ color: mod.color }}
                  />
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-[#D4711A] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{mod.desc}</p>
                {/* Hover accent bar */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3: INTERACTIVE MODULE DEEP-DIVE
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#D4711A]/8 rounded-full filter blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full filter blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="section-label-light">Deep Dive</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              See Modules <span className="gradient-text">In Action</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Explore detailed views of our most-used modules. Every screen is designed
              for clarity, speed, and zero training time.
            </p>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-center gap-2 mb-12 flex-wrap"
          >
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 rounded-xl text-sm font-bold font-heading transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white shadow-lg shadow-[#D4711A]/25'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Glow */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4711A]/10 via-transparent to-violet-500/5 rounded-3xl filter blur-xl" />

              <div className="relative bg-[#1a1a2e] rounded-2xl border border-white/10 overflow-hidden">
                {/* Window bar */}
                <div className="flex items-center gap-2 px-5 py-3 bg-[#12121f] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 ml-3">
                    <div className="bg-white/5 rounded-lg px-4 py-1.5 text-xs text-white/30 border border-white/5 max-w-sm">
                      erp.cubico.tech/{['fees', 'attendance', 'reports'][activeTab]}
                    </div>
                  </div>
                </div>

                {/* === Fee Management Tab === */}
                {activeTab === 0 && (
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-white font-heading font-bold text-lg">Fee Invoices</h3>
                        <p className="text-white/30 text-xs mt-1">Term 2, 2025-26 &middot; 2,847 students</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg font-bold">
                          82% Collected
                        </div>
                        <div className="px-3 py-1.5 bg-[#D4711A]/20 text-[#E88C32] text-xs rounded-lg font-bold">
                          + New Invoice
                        </div>
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[
                        { label: 'Total Billed', value: 'AED 12.8M', color: 'text-white' },
                        { label: 'Collected', value: 'AED 10.5M', color: 'text-emerald-400' },
                        { label: 'Pending', value: 'AED 1.8M', color: 'text-yellow-400' },
                        { label: 'Overdue', value: 'AED 0.5M', color: 'text-red-400' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-white/40 text-[10px] uppercase tracking-wider">{s.label}</div>
                          <div className={`text-lg font-bold font-heading mt-1 ${s.color}`}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white/3 rounded-xl border border-white/5 overflow-hidden">
                      <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-white/5 text-white/40 text-[10px] uppercase tracking-wider font-bold">
                        <span>Student</span>
                        <span>Class</span>
                        <span>Amount</span>
                        <span>Status</span>
                        <span>Action</span>
                      </div>
                      {feeInvoices.map((inv, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 px-4 py-3 border-t border-white/5 items-center">
                          <span className="text-white/80 text-sm">{inv.student}</span>
                          <span className="text-white/40 text-sm">{inv.class}</span>
                          <span className="text-white/70 text-sm font-bold">{inv.amount}</span>
                          <span>
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${inv.statusColor}`}>
                              {inv.status}
                            </span>
                          </span>
                          <span>
                            <span className="text-[#E88C32] text-xs cursor-pointer hover:underline">View &rarr;</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* === Attendance Dashboard Tab === */}
                {activeTab === 1 && (
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-white font-heading font-bold text-lg">Attendance Overview</h3>
                        <p className="text-white/30 text-xs mt-1">March 2026 &middot; Grade 10-A</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                          <span className="text-white/40 text-[10px]">Present</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                          <span className="text-white/40 text-[10px]">Absent</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500" />
                          <span className="text-white/40 text-[10px]">Late</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-white/10" />
                          <span className="text-white/40 text-[10px]">Holiday</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[
                        { label: 'Today Present', value: '38/42', pct: '90.5%', color: 'text-emerald-400' },
                        { label: 'Month Avg', value: '94.2%', pct: '', color: 'text-white' },
                        { label: 'Chronic Absent', value: '3 students', pct: '', color: 'text-red-400' },
                        { label: 'On Leave', value: '4', pct: '', color: 'text-yellow-400' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-white/40 text-[10px] uppercase tracking-wider">{s.label}</div>
                          <div className={`text-lg font-bold font-heading mt-1 ${s.color}`}>{s.value}</div>
                          {s.pct && <div className="text-white/30 text-[10px] mt-0.5">{s.pct}</div>}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Heatmap */}
                    <div className="bg-white/3 rounded-xl border border-white/5 p-4">
                      <div className="text-white/50 text-[10px] uppercase tracking-wider mb-3 font-bold">March 2026 &mdash; Heatmap</div>
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-1.5 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                          <div key={d} className="text-center text-white/25 text-[9px] font-bold">{d}</div>
                        ))}
                      </div>
                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1.5">
                        {/* Empty cells for alignment (March 2026 starts on Sunday) */}
                        {/* Week 1-5 */}
                        {Array.from({ length: 31 }, (_, i) => {
                          const day = i + 1;
                          const isFriday = (i % 7) === 5;
                          const isSaturday = (i % 7) === 6;
                          const isAbsent = [4, 11, 18].includes(day);
                          const isLate = [7, 14, 22].includes(day);
                          const isHoliday = isFriday || isSaturday;
                          const bg = isHoliday
                            ? 'bg-white/5'
                            : isAbsent
                              ? 'bg-red-500/70'
                              : isLate
                                ? 'bg-yellow-500/70'
                                : 'bg-emerald-500/70';
                          return (
                            <div
                              key={day}
                              className={`${bg} rounded-md aspect-square flex items-center justify-center text-white/60 text-[10px] font-bold transition-transform hover:scale-110`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* === Report Cards Tab === */}
                {activeTab === 2 && (
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-white font-heading font-bold text-lg">Student Report Card</h3>
                        <p className="text-white/30 text-xs mt-1">Aisha Rahman &middot; Grade 10-A &middot; Term 2</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-3 py-1.5 bg-white/5 text-white/50 text-xs rounded-lg border border-white/10">
                          Download PDF
                        </div>
                        <div className="px-3 py-1.5 bg-[#D4711A]/20 text-[#E88C32] text-xs rounded-lg font-bold">
                          Print
                        </div>
                      </div>
                    </div>

                    {/* Student Info Card */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white font-bold text-lg">
                            A
                          </div>
                          <div>
                            <div className="text-white font-heading font-bold">Aisha Rahman</div>
                            <div className="text-white/30 text-xs">Roll No: 2026-10A-07 &middot; DOB: 14 Mar 2012</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-white/40 text-[10px] uppercase tracking-wider">Overall Grade</div>
                          <div className="text-3xl font-bold font-heading text-emerald-400 mt-1">A</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/40 text-[10px] uppercase tracking-wider">Percentage</div>
                          <div className="text-3xl font-bold font-heading text-white mt-1">88%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/40 text-[10px] uppercase tracking-wider">Rank</div>
                          <div className="text-3xl font-bold font-heading text-[#E88C32] mt-1">7th</div>
                        </div>
                      </div>
                    </div>

                    {/* Subjects Table */}
                    <div className="bg-white/3 rounded-xl border border-white/5 overflow-hidden">
                      <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-white/5 text-white/40 text-[10px] uppercase tracking-wider font-bold">
                        <span>Subject</span>
                        <span className="text-center">Marks (100)</span>
                        <span className="text-center">Grade</span>
                        <span className="col-span-2">Teacher&apos;s Comment</span>
                      </div>
                      {reportCardSubjects.map((sub, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 px-4 py-3 border-t border-white/5 items-center">
                          <span className="text-white/80 text-sm font-bold">{sub.subject}</span>
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#D4711A] to-[#E88C32]"
                                style={{ width: `${sub.marks}%` }}
                              />
                            </div>
                            <span className="text-white/70 text-sm font-bold w-7 text-right">{sub.marks}</span>
                          </div>
                          <div className="text-center">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                              sub.grade.startsWith('A') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {sub.grade}
                            </span>
                          </div>
                          <span className="col-span-2 text-white/40 text-xs italic">&quot;{sub.comment}&quot;</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4: DATA FLOW VISUALIZATION
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <span className="section-label">Architecture</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mt-4 mb-6">
              Everything Connects to <span className="gradient-text">One Hub</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Data flows seamlessly between all 12 modules. When a student is admitted,
              their records propagate to fees, transport, attendance, and every other module automatically.
            </p>
          </motion.div>

          {/* Hub and Spoke */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={scaleIn}
            className="relative max-w-3xl mx-auto"
          >
            {/* Center Hub */}
            <div className="relative w-full aspect-square">
              {/* Orbit circles */}
              <div className="absolute inset-[15%] rounded-full border border-gray-200 border-dashed" />
              <div className="absolute inset-[5%] rounded-full border border-gray-100" />

              {/* Connecting lines - SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
                {hubModules.map((mod, i) => {
                  const radius = 240;
                  const angleRad = (mod.angle - 90) * (Math.PI / 180);
                  const x = 300 + radius * Math.cos(angleRad);
                  const y = 300 + radius * Math.sin(angleRad);
                  return (
                    <line
                      key={i}
                      x1="300"
                      y1="300"
                      x2={x}
                      y2={y}
                      stroke="#D4711A"
                      strokeWidth="1"
                      strokeOpacity="0.15"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center shadow-2xl shadow-[#D4711A]/30">
                  <div className="text-center">
                    <Settings className="w-8 h-8 text-white mx-auto mb-1" />
                    <span className="text-white text-xs font-bold font-heading">Cubico ERP</span>
                  </div>
                </div>
              </div>

              {/* Satellite modules */}
              {hubModules.map((mod, i) => {
                const radius = 40; // percentage
                const angleRad = (mod.angle - 90) * (Math.PI / 180);
                const x = 50 + radius * Math.cos(angleRad);
                const y = 50 + radius * Math.sin(angleRad);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="group flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white border border-gray-200 shadow-md flex items-center justify-center group-hover:border-[#D4711A]/40 group-hover:shadow-lg group-hover:shadow-[#D4711A]/10 transition-all duration-300">
                        <mod.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#D4711A] transition-colors" />
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 font-bold font-heading whitespace-nowrap">
                        {mod.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5: ROI IMPACT
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4711A]/8 rounded-full filter blur-[200px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="section-label-light">Impact</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              The ROI Speaks <span className="gradient-text">For Itself</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Schools switching from manual processes see transformative improvements
              within the first semester.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {roiData.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h4 className="text-white font-heading font-bold text-lg mb-5">{item.metric}</h4>

                {/* Before */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40 text-xs uppercase tracking-wider font-bold">Manual Process</span>
                    <span className="text-red-400 font-bold text-sm">{item.before}</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.beforePct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400/60"
                    />
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40 text-xs uppercase tracking-wider font-bold">With Cubico ERP</span>
                    <span className="text-emerald-400 font-bold text-sm">{item.after}</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.afterPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: STATS BANNER
          ══════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-[#D4711A] to-[#8B4513] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7: SECURITY & COMPLIANCE
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="section-label">Security</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mt-4 mb-6">
              Enterprise-Grade <span className="gradient-text">Security</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Student data is sacred. Our infrastructure is built with bank-level security
              so you never have to worry about breaches or compliance.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {securityFeatures.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D4711A]/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#D4711A]/10 transition-colors">
                  <feat.icon className="w-6 h-6 text-gray-600 group-hover:text-[#D4711A] transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8: TESTIMONIAL
          ══════════════════════════════════════════════ */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/5 rounded-full filter blur-[200px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            {/* Quotation mark */}
            <div className="text-[#D4711A]/20 text-8xl font-heading font-bold leading-none mb-6">&ldquo;</div>

            <blockquote className="text-xl md:text-2xl lg:text-3xl text-white/80 font-heading leading-relaxed mb-10">
              Before Cubico ERP, we had 6 different systems that never talked to each other.
              Fees in one, attendance in another, reports done manually in Excel.{' '}
              <span className="text-[#E88C32] font-bold">
                Within one semester, we cut admin overhead by 60% and our parent satisfaction
                scores went from 62% to 94%.
              </span>{' '}
              This system didn&apos;t just digitize our school — it transformed how we operate.
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <div className="text-left">
                <div className="text-white font-heading font-bold">Dr. Amina Al-Rashid</div>
                <div className="text-white/40 text-sm">Principal, Al Noor International School</div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mt-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-[#E88C32] fill-[#E88C32]" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 9: CTA
          ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4711A]/5 rounded-full filter blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="section-label">Get Started</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mt-4 mb-6">
              Streamline Your{' '}
              <span className="gradient-text">School Operations</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
              Join 760+ schools already running on Cubico ERP. Schedule a personalized demo
              and see how every module works with your real data.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Request a Demo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-outline text-lg px-10 py-4">
                See Pricing
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Free 30-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Full data migration support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
