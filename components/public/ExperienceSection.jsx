'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

export default function ExperienceSection({ experience = [] }) {
  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <SectionHeader
          badge="Experience"
          title="Here is a quick summary of my most recent experiences:"
        />

        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-base p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Company Logo/Name */}
                <div className="flex-shrink-0 md:w-[140px]">
                  {exp.companyLogo ? (
                    <img
                      src={exp.companyLogo}
                      alt={exp.company}
                      className="h-8 object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-emerald-500">
                      {exp.company}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-[var(--foreground-secondary)] whitespace-nowrap">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description?.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[var(--foreground-secondary)] text-sm leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground-secondary)] mt-2 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
