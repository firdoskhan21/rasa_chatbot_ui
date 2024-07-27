import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserSession } from "../../../utils/session";
import {
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import TaskDescription from "./TaskStepper";
import ChatbotInteraction from "./ChatbotInteractionWidget";
import { server_endpoints } from "../../../constants";

const ChatbotUI = ({ getNextStep }) => {
  const { task } = useParams();
  const [user, setUser] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
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
      setCompletedTasks(userData.completedTasks || []);
      initializeChatbot(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const initializeChatbot = async (userData) => {
    const conversationId = userData.userId;
    const patternType = task;
  };

  const handleCompleteTask = () => {
    setCompletedTasks([...completedTasks, task]);
    // Optionally, update the server with the completed task
    // axios.post(`${server_endpoints.backend_server}/complete-task`, { userId, task });
  };

  return (
    <Container>
      <Card className="instruction-card">
            <CardContent>
              <Typography variant="h6" component="div">
                Instructions
              </Typography>
              <Typography variant="body2" component="p">
                After you are done with the conversation with the chatbot,
                submit the conversation by clicking on "Submit Conversation".
                Then mark the task as complete and proceed with the other tasks.
                Once all of them are complete, click "Next" to proceed to the
                next screen.
              </Typography>
            </CardContent>
          </Card>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TaskDescription
            task={task}
            user={user}
            handleTaskChange={handleTaskChange}
            completedTasks={completedTasks}
          />
        </Grid>
        <Grid item xs={8}>
          <div
            className="navigate-btn-task-next"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              paddingLeft: "15px",
              paddingRight: "25px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCompleteTask}
              style={{ marginLeft: "10px" }}
            >
              Mark Task as Complete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(getNextStep());
              }}
            >
              Next
            </Button>
          </div>
          
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
