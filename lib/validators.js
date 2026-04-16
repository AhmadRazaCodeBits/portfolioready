import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  aboutText: z.string().optional(),
  aboutBullets: z.array(z.string()).optional(),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Phone is required'),
  location: z.string().min(1, 'Location is required'),
  availableForWork: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  iconUrl: z.string().optional(),
  order: z.number().int().positive().optional(),
  visible: z.boolean().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  companyLogo: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().optional(),
  description: z.array(z.string()).min(1, 'At least one description point is required'),
  order: z.number().int().positive().optional(),
  visible: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
  imageUrl: z.string().optional(),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveUrl: z.string().optional(),
  order: z.number().int().positive().optional(),
  visible: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  company: z.string().optional(),
  avatarUrl: z.string().optional(),
  text: z.string().min(10, 'Testimonial must be at least 10 characters'),
  order: z.number().int().positive().optional(),
  visible: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
