const Joi = require("joi");

// remove IsGroup from validation Joi Schema ✅
const chatValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  members: Joi.array().required().messages({
    "string.empty": "Members is required",
  }),
  _id: Joi.required(),
});

module.exports = { chatValidation };
