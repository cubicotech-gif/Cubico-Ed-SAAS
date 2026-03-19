'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { lang, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return <>{children}</>;
}
