import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../../../utils/session";
import { CircularProgress, Box, Typography } from "@mui/material";
import { server_endpoints } from "../../../constants";

const StartExperiment = ({ getNextStep }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const assignTasks = async () => {
      try {
        const response = await axios.post(`${server_endpoints.backend_server}/users/create`);
        const { userId, tasks } = response.data;
        setUserSession(userId);
        console.log("Assigned Tasks:", tasks);

        setTimeout(() => {
          navigate(getNextStep());
        }, 3000);
      } catch (error) {
        setError("Error assigning tasks: " + error.message);
      } 
    };

    assignTasks();
  }, [navigate, getNextStep]);

  if (loading) {
    return (
      <Box
        display="grid"
        justifyContent="center"
        alignItems="center"
        alignContent={"center"}
        justifyItems={"center"}
        height="100vh"
      >
        <CircularProgress size={50} color="primary" />
        <Typography>Please wait while we prepare your tasks...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return null;
};

export default StartExperiment;
