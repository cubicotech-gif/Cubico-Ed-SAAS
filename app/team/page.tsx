'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
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

const team = [
  { name: 'Ali Raza', role: 'Founder & CEO', initials: 'AR', color: 'from-purple-500 to-blue-500' },
  { name: 'Sarah Ahmed', role: 'Co-Founder & CTO', initials: 'SA', color: 'from-emerald-500 to-teal-500' },
  { name: 'Hassan Khan', role: 'Lead Developer', initials: 'HK', color: 'from-orange-500 to-red-500' },
  { name: 'Ayesha Malik', role: 'Creative Director', initials: 'AM', color: 'from-pink-500 to-purple-500' },
  { name: 'Omar Farooq', role: 'Head of Animation', initials: 'OF', color: 'from-blue-500 to-indigo-500' },
  { name: 'Zainab Ali', role: 'UX Designer', initials: 'ZA', color: 'from-yellow-500 to-orange-500' },
  { name: 'Bilal Ahmad', role: 'DevOps Engineer', initials: 'BA', color: 'from-teal-500 to-cyan-500' },
  { name: 'Mariam Shah', role: 'Education Specialist', initials: 'MS', color: 'from-red-500 to-pink-500' },
];

export default function TeamPage() {
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
            Our Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Meet the <span className="gradient-text">People</span> Behind Cubico
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            A passionate team of educators and technologists dedicated to transforming education through innovation.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                className="card-white text-center group"
              >
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center gap-2">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, j) => (
                    <a key={j} href="#" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
