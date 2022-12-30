const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
   res.send();
});

module.exports = router;
