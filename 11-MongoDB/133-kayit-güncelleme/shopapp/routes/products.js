const express = require("express");
const router = express.Router();

const { Product, validateProduct } = require("../models/product"); //

router.get("/", async (req, res) => {
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
      description: req.body.description,
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

//db kayıt güncelleme işlemini put requesti üzerinden yapacağız.bunun için birkaç yöntemimiz var
router.put("/:id", async (req, res) => {
   //query first = findy id ile alıp save ile güncellemek
   const product = await Product.findById(req.params.id);

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
   product.description = req.body.decription;
   product.imageUrl = req.body.imageUrl;
   product.isActive = req.body.isActive;

   const updateProduct = await product.save();
   res.send(updateProduct);

   /*


   //finby id ile almadan tek bir sorgu içerisinde yapılabilir.bu update metodur. birinci parametre olarak hangi kritere göre bilgi seçmek istediğimizi, ikinci parametrede ise güncellenecek olan bilgileri seçebiliriz.
   
   const result = await Product.updateMany(
      { _id: req.params.id },
      {
         $set: {
            name: req.body.name, 
            price: req.body.price,
            description: req.body.decription,
            isActive: req.body.isActive,
         },
      }
   );
   
   res.send(result); // güncellenen kayıt sayısını verir. güncellenen objenin tamamını getirmez.
   

   //ikinci yöntemdeki gibi geriye etkilenen kayıt sayısı değil de güncellenen ya da güncellemeden önceki ürün bilgisini almak için uptade yerine findByIdAndUpdate metodunu kullanacağız.sonucu da result olarak değil product olarak yazacağız.

   const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
         $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive,
         },
      },
      {
         new: true,
      } /* üçüncü parametre olarak bu bilgiyi girdiğimizde aşağıdaki sende sonucunda bize product'ın güncellenmiş hali gelir.bu parametre girilmezse ürün güncellenir fakat sende bize eski halini verir. 
   );
   res.send(product);
   //bunların hepsi kullanılabilir fakat biz birinci yöntemi kullanacağız.


   */
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
