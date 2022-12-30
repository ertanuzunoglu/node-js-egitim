const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products", products);
app.use("/", home);

//burada uygulama üzerinden veritabanına nasıl bağlantı kuracağımızı öğreneceğiz.bunu mongoose üzerinden yapacağız. ilk olarak mongoose'u uygulamamıza kurmamız gerekiyor. mongoose'un sitesine giriyoruz.

//yüklemek için npm i mongoose@6.6.1
//yükledikten sonra require ile import ediyoruz.

//mongoose üzerinden bir bağlantı sağlamamız gerekiyor.
mongoose
   .connect(
      "mongodb+srv://ertanuzunoglu:Ertan6161.@cluster0.lhdcj5y.mongodb.net/?retryWrites=true&w=majority"
   )
   .then(() => {
      console.log("mongoose bağlantısı başarılı");
   }) // hata bilgisi yoksa mongoose bağlantısı başarılı bilgisini console'a yazdırırız.
   .catch((err) => {
      console.log(err);
   });

app.listen(8000, () => {
   console.log("listening on port 8000");
});
