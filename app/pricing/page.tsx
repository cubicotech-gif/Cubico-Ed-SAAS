'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Star, Zap } from 'lucide-react';
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

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('Starter', 'الأساسية'),
      price: '499',
      period: t('/month', '/شهرياً'),
      desc: t(
        'Perfect for small schools getting started with digital transformation.',
        'مثالية للمدارس الصغيرة التي تبدأ بالتحول الرقمي.'
      ),
      features: [
        { name: t('LMS (up to 200 students)', 'نظام إدارة التعلم (حتى 200 طالب)'), included: true },
        { name: t('Basic School ERP', 'نظام ERP مدرسي أساسي'), included: true },
        { name: t('Email Support', 'دعم عبر البريد الإلكتروني'), included: true },
        { name: t('Cloud Hosting (5GB)', 'استضافة سحابية (5 جيجابايت)'), included: true },
        { name: t('Animated Lessons', 'دروس متحركة'), included: false },
        { name: t('Mobile App', 'تطبيق الهاتف'), included: false },
        { name: t('Custom Branding', 'علامة تجارية مخصصة'), included: false },
        { name: t('Dedicated Manager', 'مدير مخصص'), included: false },
      ],
      popular: false,
    },
    {
      name: t('Professional', 'الاحترافية'),
      price: '999',
      period: t('/month', '/شهرياً'),
      desc: t(
        'Ideal for growing institutions needing comprehensive solutions.',
        'مثالية للمؤسسات المتنامية التي تحتاج حلولاً شاملة.'
      ),
      features: [
        { name: t('LMS (up to 1000 students)', 'نظام إدارة التعلم (حتى 1000 طالب)'), included: true },
        { name: t('Full School ERP', 'نظام ERP مدرسي كامل'), included: true },
        { name: t('Priority Support', 'دعم ذو أولوية'), included: true },
        { name: t('Cloud Hosting (50GB)', 'استضافة سحابية (50 جيجابايت)'), included: true },
        { name: t('Animated Lessons (50)', 'دروس متحركة (50)'), included: true },
        { name: t('Mobile App', 'تطبيق الهاتف'), included: true },
        { name: t('Custom Branding', 'علامة تجارية مخصصة'), included: false },
        { name: t('Dedicated Manager', 'مدير مخصص'), included: false },
      ],
      popular: true,
    },
    {
      name: t('Enterprise', 'المؤسسات'),
      price: t('Custom', 'مخصص'),
      period: '',
      desc: t(
        'For large institutions and school networks requiring tailored solutions.',
        'للمؤسسات الكبيرة وشبكات المدارس التي تتطلب حلولاً مخصصة.'
      ),
      features: [
        { name: t('Unlimited Students', 'طلاب غير محدودين'), included: true },
        { name: t('Full School ERP', 'نظام ERP مدرسي كامل'), included: true },
        { name: t('24/7 Dedicated Support', 'دعم مخصص على مدار الساعة'), included: true },
        { name: t('Unlimited Cloud Hosting', 'استضافة سحابية غير محدودة'), included: true },
        { name: t('Unlimited Animated Lessons', 'دروس متحركة غير محدودة'), included: true },
        { name: t('Mobile App', 'تطبيق الهاتف'), included: true },
        { name: t('Custom Branding', 'علامة تجارية مخصصة'), included: true },
        { name: t('Dedicated Manager', 'مدير مخصص'), included: true },
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: t('Can I switch plans later?', 'هل يمكنني تغيير الخطة لاحقاً؟'),
      a: t(
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
        'نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. تسري التغييرات في دورة الفوترة التالية.'
      ),
    },
    {
      q: t('Is there a free trial?', 'هل توجد فترة تجريبية مجانية؟'),
      a: t(
        'Yes! We offer a 30-day free trial on all plans. No credit card required to get started.',
        'نعم! نقدم فترة تجريبية مجانية لمدة 30 يوماً على جميع الخطط. لا حاجة لبطاقة ائتمان للبدء.'
      ),
    },
    {
      q: t('What payment methods do you accept?', 'ما طرق الدفع التي تقبلونها؟'),
      a: t(
        'We accept all major credit cards, bank transfers, and can arrange custom billing for enterprise clients.',
        'نقبل جميع بطاقات الائتمان الرئيسية والتحويلات البنكية، ويمكننا ترتيب فوترة مخصصة لعملاء المؤسسات.'
      ),
    },
    {
      q: t('Do you offer discounts for annual billing?', 'هل تقدمون خصومات للفوترة السنوية؟'),
      a: t(
        'Yes, annual billing saves you 20% compared to monthly billing across all plans.',
        'نعم، الفوترة السنوية توفر لك 20% مقارنة بالفوترة الشهرية عبر جميع الخطط.'
      ),
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
            {t('Pricing Plan', 'خطة الأسعار')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            {t('Multiple Platforms with a ', 'منصات متعددة ب')}
            <span className="gradient-text">{t('Single Price', 'سعر واحد')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            {t(
              'Choose the plan that best fits your institution. All plans include onboarding, training, and ongoing support.',
              'اختر الخطة التي تناسب مؤسستك. جميع الخطط تشمل التأهيل والتدريب والدعم المستمر.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`rounded-3xl p-8 relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary to-primary-dark text-white shadow-2xl shadow-primary/20 scale-105'
                    : 'card-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {t('Most Popular', 'الأكثر شعبية')}
                    </span>
                  </div>
                )}

                <h3 className={`font-heading font-bold text-xl mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-heading font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price === t('Custom', 'مخصص') ? '' : '$'}{plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-accent-light' : 'text-accent'}`} />
                      ) : (
                        <X className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-white/30' : 'text-gray-300'}`} />
                      )}
                      <span className={`text-sm ${
                        f.included
                          ? plan.popular ? 'text-white/90' : 'text-gray-700'
                          : plan.popular ? 'text-white/30' : 'text-gray-300'
                      }`}>
                        {f.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full justify-center ${
                    plan.popular ? 'btn-outline-white' : 'btn-primary'
                  }`}
                >
                  {t('Get Started', 'ابدأ الآن')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            {t('Pricing ', 'أسئلة ')}<span className="gradient-text">{t('FAQ', 'الأسعار')}</span>
          </h2>
          <p className="text-gray-500 mb-12">
            {t('Common questions about our pricing and plans.', 'أسئلة شائعة حول أسعارنا وخططنا.')}
          </p>
          <div className="text-left space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="card-white text-left">
                <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-sm text-gray-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
