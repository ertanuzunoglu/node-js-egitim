//burada mongoose'u tanımlamamız gerekiyor.
const mongoose = require("mongoose");

//schema tanımlamamız gerekiyor.

const categorySchema = mongoose.Schema({
   name: String,
});

module.exports = mongoose.model("Category", categorySchema);
