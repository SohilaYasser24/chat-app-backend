const { DatabaseURL, DB_NAME } = require("./constants");

const mongoose = require("mongoose");

const connect = () => {
  const connectDB = mongoose
    .connect(DatabaseURL, { dbName: DB_NAME })
    .then(() => {
      console.log("Connect to DB is successfully");
    })
    .catch((err) => console.log(err));
};

module.exports = connect;
