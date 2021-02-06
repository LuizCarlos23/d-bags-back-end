"use strict";

function bagsByPriceController(req, res) {
  var bagsByPriceFunction, _req$body, offset, price, limitBags, upToOrAbove, bagsByPrice;

  return regeneratorRuntime.async(function bagsByPriceController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          bagsByPriceFunction = require("../models/bagsByPrice");
          _req$body = req.body, offset = _req$body.offset, price = _req$body.price, limitBags = _req$body.limitBags, upToOrAbove = _req$body.upToOrAbove;
          _context.next = 5;
          return regeneratorRuntime.awrap(bagsByPriceFunction(offset, price, limitBags, upToOrAbove));

        case 5:
          bagsByPrice = _context.sent;

          if (!(bagsByPrice.okay == false)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            "message": bagsByPrice.message
          }));

        case 8:
          res.status(200).json({
            "bagsByPrice": bagsByPrice.result,
            "message": bagsByPrice.message
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            "message": "Internal error"
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

module.exports = bagsByPriceController;