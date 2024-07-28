const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateUserId = require("../utils/generateUserId");

function assignTasks() {
  // Define the task pool
  const tasks = [
    "task1_darkpattern",
    "task1_regular",
    "task2_darkpattern",
    "task2_regular",
    "task3_darkpattern",
    "task3_regular",
  ];

  // Shuffle the task pool
  tasks.sort(() => 0.5 - Math.random());

  // Assign tasks ensuring no repetition of the same task number
  const assignedTasks = [];
  const assignedTaskNumbers = new Set();
  let darkPatternCount = 0;
  let regularPatternCount = 0;

  for (let task of tasks) {
    const taskNumber = task.split("_")[0];
    const taskType = task.split("_")[1];

    if (
      assignedTasks.length < 3 &&
      !assignedTaskNumbers.has(taskNumber) &&
      ((taskType === "darkpattern" && darkPatternCount < 2) ||
        (taskType === "regular" && regularPatternCount < 2))
    ) {
      assignedTasks.push(task);
      assignedTaskNumbers.add(taskNumber);
      if (taskType === "darkpattern") darkPatternCount++;
      if (taskType === "regular") regularPatternCount++;
    }

    if (assignedTasks.length === 3) break;
  }

  return assignedTasks;
}

console.log(assignTasks());

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
