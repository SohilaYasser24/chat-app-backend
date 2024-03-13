require('dotenv').config();
const mongoose = require('mongoose');


const URL = process.env.URL_DATABASE;
const DB_NAME = process.env.DB_NAME_MONGO_ATLAS;

const connect = () => {
  const connectDB = mongoose
    .connect(URL, { dbName: DB_NAME })
    .then(() => {
      console.log("Connect to DB is successfully");
    })
    .catch((err) => console.log(err));
};

module.exports = connect;