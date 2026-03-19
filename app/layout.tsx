import type { Metadata } from 'next';
import './globals.css';
import LanguageWrapper from '@/components/LanguageWrapper';

export const metadata: Metadata = {
  title: 'Cubico Technologies — From Chalk-and-Board to World-Class',
  description:
    'Cubico Technologies is a full-stack EdTech agency helping schools across Pakistan, Saudi Arabia & Canada modernize operations and learning experiences. One partner, every solution.',
  keywords: [
    'EdTech',
    'School Management',
    'LMS',
    'Moodle',
    'Islamic Education',
    'Animation',
    'Pakistan',
    'Saudi Arabia',
    'Canada',
  ],
  openGraph: {
    title: 'Cubico Technologies — From Chalk-and-Board to World-Class',
    description: 'One partner, every solution. Transforming schools across 3 countries.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
      <body className="noise-overlay">
        <LanguageWrapper>{children}</LanguageWrapper>
      </body>
    </html>
  );
}
