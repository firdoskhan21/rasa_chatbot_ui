import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { Grid, Typography, Paper, Box } from "@mui/material";
import './index.css';
import { server_endpoints } from "../../../constants";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const [demographics, setDemographics] = useState([]);
  const [userData, setUserData] = useState([]);
  const [darkPatternData, setDarkPatternData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demographicResponse = await axios.get(`${server_endpoints.backend_server}/admin/demographics`);
        setDemographics(demographicResponse.data);

        const userResponse = await axios.get(`${server_endpoints.backend_server}/users`);
        setUserData(userResponse.data);

        // Process dark pattern data
        const darkPatternCount = userResponse.data.reduce((acc, user) => {
          user.tasks.forEach((task) => {
            acc[task.toLowerCase()] = (acc[task.toLowerCase()] || 0) + 1;
          });
          return acc;
        }, {});
        setDarkPatternData(darkPatternCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for visualizations
  const ageData = demographics.map((d) => d.age);
  const genderData = demographics.reduce((acc, curr) => {
    acc[curr.gender.toLowerCase()] = (acc[curr.gender.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const occupationData = demographics.reduce((acc, curr) => {
    acc[curr.occupation.toLowerCase()] = (acc[curr.occupation.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const educationData = demographics.reduce((acc, curr) => {
    acc[curr.education.toLowerCase()] = (acc[curr.education.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const chatbotUsageData = demographics.reduce((acc, curr) => {
    acc[curr.chatbotUsageFrequency.toLowerCase()] = (acc[curr.chatbotUsageFrequency.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const chatbotPlatformsData = demographics.reduce((acc, curr) => {
    curr.chatbotPlatforms.forEach((platform) => {
      acc[platform.toLowerCase()] = (acc[platform.toLowerCase()] || 0) + 1;
    });
    return acc;
  }, {});

  const internetUsageData = demographics.map((d) => d.internetUsageHours);
  const technologyComfortData = demographics.reduce((acc, curr) => {
    acc[curr.technologyComfort.toLowerCase()] = (acc[curr.technologyComfort.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const colorPalette = [
    '#3f51b5', '#f50057', '#00bcd4', '#ffc107', '#8bc34a',
    '#ff5722', '#9c27b0', '#e91e63', '#2196f3', '#ffeb3b',
    '#4caf50', '#ff9800', '#cddc39', '#ff5252', '#03a9f4'
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Age Distribution
            </Typography>
            <Bar
              data={{
                labels: Array.from(new Set(ageData)),
                datasets: [
                  {
                    label: "Age",
                    data: Array.from(new Set(ageData)).map(
                      (age) => ageData.filter((a) => a === age).length
                    ),
                    backgroundColor: colorPalette.slice(0, new Set(ageData).size),
                    borderColor: colorPalette.slice(0, new Set(ageData).size).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Occupation Distribution
            </Typography>
            <Bar
              data={{
                labels: Object.keys(occupationData),
                datasets: [
                  {
                    label: "Occupation",
                    data: Object.values(occupationData),
                    backgroundColor: colorPalette.slice(0, Object.keys(occupationData).length),
                    borderColor: colorPalette.slice(0, Object.keys(occupationData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Internet Usage Hours
            </Typography>
            <Bar
              data={{
                labels: internetUsageData.map((_, i) => `User ${i + 1}`),
                datasets: [
                  {
                    label: "Hours",
                    data: internetUsageData,
                    backgroundColor: colorPalette,
                    borderColor: colorPalette.map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Gender Distribution
            </Typography>
            <Pie
              data={{
                labels: Object.keys(genderData),
                datasets: [
                  {
                    data: Object.values(genderData),
                    backgroundColor: colorPalette.slice(0, Object.keys(genderData).length),
                    borderColor: colorPalette.slice(0, Object.keys(genderData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Education Level Distribution
            </Typography>
            <Doughnut
              data={{
                labels: Object.keys(educationData),
                datasets: [
                  {
                    data: Object.values(educationData),
                    backgroundColor: colorPalette.slice(0, Object.keys(educationData).length),
                    borderColor: colorPalette.slice(0, Object.keys(educationData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Technology Comfort Level
            </Typography>
            <Pie
              data={{
                labels: Object.keys(technologyComfortData),
                datasets: [
                  {
                    data: Object.values(technologyComfortData),
                    backgroundColor: colorPalette.slice(0, Object.keys(technologyComfortData).length),
                    borderColor: colorPalette.slice(0, Object.keys(technologyComfortData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Chatbot Platforms
            </Typography>
            <Bar
              data={{
                labels: Object.keys(chatbotPlatformsData),
                datasets: [
                  {
                    label: "Platforms",
                    data: Object.values(chatbotPlatformsData),
                    backgroundColor: colorPalette.slice(0, Object.keys(chatbotPlatformsData).length),
                    borderColor: colorPalette.slice(0, Object.keys(chatbotPlatformsData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Chatbot Usage Frequency
            </Typography>
            <Bar
              data={{
                labels: Object.keys(chatbotUsageData),
                datasets: [
                  {
                    label: "Usage Frequency",
                    data: Object.values(chatbotUsageData),
                    backgroundColor: colorPalette.slice(0, Object.keys(chatbotUsageData).length),
                    borderColor: colorPalette.slice(0, Object.keys(chatbotUsageData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Dark Pattern Distribution
            </Typography>
            <Bar
              data={{
                labels: Object.keys(darkPatternData),
                datasets: [
                  {
                    label: "Dark Patterns",
                    data: Object.values(darkPatternData),
                    backgroundColor: colorPalette.slice(0, Object.keys(darkPatternData).length),
                    borderColor: colorPalette.slice(0, Object.keys(darkPatternData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
