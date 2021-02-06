async function adminVerification(values){
  try {
    let { email, password } = values
    
    // Conexão com banco de dados 
    const { QueryTypes } = require("sequelize")
    let { connect } = require("../config/database")
    let db = await connect()
    
    const bycrypt = require("bcrypt") // Lib pra criptografar a senha
    // console.log(await bycrypt.hash(password, 10))

    // Verificar se o EMAIL existe no banco de dados
    let admin_user = db.define("admin_users")
    let results = await admin_user.findAll({attributes: ["password", "id"], where: {email: email}, logging: false})
    if(results[0] == undefined) return [false]

    // Verificar se as senhas são iguais
    let passwordHash = results[0].dataValues.password
    if (!await bycrypt.compare(password, passwordHash)) return [false]

    return [true, results[0].dataValues.id]
  } catch (error) {
    console.log("!! Erro ao verificar o user admin !! ")
    console.log(error)
    return [false]
  }
}

module.exports = adminVerification