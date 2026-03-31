'use client';

import { motion } from 'framer-motion';
import {
  Cloud,
  Mail,
  Users,
  ArrowRight,
  Star,
  Zap,
  Shield,
  HeadphonesIcon,
  Clock,
  Globe,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BarChart3,
  Settings,
  Layers,
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

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Cloud,
      title: t('Cloud Hosting', 'الاستضافة السحابية'),
      slug: 'cloud-hosting',
      tagline: t('Enterprise-Grade Infrastructure', 'بنية تحتية بمستوى المؤسسات'),
      desc: t(
        'Reliable cloud infrastructure with 99.9% uptime SLA, automatic backups, global CDN, DDoS protection, and 24/7 monitoring — purpose-built for educational workloads.',
        'بنية تحتية سحابية موثوقة مع اتفاقية وقت تشغيل 99.9%، نسخ احتياطي تلقائي، شبكة توزيع محتوى عالمية، حماية من هجمات DDoS، ومراقبة على مدار الساعة — مصممة خصيصاً لأعباء العمل التعليمية.'
      ),
      highlights: [
        t('99.9% uptime SLA', 'اتفاقية وقت تشغيل 99.9%'),
        t('Auto-scaling', 'توسع تلقائي'),
        t('3 data centers', '3 مراكز بيانات'),
      ],
      color: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50',
      textColor: 'text-sky-600',
    },
    {
      icon: Mail,
      title: t('Digital Marketing', 'التسويق الرقمي'),
      slug: 'digital-marketing',
      tagline: t('Fill Every Seat', 'املأ كل مقعد'),
      desc: t(
        'Strategic digital marketing campaigns that drive enrollment. From social media management and SEO to targeted ad campaigns and email automation — all focused on the education sector.',
        'حملات تسويق رقمية استراتيجية تعزز التسجيل. من إدارة وسائل التواصل الاجتماعي وتحسين محركات البحث إلى الحملات الإعلانية المستهدفة وأتمتة البريد الإلكتروني — كلها تركز على قطاع التعليم.'
      ),
      highlights: [
        t('+45% avg enrollment', '+45% متوسط التسجيل'),
        t('200+ campaigns', '200+ حملة'),
        t('10M+ impressions', '10 مليون+ ظهور'),
      ],
      color: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50',
      textColor: 'text-violet-600',
    },
    {
      icon: Users,
      title: t('Teacher Training', 'تدريب المعلمين'),
      slug: 'teacher-training',
      tagline: t('Empower Your Educators', 'مكّن معلميك'),
      desc: t(
        'Professional development programs that equip teachers with digital skills. From LMS mastery to data literacy — on-site, virtual, or self-paced learning paths with certification.',
        'برامج تطوير مهني تزوّد المعلمين بالمهارات الرقمية. من إتقان نظام إدارة التعلم إلى محو الأمية البيانية — مسارات تعلم حضورية أو افتراضية أو ذاتية مع شهادات معتمدة.'
      ),
      highlights: [
        t('5,000+ teachers trained', '5,000+ معلم تم تدريبهم'),
        t('95% satisfaction', '95% رضا'),
        t('8 programs', '8 برامج'),
      ],
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
  ];

  const additionalServices = [
    {
      icon: HeadphonesIcon,
      title: t('24/7 Support', 'دعم على مدار الساعة'),
      desc: t(
        'Round-the-clock technical support via chat, email, and phone. Dedicated account managers for enterprise clients.',
        'دعم فني على مدار الساعة عبر الدردشة والبريد الإلكتروني والهاتف. مديرو حسابات مخصصون لعملاء المؤسسات.'
      ),
    },
    {
      icon: Settings,
      title: t('System Integration', 'تكامل الأنظمة'),
      desc: t(
        'Connect your existing tools — SIS, payment gateways, communication platforms — with our seamless API integrations.',
        'اربط أدواتك الحالية — أنظمة معلومات الطلاب، بوابات الدفع، منصات التواصل — مع تكاملات API السلسة لدينا.'
      ),
    },
    {
      icon: Shield,
      title: t('Data Migration', 'نقل البيانات'),
      desc: t(
        'Hassle-free migration from your current systems. We handle data mapping, validation, and transfer with zero downtime.',
        'نقل سلس من أنظمتك الحالية. نتولى تخطيط البيانات والتحقق منها ونقلها دون أي توقف.'
      ),
    },
    {
      icon: Layers,
      title: t('Custom Development', 'تطوير مخصص'),
      desc: t(
        'Need something unique? Our team builds custom modules, plugins, and integrations tailored to your specific needs.',
        'تحتاج شيئاً فريداً؟ فريقنا يبني وحدات وإضافات وتكاملات مخصصة حسب احتياجاتك.'
      ),
    },
    {
      icon: BarChart3,
      title: t('Analytics & Reporting', 'التحليلات والتقارير'),
      desc: t(
        'Custom dashboards and reports that give you actionable insights into institutional performance and student outcomes.',
        'لوحات معلومات وتقارير مخصصة تمنحك رؤى عملية حول أداء المؤسسة ونتائج الطلاب.'
      ),
    },
    {
      icon: Globe,
      title: t('Localization', 'التعريب'),
      desc: t(
        'Full Arabic and Urdu localization including RTL layouts, culturally appropriate content, and regional compliance.',
        'تعريب كامل للعربية والأردية يشمل تخطيطات RTL ومحتوى ملائم ثقافياً والامتثال الإقليمي.'
      ),
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: t('Discovery', 'الاكتشاف'),
      desc: t(
        'We deep-dive into your current operations, tech stack, and pain points through on-site or virtual workshops.',
        'نتعمق في عملياتك الحالية وبنيتك التقنية ونقاط الألم من خلال ورش عمل حضورية أو افتراضية.'
      ),
      icon: Sparkles,
    },
    {
      step: '02',
      title: t('Strategy', 'الاستراتيجية'),
      desc: t(
        'Our team designs a tailored implementation roadmap with clear milestones, timelines, and success metrics.',
        'يصمم فريقنا خارطة طريق تنفيذ مخصصة بمعالم واضحة وجداول زمنية ومقاييس نجاح.'
      ),
      icon: TrendingUp,
    },
    {
      step: '03',
      title: t('Execution', 'التنفيذ'),
      desc: t(
        'We deploy, configure, migrate data, and train your team — all within a 4-week sprint.',
        'ننشر ونُعدّ وننقل البيانات وندرّب فريقك — كل ذلك خلال سباق مدته 4 أسابيع.'
      ),
      icon: Zap,
    },
    {
      step: '04',
      title: t('Support', 'الدعم'),
      desc: t(
        'Ongoing maintenance, feature updates, and dedicated support to keep your systems running smoothly.',
        'صيانة مستمرة وتحديثات للميزات ودعم مخصص للحفاظ على تشغيل أنظمتك بسلاسة.'
      ),
      icon: HeadphonesIcon,
    },
  ];

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E8634A]/15 rounded-full filter blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D14F38]/10 rounded-full filter blur-[140px]" />
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
              <Sparkles className="w-4 h-4 text-[#E8634A]" />
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                {t('Beyond Products — Full-Service Support', 'أبعد من المنتجات — دعم خدمات كامل')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight"
            >
              {t('Services That', 'خدمات تدعم')}{' '}
              <span className="gradient-text">{t('Power', 'تحولك')}</span>
              <br />
              {t('Your Transformation', '')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/55 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {t(
                'Great products need great services behind them. From cloud infrastructure to digital marketing, from teacher training to 24/7 support — we don\'t just deliver software, we deliver success.',
                'المنتجات الرائعة تحتاج خدمات رائعة خلفها. من البنية التحتية السحابية إلى التسويق الرقمي، ومن تدريب المعلمين إلى الدعم على مدار الساعة — نحن لا نقدم برمجيات فحسب، بل نقدم النجاح.'
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact" className="btn-primary text-lg px-10">
                {t('Get Started', 'ابدأ الآن')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <Link href="/solutions" className="btn-outline-white text-lg px-10">
                {t('Explore Solutions', 'استكشف الحلول')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Services Showcase ── */}
      <section className="py-0">
        {services.map((svc, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={svc.slug}
              className={`py-24 lg:py-32 ${isEven ? 'bg-white' : 'bg-surface-light'} relative overflow-hidden`}
            >
              {isEven && <div className="absolute top-0 right-0 w-96 h-96 bg-dots opacity-30" />}

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
                    <div className={`inline-flex items-center gap-2 ${svc.bgLight} rounded-full px-4 py-1.5 mb-6`}>
                      <svc.icon className={`w-4 h-4 ${svc.textColor}`} />
                      <span className={`${svc.textColor} text-xs font-bold tracking-wider uppercase`}>
                        {svc.tagline}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                      {svc.title}
                    </h2>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                      {svc.desc}
                    </p>

                    <div className="space-y-3 mb-10">
                      {svc.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={`/services/${svc.slug}`} className="btn-primary inline-flex">
                      {t('Learn More', 'اعرف المزيد')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                    </Link>
                  </motion.div>

                  {/* Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                  >
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-4 sm:p-8 lg:p-10">
                      {/* Service-specific mockup */}
                      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-gray-100">
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                          </div>
                          <div className="flex-1 ml-3">
                            <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-400 border border-gray-200 max-w-xs">
                              cubico.tech/services/{svc.slug}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="h-3 w-36 bg-gray-200 rounded-full mb-2" />
                              <div className="h-2 w-24 bg-gray-100 rounded-full" />
                            </div>
                            <div className={`h-8 w-24 bg-gradient-to-r ${svc.color} rounded-lg`} />
                          </div>

                          {/* Metric cards */}
                          <div className="grid grid-cols-3 gap-3">
                            {svc.highlights.map((h, i) => (
                              <div key={i} className="p-3 bg-gray-50 rounded-xl text-center">
                                <div className={`h-6 w-14 mx-auto bg-gradient-to-r ${svc.color} rounded-md mb-2 opacity-70`} />
                                <div className="h-2 w-full bg-gray-200 rounded-full mb-1" />
                                <div className="h-1.5 w-2/3 mx-auto bg-gray-100 rounded-full" />
                              </div>
                            ))}
                          </div>

                          {/* Activity area */}
                          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            {[1, 2, 3, 4].map((n) => (
                              <div key={n} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${svc.color}`} />
                                <div className="flex-1 h-2 bg-gray-200 rounded-full" />
                                <div className="h-2 w-12 bg-gray-100 rounded-full" />
                              </div>
                            ))}
                          </div>

                          {/* Chart */}
                          <div className="flex items-end gap-2 h-24 bg-gray-50 rounded-xl p-4">
                            {[30, 50, 40, 70, 55, 80, 65, 90, 75, 85].map((h, i) => (
                              <div
                                key={i}
                                className={`flex-1 bg-gradient-to-t ${svc.color} rounded-t-sm opacity-60`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating badge */}
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">{t('Status', 'الحالة')}</div>
                            <div className="text-sm font-heading font-bold text-emerald-500">{t('All Systems Go', 'جميع الأنظمة تعمل')}</div>
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

      {/* ── Additional Services ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-center justify-center">
              {t('More Ways We Help', 'المزيد من الطرق التي نساعد بها')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('Additional', 'خدمات')} <span className="gradient-text">{t('Services', 'إضافية')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Everything else you need to succeed in your digital transformation journey.',
                'كل ما تحتاجه للنجاح في رحلة التحول الرقمي الخاصة بك.'
              )}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {additionalServices.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                <div className="icon-box mb-5 group-hover:bg-[#E8634A] group-hover:text-white transition-all">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-[#E8634A] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8634A]/8 rounded-full filter blur-[200px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label section-label-light mb-4 block text-center justify-center">
              {t('How We Work', 'كيف نعمل')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              {t('From Discovery to', 'من الاكتشاف إلى')} <span className="gradient-text">{t('Delivery', 'التسليم')}</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t(
                'A proven 4-step process that gets you from zero to live in 4 weeks.',
                'عملية مُثبتة من 4 خطوات تنقلك من الصفر إلى الإطلاق في 4 أسابيع.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#E8634A]/40 to-transparent z-0" />
                )}

                <div className="relative card-dark text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8634A] to-[#E8634A] mb-6 shadow-lg shadow-[#E8634A]/20">
                    <span className="text-white font-heading font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl mb-3">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-center justify-center">{t('Client Success', 'نجاح العملاء')}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('What Our', 'ماذا يقول')} <span className="gradient-text">{t('Clients', 'عملاؤنا')}</span> {t('Say', '')}
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{t('Rated 5 out of 5 (760+ reviews)', 'تقييم 5 من 5 (760+ مراجعة)')}</span>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: t('Dr. Ahmed Al-Rashid', 'د. أحمد الراشد'),
                role: t('Director, Al-Noor Academy', 'مدير، أكاديمية النور'),
                text: t(
                  'Cubico transformed our entire school system. The LMS and animated content have dramatically improved student engagement. Their cloud hosting has been flawless.',
                  'غيّرت كيوبيكو نظام مدرستنا بالكامل. نظام إدارة التعلم والمحتوى المتحرك حسّنا تفاعل الطلاب بشكل كبير. استضافتهم السحابية كانت مثالية.'
                ),
              },
              {
                name: t('Fatima Hassan', 'فاطمة حسن'),
                role: t('Principal, Iqra Foundation', 'مديرة، مؤسسة إقرأ'),
                text: t(
                  'From day one, Cubico delivered beyond our expectations. The teacher training program was phenomenal — our staff went from tech-hesitant to tech-savvy in weeks.',
                  'من اليوم الأول، قدمت كيوبيكو ما يفوق توقعاتنا. برنامج تدريب المعلمين كان استثنائياً — تحوّل طاقمنا من مترددين تقنياً إلى خبراء في أسابيع.'
                ),
              },
              {
                name: t('Michael Torres', 'مايكل توريس'),
                role: t('Board Chair, CIF Canada', 'رئيس مجلس الإدارة، CIF كندا'),
                text: t(
                  'Working with Cubico has been exceptional. Their digital marketing doubled our enrollment inquiries, and the ongoing support is world-class.',
                  'العمل مع كيوبيكو كان استثنائياً. تسويقهم الرقمي ضاعف استفسارات التسجيل لدينا، والدعم المستمر على مستوى عالمي.'
                ),
              },
            ].map((testimonial, i) => (
              <motion.div key={testimonial.name} variants={fadeUp} custom={i} className="card-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8634A] to-[#E8634A] flex items-center justify-center text-white font-bold text-xs">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '760+', label: t('Schools Served', 'مدارس مخدومة') },
              { number: '99.9%', label: t('Uptime SLA', 'اتفاقية وقت التشغيل') },
              { number: t('4 Weeks', '4 أسابيع'), label: t('Avg Deployment', 'متوسط النشر') },
              { number: t('24/7', '24/7'), label: t('Support Available', 'الدعم متاح') },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('Ready to Get', 'مستعد')} <span className="gradient-text">{t('Started?', 'للبدء؟')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
              {t(
                'Book a free consultation and we\'ll map out exactly how our services can transform your institution. No obligation, just clarity.',
                'احجز استشارة مجانية وسنحدد بالضبط كيف يمكن لخدماتنا أن تحوّل مؤسستك. بدون التزام، فقط وضوح.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10">
                {t('Book Free Consultation', 'احجز استشارة مجانية')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <Link href="/solutions" className="btn-outline text-lg px-10">
                {t('Explore Solutions', 'استكشف الحلول')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
