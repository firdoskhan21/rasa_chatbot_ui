const mongoose = require("mongoose");

const experimentFlowSchema = new mongoose.Schema({
  flow: {
    type: [String],
    required: true,
    default: [
      "welcome",
      "demographic-form",
      "start-experiment",
      "task-description",
      "chatbot-interaction",
      "user-experience-survey",
      "feedback-survey",
      "thankyou",
    ],
  },
});

module.exports = mongoose.model("ExperimentFlow", experimentFlowSchema);
