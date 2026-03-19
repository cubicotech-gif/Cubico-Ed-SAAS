import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team — Cubico Technologies',
  description: 'Meet the talented team behind Cubico Technologies, driving innovation in education technology across Pakistan, Saudi Arabia & Canada.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
