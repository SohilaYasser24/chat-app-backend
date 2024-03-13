const mongoose = require('mongoose');
const Joi = require("joi");

const User = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender:{
    type:String,
    enum:["male","female"],
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const userValidation = Joi.object({

    _id :Joi.required(),
    firstname: Joi.string().min(3).max(12),
    lastname: Joi.string().min(3).max(12),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    // password: Joi.string().pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$").max(16).required()
    password: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt : Joi.date()
})

User.pre("save",function(next){
    const validation = userValidation.validate(this.toObject());
    if (validation.error) {
    //   const err = validation.error.details[0].message;
      return Promise.reject(
        "Validation Error: " + validation.error.details[0].message
      ); 
    //   next(res.json({ err, status: "failed! " }));
    } else {
      next();
    }
})

module.exports = mongoose.model('User', User);