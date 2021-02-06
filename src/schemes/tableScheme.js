const { DataTypes } = require("sequelize")

const bags = {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reference: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  type: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  handle_type: { 
    type: DataTypes.STRING,
    allowNull: false
  }, length: {
    type: DataTypes.STRING,
    allowNull: false
  }, width: {
    type: DataTypes.STRING,
    allowNull: false
  }, height: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img_path: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  retail_price: { 
    type: DataTypes.FLOAT,
    allowNull: false
  }, discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  retail_price_discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  available_quantity: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creation_date: { 
    type: DataTypes.DATE,
    allowNull: false
  },
}

const feedback = {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  feedback_text: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  to_allow: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}

const admin_users = {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  },
}

module.exports = { bags, feedback, admin_users }