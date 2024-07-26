const express = require('express');
const router = express.Router();
const Feedback = require('../models/Survey');

router.post('/', async (req, res) => {
  try {
    const { userId, interactionEase, encounteredIssues, overallExperience, requestUnderstanding, noticedPersuasiveBehavior, nudgesFeedback, likedMost, dislikedMost, improvementSuggestions } = req.body;

    const feedback = new Feedback({ userId, interactionEase, encounteredIssues, overallExperience, requestUnderstanding, noticedPersuasiveBehavior, nudgesFeedback, likedMost, dislikedMost, improvementSuggestions });
    await feedback.save();
    
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
