const express = require("express");
const router = express.Router();
const Joi = require("joi");

const products = [
   { id: 1, name: "iphone 12", price: 20000 },
   { id: 2, name: "iphone 13", price: 30000 },
   { id: 3, name: "iphone 14", price: 40000 },
];

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      return res.status(404).send("aradığınız ürün bulunamadı");
   }

   const index = products.indexOf(product);
   products.splice(index, 1);
   res.send(product);
});

router.get("/:id", (req, res) => {
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

module.exports = router;
