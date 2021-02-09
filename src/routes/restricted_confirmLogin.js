async function confirmLoginController(req, res){
  try {
    const jwt = require("jsonwebtoken")
    let decodedToken = req.tokenDecoded
    if (decodedToken.admin != "not") return res.status(500).send()
    
    let token = jwt.sign({admin: "confirmed"}, process.env.TOKEN_SECRET, {expiresIn: 30 * 1 * 60})
    return res.send({token})
  } catch (error) {
    console.log(error)
    return res.status(500).send()
  }
}

module.exports = confirmLoginController