require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./db");

const authRoutes = require("./routes/authRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const userRoutes = require("./routes/userRoute");


const app = express();
app.use(cors());
app.use(express.json());

// change user which from /user to /auth because there are endpoitn with the same name
app.use("/api/v1/auth", authRoutes); // here change
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/chat",chatRoutes)
app.use("/api/v1/message",messageRoutes)

const PORT = process.env.PORT;

connect();

app.listen(PORT, () => {
  console.log("Server is Online in PORT 5000");
});
