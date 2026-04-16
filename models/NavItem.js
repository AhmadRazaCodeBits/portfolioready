import mongoose from 'mongoose';

const NavItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 1 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.NavItem || mongoose.model('NavItem', NavItemSchema);
