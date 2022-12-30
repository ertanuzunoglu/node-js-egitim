const express = require("express");
const router = express.Router();

const { Product, validateProduct } = require("../models/product"); //

/*
   Querry Operators
   eq => equal
   ne => not equal
   gt => greater than
   gte => greter than or equal
   lt => less than
   lte => less than or equal
   in => [10,20,30] bunlara eşit olanları getirir.
   nin => [10.20] bunlara eşit olmayanları getirir.
*/
router.get("/", async (req, res) => {
   // const products = await Product.find();
   //const products = await Product.find({ price: { $eq: 10000 } }); //price bilgisi 10000 objeler gelecek.
   // const products = await Product.find({ price: { $neq: 10000 } });//price bilgisi 10000 olmayan objeler gelecek.
   // const products = await Product.find({ price: { $gt: 10000 } });//price bilgisi 10000den büyük olan objeler gelecek.
   //const products = await Product.find({ price: { $gte: 10000 , $lse:20000} }); // 10000<=price<=20000;
   // const products = await Product.find({ price: { $gte: 10000}, name:'Samsung' }); //fiyatı 10000den büyük ve ismi samsung olan ürünler
   // const products = await Product.find().or({ price: { $gte: 10000}, name:'Samsung' }); // fiyatı 10000den büyük ya da ismi samsung olan

   //startwith bir karakter başlayanları soruyoruz.
   // const products = await Product.find({ name: /^Samsung/ });

   //endwith bir karakter ile bitenleri soruyoruz.
   //const products = await Product.find({ name: /Samsung$/ });

   //contains içerisinde iphne gecenleri soruyoruz.(i karakteri büyük küçük harf farkını kaldırır.)
   const products = await Product.find({ name: /.*iphone.*/i });

   res.send(products);
});

router.post("/", async (req, res) => {
   const result = validateProduct(req.body);

   if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }

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

router.get("/:id", async (req, res) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
      return;
   }
   res.send(product);
});

module.exports = router;
