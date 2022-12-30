const express = require("express");
const app = express();

// app.use ile gelen response ve requestleri ele alabiliriz.
app.use("/blogs/:blogid/users/:username",function(req,res){//:blogid yazdığımızda artık buraya hangi sayıyı yazarsak yazalım blog detay sayfasına gideriz.(değişkenler iki nokta ile başlar)
    console.log(req.params);// kullanıcının girmiş olduğu id numarası ve username gibi bilgileri consolea gelir.
    console.log(req.params.blogid);
    console.log(req.params.username);
    res.send("blogdetaysayfası");

});
app.use("/blogs",function(req,res){
    res.send("blogs");
});

app.use("/",function(req,res){
    res.send("ana sayfa");
});




app.listen(3000, function(){
    console.log("listenin on port 3000")
});
