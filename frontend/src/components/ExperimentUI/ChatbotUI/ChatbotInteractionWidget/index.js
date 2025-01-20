import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { server_endpoints } from "../../../../constants";
import html2canvas from "html2canvas";

const ChatbotInteractionWidget = ({ task, userId, getNextStep }) => {
  console.log("task", task);
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [productSelected, setProductSelected] = useState(false);

  const rasaAPI = async (name, msg) => {
    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            charset: "UTF-8",
          },
          credentials: "same-origin",
          body: JSON.stringify({ sender: name, message: msg }),
        }
      );

      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
        const temp = responseData[0];
        const recipient_id = temp["recipient_id"];
        const recipient_msg = temp["text"];

        const response_temp = {
          sender: "bot",
          recipient_id: recipient_id,
          msg: recipient_msg,
          timestamp: new Date().toISOString(),
        };
        setBotTyping(false);
        setChat((chat) => [...chat, response_temp]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const request_temp = {
      sender: "user",
      sender_id: userId,
      msg: inputMessage,
      timestamp: new Date().toISOString(),
    };

    if (inputMessage.trim() !== "") {
      setChat((chat) => [...chat, request_temp]);
      setBotTyping(true);
      await rasaAPI(userId, inputMessage);
      setInputMessage("");

      // Save conversation to backend
      await axios.post(`${server_endpoints.backend_server}/save_conversation`, {
        userId: userId,
        pattern_type: task,
        is_dark_pattern: task !== "no_dark_pattern" && true, //'no_dark_pattern' is the task for 'no dark pattern'
        messages: [...chat, request_temp],
      });
    } else {
      window.alert("Please enter a valid message");
    }
  };

  const handleEndConversation = async () => {
    if (window.confirm("Are you sure you want to end the conversation?")) {
      navigate(getNextStep());
    }
  };

  return (
    <iframe
      width="100%"
      height="100%"
      // src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=24919228-8fdc-4dfc-8546-3895e52f26cc"
      src={`https://firdoskhan21.github.io/rasa_chatbot_ui?id=${userId}&type=${task}`}
    ></iframe>

    // <Box>
    //   <div className="chatbot-container">
    //     <div className="chatbot-card">
    //       <div className="chatbot-header">
    //         <div className="user-info">
    //           <AccountCircleIcon className="user-avatar" />
    //           <div className="user-details"></div>
    //         </div>
    //         <div className="chatbot-title">
    //           <Typography variant="h4">Chatbot</Typography>
    //         </div>
    //         <button
    //           className="end-conversation-button"
    //           onClick={handleEndConversation}
    //         >
    //           Submit Conversation
    //         </button>
    //       </div>
    //       <div className="chatbot-body">
    //         <div className="chatbot-messages">
    //           {chat.map((message, index) => (
    //             <div
    //               key={index}
    //               className={`chat-message ${
    //                 message.sender === "bot" ? "bot" : "user"
    //               }`}
    //             >
    //               {message.sender === "bot" ? (
    //                 <>
    //                   <BiBot className="icon bot-icon" />
    //                   <div className="message-content bot-message">
    //                     {message.msg}
    //                   </div>
    //                 </>
    //               ) : (
    //                 <>
    //                   <div className="message-content user-message">
    //                     {message.msg}
    //                   </div>
    //                   <BiUser className="icon user-icon" />
    //                 </>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       {!productSelected && task === "product_info" && (
    //         <ProductSelection onSelect={handleProductSelect} />
    //       )}
    //       <div className="chatbot-footer">
    //         <form onSubmit={handleSubmit} className="chat-form">
    //           <input
    //             type="text"
    //             value={inputMessage}
    //             onChange={(e) => setInputMessage(e.target.value)}
    //             placeholder="Type a message"
    //             className="input-message"
    //           />
    //           <button type="submit" className="send-button">
    //             <IoMdSend className="send-icon" />
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </Box>
  );
};


export default ChatbotInteractionWidget