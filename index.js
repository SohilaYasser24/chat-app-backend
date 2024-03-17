const cors = require("cors");
const express = require("express");
const connect = require("./db");

const authRoutes = require("./Routes/auth");
const chatRoutes = require("./Routes/chat");
const messageRoutes = require("./Routes/message");
const userRoutes = require("./Routes/user");
const { PORT } = require("./constants");

const app = express();
app.use(cors());
app.use(express.json());

// change user which from /user to /auth because there are endpoitn with the same name
app.use("/api/v1/auth", authRoutes); // here change
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is Online in PORT ${PORT}`);
});
