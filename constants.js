require("dotenv").config();

const JwtSecret = process.env.JWT_SECRET;
const expireDateToken = process.env.JWT_EXPIRES_IN;

const DatabaseURL = process.env.URL_DATABASE;
const DB_NAME = process.env.DB_NAME_MONGO_ATLAS;

const PORT = process.env.PORT || 5000;

const API = "/api/v1";

module.exports = {
  JwtSecret,
  expireDateToken,
  DatabaseURL,
  DB_NAME,
  PORT,
  API,
};
