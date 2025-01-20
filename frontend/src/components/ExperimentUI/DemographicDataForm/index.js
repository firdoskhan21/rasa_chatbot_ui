import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserSession } from "../../../utils/session";
import StartExperiment from "../StartExperiment";
import "./index.css"; // Import CSS file for styling
import { server_endpoints } from "../../../constants";

const DemographicDataForm = ( { getNextStep }) => {
  const navigate = useNavigate();
  const userId = getUserSession();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    occupation: "",
    education: "",
    chatbotUsageFrequency: "",
    chatbotPlatforms: "",
    internetUsageHours: "",
    technologyComfort: "",
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    { label: "How old are you?", name: "age", type: "number" },
    {
      label: "What is your gender?",
      name: "gender",
      type: "select",
      options: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "non-binary", text: "Non-binary/Third gender" },
        { value: "prefer-not-to-say", text: "Prefer not to say" },
      ],
    },
    { label: "What is your occupation?", name: "occupation", type: "text" },
    { label: "What is your education level?", name: "education", type: "text" },
    {
      label: "How often do you use chatbots?",
      name: "chatbotUsageFrequency",
      type: "select",
      options: [
        { value: "Never", text: "Never" },
        { value: "Rarely", text: "Rarely" },
        { value: "Sometimes", text: "Sometimes" },
        { value: "Often", text: "Often" },
        { value: "Always", text: "Always" },
      ],
    },
    {
      label: "On which platforms do you usually encounter chatbots?",
      name: "chatbotPlatforms",
      type: "text",
    },
    {
      label: "How many hours per day do you spend on the internet?",
      name: "internetUsageHours",
      type: "number",
    },
    {
      label: "How comfortable are you with using Chatbots?",
      name: "technologyComfort",
      type: "select",
      options: [
        { value: "Not comfortable", text: "Not comfortable" },
        { value: "Somewhat comfortable", text: "Somewhat comfortable" },
        { value: "Very comfortable", text: "Very comfortable" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server_endpoints.backend_server}/demographics`, {
        ...formData,
        userId,
      });
      navigate(getNextStep());
    } catch (error) {
      console.error("Error submitting demographic data:", error);
    }
  };

  return (
    <>
      <div className="typeform-container">
        <div className="typeform">
          <h1 className="typeform-title">Demographic Survey</h1>
          <form onSubmit={handleSubmit} className="typeform-form">
            <div className="question-container">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`question ${
                    index === currentQuestion ? "active" : ""
                  }`}
                >
                  <label>
                    <span className="question-number">{index + 1} ➔</span>{" "}
                    {question.label}
                    {question.type === "select" ? (
                      <select
                        name={question.name}
                        value={formData[question.name]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {question.options.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={question.type}
                        name={question.name}
                        value={formData[question.name]}
                        onChange={handleChange}
                        placeholder="Type your answer here..."
                        required
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>
            <div className="button-container">
              {currentQuestion > 0 && (
                <button
                  type="button"
                  className="prev-button"
                  onClick={prevQuestion}
                >
                  <i className="fas fa-chevron-up"></i>
                </button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <button
                  type="button"
                  className="next-button"
                  onClick={nextQuestion}
                >
                  <i className="fas fa-chevron-down"></i>
                </button>
              ) : (
                <button type="submit" className="submit-button">
                  OK <span className="submit-instructions">press Enter ↵</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DemographicDataForm;
