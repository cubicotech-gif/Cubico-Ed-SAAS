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
import { useLanguage } from '@/lib/i18n/LanguageContext';

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

export default function CloudHostingPage() {
  const { t } = useLanguage();

  const infrastructureFeatures = [
    {
      icon: ShieldCheck,
      title: t('99.9% Uptime SLA', 'اتفاقية مستوى خدمة بوقت تشغيل 99.9%'),
      desc: t(
        'Guaranteed availability backed by our Service Level Agreement. Your platforms stay online when students and staff need them most.',
        'توافر مضمون مدعوم باتفاقية مستوى الخدمة الخاصة بنا. تبقى منصاتك متاحة عندما يحتاجها الطلاب والموظفون.'
      ),
    },
    {
      icon: HardDrive,
      title: t('Automatic Backups', 'نسخ احتياطي تلقائي'),
      desc: t(
        'Daily, weekly, and monthly automated backups with point-in-time recovery. Never lose a single record or assignment submission.',
        'نسخ احتياطي تلقائي يومي وأسبوعي وشهري مع استعادة لنقطة زمنية محددة. لن تفقد أي سجل أو واجب مقدم.'
      ),
    },
    {
      icon: Globe,
      title: t('Global CDN', 'شبكة توصيل محتوى عالمية'),
      desc: t(
        'Fast content delivery worldwide through our distributed network. Students access materials instantly from any location.',
        'توصيل سريع للمحتوى حول العالم عبر شبكتنا الموزعة. يصل الطلاب إلى المواد فوراً من أي موقع.'
      ),
    },
    {
      icon: Zap,
      title: t('Auto-Scaling', 'التوسع التلقائي'),
      desc: t(
        'Infrastructure that scales automatically during traffic spikes — exam season, enrollment periods, or live events.',
        'بنية تحتية تتوسع تلقائياً أثناء ذروة الاستخدام — موسم الامتحانات أو فترات التسجيل أو الفعاليات المباشرة.'
      ),
    },
    {
      icon: Shield,
      title: t('DDoS Protection', 'حماية من هجمات DDoS'),
      desc: t(
        'Enterprise-grade protection against distributed denial-of-service attacks, keeping your services accessible at all times.',
        'حماية بمستوى المؤسسات ضد هجمات حجب الخدمة الموزعة، مما يحافظ على إمكانية الوصول إلى خدماتك في جميع الأوقات.'
      ),
    },
    {
      icon: Eye,
      title: t('24/7 Monitoring', 'مراقبة على مدار الساعة'),
      desc: t(
        'Proactive issue detection with round-the-clock monitoring. We identify and resolve problems before they affect your users.',
        'اكتشاف استباقي للمشكلات مع مراقبة على مدار الساعة. نحدد المشكلات ونحلها قبل أن تؤثر على مستخدميك.'
      ),
    },
  ];

  const hostingPlans = [
    {
      name: t('Starter', 'المبتدئ'),
      price: '$99',
      period: t('/month', '/شهرياً'),
      desc: t(
        'Ideal for small schools and single-campus institutions getting started with cloud hosting.',
        'مثالي للمدارس الصغيرة والمؤسسات ذات الحرم الواحد التي تبدأ بالاستضافة السحابية.'
      ),
      features: [
        t('2 vCPU, 4GB RAM', '2 vCPU، 4 جيجابايت رام'),
        t('100 GB SSD Storage', '100 جيجابايت تخزين SSD'),
        t('1 TB Bandwidth', '1 تيرابايت عرض النطاق'),
        t('Daily Backups', 'نسخ احتياطي يومي'),
        t('SSL Certificate', 'شهادة SSL'),
        t('Email Support', 'دعم عبر البريد الإلكتروني'),
        t('99.5% Uptime SLA', 'اتفاقية وقت تشغيل 99.5%'),
      ],
      highlight: false,
    },
    {
      name: t('Professional', 'الاحترافي'),
      price: '$299',
      period: t('/month', '/شهرياً'),
      desc: t(
        'For growing institutions running LMS, ERP, and multiple web applications simultaneously.',
        'للمؤسسات المتنامية التي تشغل نظام إدارة التعلم وتخطيط الموارد وتطبيقات ويب متعددة في آن واحد.'
      ),
      features: [
        t('8 vCPU, 16GB RAM', '8 vCPU، 16 جيجابايت رام'),
        t('500 GB SSD Storage', '500 جيجابايت تخزين SSD'),
        t('5 TB Bandwidth', '5 تيرابايت عرض النطاق'),
        t('Daily + Weekly Backups', 'نسخ احتياطي يومي + أسبوعي'),
        t('Global CDN Included', 'شبكة CDN عالمية مضمنة'),
        t('Priority Support', 'دعم ذو أولوية'),
        t('99.9% Uptime SLA', 'اتفاقية وقت تشغيل 99.9%'),
        t('Auto-Scaling', 'التوسع التلقائي'),
        t('DDoS Protection', 'حماية من هجمات DDoS'),
      ],
      highlight: true,
    },
    {
      name: t('Enterprise', 'المؤسسات'),
      price: t('Custom', 'مخصص'),
      period: '',
      desc: t(
        'For large institutions and multi-campus networks requiring dedicated infrastructure and compliance.',
        'للمؤسسات الكبيرة وشبكات الحرم الجامعي المتعددة التي تتطلب بنية تحتية مخصصة وامتثالاً تنظيمياً.'
      ),
      features: [
        t('Dedicated Servers', 'خوادم مخصصة'),
        t('Unlimited Storage', 'تخزين غير محدود'),
        t('Unlimited Bandwidth', 'عرض نطاق غير محدود'),
        t('Continuous Backups', 'نسخ احتياطي مستمر'),
        t('Global CDN + WAF', 'شبكة CDN عالمية + جدار حماية'),
        t('24/7 Phone Support', 'دعم هاتفي على مدار الساعة'),
        t('99.99% Uptime SLA', 'اتفاقية وقت تشغيل 99.99%'),
        t('Auto-Scaling', 'التوسع التلقائي'),
        t('Advanced DDoS Protection', 'حماية متقدمة من هجمات DDoS'),
        t('Custom Compliance (PDPA, GDPR)', 'امتثال مخصص (PDPA، GDPR)'),
        t('Dedicated Account Manager', 'مدير حساب مخصص'),
      ],
      highlight: false,
    },
  ];

  const dataCenters = [
    {
      country: t('Pakistan', 'باكستان'),
      city: t('Islamabad', 'إسلام آباد'),
      flag: '\u{1F1F5}\u{1F1F0}',
      latency: '5ms',
      features: [
        t('Tier III Data Center', 'مركز بيانات من المستوى الثالث'),
        t('PDPA Compliant', 'متوافق مع PDPA'),
        t('Local Support Team', 'فريق دعم محلي'),
      ],
    },
    {
      country: t('Saudi Arabia', 'المملكة العربية السعودية'),
      city: t('Riyadh', 'الرياض'),
      flag: '\u{1F1F8}\u{1F1E6}',
      latency: '8ms',
      features: [
        t('Tier IV Data Center', 'مركز بيانات من المستوى الرابع'),
        t('NCA Compliant', 'متوافق مع NCA'),
        t('Arabic Support', 'دعم باللغة العربية'),
      ],
    },
    {
      country: t('Canada', 'كندا'),
      city: t('Toronto', 'تورنتو'),
      flag: '\u{1F1E8}\u{1F1E6}',
      latency: '12ms',
      features: [
        t('Tier III Data Center', 'مركز بيانات من المستوى الثالث'),
        t('PIPEDA Compliant', 'متوافق مع PIPEDA'),
        t('North America Coverage', 'تغطية أمريكا الشمالية'),
      ],
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: t('SSL/TLS Encryption', 'تشفير SSL/TLS'),
      desc: t(
        'All data transmitted between your users and servers is encrypted with industry-standard TLS 1.3 protocols.',
        'جميع البيانات المنقولة بين المستخدمين والخوادم مشفرة ببروتوكولات TLS 1.3 القياسية.'
      ),
    },
    {
      icon: Database,
      title: t('Data Encryption at Rest', 'تشفير البيانات المخزنة'),
      desc: t(
        'AES-256 encryption for all stored data including databases, files, and backup archives.',
        'تشفير AES-256 لجميع البيانات المخزنة بما في ذلك قواعد البيانات والملفات وأرشيفات النسخ الاحتياطي.'
      ),
    },
    {
      icon: Shield,
      title: t('Web Application Firewall', 'جدار حماية تطبيقات الويب'),
      desc: t(
        'Intelligent firewall that blocks SQL injection, XSS, and other OWASP Top 10 vulnerabilities.',
        'جدار حماية ذكي يحظر حقن SQL وXSS وثغرات OWASP العشر الأكثر شيوعاً.'
      ),
    },
    {
      icon: KeyRound,
      title: t('Access Controls', 'التحكم في الوصول'),
      desc: t(
        'Role-based access with multi-factor authentication, IP whitelisting, and audit logging.',
        'وصول قائم على الأدوار مع مصادقة متعددة العوامل وقائمة IP المسموح بها وسجلات التدقيق.'
      ),
    },
    {
      icon: Fingerprint,
      title: t('Identity Management', 'إدارة الهوية'),
      desc: t(
        'SSO integration with SAML/OAuth, LDAP directory services, and centralized user management.',
        'تكامل تسجيل الدخول الموحد مع SAML/OAuth وخدمات دليل LDAP وإدارة مركزية للمستخدمين.'
      ),
    },
    {
      icon: FileKey,
      title: t('Compliance & Auditing', 'الامتثال والتدقيق'),
      desc: t(
        'Full audit trails, compliance reporting, and regular third-party security assessments.',
        'مسارات تدقيق كاملة وتقارير امتثال وتقييمات أمنية دورية من جهات خارجية.'
      ),
    },
  ];

  const stats = [
    { value: '99.9%', label: t('Uptime Guarantee', 'ضمان وقت التشغيل') },
    { value: '15ms', label: t('Avg Response Time', 'متوسط وقت الاستجابة') },
    { value: '3', label: t('Data Centers', 'مراكز البيانات') },
    { value: '0', label: t('Data Breaches', 'خروقات البيانات') },
  ];

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
                {t('Cloud Hosting', 'الاستضافة السحابية')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                {t('Reliable Infrastructure for', 'بنية تحتية موثوقة من أجل')}{' '}
                <span className="gradient-text">{t('Education', 'التعليم')}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
              >
                {t(
                  'Managed cloud infrastructure designed for educational institutions. From LMS to ERP, we keep your digital ecosystem fast, secure, and always available.',
                  'بنية تحتية سحابية مُدارة مصممة للمؤسسات التعليمية. من نظام إدارة التعلم إلى تخطيط الموارد، نحافظ على منظومتك الرقمية سريعة وآمنة ومتاحة دائماً.'
                )}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg">
                  {t('Get Started', 'ابدأ الآن')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link href="#plans" className="btn-outline-white text-lg">
                  {t('View Plans', 'عرض الخطط')}
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
                  { label: t('LMS', 'LMS'), angle: 0, icon: MonitorCheck },
                  { label: t('ERP', 'ERP'), angle: 90, icon: Layers },
                  { label: t('Apps', 'التطبيقات'), angle: 180, icon: Wifi },
                  { label: t('Website', 'الموقع'), angle: 270, icon: Globe },
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
            <span className="section-label mb-4 block">{t('Infrastructure', 'البنية التحتية')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Built for', 'مصممة لـ')} <span className="gradient-text">{t('Education at Scale', 'التعليم على نطاق واسع')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Enterprise-grade cloud infrastructure tailored for the unique demands of educational institutions.',
                'بنية تحتية سحابية بمستوى المؤسسات مصممة خصيصاً لتلبية الاحتياجات الفريدة للمؤسسات التعليمية.'
              )}
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
            <span className="section-label mb-4 block">{t('Architecture', 'الهندسة المعمارية')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Our Cloud', 'حزمتنا')} <span className="gradient-text">{t('Stack', 'السحابية')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'A multi-layered architecture designed for performance, redundancy, and security.',
                'بنية متعددة الطبقات مصممة للأداء والتكرار والأمان.'
              )}
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
              { label: t('CDN Layer', 'طبقة CDN'), sub: t('Global edge caching & static assets', 'تخزين مؤقت عالمي وأصول ثابتة'), icon: Globe, color: 'from-blue-500 to-blue-600' },
              { label: t('Load Balancer', 'موزع الأحمال'), sub: t('Traffic distribution & SSL termination', 'توزيع حركة المرور وإنهاء SSL'), icon: RefreshCw, color: 'from-primary to-primary' },
              { label: t('Application Servers', 'خوادم التطبيقات'), sub: t('Auto-scaled compute instances', 'مثيلات حوسبة ذاتية التوسع'), icon: Server, color: 'from-orange-500 to-orange-600' },
              { label: t('Database Cluster', 'مجموعة قواعد البيانات'), sub: t('Primary + read replicas with failover', 'أساسي + نسخ قراءة مع تجاوز الفشل'), icon: Database, color: 'from-accent to-amber-800' },
              { label: t('Backup Storage', 'تخزين النسخ الاحتياطي'), sub: t('Encrypted off-site backup retention', 'احتفاظ بنسخ احتياطية مشفرة خارج الموقع'), icon: HardDrive, color: 'from-gray-600 to-gray-700' },
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
                    {t('Layer', 'الطبقة')} {i + 1}
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
            <span className="section-label-light mb-4 block">{t('Live Monitoring', 'المراقبة المباشرة')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('Server', 'لوحة تحكم')} <span className="gradient-text">{t('Status Dashboard', 'حالة الخادم')}</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t(
                'Real-time visibility into your infrastructure performance and health.',
                'رؤية فورية لأداء وصحة البنية التحتية الخاصة بك.'
              )}
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
                <span className="text-white font-semibold text-sm">{t('All Systems Operational', 'جميع الأنظمة تعمل بشكل طبيعي')}</span>
              </div>
              <span className="text-white/40 text-xs font-mono">{t('Last updated: 2 min ago', 'آخر تحديث: منذ دقيقتين')}</span>
            </div>

            {/* Metrics row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Uptime */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Uptime', 'وقت التشغيل')}</p>
                <p className="text-3xl font-heading font-bold text-green-400">99.97%</p>
                <p className="text-white/30 text-xs mt-1">{t('Last 90 days', 'آخر 90 يوماً')}</p>
              </div>

              {/* CPU Usage */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('CPU Usage', 'استخدام المعالج')}</p>
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
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Memory', 'الذاكرة')}</p>
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
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Response Time', 'وقت الاستجابة')}</p>
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
                { name: t('LMS Platform (Moodle)', 'منصة إدارة التعلم (Moodle)'), status: t('Operational', 'يعمل'), uptime: '99.99%' },
                { name: t('School ERP System', 'نظام تخطيط موارد المدرسة'), status: t('Operational', 'يعمل'), uptime: '99.98%' },
                { name: t('CDN & Static Assets', 'CDN والأصول الثابتة'), status: t('Operational', 'يعمل'), uptime: '100%' },
                { name: t('Database Cluster', 'مجموعة قواعد البيانات'), status: t('Operational', 'يعمل'), uptime: '99.97%' },
                { name: t('Backup Service', 'خدمة النسخ الاحتياطي'), status: t('Operational', 'يعمل'), uptime: '100%' },
                { name: t('API Gateway', 'بوابة API'), status: t('Operational', 'يعمل'), uptime: '99.99%' },
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
            <span className="section-label mb-4 block">{t('Pricing', 'الأسعار')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Hosting', 'خطط')} <span className="gradient-text">{t('Plans', 'الاستضافة')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Flexible plans designed for institutions of all sizes. All plans include managed support and migration assistance.',
                'خطط مرنة مصممة لمؤسسات من جميع الأحجام. تشمل جميع الخطط الدعم المُدار والمساعدة في الترحيل.'
              )}
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
                    {t('Most Popular', 'الأكثر شيوعاً')}
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
                  {plan.price === '$99' || plan.price === '$299'
                    ? t('Get Started', 'ابدأ الآن')
                    : t('Contact Sales', 'تواصل مع المبيعات')}
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
            <span className="section-label mb-4 block">{t('Global Presence', 'التواجد العالمي')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Data Center', 'مواقع مراكز')} <span className="gradient-text">{t('Locations', 'البيانات')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Strategically placed data centers to serve educational institutions across key regions.',
                'مراكز بيانات موضوعة بشكل استراتيجي لخدمة المؤسسات التعليمية في المناطق الرئيسية.'
              )}
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
                  {dc.latency} {t('latency', 'زمن الاستجابة')}
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
            <span className="section-label mb-4 block">{t('Security', 'الأمان')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Enterprise-Grade', 'بمستوى المؤسسات')} <span className="gradient-text">{t('Security', 'الأمان')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Multiple layers of security to protect your institution\u0027s data, applications, and users.',
                'طبقات متعددة من الأمان لحماية بيانات وتطبيقات ومستخدمي مؤسستك.'
              )}
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
              {t('Migrate to', 'انتقل إلى')} <span className="gradient-text">{t('Cubico Cloud', 'سحابة كيوبيكو')}</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(
                'Our team handles the complete migration — from assessment to deployment. Zero downtime, full data integrity, and ongoing managed support.',
                'يتولى فريقنا عملية الترحيل الكاملة — من التقييم إلى النشر. بدون توقف، مع سلامة كاملة للبيانات ودعم مُدار مستمر.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                {t('Start Migration', 'ابدأ الترحيل')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="btn-outline-white text-lg">
                {t('Explore All Services', 'استكشف جميع الخدمات')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
