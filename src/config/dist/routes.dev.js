"use strict";

var express = require("express");

var routes = express.Router();

var path = require("path");

var bodyParser = require("body-parser");

routes.use(bodyParser.urlencoded({
  extended: true
}));
routes.use(bodyParser.json()); // Middlewares

var upload = require("../middlewares/multer");

var _require = require("../middlewares/tokenValidator"),
    tokenValidator = _require.tokenValidator,
    adminTokenValidator = _require.adminTokenValidator; // Restricted route Controllers


var adminLogin = require("../routes/restricted_adminLogin");

var routeInsertBags = require("../routes/restricted_insertBags");

var confirmLogin = require("../routes/restricted_confirmLogin"); // Public route Controllers
// const home = require("../routes/public_home")


var bagsbyprice = require("../routes/public_bagsbyprice");

var newbags = require("../routes/public_newbags");

var catalog = require("../routes/public_catalog"); // Public routes


routes.use("/public/imgs/bags/", express["static"](path.resolve(__dirname, "..", "..", "img", "bags")));
routes.post("/public/newbags", newbags);
routes.post("/public/bagsbyprice", bagsbyprice); // Resticted routes

routes.post("/restricted/login", adminLogin);
routes.post("/restricted/login/confirm", tokenValidator, confirmLogin);

if (process.env.APP_URL == "localhost") {
  routes.post("/restricted/insert/bags", upload.array('file', 3), routeInsertBags);
} else {
  routes.post("/restricted/insert/bags", tokenValidator, adminTokenValidator, upload.array('file', 3), routeInsertBags);
}

routes.get("/", function (req, res) {
  console.log("Alguém passou por aqui!");
  return res.send({
    "message": "Hello World!"
  });
});
module.exports = routes;