// buraya yapıştırdığımız kodları artık app üzerinden değil routes üzerinden çağırmamız gerekiyor.expressi buraya kurmamız gerekiyor.

const express = require('express');
const router = express.Router();
const path = require('path');


// artık aşağıdaki html sayfası getirme kodlarını direkt app içerisine middleware olarak eklemeyeceğiz. ilk başta router kapsamı içerisine alacağız. daha sonra bunu export edeceğiz. app içerisine middware olarak ekleyeceğiz.
router.use("/blogs/:blogid", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/users", "blog-details.html"));
});

router.use("/blogs", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/users", "blogs.html"));
});

router.use("/", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/users", "index.html"));
});

// router'ı dışarıdan ulaşıma açtık.
module.exports = router;