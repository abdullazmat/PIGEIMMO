import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no_show'], default: 'scheduled' },
  googleEventId: { type: String },
  contactName: { type: String },
  contactPhone: { type: String },
  notes: { type: String },
  reminder: { type: Date },
  cancellationReason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AppointmentSchema.index({ agent: 1, startTime: 1 });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
