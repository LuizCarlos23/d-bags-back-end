async function insertBags(values){
  try {
    const {connect} = require("../config/database")
    const db = await connect()

    // Preço com desconto sera adicionado a partir do desconto enviado pelo admin
    values.retail_price_discount = values.retail_price - (values.retail_price * parseFloat(values.discount))
    console.log(values.retail_price_discount)

    await db.queryInterface.bulkInsert('bags', [values], {logging: false})
    return true
  } catch (error) {
    console.log(`\n!! Erro ao inserir os valores na tabela 'bags' !! `)
    console.log(error)
    return false
  }
}

module.exports = insertBags