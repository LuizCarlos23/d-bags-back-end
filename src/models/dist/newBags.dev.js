"use strict";

function newBags() {
  var amountBags,
      _require,
      connect,
      db,
      tableBags,
      result,
      _args = arguments;

  return regeneratorRuntime.async(function newBags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          amountBags = _args.length > 0 && _args[0] !== undefined ? _args[0] : 2;
          _context.prev = 1;
          _require = require("../config/database"), connect = _require.connect;
          _context.next = 5;
          return regeneratorRuntime.awrap(connect());

        case 5:
          db = _context.sent;
          tableBags = db.define("bags");
          _context.next = 9;
          return regeneratorRuntime.awrap(tableBags.findAll({
            attributes: ["name", "reference", "retail_price", "type", "handle_type", "length", "width", "height", "img_path"],
            limit: amountBags,
            order: [["id", "DESC"]],
            logging: false
          }));

        case 9:
          result = _context.sent;
          return _context.abrupt("return", {
            "okay": "true",
            "result": result
          });

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", {
            "okay": "false",
            "result": null
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}

module.exports = newBags;