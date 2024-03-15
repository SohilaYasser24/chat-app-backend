const Joi = require("joi");

const userValidation = Joi.object({
  firstname: Joi.string().min(3).max(12).required(),
  lastname: Joi.string().min(3).max(12),
  gender: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])\S{8,16}$/)
    .required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = userValidation;
