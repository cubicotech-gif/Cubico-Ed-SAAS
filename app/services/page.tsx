'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  Film,
  Monitor,
  Globe,
  Smartphone,
  Cloud,
  Mail,
  Users,
  ArrowRight,
  Star,
  Zap,
  Layout,
  Settings,
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  { icon: BarChart3, title: 'LMS Implementation', desc: 'Complete Moodle-based learning management system customized for your institution with analytics and reporting.' },
  { icon: Film, title: 'Animation Studio', desc: 'Professional 2D/3D animated educational content in English, Arabic & Urdu for engaging learning experiences.' },
  { icon: Monitor, title: 'School ERP System', desc: 'Comprehensive school management covering admissions, HR, finance, attendance and detailed reporting.' },
  { icon: Globe, title: 'Web Development', desc: 'Modern, responsive websites and web applications built specifically for the education sector.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile applications for students, parents and administrators with real-time updates.' },
  { icon: Cloud, title: 'Cloud Hosting', desc: 'Reliable cloud infrastructure with 99.9% uptime, automatic backups and global CDN delivery.' },
  { icon: Mail, title: 'Digital Marketing', desc: 'Strategic digital marketing campaigns to increase enrollment, engagement and brand awareness.' },
  { icon: Users, title: 'Teacher Training', desc: 'Professional development programs for educators on digital tools, pedagogy and platform usage.' },
];

const features = [
  { icon: Users, title: 'Strengthen Student Engagement', desc: 'Interactive tools and animated content that keep students engaged and motivated to learn.' },
  { icon: Layout, title: 'Centralize All School Data', desc: 'Single platform for all administrative and academic data with powerful analytics.' },
  { icon: Zap, title: 'Enhance Team Productivity', desc: 'Streamline workflows, automate tasks and free up time for what matters — teaching.' },
];

export default function ServicesPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full filter blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-light font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Where innovation meets experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-10"
          >
            Comprehensive digital solutions designed specifically for the education sector, delivered with expertise and care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/contact" className="btn-primary text-lg">
              Discover More <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-white relative -mt-8 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: BarChart3, title: 'Analytics App', desc: 'AI-powered analytics for tracking student performance, engagement and institutional KPIs.', color: 'bg-purple-50 text-purple-600' },
              { icon: Mail, title: 'Marketing Tools', desc: 'Digital marketing suite for enrollment campaigns, email automation and social media management.', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Settings, title: 'Admin Tools', desc: 'Powerful administrative tools for school management, scheduling and resource allocation.', color: 'bg-blue-50 text-blue-600' },
            ].map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i} className="card-white group cursor-pointer">
                <div className={`icon-box mb-5`}>
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

      {/* Best Software Section */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                The Best Software to Manage Your <span className="gradient-text">Institution</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our comprehensive platform provides all the tools needed to modernize your school operations,
                enhance learning outcomes, and streamline administrative tasks.
              </p>
              <div className="space-y-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="icon-box flex-shrink-0">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                      <p className="text-sm text-gray-500">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Dashboard', color: 'from-primary/10 to-primary/5' },
                { label: 'Analytics', color: 'from-accent/10 to-accent/5' },
                { label: 'Reports', color: 'from-blue-500/10 to-blue-500/5' },
                { label: 'Settings', color: 'from-orange-500/10 to-orange-500/5' },
              ].map((item) => (
                <div key={item.label} className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 flex flex-col items-center justify-center h-40`}>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">What we offer</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Listening to You, and Answering with <span className="gradient-text">Technology</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => (
              <motion.div key={svc.title} variants={fadeUp} custom={i} className="card-white group text-center cursor-pointer">
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

      {/* Testimonials */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Customer Reviews</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our <span className="gradient-text">Clients</span> Say
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">Rated 5 out of 5 (760+ reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Ahmed Al-Rashid', role: 'Director, Al-Noor Academy', text: 'Cubico transformed our entire school system. The LMS and animated content have dramatically improved student engagement.' },
              { name: 'Fatima Hassan', role: 'Principal, Iqra Foundation', text: 'From day one, Cubico delivered beyond our expectations. The ERP system streamlined our operations completely.' },
              { name: 'Michael Torres', role: 'Board Chair, CIF Canada', text: 'Working with Cubico has been exceptional. They deployed our complete digital infrastructure in just 3 weeks.' },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
