const Sequelize = require("sequelize");
const { STRING, DECIMAL } = Sequelize;
const conn = require("../model/db");

const Category = conn.define("category", {
  name: STRING,
});
module.exports = Category;
