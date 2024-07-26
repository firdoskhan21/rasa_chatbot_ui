const express = require('express');
const router = express.Router();
const Demographic = require('../models/Demographic');

router.post('/', async (req, res) => {
  try {
    const { userId, age, gender, occupation, education, chatbotUsageFrequency, chatbotPlatforms, internetUsageHours, technologyComfort } = req.body;

    const demographic = new Demographic({ userId, age, gender, occupation, education, chatbotUsageFrequency, chatbotPlatforms, internetUsageHours, technologyComfort });
    await demographic.save();
    
    res.status(201).json(demographic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
