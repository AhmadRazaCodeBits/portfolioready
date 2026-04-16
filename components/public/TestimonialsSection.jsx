'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { getInitials } from '@/lib/utils';

export default function TestimonialsSection({ testimonials = [] }) {
  const [current, setCurrent] = useState(0);

  if (testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="relative">
      <div className="section-container">
        <SectionHeader
          badge="Testimonials"
          title="Nice things people have said about me:"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="card-base p-8 md:p-10 text-center"
              >
                <Quote className="mx-auto mb-6 text-[var(--accent)] opacity-30" size={48} />

                {/* Avatar */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  {testimonials[current].avatarUrl ? (
                    <img
                      src={testimonials[current].avatarUrl}
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {getInitials(testimonials[current].name)}
                    </span>
                  )}
                </div>

                <p className="text-[var(--foreground-secondary)] text-base md:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    {testimonials[current].role}
                    {testimonials[current].company && ` at ${testimonials[current].company}`}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2 rounded-full border border-[var(--card-border)] hover:bg-[var(--card)] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === current
                          ? 'bg-[var(--foreground)] scale-110'
                          : 'bg-[var(--muted)] hover:bg-[var(--foreground-secondary)]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2 rounded-full border border-[var(--card-border)] hover:bg-[var(--card)] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
