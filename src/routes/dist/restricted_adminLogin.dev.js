"use strict";

function adminLoginController(req, res) {
  var jwt, adminVerification, _require, valuesValidator, values, verificationResult, token, mailer;

  return regeneratorRuntime.async(function adminLoginController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          jwt = require("jsonwebtoken");
          adminVerification = require("../models/adminVerification");
          _require = require("../schemes/valuesValidatorScheme"), valuesValidator = _require.adminValuesValidator;
          values = req.body;
          _context.next = 7;
          return regeneratorRuntime.awrap(valuesValidator.isValid(values));

        case 7:
          if (_context.sent) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            "message": "Invalid form"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(adminVerification(values));

        case 11:
          verificationResult = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(verificationResult[0]);

        case 14:
          if (_context.sent) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(400).send());

        case 16:
          token = jwt.sign({
            admin: "not"
          }, process.env.TOKEN_SECRET, {
            expiresIn: 30 * 1 * 60
          });
          mailer = require("../modules/mailer");
          mailer.sendMail({
            to: values.email,
            from: process.env.MAIL,
            template: 'confirmLogin',
            context: {
              token: token
            }
          }, function (err) {
            if (err) {
              console.log("!! ERROR AO ENVIAR O EMAIL !!\n");
              console.log(err);
            }
          });
          return _context.abrupt("return", res.send());

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send());

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

module.exports = adminLoginController;