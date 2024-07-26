import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskDescriptions } from "../../../constants";
import axios from "axios";
import "./index.css";
import { server_endpoints } from "../../../constants";

const TaskDescription = ({getNextStep}) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `${server_endpoints.backend_server}/users/${userId}`
          );
          setTasks(response.data.tasks);
        } catch (error) {
          console.error("Error fetching user tasks:", error);
          navigate("/user/step-welcome");
        }
      } else {
        navigate("/user/step-welcome");
      }
    };

    fetchUserTasks();
  }, [navigate]);

  const handleStart = (data) => {
    console.log("data", data);
    navigate(`/user/step-chatbot-interaction/${data}`);
  };

  return (
    <>
      <div className="task-description-container">
        {tasks.length > 0 ? (
          <>
            {tasks.map((task, index) => (
              <div key={index} className="task-description-item">
                <h1 className="typeform-title">
                  {taskDescriptions[task].title}
                </h1>
                <p className="typeform-description">
                  {taskDescriptions[task].description}
                </p>
                <button onClick={()=>{handleStart(task)}} className="task-submit-button">
                  Start Task
                </button>
              </div>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default TaskDescription;
