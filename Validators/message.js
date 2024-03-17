const Joi = require("joi");

const messageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  sender: Joi.object().required(),
  chat: Joi.object().required(),
  createdAt: Joi.date().required(),
  _id: Joi.object().required(),
});

module.exports = { messageValidation };
