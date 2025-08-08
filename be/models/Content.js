import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about', 'services', 'contact', 'downloads', 'policies']
  },
  section: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['hero', 'text', 'list', 'card', 'testimonial', 'service', 'feature']
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  content: {
    text: String,
    paragraphs: [String],
    items: [String],
    features: [{
      title: String,
      description: String,
      icon: String
    }]
  },
  media: {
    images: [String],
    videos: [String]
  },
  metadata: {
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    showOnMobile: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

contentSchema.index({ page: 1, section: 1, 'metadata.order': 1 });

export default mongoose.model('Content', contentSchema);