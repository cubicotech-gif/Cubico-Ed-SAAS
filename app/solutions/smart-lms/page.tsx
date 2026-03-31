'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  Maximize2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
   PORTFOLIO SECTION COMPONENT
   ═══════════════════════════════════════════ */
function PortfolioSection({ t }: { t: (en: string, ar: string) => string }) {
  const [expandedDemo, setExpandedDemo] = useState<number | null>(null);

  const demos = [
    {
      title: t('K-12 School Dashboard', 'لوحة تحكم مدرسة K-12'),
      type: t('Primary & Secondary', 'ابتدائي وثانوي'),
      desc: t(
        'Complete school management with grade books, attendance tracking, parent communication, and curriculum mapping for grades 1-12.',
        'إدارة مدرسية كاملة مع دفاتر الدرجات وتتبع الحضور والتواصل مع أولياء الأمور وتخطيط المناهج للصفوف 1-12.'
      ),
      features: [
        t('Grade book with weighted categories', 'دفتر درجات مع فئات مرجّحة'),
        t('Attendance tracking with parent alerts', 'تتبع الحضور مع تنبيهات أولياء الأمور'),
        t('Homework submission & auto-grading', 'تسليم الواجبات والتصحيح التلقائي'),
        t('Report card generation', 'إنشاء بطاقات التقارير'),
      ],
      color: 'from-[#0A6B5C] to-[#085248]',
      accent: '#0A6B5C',
      stats: { students: '1,200', teachers: '85', courses: '340' },
    },
    {
      title: t('University LMS Portal', 'بوابة نظام إدارة التعلم الجامعية'),
      type: t('Higher Education', 'التعليم العالي'),
      desc: t(
        'Advanced platform for universities with semester management, research collaboration, thesis tracking, and multi-department structure.',
        'منصة متقدمة للجامعات مع إدارة الفصول الدراسية والتعاون البحثي وتتبع الأطروحات وهيكل متعدد الأقسام.'
      ),
      features: [
        t('Semester & credit hour management', 'إدارة الفصول والساعات المعتمدة'),
        t('Research paper collaboration', 'التعاون في الأوراق البحثية'),
        t('Multi-department dashboards', 'لوحات تحكم متعددة الأقسام'),
        t('Thesis submission workflow', 'سير عمل تقديم الأطروحات'),
      ],
      color: 'from-violet-500 to-purple-600',
      accent: '#8B5CF6',
      stats: { students: '5,000', teachers: '200', courses: '890' },
    },
    {
      title: t('Corporate Training Hub', 'مركز التدريب المؤسسي'),
      type: t('Enterprise', 'المؤسسات'),
      desc: t(
        'Employee onboarding, compliance training, skill development paths, and certification management for organizations of any size.',
        'تأهيل الموظفين وتدريب الامتثال ومسارات تطوير المهارات وإدارة الشهادات للمنظمات بأي حجم.'
      ),
      features: [
        t('Custom learning paths per role', 'مسارات تعلم مخصصة لكل وظيفة'),
        t('Compliance deadline tracking', 'تتبع مواعيد الامتثال'),
        t('Certificate auto-generation', 'إنشاء شهادات تلقائي'),
        t('Manager approval workflows', 'سير عمل موافقة المدير'),
      ],
      color: 'from-sky-500 to-blue-600',
      accent: '#0EA5E9',
      stats: { students: '3,500', teachers: '45', courses: '120' },
    },
    {
      title: t('Islamic Studies Platform', 'منصة الدراسات الإسلامية'),
      type: t('Specialized Education', 'تعليم متخصص'),
      desc: t(
        'Quran memorization tracking, Islamic studies curriculum, Arabic language courses, and Tajweed assessment tools with full RTL support.',
        'تتبع حفظ القرآن ومناهج الدراسات الإسلامية ودورات اللغة العربية وأدوات تقييم التجويد مع دعم كامل للنصوص من اليمين لليسار.'
      ),
      features: [
        t('Quran memorization progress tracker', 'متتبع تقدم حفظ القرآن'),
        t('Tajweed assessment with audio', 'تقييم التجويد مع الصوت'),
        t('Full Arabic RTL interface', 'واجهة عربية كاملة من اليمين لليسار'),
        t('Islamic calendar integration', 'تكامل التقويم الإسلامي'),
      ],
      color: 'from-emerald-500 to-teal-600',
      accent: '#10B981',
      stats: { students: '800', teachers: '32', courses: '65' },
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-dots opacity-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-dots opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block text-center justify-center">
            {t('Live Portfolio', 'معرض الأعمال')}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t('See It in', 'شاهده')}{' '}
            <span className="gradient-text">{t('Action', 'أثناء العمل')}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t(
              'We build different types of LMS for different types of institutions. Click any demo below to explore what your LMS could look like.',
              'نبني أنواعاً مختلفة من أنظمة إدارة التعلم لأنواع مختلفة من المؤسسات. انقر على أي عرض أدناه لاستكشاف كيف يمكن أن يبدو نظامك.'
            )}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {demos.map((demo, i) => (
            <motion.div
              key={demo.title}
              variants={fadeUp}
              custom={i}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:border-[#0A6B5C]/20 transition-all duration-300"
            >
              {/* Collapsed Header — always visible */}
              <button
                onClick={() => setExpandedDemo(expandedDemo === i ? null : i)}
                className="w-full flex items-center gap-5 p-6 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-gray-900 text-lg">{demo.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ background: `${demo.accent}15`, color: demo.accent }}>
                      {demo.type}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm truncate">{demo.desc}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
                    <span><strong className="text-gray-700">{demo.stats.students}</strong> {t('students', 'طالب')}</span>
                    <span><strong className="text-gray-700">{demo.stats.courses}</strong> {t('courses', 'دورة')}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedDemo === i ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedDemo === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="grid lg:grid-cols-5 gap-6">
                        {/* Demo Preview — mock dashboard */}
                        <div className="lg:col-span-3">
                          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            {/* Mini browser bar */}
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                              <div className="flex gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                              </div>
                              <div className="flex-1 ml-2">
                                <div className="bg-white rounded px-3 py-1 text-[10px] text-gray-400 border border-gray-200 max-w-xs">
                                  lms.cubico.tech/demo/{demo.title.toLowerCase().replace(/\s/g, '-')}
                                </div>
                              </div>
                            </div>
                            {/* Dashboard preview content */}
                            <div className="p-5">
                              <div className="grid grid-cols-3 gap-3 mb-4">
                                {[
                                  { label: t('Students', 'الطلاب'), val: demo.stats.students },
                                  { label: t('Teachers', 'المعلمين'), val: demo.stats.teachers },
                                  { label: t('Courses', 'الدورات'), val: demo.stats.courses },
                                ].map((s) => (
                                  <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                                    <div className="text-lg font-heading font-bold text-gray-900">{s.val}</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</div>
                                  </div>
                                ))}
                              </div>
                              {/* Activity chart simulation */}
                              <div className="bg-white rounded-xl p-4 border border-gray-100 mb-3">
                                <div className="text-xs font-bold text-gray-700 mb-3">{t('Weekly Engagement', 'المشاركة الأسبوعية')}</div>
                                <div className="flex items-end gap-2 h-20">
                                  {[45, 72, 58, 85, 67, 93, 78].map((h, idx) => (
                                    <div key={idx} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${demo.accent}, ${demo.accent}88)` }} />
                                  ))}
                                </div>
                                <div className="flex justify-between mt-1.5">
                                  {[t('Mon','إث'), t('Tue','ثل'), t('Wed','أر'), t('Thu','خم'), t('Fri','جم'), t('Sat','سب'), t('Sun','أح')].map((d) => (
                                    <span key={d} className="text-[8px] text-gray-300 flex-1 text-center">{d}</span>
                                  ))}
                                </div>
                              </div>
                              {/* Course list simulation */}
                              <div className="space-y-2">
                                {[65, 88, 42].map((prog, idx) => (
                                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: demo.accent }}>
                                      {['📐', '🔬', '📝'][idx]}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-700 font-medium">{[t('Mathematics','الرياضيات'), t('Science','العلوم'), t('Language','اللغة')][idx]}</span>
                                        <span className="text-[10px] text-gray-400">{prog}%</span>
                                      </div>
                                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${prog}%`, background: demo.accent }} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Features & CTA */}
                        <div className="lg:col-span-2 flex flex-col">
                          <h4 className="font-heading font-bold text-gray-900 text-base mb-4">
                            {t('Key Features', 'الميزات الرئيسية')}
                          </h4>
                          <div className="space-y-3 mb-6">
                            {demo.features.map((feat) => (
                              <div key={feat} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: demo.accent }} />
                                <span className="text-gray-600 text-sm">{feat}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">{demo.desc}</p>
                          <div className="mt-auto">
                            <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                              {t('Request This Demo', 'اطلب هذا العرض')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm">
            {t(
              'Every LMS is custom-built for your institution. These demos show real configurations we\'ve deployed.',
              'كل نظام إدارة تعلم مبني خصيصاً لمؤسستك. هذه العروض تظهر تكوينات حقيقية نشرناها.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function SmartLMSPage() {
  const { t } = useLanguage();

  /* ═══════════════════════════════════════════
     DATA
     ═══════════════════════════════════════════ */
  const features = [
    {
      icon: Trophy,
      title: t('Gamified Learning', 'التعلم بالألعاب'),
      desc: t(
        'Badges, leaderboards, and XP points turn boring lessons into fun challenges. Students actually want to complete their work.',
        'الشارات ولوحات المتصدرين ونقاط الخبرة تحوّل الدروس المملة إلى تحديات ممتعة. الطلاب يرغبون فعلاً في إنجاز عملهم.'
      ),
    },
    {
      icon: BrainCircuit,
      title: t('AI Smart Reports', 'تقارير ذكية بالذكاء الاصطناعي'),
      desc: t(
        'Know which students need help before they fail. AI spots learning gaps and shows you exactly where to focus.',
        'اعرف أي الطلاب يحتاجون مساعدة قبل أن يرسبوا. الذكاء الاصطناعي يكشف الفجوات ويوضح لك أين تركز بالضبط.'
      ),
    },
    {
      icon: Languages,
      title: t('3 Languages Built-In', '3 لغات مدمجة'),
      desc: t(
        'English, Arabic, and Urdu — switch with one click. Everything flips: content, menus, quizzes, and reports.',
        'الإنجليزية والعربية والأردية — بدّل بنقرة واحدة. كل شيء يتغير: المحتوى والقوائم والاختبارات والتقارير.'
      ),
    },
    {
      icon: Video,
      title: t('Live Classes Inside', 'فصول مباشرة مدمجة'),
      desc: t(
        'Run live video lessons with screen sharing and recording — no Zoom needed. One click, class starts.',
        'قدّم دروساً مباشرة بالفيديو مع مشاركة الشاشة والتسجيل — بدون Zoom. نقرة واحدة، يبدأ الفصل.'
      ),
    },
    {
      icon: ClipboardCheck,
      title: t('Auto-Grading Exams', 'تصحيح تلقائي للامتحانات'),
      desc: t(
        '15+ question types, auto-grading, and plagiarism detection. Teachers save hours every single week.',
        'أكثر من 15 نوع سؤال وتصحيح تلقائي وكشف الغش. المعلمون يوفرون ساعات كل أسبوع.'
      ),
    },
    {
      icon: Users,
      title: t('Parent Dashboard', 'لوحة أولياء الأمور'),
      desc: t(
        'Parents see grades, attendance, and homework in real-time. No more "my child didn\'t get the assignment" excuses.',
        'أولياء الأمور يرون الدرجات والحضور والواجبات فوراً. لا مزيد من أعذار "طفلي لم يحصل على الواجب".'
      ),
    },
  ];

  const steps = [
    {
      num: '01',
      title: t('We Audit Your Curriculum', 'نراجع مناهجكم الدراسية'),
      desc: t(
        'Our education specialists review your existing curriculum, content formats, and teaching workflows to create a migration blueprint.',
        'يقوم متخصصو التعليم لدينا بمراجعة مناهجكم الحالية وصيغ المحتوى وسير عمل التدريس لإنشاء خطة ترحيل شاملة.'
      ),
    },
    {
      num: '02',
      title: t('Customize & Configure', 'التخصيص والإعداد'),
      desc: t(
        'We tailor the LMS to your branding, grading policies, academic calendar, and role-based permissions for every user type.',
        'نخصص نظام إدارة التعلم ليتناسب مع هويتكم وسياسات التقييم والتقويم الأكاديمي وصلاحيات كل نوع مستخدم.'
      ),
    },
    {
      num: '03',
      title: t('Content Migration & Training', 'ترحيل المحتوى والتدريب'),
      desc: t(
        'Existing courses, question banks, and resources are migrated seamlessly. Your staff receives hands-on training with ongoing support.',
        'يتم ترحيل الدورات وبنوك الأسئلة والموارد الحالية بسلاسة. يتلقى موظفوكم تدريباً عملياً مع دعم مستمر.'
      ),
    },
    {
      num: '04',
      title: t('Launch & Ongoing Support', 'الإطلاق والدعم المستمر'),
      desc: t(
        'Go live with confidence. Our team provides 24/7 support, quarterly feature updates, and performance monitoring from day one.',
        'انطلقوا بثقة. يوفر فريقنا دعماً على مدار الساعة وتحديثات ربع سنوية ومراقبة الأداء من اليوم الأول.'
      ),
    },
  ];

  const integrations = [
    { name: t('Google Classroom', 'Google Classroom'), color: 'bg-blue-500', icon: '📚', desc: t('Sync classes & grades', 'مزامنة الفصول والدرجات') },
    { name: t('Microsoft Teams', 'Microsoft Teams'), color: 'bg-indigo-600', icon: '💬', desc: t('Video calls & chat', 'مكالمات فيديو ومحادثة') },
    { name: t('Zoom', 'Zoom'), color: 'bg-blue-600', icon: '🎥', desc: t('Live virtual classes', 'فصول افتراضية مباشرة') },
    { name: t('Moodle', 'Moodle'), color: 'bg-orange-500', icon: '🎓', desc: t('Core LMS engine', 'محرك نظام التعلم الأساسي') },
    { name: t('WhatsApp', 'WhatsApp'), color: 'bg-emerald-500', icon: '📱', desc: t('Parent notifications', 'إشعارات أولياء الأمور') },
    { name: t('Google Drive', 'Google Drive'), color: 'bg-yellow-500', icon: '📂', desc: t('Cloud file storage', 'تخزين ملفات سحابي') },
    { name: t('Canvas', 'Canvas'), color: 'bg-red-500', icon: '🖥️', desc: t('Content import', 'استيراد المحتوى') },
    { name: t('SIS Systems', 'أنظمة SIS'), color: 'bg-gray-700', icon: '🔗', desc: t('Student data sync', 'مزامنة بيانات الطلاب') },
  ];

  const stats = [
    { number: t('500+', '+500'), label: t('Courses Deployed', 'دورة تم نشرها') },
    { number: t('50K+', '+50 ألف'), label: t('Active Students', 'طالب نشط') },
    { number: t('98%', '٪98'), label: t('Uptime Guaranteed', 'ضمان وقت التشغيل') },
    { number: t('3', '3'), label: t('Languages Supported', 'لغات مدعومة') },
  ];

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════ */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#0A6B5C]/15 rounded-full filter blur-[200px]" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#085248]/10 rounded-full filter blur-[160px]" />
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
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C7A6E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0A6B5C]" />
                </span>
                <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                  {t('Moodle-Powered LMS Platform', 'منصة إدارة التعلم المبنية على Moodle')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]"
              >
                {t('One Platform for', 'منصة واحدة لـ')}{' '}
                <span className="gradient-text">{t('Teaching, Learning & Growth', 'التعليم والتعلم والنمو')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/55 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              >
                {t(
                  'Your school deserves an LMS that actually works. Manage classes, track grades, run live lessons, and keep parents in the loop — without juggling 5 different tools.',
                  'مدرستك تستحق نظام إدارة تعلم يعمل فعلاً. أدر الفصول وتتبع الدرجات وقدم دروساً مباشرة وأبقِ أولياء الأمور على اطلاع — بدون التنقل بين 5 أدوات مختلفة.'
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg px-8">
                  {t('Request a Demo', 'احجز عرضاً تجريبياً')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link href="/pricing" className="btn-outline-white text-lg px-8">
                  {t('View Pricing', 'عرض الأسعار')}
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
                  {[
                    { bg: 'bg-[#0A6B5C]', icon: '🏫' },
                    { bg: 'bg-violet-500', icon: '🎓' },
                    { bg: 'bg-emerald-400', icon: '📖' },
                    { bg: 'bg-sky-500', icon: '🌍' },
                  ].map((item, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 ${item.bg} rounded-full border-2 border-[#0D0D0F] flex items-center justify-center text-sm`}
                      >
                        {item.icon}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">{t('Trusted by 760+ schools worldwide', 'موثوق به من قبل أكثر من 760 مدرسة حول العالم')}</p>
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
                <div className="absolute -inset-6 bg-gradient-to-br from-[#0A6B5C]/20 via-violet-500/10 to-transparent rounded-3xl filter blur-2xl" />

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
                          {t('Welcome back, Sarah!', 'مرحباً بعودتك، سارة!')}
                        </div>
                        <div className="text-white/30 text-xs mt-0.5">
                          {t('You have 3 courses in progress', 'لديك 3 دورات قيد التقدم')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0A6B5C]/20 flex items-center justify-center">
                          <Bell className="w-4 h-4 text-[#0C7A6E]" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A6B5C] to-[#085248] flex items-center justify-center text-sm">
                          👩‍🎓
                        </div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: t('Courses', 'الدورات'), val: '12', icon: BookOpen, change: t('+2 this month', '+2 هذا الشهر') },
                        { label: t('Avg Grade', 'متوسط الدرجة'), val: 'A-', icon: Award, change: '89.5%' },
                        { label: t('XP Points', 'نقاط الخبرة'), val: '2,450', icon: Zap, change: t('Level 8', 'المستوى 8') },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-white/[0.04] rounded-xl p-3 border border-white/5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <s.icon className="w-4 h-4 text-[#0C7A6E]" />
                            <span className="text-[10px] text-emerald-400">{s.change}</span>
                          </div>
                          <div className="text-white font-heading font-bold text-lg">{s.val}</div>
                          <div className="text-white/30 text-[10px]">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Course Cards */}
                    <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
                      {t('My Courses', 'دوراتي')}
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { name: t('Mathematics — Algebra II', 'الرياضيات — الجبر II'), progress: 78, color: 'from-violet-500 to-purple-600', grade: 'A' },
                        { name: t('Physics — Mechanics', 'الفيزياء — الميكانيكا'), progress: 52, color: 'from-[#0A6B5C] to-[#085248]', grade: 'B+' },
                        { name: t('English Literature — Poetry', 'الأدب الإنجليزي — الشعر'), progress: 91, color: 'from-emerald-500 to-teal-600', grade: 'A+' },
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
                        {t('Weekly Activity', 'النشاط الأسبوعي')}
                      </div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[35, 60, 45, 80, 65, 90, 50].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-[#0A6B5C] to-[#0C7A6E] rounded-sm opacity-70"
                              style={{ height: `${h}%` }}
                            />
                            <span className="text-[8px] text-white/20">
                              {t(
                                ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
                                ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'][i]
                              )}
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
                      <div className="text-[10px] text-white/40">{t('Achievement!', 'إنجاز!')}</div>
                      <div className="text-xs font-heading font-bold text-white">
                        {t('Quiz Master', 'سيد الاختبارات')}
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
                    <div className="w-8 h-8 rounded-full bg-[#0A6B5C]/20 flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4 text-[#0C7A6E]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40">{t('AI Insight', 'رؤية الذكاء الاصطناعي')}</div>
                      <div className="text-xs font-heading font-bold text-emerald-400">
                        {t('+12% this week', '+12% هذا الأسبوع')}
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
              {t('Platform Features', 'ميزات المنصة')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('Built for How', 'مصمم لطريقة')}{' '}
              <span className="gradient-text">{t('Schools Actually Work', 'عمل المدارس الحقيقية')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Not just another LMS. Every feature solves a real problem that teachers and students face daily.',
                'ليس مجرد نظام إدارة تعلم آخر. كل ميزة تحل مشكلة حقيقية يواجهها المعلمون والطلاب يومياً.'
              )}
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A6B5C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative">
                  <div className="icon-box mb-6 w-14 h-14 rounded-2xl bg-[#0A6B5C]/10 flex items-center justify-center group-hover:bg-[#0A6B5C]/20 transition-colors">
                    <feat.icon className="w-6 h-6 text-[#0A6B5C]" />
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
              {t('Dashboard Preview', 'معاينة لوحة التحكم')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('A Dashboard That', 'لوحة تحكم')}{' '}
              <span className="gradient-text">{t('Teachers Love', 'يحبها المعلمون')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Clean, intuitive, and packed with insights. Every role sees exactly what they need — nothing more, nothing less.',
                'نظيفة وبديهية ومليئة بالرؤى. كل دور يرى بالضبط ما يحتاجه — لا أكثر ولا أقل.'
              )}
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A6B5C] to-[#085248] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-heading font-bold text-sm">{t('Smart LMS', 'نظام إدارة التعلم الذكي')}</span>
                  </div>

                  {/* Nav Items */}
                  <div className="space-y-1">
                    {[
                      { icon: Home, label: t('Dashboard', 'لوحة التحكم'), active: true },
                      { icon: BookOpen, label: t('My Courses', 'دوراتي'), active: false },
                      { icon: Users, label: t('Students', 'الطلاب'), active: false },
                      { icon: ClipboardCheck, label: t('Assessments', 'التقييمات'), active: false },
                      { icon: BarChart3, label: t('Analytics', 'التحليلات'), active: false },
                      { icon: MessageSquare, label: t('Messages', 'الرسائل'), active: false },
                      { icon: Calendar, label: t('Schedule', 'الجدول'), active: false },
                      { icon: Settings, label: t('Settings', 'الإعدادات'), active: false },
                    ].map((nav) => (
                      <div
                        key={nav.label}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          nav.active
                            ? 'bg-[#0A6B5C]/20 text-[#0C7A6E]'
                            : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <nav.icon className="w-4 h-4" />
                        {nav.label}
                        {nav.label === t('Messages', 'الرسائل') && (
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm">
                        👩‍🏫
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">{t('Ms. Rashida', 'الأستاذة رشيدة')}</div>
                        <div className="text-white/30 text-[10px]">{t('Math Teacher', 'معلمة رياضيات')}</div>
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
                        {t('Good morning, Ms. Rashida!', 'صباح الخير، الأستاذة رشيدة!')}
                      </h3>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {t('You have 4 classes today and 12 assignments to review', 'لديك 4 حصص اليوم و12 واجباً للمراجعة')}
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
                      { label: t('Total Students', 'إجمالي الطلاب'), val: '284', change: '+12', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { label: t('Active Courses', 'الدورات النشطة'), val: '8', change: '+1', color: 'text-blue-500', bg: 'bg-blue-50' },
                      { label: t('Avg. Score', 'متوسط الدرجة'), val: '87%', change: '+3%', color: 'text-violet-500', bg: 'bg-violet-50' },
                      { label: t('Completion Rate', 'معدل الإنجاز'), val: '92%', change: '+5%', color: 'text-[#0A6B5C]', bg: 'bg-orange-50' },
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
                            {t('Student Performance', 'أداء الطلاب')}
                          </div>
                          <div className="text-gray-400 text-[10px] mt-0.5">
                            {t('Average scores per class this semester', 'متوسط الدرجات لكل فصل هذا الفصل الدراسي')}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#0A6B5C]" />
                            <span className="text-[10px] text-gray-400">{t('This Term', 'هذا الفصل')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                            <span className="text-[10px] text-gray-400">{t('Last Term', 'الفصل السابق')}</span>
                          </div>
                        </div>
                      </div>
                      {/* Bar Chart */}
                      <div className="flex items-end gap-3 h-36">
                        {[
                          { label: t('Grade 7', 'الصف 7'), cur: 72, prev: 65 },
                          { label: t('Grade 8', 'الصف 8'), cur: 85, prev: 78 },
                          { label: t('Grade 9', 'الصف 9'), cur: 68, prev: 71 },
                          { label: t('Grade 10', 'الصف 10'), cur: 91, prev: 82 },
                          { label: t('Grade 11', 'الصف 11'), cur: 76, prev: 74 },
                          { label: t('Grade 12', 'الصف 12'), cur: 88, prev: 80 },
                        ].map((bar) => (
                          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex gap-0.5 items-end h-28">
                              <div
                                className="flex-1 bg-gray-100 rounded-t-sm"
                                style={{ height: `${bar.prev}%` }}
                              />
                              <div
                                className="flex-1 bg-gradient-to-t from-[#0A6B5C] to-[#0C7A6E] rounded-t-sm"
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
                          {t('Recent Activity', 'النشاط الأخير')}
                        </div>
                        <div className="space-y-3">
                          {[
                            { text: t('Ahmed submitted Algebra Quiz', 'أحمد قدّم اختبار الجبر'), time: t('2m ago', 'منذ دقيقتين'), icon: FileText, color: 'bg-violet-100 text-violet-600' },
                            { text: t('New student enrolled in Physics', 'طالب جديد سجّل في الفيزياء'), time: t('15m ago', 'منذ 15 دقيقة'), icon: Users, color: 'bg-emerald-100 text-emerald-600' },
                            { text: t('Grade 10 assignment due reminder', 'تذكير بموعد واجب الصف 10'), time: t('1h ago', 'منذ ساعة'), icon: Clock, color: 'bg-orange-100 text-[#0A6B5C]' },
                            { text: t('Parent meeting scheduled', 'تم جدولة اجتماع أولياء الأمور'), time: t('3h ago', 'منذ 3 ساعات'), icon: Calendar, color: 'bg-blue-100 text-blue-600' },
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
                          {t('Upcoming Assignments', 'الواجبات القادمة')}
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: t('Algebra II — Chapter Test', 'الجبر II — اختبار الفصل'), due: t('Tomorrow', 'غداً'), status: 'bg-red-100 text-red-600' },
                            { name: t('Physics Lab Report', 'تقرير مختبر الفيزياء'), due: t('In 3 days', 'بعد 3 أيام'), status: 'bg-yellow-100 text-yellow-700' },
                            { name: t('Poetry Analysis Essay', 'مقال تحليل الشعر'), due: t('In 1 week', 'بعد أسبوع'), status: 'bg-emerald-100 text-emerald-600' },
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
              {t('Implementation Process', 'عملية التنفيذ')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('From Zero to', 'من الصفر إلى')}{' '}
              <span className="gradient-text">{t('Launch in 4 Weeks', 'الإطلاق في 4 أسابيع')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Our proven deployment process gets your LMS up and running fast — without disrupting your existing academic calendar.',
                'عملية النشر المثبتة لدينا تجعل نظام إدارة التعلم جاهزاً للعمل بسرعة — دون الإخلال بتقويمكم الأكاديمي الحالي.'
              )}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#0A6B5C]/30 via-[#0A6B5C] to-[#0A6B5C]/30" />

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
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A6B5C] to-[#085248] flex items-center justify-center shadow-lg shadow-[#0A6B5C]/20 relative z-10">
                      <span className="text-white font-heading font-bold text-lg">{step.num}</span>
                    </div>
                    <div className="absolute inset-0 w-14 h-14 rounded-full bg-[#0A6B5C]/20 animate-ping" style={{ animationDuration: '3s' }} />
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
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0A6B5C]/10 rounded-full filter blur-[180px]" />
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
                {t('Student Experience', 'تجربة الطالب')}
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                {t('Students Learn on', 'الطلاب يتعلمون على')}{' '}
                <span className="gradient-text">{t('Any Device', 'أي جهاز')}</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                {t(
                  'Watch lessons, take quizzes, check grades — all from their phone. Looks and feels like the apps they already use every day.',
                  'شاهد الدروس وخض الاختبارات وتحقق من الدرجات — كل ذلك من هواتفهم. يبدو ويعمل مثل التطبيقات التي يستخدمونها يومياً.'
                )}
              </p>

              <div className="space-y-4">
                {[
                  t('Works offline — no internet? No problem', 'يعمل بدون إنترنت — لا اتصال؟ لا مشكلة'),
                  t('Get notified when grades drop or deadlines approach', 'احصل على إشعار عند انخفاض الدرجات أو اقتراب المواعيد'),
                  t('Dark mode for studying at night', 'الوضع الداكن للدراسة ليلاً'),
                  t('One tap to join a live class or watch a recording', 'نقرة واحدة للانضمام لفصل مباشر أو مشاهدة تسجيل'),
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
                <div className="w-[320px] md:w-[340px] bg-[#1a1a2e] rounded-[44px] p-3.5 shadow-2xl shadow-black/50 border border-white/10">
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
                            {t('My Courses', 'دوراتي')}
                          </div>
                          <div className="text-white/30 text-[10px]">{t('3 in progress', '3 قيد التقدم')}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A6B5C] to-[#085248] flex items-center justify-center text-sm">
                          👨‍🎓
                        </div>
                      </div>

                      {/* Course Card - Featured */}
                      <div className="bg-gradient-to-br from-[#0A6B5C]/20 to-[#085248]/10 rounded-2xl p-3.5 border border-[#0A6B5C]/20">
                        {/* Video Thumbnail */}
                        <div className="relative bg-gradient-to-br from-[#0A6B5C]/40 to-[#085248]/30 rounded-xl h-28 flex items-center justify-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/50 rounded px-1.5 py-0.5 text-[9px] text-white">
                            24:30
                          </div>
                          <div className="absolute top-2 left-2 bg-[#0A6B5C] rounded px-1.5 py-0.5 text-[8px] text-white font-bold uppercase">
                            {t('Live', 'مباشر')}
                          </div>
                        </div>
                        <div className="text-white text-xs font-bold mb-1">
                          {t('Algebra II — Quadratic Equations', 'الجبر II — المعادلات التربيعية')}
                        </div>
                        <div className="text-white/40 text-[10px] mb-2">{t('Ms. Rashida', 'الأستاذة رشيدة')} &middot; {t('Chapter 4', 'الفصل 4')}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[65%] bg-gradient-to-r from-[#0A6B5C] to-[#0C7A6E] rounded-full" />
                          </div>
                          <span className="text-[10px] text-white/40">65%</span>
                        </div>
                      </div>

                      {/* Course List */}
                      {[
                        { name: t('Physics — Mechanics', 'الفيزياء — الميكانيكا'), teacher: t('Mr. Hassan', 'الأستاذ حسن'), prog: 42, color: 'from-violet-500 to-purple-600' },
                        { name: t('English Literature', 'الأدب الإنجليزي'), teacher: t('Ms. Fatima', 'الأستاذة فاطمة'), prog: 88, color: 'from-emerald-500 to-teal-600' },
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
                              {t('Quiz Available', 'اختبار متاح')}
                            </div>
                            <div className="text-white/40 text-[9px]">
                              {t('Algebra — 10 questions', 'الجبر — 10 أسئلة')} &middot; {t('15 min', '15 دقيقة')}
                            </div>
                          </div>
                          <div className="bg-violet-500 rounded-lg px-2.5 py-1 text-[9px] text-white font-bold">
                            {t('Start', 'ابدأ')}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Nav */}
                      <div className="flex items-center justify-around pt-3 border-t border-white/5">
                        {[
                          { icon: Home, label: t('Home', 'الرئيسية'), active: true },
                          { icon: BookOpen, label: t('Courses', 'الدورات'), active: false },
                          { icon: Video, label: t('Live', 'مباشر'), active: false },
                          { icon: Award, label: t('Badges', 'الشارات'), active: false },
                          { icon: Users, label: t('Profile', 'الملف'), active: false },
                        ].map((nav) => (
                          <div key={nav.label} className="flex flex-col items-center gap-0.5">
                            <nav.icon className={`w-4 h-4 ${nav.active ? 'text-[#0C7A6E]' : 'text-white/20'}`} />
                            <span className={`text-[8px] ${nav.active ? 'text-[#0C7A6E]' : 'text-white/20'}`}>
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
                      <div className="text-[9px] text-white/30">{t('New Badge!', 'شارة جديدة!')}</div>
                      <div className="text-xs font-bold text-white">{t('Fast Learner', 'متعلم سريع')}</div>
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
                      <div className="text-[9px] text-white/30">{t('Quiz Result', 'نتيجة الاختبار')}</div>
                      <div className="text-xs font-bold text-emerald-400">{t('94% Score', 'النتيجة 94%')}</div>
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
          SECTION 7: LMS PORTFOLIO — EXPANDABLE DEMOS
          ══════════════════════════════════════════════ */}
      <PortfolioSection t={t} />

      {/* ══════════════════════════════════════════════
          SECTION 8: INTEGRATION ECOSYSTEM
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
              {t('Integrations', 'التكاملات')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('Connects With Your', 'يتصل بـ')}{' '}
              <span className="gradient-text">{t('Existing Tools', 'أدواتك الحالية')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Our Smart LMS integrates seamlessly with the platforms your school already uses. No data silos, no manual workarounds.',
                'نظام إدارة التعلم الذكي يتكامل بسلاسة مع المنصات التي تستخدمها مدرستك بالفعل. لا صوامع بيانات ولا حلول يدوية بديلة.'
              )}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {integrations.map((int, i) => (
              <motion.div
                key={int.name}
                variants={fadeUp}
                custom={i}
                className="group flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#0A6B5C]/30 hover:shadow-lg hover:shadow-[#0A6B5C]/5 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${int.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                  {int.icon}
                </div>
                <div>
                  <div className="text-gray-900 text-sm font-bold">{int.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{int.desc}</div>
                </div>
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
              {t(
                'Plus custom API integrations with any SIS, ERP, or payment gateway your institution requires.',
                'بالإضافة إلى تكاملات API مخصصة مع أي نظام معلومات طلابية أو ERP أو بوابة دفع تحتاجها مؤسستك.'
              )}
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
                <Star key={s} className="w-6 h-6 text-emerald-400 fill-emerald-400" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-10 leading-snug">
              {t(
                '\u201cCubico\u2019s Smart LMS transformed how we deliver education. Our teachers went from overwhelmed to empowered, and student engagement increased by ',
                '\u201cنظام إدارة التعلم الذكي من Cubico غيّر طريقة تقديمنا للتعليم. انتقل معلمونا من الإرهاق إلى التمكين، وزاد تفاعل الطلاب بنسبة '
              )}
              <span className="gradient-text">{t('40% in the first semester', '40% في الفصل الدراسي الأول')}</span>
              {t(
                '. The multilingual support was a game-changer for our diverse community.\u201d',
                '. كان الدعم متعدد اللغات نقطة تحول لمجتمعنا المتنوع.\u201d'
              )}
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A6B5C] to-[#085248] flex items-center justify-center text-2xl">
                👩‍🏫
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-gray-900">{t('Dr. Nadia Khalil', 'د. نادية خليل')}</div>
                <div className="text-gray-500 text-sm">
                  {t('Director, Al-Noor International School', 'مديرة مدرسة النور الدولية')}
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0A6B5C]/8 rounded-full filter blur-[200px]" />
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
              <Sparkles className="w-4 h-4 text-[#0C7A6E]" />
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">
                {t('Get Started Today', 'ابدأ اليوم')}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {t('See It Working for', 'شاهده يعمل لـ')}{' '}
              <span className="gradient-text">{t('Your School', 'مدرستك')}</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(
                'Free 30-minute call. We show you a live demo customized to your school. No sales pitch, just a real walkthrough.',
                'مكالمة مجانية لمدة 30 دقيقة. نعرض لك عرضاً توضيحياً مباشراً مخصصاً لمدرستك. بدون عروض بيع، فقط جولة حقيقية.'
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10">
                {t('Request Free Demo', 'احجز عرضاً تجريبياً مجانياً')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <Link href="/solutions" className="btn-outline-white text-lg px-10">
                {t('Explore All Solutions', 'استكشف جميع الحلول')}
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-12 flex items-center justify-center gap-6 text-white/30 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('No setup fees', 'بدون رسوم إعداد')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('14-day free trial', 'تجربة مجانية لمدة 14 يوماً')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('Cancel anytime', 'إلغاء في أي وقت')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
