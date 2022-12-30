const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
   res.send();
});

//api/users: post
router.post("/", async (req, res) => {
   const { error } = validateUser(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }
   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res
         .status(400)
         .send("bu mail adresi ile zaten bir kullanıcı mevcut");
   }
   //bu aşamada parola şifrelemek için bycrypt kullanacağız. terminale npm i bcrypt yazarak yükleyebiliriz. yukarıda bcrypti tanımladıktan sonra passwordu şifrelemek için
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });
   await user.save;
   res.send(user);
});
module.exports = router;
