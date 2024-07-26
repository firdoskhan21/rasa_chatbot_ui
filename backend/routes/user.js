const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateUserId = require("../utils/generateUserId");

const tasks = [
  "task1_darkpattern",
  "task1_regular",
  "task2_darkpattern",
  "task2_regular",
  "task3_darkpattern",
  "task3_regular",
];

// Function to assign tasks randomly to users
const assignTasks = () => {
  let taskAssignments = [];

  for (let i = 0; i < tasks.length; i++) {
    taskAssignments.push(tasks[i]);
  }

  // Shuffle the assignments
  taskAssignments = taskAssignments.sort(() => Math.random() - 0.5);

  return taskAssignments;
};

// Pre-compute the task assignments
let precomputedAssignments = assignTasks();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const userId = generateUserId();
    const assignedTasks = precomputedAssignments.splice(0, 3);

    // If the precomputed assignments are running low, generate more assignments
    if (precomputedAssignments.length < 3) {
      precomputedAssignments = assignTasks();
    }

    const user = new User({ userId, tasks: assignedTasks });
    await user.save();

    res.status(201).json({ userId, tasks: assignedTasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
