const express = require("express");
const app = express();

app.use(express.json()); // postlardaki bilgi json olarak herhangi bir uygulama tipinden gelen requestin bodysi üzerinden okuyacağız.

const products = [
   { id: 1, name: "iphone 12", price: 20000 },
   { id: 2, name: "iphone 13", price: 30000 },
   { id: 3, name: "iphone 14", price: 40000 },
];
app.get("/", (req, res) => {
   res.send(products[0]);
});

app.get("/api/products", (req, res) => {
   res.send(products);
});

// post request
//burada bizim post gönderebileceğimiz bir arayüzümüz olmadığı için postman isimli uygulamayı kullanacağız.postmanda sorgu tipini post olarak seçip bodysine raw cinsinden bir sorgu göndereceğiz.

app.post("/api/products", (req, res) => {
   const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   };
   products.push(product);
   res.send(product);
});

app.get("/api/products/:id", (req, res) => {
   console.log(req.params);
   console.log(req.query);
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }
   res.send(product);
});

// post request

app.post("/api/products");

app.listen(8000, () => {
   console.log("listening on port 8000");
});
