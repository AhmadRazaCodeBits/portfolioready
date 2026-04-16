// Standalone seed script — run with: npm run seed
// Pushes all resume data to MongoDB

import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env using built-in node feature
const __dirname = dirname(fileURLToPath(import.meta.url));
process.loadEnvFile(join(__dirname, '..', '.env.local'));

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// === Define schemas inline (can't use path aliases in standalone script) ===
const ProfileSchema = new mongoose.Schema({
  name: String, title: String, bio: String, aboutText: String,
  aboutBullets: [String], email: String, phone: String, location: String,
  avatarUrl: String, aboutImageUrl: String, resumeUrl: String,
  availableForWork: Boolean,
  socialLinks: [{ platform: String, url: String, icon: String }],
  seoTitle: String, seoDescription: String, ogImage: String,
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: String, iconUrl: String, order: Number, visible: Boolean,
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company: String, companyLogo: String, role: String,
  startDate: String, endDate: String, location: String,
  description: [String], order: Number, visible: Boolean,
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: String, description: String, techStack: [String],
  imageUrl: String, githubUrl: String, liveUrl: String,
  order: Number, visible: Boolean,
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: String, role: String, company: String,
  avatarUrl: String, text: String, order: Number, visible: Boolean,
}, { timestamps: true });

const NavItemSchema = new mongoose.Schema({
  label: String, href: String, order: Number, visible: Boolean,
}, { timestamps: true });

const ChatbotResponseSchema = new mongoose.Schema({
  greeting: String, skills: String, experience: String,
  projects: String, education: String, contact: String,
  hire: String, location: String, fallback: String,
}, { timestamps: true });

// === Seed Data ===
const seedProfile = {
  name: "Ahmad Raza",
  title: "MERN Stack Developer",
  bio: "I'm a skilled MERN stack developer with a focus on creating exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Building dynamic, user-friendly web applications is my passion, and I bring proven expertise in full-stack solutions.",
  aboutText: "I'm a passionate developer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matter a lot to me.\n\nI began my journey as a web developer, and since then, I've continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, with expertise in the MERN stack, I'm building cutting-edge web applications that deliver real value.\n\nOne last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I don't bite 😉",
  aboutBullets: ["BS in Computer Science", "Full time developer", "Avid learner", "Aspiring tech entrepreneur"],
  email: "ahmadraza20416@gmail.com",
  phone: "+923079618398",
  location: "Lahore, Punjab, Pakistan",
  avatarUrl: "/images/profile image.jpeg",
  aboutImageUrl: "/images/profile image.jpeg",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/AhmadRazaCodeBits", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/ahmad-raza416", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/", icon: "twitter" }
  ],
  seoTitle: "Ahmad Raza | MERN Stack Developer Portfolio",
  seoDescription: "Skilled MERN stack developer with expertise in building dynamic, user-friendly web applications using React.js, Node.js, Next.js, and MongoDB.",
  ogImage: "/images/og-image.jpg"
};

const seedSkills = [
  { name: "JavaScript", iconUrl: "/icons/icon-javscript.svg", order: 1, visible: true },
  { name: "React.js", iconUrl: "/icons/icon-react.svg", order: 2, visible: true },
  { name: "Next.js", iconUrl: "/icons/icon-nextjs.svg", order: 3, visible: true },
  { name: "Node.js", iconUrl: "/icons/icon-nodejs.svg", order: 4, visible: true },
  { name: "Express.js", iconUrl: "/icons/icon-express.svg", order: 5, visible: true },
  { name: "MongoDB", iconUrl: "/icons/icon-mongodb.svg", order: 6, visible: true },
  { name: "TypeScript", iconUrl: "/icons/icon-typescript.svg", order: 7, visible: true },
  { name: "Tailwind CSS", iconUrl: "/icons/icon-tailwindcss.svg", order: 8, visible: true },
  { name: "PostgreSQL", iconUrl: "/icons/icon-postgresql.svg", order: 9, visible: true },
  { name: "Git", iconUrl: "/icons/icon-git.svg", order: 10, visible: true },
  { name: "Figma", iconUrl: "/icons/icon-figma.svg", order: 11, visible: true },
  { name: "Sass", iconUrl: "/icons/icon-sass.svg", order: 12, visible: true },
];

const seedExperience = [
  { company: "Symtera Technology", companyLogo: "", role: "MERN Stack Developer", startDate: "Feb 2026", endDate: "Present", location: "Lahore", description: ["Develop and maintain scalable front-end and back-end solutions for production applications.", "Write clean, efficient, and reusable code for real-world projects.", "Collaborate with team members to deliver high-quality software on deadline."], order: 1, visible: true },
  { company: "Tiers Limited", companyLogo: "", role: "MERN Stack Internee", startDate: "May 2023", endDate: "Aug 2023", location: "Lahore", description: ["Developed MERN stack (MongoDB, Express.js, React.js, Node.js) web applications.", "Applied user-centered design principles to improve UX across multiple projects."], order: 2, visible: true },
];

