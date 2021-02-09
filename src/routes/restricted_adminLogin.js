async function adminLoginController(req, res){
  try {
    const jwt = require("jsonwebtoken")
    const adminVerification = require("../models/adminVerification")
    const { adminValuesValidator: valuesValidator } = require("../schemes/valuesValidatorScheme")
    const { body: values } = req
    if (!await valuesValidator.isValid(values)) return res.status(400).send()

    // Retorna um array que pode ter Um ou DOIS elementos, dependendo do resultado.
    // Se as credenciais estiverem certas será retornado um array com os valores [true, id_usuario] 
    // Se não será retornado apenas [false]
    let verificationResult = await adminVerification(values)
    if( !await verificationResult[0] ) return res.status(400).send()
    
    let token = jwt.sign({admin: "not"}, process.env.TOKEN_SECRET, {expiresIn: 30 * 1 * 60})

    const mailer = require("../modules/mailer")

    mailer.sendMail({
      to: values.email,
      from: process.env.MAIL,
      template: 'confirmLogin',
      context: { token }
    }, (err) => {
      if (err) {
        console.log("!! ERROR AO ENVIAR O EMAIL !!\n")
        console.log(err)
      }
    })
    return res.send()

  } catch (error) {
    console.log(error)
    return res.status(500).send()
  }
}

module.exports = adminLoginController
