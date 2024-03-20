const Joi = require("joi");

const messageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  chatId: Joi.string().required().messages({
    "any.empty": "Chat is required",
  }),
});

const editMessageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

module.exports = { messageValidation, editMessageValidation };
