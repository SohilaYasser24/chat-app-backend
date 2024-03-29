const Joi = require("joi");

const userValidation = Joi.object({
  firstname: Joi.string().min(3).max(12).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must have at least {#limit} characters",
    "string.max": "First name must have at most {#limit} characters",
  }),
  lastname: Joi.string().min(3).max(12).allow("").messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must have at least {#limit} characters",
    "string.max": "Last name must have at most {#limit} characters",
  }),
  image: Joi.string().allow("").messages({
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

const updateUserValidation = Joi.object({
  firstname: Joi.string().min(3).max(12).messages({
    "string.base": "First name must be a string",
    "string.min": "First name must have at least {#limit} characters",
    "string.max": "First name must have at most {#limit} characters",
  }),
  lastname: Joi.string().min(3).max(12).allow("").messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must have at least {#limit} characters",
    "string.max": "Last name must have at most {#limit} characters",
  }),
  image: Joi.string().allow("").messages({
    "string.base": "Image must be a string",
  }),
  email: Joi.string().email().messages({
    "string.base": "Image must be a string",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])\S{8,16}$/)
    .messages({
      "string.pattern.base":
        "Password must between 8-16 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

module.exports = { userValidation, updateUserValidation };
