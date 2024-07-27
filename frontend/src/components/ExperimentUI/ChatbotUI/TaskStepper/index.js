import React from "react";
import { Box, Typography } from "@mui/material";
import { taskDescriptions } from "../../../../constants";
import "./index.css"; // Import the CSS file for styling

const TaskDescription = ({ task, user, handleTaskChange, completedTasks }) => {
  return (
    <Box>
      <div key={"desc"} className="task-description-item ">
        <h1
          className={`typeform-title ${
            completedTasks.includes(task) ? "completed-task" : ""
          }`}
        >
          {taskDescriptions[task].title}
        </h1>
        <p className="typeform-description">
          {taskDescriptions[task].description}
        </p>
      </div>
      <Typography variant="h5" gutterTop gutterBottom>
        Remaining Tasks
      </Typography>
      {task ? (
        <>
          {user?.tasks
            .filter((pattern) => pattern !== task)
            .map((task, index) => (
              <div
                key={index}
                className={`task-description-item ${
                  completedTasks.includes(task) ? "completed-task" : ""
                }`}
                onClick={() => {
                  handleTaskChange(task);
                }}
              >
                <div
                  className={`typeform-title  ${
                    completedTasks.includes(task) ? "completed-task" : ""
                  }`}
                >
                  {taskDescriptions[task].title}
                </div>
              </div>
            ))}
        </>
      ) : null}
    </Box>
  );
};

export default TaskDescription;
