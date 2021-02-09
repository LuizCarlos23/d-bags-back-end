async function bagsByPriceController(req, res){ 
  try {
    const bagsByPriceFunction = require("../models/bagsByPrice")
    let { offset, price, limitBags, upToOrAbove, simple } = req.query
    
    let bagsByPrice = await bagsByPriceFunction(offset, price, limitBags, upToOrAbove, simple)
    if(bagsByPrice.okay == false) return res.status(400).send()

    res.status(200).json({"bagsByPrice": bagsByPrice.result})
  } catch (error) {
    console.log(error)
    return res.status(500).send()
  }
  
}

module.exports = bagsByPriceController