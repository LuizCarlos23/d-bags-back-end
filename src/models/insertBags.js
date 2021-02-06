async function insertBags(values){
  try {
    const {connect} = require("../config/database")
    const db = await connect()
    // const queryInterface = db.getQueryInterface()
    await db.queryInterface.bulkInsert('bags', [values], {logging: false})
    return true
  } catch (error) {
    console.log(`\n!! Erro ao inserir os valores na tabela 'bags' !! `)
    console.log(error)
    return false
  }
}

module.exports = insertBags