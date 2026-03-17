'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Megaphone,
  Share2,
  Mail,
  Search,
  Palette,
  Video,
  CheckCircle2,
  Star,
  Quote,
  TrendingUp,
  BarChart3,
  Users,
  Globe,
  Eye,
  MousePointerClick,
  GraduationCap,
  Heart,
  MessageCircle,
  Repeat2,
  MapPin,
  Play,
  Target,
  Lightbulb,
  Rocket,
  Settings,
  ChevronRight,
  Instagram,
  Facebook,
  ThumbsUp,
  Calendar,
  Clock,
  Zap,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState } from 'react';

/* ===================================================
   ANIMATION VARIANTS
   =================================================== */
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

/* ===================================================
   DATA
   =================================================== */
const services = [
  {
    icon: Megaphone,
    title: 'Enrollment Campaigns',
    desc: 'Targeted Google Ads and Meta campaigns designed around admissions season. We build high-converting landing pages, retargeting funnels, and lookalike audiences to fill every seat.',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'Full-service content calendar, community management, and paid social strategy across Instagram, Facebook, LinkedIn, and TikTok. Build a loyal parent community online.',
  },
  {
    icon: Mail,
    title: 'Email Automation',
    desc: 'Drip campaigns for prospective families, newsletter management for current parents, and re-engagement sequences for alumni. Personalized at scale with A/B testing.',
  },
  {
    icon: Search,
    title: 'SEO & Content Marketing',
    desc: 'Dominate local search results with optimized blog strategy, Google Business Profile management, citation building, and keyword-targeted content that drives organic traffic.',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'Comprehensive brand development including logo design, color systems, typography, stationery, signage, and digital brand guidelines that set your school apart.',
  },
  {
    icon: Video,
    title: 'Video Marketing',
    desc: 'Promotional videos, virtual campus tours, student testimonials, and short-form social content. Professional production that captures your school\'s unique culture.',
  },
];

const funnelStages = [
  { stage: 'Awareness', count: '50,000', desc: 'Impressions & reach', width: '100%', color: '#D4711A' },
  { stage: 'Interest', count: '12,000', desc: 'Website visits', width: '80%', color: '#C46218' },
  { stage: 'Consideration', count: '3,500', desc: 'Inquiry forms', width: '60%', color: '#A85215' },
  { stage: 'Application', count: '800', desc: 'Applications started', width: '40%', color: '#8B4513' },
  { stage: 'Enrollment', count: '450', desc: 'Students enrolled', width: '25%', color: '#6B3410' },
];

const campaignData = [
  { name: 'Spring Admissions 2025', status: 'Active', budget: '$4,500', spent: '$3,200', leads: 342, cpl: '$9.36', color: '#10B981' },
  { name: 'Open Day Promotion', status: 'Active', budget: '$1,200', spent: '$890', leads: 156, cpl: '$5.71', color: '#10B981' },
  { name: 'Summer Camp Drive', status: 'Paused', budget: '$2,000', spent: '$1,100', leads: 89, cpl: '$12.36', color: '#F59E0B' },
  { name: 'Fall Semester Launch', status: 'Completed', budget: '$6,000', spent: '$5,980', leads: 520, cpl: '$11.50', color: '#6366F1' },
];

const processSteps = [
  { icon: Search, title: 'Audit', desc: 'We analyze your current marketing, competitors, and local market to identify gaps and opportunities.' },
  { icon: Target, title: 'Strategy', desc: 'Custom marketing plan with channel mix, budget allocation, content themes, and enrollment targets.' },
  { icon: Lightbulb, title: 'Create', desc: 'Our creative team produces ad copy, visuals, videos, landing pages, and email sequences.' },
  { icon: Rocket, title: 'Launch', desc: 'Campaigns go live across all channels with precise targeting, tracking pixels, and UTM parameters.' },
  { icon: Settings, title: 'Optimize', desc: 'Continuous A/B testing, bid optimization, audience refinement, and monthly performance reviews.' },
];

const stats = [
  { number: '45%', label: 'Avg Enrollment Increase' },
  { number: '200+', label: 'Campaigns Managed' },
  { number: '10M+', label: 'Impressions Delivered' },
  { number: '3', label: 'Countries Served' },
];

/* ===================================================
   ANIMATED COUNTER COMPONENT
   =================================================== */
function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ===================================================
   HERO DASHBOARD MOCKUP
   =================================================== */
