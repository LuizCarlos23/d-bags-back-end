async function catalogController(req, res){
  try {

    // Options: byPrice; 
    // Values: up to 80 or 100
    // Page determinarar a partir de que id enviarei as bolsas
    let { options, optionValue, page } = req.body
    let bags;

    if (!page) page = 0
    let offset = page * 10 // A 'page' determina a partir de que bolsa se enviada as outras
    
    console.log(req.body)

    if ( options == undefined || options == null) { options = "byprice"
    } else if ( options.leght != 1 ) options = "byprice"
    
    if ( options == "byprice" ){
      let priceDefault = 80
      let allowedValues = [ 50, 80, 100 ] // !! Ligar ao banco de dados - tabela de configuração !!
      if (!optionValue || optionValue == 0) price = priceDefault // Se não há 'value', 'price' assumirar o valor de 'priceDefault' 
      if (allowedValues.indexOf(optionValue) == -1) return res.status(400).send({"message": "Values invalid"})
      price = optionValue
      const bagsByPriceFunction = require("../models/bagsByPrice")
      bagsByPrice = await bagsByPriceFunction(offset, price, 12, "upto") // bagsByPrice(offset = 0 , price = 80, limitBags = 6, upToOrAbove = "above")
      if(bagsByPrice.okay == "false") return res.status(500).send({"message": "Internal error"})
      bags = bagsByPrice.result
    }

    return res.json({"result": bags})
  } catch (error) {
    console.log(error)
    return res.status(500).send({"message": "Internal error"})
  }
}

module.exports = catalogController