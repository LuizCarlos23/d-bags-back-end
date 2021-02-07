const express = require("express")
const routes = express.Router()
const path = require("path")
const bodyParser = require("body-parser")

routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(bodyParser.json())

// Middlewares
const upload = require("../middlewares/multer")
const {tokenValidator, adminTokenValidator} = require("../middlewares/tokenValidator")

// Restricted route Controllers
const adminLogin = require("../routes/restricted_adminLogin")
const routeInsertBags = require("../routes/restricted_insertBags")
const confirmLogin = require("../routes/restricted_confirmLogin")

// Public route Controllers
const bagsbyprice = require("../routes/public_bagsbyprice")
const newbags = require("../routes/public_newbags")
const catalog = require("../routes/public_catalog")

// Public routes
routes.use("/public/imgs/bags/", express.static(path.resolve(__dirname, "..", "..", "img", "bags")))
routes.get("/public/newbags", newbags)
routes.get("/public/bagsbyprice", bagsbyprice)

// Resticted routes
routes.post("/restricted/login", adminLogin)
routes.post("/restricted/login/confirm", tokenValidator, confirmLogin)

if ( process.env.APP_URL == "localhost"){
  routes.post("/restricted/insert/bags", upload.array('file', 3), routeInsertBags)
} else {
  routes.post("/restricted/insert/bags", tokenValidator, adminTokenValidator, upload.array('file', 3), routeInsertBags)
}

routes.get("/", (req, res) => {
  console.log("Alguém passou por aqui!")
  return res.send({"message": "Hello World!"})
})

module.exports = routes