const seedProjects = [
  { title: "Humanity Edge Portal", description: "Built a full-stack MERN charity website with volunteer management, campaigns, secure payments, and a comprehensive admin panel. Boosted donor engagement via blogs and videos, resulting in +50% donations and +30% volunteer retention.", techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe"], imageUrl: "/images/project-1.jpg", githubUrl: "https://github.com/AhmadRazaCodeBits", liveUrl: "#", order: 1, visible: true },
  { title: "Ecommerce Website", description: "Built a MERN stack e-commerce website with authentication, product listings, cart, and secure payments. Improved UX with responsive design and performance optimization, boosting engagement and sales.", techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Redux"], imageUrl: "/images/project-2.jpg", githubUrl: "https://github.com/AhmadRazaCodeBits", liveUrl: "#", order: 2, visible: true },
  { title: "Attendance App", description: "Developed a MERN-based student management system with full admin CRUD functionality. Enabled student login via admin-provided credentials and attendance tracking with check-in/check-out functionality.", techStack: ["React.js", "Node.js", "MongoDB", "Express.js"], imageUrl: "/images/project-3.jpg", githubUrl: "https://github.com/AhmadRazaCodeBits", liveUrl: "#", order: 3, visible: true },
];

const seedTestimonials = [
  { name: "Ali Hassan", role: "Project Manager", company: "Symtera Technology", avatarUrl: "", text: "Ahmad is an exceptional developer who consistently delivers high-quality code. His attention to detail and ability to solve complex problems make him an invaluable team member.", order: 1, visible: true },
  { name: "Sarah Khan", role: "UI/UX Designer", company: "Freelance Client", avatarUrl: "", text: "Working with Ahmad was a fantastic experience. He translated my designs into pixel-perfect, responsive web applications with smooth animations and excellent performance.", order: 2, visible: true },
  { name: "Usman Ahmed", role: "CEO", company: "Tech Startup", avatarUrl: "", text: "Ahmad built our entire web platform from scratch. His expertise in the MERN stack and his commitment to writing clean, maintainable code exceeded our expectations.", order: 3, visible: true },
];

const seedNavItems = [
  { label: "About", href: "#about", order: 1, visible: true },
  { label: "Skills", href: "#skills", order: 2, visible: true },
  { label: "Experience", href: "#experience", order: 3, visible: true },
  { label: "Work", href: "#work", order: 4, visible: true },
  { label: "Testimonials", href: "#testimonials", order: 5, visible: true },
  { label: "Contact", href: "#contact", order: 6, visible: true },
];

const seedChatbotResponsesData = {
  greeting: "Hi! 👋 I'm Ahmad's portfolio assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
  skills: "Ahmad is proficient in: JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, PostgreSQL, Git, Figma, and Sass.",
  experience: "Ahmad currently works as a MERN Stack Developer at Symtera Technology, Lahore (since Feb 2026). Previously, he interned at Tiers Limited (May-Aug 2023).",
  projects: "Ahmad has built several notable projects:\n• Humanity Edge Portal - A charity platform\n• Ecommerce Website - Full-featured online store\n• Attendance App - Student management system",
  education: "Ahmad holds a BS in Computer Science from the University of Engineering and Technology, Lahore (2020-2024).",
  contact: "You can reach Ahmad at:\n📧 ahmadraza20416@gmail.com\n📱 +923079618398\n💼 linkedin.com/in/ahmad-raza416\n🐙 github.com/AhmadRazaCodeBits",
  hire: "Ahmad is currently available for freelance work and new opportunities! Feel free to reach out via the contact form or email.",
  location: "Ahmad is based in Lahore, Punjab, Pakistan.",
  fallback: "I'm not sure about that. Try asking about Ahmad's skills, experience, projects, education, or contact information!"
};

// === Run Seed ===
async function seed() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected!\n');

  const Profile = mongoose.model('Profile', ProfileSchema);
  const Skill = mongoose.model('Skill', SkillSchema);
  const ExperienceModel = mongoose.model('Experience', ExperienceSchema);
  const ProjectModel = mongoose.model('Project', ProjectSchema);
  const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema);
  const NavItemModel = mongoose.model('NavItem', NavItemSchema);
  const ChatbotResponseModel = mongoose.model('ChatbotResponse', ChatbotResponseSchema);

  // Clear everything
  console.log('🗑️  Clearing existing data...');
  await Promise.all([
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    ExperienceModel.deleteMany({}),
    ProjectModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    NavItemModel.deleteMany({}),
    ChatbotResponseModel.deleteMany({}),
  ]);

  // Insert seed data
  console.log('📝 Inserting seed data...');
  const [profile, skills, experience, projects, testimonials, navItems, chatbot] = await Promise.all([
    Profile.create(seedProfile),
    Skill.insertMany(seedSkills),
    ExperienceModel.insertMany(seedExperience),
    ProjectModel.insertMany(seedProjects),
    TestimonialModel.insertMany(seedTestimonials),
    NavItemModel.insertMany(seedNavItems),
    ChatbotResponseModel.create(seedChatbotResponsesData),
  ]);

  console.log(`\n✅ Profile: ${profile.name}`);
  console.log(`✅ Skills: ${skills.length} items`);
  console.log(`✅ Experience: ${experience.length} items`);
  console.log(`✅ Projects: ${projects.length} items`);
  console.log(`✅ Testimonials: ${testimonials.length} items`);
  console.log(`✅ Nav Items: ${navItems.length} items`);
  console.log(`✅ Chatbot: configured`);
  console.log('\n🎉 Database seeded successfully!');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
