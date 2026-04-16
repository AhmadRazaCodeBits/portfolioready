'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

export default function AboutSection({ profile = {} }) {
  const bullets = profile.aboutBullets || [];

  return (
    <section id="about" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background-secondary)]/50 to-transparent pointer-events-none" />
      <div className="section-container relative">
        <SectionHeader badge="About me" />

        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-10 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto md:mx-0"
          >
            <div className="w-[280px] h-[350px] md:w-[300px] md:h-[380px] lg:w-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                {profile.aboutImageUrl ? (
                  <img
                    src={profile.aboutImageUrl}
                    alt={`About ${profile.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-5xl font-bold text-white/10">
                    {profile.name?.split(' ').map(n => n[0]).join('') || 'AR'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Curious about me? Here you have it:
            </h3>

            <div className="space-y-4 text-[var(--foreground-secondary)] leading-relaxed">
              {profile.aboutText?.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {bullets.length > 0 && (
              <div className="mt-8">
                <p className="text-[var(--foreground-secondary)] mb-4">
                  Finally, some quick bits about me:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {bullets.map((bullet, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[var(--foreground-secondary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]" />
                      <span className="text-sm">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-6 text-[var(--foreground-secondary)]">
              One last thing, I&apos;m available for freelance work, so feel free to
              reach out and say hello! I promise I don&apos;t bite{' '}
              <span role="img" aria-label="wink">😉</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
