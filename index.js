const cors = require("cors");
const express = require("express");
const connect = require("./db");

const authRoutes = require("./Routes/auth");
const chatRoutes = require("./Routes/chat");
const messageRoutes = require("./Routes/message");
const userRoutes = require("./Routes/user");
const { PORT, API } = require("./constants");

const apiRoute = express.Router();
apiRoute.use("/auth", authRoutes); // here change
apiRoute.use("/user", userRoutes);
apiRoute.use("/chat", chatRoutes);
apiRoute.use("/message", messageRoutes);

const app = express();
app.use(cors());
app.use(express.json());

app.use(API, apiRoute);

// change user which from /user to /auth because there are endpoitn with the same name

connect();

app.listen(PORT, () => {
  console.log(`Server is Online in PORT ${PORT}`);
});
