const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [
    {
      sender: { type: String, required: true },
      msg: { type: String, required: true },
      timestamp: { type: Date, required: true }
    }
  ],
  is_dark_pattern: { type: Boolean, required: false },
  pattern_type: { type: String, required: false },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
