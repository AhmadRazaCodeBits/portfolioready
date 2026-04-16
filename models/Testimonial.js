import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  text: { type: String, required: true },
  order: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
