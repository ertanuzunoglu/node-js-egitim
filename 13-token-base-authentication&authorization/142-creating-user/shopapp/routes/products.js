const express = require("express");
const router = express.Router();
const { Product, Comment, validateProduct } = require("../models/product"); // product.js içerisinden dışarıya açılan commenti de buraya import etmemiz gerekitor

router.get("/", async (req, res) => {
   const products = await Product.find()
      .populate("category", "name -_id")
      .select("-isActive");
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
      category: req.body.category,
      comments: req.body.comments,
   });
   const newProduct = await product.save();
   res.send(newProduct);
});

// comment eklemek için yeni bir put requesti oluşturuyoruz.
router.put("/comment/:id", async (req, res) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }
   const comment = new Comment({
      text: req.body.text,
      userName: req.body.userName,
   });
   product.comments.push(comment);

   const newComment = await product.save();
   res.send(newComment);
});
//artık bir comment oluşturup o commente ekleme yapabiliyoruz. bunu silmemiz de gerekebilir. comment için yeni bir route oluşturuyoruz.
router.delete("/comment/:id", async (req, res) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      return res.status(404).send("aradığınız yorum bulunamadı");
   }
   const comment = product.comments.id(req.body.commentid);
   comment.remove();
   const updateProduct = await product.save();
   res.send(updateProduct);
});

router.put("/:id", async (req, res) => {
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
   product.category = req.body.category;
   product.comments = req.body.comments;

   const updateProduct = await product.save();
   res.send(updateProduct);
});

router.delete("/:id", async (req, res) => {
   const product = await Product.findByIdAndDelete(req.params.id);
   if (!product) {
      return res.status(404).send("aradığınız ürün bulunamadı");
   }
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
