const mongoose = require("mongoose");
const Joi = require("joi");

// remove createdAt property ✅
const Message = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
