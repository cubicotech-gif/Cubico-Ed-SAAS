'use client';

import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { ReactNode } from 'react';

export default function LanguageWrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
