const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Category = db.define("categories", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
