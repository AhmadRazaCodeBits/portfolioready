import mongoose from 'mongoose';

const ChatbotResponseSchema = new mongoose.Schema({
  greeting: { type: String, default: '' },
  skills: { type: String, default: '' },
  experience: { type: String, default: '' },
  projects: { type: String, default: '' },
  education: { type: String, default: '' },
  contact: { type: String, default: '' },
  hire: { type: String, default: '' },
  location: { type: String, default: '' },
  fallback: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.ChatbotResponse || mongoose.model('ChatbotResponse', ChatbotResponseSchema);
