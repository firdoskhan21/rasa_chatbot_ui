const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  sender_id: String,
  msg: String,
  timestamp: Date,
});

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  messages: {
    task1_darkpattern: [messageSchema],
    task1_regular: [messageSchema],
    task2_darkpattern: [messageSchema],
    task2_regular: [messageSchema],
    task3_darkpattern: [messageSchema],
    task3_regular: [messageSchema],
  },
  is_dark_pattern: Boolean,
  pattern_type: String,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
