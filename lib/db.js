// MongoDB data layer with Mongoose
// All queries use .lean() for maximum read performance (plain JS objects, no Mongoose overhead)
// Includes in-memory cache for serverless performance

import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import Project from '@/models/Project';
import Testimonial from '@/models/Testimonial';
import NavItem from '@/models/NavItem';
import ChatbotResponse from '@/models/ChatbotResponse';
import DynamicSectionSchema from '@/models/DynamicSection';
import {
  seedProfile,
  seedSkills,
  seedExperience,
  seedProjects,
  seedTestimonials,
  seedNavItems,
  seedChatbotResponses,
} from '@/data/seed';

// ============ IN-MEMORY CACHE ============
// Cache with TTL for serverless functions — avoids redundant DB hits within same function instance
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 60 seconds TTL

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

/** Invalidate all cached data (called after admin writes) */
export function invalidateCache(key) {
  if (key) {
    cache.delete(key);
    // Also invalidate the bundled public data cache
    cache.delete('allPublicData');
  } else {
    cache.clear();
  }
}

// ============ PROFILE ============
export async function getProfile() {
  if (!process.env.MONGODB_URI) return seedProfile;
  const cached = getCached('profile');
  if (cached) return cached;
  await connectDB();
  let profile = await Profile.findOne().lean();
  if (!profile) {
    profile = await Profile.create(seedProfile);
    return setCache('profile', JSON.parse(JSON.stringify(profile)));
  }
  return setCache('profile', JSON.parse(JSON.stringify(profile)));
}

export async function updateProfile(data) {
  await connectDB();
  const profile = await Profile.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
  invalidateCache('profile');
  return JSON.parse(JSON.stringify(profile));
}

// ============ SKILLS ============
export async function getSkills() {
  if (!process.env.MONGODB_URI) return seedSkills.filter(s => s.visible).sort((a, b) => a.order - b.order);
  const cached = getCached('skills');
  if (cached) return cached;
  await connectDB();
  const skills = await Skill.find({ visible: true }).sort({ order: 1 }).lean();
  if (skills.length === 0) {
    const created = await Skill.insertMany(seedSkills);
    return setCache('skills', JSON.parse(JSON.stringify(created.filter(s => s.visible).sort((a, b) => a.order - b.order))));
  }
  return setCache('skills', JSON.parse(JSON.stringify(skills)));
}

export async function getAllSkills() {
  if (!process.env.MONGODB_URI) return seedSkills.sort((a, b) => a.order - b.order);
  await connectDB();
  const skills = await Skill.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function createSkill(data) {
  await connectDB();
  const existing = await Skill.findOne({ order: data.order }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Skill.`);
  const skill = await Skill.create(data);
  invalidateCache('skills');
  return JSON.parse(JSON.stringify(skill));
}

export async function updateSkill(id, data) {
  await connectDB();
  const existing = await Skill.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Skill.`);
  const skill = await Skill.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!skill) throw new Error('Skill not found');
  invalidateCache('skills');
  return JSON.parse(JSON.stringify(skill));
}

export async function deleteSkill(id) {
  await connectDB();
  await Skill.findByIdAndDelete(id);
  invalidateCache('skills');
  return { success: true };
}

// ============ EXPERIENCE ============
export async function getExperience() {
  if (!process.env.MONGODB_URI) return seedExperience.filter(e => e.visible).sort((a, b) => a.order - b.order);
  const cached = getCached('experience');
  if (cached) return cached;
  await connectDB();
  const exp = await Experience.find({ visible: true }).sort({ order: 1 }).lean();
  if (exp.length === 0) {
    const created = await Experience.insertMany(seedExperience);
    return setCache('experience', JSON.parse(JSON.stringify(created.filter(e => e.visible).sort((a, b) => a.order - b.order))));
  }
  return setCache('experience', JSON.parse(JSON.stringify(exp)));
}

export async function getAllExperience() {
  if (!process.env.MONGODB_URI) return seedExperience.sort((a, b) => a.order - b.order);
  await connectDB();
  const exp = await Experience.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(exp));
}

export async function createExperience(data) {
  await connectDB();
  const existing = await Experience.findOne({ order: data.order }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Experience.`);
  const exp = await Experience.create(data);
  invalidateCache('experience');
  return JSON.parse(JSON.stringify(exp));
}

export async function updateExperience(id, data) {
  await connectDB();
  const existing = await Experience.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Experience.`);
  const exp = await Experience.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!exp) throw new Error('Experience not found');
  invalidateCache('experience');
  return JSON.parse(JSON.stringify(exp));
}

export async function deleteExperience(id) {
  await connectDB();
  await Experience.findByIdAndDelete(id);
  invalidateCache('experience');
  return { success: true };
}

