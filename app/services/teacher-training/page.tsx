'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Monitor,
  BarChart3,
  Settings,
  Tablet,
  Users,
  Video,
  PlayCircle,
  ArrowRight,
  Check,
  Clock,
  Award,
  Star,
  Shield,
  Trophy,
  Calendar,
  FileText,
  TrendingUp,
  ChevronRight,
  Quote,
  Zap,
  Target,
  CheckCircle2,
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

export default function TeacherTrainingPage() {
  const { t } = useLanguage();

  const trainingPrograms = [
    {
      icon: Monitor,
      title: t('LMS Mastery', 'إتقان نظام إدارة التعلم'),
      desc: t(
        'Complete Moodle training covering course creation, grading workflows, forums, quizzes, and student management for seamless online teaching.',
        'تدريب شامل على منصة Moodle يغطي إنشاء الدورات، وسير عمل التقييم، والمنتديات، والاختبارات، وإدارة الطلاب للتعليم الإلكتروني السلس.'
      ),
      duration: t('4 Weeks', '٤ أسابيع'),
    },
    {
      icon: BookOpen,
      title: t('Digital Pedagogy', 'البيداغوجيا الرقمية'),
      desc: t(
        'Master modern teaching methods with technology including blended learning, flipped classrooms, and differentiated digital instruction strategies.',
        'إتقان أساليب التدريس الحديثة بالتكنولوجيا بما في ذلك التعلم المدمج والفصول المعكوسة واستراتيجيات التعليم الرقمي المتمايز.'
      ),
      duration: t('6 Weeks', '٦ أسابيع'),
    },
    {
      icon: FileText,
      title: t('Content Creation', 'إنشاء المحتوى'),
      desc: t(
        'Learn to create engaging digital content — interactive presentations, video lessons, infographics, and multimedia learning resources.',
        'تعلّم إنشاء محتوى رقمي جذاب — عروض تفاعلية، ودروس فيديو، ورسوم بيانية، وموارد تعليمية متعددة الوسائط.'
      ),
      duration: t('3 Weeks', '٣ أسابيع'),
    },
    {
      icon: BarChart3,
      title: t('Data Literacy', 'محو الأمية البيانية'),
      desc: t(
        'Understand student analytics dashboards, interpret learning data, track progress metrics, and make data-driven instructional decisions.',
        'فهم لوحات تحليلات الطلاب، وتفسير بيانات التعلم، وتتبع مقاييس التقدم، واتخاذ قرارات تعليمية مبنية على البيانات.'
      ),
      duration: t('3 Weeks', '٣ أسابيع'),
    },
    {
      icon: Settings,
      title: t('Platform Administration', 'إدارة المنصة'),
      desc: t(
        'ERP and LMS administration training covering user management, system configuration, report generation, and platform maintenance.',
        'تدريب على إدارة أنظمة ERP وLMS يشمل إدارة المستخدمين، وتهيئة النظام، وإنشاء التقارير، وصيانة المنصة.'
      ),
      duration: t('5 Weeks', '٥ أسابيع'),
    },
    {
      icon: Tablet,
      title: t('Classroom Technology', 'تكنولوجيا الفصول الدراسية'),
      desc: t(
        'Hands-on training with interactive whiteboards, student devices, screen sharing tools, and classroom response systems.',
        'تدريب عملي على السبورات التفاعلية، وأجهزة الطلاب، وأدوات مشاركة الشاشة، وأنظمة استجابة الفصول الدراسية.'
      ),
      duration: t('2 Weeks', 'أسبوعان'),
    },
  ];

  const trainingFormats = [
    {
      title: t('On-Site Training', 'التدريب في الموقع'),
      subtitle: t('In-person workshops at your school', 'ورش عمل حضورية في مدرستك'),
      desc: t(
        'Our trainers come to your campus for immersive, hands-on workshops tailored to your specific infrastructure and curriculum needs.',
        'يأتي مدربونا إلى حرمك الجامعي لورش عمل تفاعلية عملية مصممة خصيصاً لبنيتك التحتية واحتياجات مناهجك.'
      ),
      features: [
        t('Customized curriculum', 'مناهج مخصصة'),
        t('Hands-on practice', 'تدريب عملي'),
        t('Team building focus', 'التركيز على بناء الفريق'),
        t('Immediate Q&A', 'أسئلة وأجوبة فورية'),
      ],
    },
    {
      title: t('Virtual Live Sessions', 'جلسات افتراضية مباشرة'),
      subtitle: t('Interactive online workshops via Zoom', 'ورش عمل تفاعلية عبر الإنترنت عبر Zoom'),
      desc: t(
        'Join live, instructor-led sessions from anywhere. Includes breakout rooms, screen sharing, real-time exercises, and recorded replays.',
        'انضم إلى جلسات مباشرة بقيادة المدرب من أي مكان. تشمل غرف فرعية، ومشاركة الشاشة، وتمارين فورية، وتسجيلات للمراجعة.'
      ),
      features: [
        t('Flexible scheduling', 'جدولة مرنة'),
        t('Session recordings', 'تسجيلات الجلسات'),
        t('Breakout rooms', 'غرف فرعية'),
        t('Live collaboration', 'تعاون مباشر'),
      ],
    },
    {
      title: t('Self-Paced Courses', 'دورات ذاتية السرعة'),
      subtitle: t('On-demand video library access', 'وصول لمكتبة الفيديو عند الطلب'),
      desc: t(
        'Access our comprehensive video library with structured courses, quizzes, downloadable resources, and progress tracking at your own pace.',
        'استمتع بالوصول إلى مكتبة الفيديو الشاملة مع دورات منظمة، واختبارات، وموارد قابلة للتحميل، وتتبع التقدم بالسرعة التي تناسبك.'
      ),
      features: [
        t('24/7 access', 'وصول على مدار الساعة'),
        t('Progress tracking', 'تتبع التقدم'),
        t('Downloadable resources', 'موارد قابلة للتحميل'),
        t('Certificate on completion', 'شهادة عند الإكمال'),
      ],
    },
  ];

  const curriculum = [
    {
      weeks: t('Week 1-2', 'الأسبوع ١-٢'),
      title: t('Platform Basics', 'أساسيات المنصة'),
      topics: [
        t('Platform navigation & setup', 'التنقل في المنصة وإعدادها'),
        t('Account management', 'إدارة الحسابات'),
        t('Basic tool familiarization', 'التعرف على الأدوات الأساسية'),
        t('Digital workspace setup', 'إعداد مساحة العمل الرقمية'),
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      weeks: t('Week 3-4', 'الأسبوع ٣-٤'),
      title: t('Content Management', 'إدارة المحتوى'),
      topics: [
        t('Course creation workflows', 'سير عمل إنشاء الدورات'),
        t('Resource uploads & organization', 'رفع الموارد وتنظيمها'),
        t('Multimedia integration', 'دمج الوسائط المتعددة'),
        t('Content scheduling', 'جدولة المحتوى'),
      ],
      color: 'from-primary to-orange-500',
    },
    {
      weeks: t('Week 5-6', 'الأسبوع ٥-٦'),
      title: t('Assessment & Analytics', 'التقييم والتحليلات'),
      topics: [
        t('Quiz & exam creation', 'إنشاء الاختبارات والامتحانات'),
        t('Grading rubrics setup', 'إعداد معايير التقييم'),
        t('Student progress analytics', 'تحليلات تقدم الطلاب'),
        t('Performance reports', 'تقارير الأداء'),
      ],
      color: 'from-accent to-amber-700',
    },
    {
      weeks: t('Week 7-8', 'الأسبوع ٧-٨'),
      title: t('Advanced Features', 'الميزات المتقدمة'),
      topics: [
        t('Automation & workflows', 'الأتمتة وسير العمل'),
        t('Integration with third-party tools', 'التكامل مع أدوات الطرف الثالث'),
        t('Advanced reporting', 'التقارير المتقدمة'),
        t('Peer collaboration features', 'ميزات التعاون بين الأقران'),
      ],
      color: 'from-green-500 to-green-600',
    },
  ];

  const certificationLevels = [
    {
      level: t('Beginner', 'مبتدئ'),
      title: t('Digital Explorer', 'المستكشف الرقمي'),
      desc: t('Foundational skills in digital tools and platform navigation', 'مهارات أساسية في الأدوات الرقمية والتنقل في المنصة'),
      hours: t('20 Hours', '٢٠ ساعة'),
      color: 'from-blue-400 to-blue-500',
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-400/10',
      textColor: 'text-blue-400',
    },
    {
      level: t('Intermediate', 'متوسط'),
      title: t('Tech Practitioner', 'الممارس التقني'),
      desc: t('Proficient in content creation, assessments, and data analysis', 'إتقان إنشاء المحتوى والتقييمات وتحليل البيانات'),
      hours: t('40 Hours', '٤٠ ساعة'),
      color: 'from-primary to-orange-500',
      borderColor: 'border-primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      level: t('Advanced', 'متقدم'),
      title: t('Digital Champion', 'البطل الرقمي'),
      desc: t('Expert-level platform mastery and pedagogical integration', 'إتقان المنصة على مستوى الخبراء والتكامل البيداغوجي'),
      hours: t('60 Hours', '٦٠ ساعة'),
      color: 'from-accent to-amber-700',
      borderColor: 'border-accent',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
    },
    {
      level: t('Certified', 'معتمد'),
      title: t('Cubico Educator', 'معلم كيوبيكو'),
      desc: t('Certified to train peers and lead digital transformation initiatives', 'معتمد لتدريب الزملاء وقيادة مبادرات التحول الرقمي'),
      hours: t('80+ Hours', '٨٠+ ساعة'),
      color: 'from-yellow-400 to-yellow-500',
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-400/10',
      textColor: 'text-yellow-400',
    },
  ];

  const stats = [
    { value: '5,000+', label: t('Teachers Trained', 'معلم تم تدريبهم') },
    { value: '200+', label: t('Workshops Delivered', 'ورشة عمل تم تقديمها') },
    { value: '95%', label: t('Satisfaction Rate', 'نسبة الرضا') },
    { value: '8', label: t('Training Programs', 'برامج تدريبية') },
  ];

  const impactMetrics = [
    { label: t('Tech Confidence', 'الثقة التقنية'), before: 35, after: 92 },
    { label: t('Digital Content Usage', 'استخدام المحتوى الرقمي'), before: 15, after: 78 },
    { label: t('Student Engagement', 'تفاعل الطلاب'), before: 0, after: 40, isIncrease: true },
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
                {t('Teacher Training', 'تدريب المعلمين')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                {t('Empowering Educators for the', 'تمكين المعلمين من أجل')}{' '}
                <span className="gradient-text">{t('Digital Age', 'العصر الرقمي')}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
              >
                {t(
                  'Comprehensive professional development programs that equip teachers with digital tools, modern pedagogy, and the confidence to transform their classrooms.',
                  'برامج تطوير مهني شاملة تزوّد المعلمين بالأدوات الرقمية والبيداغوجيا الحديثة والثقة لتحويل فصولهم الدراسية.'
                )}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg">
                  {t('Start Training', 'ابدأ التدريب')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link href="#programs" className="btn-outline-white text-lg">
                  {t('View Programs', 'عرض البرامج')}
                </Link>
              </motion.div>
            </div>

            {/* Right — Training Session Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              {/* Projector / Presentation Screen */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 shadow-2xl shadow-primary/10">
                {/* Screen top bar */}
                <div className="bg-white/10 rounded-t-xl px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-white/30 text-xs font-mono ml-2">{t('Cubico Training Session', 'جلسة تدريب كيوبيكو')}</span>
                </div>

                {/* Presentation Slide */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-b-xl p-6 md:p-8 min-h-[220px]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">{t('Module 3 of 8', 'الوحدة ٣ من ٨')}</span>
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg md:text-xl mb-3">
                    {t('Creating Interactive Assessments', 'إنشاء تقييمات تفاعلية')}
                  </h3>
                  <div className="space-y-2 mb-5">
                    {[
                      t('Quiz builder walkthrough', 'جولة في أداة إنشاء الاختبارات'),
                      t('Rubric configuration', 'تهيئة معايير التقييم'),
                      t('Auto-grading setup', 'إعداد التقييم التلقائي'),
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span className="text-white/60 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '37.5%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                    <span className="text-white/40 text-xs font-mono">3/8</span>
                  </div>
                </div>
              </div>

              {/* Teacher Avatars — Virtual Classroom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-3 mt-5"
              >
                {[
                  { initials: 'SK', bg: 'bg-blue-500' },
                  { initials: 'AM', bg: 'bg-green-500' },
                  { initials: 'FR', bg: 'bg-purple-500' },
                  { initials: 'ZH', bg: 'bg-primary' },
                  { initials: 'NJ', bg: 'bg-pink-500' },
                  { initials: 'TA', bg: 'bg-accent' },
                ].map((teacher, i) => (
                  <motion.div
                    key={teacher.initials}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className={`w-10 h-10 rounded-full ${teacher.bg} flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900 shadow-lg`}
                  >
                    {teacher.initials}
                  </motion.div>
                ))}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs font-bold border-2 border-gray-900">
                  +24
                </div>
                <span className="text-white/40 text-xs ml-2">{t('teachers in session', 'معلمون في الجلسة')}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Training Programs ── */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">{t('Programs', 'البرامج')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Professional Development', 'التطوير المهني')}{' '}
              <span className="gradient-text">{t('Programs', 'البرامج')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Structured training programs designed to build digital competency at every level, from beginner to advanced.',
                'برامج تدريبية منظمة مصممة لبناء الكفاءة الرقمية على كل مستوى، من المبتدئ إلى المتقدم.'
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
            {trainingPrograms.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="icon-box group-hover:bg-primary group-hover:text-white transition-all">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {p.duration}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Training Format Options ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">{t('Delivery Formats', 'أنماط التقديم')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Choose Your', 'اختر')}{' '}
              <span className="gradient-text">{t('Training Format', 'نمط التدريب')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                "Flexible delivery options to fit your institution\u2019s schedule and preferences.",
                'خيارات تقديم مرنة تتناسب مع جدول مؤسستك وتفضيلاتها.'
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
            {trainingFormats.map((fmt, i) => {
              const formatIcons = [Users, Video, PlayCircle];
              const FormatIcon = formatIcons[i];
              return (
                <motion.div
                  key={fmt.title}
                  variants={fadeUp}
                  custom={i}
                  className="card-white overflow-hidden"
                >
                  {/* Visual Mockup Area */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6 min-h-[180px] flex items-center justify-center">
                    {i === 0 && (
                      /* On-site: Classroom layout */
                      <div className="w-full">
                        {/* Board */}
                        <div className="w-full h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                          <div className="w-3/4 h-1.5 bg-primary/20 rounded-full" />
                        </div>
                        {/* Instructor */}
                        <div className="flex justify-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">T</div>
                        </div>
                        {/* Student desks - 3 rows */}
                        {[0, 1, 2].map((row) => (
                          <div key={row} className="flex justify-center gap-3 mb-2">
                            {[0, 1, 2, 3].map((col) => (
                              <div key={col} className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                <div className="w-4 h-4 rounded-full bg-gray-300" />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      /* Virtual: Video call grid */
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {[
                          { initials: t('Trainer', 'مدرب'), highlight: true },
                          { initials: 'AK' }, { initials: 'SM' },
                          { initials: 'RH' }, { initials: 'NP' }, { initials: 'ZQ' },
                          { initials: 'FA' }, { initials: 'MT' }, { initials: 'LJ' },
                        ].map((p, j) => (
                          <div
                            key={j}
                            className={`aspect-video rounded-lg flex items-center justify-center text-xs font-bold ${
                              p.highlight
                                ? 'bg-primary/10 border-2 border-primary text-primary col-span-1'
                                : 'bg-white border border-gray-200 text-gray-400'
                            }`}
                          >
                            {p.initials}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 2 && (
                      /* Self-paced: Course library */
                      <div className="w-full space-y-2.5">
                        {[
                          { title: t('Getting Started with LMS', 'البدء مع نظام إدارة التعلم'), progress: 100 },
                          { title: t('Content Creation Basics', 'أساسيات إنشاء المحتوى'), progress: 65 },
                          { title: t('Assessment Builder', 'أداة إنشاء التقييمات'), progress: 30 },
                          { title: t('Data Analytics', 'تحليل البيانات'), progress: 0 },
                        ].map((course, j) => (
                          <div key={j} className="bg-white rounded-lg p-2.5 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium text-gray-700 truncate">{course.title}</span>
                              <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">{course.progress}%</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-400' : course.progress > 0 ? 'bg-primary' : 'bg-gray-200'}`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FormatIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-gray-900">{fmt.title}</h3>
                      <p className="text-xs text-gray-400">{fmt.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{fmt.desc}</p>
                  <ul className="space-y-2">
                    {fmt.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Curriculum Overview Mockup ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">{t('Curriculum', 'المنهج الدراسي')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Training', 'خارطة طريق')}{' '}
              <span className="gradient-text">{t('Roadmap', 'التدريب')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'A structured 8-week curriculum that takes educators from platform basics to advanced digital teaching mastery.',
                'منهج منظم مدته ٨ أسابيع ينقل المعلمين من أساسيات المنصة إلى إتقان التدريس الرقمي المتقدم.'
              )}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {curriculum.map((phase, i) => (
              <motion.div
                key={phase.weeks}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="flex gap-6 md:gap-8">
                  {/* Timeline */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-sm shadow-lg z-10`}>
                      {i + 1}
                    </div>
                    {i < curriculum.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-gray-300 to-gray-200 my-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10 flex-1">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block bg-gradient-to-r ${phase.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {phase.weeks}
                        </span>
                        {i < 2 && (
                          <span className="inline-flex items-center gap-1 text-green-500 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t('Foundation', 'الأساس')}
                          </span>
                        )}
                        {i >= 2 && (
                          <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                            <Zap className="w-3.5 h-3.5" />
                            {t('Advanced', 'متقدم')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                        {phase.title}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {phase.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-2 text-sm text-gray-500">
                            <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 rtl:rotate-180" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certification Path ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full filter blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label-light mb-4 block">{t('Certification', 'الشهادات')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('Your Path to', 'طريقك نحو')}{' '}
              <span className="gradient-text">{t('Certification', 'الاعتماد')}</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t(
                'Progress through four certification levels and become a Certified Cubico Educator. Earn badges, unlock achievements, and lead digital transformation.',
                'تقدّم عبر أربعة مستويات اعتماد وكن معلم كيوبيكو معتمداً. احصل على شارات، وافتح إنجازات، وقُد التحول الرقمي.'
              )}
            </p>
          </div>

          {/* Certification Path — Desktop */}
          <div className="hidden md:block">
            <div className="relative max-w-5xl mx-auto">
              {/* Connecting dotted line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-white/20 z-0" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-4 gap-6 relative z-10"
              >
                {certificationLevels.map((cert, i) => (
                  <motion.div
                    key={cert.level}
                    variants={fadeUp}
                    custom={i}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Badge / Shield */}
                    <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-5 shadow-xl`}>
                      {i < 3 ? (
                        <Shield className="w-10 h-10 text-white" />
                      ) : (
                        <Trophy className="w-10 h-10 text-white" />
                      )}
                      {/* Level number */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-900 shadow-lg">
                        {i + 1}
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-50 blur-xl -z-10`} />
                    </div>

                    {/* Content */}
                    <div className={`${cert.bgColor} backdrop-blur-sm border ${cert.borderColor}/30 rounded-xl p-4 w-full`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${cert.textColor}`}>
                        {cert.level}
                      </span>
                      <h3 className="text-white font-heading font-bold text-base mt-1 mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed mb-3">
                        {cert.desc}
                      </p>
                      <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/60 text-xs px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {cert.hours}
                      </div>
                    </div>

                    {/* Arrow to next */}
                    {i < certificationLevels.length - 1 && (
                      <div className="absolute top-1/2 -translate-y-1/2 hidden" style={{ left: `${(i + 1) * 25}%` }}>
                        <ArrowRight className="w-5 h-5 text-primary rtl:rotate-180" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Certification Path — Mobile */}
          <div className="md:hidden space-y-4">
            {certificationLevels.map((cert, i) => (
              <motion.div
                key={cert.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg`}>
                  {i < 3 ? (
                    <Shield className="w-7 h-7 text-white" />
                  ) : (
                    <Trophy className="w-7 h-7 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${cert.textColor}`}>
                    {cert.level}
                  </span>
                  <h3 className="text-white font-heading font-bold text-sm">{cert.title}</h3>
                  <p className="text-white/40 text-xs">{cert.desc}</p>
                </div>
                <div className="text-white/30 text-xs font-mono flex-shrink-0">{cert.hours}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Dashboard Mockup ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">{t('Dashboard', 'لوحة التحكم')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Track Your', 'تتبع')}{' '}
              <span className="gradient-text">{t('Progress', 'تقدمك')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Every teacher gets a personalized training dashboard to track courses, sessions, certificates, and quiz performance.',
                'يحصل كل معلم على لوحة تحكم تدريبية مخصصة لتتبع الدورات والجلسات والشهادات وأداء الاختبارات.'
              )}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl px-5 py-3 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                  SA
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t('Sarah Ahmed', 'سارة أحمد')}</p>
                  <p className="text-gray-400 text-xs">{t('Intermediate Level', 'المستوى المتوسط')}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5" />
                {t('1,250 XP', '١٬٢٥٠ نقطة خبرة')}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Course Progress */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h4 className="font-heading font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {t('Course Progress', 'تقدم الدورات')}
                </h4>
                <div className="space-y-4">
                  {[
                    { name: t('LMS Mastery', 'إتقان نظام إدارة التعلم'), progress: 85, color: 'bg-green-400' },
                    { name: t('Digital Pedagogy', 'البيداغوجيا الرقمية'), progress: 60, color: 'bg-primary' },
                    { name: t('Content Creation', 'إنشاء المحتوى'), progress: 35, color: 'bg-blue-400' },
                    { name: t('Data Literacy', 'محو الأمية البيانية'), progress: 10, color: 'bg-accent' },
                  ].map((course) => (
                    <div key={course.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-600 font-medium">{course.name}</span>
                        <span className="text-xs text-gray-400">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${course.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full ${course.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h4 className="font-heading font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t('Upcoming Sessions', 'الجلسات القادمة')}
                </h4>
                <div className="space-y-3">
                  {[
                    { title: t('Quiz Builder Workshop', 'ورشة أداة إنشاء الاختبارات'), date: t('Mon, Mar 18', 'الإثنين، ١٨ مارس'), time: t('10:00 AM', '١٠:٠٠ صباحاً'), type: t('Live', 'مباشر') },
                    { title: t('Data Analytics Deep Dive', 'التعمق في تحليل البيانات'), date: t('Wed, Mar 20', 'الأربعاء، ٢٠ مارس'), time: t('2:00 PM', '٢:٠٠ مساءً'), type: t('Virtual', 'افتراضي') },
                    { title: t('Content Design Lab', 'مختبر تصميم المحتوى'), date: t('Fri, Mar 22', 'الجمعة، ٢٢ مارس'), time: t('11:00 AM', '١١:٠٠ صباحاً'), type: t('On-site', 'حضوري') },
                  ].map((session, j) => (
                    <div key={j} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{session.title}</p>
                        <p className="text-[10px] text-gray-400">{session.date} {t('at', 'في')} {session.time}</p>
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        {session.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates Earned */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h4 className="font-heading font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  {t('Certificates Earned', 'الشهادات المكتسبة')}
                </h4>
                <div className="space-y-3">
                  {[
                    { name: t('Platform Basics', 'أساسيات المنصة'), date: t('Jan 2025', 'يناير ٢٠٢٥'), level: t('Beginner', 'مبتدئ') },
                    { name: t('LMS Fundamentals', 'أساسيات نظام إدارة التعلم'), date: t('Feb 2025', 'فبراير ٢٠٢٥'), level: t('Beginner', 'مبتدئ') },
                  ].map((cert, j) => (
                    <div key={j} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{cert.name}</p>
                        <p className="text-[10px] text-gray-400">{cert.date}</p>
                      </div>
                      <span className="text-[10px] font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                        {cert.level}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <span className="text-[8px]">?</span>
                    </div>
                    <span>{t('2 more to unlock Intermediate badge', 'شهادتان إضافيتان لفتح شارة المستوى المتوسط')}</span>
                  </div>
                </div>
              </div>

              {/* Quiz Scores */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h4 className="font-heading font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  {t('Quiz Scores', 'درجات الاختبارات')}
                </h4>
                <div className="space-y-3">
                  {[
                    { name: t('Platform Navigation', 'التنقل في المنصة'), score: 95, max: 100 },
                    { name: t('Course Setup', 'إعداد الدورة'), score: 88, max: 100 },
                    { name: t('Content Upload', 'رفع المحتوى'), score: 72, max: 100 },
                    { name: t('Quiz Builder', 'أداة إنشاء الاختبارات'), score: 91, max: 100 },
                  ].map((quiz) => (
                    <div key={quiz.name} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{quiz.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${quiz.score >= 90 ? 'bg-green-400' : quiz.score >= 70 ? 'bg-primary' : 'bg-red-400'}`}
                            style={{ width: `${quiz.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${quiz.score >= 90 ? 'text-green-500' : quiz.score >= 70 ? 'text-primary' : 'text-red-500'}`}>
                          {quiz.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{t('Average Score', 'متوسط الدرجات')}</span>
                  <span className="text-sm font-heading font-bold text-primary">86.5%</span>
                </div>
              </div>
            </div>
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

      {/* ── Impact Metrics ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">{t('Impact', 'التأثير')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Measurable', 'نتائج')}{' '}
              <span className="gradient-text">{t('Results', 'قابلة للقياس')}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t(
                'Our training programs deliver real, measurable improvements in teacher confidence and classroom effectiveness.',
                'تقدم برامجنا التدريبية تحسينات حقيقية وقابلة للقياس في ثقة المعلمين وفعالية الفصول الدراسية.'
              )}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                custom={i}
                className="card-white text-center"
              >
                <h4 className="font-heading font-bold text-gray-900 mb-6">{metric.label}</h4>

                {metric.isIncrease ? (
                  /* Student Engagement — simple increase display */
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <span className="text-5xl font-heading font-bold gradient-text">+{metric.after}%</span>
                    </div>
                    <p className="text-gray-400 text-sm">{t('increase after training', 'زيادة بعد التدريب')}</p>
                  </div>
                ) : (
                  /* Before/After bar comparison */
                  <div className="space-y-4">
                    {/* Before */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{t('Before', 'قبل')}</span>
                        <span className="text-sm font-bold text-gray-400">{metric.before}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.before}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gray-300 rounded-full"
                        />
                      </div>
                    </div>
                    {/* After */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-primary uppercase tracking-wider font-semibold">{t('After', 'بعد')}</span>
                        <span className="text-sm font-bold text-primary">{metric.after}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.after}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-7 h-7 text-primary" />
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl font-heading text-gray-900 leading-relaxed mb-8">
              &ldquo;{t(
                'Before the Cubico training, I was overwhelmed by digital tools. Now I confidently create interactive quizzes, track student progress through analytics, and even help my colleagues get started. The certification path made it feel like a game — I was always motivated to reach the next level.',
                'قبل تدريب كيوبيكو، كنت مرتبكة من الأدوات الرقمية. الآن أنشئ بثقة اختبارات تفاعلية، وأتتبع تقدم الطلاب من خلال التحليلات، بل وأساعد زملائي على البدء. مسار الاعتماد جعل الأمر يبدو كلعبة — كنت دائماً متحمسة للوصول إلى المستوى التالي.'
              )}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                FM
              </div>
              <div className="text-left">
                <p className="text-gray-900 font-heading font-bold">{t('Fatima Malik', 'فاطمة مالك')}</p>
                <p className="text-gray-400 text-sm">{t('Senior Science Teacher, Lahore Grammar School', 'معلمة علوم أولى، مدرسة لاهور جرامر')}</p>
              </div>
            </div>

            {/* Star rating */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
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
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t('Invest in Your', 'استثمر في')}{' '}
              <span className="gradient-text">{t('Teachers', 'معلميك')}</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(
                'Empower your educators with the skills they need to thrive in the digital classroom. From hands-on workshops to self-paced courses, we have the right program for your institution.',
                'مكّن معلميك بالمهارات التي يحتاجونها للتميز في الفصل الرقمي. من ورش العمل العملية إلى الدورات الذاتية، لدينا البرنامج المناسب لمؤسستك.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                {t('Schedule a Workshop', 'احجز ورشة عمل')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
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
