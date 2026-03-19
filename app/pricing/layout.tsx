import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Cubico Technologies',
  description: 'Flexible pricing plans for schools and educational institutions. Choose the right Cubico EdTech package for your needs.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
