'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');
  const { t } = useLanguage();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('newsletter_signups').insert([{ name: newsletterName, email: newsletterEmail }]);
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setNewsletterName('');
  };

  return (
    <>
      <style>{`
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        .shimmer-text-footer {
          background:linear-gradient(90deg,#14B8A6 0%,#10B981 30%,#2DD4BF 50%,#10B981 70%,#14B8A6 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* Join CTA */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#14B8A6]/15 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full filter blur-[120px]" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-xs font-bold tracking-wider uppercase">{t('Now Enrolling Institutions', 'التسجيل مفتوح للمؤسسات')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            {t('Join ', 'انضم إلى ')}<span className="shimmer-text-footer">{t('760+ schools', '٧٦٠+ مدرسة')}</span> {t('already transforming education', 'تُحوّل التعليم بالفعل')}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            {t(
              'From a 50-student school in Lahore to a 2,000-student campus in Riyadh — Cubico scales to your institution. Launch in 4 weeks.',
              'من مدرسة تضم ٥٠ طالباً في لاهور إلى حرم جامعي يضم ٢٠٠٠ طالب في الرياض — كيوبيكو يتوسع مع مؤسستك. انطلق خلال ٤ أسابيع.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg px-10">
              {t('Get Started Today', 'ابدأ اليوم')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
            <Link href="/services" className="btn-outline-white text-lg px-10">
              {t('Explore Solutions', 'استكشف الحلول')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#10B981] flex items-center justify-center font-heading font-bold text-lg text-white shadow-lg shadow-teal-600/25">
                  C
                </div>
                <span className="font-heading font-bold text-xl">
                  Cubico<span className="text-teal-300">.tech</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {t(
                  'Full-stack EdTech company powering 760+ schools across Pakistan, Saudi Arabia & Canada with LMS, ERP, animated content, and marketing solutions.',
                  'شركة تكنولوجيا تعليمية متكاملة تخدم أكثر من ٧٦٠ مدرسة في باكستان والمملكة العربية السعودية وكندا بحلول نظام إدارة التعلم والتخطيط والمحتوى المتحرك والتسويق.'
                )}
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: 'https://facebook.com/cubicotech', label: 'Facebook' },
                  { icon: Instagram, href: 'https://instagram.com/cubicotech', label: 'Instagram' },
                  { icon: Twitter, href: 'https://twitter.com/cubicotech', label: 'Twitter' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/cubicotech', label: 'LinkedIn' },
                  { icon: Youtube, href: 'https://youtube.com/@cubicotech', label: 'YouTube' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#14B8A6] hover:border-[#14B8A6] transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">{t('Solutions', 'الحلول')}</h4>
              <ul className="space-y-3">
                {[
                  { name: t('Smart LMS', 'نظام إدارة التعلم'), href: '/solutions/smart-lms' },
                  { name: t('Animation Studio', 'استوديو الرسوم المتحركة'), href: '/solutions/animation-studio' },
                  { name: t('School ERP', 'نظام إدارة المدرسة'), href: '/solutions/school-erp' },
                  { name: t('Web Development', 'تطوير المواقع'), href: '/solutions/web-development' },
                  { name: t('Mobile Apps', 'تطبيقات الجوال'), href: '/solutions/mobile-apps' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">{t('Services', 'الخدمات')}</h4>
              <ul className="space-y-3">
                {[
                  { name: t('Cloud Hosting', 'الاستضافة السحابية'), href: '/services/cloud-hosting' },
                  { name: t('Digital Marketing', 'التسويق الرقمي'), href: '/services/digital-marketing' },
                  { name: t('Teacher Training', 'تدريب المعلمين'), href: '/services/teacher-training' },
                  { name: t('About Us', 'من نحن'), href: '/about' },
                  { name: t('Contact Us', 'تواصل معنا'), href: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">{t('Newsletter', 'النشرة الإخبارية')}</h4>
              <p className="text-white/50 text-sm mb-6">
                {t('Sign up for updates, insights, and EdTech news.', 'اشترك للحصول على التحديثات والرؤى وأخبار تكنولوجيا التعليم.')}
              </p>
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-2 text-[#14B8A6] text-sm">
                  <CheckCircle2 className="w-4 h-4" /> {t('Subscribed!', 'تم الاشتراك!')}
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <input
                    type="text"
                    placeholder={t('Your name', 'اسمك')}
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder={t('Your email', 'بريدك الإلكتروني')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <button type="submit" className="btn-primary w-full justify-center text-sm">
                    {t('Sign Up', 'اشترك')} <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              {t(
                `Copyright \u00A9 ${new Date().getFullYear()} Cubico Technologies. All rights reserved.`,
                `حقوق النشر \u00A9 ${new Date().getFullYear()} كيوبيكو تكنولوجيز. جميع الحقوق محفوظة.`
              )}
            </p>
            <div className="flex gap-6">
              {[
                { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
                { en: 'Terms of Service', ar: 'شروط الخدمة' },
                { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
              ].map((link) => (
                <span key={link.en} className="text-white/40 text-sm cursor-default">
                  {t(link.en, link.ar)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
