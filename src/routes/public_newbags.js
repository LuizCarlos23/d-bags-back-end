async function newBagsContoller(req, res){
  try {
    const newBagsFunction = require("../models/newBags")
    let { amountBags } = req

    let newBags = await newBagsFunction(amountBags)
    if(newBags.okay == "false") return res.status(500).send({ "message": "Internal error"})
  
    res.status(200).json({"newBags": newBags.result})
  } catch (error) {
    console.log(error)
    return res.status(500).send({"message": "Internal error"})
  }
  
}

module.exports = newBagsContoller