const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Payments = db.define("payment", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  cart: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Payments;
