'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('newsletter_signups').insert([{ name: newsletterName, email: newsletterEmail }]);
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setNewsletterName('');
  };

  return (
    <>
      <style>{`
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        .shimmer-text-footer {
          background:linear-gradient(90deg,#D4711A 0%,#E88C32 30%,#F4A94D 50%,#E88C32 70%,#D4711A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* Join CTA */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4711A]/15 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8B4513]/10 rounded-full filter blur-[120px]" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'32px 32px' }}/>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-white/70 text-xs font-bold tracking-wider uppercase">Now Enrolling Institutions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Join <span className="shimmer-text-footer">760+ schools</span> already transforming education
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            From a 50-student school in Lahore to a 2,000-student campus in Riyadh —
            Cubico scales to your institution. Launch in 4 weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg px-10">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/services" className="btn-outline-white text-lg px-10">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-950 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center font-heading font-bold text-lg text-white shadow-lg shadow-orange-600/25">
                  C
                </div>
                <span className="font-heading font-bold text-xl">
                  Cubico<span className="text-orange-300">.tech</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Full-stack EdTech company powering 760+ schools across Pakistan, Saudi Arabia & Canada with LMS, ERP, animated content, and marketing solutions.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4711A] hover:border-[#D4711A] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Solutions</h4>
              <ul className="space-y-3">
                {['Smart LMS', 'Animation Studio', 'School ERP', 'Web Development', 'Mobile Apps'].map((link) => (
                  <li key={link}>
                    <Link href="/services" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Team', href: '/team' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'FAQ', href: '/faq' },
                  { name: 'Contact Us', href: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-white/50 text-sm mb-6">
                Sign up for updates, insights, and EdTech news.
              </p>
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-2 text-[#E88C32] text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <button type="submit" className="btn-primary w-full justify-center text-sm">
                    Sign Up <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              Copyright © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
