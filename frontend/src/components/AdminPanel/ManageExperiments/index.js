import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import {
  Home,
  Person,
  Description,
  Chat,
  RateReview,
  Feedback,
  ThumbUp,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { server_endpoints } from "../../../constants";

const componentIcons = {
  "Welcome Page": <Home />,
  "Demographic Form": <Person />,
  "Task Description": <Description />,
  "Start Experiment": <Description />,
  "Chatbot Interaction": <Chat />,
  "User Experience Survey": <RateReview />,
  "Feedback Survey": <Feedback />,
  "Thank You Page": <ThumbUp />,
};

const defaultFlow = [
  { id: "welcome", title: "Welcome Page" },
  { id: "start-experiment", title: "Start Experiment" },
  { id: "demographic-form", title: "Demographic Form" },
  { id: "task-description", title: "Task Description" },
  { id: "chatbot-interaction", title: "Chatbot Interaction" },
  { id: "user-experience-survey", title: "User Experience Survey" },
  { id: "feedback-survey", title: "Feedback Survey" },
  { id: "thankyou", title: "Thank You Page" },
];

const ManageExperiments = () => {
  const [flow, setFlow] = useState(defaultFlow.slice(1, -1)); // Removing the first and last steps from flow
  const [uiFlow, setUiFlow] = useState([]);

  useEffect(() => {
    axios
      .get(`${server_endpoints.backend_server}/experiment_flow`)
      .then((response) => {
        const fetchedFlow = response.data.flow
          .map((stepId) => defaultFlow.find((step) => step.id === stepId))
          .filter(Boolean);

        const finalFlow = fetchedFlow.length ? fetchedFlow : defaultFlow;
        setFlow(finalFlow.slice(1, -1)); // Exclude welcome and thank you from fetched flow
        setUiFlow(groupFlow(finalFlow.slice(1, -1))); // Set the grouped UI flow
      })
      .catch((error) => {
        console.error("Error fetching flow:", error);
        setFlow(defaultFlow.slice(1, -1));
        setUiFlow(groupFlow(defaultFlow.slice(1, -1)));
      });
  }, []);

  const groupFlow = (flow) => {
    let groupedFlow = [];
    for (let i = 0; i < flow.length; i++) {
      if (
        flow[i].id === "task-description" &&
        flow[i + 1]?.id === "chatbot-interaction"
      ) {
        groupedFlow.push({
          id: "task-chat-group",
          title: "Task Description & Chatbot Interaction",
          steps: [flow[i], flow[i + 1]],
        });
        i++; // Skip the next step since it's grouped
      } else {
        groupedFlow.push(flow[i]);
      }
    }
    return groupedFlow;
  };

  const moveStep = (index, direction) => {
    const updatedFlow = Array.from(uiFlow);
    const [movedItem] = updatedFlow.splice(index, 1);
    updatedFlow.splice(index + direction, 0, movedItem);

    setUiFlow(updatedFlow);
    setFlow(ungroupFlow(updatedFlow));
  };

  const ungroupFlow = (uiFlow) => {
    return uiFlow.flatMap((item) =>
      item.id === "task-chat-group" ? item.steps : item
    );
  };

  const saveFlow = () => {
    const flowToSend = ["welcome", ...flow.map((step) => step.id), "thankyou"];
    axios
      .post(`${server_endpoints.backend_server}/experiment_flow`, { flow: flowToSend })
      .then(() => console.log("Flow updated"))
      .catch((error) => console.error("Error updating flow:", error));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Experiment Flow
      </Typography>
      <Box mb={2} style={{ textAlign: "end" }}>
        <Button variant="contained" color="primary" onClick={saveFlow}>
          Save Flow
        </Button>
      </Box>
      <Box component="ul" style={{ padding: 0, listStyle: "none" }}>
        <Card
          style={{
            marginBottom: "8px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            opacity: 0.5,
            cursor: "not-allowed",
            border: "2px solid #d2d2d2",
          }}
        >
          <CardHeader
            avatar={componentIcons["Welcome Page"]}
            title="Welcome Page"
          />
          <CardContent></CardContent>
        </Card>
        {uiFlow.map((step, index) => {
          if (step.id === "task-chat-group") {
            return (
              <Box
                key="task-chat-group"
                style={{
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "16px",
                  backgroundColor: "#eaeaea",
                  border: "2px solid #d2d2d2",
                }}
              >
                <Card style={{ alignItems: "center", backgroundColor: "#eaeaea" }}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography style={{ float: "left", padding: "16px" }}>
                      Task Description & Chatbot Interaction can be moved together
                    </Typography>
                    <div>
                      <IconButton onClick={() => moveStep(index, -1)} disabled={index === 0}>
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        onClick={() => moveStep(index, 1)}
                        disabled={index === uiFlow.length - 1}
                      >
                        <ArrowDownward />
                      </IconButton>
                    </div>
                  </div>
                  <CardContent>
                    <Card
                      style={{
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#eaeaea",
                      }}
                    >
                      <CardHeader
                        avatar={componentIcons["Task Description"]}
                        title="Task Description"
                      />
                      <CardContent></CardContent>
                    </Card>
                    <Card
                      style={{
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#eaeaea",
                      }}
                    >
                      <CardHeader
                        avatar={componentIcons["Chatbot Interaction"]}
                        title="Chatbot Interaction"
                      />
                      <CardContent></CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </Box>
            );
          } else {
            return (
              <Card
                key={step.id}
                style={{
                  marginBottom: "8px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  border: "2px solid #d2d2d2",
                }}
              >
                <CardHeader avatar={componentIcons[step.title]} title={step.title} />
                <CardContent></CardContent>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={() => moveStep(index, -1)} disabled={index === 0}>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton
                    onClick={() => moveStep(index, 1)}
                    disabled={index === uiFlow.length - 1}
                  >
                    <ArrowDownward />
                  </IconButton>
                </div>
              </Card>
            );
          }
        })}
        <Card
          style={{
            marginBottom: "8px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            opacity: 0.5,
            cursor: "not-allowed",
            border: "2px solid #d2d2d2",
          }}
        >
          <CardHeader avatar={componentIcons["Thank You Page"]} title="Thank You Page" />
          <CardContent></CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ManageExperiments;
