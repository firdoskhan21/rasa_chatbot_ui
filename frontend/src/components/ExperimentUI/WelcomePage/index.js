import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const WelcomeMsg = ({ getNextStep }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Navigate to the '/demographic_survey' route
    navigate(getNextStep());
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to Our Chatbot Experiment!</h1>
        <p>
          Thank you for participating in this study on user interactions with
          chatbots. Your involvement is crucial in helping us understand how
          different chatbot designs influence user behavior. This experiment survey requires 15 min of your time.
        </p>
        <div className="card">
          <h2>Purpose of the Study:</h2>
          <p>
            We are investigating how chatbots can sometimes guide users towards
            certain actions, Your interaction with the chatbot will help us gather insights on
            this phenomenon. Any other information regarding this study is restricted due to organization reasons.
          </p>
        </div>
        <div className="card">
          <h2>What to Expect:</h2>
          <ol>
            <li>
              <strong>Task Assignment:</strong> You will be randomly assigned 3
              tasks to complete using the chatbot.
            </li>
            <li>
              <strong>Chatbot Interaction:</strong> Engage with the chatbot to
              complete the assigned task. The chatbot will guide you through the
              process. Please remember this is a simulation experiment and please dont expect the chatbot to be very interactive in other matters. The Chatbot is designed for its specific usecase only.
            </li>
            <li>
              <strong>Surveys:</strong> After your interaction, you will be asked
              to complete some short surveys about your experience. Please fill them all your inputs will help us improve our experiment setup.
            
            </li>
          </ol>
        </div>
        <div className="card">
          <h2>Important Information:</h2>
          <ul>
            <li>
              <strong>Confidentiality:</strong> All your responses will be kept
              confidential and used only for research purposes. We dont ask for any personal information.
            </li>
            <li>
              <strong>Voluntary Participation:</strong> Your participation is
              voluntary, and you can withdraw from the study at any time without
              any consequences. But if you participate we request you to complete the experiment till the end filling all the fields as all the fields are required.
            </li>
            <li>
              <strong>Anonymity:</strong> Any data collected will be anonymized
              to protect your identity.
            </li>
          </ul>
          <p>
            By continuing, you consent to the storage and use of your data in
            accordance with our privacy policy. Your data will be used for
            research purposes and will be anonymized to ensure your privacy.
          </p>
        </div>

        <div className="card">
          <h2>Getting Started:</h2>
          <p>
            When you are ready, click the "Start" button below to begin your
            interaction with the chatbot.
          </p>
          <button onClick={handleStartClick} className="start-button">
            Start
          </button>
          <p>
            If you have any questions before starting, feel free to reach out to
            us at{" "}
            <a href="mailto:firdos.khan@gmail.com">firdos-khatoon.khan@s2021.tu-chemnitz.de</a>.
          </p>
        </div>
      </div>
      {/* <div style={{ color: "#fff" }}>The Experiment is closed.</div> */}
    </div>
  );
};

export default WelcomeMsg;
