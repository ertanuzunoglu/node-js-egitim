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

const Product = mongoose.model("Product", productSchema); // model
//bir product sınıfından türetilmiş bir nesne oluşturmamız gerekiyor.bir prd nesnesi oluşturacağız.

const prd = new Product({
   //Product sınıfından prd isimli bir nesne tanımladık.
   name: "iphone 14",
   price: 30000,
   description: "pahalı telefon",
   imageUrl: "1.jpeg",
   isActive: true,
});

//üretmiş olduğumuz prd objesi üzerinden save metodunu çağırdımızda bu veritabanına kaydolacak. bu asenkron bir sorgu olduğu için await ile bekletmemiz gerekiyor. ayrıca awaiti çağıtdımız için bunu async bir function içerinde bunu tanımlamış olmalıyız.
async function saveProduct() {
   //hata denetimini de try catch bloklarıyla yapabiliriz.
   try {
      const result = await prd.save(); //kaydedilen bilgiyi görmek için result'a tanımladık
      console.log(result); // kaydedilen bilgiyi consoleda göstereceğiz.
   } catch (err) {
      console.log(err);
   }
}
// kayıt yapmak için saveProduct fonksiyonunu çağırıyoruz.
saveProduct();

app.listen(8000, () => {
   console.log("listening on port 8000");
});
