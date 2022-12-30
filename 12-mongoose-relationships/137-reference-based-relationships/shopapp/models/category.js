const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema({
   name: String,
});

function validateCategory(category) {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
   });
   return schema.validate(category);
}
const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, validateCategory };

//kullanabilecek olduğumuz ilişki türlerinin birincisi reference tutmak. burada bir egitmen tanımladık. aşaşğıda da bu eğitmenin vermiş olduğu kursu tanımladık. burada kurs icerisinde egitmeni tanımlayarak egitmen objesi içerisinden hangisin olduğunu secebiliyoruz. birden fazla egitmen de secebiliriz bunu da köşeli parantez içerisinde yazıyoruz.
var egitmen = {
   id: 1,
   name: "Ertan",
};

var kurs = {
   title: "node.js",
   egitmen: "ref",
};

//embedded documents ilişkileri aynı döküman içerisinde saklamak

var kurs = {
   title: "js",
   egitmen: {
      name: "Sadık",
      bio: "",
   },
};

//hybrid ikisinin birlikte kullanılması
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
