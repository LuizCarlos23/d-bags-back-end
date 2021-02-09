async function bagsByPrice(offset = 0 , price = 80, limitBags = 6, upToOrAbove = "above", simple = 'true'){
  function formatQueryResult(data, simple){
    let formattedData = []
    data.map(bag => {
      let dataValues = bag.dataValues
      if(simple == "false") dataValues.img_paths = dataValues.img_paths.split(";")
       // Transformar em array a string com os caminhos da img 
      formattedData.push(dataValues) 
    })
    return formattedData
  }
  
  try {
    const {Op} = require("sequelize")
    const {connect} = require("../config/database")
    const db = await connect() 
    let tableBags = db.define("bags")

    let conditionOption = Op.gte; // Por padão os preços serão maiores ou igual a 'price'
    if (upToOrAbove == "upto") conditionOption = Op.lte // Os preços serão menos ou igual a 'price'
    
    price = parseInt(price) 
    let allowedValues = [ 50, 80, 100 ] // !! Ligar ao banco de dados - tabela de configuração !!
    if (allowedValues.indexOf(price) === -1) return {"okay": false, "result": null}
    
    let attributes = ["id", "name", "retail_price", "discount", "main_img_path"]
    if (simple === 'false') {
      attributes = ["id", "name", "retail_price", "retail_price_discount", 
                    "discount", "material_type", "handle_type", "main_img_path", "img_paths" ]
    }

    let resultQuery = await tableBags.findAll({
      attributes, 
      where: { retail_price: { [conditionOption]: price}}, 
      // order: [["id", "ASC"]],
      order: [["id", "DESC"]],
      limit: limitBags, offset: offset,logging: false
    }) 
    
    let formattedData = formatQueryResult(resultQuery, simple)

    return {"okay": true, "result": formattedData}
  } catch (error) {
    console.log(error)
    return {"okay": false, "result": null}
  }
}

module.exports = bagsByPrice
