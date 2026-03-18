'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BookOpen,
  Award,
  Globe,
  Users,
  Lightbulb,
  Target,
  Zap,
  Shield,
  ArrowRight,
  Monitor,
  Film,
  CheckCircle2,
  Heart,
  TrendingUp,
  Clock,
  MapPin,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ── Animation Variants ── */
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

export default function AboutPage() {
  const { t } = useLanguage();

  /* ── Data ── */
  const timeline = [
    { year: '2019', title: t('The Spark', 'الشرارة'), desc: t('Founded in Lahore with a mission to digitize Pakistani schools. First 12 schools onboarded with our LMS platform.', 'تأسست في لاهور بمهمة رقمنة المدارس الباكستانية. تم ضم أول 12 مدرسة إلى منصة نظام إدارة التعلم الخاصة بنا.'), img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
    { year: '2021', title: t('Animation Studio Launched', 'إطلاق استوديو الرسوم المتحركة'), desc: t('Built an in-house 2D & 3D animation studio. First Urdu-language animated curriculum shipped to 80+ schools.', 'بناء استوديو داخلي للرسوم المتحركة ثنائية وثلاثية الأبعاد. تم شحن أول منهج متحرك باللغة الأردية إلى أكثر من 80 مدرسة.'), img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80' },
    { year: '2022', title: t('Expanding to Saudi Arabia', 'التوسع إلى المملكة العربية السعودية'), desc: t('Partnered with private schools in Riyadh and Jeddah. Added Arabic content support and RTL platform capabilities.', 'شراكة مع المدارس الخاصة في الرياض وجدة. إضافة دعم المحتوى العربي وإمكانيات المنصة من اليمين إلى اليسار.'), img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80' },
    { year: '2024', title: t('Canada & Full-Stack ERP', 'كندا ونظام ERP المتكامل'), desc: t('Launched Cubico Manage™ ERP. Onboarded institutions in Ontario, Canada. Crossed 500+ active schools.', 'إطلاق نظام Cubico Manage™ ERP. ضم مؤسسات في أونتاريو، كندا. تجاوزنا 500+ مدرسة نشطة.'), img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80' },
    { year: '2025', title: t('760+ Schools and Growing', '760+ مدرسة ونستمر في النمو'), desc: t('Five integrated products. 85K+ active students. 24/7 support across three time zones. The ecosystem is complete.', 'خمسة منتجات متكاملة. أكثر من 85 ألف طالب نشط. دعم على مدار الساعة عبر ثلاث مناطق زمنية. النظام البيئي مكتمل.'), img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80' },
  ];

  const team = [
    { name: t('Rooh Ul Hasnain', 'روح الحسنين'), role: t('Founder & CEO', 'المؤسس والرئيس التنفيذي'), initials: t('RH', 'ره'), bio: t('Visionary leader driving Cubico\'s mission to transform education through technology. 12+ years in education and tech.', 'قائد صاحب رؤية يقود مهمة كيوبيكو لتحويل التعليم من خلال التكنولوجيا. أكثر من 12 عامًا في التعليم والتقنية.'), gradient: 'from-[#D4711A] to-[#E88C32]' },
    { name: t('Abdul Raffay Vohra', 'عبد الرفاي فوهرا'), role: t('Co-Founder & CSO', 'المؤسس المشارك ومسؤول الاستراتيجية'), initials: t('AV', 'عف'), bio: t('Strategic mind behind Cubico\'s growth. Expert in scaling EdTech solutions across emerging markets.', 'العقل الاستراتيجي وراء نمو كيوبيكو. خبير في توسيع حلول تكنولوجيا التعليم عبر الأسواق الناشئة.'), gradient: 'from-[#B85E15] to-[#D4711A]' },
    { name: t('Hassan Khan', 'حسان خان'), role: t('Head of Engineering', 'رئيس قسم الهندسة'), initials: t('HK', 'حخ'), bio: t('Led product at two EdTech startups before joining Cubico.', 'قاد المنتجات في شركتين ناشئتين في تكنولوجيا التعليم قبل الانضمام إلى كيوبيكو.'), gradient: 'from-[#C0651A] to-[#E88C32]' },
    { name: t('Ayesha Malik', 'عائشة مالك'), role: t('Creative Director', 'المديرة الإبداعية'), initials: t('AM', 'عم'), bio: t('Animation specialist. Designed curricula used by 200+ schools.', 'متخصصة في الرسوم المتحركة. صممت مناهج تستخدمها أكثر من 200 مدرسة.'), gradient: 'from-[#8B4513] to-[#D4711A]' },
    { name: t('Dr. Usman Tariq', 'د. عثمان طارق'), role: t('Head of Curriculum', 'رئيس قسم المناهج'), initials: t('UT', 'عط'), bio: t('PhD in Education. 20 years of curriculum design experience.', 'دكتوراه في التعليم. 20 عامًا من الخبرة في تصميم المناهج.'), gradient: 'from-[#A0522D] to-[#C0651A]' },
    { name: t('Nadia Bukhari', 'نادية بخاري'), role: t('VP Operations', 'نائبة رئيس العمليات'), initials: t('NB', 'نب'), bio: t('Manages onboarding for 100+ schools per quarter across 3 countries.', 'تدير عملية ضم أكثر من 100 مدرسة كل ربع سنة عبر 3 دول.'), gradient: 'from-[#CD853F] to-[#D4711A]' },
  ];

  const values = [
    { icon: Heart, title: t('Education First', 'التعليم أولاً'), desc: t('Every decision passes through one filter: does this help students learn better? If not, we don\'t build it.', 'كل قرار يمر عبر معيار واحد: هل يساعد هذا الطلاب على التعلم بشكل أفضل؟ إذا لم يكن كذلك، فلن نبنيه.') },
    { icon: Users, title: t('Co-Created With Schools', 'شراكة مع المدارس'), desc: t('Our products are shaped by real principals, teachers, and IT heads — not just engineers in a room.', 'منتجاتنا تتشكل من خلال مدراء ومعلمين ومسؤولي تقنية حقيقيين — وليس فقط مهندسين في غرفة.') },
    { icon: Zap, title: t('Speed of Delivery', 'سرعة التنفيذ'), desc: t('We launch schools in 4 weeks — not 4 months. Because students can\'t wait for digital transformation.', 'نطلق المدارس في 4 أسابيع — وليس 4 أشهر. لأن الطلاب لا يمكنهم الانتظار للتحول الرقمي.') },
    { icon: Shield, title: t('Long-Term Partnership', 'شراكة طويلة الأمد'), desc: t('100% client retention. We don\'t just deploy and leave. Dedicated support and training, always.', 'نسبة احتفاظ بالعملاء 100%. لا ننشر ونرحل. دعم وتدريب مخصص، دائمًا.') },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        .shimmer-text {
          background:linear-gradient(90deg,#D4711A 0%,#E88C32 30%,#F4A94D 50%,#E88C32 70%,#D4711A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      <Header />

      {/* ═══════════ HERO — Full-width education image ═══════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2560&q=80"
          alt={t('Students graduating and celebrating education success', 'طلاب يتخرجون ويحتفلون بنجاحهم التعليمي')}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(12,10,8,0.88) 0%, rgba(28,18,10,0.75) 40%, rgba(20,14,10,0.82) 70%, rgba(10,8,6,0.95) 100%)',
        }} />
        {/* Warm glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,140,50,0.12) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-32 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-400/25 bg-orange-900/20 backdrop-blur-sm text-orange-300">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {t('About Cubico', 'من نحن - كيوبيكو')}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.08]"
          >
            {t('We build digital infrastructure', 'نبني البنية التحتية الرقمية')}<br className="hidden md:block" />
            <span className="shimmer-text">{t('so schools can focus on teaching', 'لتتفرغ المدارس للتعليم')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t(
              'Cubico Technologies is a full-stack EdTech company serving 760+ institutions across Pakistan, Saudi Arabia & Canada. We replace disconnected tools with one intelligent platform — LMS, ERP, animated content, and marketing — all under one roof.',
              'كيوبيكو تكنولوجيز هي شركة تكنولوجيا تعليم متكاملة تخدم أكثر من 760 مؤسسة في باكستان والمملكة العربية السعودية وكندا. نستبدل الأدوات المنفصلة بمنصة ذكية واحدة — نظام إدارة التعلم، نظام تخطيط الموارد، المحتوى المتحرك، والتسويق — كل ذلك تحت سقف واحد.'
            )}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Shield, value: '760+', label: t('Schools Served', 'مدرسة مخدومة') },
              { icon: Globe, value: '3', label: t('Countries', 'دول') },
              { icon: Users, value: '85K+', label: t('Active Students', 'طالب نشط') },
              { icon: Clock, value: t('4 wk', '4 أسابيع'), label: t('Avg. Launch', 'متوسط الإطلاق') },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <stat.icon className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ OUR STORY — Timeline with images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('Our Journey', 'مسيرتنا')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('From 12 schools in Lahore to', 'من 12 مدرسة في لاهور إلى')}<br className="hidden sm:block" />
              <span className="shimmer-text">{t('760+ institutions across 3 countries', '760+ مؤسسة في 3 دول')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              {t(
                'What started as frustration with broken school software became a mission to digitize every classroom we could reach.',
                'ما بدأ كإحباط من البرمجيات المدرسية المعطلة تحول إلى مهمة لرقمنة كل فصل دراسي يمكننا الوصول إليه.'
              )}
            </motion.p>
          </motion.div>

          {/* Timeline with images */}
          <div className="space-y-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'md:direction-rtl' : ''}`}
              >
                {/* Image */}
                <div className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? 'md:order-2' : ''}`} style={{ aspectRatio: '16/10' }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-white bg-[#D4711A] px-3 py-1 rounded-full">{item.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? 'md:order-1 md:text-right' : ''}`}>
                  <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-[#D4711A] mb-2">{item.year}</span>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION & VALUES — with classroom image ═══════════ */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('What Drives Us', 'ما يحركنا')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Built by educators.', 'بناها معلمون.')}<br className="hidden sm:block" />
              <span className="shimmer-text">{t('Powered by engineers.', 'يشغلها مهندسون.')}</span>
            </motion.h2>
          </motion.div>

          {/* Mission & Vision with image */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-xl"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                alt={t('Teacher helping students learn in a modern classroom', 'معلم يساعد الطلاب على التعلم في فصل دراسي حديث')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-medium opacity-80">
                  {t(
                    '\u201CEducation is the most powerful weapon which you can use to change the world.\u201D',
                    '\u201Cالتعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.\u201D'
                  )}
                </p>
              </div>
            </motion.div>

            {/* Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4711A] to-[#E88C32]" />
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6 text-[#D4711A]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{t('Our Vision', 'رؤيتنا')}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(
                    'To be the leading EdTech infrastructure partner for schools in the Islamic world and beyond — making quality digital education accessible to every student, regardless of geography or budget.',
                    'أن نكون الشريك الرائد في البنية التحتية لتكنولوجيا التعليم للمدارس في العالم الإسلامي وخارجه — لجعل التعليم الرقمي عالي الجودة متاحًا لكل طالب، بغض النظر عن الموقع الجغرافي أو الميزانية.'
                  )}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B85E15] to-[#D4711A]" />
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-[#B85E15]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{t('Our Mission', 'مهمتنا')}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(
                    'Empower educational institutions with complete digital infrastructure — LMS, ERP, animated content, and marketing — so teachers can teach, admins can manage, and students can thrive.',
                    'تمكين المؤسسات التعليمية بالبنية التحتية الرقمية الكاملة — نظام إدارة التعلم، نظام تخطيط الموارد، المحتوى المتحرك، والتسويق — ليتمكن المعلمون من التدريس، والإداريون من الإدارة، والطلاب من التفوق.'
                  )}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Core Values grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-[#D4711A] group-hover:text-white transition-colors">
                  <v.icon className="w-5 h-5 text-[#D4711A] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHAT WE DO — Products with images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('What We Build', 'ما نبنيه')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Five products.', 'خمسة منتجات.')} <span className="shimmer-text">{t('One complete ecosystem.', 'نظام بيئي متكامل.')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto">
              {t(
                'Each tool is purpose-built for education. Together, they run an entire institution.',
                'كل أداة مصممة خصيصًا للتعليم. معًا، تدير مؤسسة بأكملها.'
              )}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Monitor, name: 'Cubico Manage™', desc: t('All-in-one school ERP — admissions, attendance, finance, HR, and reporting in a single dashboard.', 'نظام ERP مدرسي متكامل — القبول، الحضور، المالية، الموارد البشرية، والتقارير في لوحة تحكم واحدة.'), accent: '#D4711A', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
              { icon: BookOpen, name: 'Moodle LMS Setup', desc: t('Your branded Moodle platform — configured, hosted, and supported. Live in 2 weeks.', 'منصة Moodle بعلامتك التجارية — مُعدّة ومُستضافة ومدعومة. جاهزة خلال أسبوعين.'), accent: '#E88C32', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80' },
              { icon: Lightbulb, name: 'Cubico Teach™', desc: t('Lesson plan builder, curriculum mapping, class analytics, and resource library for teachers.', 'أداة بناء خطط الدروس، تخطيط المناهج، تحليلات الفصل، ومكتبة الموارد للمعلمين.'), accent: '#B85E15', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' },
              { icon: Film, name: 'Cubico Learn™', desc: t('2D & 3D animated lessons in English, Arabic & Urdu with adaptive quizzes and interactive simulations.', 'دروس متحركة ثنائية وثلاثية الأبعاد بالإنجليزية والعربية والأردية مع اختبارات تكيفية ومحاكاة تفاعلية.'), accent: '#C0651A', img: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=600&q=80' },
              { icon: TrendingUp, name: 'Cubico Marketing™', desc: t('School websites, enrollment funnels, social media management, and SEO — fill every seat.', 'مواقع المدارس، قمع التسجيل، إدارة وسائل التواصل الاجتماعي، وتحسين محركات البحث — املأ كل مقعد.'), accent: '#8B4513', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80' },
            ].map((product, i) => (
              <motion.div
                key={product.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-default"
              >
                {/* Product image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: product.accent + 'DD' }}>
                      <product.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: product.accent }}>
                    {t('Learn more', 'اعرف المزيد')} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ STATS RIBBON with background image ═══════════ */}
      <section className="py-16 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2560&q=80"
          alt={t('Books and education background', 'خلفية كتب وتعليم')}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0A08]/90" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4711A]/12 rounded-full filter blur-[110px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B4513]/10 rounded-full filter blur-[110px]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '760+', label: t('Schools Served', 'مدرسة مخدومة'), sub: t('Across 3 countries', 'عبر 3 دول') },
              { value: '85K+', label: t('Active Students', 'طالب نشط'), sub: t('Learning daily on Cubico', 'يتعلمون يوميًا على كيوبيكو') },
              { value: '99.9%', label: t('Uptime', 'وقت التشغيل'), sub: t('Enterprise-grade reliability', 'موثوقية على مستوى المؤسسات') },
              { value: '100%', label: t('Client Retention', 'الاحتفاظ بالعملاء'), sub: t('Zero churn since 2019', 'صفر مغادرة منذ 2019') },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="stat-number text-3xl md:text-4xl text-white mb-1">{s.value}</div>
                <p className="text-[#E88C32] text-xs font-bold tracking-wider uppercase mb-0.5">{s.label}</p>
                <p className="text-white/35 text-[11px]">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHERE WE OPERATE — with country images ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('Global Presence', 'تواجد عالمي')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Three countries.', 'ثلاث دول.')} <span className="shimmer-text">{t('Three languages. One standard.', 'ثلاث لغات. معيار واحد.')}</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { country: t('Pakistan', 'باكستان'), cities: t('Lahore, Karachi, Islamabad', 'لاهور، كراتشي، إسلام آباد'), schools: '480+', languages: t('English & Urdu', 'الإنجليزية والأردية'), accent: '#D4711A', img: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=600&q=80' },
              { country: t('Saudi Arabia', 'المملكة العربية السعودية'), cities: t('Riyadh, Jeddah, Dammam', 'الرياض، جدة، الدمام'), schools: '220+', languages: t('Arabic & English', 'العربية والإنجليزية'), accent: '#B85E15', img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=80' },
              { country: t('Canada', 'كندا'), cities: t('Toronto, Ottawa, Calgary', 'تورنتو، أوتاوا، كالجاري'), schools: '60+', languages: t('English & French', 'الإنجليزية والفرنسية'), accent: '#8B4513', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80' },
            ].map((loc, i) => (
              <motion.div
                key={loc.country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-default"
              >
                {/* Country image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={loc.img}
                    alt={t(`${loc.country} - schools and education`, `${loc.country} - مدارس وتعليم`)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-xl font-heading font-bold text-white">{loc.country}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.cities}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.schools} {t('schools', 'مدرسة')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{loc.languages}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEAM ═══════════ */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                {t('Our Team', 'فريقنا')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Educators, engineers, and', 'معلمون، مهندسون، و')} <span className="shimmer-text">{t('problem solvers', 'حلّالو مشكلات')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto">
              {t(
                'A team that\u2019s run classrooms, built platforms, and shipped products to hundreds of schools.',
                'فريق أدار فصولاً دراسية، وبنى منصات، وأطلق منتجات لمئات المدارس.'
              )}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-[#D4711A] font-semibold">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHY SCHOOLS CHOOSE US — with image ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  {t('Why Cubico', 'لماذا كيوبيكو')}
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                {t('What makes us different from', 'ما يميزنا عن')}<br className="hidden sm:block" />
                <span className="shimmer-text">{t('every other EdTech company', 'كل شركة تكنولوجيا تعليم أخرى')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                {t(
                  'Most EdTech vendors sell you a tool and disappear. We deploy complete digital infrastructure, train your entire staff, and provide ongoing support — because technology without adoption is just expensive shelf-ware.',
                  'معظم شركات تكنولوجيا التعليم تبيعك أداة وتختفي. نحن ننشر بنية تحتية رقمية كاملة، وندرب جميع موظفيك، ونقدم دعمًا مستمرًا — لأن التكنولوجيا بدون تبنٍّ هي مجرد برامج مكلفة على الرف.'
                )}
              </motion.p>

              <motion.div variants={fadeUp} custom={3}>
                <a href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25">
                  {t('Book a Free Demo', 'احجز عرضًا تجريبيًا مجانيًا')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right — image + checklist overlay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Feature image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6" style={{ aspectRatio: '16/9' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt={t('Students collaborating with technology in a modern classroom', 'طلاب يتعاونون باستخدام التكنولوجيا في فصل دراسي حديث')}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {[
                { title: t('Full-stack, not point-solution', 'حل متكامل، وليس أداة منفردة'), desc: t('LMS + ERP + Animation + Marketing — you don\'t need 4 vendors anymore.', 'نظام إدارة التعلم + ERP + الرسوم المتحركة + التسويق — لم تعد بحاجة إلى 4 موردين.') },
                { title: t('Deploy in 4 weeks, not 4 months', 'النشر في 4 أسابيع، وليس 4 أشهر'), desc: t('Our onboarding playbook is battle-tested across 760+ schools.', 'دليل الإعداد لدينا مجرب ومختبر في أكثر من 760 مدرسة.') },
                { title: t('Built for Islamic & multicultural schools', 'مصمم للمدارس الإسلامية ومتعددة الثقافات'), desc: t('Arabic, Urdu, English. RTL support. Curriculum-aligned content.', 'العربية، الأردية، الإنجليزية. دعم الكتابة من اليمين لليسار. محتوى متوافق مع المنهج.') },
                { title: t('Dedicated account manager, always', 'مدير حساب مخصص، دائمًا'), desc: t('24/7 support across PK, SA & CA time zones. 100% client retention.', 'دعم على مدار الساعة عبر المناطق الزمنية لباكستان والسعودية وكندا. احتفاظ بالعملاء بنسبة 100%.') },
                { title: t('Co-created with real principals & teachers', 'تم إنشاؤه بالتعاون مع مدراء ومعلمين حقيقيين'), desc: t('Every feature ships after testing in real classrooms, not just demos.', 'كل ميزة تُطلق بعد اختبارها في فصول دراسية حقيقية، وليس مجرد عروض توضيحية.') },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4711A]/20 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4711A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
