const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = require("mongoose"); // kategori bilgisi ekleyebilmek için bunu tanınmlamamız gerekiyor.

const productSchema = mongoose.Schema({
   name: String,
   price: Number,
   description: String,
   imageUrl: String,
   date: {
      type: Date,
      default: Date.now,
   },
   isActive: Boolean,
   category: { type: Schema.Types.ObjectId, ref: "Category" }, // category bilgisi ekledik.
});

function validateProduct(product) {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().required(),
      description: Joi.string(),
      imageUrl: Joi.string(),
      isActive: Joi.boolean(),
      category: Joi.string(), //eklediğimiz categoryi de valide etmemiz gerekiyor.
   });
   return schema.validate(product);
}
const Product = mongoose.model("Product", productSchema);

module.exports = { Product, validateProduct };
