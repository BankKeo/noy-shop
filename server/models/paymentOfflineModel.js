const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PaymentOffline = db.define("paymentOffline", {
  cart: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false,
  },
});

module.exports = PaymentOffline;
