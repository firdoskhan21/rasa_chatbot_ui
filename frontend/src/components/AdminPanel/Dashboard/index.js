import React, { useEffect, useState, useRef } from "react";
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
import { Grid, Typography, Paper, Box, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import './index.css';
import { server_endpoints } from "../../../constants";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

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
  const dashboardRef = useRef(); // Ref for the entire dashboard

  const [demographics, setDemographics] = useState([]);
  const [userData, setUserData] = useState([]);
  const [darkPatternData, setDarkPatternData] = useState({});
  const [chatbotPlatformsData, setChatbotPlatformsData] = useState({});
  const [chatbotUsageData, setChatbotUsageData] = useState({});
  const [darkPatternLabels, setDarkPatternLabels] = useState([]);
  const [regularLabels, setRegularLables] = useState([]);
  const [allLabels, setAllLabels] = useState([]);
  const colorPalette = [
    '#3f51b5', '#f50057', '#00bcd4', '#ffc107', '#8bc34a',
    '#ff5722', '#9c27b0', '#e91e63', '#2196f3', '#ffeb3b',
    '#4caf50', '#ff9800', '#cddc39', '#ff5252', '#03a9f4'
  ];

  // Dark Pattern and Regular Task Mapping
  const darkPatternMapping = {
    'task1_darkpattern': { label: 'Hard to Cancel -> Obstruction', type: 'darkPattern' },
    'task2_regular': { label: 'Confirmshaming -> Social Engineering', type: 'regular' },
    'task2_darkpattern': { label: 'Confirmshaming -> Social Engineering', type: 'darkPattern' },
    'task3_regular': { label: 'Nagging -> Forced Action', type: 'regular' },
    'task3_darkpattern': { label: 'Nagging -> Forced Action', type: 'darkPattern' },
    'task1_regular': { label: 'Hard to Cancel -> Obstruction', type: 'regular' },
  };
  const fetchData = async () => {
    console.log('logg to check if function is running')
    try {
      const demographicResponse = await axios.get(`${server_endpoints.backend_server}/admin/demographics`);
      setDemographics(demographicResponse.data);

      const userResponse = await axios.get(`${server_endpoints.backend_server}/users`);
      setUserData(userResponse.data);

      // Process dark pattern data
      const darkPatternCount = userResponse.data.reduce((acc, user) => {
        user.tasks.forEach((task) => {
          const taskInfo = darkPatternMapping[task.toLowerCase()];
          if (taskInfo) {
            acc[taskInfo.type][taskInfo.label] = (acc[taskInfo.type][taskInfo.label] || 0) + 1;
          }
        });
        return acc;
      }, { darkPattern: {}, regular: {} });
      setDarkPatternData(darkPatternCount);
      const dpLabels = darkPatternCount?.darkPattern
      const regularLabels = darkPatternCount?.regular
      setDarkPatternLabels(Object.keys(dpLabels));
      setRegularLables(Object.keys(regularLabels));
      setAllLabels(Array.from(new Set([...Object.keys(dpLabels), ...Object.keys(regularLabels)])));
      // Process chatbot platforms data
      const platformsData = demographicResponse.data.reduce((acc, curr) => {
        curr.chatbotPlatforms.forEach((platform) => {
          const groupedPlatform = platform.toLowerCase().includes('shop') ? 'shopping' :
            platform.toLowerCase().includes('book') ? 'booking websites' :
              platform.toLowerCase().includes('flight') ? 'booking websites' : platform.toLowerCase();

          acc[groupedPlatform] = (acc[groupedPlatform] || 0) + 1;
        });
        return acc;
      }, {});
      setChatbotPlatformsData(platformsData);

      // Process chatbot usage frequency data
      const usageData = demographicResponse.data.reduce((acc, curr) => {
        acc[curr.chatbotUsageFrequency.toLowerCase()] = (acc[curr.chatbotUsageFrequency.toLowerCase()] || 0) + 1;
        return acc;
      }, {});
      setChatbotUsageData(usageData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(async () => {
    await fetchData();
  }, []);


  // Function to download a specific chart
  const downloadChart = (chartId, fileName) => {
    const chart = document.getElementById(chartId);
    html2canvas(chart).then(canvas => {
      canvas.toBlob((blob) => {
        saveAs(blob, `${fileName}.png`);
      });
    });
  };

  // Function to download the entire dashboard
  const downloadDashboard = async () => {
    const canvas = await html2canvas(dashboardRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, "dashboard.png");
    });
  };

  // Prepare data for visualizations
  const genderAgeData = demographics.reduce((acc, curr) => {
    const ageGroup = `${Math.floor(curr.age / 10) * 10}-${Math.floor(curr.age / 10) * 10 + 9}`;
    if (!acc[ageGroup]) {
      acc[ageGroup] = { male: 0, female: 0 };
    }
    acc[ageGroup][curr.gender.toLowerCase()] += 1;
    return acc;
  }, {});

  const ageGroups = Object.keys(genderAgeData).sort((a, b) => parseInt(a) - parseInt(b));
  const maleData = ageGroups.map(ageGroup => genderAgeData[ageGroup].male);
  const femaleData = ageGroups.map(ageGroup => genderAgeData[ageGroup].female);

  const occupationEducationData = demographics.reduce((acc, curr) => {
    const occupation = curr.occupation.toLowerCase();
    const education = curr.education.toLowerCase();

    if (!acc[occupation]) {
      acc[occupation] = {};
    }
    acc[occupation][education] = (acc[occupation][education] || 0) + 1;
    return acc;
  }, {});

  const occupations = Object.keys(occupationEducationData);
  const educationLevels = Array.from(new Set(demographics.map(d => d.education.toLowerCase())));

  const datasets = educationLevels.map((level, idx) => {
    return {
      label: level.charAt(0).toUpperCase() + level.slice(1),
      data: occupations.map(occupation => occupationEducationData[occupation][level] || 0),
      backgroundColor: colorPalette[idx],
    };
  });

  const internetUsageData = demographics.map((d) => d.internetUsageHours);
  const technologyComfortData = demographics.reduce((acc, curr) => {
    acc[curr.technologyComfort.toLowerCase()] = (acc[curr.technologyComfort.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  // Ensure color palette size matches the number of data points for dark patterns
  // const adjustedColorPalette = colorPalette.slice(0, Object.keys(darkPatternData).length);


  return (
    <Box p={3} ref={dashboardRef}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
        <MuiToolTip title="Download Dashboard">
          <IconButton color="primary" style={{ float: "right" }} onClick={downloadDashboard}>
            <DownloadIcon />
          </IconButton>
        </MuiToolTip>
      </Typography>

      <Grid container spacing={2}>
        {/* Age and Gender Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Age and Gender Distribution
              <MuiToolTip title="Download Age Gender Distribution">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("age_gender_destribution", "Age-Gender-Distribution")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>


            <Bar
              id="age_gender_destribution"
              data={{
                labels: ageGroups,
                datasets: [
                  {
                    label: "Males",
                    data: maleData.map(value => -value), // Negative values for mirroring
                    backgroundColor: colorPalette[2],
                    borderColor: colorPalette[2] + 'CC',
                    borderWidth: 2,
                  },
                  {
                    label: "Females",
                    data: femaleData,
                    backgroundColor: colorPalette[1],
                    borderColor: colorPalette[1] + 'CC',
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                indexAxis: 'y', // Horizontal bar chart
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return Math.abs(value); // Show positive values on axis
                      }
                    },
                    title: {
                      display: true,
                      text: 'Number of Participants',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Age Group',
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${Math.abs(context.raw)}`;
                      }
                    }
                  }
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Education and Occupation Distribution */}
        <Grid item xs={12} md={10}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Education Distribution by Occupation
              <MuiToolTip title="Download Education Distribution">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("education_dist", "Education-Distribution")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Bar
              id="education_dist"
              data={{
                labels: occupations,
                datasets: datasets,
              }}
              options={{
                scales: {
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Occupation',
                    },
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Number of Users',
                    },
                    beginAtZero: true,
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                      }
                    }
                  }
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Internet Usage */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Internet Usage (Hours per Day)
              <MuiToolTip title="Download Internet Usage">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("internet_usage", "Internet Usage")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Line
              id="internet_usage"
              data={{
                labels: internetUsageData.map((_, i) => `User ${i + 1}`),
                datasets: [
                  {
                    data: internetUsageData,
                    backgroundColor: colorPalette[0],
                    borderColor: colorPalette[0] + 'CC',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      filter: function (legendItem, data) {
                        // Return false to remove the legend item if the label is undefined or empty
                        return legendItem.text !== undefined && legendItem.text !== '';
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `User ${context.label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'User',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Hours per Day',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Dark Pattern Task Distribution */}
        <Grid item xs={12} md={6} style={{}}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Dark Pattern Task Distribution
              <MuiToolTip title="Download Dark Pattern Tasks Distribution">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("dark_pattern_tasks", "Dark-Pattern-Tasks")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Bar
              id="dark_pattern_tasks"
              data={{
                labels: allLabels,
                datasets: [
                  {
                    label: 'Dark Pattern',
                    data: allLabels.map(label => darkPatternData.darkPattern[label] || 0),
                    backgroundColor: colorPalette[2],
                    borderColor: colorPalette[2] + 'CC',
                    borderWidth: 2,
                  },
                  {
                    label: 'Regular',
                    data: allLabels.map(label => darkPatternData.regular[label] || 0),
                    backgroundColor: colorPalette[1],
                    borderColor: colorPalette[1] + 'CC',
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Task Type',
                    },
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Number of Users',
                    },
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                      }
                    }
                  }
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Chatbot Platforms */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Chatbot Platforms
              <MuiToolTip title="Download Chatbot Platforms">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("chatbot_platforms", "Chatbot-Platforms")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Bar
              id="chatbot_platforms"
              data={{
                labels: Object.keys(chatbotPlatformsData).map(label =>
                  label.length > 15 ? `${label.substring(0, 35)}...` : label // Truncate labels longer than 15 characters
                ),
                datasets: [
                  {
                    label: "Number of Users",
                    data: Object.values(chatbotPlatformsData),
                    backgroundColor: colorPalette.slice(0, Object.keys(chatbotPlatformsData).length),
                    borderColor: colorPalette.slice(0, Object.keys(chatbotPlatformsData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: 'y', // Horizontal bar chart
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                      }
                    }
                  },
                  legend: {
                    display: false, // Hide the legend since labels are now inside bars
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Number of Users',
                    },
                    beginAtZero: true,
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Platforms',
                    },
                  },
                },
              }}
            />
          </Paper>
        </Grid>
        {/* Technology Comfort Level */}
        <Grid item xs={12} md={6} style={{ height: "110px", width: "110px" }}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Technology Comfort Level
              <MuiToolTip title="Download Technology Comfort Level">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("technology-comfort", "Techonlogy-Comfort")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Doughnut
              id="technology-comfort"
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
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw}`;
                      }
                    }
                  }
                },
              }}
            />
          </Paper>
        </Grid>
        {/* Chatbot Usage Frequency */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px", border: "1px solid lightgray" }}>
            <Typography variant="h6" gutterBottom>
              Chatbot Usage Frequency
              <MuiToolTip title="Download Chatbot Usage Frequency">
                <IconButton
                  color="secondary"
                  style={{ float: "right" }}
                  onClick={() => downloadChart("chatbot_usage", "Chatbot-Usage")}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiToolTip>
            </Typography>

            <Bar
              id="chatbot_usage"
              data={{
                labels: Object.keys(chatbotUsageData),
                datasets: [
                  {
                    data: Object.values(chatbotUsageData),
                    backgroundColor: colorPalette.slice(0, Object.keys(chatbotUsageData).length),
                    borderColor: colorPalette.slice(0, Object.keys(chatbotUsageData).length).map(color => color + 'CC'),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      filter: function (legendItem, data) {
                        // Return false to remove the legend item if the label is undefined or empty
                        return legendItem.text !== undefined && legendItem.text !== '';
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Usage Frequency',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Users',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Paper>
        </Grid>


      </Grid>
    </Box>
  );
};

export default Dashboard;
