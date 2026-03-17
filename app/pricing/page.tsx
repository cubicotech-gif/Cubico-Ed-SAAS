'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const plans = [
  {
    name: 'Starter',
    price: '499',
    period: '/month',
    desc: 'Perfect for small schools getting started with digital transformation.',
    features: [
      { name: 'LMS (up to 200 students)', included: true },
      { name: 'Basic School ERP', included: true },
      { name: 'Email Support', included: true },
      { name: 'Cloud Hosting (5GB)', included: true },
      { name: 'Animated Lessons', included: false },
      { name: 'Mobile App', included: false },
      { name: 'Custom Branding', included: false },
      { name: 'Dedicated Manager', included: false },
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '999',
    period: '/month',
    desc: 'Ideal for growing institutions needing comprehensive solutions.',
    features: [
      { name: 'LMS (up to 1000 students)', included: true },
      { name: 'Full School ERP', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Cloud Hosting (50GB)', included: true },
      { name: 'Animated Lessons (50)', included: true },
      { name: 'Mobile App', included: true },
      { name: 'Custom Branding', included: false },
      { name: 'Dedicated Manager', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large institutions and school networks requiring tailored solutions.',
    features: [
      { name: 'Unlimited Students', included: true },
      { name: 'Full School ERP', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Unlimited Cloud Hosting', included: true },
      { name: 'Unlimited Animated Lessons', included: true },
      { name: 'Mobile App', included: true },
      { name: 'Custom Branding', included: true },
      { name: 'Dedicated Manager', included: true },
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4 block"
          >
            Pricing Plan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Multiple Platforms with a <span className="gradient-text">Single Price</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Choose the plan that best fits your institution. All plans include onboarding, training, and ongoing support.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`rounded-3xl p-8 relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary to-primary-dark text-white shadow-2xl shadow-primary/20 scale-105'
                    : 'card-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 className={`font-heading font-bold text-xl mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-heading font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price === 'Custom' ? '' : '$'}{plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-accent-light' : 'text-accent'}`} />
                      ) : (
                        <X className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-white/30' : 'text-gray-300'}`} />
                      )}
                      <span className={`text-sm ${
                        f.included
                          ? plan.popular ? 'text-white/90' : 'text-gray-700'
                          : plan.popular ? 'text-white/30' : 'text-gray-300'
                      }`}>
                        {f.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full justify-center ${
                    plan.popular ? 'btn-outline-white' : 'btn-primary'
                  }`}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Pricing <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-gray-500 mb-12">Common questions about our pricing and plans.</p>
          <div className="text-left space-y-6">
            {[
              { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
              { q: 'Is there a free trial?', a: 'Yes! We offer a 30-day free trial on all plans. No credit card required to get started.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, bank transfers, and can arrange custom billing for enterprise clients.' },
              { q: 'Do you offer discounts for annual billing?', a: 'Yes, annual billing saves you 20% compared to monthly billing across all plans.' },
            ].map((item, i) => (
              <div key={i} className="card-white text-left">
                <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-sm text-gray-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
