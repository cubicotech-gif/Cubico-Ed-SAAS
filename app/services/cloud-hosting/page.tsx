'use client';

import { motion } from 'framer-motion';
import {
  Cloud,
  Server,
  Shield,
  Zap,
  Globe,
  Clock,
  HardDrive,
  Activity,
  Lock,
  ArrowRight,
  Check,
  MapPin,
  RefreshCw,
  Eye,
  ShieldCheck,
  Database,
  Layers,
  Wifi,
  KeyRound,
  Fingerprint,
  FileKey,
  MonitorCheck,
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

const infrastructureFeatures = [
  {
    icon: ShieldCheck,
    title: '99.9% Uptime SLA',
    desc: 'Guaranteed availability backed by our Service Level Agreement. Your platforms stay online when students and staff need them most.',
  },
  {
    icon: HardDrive,
    title: 'Automatic Backups',
    desc: 'Daily, weekly, and monthly automated backups with point-in-time recovery. Never lose a single record or assignment submission.',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    desc: 'Fast content delivery worldwide through our distributed network. Students access materials instantly from any location.',
  },
  {
    icon: Zap,
    title: 'Auto-Scaling',
    desc: 'Infrastructure that scales automatically during traffic spikes — exam season, enrollment periods, or live events.',
  },
  {
    icon: Shield,
    title: 'DDoS Protection',
    desc: 'Enterprise-grade protection against distributed denial-of-service attacks, keeping your services accessible at all times.',
  },
  {
    icon: Eye,
    title: '24/7 Monitoring',
    desc: 'Proactive issue detection with round-the-clock monitoring. We identify and resolve problems before they affect your users.',
  },
];

const hostingPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    desc: 'Ideal for small schools and single-campus institutions getting started with cloud hosting.',
    features: [
      '2 vCPU, 4GB RAM',
      '100 GB SSD Storage',
      '1 TB Bandwidth',
      'Daily Backups',
      'SSL Certificate',
      'Email Support',
      '99.5% Uptime SLA',
    ],
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$299',
    period: '/month',
    desc: 'For growing institutions running LMS, ERP, and multiple web applications simultaneously.',
    features: [
      '8 vCPU, 16GB RAM',
      '500 GB SSD Storage',
      '5 TB Bandwidth',
      'Daily + Weekly Backups',
      'Global CDN Included',
      'Priority Support',
      '99.9% Uptime SLA',
      'Auto-Scaling',
      'DDoS Protection',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large institutions and multi-campus networks requiring dedicated infrastructure and compliance.',
    features: [
      'Dedicated Servers',
      'Unlimited Storage',
      'Unlimited Bandwidth',
      'Continuous Backups',
      'Global CDN + WAF',
      '24/7 Phone Support',
      '99.99% Uptime SLA',
      'Auto-Scaling',
      'Advanced DDoS Protection',
      'Custom Compliance (PDPA, GDPR)',
      'Dedicated Account Manager',
    ],
    highlight: false,
  },
];

const dataCenters = [
  {
    country: 'Pakistan',
    city: 'Islamabad',
    flag: '🇵🇰',
    latency: '5ms',
    features: ['Tier III Data Center', 'PDPA Compliant', 'Local Support Team'],
  },
  {
    country: 'Saudi Arabia',
    city: 'Riyadh',
    flag: '🇸🇦',
    latency: '8ms',
    features: ['Tier IV Data Center', 'NCA Compliant', 'Arabic Support'],
  },
  {
    country: 'Canada',
    city: 'Toronto',
    flag: '🇨🇦',
    latency: '12ms',
    features: ['Tier III Data Center', 'PIPEDA Compliant', 'North America Coverage'],
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: 'SSL/TLS Encryption',
    desc: 'All data transmitted between your users and servers is encrypted with industry-standard TLS 1.3 protocols.',
  },
  {
    icon: Database,
    title: 'Data Encryption at Rest',
    desc: 'AES-256 encryption for all stored data including databases, files, and backup archives.',
  },
  {
    icon: Shield,
    title: 'Web Application Firewall',
    desc: 'Intelligent firewall that blocks SQL injection, XSS, and other OWASP Top 10 vulnerabilities.',
  },
  {
    icon: KeyRound,
    title: 'Access Controls',
    desc: 'Role-based access with multi-factor authentication, IP whitelisting, and audit logging.',
  },
  {
    icon: Fingerprint,
    title: 'Identity Management',
    desc: 'SSO integration with SAML/OAuth, LDAP directory services, and centralized user management.',
  },
  {
    icon: FileKey,
    title: 'Compliance & Auditing',
    desc: 'Full audit trails, compliance reporting, and regular third-party security assessments.',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '15ms', label: 'Avg Response Time' },
  { value: '3', label: 'Data Centers' },
  { value: '0', label: 'Data Breaches' },
];

