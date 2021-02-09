const yup = require("yup")

const bagsValuesValidator = yup.object().shape({
  name: yup.string().required(),
  reference: yup.string().required(),
  material_type: yup.string().required(),
  handle_type: yup.string().required(),
  length: yup.string().required(),
  width: yup.string().required(),
  height: yup.string().required(),
  retail_price: yup.number().integer().positive().required(),
  discount: yup.number().positive().required(),
  available_quantity: yup.number().integer().positive().required(),
})

const adminValuesValidator = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})

module.exports = { bagsValuesValidator, adminValuesValidator }