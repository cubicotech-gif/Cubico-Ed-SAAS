'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  SkipForward,
  SkipBack,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Film,
  Pen,
  BookOpen,
  Mic,
  Clapperboard,
  Package,
  FlaskConical,
  Star,
  Globe,
  Users,
  Paintbrush,
  Heart,
  Languages,
  Quote,
  Settings,
  Monitor,
  Layers,
  Triangle,
  Circle,
  Square,
  Hexagon,
} from 'lucide-react';
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ═══════════════════════════════════════════
   COUNTER HOOK
   ═══════════════════════════════════════════ */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
/* Data arrays moved inside component for i18n support */

/* ═══════════════════════════════════════════
   CSS SHAPE COMPONENTS
   ═══════════════════════════════════════════ */
function CategoryIcon({ type }: { type: string }) {
  switch (type) {
    case 'science':
      return (
        <div className="relative w-20 h-20">
          {/* Beaker */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 rounded-b-lg border-2 border-blue-400 bg-blue-100/50">
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-b-md" />
          </div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded" />
          {/* Bubbles */}
          <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-cyan-300 animate-bounce" />
          <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
          {/* Formula */}
          <div className="absolute -top-1 -right-1 text-[10px] font-bold text-blue-500">H₂O</div>
        </div>
      );
    case 'islamic':
      return (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Geometric pattern */}
          <div className="absolute w-16 h-16 border-2 border-emerald-400 rotate-45" />
          <div className="absolute w-12 h-12 border-2 border-teal-400 rotate-[22.5deg]" />
          <div className="absolute w-8 h-8 border-2 border-emerald-500 rotate-0" />
          <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
          {/* Corner dots */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      );
    case 'language':
      return (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Book shape */}
          <div className="absolute w-14 h-16 bg-gradient-to-br from-purple-200 to-violet-100 rounded-r-md rounded-l-sm border border-purple-300 shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 rounded-l-sm" />
            <div className="mt-3 ml-3 mr-2 space-y-1.5">
              <div className="h-1 bg-purple-300 rounded w-3/4" />
              <div className="h-1 bg-purple-200 rounded w-full" />
              <div className="h-1 bg-purple-200 rounded w-2/3" />
            </div>
          </div>
          {/* Floating letters */}
          <div className="absolute -top-1 -right-1 text-lg font-bold text-purple-500">A</div>
          <div className="absolute -bottom-1 -left-1 text-sm font-bold text-violet-400">ب</div>
        </div>
      );
    case 'social':
      return (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Globe */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 border-2 border-amber-500 relative overflow-hidden">
            <div className="absolute top-2 left-1 w-3 h-4 bg-amber-600/40 rounded-sm rotate-12" />
            <div className="absolute bottom-2 right-2 w-4 h-3 bg-amber-600/40 rounded-sm -rotate-6" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-600/30" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-600/30" />
            {/* Curved lines */}
            <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-amber-600/20 rounded-full" />
            <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-amber-600/20 rounded-full" />
          </div>
        </div>
      );
    case 'life':
      return (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* People shapes */}
          <div className="flex items-end gap-1">
            {/* Person 1 */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-rose-400" />
              <div className="w-3 h-6 bg-rose-300 rounded-t-sm mt-0.5" />
            </div>
            {/* Person 2 (taller) */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-pink-500" />
              <div className="w-4 h-8 bg-pink-400 rounded-t-sm mt-0.5" />
            </div>
            {/* Person 3 */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-rose-400" />
              <div className="w-3 h-6 bg-rose-300 rounded-t-sm mt-0.5" />
            </div>
          </div>
          {/* Heart */}
          <div className="absolute -top-1 right-1 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
        </div>
      );
    case 'custom':
      return (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Paintbrush */}
          <div className="relative">
            <div className="w-3 h-10 bg-gradient-to-b from-[#D14F38] to-[#E8634A] rounded-t-full rotate-[-30deg]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-4 bg-gradient-to-b from-[#E8634A] to-orange-300 rounded-b-full rotate-[-30deg]" />
          </div>
          {/* Paint splatters */}
          <div className="absolute top-1 left-2 w-3 h-3 rounded-full bg-[#E8634A]/60" />
          <div className="absolute bottom-2 right-1 w-2 h-2 rounded-full bg-[#D14F38]/50" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-orange-400" />
        </div>
      );
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════ */
function StatCounter({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(number);
  return (
    <motion.div ref={ref} variants={fadeUp} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white font-[family-name:var(--font-clash)]">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400 mt-2 text-lg">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function AnimationStudioPage() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const contentCategories = [
    {
      title: t('Science & Math', 'العلوم والرياضيات'),
      desc: t('Complex concepts made visual — from molecular structures to algebraic equations through vivid 3D animations.', 'مفاهيم معقدة مرئية — من الهياكل الجزيئية إلى المعادلات الجبرية من خلال رسوم متحركة ثلاثية الأبعاد حية.'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconType: 'science',
    },
    {
      title: t('Islamic Studies', 'الدراسات الإسلامية'),
      desc: t('Beautiful geometric patterns and calligraphy brought to life with reverent, culturally authentic animations.', 'أنماط هندسية جميلة وخط عربي تُحيا برسوم متحركة ثقافية أصيلة ومُوقّرة.'),
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconType: 'islamic',
    },
    {
      title: t('Language Arts', 'فنون اللغة'),
      desc: t('Storytelling, grammar, and literature visualized through character animations and narrative-driven content.', 'سرد القصص والقواعد والأدب من خلال رسوم متحركة للشخصيات ومحتوى قائم على السرد.'),
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      iconType: 'language',
    },
    {
      title: t('Social Studies', 'الدراسات الاجتماعية'),
      desc: t('History, geography, and civics come alive with animated maps, timelines, and historical recreations.', 'التاريخ والجغرافيا والتربية المدنية تنبض بالحياة مع خرائط متحركة وجداول زمنية وإعادة إنشاء تاريخية.'),
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      iconType: 'social',
    },
    {
      title: t('Life Skills', 'المهارات الحياتية'),
      desc: t('Practical life lessons taught through relatable character-driven scenarios and interactive animations.', 'دروس حياتية عملية من خلال سيناريوهات قائمة على الشخصيات ورسوم متحركة تفاعلية.'),
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      iconType: 'life',
    },
    {
      title: t('Custom Content', 'محتوى مخصص'),
      desc: t('Bespoke animations tailored to your institution\'s unique curriculum needs and branding guidelines.', 'رسوم متحركة مصممة خصيصًا لاحتياجات المنهج الفريدة لمؤسستك وإرشادات العلامة التجارية.'),
      color: 'from-[#E8634A] to-[#D14F38]',
      bgColor: 'bg-orange-50',
      iconType: 'custom',
    },
  ];

  const productionSteps = [
    { title: t('Script Writing', 'كتابة السيناريو'), desc: t('Curriculum-aligned scripts crafted by subject matter experts and creative writers.', 'نصوص متوافقة مع المنهج من إعداد خبراء المادة والكتّاب المبدعين.'), icon: Pen },
    { title: t('Storyboarding', 'لوحة القصة'), desc: t('Visual blueprints mapping every scene, transition, and key frame of the animation.', 'مخططات بصرية ترسم كل مشهد وانتقال وإطار رئيسي للرسوم المتحركة.'), icon: Layers },
    { title: t('Voice Recording', 'تسجيل الصوت'), desc: t('Professional narration in English, Arabic, and Urdu by native-speaking voice artists.', 'سرد احترافي بالإنجليزية والعربية والأردية بواسطة فنانين صوتيين ناطقين أصليين.'), icon: Mic },
    { title: t('Animation', 'الرسوم المتحركة'), desc: t('2D & 3D animation production using industry-standard tools and techniques.', 'إنتاج رسوم متحركة ثنائية وثلاثية الأبعاد باستخدام أدوات وتقنيات معيارية.'), icon: Clapperboard },
    { title: t('Post-Production', 'مرحلة ما بعد الإنتاج'), desc: t('Sound design, color grading, effects, and quality assurance review.', 'تصميم الصوت وتدريج الألوان والمؤثرات ومراجعة ضمان الجودة.'), icon: Settings },
    { title: t('Delivery', 'التسليم'), desc: t('Multi-format export optimized for LMS, mobile, web, and classroom display.', 'تصدير متعدد الصيغ مُحسّن لنظام إدارة التعلم والجوال والويب وعرض الفصول الدراسية.'), icon: Package },
  ];

  const portfolioStats = [
    { number: 2000, suffix: '+', label: t('Animations Produced', 'رسوم متحركة مُنتجة') },
    { number: 8, suffix: '', label: t('Subject Areas', 'مجالات دراسية') },
    { number: 3, suffix: '', label: t('Languages Supported', 'لغات مدعومة') },
    { number: 150, suffix: '+', label: t('Voice Artists', 'فنانين صوتيين') },
  ];

  const curriculumData = [
    { grade: t('KG', 'رياض الأطفال'), subjects: [true, true, false, false, true, false] },
    { grade: t('Grade 1', 'الصف ١'), subjects: [true, true, true, true, true, false] },
    { grade: t('Grade 2', 'الصف ٢'), subjects: [true, true, true, true, true, false] },
    { grade: t('Grade 3', 'الصف ٣'), subjects: [true, true, true, true, true, true] },
    { grade: t('Grade 4', 'الصف ٤'), subjects: [true, true, true, true, true, true] },
    { grade: t('Grade 5', 'الصف ٥'), subjects: [true, true, true, true, true, true] },
    { grade: t('Grade 6', 'الصف ٦'), subjects: [true, true, true, true, false, true] },
    { grade: t('Grade 7', 'الصف ٧'), subjects: [true, true, true, true, false, true] },
    { grade: t('Grade 8', 'الصف ٨'), subjects: [true, true, true, true, false, true] },
    { grade: t('Grade 9', 'الصف ٩'), subjects: [true, false, true, true, false, true] },
    { grade: t('Grade 10', 'الصف ١٠'), subjects: [true, false, true, true, false, true] },
    { grade: t('Grade 11', 'الصف ١١'), subjects: [true, false, false, true, false, true] },
    { grade: t('Grade 12', 'الصف ١٢'), subjects: [true, false, false, true, false, true] },
  ];

  const subjectHeaders = [
    t('Science & Math', 'العلوم والرياضيات'),
    t('Islamic Studies', 'الدراسات الإسلامية'),
    t('Language Arts', 'فنون اللغة'),
    t('Social Studies', 'الدراسات الاجتماعية'),
    t('Life Skills', 'المهارات الحياتية'),
    t('Custom', 'مخصص'),
  ];

  const chapterList = [
    { title: t('Introduction to Photosynthesis', 'مقدمة في التمثيل الضوئي'), duration: '4:32', active: true },
    { title: t('Light Reactions Explained', 'شرح التفاعلات الضوئية'), duration: '6:15', active: false },
    { title: t('Calvin Cycle in Detail', 'دورة كالفين بالتفصيل'), duration: '5:48', active: false },
    { title: t('Factors Affecting Rate', 'العوامل المؤثرة على المعدل'), duration: '3:56', active: false },
    { title: t('Review & Assessment', 'المراجعة والتقييم'), duration: '7:20', active: false },
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">

        {/* ═══════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════ */}
        <section className="section-dark relative min-h-screen flex items-center pt-32 pb-20">
          {/* Background effects */}
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8634A]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp} custom={0} className="section-label-light mb-6">
                  <Film className="w-4 h-4" /> {t('Animation Studio', 'استوديو الرسوم المتحركة')}
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-clash)] leading-[1.1] mb-6"
                >
                  {t('Where Education', 'حيث يلتقي التعليم')}
                  <br />
                  {t('Meets', 'مع')}{' '}
                  <span className="gradient-text">{t('Imagination', 'الخيال')}</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="text-xl text-gray-400 max-w-lg mb-8 leading-relaxed"
                >
                  {t('Professional 2D & 3D animated educational content that transforms complex subjects into unforgettable visual stories for K-12 students across the Middle East and South Asia.', 'محتوى تعليمي متحرك احترافي ثنائي وثلاثي الأبعاد يحوّل المواضيع المعقدة إلى قصص بصرية لا تُنسى لطلاب مراحل التعليم العام في الشرق الأوسط وجنوب آسيا.')}
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    {t('Start Your Project', 'ابدأ مشروعك')} <ArrowRight className="w-5 h-5 ml-2 rtl:rotate-180" />
                  </Link>
                  <button className="btn-outline-white">
                    <Play className="w-5 h-5 mr-2" /> {t('Watch Showreel', 'شاهد العرض')}
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="flex gap-8 mt-12"
                >
                  {['English', 'العربية', 'اردو'].map((lang) => (
                    <span key={lang} className="text-gray-500 text-sm font-medium border border-gray-700 rounded-full px-4 py-1.5">
                      {lang}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Video Player Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl shadow-[#E8634A]/10">
                  {/* Player header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-3 text-gray-400 text-xs">cubico-player.edu</span>
                  </div>

                  {/* Video area with animated scene */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#16213e] overflow-hidden">
                    {/* Abstract animated scene - floating shapes */}
                    <motion.div
                      animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-gradient-to-br from-[#E8634A] to-amber-400 opacity-80"
                    />
                    <motion.div
                      animate={{ y: [10, -15, 10], rotate: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      className="absolute top-[25%] right-[15%] w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 opacity-70"
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    />
                    <motion.div
                      animate={{ y: [-8, 12, -8], x: [-5, 5, -5] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="absolute bottom-[20%] left-[25%] w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 rotate-12 opacity-75"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-[40%] left-[50%] w-12 h-12 rounded-full border-4 border-emerald-400/60"
                    />
                    <motion.div
                      animate={{ y: [5, -10, 5], rotate: [45, 90, 45] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                      className="absolute bottom-[30%] right-[20%] w-10 h-10 bg-gradient-to-br from-rose-400 to-red-500 opacity-70"
                    />
                    <motion.div
                      animate={{ y: [-5, 8, -5] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                      className="absolute top-[60%] left-[15%] w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 opacity-60"
                    />
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                    {/* Center play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-full bg-[#E8634A]/90 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-lg shadow-[#E8634A]/30"
                      >
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </motion.div>
                    </div>
                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-xs text-gray-400 mb-1">{t('Now Playing', 'يتم التشغيل الآن')}</div>
                      <div className="text-white font-medium text-sm">{t('The Water Cycle - Grade 4 Science', 'دورة الماء - علوم الصف الرابع')}</div>
                    </div>
                  </div>

                  {/* Player controls */}
                  <div className="px-4 py-3 bg-gray-800/80">
                    {/* Timeline */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-gray-400 w-8">1:34</span>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#E8634A] to-amber-400 rounded-full"
                          style={{ width: '35%' }}
                          animate={{ width: ['35%', '38%', '35%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 w-8">4:32</span>
                    </div>
                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <SkipBack className="w-4 h-4 text-gray-400" />
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <Play className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" />
                        </div>
                        <SkipForward className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-gray-400" />
                        <div className="w-12 h-1 bg-gray-600 rounded-full">
                          <div className="w-3/4 h-full bg-white rounded-full" />
                        </div>
                        <span className="text-[10px] text-gray-500 border border-gray-600 rounded px-1.5 py-0.5">HD</span>
                        <Maximize className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: CONTENT CATEGORIES
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8634A]/5 rounded-full blur-[120px]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="section-label mx-auto mb-4">
                <Sparkles className="w-4 h-4" /> {t('Content We Create', 'المحتوى الذي ننشئه')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-gray-900 mb-4"
              >
                {t('Animation for Every', 'رسوم متحركة لكل')} <span className="gradient-text">{t('Subject', 'مادة')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t('Our creative studio produces curriculum-aligned animated content across every major subject area, designed for maximum engagement and learning retention.', 'ينتج استوديونا الإبداعي محتوى متحركًا متوافقًا مع المنهج عبر كل مجال دراسي رئيسي، مصمم لأقصى تفاعل واحتفاظ بالتعلم.')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {contentCategories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-white group cursor-pointer"
                >
                  {/* Icon area */}
                  <div className={`${cat.bgColor} rounded-2xl p-6 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                    <CategoryIcon type={cat.iconType} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-clash)] mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{cat.desc}</p>
                  <div className="mt-4 flex items-center text-[#E8634A] font-medium text-sm group-hover:gap-2 transition-all">
                    {t('Learn More', 'اعرف المزيد')} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3: PRODUCTION PROCESS
            ═══════════════════════════════════════════ */}
        <section className="section-dark py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8634A]/5 rounded-full blur-[150px]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeUp} className="section-label-light mx-auto mb-4">
                <Clapperboard className="w-4 h-4" /> {t('Our Process', 'عمليتنا')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-white mb-4"
              >
                {t('From Script to', 'من النص إلى')} <span className="gradient-text">{t('Screen', 'الشاشة')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t('Our end-to-end production pipeline ensures every animation is curriculum-aligned, pedagogically sound, and visually stunning.', 'يضمن خط إنتاجنا الشامل أن كل رسوم متحركة متوافقة مع المنهج وسليمة تربويًا ومذهلة بصريًا.')}
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8634A]/30 to-transparent -translate-y-1/2" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {productionSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      variants={fadeUp}
                      custom={i}
                      className="relative"
                    >
                      <div className="card-dark group hover:border-[#E8634A]/30 transition-all duration-300">
                        {/* Step number */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#E8634A] text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-[#E8634A]/30">
                          {i + 1}
                        </div>
                        <div className="icon-box mb-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white font-[family-name:var(--font-clash)] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                      {/* Arrow connector for desktop */}
                      {i < productionSteps.length - 1 && i !== 2 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 text-[#E8634A]/40">
                          <ChevronRight className="w-6 h-6" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4: BEFORE / AFTER
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="section-label mx-auto mb-4">
                <Monitor className="w-4 h-4" /> {t('The Difference', 'الفرق')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-gray-900 mb-4"
              >
                {t('See the', 'شاهد')} <span className="gradient-text">{t('Transformation', 'التحول')}</span>
              </motion.h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* BEFORE - Traditional */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideLeft}
              >
                <div className="text-center mb-4">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{t('Traditional Teaching', 'التعليم التقليدي')}</span>
                </div>
                <div className="bg-gray-200 rounded-2xl p-6 border-2 border-gray-300 relative overflow-hidden">
                  {/* Mockup: boring slide */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 rounded w-4/5" />
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 rounded w-2/3" />
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 h-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                        <div className="text-3xl text-gray-300">?</div>
                      </div>
                      <div className="flex-1 space-y-2 pt-2">
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-4/5" />
                        <div className="h-2 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                  {/* Boredom indicators */}
                  <div className="absolute top-3 right-3 text-gray-400 text-xs bg-gray-300/80 rounded px-2 py-1">
                    😴 {t('Low Engagement', 'تفاعل منخفض')}
                  </div>
                </div>
              </motion.div>

              {/* AFTER - Cubico Animation */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideRight}
              >
                <div className="text-center mb-4">
                  <span className="text-sm font-semibold text-[#E8634A] uppercase tracking-wider">{t('With Cubico Animation', 'مع رسوم كيوبيكو المتحركة')}</span>
                </div>
                <div className="bg-gradient-to-br from-[#E8634A]/10 to-purple-500/10 rounded-2xl p-6 border-2 border-[#E8634A]/30 relative overflow-hidden">
                  {/* Mockup: vibrant animated lesson */}
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    {/* Vibrant header */}
                    <div className="h-5 bg-gradient-to-r from-[#E8634A] to-amber-400 rounded w-3/4 mb-4" />
                    {/* Visual content area */}
                    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-4 mb-4 relative overflow-hidden">
                      {/* Animated shapes */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8634A] to-amber-300 absolute top-2 right-4"
                      />
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 absolute bottom-2 left-4"
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      />
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-300 to-blue-400 mx-auto rotate-12" />
                      {/* Chart bars */}
                      <div className="flex items-end justify-center gap-1 mt-3 h-10">
                        {[60, 80, 45, 90, 70].map((h, j) => (
                          <motion.div
                            key={j}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.1, duration: 0.5 }}
                            className="w-4 rounded-t bg-gradient-to-t from-[#E8634A] to-amber-300"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Interactive elements */}
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{t('INTERACTIVE QUIZ', 'اختبار تفاعلي')}</span>
                      </div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-purple-400 to-violet-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{t('3D MODEL', 'نموذج ثلاثي الأبعاد')}</span>
                      </div>
                    </div>
                  </div>
                  {/* Engagement indicator */}
                  <div className="absolute top-3 right-3 text-[10px] bg-emerald-500/90 text-white rounded px-2 py-1 font-medium">
                    {t('94% Engagement Rate', 'معدل تفاعل ٩٤٪')}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 5: VIDEO PLAYER MOCKUP
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="section-label mx-auto mb-4">
                <Play className="w-4 h-4" /> {t('Content Player', 'مشغل المحتوى')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-gray-900 mb-4"
              >
                {t('The Cubico', 'مشغل كيوبيكو')} <span className="gradient-text">{t('Player', 'للمحتوى')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t('Our purpose-built content player delivers animations seamlessly across all devices with chapter navigation, multi-language support, and adaptive quality.', 'يقدم مشغل المحتوى المصمم خصيصًا الرسوم المتحركة بسلاسة عبر جميع الأجهزة مع التنقل بين الفصول ودعم متعدد اللغات وجودة تكيفية.')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_280px]">
                  {/* Main video area */}
                  <div>
                    {/* Video display */}
                    <div className="relative aspect-video bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
                      {/* Animated gradient background simulating animation */}
                      <motion.div
                        animate={{
                          background: [
                            'radial-gradient(circle at 30% 40%, #E8634A33 0%, transparent 50%)',
                            'radial-gradient(circle at 70% 60%, #E8634A33 0%, transparent 50%)',
                            'radial-gradient(circle at 30% 40%, #E8634A33 0%, transparent 50%)',
                          ],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0"
                      />
                      {/* Floating elements */}
                      <motion.div
                        animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-[20%] left-[15%]"
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400/60 to-emerald-500/60 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-300/80 to-emerald-400/80 flex items-center justify-center">
                            <div className="text-white text-xs font-bold">O₂</div>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        className="absolute top-[30%] right-[20%]"
                      >
                        <div className="w-16 h-20 relative">
                          <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-amber-700 to-amber-600 rounded-b" />
                          <div className="w-12 h-14 mx-auto bg-gradient-to-t from-green-600 to-green-400 rounded-t-full" />
                        </div>
                      </motion.div>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute bottom-[20%] left-[40%]"
                      >
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
                          <div className="text-yellow-300 text-xs font-bold">{t('Sunlight', 'ضوء الشمس')}</div>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent" />
                        </div>
                      </motion.div>
                      {/* Title bar */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold text-sm">{t('Photosynthesis - How Plants Make Food', 'التمثيل الضوئي - كيف تصنع النباتات الغذاء')}</div>
                          <div className="text-gray-400 text-xs">{t('Grade 4 - Science - Chapter 3', 'الصف الرابع - العلوم - الفصل ٣')}</div>
                        </div>
                        <div className="bg-[#E8634A] text-white text-[10px] font-bold px-2 py-1 rounded">
                          {t('HD 1080p', 'عالي الدقة ١٠٨٠بكسل')}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="px-5 py-4 bg-gray-800/50">
                      {/* Progress bar */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-gray-400 font-mono w-10">1:34</span>
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full cursor-pointer group relative">
                          <div className="h-full bg-gradient-to-r from-[#E8634A] to-amber-400 rounded-full relative" style={{ width: '35%' }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono w-10">4:32</span>
                      </div>
                      {/* Button row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <SkipBack className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5 text-gray-900" />
                            ) : (
                              <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                            )}
                          </button>
                          <SkipForward className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                          <span className="text-xs text-gray-500 ml-2">1.0x</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-gray-400" />
                            <div className="w-16 h-1 bg-gray-600 rounded-full">
                              <div className="w-3/4 h-full bg-white rounded-full" />
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-400 border border-gray-600 rounded px-1.5 py-0.5 cursor-pointer hover:border-gray-400 transition-colors">
                            1080p
                          </div>
                          <Languages className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                          <Maximize className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapter sidebar */}
                  <div className="border-l border-gray-800 bg-gray-900/50 p-4 hidden lg:block">
                    <h4 className="text-white font-bold text-sm mb-1 font-[family-name:var(--font-clash)]">{t('Chapters', 'الفصول')}</h4>
                    <p className="text-gray-500 text-xs mb-4">{t('5 lessons', '٥ دروس')} &middot; {t('28 min total', '٢٨ دقيقة إجمالاً')}</p>
                    <div className="space-y-2">
                      {chapterList.map((ch, i) => (
                        <div
                          key={i}
                          className={`rounded-lg p-2.5 cursor-pointer transition-all ${
                            ch.active
                              ? 'bg-[#E8634A]/20 border border-[#E8634A]/30'
                              : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex gap-2">
                            {/* Thumbnail */}
                            <div className={`w-14 h-9 rounded flex-shrink-0 flex items-center justify-center ${
                              ch.active
                                ? 'bg-gradient-to-br from-[#E8634A] to-amber-500'
                                : 'bg-gray-800'
                            }`}>
                              {ch.active ? (
                                <Play className="w-3 h-3 text-white" fill="white" />
                              ) : (
                                <span className="text-gray-500 text-[10px]">{i + 1}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-[11px] font-medium truncate ${ch.active ? 'text-[#E8634A]' : 'text-gray-300'}`}>
                                {ch.title}
                              </div>
                              <div className="text-[10px] text-gray-500">{ch.duration}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 6: PORTFOLIO STATS
            ═══════════════════════════════════════════ */}
        <section className="section-dark py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#E8634A]/5 via-transparent to-transparent" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-white mb-4"
              >
                {t('Numbers That', 'أرقام')} <span className="gradient-text">{t('Speak', 'تتحدث')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto">
                {t('A decade of animating education across the region.', 'عقد من تحريك التعليم عبر المنطقة.')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {portfolioStats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 7: CURRICULUM MAP
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="section-label mx-auto mb-4">
                <BookOpen className="w-4 h-4" /> {t('Coverage', 'التغطية')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-gray-900 mb-4"
              >
                {t('Curriculum', 'خريطة تغطية')} <span className="gradient-text">{t('Coverage Map', 'المنهج')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t('See which grades and subjects already have animated content available, ready for immediate deployment.', 'اطلع على الصفوف والمواد التي تتوفر لها بالفعل محتوى متحرك، جاهز للنشر الفوري.')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="overflow-x-auto"
            >
              <div className="min-w-[640px]">
                {/* Header row */}
                <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1">
                  <div className="p-3 text-sm font-bold text-gray-500 font-[family-name:var(--font-clash)]">{t('Grade', 'الصف')}</div>
                  {subjectHeaders.map((h) => (
                    <div key={h} className="p-3 text-xs font-bold text-gray-500 text-center font-[family-name:var(--font-clash)]">
                      {h}
                    </div>
                  ))}
                </div>
                {/* Data rows */}
                {curriculumData.map((row, ri) => (
                  <motion.div
                    key={row.grade}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ri * 0.04 }}
                    className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1"
                  >
                    <div className="bg-gray-100 rounded-lg p-3 text-sm font-semibold text-gray-700 flex items-center">
                      {row.grade}
                    </div>
                    {row.subjects.map((available, si) => (
                      <div
                        key={si}
                        className={`rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${
                          available
                            ? 'bg-gradient-to-br from-[#E8634A]/10 to-amber-100 hover:from-[#E8634A]/20 hover:to-amber-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        {available ? (
                          <CheckCircle2 className="w-5 h-5 text-[#E8634A]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-gray-400 text-sm mt-6"
            >
              {t('Coverage varies by curriculum framework. Contact us for your specific requirements.', 'تختلف التغطية حسب إطار المنهج. تواصل معنا لمتطلباتك الخاصة.')}
            </motion.p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 8: LANGUAGE SUPPORT
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="section-label mx-auto mb-4">
                <Globe className="w-4 h-4" /> {t('Multilingual', 'متعدد اللغات')}
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-clash)] text-gray-900 mb-4"
              >
                {t('One Lesson, Three', 'درس واحد، ثلاث')} <span className="gradient-text">{t('Languages', 'لغات')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t('Every animation is produced in English, Arabic, and Urdu with native voice artists, culturally adapted visuals, and proper text direction support.', 'يتم إنتاج كل رسوم متحركة بالإنجليزية والعربية والأردية مع فنانين صوتيين أصليين ومرئيات مكيفة ثقافيًا ودعم اتجاه النص المناسب.')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* English */}
              <motion.div variants={fadeUp} custom={0} className="card-white">
                <div className="bg-blue-50 rounded-xl p-6 mb-5">
                  <div className="text-left">
                    <div className="text-3xl font-bold text-blue-600 font-[family-name:var(--font-clash)] mb-2">{t('English', 'الإنجليزية')}</div>
                    <div className="text-sm text-blue-400 mb-4">{t('Left-to-Right', 'من اليسار إلى اليمين')}</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="h-2 bg-blue-200 rounded w-3/4 mb-2" />
                      <div className="h-1.5 bg-blue-100 rounded w-full mb-1" />
                      <div className="h-1.5 bg-blue-100 rounded w-5/6 mb-1" />
                      <div className="h-1.5 bg-blue-100 rounded w-2/3" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-clash)] mb-2">{t('English Content', 'المحتوى الإنجليزي')}</h3>
                <p className="text-gray-500 text-sm">{t('Full curriculum coverage with native English narration and on-screen text.', 'تغطية كاملة للمنهج مع سرد إنجليزي أصلي ونص على الشاشة.')}</p>
              </motion.div>

              {/* Arabic */}
              <motion.div variants={fadeUp} custom={1} className="card-white">
                <div className="bg-emerald-50 rounded-xl p-6 mb-5">
                  <div className="text-right" dir="rtl">
                    <div className="text-3xl font-bold text-emerald-600 font-[family-name:var(--font-clash)] mb-2">العربية</div>
                    <div className="text-sm text-emerald-400 mb-4">من اليمين إلى اليسار</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="h-2 bg-emerald-200 rounded w-3/4 mb-2 ml-auto" />
                      <div className="h-1.5 bg-emerald-100 rounded w-full mb-1" />
                      <div className="h-1.5 bg-emerald-100 rounded w-5/6 mb-1 ml-auto" />
                      <div className="h-1.5 bg-emerald-100 rounded w-2/3 ml-auto" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-clash)] mb-2">{t('Arabic Content', 'المحتوى العربي')}</h3>
                <p className="text-gray-500 text-sm">{t('RTL layout with Arabic narration, culturally adapted examples, and proper typography.', 'تخطيط من اليمين لليسار مع سرد عربي وأمثلة مكيفة ثقافيًا وطباعة مناسبة.')}</p>
              </motion.div>

              {/* Urdu */}
              <motion.div variants={fadeUp} custom={2} className="card-white">
                <div className="bg-amber-50 rounded-xl p-6 mb-5">
                  <div className="text-right" dir="rtl">
                    <div className="text-3xl font-bold text-amber-600 font-[family-name:var(--font-clash)] mb-2">اردو</div>
                    <div className="text-sm text-amber-400 mb-4">دائیں سے بائیں</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="h-2 bg-amber-200 rounded w-3/4 mb-2 ml-auto" />
                      <div className="h-1.5 bg-amber-100 rounded w-full mb-1" />
                      <div className="h-1.5 bg-amber-100 rounded w-5/6 mb-1 ml-auto" />
                      <div className="h-1.5 bg-amber-100 rounded w-2/3 ml-auto" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-clash)] mb-2">{t('Urdu Content', 'المحتوى الأردي')}</h3>
                <p className="text-gray-500 text-sm">{t('RTL layout with Urdu narration, Nastaliq-friendly design, and South Asian cultural context.', 'تخطيط من اليمين لليسار مع سرد أردي وتصميم متوافق مع النستعليق وسياق ثقافي جنوب آسيوي.')}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 9: TESTIMONIAL
            ═══════════════════════════════════════════ */}
        <section className="section-dark py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-15" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E8634A]/8 rounded-full blur-[120px]" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeUp}>
                <Quote className="w-16 h-16 text-[#E8634A]/30 mx-auto mb-8" />
              </motion.div>
              <motion.blockquote
                variants={fadeUp}
                className="text-2xl md:text-3xl text-white font-[family-name:var(--font-clash)] leading-relaxed mb-8"
              >
                {t('\u201cCubico\u2019s animations have completely transformed how our students engage with science and mathematics. What used to take three class periods to explain now clicks in a single animated lesson. The quality rivals anything from international studios, but it\u2019s built specifically for our curriculum.\u201d', '\u201cحوّلت رسوم كيوبيكو المتحركة تمامًا طريقة تفاعل طلابنا مع العلوم والرياضيات. ما كان يستغرق ثلاث حصص لشرحه أصبح واضحًا في درس متحرك واحد. الجودة تنافس أي شيء من الاستوديوهات الدولية، لكنها مصممة خصيصًا لمنهجنا.\u201d')}
              </motion.blockquote>
              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8634A] to-amber-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">{t('Dr. Sarah Al-Rashid', 'د. سارة الراشد')}</div>
                    <div className="text-gray-400 text-sm">{t('Curriculum Director, Gulf International Academy', 'مديرة المناهج، أكاديمية الخليج الدولية')}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#E8634A] fill-[#E8634A]" />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 10: CTA
            ═══════════════════════════════════════════ */}
        <section className="py-24 bg-gradient-to-br from-[#E8634A] to-[#D14F38] relative overflow-hidden">
          {/* Decorative shapes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 right-10 w-40 h-40 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-10 left-10 w-60 h-60 border border-white/10 rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-8 border border-white/20"
              >
                <Sparkles className="w-4 h-4" /> {t('Ready to transform your curriculum?', 'هل أنت مستعد لتحويل منهجك؟')}
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-clash)] mb-6 leading-tight"
              >
                {t('Bring Your Curriculum', 'أحيِ منهجك')}
                <br />
                {t('to Life', 'الدراسي')}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                {t('Join hundreds of schools across the region who have elevated their teaching with Cubico\u2019s animated educational content.', 'انضم إلى مئات المدارس عبر المنطقة التي ارتقت بتعليمها مع محتوى كيوبيكو التعليمي المتحرك.')}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#E8634A] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {t('Start a Project', 'ابدأ مشروعاً')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link
                  href="/solutions"
                  className="btn-outline-white"
                >
                  {t('Explore All Solutions', 'استكشف جميع الحلول')}
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/80" /> {t('Free Consultation', 'استشارة مجانية')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/80" /> {t('Custom Quotes', 'عروض أسعار مخصصة')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/80" /> {t('2-Week Pilot Available', 'تجربة لمدة أسبوعين متاحة')}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
