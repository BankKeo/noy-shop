const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Products = db.define("product", {
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
    allowNull: false,
  },
  sold: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = Products;
