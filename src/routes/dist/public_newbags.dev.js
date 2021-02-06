"use strict";

function newBagsContoller(req, res) {
  var newBagsFunction, amountBags, newBags;
  return regeneratorRuntime.async(function newBagsContoller$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newBagsFunction = require("../models/newBags");
          amountBags = req.amountBags;
          _context.next = 5;
          return regeneratorRuntime.awrap(newBagsFunction(amountBags));

        case 5:
          newBags = _context.sent;

          if (!(newBags.okay == "false")) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(500).send({
            "message": "Internal error"
          }));

        case 8:
          res.status(200).json({
            "newBags": newBags.result
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

module.exports = newBagsContoller;