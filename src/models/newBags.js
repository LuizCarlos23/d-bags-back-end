async function newBags(amountBags = 2){
  try {
    const {connect} = require("../config/database")
    const db = await connect() 
    let tableBags = db.define("bags")
    
    let resultQuery = await tableBags.findAll({
      attributes: [ "id", "name", "retail_price","retail_price_discount", 
                    "discount", "material_type", "handle_type", "material_type", "main_img_path"], 
      limit: amountBags, order: [["id", "DESC"]], logging: false
    })

    return {"okay": true, 'result': resultQuery}
  } catch (error) {
    console.log(error)
    return {"okay": false, "result": null}
  }
}

module.exports = newBags