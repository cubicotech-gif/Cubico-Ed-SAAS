import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Cubico Technologies',
  description: 'Frequently asked questions about Cubico Technologies EdTech solutions, pricing, implementation, and support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
