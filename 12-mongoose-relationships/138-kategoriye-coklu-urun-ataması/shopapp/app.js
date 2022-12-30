const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const home = require("./routes/home");
const categories = require("./routes/categories");

app.use(express.json());

app.use("/api/categories", categories);
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

app.listen(8000, () => {
   console.log("listening on port 8000");
});
