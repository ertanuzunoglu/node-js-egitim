const express = require("express");
const app = express();
const path = require("path");


const userRoutes = require('./routes/user');// routes içerisindeki dosyayı buraya import ettik.İmport ettiğimiz bu dosyayı burada middleware olarak kullanmamız gerekiyor.
const adminRoutes = require('./routes/admin'); // admin içerisindeki dosyaları buraya import ettik.  İmport ettiğimiz bu dosyayı burada middleware olarak kullanmamız gerekiyor.

app.use("/libs", express.static("node_modules"));
app.use("/static", express.static("public"));

app.use('/admin', adminRoutes);// yukarıda import ettiğimiz dosyayı middleware olarak kullandık.

app.use(userRoutes);// yukarıda import ettiğimiz dosyayı middleware olarak kullandık.


// aşağıdaki html sayfalarını getirme middlewarelerini başka bir dosyadan alacağız. bu nedenle buraları yorum satırı yapıyoruz.
// app.use("/blogs/:blogid", function (req, res) {
//    res.sendFile(path.join(__dirname, "views/users", "blog-details.html"));
// });

// app.use("/blogs", function (req, res) {
//    res.sendFile(path.join(__dirname, "views/users", "blogs.html"));
// });

// app.use("/", function (req, res) {
//    res.sendFile(path.join(__dirname, "views/users", "index.html"));
// });

app.listen(3000, function () {
   console.log("listening on port 3000");
});
