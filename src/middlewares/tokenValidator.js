async function tokenValidator (req, res, next){
  try {
    const authHeader = req.headers.authorization
    const jwt = require("jsonwebtoken")

    if (!authHeader) return res.status(401).send({"okay": "false", "message": "No token provided"})
    
    // Verificar se é o formato de um token valido
    let parts = authHeader.split(' ')
    // console.log(parts)
    if (!parts.length === 2) return res.status(401).send({"okay": "false", "message": "Token error"})
    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({"okay": "false", "message": "Token error"})
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).send({"okay": "false", "message": "Token invalid"})
      req.tokenDecoded = decoded
      return next()
    })
  } catch (error) {
    console.log("!! Erro ao verificar o token !!\n", error)
    return res.status(500).send({"okay": "false", "message": "Internal error"})
  }
}

async function adminTokenValidator(req, res, next){
  try {
    let decodedToken = req.tokenDecoded // Yoken deescriptografado oriundo do middleware 'TokenValidator'
    console.log(decodedToken)
    if (decodedToken.admin != "confirmed") {
      return res.status(500).send({"okay": "false", "message": "Invalid token"})
    } else { return next() }
  } catch (error) {
    console.log(error)
    return res.status(500).send({"okay": "false", "message": "Internal error"})
  }
}

module.exports = { tokenValidator, adminTokenValidator }