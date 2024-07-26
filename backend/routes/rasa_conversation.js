const express = require('express');
const router = express.Router();
const ChatbotInteraction = require('../models/RasaConversation');

router.post('/', async (req, res) => {
  try {
    const { userId, interactionData } = req.body;

    const interaction = new ChatbotInteraction({ userId, interactionData });
    await interaction.save();
    
    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
