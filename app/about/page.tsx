'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Award,
  Globe,
  Users,
  Lightbulb,
  Layers,
  Target,
  Zap,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
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

const team = [
  { name: 'Ali Raza', role: 'Founder & CEO', initials: 'AR', color: 'from-purple-500 to-blue-500' },
  { name: 'Sarah Ahmed', role: 'Co-Founder & CTO', initials: 'SA', color: 'from-emerald-500 to-teal-500' },
  { name: 'Hassan Khan', role: 'Lead Developer', initials: 'HK', color: 'from-orange-500 to-red-500' },
  { name: 'Ayesha Malik', role: 'Creative Director', initials: 'AM', color: 'from-pink-500 to-purple-500' },
];

const values = [
  { icon: Lightbulb, title: 'Vision', desc: 'To be the leading EdTech partner for institutions seeking digital transformation across the Islamic world and beyond.' },
  { icon: Target, title: 'Mission', desc: 'Empowering educators and institutions with technology that enhances learning outcomes while respecting cultural values.' },
];

const features = [
  { title: 'Easy to Use', desc: 'Intuitive interfaces designed for educators, not just tech experts.' },
  { title: 'Attractive User Interface', desc: 'Modern, clean designs that engage students and simplify administration.' },
  { title: 'Powerful and Efficient', desc: 'Robust platforms that handle thousands of users with ease.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            It takes two flints to make a fire
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            The ultimate source of EdTech solutions — transforming schools across Pakistan, Saudi Arabia & Canada with innovative technology.
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} custom={0} className="section-label mb-4 block">
                About Cubico
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                The Ultimate Source of <span className="gradient-text">EdTech Solutions</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                We are a full-stack EdTech agency helping schools modernize their operations and learning experiences.
                Our team combines deep understanding of education with cutting-edge technology to deliver solutions
                that truly transform institutions.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: BookOpen, label: 'Smart LMS', desc: 'Next-generation learning management systems with AI-driven insights.' },
                  { icon: Monitor, label: 'School ERP', desc: 'Comprehensive school management from admissions to finance.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="icon-box flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: BookOpen, label: 'K-12 Schools', color: 'bg-purple-100 text-purple-600' },
                    { icon: Award, label: 'Islamic Schools', color: 'bg-emerald-100 text-emerald-600' },
                    { icon: Globe, label: 'International', color: 'bg-blue-100 text-blue-600' },
                    { icon: Users, label: 'Colleges & NGOs', color: 'bg-orange-100 text-orange-600' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center p-5 rounded-xl bg-gray-50">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              True World-Class <span className="gradient-text">EdTech Service</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white flex gap-5"
              >
                <div className="icon-box flex-shrink-0">
                  <v.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 section-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '760+', label: 'Institutions Served' },
              { value: '3', label: 'Countries Active' },
              { value: '4', label: 'Weeks Avg Launch' },
              { value: '100%', label: 'Client Retention' },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-number text-4xl md:text-5xl text-white mb-2">{s.value}</div>
                <p className="text-white/60 text-sm uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
                Product <span className="gradient-text">Benefits</span>
              </h2>
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
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                      <p className="text-sm text-gray-500">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <Layers className="w-16 h-16 text-primary/30" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Cubico Platform Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white text-center group"
              >
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5`}>
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center gap-2">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, j) => (
                    <a key={j} href="#" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
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

function Monitor(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
