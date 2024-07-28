// models/ueq.js

const mongoose = require("mongoose");

const ueqSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  responses: {
    type: Map,
    of: Number,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UEQ = mongoose.model("UEQ", ueqSchema);

module.exports = UEQ;
