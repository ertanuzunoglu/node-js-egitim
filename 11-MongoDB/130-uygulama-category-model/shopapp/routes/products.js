const express = require("express");
const router = express.Router();
// const Joi = require("joi"); //validatei taşıdığımız için joiyi de buradan models içerisindeki product'a taşıyoruz.

const { Product, validateProduct } = require("../models/product"); // models içerisindeki product.js içerisindeki export ettiğimiz kodları burada import ediyoruz.

//app.js içerisinde oluşturduğumuz prd nesnesini de buraya taşıyoruz. aşağıdaki post requestinin içerisinde zaten bir product oluşturuyoruz.bunu prd olarak tanımladığımız nesneyi burada producta çeviriyoruz ve önceki product nesnemizi yorum satırı yapıp güncel halini altına yazıyoruz.prd'deki name ve price gibi sabit bilgileri body içerisinden alacak şekilde güncelleyip dinamikleştiriyoruz.

router.post("/", async (req, res) => {
   // await olduğu için bu fonksiyonu asenkron olarak tanımlamamız gerekiyor.
   const result = validateProduct(req.body);

   if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }

   /*
   const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   };
   */

   const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.decription,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
   });

   try {
      const result = await product.save();
      res.send(result);
   } catch (err) {
      console.log(err);
   }

   // products.push(product);//static products nesnemizi sildiğimiz için artık buna ihtiyacımız yok
   // res.send(product); //bunu da yukarıya try içerisine taşıyoruz.
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

//product'ın validateini de buradan alıp models içerisine ekliyoruz.
/*
function validateProduct (product) {
   const shema = new Joi.object({
      name: Joi.string().min(3).max(30).required(), //
      price: Joi.number().required(),
      //product içerisinde tanımladığımız diğer bilgiler için de validate ayarlarını giriyoruz.
      description: Joi.string(),
      imageUrl: Joi.string(),
      isActive: Joi.boolean(),
   });
   return shema.validate(product);
}
*/
module.exports = router;
