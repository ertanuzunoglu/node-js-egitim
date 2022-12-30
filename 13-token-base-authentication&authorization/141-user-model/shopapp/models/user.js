const mongoose = require("mongoose");
const Schema = require("mongoose");
const Joi = require("joi");
const { required } = require("joi");

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true } //otomatik olarak eklenme tarihi
);

function validateUser(user) {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
