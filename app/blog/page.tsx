'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
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

const colors = [
  'bg-purple-100 text-purple-600',
  'bg-emerald-100 text-emerald-600',
  'bg-blue-100 text-blue-600',
  'bg-orange-100 text-orange-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
];

export default function BlogPage() {
  const { t } = useLanguage();

  const posts = [
    {
      title: t('How Digital Learning is Transforming Islamic Education', 'كيف يُحوّل التعلم الرقمي التعليم الإسلامي'),
      excerpt: t(
        'Explore how schools across the Islamic world are leveraging technology to enhance religious education while preserving traditional values.',
        'اكتشف كيف تستفيد المدارس في العالم الإسلامي من التكنولوجيا لتعزيز التعليم الديني مع الحفاظ على القيم التقليدية.'
      ),
      date: 'March 10, 2026',
      category: t('EdTech', 'تكنولوجيا التعليم'),
    },
    {
      title: t('The Complete Guide to School ERP Implementation', 'الدليل الشامل لتطبيق نظام إدارة المدرسة'),
      excerpt: t(
        'A step-by-step guide for administrators looking to digitize their school operations with a comprehensive ERP system.',
        'دليل خطوة بخطوة للإداريين الذين يتطلعون إلى رقمنة عمليات مدارسهم باستخدام نظام إدارة موارد شامل.'
      ),
      date: 'March 5, 2026',
      category: t('School Management', 'إدارة المدرسة'),
    },
    {
      title: t('5 Ways Animated Content Boosts Student Engagement', '٥ طرق يعزز بها المحتوى المتحرك مشاركة الطلاب'),
      excerpt: t(
        'Research-backed insights on how animated educational content can dramatically improve learning outcomes and student retention.',
        'رؤى مدعومة بالأبحاث حول كيف يمكن للمحتوى التعليمي المتحرك أن يحسّن نتائج التعلم واستبقاء الطلاب بشكل كبير.'
      ),
      date: 'February 28, 2026',
      category: t('Animation', 'الرسوم المتحركة'),
    },
    {
      title: t('Building a Multilingual LMS: Challenges and Solutions', 'بناء نظام تعلم متعدد اللغات: التحديات والحلول'),
      excerpt: t(
        'The technical and pedagogical challenges of creating a learning management system that supports Arabic, Urdu, and English content.',
        'التحديات التقنية والتربوية لإنشاء نظام إدارة تعلم يدعم المحتوى باللغات العربية والأردية والإنجليزية.'
      ),
      date: 'February 20, 2026',
      category: t('LMS', 'نظام إدارة التعلم'),
    },
    {
      title: t('Why Schools in Saudi Arabia Are Going Digital', 'لماذا تتجه المدارس في السعودية نحو الرقمنة'),
      excerpt: t(
        'A look at the rapid digital transformation happening in Saudi Arabian schools and how institutions can prepare for the future.',
        'نظرة على التحول الرقمي السريع الذي يحدث في المدارس السعودية وكيف يمكن للمؤسسات الاستعداد للمستقبل.'
      ),
      date: 'February 15, 2026',
      category: t('Digital Transformation', 'التحول الرقمي'),
    },
    {
      title: t('Teacher Training in the Digital Age: Best Practices', 'تدريب المعلمين في العصر الرقمي: أفضل الممارسات'),
      excerpt: t(
        'How to effectively train teachers on new educational technology without disrupting the learning process.',
        'كيفية تدريب المعلمين بفعالية على تكنولوجيا التعليم الجديدة دون تعطيل العملية التعليمية.'
      ),
      date: 'February 10, 2026',
      category: t('Training', 'التدريب'),
    },
  ];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4 block"
          >
            {t('Blog', 'المدونة')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            {t('News & ', 'الأخبار و')}<span className="gradient-text">{t('Articles', 'المقالات')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            {t(
              'Read our latest articles about EdTech, digital transformation, and education innovation.',
              'اقرأ أحدث مقالاتنا عن تكنولوجيا التعليم والتحول الرقمي والابتكار التعليمي.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className={`h-48 rounded-xl mb-5 flex items-center justify-center ${colors[i % colors.length].split(' ')[0]}`}>
                  <span className={`text-sm font-semibold ${colors[i % colors.length].split(' ')[1]}`}>
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {t('No Comments', 'لا توجد تعليقات')}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  {t('Read More', 'اقرأ المزيد')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
