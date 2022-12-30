const express = require("express");
const app = express();
const Joi = require("joi"); //bir class geriye döndürdüğümüz için ilk harfini büyük yazıyoruz.

app.use(express.json());
const products = [
   { id: 1, name: "iphone 12", price: 20000 },
   { id: 2, name: "iphone 13", price: 30000 },
   { id: 3, name: "iphone 14", price: 40000 },
];
app.get("/", (req, res) => {
   res.send(products[0]);
});

app.get("/api/products", (req, res) => {
   res.send(products);
});

app.post("/api/products", (req, res) => {
   /*       // isim girilmemiş yada 4 karakterden kısa girilmişse
   if (!req.body.name || req.body.name.length < 4) {
      res.status(400).send(
         "ürün adı bilgisini en az 4 karakter olarak girmelisiniz."
      ); //kullanıcı tarafından bir hata yapıldığı için 400
      return;
   }          */

   //validation için ekstra paket kullanabiliriz.joi npm diye googleda arattığımızda karşımıza gelen sayfada documantations and apiye tıklarız. joi aracılığıyla gelen bir bilgi kümesindeki herhangi bir bilgi kuralını uygulayabiliriz.

   //npm i joi@17.6.0 ile bu paketi yükleriz.son versiyon 17.6.0
   //yükleme işlemi tamamlandığında yukarıda joi'yi tanıtıyoruz.

   // joi'den validation kodlarını alacağımız için yukarıda örnek olarak yaptığımız isim validationunu yorum satırı yapalım.
   const shema = new Joi.object({
      // bu kodu yazdıktan sonra obje içerisine joi sitesinden ihtiyacımız olan kuralı ekliyoruz.

      name: Joi.string().min(3).max(30).required(), // namein string bir veri olduğunu,min 3, max 30 karater girilebileceğini belirtir.required ise bunun zorunlu olduğunu belirtir.
      price: Joi.number().required(),
   });
   const result = shema.validate(req.body); // burda requestin bodysi üzerinden bir sonuç alıyoruz.
   if (result.error) {
      /*        res.status(400).send(result.error);     */
      // error bilgisi joi tarafından bizim oluşturduğumuz result değişkenine yazılır. postmande hatalı bir post yaptığımzda bize details isimli bir dizi veriyor.baktığımızda orada details dizisinin 0. indexindeki message elemanını alabiliriz bunun için res.status kodumuzu yorum satırı yapıp aşağıya sadece mesaji alabileğimiz kodu yazalım.
      res.status(400).send(result.error.details[0].message);
      return; // return ile bir hata varsa aşağıdaki kodların işletilmesi durdurulur.
   }

   const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   };
   products.push(product);
   res.send(product);
});

app.get("/api/products/:id", (req, res) => {
   console.log(req.params);
   console.log(req.query);
   const product = products.find((p) => p.id == req.params.id);

   if (!product) {
      res.status(404).send("aradığınız ürün bulunamadı");
   }
   res.send(product);
});

// post request

app.post("/api/products");

app.listen(8000, () => {
   console.log("listening on port 8000");
});
