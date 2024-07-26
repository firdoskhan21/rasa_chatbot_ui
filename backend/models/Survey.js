const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  interactionEase: { type: Number, required: true },
  encounteredIssues: { type: Boolean, required: true },
  overallExperience: { type: Number, required: true },
  requestUnderstanding: { type: Number, required: true },
  noticedPersuasiveBehavior: { type: Boolean, required: true },
  nudgesFeedback: { type: String, required: true },
  likedMost: { type: String, required: true },
  dislikedMost: { type: String, required: true },
  improvementSuggestions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', SurveySchema);
