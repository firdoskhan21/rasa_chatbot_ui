import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserSession } from "../../../utils/session";
import "./index.css"; // Import CSS file for styling
import { server_endpoints } from "../../../constants";

const SurveyForm = ({ getNextStep }) => {
  const navigate = useNavigate();
  const userId = getUserSession();

  const [formData, setFormData] = useState({
    interactionEase: "",
    encounteredIssues: false,
    overallExperience: "",
    requestUnderstanding: "",
    noticedPersuasiveBehavior: false,
    nudgesFeedback: "",
    likedMost: "",
    dislikedMost: "",
    improvementSuggestions: "",
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      label: "How easy was it to interact with the chatbot?",
      name: "interactionEase",
      type: "select",
      options: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
    },
    {
      label: "Did you encounter any issues while using the chatbot?",
      name: "encounteredIssues",
      type: "select",
      options: [
        { value: true, text: "Yes" },
        { value: false, text: "No" },
      ],
    },
    {
      label: "How would you rate your overall experience with the chatbot?",
      name: "overallExperience",
      type: "select",
      options: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
    },
    {
      label: "Did you feel the chatbot understood your requests accurately?",
      name: "requestUnderstanding",
      type: "select",
      options: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
    },
    {
      label:
        "Did you notice any persuasive or pushy behavior from the chatbot?",
      name: "noticedPersuasiveBehavior",
      type: "select",
      options: [
        { value: true, text: "Yes" },
        { value: false, text: "No" },
      ],
    },
    {
      label:
        "How did you feel about the suggestions or nudges provided by the chatbot?",
      name: "nudgesFeedback",
      type: "text",
    },
    {
      label: "What did you like most about interacting with the chatbot?",
      name: "likedMost",
      type: "text",
    },
    {
      label:
        "What did you dislike or find annoying about interacting with the chatbot?",
      name: "dislikedMost",
      type: "text",
    },
    {
      label: "Do you have any suggestions for improving the chatbot?",
      name: "improvementSuggestions",
      type: "text",
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
      await axios.post(`${server_endpoints.backend_server}/surveys`, {
        ...formData,
        userId,
      });
      navigate(getNextStep());
    } catch (error) {
      console.error("Error submitting feedback data:", error);
    }
  };

  return (
    <div className="typeform-container">
      <div className="typeform">
        <h1 className="typeform-title">Feedback Survey</h1>
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
                  {question.label} *
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
              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                OK <span className="submit-instructions">press Enter ↵</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
