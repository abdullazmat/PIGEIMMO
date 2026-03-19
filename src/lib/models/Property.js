import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  externalId: { type: String, required: true },
  source: { type: String, enum: ['leboncoin', 'seloger', 'pap', 'paruvendu', 'bienici'], required: true },
  sourceUrl: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['maison', 'appartement', 'terrain', 'local', 'autre'] },
  price: { type: Number },
  priceHistory: [{
    price: Number,
    date: Date,
    change: Number,
  }],
  surface: { type: Number },
  rooms: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  floor: { type: Number },
  totalFloors: { type: Number },
  yearBuilt: { type: Number },
  condition: { type: String },
  exposure: { type: String },
  saleType: { type: String },
  features: [String],
  energyClass: { type: String },
  gesClass: { type: String },
  annualEnergyCost: { min: Number, max: Number },
  heating: { type: String },
  heatingMode: { type: String },
  propertyTax: { type: Number },
  location: {
    address: String,
    city: { type: String, required: true },
    postalCode: String,
    department: String,
    region: String,
    coordinates: { lat: Number, lng: Number },
  },
  images: [String],
  owner: {
    name: String,
    phone: String,
    email: String,
    type: { type: String, enum: ['particulier', 'professionnel'] },
  },
  pricePerSqm: { type: Number },
  sectorAvgPricePerSqm: { type: Number },
  similarSales: [{
    address: String,
    price: Number,
    pricePerSqm: Number,
    date: Date,
  }],
  isLiveRadar: { type: Boolean, default: false },
  liveRadarExpiresAt: { type: Date },
  assignedAgents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scrapedAt: { type: Date, default: Date.now },
  firstSeenAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PropertySchema.index({ source: 1, externalId: 1 }, { unique: true });
PropertySchema.index({ 'location.city': 1 });
PropertySchema.index({ isLiveRadar: 1 });
PropertySchema.index({ scrapedAt: -1 });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
