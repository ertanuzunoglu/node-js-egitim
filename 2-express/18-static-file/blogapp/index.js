const express = require("express");
const app = express();
const path = require("path");

//static dosya olarak bootstrap kütüphanesini kullanacağız.
//npm install bootstrap@5.2.0
// package.json dosyamızın içerisine gelecek.
//node_modules klasörünün içerisine dosyalar gelecek.index html'de bootstrap dosyamızı ekliyoruz.
//bunu kullanıcıya açmak için bir middleware eklememiz gerekiyor
//expressjs.com'a girip gettin starteddan static files'ı seçiyoruz.buradaki kodu app.js'e ekliyoruz.

app.use("/libs", express.static("node_modules")); //bootstrap'i kullanıcıya açma middleware'i. node_modules'e lips takma adını verdik.

//bizim kendi projemizin klasörleri de olacak.bunları public klasörüne alıyoruz.örnek olarak img klasörümüz içerisindeki bir resmi index.html sayfamıza cıkartmak için aşağıdaki middlewareı yazıyoruz.
app.use("/static", express.static("public")); //public klasörüne static takma adını tanımladık. index.htmlde resmin yolunu bulmak için static kullanıyoruz.

app.use("/blogs/:blogid", function (req, res) {
   console.log(__dirname);
   console.log(__filename);
   res.sendFile(path.join(__dirname, "views/users", "blog-details.html"));
});

app.use("/blogs", function (req, res) {
   res.sendFile(path.join(__dirname, "views/users", "blogs.html"));
});

app.use("/", function (req, res) {
   res.sendFile(path.join(__dirname, "views/users", "index.html"));
});

app.listen(3000, function () {
   console.log("listening on port 3000");
});
