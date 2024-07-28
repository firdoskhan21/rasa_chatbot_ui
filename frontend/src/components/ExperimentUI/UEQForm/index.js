import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Ensure to create a CSS file for styling
import { server_endpoints } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../../../utils/session";

const questions = [
  { id: 1, left: "annoying", right: "enjoyable" },
  { id: 2, left: "not understandable", right: "understandable" },
  { id: 3, left: "creative", right: "dull" },
  { id: 4, left: "easy to learn", right: "difficult to learn" },
  { id: 5, left: "valuable", right: "inferior" },
  { id: 6, left: "boring", right: "exciting" },
  { id: 7, left: "not interesting", right: "interesting" },
  { id: 8, left: "unpredictable", right: "predictable" },
  { id: 9, left: "fast", right: "slow" },
  { id: 10, left: "inventive", right: "conventional" },
  { id: 11, left: "obstructive", right: "supportive" },
  { id: 12, left: "good", right: "bad" },
  { id: 13, left: "complicated", right: "easy" },
  { id: 14, left: "unlikable", right: "pleasing" },
  { id: 15, left: "usual", right: "leading edge" },
  { id: 16, left: "unpleasant", right: "pleasant" },
  { id: 17, left: "secure", right: "not secure" },
  { id: 18, left: "motivating", right: "demotivating" },
  { id: 19, left: "meets expectations", right: "does not meet expectations" },
  { id: 20, left: "inefficient", right: "efficient" },
  { id: 21, left: "clear", right: "confusing" },
  { id: 22, left: "impractical", right: "practical" },
  { id: 23, left: "organized", right: "cluttered" },
  { id: 24, left: "attractive", right: "unattractive" },
  { id: 25, left: "friendly", right: "unfriendly" },
  { id: 26, left: "conservative", right: "innovative" },
];

const UEQ = ({ getNextStep }) => {
  const userId = getUserSession();
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();
  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server_endpoints.backend_server}/ueq`, {
        userId,
        responses,
      });
      alert("Thank you for your feedback!");
      navigate(getNextStep());
    } catch (error) {
      console.error("Error submitting UEQ responses", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <div className="ueq-container">
      <h1>User Experience Questionnaire (UEQ)</h1>
      <p>
        For the assessment of the product, please fill out the following
        questionnaire. The questionnaire consists of pairs of contrasting
        attributes that may apply to the product. The circles between the
        attributes represent gradations between the opposites. You can express
        your agreement with the attributes by ticking the circle that most
        closely reflects your impression.
      </p>
      <form onSubmit={handleSubmit}>
        <table className="ueq-table">
          <thead>
            <tr>
              <th></th>
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <th key={value}>{value}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="ueq-row">
                <td>{q.left}</td>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                  <td key={value} className="ueq-cell">
                    <label className="ueq-label">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={value}
                        checked={responses[q.id] === value}
                        onChange={() => handleChange(q.id, value)}
                      />
                      <span className="ueq-radio"></span>
                    </label>
                  </td>
                ))}
                <td>{q.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={{float:'right'}}>Submit</button>
      </form>
    </div>
  );
};

export default UEQ;
