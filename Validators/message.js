const Joi = require("joi");

const messageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  sender: Joi.object().required().messages({
    "string.empty": "Sender is required",
  }),
  chat: Joi.object().required().messages({
    "string.empty": "Chat is required",
  }),
});

module.exports = { messageValidation };
