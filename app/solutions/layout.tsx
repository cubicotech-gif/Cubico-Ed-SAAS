import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions — Cubico Technologies',
  description: 'Explore Cubico EdTech solutions: Smart LMS, Animation Studio, School ERP, Web Development, and Mobile Apps for modern educational institutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
