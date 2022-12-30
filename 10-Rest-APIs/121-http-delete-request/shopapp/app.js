const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

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

app.post("/api/products", (req, res) => {
   const result = validateProduct(req.body);

   if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }

   const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   };
   products.push(product);
   res.send(product);
});

app.put("/api/products/:id", (req, res) => {
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }

   const result = validateProduct(req.body);

   if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }

   product.name = req.body.name;
   product.price = req.body.price;
   res.send(product);
});

//delete request metodu
app.delete("/api/products/:id", (req, res) => {
   //get metodundan id numarasına göre ürünü getiren kodu çağırıyoruz.
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      return res.status(404).send("aradığınız ürün bulunamadı");
   }

   const index = products.indexOf(product); //id numarası girilen ürünün index numarasını bize verir
   products.splice(index, 1); //index numarasından itibaren 1 eleman silecek.
   res.send(product); //silinen product bilgisini kullanıcıya verir.
});

app.get("/api/products/:id", (req, res) => {
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
      return;
   }
   res.send(product);
});

function validateProduct(product) {
   const shema = new Joi.object({
      name: Joi.string().min(3).max(30).required(), //
      price: Joi.number().required(),
   });
   return shema.validate(product);
}
app.listen(8000, () => {
   console.log("listening on port 8000");
});
