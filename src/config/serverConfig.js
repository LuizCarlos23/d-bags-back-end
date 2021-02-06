function configureServer(express){
  const routes = require("./routes")
  const RateLimit = require("../middlewares/rateLimit")
  const cors = require("cors")
  const helmet = require("helmet")

  const app = express()

  app.use(cors())
  app.use(helmet())
  app.use(RateLimit)
  app.use("/", routes)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  
  return app
}

module.exports = configureServer