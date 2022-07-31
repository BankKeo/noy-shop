const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Supplier = db.define("supplier", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Supplier;
