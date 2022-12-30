const express = require("express");
const app = express();

// app.use ile gelen response ve requestleri ele alabiliriz.
app.use(function(req,res){
    res.end("asd world");
})

app.listen(3000, function(){
    console.log("listenin on port 3000")
});