function HeroDashboardMockup() {
  return (
    <div className="bg-[#1E1408] border border-[#2A1A0C] rounded-2xl p-4 shadow-2xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D4711A]" />
          <span className="text-[10px] font-semibold text-white">Marketing Dashboard</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Impressions', value: '1.2M', change: '+24%', icon: Eye },
          { label: 'Clicks', value: '48.5K', change: '+18%', icon: MousePointerClick },
          { label: 'Enrollments', value: '342', change: '+45%', icon: GraduationCap },
        ].map((m) => (
          <div key={m.label} className="bg-[#140E06] rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-1">
              <m.icon className="w-3 h-3 text-[#D4711A]" />
              <span className="text-[7px] text-green-400 font-medium">{m.change}</span>
            </div>
            <div className="text-sm font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{m.value}</div>
            <div className="text-[7px] text-[#8E7A65]">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Enrollment Growth Graph */}
      <div className="bg-[#140E06] rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-semibold text-white">Enrollment Growth</span>
          <span className="text-[7px] text-[#D4711A]">Last 12 months</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[30, 35, 28, 42, 50, 45, 58, 62, 55, 70, 78, 90].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{
                background: i >= 10 ? '#D4711A' : i >= 8 ? '#C46218' : '#8B4513',
                height: `${h}%`,
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m) => (
            <span key={m} className="text-[5px] text-[#8E7A65] flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>

      {/* Social Media Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { platform: 'Instagram', followers: '12.4K', growth: '+850', color: '#E1306C' },
          { platform: 'Facebook', followers: '8.2K', growth: '+340', color: '#1877F2' },
          { platform: 'LinkedIn', followers: '3.1K', growth: '+120', color: '#0A66C2' },
        ].map((s) => (
          <div key={s.platform} className="bg-[#140E06] rounded-lg p-2 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: s.color + '25' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            </div>
            <div>
              <div className="text-[7px] font-bold text-white">{s.followers}</div>
              <div className="text-[5px] text-green-400">{s.growth}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================================================
   CAMPAIGN DASHBOARD MOCKUP
   =================================================== */
function CampaignDashboardMockup() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Dashboard header */}
      <div className="bg-[#0F0A04] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D4711A]" />
          <span className="text-xs font-semibold text-white">Cubico Campaign Manager</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
      </div>

      <div className="p-5">
        {/* Performance metrics row */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total Spend', value: '$11,170', icon: BarChart3, change: '-8% vs last month' },
            { label: 'Total Leads', value: '1,107', icon: Users, change: '+32% vs last month' },
            { label: 'Avg CPL', value: '$10.09', icon: TrendingUp, change: '-15% vs last month' },
            { label: 'Conversion Rate', value: '4.8%', icon: Target, change: '+0.6% vs last month' },
          ].map((m) => (
            <div key={m.label} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <m.icon className="w-3.5 h-3.5 text-[#D4711A]" />
                <span className="text-[10px] text-gray-500">{m.label}</span>
              </div>
              <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Clash Display, sans-serif' }}>{m.value}</div>
              <div className="text-[9px] text-green-600 mt-0.5">{m.change}</div>
            </div>
          ))}
        </div>

        {/* Campaign list */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-700 mb-2">Active Campaigns</div>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-6 gap-2 px-3 py-2 bg-gray-50 text-[9px] font-medium text-gray-500">
              <span className="col-span-2">Campaign</span>
              <span>Status</span>
              <span>Budget</span>
              <span>Leads</span>
              <span>CPL</span>
            </div>
            {campaignData.map((c) => (
              <div key={c.name} className="grid grid-cols-6 gap-2 px-3 py-2 border-t border-gray-50 items-center">
                <span className="col-span-2 text-[10px] font-medium text-gray-800 truncate">{c.name}</span>
                <span>
                  <span
                    className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.status}
                  </span>
                </span>
                <span className="text-[10px] text-gray-600">{c.spent}/{c.budget}</span>
                <span className="text-[10px] font-semibold text-gray-800">{c.leads}</span>
                <span className="text-[10px] text-gray-600">{c.cpl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* ROI Graph */}
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-700 mb-2">ROI by Channel</div>
            <div className="space-y-2">
              {[
                { channel: 'Google Ads', roi: '4.2x', width: '84%', color: '#D4711A' },
                { channel: 'Meta Ads', roi: '3.8x', width: '76%', color: '#1877F2' },
                { channel: 'Email', roi: '6.1x', width: '100%', color: '#10B981' },
                { channel: 'SEO', roi: '5.5x', width: '90%', color: '#6366F1' },
              ].map((ch) => (
                <div key={ch.channel}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[9px] text-gray-600">{ch.channel}</span>
                    <span className="text-[9px] font-bold" style={{ color: ch.color }}>{ch.roi}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: ch.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: ch.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Heat Map */}
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-700 mb-2">Lead Sources by Region</div>
            <div className="space-y-1.5">
              {[
                { region: 'Downtown District', leads: 245, pct: 35 },
                { region: 'North Suburbs', leads: 189, pct: 27 },
                { region: 'East Valley', leads: 142, pct: 20 },
                { region: 'West Hills', leads: 87, pct: 12 },
                { region: 'South County', leads: 44, pct: 6 },
              ].map((r, i) => (
                <div key={r.region} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{
                    backgroundColor: `rgba(212, 113, 26, ${0.2 + (4 - i) * 0.2})`,
                  }}>
                    <MapPin className="w-2 h-2" style={{ color: `rgba(212, 113, 26, ${0.5 + (4 - i) * 0.12})` }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-[8px] text-gray-700">{r.region}</span>
                      <span className="text-[8px] font-semibold text-gray-800">{r.leads}</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full rounded-full bg-[#D4711A]" style={{ width: `${r.pct}%`, opacity: 0.4 + (4 - i) * 0.15 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   SOCIAL MEDIA MOCKUPS
   =================================================== */
function InstagramPostMockup() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden max-w-xs mx-auto">
      {/* Post header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center">
          <span className="text-[7px] font-bold text-white">GA</span>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-gray-900">greenfield_academy</div>
          <div className="text-[8px] text-gray-500">Sponsored</div>
        </div>
      </div>

      {/* Post image area */}
      <div className="relative aspect-square bg-gradient-to-br from-[#D4711A] via-[#E88C32] to-[#F4A261] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Now Enrolling</div>
          <div className="text-white font-bold text-xl leading-tight mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Shape Your Child&apos;s Future
          </div>
          <div className="text-white/80 text-[10px] mb-3">Classes starting September 2025</div>
          <div className="inline-block bg-white text-[#D4711A] text-[9px] font-bold px-3 py-1.5 rounded-full">
            Apply Now
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full" />
        <div className="absolute bottom-6 right-4 w-12 h-12 border-2 border-white/15 rounded-full" />
      </div>

      {/* Engagement bar */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 mb-1.5">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <MessageCircle className="w-4 h-4 text-gray-700" />
          <Repeat2 className="w-4 h-4 text-gray-700" />
        </div>
        <div className="text-[10px] font-semibold text-gray-900">2,847 likes</div>
        <div className="text-[9px] text-gray-600 mt-0.5">
          <span className="font-semibold text-gray-900">greenfield_academy</span> Discover a world of possibilities for your child. Limited seats available for 2025-26. Link in bio.
        </div>
        <div className="text-[8px] text-gray-400 mt-1">View all 134 comments</div>
      </div>
    </div>
  );
}

function FacebookAdMockup() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden max-w-xs mx-auto">
      {/* Ad header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">GA</span>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-900">Greenfield Academy</div>
          <div className="text-[8px] text-gray-500 flex items-center gap-1">
            Sponsored <Globe className="w-2 h-2" />
          </div>
        </div>
      </div>

      {/* Ad text */}
      <div className="px-3 pb-2">
        <p className="text-[10px] text-gray-800 leading-relaxed">
          Open Day this Saturday! Tour our campus, meet teachers, and discover our award-winning STEM program. Register now for a free spot.
        </p>
      </div>

      {/* Ad image area */}
      <div className="relative aspect-video bg-gradient-to-br from-[#1a0f06] to-[#2A1A0C] flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-8 h-8 text-[#D4711A] mx-auto mb-2" />
          <div className="text-white font-bold text-sm" style={{ fontFamily: 'Clash Display, sans-serif' }}>Open Day</div>
          <div className="text-[#C8A888] text-[9px] mt-0.5">Saturday, March 22 | 9 AM - 2 PM</div>
        </div>
      </div>

      {/* CTA bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div>
          <div className="text-[8px] text-gray-500">greenfieldacademy.edu</div>
          <div className="text-[10px] font-semibold text-gray-900">Register for Open Day</div>
        </div>
        <div className="bg-[#1877F2] text-white text-[9px] font-semibold px-3 py-1.5 rounded">
          Sign Up
        </div>
      </div>

      {/* Engagement stats */}
      <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-500">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-3 h-3 text-[#1877F2]" />
          <span>1.2K</span>
        </div>
        <div>284 comments &middot; 156 shares</div>
      </div>
    </div>
  );
}

/* ===================================================
   MAIN PAGE COMPONENT
   =================================================== */
export default function DigitalMarketingPage() {
  return (
    <>
      <Header />

      {/* ==============================================
          SECTION 1: HERO
          ============================================== */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4711A]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8B4513]/5 rounded-full blur-[100px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div variants={slideInLeft} initial="hidden" animate="visible">
              <span className="section-label-light inline-block mb-6">
                Digital Marketing for Schools
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                Fill Every Seat,{' '}
                <span className="gradient-text">Every Semester</span>
              </h1>

              <p className="text-lg text-[#C8A888] max-w-lg mb-8 leading-relaxed">
                Data-driven enrollment campaigns, social media strategies, and brand building
                designed exclusively for educational institutions. We turn digital impressions
                into enrolled students.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Boost Enrollment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#results" className="btn-outline-white">
                  See Our Results <TrendingUp className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { val: '45%', lbl: 'Avg Growth' },
                  { val: '200+', lbl: 'Campaigns' },
                  { val: '10M+', lbl: 'Impressions' },
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

            {/* Right: Dashboard Mockup */}
            <motion.div variants={slideInRight} initial="hidden" animate="visible">
              <HeroDashboardMockup />
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-[#1E1408] border border-[#2A1A0C] rounded-xl px-4 py-2.5 shadow-xl hidden lg:flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">+45%</div>
                  <div className="text-[10px] text-[#8E7A65]">Enrollment</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================================
          SECTION 2: SERVICES GRID (6 cards)
          ============================================== */}
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
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Full-Spectrum School{' '}
              <span className="gradient-text">Marketing</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Everything your institution needs to attract, engage, and enroll families — all under one roof.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i} className="card-white group">
                <div className="icon-box mb-5">
                  <s.icon className="w-6 h-6 text-[#D4711A]" />
                </div>
                <h3 className="text-xl font-bold text-[#2A1E14] mb-3 group-hover:text-[#D4711A] transition-colors" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==============================================
          SECTION 3: MARKETING FUNNEL VISUALIZATION
          ============================================== */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/3 rounded-full blur-[200px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-light inline-block mb-4">Enrollment Funnel</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              From Impressions to{' '}
              <span className="gradient-text">Enrollment</span>
            </h2>
            <p className="text-[#C8A888] text-lg">
              We optimize every stage of the enrollment funnel to maximize your return on marketing spend.
            </p>
          </motion.div>

          {/* Funnel */}
          <div className="space-y-2 max-w-2xl mx-auto">
            {funnelStages.map((f, i) => (
              <motion.div
                key={f.stage}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div
                  className="relative rounded-lg py-4 px-6 flex items-center justify-between mx-auto"
                  style={{
                    width: f.width,
                    backgroundColor: f.color,
                    minWidth: '200px',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/50 text-xs font-medium">0{i + 1}</span>
                    <span className="text-white font-semibold text-sm">{f.stage}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg" style={{ fontFamily: 'Clash Display, sans-serif' }}>{f.count}</div>
                    <div className="text-white/60 text-[10px]">{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Conversion arrows */}
          <div className="flex justify-center mt-6 gap-3">
            {['24%', '29%', '23%', '56%'].map((rate, i) => (
              <motion.div
                key={i}
                className="bg-[#1E1408] border border-[#2A1A0C] rounded-lg px-3 py-1.5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              >
                <div className="text-[#D4711A] text-xs font-bold">{rate}</div>
                <div className="text-[8px] text-[#8E7A65]">conversion</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          SECTION 4: CAMPAIGN DASHBOARD MOCKUP
          ============================================== */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="section-label inline-block mb-4">Campaign Management</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                Every Campaign,{' '}
                <span className="gradient-text">One Dashboard</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Real-time visibility into all your marketing campaigns. Track spend, leads, cost per enrollment,
                and ROI across every channel from a single dashboard.
              </p>
              <div className="space-y-4">
                {[
                  'Live campaign performance tracking with status badges',
                  'ROI breakdown by channel: Google, Meta, Email, SEO',
                  'Geographic lead source mapping for local targeting',
                  'Automated budget optimization and bid management',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4711A] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <CampaignDashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================================
          SECTION 5: SOCIAL MEDIA MOCKUPS
          ============================================== */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E1306C]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1877F2]/5 rounded-full blur-[150px]" />
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
            <span className="section-label-light inline-block mb-4">Social Media</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Scroll-Stopping Content{' '}
              <span className="gradient-text">That Converts</span>
            </h2>
            <p className="text-[#C8A888] text-lg">
              We create thumb-stopping social content that builds your brand and drives enrollment inquiries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl mx-auto items-start">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <span className="text-[#C8A888] text-xs font-medium uppercase tracking-wider">Instagram Post</span>
              </div>
              <InstagramPostMockup />
              {/* Engagement stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Reach', value: '24.5K' },
                  { label: 'Engagement', value: '8.2%' },
                  { label: 'Saves', value: '412' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#1E1408] border border-[#2A1A0C] rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{s.value}</div>
                    <div className="text-[9px] text-[#8E7A65]">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <span className="text-[#C8A888] text-xs font-medium uppercase tracking-wider">Facebook Ad</span>
              </div>
              <FacebookAdMockup />
              {/* Ad metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Impressions', value: '52K' },
                  { label: 'CTR', value: '3.4%' },
                  { label: 'Registrations', value: '186' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#1E1408] border border-[#2A1A0C] rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{s.value}</div>
                    <div className="text-[9px] text-[#8E7A65]">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================================
          SECTION 6: RESULTS - Before/After Metrics
          ============================================== */}
      <section id="results" className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Proven Results</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              The Numbers{' '}
              <span className="gradient-text">Speak</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Average results across our school marketing clients in the first 12 months.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: 'Enrollment Increase', value: 45, suffix: '%', prefix: '+', color: '#10B981', desc: 'Average across all clients' },
              { label: 'Social Following', value: 10, suffix: 'x', prefix: '', color: '#D4711A', desc: 'Growth in followers' },
              { label: 'Website Traffic', value: 200, suffix: '%', prefix: '+', color: '#6366F1', desc: 'Increase in organic visits' },
              { label: 'Cost per Enrollment', value: 60, suffix: '%', prefix: '-', color: '#EF4444', desc: 'Reduction in acquisition cost' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                custom={i}
                className="card-white text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: m.color + '15' }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'Clash Display, sans-serif', color: m.color }}>
                  <AnimatedCounter end={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <h3 className="text-lg font-semibold text-[#2A1E14] mb-1">{m.label}</h3>
                <p className="text-sm text-gray-500">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==============================================
          SECTION 7: STATS - Dark Section
          ============================================== */}
      <section className="py-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4711A]/10 via-transparent to-[#8B4513]/10" />
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {s.number}
                </div>
                <div className="text-[#C8A888] text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==============================================
          SECTION 8: OUR PROCESS - 5 Steps
          ============================================== */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Our Process</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2A1E14] mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              From Audit to{' '}
              <span className="gradient-text">Optimization</span>
            </h2>
            <p className="text-gray-600 text-lg">
              A proven five-step methodology that turns marketing spend into enrolled students.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4711A]/20 via-[#D4711A] to-[#D4711A]/20" />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {processSteps.map((step, i) => (
                <motion.div key={step.title} variants={fadeUp} custom={i} className="text-center relative">
                  {/* Step number circle */}
                  <div className="relative mx-auto mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#D4711A]/20 flex items-center justify-center mx-auto shadow-lg relative z-10 group-hover:border-[#D4711A] transition-colors">
                      <step.icon className="w-7 h-7 text-[#D4711A]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D4711A] text-white text-[10px] font-bold flex items-center justify-center z-20">
                      {i + 1}
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-4 z-20">
                      <ChevronRight className="w-5 h-5 text-[#D4711A]" />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[#2A1E14] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================================
          SECTION 9: TESTIMONIAL
          ============================================== */}
      <section className="py-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#D4711A]/3 rounded-full blur-[200px]" />
        </div>
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-[#D4711A] mx-auto mb-8 opacity-60" />
            <blockquote className="text-2xl sm:text-3xl text-white font-medium leading-relaxed mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              &ldquo;Before Cubico, we were spending heavily on print ads with no way to track results.
              In our first year with their digital marketing team, enrollment jumped 52% and our cost per
              acquisition dropped by half. They truly understand the education space.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#8B4513] flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Sarah Al-Mansouri</div>
                <div className="text-[#8E7A65] text-sm">Marketing Director, Horizon International School</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4711A] fill-[#D4711A]" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==============================================
          SECTION 10: CTA
          ============================================== */}
      <section className="py-28 bg-[#FDF8F3] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label inline-block mb-4">Get Started</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2A1E14] mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Boost Your School&apos;s{' '}
              <span className="gradient-text">Enrollment</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule a free marketing audit and discover how we can help your institution
              attract more families, build a stronger brand, and fill every seat.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Book a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-outline">
                View Pricing <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { icon: Award, text: 'Google Partner' },
                { icon: Zap, text: 'Meta Business Partner' },
                { icon: Clock, text: 'Results in 90 Days' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-gray-500">
                  <t.icon className="w-4 h-4 text-[#D4711A]" />
                  <span className="text-sm">{t.text}</span>
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
