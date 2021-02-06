"use strict";

function routeInserBagsController(req, res) {
  var _deleteImg, path, fs, checkImage, insertBags, _files, body, values, _require, bagsValuesValidator, imagePaths, date;

  return regeneratorRuntime.async(function routeInserBagsController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          // Função para deletar as imagens indeseajdas
          _deleteImg = function _deleteImg(files) {
            files.map(function (file) {
              var path_img = path.resolve(__dirname, "..", "..", "img", "bags", file.filename);
              fs.unlink(path_img, function (err) {
                if (err) {
                  console.log("!! Error ao apagar a imagem ".concat(file.filename, " !! "));
                  console.log(err);
                }
              });
            });
          };

          path = require("path");
          fs = require("fs");
          _context2.next = 11;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          console.log("Error na função deleteImg");
          return _context2.abrupt("return", res.status(500).send({
            "msg": "Server error!"
          }));

        case 11:
          _context2.prev = 11;

          // Função para checar os nomes da imagem
          checkImage = function checkImage(files) {
            var nameFiles;
            return regeneratorRuntime.async(function checkImage$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(files.length != 3)) {
                      _context.next = 3;
                      break;
                    }

                    deleteImg(files);
                    return _context.abrupt("return", false);

                  case 3:
                    // Armazenar os nomes das imagens
                    nameFiles = files.map(function (file) {
                      var part_filename = file.filename.split("_"); // console.log(part_filename)

                      return part_filename[0];
                    }); // Verificar se alguma imagem possui o algum nome invalido
                    // Se possuir, chama a função para deletalas

                    if (!(nameFiles.indexOf('undefined') > -1 || nameFiles.indexOf("") > -1 || nameFiles.indexOf("null") > -1)) {
                      _context.next = 7;
                      break;
                    }

                    deleteImg(files);
                    return _context.abrupt("return", false);

                  case 7:
                    return _context.abrupt("return", true);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          insertBags = require("../models/insertBags");
          _files = req.files, body = req.body;
          values = {
            name: body.name,
            reference: body.reference,
            type: body.type,
            handle_type: body.handle_type,
            length: body.length,
            width: body.retail_price,
            height: body.length,
            retail_price: body.retail_price,
            discount: body.discount,
            available_quantity: body.available_quantity
          };

          if (!(values.discount > 1 || !(values.discount > 0.009))) {
            _context2.next = 19;
            break;
          }

          deleteImg(_files);
          return _context2.abrupt("return", res.status(400).send({
            "msg": "Invalid form!"
          }));

        case 19:
          _require = require("../schemes/valuesValidatorScheme"), bagsValuesValidator = _require.bagsValuesValidator;
          _context2.next = 22;
          return regeneratorRuntime.awrap(bagsValuesValidator.isValid(values));

        case 22:
          if (_context2.sent) {
            _context2.next = 25;
            break;
          }

          deleteImg(_files);
          return _context2.abrupt("return", res.status(400).send({
            "msg": "Invalid form!"
          }));

        case 25:
          _context2.next = 27;
          return regeneratorRuntime.awrap(checkImage(_files));

        case 27:
          if (_context2.sent) {
            _context2.next = 29;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            "msg": "Invalid form!"
          }));

        case 29:
          if (process.env.APP_URL == "localhost") {
            imagePaths = _files.map(function (file) {
              file.filename = file.filename.replace(" ", "_");
              return "http://localhost:".concat(process.env.PORT, "/public/imgs/bags/").concat(file.filename);
            }); // Retonar os "paths" da imagem
          } else {
            imagePaths = _files.map(function (file) {
              file.filename = file.filename.replace(" ", "_");
              return "".concat(process.env.APP_URL, "public/imgs/bags/").concat(file.filename);
            });
          }

          console.log(imagePaths); // Retorna uma string com os "paths" concatenado e separado por ;(ponto e virgula)

          imagePathsConcatenated = imagePaths.reduce(function (concat, file) {
            return concat += ";" + file;
          });
          date = new Date();
          values.img_path = imagePathsConcatenated;
          values.creation_date = date;
          console.log(values);
          _context2.next = 38;
          return regeneratorRuntime.awrap(insertBags(values));

        case 38:
          if (_context2.sent) {
            _context2.next = 41;
            break;
          }

          deleteImg(_files);
          return _context2.abrupt("return", res.status(500).send({
            "msg": "Internal error!"
          }));

        case 41:
          return _context2.abrupt("return", res.send({
            "msg": "Successfully register!"
          }));

        case 44:
          _context2.prev = 44;
          _context2.t1 = _context2["catch"](11);
          console.log(_context2.t1);
          deleteImg(files);
          return _context2.abrupt("return", res.status(500).send({
            "msg": "Server error!"
          }));

        case 49:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6], [11, 44]]);
}

module.exports = routeInserBagsController;