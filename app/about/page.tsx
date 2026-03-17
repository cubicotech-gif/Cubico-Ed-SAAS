'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BookOpen,
  Award,
  Globe,
  Users,
  Lightbulb,
  Target,
  Zap,
  Shield,
  ArrowRight,
  Monitor,
  Film,
  CheckCircle2,
  Heart,
  TrendingUp,
  Clock,
  MapPin,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ── Animation Variants ── */
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

/* ── Data ── */
const timeline = [
  { year: '2019', title: 'The Spark', desc: 'Founded in Lahore with a mission to digitize Pakistani schools. First 12 schools onboarded with our LMS platform.', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
  { year: '2021', title: 'Animation Studio Launched', desc: 'Built an in-house 2D & 3D animation studio. First Urdu-language animated curriculum shipped to 80+ schools.', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80' },
  { year: '2022', title: 'Expanding to Saudi Arabia', desc: 'Partnered with private schools in Riyadh and Jeddah. Added Arabic content support and RTL platform capabilities.', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80' },
  { year: '2024', title: 'Canada & Full-Stack ERP', desc: 'Launched Cubico Manage™ ERP. Onboarded institutions in Ontario, Canada. Crossed 500+ active schools.', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80' },
  { year: '2025', title: '760+ Schools and Growing', desc: 'Five integrated products. 85K+ active students. 24/7 support across three time zones. The ecosystem is complete.', img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80' },
];

const team = [
  { name: 'Rooh Ul Hasnain', role: 'Founder & CEO', initials: 'RH', bio: 'Visionary leader driving Cubico\'s mission to transform education through technology. 12+ years in education and tech.', gradient: 'from-[#D4711A] to-[#E88C32]' },
  { name: 'Abdul Raffay Vohra', role: 'Co-Founder & CSO', initials: 'AV', bio: 'Strategic mind behind Cubico\'s growth. Expert in scaling EdTech solutions across emerging markets.', gradient: 'from-[#B85E15] to-[#D4711A]' },
  { name: 'Hassan Khan', role: 'Head of Engineering', initials: 'HK', bio: 'Led product at two EdTech startups before joining Cubico.', gradient: 'from-[#C0651A] to-[#E88C32]' },
  { name: 'Ayesha Malik', role: 'Creative Director', initials: 'AM', bio: 'Animation specialist. Designed curricula used by 200+ schools.', gradient: 'from-[#8B4513] to-[#D4711A]' },
  { name: 'Dr. Usman Tariq', role: 'Head of Curriculum', initials: 'UT', bio: 'PhD in Education. 20 years of curriculum design experience.', gradient: 'from-[#A0522D] to-[#C0651A]' },
  { name: 'Nadia Bukhari', role: 'VP Operations', initials: 'NB', bio: 'Manages onboarding for 100+ schools per quarter across 3 countries.', gradient: 'from-[#CD853F] to-[#D4711A]' },
];

const values = [
  { icon: Heart, title: 'Education First', desc: 'Every decision passes through one filter: does this help students learn better? If not, we don\'t build it.' },
  { icon: Users, title: 'Co-Created With Schools', desc: 'Our products are shaped by real principals, teachers, and IT heads — not just engineers in a room.' },
  { icon: Zap, title: 'Speed of Delivery', desc: 'We launch schools in 4 weeks — not 4 months. Because students can\'t wait for digital transformation.' },
  { icon: Shield, title: 'Long-Term Partnership', desc: '100% client retention. We don\'t just deploy and leave. Dedicated support and training, always.' },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        .shimmer-text {
          background:linear-gradient(90deg,#D4711A 0%,#E88C32 30%,#F4A94D 50%,#E88C32 70%,#D4711A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      <Header />

      {/* ═══════════ HERO — Full-width education image ═══════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2560&q=80"
          alt="Students graduating and celebrating education success"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(12,10,8,0.88) 0%, rgba(28,18,10,0.75) 40%, rgba(20,14,10,0.82) 70%, rgba(10,8,6,0.95) 100%)',
        }} />
        {/* Warm glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,140,50,0.12) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-32 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-400/25 bg-orange-900/20 backdrop-blur-sm text-orange-300">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              About Cubico
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.08]"
          >
            We build digital infrastructure<br className="hidden md:block" />
            <span className="shimmer-text">so schools can focus on teaching</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Cubico Technologies is a full-stack EdTech company serving 760+ institutions across
            Pakistan, Saudi Arabia & Canada. We replace disconnected tools with one intelligent
            platform — LMS, ERP, animated content, and marketing — all under one roof.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Shield, value: '760+', label: 'Schools Served' },
              { icon: Globe, value: '3', label: 'Countries' },
              { icon: Users, value: '85K+', label: 'Active Students' },
              { icon: Clock, value: '4 wk', label: 'Avg. Launch' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <stat.icon className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ OUR STORY — Timeline with images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
                Our Journey
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              From 12 schools in Lahore to<br className="hidden sm:block" />
              <span className="shimmer-text">760+ institutions across 3 countries</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              What started as frustration with broken school software became a mission to digitize every classroom we could reach.
            </motion.p>
          </motion.div>

          {/* Timeline with images */}
          <div className="space-y-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'md:direction-rtl' : ''}`}
              >
                {/* Image */}
                <div className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? 'md:order-2' : ''}`} style={{ aspectRatio: '16/10' }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-white bg-[#D4711A] px-3 py-1 rounded-full">{item.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? 'md:order-1 md:text-right' : ''}`}>
                  <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-[#D4711A] mb-2">{item.year}</span>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION & VALUES — with classroom image ═══════════ */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
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
                What Drives Us
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Built by educators.<br className="hidden sm:block" />
              <span className="shimmer-text">Powered by engineers.</span>
            </motion.h2>
          </motion.div>

          {/* Mission & Vision with image */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-xl"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                alt="Teacher helping students learn in a modern classroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-medium opacity-80">
                  &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4711A] to-[#E88C32]" />
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6 text-[#D4711A]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To be the leading EdTech infrastructure partner for schools in the Islamic world and beyond —
                  making quality digital education accessible to every student, regardless of geography or budget.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B85E15] to-[#D4711A]" />
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-[#B85E15]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Empower educational institutions with complete digital infrastructure — LMS, ERP, animated content,
                  and marketing — so teachers can teach, admins can manage, and students can thrive.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Core Values grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-[#D4711A] group-hover:text-white transition-colors">
                  <v.icon className="w-5 h-5 text-[#D4711A] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHAT WE DO — Products with images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                What We Build
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Five products. <span className="shimmer-text">One complete ecosystem.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto">
              Each tool is purpose-built for education. Together, they run an entire institution.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Monitor, name: 'Cubico Manage™', desc: 'All-in-one school ERP — admissions, attendance, finance, HR, and reporting in a single dashboard.', accent: '#D4711A', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
              { icon: BookOpen, name: 'Moodle LMS Setup', desc: 'Your branded Moodle platform — configured, hosted, and supported. Live in 2 weeks.', accent: '#E88C32', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80' },
              { icon: Lightbulb, name: 'Cubico Teach™', desc: 'Lesson plan builder, curriculum mapping, class analytics, and resource library for teachers.', accent: '#B85E15', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' },
              { icon: Film, name: 'Cubico Learn™', desc: '2D & 3D animated lessons in English, Arabic & Urdu with adaptive quizzes and interactive simulations.', accent: '#C0651A', img: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=600&q=80' },
              { icon: TrendingUp, name: 'Cubico Marketing™', desc: 'School websites, enrollment funnels, social media management, and SEO — fill every seat.', accent: '#8B4513', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80' },
            ].map((product, i) => (
              <motion.div
                key={product.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-default"
              >
                {/* Product image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: product.accent + 'DD' }}>
                      <product.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: product.accent }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ STATS RIBBON with background image ═══════════ */}
      <section className="py-16 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2560&q=80"
          alt="Books and education background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0A08]/90" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4711A]/12 rounded-full filter blur-[110px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B4513]/10 rounded-full filter blur-[110px]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '760+', label: 'Schools Served', sub: 'Across 3 countries' },
              { value: '85K+', label: 'Active Students', sub: 'Learning daily on Cubico' },
              { value: '99.9%', label: 'Uptime', sub: 'Enterprise-grade reliability' },
              { value: '100%', label: 'Client Retention', sub: 'Zero churn since 2019' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="stat-number text-3xl md:text-4xl text-white mb-1">{s.value}</div>
                <p className="text-[#E88C32] text-xs font-bold tracking-wider uppercase mb-0.5">{s.label}</p>
                <p className="text-white/35 text-[11px]">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHERE WE OPERATE — with country images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                Global Presence
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Three countries. <span className="shimmer-text">Three languages. One standard.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { country: 'Pakistan', cities: 'Lahore, Karachi, Islamabad', schools: '480+', languages: 'English & Urdu', accent: '#D4711A', img: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=600&q=80' },
              { country: 'Saudi Arabia', cities: 'Riyadh, Jeddah, Dammam', schools: '220+', languages: 'Arabic & English', accent: '#B85E15', img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=80' },
              { country: 'Canada', cities: 'Toronto, Ottawa, Calgary', schools: '60+', languages: 'English & French', accent: '#8B4513', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80' },
            ].map((loc, i) => (
              <motion.div
                key={loc.country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-default"
              >
                {/* Country image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={loc.img}
                    alt={`${loc.country} - schools and education`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-xl font-heading font-bold text-white">{loc.country}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.cities}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.schools} schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.languages}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEAM ═══════════ */}
      <section className="py-24 bg-surface-light">
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
                Our Team
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Educators, engineers, and <span className="shimmer-text">problem solvers</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto">
              A team that&apos;s run classrooms, built platforms, and shipped products to hundreds of schools.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-[#D4711A] font-semibold">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHY SCHOOLS CHOOSE US — with image ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  Why Cubico
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                What makes us different from<br className="hidden sm:block" />
                <span className="shimmer-text">every other EdTech company</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Most EdTech vendors sell you a tool and disappear. We deploy complete digital infrastructure,
                train your entire staff, and provide ongoing support — because technology without adoption is just expensive shelf-ware.
              </motion.p>

              <motion.div variants={fadeUp} custom={3}>
                <a href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25">
                  Book a Free Demo <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right — image + checklist overlay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Feature image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6" style={{ aspectRatio: '16/9' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Students collaborating with technology in a modern classroom"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {[
                { title: 'Full-stack, not point-solution', desc: 'LMS + ERP + Animation + Marketing — you don\'t need 4 vendors anymore.' },
                { title: 'Deploy in 4 weeks, not 4 months', desc: 'Our onboarding playbook is battle-tested across 760+ schools.' },
                { title: 'Built for Islamic & multicultural schools', desc: 'Arabic, Urdu, English. RTL support. Curriculum-aligned content.' },
                { title: 'Dedicated account manager, always', desc: '24/7 support across PK, SA & CA time zones. 100% client retention.' },
                { title: 'Co-created with real principals & teachers', desc: 'Every feature ships after testing in real classrooms, not just demos.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4711A]/20 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4711A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
