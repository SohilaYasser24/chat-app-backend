require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./db");

const authRoutes = require("./routes/authRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

const PORT = process.env.PORT;

connect();

app.listen(PORT, () => {
  console.log("Server is Online in PORT 5000");
});
