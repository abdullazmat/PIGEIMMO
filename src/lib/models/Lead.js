import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  status: {
    type: String,
    enum: [
      'a_prospecter',
      'message_auto_envoye',
      'pas_de_reponse',
      'rappel_prevu',
      'non_interesse',
      'rdv_prevu',
      'no_show',
      'offre_envoyee',
      'en_negociation',
      'mandat_signe',
      'pas_de_suite',
      'exclu',
      'vendu',
    ],
    default: 'a_prospecter',
  },
  source: { type: String, enum: ['scraping', 'live_radar'] },
  purchasedAt: { type: Date },
  purchasePrice: { type: Number },
  temperature: { type: String, enum: ['hot', 'warm', 'cold'], default: 'cold' },
  aiSuggestedStatus: { type: String },
  agentOverrode: { type: Boolean, default: false },
  notes: [{ text: String, createdAt: { type: Date, default: Date.now } }],
  callbackAt: { type: Date },
  appointmentAt: { type: Date },
  appointmentGoogleEventId: { type: String },
  lastContactedAt: { type: Date },
  contactAttempts: { type: Number, default: 0 },
  isExclusive: { type: Boolean, default: false },
  exclusiveUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

LeadSchema.index({ agent: 1, status: 1 });
LeadSchema.index({ property: 1 });
LeadSchema.index({ agent: 1, property: 1 }, { unique: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
