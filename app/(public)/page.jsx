import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import SkillsSection from '@/components/public/SkillsSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import DynamicSectionsRenderer from '@/components/public/DynamicSectionsRenderer';
import { getProfile, getSkills, getExperience, getProjects, getTestimonials, getDynamicSections } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [profile, skills, experience, projects, testimonials, dynamicSections] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getProjects(),
    getTestimonials(),
    getDynamicSections()
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <DynamicSectionsRenderer sections={dynamicSections} />
      <ContactSection profile={profile} />
    </>
  );
}
