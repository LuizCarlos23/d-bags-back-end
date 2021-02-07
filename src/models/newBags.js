async function newBags(amountBags = 2){
  try {
    const {connect} = require("../config/database")
    const db = await connect() 
    let tableBags = db.define("bags")
    
    let result = await tableBags.findAll({attributes: ["id", "name","reference", "retail_price","retail_price_discount", "discount", "type", "handle_type", "length", "width", "height","img_path" ], limit: amountBags, order: [["id", "DESC"]], logging: false})
    return {"okay": "true", "result": result}
  } catch (error) {
    console.log(error)
    return {"okay": "false", "result": null}
  }
}

module.exports = newBags