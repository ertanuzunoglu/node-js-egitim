const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const home = require("./routes/home");
const { date } = require("joi");

app.use(express.json());

app.use("/api/products", products);
app.use("/", home);

mongoose
   .connect(
      "mongodb+srv://ertanuzunoglu:Ertan6161.@cluster0.lhdcj5y.mongodb.net/?retryWrites=true&w=majority"
   )
   .then(() => {
      console.log("mongoose bağlantısı başarılı");
   })
   .catch((err) => {
      console.log(err);
   });

//bir şema oluşturacağız.
const productSchema = mongoose.Schema({
   //mongoose schemasını tanımlarken kullanacağımız veri tiplerini tanımlıyoruz.bunlarla ilgili örnekler mongoosejs.com'da var.
   name: String,
   price: Number,
   description: String,
   imageUrl: String,
   date: {
      type: Date,
      default: Date.now,
   },
   isActive: Boolean,
});
//schemayı oluşturma amacımız bir model tanımlamaktı.bir product modeli tanımlayalım. Product modeli bir classı temsil ettiğinden dolayı ilk harifi büyük olarak tanımlıyoruz.

const Product = mongoose.model("Product", productSchema); // model
//bir product sınıfından türetilmiş bir nesne oluşturmamız gerekiyor.

app.listen(8000, () => {
   console.log("listening on port 8000");
});
