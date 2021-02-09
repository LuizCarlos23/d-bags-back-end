async function newBags(amountBags = 2){
  try {
    const {connect} = require("../config/database")
    const db = await connect() 
    let tableBags = db.define("bags")
    
    let result = await tableBags.findAll({
      attributes: [ "id", "name", "retail_price","retail_price_discount", 
                    "discount", "type", "handle_type", "material_type", "main_img_path", "img_paths" ], 
      limit: amountBags, order: [["id", "DESC"]], logging: false
    })

    return {"okay": true, result}
  } catch (error) {
    console.log(error)
    return {"okay": false, "result": null}
  }
}

module.exports = newBags