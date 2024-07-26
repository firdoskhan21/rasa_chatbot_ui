const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  resultId: { type: String, unique: true },
  experimentId: String,
  userId: String,
  darkPattern: String,
  task: String,
  result: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
