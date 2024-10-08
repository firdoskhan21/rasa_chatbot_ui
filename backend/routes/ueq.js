// routes/ueq.js

const express = require('express');
const router = express.Router();
const UEQ = require('../models/UEQResponse'); // Mongoose model

router.post('/', async (req, res) => {
  try {
    const { userId, responses } = req.body;
    const ueqResponse = new UEQ({userId,responses});
    await ueqResponse.save();
    res.status(201).send({ message: 'UEQ response saved successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error saving UEQ response', error });
  }
});

module.exports = router;
