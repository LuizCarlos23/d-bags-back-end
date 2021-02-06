"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function bagsByPrice() {
  var offset,
      price,
      limitBags,
      upToOrAbove,
      _require,
      Op,
      _require2,
      connect,
      db,
      tableBags,
      conditionOption,
      allowedValues,
      result,
      _args = arguments;

  return regeneratorRuntime.async(function bagsByPrice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offset = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
          price = _args.length > 1 && _args[1] !== undefined ? _args[1] : 80;
          limitBags = _args.length > 2 && _args[2] !== undefined ? _args[2] : 6;
          upToOrAbove = _args.length > 3 && _args[3] !== undefined ? _args[3] : "above";
          _context.prev = 4;
          _require = require("sequelize"), Op = _require.Op;
          _require2 = require("../config/database"), connect = _require2.connect;
          _context.next = 9;
          return regeneratorRuntime.awrap(connect());

        case 9:
          db = _context.sent;
          tableBags = db.define("bags");
          conditionOption = Op.gte; // Por padão os preços serão maiores ou igual a 'price'

          if (upToOrAbove == "upto") conditionOption = Op.lte; // Os preços serão menos ou igual a 'price'

          allowedValues = ["50", "80", "100"]; // !! Ligar ao banco de dados - tabela de configuração !!

          if (!(allowedValues.indexOf(price) === -1)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", {
            "okay": false,
            "result": null,
            "message": "Value invalid"
          });

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(tableBags.findAll({
            attributes: ["name", "reference", "retail_price", "type", "length", "width", "height", "img_path"],
            where: {
              retail_price: _defineProperty({}, conditionOption, price)
            },
            // order: [["id", "ASC"]],
            order: [["id", "DESC"]],
            limit: limitBags,
            offset: offset,
            logging: false
          }));

        case 18:
          result = _context.sent;
          return _context.abrupt("return", {
            "okay": true,
            "result": result,
            "message": "Successful query"
          });

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);
          return _context.abrupt("return", {
            "okay": false,
            "result": null,
            "message": "Ineternal Error"
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 22]]);
}

module.exports = bagsByPrice;