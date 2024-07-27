import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import theme from "./theme"; // Import the custom theme
import LoginPage from "./components/AdminPanel/LoginPage";
import Dashboard from "./components/AdminPanel/Dashboard";
import ManageExperiments from "./components/AdminPanel/ManageExperiments";
import ViewResults from "./components/AdminPanel/ViewResults";
import WelcomePage from "./components/ExperimentUI/WelcomePage";
import DemographicDataForm from "./components/ExperimentUI/DemographicDataForm";
import ChatbotInteraction from "./components/ExperimentUI/ChatbotUI";
import SurveyForm from "./components/ExperimentUI/SurveyForm";
import ThankYouPage from "./components/ExperimentUI/ThankYouPage";
import UEQ from "./components/ExperimentUI/UEQForm";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskDescription from "./components/ExperimentUI/TaskDescription";
import StartExperiment from "./components/ExperimentUI/StartExperiment";
import { server_endpoints } from "./constants";

const componentMap = {
  welcome: WelcomePage,
  "start-experiment": StartExperiment,
  "demographic-form": DemographicDataForm,
  "task-description": TaskDescription,
  "chatbot-interaction": ChatbotInteraction,
  "user-experience-survey": UEQ, // Add UEQ to component map
  "feedback-survey": SurveyForm,
  thankyou: ThankYouPage,
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [flow, setFlow] = useState([]);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);

    // Fetch the current flow from the backend
    axios
      .get(`${server_endpoints.backend_server}/experiment_flow`)
      .then((response) =>
        !response?.data?.flow
          ? setFlow(Object.keys(componentMap))
          : setFlow(response.data.flow)
      )
      .catch((error) => console.error("Error fetching flow:", error));
  }, []);

  const handleLogin = (status, admin) => {
    setIsAuthenticated(status);
    setIsAdmin(admin);
    localStorage.setItem("isAuthenticated", status);
    localStorage.setItem("isAdmin", admin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
  };

  const getNextStep = (currentStep) => {
    const currentIndex = flow.indexOf(currentStep);
    if (currentIndex !== -1 && currentIndex < flow.length - 1) {
      return `/user/step-${flow[currentIndex + 1]}`;
    }
    return "/user/step-thankyou";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {console.log("flow", flow)}
      <Router>
        <div style={{ display: "flex" }}>
          {isAuthenticated && isAdmin && <Sidebar />}
          <main
            style={{
              flexGrow: 1,
              padding: "1rem",
              marginTop: isAuthenticated && isAdmin ? "64px" : null,
            }}
          >
            <div className="sticky-header">
              Please do not refresh your browser window while in the middle of
              the experiment survey.
            </div>
            {isAuthenticated && isAdmin ? (
              <Navbar onLogout={handleLogout} />
            ) : null}
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
              {isAdmin && (
                <>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/manage" element={<ManageExperiments />} />
                  <Route path="/admin/results" element={<ViewResults />} />
                  <Route
                    path="/"
                    element={<Navigate to="/admin/dashboard" />}
                  />
                </>
              )}
              <Route
                path="/user/step-welcome"
                element={
                  <WelcomePage getNextStep={() => getNextStep("welcome")} />
                }
              />
              {flow.map((step, index) => {
                const Component = componentMap[step];
                return (
                  <>
                    {step === "chatbot-interaction" ? (
                      <>
                        <Route
                          key={index}
                          path={`/user/step-chatbot-interaction/:task`} // +2 because step-1 is WelcomePage and step-thankyou is ThankYouPage
                          element={
                            <Component getNextStep={() => getNextStep(step)} />
                          }
                        />
                      </>
                    ) : (
                      <Route
                        key={index}
                        path={`/user/step-${step}`} // +2 because step-1 is WelcomePage and step-thankyou is ThankYouPage
                        element={
                          <Component getNextStep={() => getNextStep(step)} />
                        }
                      />
                    )}
                  </>
                );
              })}
              <Route path="/user/step-thankyou" element={<ThankYouPage />} />
              <Route path="*" element={<Navigate to="/user/step-welcome" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
