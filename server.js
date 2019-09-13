const fs = require("fs");
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const port = process.env.PORT || 8080;

app = express();

app.use(serveStatic(__dirname + "/dist"));

app.get("/dsw_logo.png", (req, res) => {
  res.set("Content-Type", "image/png");
  fs.createReadStream(path.join(process.cwd(), "dsw_logo.png")).pipe(res);
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, console.log("STUMBL: Listening on port " + port));