// ============ PROJECTS ============
export async function getProjects() {
  if (!process.env.MONGODB_URI) return seedProjects.filter(p => p.visible).sort((a, b) => a.order - b.order);
  const cached = getCached('projects');
  if (cached) return cached;
  await connectDB();
  const projects = await Project.find({ visible: true }).sort({ order: 1 }).lean();
  if (projects.length === 0) {
    const created = await Project.insertMany(seedProjects);
    return setCache('projects', JSON.parse(JSON.stringify(created.filter(p => p.visible).sort((a, b) => a.order - b.order))));
  }
  return setCache('projects', JSON.parse(JSON.stringify(projects)));
}

export async function getAllProjects() {
  if (!process.env.MONGODB_URI) return seedProjects.sort((a, b) => a.order - b.order);
  await connectDB();
  const projects = await Project.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function createProject(data) {
  await connectDB();
  const existing = await Project.findOne({ order: data.order }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Project.`);
  const project = await Project.create(data);
  invalidateCache('projects');
  return JSON.parse(JSON.stringify(project));
}

export async function updateProject(id, data) {
  await connectDB();
  const existing = await Project.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Project.`);
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!project) throw new Error('Project not found');
  invalidateCache('projects');
  return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(id) {
  await connectDB();
  await Project.findByIdAndDelete(id);
  invalidateCache('projects');
  return { success: true };
}

// ============ TESTIMONIALS ============
export async function getTestimonials() {
  if (!process.env.MONGODB_URI) return seedTestimonials.filter(t => t.visible).sort((a, b) => a.order - b.order);
  const cached = getCached('testimonials');
  if (cached) return cached;
  await connectDB();
  const testimonials = await Testimonial.find({ visible: true }).sort({ order: 1 }).lean();
  if (testimonials.length === 0) {
    const created = await Testimonial.insertMany(seedTestimonials);
    return setCache('testimonials', JSON.parse(JSON.stringify(created.filter(t => t.visible).sort((a, b) => a.order - b.order))));
  }
  return setCache('testimonials', JSON.parse(JSON.stringify(testimonials)));
}

export async function getAllTestimonials() {
  if (!process.env.MONGODB_URI) return seedTestimonials.sort((a, b) => a.order - b.order);
  await connectDB();
  const testimonials = await Testimonial.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(testimonials));
}

export async function createTestimonial(data) {
  await connectDB();
  const existing = await Testimonial.findOne({ order: data.order }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Testimonial.`);
  const testimonial = await Testimonial.create(data);
  invalidateCache('testimonials');
  return JSON.parse(JSON.stringify(testimonial));
}

export async function updateTestimonial(id, data) {
  await connectDB();
  const existing = await Testimonial.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Testimonial.`);
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!testimonial) throw new Error('Testimonial not found');
  invalidateCache('testimonials');
  return JSON.parse(JSON.stringify(testimonial));
}

export async function deleteTestimonial(id) {
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  invalidateCache('testimonials');
  return { success: true };
}

// ============ NAV ITEMS ============
export async function getNavItems() {
  if (!process.env.MONGODB_URI) return seedNavItems.filter(n => n.visible).sort((a, b) => a.order - b.order);
  const cached = getCached('navItems');
  if (cached) return cached;
  await connectDB();
  const items = await NavItem.find({ visible: true }).sort({ order: 1 }).lean();
  if (items.length === 0) {
    const created = await NavItem.insertMany(seedNavItems);
    return setCache('navItems', JSON.parse(JSON.stringify(created.filter(n => n.visible).sort((a, b) => a.order - b.order))));
  }
  return setCache('navItems', JSON.parse(JSON.stringify(items)));
}

export async function getAllNavItems() {
  if (!process.env.MONGODB_URI) return seedNavItems.sort((a, b) => a.order - b.order);
  await connectDB();
  const items = await NavItem.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function updateNavItems(items) {
  await connectDB();
  await NavItem.deleteMany({});
  const created = await NavItem.insertMany(items);
  invalidateCache('navItems');
  return JSON.parse(JSON.stringify(created));
}

// ============ CHATBOT ============
export async function getChatbotResponses() {
  if (!process.env.MONGODB_URI) return seedChatbotResponses;
  const cached = getCached('chatbot');
  if (cached) return cached;
  await connectDB();
  let responses = await ChatbotResponse.findOne().lean();
  if (!responses) {
    responses = await ChatbotResponse.create(seedChatbotResponses);
    return setCache('chatbot', JSON.parse(JSON.stringify(responses)));
  }
  return setCache('chatbot', JSON.parse(JSON.stringify(responses)));
}

export async function updateChatbotResponses(data) {
  await connectDB();
  const responses = await ChatbotResponse.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
  invalidateCache('chatbot');
  return JSON.parse(JSON.stringify(responses));
}

// ============ SEED ============
export async function seedDatabase() {
  await connectDB();

  // Clear all collections
  await Promise.all([
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
    Project.deleteMany({}),
    Testimonial.deleteMany({}),
    NavItem.deleteMany({}),
    ChatbotResponse.deleteMany({}),
  ]);

  // Insert seed data
  await Promise.all([
    Profile.create(seedProfile),
    Skill.insertMany(seedSkills),
    Experience.insertMany(seedExperience),
    Project.insertMany(seedProjects),
    Testimonial.insertMany(seedTestimonials),
    NavItem.insertMany(seedNavItems),
    ChatbotResponse.create(seedChatbotResponses),
  ]);

  // Clear all caches after seeding
  invalidateCache();

  return { success: true, message: 'Database seeded successfully' };
}

// ============ STATS ============
export async function getStats() {
  if (!process.env.MONGODB_URI) {
    return {
      totalProjects: seedProjects.length,
      totalSkills: seedSkills.length,
      totalExperience: seedExperience.length,
      totalTestimonials: seedTestimonials.length
    };
  }
  
  await connectDB();
  const [projects, skills, experience, testimonials] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Testimonial.countDocuments(),
  ]);
  return { totalProjects: projects, totalSkills: skills, totalExperience: experience, totalTestimonials: testimonials };
}

