const Joi = require("joi");

const chatValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  members: Joi.array().required().messages({
    "string.empty": "Members is required",
  }),
  isGroup: Joi.boolean().required(),
  _id: Joi.required(),
});

module.exports = { chatValidation };
