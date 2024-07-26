const mongoose = require('mongoose');

const DemographicSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  education: { type: String, required: true },
  chatbotUsageFrequency: { type: String, required: true },
  chatbotPlatforms: { type: [String], required: true },
  internetUsageHours: { type: Number, required: true },
  technologyComfort: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Demographic', DemographicSchema);
