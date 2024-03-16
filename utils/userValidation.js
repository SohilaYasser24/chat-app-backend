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
  gender: Joi.string().required().messages({
    "string.empty": "Gender is required",
  }),
  image: Joi.string(),
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
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = userValidation;
