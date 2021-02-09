async function newBagsContoller(req, res){
  try {
    const newBagsFunction = require("../models/newBags")

    let newBags = await newBagsFunction()
    if(newBags.okay === false) return res.status(500).send()
  
    res.status(200).json({"newBags": newBags.result})
  } catch (error) {
    console.log(error)
    return res.status(500).send()
  }
  
}

module.exports = newBagsContoller