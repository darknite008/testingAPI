const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const conn = require("../model/db");

const Category = conn.define("category", {
  name: STRING,
});
module.exports = Category;
