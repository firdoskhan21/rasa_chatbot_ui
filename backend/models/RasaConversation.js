const mongoose = require('mongoose');

const RasaConversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  interactionData: { type: String, required: true }, // You can customize this field based on the actual data structure
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('RasaConversation', RasaConversationSchema);
