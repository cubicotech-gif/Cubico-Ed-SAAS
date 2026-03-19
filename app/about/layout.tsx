import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Cubico Technologies',
  description: 'Learn about Cubico Technologies, a full-stack EdTech agency transforming education across Pakistan, Saudi Arabia & Canada with innovative solutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
