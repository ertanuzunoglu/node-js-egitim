const express = require("express");
const router = express.Router();
const { User, validateRegister, validateLogin } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
   res.send();
});

router.post("/", async (req, res) => {
   const { error } = validateRegister(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }
   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res
         .status(400)
         .send("bu mail adresi ile zaten bir kullanıcı mevcut");
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });
   await user.save();
   res.send(user);
});

//kullanıcı girişi için bir validate daha eklememiz gerekecek. user.js dosyasına ekleyip yukarıdaki importlarımza da ekliyor.
router.post("/auth", async (req, res) => {
   const { error } = validateLogin(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let user = await User.findOne({ email: req.body.email });
   if (!user) {
      return res.status(400).send("hatalı email ya da parola");
   }

   const isSuccess = await bcrypt.compare(req.body.password, user.password);
   if (!isSuccess) {
      return res.status(400).send("hatalı email ya da ");
   }
   res.send(true);
});
module.exports = router;
