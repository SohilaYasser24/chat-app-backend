const mongoose = require('mongoose');
const Joi = require("joi");


const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isGroup: {
    type: Boolean,
    default: false
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
});



const chatValidation = Joi.object({
    name: Joi.string().required(),
    members: Joi.array().required(),
    isGroup: Joi.boolean().required(),
    _id: Joi.required()
})

chatSchema.pre("save",function(next){
    const validation = chatValidation.validate(this.toObject());
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

module.exports = mongoose.model('Chat', chatSchema);