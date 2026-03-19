import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  contactName: { type: String, required: true },
  contactPhone: { type: String },
  contactEmail: { type: String },
  channel: { type: String, enum: ['sms', 'whatsapp', 'platform', 'email', 'phone'], required: true },
  status: { type: String, enum: ['active', 'archived', 'ai_managed'], default: 'active' },
  aiManaged: { type: Boolean, default: false },
  messages: [{
    sender: { type: String, enum: ['agent', 'contact', 'ai', 'system'] },
    content: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    aiGenerated: { type: Boolean, default: false },
    aiApproved: { type: Boolean },
  }],
  unreadCount: { type: Number, default: 0 },
  lastMessageAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ConversationSchema.index({ agent: 1, status: 1 });
ConversationSchema.index({ lastMessageAt: -1 });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
