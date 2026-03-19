import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Cubico Technologies',
  description: 'Insights, updates, and news about EdTech innovation from Cubico Technologies.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
