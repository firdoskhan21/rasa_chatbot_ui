const express = require("express");
const ExperimentFlow = require("../models/experiment_flow");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const flow = await ExperimentFlow.findOne();
    res.json(flow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { flow } = req.body;
  try {
    let experimentFlow = await ExperimentFlow.findOne();
    if (!experimentFlow) {
      experimentFlow = new ExperimentFlow({ flow });
    } else {
      experimentFlow.flow = flow;
    }
    await experimentFlow.save();
    res.status(200).json({ message: "Flow updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
