const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Demographic = require('../models/Demographic');
const ChatbotInteraction = require('../models/RasaConversation');
const Feedback = require('../models/Survey');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/demographics', async (req, res) => {
  try {
    const demographics = await Demographic.find();
    res.status(200).json(demographics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/interactions', async (req, res) => {
  try {
    const interactions = await ChatbotInteraction.find();
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
