var http = require("http");

var server = http.createServer((request, response) => {
   // console.log(request.url, request.method);
   // console.log(response0.statusCode);
   response.setHeader("Content-Type", "text/html");
   response.statusCode = 200;
   response.statusMessage = "ok";
   response.write("<h1>Ana Sayfa</h1>");
   response.end();
});
server.listen(3000);

console.log("node.js server at port 3000");
