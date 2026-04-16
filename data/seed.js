// Seed data extracted from Ahmad Raza's resume
// This serves as the initial data AND the JSON storage fallback

export const seedProfile = {
  name: "Ahmad Raza",
  title: "MERN Stack Developer",
  bio: "I'm a skilled MERN stack developer with a focus on creating exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Building dynamic, user-friendly web applications is my passion, and I bring proven expertise in full-stack solutions.",
  aboutText: "I'm a passionate developer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matter a lot to me.\n\nI began my journey as a web developer, and since then, I've continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, with expertise in the MERN stack, I'm building cutting-edge web applications that deliver real value.\n\nOne last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I don't bite 😉",
  aboutBullets: [
    "BS in Computer Science",
    "Full time developer",
    "Avid learner",
    "Aspiring tech entrepreneur"
  ],
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

export const seedSkills = [
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

export const seedExperience = [
  {
    company: "Symtera Technology",
    companyLogo: "",
    role: "MERN Stack Developer",
    startDate: "Feb 2026",
    endDate: "Present",
    location: "Lahore",
    description: [
      "Develop and maintain scalable front-end and back-end solutions for production applications.",
      "Write clean, efficient, and reusable code for real-world projects.",
      "Collaborate with team members to deliver high-quality software on deadline."
    ],
    order: 1,
    visible: true
  },
  {
    company: "Tiers Limited",
    companyLogo: "",
    role: "MERN Stack Internee",
    startDate: "May 2023",
    endDate: "Aug 2023",
    location: "Lahore",
    description: [
      "Developed MERN stack (MongoDB, Express.js, React.js, Node.js) web applications.",
      "Applied user-centered design principles to improve UX across multiple projects."
    ],
    order: 2,
    visible: true
  }
];

export const seedProjects = [
  {
    title: "Humanity Edge Portal",
    description: "Built a full-stack MERN charity website with volunteer management, campaigns, secure payments, and a comprehensive admin panel. Boosted donor engagement via blogs and videos, resulting in +50% donations and +30% volunteer retention.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe"],
    imageUrl: "/images/project-1.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 1,
    visible: true
  },
  {
    title: "Ecommerce Website",
    description: "Built a MERN stack e-commerce website with authentication, product listings, cart, and secure payments. Improved UX with responsive design and performance optimization, boosting engagement and sales.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Redux"],
    imageUrl: "/images/project-2.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 2,
    visible: true
  },
  {
    title: "Attendance App",
    description: "Developed a MERN-based student management system with full admin CRUD functionality. Enabled student login via admin-provided credentials and attendance tracking with check-in/check-out functionality.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    imageUrl: "/images/project-3.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 3,
    visible: true
  }
];

export const seedTestimonials = [
  {
    name: "Ali Hassan",
    role: "Project Manager",
    company: "Symtera Technology",
    avatarUrl: "",
    text: "Ahmad is an exceptional developer who consistently delivers high-quality code. His attention to detail and ability to solve complex problems make him an invaluable team member.",
    order: 1,
    visible: true
  },
  {
    name: "Sarah Khan",
    role: "UI/UX Designer",
    company: "Freelance Client",
    avatarUrl: "",
    text: "Working with Ahmad was a fantastic experience. He translated my designs into pixel-perfect, responsive web applications with smooth animations and excellent performance.",
    order: 2,
    visible: true
  },
  {
    name: "Usman Ahmed",
    role: "CEO",
    company: "Tech Startup",
    avatarUrl: "",
    text: "Ahmad built our entire web platform from scratch. His expertise in the MERN stack and his commitment to writing clean, maintainable code exceeded our expectations.",
    order: 3,
    visible: true
  }
];

export const seedNavItems = [
  { label: "About", href: "#about", order: 1, visible: true },
  { label: "Skills", href: "#skills", order: 2, visible: true },
  { label: "Experience", href: "#experience", order: 3, visible: true },
  { label: "Work", href: "#work", order: 4, visible: true },
  { label: "Testimonials", href: "#testimonials", order: 5, visible: true },
  { label: "Contact", href: "#contact", order: 6, visible: true },
];

export const seedChatbotResponses = {
  greeting: "Hi! 👋 I'm Ahmad's portfolio assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
  skills: "Ahmad is proficient in: JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, PostgreSQL, Git, Figma, and Sass. He specializes in the MERN stack for full-stack web development.",
  experience: "Ahmad currently works as a MERN Stack Developer at Symtera Technology, Lahore (since Feb 2026). Previously, he interned at Tiers Limited (May-Aug 2023) where he built MERN stack web applications.",
  projects: "Ahmad has built several notable projects:\n• Humanity Edge Portal - A charity platform with +50% donation increase\n• Ecommerce Website - Full-featured online store\n• Attendance App - Student management system\nCheck out the Work section for more details!",
  education: "Ahmad holds a BS in Computer Science from the University of Engineering and Technology, Lahore (2020-2024).",
  contact: "You can reach Ahmad at:\n📧 ahmadraza20416@gmail.com\n📱 +923079618398\n💼 linkedin.com/in/ahmad-raza416\n🐙 github.com/AhmadRazaCodeBits",
  hire: "Ahmad is currently available for freelance work and new opportunities! Feel free to reach out via the contact form or email at ahmadraza20416@gmail.com",
  location: "Ahmad is based in Lahore, Punjab, Pakistan.",
  fallback: "I'm not sure about that. Try asking about Ahmad's skills, experience, projects, education, or contact information!"
};
