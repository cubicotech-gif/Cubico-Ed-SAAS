import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Cubico Technologies',
  description: 'Professional EdTech services including cloud hosting, digital marketing, and teacher training programs for schools and educational institutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
