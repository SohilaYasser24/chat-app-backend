const mongoose = require('mongoose');
const Joi = require("joi");


const Message = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});


const messageValidation = Joi.object({

    content: Joi.string().required(),
    sender: Joi.object().required(),
    chat: Joi.object().required(),
    createdAt: Joi.date().required(),
    _id: Joi.object().required(),
})

Message.pre("save",function(next){
    const validation = messageValidation.validate(this.toObject());
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

module.exports = mongoose.model('Message', Message);
