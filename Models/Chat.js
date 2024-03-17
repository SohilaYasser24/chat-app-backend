const mongoose = require("mongoose");
const Joi = require("joi");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
