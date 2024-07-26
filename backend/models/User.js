const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tasks: { type: [String], required: true }, // Array of assigned dark patterns
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
