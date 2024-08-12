"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var port = 8000;
var app = express();
app.get("/user", function (req, res) {
    res.send("hi");
});
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(401).send(err.message);
});
app.listen(port, function () {
    console.log("server start on ".concat(port));
});
