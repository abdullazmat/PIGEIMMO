import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['agent', 'admin', 'superadmin'], default: 'agent' },
  avatar: { type: String },
  subscription: {
    plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'trial'], default: 'trial' },
    expiresAt: Date,
  },
  location: {
    city: String,
    department: String,
    region: String,
    coordinates: { lat: Number, lng: Number },
  },
  aiConfig: {
    canSuggestAppointments: { type: Boolean, default: false },
    autoRespond: { type: Boolean, default: false },
    tone: { type: String, enum: ['professional', 'friendly', 'casual'], default: 'professional' },
  },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referralCode: { type: String, unique: true },
  googleCalendarToken: { type: String },
  googleContactsToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
