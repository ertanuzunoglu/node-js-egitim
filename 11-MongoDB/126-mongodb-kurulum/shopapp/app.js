const express = require("express");
const app = express();

const products = require("./routes/products");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products", products);
app.use("/", home);

//mongodb+srv://ertanuzunoglu:<password>@cluster0.lhdcj5y.mongodb.net/?retryWrites=true&w=majority

//mongodb veri tabanına uygulama üzerinden erişebiliriz. ya da bilgisayarımıza indireceğimiz mongodb compase üzerinden erişebiliriz.

//buradaki servise uygulamamız tarafından bağlanacağız.bunun için iki alternatifimiz var. mongodb kütüphanesini bilgisayarımıza kurabiliriz. ya da mongooese isimli orm'i kullanabiliriz. biz mongoose'u kullanacağız.

app.listen(8000, () => {
   console.log("listening on port 8000");
});
