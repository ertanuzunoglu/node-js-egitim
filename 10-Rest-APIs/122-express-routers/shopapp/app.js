const express = require("express");
const app = express();

const products = require("./routes/products");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products", products);
app.use("/", home);

app.get("/", (req, res) => {
   res.send(products[0]);
});

app.listen(8000, () => {
   console.log("listening on port 8000");
});
