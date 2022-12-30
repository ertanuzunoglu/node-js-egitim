const express = require('express');
const router = express.Router();
const path = require("path");

router.use("/blog/create", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/admin", "blog-create.html"));
});

router.use("/blog/list", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/admin", "blog-list.html"));
});

router.use("/blog/edit", function (req, res) {
   res.sendFile(path.join(__dirname, "../views/admin", "blog-edit.html"));
});
module.exports = router;