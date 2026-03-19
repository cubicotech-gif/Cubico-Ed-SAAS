'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav links
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.solutions': { en: 'Solutions', ar: 'الحلول' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.pages': { en: 'Pages', ar: 'الصفحات' },

  // Solutions dropdown
  'nav.smartLms': { en: 'Smart LMS', ar: 'نظام إدارة التعلم الذكي' },
  'nav.animationStudio': { en: 'Animation Studio', ar: 'استوديو الرسوم المتحركة' },
  'nav.schoolErp': { en: 'School ERP', ar: 'نظام إدارة المدارس' },
  'nav.webDevelopment': { en: 'Web Development', ar: 'تطوير المواقع' },
  'nav.mobileApps': { en: 'Mobile Apps', ar: 'تطبيقات الجوال' },

  // Services dropdown
  'nav.cloudHosting': { en: 'Cloud Hosting', ar: 'استضافة سحابية' },
  'nav.digitalMarketing': { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
  'nav.teacherTraining': { en: 'Teacher Training', ar: 'تدريب المعلمين' },
  'nav.pricingPlan': { en: 'Pricing Plan', ar: 'خطط الأسعار' },

  // Pages dropdown
  'nav.team': { en: 'Team', ar: 'الفريق' },
  'nav.faq': { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  'nav.blog': { en: 'Blog', ar: 'المدونة' },

  // CTA
  'nav.getStarted': { en: 'Get Started', ar: 'ابدأ الآن' },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const t = useCallback(
    (key: string) => {
      return translations[key]?.[lang] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
