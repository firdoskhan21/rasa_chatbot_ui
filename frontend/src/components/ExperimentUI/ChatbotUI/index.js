import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserSession } from "../../../utils/session";
import { Container, Grid } from "@mui/material";
import TaskDescription from "./TaskStepper";
import ChatbotInteraction from "./ChatbotInteractionWidget";
import { server_endpoints } from "../../../constants";
const ChatbotUI = ({ getNextStep }) => {
  const { task } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userId = getUserSession();

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const handleTaskChange = (newTask) => {
    navigate(`/user/step-chatbot-interaction/${newTask}`);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `${server_endpoints.backend_server}/users/${userId}`
      );
      const userData = response.data;
      setUser(userData);
      initializeChatbot(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const initializeChatbot = async (userData) => {
    const conversationId = userData.userId;
    const patternType = task;
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TaskDescription
            task={task}
            user={user}
            handleTaskChange={handleTaskChange}
          />
        </Grid>
        <Grid item xs={8}>
          <button
            onClick={() => {
              navigate(getNextStep());
            }}
          >
            {"Next>>"}
          </button>

          <ChatbotInteraction
            task={task}
            userId={userId}
            getNextStep={getNextStep}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatbotUI;
