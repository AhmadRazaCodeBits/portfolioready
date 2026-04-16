'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 mb-12"
    >
      <span className="pill-badge">{badge}</span>
      {title && (
        <h2 className="text-lg md:text-xl text-[var(--foreground-secondary)] text-center max-w-2xl">
          {title}
        </h2>
      )}
    </motion.div>
  );
}
