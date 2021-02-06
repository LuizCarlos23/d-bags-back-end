async function bagsByPrice(offset = 0 , price = 80, limitBags = 6, upToOrAbove = "above"){
  try {
    const {Op} = require("sequelize")
    const {connect} = require("../config/database")
    const db = await connect() 
    let tableBags = db.define("bags")

    let conditionOption = Op.gte; // Por padão os preços serão maiores ou igual a 'price'
    if (upToOrAbove == "upto") conditionOption = Op.lte // Os preços serão menos ou igual a 'price'
    
    price = parseInt(price) 
    let allowedValues = [ 50, 80, 100 ] // !! Ligar ao banco de dados - tabela de configuração !!
    if (allowedValues.indexOf(price) === -1) return {"okay": false, "result": null, "message": "Value invalid"}
    
    let result = await tableBags.findAll(
      {attributes: ["id", "name", "retail_price", "retail_price_discount", "type", "length", "width", "height", "img_path" ], 
      where: { retail_price: { [conditionOption]: price}}, 
      // order: [["id", "ASC"]],
      order: [["id", "DESC"]],
      limit: limitBags, offset: offset,logging: false}) 

    return {"okay": true, "result": result, "message": "Successful query"}
  } catch (error) {
    console.log(error)
    return {"okay": false, "result": null, "message": "Ineternal Error"}
  }
}

module.exports = bagsByPrice
