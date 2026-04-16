'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export default function ProjectsSection({ projects = [] }) {
  return (
    <section id="work" className="relative bg-[var(--background-secondary)]">
      <div className="section-container">
        <SectionHeader
          badge="Work"
          title="Some of the noteworthy projects I have built:"
        />

        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card-base overflow-hidden grid md:grid-cols-2 ${
                index % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative h-[250px] md:h-full bg-gradient-to-br from-gray-700/50 to-gray-900/50 ${
                index % 2 === 1 ? 'md:order-2' : ''
              }`}>
                {project.imageUrl && project.imageUrl !== '/images/project-1.jpg' && 
                 project.imageUrl !== '/images/project-2.jpg' && 
                 project.imageUrl !== '/images/project-3.jpg' ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                    <div className="bg-[var(--card)] rounded-lg shadow-2xl p-6 mx-8 w-full max-w-[280px]">
                      <div className="flex gap-1.5 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-[var(--card-border)] rounded w-3/4" />
                        <div className="h-3 bg-[var(--card-border)] rounded w-1/2" />
                        <div className="h-3 bg-[var(--card-border)] rounded w-5/6" />
                        <div className="h-3 bg-[var(--card-border)] rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-6 md:p-8 flex flex-col justify-center ${
                index % 2 === 1 ? 'md:order-1' : ''
              }`}>
                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--foreground-secondary)] mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full
                                 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
