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
   /*       const shema = new Joi.object({
      name: Joi.string().min(3).max(30).required(), //
      price: Joi.number().required(),
   });
   const result = shema.validate(req.body);
   */

   //validate bilgisini hem post hem put request'te kullandığımız için bunu burada yorum satırı yapıp, aşağıda bir fonksiyon olarak tanımlıyoruz. fonksiyonu hem burada hem de put metodunda çağıracağız.

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

//PUT REQUEST
app.put("/api/products/:id", (req, res) => {
   //kullanıcı tarafından girilen id'ye göre ürünü alalım.
   const product = products.find((p) => p.id == req.params.id);

   //kullanıcı tarafından girilen bilgide bir sonuc bulunamazsa
   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }

   //kullanıcıların güncellemek istediği bilgileri validate etmemiz gerekiyor.bu kodu aşağıda fonksiyon oluşturup oraya yazdık. burada fonksiyonu çağıracağız.
   /*       const shema = new Joi.object({
            name: Joi.string().min(3).max(30).required(), //
            price: Joi.number().required(),
   });
            const result = shema.validate(req.body);        
   */
   const result = validateProduct(req.body);

   if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }

   product.name = req.body.name;
   product.price = req.body.price;
   res.send(product);
});

app.get("/api/products/:id", (req, res) => {
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }
   res.send(product);
});

// validate olayı post ve put metodunda kullanıldığı için bir fonksiyon oluşturup bu fonksiyonu post ve put içerisinde çağırıyoruz.
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
