"use strict";

function catalogController(req, res) {
  var _req$body, options, optionValue, page, bags, offset, priceDefault, allowedValues, bagsByPriceFunction;

  return regeneratorRuntime.async(function catalogController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Options: byPrice; 
          // Values: up to 80 or 100
          // Page determinarar a partir de que id enviarei as bolsas
          _req$body = req.body, options = _req$body.options, optionValue = _req$body.optionValue, page = _req$body.page;
          if (!page) page = 0;
          offset = page * 10; // A 'page' determina a partir de que bolsa se enviada as outras

          console.log(req.body);

          if (options == undefined || options == null) {
            options = "byprice";
          } else if (options.leght != 1) options = "byprice";

          if (!(options == "byprice")) {
            _context.next = 20;
            break;
          }

          priceDefault = 80;
          allowedValues = [50, 80, 100]; // !! Ligar ao banco de dados - tabela de configuração !!

          if (!optionValue || optionValue == 0) price = priceDefault; // Se não há 'value', 'price' assumirar o valor de 'priceDefault' 

          if (!(allowedValues.indexOf(optionValue) == -1)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            "message": "Values invalid"
          }));

        case 12:
          price = optionValue;
          bagsByPriceFunction = require("../models/bagsByPrice");
          _context.next = 16;
          return regeneratorRuntime.awrap(bagsByPriceFunction(offset, price, 12, "upto"));

        case 16:
          bagsByPrice = _context.sent;

          if (!(bagsByPrice.okay == "false")) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(500).send({
            "message": "Internal error"
          }));

        case 19:
          bags = bagsByPrice.result;

        case 20:
          return _context.abrupt("return", res.json({
            "result": bags
          }));

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            "message": "Internal error"
          }));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

module.exports = catalogController;