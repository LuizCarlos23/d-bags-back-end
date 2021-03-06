async function routeInserBagsController(req, res) {
  try {
    const path = require("path")
    const fs = require("fs")
    // Função para deletar as imagens indeseajdas
    function deleteImg(files) {
      files.map(file => {
        let path_img = path.resolve(__dirname, "..", "..", "img", "bags", file.filename)
        fs.unlink(path_img, err => {
          if (err) {
            console.log(`!! Error ao apagar a imagem ${file.filename} !! `)
            console.log(err)
          }
        })
      })
    }
  } catch (error) {
    console.log(error)
    console.log("Error na função deleteImg")
    return res.status(500).send()
  }


  try {
    const insertBags = require("../models/insertBags")

    let { files, body } = req
    let values = {
      name: body.name, reference: body.reference,
      material_type: body.material_type, handle_type: body.handle_type,
      length: body.length, width: body.width,
      height: body.height, retail_price: body.retail_price,
      discount: parseFloat(body.discount), available_quantity: body.available_quantity
    }
    
    if (values.discount > 100 || !(values.discount >= 0)) {
      deleteImg(files)
      return res.status(400).send()
    }

    // Função para checar os nomes da imagem
    async function checkImage(files) {
      // É preciso ter no maximo e no mínimo 3 imagens
      if (files.length != 3) {
        deleteImg(files)
        return false
      }
      // Armazenar os nomes das imagens
      let nameFiles = files.map(file => {
        let part_filename = file.filename.split("_")
        // console.log(part_filename)
        return part_filename[0]
      })
      // Verificar se alguma imagem possui o algum nome invalido
      // Se possuir, chama a função para deletalas
      if (nameFiles.indexOf('undefined') > -1 || nameFiles.indexOf("") > -1 || nameFiles.indexOf("null") > -1) {
        deleteImg(files)
        return false
      }
      return true
    }

    const { bagsValuesValidator } = require("../schemes/valuesValidatorScheme")
    if (!await bagsValuesValidator.isValid(values)) {
      deleteImg(files)
      return res.status(400).send()
    }
    if (!await checkImage(files)) return res.status(400).send()

    let imagePaths;
    if (process.env.APP_URL == "localhost") {
      imagePaths = files.map(file => {
        file.filename = file.filename.replace(" ", "_")
        return `http://localhost:${process.env.PORT}/public/imgs/bags/${file.filename}`
      }) // Retonar os "paths" da imagem
    } else {
      imagePaths = files.map(file => {
        file.filename = file.filename.replace(" ", "_")
        return `${process.env.APP_URL}public/imgs/bags/${file.filename}`
      })
    }
    // Retorna uma string com os "paths" concatenado e separado por ;(ponto e virgula)
    let mainImgPath = ''
    let imagePathsConcatenated = ''
    imagePaths.map((path, index) => {
      if (index == 0) return mainImgPath = path
      if (imagePathsConcatenated == '' ) return imagePathsConcatenated += path
      imagePathsConcatenated += ";"+path
    })
    values.img_paths = imagePathsConcatenated
    values.main_img_path = mainImgPath

    let date = new Date()
    values.creation_date = date

    if (!await insertBags(values)) {
      deleteImg(files)
      return res.status(500).send()
    }
    return res.status(200).send({"msg": "Successfully register!" })
  } catch (error) {
    console.log(error)
    deleteImg(files)
    return res.status(500).send()
  }
}
module.exports = routeInserBagsController