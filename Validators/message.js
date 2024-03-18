const Joi = require("joi");

const messageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  chatId: Joi.string().required().messages({
    "any.empty": "Chat is required",
  }),
});

module.exports = { messageValidation };