export default function CloudHostingPage() {
  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-label-light mb-4"
              >
                Cloud Hosting
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                Reliable Infrastructure for{' '}
                <span className="gradient-text">Education</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
              >
                Managed cloud infrastructure designed for educational institutions.
                From LMS to ERP, we keep your digital ecosystem fast, secure, and
                always available.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#plans" className="btn-outline-white text-lg">
                  View Plans
                </Link>
              </motion.div>
            </div>

            {/* Right — Cloud architecture diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Central cloud */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 z-10">
                  <Cloud className="w-14 h-14 md:w-16 md:h-16 text-white" />
                </div>

                {/* Connecting lines + service nodes */}
                {[
                  { label: 'LMS', angle: 0, icon: MonitorCheck },
                  { label: 'ERP', angle: 90, icon: Layers },
                  { label: 'Apps', angle: 180, icon: Wifi },
                  { label: 'Website', angle: 270, icon: Globe },
                ].map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const radius = 140;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  return (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                    >
                      {/* Line */}
                      <div
                        className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary/60 to-transparent origin-left z-0"
                        style={{
                          width: `${radius}px`,
                          transform: `rotate(${node.angle}deg)`,
                        }}
                      />
                      {/* Node */}
                      <div
                        className="absolute z-10 flex flex-col items-center gap-1"
                        style={{
                          top: `calc(50% + ${y}px - 28px)`,
                          left: `calc(50% + ${x}px - 28px)`,
                        }}
                      >
                        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <node.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs text-white/70 font-semibold">
                          {node.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Pulse ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 rounded-full border border-primary/20 animate-ping opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-72 md:h-72 rounded-full border border-primary/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Infrastructure Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Built for <span className="gradient-text">Education at Scale</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Enterprise-grade cloud infrastructure tailored for the unique demands of educational institutions.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {infrastructureFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                <div className="icon-box mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Architecture Diagram ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Architecture</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Cloud <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A multi-layered architecture designed for performance, redundancy, and security.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {[
              { label: 'CDN Layer', sub: 'Global edge caching & static assets', icon: Globe, color: 'from-blue-500 to-blue-600' },
              { label: 'Load Balancer', sub: 'Traffic distribution & SSL termination', icon: RefreshCw, color: 'from-primary to-primary' },
              { label: 'Application Servers', sub: 'Auto-scaled compute instances', icon: Server, color: 'from-orange-500 to-orange-600' },
              { label: 'Database Cluster', sub: 'Primary + read replicas with failover', icon: Database, color: 'from-accent to-amber-800' },
              { label: 'Backup Storage', sub: 'Encrypted off-site backup retention', icon: HardDrive, color: 'from-gray-600 to-gray-700' },
            ].map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {/* Arrow connector */}
                {i > 0 && (
                  <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-4 bg-gray-300" />
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-300" />
                    </div>
                  </div>
                )}

                {/* Layer box */}
                <div className="flex items-center gap-5 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                    <layer.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-gray-900 text-lg">{layer.label}</h4>
                    <p className="text-sm text-gray-500">{layer.sub}</p>
                  </div>
                  <span className="hidden sm:block text-xs font-mono text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    Layer {i + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Server Status Mockup ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label-light mb-4 block">Live Monitoring</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Server <span className="gradient-text">Status Dashboard</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Real-time visibility into your infrastructure performance and health.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white font-semibold text-sm">All Systems Operational</span>
              </div>
              <span className="text-white/40 text-xs font-mono">Last updated: 2 min ago</span>
            </div>

            {/* Metrics row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Uptime */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Uptime</p>
                <p className="text-3xl font-heading font-bold text-green-400">99.97%</p>
                <p className="text-white/30 text-xs mt-1">Last 90 days</p>
              </div>

              {/* CPU Usage */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">CPU Usage</p>
                <p className="text-3xl font-heading font-bold text-white">23%</p>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '23%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  />
                </div>
              </div>

              {/* Memory */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Memory</p>
                <p className="text-3xl font-heading font-bold text-white">41%</p>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '41%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  />
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Response Time</p>
                <p className="text-3xl font-heading font-bold text-white">14ms</p>
                {/* Mini bar chart mockup */}
                <div className="flex items-end gap-1 mt-3 h-6">
                  {[40, 55, 35, 60, 45, 30, 50, 38, 42, 55, 35, 28].map((h, j) => (
                    <motion.div
                      key={j}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + j * 0.05 }}
                      className="flex-1 bg-primary/60 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Service status list */}
            <div className="space-y-3">
              {[
                { name: 'LMS Platform (Moodle)', status: 'Operational', uptime: '99.99%' },
                { name: 'School ERP System', status: 'Operational', uptime: '99.98%' },
                { name: 'CDN & Static Assets', status: 'Operational', uptime: '100%' },
                { name: 'Database Cluster', status: 'Operational', uptime: '99.97%' },
                { name: 'Backup Service', status: 'Operational', uptime: '100%' },
                { name: 'API Gateway', status: 'Operational', uptime: '99.99%' },
              ].map((svc, i) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between bg-white/5 rounded-lg px-5 py-3 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-white/80 text-sm font-medium">{svc.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 text-xs font-mono hidden sm:block">{svc.uptime}</span>
                    <span className="text-green-400 text-xs font-semibold">{svc.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hosting Plans ── */}
      <section id="plans" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Hosting <span className="gradient-text">Plans</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Flexible plans designed for institutions of all sizes. All plans include managed support and migration assistance.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 items-stretch"
          >
            {hostingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-2 border-primary shadow-2xl shadow-primary/10 scale-[1.03]'
                    : 'card-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-heading font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl font-heading font-bold ${plan.highlight ? 'text-primary' : 'gradient-text'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-6 leading-relaxed ${plan.highlight ? 'text-white/60' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-primary' : 'text-green-500'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`w-full text-center ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Data Center Locations ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Global Presence</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Data Center <span className="gradient-text">Locations</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Strategically placed data centers to serve educational institutions across key regions.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {dataCenters.map((dc, i) => (
              <motion.div
                key={dc.city}
                variants={fadeUp}
                custom={i}
                className="card-white group text-center"
              >
                {/* Location pin with region */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-lg">
                      {dc.flag}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900">{dc.city}</h3>
                  <p className="text-gray-500 text-sm">{dc.country}</p>
                </div>

                {/* Latency badge */}
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Activity className="w-4 h-4" />
                  {dc.latency} latency
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {dc.features.map((feat) => (
                    <li key={feat} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  {s.value}
                </h3>
                <p className="text-white/50 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Security Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Security</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Enterprise-Grade <span className="gradient-text">Security</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Multiple layers of security to protect your institution&apos;s data, applications, and users.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {securityFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="flex gap-4 items-start p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="icon-box flex-shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-gray-900 mb-2">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full filter blur-[150px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
              <Cloud className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Migrate to <span className="gradient-text">Cubico Cloud</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Our team handles the complete migration — from assessment to deployment.
              Zero downtime, full data integrity, and ongoing managed support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                Start Migration <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-outline-white text-lg">
                Explore All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