// ============ DYNAMIC SECTIONS ============
export async function getDynamicSections() {
  if (!process.env.MONGODB_URI) return [];
  const cached = getCached('dynamicSections');
  if (cached) return cached;
  await connectDB();
  const sections = await DynamicSectionSchema.find({ visible: true }).sort({ order: 1 }).lean();
  return setCache('dynamicSections', JSON.parse(JSON.stringify(sections)));
}

// ============ BATCHED PUBLIC DATA (Single DB connection for entire homepage) ============
/**
 * Fetches ALL data needed for the public homepage in a single connectDB() call.
 * This avoids 8 separate connection handshakes on serverless cold starts.
 */
export async function getAllPublicData() {
  // Check if we have everything cached
  const cachedBundle = getCached('allPublicData');
  if (cachedBundle) return cachedBundle;

  if (!process.env.MONGODB_URI) {
    const fallback = {
      profile: seedProfile,
      skills: seedSkills.filter(s => s.visible).sort((a, b) => a.order - b.order),
      experience: seedExperience.filter(e => e.visible).sort((a, b) => a.order - b.order),
      projects: seedProjects.filter(p => p.visible).sort((a, b) => a.order - b.order),
      testimonials: seedTestimonials.filter(t => t.visible).sort((a, b) => a.order - b.order),
      navItems: seedNavItems.filter(n => n.visible).sort((a, b) => a.order - b.order),
      dynamicSections: [],
    };
    return setCache('allPublicData', fallback);
  }

  // Single connectDB() call — then all queries run in parallel
  await connectDB();

  const [profile, skills, experience, projects, testimonials, navItems, dynamicSections] = await Promise.all([
    Profile.findOne().lean(),
    Skill.find({ visible: true }).sort({ order: 1 }).lean(),
    Experience.find({ visible: true }).sort({ order: 1 }).lean(),
    Project.find({ visible: true }).sort({ order: 1 }).lean(),
    Testimonial.find({ visible: true }).sort({ order: 1 }).lean(),
    NavItem.find({ visible: true }).sort({ order: 1 }).lean(),
    DynamicSectionSchema.find({ visible: true }).sort({ order: 1 }).lean(),
  ]);

  const result = {
    profile: profile ? JSON.parse(JSON.stringify(profile)) : seedProfile,
    skills: skills.length > 0 ? JSON.parse(JSON.stringify(skills)) : seedSkills.filter(s => s.visible).sort((a, b) => a.order - b.order),
    experience: experience.length > 0 ? JSON.parse(JSON.stringify(experience)) : seedExperience.filter(e => e.visible).sort((a, b) => a.order - b.order),
    projects: projects.length > 0 ? JSON.parse(JSON.stringify(projects)) : seedProjects.filter(p => p.visible).sort((a, b) => a.order - b.order),
    testimonials: testimonials.length > 0 ? JSON.parse(JSON.stringify(testimonials)) : seedTestimonials.filter(t => t.visible).sort((a, b) => a.order - b.order),
    navItems: navItems.length > 0 ? JSON.parse(JSON.stringify(navItems)) : seedNavItems.filter(n => n.visible).sort((a, b) => a.order - b.order),
    dynamicSections: JSON.parse(JSON.stringify(dynamicSections)),
  };

  // Also populate individual caches
  setCache('profile', result.profile);
  setCache('skills', result.skills);
  setCache('experience', result.experience);
  setCache('projects', result.projects);
  setCache('testimonials', result.testimonials);
  setCache('navItems', result.navItems);
  setCache('dynamicSections', result.dynamicSections);

  return setCache('allPublicData', result);
}
