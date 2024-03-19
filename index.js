const cors = require("cors");
const express = require("express");
const connect = require("./db");

const authRoutes = require("./Routes/auth");
const chatRoutes = require("./Routes/chat");
const messageRoutes = require("./Routes/message");
const userRoutes = require("./Routes/user");
const { PORT, API } = require("./constants");
const { Socket } = require("socket.io");

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

const server = app.listen(PORT, () => {
  console.log(`Server is Online in PORT ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  // console.log("Socket.io connection successfull");

  socket.on("addUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    // console.log({ userId });
    // console.log(onlineUsers);
    io.emit("getUsersOnLine", onlineUsers);
  });

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    // console.log("join chat successfull");
    // io.to(chatId).emit("getMessage", "hello");
  });

  socket.on("sendMessage", (newMessage, chatId) => {
    io.to(chatId).emit("getMessage", newMessage);

    // console.log(newMessage);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsersOnLine", onlineUsers);
  });
});
