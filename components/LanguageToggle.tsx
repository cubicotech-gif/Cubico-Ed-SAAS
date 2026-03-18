'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 hover:bg-white/[0.08] ${className}`}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      title={language === 'en' ? 'عربي' : 'English'}
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{language === 'en' ? 'عربي' : 'EN'}</span>
    </button>
  );
}
