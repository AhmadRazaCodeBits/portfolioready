import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  aboutText: { type: String, default: '' },
  aboutBullets: [{ type: String }],
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  aboutImageUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '/resume.pdf' },
  availableForWork: { type: Boolean, default: true },
  socialLinks: [{
    platform: String,
    url: String,
    icon: String,
  }],
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
