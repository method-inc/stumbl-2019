const express = require("express");
const serveStatic = require("serve-static");
const port = process.env.PORT || 8080;
require("./config");

app = express();

app.use(serveStatic(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, console.log("STUMBL: Listening on port " + port));
