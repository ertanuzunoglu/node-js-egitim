const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema({
   name: String,
   products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

function validateCategory(category) {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      products: Joi.array(),
   });
   return schema.validate(category);
}
const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, validateCategory };

var egitmen = {
   id: 1,
   name: "Ertan",
};

var kurs = {
   title: "node.js",
   egitmen: "ref",
};

var kurs = {
   title: "js",
   egitmen: {
      name: "Sadık",
      bio: "",
   },
};

var kurs = {
   title: "js",
   egitmen: {
      name: "Sadık",
      id: "ref",
   },
};

var product = {
   name: "samsung s22",
   price: 20000,
   desc: "",
};

var order = {
   id: 1,
   date: "",
   product: {
      name: "samsung s22",
      price: 19000,
      id: "ref",
   },
};
