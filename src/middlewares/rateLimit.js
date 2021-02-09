const RateLimit = require("express-rate-limit")

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 800,
  message: { error: "Too many requests, please try again later." },
  headers: false
})

module.exports = limiter