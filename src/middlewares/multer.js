const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const { date } = require("yup/lib/locale")

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, path.resolve(__dirname, "..", "..", "img", "bags"))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(14, (err, result) =>{
        if (err) console.log(error)
        let str = result.toString('base64').replace(/\//g,'_').replace(/\+/g,'-').replace("=", "")
        // file.key = `${req.body.reference}_${new Date().getTime()}.jpg`
        req.body.reference = req.body.reference.replace(" ", "_")
        file.key = `${req.body.reference}_${str}.jpg`
        
        cb(null, file.key)
      })
    }}),
  s3: "Desenvolver !! importante para produção !! "
}


const storage = {
  dest: path.resolve(__dirname, "..", "..", "img", "bags"),
  storage: storageTypes["local"],
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ]
    if (allowedMimes.includes(file.mimetype)){
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."))
    }
  }
}
const upload = multer(storage)

module.exports = upload
