const Joi = require("joi");

const userValidation = Joi.object({
  firstname: Joi.string().min(3).max(12).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must have at least {#limit} characters",
    "string.max": "First name must have at most {#limit} characters",
  }),
  lastname: Joi.string().min(3).max(12).messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must have at least {#limit} characters",
    "string.max": "Last name must have at most {#limit} characters",
  }),
  image: Joi.string().default(" ").allow("").messages({
    "string.base": "Image must be a string",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])\S{8,16}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must between 8-16 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "any.required": "Password is required",
    }),
});

const messageValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  sender: Joi.object().required(),
  chat: Joi.object().required(),
  createdAt: Joi.date().required(),
  _id: Joi.object().required(),
});

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

module.exports = { userValidation, messageValidation, chatValidation };
