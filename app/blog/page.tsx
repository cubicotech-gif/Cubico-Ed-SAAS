'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
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

const posts = [
  {
    title: 'How Digital Learning is Transforming Islamic Education',
    excerpt: 'Explore how schools across the Islamic world are leveraging technology to enhance religious education while preserving traditional values.',
    date: 'March 10, 2026',
    category: 'EdTech',
  },
  {
    title: 'The Complete Guide to School ERP Implementation',
    excerpt: 'A step-by-step guide for administrators looking to digitize their school operations with a comprehensive ERP system.',
    date: 'March 5, 2026',
    category: 'School Management',
  },
  {
    title: '5 Ways Animated Content Boosts Student Engagement',
    excerpt: 'Research-backed insights on how animated educational content can dramatically improve learning outcomes and student retention.',
    date: 'February 28, 2026',
    category: 'Animation',
  },
  {
    title: 'Building a Multilingual LMS: Challenges and Solutions',
    excerpt: 'The technical and pedagogical challenges of creating a learning management system that supports Arabic, Urdu, and English content.',
    date: 'February 20, 2026',
    category: 'LMS',
  },
  {
    title: 'Why Schools in Saudi Arabia Are Going Digital',
    excerpt: 'A look at the rapid digital transformation happening in Saudi Arabian schools and how institutions can prepare for the future.',
    date: 'February 15, 2026',
    category: 'Digital Transformation',
  },
  {
    title: 'Teacher Training in the Digital Age: Best Practices',
    excerpt: 'How to effectively train teachers on new educational technology without disrupting the learning process.',
    date: 'February 10, 2026',
    category: 'Training',
  },
];

const colors = [
  'bg-purple-100 text-purple-600',
  'bg-emerald-100 text-emerald-600',
  'bg-blue-100 text-blue-600',
  'bg-orange-100 text-orange-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
];

export default function BlogPage() {
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
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            News & <span className="gradient-text">Articles</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Read our latest articles about EdTech, digital transformation, and education innovation.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                custom={i}
                className="card-white group cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className={`h-48 rounded-xl mb-5 flex items-center justify-center ${colors[i % colors.length].split(' ')[0]}`}>
                  <span className={`text-sm font-semibold ${colors[i % colors.length].split(' ')[1]}`}>
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> No Comments
                  </span>
                </div>

                <h3 className="font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
