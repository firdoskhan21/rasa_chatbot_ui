const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

dotenv.config();

const demographicRoutes = require("./routes/demographic");
const experimentRoutes = require("./routes/conversation");
const feedbackRoutes = require("./routes/surveys");
const rasaConversationRoutes = require("./routes/rasa_conversation");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const conversationRoutes = require("./routes/conversation");
const experimentFlowRoutes = require("./routes/experiment_flow");
const ueqRoutes = require("./routes/ueq");
const app = express();

// CORS configuration options
const corsOptions = {
  origin: true, // Allow only your frontend domain
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/demographics", demographicRoutes);
app.use("/api/experiments", experimentRoutes);
app.use("/api/surveys", feedbackRoutes);
app.use("/api/rasa_conversations", rasaConversationRoutes);
app.use("/api/coversations", conversationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/experiment_flow", experimentFlowRoutes);
app.use("/api/ueq", ueqRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
