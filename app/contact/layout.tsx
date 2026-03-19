import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Cubico Technologies',
  description: 'Get in touch with Cubico Technologies. Book a free demo or discuss how we can transform your institution with our EdTech solutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
