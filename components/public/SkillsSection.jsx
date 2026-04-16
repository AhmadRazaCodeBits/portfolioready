'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

export default function SkillsSection({ skills = [] }) {
  return (
    <section id="skills" className="relative bg-[var(--background-secondary)]">
      <div className="section-container">
        <SectionHeader
          badge="Skills"
          title="The skills, tools and technologies I am really good at:"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id || skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain dark:brightness-110"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center text-xs font-bold text-[var(--foreground-secondary)]">
                    {skill.name?.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="text-xs md:text-sm text-[var(--foreground-secondary)] text-center font-medium">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
