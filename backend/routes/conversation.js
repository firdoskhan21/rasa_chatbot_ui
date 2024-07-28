const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");

router.post("/save_conversation", async (req, res) => {
  const { userId, pattern_type, is_dark_pattern, messages } = req.body;
  console.log(req.body);

  try {
    let conversation = await Conversation.findOne({ userId });
    if (conversation) {
      // Append new messages to the existing array for the given pattern type
      if (!conversation.messages[pattern_type]) {
        conversation.messages[pattern_type] = [];
      }
      conversation.messages[pattern_type] = messages;
      conversation.is_dark_pattern = is_dark_pattern;
      conversation.pattern_type = pattern_type;
    } else {
      // Initialize messages object with the new pattern type
      const messagesObj = {
        task1_darkpattern: [],
        task1_regular: [],
        task2_darkpattern: [],
        task2_regular: [],
        task3_darkpattern: [],
        task3_regular: [],
      };
      messagesObj[pattern_type] = messages;

      conversation = new Conversation({
        userId,
        messages: messagesObj,
        is_dark_pattern,
        pattern_type,
      });
    }
    await conversation.save();
    console.log(conversation);
    res.status(200).send("Conversation saved successfully");
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).send("Error saving conversation");
  }
});

module.exports = router;
