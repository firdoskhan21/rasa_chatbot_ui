const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");

// Endpoint to save conversation
router.post("/save_conversation", async (req, res) => {
  const { userId, pattern_type, is_dark_pattern, messages } = req.body;
  console.log(req.body);
  try {
    let conversation = await Conversation.findOne({ userId });
    if (conversation) {
      conversation.messages = messages;
      conversation.is_dark_pattern = is_dark_pattern;
      conversation.pattern_type = pattern_type;
    } else {
      conversation = new Conversation({
        userId,
        messages,
        is_dark_pattern,
        pattern_type,
      });
    }
    await conversation.save();
    console.log(conversation);
    res.status(200).send("Conversation saved successfully");
  } catch (error) {
    res.status(500).send("Error saving conversation");
  }
});

module.exports = router;
