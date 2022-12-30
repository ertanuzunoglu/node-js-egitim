const express = require("express");
const router = express.Router();

const { Product, validateProduct } = require("../models/product"); //

//mongoose dökümanlarına baktığımızda queryaltında kulanabileceğimiz elemanlarımızı görebiliriz. biz bunlardan bütün kayıtları getirmek için find'ı kullanacağız.

router.get("/", async (req, res) => {
   // const products = await Product.find();//veritabanındaki bütün kayıtları seçer ve sayfaya gönderir.post man üzerinden bir get sorgusu göndereceğiz.
   //belirli bir kaydı göstermek istiyorsak yukarıdaki kodu yorum satırı yapıyoruz.

   // const products = await Product.find({ price: 10000, isActive: true }); // price bilgisi 10000 isActive özelliği true olan objeyi getirir.

   // const products = await Product.find({ isActive: true }.limit(1))
   //    .select({
   //       name: 1,
   //       price: 1,
   //    }); //isActive özelliği true olan tüm kayıtların name ve price bilgilerini getirir.(limit sayfalama yaptığımızda kullanıyoruz. seçtiğimiz bilgilere sahip verilerden kaç tanesini getireceğini belirler.)
   const products = await Product.find();
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
   //const product = products.find((p) => p.id == req.params.id); //artık veritabanından id numarasına göre bilgi getireceğimiz için burayı yorum satırı yapıyoruz.

   // const product = await Product.find({ _id: req.params.id }); //bunun yerine findbyId kullanırsak obje tanımlaması göndermeyiz.

   //döküman üzerinden diğer sorguların ve bu sorguların nasıl kullanıldığıyla alakalı detaylı bilgi alabiliriz.
   const product = await Product.findById(req.params.id);
   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
      return;
   }
   res.send(product);
});

module.exports = router;
