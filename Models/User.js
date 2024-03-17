const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
