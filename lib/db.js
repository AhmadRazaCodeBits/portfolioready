// MongoDB data layer with Mongoose
// All queries use .lean() for maximum read performance (plain JS objects, no Mongoose overhead)

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

// ============ PROFILE ============
export async function getProfile() {
  if (!process.env.MONGODB_URI) return seedProfile;
  await connectDB();
  let profile = await Profile.findOne().lean();
  if (!profile) {
    profile = await Profile.create(seedProfile);
    return JSON.parse(JSON.stringify(profile));
  }
  return JSON.parse(JSON.stringify(profile));
}

export async function updateProfile(data) {
  await connectDB();
  const profile = await Profile.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
  return JSON.parse(JSON.stringify(profile));
}

// ============ SKILLS ============
export async function getSkills() {
  if (!process.env.MONGODB_URI) return seedSkills.filter(s => s.visible).sort((a, b) => a.order - b.order);
  await connectDB();
  const skills = await Skill.find({ visible: true }).sort({ order: 1 }).lean();
  if (skills.length === 0) {
    const created = await Skill.insertMany(seedSkills);
    return JSON.parse(JSON.stringify(created.filter(s => s.visible).sort((a, b) => a.order - b.order)));
  }
  return JSON.parse(JSON.stringify(skills));
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
  return JSON.parse(JSON.stringify(skill));
}

export async function updateSkill(id, data) {
  await connectDB();
  const existing = await Skill.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Skill.`);
  const skill = await Skill.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!skill) throw new Error('Skill not found');
  return JSON.parse(JSON.stringify(skill));
}

export async function deleteSkill(id) {
  await connectDB();
  await Skill.findByIdAndDelete(id);
  return { success: true };
}

// ============ EXPERIENCE ============
export async function getExperience() {
  if (!process.env.MONGODB_URI) return seedExperience.filter(e => e.visible).sort((a, b) => a.order - b.order);
  await connectDB();
  const exp = await Experience.find({ visible: true }).sort({ order: 1 }).lean();
  if (exp.length === 0) {
    const created = await Experience.insertMany(seedExperience);
    return JSON.parse(JSON.stringify(created.filter(e => e.visible).sort((a, b) => a.order - b.order)));
  }
  return JSON.parse(JSON.stringify(exp));
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
  return JSON.parse(JSON.stringify(exp));
}

export async function updateExperience(id, data) {
  await connectDB();
  const existing = await Experience.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Experience.`);
  const exp = await Experience.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!exp) throw new Error('Experience not found');
  return JSON.parse(JSON.stringify(exp));
}

export async function deleteExperience(id) {
  await connectDB();
  await Experience.findByIdAndDelete(id);
  return { success: true };
}

// ============ PROJECTS ============
export async function getProjects() {
  if (!process.env.MONGODB_URI) return seedProjects.filter(p => p.visible).sort((a, b) => a.order - b.order);
  await connectDB();
  const projects = await Project.find({ visible: true }).sort({ order: 1 }).lean();
  if (projects.length === 0) {
    const created = await Project.insertMany(seedProjects);
    return JSON.parse(JSON.stringify(created.filter(p => p.visible).sort((a, b) => a.order - b.order)));
  }
  return JSON.parse(JSON.stringify(projects));
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
  return JSON.parse(JSON.stringify(project));
}

export async function updateProject(id, data) {
  await connectDB();
  const existing = await Project.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Project.`);
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!project) throw new Error('Project not found');
  return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(id) {
  await connectDB();
  await Project.findByIdAndDelete(id);
  return { success: true };
}

// ============ TESTIMONIALS ============
export async function getTestimonials() {
  if (!process.env.MONGODB_URI) return seedTestimonials.filter(t => t.visible).sort((a, b) => a.order - b.order);
  await connectDB();
  const testimonials = await Testimonial.find({ visible: true }).sort({ order: 1 }).lean();
  if (testimonials.length === 0) {
    const created = await Testimonial.insertMany(seedTestimonials);
    return JSON.parse(JSON.stringify(created.filter(t => t.visible).sort((a, b) => a.order - b.order)));
  }
  return JSON.parse(JSON.stringify(testimonials));
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
  return JSON.parse(JSON.stringify(testimonial));
}

export async function updateTestimonial(id, data) {
  await connectDB();
  const existing = await Testimonial.findOne({ order: data.order, _id: { $ne: id } }).lean();
  if (existing) throw new Error(`Order number ${data.order} is already in use by another Testimonial.`);
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!testimonial) throw new Error('Testimonial not found');
  return JSON.parse(JSON.stringify(testimonial));
}

export async function deleteTestimonial(id) {
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  return { success: true };
}

// ============ NAV ITEMS ============
export async function getNavItems() {
  if (!process.env.MONGODB_URI) return seedNavItems.filter(n => n.visible).sort((a, b) => a.order - b.order);
  await connectDB();
  const items = await NavItem.find({ visible: true }).sort({ order: 1 }).lean();
  if (items.length === 0) {
    const created = await NavItem.insertMany(seedNavItems);
    return JSON.parse(JSON.stringify(created.filter(n => n.visible).sort((a, b) => a.order - b.order)));
  }
  return JSON.parse(JSON.stringify(items));
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
  return JSON.parse(JSON.stringify(created));
}

// ============ CHATBOT ============
export async function getChatbotResponses() {
  if (!process.env.MONGODB_URI) return seedChatbotResponses;
  await connectDB();
  let responses = await ChatbotResponse.findOne().lean();
  if (!responses) {
    responses = await ChatbotResponse.create(seedChatbotResponses);
    return JSON.parse(JSON.stringify(responses));
  }
  return JSON.parse(JSON.stringify(responses));
}

export async function updateChatbotResponses(data) {
  await connectDB();
  const responses = await ChatbotResponse.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
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
  await connectDB();
  const sections = await DynamicSectionSchema.find({ visible: true }).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(sections));
}
