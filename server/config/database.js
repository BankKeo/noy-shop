const { Sequelize } = require("sequelize");

const db = new Sequelize("noy-noy", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
