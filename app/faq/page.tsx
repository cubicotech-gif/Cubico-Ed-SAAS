'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    { q: t('How quickly can we launch our digital platform?', 'ما مدى سرعة إطلاق منصتنا الرقمية؟'), a: t('Most institutions go live within 4 weeks. Our streamlined onboarding process includes data migration, staff training, and content setup — all handled by our dedicated team.', 'معظم المؤسسات تبدأ العمل خلال ٤ أسابيع. تشمل عملية التأهيل المبسطة لدينا نقل البيانات وتدريب الموظفين وإعداد المحتوى — كل ذلك يتم بواسطة فريقنا المتخصص.') },
    { q: t('Do you support Arabic and Urdu content?', 'هل تدعمون المحتوى العربي والأردي؟'), a: t('Yes! We specialize in multilingual education content. Our animation studio produces high-quality lessons in English, Arabic, and Urdu with full RTL support across all platforms.', 'نعم! نحن متخصصون في المحتوى التعليمي متعدد اللغات. ينتج استوديو الرسوم المتحركة لدينا دروساً عالية الجودة بالإنجليزية والعربية والأردية مع دعم كامل للكتابة من اليمين إلى اليسار عبر جميع المنصات.') },
    { q: t('Can we engage Cubico for just one service?', 'هل يمكننا التعاقد مع كيوبيكو لخدمة واحدة فقط؟'), a: t('Absolutely. While we offer a full-stack approach, each service — LMS, ERP, animations, web development — can be engaged independently based on your needs.', 'بالتأكيد. بينما نقدم نهجاً متكاملاً، يمكن التعاقد على كل خدمة — نظام إدارة التعلم، نظام تخطيط الموارد، الرسوم المتحركة، تطوير الويب — بشكل مستقل بناءً على احتياجاتك.') },
    { q: t('What makes Cubico different from other EdTech providers?', 'ما الذي يميز كيوبيكو عن مزودي تكنولوجيا التعليم الآخرين؟'), a: t('We combine deep understanding of Islamic and traditional education with cutting-edge technology. Our team includes educators and technologists who bridge the gap between pedagogy and innovation.', 'نحن نجمع بين الفهم العميق للتعليم الإسلامي والتقليدي والتكنولوجيا المتطورة. يضم فريقنا مربين وتقنيين يسدون الفجوة بين التربية والابتكار.') },
    { q: t('Which countries do you operate in?', 'في أي دول تعملون؟'), a: t('We actively serve institutions across Pakistan, Saudi Arabia, and Canada. Our cloud-based solutions can be deployed globally with local support teams in each region.', 'نخدم المؤسسات بنشاط في باكستان والمملكة العربية السعودية وكندا. يمكن نشر حلولنا السحابية عالمياً مع فرق دعم محلية في كل منطقة.') },
    { q: t('Is there a free trial available?', 'هل يتوفر تجربة مجانية؟'), a: t('Yes! We offer a 30-day free trial on all our plans. No credit card required. Our team will help you set up and get started within 24 hours.', 'نعم! نقدم تجربة مجانية لمدة ٣٠ يوماً على جميع خططنا. لا حاجة لبطاقة ائتمان. سيساعدك فريقنا في الإعداد والبدء خلال ٢٤ ساعة.') },
    { q: t('What kind of support do you offer?', 'ما نوع الدعم الذي تقدمونه؟'), a: t('We provide email support on all plans, priority support on Professional plans, and 24/7 dedicated support with a personal account manager on Enterprise plans.', 'نقدم دعم البريد الإلكتروني على جميع الخطط، ودعم أولوية على الخطط الاحترافية، ودعم متخصص على مدار الساعة مع مدير حساب شخصي على خطط المؤسسات.') },
    { q: t('Can you migrate data from our existing systems?', 'هل يمكنكم نقل البيانات من أنظمتنا الحالية؟'), a: t('Absolutely. Our team handles complete data migration from any existing system — including student records, grades, attendance, and financial data — as part of the onboarding process.', 'بالتأكيد. يتولى فريقنا نقل البيانات بالكامل من أي نظام حالي — بما في ذلك سجلات الطلاب والدرجات والحضور والبيانات المالية — كجزء من عملية التأهيل.') },
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
            {t('FAQ', 'الأسئلة الشائعة')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            {t('Frequently Asked ', 'الأسئلة الأكثر ')}<span className="gradient-text">{t('Questions', 'شيوعاً')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            {t('Everything you need to know about our EdTech solutions and how we can help transform your institution.', 'كل ما تحتاج معرفته عن حلولنا التعليمية وكيف يمكننا المساعدة في تحويل مؤسستك.')}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="faq-item py-5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <span className="flex-shrink-0">
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pt-3">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{t('Still have questions?', 'لا تزال لديك أسئلة؟')}</h3>
            <p className="text-gray-500 text-sm mb-6">{t('Our team is ready to help you with anything you need.', 'فريقنا مستعد لمساعدتك في أي شيء تحتاجه.')}</p>
            <Link href="/contact" className="btn-primary">
              {t('Contact Us', 'تواصل معنا')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
