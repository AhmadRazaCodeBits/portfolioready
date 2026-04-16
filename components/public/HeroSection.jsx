'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import TypingAnimation from '@/components/shared/TypingAnimation';
import SocialIcons from '@/components/shared/SocialIcons';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

export default function HeroSection({ profile = {} }) {
  const firstName = profile.name?.split(' ')[0] || 'Ahmad';

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      {/* Background gradient */}
      <div className="gradient-blur opacity-50" />

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hi, I&apos;m {firstName}{' '}
              <span className="inline-block animate-bounce" role="img" aria-label="wave">
                👋
              </span>
            </h1>

            <div className="text-lg sm:text-xl text-[var(--foreground-secondary)] mb-4 h-8">
              <TypingAnimation
                texts={[
                  'MERN Stack Developer',
                  'Full Stack Engineer',
                  'React.js Specialist',
                  'Node.js Developer',
                ]}
                speed={80}
                deleteSpeed={40}
                pauseDuration={2500}
              />
            </div>

            <p className="text-base sm:text-lg text-[var(--foreground-secondary)] mb-8 max-w-xl leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                <MapPin size={18} />
                <span>{profile.location}</span>
              </div>
              {profile.availableForWork && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[var(--foreground-secondary)]">
                    Available for new projects
                  </span>
                </div>
              )}
            </div>

            <SocialIcons links={profile.socialLinks} size={22} />

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--card-border)]">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--foreground)]">
                  <AnimatedCounter end={3} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)]">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--foreground)]">
                  <AnimatedCounter end={2} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)]">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--foreground)]">
                  <AnimatedCounter end={12} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)]">Technologies</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-[320px] h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10 rounded-2xl" />
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl font-bold text-white/20">
                    {profile.name?.split(' ').map(n => n[0]).join('') || 'AR'}
                  </div>
                )}
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--accent)]/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
