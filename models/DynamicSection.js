import mongoose from 'mongoose';

const DynamicSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    blocks: [
      {
        blockType: {
          type: String,
          enum: ['TEXT', 'IMAGE', 'SOCIAL_LINKS'],
          required: true,
        },
        content: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.DynamicSection ||
  mongoose.model('DynamicSection', DynamicSectionSchema);
