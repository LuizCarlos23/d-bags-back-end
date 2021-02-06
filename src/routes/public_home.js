async function home(req, res){
  try {
    const newBagsFunction = require("../models/newBags")
    const bagsByPriceFunction = require("../models/bagsByPrice")
    console.log("Opa!")
    
    let newBags = await newBagsFunction()
    if(newBags.okay == "false") return res.status(500).send({"okay": "false", "message": "Internal error"})
    
    let bagsByPrice = await bagsByPriceFunction()
    if(bagsByPrice.okay == "false") return res.status(500).send({"okay": "false", "message": "Internal error"})

    res.json({"okay":"true", "newBags": newBags.result, "bagsByPrice": bagsByPrice.result})
  } catch (error) {
    console.log(error)
    return res.status(500).send({"okay": "false", "message": "Internal error"})
  }
  
}

module.exports = home