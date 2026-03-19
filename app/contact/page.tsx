'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, BookOpen, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    position: '',
    employees: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const { error } = await supabase.from('demo_requests').insert([formData]);
      if (error) throw error;
      setFormStatus('success');
      setFormData({ name: '', company: '', phone: '', email: '', position: '', employees: '' });
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4"
          >
            {t('Contact Us', 'تواصل معنا')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            {t('Get in touch and let us know how we can help transform your institution.', 'تواصل معنا وأخبرنا كيف يمكننا المساعدة في تحويل مؤسستك.')}
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8 mb-12">
                {[
                  {
                    icon: MapPin,
                    title: t('Office Address', 'عنوان المكتب'),
                    lines: ['Lahore, Pakistan', 'Riyadh, Saudi Arabia', 'Toronto, Canada'],
                  },
                  {
                    icon: Phone,
                    title: t('Phone', 'الهاتف'),
                    lines: ['+92 300 000 0000', '+966 50 000 0000'],
                  },
                  {
                    icon: Mail,
                    title: t('Email', 'البريد الإلكتروني'),
                    lines: ['hello@cubico.tech', 'support@cubico.tech'],
                  },
                  {
                    icon: BookOpen,
                    title: t('Resources', 'الموارد'),
                    lines: [t('Read our latest articles and blog for insights', 'اقرأ أحدث مقالاتنا ومدونتنا للحصول على رؤى')],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="icon-box flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-gray-500">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{t('Send us a message', 'أرسل لنا رسالة')}</h3>
                <p className="text-sm text-gray-500 mb-6">{t("Fill out the form below and we'll get back to you within 24 hours.", 'املأ النموذج أدناه وسنرد عليك خلال ٢٤ ساعة.')}</p>

                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{t('Thank You!', 'شكراً لك!')}</h3>
                    <p className="text-gray-500">{t("We'll be in touch shortly.", 'سنتواصل معك قريباً.')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder={t('Your Name *', '* اسمك')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder={t('Company *', '* الشركة')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="tel"
                        placeholder={t('Phone *', '* الهاتف')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder={t('Email *', '* البريد الإلكتروني')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="form-select"
                    >
                      <option value="">{t('Select Position', 'اختر المنصب')}</option>
                      <option value="principal">{t('Principal / Head of School', 'مدير / رئيس المدرسة')}</option>
                      <option value="director">{t('Director / Board Member', 'مدير / عضو مجلس إدارة')}</option>
                      <option value="it_head">{t('IT Head / Administrator', 'رئيس تقنية المعلومات / مسؤول')}</option>
                      <option value="teacher">{t('Teacher / Department Head', 'معلم / رئيس قسم')}</option>
                      <option value="other">{t('Other', 'أخرى')}</option>
                    </select>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="form-select"
                    >
                      <option value="">{t('Number of Students / Staff', 'عدد الطلاب / الموظفين')}</option>
                      <option value="1-50">1 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="501-1000">501 – 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center"
                    >
                      {formStatus === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('Sending...', 'جارٍ الإرسال...')}
                        </span>
                      ) : (
                        <>
                          {t('Send Message', 'إرسال رسالة')} <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">{t('Something went wrong. Please try again.', 'حدث خطأ. يرجى المحاولة مرة أخرى.')}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
