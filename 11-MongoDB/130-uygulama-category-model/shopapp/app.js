//ilk olarak bir models klasörü oluşturuyoruz.
//içerisine category.js isimli bir dosya açıyoruz.

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const home = require("./routes/home");
const { date, func } = require("joi");

app.use(express.json());

app.use("/api/products", products);
app.use("/", home);

const username = "ertanuzunoglu";
const password = "Ertan6161.";
const database = "shopdb";
(async () => {
   try {
      await mongoose.connect(
         `mongodb+srv://${username}:${password}@cluster0.lhdcj5y.mongodb.net/${database}?retryWrites=true&w=majority`
      );
      console.log("mongoose bağlantısı başarılı");
   } catch (err) {
      console.log(err);
   }
})();

//productschema kodlarımızı models içerisinide product.js isimli bir dosya oluşturup oraya alıyoruz. buradakileri yorum satırı yaptık.
/* 
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
});

const Product = mongoose.model("Product", productSchema);
*/

//buradaki kodlarımızın yeri de app.js değil. bu kodları da buradan alıp routes içerisindeki products.js dosyamıza taşıyoruz.
/*
const prd = new Product({
   name: "iphone 14",
   price: 30000,
   description: "pahalı telefon",
   imageUrl: "1.jpeg",
   isActive: true,
});
*/

//buradaki database' kayıt etmemize yarayan kodları da routes içerisindeki product.js dosyamızdaki post request metodumuzun altına ekliyoruz.
/*
async function saveProduct() {
   try {
      const result = await prd.save();
      console.log(result);
   } catch (err) {
      console.log(err);
   }
}


saveProduct();
*/

app.listen(8000, () => {
   console.log("listening on port 8000");
});
