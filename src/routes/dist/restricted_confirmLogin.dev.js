"use strict";

function confirmLoginController(req, res) {
  var jwt, decodedToken, token;
  return regeneratorRuntime.async(function confirmLoginController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          jwt = require("jsonwebtoken");
          decodedToken = req.tokenDecoded;

          if (!(decodedToken.admin != "not")) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(500).send({
            "message": "Error confirming login"
          }));

        case 5:
          token = jwt.sign({
            admin: "confirmed"
          }, process.env.TOKEN_SECRET, {
            expiresIn: 30 * 1 * 60
          });
          return _context.abrupt("return", res.send({
            "message": "Login successfully confirmed",
            token: token
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            "message": "Error confirming login"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports = confirmLoginController;