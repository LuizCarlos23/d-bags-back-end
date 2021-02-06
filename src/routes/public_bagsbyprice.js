async function bagsByPriceController(req, res){ 
  try {
    const bagsByPriceFunction = require("../models/bagsByPrice")
    let { offset, price, limitBags, upToOrAbove } = req.body

    let bagsByPrice = await bagsByPriceFunction(offset, price, limitBags, upToOrAbove)
    if(bagsByPrice.okay == false) return res.status(400).send({"message": bagsByPrice.message})

    res.status(200).json({"bagsByPrice": bagsByPrice.result, "message": bagsByPrice.message})
  } catch (error) {
    console.log(error)
    return res.status(500).send({"message": "Internal error"})
  }
  
}

module.exports = bagsByPriceController