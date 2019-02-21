var express = require("express");
var serveStatic = require("serve-static");
var port = process.env.PORT || 8080;

app = express();

app.use(serveStatic(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(port, console.log("Listening on port " + port));
