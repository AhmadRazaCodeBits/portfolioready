import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  companyLogo: { type: String, default: '' },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, default: '' },
  description: [{ type: String }],
  order: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
