'use client';

import { motion } from 'framer-motion';
import {
  Smartphone,
  ArrowRight,
  Bell,
  WifiOff,
  Fingerprint,
  Languages,
  CreditCard,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle2,
  Star,
  Download,
  Shield,
  Zap,
  Users,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Sparkles,
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

/* ── Phone Frame Component ── */
function PhoneFrame({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/30 border border-gray-700">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="bg-white rounded-[2rem] overflow-hidden relative">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-2 bg-gray-50 text-[10px] text-gray-500">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 border border-gray-400 rounded-sm">
                <div className="w-2 h-1 bg-green-500 rounded-sm" />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <p className="text-center text-sm font-semibold mt-4 text-gray-600">{label}</p>
    </div>
  );
}

export default function MobileAppsPage() {
  const { t } = useLanguage();

  const features = [
    { icon: Bell, title: t('Real-Time Notifications', 'إشعارات فورية'), desc: t('Instant push alerts for grades, attendance, announcements, and fee reminders — parents never miss a thing.', 'تنبيهات فورية للدرجات والحضور والإعلانات وتذكيرات الرسوم — لن يفوت أولياء الأمور أي شيء.') },
    { icon: WifiOff, title: t('Offline Mode', 'وضع عدم الاتصال'), desc: t('Download courses, timetables, and study material. Auto-sync when back online — perfect for areas with spotty connectivity.', 'حمّل الدورات والجداول والمواد الدراسية. مزامنة تلقائية عند العودة للاتصال — مثالي للمناطق ذات الاتصال المتقطع.') },
    { icon: Fingerprint, title: t('Biometric Login', 'تسجيل الدخول البيومتري'), desc: t('Face ID and fingerprint authentication for quick, secure access. No more forgotten passwords.', 'مصادقة بالوجه وبصمة الإصبع للوصول السريع والآمن. لا مزيد من نسيان كلمات المرور.') },
    { icon: Languages, title: t('Multi-Language', 'متعدد اللغات'), desc: t('Full support for English, Arabic, and Urdu with proper RTL layouts. Switch languages with a single tap.', 'دعم كامل للعربية والإنجليزية والأردية مع تنسيقات RTL. بدّل اللغة بنقرة واحدة.') },
    { icon: CreditCard, title: t('In-App Fee Payment', 'دفع الرسوم داخل التطبيق'), desc: t('Secure fee payments via credit card, bank transfer, or mobile wallets. Auto-receipts sent to parents.', 'دفع آمن للرسوم عبر البطاقة الائتمانية أو التحويل البنكي أو المحافظ الإلكترونية. إيصالات تلقائية لأولياء الأمور.') },
    { icon: MessageCircle, title: t('Live Chat', 'محادثة مباشرة'), desc: t('Direct parent-teacher messaging with read receipts, file sharing, and scheduled availability windows.', 'رسائل مباشرة بين أولياء الأمور والمعلمين مع إشعارات القراءة ومشاركة الملفات وأوقات التواصل المحددة.') },
    { icon: MapPin, title: t('GPS Bus Tracking', 'تتبع الحافلة بالـ GPS'), desc: t('Real-time school bus location on map. ETA notifications when the bus is approaching your stop.', 'موقع حافلة المدرسة على الخريطة في الوقت الفعلي. إشعارات بوقت الوصول عند اقتراب الحافلة من محطتك.') },
    { icon: Calendar, title: t('Smart Timetable', 'جدول ذكي'), desc: t('Auto-synced class schedule with push reminders. Color-coded by subject for quick visual reference.', 'جدول حصص متزامن تلقائياً مع تذكيرات. مرمّز بالألوان حسب المادة للرجوع السريع.') },
  ];

  const appScreens = [
    {
      name: t('Login', 'تسجيل الدخول'),
      content: (
        <div className="p-6 flex flex-col items-center justify-center h-72">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mb-1">{t('Welcome Back', 'مرحباً بعودتك')}</div>
          <div className="text-xs text-gray-400 mb-6">{t('Sign in to continue', 'سجّل الدخول للمتابعة')}</div>
          <div className="w-full space-y-3">
            <div className="h-10 bg-gray-100 rounded-xl px-3 flex items-center">
              <span className="text-xs text-gray-400">{t('Email address', 'البريد الإلكتروني')}</span>
            </div>
            <div className="h-10 bg-gray-100 rounded-xl px-3 flex items-center">
              <span className="text-xs text-gray-400">{t('Password', 'كلمة المرور')}</span>
            </div>
            <div className="h-10 bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">{t('Sign In', 'تسجيل الدخول')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">{t('Use biometrics', 'استخدم البصمة')}</span>
          </div>
        </div>
      ),
    },
    {
      name: t('Dashboard', 'لوحة التحكم'),
      content: (
        <div className="p-4 space-y-3 h-72 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">{t('Good Morning', 'صباح الخير')}</div>
              <div className="text-sm font-bold text-gray-900">{t('Ahmed Khan', 'أحمد خان')}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4711A] to-[#E88C32]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-violet-50 rounded-xl p-3">
              <BookOpen className="w-4 h-4 text-violet-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">12</div>
              <div className="text-[10px] text-gray-500">{t('Courses', 'الدورات')}</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3">
              <ClipboardCheck className="w-4 h-4 text-emerald-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">96%</div>
              <div className="text-[10px] text-gray-500">{t('Attendance', 'الحضور')}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <BarChart3 className="w-4 h-4 text-amber-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">A+</div>
              <div className="text-[10px] text-gray-500">{t('GPA', 'المعدل')}</div>
            </div>
            <div className="bg-rose-50 rounded-xl p-3">
              <Bell className="w-4 h-4 text-rose-500 mb-1" />
              <div className="text-xs font-bold text-gray-900">3</div>
              <div className="text-[10px] text-gray-500">{t('Alerts', 'التنبيهات')}</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-bold text-gray-900 mb-2">{t("Today's Schedule", 'جدول اليوم')}</div>
            {[
              t('Mathematics — 8:00 AM', 'الرياضيات — 8:00 صباحاً'),
              t('Physics — 9:30 AM', 'الفيزياء — 9:30 صباحاً'),
              t('English — 11:00 AM', 'اللغة الإنجليزية — 11:00 صباحاً'),
            ].map((cls) => (
              <div key={cls} className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                <span className="text-[10px] text-gray-600">{cls}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: t('Courses', 'الدورات'),
      content: (
        <div className="p-4 space-y-3 h-72 overflow-hidden">
          <div className="text-sm font-bold text-gray-900 mb-1">{t('My Courses', 'دوراتي')}</div>
          {[
            { name: t('Mathematics', 'الرياضيات'), progress: 78, color: 'bg-violet-500' },
            { name: t('Physics', 'الفيزياء'), progress: 65, color: 'bg-blue-500' },
            { name: t('English Literature', 'الأدب الإنجليزي'), progress: 92, color: 'bg-emerald-500' },
            { name: t('Islamic Studies', 'الدراسات الإسلامية'), progress: 85, color: 'bg-amber-500' },
          ].map((course) => (
            <div key={course.name} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-900">{course.name}</span>
                <span className="text-[10px] text-gray-500">{course.progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: t('Chat', 'المحادثات'),
      content: (
        <div className="p-4 space-y-3 h-72 overflow-hidden">
          <div className="text-sm font-bold text-gray-900 mb-1">{t('Messages', 'الرسائل')}</div>
          {[
            { name: t('Mrs. Fatima', 'أ. فاطمة'), msg: t('Great work on the assignment!', 'عمل رائع في الواجب!'), time: t('2m ago', 'منذ 2 د'), unread: true },
            { name: t('Mr. Hassan', 'أ. حسن'), msg: t('Class rescheduled to 10 AM', 'تم تغيير موعد الحصة إلى 10 صباحاً'), time: t('1h ago', 'منذ 1 س'), unread: true },
            { name: t('Admin Office', 'مكتب الإدارة'), msg: t('Fee receipt attached', 'إيصال الرسوم مرفق'), time: t('3h ago', 'منذ 3 س'), unread: false },
            { name: t('Ms. Sarah', 'أ. سارة'), msg: t('Quiz tomorrow, chapter 5', 'اختبار غداً، الفصل 5'), time: t('Yesterday', 'أمس'), unread: false },
          ].map((chat) => (
            <div key={chat.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">{chat.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900">{chat.name}</span>
                  <span className="text-[9px] text-gray-400">{chat.time}</span>
                </div>
                <span className="text-[10px] text-gray-500 truncate block">{chat.msg}</span>
              </div>
              {chat.unread && <div className="w-2 h-2 rounded-full bg-[#D4711A] flex-shrink-0" />}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: t('Grades', 'الدرجات'),
      content: (
        <div className="p-4 space-y-3 h-72 overflow-hidden">
          <div className="text-sm font-bold text-gray-900 mb-1">{t('Report Card', 'بطاقة التقرير')}</div>
          <div className="bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-xl p-4 text-center">
            <div className="text-white/70 text-[10px]">{t('Current GPA', 'المعدل الحالي')}</div>
            <div className="text-3xl font-bold text-white">3.92</div>
            <div className="text-white/70 text-[10px]">{t('Rank: 3rd in class', 'الترتيب: الثالث في الصف')}</div>
          </div>
          {[
            { subject: t('Mathematics', 'الرياضيات'), grade: 'A+', score: '95/100' },
            { subject: t('Physics', 'الفيزياء'), grade: 'A', score: '88/100' },
            { subject: t('English', 'الإنجليزية'), grade: 'A+', score: '97/100' },
            { subject: t('Islamic Studies', 'الدراسات الإسلامية'), grade: 'A', score: '91/100' },
          ].map((item) => (
            <div key={item.subject} className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-700">{item.subject}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{item.score}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.grade}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const notifications = [
    { icon: CheckCircle2, color: 'bg-emerald-500', title: t('Attendance', 'الحضور'), msg: t('Ahmed marked Present today', 'تم تسجيل حضور أحمد اليوم'), time: t('8:02 AM', '8:02 صباحاً') },
    { icon: BarChart3, color: 'bg-violet-500', title: t('Grade Update', 'تحديث الدرجات'), msg: t('Math test score: 92/100', 'درجة اختبار الرياضيات: 92/100'), time: t('10:15 AM', '10:15 صباحاً') },
    { icon: CreditCard, color: 'bg-amber-500', title: t('Fee Reminder', 'تذكير بالرسوم'), msg: t('PKR 15,000 due by March 25', 'مستحق 15,000 ريال بحلول 25 مارس'), time: t('11:30 AM', '11:30 صباحاً') },
    { icon: Calendar, color: 'bg-blue-500', title: t('Event', 'حدث'), msg: t('Parent-Teacher meeting: March 20', 'اجتماع أولياء الأمور والمعلمين: 20 مارس'), time: t('2:00 PM', '2:00 مساءً') },
  ];

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="pt-36 pb-28 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#D4711A]/15 rounded-full filter blur-[180px]" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full filter blur-[140px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 mb-8"
              >
                <Smartphone className="w-4 h-4 text-[#E88C32]" />
                <span className="text-white/70 text-xs font-bold tracking-wider uppercase">{t('iOS & Android', 'iOS و Android')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight"
              >
                {t('School in', 'المدرسة في')}{' '}
                <span className="gradient-text">{t('Every', 'كل')}</span>
                <br />
                {t('Pocket', 'جيب')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/55 text-lg md:text-xl mb-10 leading-relaxed"
              >
                {t(
                  'Cross-platform mobile apps for students, parents, and teachers. Real-time attendance, push notifications, grade tracking, fee payments — all at your fingertips.',
                  'تطبيقات جوال متعددة المنصات للطلاب وأولياء الأمور والمعلمين. حضور فوري، إشعارات، تتبع الدرجات، دفع الرسوم — كل شيء بين يديك.'
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-lg px-10">
                  {t('Get Your App', 'احصل على تطبيقك')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link href="/pricing" className="btn-outline-white text-lg px-10">
                  {t('View Plans', 'عرض الخطط')}
                </Link>
              </motion.div>
            </div>

            {/* Hero Phones */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              {/* Phone 1 - Student App */}
              <div className="relative z-10 -mr-6 transform -rotate-6">
                <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/40 border border-gray-700 w-56">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10" />
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">C</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-900">{t('Student Portal', 'بوابة الطالب')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-violet-50 rounded-lg p-2 text-center">
                          <BookOpen className="w-3 h-3 text-violet-500 mx-auto mb-0.5" />
                          <div className="text-[8px] font-bold text-gray-900">12</div>
                          <div className="text-[7px] text-gray-500">{t('Courses', 'الدورات')}</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-2 text-center">
                          <ClipboardCheck className="w-3 h-3 text-emerald-500 mx-auto mb-0.5" />
                          <div className="text-[8px] font-bold text-gray-900">96%</div>
                          <div className="text-[7px] text-gray-500">{t('Attendance', 'الحضور')}</div>
                        </div>
                      </div>
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-gray-200 rounded-md flex-shrink-0" />
                          <div className="flex-1">
                            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full mb-1" />
                            <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Parent App */}
              <div className="relative z-20 transform rotate-3">
                <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/40 border border-gray-700 w-56">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10" />
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">C</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-900">{t('Parent Portal', 'بوابة ولي الأمر')}</span>
                      </div>
                      <div className="bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-lg p-2 text-center">
                        <div className="text-white/70 text-[7px]">{t("Ahmed's GPA", 'معدل أحمد')}</div>
                        <div className="text-white font-bold text-lg">3.92</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {['96%', 'A+', t('3rd', '3')].map((val, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-1.5 text-center">
                            <div className="text-[9px] font-bold text-gray-900">{val}</div>
                            <div className="text-[6px] text-gray-400">{[t('Attend.', 'الحضور'), t('Grade', 'الدرجة'), t('Rank', 'الترتيب')][i]}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-[8px] font-bold text-amber-700">{t('Fee Due', 'رسوم مستحقة')}</div>
                        <div className="text-[10px] font-bold text-gray-900">{t('PKR 15,000', '15,000 ريال')}</div>
                        <div className="h-5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-md mt-1 flex items-center justify-center">
                          <span className="text-white text-[7px] font-bold">{t('Pay Now', 'ادفع الآن')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Three App Variants ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-center justify-center">{t('Three Apps, One Ecosystem', 'ثلاثة تطبيقات، نظام واحد')}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('An App for', 'تطبيق لكل')} <span className="gradient-text">{t('Everyone', 'فرد')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Students, parents, and teachers each get a tailored experience designed for their specific needs.',
                'يحصل الطلاب وأولياء الأمور والمعلمون على تجربة مصممة خصيصاً لاحتياجاتهم.'
              )}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: t('Student App', 'تطبيق الطالب'),
                icon: GraduationCap,
                color: 'from-violet-500 to-purple-600',
                bgLight: 'bg-violet-50',
                features: [
                  t('Access courses & materials', 'الوصول إلى الدورات والمواد'),
                  t('Submit assignments', 'تسليم الواجبات'),
                  t('View grades & GPA', 'عرض الدرجات والمعدل'),
                  t('Chat with teachers', 'محادثة المعلمين'),
                  t('Interactive timetable', 'جدول تفاعلي'),
                  t('Offline study mode', 'وضع الدراسة بدون اتصال'),
                ],
              },
              {
                title: t('Parent App', 'تطبيق ولي الأمر'),
                icon: Users,
                color: 'from-[#D4711A] to-[#E88C32]',
                bgLight: 'bg-amber-50',
                features: [
                  t("Track child's progress", 'تتبع تقدم الطفل'),
                  t('Pay fees securely', 'دفع الرسوم بأمان'),
                  t('Message teachers', 'مراسلة المعلمين'),
                  t('View report cards', 'عرض بطاقات التقارير'),
                  t('Attendance alerts', 'تنبيهات الحضور'),
                  t('Bus GPS tracking', 'تتبع الحافلة بالـ GPS'),
                ],
              },
              {
                title: t('Teacher & Admin', 'المعلم والإدارة'),
                icon: ClipboardCheck,
                color: 'from-emerald-500 to-teal-600',
                bgLight: 'bg-emerald-50',
                features: [
                  t('Mark attendance', 'تسجيل الحضور'),
                  t('Post grades & remarks', 'نشر الدرجات والملاحظات'),
                  t('Manage class content', 'إدارة محتوى الصف'),
                  t('Send announcements', 'إرسال الإعلانات'),
                  t('Schedule meetings', 'جدولة الاجتماعات'),
                  t('Generate reports', 'إنشاء التقارير'),
                ],
              },
            ].map((app, i) => (
              <motion.div key={app.title} variants={fadeUp} custom={i} className="card-white text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <app.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">{app.title}</h3>
                <div className="space-y-3 text-left">
                  {app.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Deep Dive ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-center justify-center">{t('Packed With Features', 'مليء بالميزات')}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('Everything Your', 'كل ما تحتاجه')} <span className="gradient-text">{t('School Needs', 'مدرستك')}</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} className="card-white group text-center">
                <div className="icon-box mx-auto mb-4 group-hover:bg-[#D4711A] group-hover:text-white transition-all">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2 group-hover:text-[#D4711A] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── App Screens Showcase ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-center justify-center">{t('App Screens', 'شاشات التطبيق')}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('A Peek', 'نظرة')} <span className="gradient-text">{t('Inside', 'من الداخل')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t(
                'Beautifully designed screens that make complex information simple and accessible.',
                'شاشات مصممة بأناقة تجعل المعلومات المعقدة بسيطة وسهلة الوصول.'
              )}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {appScreens.map((screen, i) => (
              <motion.div key={screen.name} variants={fadeUp} custom={i}>
                <PhoneFrame label={screen.name} className="scale-90 md:scale-100">
                  {screen.content}
                </PhoneFrame>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Notification Flow ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label mb-4 block">{t('Never Miss a Moment', 'لا تفوّت أي لحظة')}</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t('Real-Time', 'إشعارات')} <span className="gradient-text">{t('Notifications', 'فورية')}</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {t(
                  "Parents get instant updates about their child — attendance marked, grades posted, fee reminders, and event announcements. All delivered as beautiful push notifications.",
                  'يحصل أولياء الأمور على تحديثات فورية عن أطفالهم — تسجيل الحضور، نشر الدرجات، تذكيرات الرسوم، وإعلانات الفعاليات. كلها تصل كإشعارات فورية أنيقة.'
                )}
              </p>
              <div className="space-y-3">
                {[
                  t('Attendance alerts within 2 minutes', 'تنبيهات الحضور خلال دقيقتين'),
                  t('Grade notifications in real-time', 'إشعارات الدرجات في الوقت الفعلي'),
                  t('Fee reminders 7 days before due', 'تذكيرات الرسوم قبل 7 أيام من الاستحقاق'),
                  t('Emergency broadcasts instantly', 'بث الطوارئ فوراً'),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5 border border-gray-100 flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl ${notif.color} flex items-center justify-center flex-shrink-0`}>
                    <notif.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-gray-900">{notif.title}</span>
                      <span className="text-xs text-gray-400">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{notif.msg}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4711A]/8 rounded-full filter blur-[200px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: t('50K+', '+50 ألف'), label: t('Downloads', 'تنزيل'), icon: Download },
              { number: '4.8', label: t('App Store Rating', 'تقييم متجر التطبيقات'), icon: Star },
              { number: '2', label: t('Platforms (iOS & Android)', 'المنصات (iOS و Android)'), icon: Smartphone },
              { number: '99.5%', label: t('Crash-Free Sessions', 'جلسات بدون أعطال'), icon: Shield },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#E88C32]" />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── App Store CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4 block">{t('Available Now', 'متاح الآن')}</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t('Download on', 'حمّل على')} <span className="gradient-text">{t('Any Device', 'أي جهاز')}</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {t(
                  "Your school's branded app on both App Store and Google Play. White-labeled with your logo, colors, and identity.",
                  'تطبيق مدرستك بعلامتك التجارية على App Store و Google Play. مخصص بشعارك وألوانك وهويتك.'
                )}
              </p>

              {/* Store Badges */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
                  <div className="text-2xl">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60">{t('Download on the', 'حمّل من')}</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
                  <div className="text-2xl">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60">{t('GET IT ON', 'احصل عليه من')}</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  t('White-labeled with your school branding', 'مخصص بعلامة مدرستك التجارية'),
                  t('Custom app icon and splash screen', 'أيقونة تطبيق وشاشة بداية مخصصة'),
                  t("Published under your school's name", 'منشور باسم مدرستك'),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone with store listing mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="bg-gray-50 rounded-3xl p-8 max-w-sm w-full">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-3xl">C</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{t('Your School App', 'تطبيق مدرستك')}</h3>
                    <p className="text-gray-400 text-xs mb-4">{t('By Cubico Technologies', 'من كيوبيكو تكنولوجيز')}</p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.8</span>
                    </div>
                    <div className="h-10 bg-gradient-to-r from-[#D4711A] to-[#E88C32] rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{t('GET', 'تحميل')}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-4">
                    <div className="grid grid-cols-3 text-center divide-x divide-gray-100">
                      <div>
                        <div className="text-xs font-bold text-gray-900">4.8</div>
                        <div className="text-[10px] text-gray-400">{t('Rating', 'التقييم')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">12+</div>
                        <div className="text-[10px] text-gray-400">{t('Age', 'العمر')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">{t('50K+', '+50 ألف')}</div>
                        <div className="text-[10px] text-gray-400">{t('Downloads', 'التنزيلات')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              {t(
                '\u201CThe Cubico parent app changed everything for us. I can see my son\u2019s attendance within minutes, pay fees in two taps, and message his teacher anytime. It\u2019s like having the school in my pocket \u2014 exactly as they promised.\u201D',
                '\u201Cغيّر تطبيق كيوبيكو لأولياء الأمور كل شيء بالنسبة لنا. يمكنني رؤية حضور ابني خلال دقائق، ودفع الرسوم بنقرتين، ومراسلة معلمه في أي وقت. إنه مثل حمل المدرسة في جيبي — تماماً كما وعدوا.\u201D'
              )}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center text-white font-bold text-lg">
                {t('SK', 'سخ')}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">{t('Sana Khalid', 'سناء خالد')}</h4>
                <p className="text-sm text-gray-500">{t('Parent, Al-Huda Academy, Riyadh', 'ولية أمر، أكاديمية الهدى، الرياض')}</p>
              </div>
            </div>
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
            <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#D4711A]" />
              <span className="text-[#D4711A] text-xs font-bold tracking-wider uppercase">{t('6-Week Delivery', 'تسليم خلال 6 أسابيع')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t('Get Your School App in', 'احصل على تطبيق مدرستك في')}{' '}
              <span className="gradient-text">{t('6 Weeks', '6 أسابيع')}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
              {t(
                'From design to App Store — we handle everything. Your branded mobile app, ready for students and parents, in just 6 weeks.',
                'من التصميم إلى متجر التطبيقات — نتولى كل شيء. تطبيقك المخصص جاهز للطلاب وأولياء الأمور في 6 أسابيع فقط.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-10">
                {t('Start Your App Project', 'ابدأ مشروع تطبيقك')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
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
