import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iconUrl: { type: String, default: '' },
  order: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
