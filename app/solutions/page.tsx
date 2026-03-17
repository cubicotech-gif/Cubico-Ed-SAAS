'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Film,
  Monitor,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const solutions = [
  {
    icon: BookOpen,
    title: 'Smart LMS',
    slug: 'smart-lms',
    tagline: 'Next-Gen Learning Management',
    desc: 'A Moodle-powered learning management system built for K-12 and higher education. Gamified courses, AI analytics, multilingual content in English, Arabic & Urdu — all from one dashboard.',
    stats: ['500+ courses deployed', '98% uptime SLA', '3 languages supported'],
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
    mockupBg: 'from-violet-500/10 via-purple-500/5 to-transparent',
  },
  {
    icon: Film,
    title: 'Animation Studio',
    slug: 'animation-studio',
    tagline: 'Bring Lessons to Life',
    desc: 'Professional 2D & 3D animated educational content that transforms complex subjects into visual stories. From science experiments to Islamic studies — created in-house by our creative team.',
    stats: ['2,000+ animations', '3 languages', 'K-12 curriculum aligned'],
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-600',
    mockupBg: 'from-rose-500/10 via-pink-500/5 to-transparent',
  },
  {
    icon: Monitor,
    title: 'School ERP',
    slug: 'school-erp',
    tagline: 'One System, Zero Chaos',
    desc: 'End-to-end school management covering admissions, fee collection, HR & payroll, timetabling, exam management, and parent communication — all connected in real-time.',
    stats: ['12 integrated modules', '50% time saved', '760+ schools'],
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    mockupBg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
  {
    icon: Globe,
    title: 'Web Development',
    slug: 'web-development',
    tagline: 'Your Digital Front Door',
    desc: 'Stunning, fast, SEO-optimized websites and portals purpose-built for educational institutions. From landing pages to full-featured admission portals with integrated payment gateways.',
    stats: ['< 2s load time', 'SEO optimized', 'Mobile-first'],
    color: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    mockupBg: 'from-blue-500/10 via-cyan-500/5 to-transparent',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    tagline: 'School in Every Pocket',
    desc: 'Cross-platform mobile applications for students, parents, and administrators. Real-time attendance, push notifications, grade tracking, and fee payments — all at your fingertips.',
    stats: ['iOS & Android', '50k+ downloads', '4.8★ rating'],
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    mockupBg: 'from-amber-500/10 via-orange-500/5 to-transparent',
  },
];

const impactStats = [
  { number: '760+', label: 'Schools Powered', icon: Shield },
  { number: '250K+', label: 'Students Learning', icon: Users },
  { number: '3', label: 'Countries', icon: Globe },
  { number: '99.9%', label: 'Uptime Guarantee', icon: Zap },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4711A]/15 rounded-full filter blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8B4513]/10 rounded-full filter blur-[140px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#E88C32]" />
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                Complete EdTech Ecosystem
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight"
            >
              Solutions That{' '}
              <span className="gradient-text">Transform</span>
              <br />
              How Schools Operate
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/55 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              From learning management to animated content, from school ERP to mobile apps —
              we build the entire digital backbone your institution needs to thrive in the modern age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact" className="btn-primary text-lg px-10">
                Schedule a Demo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-outline-white text-lg px-10">
                View Pricing
              </Link>
            </motion.div>
          </div>

          {/* Impact Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 text-[#E88C32] mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Solutions Showcase ── */}
      <section className="py-0">
        {solutions.map((sol, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={sol.slug}
              className={`py-24 lg:py-32 ${isEven ? 'bg-white' : 'bg-surface-light'} relative overflow-hidden`}
            >
              {/* Decorative dots */}
              {isEven && (
                <div className="absolute top-0 right-0 w-96 h-96 bg-dots opacity-30" />
              )}

              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className={!isEven ? 'lg:col-start-2' : ''}
                  >
                    <div className={`inline-flex items-center gap-2 ${sol.bgLight} rounded-full px-4 py-1.5 mb-6`}>
                      <sol.icon className={`w-4 h-4 ${sol.textColor}`} />
                      <span className={`${sol.textColor} text-xs font-bold tracking-wider uppercase`}>
                        {sol.tagline}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                      {sol.title}
                    </h2>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                      {sol.desc}
                    </p>

                    <div className="space-y-3 mb-10">
                      {sol.stats.map((stat) => (
                        <div key={stat} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/solutions/${sol.slug}`}
                      className="btn-primary inline-flex"
                    >
                      Explore {sol.title} <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>

                  {/* Mockup Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                  >
                    <div className={`relative bg-gradient-to-br ${sol.mockupBg} rounded-3xl p-8 lg:p-10`}>
                      {/* Browser Mockup */}
                      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-gray-100">
                        {/* Browser Bar */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                          </div>
                          <div className="flex-1 ml-3">
                            <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-400 border border-gray-200 max-w-xs">
                              cubico.tech/{sol.slug}
                            </div>
                          </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 space-y-4">
                          {/* Header row */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="h-3 w-32 bg-gray-200 rounded-full mb-2" />
                              <div className="h-2 w-20 bg-gray-100 rounded-full" />
                            </div>
                            <div className={`h-8 w-24 bg-gradient-to-r ${sol.color} rounded-lg`} />
                          </div>

                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="p-3 bg-gray-50 rounded-xl">
                                <div className={`h-8 w-12 bg-gradient-to-r ${sol.color} rounded-lg mb-2 opacity-80`} />
                                <div className="h-2 w-full bg-gray-200 rounded-full mb-1" />
                                <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                              </div>
                            ))}
                          </div>

                          {/* Chart area */}
                          <div className="bg-gray-50 rounded-xl p-4 h-32 flex items-end gap-2">
                            {[40, 65, 45, 80, 55, 70, 90, 60, 85, 50, 75, 95].map((h, i) => (
                              <div
                                key={i}
                                className={`flex-1 bg-gradient-to-t ${sol.color} rounded-t-md opacity-70`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>

                          {/* Table rows */}
                          <div className="space-y-2">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="flex items-center gap-3 p-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="h-2 w-3/4 bg-gray-100 rounded-full mb-1" />
                                  <div className="h-2 w-1/2 bg-gray-50 rounded-full" />
                                </div>
                                <div className={`h-6 w-16 bg-gradient-to-r ${sol.color} rounded-full opacity-20`} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating badge */}
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center`}>
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Performance</div>
                            <div className="text-lg font-heading font-bold text-gray-900">+47%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* ── Why Cubico ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/8 rounded-full filter blur-[200px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label section-label-light mb-4 block text-center justify-center">
              Why Choose Cubico
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              One Partner. <span className="gradient-text">Every Solution.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-16">
              Instead of juggling 5 vendors, you get a single team that understands education
              and delivers everything — from code to content to cloud.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: 'End-to-End Ownership', desc: 'We design, build, deploy, host, and support. No finger-pointing between vendors.' },
              { icon: Globe, title: 'Multilingual by Default', desc: 'Every product supports English, Arabic, and Urdu — with RTL layouts baked in.' },
              { icon: Zap, title: '4-Week Deployment', desc: 'Our modular approach means you go live in weeks, not months. We move fast.' },
              { icon: Users, title: 'Education-First Thinking', desc: "We don't repurpose corporate software. Every pixel is designed for schools." },
              { icon: TrendingUp, title: 'Data-Driven Insights', desc: 'Built-in analytics across every product give you the visibility you need.' },
              { icon: Sparkles, title: 'Always Evolving', desc: 'Quarterly feature releases mean your platform keeps getting better — included in your plan.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="card-dark text-left"
              >
                <div className="icon-box-white mb-5 w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#E88C32]" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Ready to Modernize Your <span className="gradient-text">School?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
              Book a free 30-minute consultation. We&apos;ll map your needs and show you exactly
              how Cubico can transform your institution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-outline text-lg px-10">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
